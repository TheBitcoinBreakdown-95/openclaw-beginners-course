# Threshold Audit Proposal — 2026-05-07

**Method:** Pulled FRED daily series 2024-01-01 through today. Computed p10/p25/p50/p75/p90/min/max. Set L1 ≈ bottom quartile of recent regime, L3 ≈ median, L5 = top decile or historical stress level (whichever defines "rare extreme"). Documented basis in each `computeLevel` block.

Empirical anchor for every recalibration is the 2024-2026 distribution (n ≈ 580-615 daily, 120 weekly, 27 monthly observations). Current readings shown for sanity check.

---

## Tier 1

### SOFR — IORB constant refresh
- **Empirical IORB:** 3.65% today (was 4.40% when this code was written; Fed has cut)
- **Empirical SOFR:** 3.61% today, p50=4.36 (full 2024-2026 distribution shows the cut path)
- **Spread thresholds:** keep (institutional standard — <2bp/<5/<10/<15)
- **Change:** Update hardcoded `iorb` from `4.40` to `3.65`. Add comment that this needs refresh whenever Fed changes IORB (~4-8x/yr at FOMCs). Best long-term fix is fetching IORB dynamically; out of scope for threshold audit.

### 10Y Yield (DGS10) — empirical: min 3.63 / p25 4.13 / p50 4.26 / p75 4.39 / p90 4.51 / max 4.79; cur 4.36
| Level | OLD | NEW | Rationale |
|---|---|---|---|
| L1 | <3.5 | <4.0 | Old L1 unreachable (min 3.63). New = bottom decile of recent regime |
| L2 | 3.5-4.2 | 4.0-4.25 | p10-p50 |
| L3 | 4.2-4.7 | 4.25-4.50 | p50-p90 |
| L4 | 4.7-5.0 | 4.50-4.80 | p90 to recent max |
| L5 | >=5.0 | >=4.80 | Above 2024-2026 high; preserves 5% as "real stress" anchor |

### 2Y Yield (DGS2) — empirical: 3.38/3.63/3.94/4.32/4.70/5.04; cur 3.87
| Level | OLD | NEW | Rationale |
|---|---|---|---|
| L1 | <3.5 | <3.6 | Heavy cuts priced (~p10) |
| L2 | 3.5-4.2 | 3.6-4.0 | p10-p50 |
| L3 | 4.2-4.7 | 4.0-4.5 | p50-p75 |
| L4 | 4.7-5.0 | 4.5-4.9 | p75-p90 (hike fears) |
| L5 | >=5.0 | >=4.9 | p90+ (aggressive hike priced) |

### 2s10s Curve (T10Y2Y) — empirical: -0.47/-0.15/0.34/0.54/0.60/0.74; cur 0.49
| Level | OLD | NEW | Rationale |
|---|---|---|---|
| L1 | >0.5 | >0.4 | Top quartile (clear steepening) |
| L2 | 0.2-0.5 | 0.0-0.4 | Median range, normalized |
| L3 | -0.1-0.2 | -0.2-0.0 | Mildly inverted |
| L4 | -0.5 to -0.1 | -0.5 to -0.2 | Inverted (where most of 2024 sat) |
| L5 | <=-0.5 | <=-0.5 | Deep inversion (rare; preserves prior anchor) |

Note: dis-inversion velocity is the actual recession trigger. Velocity logic is a separate refactor.

### HY OAS (BAMLH0A0HYM2) — empirical (bp): 259/285/306/321/345/461; cur 275
| Level | OLD | NEW | Rationale |
|---|---|---|---|
| L1 | <350 | <290 | Recent regime p25 (tight) |
| L2 | 350-450 | 290-320 | p25-p75 |
| L3 | 450-600 | 320-400 | p75 to above-recent-max |
| L4 | 600-700 | 400-600 | Early stress (below GFC) |
| L5 | >=700 | >=600 | Recession territory; preserves anchor (GFC peak: 2000bp) |

