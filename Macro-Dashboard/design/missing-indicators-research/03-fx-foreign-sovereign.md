# Missing Indicators Research: FX & Foreign Sovereign (Family 03)

## Family Overview

This family contains 16 indicators split between FX (46-53) and foreign sovereign yields (54-61). The core obstacle is **FRED frequency mismatch**: FRED's OECD long-term yield series (`IRLTLT01JPM156N`, `IRLTLT01DEM156N`, `IRLTLT01GBM156N`, `IRLTLT01ITM156N`, `IRLTLT01FRM156N`) are all monthly, but the dashboard scores daily. To get daily JGB/Bund/Gilt/BTP/OAT/CGB yields we have to leave FRED. The good news: every G10 sovereign except China publishes its own daily reference yield through a national DMO or central bank, and most expose either a direct CSV URL (MoF Japan, UK DMO) or an SDMX REST API (Bundesbank, Banque de France, ECB). The bad news: two pure cross-currency basis indicators (49, 50) and the EM Sovereign CDS basket (61) are genuinely Bloomberg-only; we either accept proxies or downgrade signal weight. The Stooq route handles "I just need a yield number" for everything in one fetcher if SDMX glue feels heavy.

---

## #46. USD/CNY vs PBOC Fix Divergence (Signal: 7/10)
- **Source**: PBOC daily fix page `https://www.pbc.gov.cn/en/3688229/3688338/3688341/index.html` plus Yahoo `CNH=X` (offshore) and FRED `DEXCHUS` (onshore, daily)
- **Free API**: partial — PBOC publishes the fix at ~9:15 Beijing time as a daily HTML announcement (one URL per day, no JSON); FRED `DEXCHUS` is JSON via api.stlouisfed.org; Yahoo `CNH=X` via yfinance
- **OSS tool**: yfinance (`ranaroussi/yfinance`) for CNH; no clean PBOC-fix scraper found in OSS, but the announcement page is plain HTML (no JS render needed)
- **Cadence**: daily (one fix per trading day, 9:15 CST)
- **Data shape**: PBOC HTML table with currency/value rows; FRED JSON `observations[].date,value`; Yahoo JSON OHLC
- **Complexity**: M — three-source compose with a brittle HTML scrape on PBOC side
- **Free-tier verdict**: FREE
- **Best path**: Fetch FRED `DEXCHUS` for the PBOC-ish onshore reference, fetch Yahoo `CNH=X` for offshore spot, compute `divergence = CNH - 1/DEXCHUS`. Skip the actual PBOC HTML scrape for v1; `DEXCHUS` is the Fed's mirror of the onshore fix and is daily JSON.

---

## #47. EUR/CHF (Signal: 6/10)
- **Source**: Yahoo Finance `EURCHF=X`
- **Free API**: yes (`https://query1.finance.yahoo.com/v7/finance/download/EURCHF=X` or yfinance lib)
- **OSS tool**: `ranaroussi/yfinance` (very active, weekly commits)
- **Cadence**: live (15-min delayed via Yahoo); daily close is reliable
- **Data shape**: JSON OHLCV with `timestamp`, `close`
- **Complexity**: S — single Yahoo call
- **Free-tier verdict**: FREE
- **Best path**: Add `EURCHF=X` to the existing Yahoo fetcher; pull daily close.

---

## #48. EUR/USD (Signal: 5/10)
- **Source**: FRED `DEXUSEU`
- **Free API**: yes (`https://api.stlouisfed.org/fred/series/observations?series_id=DEXUSEU&api_key=...&file_type=json`)
- **OSS tool**: existing FRED fetcher in dashboard; `DannyBen/fredric` if reference needed
- **Cadence**: daily (Fed H.10 release)
- **Data shape**: JSON `observations[].date,value`
- **Complexity**: S — one new series ID in current FRED fetcher
- **Free-tier verdict**: FREE-KEY (FRED key already in use)
- **Best path**: Add `DEXUSEU` to the FRED series list. Done.

---

## #49. 3M EUR-USD Cross-Currency Basis (Signal: 9/10)
- **Source**: Bloomberg `EUBS3` is the canonical series. Free proxy: CME publishes a daily EUR/USD Cross Currency Basis Index (CBA), but their API is not documented public. Best free proxy: NY Fed central-bank swap-line drawn balances (FRED `SWPT`) which spike when USD funding is scarce — same signal direction as basis widening
- **Free API**: no for the actual basis; proxy via FRED `SWPT` is yes
- **OSS tool**: none found for direct basis; FRED for proxy
- **Cadence**: basis is daily; FRED swap-line proxy is weekly (H.4.1)
- **Data shape**: FRED JSON
- **Complexity**: L — building a real proxy requires computing CIP deviation from spot, 3M forward, and USD/EUR OIS rates; all three are individually free but you're rebuilding a Bloomberg field
- **Free-tier verdict**: PROXY
- **Best path**: V1 ship FRED `SWPT` as a coarse dollar-funding-stress proxy and label clearly. V2: compute CIP from FRED `DEXUSEU` spot + ECB 3M forward + ESTR/SOFR 3M OIS — methodology in BIS Sushko (2017). Don't promise true EUBS3 fidelity.

