# Macro Velocity Logic — Design & Kickoff Prompt

> **Status:** Draft design doc. Use as a self-contained kickoff prompt for the implementation session.
> **Date:** 2026-05-07
> **Sibling docs:** `MACRO-INDICATORS.md` (indicator universe), `.jin-staging/threshold-audit-proposal.md` (level recalibration audit).

---

## 1. Problem

The current macro dashboard scores each indicator using `computeLevel(currentValue)` — only today's number, in isolation. After the 2026-05-07 threshold audit, the absolute-level bands are calibrated correctly to the 2024-2026 regime, but they still miss the most important signal in macro: **rate of change**.

Three concrete failure cases the static-level model can't catch:

1. **TGA at $878B is "elevated".** TGA going from $400B to $1T in six weeks is *the* liquidity-drain event. Same final number, completely different signal.
2. **WALCL flat-ish at $6.71T is "L2 placeholder".** WALCL flipping from declining $30B/week (clear QT) to rising $50B/week (pivot/QE return) is the most important Fed move in years. The level barely moves; the velocity is the entire story.
3. **HY OAS at 275bp is "L1 stable".** HY OAS widening from 275 to 350bp in a single week is a credit panic. The 350 itself doesn't trigger an alarm — but the speed should.

The fix is not "add a 30-day delta to every indicator." Different indicators have different natural cadences and different velocity-to-level relationships. Each needs its own scoring rule. This doc is the spec for that.

---

## 2. Design Principles

1. **Each indicator declares its own velocity window(s).** SOFR cares about 1-day spikes. WALCL cares about 4-week change. C&I Loans cares about YoY. There is no universal "30d delta" — that's a worst-of-both-worlds default.

2. **Velocity is blended into a single L1-L5 score, not a separate field.** Users see one alarm level per indicator, same as today. The blending logic is per-indicator: some apply velocity as a "kick" on top of the absolute-level read, some override entirely (e.g., dis-inversion velocity for 2s10s), some are pure-velocity (WALCL).

3. **Velocity windows are calibrated to the indicator's natural cadence.** Daily-sampled data gets short windows (1d, 5d, 20d). Weekly data gets multi-week windows. Monthly gets quarterly. Asymmetric windows are fine if the indicator behaves asymmetrically (e.g., HY OAS widens fast but tightens slowly — short window for widening, longer for tightening).

4. **Velocity scoring is explicit per-indicator, documented inline.** Just like the threshold audit baked the regime basis into a comment in each `computeLevel` block, the velocity logic for each indicator gets a comment explaining the chosen window, why, and what kick/override it produces. No magic, no shared util.

5. **Direction matters.** Rising vs falling is not symmetric for most indicators. ON RRP draining is post-QT normal; ON RRP suddenly *building* is risk-off (money fleeing back to the Fed). 2Y yield falling fast = cuts priced; rising fast = hike fears. The scoring rule has to know which direction is alarming.

6. **Velocity must be cheap to compute.** Each refresh fetches the latest value plus enough history to compute the configured windows. Daily indicators fetch ~90 days of history (~3 months covers all reasonable windows). Weekly indicators fetch ~26 weeks. This is one extra FRED call per refresh, not 26 — fredgraph.csv returns the full series already, so it's actually free.

---

## 3. Velocity Vocabulary

A small, fixed vocabulary of velocity primitives. Each indicator picks the ones it needs.

| Primitive | Meaning | Example use |
|---|---|---|
| `delta(window)` | absolute change over N days/weeks | TGA `delta(30d)` in $B |
| `pctChange(window)` | percent change over N days | BTC `pctChange(7d)` |
| `roc(window)` | rate-of-change per unit time (delta / window) | WALCL `roc(4w)` in $B/week |
| `zscoreVsRegime(window)` | how many regime-stdevs the current move is | HY OAS `zscore(5d)` vs 2024-2026 5d-move distribution |
| `drawdown(highWindow)` | percent off the rolling N-period high | BTC `drawdown(90d)` |
| `breakoutAbove(level, window)` | sustained breach of a threshold for N periods | 5y5y `breakoutAbove(2.5, 10d)` |
| `directionFlip(window)` | sign change in trend over N periods | WALCL `directionFlip(4w)` (QT → QE) |
| `disinversion(curveSeries, window)` | curve un-inverting over N periods | 2s10s recession trigger |
| `yoyChange()` | year-over-year change (1y window) | C&I Loans YoY |

Only what's listed gets used. If an indicator needs something exotic, it's defined inline in that indicator's `computeLevel` block, not added to the shared vocabulary (avoid abstraction creep).

