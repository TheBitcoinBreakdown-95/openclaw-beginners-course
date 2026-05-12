# Equity Vol & Positioning — Free-Data Feasibility (Indicators 63-74)

## Family Overview

Eleven indicators covering equity volatility term structure, cross-asset vol ratios, sentiment surveys, leverage (margin debt), positioning (NAAIM, insider, IPO supply). The dominant finding: **CBOE publishes the entire vol family as free, unauthenticated CSVs on `cdn.cboe.com`** — verified via HTTP HEAD on 2026-05-11 with HTTP 200 responses, Content-Type `text/csv`, and timestamps refreshed within hours. This eliminates the Yahoo dependency for VIX9D, VIX3M (VXV), SKEW, the equity Put/Call ratio, and VIX itself. The only remaining Yahoo-dependent items are **MOVE** (an ICE/BofA index not on CBOE) and **R2K/SPX** (computable from Stooq). Yahoo egress is 429-blocked from Jinn, so any Yahoo path is flagged **PROXY** (best-case); MOVE is the only true blocker in this family. AAII has a public `.xls` but their Imperva WAF returns 403 to non-browser User-Agents — needs a header-spoofing fetcher or a third-party mirror. FINRA, NAAIM, OpenInsider, and SEC EDGAR are all directly fetchable.

---

## #63. VIX9D / VIX Term Structure (Signal: 8/10)
- **Source**: CBOE direct CDN
- **Free API**: yes — `https://cdn.cboe.com/api/global/us_indices/daily_prices/VIX9D_History.csv` and `VIX_History.csv`
- **OSS tool**: none needed — single CSV fetch
- **Cadence**: daily (HEAD shows refresh ~22:01 UTC same day)
- **Data shape**: CSV `DATE,OPEN,HIGH,LOW,CLOSE` (VIX9D); `DATE,OPEN,HIGH,LOW,CLOSE` (VIX). MM/DD/YYYY format. VIX9D history starts 2011-01-04; VIX from 1990. Sizes ~196 KB and ~468 KB.
- **Complexity**: S
- **Free-tier verdict**: FREE
- **Best path**: Add a CBOE fetcher (one HTTP GET per series). Compute `VIX9D / VIX` ratio in the dashboard layer; <1.0 = backwardation = stress.

---

## #64. VIX / VXV (VIX3M) Ratio (Signal: 7/10)
- **Source**: CBOE direct CDN
- **Free API**: yes — `https://cdn.cboe.com/api/global/us_indices/daily_prices/VIX3M_History.csv` (current name; legacy `VXV_History.csv` also returns 200 with a small stub file)
- **OSS tool**: none needed
- **Cadence**: daily (HEAD timestamp refresh confirmed)
- **Data shape**: CSV `DATE,OPEN,HIGH,LOW,CLOSE`; MM/DD/YYYY. ~213 KB.
- **Complexity**: S
- **Free-tier verdict**: FREE
- **Best path**: Use `VIX3M_History.csv` (canonical CBOE name as of 2026). Compute ratio against VIX from #63. Below 1.0 → near-term stress > 3-month implied.

---

