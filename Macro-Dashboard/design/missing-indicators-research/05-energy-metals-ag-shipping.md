# Energy, Metals, Ag/Soft & Shipping — Free-Data Feasibility Research

**Family overview.** Eighteen indicators across crude/refined energy (#77, 79, 80, 81, 82), industrial and precious metals (#84, 86, 87, 88, 89, 90, 91), agricultural and soft commodities (#92, 93, 94, 95), and shipping (#96, 97). This is the densest free-tier family in the spec because the entire CME/ICE/COMEX/LME futures complex is mirrored on **Stooq's `.F` futures namespace** with no auth, no key, daily-bar CSV via `stooq.com/q/l/?s=<ticker>&f=sd2t2ohlc&h&e=csv`. Stooq exposes front-month continuous contracts only — meaning the WTI 1M-12M spread (#77), the only true curve play in the family, is the one indicator Stooq cannot solve. Two government APIs anchor the rest: **EIA Open Data v2** (`api.eia.gov/v2/`, free key, ~9k req/hr) cleanly handles SPR (#81), crack spread inputs (#80), and could carry the WTI curve via the petroleum `pri/fut` route (`RCLC1`...`RCLC4`) — but EIA stopped publishing NYMEX futures prices after 2024-04-05, so that route is dead. **World Bank Pink Sheet** (monthly XLSX) handles fertilizers (#95) plus shadow-checks every other commodity monthly. Shipping (#96, #97) is the weak corner: Baltic Exchange paywalls real-time BDI, Drewry posts WCI weekly behind HTML, Shanghai SCFI updates Fridays in Chinese HTML — all three are scrape-only. OPEC spare capacity (#82) and LME warehouse stocks (#90) are also scrape-only PDFs/HTML. Net: 13 of 18 are clean FREE, 5 require scrape/proxy effort, 0 are PAID-only.

---

## #77. WTI 1M-12M Spread (Contango/Backwardation) (Signal: 7/10)
- **Source**: CME Group Light Sweet Crude Oil settlements page. Historically EIA mirrored as `RCLC1`-`RCLC4` (1-4 month) — but EIA's `https://www.eia.gov/dnav/pet/PET_PRI_FUT_S1_D.htm` banner now reads "Futures prices after April 5, 2024, are not available." So EIA is no longer a path.
- **Free API**: no. Stooq's `CL.F` is front-month only (currently rolls Jun 2026 → next contract); there is no `CL.F12` or `CL.F.Z26` syntax in Stooq.
- **OSS tool**: `je-suis-tm/web-scraping/CME2.py` scrapes CME settlement pages directly (211 commits, Python). Closest fit for grabbing the full curve.
- **Cadence**: daily settlement (~3pm ET).
- **Data shape**: HTML table on CME settlements page; columns are Month, Open, High, Low, Last, Change, Settle, Volume, OI. Need rows for front month and front+11.
- **Complexity**: M — single HTML scrape, but CME's site is JS-heavy in places and changes layout; needs a User-Agent and brittle to redesigns.
- **Free-tier verdict**: FREE (CME settlements are public HTML).
- **Best path**: New `cmeSettlements` fetcher hitting `cmegroup.com/markets/energy/crude-oil/light-sweet-crude.quotes.html`, parse the settlements table, compute front - front+11 settle difference. Daily cron after 4pm ET.

---

## #79. TTF (Dutch Natural Gas) (Signal: 7/10)
- **Source**: ICE Endex Dutch TTF Natural Gas Futures product page (`ice.com/products/27996665/`); also published by CME as a financial look-alike (`TTF` cash-settled).
- **Free API**: no public free API. Stooq does NOT carry `TTF.F` (confirmed: "Symbol TTF.F nie istnieje w bazie"). Investing.com hosts daily settles behind anti-bot HTML.
- **OSS tool**: none found that targets TTF specifically and is currently maintained. ICE provides delayed end-of-day on its product page but renders via JS.
- **Cadence**: daily settlement (London close).
- **Data shape**: HTML / embedded JSON on the ICE product page; fields: ContractMonth, Settle, Change, Volume, OI.
- **Complexity**: M — scrape ICE product page's embedded JSON payload, or scrape Investing.com (anti-bot risk).
- **Free-tier verdict**: FREE if scraping ICE; PROXY otherwise.
- **Best path**: New `iceProductScrape` fetcher pointed at the TTF product page. Pull the front-month settle from the embedded JSON payload (ICE's pages ship the quote object in a script tag). Fall back to a weekly EIA STEO European spot natural gas series if scrape proves flaky.

---

## #80. Diesel / 3-2-1 Crack Spread (Signal: 6/10)
- **Source**: Compute from EIA daily spot prices — WTI Cushing (`PET.RWTC.D`), NY Harbor Gasoline (`PET.EER_EPMRR_PE1_Y35NY_DPG.D`), NY Harbor ULSD (`PET.EER_EPD2DXL0_PE1_Y35NY_DPG.D`).
- **Free API**: yes — EIA API v2, free key. Route: `api.eia.gov/v2/petroleum/pri/spt/data/?api_key=KEY&frequency=daily&data[0]=value&facets[series][]=RWTC&facets[series][]=EER_EPMRR_PE1_Y35NY_DPG&facets[series][]=EER_EPD2DXL0_PE1_Y35NY_DPG`. Limit 5,000 rows/response, ~9k req/hr.
- **OSS tool**: `ramikrispin/EIAapi` (R, active) and `myeia` (Python, PyPI active) — both reference designs for the v2 route grammar.
- **Cadence**: daily; EIA spot prices update ~4pm ET previous business day.
- **Data shape**: JSON `response.data[]` with `period`, `series`, `value`. Compute: `(2*gasoline*42 + ULSD*42 - 3*WTI) / 3` for $/bbl 3-2-1 crack.
- **Complexity**: S — one EIA v2 call (multi-series in one request), arithmetic.
- **Free-tier verdict**: FREE-KEY.
- **Best path**: New `eiaPetroleumSpot` fetcher; share the EIA v2 base/key with #81. One call, three series, server-side crack math.

---

## #81. SPR Inventory (Signal: 6/10)
- **Source**: EIA Weekly Petroleum Status Report series `PET.WCSSTUS1.W` (Weekly U.S. Ending Stocks of Crude Oil in SPR, thousand barrels).
- **Free API**: yes — EIA v2. Route: `api.eia.gov/v2/petroleum/stoc/wstk/data/?api_key=KEY&frequency=weekly&data[0]=value&facets[series][]=WCSSTUS1`.
- **OSS tool**: `ramikrispin/EIAapi`, `myeia`. Same shared infra as #80.
- **Cadence**: weekly, Wednesday ~10:30am ET (Thursday on US holiday weeks).
- **Data shape**: JSON; weekly series, single numeric value per `period` (week-ending date).
- **Complexity**: S — single EIA v2 call.
- **Free-tier verdict**: FREE-KEY.
- **Best path**: Same `eiaPetroleumStocks` fetcher as #80; one extra series facet. Track Wed release schedule for daily cron staleness checks.

---

## #82. OPEC+ Spare Capacity (Signal: 7/10)
- **Source**: IEA Oil Market Report (monthly PDF, free to read but no API), OPEC Monthly Oil Market Report (MOMR, public PDF at `momr.opec.org/pdf-download/`), and the **EIA STEO** which publishes its own OPEC capacity estimates monthly via API.
- **Free API**: yes via EIA STEO — `api.eia.gov/v2/steo/data/?facets[seriesId][]=COPC_OPEC` (OPEC crude oil production capacity) and `OPEC_SPARE` (effective spare). Free key. The IEA OMR itself has no API; OPEC MOMR is PDF-only.
- **OSS tool**: none found that parses MOMR or IEA OMR PDFs reliably. `pythonbravo/oil_price` and `je-suis-tm/web-scraping` are tangentially related but don't target spare capacity.
- **Cadence**: monthly (EIA STEO ~2nd Tuesday; IEA OMR mid-month; OPEC MOMR mid-month).
- **Data shape**: EIA STEO JSON — monthly series, mb/d. PDFs would require `pdfplumber`/`tabula` extraction for Tables 1–3.
- **Complexity**: S for EIA STEO route; XL for OMR PDF scrapes.
- **Free-tier verdict**: FREE-KEY (via EIA STEO).
- **Best path**: Use EIA STEO `COPC_OPEC` (and `COPRPSC_OPEC` for production) via the EIA v2 fetcher already standing up for #80/#81. Spare = capacity − production. Skip the PDFs unless audit shows EIA STEO numbers disagree materially with the OPEC-reported figure.

---

## #84. Copper/Gold Ratio (Signal: 9/10)
- **Source**: Compute = Copper price / Gold price. The challenge is daily copper — FRED's `PCOPPUSDM` is monthly only; no `DCOPPER` exists. Resolution: Stooq `hg.f` (COMEX Copper front-month, daily).
- **Free API**: yes — Stooq CSV. URL: `stooq.com/q/l/?s=hg.f&f=sd2t2ohlc&h&e=csv` (copper, ¢/lb) and `stooq.com/q/l/?s=gc.f&f=sd2t2ohlc&h&e=csv` (gold, $/oz). Confirmed live (verified 2026-05-12: HG.F = 647.30 ¢/lb).
- **OSS tool**: any Stooq wrapper (`pandas-datareader` Stooq path is intermittent for futures — recommend raw CSV fetch).
- **Cadence**: daily, end-of-session bars.
- **Data shape**: CSV `Date,Open,High,Low,Close`. Convert HG.F from ¢/lb to $/lb (÷100), or just take ratio of raw closes (ratio is unitless modulo a constant).
- **Complexity**: S — two CSV fetches, divide.
- **Free-tier verdict**: FREE.
- **Best path**: New `stooqFutures` fetcher (one CSV path serves the entire futures sub-family: 77 fallback, 86, 87 inputs, 88, 92, 93, 94). Compute ratio server-side. Note ticker case — `hg.f` and `gc.f` are lowercase in URL; `.F` shows uppercase in display, both work.

---

## #86. Gold/Silver Ratio (Signal: 7/10)
- **Source**: Compute = Gold / Silver. Gold = Stooq `gc.f` (COMEX, $/oz). Silver = Stooq `si.f` (COMEX, $/oz). Both daily.
- **Free API**: yes — Stooq CSV (same pattern as #84). FRED also has `GOLDAMGBD228NLBM` (LBMA Gold AM) and `SLVPRUSD` (LBMA Silver) daily, free-key, as a backup pair.
- **OSS tool**: none required.
- **Cadence**: daily.
- **Data shape**: CSV from Stooq, or JSON observations from FRED.
- **Complexity**: S — two fetches, divide.
- **Free-tier verdict**: FREE (Stooq) or FREE-KEY (FRED).
- **Best path**: Reuse `stooqFutures` fetcher (shared with #84). Compute `GC.F close / SI.F close` daily.

---

## #87. Platinum / Palladium (Signal: 5/10)
- **Source**: Stooq `pl.f` (NYMEX Platinum, $/oz) and `pa.f` (NYMEX Palladium, $/oz). Both verified live (2026-05-12: PL.F = $2,114.65, PA.F = $1,516.75).
- **Free API**: yes — Stooq CSV. LBMA publishes the official PM fixes via `lppm.com` HTML but with anti-bot defenses; Stooq is the cleaner path.
- **OSS tool**: none required. Spec called out LME but platinum/palladium trade on NYMEX, not LME — Stooq has them.
- **Cadence**: daily.
- **Data shape**: CSV from Stooq.
- **Complexity**: S.
- **Free-tier verdict**: FREE.
- **Best path**: Reuse `stooqFutures` fetcher; ratio = PL.F / PA.F.

---

## #88. Aluminum (LME) (Signal: 5/10)
- **Source**: LME 3-month aluminum is paywalled real-time but free on next-day delay. Stooq carries an aluminum future under `0DL.F` (verified: alternate-ticker namespace in stooq.com/t/?i=557).
- **Free API**: partial. Stooq `0DL.F` works but liquidity/freshness is weaker than the LME official cash settle. Westmetall (`westmetall.com/en/markdaten.php`) publishes daily LME prices and warehouse stocks free; it's HTML scrape. Fastmarkets exchange-data page also publishes LME closing prices next-day free.
- **OSS tool**: `je-suis-tm/web-scraping/LME.py` (Python, scrapes LME pages; same repo as #90).
- **Cadence**: daily, T+1.
- **Data shape**: HTML table (westmetall) — Date, Cash Settle, 3M Settle, Stock. Stooq path is plain CSV.
- **Complexity**: S for Stooq; M for westmetall scrape.
- **Free-tier verdict**: FREE.
- **Best path**: Try Stooq `0DL.F` first via `stooqFutures` fetcher. If liquidity is too thin, swap to westmetall HTML scrape (also covers #90).

---

## #89. Uranium (UxC U3O8) (Signal: 6/10)
- **Source**: UxC U3O8 weekly spot is paywalled. Free proxy: Sprott Physical Uranium Trust (TSX: U.UN / OTC: SRUUF) — its NAV tracks U3O8 spot tightly. Stooq carries it under `SRUUF.US` (confirmed: suggestion path resolved when querying bare `sruuf`).
- **Free API**: yes — Stooq CSV at `stooq.com/q/l/?s=sruuf.us&f=sd2t2ohlc&h&e=csv`. NAV vs market price has a small premium/discount but for stress-signal purposes the daily move is fine.
- **OSS tool**: none required.
- **Cadence**: daily (market price); weekly (true UxC spot).
- **Data shape**: CSV — SRUUF.US daily OHLC.
- **Complexity**: S.
- **Free-tier verdict**: FREE.
- **Best path**: Reuse `stooqFutures` fetcher (rename to `stooq` since it'll handle equities too). Use SRUUF.US close as the daily uranium proxy; document the proxy nature in the spec.

---

## #90. LME Copper Warehouse Stocks (Signal: 6/10)
- **Source**: LME publishes warehouse stocks on next-day free basis. Westmetall (`westmetall.com/en/markdaten.php`) is the most stable free mirror — publishes daily LME copper / aluminum / tin / lead / zinc / nickel cash, 3M, and stocks.
- **Free API**: no formal API. HTML scrape. Fastmarkets also republishes next-day free but behind soft-login.
- **OSS tool**: `je-suis-tm/web-scraping/LME.py` (Python). Same repo as #88.
- **Cadence**: daily, T+1.
- **Data shape**: HTML table on westmetall — Date, Cash, 3M, Stock (metric tons).
- **Complexity**: M — one HTML scrape covers #88 and #90 together.
- **Free-tier verdict**: FREE.
- **Best path**: New `westmetallScrape` fetcher (BeautifulSoup-equivalent in Node, e.g., `cheerio`) hitting one HTML page; serves #88 (Aluminum) and #90 (Copper stocks) simultaneously. Daily cron after London close.

---

## #91. COMEX Gold Deliveries (Signal: 6/10)
- **Source**: CME publishes daily metal stocks and delivery reports as XLS at predictable paths — `cmegroup.com/delivery_reports/Gold_Stocks.xls`, `Silver_Stocks.xls`, etc. (URL confirmed in CME's clearing/operations docs; live fetch from this session timed out but the path is documented and stable). MetalCharts.org and HeavyMetalStats.com mirror this data.
- **Free API**: yes — direct CME XLS pull, no auth. Path is stable.
- **OSS tool**: `je-suis-tm/web-scraping/CME2.py` covers CME delivery reports. MetalCharts has no API.
- **Cadence**: daily, T+1 (published after business close).
- **Data shape**: XLS — Date, Registered (oz), Eligible (oz), Total, Adjustments / Deliveries.
- **Complexity**: M — XLS parse (use `xlsx` npm package).
- **Free-tier verdict**: FREE.
- **Best path**: New `cmeMetalStocks` fetcher; HTTP GET the XLS, parse with `xlsx`, extract daily delivery row. Daily cron post-London close.

---

## #92. Wheat (CBOT) (Signal: 5/10)
- **Source**: Stooq `zw.f` (CBOT SRW Wheat, ¢/bu). Verified live 2026-05-12: 642.10 ¢/bu.
- **Free API**: yes — Stooq CSV. FRED carries monthly `PWHEAMTUSDM` for cross-check.
- **OSS tool**: none required.
- **Cadence**: daily.
- **Data shape**: CSV from Stooq.
- **Complexity**: S.
- **Free-tier verdict**: FREE.
- **Best path**: `stooqFutures` fetcher, ticker `zw.f`.

---

## #93. Corn / Soybeans (Signal: 5/10)
- **Source**: Stooq `zc.f` (Corn) and `zs.f` (Soybeans). FRED has monthly `PMAIZMTUSDM` and `PSOYBUSDM` as cross-check.
- **Free API**: yes — Stooq CSV. (Stooq alternate tickers in the `0B*.F` namespace also exist but `zc.f` / `zs.f` follow the CBOT root-symbol convention and are the cleaner choice.)
- **OSS tool**: none required.
- **Cadence**: daily.
- **Data shape**: CSV; corn ¢/bu, soybeans ¢/bu.
- **Complexity**: S.
- **Free-tier verdict**: FREE.
- **Best path**: `stooqFutures` fetcher — two tickers, daily.

---

## #94. Sugar / Coffee / Cocoa (Signal: 4/10)
- **Source**: Stooq `sb.f` (Sugar #11 ICE, ¢/lb), `kc.f` (Coffee ICE, ¢/lb), `cc.f` (Cocoa ICE, $/mt). All three confirmed live 2026-05-12: SB.F = 14.91, KC.F = 282.30, CC.F = $4,709.00.
- **Free API**: yes — Stooq CSV.
- **OSS tool**: none required.
- **Cadence**: daily.
- **Data shape**: CSV.
- **Complexity**: S.
- **Free-tier verdict**: FREE.
- **Best path**: `stooqFutures` fetcher — three tickers.

---

## #95. Urea + DAP + Potash Index (Signal: 6/10)
- **Source**: World Bank Commodity Markets Pink Sheet. Historical monthly XLSX at `https://thedocs.worldbank.org/en/doc/18675f1d1639c7a34d463f59263ba0a2-0050012025/related/CMO-Historical-Data-Monthly.xlsx`. Series: Urea (E. Europe, $/mt), DAP ($/mt), Potash (Brazil muriate, $/mt). Stooq also has `0AG.F` (Urea futures) but with low liquidity.
- **Free API**: no formal API; direct XLSX URL is stable (World Bank refreshes the same path monthly).
- **OSS tool**: `datasets/gold-prices` (active, GitHub Actions daily) demonstrates the exact Pink Sheet XLSX pull + parse pattern — useful reference. `olddatasets/gold-spot-downloader` is similar.
- **Cadence**: monthly (~3rd of following month).
- **Data shape**: XLSX, "Monthly Prices" sheet — wide table, columns are commodities, rows are months. Find columns "Urea, EE", "DAP", "Potassium chloride".
- **Complexity**: M — XLSX fetch + parse + average the three normalized series into an index.
- **Free-tier verdict**: FREE.
- **Best path**: New `worldBankPinkSheet` fetcher (HTTP GET + `xlsx` npm parse). Index = simple average of (urea, DAP, potash) z-scores, rebased to 100 at a fixed date. Monthly cron after the 3rd business day.

---

## #96. Baltic Dry Index (Signal: 6/10)
- **Source**: Baltic Exchange itself paywalls real-time. Free sources: Investing.com (anti-bot HTML, ticker `BADI`), Trading Economics (rate-limited free tier), HandyBulk (`handybulk.com/baltic-dry-index/` — clean HTML, updated daily). MacroMicro shows it but requires subscription for export.
- **Free API**: no formal free API. Scrape only. The `liqiqiii-investment-mcp` MCP server fetches it (cached in SQLite); could borrow its scrape logic but it's not a drop-in.
- **OSS tool**: `ajoposor/Baltic-Dry-Index` (data + charts, JS) — useful for historical seed. `liqiqiii-investment-mcp` for current logic.
- **Cadence**: daily ~1pm London.
- **Data shape**: HTML — single number plus capesize/panamax/supramax subcomponents.
- **Complexity**: M — HTML scrape with cheerio; HandyBulk is the most stable target.
- **Free-tier verdict**: FREE (via scrape).
- **Best path**: New `balticDryScrape` fetcher hitting HandyBulk's daily page; cache in case the page is down. Fallback: Trading Economics commodity/baltic page (rate-limit aware). Document that this is the most scrape-fragile indicator in the family — if it breaks, swap source rather than retrying.

---

## #97. Drewry WCI / Shanghai SCFI (Signal: 6/10)
- **Source**: Drewry's WCI weekly assessment at `drewry.co.uk/supply-chain-advisors/supply-chain-expertise/world-container-index-assessed-by-drewry` (free HTML, posted Mondays). SCFI from Shanghai Shipping Exchange at `en.sse.net.cn/indices/scfinew.jsp` (Fridays, free HTML, English version exists).
- **Free API**: no. Both are pure HTML scrapes. Investing.com mirrors neither cleanly.
- **OSS tool**: none currently maintained for either. Closest analog is `je-suis-tm/web-scraping`'s general pattern.
- **Cadence**: weekly — Drewry Mondays, SCFI Fridays.
- **Data shape**: Drewry — single composite number plus 11 route subindices; SCFI — composite plus per-route rates. Both rendered as HTML tables.
- **Complexity**: M — two separate weekly scrapes.
- **Free-tier verdict**: FREE (scrape).
- **Best path**: New `containerShippingScrape` fetcher with two targets (Drewry WCI Monday, SCFI Friday). Composite-only is enough for the signal; ignore route breakdowns. Weekly cron, two pulls.

---

## Family Summary

**Top 5 free wins (this family is unusually dense):**

1. **Stooq futures CSV namespace** — one fetcher serves indicators #84, #86, #87, #88, #89 (via SRUUF.US), #92, #93, #94 (8 of 18 indicators) using a single URL pattern with no key. URL: `stooq.com/q/l/?s=<ticker>&f=sd2t2ohlc&h&e=csv`. Lowercase tickers in URLs; uppercase in display.
2. **EIA API v2 shared infra** — one fetcher (`eiaPetroleumSpot` + `eiaStocks` + `eiaSteo` sharing a base + free key) serves #80 (crack spread), #81 (SPR), #82 (OPEC capacity via STEO). Three indicators on one credential.
3. **World Bank Pink Sheet** (#95) — single monthly XLSX at a stable URL; reference implementation (`datasets/gold-prices`) already demonstrates the parse pattern.
4. **Westmetall LME scrape** — one HTML page serves both #88 (Aluminum price) and #90 (Copper warehouse stocks).
5. **CME settlements** (#77, #91) — public HTML/XLS; the `je-suis-tm/web-scraping` repo provides reference parsers.

**EIA API shared-infrastructure note.** Three indicators (#80, #81, #82) pull from `api.eia.gov/v2/...` with one shared free API key. The v2 base accepts multi-series facet arrays so #80's three spot prices fetch in a single HTTP call. Rate limits are generous (~9k req/hr sustained, 5/sec burst); the dashboard's daily cron is two orders of magnitude under that. Register once at `eia.gov/opendata/register.php`. Note the v2 cap: 5,000 rows per response, fine for our cadence.

**Stooq ticker mapping (verified live 2026-05-11/12 unless noted):**

| Spec # | Indicator | Stooq ticker (lowercase URL) | Notes |
|---|---|---|---|
| 84 | Copper futures | `hg.f` | COMEX, ¢/lb. Verified 647.30. |
| 84/86 | Gold futures | `gc.f` | COMEX, $/oz. |
| 86 | Silver futures | `si.f` | COMEX, $/oz. (Inferred — not directly tested this session; pattern matches PL.F/PA.F.) |
| 87 | Platinum futures | `pl.f` | NYMEX, $/oz. Verified $2,114.65. |
| 87 | Palladium futures | `pa.f` | NYMEX, $/oz. Verified $1,516.75. |
| 88 | Aluminum futures | `0dl.f` | Alternate Stooq namespace; LME-equivalent. Verify liquidity before relying. |
| 89 | Uranium proxy | `sruuf.us` | Sprott Physical Uranium Trust OTC. Resolved via redirect from `sruuf`. |
| 92 | Wheat futures | `zw.f` | CBOT SRW, ¢/bu. Verified 642.10. |
| 93 | Corn futures | `zc.f` | CBOT, ¢/bu. |
| 93 | Soybeans futures | `zs.f` | CBOT, ¢/bu. |
| 94 | Sugar futures | `sb.f` | ICE #11, ¢/lb. Verified 14.91. |
| 94 | Coffee futures | `kc.f` | ICE, ¢/lb. Verified 282.30. |
| 94 | Cocoa futures | `cc.f` | ICE, $/mt. Verified $4,709.00. |
| — | Crude oil (front-month, for context) | `cl.f` | NYMEX, $/bbl. Front-month only — does NOT solve #77 spread. |
| — | Heating oil (for #80 cross-check) | `ho.f` | NYMEX ULSD, $/gal. |
| — | Natural gas Henry Hub | `ng.f` | NYMEX, $/mmbtu. |

**Genuinely blocked / scrape-only (no API exists):**

- **#79 TTF** — must scrape ICE Endex product page; no Stooq ticker, no free API.
- **#82 OPEC+ Spare Capacity** — EIA STEO solves the dashboard need but the literal IEA OMR / OPEC MOMR PDFs have no free API; STEO is the workaround, not a direct quote of the originally specified source.
- **#88 Aluminum** and **#90 LME Stocks** — westmetall HTML scrape; LME has no free formal API.
- **#91 COMEX Gold Deliveries** — XLS direct download works but is technically a static-file pull, not an API.
- **#96 Baltic Dry Index** — Baltic Exchange paywalls; only scrapes available (HandyBulk, Trading Economics, Investing.com — all anti-bot risk).
- **#97 Drewry WCI / SCFI** — both pure weekly HTML scrapes; no free APIs anywhere.

**No PAID-only blockers.** Every indicator in this family has a free path, though five require scrape-fragility tolerance. The cluster of three CME/LME/Shipping scrapes (#77, #91, #96, #97 plus westmetall #88/#90) is the weakest link — any one of those source sites redesigning the page breaks that indicator until the scraper is patched.
