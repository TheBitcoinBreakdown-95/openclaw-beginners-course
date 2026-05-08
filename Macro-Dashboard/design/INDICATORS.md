# Macro Stress + Bitcoin Context — Indicator Universe

163 indicators ranked by **signal density (1-10)** and tagged free/paid. Paid items kept where worth it — those need manual lookup, not auto-refresh.

**Signal scale:**
- **10** — Once-a-cycle critical. Leads everything. Rarely false. Move dramatically here = must act.
- **8-9** — High-conviction lead indicator. Drives the macro narrative.
- **6-7** — Useful in regime. Confirms or contextualizes other signals.
- **4-5** — Late-cycle confirmation or niche/slow-moving.
- **1-3** — Rarely actionable. Mostly noise except at extremes.

---

## 1. US Monetary Plumbing & Funding Markets

**1. SOFR** — Signal: 10/10 | Free (FRED `SOFR`)
The secured overnight funding rate banks pay for repo collateralized by Treasuries — the post-LIBOR risk-free benchmark. Spikes vs IORB mean the repo plumbing is breaking; September 2019's 525bp blowout forced the Fed to restart QE within weeks. Any sustained move >IORB+10bp is a five-alarm fire.

**2. EFFR-IORB Spread** — Signal: 8/10 | Free (FRED `EFFR`, `IORB`)
The gap between Effective Fed Funds and Interest on Reserves measures whether reserves are abundant or scarce. Negative (-7 to -10bp) is normal; rising toward zero signals scarcity. Goes positive only in genuine plumbing stress — that's when you panic.

**3. ON RRP Balance** — Signal: 9/10 | Free (FRED `RRPONTSYD`)
Money parked overnight at the Fed when there's nowhere else to go — the system's liquidity buffer. As it drains toward zero, T-bill demand is exhausted and Treasury auctions get harder. Below $50B is the danger zone.

**4. Treasury General Account (TGA)** — Signal: 9/10 | Free (FRED `WTREGEN`)
Treasury's checking account at the Fed — when it builds, liquidity drains from the system; when it spends, liquidity floods in. Post-debt-ceiling refills are the canonical liquidity-drain event. Watch the rate of change more than the level.

**5. Fed Balance Sheet** — Signal: 8/10 | Free (FRED `WALCL`)
Total Fed holdings of Treasuries and MBS — the QT/QE scoreboard. Steady decline is normal QT; pace slowing or reversing is the pivot signal. Emergency expansions (BTFP-style) are crisis flares.

**6. Standing Repo Facility (SRF) Usage** — Signal: 9/10 | Free (NY Fed Operations)
Dealer use of the Fed's repo backstop — the "break glass" facility. Any meaningful usage means private repo isn't clearing; September 2024's $2.6B quarter-end print made headlines. Above $20B = system breaking.

**7. Discount Window Primary Credit** — Signal: 9/10 | Free (Fed H.4.1)
Bank emergency borrowing from the Fed — historically taboo, used when nothing else works. SVB week: $153B drawn in days. Above $50B sustained is a banking crisis in real time.

**8. Foreign Repo Pool (FIMA)** — Signal: 8/10 | Free (Fed H.4.1)
Foreign central banks' use of the Fed's repo facility — a global dollar shortage gauge. March 2020 saw spikes; normal is sub-$300M. Above $10B sustained means dollar funding is broken offshore.

**9. Bank Reserves at Fed** — Signal: 7/10 | Free (FRED `WRESBAL`)
System-wide bank reserves — Logan and Williams have flagged ~$3T as the "scarcity zone" where SOFR starts misbehaving. Below $3T historically forces Fed action. Lagging weekly data but the floor matters.

**10. Fed Swap Lines Drawn** — Signal: 10/10 | Free (Fed H.4.1)
FX swaps to ECB, BoJ, BoE, SNB, BoC — anything above zero means global dollar shortage. March 2020 hit $449B. Any non-zero print warrants attention; >$50B is full crisis.

**11. Fed Net Liquidity** — Signal: 10/10 | Free (compute from FRED: WALCL − TGA − RRP)
The single best gauge of effective liquidity reaching risk assets. Rising = bull tailwind for stocks and Bitcoin; falling = headwind regardless of price. Decline >$300B/quarter is regime change.

**12. CCP Margin Calls (FICC, CME)** — Signal: 7/10 | Paid (manual via Risk.net, OFR)
Clearinghouse intraday variation margin calls — large calls force selling regardless of fundamentals. Hard to track in real time; mostly post-hoc. Worth checking after a big down day to see if forced flows explained it.

---

## 2. Treasury Market & Auctions

**13. 10Y Yield** — Signal: 7/10 | Free (FRED `DGS10`)
The benchmark long-term rate that prices everything from mortgages to discount cash flows. The level matters less than the velocity — fast moves break things. Watch ~5% as the recent stress threshold.

**14. 2Y Yield** — Signal: 7/10 | Free (FRED `DGS2`)
The most policy-sensitive part of the curve, reflecting near-term Fed expectations. Falling fast signals cuts being priced; rising fast signals hikes. Front-runs the FOMC by months.

**15. 2s10s Curve** — Signal: 9/10 | Free (FRED `T10Y2Y`)
10Y minus 2Y — the textbook recession indicator when inverted. The dis-inversion (steepening from inverted) is when recessions actually arrive, not the inversion itself. Currently the most-watched chart in macro.

**16. 3m10y Curve** — Signal: 8/10 | Free (FRED `T10Y3M`)
The Fed's preferred recession indicator (Estrella-Trubin model) — 10Y minus 3M T-bill. Slightly more reliable than 2s10s historically. Same dis-inversion logic for timing.

