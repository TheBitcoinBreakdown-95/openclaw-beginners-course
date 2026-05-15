# Headline Aggregator — User Reference

> What the single stress number on the dashboard actually means, how it's computed, what it captures, and what it does not. Audience: someone who opens the dashboard, sees a 1-10 number, and wants the full story. For the math and literature review behind these design choices, see [STRESS-AGGREGATION-RESEARCH.md](STRESS-AGGREGATION-RESEARCH.md).

---

## 1. What the headline number means

The dashboard ships a single 1-10 stress score with a one-word state label. **The score is not an average of all 78 indicators.** It is a top-3 weighted Ordered Weighted Average over 16 macro pockets, with the worst pocket carrying 50%, the second-worst 30%, and the third-worst 20%.

Verbal anchors on the 1-10 scale:

| Score | Label | Reading |
|---|---|---|
| < 3 | **Stable** | All pockets quiet. Background regime. |
| 3 – 5 | **Watching** | One pocket elevated, others calm. Worth checking but not acting. |
| 5 – 6.5 | **Elevated** | Multiple pockets at L3, or one at L4. Something is moving. |
| 6.5 – 8 | **Stressed** | A pocket has reached L4 (stress regime). |
| ≥ 8 | **Critical** | Multiple pockets at L4 or any pocket at corroborated L5. |

The reason the headline is not a simple average: macro stress does not propagate evenly. One pocket on fire (e.g. funding plumbing breaking in 2008, sovereign rates breaking in 2022 UK gilts) dominates the regime regardless of how calm the rest of the system is. The old even-weighted average across all 78 indicators averaged the worst pocket away — a known pathology of PCA-based composites (Fed FSI family).

---

## 2. The 16 pockets

Indicators are grouped into 16 pockets aligned with the section headers in `INDICATORS.md`. Pocket grouping is the core editorial call — it determines what the aggregator treats as "one pocket at a time." Configured in `.claude/macro-deploy/aggregator.js` under `POCKETS`.

| # | Pocket | Indicators (count) | Notes |
|---|---|---|---|
| 1 | Funding Plumbing | sofr, effr, on_rrp, tga, walcl, bank_reserves, swap_lines, discount_window, fima_repo, srf_usage, fails_to_deliver, fed_net_liquidity (12) | The repo / Fed-balance-sheet / TGA plumbing. Where 2008 and 2019 broke. |
| 2 | Treasury Market | us10y, us2y, us30y, curve_2s10s, curve_3m10y, tbill_3m, real_yield_10y, real_yield_30y, breakeven_5y, breakeven_10y, 5y5y_inflation, auction_bid_to_cover, auction_indirect_bidder, auction_primary_dealer, treasury_net_issuance (15) | US Treasury curve + auction quality. Largest pocket — most macro-load-bearing pieces live here. |
| 3 | Credit | hy_oas, ccc_hy_oas, ig_oas, em_corp_oas (4) | Corporate credit spreads (US HY, distress-tier CCC, IG, EM). |
| 4 | FX & Imbalances | dxy, usdjpy (2) | Broad dollar + the key carry pair. |
| 5 | Sovereign | jgb_10y, bund_10y, gilt_10y, oat_10y, italy_btp_10y, btp_bund_spread, oat_bund_spread (7) | Non-US sovereign rates + the two intra-Europe spreads that broke in 2010-12 and again 2022. |
| 6 | Equity Vol | vix, vix9d, vix3m, vix9d_vix_ratio, vix_vix3m_ratio, skew (6) | VIX term structure (backwardation in panic) + tail-hedge demand. |
| 7 | Energy | wti, brent, natgas (3) | Oil benchmarks + US natural gas. |
| 8 | Metals | copper, gold (2) | Dr. Copper (cycle) + Gold (anti-USD). |
| 9 | Agriculture & Shipping | (empty placeholder, see note) | Section 9 of the spec. No soft-commodity feeds shipped yet; Baltic Dry lives in Creative/Pro because that's where its fetcher landed. |
| 10 | Bitcoin | btc, btc_dominance, eth_btc, gold_btc_ratio, btc_perp_funding, hashrate_7dma, btc_realized_vol_30d, btc_spx_correlation_30d (8) | BTC price, dominance, ETH/BTC, gold/BTC ratio, funding, hashrate, realized vol, correlation to SPX. Excludes `stablecoin_supply` (digital-money expansion, not stress) and `sp500` (reference series, not stress). |
| 11 | Banking | bank_deposits, cre_loans, consumer_loans (3) | Deposit base + commercial-real-estate + consumer loan books. |
| 12 | Real Economy | jobless_claims, continuing_claims, ci_loans, jolts_quits, umich_sentiment, retail_sales_control, fed_interest_expense, mortgage_30y, building_permits, cpi_yoy, core_cpi_yoy (11) | Labor + consumer + housing + inflation + Fed interest expense. |
| 13 | AI & Labor | indeed_sw_dev_postings, hyperscaler_capex (2) | Indeed software-dev postings + the four hyperscalers' capex run-rate. |
| 14 | Top-Decile Consumer | (empty — Tier 3 reference cards only) | LVMH, Hermès, etc. Tier 3 = manual-lookup reference cards, no numeric level, not in aggregator. |
| 15 | Geopolitics | (empty — Tier 3 reference cards only) | Same as above. Tier 3 only. |
| 16 | Creative / Pro | baltic_dry (1) | Shipping (Baltic Dry) lives here. Reserved for future pro-tier feeds. |

