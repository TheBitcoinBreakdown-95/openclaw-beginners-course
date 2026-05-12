# Credit Markets (CDX / LSTA / CMBS) — Free-Data Feasibility Research

**Family overview.** Six credit-market stress indicators sit in the spec, all but one flagged paid by primary vendor (Markit, PitchBook/LCD, Trepp). The good news: every one has a usable free proxy because the underlying stress shows up across the credit complex — synthetic CDS prices (CDX) tracks the cash bond market (FRED ICE BofA OAS series we already ship), leveraged loan price action mirrors in the BKLN ETF NAV, BDC and CMBS sentiment maps cleanly onto liquid ETFs (BIZD, CMBS). The single genuinely-free item (LSTA index) is also genuinely-paywalled at the index level but has high-fidelity ETF NAV proxies. Net: 5 of 6 are recoverable via FRED + Yahoo + light HTML scraping; only CMBX cap-stack BBB- spreads are not faithfully recoverable for free.

---

## #35. CDX IG 5Y (Signal: 7/10)
- **Source**: S&P Dow Jones Indices, ICE / Markit; cash-bond proxy via FRED `BAMLC0A0CM` (IG OAS)
- **Free API**: partial — S&P publishes daily levels on its site but no documented free API; FRED proxy is fully free (`fredapi`)
- **OSS tool**: none found specifically for CDX; existing FRED fetcher in dashboard covers the proxy
- **Cadence**: daily (FRED proxy)
- **Data shape**: FRED JSON `{observations:[{date,value}]}`; native CDX is daily closing index level in bps
- **Complexity**: S (proxy) / XL (true CDX)
- **Free-tier verdict**: PROXY
- **Best path**: Use FRED `BAMLC0A0CM` (ICE BofA US Corporate IG OAS) as the IG credit-stress proxy. Correlation to CDX IG 5Y spread is well documented (typically >0.85 over rolling 90d); the cash market is the deliverable basket the synthetic references. If CDX-specific dislocation matters later, scrape S&P Indices CDX landing page weekly — but the daily proxy is the right call for L1-L5 scoring.

---

## #36. CDX HY 5Y (Signal: 8/10)
- **Source**: ICE / Markit (paid); cash proxy via FRED `BAMLH0A0HYM2` (HY OAS); ETF angle via HYG
- **Free API**: partial — FRED proxy fully free; HYG via Yahoo (free)
- **OSS tool**: none direct; reuses existing FRED + Yahoo fetchers
- **Cadence**: daily
- **Data shape**: FRED JSON observations; HYG OHLC from Yahoo
- **Complexity**: S
- **Free-tier verdict**: PROXY
- **Best path**: Pair FRED `BAMLH0A0HYM2` (HY OAS, primary) with HYG NAV/price drawdown (secondary). The HY OAS series tracks CDX HY 5Y spreads closely — moves driven by the same risk-off flows. Note: there is a Simplify ETF with ticker CDX (high-yield-plus-credit-hedge), but it is not a clean CDX index tracker — avoid using it as proxy. Skip DTCC volume data; it's stale (weekly, lagged) and measures activity not stress.

---

