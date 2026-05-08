# Macro Stress Dashboard

A self-hosted macro signals dashboard running on Jinn (the user's personal AI assistant box) at `http://100.124.64.28:4242/` — Signals tab. Tracks 26 macro indicators across funding markets, credit, rates, FX, labor, and crypto. Each indicator gets a five-level alarm score (L1 stable → L5 critical). A holistic stress index aggregates them into a single 1-10 reading.

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
    └── test_velocity.js           ← unit tests for velocity.js primitives (13 cases)
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

### Tier 1 (18 indicators — all velocity-aware)

| Indicator | Source | Level basis | Velocity windows | Kick rule |
|---|---|---|---|---|
| SOFR | FRED SOFR | spread vs IORB (3.65) | 1d, 5d | 1d > +10bp → L4 min, > +25bp → L5 |
| 10Y Yield | FRED DGS10 | recent regime quantile | 5d, 20d | \|Δ5d\| > 25bp → +1, > 50bp → +2 |
| 2Y Yield | FRED DGS2 | recent regime quantile | 5d, 20d | \|Δ5d\| > 25bp → +1 |
| 2s10s Curve | FRED T10Y2Y | empirical bands (-0.47 to +0.74) | 30d disinversion + delta | dis-inverted → +2 (recession trigger) |
| HY OAS | FRED BAMLH0A0HYM2 | recent regime (259-461bp) | 5d, 20d | +25bp/5d → L4 min, +50bp/5d → L5 |
| IG OAS | FRED BAMLC0A0CM | recent regime (73-121bp) | 5d, 20d | +10bp/5d → +1, +25bp/20d → +1 |
| 10Y Real Yield | FRED DFII10 | recent regime (1.53-2.34) | 30d | +25bp/30d (rising) → +1 |
| 5y5y Inflation | FRED T5YIFR | anchored band 2.0-2.5 | 30d | moving away from anchor at p99 → +1 |
| ON RRP | FRED RRPONTSYD | recent regime ($0-720B) | 5d, 30d | +$50B/5d (build) → L4+ (risk-off) |
| TGA | FRED WTREGEN | recent regime ($296B-$1T) | 30d | +$200B/30d → +1, +$300B/30d → +2 |
| Fed Balance Sheet | FRED WALCL | pure velocity (4w roc) | 4w, 12w | declining → L1, rising > $12.5B/wk → L4-5 |
| Bank Reserves | FRED WRESBAL | recent regime ($2.85-3.63T) | 4w, 12w | -$200B/4w in low zone → +1 |
| Jobless Claims 4WMA | FRED IC4WSA | recent regime (202-242k) | 12w | +20k/12w → +1, -20k/12w → -1 |
| C&I Loans | FRED BUSLOANS | pure velocity (YoY) | YoY (365d) | <0% YoY → L4, <-2% → L5 |
| BTC | CoinGecko bitcoin | drawdown from 90d high | drawdown 90d, pct 7d | -20% → L3, -35% → L4, -50% → L5 |
| VIX | FRED VIXCLS | recent regime (11.86-52.33) | 1d, 5d | +5pt/1d → L4 min (event in progress) |
| Broad Dollar | FRED DTWEXBGS | recent regime (117-130) | 5d (delta + pct) | +1.5%/5d (rising) → +1 |
| USD/JPY | FRED DEXJPUS | recent regime (140-162) | 5d | +2.5pt/5d in MOF zone → L5 |

### Tier 2 (8 indicators — 7 velocity-aware, 1 deferred)

| Indicator | Source | Level basis | Velocity windows | Kick rule |
|---|---|---|---|---|
| 10Y Breakeven | FRED T10YIE | anchored band 2.0-2.5 | 30d | moving away from anchor at p99 → +1 |
| 5Y Breakeven | FRED T5YIE | anchored band 2.0-2.5 | 30d | moving away from anchor at p99 → +1 |
| 3m10y Curve | FRED T10Y3M | recent regime | 30d disinversion + delta | dis-inverted → +2 (recession trigger) |
| Continuing Claims | FRED CCSA | recent regime (1.72-1.96M) | 12w | +100k/12w → +1, -100k/12w → -1 |
| ETH/BTC | computed | placeholder L2 | — | **DEFERRED** (needs aligned ETH+BTC histories) |
| Gold | CoinGecko pax-gold | velocity-driven | 30d pct, 90d drawdown | +15%/30d → L3 (regime change), -15%/30d → L4 |
| Copper | FRED PCOPPUSDM | symmetric Dr. Copper bands | 3m pct | ±20%/3m → +1 |
| WTI Crude | FRED DCOILWTICO | asymmetric Goldilocks | 5d (delta + pct) | ±8%/5d → +1, ±15%/5d → +2 |

### Tier 3 (5 indicators — paid sources, manual reference cards, no velocity)

MOVE Index, 10Y Swap Spread, SPX Dealer Gamma, US Bank CDS Basket, EU Bank CDS Basket. These are reference cards linking to source sites for manual lookup; no automated scoring. Same status as before the velocity work.

### Live Verification

Run `ssh openclaw@100.124.64.28 "curl -s http://127.0.0.1:4242/api/macro"` and check `values[id].velocity` is populated for the 25 of 26 active indicators (everything except `eth_btc`).

---

## Status — 2026-05-08

**Threshold audit (absolute-level recalibration):** SHIPPED. All 17 active-logic indicators recalibrated to 2024-2026 empirical regime. Old config never alarmed because thresholds were calibrated against pre-2020 norms. After recalibration, levels reflect the current monetary regime. Stress index dropped from a false-alarm 3.7/10 to 3.3/10 "Watching" — the lower number is the *correct* one (no more L5 false alarm on ON RRP). See `design/THRESHOLD-AUDIT.md` for the full per-indicator diff.

**Velocity logic Phase 0 (empirical velocity distribution):** SHIPPED. `audits/velocity_summary.json` contains p50/p90/p95/p99 of |delta(window)| for each velocity-relevant indicator. Used to set velocity-kick thresholds in Phase 2.

**Velocity logic Phase 1 (plumbing):** SHIPPED. `fetchFred` now returns `{value, date, history}`. `velocity.js` provides primitives (delta, pctChange, rocPerWeek, drawdown, disinversion, yoyPct). `runner.js` computes whatever primitives an indicator declares in its `velocity:` config and passes them via `ctx`. 13/13 unit tests pass. Phase 1 was a no-op functionally (no indicator declared velocity yet) — verified before Phase 2 deploy.

**Velocity logic Phase 2 (top 6 indicators wired):** SHIPPED 2026-05-08. WALCL, TGA, HY OAS, 2s10s, C&I Loans, SOFR each got velocity layers tuned against Phase 0 empirical distributions.

**Velocity logic Phase 3 (remaining 19 indicators wired):** SHIPPED 2026-05-08. All 17 FRED-based indicators now have per-indicator velocity rules. CoinGecko fetcher extended with `fetchCoinGeckoHistory` (market_chart endpoint); BTC and Gold both wired with drawdown/pctChange velocity. ETH/BTC deferred (computed indicator — needs both ETH and BTC histories aligned by date; non-trivial). 25 of 26 indicators currently emit velocity fields in `/api/macro`.

**Velocity logic Phase 4 (UI surfacing):** OPTIONAL. Velocity meta strings already render in the dashboard tab via the existing `meta` field (e.g., WALCL displays `+$3.9B/wk (4w roc)`, BTC displays `-1.9% off 90d high`). Could add direction arrows, sparkline, or hover tooltip in macro-tab.js — non-trivial CSS/JS work, defer when needed.

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

8. **Cross-indicator scoring (RRP+TGA combined, Bank Reserves + SOFR-IORB) is deferred.** True L5 on ON RRP requires combined-drain logic with TGA velocity. We capped ON RRP at L4 in the absolute-level audit and noted the dependency in comments. Composites design is an open question in `design/VELOCITY-DESIGN.md` §7.

---

## Open Questions / Next Work

- **Phase 3:** wire the remaining 14 indicators with velocity layers per the spec in `design/VELOCITY-DESIGN.md` §5.
- **Composites layer:** combined RRP+TGA drain detection, Bank Reserves + SOFR-IORB scarcity confirmation. Either passing `ctx.allIndicators` into computeLevel, or adding a synthetic-indicator config layer.
- **Indicator backlog:** original spec was 30/105/28 (Tier 1/2/3). Currently shipping 18/8/5. Adding more is mostly config — see Session 63 worklog gap list.
- **UI surfacing of velocity:** direction arrows, sparkline, hover tooltip. Phase 4. Defer until Phase 3 done.
- **Regime-shift detection:** if Fed restarts QE or imposes YCC, the 2024-2026 quantile baselines will be wrong. Manual recalibration after major Fed actions is the current implicit pattern; auto-rolling-window is an option but loses the historical anchor.
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
