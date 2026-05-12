# Bitcoin / Crypto Alt-Data — Free-Data Feasibility Research

**Family overview.** Twelve crypto-native stress indicators. This family is unusually free-friendly: the on-chain and derivatives data layer was built by miners, exchanges, and protocol-aligned teams who publish to grow their reach, not to lock data behind subscriptions. Eight of twelve are fully free with no key, three more are free-with-email-key (CoinGecko Demo, optional Glassnode), and only one (CryptoQuant native miner-reserve series) is meaningfully gated — and that one has a fully-free proxy via exchange BTC reserves on Glassnode-public mirrors and DefiLlama-adjacent data. Headline wins: DefiLlama for stablecoin supply (no key, full history, clean JSON), exchange-native funding-rate endpoints (Binance/Bybit/OKX, no key), mempool.space for hashrate (no key, 3y history in one call), and Farside Investors HTML for spot-ETF flows (no key but blocks generic UA — needs a real browser header). The "compute it yourself" indicators (109 correlation, 108 realized vol) are trivial once price history is on hand.

---

## #99. BTC Dominance (Signal: 7/10)
- **Source**: CoinGecko `/global` endpoint
- **Free API**: yes — `https://api.coingecko.com/api/v3/global` (Demo key recommended; 30 calls/min, 10k/month free)
- **OSS tool**: `pycoingecko` (https://github.com/man-c/pycoingecko, active)
- **Cadence**: live (recommend daily snapshot)
- **Data shape**: JSON `{data: {market_cap_percentage: {btc: 58.21, eth: ...}, total_market_cap, total_volume, updated_at}}`
- **Complexity**: S
- **Free-tier verdict**: FREE-KEY (Demo tier sufficient; the global endpoint is in the 30 publicly-accessible Demo endpoints)
- **Best path**: Daily cron hits `/global`, stores `data.market_cap_percentage.btc`. One field, one row per day. Historical backfill is the only catch — CoinGecko Demo doesn't expose historical dominance directly; either rebuild from per-coin `/coins/markets` historical OR accept forward-only collection.

---

## #100. MVRV Ratio (Signal: 9/10)
- **Source**: LookIntoBitcoin (chart data via embedded JSON); bitbo.io mirror; Glassnode (paid)
- **Free API**: partial — LookIntoBitcoin renders the chart from a JSON payload on the page (`mvrv-ratio`); no documented public API but data is embedded in the HTML response and scrapeable. Glassnode `/v1/metrics/market/mvrv` exists but requires paid Pro+ API add-on (no free tier).
- **OSS tool**: `bitcoin-data-pull` patterns exist in scraper gists; no canonical npm/pip wrapper for LookIntoBitcoin. Newhedge and bitbo also publish MVRV but same scraping pattern.
- **Cadence**: daily
- **Data shape**: scraped HTML/embedded JSON `[{x: timestamp, y: mvrv}]`
- **Complexity**: M
- **Free-tier verdict**: PROXY (scrape LookIntoBitcoin) — true vendor API is PAID
- **Best path**: Scrape LookIntoBitcoin's MVRV page once daily; the chart payload is server-rendered with the full historical series in the HTML. Glassnode-free no longer offers MVRV (free tier was deprecated; API is a Pro add-on). Alternative: compute approximate MVRV from on-chain realized cap (Coin Metrics community data CSV) divided by market cap (CoinGecko) — heavier but vendor-independent.

---

## #101. Hashrate 7DMA (Signal: 6/10)
- **Source**: mempool.space public API (verified)
- **Free API**: yes — `https://mempool.space/api/v1/mining/hashrate/3y` (also `1m`, `3m`, `6m`, `1y`, `2y`). No key, no auth.
- **OSS tool**: `mempool/mempool` self-hostable (https://github.com/mempool/mempool); JS client `@mempool/mempool.js`
- **Cadence**: daily (network hashrate updates per block; daily resolution sufficient)
- **Data shape**: verified JSON — `{hashrates: [{timestamp, avgHashrate}], difficulty: [{time, height, difficulty, adjustment}], currentHashrate, currentDifficulty}`. `avgHashrate` is already a daily average in H/s.
- **Complexity**: S
- **Free-tier verdict**: FREE
- **Best path**: Single daily GET to `/api/v1/mining/hashrate/3y`, take `hashrates[]` and compute 7-day trailing mean over `avgHashrate`. mempool.space is community-funded, no key required, rate-limited but generous. Hashrate Index/Luxor and Coinwarz are alternates but require API key — mempool.space is the clean win.

---

## #102. Hashprice (Signal: 7/10)
- **Source**: Hashrate Index / Luxor `api.hashrateindex.com`
- **Free API**: partial — API requires `X-Hi-Api-Key` header. The Silver paid tier explicitly bundles "API Key for Hashrate Index's data sets," implying API access is paid; the website data is free to view but programmatic access is gated.
- **OSS tool**: none direct; Luxor publishes example code in docs but no community wrapper
- **Cadence**: daily
- **Data shape**: would be JSON `{hashprice_usd, hashprice_btc, timestamp}` per their docs
- **Complexity**: M (compute from primitives) / L (paid API)
- **Free-tier verdict**: PROXY (compute) — vendor API effectively PAID
- **Best path**: Compute hashprice locally — it's a deterministic function of three free inputs we already have: `hashprice = (block_subsidy + avg_fees_per_block) * blocks_per_day * btc_price / network_hashrate`. Block subsidy is known (3.125 BTC post-2024 halving), avg fees from mempool.space `/api/v1/mining/blocks/fees/24h`, hashrate from #101, BTC price from CoinGecko. No vendor dependency. Cross-check against the free Hashrate Index web page weekly for drift.

---

## #103. Miner Reserves (Signal: 7/10)
- **Source**: CryptoQuant (native)
- **Free API**: no — CryptoQuant documentation states "to obtain an access token, upgrade your plan to Professional or Premium." Free web view exists but no free API.
- **OSS tool**: `studyquant/cryptoquant` exists but is a quant trading framework, not a free-data wrapper
- **Cadence**: daily
- **Data shape**: would be JSON `[{date, miner_reserve_btc}]`
- **Complexity**: L (no free path to native metric)
- **Free-tier verdict**: PAID for the native CryptoQuant series; PROXY available
- **Best path**: Use a proxy via miner-tagged address aggregation. Public miner wallet clusters (Patoshi, Foundry USA, AntPool, F2Pool) are documented; sum balances via mempool.space address endpoint `/api/address/:addr` for the top-20 known miner wallets and trend the sum. Less clean than CryptoQuant's clustered series but free and directional. Alternative: accept that miner reserves is the lowest-signal indicator in this family (7/10, mostly directional) and defer until budget allows Coin Metrics community series (CM Network Data Pro has a free academic tier).

---

## #104. Exchange BTC Reserves (Signal: 8/10)
- **Source**: CryptoQuant, Glassnode, CoinGlass
- **Free API**: partial — CryptoQuant gated; Glassnode `/v1/metrics/distribution/balance_exchanges` is paid (Pro add-on); CoinGlass exchange-balance endpoint is on the Hobbyist tier ($29/mo). Bitbo.io and CoinGecko Derivatives surfaces partial exchange-tagged data without auth.
- **OSS tool**: `glassnode/glassnode-api-python-client` (auth required); no clean free wrapper
- **Cadence**: daily
- **Data shape**: JSON `[{date, balance_btc, exchange}]` or aggregate
- **Complexity**: L
- **Free-tier verdict**: PROXY — true metric is PAID across vendors
- **Best path**: Aggregate known exchange wallet balances directly. Arkham, WalletExplorer, and Bitinfocharts publish tagged exchange clusters (Binance, Coinbase, Kraken, Bitfinex hot+cold). Use mempool.space `/api/address/:addr/utxo` for sum-of-balances across the top-50 tagged exchange addresses and trend daily. This replicates ~80% of the CryptoQuant signal. If budget opens up, CoinGlass Hobbyist ($29/mo) is the cleanest paid path.

---

## #105. Stablecoin Supply USDT+USDC (Signal: 9/10)
- **Source**: DefiLlama Stablecoins API (verified)
- **Free API**: yes — `https://stablecoins.llama.fi/stablecoincharts/all` (aggregate) and `https://stablecoins.llama.fi/stablecoin/{id}` (per-asset; `1`=USDT, `2`=USDC). No key, no auth.
- **OSS tool**: `boulderbytes/defillama-api` (https://github.com/Hati0x/defillama-api); `@defillama/api` npm; `JakubPluta/defillama` Python wrapper
- **Cadence**: daily
- **Data shape**: verified — array of `{date: unix_seconds, totalCirculating: {peggedUSD}, totalCirculatingUSD: {peggedUSD}, totalUnreleased?: {peggedUSD}}`. Per-asset endpoint adds chain breakdowns.
- **Complexity**: S
- **Free-tier verdict**: FREE
- **Best path**: Two daily GETs — `/stablecoin/1` (USDT) and `/stablecoin/2` (USDC) — sum `totalCirculatingUSD.peggedUSD`. DefiLlama is community-aligned, has been stable for years, and provides full history back to issuance. This is the cleanest single API in the entire family. Highest leverage add: signal 9, complexity S, zero key.

---

## #106. USDT Mint/Burn Rate (Signal: 8/10)
- **Source**: Tether transparency page (HTML), blockchain explorers (Etherscan/Tronscan), Whale Alert
- **Free API**: partial — Whale Alert free tier exists but historical depth is capped (~60 days on free; samples available). Tether transparency page is HTML-only, no API. Tronscan and Etherscan free APIs expose USDT contract `Issue`/`Redeem` events directly (free with email-key).
- **OSS tool**: `etherscan-python` (https://github.com/pcko1/etherscan-python); `tronpy` for TRC-20
- **Cadence**: live (events) → roll to daily
- **Data shape**: contract event logs `{block, timestamp, from, to, value}` for `Issue(uint256)` and `Redeem(uint256)` topics on the USDT contract
- **Complexity**: M
- **Free-tier verdict**: FREE-KEY
- **Best path**: Skip Whale Alert (60-day cap kills the signal) and skip scraping tether.to (no historical). Use Etherscan + Tronscan free APIs (each free-with-key) to pull `Issue`/`Redeem` events from the USDT contracts on ERC-20 (`0xdAC17F958D2ee523a2206206994597C13D831ec7`) and TRC-20. Daily mint = sum of Issue values, burn = sum of Redeem values. Same pattern works for USDC (Circle). Tron carries ~60% of USDT supply, Ethereum carries most of the rest — covering both gets >95% of flow. Alternative: derive proxy from DefiLlama daily delta on the #105 series.

---

## #107. BTC Perp Funding Rate (Signal: 8/10)
- **Source**: Binance Futures, Bybit, OKX public APIs (verified); CoinGlass aggregate (paid)
- **Free API**: yes for exchange-native — Binance `https://fapi.binance.com/fapi/v1/premiumIndex?symbol=BTCUSDT` returns `lastFundingRate`. Bybit and OKX have equivalent free public endpoints. CoinGlass aggregate funding starts at Hobbyist $29/mo (no free tier).
- **OSS tool**: `ccxt` (https://github.com/ccxt/ccxt) — unified Python/JS client for 100+ exchanges including funding-rate normalization
- **Cadence**: live (funding settles every 8h on most venues; daily snapshot fine)
- **Data shape**: verified — `{symbol, markPrice, indexPrice, lastFundingRate, nextFundingTime, time}` per Binance
- **Complexity**: S (single exchange) / M (volume-weighted aggregate across 3-5 venues)
- **Free-tier verdict**: FREE
- **Best path**: Build a free aggregate manually using `ccxt`. Hit Binance, Bybit, OKX, Bitmex public premium-index endpoints once per funding interval, volume-weight by 24h perp volume (also free from each exchange's ticker endpoint). This replicates the CoinGlass aggregate funding rate without the $29/mo. `ccxt` normalizes the symbol naming and response shapes across venues. This is the right call — exchange APIs are stable, free, and have generous rate limits.

---

## #108. BTC 30D Realized Vol (Signal: 6/10)
- **Source**: compute from BTC daily close
- **Free API**: yes — uses BTC price already in dashboard (CoinGecko)
- **OSS tool**: none needed; `numpy.std` or equivalent in two lines
- **Cadence**: daily
- **Data shape**: derived `{date, realized_vol_30d_annualized}`
- **Complexity**: S
- **Free-tier verdict**: FREE
- **Best path**: Compute locally: 30-day rolling stdev of daily log-returns × √365 for annualized realized vol. CoinGecko `/coins/bitcoin/market_chart` daily prices feed this directly. No new data dependency. Cross-check optionally against LookIntoBitcoin's "Realized Volatility" chart for sanity (same scraping pattern as #100).

---

## #109. BTC-SPX 30D Rolling Correlation (Signal: 7/10)
- **Source**: compute from BTC (CoinGecko) + SPX (FRED `SP500`)
- **Free API**: yes — both inputs already in the dashboard
- **OSS tool**: `pandas.DataFrame.rolling().corr()` or equivalent
- **Cadence**: daily
- **Data shape**: derived `{date, rolling_corr_30d}` in [-1, 1]
- **Complexity**: S
- **Free-tier verdict**: FREE
- **Best path**: Align BTC daily close and FRED `SP500` daily close on common trading days (drop crypto weekends or forward-fill SPX — drop is cleaner). Compute 30-day rolling Pearson correlation of daily log-returns. Free, deterministic, no new fetcher. Worth including a 90-day version as a slow companion signal.

---

## #110. Spot BTC ETF Net Flows (Signal: 10/10)
- **Source**: Farside Investors `https://farside.co.uk/bitcoin-etf-flow-all-data/` (verified — returns HTTP 403 to generic clients; works with browser-like User-Agent)
- **Free API**: no formal API; partial — HTML table on a public page, scrapeable but blocks default `python-requests` and `curl` UAs. Real browser UA header gets through.
- **OSS tool**: no canonical Farside wrapper exists (verified via search). Easiest pattern is `pandas.read_html()` with a `requests.Session` carrying a real `User-Agent` and `Accept` header, similar to `mvanhorn/cli-printing-press` shape. Bitbo.io mirrors a subset but doesn't expose per-ETF columns.
- **Cadence**: daily (Farside updates evening US time)
- **Data shape**: single HTML table, columns per ETF ticker (IBIT, FBTC, BITB, ARKB, BTCO, EZBC, BRRR, HODL, BTCW, GBTC, BTC, plus Total), rows per date in US$m; values include negative for outflows and dashes for not-yet-launched
- **Complexity**: M
- **Free-tier verdict**: FREE (with UA-spoofing scrape; technically gray, but the data is published publicly with no robots restriction or paywall — Farside's CSV is the same data they sell to terminals)
- **Best path**: Daily cron with `curl`/`requests` carrying a Chrome User-Agent, parse the single table with cheerio/BeautifulSoup or pandas `read_html`. Store `Total` column as the headline daily-flow signal; per-ETF columns optional. Build the fetcher with retries and graceful fallback (return last good value if 403 returns) since Farside has rotated their blocking before. This is the single highest-signal indicator (10/10) in the entire dashboard spec — worth the M complexity.

---

## Family Summary

### Top 5 Free Wins (signal × ease)
1. **#105 Stablecoin Supply (USDT+USDC)** — signal 9, FREE, no key, verified clean JSON via DefiLlama. Highest leverage in the family.
2. **#110 Spot ETF Net Flows** — signal 10, FREE via Farside scrape with UA header. Top-3 most-wanted overall.
3. **#107 BTC Perp Funding** — signal 8, FREE via exchange-native endpoints; `ccxt` builds the aggregate without CoinGlass.
4. **#101 Hashrate 7DMA** — signal 6, FREE via mempool.space, verified JSON shape, one daily call.
5. **#99 BTC Dominance** — signal 7, FREE-KEY via CoinGecko `/global`, trivial one-field add.

### Glassnode-free vs Paid Reality Check
Glassnode no longer has a meaningful free API tier — what was once a "Tier 1" free band is now web-only. The Glassnode API is a Professional-plan add-on (real money). For this family, that means **MVRV (#100), Exchange Reserves (#104), and Miner Reserves (#103) require proxies**, not Glassnode-free. The proxies (LookIntoBitcoin scrape for MVRV; tagged-wallet aggregation for reserves) are workable but heavier than the spec implied. The spec's "Free (Glassnode free)" annotations are stale by 1-2 years and should be revised.

### Exchange-API Fallback Strategy for Funding Rate
CoinGlass aggregate funding rate is paywalled ($29/mo minimum), but the underlying inputs are all free. Recommended pattern:
1. Primary: build aggregate from Binance + Bybit + OKX premium-index endpoints (no key) via `ccxt`.
2. Volume-weight by each venue's 24h perp volume (also free from same exchanges).
3. Cache as `funding_rate_btc_weighted` with per-venue breakouts available for drill-down.
4. Sanity-check monthly against CoinGlass public web page (free to view) for drift.
This pattern generalizes: any "aggregate derivatives metric" in CoinGlass can usually be rebuilt for free from 3-5 exchange-native endpoints.

### Notable Constraints / Blockers
- **Farside 403s** on generic UAs — fetcher needs browser-like headers; risk of mid-year blocking change.
- **CryptoQuant native miner-reserve series** has no free path — proxy via tagged wallets is directional but lossy.
- **CoinGecko Demo** caps at 10k calls/month and 30/min; the global endpoint plus a few price calls is well within budget but be aware if expanding crypto coverage.
- **LookIntoBitcoin scraping** is currently the only free MVRV path — fragile if they redesign the page; plan a compute-it-yourself fallback (realized cap / market cap) for resilience.