### Indicators explicitly excluded

Two Tier-1 indicators are excluded from every pocket and never contribute to the headline:

- **`stablecoin_supply`** — measures growth of dollar-tokenized money. Read as a digital-money expansion signal, not stress.
- **`sp500`** — included on the dashboard only as a reference series for correlation calculations (`btc_spx_correlation_30d`). Not a stress measure in its own right.

These indicators show on the macro tab with the label *EXCLUDED FROM AGGREGATOR* so it's clear they are informational, not contributing.

### Empty pockets

Three pockets (Agriculture & Shipping, Top-Decile Consumer, Geopolitics) have zero active indicators today. They exist in the pocket map to preserve the 16-section taxonomy from `INDICATORS.md`. When they ship indicators, the aggregator picks them up automatically — no code change needed.

---

## 3. How a pocket gets its level

For each pocket, the level is a **stress-weighted, freshness-decayed mean** of its constituent indicator levels, with a corroboration rule preventing single-source L5s.

```
pocket_level = Σᵢ (level_i · weight_i · freshness_i) / Σᵢ (weight_i · freshness_i)
```

Three details:

1. **Stress weights** come from each indicator's configured `weight` field (default 7). Higher-signal indicators (SOFR, 10Y, HY OAS) get more pull than lower-signal ones inside the same pocket.
2. **Freshness decay** is `1 / max(days_since_update, 1)`, floored at 0.05. Quarterly-cadence indicators stop dominating the pocket once their reading is more than a day old. Without this, a stale Bank Deposits reading from three months ago would distort the Banking pocket today.
3. **≥2-indicator corroboration for L5.** A pocket can only reach the L5 floor if at least two of its indicators are at L4 or higher. Otherwise, a single mis-calibrated indicator (or genuinely isolated event) can't drag the whole pocket to crisis level via the weighted mean.

**Single-indicator pockets cannot trip L5 from one source.** This is a design choice. If FX shows USD/JPY at L5 alone, the FX pocket reads the indicator's level but doesn't get an L5 floor escalation. Two indicators must agree. The bar for "this pocket is in crisis" is two corroborating signals.

---

## 4. How the headline aggregates pockets

Once each pocket has a level (or null, for empty pockets), the headline is a **top-3 weighted Ordered Weighted Average** (Yager 1988):

