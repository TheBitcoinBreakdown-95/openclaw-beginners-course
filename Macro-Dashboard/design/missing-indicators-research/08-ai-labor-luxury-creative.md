# 08. AI/Labor + Top-Decile Consumer + Creative/Pro — Free-Data Feasibility

**Family overview.** This 25-indicator family has the highest concentration of MANUAL/quarterly/qualitative items in the entire spec. The luxury cluster (140-143, 145, 147) is almost entirely company IR press releases on quarterly or semiannual cadence — automating them via SEC EDGAR (where they file) or HTML scrape buys little value because the cadence is too slow to move a daily dashboard. The AI/labor cluster (131-139) has a few strong free wins (Indeed Hiring Lab GitHub CSV, Epoch AI CSV, BLS CES API) and several that are best as Tier-3 reference cards (NVDA guidance, ChatGPT WAU, GPU spot prices). The creative/pro cluster (156-163) splits cleanly: BTC/equity computed signals are easy free wins; NYSE breadth (AD line, McClellan, TRIN) is fetchable via Stooq/Yahoo undocumented symbols but fragile; MOVE/CVIX is genuinely Bloomberg-locked. Net: expect ~8 free wins, ~12 MANUAL Tier-3 cards, ~3 PROXY computations, ~2 blocked.

---

## #131. Layoffs.fyi Tech Cumulative (Signal: 7/10)
- **Source**: https://layoffs.fyi/ (Airtable embed backend)
- **Free API**: partial — the public site is an Airtable embed; Airtable's internal JSON endpoints are reachable but undocumented and rate-limited; no official public API
- **OSS tool**: https://github.com/ntdoris/tech-layoffs-dashboard (analysis dashboard; uses scraped CSV); Apify Airtable scraper as a paid fallback
- **Cadence**: irregular (multiple updates per week during heavy news cycles, sparse otherwise)
- **Data shape**: Airtable JSON rows — company, location, total_laid_off, percentage, date, industry, source, money_raised
- **Complexity**: M (Airtable token + viewId discovery from page HTML; layout occasionally rotates)
- **Free-tier verdict**: FREE (fragile)
- **Best path**: Reverse-engineer the Airtable viewId from the iframe and pull JSON daily; cache cumulative tech-sector sum and 30/90-day deltas; fall back to a Kaggle mirror snapshot if the endpoint changes.

## #132. Indeed Software Dev Postings (Signal: 8/10)
- **Source**: https://github.com/hiring-lab/job_postings_tracker (official Indeed Hiring Lab repo)
- **Free API**: yes — raw CSV in the GitHub repo, refreshed weekly; data.indeed.com also has CSV/JSON exports; docs.indeed.com/hiring-lab-api/ is a GraphQL API
- **OSS tool**: official Indeed Hiring Lab repo above
- **Cadence**: daily index, weekly refresh
- **Data shape**: CSV — date, indexed_value (Feb-1-2020 = 100), 7-day trailing average, country/sector breakdowns; sector file has "software development"
- **Complexity**: S (raw.githubusercontent.com fetch + column filter)
- **Free-tier verdict**: FREE
- **Best path**: Daily pull `aggregate_job_postings_US.csv` from the hiring-lab GitHub repo, filter for software development sector, track 30/90-day change.

