# Stress Aggregation Research

> Research brief on how to aggregate ~78 indicator-level signals (1–10 each, L1–L5 each) into a single headline "macro stress index" without averaging away the worst pocket. Current implementation uses an even-weighted average. This is wrong: macro stress is non-linear and propagates from the weakest pocket. One indicator at L5 (e.g. SOFR spike, swap lines, repo plumbing breaking) can blow up the macro complex regardless of where calm pockets sit.

---

## 1. Formal names for the problem

**Composite stress-index aggregation.** Standard frame in central-bank literature: the problem of combining many normalized stress signals into a single index in a way that preserves the systemic-risk intuition that stress is non-additive (Holló, Kremer, Lo Duca 2012; Monin 2019). The dominant institutional answer is PCA / dynamic-factor models, which collapse to a weighted average and therefore inherit the "average-away" pathology when one pocket is on fire and the rest are quiet.

**Weakest-link / min-max aggregation.** In production economics the Leontief production function `Q = min(x₁/a₁, …, xₙ/aₙ)` formalizes the idea that a system runs at the speed of its weakest input. Used in supply-chain systemic-risk work where one critical firm defaulting propagates through the network (Acemoglu et al. 2015; nature.com supply-network paper). The user's "max-pool the pockets" intuition is the dual: stress = max not min, but the math family is the same — order statistics, not means.

**Ordered Weighted Averaging (OWA) operators.** Yager 1988. A parametric family of aggregators sitting between min and max: rank the inputs descending, then dot-product against a fixed weight vector. Special cases: max (w=[1,0,…,0]), mean (w=[1/n,…]), min (w=[0,…,0,1]), trimmed mean, median. Lets you pick how "pessimistic" the aggregator is via the orness parameter. Directly applicable to "top-3 worst pockets dominate."

**CVaR / Expected Shortfall.** Average of the worst α% of outcomes in a distribution. Coherent risk measure (Artzner et al. 1999). Same flavor: weight the tail, not the body. Adapted here as "headline = mean of pockets in the top quartile."

**Time-varying-correlation composite (CISS family).** Holló, Kremer, Lo Duca 2012 ECB. Aggregates sub-indices using a portfolio-variance formula where the correlation matrix is computed as an EWMA of pairwise correlations. The composite jumps non-linearly when sub-indices become co-correlated — i.e. when stress is broadcast across pockets, not isolated. This is the closest formal match to the user's intuition of "worst pocket dominates and contagion makes it worse."

**Network systemic-risk measures.** CoVaR (Adrian & Brunnermeier), MES / SRISK (Acharya, Engle, Richardson, Brownlees). Firm-level not pocket-level, but the philosophical move is identical: condition on stress somewhere in the system rather than averaging across calm and stressed segments.

---

## 2. CISS methodology in detail

CISS (Composite Indicator of Systemic Stress) is the methodology to study for this problem. It is published by the ECB at daily frequency, has been operational since 2012, and has been extended for sovereign stress (SovCISS) and a country-level CISS for ~30 countries. The math is in three layers.

### Layer 1 — Raw indicator normalization via empirical CDF

For each raw stress measure `xᵢ,ₜ` (15 of them in the original CISS), compute its sample rank `r(xᵢ,ₜ)` over the historical window, with average-rank tie-breaking. Define

```
zᵢ,ₜ = r(xᵢ,ₜ) / N
```

where N is the sample size. This maps every raw indicator to a value in `[0, 1]` interpretable as a probability of non-exceedance. Critically:

- It is **scale-free** (yield spreads, vol, default rates all end up on the same `[0,1]` axis)
- It is **robust to outliers** (rank, not value)
- It naturally puts every indicator on a "how unusual is this reading historically" scale

This is the same step the user already does implicitly with 1–10 signal scoring, but anchored to the empirical distribution rather than hand-picked thresholds.

### Layer 2 — Sub-index aggregation (within pocket)

The 15 raw indicators are partitioned into 5 sub-indices: financial intermediaries, money markets, equity markets, bond markets, FX. Within each sub-index, the 3 stress factors are combined by simple arithmetic mean:

```
sⱼ,ₜ = (1/3) · Σ zᵢ,ₜ   for i in sub-index j
```

No fancy aggregation inside a pocket — the assumption is that within a pocket the 3 indicators are measuring the same underlying construct.

### Layer 3 — Composite aggregation (across pockets), portfolio-variance analog