1. Sort all pockets with non-null levels descending: `s₁ ≥ s₂ ≥ s₃ ≥ … ≥ sₙ`.
2. Take the top three: `s₁, s₂, s₃`.
3. Apply fixed weights: `headline_level = 0.5 · s₁ + 0.3 · s₂ + 0.2 · s₃`.
4. If fewer than three pockets have non-null levels, renormalize the weights over whatever is available.

The headline level is a 1-5 number. To map onto the 1-10 display scale:

```
score = (headline_level − 1) · 2.25 + 1
```

So `L1 → 1`, `L3 → 5.5`, `L5 → 10`.

This is a "moderate pessimist" OWA. Yager's OWA family covers everything from `max` (worst pocket wins, `w = [1, 0, 0]`) to `mean` (equal weights). The choice of `[0.5, 0.3, 0.2]` says: the worst pocket sets the regime, but a second hot pocket meaningfully escalates it, and a third adds a smaller marginal kick. It is between max-pooling and averaging — captures pocket dominance without single-pocket noise.

---

## 5. The contagion badge

The headline number captures *how bad the worst pockets are*. The contagion badge captures *whether pockets are moving together*. Both are needed: a single hot pocket isolated is locally bad; multiple pockets co-moving is the regime-change signal.

### What it tracks

Pairwise EWMA correlations across pocket-level time series. Every full refresh appends a daily snapshot of all pocket levels to `pocket-history.json`. Once 30 days of history accumulate, the dashboard:

1. Builds a time series for each pocket with sufficient data.
2. Computes the EWMA correlation `ρᵢⱼ` between every pair of pockets, using smoothing parameter `λ = 0.93` (≈25-day half-life, matching ECB CISS).
3. Averages all pairwise correlations into a single number `ρ̄`.

```
σᵢⱼ,ₜ = λ · σᵢⱼ,ₜ₋₁ + (1 − λ) · (sᵢ,ₜ − s̄ᵢ)(sⱼ,ₜ − s̄ⱼ)
ρᵢⱼ,ₜ = σᵢⱼ,ₜ / √(σᵢᵢ,ₜ · σⱼⱼ,ₜ)
ρ̄ = mean(ρᵢⱼ,ₜ)   over all i < j
```

### What the buckets mean

| `ρ̄` range | State | Reading |
|---|---|---|
| < 0.30 | **Isolated** | Hot pockets are moving on their own. Stress is sectoral, not systemic. |
| 0.30 – 0.50 | **Broadcasting** | Pockets are starting to co-move. Stress is spreading. |
| ≥ 0.50 | **Contagion Regime** | The system is moving as one. The canonical crisis signature (2008, March 2020, Sep 2022 gilts). |

This is the formalization of *contagion* — when one stressed pocket starts to drag others with it, average pairwise correlation rises. PCA-based Fed indices (STLFSI, KCFSI, NFCI, OFR) cannot capture this directly: they project everything onto a single weighted average, which loses the cross-pocket correlation structure.

