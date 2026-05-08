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