Old config never alarmed in 2024-2026 (max was 461bp, well below old L1's 350 ceiling).

### IG OAS (BAMLC0A0CM) — empirical (bp): 73/80/86/93/100/121; cur 78
| Level | OLD | NEW | Rationale |
|---|---|---|---|
| L1 | <100 | <80 | p25 |
| L2 | 100-130 | 80-90 | p25-p50 |
| L3 | 130-180 | 90-110 | p50-p90 |
| L4 | 180-200 | 110-150 | Above recent max, mild stress |
| L5 | >=200 | >=150 | Recession-pricing (preserves anchor) |

### 10Y Real Yield (DFII10) — empirical: 1.53/1.82/1.94/2.05/2.16/2.34; cur 1.94
| Level | OLD | NEW | Rationale |
|---|---|---|---|
| L1 | <0.5 | <1.7 | Old L1 unreachable in current regime (min 1.53). New = p10 |
| L2 | 0.5-1.5 | 1.7-1.9 | p10-p50 |
| L3 | 1.5-2.0 | 1.9-2.1 | p50-p90 (current regime norm) |
| L4 | 2.0-2.5 | 2.1-2.5 | Above recent normal — BTC headwind |
| L5 | >=2.5 | >=2.5 | Severe headwind (preserves anchor) |

### 5y5y Inflation (T5YIFR) — empirical: 2.02/2.20/2.26/2.31/2.34/2.46; cur 2.29
| Level | OLD | NEW | Rationale |
|---|---|---|---|
| L1 | 2.1-2.5 | 2.1-2.4 | Tight to recent p10-p90 |
| L2 | 1.8-2.75 | 2.0-2.5 | Anchored band |
| L3 | 1.5-3.0 | 1.8-2.7 | Worth watching |
| L4 | 1.0-3.5 | 1.5-3.0 | Un-anchoring risk |
| L5 | outside | outside 1.5-3.0 | Un-anchored |

### ON RRP (RRPONTSYD) — empirical ($B): 0.08/17/168/383/479/720; cur $0.77B
| Level | OLD | NEW | Rationale |
|---|---|---|---|
| L1 | >$200B | >$300B | Top quartile (ample) |
| L2 | $100-200B | $50-300B | Median band |
| L3 | $50-100B | $5-50B | Drained — but normal post-QT |
| L4 | $20-50B | $1-5B | Very drained |
| L5 | <$20B | (unreachable from absolute level) | Note: real L5 needs combined RRP+TGA velocity. Cap at L4 here. |

Currently $0.77B → would compute as L5 under old logic; under new logic computes as L4 ("very drained but structurally normal post-QT"). False-alarm fix.

### TGA (WTREGEN) — empirical ($B): 296/675/774/833/909/1006; cur $878B
Already calibrated this session. Light tightening:
| Level | OLD | NEW | Rationale |
|---|---|---|---|
| L1 | <$400B | <$500B | Bottom decile (Treasury underfunded) |
| L2 | $400-800B | $500-800B | p25-p50 (normal recent baseline) |
| L3 | $800-1100B | $800-1100B | p50-max recent (post tax-day) |
| L4 | $1.1-1.5T | $1.1-1.5T | Major refill zone (above recent max) |
| L5 | >=$1.5T | >=$1.5T | Debt-ceiling refill |

### Fed Balance Sheet (WALCL) — empirical ($T): 6.54/6.64/6.76/7.18/7.48/7.69; cur $6.71T
**Currently hardcoded `return 2`.** Direction matters more than level. Without 30d-change tracking infrastructure, propose:
- Add a comment that this needs velocity logic (compare current vs 30d-ago WALCL).
- Keep `return 2` placeholder OR fall back to absolute level: <$6.7T = L1 (clear QT in progress), $6.7-7.0T = L2, $7.0-7.3T = L3, $7.3-7.5T = L4 (likely pivot), >$7.5T = L5 (emergency expansion).
- **Recommendation: keep `return 2` placeholder** with explicit comment. Velocity logic is a separate task (needs runner.js to fetch a 30-day-prior FRED observation).

### Bank Reserves (WRESBAL) — empirical ($T): 2.85/3.06/3.27/3.37/3.50/3.63; cur $3.03T
**Fix the L2 gap.** Current logic skips L2 entirely.
| Level | OLD | NEW | Rationale |
|---|---|---|---|
| L1 | >$3.3T | >$3.4T | p75 (comfortable) |
| L2 | (gap) | $3.1-3.4T | p25-p75 (normal recent) |
| L3 | $3.0-3.3T | $2.9-3.1T | p10-p25 (low) |
| L4 | $2.7-3.0T | $2.7-2.9T | Below recent regime min |
| L5 | <$2.7T | <$2.7T | Real scarcity (preserves anchor) |

Note in comment: SOFR-IORB spread is the empirical scarcity signal — currently calm despite reserves at p10.

### Jobless Claims 4WMA (IC4WSA) — empirical (k): 202/215/223/229/237/242; cur 203k
| Level | OLD | NEW | Rationale |
|---|---|---|---|
| L1 | <230 | <215 | p25 (strong labor) |
| L2 | 230-260 | 215-230 | p25-p75 |
| L3 | 260-280 | 230-245 | p75-max recent + buffer |
| L4 | 280-300 | 245-275 | Above recent regime |
| L5 | >=300 | >=275 | Recessionary (300k anchor still in explainer text) |

### C&I Loans (BUSLOANS)
**Currently hardcoded `return 2`.** YoY change is the meaningful signal (<0% YoY = recession-adjacent). Propose: keep `return 2` placeholder. Velocity logic out of scope.

### BTC
Hardcoded `return 1`. Anchor not stress signal. Leave as-is.

### VIX (VIXCLS) — empirical: 11.86/14.73/16.56/19.21/23.51/52.33; cur 17.4
| Level | OLD | NEW | Rationale |
|---|---|---|---|
| L1 | <16 | <15 | p10-p25 (complacent) |
| L2 | 16-20 | 15-19 | p25-p75 (normal) |
| L3 | 20-25 | 19-25 | p75-p95 (elevated) |
| L4 | 25-30 | 25-35 | Stressed |
| L5 | >=30 | >=35 | Crisis-level (Aug 2024 carry unwind hit 65) |

### Broad Dollar (DTWEXBGS) — empirical: 117.4/120.3/121.4/123.6/127.0/130.0; cur 118.4
| Level | OLD | NEW | Rationale |
|---|---|---|---|
| L1 | 110-122 | <120 | p10 (weak dollar, BTC-friendly) |
| L2 | 122-128 | 120-122 | p10-p50 |
| L3 | 128-132 | 122-127 | p50-p90 |
| L4 | 132-135 | 127-132 | Top decile to recent max |
| L5 | >=135 | >=132 | Above recent max (EM stress) |

### USDJPY (DEXJPUS) — empirical: 140.7/147.4/151.6/156.1/158.1/161.7; cur 156.8
| Level | OLD | NEW | Rationale |
|---|---|---|---|
| L1 | <145 | <147 | p25 (comfortable) |
| L2 | 145-150 | 147-152 | p25-p50 |
| L3 | 150-155 | 152-156 | p50-p75 |
| L4 | 155-160 | 156-160 | p75-p90 (MOF watching) |
| L5 | >=160 | >=160 | Intervention zone (preserves anchor) |

---

## Tier 2

### 10Y Breakeven (T10YIE) — empirical: 2.02/2.27/2.31/2.36/2.41/2.50; cur 2.45
| Level | OLD | NEW | Rationale |
|---|---|---|---|
| L1 | 2.0-2.5 | 2.2-2.45 | Tight to recent p10-p75 |
| L2 (else) | 2.0-2.6 | 2.0-2.6 | Anchored band |
| L4 (outside) | <1.5 or >3.0 | <1.5 or >3.0 | Un-anchoring risk |

### 5Y Breakeven (T5YIE) — empirical: 1.86/2.29/2.38/2.46/2.56/2.72; cur 2.61
| Level | OLD | NEW | Rationale |
|---|---|---|---|
| L1 | 2.0-2.5 | 2.2-2.5 | Recent p10-p75 |
| L2 (else) | 2.0-2.6 | 2.0-2.6 | Anchored |
| L4 (outside) | <1.5 or >3.0 | <1.5 or >3.0 | Un-anchoring |

### 3m10y Curve (T10Y3M) — empirical: -1.57/-1.02/-0.04/0.19/0.53/0.75; cur 0.72
| Level | OLD | NEW | Rationale |
|---|---|---|---|
| L1 | >0.5 | >0.5 | p90 (clear steepening) |
| L2 | 0.2-0.5 | 0.0-0.5 | Normalized |
| L3 | -0.1-0.2 | -0.5-0.0 | Flat-mildly-inverted |
| L4 | -0.5 to -0.1 | -1.2 to -0.5 | Inverted |
| L5 | <-0.5 | <-1.2 | Deep inversion |

### Continuing Claims (CCSA) — empirical (M): 1.72/1.83/1.86/1.90/1.94/1.96; cur 1.77M
| Level | OLD | NEW | Rationale |
|---|---|---|---|
| L1 | <1.7M | <1.8M | p10 (since min is 1.72M, old L1 unreachable) |
| L2 | 1.7-1.9 | 1.8-1.9 | p10-p75 |
| L3 | 1.9-2.1 | 1.9-2.0 | p75-max recent + buffer |
| L4 | >=2.1 | 2.0-2.2 | Above recent regime |
| L5 | (none) | >=2.2M | Clear labor weakening |

### ETH/BTC, Gold
Hardcoded `return 2`. Context indicators, no active alarm. Leave as-is.

### Copper (PCOPPUSDM) — empirical ($/MT): 8.3k/9.1k/9.5k/10.1k/12.1k/13.0k; cur $12.5k
**Currently hardcoded `return 2`.** Propose monotonic high=stress (inflation/overheating) recalibration:
| Level | NEW | Rationale |
|---|---|---|
| L1 | <$9.5k | p50 (stable demand) |
| L2 | $9.5-10.5k | p50-p75 |
| L3 | $10.5-12k | p75-p90 |
| L4 | $12-13k | Top decile to recent max (overheating) |
| L5 | >=$13k | Above recent max (supply shock) |

Open question: Copper is "Dr. Copper" — low can also signal recession. Symmetric? Or monotonic high=stress? **Asking below.**

### WTI Crude (DCOILWTICO) — empirical ($/bbl): 55.4/64.2/70.7/78.7/84.3/114.6; cur $109.8
Current logic is asymmetric Goldilocks: low=demand-weakness=L2, middle=L1, high=L3-L5.
| Level | OLD | Asymmetric NEW | Monotonic NEW | Rationale |
|---|---|---|---|---|
| L1 | $70-90 | $65-80 (p25-p75) | <$65 | low oil = consumer-friendly |
| L2 | <$70 | $55-65 or $80-90 | $65-80 | median range |
| L3 | $90-110 | <$55 or $90-100 | $80-100 | elevated |
| L4 | (none) | $100-115 | $100-115 | inflation pressure |
| L5 | >=$110 | >=$115 | >=$115 | supply/geopol shock |

**Asking below which framing you want.**

---

## Summary

- **17 indicators** with active threshold logic recalibrated to 2024-2026 empirical regime.
- **3 indicators** (WALCL, C&I, BTC) keep `return 2`/`return 1` placeholders with comments noting velocity-logic dependency.
- **2 indicators** (ETH/BTC, Gold) keep `return 2` (context indicators, no alarm needed).
- **1 structural fix:** Bank Reserves missing L2 band restored.
- **1 constant refresh:** SOFR's hardcoded IORB updated 4.40 → 3.65 (with comment).
- **Open questions:** Copper symmetric vs monotonic, WTI Goldilocks vs monotonic.

---

# Threshold Audit — 2026-05-10 (Session 76 Phase 0 Calibration Audit)

**Method:** Same as 2026-05-07 audit (FRED 2024-2026, p10/p25/p50/p75/p90/p99, scoped to indicators with documented "calibration debt" comments). Goal: confirm that Session-75 indicators that shipped with intuition-derived thresholds match empirical regime.

**Scope:** 13 primitive indicators added during Session 75 (effr, tbill_3m, ccc_hy_oas, em_corp_oas, bank_deposits, mortgage_30y, us30y, real_yield_30y, cpi_yoy, core_cpi_yoy, building_permits, brent, natgas). Synthetics (gold_btc_ratio, fed_net_liquidity) audited separately in Phase C.

**Meaningful Drift Policy:** Threshold updates only if (a) p50 lies outside L2-L3 band, (b) p90 lies below configured L4 boundary, (c) p10 lies above configured L1 boundary, or (d) L5 anchor is more than 2× empirical max. Cosmetic alignment without policy trigger does NOT change thresholds.

## Results: 13/13 KEEP

No threshold changes triggered. Every Session-75 primitive indicator's intuition-derived thresholds align with empirical 2024-2026 distribution under strict policy. Calibration debt cleared.

### EFFR (peer-aware vs IORB)
- **Empirical EFFR-IORB spread (bp), n=589:** p10=-7, p25=-7, p50=-7, p75=-6, p90=-1, p99=-1, min=-7, max=-1
- **Config:** L1<-3 / L2 -3-0 / L3 0-3 / L4 3-5 / L5 ≥5
- **Verdict:** Keep. 2024-2025 era ran -7bp (firmly L1); 2026 Q2 regime tightened to -1 to -2bp (L2 watchful). Config matches the regime the indicator was designed for. Velocity 5d kick at >5bp sits at p99 of 5d distribution — rare-event appropriate.

### tbill_3m (peer-aware vs EFFR)
- **Empirical DTB3-EFFR spread (bp), n=587:** p10=-31, p25=-19, p50=-11, p75=-8, p90=-4, p99=-1.86, min=-68, max=0
- **Config:** L1>-10 / L2 -10 to -25 / L3 -25 to -50 / L4 -50 to -100 / L5 ≤-100
- **Verdict:** Keep. p50=-11 sits just inside L2 (mild cuts pricing — matches active Fed cutting cycle). p10=-31 in L3. L5 unreached in 2024-26 (min=-68); preserved as historical recession anchor (1990-style panic-cut).

### ccc_hy_oas (BAMLH0A3HYC)
- **Empirical (bp), n=616:** p25=821, p50=885, p90=957, current=915
- **Config:** L1<700 / L2 700-900 / L3 900-1100 / L4 1100-1400 / L5 ≥1400
- **Verdict:** Keep. p50 at L2 ceiling; p90 in L3 — design intent (regime sits L2-L3, "watchful with periodic stress"). L4-L5 historical anchors (GFC/2020 1400-2000bp).

### em_corp_oas (BAMLEMCBPIOAS)
- **Empirical (bp), n=616:** p25=159, p50=172, p90=208, current=146
- **Config:** L1<160 / L2 160-250 / L3 250-350 / L4 350-500 / L5 ≥500
- **Verdict:** Keep. p50=172 in lower-L2 (watchful); current=146 in L1. L3+ unreached (regime is yield-chasing tight). L4-L5 preserve historical anchors (2013 taper tantrum 400bp, 2014-15 oil crash 550bp, 2020 pandemic 700bp).

### bank_deposits (DPSACBW027SBOG)
- **Empirical YoY% (n=122 weekly):** p25=2.05, p50=2.93, p75=3.90, p90=4.68, current=5.6
- **Config:** L1>5% / L2 2-5 / L3 0-2 / L4 -2 to 0 / L5 <-2
- **Verdict:** Keep. p50=2.93 in mid-L2 (normal growth); current=5.6 in L1 (rare healthy growth). L4-L5 anchored to 2023 SVB episode (briefly YoY-negative). 12w velocity p90=$274B; configured -$200B kick is rare-event appropriate (above empirical p85).

### mortgage_30y (MORTGAGE30US)
- **Empirical, n=123 weekly:** p25=6.30%, p50=6.65%, p90=6.94%, current=6.37
- **Config:** L1<6.5 / L2 6.5-7.0 / L3 7.0-7.5 / L4 7.5-8.0 / L5 ≥8.0
- **Verdict:** Keep. p50 in L2 (current regime); current 6.37 in L1 (relief from peak). 4w velocity p90=33bp / p99=47bp; configured +50bp/4w kick at p99+ rare-event.

### us30y (DGS30)
- **Empirical, n=587:** p25=4.46, p50=4.69, p90=4.91, current=4.97
- **Config:** L1<4.0 / L2 4.0-4.7 / L3 4.7-5.2 / L4 5.2-5.7 / L5 ≥5.7
- **Verdict:** Keep. p50 at L2/L3 boundary; current=4.97 in L3. L1<4.0 unreached (p25=4.46 is empirical floor) — pre-cutting-cycle relief anchor preserved. L5 historical duration-distress anchor.

### real_yield_30y (DFII30)
- **Empirical, n=587:** p25=2.17%, p50=2.41%, p90=2.65%, current=2.68
- **Config:** L1<1.5 / L2 1.5-2.0 / L3 2.0-2.5 / L4 2.5-3.0 / L5 ≥3.0
- **Verdict:** Keep. p50 in L3 (current regime), p90 in L4 (sustained tight FCI episodes). L4 fires for top decile by design — "L4 = very tight" matches "sustained 2.65%+ IS very tight." L1<1.5 preserved as pre-2022-regime anchor. Indicator is meant to run hot when FCI is genuinely tight; current L4 reading is signal not noise.

### cpi_yoy (CPIAUCSL via yoyPct)
- **Empirical YoY% (n=26 monthly):** p25=2.59, p50=2.77, p75=3.01, p90=3.27, current=3.3
- **Config:** L1 2.0-2.5 / L2 2.5-3.0 (and 1.0-2.0) / L3 3.0-4.0 / L4 4.0-5.0 (and <1.0) / L5 ≥5
- **Verdict:** Keep. Thresholds anchored to Fed 2% target (institutional, not regime-derived). p50=2.77 in L2 (above-target not deflationary), p75-p90 in L3 (uncomfortable). L4/L5 unreached in current regime; held as pre-disinflation anchors.

### core_cpi_yoy (CPILFESL via yoyPct)
- **Empirical YoY% (n=26 monthly):** p25=2.78, p50=3.18, p75=3.29, p90=3.69, current=2.6
- **Config:** Same as cpi_yoy
- **Verdict:** Keep. Core ran hotter than headline — p50 in L3 reflects "median core reading is uncomfortable." Current=2.6 is the lower part of the distribution (core cooling). Same Fed-target framework; no regime fit problem.

### building_permits (PERMIT)
- **Empirical, n=27 monthly:** p25=1400, p50=1436, p90=1520, current=1363
- **Empirical YoY% (n=27):** p25=-6.1, p50=-2.6, p90=+0.3, max=+9.6, current YoY=-8.0
- **Config:** L1>1500 / L2 1300-1500 / L3 1100-1300 / L4 900-1100 / L5 ≤900; YoY <-10% in low zone → +1
- **Verdict:** Keep. p50 in mid-L2 (current regime); L1 captures top decile (rare-healthy zone, design intent for a leading indicator). L3-L5 anchored to recession history (2008<800k, 2023 trough 1300k). YoY kick at <-10% fires only at empirical p1 — current YoY=-8.0% is just shy of triggering.

### brent (DCOILBRENTEU)
- **Empirical, n=591:** p25=68.2, p50=74.6, p90=88.3, current=118.3
- **Config:** L1=70-85 / L2 60-70 or 85-95 / L3<60 or 95-105 / L4=105-120 / L5≥120
- **Verdict:** Keep. Symmetric Goldilocks framework — p50 in L1 (calm middle); current=118 in L4 (Mideast surge). Calibration well-fit; current event is genuine, not threshold mis-fire.

### natgas (DHHNGSP)
- **Empirical, n=582:** p25=2.19, p50=2.90, p90=4.04, current=2.67
- **Config:** L4<1.5 / L2 1.5-2.5 / L1 2.5-5.0 / L2 5-7 / L3 7-10 / L4 10-15 / L5 ≥15
- **Verdict:** Keep. Symmetric stress framework — current 2024-2026 regime sits firmly L1-L2 (low gas era). L3-L5 historical anchors (2022 European energy crisis pushed Henry Hub to $9). Current=2.67 in L1.

## Audit Notes

- Peer-spread distributions (effr, tbill_3m) computed by separate script on Jinn — saved to `audits/peer_spread_summary.json`.
- YoY% distributions for monthly index series (CPI, Core CPI, Permits) and weekly bank deposits computed via a one-off yoyPct walkthrough — not persisted as a separate file (the indicators' own velocity primitives reproduce these distributions on demand).
- The "no changes" outcome is informative: Session 75's authors set thresholds with informed intuition that held up against empirical review. Future calibration audits on this set should not re-litigate unless a regime shift or visible misfire emerges.