---

## 4. Architecture Changes

### 4.1 Data persistence (`data.json` schema)

Current shape:
```json
{ "values": { "sofr": { "raw", "level", "meta", "display", ... } } }
```

New shape — extend each value with velocity fields actually used by that indicator's scoring rule:
```json
{
  "values": {
    "tga": {
      "raw": 877761,
      "display": "$878B",
      "level": 3,
      "meta": "elevated · 30d delta +$80B",
      "velocity": {
        "delta30d": 80000,
        "delta30dPct": 10.0,
        "trendDirection": "rising"
      },
      "fetchedAt": "...",
      "sourceDate": "..."
    }
  }
}
```

No separate history file. Velocity is computed at fetch time and persisted alongside the current value. The full historical series lives at FRED — we don't try to be a database.

### 4.2 Fetcher changes (`fetchers.js`)

`fetchFred()` currently parses the full CSV and returns only the *last* numeric row. Change it to return:
```js
{ value, date, history: [{date, value}, ...] }
```

`history` is the last ~120 daily observations (covers 90d window with weekend buffer). Weekly series get last ~26 weeks. Monthly get last ~12 months.

Other fetchers (CoinGecko, Yahoo, Stooq) need analogous treatment:
- **CoinGecko**: switch from `simple/price` to `coins/{id}/market_chart?days=90` for indicators that need history. Keep `simple/price` for refreshes that don't (cheaper, faster).
- **Yahoo**: chart endpoint already returns the series — just expose it.
- **Stooq**: CSV already returns the series.

### 4.3 Runner changes (`runner.js`)

After fetching `{value, history}` for an indicator:

1. Look up the indicator's `velocity` config (windows + primitives needed).
2. Compute each requested primitive against `history`. E.g., for `delta(30d)`: find the value 30 calendar days ago (or nearest prior observation), subtract from current.
3. Pass the computed primitives into `computeLevel(value, ctx)` as `ctx.delta30d`, `ctx.pctChange5d`, etc.
4. Persist the computed velocity fields in `data.json`.

A small velocity helper module (`velocity.js`) implements the primitives once, takes a `history` array + window spec, returns the computed value. Keep it pure functions, no state.

### 4.4 Indicator config additions

Each indicator declares its velocity needs:
```js
{
  id: 'tga',
  ...
  velocity: {
    windows: ['30d'],           // which windows to compute over
    primitives: ['delta', 'pct'] // which primitives to compute
  },
  computeLevel: (v, ctx) => {
    // ctx.delta30d and ctx.pct30d are now available
    ...
  }
}
```

The runner reads `velocity.windows` + `velocity.primitives`, computes only what's declared (no waste). Indicators without a `velocity` config keep working unchanged — backward compatible.

---

## 5. Per-Indicator Velocity Spec

For each currently-active indicator, the chosen velocity window(s), the scoring rule that combines absolute level with velocity, and the rationale. Numbers are starting points to be tuned against empirical 2024-2026 distributions of the *velocity itself* (a separate audit of "what's a normal 5d HY OAS move" etc. — see Phase 1).

### Tier 1

