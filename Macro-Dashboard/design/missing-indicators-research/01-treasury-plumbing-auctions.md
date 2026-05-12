# Treasury Plumbing & Auctions — Free-Data Feasibility Research

**Family overview.** Twelve indicators across the Treasury cash, repo, and auction stack. The family clusters around four public data hubs: NY Fed Markets Data API (`markets.newyorkfed.org/api/...`), the Treasury Fiscal Data API (`api.fiscaldata.treasury.gov`), the OFR Short-Term Funding Monitor API (`data.financialresearch.gov/v1`), and FRED. Eight of the twelve are fully addressable on the free tier — including all four auction indicators (#21–24) and the four NY Fed primary-dealer / repo series (#6, #19, #25, plus #20 via FRED). The two genuinely paid-only indicators are CCP Margin Calls (#12) and 30Y Swap Spread (#28, since FRED dropped ICE swap rates on 2022-01-31). On-the-run / off-the-run spread (#26) is a proxy candidate, not a direct pull. Two NY Fed JSON APIs (`/api/rp/` and `/api/pd/`) and one Fiscal Data REST endpoint can power roughly half the family with one new Node fetcher each.

---

## #6. Standing Repo Facility (SRF) Usage (Signal: 9/10)
- **Source**: https://markets.newyorkfed.org/api/rp/all/all/results/lastTwoWeeks.json (operations list); FRED series `SRFTSYD` for the SRF rate.
- **Free API**: yes — NY Fed Markets Data API, no auth, no documented hard rate limit. Operation results are pushed shortly after each operation completes. FRED also exposes daily aggregates via FRED API.
- **OSS tool**: `larsondg2000/repo` (Streamlit dashboard reading the same JSON, active in 2024–25) — useful as a reference for parsing shape.
- **Cadence**: live / daily (twice-daily ops; results published intraday).
- **Data shape**: JSON. Each operation: `operationDate`, `operationType` (Repo), `auctionStatus`, `totalAmtAccepted`, `totalAmtSubmitted`, stop-out / weighted-avg rates, breakdown by collateral type (Treasury, Agency, MBS).
- **Complexity**: S — drop-in JSON fetch, sum `totalAmtAccepted` per day for SRF usage in $bn.
- **Free-tier verdict**: FREE.
- **Best path**: New `nyfedRepo` fetcher hitting the `/api/rp/` JSON; daily cron sums accepted Treasury collateral for the SRF series. Cross-check daily total against FRED `SRFTSYD` for sanity.

---

## #12. CCP Margin Calls (FICC, CME) (Signal: 7/10)
- **Source**: DTCC FICC / CME Clearing — no consolidated public time series for daily margin calls. Risk.net and OFR publish behind paywalls / lagged research. The closest public proxy is FICC sponsored-repo volume on the OFR STFM API (`FICC-SPONSORED_REPO_VOL`) and DTCC GCF Repo Index activity.
- **Free API**: partial — CME Margin Service API exists but is gated to entitled clearing members (not a free public feed). DTCC GCF Repo Index page offers spreadsheet downloads for the index, not margin calls.
- **OSS tool**: none found that surfaces clearing-member margin calls.
- **Cadence**: irregular (event-driven); proxies are daily.
- **Data shape**: n/a for the direct signal. Proxies: JSON via OFR STFM API.
- **Complexity**: XL for the true signal; M for a proxy (sponsored-repo volume spike + GCF index dislocation).
- **Free-tier verdict**: PAID for the literal signal; PROXY achievable.
- **Best path**: Skip the literal indicator. If keeping the slot, redefine to a stress proxy: combine OFR `FICC-SPONSORED_REPO_VOL` and the GCF Repo Index move as a "clearing stress" composite — pulls from APIs already in the fetcher set.

---

## #17. 5s30s Curve (Signal: 6/10)
- **Source**: FRED series `DGS5` and `DGS30` (already in the workspace's likely FRED scope).
- **Free API**: yes — FRED API, requires a free API key. Endpoint pattern: `https://api.stlouisfed.org/fred/series/observations?series_id=DGS5&api_key=…&file_type=json`.
- **OSS tool**: `harlanmilkove/node-fred` (Node wrapper; ~10 yr old, low activity — note this and prefer raw fetch). Multiple Python alternatives (`mortada/fredapi`, active).
- **Cadence**: daily, business days, ~4pm ET update.
- **Data shape**: JSON `observations[].value` (string), `date`. Spread = DGS30 − DGS5 in basis points.
- **Complexity**: S — two FRED calls + subtract.
- **Free-tier verdict**: FREE-KEY.
- **Best path**: Reuse the existing FRED fetcher with two series IDs; compute spread server-side. No new fetcher needed.

---

## #19. ACM Term Premium (10Y) (Signal: 7/10)
- **Source**: NY Fed Treasury Term Premia data page (`https://www.newyorkfed.org/research/data_indicators/term-premia-tabs`). The page hosts an Excel download (Adrian-Crump-Moench daily file) covering 1961–present with fitted yields and term premia for 1–10Y. Couldn't fetch the exact `.xlsx` path because NY Fed media URLs return 403 to WebFetch; the page itself lists the link.
- **Free API**: no direct API. File-level download only. ALTERNATIVE: FRED carries the monthly ACM term premium under category 33823 (and individual series) — easier path.
- **OSS tool**: none specific. ACM file is small enough that a one-pass XLSX parse (e.g., `xlsx` npm) is straightforward.
- **Cadence**: weekly update; series is daily.
- **Data shape**: Excel multi-sheet — yields, expected short rates, term premia by maturity (`ACMTP10` is the 10Y column).
- **Complexity**: M if pulling the XLSX directly (HTTP GET + xlsx parse + select column); S if using FRED equivalent.
- **Free-tier verdict**: FREE (XLSX) or FREE-KEY (FRED proxy).
- **Best path**: Use FRED first — query the ACM term premium category for `ACMTP10` (or equivalent). Fall back to scraping the NY Fed XLSX if FRED series is too lagged.

---

## #20. Kim-Wright Term Premium (Signal: 6/10)
- **Source**: Federal Reserve Board Three-Factor Nominal Term Structure Model page; FRED mirrors all series at category 33825.
- **Free API**: yes via FRED — `THREEFYTP10` (10Y zero-coupon term premium), updated weekly. FRED category 33825 has 40 related series. Free API key required.
- **OSS tool**: same FRED wrappers as #17.
- **Cadence**: weekly update; series is daily.
- **Data shape**: JSON `observations[]` from FRED — single numeric series.
- **Complexity**: S.
- **Free-tier verdict**: FREE-KEY.
- **Best path**: Reuse the FRED fetcher with `THREEFYTP10`. No scraping needed.

---

## #21. Auction Bid-to-Cover (Signal: 8/10)
- **Source**: Treasury Fiscal Data dataset "Treasury Securities Auctions Data" — `https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v1/accounting/od/avg_interest_rates` is the rates dataset; the auctions endpoint lives under the Treasury Securities Auctions Data path on fiscaldata.treasury.gov (no auth, no key).
- **Free API**: yes — open REST, JSON/CSV/XML via `?format=` filter. Pagination supported. Field `bid_to_cover_ratio` (security-level).
- **OSS tool**: `groditi/ustfd` (R package, recently updated 2025); `areed1192/us-federal-treasury-python-api` (Python). No mature Node wrapper found — Treasury fetcher would be hand-rolled but trivial.
- **Cadence**: per auction (irregular, multiple per week across tenors).
- **Data shape**: JSON `data[]` rows with `record_date`, `security_type`, `security_term`, `bid_to_cover_ratio`, `auction_date`, `cusip`, plus dozens of allotment fields.
- **Complexity**: M — one new fetcher, filter by `security_type` and aggregate per tenor or take the latest.
- **Free-tier verdict**: FREE.
- **Best path**: Build one `treasuryAuctions` Node fetcher hitting fiscaldata's auctions endpoint; it powers #21, #22, #23 from the same response.

---

## #22. Indirect Bidder Share (Signal: 8/10)
- **Source**: same Treasury Securities Auctions Data endpoint as #21.
- **Free API**: yes — fields include `indirect_bidder_accepted`, `indirect_bidder_tendered`, `total_accepted`, etc. Indirect share = `indirect_bidder_accepted` / `total_accepted`.
- **OSS tool**: same as #21.
- **Cadence**: per auction.
- **Data shape**: JSON, same rows as #21.
- **Complexity**: S once #21 fetcher exists — purely a derived field.
- **Free-tier verdict**: FREE.
- **Best path**: Compute server-side from the same payload. No additional API call.

---

## #23. Primary Dealer Takedown (Signal: 7/10)
- **Source**: same Treasury Securities Auctions Data endpoint. Field: `primary_dealer_accepted` / `total_accepted` for direct dealer share.
- **Free API**: yes — same endpoint.
- **OSS tool**: same as #21.
- **Cadence**: per auction.
- **Data shape**: JSON, same rows.
- **Complexity**: S — derived from #21 payload.
- **Free-tier verdict**: FREE.
- **Best path**: Compute alongside #22 from one auction-fetcher response.

---

## #24. Foreign Treasury Holdings (TIC) (Signal: 6/10)
- **Source**: Treasury TIC — Major Foreign Holders of Treasury Securities. Current monthly table at `https://ticdata.treasury.gov/resource-center/data-chart-center/tic/Documents/slt_table5.html`; historical text file at `https://www.treasury.gov/resource-center/data-chart-center/tic/Documents/mfhhis01.txt` (pre-2020 archive). Since July 2024 Treasury switched MFH-history from CSV to tab-delimited TXT.
- **Free API**: no — there is no REST API. Tab-delimited TXT downloads and HTML tables only. FRED carries derivative series (e.g., `FDHBFIN` total foreign holdings) — much easier.
- **OSS tool**: none mature.
- **Cadence**: monthly, mid-month release with ~6 week lag.
- **Data shape**: tab-delimited TXT — rows are countries, columns are month-end snapshots in $B.
- **Complexity**: L if scraping the TXT (handle column changes monthly); S via FRED.
- **Free-tier verdict**: FREE (TXT scrape) or FREE-KEY (FRED).
- **Best path**: Use FRED `FDHBFIN` (or per-country series) as the production feed. Skip the TIC scrape.

---

## #25. Treasury Fails-to-Deliver (Signal: 8/10)
- **Source**: NY Fed Primary Dealer Statistics (FR-2004 fails block). Two access paths:
  1. Direct NY Fed API: `https://markets.newyorkfed.org/api/pd/list/timeseries.csv` returns the series catalog; series IDs follow the pattern `PDFTD-*` for fails-to-deliver. Endpoint pattern then `/api/pd/get/{seriesId}/timeseries.json`.
  2. OFR STFM mirror at `https://data.financialresearch.gov/v1/series/full?mnemonic=NYPD-PD_AFtD_T-A` (aggregate fails to deliver, Treasury).
- **Free API**: yes — both NY Fed and OFR endpoints. No auth, no documented hard limit.
- **OSS tool**: none Node-native; OFR docs are clean enough that raw fetch is fine.
- **Cadence**: weekly, Thursdays ~4:15pm ET.
- **Data shape**: CSV (NY Fed) or JSON (OFR). Series mnemonics + weekly observations in $M.
- **Complexity**: M — new `nyfedPrimaryDealer` fetcher; one-time series-ID discovery.
- **Free-tier verdict**: FREE.
- **Best path**: Single new fetcher on the NY Fed `/api/pd/` endpoint, parameterized by series ID so it covers fails plus future primary-dealer indicators with the same code.

---

## #26. On-the-run / Off-the-run Spread (Signal: 8/10)
- **Source**: literal Bloomberg / ICE BofA paid. No FRED series for the OTR/OFR spread itself. Academic measure (Hu-Pan-Wang "noise" via CRSP) is paywalled through WRDS.
- **Free API**: no for the direct spread. Possible free proxies: (a) compute OTR/OFR yield gap from FRED constant-maturity yields vs. specific CUSIP yields published in Treasury auction results (#21 payload includes high yield); (b) use the OFR STFM "Treasury market liquidity" indicators if listed in their mnemonic catalog.
- **OSS tool**: none.
- **Cadence**: daily for the proxy.
- **Data shape**: derived.
- **Complexity**: L — proxy requires matching the latest auction CUSIP for each tenor against a same-tenor older issue, then differencing yields. Not clean.
- **Free-tier verdict**: PAID (literal); PROXY (rough).
- **Best path**: Skip as a v1 indicator. If kept, build a crude proxy using FRED `DGS10` (off-the-run constant maturity) minus the latest 10Y auction's high-yield from the #21 fetcher. Document the limitation — it is an approximation, not the true OTR/OFR spread.

---

## #28. 30Y Swap Spread (Signal: 7/10)
- **Source**: 30Y USD swap rate minus 30Y Treasury yield. FRED removed all ICE swap-rate series (`ICERATES1100USD*`) on 2022-01-31. `DSWP30` was the legacy 30Y swap rate and is discontinued (ends 2016-10-28). Live swap rates are now Bloomberg / ICAP / Refinitiv. OFR STFM does not appear to publish a 30Y swap-spread mnemonic (its FICC/repo coverage is repo-side, not swap-side).
- **Free API**: no for current 30Y swap rates. Chatham Financial publishes forward-curve snapshots on a webpage (HTML, not API). DTCC SDR public dissemination has every cleared swap trade but is event-level and noisy.
- **OSS tool**: none for swap-spread time series.
- **Cadence**: would be daily if a feed existed.
- **Data shape**: n/a free.
- **Complexity**: XL — would require either parsing DTCC SDR trade feeds or scraping Chatham's HTML, neither stable.
- **Free-tier verdict**: PAID.
- **Best path**: Skip — no reliable free path for the 30Y swap rate since FRED dropped ICE. If a swap-spread family signal is required, substitute the 10Y swap spread using a non-FRED scrape (still PAID-equivalent effort) or replace the indicator entirely with #19 ACM term premium, which captures most of the same long-end risk.

---

## Family Summary

### Top 3 free wins (lowest complexity × highest signal)
1. **#6 SRF Usage (signal 9, complexity S)** — NY Fed `/api/rp/` JSON is a drop-in. Highest signal in the family for the least work.
2. **#21 + #22 + #23 Auction trio (signal 8 each, one fetcher serves all three)** — single new Fiscal Data fetcher unlocks bid-to-cover, indirect bidder share, and primary dealer takedown from the same payload.
3. **#25 Treasury Fails-to-Deliver (signal 8, complexity M)** — NY Fed `/api/pd/` returns weekly CSV; same fetcher pattern extends to future primary-dealer indicators.

### Genuinely paid-only (skip)
- **#12 CCP Margin Calls** — the literal signal is gated; only a proxy is buildable.
- **#28 30Y Swap Spread** — FRED killed ICE swap series in Jan 2022, no stable free replacement.
- **#26 On-the-run / Off-the-run Spread** — paid for the true measure; a rough proxy is possible but noisy enough that it would mislead.

### Shared infrastructure
- **One Fiscal Data fetcher → 3 indicators (#21, #22, #23)**. Single endpoint, single response, three derived metrics. Highest leverage in the family.
- **One NY Fed `/api/pd/` fetcher → indicator #25 today, plus future fails-to-receive, dealer positions, dealer financing if those land in later families**. Worth building generic.
- **One NY Fed `/api/rp/` fetcher → indicator #6 today, plus RRP / O/N Repo if the dashboard later wants them**. Same JSON shape across operation types.
- **FRED is the catch-all for derived series (#17 5s30s, #19 ACM via FRED mirror, #20 Kim-Wright, #24 TIC via `FDHBFIN`)**. If a FRED fetcher already exists, four indicators are pure config additions.
- **The OFR STFM API (`data.financialresearch.gov/v1`) is an underused backup**. Mirrors NY Fed primary-dealer series and adds FICC sponsored-repo, useful if NY Fed endpoints throttle or go stale. Same JSON pattern as a future generic source.

### Reference tool note
The user pointed at `mvanhorn/cli-printing-press` as a single-purpose data CLI. Closest analogs in this family: `groditi/ustfd` (R, active 2025) for fiscal data, `larsondg2000/repo` (Python/Streamlit, active 2024–25) for NY Fed repo JSON. No Node-native CLI emerged for any of these endpoints — they are all simple enough that raw `fetch` is preferable to a wrapper.