The contagion measure here is "CISS-lite" — it borrows the EWMA correlation idea from Holló, Kremer & Lo Duca's 2012 ECB Composite Indicator of Systemic Stress, but reports `ρ̄` as a separate badge rather than rolling it into the headline. The full CISS formula `(w∘s)' · C · (w∘s)` makes the headline non-linear in correlation regime; the dashboard's split approach makes the contagion signal independently legible.

### Calibration

Requires 30 daily snapshots before activating. Until then, the badge shows **Calibrating (N / 30 days)** so the user knows when contagion will come online. The pocket-history file is appended once per full refresh in `runner.js all` (5 pm ET cron).

---

## 6. Edge cases handled

- **Single-indicator L5 false positives.** A lone L5 cannot pull a pocket to L5. Two indicators must corroborate. Single-indicator pockets (FX, AI & Labor, Banking with three) cannot reach L5 floor on one signal — they read the indicator's level and stop.
- **Always-L4-by-design indicators.** A few indicators (e.g. Fed Swap Lines, Discount Window) are configured to fire L4-L5 only on extreme readings that nearly never occur, with L1 as the modal state. These are not noise; they're tripwires. The aggregator treats them the same as everything else — weighted contribution to the pocket mean.
- **Stale low-frequency indicators.** Monthly / quarterly indicators (Bank Deposits, JOLTS, Building Permits) carry a freshness decay that drops their pocket contribution as their reading ages. A 3-month-old Bank Deposits reading pulls 1/90th of its fresh-day weight.
- **Empty pockets.** Agriculture & Shipping, Top-Decile Consumer, Geopolitics return `null` levels. They are visible in the pocket breakdown table but contribute zero to the headline. If they ship indicators, the aggregator picks them up — no code change.
- **Calibrating contagion.** Until 30+ days of pocket history exist, the contagion badge displays as *Calibrating* and the headline is unchanged. The headline is fully functional on day one — contagion is an add-on signal.

---

## 7. What the headline does NOT capture

A short, honest list of the things this aggregator design will miss:

- **Causal lead-lag.** If funding plumbing reliably leads credit by 4-6 weeks, the EWMA correlation will pick that up only after the credit pocket has moved. Detecting "funding is moving, expect credit to follow" requires lagged-correlation analysis or a dedicated lead-lag model. Not in scope here.
- **Idiosyncratic single-indicator stress.** A lone indicator at L5 inside an otherwise calm pocket may be a genuine early signal (e.g. a single regional CRE spike). The corroboration rule deliberately won't let it dominate the headline. Read the macro tab tile-by-tile when this matters.
- **Tail-event correlations not in the EWMA window.** EWMA with `λ = 0.93` has a ~25-day half-life. Correlation regimes that haven't shown up in the last 30-60 days won't be in the contagion read. Genuine fat-tail events that arrive suddenly will trip contagion only after a few days of co-movement, not on day one.
- **Cross-pocket synthetic indicators.** Combinations like *Fed liquidity contracting while VIX is rising while gold is breaking out* are not a synthetic. Each lives in its own pocket. The contagion badge captures co-movement, but specific multi-pocket regimes are not first-class objects.

---

## 8. Tuning knobs

If the aggregator's behavior needs to change, the levers are all in `.claude/macro-deploy/aggregator.js`:

| Knob | Where | Current | What it does |
|---|---|---|---|
| Pocket membership | `POCKETS` constant | 16 pockets as listed §2 | Moves indicators between pockets, adds / removes them. |
| Excluded indicators | `EXCLUDED_INDICATORS` | `stablecoin_supply`, `sp500` | List of indicators that show on the macro tab but never contribute to the aggregator. |
| OWA weights | `computeHeadline` | `[0.5, 0.3, 0.2]` | How much the top pocket dominates vs. second and third. Set to `[1, 0, 0]` for max-pooling, `[0.34, 0.33, 0.33]` for an even average of the top three. |
| `k` (top-k cutoff) | `computeHeadline` | 3 | How many of the worst pockets the headline considers. Increasing k weakens pocket dominance. |
| EWMA `λ` | `EWMA_LAMBDA` | 0.93 | Smoothing on the contagion correlation. Higher = longer memory; lower = faster regime tracking. ECB CISS uses 0.93 (≈ 25-day half-life). |
| Contagion thresholds | `computeContagion` | 0.30 / 0.50 | The Isolated / Broadcasting / Contagion-Regime cutoffs on `ρ̄`. |
| Min history for contagion | `MIN_HISTORY_FOR_CORRELATION` | 30 | Days of pocket-history snapshots required before correlations activate. |
| Freshness decay floor | `freshnessWeight` | 0.05 | Minimum weight a stale indicator retains in its pocket. Lower means quarterly indicators decay further. |
| Corroboration rule | `computePocketLevel` | `l4plusCount >= 2` | Number of L4+ indicators required to allow a pocket to reach the L5 floor. |

---

## 9. Reading the breakdown

The dashboard exposes the breakdown three ways:

1. **Today tab.** Single stress bar with a top-3 driver chip row underneath (`Treasury L4 · Sovereign L4 · Energy L4`) and a contagion badge (`Contagion: ISOLATED · ρ̄ = 0.18`). The quickest read.
2. **Macro tab stress block.** Same headline + driver chips + contagion badge, plus a *How this is computed* expand-out that shows the full 16-pocket table with each pocket's current level and indicator count.
3. **Macro tab indicator tiles.** Every individual indicator tile carries a small whispered pocket label so the visual grouping into the 16 pockets is legible at the tile level.

How to interpret common shapes:

- **One pocket at L5, three at L3, rest L1-L2.** Headline lands around 7.5-8 *Stressed*. Driver row reads `[Hot Pocket] L5 · [Pocket A] L3 · [Pocket B] L3`. Contagion likely *Isolated* unless the hot pocket has been moving for weeks. The reading: a specific corner is in crisis, but the system is holding around it. Watch the contagion badge — if it shifts toward *Broadcasting* in coming days, the system is starting to follow.
- **Three pockets at L3-L4, no L5s.** Headline lands around 6.5-7 *Elevated to Stressed*. Contagion likely *Broadcasting* or *Contagion Regime*. The reading: no single pocket is in crisis, but enough pockets are co-moving that the headline jumps. Historically, this is the shape that precedes systemic events (2008 mid-year, March 2020 first week, autumn 2022).
- **All pockets at L1-L2.** Headline below 3 *Stable*. Contagion *Isolated*. The background regime. Worth a glance, not a deep read.

---

## 10. Comparison to canonical Fed / ECB stress indices

This dashboard's design draws from two strands of the literature:

- **From Yager (1988) OWA operators** — the top-3 weighted aggregation across pockets. This is the same family Holló-Kremer-Lo Duca chose against in their 2012 ECB paper because they wanted the contagion-multiplicative property. The dashboard takes Yager for the headline and reports contagion separately, which is a different editorial call.
- **From Holló, Kremer & Lo Duca (2012) ECB CISS** — the EWMA correlation idea. CISS rolls the correlation matrix into the composite directly via the portfolio-variance formula `(w∘s)' · C · (w∘s)`. This dashboard reports `ρ̄` as a separate badge instead, keeping the headline interpretable as a top-3 pocket OWA.

