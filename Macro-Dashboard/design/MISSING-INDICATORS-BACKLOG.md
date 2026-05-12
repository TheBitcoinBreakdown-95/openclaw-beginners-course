# Missing Indicators Backlog — 2026-05-11

**Research output of Session 76 Phase D.** 8 parallel research agents researched the 121 spec indicators not yet shipped, batched by data-source family. Per-family files in `missing-indicators-research/`. This file is the top-level prioritized backlog.

## Headline

- **121 missing of 163 spec indicators** (42 shipped + 7 beyond-spec = 49 live tiles).
- Research finds **~95 of 121 have a working free implementation path**, contrary to the earlier read of "the hard ones are all paid."
- **~16 indicators are genuinely paid-only** with no faithful free proxy. These should ship as Tier-3 reference cards (link out, manual lookup) — the existing pattern.
- **~10 indicators are best as MANUAL reference cards** — quarterly earnings, irregular press releases, qualitative news. Automation buys nothing.
- **Spec corrections needed** in `INDICATORS.md` — 7 FRED IDs are wrong or stale (see §"Spec Corrections").

## Top 30 implementation priority

Sorted by signal × free-feasibility × ease (S/M complexity preferred over L/XL).

| # | Spec | Indicator | Signal | Cmplx | Path | Family |
|---|---|---|:---:|:---:|---|---|
| 1 | 54 | JGB 10Y | 10 | S | MoF Japan CSV (direct) | FX/Sov |
| 2 | 110 | Spot ETF Net Flows | 10 | M | Farside HTML scrape + browser UA | Crypto |
| 3 | 105 | Stablecoin Supply | 9 | S | DefiLlama `/stablecoin/{1,2}` JSON | Crypto |
| 4 | 6 | SRF Usage | 9 | S | NY Fed Markets API JSON | Treasury |
| 5 | 56 | UK Gilt 10Y | 9 | S | DMO direct CSV | FX/Sov |
| 6 | 84 | Copper/Gold Ratio | 9 | S | Stooq HG.F + GC.F + compute | Metals |
| 7 | 51 | JPY Carry Health | 9 | M | Compute from USDJPY + JGB-UST + Nikkei | FX/Sov |
| 8 | 133 | Hyperscaler Capex | 9 | M | SEC EDGAR XBRL via `edgartools` | AI/Labor |
| 9 | 58 | OAT-Bund Spread | 9 | S+S | Compute from #54-style Stooq foreigns | FX/Sov |
| 10 | 21 | Auction Bid-to-Cover | 8 | S | Treasury Fiscal Data API | Treasury |
| 11 | 22 | Indirect Bidder Share | 8 | S | Same Fiscal Data fetcher as #21 | Treasury |
| 12 | 25 | Fails-to-Deliver | 8 | S | NY Fed Markets `/api/pd/` | Treasury |
| 13 | 128 | Treasury Net Issuance | 8 | S | Treasury Fiscal Data | Banking/Real |
| 14 | 57 | BTP-Bund Spread | 8 | S+S | Compute from foreign-sov batch | FX/Sov |
| 15 | 107 | BTC Perp Funding | 8 | M | CCXT `premiumIndex` (free, avoids $29/mo CoinGlass) | Crypto |
| 16 | 63 | VIX9D/VIX Term Structure | 8 | S | CBOE CDN CSV | Equity Vol |
| 17 | 122 | JOLTS Quits Rate | 7 | S | FRED `JTSQUR` (drop-in) | Banking/Real |
| 18 | 132 | Indeed SW Dev Postings | 8 | S | Indeed Hiring Lab GitHub CSV | AI/Labor |
| 19 | 39 | BDC Discount-to-NAV | 8 | M | bdcinvestor.com scrape + BIZD fallback | Credit |
| 20 | 117 | FHLB Advances | 8 | M | FHLB Office of Finance | Banking/Real |
| 21 | 113 | H.8 CRE Loans | 7 | S | FRED `CREACBM027SBOG` (spec ID wrong — corrected) | Banking/Real |
| 22 | 102 | Hashprice | 7 | S | HashrateIndex API | Crypto |
| 23 | 67 | SKEW (retry, non-Yahoo) | 7 | S | CBOE CDN (not Yahoo — bypasses egress block) | Equity Vol |
| 24 | 23 | Primary Dealer Takedown | 7 | S | Fiscal Data (3rd field on auction record) | Treasury |
| 25 | 129 | Federal Interest Expense | 7 | S | FRED `A091RC1Q027SBEA` | Banking/Real |
| 26 | 130 | Deficit % GDP | 7 | M | CBO Monthly Budget Review (XLSX) | Banking/Real |
| 27 | 148 | TIC China UST | 7 | S | ticdata.treasury.gov plaintext | Banking/Real |
| 28 | 118 | KBW Regional Bank Index | 7 | S | Stooq KRE.US or KBWB.US | Banking/Real |
| 29 | 99 | BTC Dominance | 7 | S | CoinGecko `/global` | Crypto |
| 30 | 156 | BTC ETF Share of Spot Volume | 7 | M | Farside + CoinGecko compute | Creative/Pro |