| ID | Window(s) | Scoring rule | Rationale |
|---|---|---|---|
| **sofr** | `1d`, `5d` (spread vs IORB) | If `delta(1d, spread) > 10bp`, force L4 minimum. If `max(spread, 5d) > 10bp` sustained, L4. Otherwise base level from current spread. | Sept 2019 was a single-day blowout. Repo plumbing breaks fast. |
| **us10y** | `5d`, `20d` | Base level from current. If `\|delta(5d)\| > 50bp`, +1 to level. If `\|delta(20d)\| > 100bp`, +2. | Liz Truss / Aug 2023 issuance shocks were 50bp+ moves in a week. |
| **us2y** | `5d` | Base level from current. If `delta(5d) > 25bp` (rising), +1 (hike fears accelerating). If `delta(5d) < -25bp` (falling fast), context-dependent — alone neutral, +1 if HY OAS also widening. | Front-runs Fed by months. Direction matters more than level. |
| **curve_2s10s** | `30d` (dis-inversion) | If curve was inverted 30d ago AND now positive, +2 (recession arriving signal). If currently positive AND `delta(30d) > 25bp` (steepening fast), +1. Else base level from current. | Dis-inversion is the textbook trigger, not inversion itself. |
| **hy_oas** | `5d`, `20d` | If `delta(5d) > 50bp` (widening), L4 minimum (credit panic). If `delta(20d) > 100bp`, L5. Tightening is asymmetric — slow improvement doesn't move the alarm down faster. | Credit events show up as fast widening. Slow widening is regime drift. |
| **ig_oas** | `20d` | If `delta(20d) > 25bp`, +1. Else base level. | IG widens slower than HY; longer window. |
| **real_yield_10y** | `30d` | Base level from current. If `delta(30d) > 25bp` (rising — BTC headwind), +1. | Slow-moving by nature. |
| **5y5y_inflation** | `30d`, breakout | If `breakoutAbove(2.5%, 10d)` from below — sustained breach of anchor — L4 minimum. If `breakoutBelow(1.5%, 10d)`, L4 minimum (deflation un-anchor). Else base level. | Anchored band; the alarm is breakouts, not point values. |
| **on_rrp** | `5d`, `30d` | If `delta(5d) > +$50B` (suddenly building), L4 minimum (money fleeing back to Fed = risk-off). If `delta(30d) < -$100B` (draining fast) AND TGA delta(30d) > +$100B (combined drain), L5. Else base level. | Static near-zero is fine post-QT. Velocity + cross-indicator is the real signal. |
| **tga** | `30d` | If `delta(30d) > +$200B` (clear refill), +1. If `> +$300B`, +2 (debt-ceiling-style refill). Tightening of TGA (negative delta) eases — neutral on alarm. | Refills drain liquidity from the system. |
| **walcl** | `4w` (replaces placeholder) | If `roc(4w) < -$30B/week` (clear QT pace), L1. If `roc(4w) ≈ 0` (paused), L2. If `roc(4w) > 0` (rising), L4 (pivot signal). If `roc(4w) > +$50B/week`, L5 (emergency expansion). | This is the indicator most defined by velocity. Almost no useful absolute-level read exists. |
| **bank_reserves** | `4w` + cross-ref to SOFR-IORB | If `delta(4w) < -$100B` AND `sofr-iorb spread > 5bp` over same window, +2 (genuine scarcity). If declining + SOFR calm, +0 (theoretical scarcity, not realized). | Logan/Williams' "$3T scarcity" was theoretical. The empirical signal is SOFR-IORB. |
| **jobless_claims** | vs 12w ago | Base level from current. If `delta(12w) > +30k`, +1. If `> +50k`, +2. Improving claims ease the alarm one level. | 4WMA already smooths weekly noise; trend vs 3 months ago matters. |
| **ci_loans** | YoY | If `yoyChange < 0%`, L4. If `< -2%`, L5. If `0-2%`, L3. If `2-5%`, L2. If `>5%`, L1. | Pure velocity indicator. Level is meaningless without YoY context. |
| **btc** | `drawdown(90d)`, `pctChange(7d)` | If `drawdown(90d) < -20%`, L3. `< -35%`, L4. `< -50%`, L5. If `pctChange(7d) < -15%`, +1 (acceleration). | BTC isn't a stress signal at level — it's stress when crashing. |
| **vix** | `1d` spike | Base level from current. If `delta(1d) > +5pt`, L4 minimum (event in progress). | VIX moves fast; daily spike captures events same-day. |
| **dxy** | `5d` | Base level from current. If `pctChange(5d) > +1.5%`, +1 (EM stress accelerating). | Slow-moving but 1.5% in 5d is regime-defining. |
| **usdjpy** | `5d` | Base level from current. If `delta(5d) > +200pts`, +1 (carry stress). If approaching 160 AND `delta(5d) > +100pts`, +2 (intervention zone reach). | August 2024 carry unwind crashed everything overnight. |

### Tier 2

| ID | Window(s) | Scoring rule | Rationale |
|---|---|---|---|
| **breakeven_10y** | `30d` breakout | Base level from anchored band. If `breakoutAbove(2.6%, 10d)` from anchor band, +1. | Un-anchoring is the signal. |
| **breakeven_5y** | `30d` breakout | Same as 10y BE. | Same. |
| **curve_3m10y** | `30d` dis-inversion | Same logic as 2s10s but with 3m10y series. | Estrella-Trubin recession indicator. |
| **continuing_claims** | vs 12w ago | Same scoring as jobless claims 4WMA. | Persistence of unemployment — companion signal. |
| **eth_btc** | `30d` | Base level neutral (L2). If `pctChange(30d) > +20%`, +1 (altseason / crypto risk-on). If `< -20%`, +1 (capitulation). | Cycle-stage indicator, not stress per se. |
| **gold** | `30d`, breakout | Base L2. If `pctChange(30d) > +10%` AND breaking prior 90d high, +1 (monetary regime change signal). | Trend signal, not level. |
| **copper** | `3m` | Apply symmetric Dr. Copper to 3m moving average instead of monthly snapshot. If `pctChange(3m) < -10%`, +1 (recession). If `> +15%`, +1 (overheating). | Monthly data is lumpy; 3m smoothing makes velocity meaningful. |
| **wti** | `5d` | Asymmetric Goldilocks logic on current value, plus: if `pctChange(5d) > +10%`, +1 (supply event). | Geopolitical events show up as fast spikes. |