**17. 5s30s Curve** — Signal: 6/10 | Free (FRED `DGS5`, `DGS30`)
Long-end steepness reflecting term premium and fiscal repricing. Above +100bp signals fiscal stress; markets demanding more for duration. Less timely than 2s10s but tells the long-game story.

**18. MOVE Index** — Signal: 10/10 | Paid (Bloomberg/ICE; partial via Yahoo `^MOVE`)
Treasury bond volatility — when this spikes, dealer balance sheets are stressed and contagion follows. SVB week peak: 198. Above 140 = system-cracking territory; absolutely worth manual monitoring.

**19. ACM Term Premium (10Y)** — Signal: 7/10 | Free (NY Fed Adrian-Crump-Moench model)
The compensation investors demand for holding duration vs rolling short bills. Above +150bp signals fiscal-driven repricing. Updated daily on NY Fed website despite being a research model.

**20. Kim-Wright Term Premium** — Signal: 6/10 | Free (Fed Board)
Alternative term premium model — useful as a cross-check to ACM. Diverging models = uncertainty in the underlying signal. Lower priority than ACM.

**21. Auction Bid-to-Cover** — Signal: 8/10 | Free (TreasuryDirect.gov)
How many bidders showed up vs how much paper Treasury sold. Below 2.3x on long-end auctions signals weak demand and possible stress. Track 10Y and 30Y specifically.

**22. Indirect Bidder Share** — Signal: 8/10 | Free (TreasuryDirect)
Foreign and central bank takedown percentage at Treasury auctions. Falling sustained share is the de-dollarization signal — below 55% is concerning. Most direct evidence of foreign demand in real time.

**23. Primary Dealer Takedown** — Signal: 7/10 | Free (TreasuryDirect)
What primary dealers got stuck with after the auction. Above 25% means dealers had to absorb weak demand — bearish for yields next. Inverse of healthy auction.

**24. Foreign Treasury Holdings (TIC)** — Signal: 6/10 | Free (Treasury TIC)
Total foreign custody of US Treasuries by country. Two-month lag makes it slow, but the trend (especially China) is the de-dollarization scoreboard. Confirming, not leading.

**25. Treasury Fails-to-Deliver** — Signal: 8/10 | Free (NY Fed Primary Dealer Stats)
Settlement failures in the Treasury market — when they spike, collateral is genuinely scarce. Above $300B/week is a yellow flag for plumbing stress. Often missed by retail trackers.

**26. On-the-run / Off-the-run Spread** — Signal: 8/10 | Paid (Bloomberg; partial via ICE BofA)
Yield gap between newest and seasoned Treasuries — widens when liquidity dries up. March 2020 hit 14bp from a normal ~2bp. Worth manual lookup during stress events.

**27. 10Y Swap Spread** — Signal: 9/10 | Paid (Bloomberg)
The 10Y interest rate swap rate minus the 10Y Treasury yield — negative and widening signals dealer balance sheets are full and Treasuries are being avoided. The single most-overlooked stress signal in retail tracking. Worth manual monthly check.

**28. 30Y Swap Spread** — Signal: 7/10 | Paid (Bloomberg)
The long-end version — has been structurally negative since SLR rules changed. Direction matters more than level. Lower priority than 10Y.

**29. 5Y Breakeven** — Signal: 7/10 | Free (FRED `T5YIE`)
Market-implied 5-year inflation from TIPS spreads. Above 2.75% or below 1.5% signals expectations un-anchoring. The Fed watches this carefully.

**30. 10Y Breakeven** — Signal: 7/10 | Free (FRED `T10YIE`)
The longer-dated inflation expectation. Slow-moving but trending change is regime-defining. Above 3% is the inflation-back-with-a-vengeance scenario.

**31. 5y5y Forward Inflation** — Signal: 8/10 | Free (FRED `T5YIFR`)
The Fed's most-watched inflation expectation — what markets expect inflation to be 5-10 years out. The cleanest "anchored vs un-anchored" gauge. Above 2.75% is amber; above 3% is red.

