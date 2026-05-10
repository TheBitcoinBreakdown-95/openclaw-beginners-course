# Macro Stress Dashboard

A self-hosted macro signals dashboard running on Jinn (the user's personal AI assistant box) at `http://100.124.64.28:4242/` — Signals tab. Tracks 33 macro indicators across funding markets, credit, rates, FX, labor, and crypto. Each indicator gets a five-level alarm score (L1 stable → L5 critical). A holistic stress index aggregates them into a single 1-10 reading.

This folder holds **everything we've designed, learned, and built** for the dashboard — except the live deploy code, which lives in `.claude/macro-deploy/` so the deploy pattern (source-edit-then-scp to Jinn) stays clean.

---

## Folder Layout

```
Macro-Dashboard/
├── README.md                      ← this file
├── design/                        ← decisions, specs, mockups
│   ├── INDICATORS.md              ← 163-indicator universe (rank/threshold/source per)
│   ├── THRESHOLD-AUDIT.md         ← 2026-05-07 absolute-level recalibration audit
│   ├── VELOCITY-DESIGN.md         ← per-indicator velocity-logic spec
│   └── ui-mockups/
│       ├── MOCKUPS.html           ← 20 design directions explored before ship
│       └── SHIPPED-DESIGN.html    ← the design that shipped (editorial dark mode)
├── audits/                        ← empirical data backing the threshold + velocity decisions
│   ├── fred_summary.json          ← p10/p25/p50/p75/p90 + current value for 24 FRED series, 2024-2026
│   └── velocity_summary.json      ← p50/p90/p95/p99 of |delta(window)| for each velocity-relevant series
└── tooling/                       ← scripts that produce the audits
    ├── fred_audit.py              ← absolute-level distribution fetcher (writes audits/fred_summary.json)
    ├── fred_audit_remote.py       ← variant that runs from Jinn over SSH (FRED hangs from Windows under load)
    ├── velocity_audit.py          ← velocity-primitive distribution fetcher (writes audits/velocity_summary.json)
    ├── verify_levels.js           ← runs each indicator's computeLevel against current FRED values; sanity check before deploy
    ├── test_velocity.js           ← unit tests for velocity.js primitives (13 cases)
    └── test_composites.js         ← unit tests for ON RRP and Bank Reserves composite scoring (15 cases)
```

The deploy code lives elsewhere:

```
.claude/macro-deploy/              ← source-controlled deploy artifacts
├── indicators.js                  ← per-indicator config: thresholds, velocity windows, computeLevel scoring
├── fetchers.js                    ← FRED / CoinGecko / Yahoo / Stooq fetchers (returns history for FRED)
├── velocity.js                    ← velocity primitives (delta, pctChange, drawdown, disinversion, yoyPct, etc.)
├── runner.js                      ← cron entry point: fetches all indicators, computes levels + velocity, writes data.json
├── api.js                         ← Express routes registered into the dashboard server
├── macro-tab.css                  ← dashboard tab styling (scoped to #signals)
├── macro-tab.js                   ← dashboard tab JS (rendering, refresh, expand/collapse)
└── inject.py / macro-tab.html     ← legacy injection helpers (kept for reference, not deployed currently)
```

The dashboard frontend (`.claude/dashboard-deploy/index.html`, `server.js`) lives at the same level — that's the broader Jinn dashboard, of which this macro module is one tab.

---

## Where It Runs

- **Host:** Jinn (Linux laptop, Tailscale 100.124.64.28, hostname jinn-hp)
- **Process:** `pm2` manages `jinn-dashboard` (Node 22.22.0 via NVM)
- **Workspace:** `/home/openclaw/.openclaw/workspace/`
- **Macro module path:** `/home/openclaw/.openclaw/workspace/macro/`
- **Dashboard path:** `/home/openclaw/.openclaw/workspace/dashboard/`
- **Cron:** Daily refresh at 5pm ET (`0 17 * * *`) runs `node runner.js all`
- **Data file:** `data.json` (current snapshot — current value, level, meta, computed velocity per indicator)
- **Logs:** `cron.log` in the macro module dir; pm2 logs via `pm2 logs jinn-dashboard`

The dashboard is served on port 4242 via the Express app in `dashboard/server.js`. The macro routes (`GET /api/macro`, `POST /api/macro/refresh/:id`) are registered by `macro/api.js` via `registerMacroRoutes(app)`.

---

## Indicator Coverage — 2026-05-08

Every active-logic indicator has both an absolute-level scoring rule (calibrated to 2024-2026 empirical distribution) and a velocity-aware kick that reflects its specific natural cadence. The velocity column shows the windows the indicator's `computeLevel` consumes from `ctx`. The kick column summarizes when velocity overrides or augments the absolute-level read.

### Tier 1 (24 indicators — all velocity-aware; 1 synthetic composite + 1 peer-aware primitive)

| Indicator | Source | Level basis | Velocity windows | Kick rule |
|---|---|---|---|---|
| SOFR | FRED SOFR | spread vs IORB (3.65) | 1d, 5d | 1d > +10bp → L4 min, > +25bp → L5 |
| EFFR | FRED EFFR | spread vs IORB (3.65) | 1d, 5d | 5d delta > +5bp while spread ≥ 0 → +1 |
| **3M T-Bill** | **FRED DTB3 + peer effr** | **spread vs EFFR (peer-aware)** | 5d, 20d | (spread-based, asymmetric — only negative escalates) |
| 10Y Yield | FRED DGS10 | recent regime quantile | 5d, 20d | \|Δ5d\| > 25bp → +1, > 50bp → +2 |
| 2Y Yield | FRED DGS2 | recent regime quantile | 5d, 20d | \|Δ5d\| > 25bp → +1 |
| 2s10s Curve | FRED T10Y2Y | empirical bands (-0.47 to +0.74) | 30d disinversion + delta | dis-inverted → +2 (recession trigger) |
| HY OAS | FRED BAMLH0A0HYM2 | recent regime (259-461bp) | 5d, 20d | +25bp/5d → L4 min, +50bp/5d → L5 |
| **CCC HY OAS** | **FRED BAMLH0A3HYC** | **distress-tier sub-component** | 5d, 20d | +25bp/5d → +1, +50bp/5d → +2 |
| IG OAS | FRED BAMLC0A0CM | recent regime (73-121bp) | 5d, 20d | +10bp/5d → +1, +25bp/20d → +1 |
| **EM Corp OAS** | **FRED BAMLEMCBPIOAS** | **EM credit dimension** | 5d, 20d | +25bp/5d → +1, +50bp/5d → +2 |
| 10Y Real Yield | FRED DFII10 | recent regime (1.53-2.34) | 30d | +25bp/30d (rising) → +1 |
| 5y5y Inflation | FRED T5YIFR | anchored band 2.0-2.5 | 30d | moving away from anchor at p99 → +1 |
| ON RRP | FRED RRPONTSYD | recent regime ($0-720B) | 5d, 30d | +$50B/5d (build) → L4+ (risk-off) |
| TGA | FRED WTREGEN | recent regime ($296B-$1T) | 30d | +$200B/30d → +1, +$300B/30d → +2 |
| Fed Balance Sheet | FRED WALCL | pure velocity (4w roc) | 4w, 12w, 30d | declining → L1, rising > $12.5B/wk → L4-5 |
| **Fed Net Liquidity** | **synthetic (WALCL−TGA−RRP)** | pure velocity (30d) | derived 30d | rising → L1; -$60B/30d → L3 (normal QT); -$200B/30d → L5 (regime change) |
| Bank Reserves | FRED WRESBAL | recent regime ($2.85-3.63T) | 4w, 12w | -$200B/4w in low zone → +1 |
| **Bank Deposits** | **FRED DPSACBW027SBOG** | **YoY change (banking-system canary)** | 12w, YoY | YoY <-2% → L5; -$200B/12w → +1 |
| Jobless Claims 4WMA | FRED IC4WSA | recent regime (202-242k) | 12w | +20k/12w → +1, -20k/12w → -1 |
| C&I Loans | FRED BUSLOANS | pure velocity (YoY) | YoY (365d) | <0% YoY → L4, <-2% → L5 |
| BTC | CoinGecko bitcoin | drawdown from 90d high | drawdown 90d, pct 7d | -20% → L3, -35% → L4, -50% → L5 |
| VIX | FRED VIXCLS | recent regime (11.86-52.33) | 1d, 5d | +5pt/1d → L4 min (event in progress) |
| Broad Dollar | FRED DTWEXBGS | recent regime (117-130) | 5d (delta + pct) | +1.5%/5d (rising) → +1 |
| USD/JPY | FRED DEXJPUS | recent regime (140-162) | 5d | +2.5pt/5d in MOF zone → L5 |

### Tier 2 (9 indicators — 8 velocity-aware, 1 deferred; 1 synthetic composite)

| Indicator | Source | Level basis | Velocity windows | Kick rule |
|---|---|---|---|---|
| 10Y Breakeven | FRED T10YIE | anchored band 2.0-2.5 | 30d | moving away from anchor at p99 → +1 |
| 5Y Breakeven | FRED T5YIE | anchored band 2.0-2.5 | 30d | moving away from anchor at p99 → +1 |
| 3m10y Curve | FRED T10Y3M | recent regime | 30d disinversion + delta | dis-inverted → +2 (recession trigger) |
| Continuing Claims | FRED CCSA | recent regime (1.72-1.96M) | 12w | +100k/12w → +1, -100k/12w → -1 |
| ETH/BTC | computed | placeholder L2 | — | **DEFERRED** (needs aligned ETH+BTC histories) |
| Gold | CoinGecko pax-gold | velocity-driven | 30d pct, 90d drawdown | +15%/30d → L3 (regime change), -15%/30d → L4 |
| **Gold/BTC Ratio** | **synthetic (gold/btc)** | **30d % change of ratio** | derived 30d pct | rising +25%/30d → L3 (gold winning); +60% → L5 (flight); falling caps L2 |
| Copper | FRED PCOPPUSDM | symmetric Dr. Copper bands | 3m pct | ±20%/3m → +1 |
| WTI Crude | FRED DCOILWTICO | asymmetric Goldilocks | 5d (delta + pct) | ±8%/5d → +1, ±15%/5d → +2 |

### Tier 3 (5 indicators — paid sources, manual reference cards, no velocity)

MOVE Index, 10Y Swap Spread, SPX Dealer Gamma, US Bank CDS Basket, EU Bank CDS Basket. These are reference cards linking to source sites for manual lookup; no automated scoring. Same status as before the velocity work.

### Live Verification

Run `ssh openclaw@100.124.64.28 "curl -s http://127.0.0.1:4242/api/macro"` and check `values[id].velocity` is populated for 32 of 33 active indicators (everything except `eth_btc`). `fed_net_liquidity` derives its raw + velocity from peer WALCL/TGA/RRP snapshots — verify `values.fed_net_liquidity.raw` matches `walcl.raw - tga.raw - on_rrp.raw`. `gold_btc_ratio` derives its raw + 30d pct change from gold + btc peers — verify `values.gold_btc_ratio.raw` matches `gold.raw / btc.raw`. `tbill_3m` reads `ctx.peers.effr.raw` to compute its spread inline (peer-aware primitive, no synthetic compute step).

---

## Status — 2026-05-08

**Threshold audit (absolute-level recalibration):** SHIPPED. All 17 active-logic indicators recalibrated to 2024-2026 empirical regime. Old config never alarmed because thresholds were calibrated against pre-2020 norms. After recalibration, levels reflect the current monetary regime. Stress index dropped from a false-alarm 3.7/10 to 3.3/10 "Watching" — the lower number is the *correct* one (no more L5 false alarm on ON RRP). See `design/THRESHOLD-AUDIT.md` for the full per-indicator diff.

**Velocity logic Phase 0 (empirical velocity distribution):** SHIPPED. `audits/velocity_summary.json` contains p50/p90/p95/p99 of |delta(window)| for each velocity-relevant indicator. Used to set velocity-kick thresholds in Phase 2.

**Velocity logic Phase 1 (plumbing):** SHIPPED. `fetchFred` now returns `{value, date, history}`. `velocity.js` provides primitives (delta, pctChange, rocPerWeek, drawdown, disinversion, yoyPct). `runner.js` computes whatever primitives an indicator declares in its `velocity:` config and passes them via `ctx`. 13/13 unit tests pass. Phase 1 was a no-op functionally (no indicator declared velocity yet) — verified before Phase 2 deploy.

**Velocity logic Phase 2 (top 6 indicators wired):** SHIPPED 2026-05-08. WALCL, TGA, HY OAS, 2s10s, C&I Loans, SOFR each got velocity layers tuned against Phase 0 empirical distributions.

**Velocity logic Phase 3 (remaining 19 indicators wired):** SHIPPED 2026-05-08. All 17 FRED-based indicators now have per-indicator velocity rules. CoinGecko fetcher extended with `fetchCoinGeckoHistory` (market_chart endpoint); BTC and Gold both wired with drawdown/pctChange velocity. ETH/BTC deferred (computed indicator — needs both ETH and BTC histories aligned by date; non-trivial). 25 of 26 indicators currently emit velocity fields in `/api/macro`.

**Composites layer (cross-indicator scoring):** SHIPPED 2026-05-08. `runner.js` now runs in two passes: Pass 1 fetches raw + computes velocity for every indicator; Pass 2 builds a `peers` snapshot (`{indicatorId: {raw, velocity}}`) and scores levels with `ctx.peers` available. Two cross-references wired:
- **ON RRP composite L5** — RRP draining (delta30d < -$100B) AND TGA refilling (delta30d > +$200B) → L5 escalation. Captures the canonical debt-ceiling-style combined-drain event that single-variable scoring caps at L4.
- **Bank Reserves composite +2** — reserves declining (delta4w < -$100B) AND SOFR-IORB spread > 5bp → +2 levels. Confirms genuine repo-plumbing scarcity vs. theoretical (Logan/Williams' "$3T scarcity" was theoretical; SOFR confirming is the empirical signal).

Synthetic-indicator pattern (`fed_net_liquidity = WALCL - TGA - RRP` as its own card) was considered and rejected — would be the abstraction trap §9 of `design/VELOCITY-DESIGN.md` warns about for two cross-refs. If composite cards become valuable later (3+ cases), revisit then.

**Velocity logic Phase 4 (UI surfacing):** SHIPPED 2026-05-08. Direction arrows (↑/↓/→) render next to each value, derived from the indicator's primary velocity field (first one declared in `velocity[]`). Up uses the existing orange `--mc-bar-3` tint, down uses yellow `--mc-bar-2`, flat is muted whisper — neutral differentiation, not good/bad semantics (which vary per indicator: HY OAS rising is alarm, BTC falling is alarm, 2Y rising/falling are both informative). Existing `meta` strings still carry magnitude. Sparklines and hover tooltips deferred — both need on-disk history retention, which is its own decision per design doc §7.5 (current data.json only stores current+velocity snapshot).

**Synthetic indicators (composite cards):** SHIPPED 2026-05-08. The runner's two-pass architecture (Pass 1 fetch + velocity, Pass 2 score with peers visible) was extended to support indicators with no source — they declare `composite.compute(peers) → {raw, date, velocity}` and the runner derives raw from already-fetched peers in Pass 2. First and only synthetic so far is **Fed Net Liquidity** (signal 10/10): WALCL − TGA − RRP, scored on its 30d delta (sum of component deltas with correct signs). WALCL gained `delta30d` to its velocity[] specifically to feed this. Calibration debt: thresholds set from spec (>$300B/qtr decline = regime change, mapped to ~$100B/30d for L5) plus intuition; no Phase-0 empirical audit yet for the synthetic series. Pattern is now ready for additional synthetics (e.g., Copper/Gold ratio, Gold/BTC ratio) when they become highest-priority gaps.

---

## Deploy Workflow

The cardinal rule, captured as memory `feedback_outofband_drift.md`: **edit local source first, then scp to Jinn.** Never edit live files directly via SSH (the next deploy from local clobbers your work). Source is the truth; live is just where it runs.

Standard deploy sequence:

```bash
# 1. Edit locally in .claude/macro-deploy/ (use Edit tool, not direct file writes)

# 2. Syntax-check locally
node --check .claude/macro-deploy/indicators.js
node --check .claude/macro-deploy/runner.js
# (etc. for changed files)

# 3. (Optional) sanity test with verify_levels.js
node Macro-Dashboard/tooling/verify_levels.js

# 4. Backup live files on Jinn (always)
ssh openclaw@100.124.64.28 "cd /home/openclaw/.openclaw/workspace/macro && cp indicators.js indicators.js.\$(date +%Y-%m-%d-%H%M).bak"

# 5. Deploy
scp .claude/macro-deploy/indicators.js openclaw@100.124.64.28:/home/openclaw/.openclaw/workspace/macro/
# (and any other modified files)

# 6. Syntax-check on Jinn
ssh openclaw@100.124.64.28 "/home/openclaw/.nvm/versions/node/v22.22.0/bin/node --check /home/openclaw/.openclaw/workspace/macro/indicators.js"

# 7. Restart pm2 (only needed if api.js or fetcher logic changed; level-config-only changes don't require restart, but a fresh refresh does)
ssh openclaw@100.124.64.28 "export PATH=/home/openclaw/.nvm/versions/node/v22.22.0/bin:\$PATH && pm2 restart jinn-dashboard"

# 8. Trigger a fresh data refresh so data.json picks up new logic
ssh openclaw@100.124.64.28 "/home/openclaw/.nvm/versions/node/v22.22.0/bin/node /home/openclaw/.openclaw/workspace/macro/runner.js all"

# 9. Verify
ssh openclaw@100.124.64.28 "curl -s http://127.0.0.1:4242/api/macro" | python -m json.tool | head
```

---

## Running the Audits

The audit scripts in `tooling/` produce the empirical data in `audits/`. Re-run when you want fresh baselines (e.g., when adding indicators, after a macro regime shift, or just periodically).

**Absolute-level distribution audit** (used for threshold calibration):

```bash
python Macro-Dashboard/tooling/fred_audit.py
# writes Macro-Dashboard/audits/fred_summary.json
```

**Velocity primitive distribution audit** (used for velocity-kick thresholds):

```bash
python Macro-Dashboard/tooling/velocity_audit.py
# writes Macro-Dashboard/audits/velocity_summary.json
```

Both are sequential FRED CSV fetches (no API key) with retry-on-timeout. Concurrent fetches trigger FRED's rate-limit. Total runtime ~60-90s.

**FRED-from-Windows note:** FRED occasionally hangs when called from Windows curl/schannel. If `fred_audit.py` consistently times out, use `fred_audit_remote.py` — it scp's itself to Jinn, runs there (Linux curl works reliably), and pulls the JSON back. Alternative: the same scripts work fine on Linux/Mac if you have a Unix box handy.

**Velocity unit tests** (run before any velocity.js change):

```bash
node Macro-Dashboard/tooling/test_velocity.js
# 13 cases covering delta, pctChange, rocPerWeek, drawdown, disinversion, yoyPct, computeVelocity integration
```

**Composite unit tests** (run before any indicator.js change to on_rrp or bank_reserves):

```bash
node Macro-Dashboard/tooling/test_composites.js
# 15 cases covering ON RRP composite (RRP+TGA combined drain → L5) and Bank Reserves composite
# (declining + SOFR-IORB widening → +2). Includes edge cases: missing peers, threshold blocks, level caps.
```

---

## Key Decisions (preserved verbatim from sessions)

These are the architectural calls made during the build that future-you would want to know about. The full chronology is in `WORKLOG.md` Sessions 63 → 67.

1. **Threshold calibration must match the current monetary regime, not pre-2020 norms.** TGA at $878B is normal post-tax-day in the bills-heavy issuance cadence. ON RRP near zero is structural post-QT, not a stress signal in isolation. Old thresholds calibrated against historical norms produced false L5 alarms that erode dashboard trust. Memory: `feedback_threshold_calibration.md`.

2. **Velocity must be per-indicator, not a generic global delta.** SOFR cares about 1-day spikes (Sept 2019 was a single-day blowout). WALCL cares about 4-week rate-of-change. C&I Loans cares about YoY. There is no useful "30d delta" default. Each indicator picks its own window(s) and scoring rule, documented inline.

3. **Each indicator's velocity rule lives inline in its `computeLevel`.** No shared scoring engine. Same pattern as the threshold-audit regime-basis comments. Avoids the "generic velocity framework" abstraction trap. Three similar lines beats a premature abstraction.

4. **Source-edit-then-deploy.** Always. Out-of-band SSH edits to live files cause silent drift; the next scp from local clobbers them. Memory: `feedback_outofband_drift.md`. Caught the hard way in Session 64 (lost the macro tab UI for hours).

5. **Free APIs only.** FRED (no key, fredgraph CSV), CoinGecko (free tier, batched into one call to avoid rate limits), Yahoo Finance (chart endpoint, fallback host pair), Stooq (EOD CSV). No paid Bloomberg/ICE — Tier 3 indicators (MOVE, swap spreads, CDS baskets, dealer gamma) are reference cards that link to source sites for manual lookup.

6. **L1=p25, L3=p50, L5=top-decile-or-historical-anchor.** The threshold-audit recalibration formula. Some indicators preserve historical anchors at L5 (HY OAS 600bp = recession territory regardless of recent regime, USD/JPY 160 = MOF intervention zone) — those override the regime quantile.

7. **Velocity weighting is asymmetric for credit spreads.** HY OAS widens fast in panic (single-event compression) but tightens slowly (regime drift). The velocity kick fires on widening; tightening doesn't lower the alarm faster than the absolute-level path. This prevents "false all-clear" signals.

8. **Cross-indicator scoring uses both augmentation and synthesis — added incrementally as cases earned.** First two cases were augmentation: ON RRP reads `ctx.peers.tga.velocity.delta30d` to escalate to L5; Bank Reserves reads `ctx.peers.sofr.raw` (computes IORB spread inline) to escalate by +2. Implemented via a two-pass runner (Pass 1: fetch + velocity; Pass 2: score with peers visible). Synthetic-indicator pattern was deliberately deferred at two cases — that would be the abstraction trap — but earned promotion when the third highest-priority gap (Fed Net Liquidity, signal 10/10) was specifically a synthetic. Pattern: indicator config gets `composite.compute(peers) → {raw, date, velocity}` and no source. Pass 1 skips fetch for synthetics; Pass 2 computes raw from peers before scoring. Future synthetics (Copper/Gold Ratio, Gold/BTC Ratio) reuse the same plumbing with no further runner changes.

---

## Open Questions / Next Work

- **ETH/BTC velocity:** still placeholder L2. Needs both ETH and BTC histories aligned by date (computed indicator). Non-trivial — defer until needed.
- **Indicator backlog:** original spec was 30/105/28 (Tier 1/2/3). Currently shipping 24/9/5. Highest-signal remaining gaps: SRF Usage / Discount Window / Swap Lines / FIMA (10-9/10, all Fed H.4.1 HTML scrapes — need new fetcher); Spot ETF Net Flows (10/10, Farside scrape); MOVE Index real-time (paid); JGB 10Y / UK Gilt 10Y / OAT-Bund spread (9-10/10, foreign yields available only at monthly cadence via FRED — frequency mismatch); CBOE SKEW (Yahoo ^SKEW, signal 7 — slated for next deploy); Copper/Gold Ratio (signal 9, requires switching copper from monthly FRED to daily Yahoo HG=F first).
- **Sparklines & hover tooltips:** Phase 4 stopped at direction arrows because both need on-disk history retention. If the UI gap is felt, the smallest unlock is appending each refresh's velocity snapshot to a rolling time-series file (SQLite or daily JSON). Don't build until the absence is felt.
- **Phase-0 audit for synthetic indicators:** Fed Net Liquidity ships with intuition-derived thresholds (~$300B/qtr decline = L5 per spec). A proper Phase-0 audit would compute the synthetic series over 2024-2026 (requires aligning WALCL weekly + TGA weekly + RRP daily on common timestamps, taking weekly snapshots, computing the 30d-delta distribution for empirical p25/p50/p75/p90/p99). Recalibrate Net Liq thresholds against that distribution. Skip until thresholds visibly misfire.
- **Regime-shift detection:** if Fed restarts QE or imposes YCC, the 2024-2026 quantile baselines (level + velocity) will be wrong. Manual recalibration after major Fed actions is the current implicit pattern; auto-rolling-window is an option but loses the historical anchor.
- **Sub-daily refresh:** current cron is 5pm ET only. Velocity logic doesn't need sub-daily, but if we want to surface intra-day SOFR spikes or VIX events same-day, a 9am + 3pm + 5pm cadence would help. Trade-off: more cron noise, marginal benefit for retail.

---

## File Index Quick Reference

| Need | Look at |
|---|---|
| What every indicator is, where to source it, base threshold | [design/INDICATORS.md](design/INDICATORS.md) |
| Why thresholds were recalibrated and the old/new diff | [design/THRESHOLD-AUDIT.md](design/THRESHOLD-AUDIT.md) |
| Per-indicator velocity spec, scoring rules, phasing | [design/VELOCITY-DESIGN.md](design/VELOCITY-DESIGN.md) |
| Empirical 2024-2026 absolute-level distribution per indicator | [audits/fred_summary.json](audits/fred_summary.json) |
| Empirical 2024-2026 velocity-primitive distribution per indicator | [audits/velocity_summary.json](audits/velocity_summary.json) |
| Live indicator config (source of truth for what's deployed) | [../.claude/macro-deploy/indicators.js](../.claude/macro-deploy/indicators.js) |
| Velocity primitives implementation | [../.claude/macro-deploy/velocity.js](../.claude/macro-deploy/velocity.js) |
| Fetcher logic (FRED / CoinGecko / Yahoo / Stooq) | [../.claude/macro-deploy/fetchers.js](../.claude/macro-deploy/fetchers.js) |
| Refresh runner (cron entry point) | [../.claude/macro-deploy/runner.js](../.claude/macro-deploy/runner.js) |
| Express route handlers | [../.claude/macro-deploy/api.js](../.claude/macro-deploy/api.js) |
| Dashboard tab CSS/JS | [../.claude/macro-deploy/macro-tab.css](../.claude/macro-deploy/macro-tab.css), [../.claude/macro-deploy/macro-tab.js](../.claude/macro-deploy/macro-tab.js) |
| UI design that shipped | [design/ui-mockups/SHIPPED-DESIGN.html](design/ui-mockups/SHIPPED-DESIGN.html) |
| Session-by-session chronology | [../WORKLOG.md](../WORKLOG.md) Sessions 63-67 |