## #133. Hyperscaler Capex Sum (Signal: 9/10)
- **Source**: SEC EDGAR XBRL company-facts API (https://data.sec.gov/api/xbrl/companyfacts/CIK{n}.json)
- **Free API**: yes — no auth, no key; XBRL tags `us-gaap:PaymentsToAcquirePropertyPlantAndEquipment` (MSFT, GOOGL, META, ORCL) and `us-gaap:PaymentsToAcquireProductiveAssets` (AMZN)
- **OSS tool**: https://github.com/dgunning/edgartools (active Python lib, parses 10-Q/10-K XBRL into structured frames)
- **Cadence**: quarterly (filed ~30-45 days after quarter-end)
- **Data shape**: JSON — `units.USD[]` with end-date, val, fy, fp, form
- **Complexity**: M (5 CIKs, sum capex line per filing, handle Amazon's different tag, optional finance-lease ROU adjustment)
- **Free-tier verdict**: FREE
- **Best path**: Use edgartools or direct data.sec.gov calls to pull TTM capex for MSFT+GOOGL+AMZN+META (optionally +ORCL); rebuild on each 10-Q drop; track YoY growth and acceleration.

## #134. NVDA Forward Revenue Guidance (Signal: 8/10)
- **Source**: nvidianews.nvidia.com press releases + SEC 8-K filings
- **Free API**: partial — EDGAR 8-K is free; the guidance number sits in unstructured press release text ("we expect revenue of $X billion plus or minus 2 percent")
- **OSS tool**: edgartools (above) for 8-K retrieval; no purpose-built NVDA guidance parser found
- **Cadence**: quarterly
- **Data shape**: 8-K HTML / press release text — single sentence with dollar guidance
- **Complexity**: M (regex on press release text is brittle; LLM extraction more robust but costs tokens)
- **Free-tier verdict**: MANUAL — best as Tier-3 reference card
- **Best path**: Tier-3 card linking to nvidianews.nvidia.com latest earnings release; quarterly cadence does not justify a brittle text-parser for a daily dashboard.

## #135. GPU Spot Prices (H100/H200) (Signal: 7/10)
- **Source**: thundercompute.com pricing blog; getdeploying.com/gpus/nvidia-h100; vast.ai/pricing
- **Free API**: no public API on thundercompute/getdeploying; Vast.ai has a free search API (`/api/v0/bundles`) returning live spot offers
- **OSS tool**: none purpose-built; could borrow patterns from cli-printing-press library scrapers
- **Cadence**: live (Vast.ai), monthly blog cadence (thundercompute/getdeploying)
- **Data shape**: Vast.ai JSON — dph_total (dollars per hour), gpu_name, num_gpus, reliability
- **Complexity**: M (Vast.ai is clean; the comparison narrative across providers requires scraping aggregator pages)
- **Free-tier verdict**: FREE
- **Best path**: Hit Vast.ai `/api/v0/bundles?q={"gpu_name":"H100_SXM5"}` daily, take median dph_total; treat as the canonical spot price; ignore the slower-moving blog aggregators.

## #136. BLS Software Dev Employment (Signal: 8/10)
- **Source**: BLS Public Data API v2 (https://api.bls.gov/publicAPI/v2/timeseries/data/) — free with registration (500 queries/day)
- **Free API**: yes (FREE-KEY) — register for free API key
- **OSS tool**: many Python wrappers (e.g., `bls` on PyPI); also FRED mirrors many CES series
- **Cadence**: monthly (CES) — first Friday of the month
- **Data shape**: JSON timeseries — year, period (M01-M12), value
- **Complexity**: S
- **Free-tier verdict**: FREE-KEY (caveat: no monthly series for SOC 15-1252 alone; CES is by NAICS industry, not occupation; OEWS gives the occupation cut but only annually)
- **Best path**: Use CES NAICS-5112 (Software Publishers) or NAICS-5415 (Computer Systems Design) monthly employment as the proxy; FRED series `IPUJN5112W201000000` mirrors it. Accept the proxy or downgrade to annual OEWS via the BLS API for true SOC-level reads.

## #137. BLS Customer Service Reps Employment (Signal: 7/10)
- **Source**: BLS Public Data API v2
- **Free API**: yes (FREE-KEY)
- **OSS tool**: same `bls` Python wrapper as 136
- **Cadence**: annual for true SOC 43-4051 OEWS; monthly only as NAICS-industry proxies (e.g., NAICS 5614 Business Support Services / call centers)
- **Data shape**: JSON timeseries
- **Complexity**: S
- **Free-tier verdict**: FREE-KEY (proxy quality compromise)
- **Best path**: Pull NAICS-561422 (telephone call centers) monthly CES employment as the AI-disruption proxy; annual OEWS 43-4051 for the headline number. Note the disconnect in dashboard tooltip.

## #138. ChatGPT Weekly Active Users (Signal: 7/10)
- **Source**: OpenAI press releases / Altman tweets / DevDay keynotes
- **Free API**: no
- **OSS tool**: none found
- **Cadence**: irregular (3-5 disclosures per year, usually at product events)
- **Data shape**: prose — "ChatGPT now has X million weekly active users"
- **Complexity**: L (NLP on social + blog, very noisy)
- **Free-tier verdict**: MANUAL — best as Tier-3 reference card
- **Best path**: Tier-3 card with link to openai.com/news and the last-known WAU figure with disclosure date. No automation.

## #139. AI Training Compute (Epoch AI) (Signal: 6/10)
- **Source**: https://epoch.ai/data/all_ai_models.csv (also notable_ai_models.csv, frontier_ai_models.csv)
- **Free API**: yes — direct CSV download, CC-BY license, daily refresh
- **OSS tool**: not needed; pandas read_csv on the URL works
- **Cadence**: daily (incremental — new models added irregularly but file refreshes daily)
- **Data shape**: CSV — model name, organization, publication_date, training_compute_FLOP, parameters, training_dataset_size
- **Complexity**: S
- **Free-tier verdict**: FREE
- **Best path**: Daily pull, filter `publication_date` to trailing 12 months, compute max training_compute_FLOP as the frontier indicator; secondary: 90-day rolling count of >1e25 FLOP models.

---

## #140. LVMH Organic Revenue YoY (Signal: 7/10)
- **Source**: lvmh.com/en/investors quarterly press releases; also Euronext filings (LVMH trades as MC.PA)
- **Free API**: partial — Yahoo Finance has reported revenue (MC.PA); organic growth (constant-FX, like-for-like) is only in the press release narrative
- **OSS tool**: yfinance for reported revenue; no organic-growth parser
- **Cadence**: quarterly
- **Data shape**: PDF + HTML press release prose
- **Complexity**: L (organic vs. reported is the analytically meaningful number; sits in text)
- **Free-tier verdict**: MANUAL — best as Tier-3 reference card
- **Best path**: Tier-3 card linking to lvmh.com/en/publications; manual entry of "Fashion & Leather Goods organic growth" each quarter.

## #141. Hermès Revenue YoY (Signal: 8/10)
- **Source**: finance.hermes.com quarterly press releases; Euronext (RMS.PA)
- **Free API**: partial — same situation as LVMH; reported revenue available via yfinance, like-for-like growth in PR text
- **OSS tool**: yfinance
- **Cadence**: quarterly
- **Data shape**: PDF + HTML
- **Complexity**: L
- **Free-tier verdict**: MANUAL — best as Tier-3 reference card
- **Best path**: Tier-3 card; quarterly cadence and the value-add being the qualitative "like-for-like at constant FX" number make automation low-ROI.

## #142. RH Revenue YoY (Signal: 6/10)
- **Source**: SEC EDGAR 10-Q filings (RH ticker, CIK 0001528849)
- **Free API**: yes — EDGAR XBRL has `us-gaap:Revenues` and segment data
- **OSS tool**: edgartools
- **Cadence**: quarterly
- **Data shape**: XBRL JSON — quarterly revenue line
- **Complexity**: S
- **Free-tier verdict**: FREE
- **Best path**: edgartools pulls RH Revenues each 10-Q drop; compute YoY automatically; cheapest luxury auto-refresh of the set.

## #143. Sotheby's / Christie's Auction Totals (Signal: 5/10)
- **Source**: sothebys.com press releases; christies.com press releases; theartnewspaper.com semiannual recap
- **Free API**: no (both privately held — no SEC filings)
- **OSS tool**: none found
- **Cadence**: semiannual (end of season recaps)
- **Data shape**: press release prose / Art Newspaper articles
- **Complexity**: M
- **Free-tier verdict**: MANUAL — best as Tier-3 reference card
- **Best path**: Tier-3 card linking to The Art Newspaper's semiannual auction-totals coverage; manual entry twice a year.

## #144. Liv-ex Fine Wine 100 (Signal: 4/10)
- **Source**: liv-ex.com/resources/indices/ (free chart); members-only Indices API for direct pulls
- **Free API**: partial — the public page renders the chart from a backend JSON call that can be intercepted; official API needs paid membership
- **OSS tool**: none found
- **Cadence**: monthly (index is calculated month-end)
- **Data shape**: HTML chart + member CSV
- **Complexity**: M (scrape the chart's JSON payload from the page network calls)
- **Free-tier verdict**: PROXY or MANUAL
- **Best path**: Scrape the embedded chart JSON monthly; if the endpoint changes too often, downgrade to MANUAL Tier-3 with a monthly screenshot/note. Signal 4/10 doesn't justify heavy engineering.

## #145. Manhattan Median Apartment Price (Signal: 5/10)
- **Source**: elliman.com/media (Douglas Elliman quarterly market report PDFs prepared by Miller Samuel); millersamuel.com/market-reports/manhattan/
- **Free API**: no — quarterly PDF
- **OSS tool**: none for these specific reports; generic pdfplumber/Camelot would work but the URL changes each quarter
- **Cadence**: quarterly
- **Data shape**: PDF — front-page summary table has median sales price
- **Complexity**: M
- **Free-tier verdict**: MANUAL — best as Tier-3 reference card
- **Best path**: Tier-3 card linking to millersamuel.com/market-reports/manhattan/; quarterly manual entry of the headline median.

## #146. Private Jet Flight Hours (Signal: 6/10)
- **Source**: privatejetcardcomparisons.com/research/wingx-global-flight-activity/ (WingX weekly tracker reposted publicly); OpenSky Network API (free for non-commercial)
- **Free API**: yes for OpenSky (opensky-network.org/data/api) — proxy via ADS-B; WingX itself is paid
- **OSS tool**: https://github.com/openskynetwork/opensky-api Python client
- **Cadence**: weekly (WingX republished tracker); live (OpenSky)
- **Data shape**: OpenSky `/flights/all?begin=...&end=...` JSON; filter on `icao24` of registered bizjet types or aircraft category 17 (private)
- **Complexity**: L (OpenSky rate limits, no clean "private jet" filter — needs ICAO type-code allowlist)
- **Free-tier verdict**: PROXY (OpenSky) or MANUAL (WingX repost)
- **Best path**: Tier-3 card with weekly WingX recap link for the headline number; OpenSky as an optional advanced proxy only if you want a live count.

## #147. Mastercard SpendingPulse Luxury (Signal: 7/10)
- **Source**: mastercard.com/news press release archive (also syndicated on businesswire.com)
- **Free API**: no — press releases only
- **OSS tool**: none specific; generic RSS scrapers for businesswire would work
- **Cadence**: monthly (Holiday SpendingPulse runs more frequently in Nov-Dec)
- **Data shape**: press release HTML / prose with YoY luxury percentage
- **Complexity**: M (regex on the press release body)
- **Free-tier verdict**: MANUAL — best as Tier-3 reference card
- **Best path**: Tier-3 card linking to Mastercard's news page filtered for "SpendingPulse"; monthly manual entry of the luxury YoY figure.

---

## #156. BTC ETF Share of Spot Volume (Signal: 7/10)
- **Source**: farside.co.uk/bitcoin-etf-flow-all-data/ (flows by ETF, daily); CoinGecko `/coins/bitcoin/market_chart` for total BTC spot volume
- **Free API**: partial — Farside has no documented API; the page is a static HTML table that scrapes cleanly with pandas.read_html; CoinGecko has a free public API
- **OSS tool**: pandas.read_html + requests; no Farside-specific wrapper found, but the table is one of the easiest HTML scrapes possible
- **Cadence**: daily
- **Data shape**: HTML table — date, IBIT, FBTC, ..., total flow $m; CoinGecko JSON volume
- **Complexity**: S
- **Free-tier verdict**: FREE
- **Best path**: Daily scrape Farside's all-data table, sum absolute flows, divide by CoinGecko daily BTC spot volume converted to USD; track the ratio as a 30-day MA.

## #157. NYSE Advance-Decline Line (Signal: 6/10)
- **Source**: Stooq.com (cumulative AD line via undocumented symbol); Yahoo `^NYAD` works in some periods
- **Free API**: partial — Stooq CSV endpoint `stooq.com/q/d/l/?s=^nyad&i=d` returns daily AD; Yahoo's `^NYAD` works through yfinance
- **OSS tool**: yfinance, pandas-datareader
- **Cadence**: daily
- **Data shape**: CSV/JSON OHLC
- **Complexity**: S
- **Free-tier verdict**: FREE (fragile — symbol availability is undocumented and has historically rotated)
- **Best path**: Try Stooq `^nyad` first via the existing Stooq fetcher; fall back to yfinance `^NYAD`. Document both in the dashboard so silent breakage is visible.

## #158. McClellan Oscillator (Signal: 5/10)
- **Source**: derivable from the AD line in #157 — Oscillator = 19-day EMA(net advances) − 39-day EMA(net advances)
- **Free API**: yes (computed)
- **OSS tool**: pandas ewm; no library needed
- **Cadence**: daily (computed)
- **Data shape**: derived scalar
- **Complexity**: S
- **Free-tier verdict**: FREE (PROXY-computed)
- **Best path**: Compute in-dashboard from the #157 series. One function, no external dependency. If #157 breaks, #158 breaks with it.

## #159. NYSE TRIN (Arms Index) (Signal: 4/10)
- **Source**: Yahoo Finance `C:TRIN` (confirmed live on finance.yahoo.com/quote/C:TRIN); Stooq sometimes carries `^trin`
- **Free API**: partial — Yahoo via yfinance works for the `C:TRIN` symbol; documented to be intermittent
- **OSS tool**: yfinance
- **Cadence**: daily
- **Data shape**: OHLC CSV
- **Complexity**: S
- **Free-tier verdict**: FREE (fragile)
- **Best path**: yfinance `C:TRIN` daily close; tier 4/10 signal does not warrant heavy fallback engineering — accept periodic gaps.

## #160. Hindenburg Omen Trigger (Signal: 3/10)
- **Source**: needs NYSE 52-week new highs, new lows, advances, declines, and the 10-week NYSE Composite MA — all derivable
- **Free API**: yes (compute from constituents + index) but computing requires every NYSE constituent's daily highs/lows
- **OSS tool**: none specific; would need to combine yfinance constituent pulls with breadth math
- **Cadence**: daily (computed)
- **Data shape**: boolean trigger flag per day plus the 5 sub-conditions
- **Complexity**: XL (full NYSE constituent dataset is heavy to maintain free)
- **Free-tier verdict**: MANUAL — best as Tier-3 reference card
- **Best path**: Tier-3 card linking to SentimenTrader's public Hindenburg coverage or marketinout.com breadth page; signal 3/10 does not warrant the constituent-data lift.

## #161. BTC-NDX 30D Correlation (Signal: 7/10)
- **Source**: CoinGecko BTC daily + FRED `NASDAQ100` series (also Stooq `^ndx`)
- **Free API**: yes — CoinGecko free public API + FRED API (free key)
- **OSS tool**: pandas rolling corr; existing fetchers in the dashboard already cover both legs
- **Cadence**: daily (computed)
- **Data shape**: derived scalar
- **Complexity**: S
- **Free-tier verdict**: FREE
- **Best path**: Daily fetch both close series, compute 30-day rolling Pearson correlation on log returns, expose current value and 90-day range. Highest-leverage free win in this cluster.

## #162. Eurodollar/SOFR Z3-Z4 Calendar Spread (Signal: 6/10)
- **Source**: CME settlement files (free PDF/CSV at cmegroup.com daily settlements); Barchart has free quote pages for SR3 Dec contracts
- **Free API**: partial — CME publishes a free daily settlement CSV (`cmegroup.com/CmeWS/mvc/Settlements/Futures/Settlements/...`); Barchart blocks programmatic scraping
- **OSS tool**: none specific; the CME endpoint is undocumented but stable
- **Cadence**: daily
- **Data shape**: CSV — month, settle, change, volume per contract; spread = SR3Z(year+1) settle − SR3Z(year+2) settle
- **Complexity**: M (two contract symbols, year roll logic for "Z3-Z4")
- **Free-tier verdict**: FREE (modest engineering)
- **Best path**: Daily pull the CME SOFR futures settlement CSV, compute the next two December (Z) contract spread in basis points; document the year-roll convention so a January reload doesn't silently swap legs.

## #163. MOVE/CVIX Ratio (Signal: 7/10)
- **Source**: MOVE Index (ICE BofAML) is licensed to ICE/Bloomberg; Deutsche Bank CVIX is Bloomberg-only
- **Free API**: no for both
- **OSS tool**: none — neither index is published on free venues
- **Cadence**: daily
- **Data shape**: n/a
- **Complexity**: L (no clean free proxy; FX vol via DXY realized vol is a weak substitute)
- **Free-tier verdict**: PAID (blocked free)
- **Best path**: Drop from the dashboard or replace with a near-proxy: 30-day realized vol of UUP (DXY ETF) as a CVIX stand-in and `^MOVE` via yfinance which intermittently returns the index but is unreliable. Flag as blocked.

---

## Family Summary

**Top 5 free wins (auto-refresh, high signal):**
1. **#132 Indeed Software Dev Postings** — official GitHub CSV, daily, 8/10 signal.
2. **#133 Hyperscaler Capex Sum** — SEC EDGAR XBRL via edgartools, quarterly auto-refresh, 9/10 signal.
3. **#161 BTC-NDX 30D Correlation** — both legs already in dashboard fetchers, pure compute, 7/10.
4. **#139 Epoch AI Training Compute** — direct CSV URL, CC-BY license, daily, 6/10.
5. **#156 BTC ETF Share of Spot Volume** — Farside HTML table + CoinGecko volume, daily, 7/10.

**Honorable mentions (free but caveated):**
- #131 Layoffs.fyi (Airtable scrape, fragile)
- #135 GPU Spot via Vast.ai API
- #136/#137 BLS CES API (NAICS proxy, not occupation)
- #142 RH Revenue via EDGAR
- #157/#158 AD Line + McClellan via Stooq/Yahoo
- #162 SOFR Z3-Z4 spread via CME settlement CSV

**Best as Tier-3 manual reference cards (12):**
- #134 NVDA Forward Guidance (quarterly, text-buried)
- #138 ChatGPT WAU (irregular keynote disclosures)
- #140 LVMH Organic Revenue (quarterly PR prose)
- #141 Hermès Revenue (quarterly PR prose)
- #143 Sotheby's/Christie's Auction Totals (semiannual, private companies)
- #144 Liv-ex Fine Wine 100 (monthly, paid API)
- #145 Manhattan Median Apt (quarterly PDF)
- #146 Private Jet Hours (weekly WingX repost; OpenSky proxy too heavy for the signal)
- #147 Mastercard SpendingPulse Luxury (monthly press releases)
- #160 Hindenburg Omen (NYSE-constituent compute is XL)
- (plus the two AI/labor manuals: 134, 138)

**Genuinely blocked or near-blocked:**
- #163 MOVE/CVIX Ratio — both indices live on Bloomberg; no free venue carries either reliably; only weak proxies exist.

**Notes on the cli-printing-press analogy.** The most relevant pattern from mvanhorn/cli-printing-press is the principle of one CLI per high-gravity resource with its own local SQLite cache (stale/health/reconcile semantics). For this family, the candidates that fit that pattern are Indeed Hiring Lab (already a Git repo, just sync), Epoch AI (single CSV, sync + diff), and SEC EDGAR hyperscaler capex (CIK-keyed XBRL with quarterly cursor). The rest are either too cadence-slow (luxury IR) or too brittle (breadth symbols on Yahoo) to justify a dedicated wrapper — they should ride existing fetchers or sit as Tier-3 cards.