## Shared-infrastructure batches

Build one fetcher, unlock many indicators. Highest-leverage implementation order:

| Fetcher | Unlocks | Cost |
|---|---|---|
| **Treasury Fiscal Data API** (`api.fiscaldata.treasury.gov`) | #21 Bid-to-Cover, #22 Indirect, #23 Primary Dealer, #128 Net Issuance | One JSON client; no key required |
| **CBOE CDN CSV** (`cdn.cboe.com/...`) | #63 VIX9D, #64 VIX3M (VXV), #67 SKEW, #68 Put/Call | Single fetcher with path template; CloudFront, no WAF, no UA gating |
| **Stooq foreign-sovereign batch** (`10jpy.b`, `10dey.b`, `10uky.b`, `10ity.b`, `10fry.b`, `10cny.b`) | #54 JGB, #55 Bund, #56 Gilt, #57 BTP-Bund, #58 OAT-Bund, #59 Italy BTP, #60 China CGB | Reuses existing Stooq fetcher; pure CSV |
| **Stooq commodities .F namespace** | #84 Copper/Gold, #86 Gold/Silver, #87 Pt/Pd, #88 Aluminum, #92 Wheat, #93 Corn/Soy, #94 Sugar/Coffee/Cocoa | Reuses existing Stooq fetcher; 8 indicators on a single dependency |
| **EIA API v2** (`api.eia.gov/v2/...`) | #80 Crack Spreads, #81 SPR Inventory, #82 OPEC Spare (proxy via STEO) | One free-key client; ~9k req/hr |
| **NY Fed Markets API** (`markets.newyorkfed.org/api/...`) | #6 SRF Usage, #25 Fails-to-Deliver | Single JSON client; no key |
| **CCXT for exchange data** | #107 BTC Perp Funding (aggregate Binance/Bybit/OKX `premiumIndex`) | Existing Node library; avoids paid CoinGlass |
| **SEC EDGAR via edgartools** | #133 Hyperscaler Capex, #134 NVDA forward revenue (if we parse press releases) | Python or JS XBRL parser; quarterly cadence |
| **Direct FRED additions** | #113 CRE Loans, #114 Consumer Loans, #122 JOLTS, #126 UMich, #129 Fed Interest, #127 Retail Sales (corrected ID) | Drop-in via existing FRED fetcher; ~6 indicators |

## Spec corrections needed in INDICATORS.md

Research found stale or wrong references in the original spec doc:

- **#113 H.8 CRE Loans**: spec lists `RREACBM027SBOG` (residential code). Correct CRE code is **`CREACBM027SBOG`**.
- **#117 FHLB Advances**: spec says weekly (Office of Finance). Actually **quarterly** — Office of Finance reports are filed quarterly, not weekly.
- **#123/#124 ISM Manufacturing & Services PMI**: spec implies FRED. **FRED purged ISM series in 2016** after a license change. ISM is now only via direct subscription or press-release scrape.
- **#125 Conference Board LEI**: spec implies a Conference Board endpoint. Closest free proxy in FRED is **`USSLIND`** which is **Philly Fed State Leading Index**, not the Conference Board LEI. Conference Board LEI itself is paid.
- **#127 Retail Sales Control Group**: spec says "variant of `RSXFS`". The control-group version is **`RSFSXMV`** (Retail Sales: Total minus Food Services, Auto Dealers, Building Materials, Gasoline Stations).
- **#28 30Y Swap Spread**: spec says "Paid (Bloomberg)". Also note: **FRED removed ICE swap rates 2022-01-31** — no clean free path exists. Genuinely paid.
- **Glassnode free tier**: spec annotates several crypto indicators (#100, #103, #104) as "Free (Glassnode free)". **Glassnode no longer has a meaningful free tier** — API is Pro-plan only as of 2024-2025. Spec is stale; proxies documented per indicator.

## Genuinely paid-only (16 indicators) — best as Tier-3 reference cards

No working free proxy exists for these. Add as click-out reference cards alongside the existing 5 Tier-3 entries:

| Spec | Indicator | Why blocked |
|---|---|---|
| 12 | CCP Margin Calls | OFR/Risk.net paid |
| 26 | OTR/OFR Spread | Bloomberg-only (proxies too noisy) |
| 28 | 30Y Swap Spread | FRED killed ICE swaps 2022 |
| 35 | CDX IG 5Y | Markit; proxy via IG OAS already shipped |
| 36 | CDX HY 5Y | Markit; proxy via HY OAS already shipped |
| 37 | LSTA Loan Index | PitchBook; BKLN ETF proxy is decent |
| 38 | LCD CCC Distress Ratio | LCD/PitchBook; CCC OAS already shipped (intensity, not breadth) |
| 40 | CMBS BBB- Spreads | Trepp; CMBS ETF proxy is weak (IG only) |
| 49 | 3M EUR-USD XCCY Basis | Bloomberg |
| 50 | 3M JPY-USD XCCY Basis | Bloomberg |
| 61 | EM Sovereign CDS Basket | Bloomberg; EMB ETF proxy contaminated by US duration |
| 65 | MOVE Index real-time | ICE/Bloomberg; Yahoo `^MOVE` was the proxy but Jinn egress is 429-blocked |
| 103 | Miner Reserves (CryptoQuant) | CryptoQuant paid; no faithful free proxy |
| 134 | NVDA Forward Revenue | Manual parse of earnings press release; tier-3 |
| 138 | ChatGPT WAUs | OpenAI press releases, irregular |
| 163 | MOVE/CVIX Ratio | Both legs Bloomberg-licensed |

## MANUAL Tier-3 reference cards (10 indicators) — quarterly/irregular

Automation buys nothing for these — they fire once a quarter or on press-release schedule. Better as click-out cards:

#134 NVDA Forward Revenue, #138 ChatGPT WAUs, #140 LVMH Revenue, #141 Hermès Revenue, #143 Sotheby's/Christie's Totals, #144 Liv-ex Wine (scrape possible but low signal), #145 Manhattan Apt Median, #146 Private Jet Hours, #147 Mastercard SpendingPulse, #160 Hindenburg Omen Trigger.

## Phased implementation plan (proposed)

**Wave 1 — Spec corrections + drop-in FRED additions (S complexity, no new infrastructure)** — ~8 indicators
- Apply 7 FRED-ID corrections to `INDICATORS.md`
- Add: #113 CRE Loans, #114 Consumer Loans, #122 JOLTS, #126 UMich, #127 Retail Sales (corrected), #129 Fed Interest Expense, #99 BTC Dominance, #84 Copper/Gold Ratio
- Effort: ~2 hours wall-clock

**Wave 2 — Shared-infrastructure batches** — ~25 indicators
- Build Treasury Fiscal Data fetcher → ships #21, #22, #23, #128 in one PR
- Build CBOE CDN fetcher → ships #63, #64, #67 (SKEW retry), #68 in one PR
- Build Stooq foreign-sovereign batch → ships #54-60 (7 sovereigns)
- Build Stooq commodities-futures batch → ships #84, #86, #87, #88, #92, #93, #94
- Build EIA API fetcher → ships #80, #81, #82
- Effort: ~6-8 hours wall-clock

**Wave 3 — New single-purpose API fetchers (M complexity, individually justified)** — ~10 indicators
- DefiLlama → #105 Stablecoin Supply (highest leverage in family)
- NY Fed Markets API → #6 SRF Usage, #25 Fails-to-Deliver
- DMO/MoF/SDMX → upgrade #54 JGB and #55 Bund/#58 OAT to authoritative sources
- CCXT premiumIndex aggregator → #107 Perp Funding
- mempool.space → #101 Hashrate
- HashrateIndex → #102 Hashprice
- SEC EDGAR XBRL → #133 Hyperscaler Capex
- Effort: ~10-15 hours wall-clock (most complex Wave)

**Wave 4 — HTML scrapes with brittleness risk** — ~12 indicators
- Farside → #110 Spot ETF Flows (browser UA required), #156 ETF Share of Volume
- bdcinvestor.com → #39 BDC Discount-to-NAV
- Westmetall → #88 Aluminum / #90 LME Copper Stocks
- HandyBulk → #96 Baltic Dry
- SCFI page → #97 Shanghai Containerized Freight
- Layoffs.fyi → #131 Tech Layoffs
- Indeed Hiring Lab GitHub → #132 SW Dev Postings (CSV, not actually scrape)
- thundercompute/getdeploying → #135 GPU Spot Prices
- FINRA → #69 Margin Debt (monthly XLSX)
- Effort: ~8-12 hours wall-clock; scrape fragility = ongoing maintenance debt

**Wave 5 — Manual Tier-3 reference cards** — 10 indicators
- Add reference cards (no data fetch) for the 10 MANUAL items above
- Effort: ~1 hour

**Wave 6 — Genuine paid items as Tier-3** — 16 indicators
- Add reference cards (no data fetch) linking to source pages for the 16 paid-only items
- Effort: ~2 hours

## Open follow-ups discovered during research

- **Yahoo egress block** (Jinn IP) affects #65 MOVE and a few proxy paths. Either secure an egress workaround, accept the proxy loss, or wait it out.
- **AAII WAF** (Imperva) returns 403 to bare curl — needs browser-header spoofing or use OSS mirror `psinopoli/AAII-Sentiment` repo.
- **BLS occupation-level (#136, #137)** is annual-only OEWS; monthly CES is industry-level. The user should know the dashboard tooltip will need to clarify "annual snapshot, not monthly trend."
- **ChinaBond JS-rendering**: #60 China CGB on official portal needs headless Chrome. Stooq mirror is the workable path but creates a single-source dependency.
- **NY Fed and ticdata.treasury.gov both 403 against generic fetchers** in the research. Browser-UA spoofing works; document this pattern when building the Wave 3 NY Fed fetcher.

## Per-family files

Detailed per-indicator research lives in `missing-indicators-research/`:

- [01-treasury-plumbing-auctions.md](missing-indicators-research/01-treasury-plumbing-auctions.md) — 12 indicators
- [02-credit-markets.md](missing-indicators-research/02-credit-markets.md) — 6 indicators
- [03-fx-foreign-sovereign.md](missing-indicators-research/03-fx-foreign-sovereign.md) — 16 indicators
- [04-equity-vol-positioning.md](missing-indicators-research/04-equity-vol-positioning.md) — 11 indicators
- [05-energy-metals-ag-shipping.md](missing-indicators-research/05-energy-metals-ag-shipping.md) — 18 indicators
- [06-bitcoin-crypto-alt-data.md](missing-indicators-research/06-bitcoin-crypto-alt-data.md) — 12 indicators
- [07-banking-real-economy-geopolitics.md](missing-indicators-research/07-banking-real-economy-geopolitics.md) — 21 indicators
- [08-ai-labor-luxury-creative.md](missing-indicators-research/08-ai-labor-luxury-creative.md) — 25 indicators