### Indicators staying placeholder

None. Every indicator gets at least one velocity rule under this design — that's the whole point. Currently-placeholder indicators (WALCL, C&I Loans) become *primarily* velocity-driven; their entire scoring function is the velocity logic above.

---

## 6. Implementation Phases

Break the work into shippable pieces. Each phase ends with a working dashboard that's strictly better than before.

### Phase 0 — Audit "what's a normal velocity move" (data exploration)

Before any code, pull empirical 2024-2026 distributions of the *velocity primitives themselves* for each indicator. We did this for absolute levels in the threshold audit (`fred_summary.json`). We need the same for velocity:

- For HY OAS, what's the typical 5-day move? p50, p90, p99? That sets the threshold for "panic widening."
- For TGA, what's a typical 30-day delta? What's a 95th-percentile build?
- For WALCL, what's the QT pace been historically (declining $X/week)? What would a clear pivot look like in the velocity tail?

Output: `velocity_summary.json` analogous to `fred_summary.json`. The numbers in §5 above are starting estimates from intuition — Phase 0 replaces them with empirical thresholds.

Effort: ~2h. Same Python/curl-on-Jinn pattern as the absolute-level audit.

### Phase 1 — Plumbing

Build the data path before touching scoring rules.

- Update `fetchers.js` `fetchFred` to return `{ value, date, history }`.
- Update CoinGecko fetcher to support `coins/{id}/market_chart?days=90` for indicators that need history (initially: btc, eth_btc, gold).
- Add `velocity.js` module with the primitives from §3.
- Update `runner.js` to read `indicator.velocity` config, compute primitives, pass via `ctx`, persist the computed fields.
- Update `data.json` schema (extend, don't replace — backward-compatible reads on the dashboard).

Effort: ~3h. No scoring changes — every indicator keeps its current `computeLevel`. End state: the velocity machinery exists and feeds `ctx`, but no indicator uses it yet. This phase ships a no-op functionally but unlocks Phase 2.

### Phase 2 — Wire the top 6 highest-signal indicators

Convert these first (highest signal-density, biggest behavioral improvement):

1. **WALCL** (highest priority — currently a placeholder; this is where velocity transforms a dead indicator into a live one)
2. **TGA** (the canonical liquidity-drain signal)
3. **HY OAS** (credit-panic detection)
4. **2s10s curve** (dis-inversion = recession trigger)
5. **C&I Loans** (YoY-only signal — pure velocity)
6. **SOFR** (1-day spike detection)

For each: implement the scoring rule from §5, tune thresholds against Phase 0 empirical distributions, verify the level reads sensibly against the current state (and historical events you remember — Aug 2024 carry unwind, March 2023 SVB, etc., if they're in the 2024-2026 window).

Effort: ~3h. End state: dashboard meaningfully smarter — these six are doing real work.

### Phase 3 — Wire the remaining indicators

Convert the rest at a steady pace. Less critical so can be done as time permits.

Effort: ~3-4h. End state: full coverage.

### Phase 4 — Velocity-aware UI surfacing (optional)

Currently the dashboard shows just the level light. Velocity could surface as:

- A small arrow (↑/↓/→) next to the value indicating direction
- A "velocity tag" in the meta line ("draining $80B/30d", "widening 50bp/5d")
- Hover/tap reveals the velocity context that drove the level

This is pure UI polish on top of the data work. Defer until Phase 3 done. Probably ~2h of CSS/JS.

---

## 7. Open Questions

These need a human decision before implementation, or surface as "ask" tasks during execution.

1. **Cross-indicator scoring (combined RRP+TGA, Bank Reserves+SOFR-IORB).** The cleanest spec needs computeLevel to access *other indicators'* current state, not just its own. Two options:
   - Pass the full `ctx.allIndicators` snapshot — simple but couples indicator scoring rules together.
   - Add a `composites` config layer that produces synthetic indicators (`fed_net_liquidity = WALCL - TGA - RRP`) which are then scored.
   - Decision needed in Phase 1 design.

2. **Velocity dampening for slow improvements.** When HY OAS tightens slowly, the alarm should ease — but at what pace? Symmetric with widening (50bp tightening over 5d eases the alarm) or asymmetric (only 100bp over 30d eases)? The user's instinct on "false alarms erode trust" suggests asymmetric is safer — easier to add an alarm than remove one.

3. **What about 2024+ regime shift signals?** If a structural break happens (e.g., Fed restarts QE, or YCC), the regime-calibrated thresholds and velocity baselines from §5 will be wrong. How is regime change detected? Options:
   - Manual recalibration after Fed actions (current implicit pattern).
   - Auto-recalibration via rolling-window quantiles (replace 2024-2026 fixed window with rolling 250-day window). Risk: loses the historical anchor.
   - Hybrid: fixed for "real" alarm thresholds (HY 600bp = recession territory historically), rolling for "regime norm" comparisons.

4. **Cron cadence.** Today's runner fires daily at 5pm ET. Velocity logic doesn't change that — but if we want sub-daily velocity capture for fast indicators (SOFR 1d spike, VIX 1d spike), we'd need intra-day refreshes. Probably overkill; the 5pm refresh sees the day's print which is enough.

5. **Storage cost.** Persisting 90 days of history per indicator (in-memory at refresh time, not on disk — the on-disk data.json only stores current + computed velocity) is fine. If we ever want a "velocity over time" chart in the UI, that requires retaining history on disk → SQLite or similar. Defer that decision.

---

## 8. Kickoff Prompt (for a fresh session)

Copy-paste this into a new session to start the implementation:

```
HANDOFF — [signals/macro velocity logic] [start date]

Picking up: Implementing velocity-aware scoring for the macro stress dashboard
on Jinn (http://100.124.64.28:4242/, Signals tab). Current scoring uses only
absolute-level thresholds (just recalibrated 2026-05-07 per
.jin-staging/threshold-audit-proposal.md). Velocity logic is the next step —
each indicator gets its own velocity window and scoring rule that blends
position with rate-of-change.

Read first:
- Research/MACRO-VELOCITY-DESIGN.md (this doc — full spec, per-indicator
  scoring rules, phasing, open questions)
- .claude/macro-deploy/indicators.js (the source-of-truth indicator config,
  recalibrated 2026-05-07)
- .claude/macro-deploy/runner.js + fetchers.js + api.js (data path)
- WORKLOG.md for context on the threshold audit and out-of-band drift rule

Constraints in scope:
- Free APIs only (FRED, CoinGecko, Yahoo, Stooq) — no paid data
- Source-edit-then-deploy pattern (edit in .claude/macro-deploy/ first,
  then scp to ~/.openclaw/workspace/macro/ on Jinn). Out-of-band edit drift
  rule is captured in
  ~/.claude/projects/.../memory/feedback_outofband_drift.md
- Each indicator's velocity window and scoring rule is unique — no shared
  generic "30d delta" default
- Each scoring rule documented inline as a comment in computeLevel,
  matching the threshold-audit comment style

Next action: Phase 0 — empirical velocity distribution audit. Pull 2024-2026
FRED data, compute 5d / 20d / 30d / 4w deltas for each velocity-relevant
indicator, write velocity_summary.json analogous to fred_summary.json.
Use the empirical p50/p90/p99 to confirm or adjust the §5 starting estimates.
Run from Jinn (curl-from-Jinn pattern; FRED hangs from Windows).

After Phase 0: Phase 1 plumbing (fetchers return history, runner computes
primitives, data.json extended). Then Phase 2 (wire top 6 indicators),
then Phase 3 (rest), then optional Phase 4 (UI surfacing).
```

---

## 9. Risk Notes

**Don't over-build.** The vocabulary in §3 is short on purpose. Resist the urge to add `meanReversion`, `momentum`, `correlationToBTC`, etc. Each new primitive is one more thing to maintain. Three similar lines beats a premature abstraction.

**Don't break the current dashboard during Phase 1.** Phase 1 ships a no-op (machinery exists, no indicators use it yet). Verify the dashboard's stress score and per-indicator levels are unchanged after the Phase 1 deploy by snapshotting `/api/macro` before and after.

**Don't try to implement velocity for all 26 indicators in one session.** Phase 2 (top 6) is the right increment. Wiring all 26 in one go will cause regressions you can't isolate.

**Tune velocity thresholds against Phase 0 data, not intuition.** The numbers in §5 are placeholders. The whole point of Phase 0 is to replace them with empirical distributions of the velocity primitives themselves.