---

## #50. 3M JPY-USD Cross-Currency Basis (Signal: 9/10)
- **Source**: Bloomberg `JYBS3`. Free proxy path identical to #49 but for JPY: spot `DEXJPUS` + JPY 3M forward + TONA/SOFR 3M OIS
- **Free API**: no for direct; yes for compute inputs (all FRED)
- **OSS tool**: none found
- **Cadence**: daily once computed
- **Data shape**: derived scalar
- **Complexity**: L — same as #49
- **Free-tier verdict**: PROXY
- **Best path**: V1 share #49's `SWPT` proxy (Fed swap drawings cover both EUR and JPY ECB/BoJ counterparties). V2 compute. The JPY basis was the worst-deviating pair in 2024-25 per BIS, so this is the higher-priority proxy of the two; consider down-weighting signal to 6 if shipping `SWPT` only.

---

## #51. JPY Carry Health Indicator (Signal: 9/10)
- **Source**: compute from (a) USD/JPY 3M implied vol [proxy: CBOE `JYVIX` or Yahoo `USDJPY=X` realized vol], (b) US-Japan 10Y yield spread (FRED `DGS10` minus MoF JGB 10Y daily), (c) US-Japan 2Y spread (FRED `DGS2` minus MoF JGB 2Y daily)
- **Free API**: yes — every input is free (FRED + MoF CSV + Yahoo)
- **OSS tool**: none packaged; BIS Bulletin No. 90 (Aug 2024 carry unwind) documents the spread+vol diagnostic
- **Cadence**: daily
- **Data shape**: composite score
- **Complexity**: M — three inputs already added by other indicators, plus a weighting function
- **Free-tier verdict**: FREE
- **Best path**: Build a weighted composite once #54 (JGB 10Y daily via MoF CSV) lands. Methodology: `score = w1 * (US-JP 10Y spread, normalized) + w2 * (US-JP 2Y spread, normalized) - w3 * (USDJPY 1M realized vol, normalized)`. Source the weighting from BIS Bulletin 90 / AMRO 2024 Analytical Note on yen carry.

---

## #52. China FX Reserves (Signal: 6/10)
- **Source**: SAFE.gov.cn monthly release (`https://www.safe.gov.cn/en/ForeignExchangeReserves/index.html`)
- **Free API**: partial — SAFE publishes a monthly HTML page + downloadable Excel; no JSON. FRED mirrors as `TRESEGCNM052N` (China total reserves excl gold) — monthly, JSON, already in your fetcher
- **OSS tool**: no dedicated SAFE scraper found in OSS; FRED proxy avoids the scrape entirely
- **Cadence**: monthly (released ~7th of following month)
- **Data shape**: FRED JSON `observations[].value`
- **Complexity**: S
- **Free-tier verdict**: FREE-KEY
- **Best path**: Use FRED `TRESEGCNM052N` — same source data as SAFE, no scraping, already in your auth/fetcher path.

---

## #53. COFER USD Reserve Share (Signal: 5/10)
- **Source**: IMF COFER dataset at `data.imf.org`
- **Free API**: yes — SDMX 2.1 REST at `https://sdmxcentral.imf.org/ws/public/sdmxapi/rest/data/IMF.STA,COFER,1.0/...` or legacy CompactData at `http://dataservices.imf.org/REST/SDMX_XML.svc/CompactData/COFER/...`
- **OSS tool**: `sdmx1` Python lib (very active) handles IMF SDMX endpoints; also DBnomics mirror at `db.nomics.world/IMF/COFER` exposes a simpler REST JSON wrapper
- **Cadence**: quarterly, one-quarter lag
- **Data shape**: SDMX-ML XML or SDMX-JSON; key fields are reference area "world", currency dimension "USD", time period quarter
- **Complexity**: M — SDMX is annoying first time, trivial after
- **Free-tier verdict**: FREE
- **Best path**: Use DBnomics JSON wrapper for v1 (`https://api.db.nomics.world/v22/series/IMF/COFER/...`) — sidesteps SDMX. Quarterly cadence means we score this 4x/year and hold the value between releases.

---