Let `sₜ = (s₁ₜ, …, s₅ₜ)'` be the vector of 5 sub-index values. Let `w = (w₁, …, w₅)'` be a fixed weight vector (in the original paper, weights are calibrated to industrial-production impact via VAR analysis; for retail use, equal weights `w = (1/5, …)` are a reasonable default). Let `Cₜ` be a 5×5 time-varying correlation matrix between sub-indices, with off-diagonal entries `ρᵢⱼ,ₜ`. Then:

```
CISSₜ = (w ∘ sₜ)' · Cₜ · (w ∘ sₜ)
```

where `∘` is the Hadamard (element-wise) product. Expanded:

```
CISSₜ = Σᵢ Σⱼ wᵢ wⱼ sᵢ,ₜ sⱼ,ₜ ρᵢⱼ,ₜ
```

This is **exactly the portfolio-variance formula** with sub-indices in the role of asset risks and `ρᵢⱼ` in the role of return correlations. The intuition: when sub-indices are uncorrelated (`ρᵢⱼ ≈ 0` for i≠j), the composite collapses to a sum of squared weighted sub-indices — diversification benefits accrue and the composite stays muted even when one pocket is hot. When sub-indices become co-correlated (`ρᵢⱼ → 1`), the composite blows up super-linearly because the cross-terms all add positively.

### Layer 3b — Time-varying correlations via EWMA

`Cₜ` is computed as an exponentially weighted moving average of pairwise cross-products of (demeaned) sub-indices, with smoothing parameter λ = 0.93 in the original paper (chosen to match a ~25-day half-life, daily data):

```
σᵢⱼ,ₜ = λ · σᵢⱼ,ₜ₋₁ + (1 - λ) · (sᵢ,ₜ - s̄ᵢ)(sⱼ,ₜ - s̄ⱼ)
ρᵢⱼ,ₜ = σᵢⱼ,ₜ / √(σᵢᵢ,ₜ · σⱼⱼ,ₜ)
```

EWMA recovers the "this regime, not all of history" property — when correlations regime-shift up during a crisis, the matrix tracks the shift within weeks rather than waiting decades for the long-run sample correlation to update.

### Worked toy example (3 pockets, equal weights)

Assume `w = (1/3, 1/3, 1/3)` and three pockets at sub-index values `s = (0.2, 0.2, 0.9)` — two pockets calm, one pocket at L5.

**Even-weighted average (current dashboard):** `headline = (0.2 + 0.2 + 0.9) / 3 = 0.43`. Result: dashboard reads "elevated but not critical." This is the failure mode.

**CISS with low correlations** (`ρ = 0.1` off-diagonal): `headline ≈ 0.039 · (1 + small cross-terms) ≈ 0.045`. Diversification still dominates because the hot pocket is isolated.

**CISS with high correlations** (`ρ = 0.8`, contagion regime): the cross-terms `2 · (1/3)² · 0.2 · 0.9 · 0.8` are activated for both pairings of the hot pocket with calm pockets. `headline ≈ 0.039 · (1 + 0.8·(2·0.2·0.2 + 2·0.2·0.9 + 2·0.2·0.9)/0.85) ≈ 0.12`. The same hot pocket reads ~3x higher because correlation regime says the hot pocket is broadcasting.

The two takeaways: (1) CISS *does not* by itself solve the "max-pool the worst pocket" intuition — a single hot pocket on its own still gets diversified down. (2) CISS *does* solve the contagion problem — once stress propagates and correlations rise, the composite explodes.

---

## 3. Comparison table