## #65. MOVE / VIX Ratio (Signal: 9/10)
- **Source**: ICE BofA MOVE — not on CBOE CDN (404). Yahoo `^MOVE` and Investing.com are the public mirrors.
- **Free API**: partial — Yahoo `^MOVE` historical CSV endpoint exists but is blocked from Jinn. ICE Developer Portal requires entitlement. **FRED does NOT carry MOVE** (verified — FRED's ICE BofA tag contains bond OAS series only, no MOVE).
- **OSS tool**: `ranaroussi/yfinance` (active, would work elsewhere); no maintained non-Yahoo MOVE scraper found.
- **Cadence**: daily
- **Data shape**: standard OHLC CSV via Yahoo download endpoint.
- **Complexity**: M (because of egress workaround)
- **Free-tier verdict**: **PROXY** — Yahoo is the only free path and Jinn is rate-limited.
- **Best path**: Three options ranked: (a) route Yahoo fetch through a free proxy/residential egress (Cloudflare Worker, fly.io free tier) — cheapest fix and reuses for #67 if SKEW path failed; (b) screen-scrape Investing.com's `^MOVE` quote page (HTML, fragile); (c) defer until paid ICE feed is justified. Until then, dashboard shows VIX (#63) and skips the MOVE leg.

---

## #67. CBOE SKEW Index (Signal: 7/10) — RETRY PATH FOUND
- **Source**: CBOE direct CDN (replaces failed Yahoo attempt 2026-05-10)
- **Free API**: yes — `https://cdn.cboe.com/api/global/us_indices/daily_prices/SKEW_History.csv` returns HTTP 200, `text/csv`, ~201 KB, refresh timestamp same day. Confirmed from Jinn-equivalent IP.
- **OSS tool**: none needed
- **Cadence**: daily
- **Data shape**: CSV `DATE,SKEW`; MM/DD/YYYY; history from 1990-01-02.
- **Complexity**: S
- **Free-tier verdict**: FREE
- **Best path**: Retry SKEW using CBOE CDN, not Yahoo. This is a one-line fetcher change. The Yahoo block does not apply — `cdn.cboe.com` is CloudFront and served us a fresh CSV during verification.

---

## #68. Equity Put/Call Ratio (Signal: 5/10)
- **Source**: CBOE resources CDN (different path from the index series — `resources/options/volume_and_call_put_ratios/`)
- **Free API**: yes — `https://cdn.cboe.com/resources/options/volume_and_call_put_ratios/equitypc.csv` (HTTP 200, 135 KB) and `totalpc.csv` for total. Indexpc and indexpcarchive also live there.
- **OSS tool**: none needed
- **Cadence**: daily
- **Data shape**: CSV with a 2-line preamble (disclaimer + product/exchange row) then header `DATE,CALL,PUT,TOTAL,P/C Ratio`; data from 2006-11-01. Parser must skip first 2 lines.
- **Complexity**: S
- **Free-tier verdict**: FREE
- **Best path**: Single fetcher reusable for equity, total, index, VIX P/C — just swap the CSV filename. The 2-line preamble is the only gotcha.

---

## #69. Margin Debt — FINRA (Signal: 7/10)
- **Source**: FINRA margin statistics
- **Free API**: yes — direct xlsx at `https://www.finra.org/sites/default/files/2021-03/margin-statistics.xlsx` (HTTP 200, 20 KB). The 2021-03 path is the canonical file location; FINRA updates the same file each month.
- **OSS tool**: none required — single xlsx pull. Reference scrapers exist (Medium walkthrough with Scrapy+Pandas) but they target the HTML table; the direct xlsx is simpler.
- **Cadence**: monthly (third week of the month following the reference month)
- **Data shape**: Excel workbook; columns include Period, Debit Balances in Customers' Securities Margin Accounts, Free Credit Balances in Customers' Cash and Margin Accounts; back to January 1997.
- **Complexity**: S
- **Free-tier verdict**: FREE
- **Best path**: One xlsx download + a Node xlsx parser (e.g. `xlsx` npm). Refresh monthly. Cache aggressively — only changes ~once/month.

---

## #70. AAII Bull-Bear Spread (Signal: 4/10)
- **Source**: AAII Sentiment Survey
- **Free API**: partial — direct xls at `https://www.aaii.com/files/surveys/sentiment.xls` exists and is the canonical bulk-history file (back to 1987), but AAII fronts the site with Imperva and returns **403** to non-browser User-Agents. The file is fetchable from a browser; needs UA spoofing + cookie negotiation for automation.
- **OSS tool**: `psinopoli/AAII-Sentiment` (1987-present, Python; maintenance status to verify, repo found via search). No FRED mirror — confirmed AAII data is not in FRED.
- **Cadence**: weekly (Thursday release)
- **Data shape**: Excel with Reported Date / Bullish % / Neutral % / Bearish % / spread columns.
- **Complexity**: M (because of the WAF)
- **Free-tier verdict**: FREE-KEY (free, but needs the right headers/cookies, treated like a "key")
- **Best path**: Build a small fetcher that mimics a browser (UA, Accept-Language, Accept headers). If Imperva escalates to JS challenges, fall back to the GitHub mirror or a weekly manual pull. Signal is 4/10 — low priority, accept manual if scraping is too brittle.

---

## #71. NAAIM Exposure Index (Signal: 5/10)
- **Source**: naaim.org
- **Free API**: yes (with caveat) — xlsx posted weekly at `https://naaim.org/wp-content/uploads/YYYY/MM/USE_Data-since-Inception_YYYY-MM-DD.xlsx`. Verified 2026-05-06 file returns HTTP 200, 86 KB. Filename includes the publish date, so the URL changes weekly.
- **OSS tool**: none found maintained; this is a simple HTML scrape + xlsx fetch.
- **Cadence**: weekly (Wednesday survey, Thursday post)
- **Data shape**: xlsx with weekly dates and an Exposure Index value (0-200 range; 100 = fully long, 200 = 2x long, negative = net short).
- **Complexity**: M (the URL is dated, so the fetcher must scrape `https://www.naaim.org/programs/naaim-exposure-index/` for the current link, then download)
- **Free-tier verdict**: FREE
- **Best path**: Two-step — GET the index page, regex out the latest xlsx URL, GET that. Cache the URL until the next Thursday. Nasdaq Data Link mirror exists (`NAAIM/NAAIM-Exposure-Index`) but legacy Quandl auth is now Nasdaq Data Link API key — extra friction for no gain.

---

## #72. Russell 2000 / S&P 500 Ratio (Signal: 6/10)
- **Source**: Stooq (already used by dashboard) or computed from existing series
- **Free API**: yes — Stooq CSV: `https://stooq.com/q/d/l/?s=^rut&i=d` and `^spx`; or use IWM/SPY ETFs if index symbols flake.
- **OSS tool**: not needed — reuse existing Stooq fetcher.
- **Cadence**: daily
- **Data shape**: standard Stooq OHLCV CSV.
- **Complexity**: S
- **Free-tier verdict**: FREE
- **Best path**: Two Stooq fetches, dashboard computes the ratio. Falling ratio = small-cap underperformance = risk-off signal. Zero new infrastructure needed.

---

## #73. Insider Buy/Sell Ratio (Signal: 5/10)
- **Source**: OpenInsider (aggregated Form 4) or SEC EDGAR Form 4 direct
- **Free API**: yes — `http://openinsider.com/` returns HTTP 200 from plain curl (Apache, no WAF). The screener accepts URL params (`fd`, `td` for filing/trading date ranges; `sicMin`/`sicMax` for sector). Output is HTML tables — scrape required.
- **OSS tool**: `sd3v/openinsiderData` — Python, multi-threaded, exports CSV/Parquet, last release v1.0.2 Nov 2025, 30 commits. Good reference. Also `soemyatmyat/open-insider-trades` (FastAPI + SQLite). For pure Form 4 direct: SEC EDGAR `data.sec.gov` is keyless and free.
- **Cadence**: daily (Form 4s file within 2 business days of transaction)
- **Data shape**: OpenInsider HTML tables — Date, Ticker, Insider, Title, Trade Type (P/S), Price, Qty, Value. Aggregate buy/sell ratio = count or $-value of P (purchase) vs S (sale) over rolling window.
- **Complexity**: M (HTML scrape + aggregation; or SEC EDGAR with more parsing)
- **Free-tier verdict**: FREE
- **Best path**: Port `sd3v/openinsiderData` logic into a Node fetcher targeting the OpenInsider `latest-cluster-buys` and `latest-insider-sales` pages, aggregate to a rolling 30-day buy/sell $ ratio. Pure SEC EDGAR is more work for marginal gain (signal is 5/10).

---

## #74. IPO Count (monthly) (Signal: 4/10)
- **Source**: Renaissance Capital IPO Stats (display only) or SEC EDGAR S-1 effectiveness filings
- **Free API**: partial — Renaissance Capital has no public CSV/API; the stats page renders monthly counts in HTML and could be scraped. SEC EDGAR has free keyless JSON APIs at `data.sec.gov` and full-text search at `efts.sec.gov/LATEST/search-index` — can query for `forms=S-1` and `dateRange` to count effective IPO registrations.
- **OSS tool**: `javedqadruddin/EDGAR` (Python scripts for SEC IPO filing data); SEC-API.io (commercial wrapper, has free tier).
- **Cadence**: monthly (or daily if you want a running 30d count)
- **Data shape**: SEC EDGAR returns JSON with filing metadata (CIK, form type, filing date). Counting requires deduping by CIK + filtering for "effective" not just "filed".
- **Complexity**: L (defining "IPO" correctly — S-1 filed ≠ IPO effective ≠ first trade date; Renaissance uses pricing/trading date)
- **Free-tier verdict**: FREE
- **Best path**: Easiest = scrape Renaissance Capital's monthly stats page HTML once a month. Cleaner = SEC EDGAR full-text search filtered to S-1/A "effective" combined with first-trade detection. Given 4/10 signal, scrape Renaissance HTML monthly. If even that proves fragile, downgrade to manual quarterly entry — this indicator does not justify heavy plumbing.

---

## Family Summary

**Top 3 free wins (ship this week):**
1. **CBOE CDN bundle** — VIX9D (#63), VIX3M (#64), SKEW (#67), Equity P/C (#68), plus existing VIX. One Node fetcher, six CSV URLs, daily cron. Unblocks #63, #64, #67, #68 simultaneously and clears the 2026-05-10 SKEW failure.
2. **R2K/SPX (#72)** — two existing Stooq fetches, dashboard-level division. Zero new code beyond a compute step.
3. **FINRA Margin Debt (#69)** — single xlsx URL, monthly cadence, parser already in scope if any other xlsx source ships first.

**Items needing Yahoo workaround:**
- **#65 MOVE Index** is the only true Yahoo casualty in this family — FRED does not carry it and no free non-Yahoo source surfaced. Until an egress proxy is added, this stays unshipped. Recommend pairing the proxy buildout with any other Yahoo-only indicator in adjacent families to amortize cost.

**CBOE CSV pattern — single shared infrastructure:**
Yes — all CBOE items use one of two stable CDN paths:
- Index series (VIX, VIX9D, VIX3M, SKEW, VVIX, OVX, GVZ, etc.): `https://cdn.cboe.com/api/global/us_indices/daily_prices/{SYMBOL}_History.csv` with header `DATE,OPEN,HIGH,LOW,CLOSE` (or `DATE,SKEW` for SKEW).
- Volume & P/C ratios (equitypc, totalpc, indexpc): `https://cdn.cboe.com/resources/options/volume_and_call_put_ratios/{name}.csv` with a 2-line disclaimer preamble before the header.

Both served from CloudFront with 15-min cache, no auth, no WAF, no UA gating in verification. **Build one CBOE fetcher class with a path-template parameter** — it covers four indicators in this family today (63, 64, 67, 68), the existing VIX series for cross-check, and is reusable for any future CBOE addition (VVIX, OVX, etc.).

**Notes / gotchas:**
- AAII (#70) is the only "free but hard" item — Imperva WAF blocks bare curl. Plan for browser-header spoofing or accept the GitHub-mirror fallback.
- NAAIM (#71) URL contains a date — needs an index-page scrape step before download.
- OpenInsider (#73) is plain Apache, no WAF — easiest scrape in the family.
- IPO count (#74) signal is too low to justify SEC EDGAR plumbing; HTML scrape of Renaissance is good enough.