## #54. JGB 10Y (Signal: 10/10)
- **Source**: MoF Japan direct CSV `https://www.mof.go.jp/english/policy/jgbs/reference/interest_rate/jgbcme.csv` (recent) and `https://www.mof.go.jp/english/policy/jgbs/reference/interest_rate/historical/jgbcme_all.csv` (full history)
- **Free API**: yes — plain CSV over HTTPS, no key, no JS render needed (curl-friendly)
- **OSS tool**: `masadir/jp-rates-inflation` dataset wraps this; not strictly needed
- **Cadence**: daily, posted ~6pm JST
- **Data shape**: CSV with columns Date, 1Y, 2Y, 5Y, 10Y, 20Y, 30Y, 40Y
- **Complexity**: S
- **Free-tier verdict**: FREE
- **Best path**: Add a tiny MoF-CSV fetcher; parse the `10Y` column. **This is the cleanest foreign sovereign source in the family.**

---

## #55. Bund 10Y (Signal: 6/10)
- **Source**: Bundesbank SDMX REST API at `https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZAR.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A` (daily 10Y Bund yield curve point)
- **Free API**: yes — no key required; SDMX-CSV and SDMX-JSON both supported via Accept header
- **OSS tool**: `m-muecke/bbk` R client (active, Oct 2025); for Python use `sdmx1`
- **Cadence**: daily
- **Data shape**: SDMX-CSV with TIME_PERIOD, OBS_VALUE
- **Complexity**: M (first-time SDMX); S if reused
- **Free-tier verdict**: FREE
- **Best path**: SDMX-CSV with `?format=csv` query param — keeps the fetcher curl-shaped. Stooq `10dey.b` is the lazier fallback (single-URL CSV) but Bundesbank is authoritative.

---

## #56. UK Gilt 10Y (Signal: 9/10)
- **Source**: UK DMO direct CSV `https://www.dmo.gov.uk/data/ExportReport?reportCode=D4H`
- **Free API**: yes — single GET returns CSV of historical average daily conventional gilt yields by benchmark maturity; no key, no JS
- **OSS tool**: none needed — the URL is the API
- **Cadence**: daily updates, file refreshes T+1
- **Data shape**: CSV with date and yield-per-maturity columns; 10Y benchmark column is the target
- **Complexity**: S
- **Free-tier verdict**: FREE
- **Best path**: Add DMO CSV fetcher. Bank of England yield-curve page also publishes spreadsheets but they're awkward (multi-tab .xlsx); DMO CSV is the win.

---