How it differs from the PCA-based Fed indices (STLFSI, KCFSI, NFCI, OFR FSI): those projects everything onto a single latent factor, which is mathematically a weighted average. They inherit the "average-away" pathology — one pocket on fire is diluted by all the calm pockets. This dashboard's OWA design specifically does not average pocket-specific stress away. The trade-off is that the OWA headline is less smooth than a PCA factor and more sensitive to pocket-grouping editorial decisions.

The Bloomberg Financial Conditions Index uses equal-weight averaging across three sub-indices, which is the same pathology the user's pre-Wave-7 dashboard had. This iteration was specifically designed to escape that.

---

## See also

- [STRESS-AGGREGATION-RESEARCH.md](STRESS-AGGREGATION-RESEARCH.md) — full math, literature review, alternatives considered (max-pool, top-k OWA, full CISS, factor models), and the reasoning behind the Option B (top-3 OWA) + contagion-badge split that shipped.
- [INDICATORS.md](INDICATORS.md) — the 16 pockets each indicator belongs to, defined as the spec section headers. Aggregator pocket map is the source of truth for the deploy, but the spec section headers are the editorial source of truth.
- [`.claude/macro-deploy/aggregator.js`](../../.claude/macro-deploy/aggregator.js) — the implementation. All tuning knobs are in this file.