| Index | Source | Aggregation | # sub-indices | Solves pocket-dominance? |
|---|---|---|---|---|
| OFR FSI | US Office of Financial Research, Monin 2019 | Dynamic factor model (≈ first principal component) over standardized z-scores; 33 indicators in 5 categories (credit spreads, equity valuation, funding, safe assets, volatility) | 5 categories, decomposable by region (US / advanced / EM) | No — single latent factor weighted-average. Diversifies away isolated stress. |
| St. Louis Fed STLFSI | FRED STLFSI4 | First principal component of 18 standardized stress series (7 rates, 6 spreads, 5 other) | None — flat | No — pure PCA, single weighted-average projection. |
| Kansas City Fed KCFSI | KC Fed | First principal component of 11 monthly market variables, scaled so SD=1 | None — flat | No — PCA. |
| Cleveland Fed CFSI (discontinued 2016) | Cleveland Fed | Credit-weighted dynamic aggregation over 6 markets (credit, equity, FX, funding, real estate, securitization); spread-based components | 6 markets | Partial — dynamic weights, but discontinued due to construction errors that overweighted real estate / securitization. |
| Chicago Fed NFCI | Chicago Fed | Dynamic factor model over 105 measures, with risk / credit / leverage sub-indexes; weekly | 3 sub-indices | No — factor model. |
| **ECB CISS** | Holló, Kremer, Lo Duca 2012, ECB WP 1426 | Portfolio-variance analog: `(w∘s)'·Cₜ·(w∘s)` with EWMA cross-correlations λ=0.93; sub-indices arithmetic-mean of 3 empirical-CDF-transformed raw measures | 5 (intermediaries, money market, bond, equity, FX) | **Yes — non-linear in correlation regime.** Single hot pocket isolated → diversified. Multiple hot pockets co-moving → super-linear blow-up. |
| Bloomberg BFCI | Bloomberg | Equally-weighted z-score average across 3 sub-indices (money market 1/3, bond 1/3, equity 1/3); ~50 inputs normalized to pre-crisis baseline | 3 | No — equal-weight average, same pathology as user's current dashboard. |
| IMF GFSR composite | IMF Monitoring Framework 2019 | OECD-handbook three-step: normalize, aggregate to sub-indices, aggregate sub-indices to composite; arithmetic | Varies by report | No — standard OECD composite-indicator method. |

The honest read: **only CISS does what the user is asking for**, and even CISS doesn't fully solve the single-isolated-pocket case. The Fed family is PCA all the way down. Bloomberg is the same equal-weight pathology the user has now. The user's intuition is a known frontier in this literature.

---

## 4. Architecture options for the dashboard

### Option A — Simple max-pool

```
pocket_levelⱼ = mean(indicator_level over indicators in pocket j)
headline = max(pocket_level₁, …, pocket_levelₖ)
```

- **Pros:** Trivial. Transparent — the dashboard can literally show "headline = pocket X at L5." Exactly the "weakest link" intuition. No calibration beyond pocket grouping.
- **Cons:** A single noisy indicator can drag a whole pocket up and the whole headline with it. No nuance between "one pocket at L5, four at L1" and "one pocket at L5, four at L4." Reads identical.
- **Calibration:** Just the pocket grouping (~10 pockets).
- **Complexity (Node):** ~20 lines. Already half-built — just group and `Math.max`.

### Option B — Top-k weighted (truncated OWA)

```
pocket_levelⱼ = mean(indicator_level over pocket j)
sorted = sort(pocket_levels, descending)
headline = 0.5·sorted[0] + 0.3·sorted[1] + 0.2·sorted[2]
```

- **Pros:** Smooths Option A's single-noisy-pocket problem. Captures "two or three pockets hot" as worse than "one pocket hot." Tunable via the weight vector. Direct instance of Yager's OWA operator.
- **Cons:** k and the weight vector are calibration choices. Top-3 is arbitrary. If the user has 10–15 pockets, top-3 ignores 70%+ of the data.
- **Calibration:** k (suggest 3), weight vector (suggest 0.5/0.3/0.2 — moderate pessimism).
- **Complexity (Node):** ~30 lines. Sort + dot-product.

### Option C — CISS-style with cross-pocket correlation weighting

```
pocket_levelⱼ = mean(empirical_CDF(indicator_value) over pocket j)
Cₜ = EWMA correlation matrix of pocket_levels over rolling window
w = equal weights (or calibrated)
headline = sqrt((w∘sₜ)' · Cₜ · (w∘sₜ))   // sqrt to keep scale interpretable
```

- **Pros:** Best theoretical match. Captures contagion regime — when pockets co-move, headline jumps non-linearly. Battle-tested by ECB since 2012. Lets the dashboard show "correlation regime: contagious" as a separate readout.
- **Cons:** Requires a rolling history of pocket levels (months of daily snapshots) before correlations stabilize. EWMA λ is a choice. *Does not by itself solve the single-isolated-pocket case* — a lone L5 pocket gets diversified down unless something else is also moving. Less transparent — non-technical readers will not understand `(w∘s)'·C·(w∘s)`.
- **Calibration:** EWMA λ (start with 0.93 daily, 0.97 for weekly cadence); weight vector; rolling-window length.
- **Complexity (Node):** ~150 lines. Needs persistence of pocket-level history, EWMA bookkeeping, matrix math (3x3 to 15x15). Manageable but the biggest of the four.

### Option D — Tail-conditional aggregation (CVaR-flavored)

