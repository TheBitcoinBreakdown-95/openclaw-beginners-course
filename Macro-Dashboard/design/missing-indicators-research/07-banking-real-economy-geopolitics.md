# Banking + Real Economy + Geopolitics — Free-Data Feasibility Research

**Family overview.** Twenty-one indicators across three loosely-coupled families: H.8 banking-system aggregates (#113-119), real-economy survey/sentiment/fiscal data (#122-130), and geopolitical cross-border flows (#148-153). This is the highest-yield family in the spec — at least 13 indicators are recoverable directly from FRED with verified series IDs, and another 5 sit on free government APIs (Treasury fiscaldata.treasury.gov, ticdata.treasury.gov, HK Census, OFAC). The shared infrastructure win is enormous: a single FRED fetcher already in the dashboard covers most of #113-#130, and Treasury fiscaldata.treasury.gov is a documented JSON/CSV API covering MTS deficit, MSPD debt, auctions, and DTS — four indicators on one client. Only two items are genuinely paid/qualitative: ISM PMI live monthly readings (proprietary since 2016 FRED purge) and Saudi-China oil-in-CNY (news scrape, not numeric). One spec correction surfaced: #113 is mis-coded as `RREACBM027SBOG` (Residential RE) — for CRE the correct series is `CREACBM027SBOG`.

---

## #113. H.8 CRE Loans (Signal: 7/10)
- **Source**: Federal Reserve H.8 release via FRED; correct series ID is `CREACBM027SBOG` (Commercial Real Estate Loans, All Commercial Banks, monthly SA), not `RREACBM027SBOG` as the spec lists — that ID is the Residential RE series. Weekly companion is `CREACBW027SBOG`.
- **Free API**: yes — FRED API (`https://api.stlouisfed.org/fred/series/observations?series_id=CREACBM027SBOG`), JSON, free with key
- **OSS tool**: [mortada/fredapi](https://github.com/mortada/fredapi) (Python, active, the canonical wrapper)
- **Cadence**: monthly (weekly available)
- **Data shape**: JSON `{observations:[{date,value}]}`; billions USD SA
- **Complexity**: S
- **Free-tier verdict**: FREE-KEY
- **Best path**: Reuse the existing FRED fetcher with corrected ID `CREACBM027SBOG`. Track YoY growth and 13-week rate-of-change; CRE stress shows up as deceleration well before charge-offs. Flag the spec error in the issue tracker so #113 doesn't ship pointing at residential.

---

## #114. H.8 Consumer Loans (Signal: 6/10)
- **Source**: Federal Reserve H.8 via FRED; series `CONSUMER` (Consumer Loans, All Commercial Banks, monthly SA, billions USD)
- **Free API**: yes — FRED API endpoint above with `series_id=CONSUMER`
- **OSS tool**: [mortada/fredapi](https://github.com/mortada/fredapi)
- **Cadence**: monthly (weekly companion `CLSACBW027SBOG`)
- **Data shape**: JSON observations
- **Complexity**: S
- **Free-tier verdict**: FREE-KEY
- **Best path**: Existing FRED fetcher. Pair the level with `CCLACBM027SBOG` (credit cards subcomponent) for an early-stress disaggregation — credit card growth decelerates first when consumers tap out. Score on rolling 6m delta versus pre-COVID baseline.

---

## #116. Money Market Fund AUM (Signal: 6/10)
- **Source**: ICI weekly release (`https://www.ici.org/research/stats/mmfassets`); FRED has a quarterly mirror (`MMMFFAQ027S`, Z.1 release)
- **Free API**: partial — ICI publishes HTML page with last 20 weeks (no documented CSV API); FRED quarterly is full API
- **OSS tool**: none ICI-specific; Nasdaq Data Link has the `ICI2` database but requires sign-in
- **Cadence**: weekly (ICI) / quarterly (FRED Z.1)
- **Data shape**: ICI HTML table (`Total Assets`, `Government`, `Prime`, `Tax-Exempt`); FRED JSON observations
- **Complexity**: M (ICI scrape) / S (FRED)
- **Free-tier verdict**: FREE (scrape) + FREE-KEY (FRED proxy)
- **Best path**: Two-tier. Primary: ship `MMMFFAQ027S` via FRED for the quarterly baseline (covers the L1-L5 regime question). Secondary: a thin weekly HTML parser on the ICI page (~5 numeric columns, table is stable) for high-frequency stress detection (deposit-flight-to-MMF spikes). The ICI page has been structurally identical for years; a 30-line scraper is the right tool here, not a full client.

---

## #117. FHLB Advances Outstanding (Signal: 8/10)
- **Source**: FHLBanks Office of Finance (`https://www.fhlb-of.com/`); Combined Financial Reports quarterly as PDF
- **Free API**: no — quarterly PDF only; no CSV/XML feed, no weekly publication despite spec claim
- **OSS tool**: none found
- **Cadence**: quarterly (PDF)
- **Data shape**: PDF tables (Combined Statement of Condition → "Advances" line item)
- **Complexity**: L
- **Free-tier verdict**: PROXY
- **Best path**: Spec is optimistic — Office of Finance does not publish weekly advances data publicly. Use FRED `BOGZ1FL403169005Q` (FHLB Advances from Z.1, quarterly) as the primary signal; it's the same number the OF reports, sourced from the call reports. For higher-frequency stress detection, the discount window proxy already shipped in Session 75 captures the same "banks scrambling for liquidity" signal one step downstream. Skip the PDF parser unless quarterly resolution proves inadequate.

---

## #118. KBW Regional Bank Index (KRX) (Signal: 7/10)
- **Source**: Nasdaq (`https://indexes.nasdaqomx.com/Index/Overview/KRX`); spot quote at CNBC/Google Finance; historicals at Stooq/Yahoo
- **Free API**: no for the official index — Yahoo blocked per dashboard constraints; Stooq does not carry `^KRX`. Use KRE ETF (Yahoo blocked; Stooq has `KRE.US` daily OHLC free)
- **OSS tool**: existing Stooq fetcher in dashboard
- **Cadence**: daily
- **Data shape**: Stooq CSV `Date,Open,High,Low,Close,Volume` for KRE.US
- **Complexity**: S
- **Free-tier verdict**: PROXY
- **Best path**: Use SPDR S&P Regional Banking ETF (`KRE`) NAV via Stooq as the KRX proxy. KRE tracks the S&P Regional Banks Select Industry Index, which is highly correlated to KBW KRX (>0.95 daily returns over rolling year) — both are regional-bank baskets with overlapping constituents. Yahoo would be cleaner for `^KRX` directly but is egress-blocked. Stooq URL pattern: `https://stooq.com/q/d/l/?s=kre.us&i=d`.

---

## #119. KRX / KBW Nasdaq Bank Ratio (Signal: 7/10)
- **Source**: Compute from #118 (KRE proxy) and a large-bank proxy — KBWB ETF (Invesco KBW Bank ETF, tracks KBW Nasdaq Bank Index) via Stooq `kbwb.us`
- **Free API**: no native — derived series; both legs free via Stooq
- **OSS tool**: existing Stooq fetcher; computation in dashboard
- **Cadence**: daily
- **Data shape**: Two Stooq CSVs, ratio computed dashboard-side
- **Complexity**: S
- **Free-tier verdict**: FREE
- **Best path**: Compute `KRE.US / KBWB.US` daily-close ratio. Falling ratio = regionals underperforming megabanks = textbook regional-bank stress signal (SVB-era spike was the canonical case). Pair with the H.8 CRE delta from #113 for confirmation. No new fetcher work — both legs are existing Stooq calls.

---

## #122. JOLTS Quits Rate (Signal: 7/10)
- **Source**: BLS JOLTS via FRED; series `JTSQUR` (Quits Rate, Total Nonfarm, monthly SA, percent) — confirmed valid
- **Free API**: yes — FRED API
- **OSS tool**: [mortada/fredapi](https://github.com/mortada/fredapi)
- **Cadence**: monthly
- **Data shape**: JSON observations, percent
- **Complexity**: S
- **Free-tier verdict**: FREE-KEY
- **Best path**: Existing FRED fetcher with `JTSQUR`. Score on YoY delta and level — quits rate falling below 2.0% (long-run average) signals labor-market loosening and consumer stress; spikes above 3.0% mark "great resignation" overheating. Pair with `JTSJOL` (job openings) for confirmation if richer signal needed later.

---

## #123. ISM Manufacturing PMI (Signal: 8/10)
- **Source**: Institute for Supply Management (`https://www.ismworld.org/`); FRED purged all ISM series on 2016-06-24 per ISM licensing
- **Free API**: no — ISM publishes monthly headline number on its press release page (HTML, free to read), full report and history paywalled (~$200/mo subscription)
- **OSS tool**: none found that scrapes ISM reliably (ISM actively discourages it)
- **Cadence**: monthly
- **Data shape**: HTML press release page; the headline composite is a single number on release day
- **Complexity**: M
- **Free-tier verdict**: PROXY
- **Best path**: ISM is the rare case where FRED genuinely lost the data. Two viable routes: (a) scrape the ISM press release page first business day of each month for the headline composite — page structure is stable, signal is one number; (b) use Federal Reserve Bank regional manufacturing surveys as a composite proxy — Philly Fed (`MANEMP` via FRED), Empire State, Dallas, Richmond, KC — these aggregate into a reliable PMI nowcast (correlation >0.85). The regional-survey composite is the lower-risk path and reuses FRED fetcher; the ISM scrape is monthly toil with one-day-of-data payoff.

---

## #124. ISM Services PMI (Signal: 8/10)
- **Source**: Institute for Supply Management (Non-Manufacturing / Services Report on Business); same 2016 FRED purge applies
- **Free API**: no — same regime as #123
- **OSS tool**: none reliable
- **Cadence**: monthly
- **Data shape**: HTML press release
- **Complexity**: M
- **Free-tier verdict**: PROXY
- **Best path**: Same dual approach as #123. Scrape ISM Services press release for the monthly headline composite, OR use S&P Global US Services PMI flash (free preview on spglobal.com) as a faster proxy — S&P Global publishes a separate Services PMI with similar methodology and good correlation. If only one ISM is shipped, pick Services — it's higher-signal for late-cycle stress because services is now ~75% of GDP and slower-moving than manufacturing.

---

## #125. Conference Board LEI (Signal: 6/10)
- **Source**: The Conference Board (`https://www.conference-board.org/topics/us-leading-indicators/`); proprietary, monthly press release with one-line headline
- **Free API**: no — Conference Board paywalls full series; spec's pointer to FRED `USSLIND` is wrong (that's the Philly Fed state-level leading index, different methodology, only US-aggregate from a state-level model)
- **OSS tool**: none found
- **Cadence**: monthly
- **Data shape**: HTML press release headline; full data is subscription
- **Complexity**: M
- **Free-tier verdict**: PROXY
- **Best path**: Spec error — `USSLIND` is the Federal Reserve Bank of Philadelphia State Coincident/Leading Index (US aggregate from state models), NOT the Conference Board LEI. Two options: (a) ship `USSLIND` anyway as a leading-economy proxy and label it correctly — it's a legitimate leading indicator, just not the Conference Board's; (b) scrape the monthly Conference Board press release for the headline 6-month diffusion / index level. Option (a) is the right call — the Philly Fed series captures the same regime signal, is free and API-accessible, and the dashboard's L1-L5 scoring doesn't need the Conference Board's specific weighting.

---

## #126. U-Mich Consumer Sentiment (Signal: 5/10)
- **Source**: University of Michigan Surveys of Consumers via FRED; series `UMCSENT` (Index 1966Q1=100, monthly NSA) — confirmed valid, delayed one month at source request
- **Free API**: yes — FRED API
- **OSS tool**: [mortada/fredapi](https://github.com/mortada/fredapi)
- **Cadence**: monthly
- **Data shape**: JSON observations, index level
- **Complexity**: S
- **Free-tier verdict**: FREE-KEY
- **Best path**: Existing FRED fetcher with `UMCSENT`. For the current month (before the FRED one-month delay), the preliminary U-Mich number is published mid-month on the U-Mich Surveys of Consumers page — only scrape if intra-month latency matters; otherwise the FRED feed is sufficient. Score against rolling z-score; sub-60 readings have historically preceded recessions.

---

## #127. Retail Sales Control Group (Signal: 6/10)
- **Source**: Census Bureau Advance Monthly Retail Trade Survey; the spec's "variant of RSXFS" pointer is partly correct — `RSXFS` is Retail Trade ex food services, while the formal "control group" used in GDP nowcasting is Retail Trade ex motor vehicles, gasoline, building materials, and food services. The closest single FRED series is `RSFSXMV` (Retail Sales ex Motor Vehicle and Parts), with `RSXFS` as a simpler alternative.
- **Free API**: yes — FRED API
- **OSS tool**: [mortada/fredapi](https://github.com/mortada/fredapi)
- **Cadence**: monthly
- **Data shape**: JSON observations, millions USD SA
- **Complexity**: S
- **Free-tier verdict**: FREE-KEY
- **Best path**: Ship `RSFSXMV` as the primary (closest to the GDP control group that markets actually trade off of) and `RSXFS` as a secondary level. The true Atlanta Fed GDPNow control-group construction is multi-component and not a single FRED series — but `RSFSXMV` captures the same signal direction with one API call. Score on rolling 3m annualized growth.

---

## #128. Treasury Net Issuance (Signal: 8/10)
- **Source**: Treasury TBAC quarterly refunding statement (`https://home.treasury.gov/policy-issues/financing-the-government/quarterly-refunding`); higher-frequency data via Treasury Securities Auctions dataset on fiscaldata.treasury.gov
- **Free API**: yes — fiscaldata.treasury.gov API (`https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v1/accounting/od/securities_auctions`), JSON/CSV/XML, no key required
- **OSS tool**: [veridelisi/U.S.-Treasury-Fiscal-Data](https://github.com/veridelisi/U.S.-Treasury-Fiscal-Data) (Python examples, lightly maintained); the API is simple enough to call directly
- **Cadence**: per-auction (daily-ish) for raw issuance; quarterly for TBAC narrative
- **Data shape**: JSON `{data:[{record_date, security_type, issue_date, total_accepted, ...}]}`
- **Complexity**: M
- **Free-tier verdict**: FREE
- **Best path**: Build a thin fiscaldata client (no key needed, generous rate limits) and compute net issuance = (gross issuance) − (maturities) on rolling 4-week basis from the auctions endpoint. The TBAC quarterly refunding statement gives the forward-looking narrative but the auctions API gives the realized number daily. Pair with `MSPD` (Monthly Statement of Public Debt) for cross-check. This single fetcher unlocks #128, #129 (debt-service), and #130 (deficit) — the highest-leverage infrastructure investment in this family.

---

## #129. Federal Interest Expense (TTM) (Signal: 7/10)
- **Source**: BEA via FRED; series `A091RC1Q027SBEA` (Federal current expenditures: Interest payments, quarterly NSA, millions USD) — confirmed valid; alternative is Treasury fiscaldata "Interest Expense on Public Debt Outstanding"
- **Free API**: yes — FRED API for BEA series; also fiscaldata.treasury.gov interest-expense endpoint
- **OSS tool**: [mortada/fredapi](https://github.com/mortada/fredapi)
- **Cadence**: quarterly (BEA) / monthly (Treasury fiscaldata)
- **Data shape**: JSON observations
- **Complexity**: S
- **Free-tier verdict**: FREE-KEY (FRED) / FREE (fiscaldata)
- **Best path**: Use FRED `A091RC1Q027SBEA` for quarterly TTM via rolling 4-quarter sum. If monthly resolution is wanted, the fiscaldata.treasury.gov `interest-expense-on-the-public-debt-outstanding` endpoint provides month-by-month CUSIP-level interest paid — but the quarterly BEA series is the right primary because it includes interest on intragovernmental holdings (Social Security trust fund etc.) which the Treasury figure excludes. Score as % of federal receipts to capture true fiscal pressure.

---

## #130. Deficit % GDP (Signal: 7/10)
- **Source**: CBO Monthly Budget Review for the current-fiscal-year deficit; Treasury MTS (Monthly Treasury Statement) for the official monthly deficit figure via fiscaldata.treasury.gov; GDP denominator via FRED `GDP`
- **Free API**: yes — fiscaldata.treasury.gov MTS endpoint (`/v1/accounting/mts/mts_table_5`) free, no key
- **OSS tool**: CBO publishes some files via GitHub but no first-party API; reuse the fiscaldata client from #128
- **Cadence**: monthly (MTS) / quarterly (GDP)
- **Data shape**: JSON observations from MTS; CBO publishes PDF + Excel supplements
- **Complexity**: M
- **Free-tier verdict**: FREE
- **Best path**: Compute from two free APIs: (a) rolling-12-month deficit from fiscaldata MTS, (b) annualized GDP from FRED `GDP` (or `GDPC1` real). Skip the CBO Monthly Budget Review except as a sanity-check reference — MTS is the authoritative source and is API-accessible. This piggybacks on the fiscaldata client built for #128, so the marginal cost is one extra endpoint call.

---

## #148. TIC China UST Holdings (Signal: 7/10)
- **Source**: Treasury International Capital (TIC) system, "Major Foreign Holders of Treasury Securities" table; raw file at `https://ticdata.treasury.gov/Publish/mfh.txt`; historical CSV `mfhhis01.txt`
- **Free API**: partial — no JSON API, but stable plain-text URLs published monthly
- **OSS tool**: none found that's actively maintained; existing dashboard fetcher pattern (one URL, one parser) is sufficient
- **Cadence**: monthly (~6 week lag)
- **Data shape**: tab/comma-delimited text, country rows by month, billions USD
- **Complexity**: S
- **Free-tier verdict**: FREE
- **Best path**: HTTP GET on `ticdata.treasury.gov/Publish/mfhhis01.txt`, parse the China row. The file is updated monthly on a predictable schedule (TIC release date is announced on Treasury's calendar). Score on level + 6m delta — China's holdings have been in secular decline since 2013; a sharp acceleration of selling is the actual stress signal, not the level. Skip any redirect through home.treasury.gov press releases — go to ticdata.treasury.gov directly.

---

## #149. TIC Japan UST Holdings (Signal: 6/10)
- **Source**: same TIC file as #148, Japan row
- **Free API**: same plain-text URL
- **OSS tool**: same fetcher as #148
- **Cadence**: monthly
- **Data shape**: same file, different row
- **Complexity**: S
- **Free-tier verdict**: FREE
- **Best path**: Same fetcher as #148, different row extraction. Japan is now the largest foreign holder (passed China in 2019); the relevant signal is BOJ-policy-linked rather than geopolitical — when JPY weakens severely, Japanese institutions sell UST to hedge or repatriate, which feeds back into UST yields. Implement as one fetcher emitting two indicators.

---

## #150. HK Gold Imports to China (Signal: 6/10)
- **Source**: Hong Kong Census and Statistics Department (`https://www.censtatd.gov.hk/`), External Merchandise Trade Statistics; gold = HS Chapter 71 subcategories
- **Free API**: partial — C&SD's Interactive Data Dissemination Service publishes monthly trade data as XLSX/CSV downloads; no documented REST API but stable URL patterns per release
- **OSS tool**: none found; CEIC aggregates but is paid
- **Cadence**: monthly (~5 week lag)
- **Data shape**: XLSX/PDF tables, gold exports/re-exports to Mainland China by month, HKD millions and kilograms
- **Complexity**: L
- **Free-tier verdict**: FREE
- **Best path**: This one is genuinely freely available but mechanically annoying — C&SD restructures table URLs occasionally and the gold-specific commodity code (HS 7108 for unwrought gold) requires drill-down on their Interactive Data portal. Build a monthly cron that pulls the External Merchandise Trade release XLSX, filters HS 7108 by destination = China. Lower-priority indicator — the signal (PBoC accumulation proxy) is partially captured by the Shanghai Gold Exchange withdrawal data which is easier to get. Defer until other indicators ship.

---

## #151. OFAC Sanctions Count (Signal: 5/10)
- **Source**: Treasury OFAC Sanctions List Service (`https://sanctionslist.ofac.treas.gov/`); SDN list daily XML/CSV; OpenSanctions aggregator at `https://www.opensanctions.org/datasets/us_ofac_sdn/`
- **Free API**: yes — OFAC publishes SDN.XML daily for free, no key; [OpenSanctions](https://www.opensanctions.org/api/) provides a free non-commercial API with cleaner JSON
- **OSS tool**: [moov-io/watchman](https://github.com/moov-io/watchman) (very active, Go-based sanctions screening service); [opensanctions/opensanctions](https://github.com/opensanctions/opensanctions) (the aggregator itself)
- **Cadence**: daily (OFAC publishes on designations)
- **Data shape**: XML (OFAC native) or JSON (OpenSanctions); count derivable from row count
- **Complexity**: M
- **Free-tier verdict**: FREE
- **Best path**: Use OpenSanctions' `us_ofac_sdn` dataset — they parse OFAC SDN.XML daily and expose a clean JSON download with consistent entity-count metadata. Daily cron pulls the dataset metadata blob (small, ~few KB), records count + delta. Castellum.AI's free sample is static (not updated) per their docs — skip it. Score on rate-of-additions over 30-day window, not absolute count (which only rises monotonically). The moov-io/watchman project is overkill unless screening logic is needed downstream.

---

## #152. CNY Share of SWIFT Settlements (Signal: 5/10)
- **Source**: SWIFT RMB Tracker / Global Currency Tracker — renamed Feb 2026 to "Global Currency Tracker" — monthly free PDF at `https://www.swift.com/products/renminbi-tracker/document-centre`
- **Free API**: no — PDF only; SWIFT does not expose machine-readable data
- **OSS tool**: none found; MacroMicro mirrors the series in a chart but doesn't expose CSV
- **Cadence**: monthly (~3 week lag)
- **Data shape**: PDF report with table of currency shares (Customer Initiated and Institutional Payments, % of value); CNY is typically the line of interest
- **Complexity**: L
- **Free-tier verdict**: FREE (with parser)
- **Best path**: PDF scraping with `pdfplumber` or `pypdf` against the monthly Global Currency Tracker. SWIFT's report structure is stable across releases — the "Top 20 currencies" table appears on a consistent page. URL pattern is `/swift-resource/{id}/download` with monotonically increasing IDs, but SWIFT also lists the latest on the document-centre page. Implement as a monthly cron job: scrape document-centre HTML for the latest tracker URL, download PDF, extract CNY row from the currencies table. Score the trend (CNY rising vs falling share) — level itself is a slow-moving structural number.

---

## #153. Saudi-China Oil in CNY (Signal: 5/10)
- **Source**: Reuters / Bloomberg / FT news coverage; no official statistical series exists for CNY-settled oil between Saudi Arabia and China
- **Free API**: no — this is qualitative; the closest free numeric proxy is Saudi crude exports to China (via JODI Oil database, free, monthly) but that doesn't tell you settlement currency
- **OSS tool**: none applicable
- **Cadence**: episodic (news events) / monthly (JODI)
- **Data shape**: news headlines (qualitative); JODI publishes XLSX
- **Complexity**: XL (genuinely qualitative)
- **Free-tier verdict**: PAID (for the actual numeric series) / FREE (for news scrape proxy)
- **Best path**: Per spec, mark this as a manual reference card, not a programmatic indicator. The L1-L5 scoring framework doesn't fit a qualitative news signal. If a numeric placeholder is wanted, ship "Saudi crude exports to China" from JODI Oil's free monthly database (`https://www.jodidata.org/oil/`) as a related-but-different indicator and flag the rename clearly — it captures the bilateral oil-flow dimension without the settlement-currency claim. Otherwise: dashboard note + manual update when news events occur. Lowest-priority of the 21.

---

## Family Summary

**Top 5 free wins (largest signal-per-effort, all FREE-KEY or FREE verdicts):**
1. **#113 H.8 CRE Loans** — single FRED call, but ship the corrected ID `CREACBM027SBOG` (spec lists residential by mistake). Signal 7/10, infrastructure already exists.
2. **#114 H.8 Consumer Loans** — same FRED fetcher, series `CONSUMER`. Drop-in addition.
3. **#122 JOLTS Quits Rate** — FRED `JTSQUR`, confirmed. Labor-market regime indicator.
4. **#128 Treasury Net Issuance** — fiscaldata.treasury.gov API, no key needed, unlocks #129 and #130 as bonus. Best leverage in the family.
5. **#148/#149 TIC China + Japan UST Holdings** — single fetcher, two indicators, plain-text URL at ticdata.treasury.gov.

**Shared infrastructure wins:**
- **FRED API** (existing fetcher) covers #113, #114, #122, #126, #127, #129 directly — six indicators on existing infrastructure with verified series IDs.
- **fiscaldata.treasury.gov** (new fetcher, no key, JSON/CSV) covers #128 (auctions), #129 secondary (interest-expense), #130 (MTS deficit) — three indicators on one client. Highest-leverage single new fetcher to build.
- **ticdata.treasury.gov plain-text** (single URL parser) covers #148 + #149 — two indicators on one parser.
- **Stooq existing fetcher** covers #118 (KRE) + #119 (KBWB), with the ratio computed dashboard-side.

**Paid-only / hardest items:**
- **#123 ISM Manufacturing PMI** and **#124 ISM Services PMI** — FRED purged in 2016, official data behind ISM's ~$200/mo paywall. Use Fed regional manufacturing surveys (composite from Philly/Empire/Dallas/Richmond/KC, all on FRED) as proxy.
- **#125 Conference Board LEI** — spec's `USSLIND` pointer is wrong (that's the Philly Fed state-level index). Either ship `USSLIND` correctly labeled as a different leading indicator, or scrape Conference Board's monthly headline.
- **#117 FHLB Advances** — spec claims weekly Office of Finance feed exists; it does not. Use FRED Z.1 quarterly `BOGZ1FL403169005Q` as the primary.
- **#150 HK Gold Imports** — free but mechanically annoying (XLSX with shifting table URLs); defer.
- **#152 SWIFT RMB Tracker** — free PDF only, requires monthly PDF parser. Worth building for the geopolitics dimension.
- **#153 Saudi-China Oil in CNY** — genuinely qualitative; mark as a manual reference card, optionally proxy with JODI oil-flow data.

**Spec corrections surfaced during research:**
- #113 series ID is wrong: `RREACBM027SBOG` (residential) → should be `CREACBM027SBOG` (commercial).
- #117 cadence claim is wrong: FHLB Office of Finance publishes quarterly, not weekly.
- #123/#124 free-via-FRED claim is wrong: ISM data was purged from FRED on 2016-06-24.
- #125 series ID is wrong: `USSLIND` is the Philadelphia Fed state-aggregate leading index, not the Conference Board LEI.
- #127 "variant of RSXFS" is partly right: `RSXFS` is retail-trade-ex-food-services; the Atlanta-Fed-style control group is closer to `RSFSXMV` (ex motor vehicles).