## #37. Leveraged Loan Price Index (LSTA) (Signal: 7/10)
- **Source**: Morningstar LSTA US Leveraged Loan 100 (formerly S&P/LSTA, Bloomberg `SPBDLLB`); LSTA daily pricing file is gated
- **Free API**: no for the index itself; BKLN (Invesco Senior Loan ETF) NAV via Yahoo is free
- **OSS tool**: `yfinance` / existing Yahoo fetcher handles BKLN; no LSTA-specific OSS
- **Cadence**: daily
- **Data shape**: Yahoo CSV/JSON OHLC + NAV for BKLN
- **Complexity**: S
- **Free-tier verdict**: PROXY
- **Best path**: Use BKLN price (tracks Morningstar LSTA US Leveraged Loan 100 directly — it's the underlying index) via existing Yahoo fetcher. The spec's "Free?" flag was optimistic; the LSTA daily pricing file requires LSTA membership. BKLN's tracking error to the index is small (large, liquid, $6.7B AUM). Compute a "loan price" signal as BKLN NAV deviation from rolling 12-month mean, or simple price-level percentile. Secondary check: SRLN (SPDR Senior Loan ETF, actively managed) for divergence confirmation.

---

## #38. CCC Distress Ratio (LCD) (Signal: 8/10)
- **Source**: PitchBook LCD (paid); FRED `BAMLH0A3HYC` (CCC OAS) is the closest free signal
- **Free API**: partial — FRED CCC OAS is free; true distress ratio (% of HY index trading +1000bps over Treasuries) requires LCD subscription or bond-level pricing data
- **OSS tool**: none
- **Cadence**: daily (FRED) vs weekly (LCD)
- **Data shape**: FRED JSON observations in bps
- **Complexity**: S (proxy) / XL (true ratio — needs bond-level OAS data)
- **Free-tier verdict**: PROXY (and meaningfully different from the true metric — see note)
- **Best path**: Ship FRED `BAMLH0A3HYC` (CCC & Lower OAS) and treat the 1000bps threshold as a stress trigger. **Important caveat**: the distress ratio is a *breadth* measure (what % of bonds are stressed), while CCC OAS is a *price* measure (how stressed the average bond is). They co-move but diverge in compositional shocks — e.g., a few large CCC names blowing out can spike OAS without raising the distress ratio. For L1-L5 scoring, OAS is good enough; if the dashboard later needs breadth, this is the one item that genuinely lacks a free substitute.

---

## #39. BDC Discount-to-NAV (Signal: 8/10)
- **Source**: BDC Investor (free web UI, no API), individual BDC investor-relations pages, Yahoo Finance for prices
- **Free API**: no for aggregate; partial via Yahoo for individual ticker prices; SEC EDGAR for NAVs (quarterly XBRL)
- **OSS tool**: none found purpose-built; `yfinance` / existing Yahoo fetcher covers prices; SEC EDGAR has free XBRL endpoints for BDC filings
- **Cadence**: daily (price), quarterly (NAV — N-CSR/N-CSRS or 10-Q)
- **Data shape**: Yahoo OHLC JSON; HTML scrape of bdcinvestor.com `/screens/price-to-nav/` table; SEC XBRL JSON
- **Complexity**: M
- **Free-tier verdict**: FREE
- **Best path**: Two-tier approach. **Primary** — HTML-scrape `bdcinvestor.com/screens/price-to-nav/` table weekly (single page, simple Cheerio parse) to get aggregate discount/premium across the BDC universe. **Backup** — compute a weighted-basket proxy from Yahoo prices of the 8-10 largest BDCs (ARCC, MAIN, FSK, BXSL, OBDC, HTGC, GBDC, PSEC) with NAVs pulled from SEC EDGAR `companyfacts` endpoint quarterly. The aggregate index BIZD (VanEck BDC Income ETF) price/NAV ratio is the fastest one-line proxy. This is the highest-confidence FREE win in the family.

---

## #40. CMBS BBB- Spreads (Signal: 7/10)
- **Source**: Trepp (paid), Markit CMBX series (gated), iShares CMBS ETF (`CMBS` ticker) for IG-only exposure
- **Free API**: no for BBB- tranche; partial for IG aggregate via Yahoo (CMBS ETF)
- **OSS tool**: none found
- **Cadence**: daily (ETF) vs daily/weekly (Trepp BBB- spreads)
- **Data shape**: Yahoo OHLC for CMBS ETF; FRED has no direct CMBS BBB- series
- **Complexity**: S (proxy) / XL (true BBB- spreads)
- **Free-tier verdict**: PROXY (weak fidelity)
- **Best path**: Use iShares `CMBS` ETF drawdown vs rolling mean as a rough CMBS stress signal, optionally combined with FRED `BAMLC0A4CBBB` (IG corporate BBB OAS) as a credit-curve baseline. **Honest caveat**: the BBB- tranche of CMBX is where the real stress shows up (office-CRE risk in particular) and the iShares CMBS ETF is IG-only — it will dampen and lag the BBB- signal substantially. If office-CRE stress is core to the dashboard thesis, this indicator is the weakest proxy in the family and may warrant marking PAID-ONLY. The cli-printing-press-style approach (HTML-scrape Markit CMBX public reference page) is brittle — Markit gates the historical series.

---

## Family Summary

**Top 3 free wins:**
1. **#39 BDC Discount-to-NAV** — bdcinvestor.com HTML scrape + BIZD ETF backstop is a clean, faithful, fully-free signal. M-complexity, highest ROI in the family.
2. **#37 LSTA Loan Price** — BKLN NAV is a near-perfect tracker; existing Yahoo fetcher handles it, zero new code paths.
3. **#36 CDX HY 5Y proxy** — FRED `BAMLH0A0HYM2` is already a candidate adjacent to data the dashboard ships; one FRED series ID away from coverage.

**Genuinely paid (or weak free fidelity):**
- **#40 CMBS BBB-** — the IG-only CMBS ETF dampens the BBB- tranche signal that matters most for office-CRE stress. Mark PROXY but document fidelity gap.
- **#38 CCC Distress Ratio** — the *breadth* dimension cannot be reconstructed from FRED alone; the OAS proxy captures *intensity* but not breadth. Acceptable for L1-L5 stress scoring; not equivalent to the LCD metric.

**Shared infrastructure notes:**
- Five of six items reuse existing FRED + Yahoo fetchers. No new infrastructure required for #35, #36, #37, #38 — just new series IDs / tickers.
- Only #39 (BDC) needs a new fetcher pattern: simple HTML table scrape (Cheerio in Node, weekly cadence). Worth one small purpose-built fetcher in the spirit of cli-printing-press — single-source, SQLite-cached, daily refresh.
- FRED is doing heavy lifting in this family — five of six indicators map back to ICE BofA OAS series. The dashboard's existing FRED fetcher already handles the JSON shape; adding these is config-only.
- No CDX-specific scraper exists in OSS; the project would be writing one from scratch. The FRED OAS proxy is the right escape hatch for L1-L5 scoring and avoids that build.
- `bdcinvestor.com` table format should be snapshotted on first scrape; layout changes are the realistic failure mode (per `feedback_outofband_drift.md` pattern — pin to a structural selector, not a positional one).