```
pocket_levelⱼ = mean(indicator_level over pocket j)
threshold = top quartile cutoff of pocket levels
headline = mean(pocket_level for pocket where pocket_level >= threshold)
```

- **Pros:** Explicit "headline = average of the worst quarter of pockets." Robust to noise (averaging, not max). Coherent risk measure (CVaR family). Simple to explain: "we measure the stress level of the worst pockets, ignoring the calm ones."
- **Cons:** With ~10 pockets, top-quartile is 2–3 pockets — close to Option B in practice. Threshold percentile is a knob. Discontinuous when a pocket crosses the cutoff (a pocket at the cutoff bumping up changes both the numerator and the denominator).
- **Calibration:** Percentile cutoff (suggest top 25% or top 33%).
- **Complexity (Node):** ~40 lines. Sort + filter + mean.

---

## 5. Recommendation for the user's case

**Ship Option B (top-k weighted OWA) first, with weights 0.5 / 0.3 / 0.2 over the top 3 pockets.** Treat it as the v1 headline.

Reasoning specific to this dashboard:

- **Retail / educational purpose:** The headline has to be explainable to a non-quant audience. "We take the average of the three worst pockets, weighting the worst one most heavily" passes the parent-test. `(w∘s)'·Cₜ·(w∘s)` does not.
- **Transparency matters:** When the headline reads L4, the user can immediately show *which three pockets are driving it*. Option C makes that attribution noisy because the cross-correlation matrix smears responsibility across pairs.
- **No long history yet:** CISS-style correlation weighting needs months of stable pocket-level history before `Cₜ` is reliable. The dashboard is too young.
- **78 indicators / ~10 pockets is the right ratio for Option B:** k=3 captures the worst-pocket signal without single-pocket noise dominating, and 7 calmer pockets still get represented through the weighting cutoff.
- **Node implementation is one afternoon, not one week.**

**Then layer a "contagion regime" indicator on top (CISS-lite).** Compute pairwise rolling correlations across pocket levels (no full matrix math needed — just N choose 2 pairs, EWMA each). When the average pairwise correlation crosses a threshold (e.g. ρ̄ > 0.5), surface a separate "contagion regime: ON" badge next to the headline. This gives the non-linear contagion signal without making the headline itself opaque. Two readouts: the Option B max-pool headline ("how stressed is the worst pocket cluster") and the correlation-regime badge ("is stress broadcasting").

**Skip Option A** — too lossy. **Skip Option D** for v1 — same family as Option B but with worse failure modes at the percentile boundary. Revisit Option C once 6+ months of pocket-level history exists, and only if the regime badge proves insufficient.

---

## 6. Edge cases and calibration concerns

**Single-indicator L5 from calibration error (false positive).** Mitigation: require ≥2 indicators in a pocket at L4+ before the pocket itself can read L5. Equivalently, take the pocket-level as a trimmed mean (drop the highest single indicator) when only one indicator is hot. Prevents a single mis-calibrated threshold from blowing up the headline.

**Cross-pocket contagion (causal upstream).** SOFR plumbing → credit → equity is the canonical chain. Option B alone won't capture this — it sees the three downstream pockets all moving and reports an L4 average, but doesn't tell the user the *cause* is the funding pocket. Mitigation: assign a small "contagion premium" to the funding-plumbing pocket so it's weighted higher when it leads the others. Or surface a causal-graph view alongside the headline showing which pocket led the others by N days (lead-lag correlation).

**Always-L4 indicators by design (e.g. `real_yield_30y` at structurally high level).** These pollute the pocket they belong to and bias the headline up. Mitigation: either (a) rescale each indicator's L1–L5 thresholds to its own recent regime (rolling-window percentiles, not absolute thresholds), or (b) explicitly tag "regime indicators" and exclude them from the OWA pool, displaying them separately as context.