**32. 10Y Real Yield** — Signal: 9/10 | Free (FRED `DFII10`)
TIPS yield = real cost of capital. Above 2.5% is severe Bitcoin headwind (gold's competitor). Below 0% is the financial-repression-fueling-BTC scenario.

---

## 3. Credit Markets

**33. IG OAS (BAML)** — Signal: 8/10 | Free (FRED `BAMLC0A0CM`)
Investment-grade corporate bond spread over Treasuries — the credit cycle barometer. Above 200bp signals real recession-pricing. Slow to move but doesn't lie.

**34. HY OAS (BAML)** — Signal: 10/10 | Free (FRED `BAMLH0A0HYM2`)
High-yield spreads — the canonical risk-appetite gauge. Above 700bp is recession territory; GFC peak hit 2000bp. The single most useful credit signal for retail tracking.

**35. CDX IG 5Y** — Signal: 7/10 | Paid (Markit/Bloomberg)
Synthetic credit derivative index — moves faster than cash bonds in real time. Useful for intraday stress moves. Cash IG OAS is 95% as good for free.

**36. CDX HY 5Y** — Signal: 8/10 | Paid (Markit)
HY synthetic — leads cash bonds during fast stress events. Worth manual monthly check during stable periods, daily during crisis.

**37. Leveraged Loan Price Index (LSTA)** — Signal: 7/10 | Free (PitchBook LCD)
Secondary prices on syndicated loans — below 95 average signals stress. Tracks private credit health better than public bonds. Less timely than CDX HY.

**38. CCC Distress Ratio (LCD)** — Signal: 8/10 | Paid (LCD/PitchBook)
Percentage of HY trading below 70¢ or +1000bp — the default-cycle precursor. Above 15% historically precedes default waves by 6-12 months. Worth manual quarterly check.

**39. BDC Discount-to-NAV** — Signal: 8/10 | Free (BDC Investor)
Business Development Company shares trading below their stated net asset value — the private credit canary. Below -15% means the market is pricing major writedowns coming. Often missed by retail.

**40. CMBS BBB- Spreads** — Signal: 7/10 | Paid (Trepp)
Office and retail commercial real estate bond spreads — the office-CRE death watch. Above 1500bp signals systemic CRE stress. Worth manual lookup quarterly given office secular decline.

**41. EMBI+ Spread** — Signal: 6/10 | Free proxy (FRED `BAMLEMCBPIOAS`)
Emerging-market sovereign dollar debt spread over Treasuries — aggregate EM stress gauge. Above 600bp is widespread EM crisis. JPM's official EMBI+ is paid; FRED proxy is close enough.

**42. Top US Bank CDS Basket** — Signal: 9/10 | Paid (Bloomberg, manual)
5-year CDS on JPM/BAC/C/WFC/GS/MS averaged — counterparty risk barometer. SVB week saw GS hit 130bp. Manual quarterly check + monitoring during any banking news.

**43. Top EU Bank CDS Basket** — Signal: 8/10 | Paid (Bloomberg, manual)
DB, BNP, SocGen, Santander, UCG averaged — Credit Suisse hit 1200bp pre-collapse. EU banking is structurally fragile, worth manual quarterly check.

---

## 4. FX & Global Imbalances

**44. DXY** — Signal: 8/10 | Free (Yahoo, ICE)
Dollar index against a basket of currencies — the reserve currency stance gauge. Above 110 is EM-stress territory; below 95 is de-dollarization scenario. Inversely correlated to BTC over multi-month windows.

**45. USD/JPY** — Signal: 10/10 | Free (Yahoo `JPY=X`)
The yen cross — currently the single most important FX pair for global macro. Above 160 triggers MOF intervention; carry-trade unwinds (August 2024) crash everything. Watch the intervention zones like a hawk.

**46. USD/CNY vs PBOC Fix Divergence** — Signal: 7/10 | Free (PBOC daily fix + spot)
Spread between spot CNY and the daily PBOC reference rate — over 2% deviation signals managed devaluation pressure. Capital-flight gauge. Easy to miss but China's hand is forced when this widens.

**47. EUR/CHF** — Signal: 6/10 | Free (Yahoo)
SNB intervention proxy — below 1.00 means the Swiss are getting squeezed by safe-haven flows. Was the 2015 floor-removal disaster signal.

**48. EUR/USD** — Signal: 5/10 | Free (FRED `DEXUSEU`)
The major reserve cross — reflects ECB-Fed differential. Regime-dependent rather than threshold-based. Slower-moving than DXY for similar information.

**49. 3M EUR-USD Cross-Currency Basis** — Signal: 9/10 | Paid (Bloomberg)
The premium European institutions pay to swap into dollars — negative and widening means USD shortage in Europe. One of the cleanest funding-stress signals. Worth manual lookup monthly.

**50. 3M JPY-USD Cross-Currency Basis** — Signal: 9/10 | Paid (Bloomberg)
Same as above but for JPY — year-end widening is a stress tradition. Below -60bp historically marks crisis. Manual quarterly + during quarter-end stress.

**51. JPY Carry Health Indicator** — Signal: 9/10 | Free (compute)
Composite: USDJPY × (UST 2Y − JGB 2Y) ÷ inverse vol — measures carry trade attractiveness. Sharp 30-day declines (>2σ) signal unwind risk; August 2024 was textbook. Worth building.

**52. China FX Reserves** — Signal: 6/10 | Free (SAFE.gov.cn)
PBOC reserve total — below $3T sustained signals capital flight pressure on the yuan. Monthly report, slow signal but China's escape valve. Below $3T forces ugly choices.

**53. COFER USD Reserve Share** — Signal: 5/10 | Free (IMF COFER)
Global central bank dollar allocation as share of FX reserves — the official de-dollarization scoreboard. Quarterly with lag, slow-moving. Useful for confirming the trend rather than timing.

---

## 5. Sovereign Stress

**54. JGB 10Y** — Signal: 10/10 | Free (MoF Japan)
Japan's 10-year yield — the YCC death watch. Above 2% means BoJ losses balloon and JGB market becomes unstable. Ripples globally because Japanese investors are the marginal buyer of duration everywhere.

**55. Bund 10Y** — Signal: 6/10 | Free (Bundesbank)
Germany's benchmark — the EU's risk-free rate. Useful as the anchor against which spreads (BTP-Bund, OAT-Bund) are measured. Lower priority standalone.

**56. UK Gilt 10Y** — Signal: 9/10 | Free (BoE)
UK 10-year — the LDI crisis trigger of September 2022. Above 5% is Truss-zone where pension funds break and BoE has to intervene. UK is the canary for sovereign stress in developed markets.

**57. BTP-Bund 10Y Spread** — Signal: 8/10 | Free (compute from Bloomberg/Investing)
Italy minus Germany 10-year — the EU fragmentation gauge that activates the ECB's TPI tool. Above 300bp triggers existential conversations about the euro. Italy is too big to fail and too big to save.

**58. OAT-Bund 10Y Spread** — Signal: 9/10 | Free (compute)
France minus Germany 10-year — used to be sleepy at ~30bp; June 2024's election scare hit 85bp. France going from "core" to "periphery" is a regime change for the eurozone. Watch for new highs.

**59. Italy 10Y BTP** — Signal: 6/10 | Free (Investing.com)
Outright Italian rate. Less useful than the spread; included for completeness. Watch BTP-Bund spread instead.

**60. China 10Y CGB** — Signal: 7/10 | Free (ChinaBond)
Chinese government bond yield — below 2% signals "Japanification" deflation entrenching. Tells you whether stimulus is reaching the real economy. PBOC is buying via stealth-QE; watch the yield reaction.

**61. EM Sovereign CDS Basket** — Signal: 6/10 | Paid (Bloomberg, manual)
Argentina, Turkey, Egypt, Pakistan, Sri Lanka averaged — the EM default cluster signal. Above 800bp on 2+ countries simultaneously signals contagion risk. Manual quarterly check.

---

## 6. Equity Vol & Positioning

**62. VIX** — Signal: 7/10 | Free (FRED `VIXCLS`, Yahoo `^VIX`)
SPX 30-day implied volatility — the most-watched fear gauge. Above 30 is real stress; below 16 is complacency. Often lags MOVE in true crisis.

**63. VIX9D/VIX Term Structure** — Signal: 8/10 | Free (CBOE)
9-day vs 30-day VIX — backwardation (>1.0) means front-end vol is higher than back-end, the classic stress signal. Above 1.05 is real fear. Better than VIX level alone.

**64. VIX/VXV** — Signal: 7/10 | Free (CBOE)
30-day vs 93-day VIX — same logic, longer dated. Above 1.05 = backwardation, stress. Confirms VIX9D/VIX signal.

**65. MOVE/VIX Ratio** — Signal: 9/10 | Free (compute, MOVE proxy via Yahoo)
Bond vol vs stock vol — when high (>8), rates stress isn't yet priced into equities. Often a 2-4 week warning before equity vol catches up. Sophisticated leading indicator.

**66. SPX Dealer Gamma Exposure** — Signal: 8/10 | Paid (SpotGamma ~$60/mo, manual)
Aggregate options dealer hedging position — negative gamma means dealers amplify moves rather than dampen them. The mechanical reason for fast crashes (and squeezes). Worth subscribing or manual lookup during volatile periods.

**67. CBOE SKEW Index** — Signal: 7/10 | Free (`SKEW` ticker)
Tail-risk pricing relative to ATM options — high SKEW with low VIX is the classic complacency-tail-risk setup. Above 155 is extreme. Black swan meter.

**68. Equity Put/Call Ratio** — Signal: 5/10 | Free (CBOE)
Total CBOE put/call — pure sentiment. Below 0.6 = greed extreme, above 1.2 = fear extreme. Contrarian only; mostly noise in between.

**69. Margin Debt (FINRA)** — Signal: 7/10 | Free (FINRA monthly)
NYSE margin balances — YoY growth above 50% has historically marked tops. Slow signal but reliable at extremes. Lagged data limits timing utility.

**70. AAII Bull-Bear Spread** — Signal: 4/10 | Free (AAII weekly)
Retail sentiment survey — contrarian only at extremes (>+30 froth, <-25 capitulation). Mostly noise; weekly volatility is high. Confirming, not leading.

**71. NAAIM Exposure Index** — Signal: 5/10 | Free (NAAIM)
Active manager equity exposure — below 40 historically marks bottoms. Better signal than AAII because these are professionals with money on the line. Still mostly contrarian.

**72. Russell 2000 / S&P 500 Ratio** — Signal: 6/10 | Free (Yahoo)
Small-cap vs large-cap relative performance — falling signals balance-sheet stress because small caps are more rate-sensitive. 200-day moving average is the regime signal. Confirms macro story.

**73. Insider Buy/Sell Ratio** — Signal: 5/10 | Free (Vickers, OpenInsider)
Form 4 filings showing executives buying or selling their own stock. Below 0.5 sustained is froth; clusters of buying at lows precede recoveries. Slow and noisy.

**74. IPO Count (monthly)** — Signal: 4/10 | Free (Renaissance Capital)
Issuance volume — spikes mark late cycles. Slow and confirming rather than leading. Useful color, not a trade signal.

---

## 7. Energy

**75. WTI Front-Month** — Signal: 6/10 | Free (FRED `DCOILWTICO`)
US crude price — reflects demand and geopolitical risk. Regime-dependent rather than threshold-based. Watch alongside Brent and the curve.

**76. Brent Front-Month** — Signal: 6/10 | Free (FRED `DCOILBRENTEU`)
Global benchmark — more geopolitically sensitive than WTI. Premium to WTI signals US-specific dynamics vs global. Daily cross-check.

**77. WTI 1M-12M Spread (Contango/Backwardation)** — Signal: 7/10 | Free (CME)
Front-month vs 12-month-out price — backwardation means physical tightness; deep contango means glut. Above $3 contango is oversupply territory; backwardation $1-3 is healthy demand.

**78. Henry Hub Natural Gas** — Signal: 5/10 | Free (FRED `DHHNGSP`)
US natural gas — industrial cost and winter risk gauge. Less macro-relevant than oil for now. Watch during cold snaps and AI data center buildout.

**79. TTF (Dutch Natural Gas)** — Signal: 7/10 | Free (ICE)
European gas benchmark — EU industrial competitiveness gauge. Above €100/MWh deindustrializes Germany. Russian gas weaponization aftermath still rippling.

**80. Diesel/3-2-1 Crack Spread** — Signal: 6/10 | Free (EIA)
Refining margins — proxy for industrial demand. Falling crack spreads signal slowdown ahead. Less useful for retail tracking.

**81. SPR Inventory** — Signal: 6/10 | Free (EIA)
US Strategic Petroleum Reserve level — below 350 Mb is "depleted" politically. Refilling was supposed to be a buffer; partisan optics make it tricky. Watch the trajectory.

**82. OPEC+ Spare Capacity** — Signal: 7/10 | Free (IEA OMR)
Saudi/UAE buffer above current production — below 2 Mb/d means any disruption spikes prices. Estimates only (no transparency from Riyadh). Crucial during geopolitical events.

---

## 8. Metals

**83. Copper (HG)** — Signal: 7/10 | Free (LME, FRED `PCOPPUSDM`)
"Dr. Copper" — diagnoses global growth more reliably than economists. Sustained breakouts signal industrial demand and inflation expectations. Industrial bellwether and electrification proxy.

**84. Copper/Gold Ratio** — Signal: 9/10 | Free (compute)
Highly correlated to 10Y Treasury yields — Druckenmiller's favorite divergence trade. When this falls and yields stay high, something has to give. Cleanest single growth-vs-risk-off gauge.

**85. Gold (Spot)** — Signal: 8/10 | Free (FRED `GOLDAMGBD228NLBM`)
Real-money asset — inversely correlated to real yields, supported by central bank buying since 2022. Sustained breakouts signal monetary regime change. Bitcoin's older sibling thesis.

**86. Gold/Silver Ratio** — Signal: 7/10 | Free (compute)
Monetary vs industrial precious metals — above 85 is recessionary, below 60 is inflationary boom. Slow but useful regime gauge. Above 95 is stress territory.

**87. Platinum/Palladium** — Signal: 5/10 | Free (LME)
Reflects auto cycle and EV transition. Less directly macro-relevant. Track for industrial color.

**88. Aluminum (LME)** — Signal: 5/10 | Free (LME)
Energy-intensive metal — proxy for European industrial cost competitiveness. Smelter shutdowns when energy spikes. Confirming, not leading.

**89. Uranium (UxC U3O8)** — Signal: 6/10 | Free (UxC weekly via Sprott Physical Uranium Trust price)
Nuclear renaissance gauge — AI power thesis (data centers need baseload). Still niche but trend matters. Yearly track for thesis confirmation.

**90. LME Copper Warehouse Stocks** — Signal: 6/10 | Free (LME)
Physical copper inventory — below 100kt signals squeeze risk. Real-time tightness gauge. Confirms macro copper signal.

**91. COMEX Gold Deliveries** — Signal: 6/10 | Free (CME)
Physical gold actually being taken from exchanges — sustained surges signal distrust of paper claims. Less reliable than rumored but worth watching trends. Trust signal.

---

## 9. Agriculture, Soft Commodities, Shipping

**92. Wheat (CBOT)** — Signal: 5/10 | Free (CME)
Russia-Ukraine sensitivity makes this geopolitical. Food security gauge for emerging markets. Spikes correlate with EM unrest historically.

**93. Corn / Soybeans** — Signal: 5/10 | Free (CME, FRED)
The ag complex — biofuel demand, food, animal feed. Sustained moves matter for inflation prints. One basket indicator suffices for dashboard.

**94. Sugar / Coffee / Cocoa** — Signal: 4/10 | Free (ICE)
Soft commodities — cocoa hit ATH ~$11k in 2024 from supply shocks. Niche unless something snaps. Cocoa-as-canary was a real thing recently.

**95. Urea + DAP + Potash Index** — Signal: 6/10 | Free (World Bank Pink Sheet, monthly)
Fertilizer prices — food inflation precursor by 6-12 months. Russia/Belarus exposure makes it geopolitically charged. Worth monthly tracking.

**96. Baltic Dry Index** — Signal: 6/10 | Free (Baltic Exchange, Trading Economics)
Dry bulk shipping rates — real-time global trade pulse. Above 3000 = strong demand; below 700 = collapse. Volatile but informative.

**97. Drewry WCI / Shanghai SCFI** — Signal: 6/10 | Free (Drewry, SSE)
Container freight rates — Red Sea disruption and supply chain stress. Spikes signal goods inflation 2-3 months out. Specific leading indicator for CPI goods.

---

## 10. Bitcoin & Crypto

**98. BTC Spot Price** — Signal: 8/10 | Free (CoinGecko, mempool.space)
The headline number — anchors all crypto-macro analysis. Regime-defining at multi-month moves. Levels matter: ATH breakouts, prior-cycle resistance.

**99. BTC Dominance** — Signal: 7/10 | Free (TradingView, CoinGecko)
BTC market cap as share of total crypto — above 55% signals risk-off within crypto, below 45% signals altcoin mania. Cycle-stage gauge. Less useful for macro than for crypto-internal positioning.

**100. MVRV Ratio** — Signal: 9/10 | Free (LookIntoBitcoin)
Market value / realized value — below 1 is capitulation (rare buy signal), above 3.5 is euphoria (sell signal). One of the cleanest on-chain valuation metrics. Glassnode paid tier has it but free alternatives exist.

**101. Hashrate (7DMA)** — Signal: 6/10 | Free (mempool.space, Hashrate Index)
Total network hashrate — new ATHs are usually post-cycle, so it's confirming not leading. Security metric; lagging price. Hash drops can signal miner capitulation.

**102. Hashprice** — Signal: 7/10 | Free (Hashrate Index)
Daily revenue per PH/s — miner profitability gauge. Below $0.04 is capitulation territory where miners shut off rigs. Better signal than hashrate.

**103. Miner Reserves** — Signal: 7/10 | Free (CryptoQuant free tier)
BTC held in mining pool wallets — falling fast = miners selling pressure. Pre-halving and post-halving dynamics matter. Useful for swing context.

**104. Exchange BTC Reserves** — Signal: 8/10 | Free (CryptoQuant, Glassnode free)
Coins on exchange wallets — falling means HODL conviction (bullish), rising means sell intent (bearish). One of the most useful flow signals available free.

**105. Stablecoin Supply (USDT+USDC)** — Signal: 9/10 | Free (DefiLlama)
Total dollar-pegged stablecoin market cap — rising = inflows ready to deploy into BTC, falling = outflows / capital leaving crypto. Cleanest crypto-liquidity signal.

**106. USDT Mint/Burn Rate** — Signal: 8/10 | Free (Tether transparency)
Tether issuance velocity — rapid mints historically precede BTC rallies because Tether mints on demand. Sustained mints = bid on its way. Watch for divergences.

**107. BTC Perp Funding Rate** — Signal: 8/10 | Free (Coinglass, exchange APIs)
Long/short premium on perpetual futures across Binance/Bybit — sustained above 0.05% per 8h = leveraged-long crowding (correction setup), negative = capitulation (bottom signal). Real-time leverage gauge.

**108. BTC 30D Realized Vol** — Signal: 6/10 | Free (LookIntoBitcoin)
Actual 30-day price volatility — compression historically precedes expansion. Useful for option-pricing context. Less directly actionable.

**109. BTC-SPX 30D Rolling Correlation** — Signal: 7/10 | Free (compute)
The decoupling watch — below zero means BTC is acting as an actual hedge rather than a tech-stock proxy. Currently mostly correlated; decoupling regime would be huge thesis confirmation.

**110. Spot ETF Net Flows** — Signal: 10/10 | Free (Farside Investors)
IBIT, FBTC, etc. daily flows — TradFi demand barometer. Sustained outflows are the thesis test; sustained inflows confirm institutionalization. Single most important new data series for BTC.

**111. ETH/BTC Ratio** — Signal: 6/10 | Free (TradingView)
Ethereum vs Bitcoin — rising = altseason / risk-on within crypto. Cycle-stage indicator. Less critical for macro lens.

---

## 11. Banking System

**112. H.8 C&I Loans (YoY)** — Signal: 8/10 | Free (FRED `BUSLOANS`)
Commercial and industrial bank lending to businesses — credit creation gauge. Below 0% YoY is recession-adjacent; banks aren't lending. Weekly data, important leading signal.

**113. H.8 CRE Loans** — Signal: 7/10 | Free (FRED `RREACBM027SBOG`)
Commercial real estate loans on bank books — office unwind happening in slow motion. Watch the YoY trend; rapid declines mean banks are taking writedowns.

**114. H.8 Consumer Loans** — Signal: 6/10 | Free (FRED `CONSUMER`)
Cards, auto, household lending — stress at the consumer level. Slowing growth signals tapped-out consumer. Confirming rather than leading.

**115. Commercial Bank Deposits** — Signal: 8/10 | Free (FRED `DPSACBW027SBOG`)
System-wide deposits — deposit flight precedes bank failures (SVB lost $42B in a day). Track the trend; sudden drops at smaller banks are huge red flags. Weekly data.

**116. Money Market Fund AUM** — Signal: 6/10 | Free (ICI weekly)
Cash sitting in money market funds — $7T+ in 2025 is "stored capital" earning 5%. Deployment back into risk assets requires a Fed cut. Confirming context, not leading.

**117. FHLB Advances Outstanding** — Signal: 8/10 | Free (FHFA quarterly, Office of Finance weekly)
Banks borrowing from Federal Home Loan Banks — a pre-failure tell (SVB had $30B from FHLB). Spikes in regional bank borrowing precede stress. Niche but powerful signal.

**118. KBW Regional Bank Index (KRX)** — Signal: 7/10 | Free (NASDAQ)
Regional bank equity index — direct continuity of SVB-era stress. Tracks the smaller-bank fragility story. Underperformance vs large banks is the regime signal.

**119. KRX / KBW Nasdaq Bank Ratio** — Signal: 7/10 | Free (compute)
Regional vs large banks ratio — below 0.5 is regional crisis territory. Tells you whether stress is contained to small banks or spreading. Cleaner signal than KRX alone.

---

## 12. Real Economy

**120. Initial Jobless Claims (4WMA)** — Signal: 8/10 | Free (FRED `IC4WSA`)
4-week moving average of new unemployment filings — above 300k is recessionary. Weekly data, fast and reliable. The single best real-economy leading indicator.

**121. Continuing Claims** — Signal: 7/10 | Free (FRED `CCSA`)
Total people receiving unemployment — measures persistence. Rising while initial claims stay flat means people aren't getting rehired. Companion to jobless claims.

**122. JOLTS Quits Rate** — Signal: 7/10 | Free (FRED `JTSQUR`)
Workers voluntarily leaving jobs — high quits = confidence (Great Resignation), below 2.0% = labor slack. Workers know the labor market better than economists.

**123. ISM Manufacturing PMI** — Signal: 8/10 | Free (ISM)
Survey of mfg purchasing managers — below 50 is contraction, below 45 is recession. Old-school but reliable. Manufacturing is small share of GDP but big share of cyclicality.

**124. ISM Services PMI** — Signal: 8/10 | Free (ISM)
Services PMI — services are 70% of GDP, so this matters more for actual recession. Below 50 sustained is the confirmation signal.

**125. Conference Board LEI** — Signal: 6/10 | Free (Conference Board)
Composite leading index of 10 indicators — 6-month annualized below -3% is recession-predictive. Has cried wolf the past two years; credibility currently shaken. Worth watching but not over-weighting.

**126. U-Mich Consumer Sentiment** — Signal: 5/10 | Free (FRED `UMCSENT`)
Household mood survey — below 70 signals stress. Politically polarized post-2020 (people answer based on which party is in power), reducing reliability. Use as confirming signal.

**127. Retail Sales Control Group** — Signal: 6/10 | Free (FRED, variant of `RSXFS`)
Core consumer spending excluding volatile categories — feeds GDP nowcasts directly. Monthly data with revision risk. Confirming spending strength or weakness.

**128. Treasury Net Issuance** — Signal: 8/10 | Free (TBAC refunding)
Quarterly Treasury borrowing plans — Q1 2024 and Q4 2024 surges drained liquidity from markets. Watch the Quarterly Refunding Announcement (QRA). Bessent's bills-vs-bonds choice matters.

**129. Federal Interest Expense (TTM)** — Signal: 7/10 | Free (FRED `A091RC1Q027SBEA`)
Trailing-twelve-month federal debt service — above $1.2T sparks "fiscal dominance" conversations. Crowds out other spending. The slow-burn fiscal crisis indicator.

**130. Deficit % GDP** — Signal: 7/10 | Free (CBO, Treasury Daily)
Federal deficit as share of GDP — above 6% during expansion is abnormal. Pressure on Treasury issuance and yields. The structural fiscal trajectory signal.

---

## 13. AI Disruption & Labor

**131. Layoffs.fyi Tech Cumulative** — Signal: 7/10 | Free (layoffs.fyi)
Running tracker of tech layoffs by company. YoY surges signal restructuring waves. Not always macro-relevant but tracks the AI-disruption theme.

**132. Indeed Software Dev Postings** — Signal: 8/10 | Free (Indeed Hiring Lab)
Job postings for software developers — currently down 35%+ from 2022 peak. Direct evidence of AI-driven hiring slowdown. Best leading indicator for the AI-displacement thesis.

**133. Hyperscaler Capex Sum** — Signal: 9/10 | Free (10-Q filings, SemiAnalysis)
MSFT + GOOGL + META + AMZN trailing-twelve-month capex — $300B+ in 2025. Are they overinvesting (bubble) or under-investing for the demand they see? Quarterly tracking, single most important AI-thesis indicator.

**134. NVDA Forward Revenue Guidance** — Signal: 8/10 | Free (NVDA earnings)
Single-stock signal that's systemic — NVDA sells $40B/quarter to hyperscalers. Their guidance is the single best read on AI compute demand. Quarterly check; reaction sets crypto and equity tone for weeks.

**135. GPU Spot Prices (H100/H200)** — Signal: 7/10 | Free (thundercompute, getdeploying)
H100 and H200 hourly rental prices on cloud platforms — falling means supply caught up with demand or demand softening. Real-time AI-thesis health check.

**136. BLS Software Dev Employment** — Signal: 8/10 | Free (BLS CES, OES)
Bureau of Labor Statistics' actual employment count for software developers — YoY decline confirms thesis. Lags by a month but it's the ground truth.

**137. BLS Customer Service Reps Employment** — Signal: 7/10 | Free (BLS)
Most AI-exposed job category — call centers being automated first. Watch the trajectory; should be falling fastest.

**138. ChatGPT Weekly Active Users** — Signal: 7/10 | Free (OpenAI press, irregular)
Consumer AI adoption gauge — disclosed sporadically by OpenAI. Currently 800M+ weekly. Adoption curve matters for the demand side of the AI thesis.

**139. AI Training Compute (Epoch AI)** — Signal: 6/10 | Free (epochai.org)
Frontier model training compute trends — quarterly research data on scaling. Useful for thesis confirmation rather than near-term action.

---

## 14. Top-Decile Consumer

**140. LVMH Organic Revenue YoY** — Signal: 7/10 | Free (LVMH IR, quarterly)
The luxury bellwether — LVMH organic growth is the global wealthy's spending pulse. Negative YoY growth is severe global wealth-effect reversal. Quarterly check.

**141. Hermès Revenue YoY** — Signal: 8/10 | Free (Hermès IR)
Ultra-luxury and historically recession-resistant — when even Hermès slows, the top 0.1% is hurting. The cleanest UHNW signal.

**142. RH Revenue YoY** — Signal: 6/10 | Free (RH 10-Q)
High-end home furnishings — housing-wealth correlated. Restoration Hardware's results track wealthy real-estate buyers. Quarterly.

**143. Sotheby's/Christie's Auction Totals** — Signal: 5/10 | Free (press releases, semiannual)
Art auction totals — falling means wealth effect reversing. Slow signal. Records vs duds tells the story.

**144. Liv-ex Fine Wine 100** — Signal: 4/10 | Free (Liv-ex.com)
Fine wine index — discretionary luxury at the most rarefied level. Declined hard 2023-2024. Niche but trend-confirming.

**145. Manhattan Median Apt Price** — Signal: 5/10 | Free (Olshan, Miller Samuel)
Quarterly NYC apartment data — wealthy buyer health. Slow signal but a regime change in $5M+ market matters. Confirming.

**146. Private Jet Flight Hours (WingX)** — Signal: 6/10 | Free (WingX, Argus)
UHNW activity gauge — actual spending behavior. Less manipulable than surveys. Monthly data.

**147. Mastercard SpendingPulse Luxury** — Signal: 7/10 | Free (MA press releases)
Card-spending data segmented by income tier — real-time wealthy spend gauge. Monthly. Better than surveys because it's actual transactions.

---

## 15. Geopolitics

**148. TIC China UST Holdings** — Signal: 7/10 | Free (Treasury TIC)
China's stack of US Treasuries — trend down sustained = de-dollarization. Two-month lag. Most-watched single TIC line item.

**149. TIC Japan UST Holdings** — Signal: 6/10 | Free (Treasury TIC)
Largest foreign holder — MOF intervention funding source for yen defense. Watch alongside USD/JPY moves.

**150. HK Gold Imports to China** — Signal: 6/10 | Free (HK Census/Stats)
Real gold flowing to China via Hong Kong — proxy for PBOC plus retail buying. Surges signal monetary regime change. Often missed.

**151. OFAC Sanctions Count** — Signal: 5/10 | Free (Treasury OFAC, Castellum.AI)
Year-to-date US sanctions actions — weaponization of dollar. Higher = de-dollarization fuel for adversaries. Slow narrative-confirming signal.

**152. CNY Share of SWIFT Settlements** — Signal: 5/10 | Free (SWIFT RMB Tracker monthly)
Yuan share of global cross-border settlements — slow rise tracks dollar-alternative usage. Currently ~4%; matters when it doubles.

**153. Saudi-China Oil in CNY** — Signal: 5/10 | Paid/qualitative (Reuters, Bloomberg)
Petroyuan progression — Saudi accepting CNY for oil is the petrodollar break narrative. Mostly qualitative reporting; track press disclosures.

---

## 16. Creative / Pro Indicators

**154. 3M Bill − Fed Funds** — Signal: 7/10 | Free (FRED `DTB3` − `DFF`)
3-month Treasury bill yield minus Fed Funds rate — deeply negative means cuts being priced fast. Front-end stress signal complementary to 2s10s.

**155. Gold/BTC Ratio** — Signal: 7/10 | Free (compute)
Falling sustained = BTC absorbing gold's monetary mandate (the Bitcoin thesis playing out). Slow-moving but regime-defining trend.

**156. BTC ETF Share of Spot Volume** — Signal: 7/10 | Free (Farside, Glassnode)
TradFi vs native-crypto ratio — rising = institutionalization deepening. Confirms the structural shift in BTC ownership.

**157. NYSE Advance-Decline Line** — Signal: 6/10 | Free (StockCharts)
Cumulative breadth — divergence from index marks tops (handful of stocks pulling everything up). Slow but reliable late-cycle signal.

**158. McClellan Oscillator** — Signal: 5/10 | Free (StockCharts)
Breadth momentum oscillator — below -100 oversold, above +100 overbought. Useful for short-term timing. Often noise.

**159. NYSE TRIN (Arms Index)** — Signal: 4/10 | Free (Bloomberg, Yahoo)
Volume-weighted advance-decline — above 2 is capitulation, below 0.5 is blow-off. Intraday signal mostly. Niche.

**160. Hindenburg Omen Trigger** — Signal: 3/10 | Free (SentimenTrader)
Confluence of breadth conditions historically associated with crashes — fires often, crashes rarely. Multiple triggers in 30 days warrant attention. Mostly noise.

**161. BTC-NDX 30D Correlation** — Signal: 7/10 | Free (compute)
Bitcoin vs Nasdaq 100 correlation — below zero is the decoupling thesis active. Currently mostly correlated. Regime change signal.

**162. Eurodollar/SOFR Z3-Z4 Calendar Spread** — Signal: 6/10 | Free (CME)
Forward Fed path inversion gauge — inverts before Fed pivots. Niche but professional-grade signal. Lower priority for retail dashboard.

**163. MOVE/CVIX Ratio** — Signal: 7/10 | Paid (Bloomberg for both)
Treasury vol divided by FX vol — high means rates are the source of stress, not currencies. Useful for diagnosing where the system is breaking. Manual quarterly check.

---

## Summary Stats

- **Total: 163 indicators**
- **Free: ~135 (83%)** — covers the entire macro picture for retail tracking
- **Paid (manual lookup recommended): 28 (17%)** — concentrated in swap spreads, basis swaps, CDX, dealer gamma, MOVE realtime, EM CDS, and CMBS

**Top 30 by signal density (10 and 9/10):**
1. SOFR (10) — funding plumbing
2. Fed Net Liquidity (10) — composite liquidity
3. USD/JPY (10) — yen carry / intervention
4. JGB 10Y (10) — YCC death watch
5. HY OAS (10) — credit cycle
6. Spot ETF Net Flows (10) — TradFi BTC demand
7. MOVE Index (10) — bond vol [Paid]
8. Fed Swap Lines Drawn (10) — global $ shortage
9. ON RRP Balance (9) — liquidity buffer
10. TGA Balance (9) — liquidity drain
11. SRF Usage (9) — repo break-glass
12. Discount Window Primary (9) — bank emergency
13. 2s10s Curve (9) — recession curve
14. 10Y Real Yield (9) — BTC competitor
15. UK Gilt 10Y (9) — sovereign stress canary
16. OAT-Bund Spread (9) — France fragmentation
17. Top US Bank CDS Basket (9) — counterparty risk [Paid]
18. JPY Carry Health (9) — Aug 2024 unwind
19. 3M EUR-USD Basis (9) — $ shortage [Paid]
20. 3M JPY-USD Basis (9) — $ shortage [Paid]
21. 10Y Swap Spread (9) — balance sheet [Paid]
22. Copper/Gold Ratio (9) — growth vs risk-off
23. MOVE/VIX Ratio (9) — vol divergence
24. MVRV Ratio (9) — BTC valuation
25. Stablecoin Supply (9) — crypto liquidity
26. Hyperscaler Capex (9) — AI thesis
27. ISM Manufacturing PMI (8) — recession leader
28. ISM Services PMI (8) — bigger GDP slice
29. Initial Jobless Claims 4WMA (8) — labor speed
30. HY OAS already counted

**Recommendation for dashboard build:**
- **Phase 1 cards (30-35):** All 9-10 ranked items + a handful of 8s for context (VIX, gold, BTC price, copper).
- **Phase 2 expandables:** 6-8 ranked items in click-to-expand panels grouped by zone.
- **Phase 3 manual-lookup notes:** 5-7 ranked items get a "manually update" placeholder with link to source.

Free-tier coverage hits ~80% of the signal density of the full universe. The paid items add resolution but aren't required for thesis-level tracking.