## #57. BTP-Bund 10Y Spread (Signal: 8/10)
- **Source**: compute = (Italy 10Y BTP yield) - (Germany 10Y Bund yield)
- **Free API**: yes (derived)
- **OSS tool**: n/a
- **Cadence**: daily
- **Data shape**: derived scalar in bps
- **Complexity**: S (once #55 and #59 are in)
- **Free-tier verdict**: FREE
- **Best path**: After #55 and #59 land, compute `(BTP_10Y - Bund_10Y) * 100` for bps. Borsa Italiana publishes the spread directly at `borsaitaliana.it/obbligazioni/spread/italia/btp-bund.en.htm` but it requires HTML scraping — computing locally is cleaner.

---

## #58. OAT-Bund 10Y Spread (Signal: 9/10)
- **Source**: compute = (France 10Y OAT yield) - (Germany 10Y Bund yield)
- **Free API**: yes (derived)
- **OSS tool**: n/a
- **Cadence**: daily
- **Data shape**: derived scalar in bps
- **Complexity**: S (once #55 and OAT source land)
- **Free-tier verdict**: FREE
- **Best path**: Pull OAT 10Y from Banque de France Webstat SDMX (same flow style as Bundesbank — `webstat.banque-france.fr/api/v1/...`) or Stooq `10fry.b`. Compute spread vs Bund. Higher signal than BTP-Bund because OAT-Bund is the cleaner sovereign-stress read in EZ post-2024.

---

## #59. Italy 10Y BTP (Signal: 6/10)
- **Source**: Stooq `10ity.b` daily CSV `https://stooq.com/q/d/l/?s=10ity.b&i=d` OR investpy via Investing.com
- **Free API**: yes — Stooq returns plain CSV over HTTPS, no key, no JS, curl-friendly
- **OSS tool**: `alvarobartt/investpy` exists but is no longer actively maintained (last release Oct 2022) and Investing.com blocks scraping aggressively. Stooq is the better path.
- **Cadence**: daily (Stooq updates EOD)
- **Data shape**: CSV `Date,Open,High,Low,Close,Volume` — Close is the yield
- **Complexity**: S
- **Free-tier verdict**: FREE
- **Best path**: Add Stooq fetcher with `10ity.b` ticker. The Italian central bank does not publish a clean public daily BTP yield CSV, and ECB euro-area yield curves require multi-step extraction; Stooq is pragmatic.

---

## #60. China 10Y CGB (Signal: 7/10)
- **Source**: ChinaBond `yield.chinabond.com.cn/cbweb-pbc-web/pbc/historyQuery` — but this is a JS-rendered SPA, hostile to curl. Better: Stooq `10cny.b` daily CSV; secondary: Investing.com via investpy (fragile)
- **Free API**: ChinaBond official site is partial (JS render required, breaks curl-based fetcher); Stooq mirror is yes
- **OSS tool**: no clean OSS ChinaBond scraper. investpy supports it but unmaintained
- **Cadence**: daily, updated ~17:30 Beijing
- **Data shape**: Stooq CSV
- **Complexity**: S via Stooq; XL if forced to scrape ChinaBond directly (would need headless Chrome — blocks current curl architecture)
- **Free-tier verdict**: FREE
- **Best path**: Use Stooq `10cny.b`. **Flag**: lone source dependency — if Stooq breaks the CGB ticker, fallback is investpy or accepting weekly cadence from a CEIC free-tier widget. Do not attempt direct ChinaBond scrape with current fetcher.

---

## #61. EM Sovereign CDS Basket (Signal: 6/10)
- **Source**: true CDS data is paid (Markit/Bloomberg). Free proxies: (a) iShares `EMB` ETF price/yield (tracks JPM EMBI Global Core) via Yahoo, (b) `EMHY` for high-yield EM slice, (c) JPM EMBI Global Spread is published in some Fed papers but not a maintained free feed
- **Free API**: yes for ETF proxies (Yahoo `EMB`, `EMHY`)
- **OSS tool**: yfinance
- **Cadence**: live for ETFs
- **Data shape**: Yahoo JSON OHLC; signal is `-1 * pct_change(EMB)` (ETF price down = spreads wider = stress up)
- **Complexity**: S
- **Free-tier verdict**: PROXY
- **Best path**: Use `EMB` daily return as inverse CDS proxy. Document the limitation: ETF moves blend rate duration + spread, so this proxy contaminates the signal during US-rate moves. Consider down-weighting signal from 6 to 4 until a real CDS feed is available, or pairing `EMB` with `IEF` (US 7-10Y Treasury ETF) and using the spread between them to isolate the credit component.

---

## Family Summary

**Top 3 free wins:**
1. **#54 JGB 10Y** — MoF direct CSV at `mof.go.jp/english/policy/jgbs/reference/interest_rate/jgbcme.csv`. Signal 10/10, complexity S, no key, no JS. Highest ROI in the family.
2. **#56 UK Gilt 10Y** — DMO direct CSV at `dmo.gov.uk/data/ExportReport?reportCode=D4H`. Signal 9/10, complexity S.
3. **#51 JPY Carry Health** — Once #54 lands, this composite is purely compute using existing FRED `DGS10`/`DGS2` plus MoF JGB plus Yahoo `USDJPY=X`. Signal 9/10, complexity M, zero new auth.

**Paid-only items (ship proxy or skip):**
- **#49 EUR-USD 3M basis** — proxy via FRED `SWPT` swap-line drawings; not equivalent, label as such
- **#50 JPY-USD 3M basis** — same proxy path; this one matters more (BIS flagged JPY basis as worst-deviating); down-weight signal
- **#61 EM Sovereign CDS** — `EMB` ETF return as proxy; contaminated by US rate duration

**Foreign-sovereign-daily-source recommendation:**
There is no single source for all five foreign sovereigns (JGB, Bund, Gilt, BTP, OAT, CGB) — but **Stooq** comes closest. Stooq has daily CSV at `stooq.com/q/d/l/?s={ticker}&i=d` for `10jpy.b`, `10dey.b`, `10uky.b`, `10ity.b`, `10fry.b`, `10cny.b` — single-fetcher, no key, no JS, curl-friendly, EOD cadence. **Recommendation: build one Stooq fetcher for all six foreign sovereigns as a first pass**, then upgrade JGB to MoF-CSV (authoritative for the 10/10-signal indicator) and Bund/OAT to SDMX (authoritative + better lineage for EZ spreads in #57/#58) in a second pass. CGB stays on Stooq because the official ChinaBond site is JS-rendered and incompatible with the curl-based fetcher.

**Blocking item:**
ChinaBond's official portal requires JS rendering, which the current fetcher architecture (curl-based) cannot do without adding a headless Chrome dependency — a meaningful infrastructure escalation. Stooq mirror works fine for `10cny.b`, but it's a single point of failure. If Stooq ever stops carrying CGB, indicator #60 becomes XL complexity overnight.

**Reference OSS pattern note:**
`mvanhorn/cli-printing-press` (the user's reference) generates CLIs with SQLite caching, full-text search, and dual CLI+MCP interfaces. For a dashboard-only use case we don't need MCP, but the **SQLite persistence layer** pattern is worth borrowing for the foreign-sovereign fetcher: cache MoF/DMO/Stooq daily CSVs locally so a single network blip doesn't blank the dashboard — these sources don't have FRED's uptime.