**Stale / low-frequency indicators dominating a real-time headline.** Quarterly indicators (#117 FHLB, #129 Fed Interest Income) shouldn't push a daily headline. Mitigation: in pocket aggregation, weight indicators by `1 / max(days_since_last_update, freshness_floor)`. A 90-day-old reading gets ~5% the weight of a 1-day-old reading. Alternative: maintain two headlines, "real-time stress" (only indicators updated in last N days) and "structural stress" (full set).

**Empty pockets / pocket-membership churn.** New indicators added mid-quarter shouldn't suddenly reshape pocket means. Mitigation: define pocket membership in a versioned spec and snapshot it. Recompute history when membership changes.

**Pocket-grouping is itself the biggest calibration choice.** With 78 indicators and ~10 pockets, the assignment of indicator-to-pocket determines the headline far more than the OWA weights do. Get the user to commit to the pocket taxonomy in a written spec (looks like the INDICATORS.md section headers — funding plumbing, treasury market, credit, FX, sovereign, equity vol, energy, metals, crypto, banking, real economy, AI/labor, top-decile consumer, geopolitics, creative/pro) before tuning the aggregator.

---

## Summary

- **Closest formal-name match to user's intuition:** ECB CISS (Holló, Kremer, Lo Duca 2012) for contagion-aware aggregation; Yager OWA operators (1988) for the max-pool / weakest-link family.
- **Best architecture for this case:** Option B (top-3 weighted, 0.5/0.3/0.2) as the headline, with a CISS-lite "contagion regime" badge layered on top.
- **Key tradeoffs:** Transparency vs. theoretical elegance — Option C is the academic answer but opaque to retail users; Option B is explainable and ships in a day. CISS doesn't actually solve isolated-single-pocket — only contagion.
- **Edge case to watch:** Single-indicator L5 false positives from threshold miscalibration; require ≥2 indicators per pocket at L4+ before the pocket reads L5.
- **Surprise from the research:** Every major Fed FSI (STLFSI, KCFSI, NFCI, OFR) is PCA / factor-model — they all inherit the same average-away pathology the user is trying to escape. CISS is the *only* widely-published institutional index that actually addresses the problem, and even it solves contagion rather than the single-hot-pocket case. The user's intuition is at the research frontier of this literature, not behind it.

---

## Sources

- [ECB Working Paper 1426 — CISS (Holló, Kremer, Lo Duca 2012)](https://www.ecb.europa.eu/pub/pdf/scpwps/ecbwp1426.pdf)
- [SSRN — CISS portfolio-theoretic framework](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2018792)
- [OFR Financial Stress Index methodology (Monin 2019)](https://www.financialresearch.gov/working-papers/files/OFRwp-17-04_The-OFR-Financial-Stress-Index.pdf)
- [OFR FSI homepage](https://www.financialresearch.gov/financial-stress-index/)
- [St. Louis Fed STLFSI4](https://fred.stlouisfed.org/series/STLFSI4)
- [STLFSI version 2.0 methodology note](https://www.stlouisfed.org/on-the-economy/2020/march/financial-stress-index-version-2)
- [Kansas City Fed KCFSI methodology](https://www.kansascityfed.org/documents/5108/kcfsi-KCFSIJuly10.pdf)
- [Cleveland Fed CFSI working paper](https://www.clevelandfed.org/-/media/project/clevelandfedtenant/clevelandfedsite/publications/working-papers/2011/wp-1130-the-financial-stress-index-identification-of-systemic-risk-conditions-pdf.pdf)
- [Chicago Fed NFCI](https://www.chicagofed.org/research/data/nfci/about)
- [Fed FEDS Note — assessing and combining FCIs (2013)](https://www.federalreserve.gov/pubs/feds/2013/201339/201339pap.pdf)
- [IMF SDN — Monitoring Framework for Global Financial Stability (2019)](https://www.imf.org/-/media/Files/Publications/SDN/2019/SDNEA2019006.ashx)
- [Yager 1988 — OWA operators](https://www.semanticscholar.org/paper/On-ordered-weighted-averaging-aggregation-operators-Yager/6398f2a25cb985ee48e985314510b9f16b708397)
- [Wikipedia — OWA aggregation](https://en.wikipedia.org/wiki/Ordered_weighted_averaging_aggregation_operator)
- [Leontief production function — weakest-link math](https://en.wikipedia.org/wiki/Leontief_production_function)
- [Acemoglu et al. — Networks, Shocks, and Systemic Risk (NBER 20931)](https://www.nber.org/system/files/working_papers/w20931/w20931.pdf)
- [SRISK — Brownlees & Engle (ESRB WP 37)](https://www.esrb.europa.eu/pub/pdf/wp/esrbwp37.en.pdf)
- [Systemic risk measures review — Acharya et al.](https://w4.stern.nyu.edu/sternfin/vacharya/public_html/pdfs/working-papers/ABP_systemic_risk_ARFE_preprint.pdf)
- [ECB CISS data portal](https://data.ecb.europa.eu/data/datasets/CISS/data-information)
- [Measuring systemic financial stress and its risks for growth — ECB WP 2842](https://www.ecb.europa.eu/pub/pdf/scpwps/ecb.wp2842~9a4cb3f225.en.pdf)
