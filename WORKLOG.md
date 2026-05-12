# WORKLOG

**Last saved:** 2026-05-12 (Session 78 Wave 2 — 15 new indicators shipped via 2 new fetchers; dashboard now 65 indicators live)
**Status:** [signals/macro] Wave 2 of the 121-missing-indicator backlog implementation shipped: CBOE CDN family (vix9d, vix3m, vix9d_vix_ratio, vix_vix3m_ratio, skew), FRED-OECD foreign sovereign yields (jgb_10y, bund_10y, gilt_10y, oat_10y, italy_btp_10y) + synthetic spreads (btp_bund_spread, oat_bund_spread), Treasury Fiscal Data auctions (auction_bid_to_cover, auction_indirect_bidder, auction_primary_dealer). 2 new fetcher types added (`cboe`, `fiscaldata`). Dashboard now at **65 indicators live** (was 50). Skipped with reason: equity_pc_ratio (CBOE static CSV stale since 2020); silver/platinum/palladium (Stooq apikey wall + not on FRED + tokenized proxies untrustworthy); spr (FRED WCESTUS1 doesn't exist, EIA needs key per spec); china_cgb_10y (FRED OECD lacks China); treasury_net_issuance (different endpoint, deferred). Waves 3-6 still pending (~55 more indicators + ~26 Tier-3 cards). [jinn/gmail] Gmail access for Jinn shipped via 2-min polling cron — Session 77 details below; remains stable.

## Session 78 — Missing-Indicators Backlog Implementation [signals/macro] (LIVE — Wave 1 of 6 shipped)

Plan: implement all 6 waves of the `Macro-Dashboard/design/MISSING-INDICATORS-BACKLOG.md` plan autonomously. Wave 1 = spec corrections + 6 FRED drop-ins. Waves 2-6 cover shared-infrastructure batches, new APIs, HTML scrapes, Tier-3 manual and paid reference cards.

### Wave 1 — Spec Corrections + 6 FRED Drop-Ins (DONE)

**Indicators added** (all via existing FRED fetcher, no new infrastructure):
- **#113 `cre_loans`** (FRED CREACBM027SBOG, Tier 1, weight 7): H.8 Commercial Real Estate loans. YoY scoring: L1 >+3% / L3 -3 to 0 / L5 <-8%. Live: $3.08T, +2.4% YoY, L2.
- **#114 `consumer_loans`** (FRED CONSUMER, Tier 2, weight 6): H.8 consumer credit. YoY: L1 >+5% / L3 0-2 / L5 <-3%. Live: $1.89T, +3.5% YoY, L2.
- **#122 `jolts_quits`** (FRED JTSQUR, Tier 1, weight 7): voluntary departures rate. Level: L1 >=2.8% / L3 2.0-2.4 / L5 <1.7% + 3m delta kick. Live: 2.0%, L3.
- **#126 `umich_sentiment`** (FRED UMCSENT, Tier 2, weight 5): UMich consumer sentiment. Level: L1 >=85 / L3 65-75 / L5 <55 + 3m delta -10pt kick. Live: 53.3, L5 (recession-level — confirms current consumer mood is at 2008/2022-trough territory).
- **#127 `retail_sales_control`** (FRED RSFSXMV, Tier 2, weight 6): retail sales control group (GDP-clean). YoY: L1 >+4% / L3 -2 to +1 / L5 <-5%. Live: $612B, +5.5% YoY, L1.
- **#129 `fed_interest_expense`** (FRED A091RC1Q027SBEA, Tier 2, weight 7): federal interest expense quarterly SAAR. Level: L1 <$800B / L3 $1000-1300B / L5 >=$1600B + YoY accel kick. Live: $1.22T, +6.5% YoY, L3.

**Mid-wave bug caught + fixed:** fed_interest_expense initially showed raw=1218.938, level=L1, meta="$1B" because the format `divisor:1000` was applied while computeLevel also divided `v / 1000`. Result: scoring path saw v=1.22 (instead of 1219), scored L1. Fixed by removing internal divide; thresholds now read v in $billions directly. Re-deployed, re-verified L3.

**Spec corrections applied to `Macro-Dashboard/design/INDICATORS.md`**:
- #113 FRED ID: `RREACBM027SBOG` → `CREACBM027SBOG` (spec had residential code by mistake; CRE is the correct one)
- #117 cadence: "weekly" → "quarterly" (FHLB Office of Finance reports quarterly, not weekly)
- #123/#124 FRED-purged note: FRED removed ISM series in 2016 after license change; no free path via FRED, move to Tier-3 reference card
- #125 source clarification: `USSLIND` is Philly Fed State Leading Index, NOT the Conference Board LEI; Conference Board is paid
- #127 FRED ID: corrected to `RSFSXMV` (the control-group series)
- #28 added: "FRED removed ICE swap rates 2022-01-31" — no clean free path exists for 30Y Swap Spread
- #104 Glassnode tier note: spec annotation "Glassnode free" is stale; Glassnode has no meaningful free tier as of 2024-2025

**Verification:** `node --check` clean, 13/13 velocity tests pass, 55/55 composite tests pass; deployed to Jinn (backup `indicators.js.2026-05-12-0030.bak`); runner refreshed; /api/macro returns ok=true for all 6 new indicators with expected levels. Dashboard count 44 → 50.

### Wave 2 — Shared-Infrastructure Batches (DONE)

Five sub-batches attempted; **15 indicators shipped, 9 indicators skipped with documented reasons**.

**New fetchers added (`fetchers.js`)**:
- **`cboe`** — fetches from `cdn.cboe.com` CSV with two URL templates (`index` for VIX-family, `pc` for put/call ratios with 2-line preamble). MM/DD/YYYY date normalization to ISO. CloudFront-cached, no auth, no rate-limit.
- **`fiscaldata`** — fetches from `api.fiscaldata.treasury.gov/services/api/fiscal_service/v1/accounting/od/auctions_query` and returns rolling N-week mean of a per-auction statistic (`bid_to_cover` / `indirect_pct` / `primary_dealer_pct`). Keyless. Requires `--globoff` curl flag for `page[size]=` and `filter:gte:` syntax — added globally to `getText`.

**Sub-batch 2A — CBOE CDN vol family (SHIPPED 5 of 4 spec items)**:
- `vix9d` (CBOE VIX9D, Tier 2 weight 5): 16.89, L2. Standalone 9-day implied vol.
- `vix3m` (CBOE VIX3M aka VXV, Tier 2 weight 5): 21.24, L3.
- `vix9d_vix_ratio` (synthetic, weight 6, #63 signal 8): 0.983 (contango 1.7% steep), L2. Backwardation gauge.
- `vix_vix3m_ratio` (synthetic, weight 6, #64 signal 7): 0.809 (contango 19% steep), L1. The canonical Goldman term-structure-inversion gauge.
- `skew` (CBOE SKEW, Tier 2 weight 6, #67 signal 7): 140.2, L3. Replaces the 2026-05-10 failed Yahoo path.
- **SKIPPED `equity_pc_ratio` (#68)** — CBOE static `equitypc.csv` and `totalpc.csv` are stale (Last-Modified 2020-10-30, data ends 2019-10-04). Current CBOE moved P/C ratios to dynamic API; no free CSV path. Research file overstated freshness.

**Sub-batch 2B — Foreign sovereign 10Y yields (SHIPPED 7 of 8 spec items, via FRED-OECD fallback)**:
- Stooq's bond tickers (10jpy.b, 10dey.b, etc.) now require an apikey (verified 2026-05-12 — all 6 tickers return apikey-registration page). Substituted FRED's OECD `IRLTLT01{ISO}M156N` monthly series. Tradeoff: monthly instead of daily, ~6w lag, but free + stable.
- `jgb_10y` (FRED IRLTLT01JPM156N, Tier 2 weight 8, #54 signal 10): 2.35%, L4. JGB climbed 1.6→2.3% across 8 months — genuine yen-carry-unwind pressure registering.
- `bund_10y` (FRED IRLTLT01DEM156N, Tier 2 weight 6): 2.91%, L3.
- `gilt_10y` (FRED IRLTLT01GBM156N, Tier 2 weight 7, #56 signal 9): 4.70%, L4 (Truss-zone adjacent).
- `oat_10y` (FRED IRLTLT01FRM156N, Tier 2 weight 5): 3.40%, L3.
- `italy_btp_10y` (FRED IRLTLT01ITM156N, Tier 2 weight 6, #59): 3.39%, L2.
- `btp_bund_spread` (synthetic, weight 8, #57 signal 8): 0.48pp, L1. Eurozone fragmentation gauge.
- `oat_bund_spread` (synthetic, weight 9, #58 signal 9): 0.49pp, L2. France-Germany spread.
- **SKIPPED `china_cgb_10y` (#60)** — FRED OECD does not include China. ChinaBond official portal needs headless Chrome (Wave 3 territory).

**Sub-batch 2C — Stooq precious metals (SKIPPED 3 of 3)**:
- Stooq apikey wall blocks `si.f`, `pl.f`, `pa.f`. FRED carries gold and aluminum (`PALUMUSDM`) but NOT silver/platinum/palladium (verified — all FRED IDs return HTML 404 wrapper). CoinGecko tokenized proxies (Kinesis Silver KAG, Matrixdock Silver) trade at sustained $85+/oz premium vs spot ~$32/oz — unreliable. No reliable free path identified; deferred indefinitely with note.

**Sub-batch 2D — SPR Inventory (SKIPPED 1 of 1)**:
- Spec called for FRED `WCESTUS1`. Verified series does not exist on FRED — only EIA hosts WCSSTUS1 via XLS or API v2 (requires registration). Per task spec, skipping until Wave 3 EIA-API-key workstream.

**Sub-batch 2E — Treasury Fiscal Data auctions (SHIPPED 3 of 4 spec items)**:
- Endpoint `v1/accounting/od/auctions_query` works keyless; 109 auctions in last 12 weeks.
- `auction_bid_to_cover` (Tier 2 weight 8, #21 signal 8): 2.88x mean, L1.
- `auction_indirect_bidder` (Tier 2 weight 8, #22 signal 8): 56.3% mean, L4.
- `auction_primary_dealer` (Tier 2 weight 7, #23 signal 7): 27.2% mean, L4.
- **SKIPPED `treasury_net_issuance` (#128)** — different endpoint pattern (debt_to_penny + per-security aggregation), more complex; deferred to Wave 3.

**Verification**: `node --check` clean on both files; 13/13 velocity tests pass; 55/55 composite tests pass; deployed to Jinn (backups `indicators.js.2026-05-12-0053.bak`, `fetchers.js.2026-05-12-0053.bak`); pm2 restart applied (new fetcher dispatcher case requires restart); runner full refresh succeeded; `/api/macro` returns `ok=true` for all 15 new indicators plus all 50 pre-existing. Total dashboard indicator count **50 → 65** (+15).

### Waves 3-6 (PENDING)

Wave 3 (deferred items from Wave 2 sub-batches + originally-planned): China CGB 10Y, SPR via EIA API, treasury_net_issuance, plus DefiLlama, NY Fed Markets API, CCXT, mempool.space, HashrateIndex, SEC EDGAR. Wave 4 = HTML scrapes. Wave 5 = ~10 MANUAL Tier-3 cards. Wave 6 = ~16 paid Tier-3 cards.

---

## Session 77 — Gmail Integration for Jinn [jinn/gmail] (LIVE — polling pipeline shipped, Telegram delivery still broken upstream)

Plan: progressive enablement of Gmail/Calendar/Contacts for gc@freedomlab.nyc dedicated bot account. Get Phase 1 working (read + drafts) tonight, defer send/calendar/contacts to later sessions per safety progression.

### What shipped
- gc@freedomlab.nyc Google Workspace account set up as Jinn-only mailbox with 2FA (authenticator app, not SMS)
- GCP project `jinn-gmail` (number 157619683458) created with OAuth client + APIs enabled (Gmail + Pub/Sub)
- `gog` v0.16.0 and Google Cloud SDK 567.0.0 installed to user-local paths on Jinn (no sudo)
- gog authed for `gmail.modify` + `gmail.settings.basic/sharing` (NOT `gmail.send`) — drafts work, send blocked at scope level
- gcloud authed via Python pty-wrapper daemon (PKCE flow across multiple SSH calls)
- File-based encrypted keyring for gog (D-Bus secret-service unreachable on headless Jinn) — env vars persisted via `~/.gog-env` sourced from `.bashrc` top + `.profile` tail
- OpenClaw hooks block enabled in `~/.openclaw/openclaw.json` with templated `sessionKey: hook:gmail:{{messages[0].id}}` for per-email dedup
- Polling cron `*/2 * * * * /home/openclaw/bin/gmail-poll.sh` — replaces blocked Pub/Sub push
- Three scripts staged in repo: `.jin-staging/{gmail-poll.py,gmail-poll.sh,update_openclaw_hooks.py}` (canonical sources)
- IRC updated with 10 new entries (5 secrets, 2 accounts, 3 access perms + 1 informational blocker)
- Full setup doc at `Activation/GMAIL-SETUP-2026-05-12.md` (architecture, decisions, smoke tests, recovery procedures, admin email)
- Committed at `ca2312a` (local only, not pushed)

### What got blocked / deferred
- Pub/Sub push: blocked by `iam.disableServiceAccountKeyCreation` and `iam.allowedPolicyMemberDomains` (freedomlab.nyc Workspace Secure-by-Default policies). Admin email drafted (Appendix A of setup doc). Polling is the polite workaround.
- Telegram outbound delivery: broken pre-existing on OpenClaw 2026.5.2 — `loadChannelOutboundAdapter("telegram")` returns null at `deliver.ts:124`. Failed agent summaries land in `delivery-queue/failed/`. Workaround sketched in setup doc Appendix B (direct Telegram Bot API curl from cron, bypassing OpenClaw delivery layer).
- Gmail send scope: explicit decision deferred. User chose `full + --gmail-no-send` middle ground earlier in session, then accepted the safer scope-level limit (`gmail.modify`).
- Calendar + Contacts scopes: one `gog auth add` re-run away; deferred to next session.

### Decisions captured
- **Full compartmentalization** between Jinn and GC's personal Google data. Personal calendar NOT shared with Jinn. Jinn books on its own gc@freedomlab.nyc calendar and CCs personal email for invites.
- **Polling over push** given org policy block — 1-2 min latency acceptable for personal AI assistant; structurally simpler (no Pub/Sub, IAM, Tailscale Funnel push subscription).
- **`hooks.allowRequestSessionKey=true` accepted** as bounded risk — token-gated, 127.0.0.1-only, prefix-whitelisted (`hook:`, `hook:gmail:`).

### Surprises / Patterns Named
- **Headless-keyring state coupling** — gog stores OAuth flow state in the same keyring as the refresh token. Step 1 of multi-step auth needs the keyring env too.
- **Org-policy-blocked auth recipe** — Workspaces auto-apply Secure-by-Default policies that break the standard "service account JSON key" tutorial pattern.
- **PKCE single-process requirement** — OAuth code_verifier must live in the same process across "click URL → paste code." Solution: Python pty.fork daemon that survives SSH disconnect.
- **pkill-self foot-gun** — `pkill -f gcloud` matches the parent bash command line containing "gcloud" → self-kills → SSH exit 255.

### Open Follow-ups (next session, priority order)
- **P0:** Telegram outbound bug fix OR build failed-queue → Telegram Bot API bypass cron (sketch in setup doc Appendix B)
- **P1:** GC sends admin the org-policy-exception email (Appendix A) — when granted, migrate polling → Pub/Sub push
- **P2:** Add Calendar + Contacts scopes via one `gog auth add` re-run (single browser click)
- **P3:** Phase 4 — enable send scope; decide scope-level (`mail.google.com`) vs flag-level (`gmail.send` + remove `--gmail-no-send`); add recipient allowlist before turning on

---

## Session 76 — Phase 0 Calibration Audit [signals/macro] (LIVE — three phases shipped, zero threshold changes)

## Session 76 — Phase 0 Calibration Audit [signals/macro] (LIVE — three phases shipped, zero threshold changes)

Plan file: `.claude/plans/phase-0-calibration-audit-plan.md`. Autonomous run, three phases. Goal: re-anchor thresholds on the 15 Session-75 indicators that shipped with intuition-derived thresholds (13 primitives + 2 synthetics).

### Top-line outcome
**Zero threshold changes across all 15 indicators.** Strict Meaningful Drift Policy yielded "keep" on every audit. Session 75's authors set thresholds with informed intuition that held up against empirical review. The audit's value is preventative: the calibration-debt comments in `indicators.js` are now replaced with references to the empirical anchors in `THRESHOLD-AUDIT.md`, so future audits don't re-litigate.

### Phase A — Audit Data Generation (DONE)
- Extended `Macro-Dashboard/tooling/fred_audit.py` with 13 new FRED series IDs (EFFR, DTB3, BAMLH0A3HYC, BAMLEMCBPIOAS, DPSACBW027SBOG, MORTGAGE30US, DGS30, DFII30, CPIAUCSL, CPILFESL, PERMIT, DCOILBRENTEU, DHHNGSP).
- Extended `Macro-Dashboard/tooling/velocity_audit.py` with the same 13 series + windows matching each indicator's `velocity[]` config in `indicators.js`.
- D1: Windows-local `python fred_audit.py` returned `curl rc=56` (schannel) on all 37 series — documented Windows-curl-vs-FRED failure mode. Fallback: scp'd `fred_audit_remote.py` (the existing remote variant) and `velocity_audit.py` (with sed-overridden OUT_PATH=`/tmp/velocity_summary.json`) to Jinn `/tmp/`, ran both there, scp'd the JSON outputs back to local `audits/`. No new `velocity_audit_remote.py` file added since this is a build-environment workaround, not a permanent dual-script need.
- Regenerated `audits/fred_summary.json` (37 series) and `audits/velocity_summary.json` (37 series, multi-window) with non-error results across all in-scope IDs.
- Sample reads showing the calibration debt is real and Phase B will have meaningful work: PERMIT p25=1400 / p50=1436 / p90=1520 / current=1363 — configured "L1 >1500k" only captures top quartile, p50 reading scores L2 (regime mismatch). DGS30 p50=4.69 / p90=4.91 / current=4.97 — current configured "L3 4.7-5.2" is empirically tight to p90 region (could be calibrated less aggressively). Bank deposits, brent, natgas, mortgage_30y all returned reasonable distributions ready for review.

### Phase B — Primitive Recalibration (DONE — no threshold changes)
- Reviewed 13 primitive indicators against empirical 2024-2026 distribution under the Meaningful Drift Policy from the plan file (no threshold update unless p50 outside L2-L3, p90 below L4, p10 above L1, or L5 anchor >2× empirical max).
- **Zero indicators triggered drift.** Empirical anchors confirm each indicator's intuition-derived thresholds match the regime they were designed for. Two borderline cases (`em_corp_oas` p50 at L2 floor; `real_yield_30y` p90 in L4) are explicitly designed to behave that way and don't trigger the strict policy.
- D2 (logged in plan): the no-changes outcome is informative — Session 75's authors set thresholds with informed intuition that held up against empirical review. Future calibration audits on this set should not re-litigate without a regime shift or visible misfire.
- D3: peer-spread distributions for `effr` (vs IORB) and `tbill_3m` (vs EFFR) computed via one-off Python on Jinn (since they can't be derived from `fred_summary.json`'s absolute-level distributions). Output saved to `Macro-Dashboard/audits/peer_spread_summary.json`. yoyPct% distributions for CPI, Core CPI, Permits, Bank Deposits computed inline (the velocity primitives reproduce these on demand).
- Phase B output: indicators.js "calibration debt" comments swapped for one-line references to the new audit doc; appended a "Threshold Audit — 2026-05-10 (Session 76 Phase 0 Calibration Audit)" section to `Macro-Dashboard/design/THRESHOLD-AUDIT.md` with full per-indicator empirical anchors and verdicts.
- **Verification:** `node --check indicators.js` clean, 13/13 velocity tests pass, 55/55 composite tests pass. Deployed to Jinn (`indicators.js.2026-05-10-0311.bak` is the rollback target), data.json refreshed via runner.js, /api/macro returns ok=true with unchanged levels for all 13 audited indicators.

### Phase C — Synthetic Recalibration (DONE — no threshold changes)
- Built `Macro-Dashboard/tooling/synthetic_audit.py` (reusable for future synthetic indicators).
- **fed_net_liquidity:** reconstructed WALCL−TGA−RRP synthetic over 2024-2026 (n=123 weekly aligned on WALCL Wednesdays). delta30d distribution ($M): p10=-224B / p25=-130B / p50=-69B / p75=+55B / p90=+147B / p99=+333B; falling max=-321B. Distribution well-balanced across L1-L5 (10/30/30/20/10%). p50 in L3 ("moderate drain / normal QT") matches active-QT regime. L5 captures top 5-10% of drain weeks (regime-change events). Verdict: keep.
- **gold_btc_ratio:** CoinGecko free-tier API caps historical at 365 days (D4); used `market_chart?days=365`. Reconstructed gold/btc ratio over last 365 days (n=365 daily, 335 30d-pct readings). delta30d% distribution: p10=-11.7 / p25=-4.5 / p50=+5.8 / p75=+14.2 / p90=+28.4 / p99=+51.2; rising max=+55.7. p50 in L1 (calm modest moves), L3 fires above p90, L4 around p99. L5 (>+60%) preserved as historical crisis anchor (max 2024-2026 = +55.7%, just below). Verdict: keep.
- D4 logged in plan: gold_btc_ratio audit window is 2025-05 to 2026-05 instead of full 2024-2026 because of CoinGecko free-tier limit. Acceptable for distribution shape; documented caveat in THRESHOLD-AUDIT.md if regime-shift recalibration is later needed.
- Verification: node --check clean, 13/13 velocity tests pass, 55/55 composite tests pass, deployed to Jinn (backup `indicators.js.2026-05-10-0327.bak`), runner.js refreshed data.json, /api/macro returns unchanged levels — fed_net_liquidity L2 (+$4B/30d stable), gold_btc_ratio L1 (-11.8%/30d, BTC outperforming).
- Files added: `Macro-Dashboard/tooling/synthetic_audit.py`, `Macro-Dashboard/audits/synthetic_summary.json`. THRESHOLD-AUDIT.md appended with Phase C section.

### Files Modified (Session 76 totals)
- **Audit infrastructure:** `Macro-Dashboard/tooling/fred_audit.py`, `fred_audit_remote.py`, `velocity_audit.py` extended with 13 Session-75 series IDs. `synthetic_audit.py` created (~250 lines, reusable for future synthetics).
- **Audit data:** `Macro-Dashboard/audits/fred_summary.json` regenerated (37 series). `velocity_summary.json` regenerated (37 series, multi-window). `peer_spread_summary.json` added (EFFR-IORB, DTB3-EFFR). `synthetic_summary.json` added (fed_net_liquidity 30d delta, gold_btc_ratio 30d pct).
- **Documentation:** `Macro-Dashboard/design/THRESHOLD-AUDIT.md` extended with two new sections (Phase B per-indicator + Phase C synthetics). 15 indicators in `indicators.js` had calibration-debt comments replaced with one-line audit references.
- **Source-of-truth deploy:** `.claude/macro-deploy/indicators.js` (gitignored; deployed to Jinn).

### Decisions captured (full traces in plan file)
- D1: FRED-from-Windows hung with curl rc=56 on first attempt; fell back to running `fred_audit_remote.py` and `velocity_audit.py` on Jinn (existing documented fallback).
- D2: Strict Meaningful Drift Policy yielded zero threshold changes across the 13 primitives. Borderline cases (`em_corp_oas`, `real_yield_30y`) are explicitly designed to behave the way they do; not policy triggers.
- D3: Peer-spread distributions for `effr` and `tbill_3m` computed via inline script (can't be derived from `fred_summary.json`'s absolute-level distributions). Saved to `peer_spread_summary.json`.
- D4: gold_btc_ratio audit window narrowed to last 365 days because CoinGecko free-tier caps historical at 365d.

### Open Follow-ups (next session)
- Sparklines + history retention (Track C from prior handoff): still pending; would unlock UI improvements and replace some of the bespoke audit work.
- SRF Usage scraper (Track B from prior handoff): only remaining Fed H.4.1 indicator; needs new HTML scrape infrastructure.
- Phase-0 audits for the H.4.1 trio (swap_lines, discount_window, fima_repo): not in scope for this audit — their thresholds are anchored to historical crisis events (2008/2020/SVB) rather than current-regime distributions, so empirical recalibration doesn't apply the same way. Could be revisited if a 2026 regime episode warrants.
- Today-tab Phase 4 QA (Session 74), Inbox-routing Step 3 (Session 71): both still pending, both independent tracks.

---

## Session 75 — Indicator Backlog: Easy Wins Batch [signals/macro] (LIVE — three phases shipped)

### What Shipped (deployed to Jinn, verified via /api/macro)

This session was run in autonomous mode with a phased plan at `.claude/plans/macro-easy-wins-batch-plan.md`. Phase 1 = 5 indicators + EFFR-IORB earlier this turn. Phase 2 = Mortgage 30Y (substituted for SKEW after Yahoo egress block). Phase 3 = 7 more FRED-based indicators (30Y rates dimension, inflation realized prints, energy expansion, housing leading indicator). Net session contribution: 14 indicators added (27 → 41).

1. **EFFR-IORB Spread** — Tier 1, weight 8, peer to SOFR for money-market plumbing. FRED `EFFR`. Spread vs IORB (3.65 hardcoded, refresh at FOMC). Asymmetric scoring anchored to **2026 regime** (-1 to -2bp, tighter than 2024 norms): L1 <IORB-3bp · L2 -3 to 0 · L3 0-3bp · L5 >+5bp. Velocity: 5d delta > 5bp while spread ≥ 0 → +1 (avoids FOMC single-day noise vs 1d). Live: 3.63%, IORB-2bp, **L2** (watchful — accurate read of tightened reserve regime).

2. **3M T-Bill** — Tier 1, weight 7, FRED `DTB3`. Peer-aware primitive: reads `ctx.peers.effr.raw` to compute (DTB3 - EFFR) spread inline (same pattern as bank_reserves reading sofr peer). Asymmetric scoring (only negative spreads escalate): L1 >-10bp · L3 -25 to -50 · L5 <-100bp. Live: 3.61%, FedFunds-2bp, **L1**.

3. **CCC HY OAS** — Tier 1, weight 8, FRED `BAMLH0A3HYC`. Distress sub-component of HY (issuers one credit event from default). Effectively the free FRED-OAS replacement for the paid LCD CCC distress ratio. Asymmetric velocity (mirrors hy_oas). Thresholds: L1 <700bp · L3 900-1100 · L5 >=1400bp. Live: 915bp, +11bp/5d, **L3** (current regime sits 800-1000bp).

4. **EM Corp OAS** — Tier 1, weight 6, FRED `BAMLEMCBPIOAS`. Adds the EM credit dimension previously missing. Captures global dollar funding stress + EM-specific risk premia. Thresholds anchored to current 2026 regime (130-200bp tight): L1 <160bp · L3 250-350 · L5 >=500bp. Live: 146bp, -4bp/5d, **L1**.

5. **Bank Deposits** — Tier 1, weight 8, FRED `DPSACBW027SBOG`. SVB-style banking-stress canary. Pure velocity (YoY-based scoring): L1 YoY >+5% · L3 0-2% · L5 <-2% · -$200B/12w → +1. Live: $19.11T, +5.6% YoY, **L1** (banking system healthy).

6. **Gold/BTC Ratio** — Tier 2, weight 7, synthetic indicator (`composite.compute(peers)`). Reuses gold + btc fetches; required adding `pct30d` to btc.velocity for the synthetic to compute exact ratio velocity. Asymmetric: rising = gold winning (flight-to-safety = stress), falling = BTC winning (risk-on, capped at L2 informational). Thresholds: rising +25% → L3, +60% → L5; falling caps L2. Live: 0.0584, **-11.8%/30d, L1** (BTC outperforming gold over the month — risk-on positioning).

7. **30Y Mortgage** (Phase 2 substitution) — Tier 1, weight 7, FRED `MORTGAGE30US` weekly. Adds the housing-finance dimension previously absent. Asymmetric scoring (rising = stress): L1 <6.5% · L3 7.0-7.5 · L5 >=8.0%. Velocity kicks: +50bp/4w → +1, +100bp/12w → +1. Live: 6.37%, +0bp/4w (flat), **L1**.

8. **30Y Yield** (Phase 3) — Tier 1, weight 7, FRED `DGS30`. Long-end nominal duration anchor. Beyond-spec — original spec didn't have a standalone 30Y entry. Velocity: 5d, 20d. Thresholds anchored to current regime: L1 <4.0% · L3 4.7-5.2 · L5 >=5.7%. Live: **4.97%, L3**.

9. **30Y Real Yield** (Phase 3) — Tier 1, weight 7, FRED `DFII30`. Long-end real, the ultimate financial-conditions tightening gauge. Beyond-spec. Thresholds: L1 <1.5% · L3 2.0-2.5 · L5 >=3.0%. Live: **2.68%, L4** (very tight FCI — confirms the SOFR-IORB and bank-reserves narrative from a different angle).

10. **CPI YoY** (Phase 3) — Tier 1, weight 7, FRED `CPIAUCSL` via `yoyPct` primitive. Realized headline inflation (the public-facing print). Beyond-spec — the original spec covered forward expectations (5y5y, breakevens) but not realized prints. Thresholds: L1 2.0-2.5% · L3 3.0-4.0 · L5 >5.0% YoY · L4 <1.0% (deflation risk). Live: **+3.3% YoY, L3** (above target, uncomfortable territory).

11. **Core CPI YoY** (Phase 3) — Tier 1, weight 7, FRED `CPILFESL` via `yoyPct`. Core CPI ex food/energy — the cleaner Fed-target signal. Same thresholds as CPI YoY. Live: **+2.6% YoY, L2** (slightly above target — Fed-relevant for next-move probabilities).

12. **Building Permits** (Phase 3) — Tier 1, weight 7, FRED `PERMIT`. Privately-owned housing units authorized (k SAAR). Leading indicator — permits today become starts in 30d, completions in 6-9mo. Beyond-spec but pairs naturally with mortgage_30y. Thresholds: L1 >1500k · L3 1100-1300 · L5 <900k. YoY decline kick: <-10% YoY in low zone → +1. Live: **1363k, -8.0% YoY, L2**.

13. **Brent Crude** (Phase 3) — Tier 2, weight 6, FRED `DCOILBRENTEU`. Global oil benchmark, Mideast-sensitive complement to WTI. Same asymmetric Goldilocks framework with thresholds shifted ~$5 higher than WTI. Live: **$118.26, +5.7%/5d, L4** (current surge — geopolitical pricing).

14. **Natural Gas (HH)** (Phase 3) — Tier 2, weight 5, FRED `DHHNGSP`. Henry Hub spot. Symmetric stress framework: low = oversupply/weak industrial demand; high = winter shortage / industrial input shock. Live: **$2.67/MMBTU, -6.6%/30d, L1** (normal range, soft trend).

15. **Fed Swap Lines** (Phase 4) — Tier 1, weight 10, FRED `SWPT` (H.4.1 weekly). Original handoff's "Hard but high-signal: Fed H.4.1 indicators" — turned out FRED hosts SWPT directly so no HTML scraper needed. Asymmetric: ANY non-zero is informative. L1 <$1B · L3 $10-50B · L5 >=$200B. Live: **$206M, +$101M/4w, L1** (small but non-zero — minor activity).

16. **Discount Window** (Phase 4) — Tier 1, weight 9, FRED `BORROW` (H.4.1 monthly). Total Reserve Bank Borrowings of Depository Institutions, aggregating discount window primary credit + Bank Term Funding Program (BTFP, 2023-2024). L1 <$1B · L2 $1-10B · L4 $30-100B · L5 >$100B. Live: **$5.1B, +12% YoY, L2** (post-pandemic elevated regime; YoY rising is mildly notable).

17. **FIMA Repo Pool** (Phase 4) — Tier 1, weight 8, FRED `WORAL` (H.4.1 weekly). Foreign central banks' standing facility for overnight USD against UST collateral. L1 <$500M · L3 $2-10B · L4 $10-30B · L5 >$30B. Live: **$2M, -$99M/4w, L1** (essentially zero, back to normal after Apr 15 2026 single-week $10.5B flash spike).

### Phase 4 insight: H.4.1 catalog research succeeded

The original handoff (Session 73 → 74 transition) described the Fed H.4.1 indicators as "Hard but high-signal: most expected FRED IDs return 404, needs catalog research." Phase 4 validated this concern was overblown for 3 of 4 spec indicators. Working FRED IDs found via probe-test on Jinn: `SWPT` (Central Bank Liquidity Swaps Outstanding), `BORROW` (Total Reserve Bank Borrowings), `WORAL` (Other Repurchase Agreement Liabilities = Foreign Repo Pool). Only **SRF Usage** remains untracked — no obvious FRED ID for the Standing Repo Facility specifically. SRF would require an HTML scrape of the NY Fed Operations page, the only piece of the H.4.1 quartet still requiring new fetcher infrastructure.

### What Got Blocked

**SKEW (Yahoo ^SKEW)** — Phase 2 originally targeted SKEW. Yahoo's egress filter 429s the Jinn IP regardless of User-Agent. First attempt got `Yahoo ^SKEW: rate-limited at query2` from the existing `<` / `Edge:` text-startsWith detector. Diagnosed as UA-based blocking, deployed a browser-UA fix to `fetchers.js` (`getText` now accepts an optional `userAgent` arg, fetchYahoo passes a Chrome UA). Second attempt got plain `Too Many Requests\r\n` body — Yahoo is now blocking the IP regardless of UA, the failure crossed the JSON.parse rather than the existing detector. Per autonomous rule (verification fail twice on same phase), surfaced and switched to D9 fallback: Mortgage 30Y. The browser-UA fix in fetchers.js is still net-positive for future Yahoo indicators (or SKEW retried on a different egress / after rate-limit relaxation).

### Tests

- `test_velocity.js` — 13/13 pass (no regression).
- `test_composites.js` — 55/55 pass (was 30; added 25 new tests for tbill_3m peer-spread + gold_btc_ratio synthetic). All edge cases (missing peers, null inputs, zero-divisors, level-cap interactions) covered.
- `verify_levels.js` — all 5 new indicators show expected levels against their anchor values.

### Files Modified

- `.claude/macro-deploy/indicators.js` — 14 new indicator entries (effr, tbill_3m, ccc_hy_oas, em_corp_oas, bank_deposits, gold_btc_ratio, mortgage_30y, us30y, real_yield_30y, cpi_yoy, core_cpi_yoy, building_permits, brent, natgas); 1-line addition of `pct30d` to btc.velocity. Total ~+580 lines.
- `.claude/macro-deploy/fetchers.js` — Yahoo browser-UA fix (Phase 2 side-effect): `getText` accepts optional `userAgent`, fetchYahoo passes Chrome UA. Net positive for future Yahoo callers but didn't unblock SKEW (Yahoo blocks at IP level).
- `Macro-Dashboard/tooling/verify_levels.js` — 11 anchor values added (synthetics correctly show SKIP).
- `Macro-Dashboard/tooling/test_composites.js` — 25 new tests for tbill_3m + gold_btc_ratio (still 55/55 pass after Phase 3).
- `Macro-Dashboard/README.md` — coverage table updated 19/8/5 → 30/11/5; live-verification line; open-questions backlog updated. Tier 1 grew from 19 to 30 (+11), Tier 2 from 8 to 11 (+3).
- `Macro-Dashboard/design/INDICATORS.md` — spec entries marked SHIPPED for all that match: #2 (EFFR), #34b (CCC HY OAS — added), #41 (EM Corp OAS), #67 (CBOE SKEW — ATTEMPTED/blocked), #76 (Brent), #78 (Henry Hub), #115 (Bank Deposits), #154 (3M T-Bill), #155 (Gold/BTC Ratio). Beyond-spec additions (us30y, real_yield_30y, mortgage_30y, building_permits, cpi_yoy, core_cpi_yoy) documented in new "Beyond-Spec Additions" footer section.
- `.claude/plans/macro-easy-wins-batch-plan.md` — created; D1-D10 decisions logged inline.
- Backups on Jinn: `indicators.js.2026-05-10-0005.bak` (pre-EFFR), `indicators.js.2026-05-10-0138.bak` (pre-Phase-1), `indicators.js.2026-05-10-XXXX.bak` (pre-Phase-2 SKEW attempt and pre-Phase-3 batch).

### Decisions captured (full traces in plan file)

- D2: 6-batch over 8-batch — reliability over volume; concentrate Yahoo risk in its own phase.
- D3: Gold/BTC asymmetric scoring — only the rising direction (gold winning = flight-to-safety) escalates; falling caps at L2 informational.
- D4: 3M T-Bill modeled as primitive with peer-EFFR spread — keeps T-bill yield visible on the tile and reuses bank_reserves' ctx.peers pattern.
- D5: Asymmetric T-Bill spread scoring — negative is the stress side (cuts pricing); positive caps at L1.
- D10: Skipped financial-datasets.ai MCP integration — wrong fit for cron-driven dashboard, doesn't replace FRED, doesn't address remaining hard-track gaps. Useful only for ad-hoc Claude Code research sessions.

### Open Follow-ups (next session)

- **SRF Usage** — only remaining Fed H.4.1 indicator (signal 9-10). No FRED ID found via probe-test. Would require an HTML scrape of the NY Fed Operations page (`https://www.newyorkfed.org/markets/desk-operations/standing-repo-facility-operational-details`). Defer until the absence is felt — SRF was zero through 2024-2025 and only spikes during specific quarter-end stress events.
- **SKEW retry:** wait for Yahoo egress rate limit to relax (or retry from a different IP). The browser-UA fix in fetchers.js is in place; just re-add the indicator entry (it's straightforward to reconstruct from `INDICATORS.md` #67 + the rolled-back code) and refresh.
- **Phase-0 audits for the new synthetics + intuition-thresholded indicators** (gold_btc_ratio, ccc_hy_oas, em_corp_oas, bank_deposits, tbill_3m, mortgage_30y, fed_net_liquidity, effr): no empirical 2024-2026 distribution audit yet. Calibration debt logged inline in each `computeLevel` comment block.
- **Copper/Gold Ratio** — deferred until copper switched from monthly FRED `PCOPPUSDM` to daily Yahoo `HG=F` (frequency mismatch makes daily ratio misleading).
- **Fed H.4.1 indicators (SRF, Discount Window, Swap Lines, FIMA)** — hard track, needs new HTML-scrape fetcher. Listed in plan file D2 as deliberately skipped this session.
- **Stablecoin Supply / BTC Perp Funding / Spot ETF Flows** — need DefiLlama / CoinGlass / Farside fetchers respectively.
- Today-tab Phase 4 QA (Session 74), Inbox-routing Step 3 / `/process-inbox` slash command (Session 71) — both still pending, both independent tracks.

### Discussion: Session Architecture (file-state vs single-session)

User raised the question of moving to a "files persist, sessions die" pattern (spec.md / state.json / N short sessions read state from disk) to avoid compaction. My take, captured here for future-me: the pattern works great for sustained build-out (ship-N-indicators-following-template, audit-each-of-N-files), but oversells. Setup tax is real (~30 min before any code runs); exploratory work doesn't decompose into pass/fail tasks; we already have 80% of the pattern via the plan file + WORKLOG.md acting as informal state. Recommendation: formalize for future macro-backlog grinding (Fed H.4.1, foreign sovereigns, alt-data fetchers) where the work IS template-following at scale; keep current approach for mixed exploration + execution sessions like this one.

---

## Session 74 — UI Redesign Build & Deploy [dashboard] [ui-redesign] (LIVE)

### What Shipped (deployed to Jinn over multiple iterations)

1. **Phase 0 verified.** Drift reconciliation already done in Session 70 — confirmed via md5 across all four deploy artifacts (index.html, server.js, macro-tab.js, macro-tab.css; live = local byte-for-byte). Plan corrected: deploy target is `/home/openclaw/.openclaw/workspace/dashboard/public/` (the `/public/` segment was missing from the original plan).

2. **Today tab — Phase 1 + 2.** Added new design-token block to `:root` (canvas / surface stack, ink hierarchy, hairlines, spectrum colors, shadows, gill / mono fonts, ease curve). Loaded Cabin Google Font. Rewrote `renderToday()` with: hero (parallel rainbow beams + date + meta + quote), standalone stress tile beneath the hero (purple→red gradient — high stress on the right), day-summary pills (4: completed / notes / events / active streaks), streak badges row (tier-tinted via `streakTier()`), 2 rows of 3 tiles (Everyday | Atomic Habits | Streaks; Schedule | Notes | Coming Up), Rediscover band. Preserved every interaction (toggleHabit, addDayNote, editDayNote, deleteDayNote, editHabit, deleteHabit, editHabitSection, addTodayEvent, addHabit, toggleTodo) by keeping `.habit-row[data-secidx][data-idx]`, `.habit-section-block[data-secidx]`, `#day-note-${id}` / `.day-note-text`, `#day-note-input`, `#habit-input` selectors intact.

3. **Sidebar overhaul.** Added prism SVG triangle next to brand. Brand = "JINN" + "DASHBOARD" stacked-caps subtitle. Replaced 11 emoji icons with hand-crafted inline SVG outlines matching the prism aesthetic (sun, check-square, envelope, paper plane, calendar, brain circles, folder, gear, recycle arrows, bar chart, lightning bolt). Hover: SVG stroke switches to global `<linearGradient id="rainbowStroke">` defs, 110% scale. Active border-left switched mint→white. Added `.sb-foot` rainbow rule + version tag at the foot of the sidebar (desktop only).

4. **Phase 3 retrofit (the leverage move).** Instead of rewriting every renderer for visual consistency, applied a scoped CSS override block (`.section:not(#today):not(#signals) ...`) restyling existing classes (`.card`, `.card-header`, `.todo-item`, `.todo-cb`, `.todo-text`, `.btn`, `.btn-ghost`, `.input-row input`, `.quote`, `.progress-bar`/`.progress-fill`, `.reminder-dot`, `.swipe-action`, `.todo-item-inner`, `.day-note-*`). Markup and JS untouched in 8+ tabs. Same trick applied to `.memory-entry` so memory cards match the depth-tile vocabulary.

5. **Masonry layout.** Replaced CSS Grid with **CSS Columns** for multi-card tabs (`#todos.active`, `#system.active`, `#entropy-view.active`, `#memory-timeline`) — `column-width: 360px; column-gap: 14px;` with `break-inside: avoid` on cards. True masonry packing — no dead space below shorter cards. `.new-section-row` and Entropy `.quote` get `column-span: all` to anchor at top/bottom. Bumped `.content` max-width 800 → 2200px so wide screens fill horizontally.

6. **Per-card rainbow phase.** Each card's top stripe starts at a different point in the spectrum via inline `--card-phase` CSS variable. JS helper `applyCardPhase(container, sel)` walks direct children and assigns `(i / N) × 100%`. Stripe gradient is doubled (red→purple→red→purple, `background-size: 200% 100%`) so phase shifts navigate cleanly. Hover shimmer animates from each card's own phase. Phases re-applied on tab switch + after every drag/drop.

7. **Card drag-reorder.** `makeCardsReorderable(containerSel, keyFn, opts)` injects a `⋮⋮` handle into each card-header, persists order to `localStorage[cardOrder:<sel>]`, supports `opts.tail` (e.g. `.new-section-row` always last) and `opts.head` (e.g. `.quote` always first). Wired to Todos / System / Entropy.

8. **Calendar redesigned.** Killed Day-view button. Removed the small side-pane month grid. Main pane is a **full-month 7-col grid** (5–6 rows, faded prev/next-month edge cells). Side pane = year grid only (12 mini-months for navigation). Sub-nav dropped — single mode. Click any day cell → `openDayDetail(ds)` modal with: full date heading, four pills (events / completed / habits / notes), `+ add event` input, 4-col grid of sections (Scheduled / Completed / Habits / Journal & Notes). Modal closes on backdrop / X / Escape. Mobile: month grid stays 7-col with compressed cells (just dots, no event titles); year grid stacks below.

9. **Auto-roll dated todos.** New `rollUncheckedDated()` in `server.js` runs on every `/api/data` request — any unchecked todo with `date < today` gets rolled to today's date and persisted to `todos.md`. Verified end-to-end via curl: yesterday-dated test todo rolled forward, appeared in `state.todayEvents`. Cleaned up the test entry.

10. **"Today" section as literal semantic.** Updated `getEventsForDate(dateStr, ...)` to also include unchecked items from a section literally named `Today` when `dateStr === todayStr()`. So adding "Obsidian 2nd Brain" to the Today section now auto-syncs to: Today's Schedule on Today tab, today's cell in Calendar month grid, and the day-detail modal. No date field required. Items stay until checked.

11. **Explicit `→ today` button on every todo row.** Hover affordance (low-opacity → full on hover) calling `scheduleTodoForDate(section, index, today)`. Already-on-today todos show `✓ today` (active state, white-on-black) — clicking again clears the date. Date pill shows `TODAY` (white-on-black, mono, weighted) when `item.date === today`.

12. **Hero ↔ stress tightening.** Pulled stress bar out of hero into its own tile (rainbow beams no longer compete with the spectrum). Reduced hero padding-bottom (24→14px desktop) + stress padding-top (14→9px) + stress flex gap (10→7px) + 4px margin between them. Beams nearly touch the spectrum bar without overlap.

### Aesthetic decisions locked

- **Stress spectrum direction:** purple (calm) → red (critical), left to right. Marker position = `(macroIndex / 10) * 100%` so semantics map cleanly to color.
- **CSS Columns over Grid for masonry** — Grid leaves dead space below shorter items; columns pack vertically.
- **Per-card phase via `--card-phase`** rather than `:nth-child` — adapts to dynamic card counts and drag-reorder.
- **Retrofit-via-scoped-CSS** for non-Today/Signals tabs — high leverage, no renderer rewrites, contained blast radius.
- **`Today` section as literal name** — implicit "today list" semantic without requiring a separate API or schema field.
- **Day-detail modal** as the deep-dive surface — week / month tiles stay scannable; click for full ledger view.
- **Year-progress bar removed** — user disliked the aesthetic; year context lives in the year side-panel grid instead.

### Files Modified

- Live + local `dashboard-deploy/`: `index.html` (massive — new tokens + sidebar overhaul + retrofit block + calendar rewrite + day-detail modal + helpers `streakTier` / `formatDateLong` / `formatTimeShort` / `weekNum` / `eventDot` / `applyCardPhase` / `makeCardsReorderable` / `scheduleTodoForDate` / `openDayDetail` / `closeDayDetail` / `addCalendarEventAt`, renderToday rewrite, renderCalendar + renderCalMonthMain + renderMonthCells, sb-foot markup, brand-stack markup, 11 inline SVG icons, rainbow-stroke `<defs>`)
- Live + local `dashboard-deploy/`: `server.js` (added `rollUncheckedDated()`, updated `getEventsForDate()` for the Today-section semantic)
- `.claude/plans/today-tab-redesign-plan.md` — Phase 0 marked done, path correction (`/public/` was missing)
- Backups on Jinn for revert: `index.html.pre-today-redesign-...`, `pre-phase3-retrofit-...`, `pre-grid-rainbow-...`, `pre-tabfix-reorder-...`, `pre-columns-icons-...`, `pre-stress-yearprog-...`, `pre-calendar-redesign-...`, `pre-7col-wider-...`, `pre-daydetail-...`, `pre-monthgrid-stresstile-...`, `pre-rollover-...`, `pre-todaysection-...`, `server.js.pre-rollover-...`, `server.js.pre-todaysection-...` (all under `dashboard/public/` and `dashboard/`).

### Pattern Captured — Retrofit-via-scoped-CSS for visual consistency

When you need to apply a new aesthetic across N tabs that each have their own renderer, **scope a CSS override block to the relevant container selector and restyle the existing class names** (`.section:not(#today):not(#signals) .card { ... }`). Don't rewrite each renderer to use new classes — that's N times the blast radius and risk of regressions in interaction handlers (swipe gesture math, Sortable.js handles, `toggleCard()` sibling lookups). Instead, keep markup and JS untouched, and let CSS do the visual lift. Used here for Phase 3 retrofit (8 tabs), Calendar redesign (additive scoped block), and `.memory-entry` (one block to align with `.card` aesthetic). Fast, safe, reversible.

### Earned-by-bumping-into-it operational notes

- **CSS specificity gotcha**: `#todos { display: grid }` (ID selector, 100) beats `.section { display: none }` (class, 010). Inactive sections rendered at the bottom of whatever tab was active. Fix: qualify with `.active` → `#todos.active { display: grid }`. Caught when user reported tab-switching showed multiple sections piled together.
- **Sortable + appendChild loop bug**: `makeCardsReorderable` reorders cards by `appendChild` in saved order, which moves them past sibling `.new-section-row`, putting it visually at the top. Fix: re-anchor head/tail elements via `opts` after the appendChild loop.
- **`column-span: all`** requires the element to be a direct child of the column container, not nested. Worked for `.new-section-row` and Entropy's `.quote` — both direct children.
- **SVG `stroke: url(#rainbowStroke)` cross-references** require the gradient `<defs>` to be in the same document; a hidden top-of-body SVG with the linearGradient defs works fine.
- **`/api/data` is the right hook** for `rollUncheckedDated()` — gets called on every page load + 30s polling, so the daily roll happens within 30s of midnight. No cron needed.

### Open Follow-ups (next session)

- **Phase 4 QA** — mobile (iOS Safari + Android Chrome): swipe-to-Today on Todos, drag-handle reorders inside cards, day-detail modal scrolls, month grid cells tappable. Desktop: Sortable card drag works in Todos / System / Entropy, Sortable.js `.drag-handle` on todos still reorders inside cards. Browser console: no JS errors.
- **Inbox / Outbox visual polish** — they emit one big `.card` so they got the retrofit but haven't been laid out for wide canvas. Could split into list + detail panes or 2-col masonry of note items.
- **Lightning tab** — has its own QR + payment list structure; visual retrofit applied but layout untouched.
- **Memory drag-reorder** — `applyCardPhase` runs but `makeCardsReorderable` not wired (memory entries aren't `.card` class). Easy add if user wants.
- **Inbox-routing Step 3 (`/process-inbox`)** from Session 71 still pending — independent track.

---

## Session 73 — Macro Composites + Phase 4 UI + Fed Net Liquidity Synthetic [signals/macro] (LIVE)

### What Shipped (deployed to Jinn, verified via /api/macro)

1. **Composites layer (cross-indicator scoring).** `runner.js` extended to a two-pass refresh: Pass 1 fetches raw + computes velocity for every indicator (no scoring); Pass 2 builds a `peers = {indicatorId: {raw, velocity}}` snapshot and scores levels with `ctx.peers` available. Two augmentation cases wired:
   - **ON RRP composite L5** — `ctx.peers.tga.velocity.delta30d > +$200B` (clear refill, ~p90 build) AND `ctx.delta30d < -$100B` (RRP draining clearly) → L5. Captures the canonical debt-ceiling-style combined-drain event. Spec `+$100B` TGA threshold tightened to `+$200B` because empirical p90 TGA build is +$235B; +$100B is normal pre-issuance noise.
   - **Bank Reserves composite +2** — `ctx.peers.sofr.raw - 3.65 > 5bp` AND `ctx.delta4w < -$100B` → +2 levels. Confirms genuine repo-plumbing scarcity vs. theoretical (Logan/Williams' "$3T scarcity" was theoretical; SOFR confirming is the empirical signal). Caps at L5.

2. **Synthetic-indicator pattern earned promotion.** Originally deferred at two cross-ref cases ("avoid the abstraction trap"). Earned its keep when the third highest-priority gap (Fed Net Liquidity, signal 10/10) was specifically a synthetic, not an augmentation. Pattern: indicator config gets `composite.compute(peers) → {raw, date, velocity}` and no source. Pass 1 skips fetch for synthetics; Pass 2 derives raw from peers before scoring. Future synthetics (Copper/Gold ratio, Gold/BTC ratio) reuse the same plumbing.

3. **Fed Net Liquidity (signal 10/10, first synthetic).** `WALCL − TGA − RRP` from existing fetches. Currently $5.83T at +$4B/30d (essentially flat, normal QT regime). Pure velocity scoring asymmetric like WALCL — rises bullish, slow drains normal QT, fast drains regime change. Thresholds: `>+$100B/30d → L1`; `-$100B to -$25B → L3` (normal QT); `>-$200B/30d → L5` (regime change, mapped from spec's $300B/qtr trigger). WALCL gained `delta30d` to its velocity[] specifically to feed the synthetic.

4. **Phase 4 UI — direction arrows.** `velocityDirection(velocity)` helper in `dashboard-deploy/macro-tab.js` picks the first numeric velocity field (skips categoricals like disinversion's `curveState30d`), returns `{arrow: ↑/↓/→, kind: up/down/flat}`. Arrow injected next to value in tile template. Tier-2 refresh handler updates arrow on tap-refresh. Coloring is neutral differentiation (orange `--mc-bar-3` up, yellow `--mc-bar-2` down, whisper flat) — not good/bad semantics, since direction-meaning varies per indicator.

5. **Test coverage.** New `Macro-Dashboard/tooling/test_composites.js`: 30 cases total (was 0). Covers ON RRP composite paths (5d panic / RRP+TGA combined drain / threshold blocks / missing peers / peer-velocity-missing fallback / level caps), Bank Reserves composite paths (single-var kick + composite compounding to L5 cap, threshold blocks, missing peers), Fed Net Liquidity composite (compute correctness, missing-peer null returns, all 5 asymmetric scoring buckets, placeholder L2 fallback). Existing 13 velocity-primitive tests still pass.

### Files Modified

**Source (deployed via scp):**
- `.claude/macro-deploy/runner.js` — two-pass refresh, `fetchOnly`/`scoreFromPending`/`buildPeersFromPending`/`buildPeersFromStored` helpers, synthetic-indicator support
- `.claude/macro-deploy/indicators.js` — ON RRP composite L5 path, Bank Reserves +2 composite, WALCL gained `delta30d` velocity field, new `fed_net_liquidity` indicator with `composite.compute(peers)`
- `.claude/dashboard-deploy/macro-tab.js` — `velocityDirection()` helper + arrow rendering in tile template + tier-2 refresh handler updates arrow
- `.claude/dashboard-deploy/macro-tab.css` — `.mc-dir`, `.mc-dir-up`, `.mc-dir-down`, `.mc-dir-flat`

**New tooling:**
- `Macro-Dashboard/tooling/test_composites.js` — 30 unit tests for cross-indicator + synthetic scoring

**Docs:**
- `Macro-Dashboard/README.md` — indicator count 27 total (19/8/5); Status section gained composites + Phase 4 + synthetic subsections; Key Decisions #8 rewritten; Open Questions trimmed (composites + Phase 4 removed); coverage table gained `fed_net_liquidity` row; folder layout includes test_composites.js; deploy workflow unchanged.

**Backups on Jinn:** `indicators.js.2026-05-09-{HHMM}.bak`, `runner.js.2026-05-09-{HHMM}.bak`, `macro-tab.js.2026-05-09-{HHMM}.bak`, `macro-tab.css.2026-05-09-{HHMM}.bak`.

### Verification

- 30/30 composite tests pass; 13/13 velocity tests pass; `verify_levels.js` shows no regression on 23 indicators with current FRED values
- Live `/api/macro` confirms: `fed_net_liquidity` present at $5.83T (L2), `+$4.1B/30d`; `on_rrp` composite path reachable but currently silent (TGA delta30d only +$30B, well below $200B trigger); `bank_reserves` composite path reachable but currently silent (delta4w only -$84B, SOFR at IORB-5bp). Stress index 3.3 unchanged. Tier 1 count 19; total contributing indicators 19.
- Deploy: backups, scp, syntax-check on Jinn, pm2 restart, `runner.js all` refresh, curl-verify all completed clean.

### Pattern Captured — Augmentation vs. Synthesis (architectural)

Cross-indicator logic comes in two shapes that look similar but route through different machinery: **augmentation** modifies an existing indicator's score by reading peers (no new card surfaces); **synthesis** creates a new indicator card that doesn't exist as a source. The deferred cases in the codebase before this session were augmentations — `on_rrp` and `bank_reserves` wanted to read peer velocity to escalate their own score. Trying to solve those with a synthetic-card framework would have been the abstraction trap. When the third case was a genuine synthetic (Fed Net Liquidity), the synthetic pattern earned its keep on its own merits, not as a forced unification of the augmentation cases. The lesson: don't unify two patterns that differ in shape just because they share a substrate (the `peers` snapshot). Each pattern earns its keep by its own concrete case.

### Open Follow-ups (next session candidates)

- **Indicator backlog continuation** — easy adds remaining: Gold/BTC Ratio (signal 7, synthetic from existing data), EFFR-IORB Spread (signal 8, FRED `EFFR` clone of SOFR pattern). Hard adds: Fed H.4.1 indicators (Swap Lines, Discount Window, FIMA, SRF) — most-expected FRED IDs return 404, would need catalog discovery or HTML scrape. Spot ETF Net Flows (Farside scrape) and MOVE Index real-time (paid) also high signal but new infrastructure.
- **Phase-0 audit for Fed Net Liquidity thresholds** — currently intuition-derived from spec. A proper audit computes the synthetic series over 2024-2026 (align WALCL weekly + TGA weekly + RRP daily, take weekly snapshots, get 30d-delta empirical distribution) and recalibrates. Skip until thresholds visibly misfire.
- **ETH/BTC velocity** — still placeholder L2 (computed indicator needs aligned ETH+BTC histories).
- **Sparklines / hover tooltips** — needs on-disk history retention (rolling JSON or SQLite). Defer until UI gap is felt.
- **Inbox-routing Step 3 (`/process-inbox`) from Session 71 still pending** — independent track.
- **Today tab redesign (Session 72) execution still pending** — independent track, full handoff plan exists in `.claude/plans/today-tab-redesign-plan.md`.

---

## Session 72 — Today Tab Redesign Exploration [dashboard] [ui-redesign] (PLANNED — not deployed)

### What Shipped — Design exploration

1. **Phase 1 inventory.** Mapped current Jinn dashboard: 11 tabs, ~3000-line `index.html`, 1500-line `server.js`, file-based storage, scp deploy pattern. Catalogued every interactive behavior that must survive a redesign: swipe-to-add (`.swipeable` 80px threshold), Sortable.js `.drag-handle`, card collapse (`toggleCard()` sibling pattern), 4-view calendar, inline edit pattern (12+ callers), entropy optimistic UI (Session 64 fix), 30s polling + skip-while-typing, LTM modal.
2. **Two rounds of web research.** Round 1 (broad): Linear, Mercury, Things 3, Cron, NYT, iA Writer, Bloomberg, Reflect, Superhuman. Round 2 (narrower): WHOOP three-tier model, Robinhood mobile pattern, sage/olive 2026 trend, luminance hierarchy in dark mode, charts-in-tiles vocabulary.
3. **41 mockup directions** in `.claude/plans/MOCKUPS.html` across 4 narrowing rounds:
   - **Round 1 (12):** Editorial Lift, Editorial Journal, Mercury Mature, NYT Editorial, Linear-Inverted, Vercel Geist, Superhuman 5-Shade, Things 3 Inverted, Notion Calm, Bento Hero, Two-Pane Editorial, Typographic-Only.
   - **Round 2 (13):** Bloomberg Personal, Editorial Bento, Activity Rings, GitHub Pulse, Stripe Atlas, Layered Depth, Linear Dense+, Vercel+Mint, Anthropic Console, Cron 3-col, Bloomberg Wall, Sunsama Daily Review, Index Card Hub.
   - **Round 3 (LIFE OS Sovereign):** Stoic premium dashboard recreated from user-provided inspiration image (deep midnight + warm gold + Trajan-style serif + classical motifs).
   - **Round 4 (B+W+rainbow):** BTBAM Cityscape, Prism Spectrum, Vignelli Categorical, Cityscape Prism, Prism Cityscape, Cityscape Depth, Cityscape Depth v2.
4. **Final standalone Today mockup** at `.claude/plans/today-tab-redesign.html`. Full-page implementation showing redesigned chrome with real Today-tab structure: hero (date + parallel rainbow beams + quote + spectrum bar with marker, no word labels, no big stress number), day-summary pills, streak badges row, two 3-tile rows (Everyday + Atomic Habits + Streaks; Schedule + Notes + Coming Up), Rediscover band, footer. Hover/animation effects: tile lift + glimmer sweep, checkbox pop, marker pulse, beam fade, sidebar shimmer. Honors `prefers-reduced-motion`. Real partial data (Move/JRNL/Water/Cold shower) pulled from `Jinn-Vault/Daily/2026-05-07.md`.
5. **Implementation plan** at `.claude/plans/today-tab-redesign-plan.md`. 4-phase plan with Phase 0 drift reconciliation (mandatory prerequisite), Phase 1 token extraction, Phase 2 `renderToday()` refactor, Phase 3 other tabs (deferred), Phase 4 QA. Includes preserved-interaction inventory, deploy mechanics, 7-item risk register, effort estimate (4–8 hr to ship Today tab through QA), and explicit list of open data needs from user.

### Aesthetic decisions locked

- **Palette:** pure black canvas (`#000000`), depth-tile gradient `#131313 → #060606`, off-white ink `#ffffff` for primaries, mute `#d4d4d4` for body, full 7-color spectrum (`#ff3838` red → `#b860ff` purple) used as emphasis only.
- **Type:** Gill Sans (`'Gill Sans', 'Gill Sans MT', 'Cabin', 'Lato', system`) with Cabin loaded from Google Fonts as the closest free fallback. JetBrains Mono for numerics/timestamps.
- **Depth:** luminance hierarchy (5-tier surface stack) + `inset 0 1px 0 rgba(255,255,255,0.06)` top-edge highlight + soft drop shadow. No outline borders.
- **Rainbow strategy:** beam burst in hero (parallel slope = -1, 7 lines, 3px stroke, drop-shadow); spectrum bar with marker at bottom of hero; streak counts tier-tinted (3d=red → 60d+=purple); schedule dots vary by time of day; coming-up dots vary by relation type.
- **Layout:** sidebar nav (200px fixed left at desktop, sticky horizontal scroll at mobile) + main content. Three-column layouts dropped per user feedback. Tile bento with hover lift.

### Files Created (gitignored — `.claude/plans/`)

- `.claude/plans/MOCKUPS.html` — 41 surveyed directions
- `.claude/plans/today-tab-redesign.html` — standalone full-page Today mockup
- `.claude/plans/today-tab-redesign-plan.md` — implementation handoff plan

### Open Follow-ups (next session)

- **Execute `today-tab-redesign-plan.md` Phase 0**: pull live `index.html` from Jinn, diff against local `dashboard-deploy/index.html`, reconcile any drift. Per the plan, this MUST happen before any redesign deploy or first scp clobbers live macro tab.
- **Execute Phase 1**: extract design tokens into `:root` of `dashboard-deploy/index.html`, add Cabin Google Fonts link, add streak-tier helper classes (`.r3` through `.r99`) and `streakTier(days)` JS helper.
- **Execute Phase 2**: rewrite `renderToday()` (line 1114 in `dashboard-deploy/index.html`) using mockup as ground truth. Preserve all listed interactions (toggleHabit, addDayNote, editHabit, etc. — full list in plan).
- **Open data the user needs to provide before final content match**: full Everyday list, Atomic Habits sections beyond Daily Routines, real current streak counts, Today's actual schedule shape, Coming Up content, stress-data wiring (whether Today fetches `/api/macro` or needs new fetch).
- **Inbox-routing Step 3 from Session 71 still pending** — `/process-inbox` slash command. Independent track; can run in parallel.

### Pattern Captured — Element-level iteration narrows faster than whole-design picks

Across 4 rounds, the user converged not by choosing a single mockup but by citing specific elements to keep/drop from multiple ("I like the rainbow header from #35, the triangle from #36, but #37 uses too much color"). Subsequent rounds reconciled cited elements rather than restarting. This compresses what would otherwise be 5+ blind iterations into 2 deliberate combinations.

---



## Session 71 — Inbox Routing Pipeline: Architectural Redesign + Step 2 [inbox-routing] [dashboard] (LIVE — partial)

### What Shipped — Step 2: Dashboard Outbox Tab (DONE, verified end-to-end)

1. **Dashboard rename Content Queue → Outbox.** Backing file `content-queue.md` → `outbox.md`. Adopted full inbox-style hex-ID CRUD: GET/POST/PUT/DELETE on `/api/outbox[/:id]`, inline edit support (matches inbox tab UX), id-based DELETE replaces index-based, localStorage migration so any user with stale `'content'` activeSection auto-upgrades to `'outbox'` on next load.
2. **Deployed to Jinn.** Backups: `server.js.2026-05-08-pre-outbox.bak`, `public/index.html.2026-05-08-pre-outbox.bak`. Migrated data via `cp content-queue.md outbox.md` (kept original as fallback — user can `rm content-queue.md` once verified visually). pm2 restart `jinn-dashboard`, PID 1893841 online on port 4242.
3. **Verified end-to-end.** GET /api/outbox returns 200 with migrated entries (auto-assigned hex IDs `44f48e`, `ef8ebc` on first read), POST creates new entry with new hex ID, DELETE removes by id. File on disk now uses `## TIMESTAMP | HEXID` format with stable IDs.
4. **Diff sanity check before deploy.** Ran `diff` of local vs live `server.js` and `index.html` — every hunk attributable to my edits, no out-of-band drift on Jinn (validated against the Session 65 anti-pattern memory).

### What Shipped — Architectural Redesign (DONE, plan rewritten)

1. **Killed the Jinn-classifies-overnight design.** Original plan had Jinn run a nightly Codex cron that classified outbox entries against `SECOND-BRAIN-INDEX.md` (passed inline) and wrote YAML to `outbox-processed.md`, which then rsync'd to a `.routing-inbox/` directory, where `/process-outbox` parsed and dispatched. Three machines, two intermediate files, dedup ID tracking. **Wrong because Jinn doesn't have access to the Ai Playground repo** — passing the index inline is not the same as having read access to the actual destination files; the agent can't disambiguate between similar topic files without reading their contents. Classification belongs to chief-of-staff (Claude Code with full repo context).
2. **Renamed: outbox-routing → inbox-routing.** Plan + PROGRESS files renamed in `.claude/plans/`. Old files deleted. **Asymmetric naming preserved on purpose:** Jinn-side stays "Outbox" (data outbound from Jinn), Windows-side becomes "Inbox" (data inbound to chief-of-staff). Same file, two perspectives.
3. **Architecture collapsed from 11 steps to 4.** Steps 4 (Jinn cron), 5 (slash command parsing YAML), 6 (`.routing-inbox/` scaffold) folded into a single Step 3: build `/process-inbox` slash command that pulls outbox.md from Jinn via HTTP (GET /api/outbox), classifies against `SECOND-BRAIN-INDEX.md`, routes to destinations, deletes routed entries on Jinn (DELETE /api/outbox/:id) to close the loop. INBOX.md at workspace root is the visible record of last run; REVIEW-QUEUE.md at root for low-confidence items.
4. **`/process-inbox` is sibling to `/sync-ledger`.** Same "Jinn captures, Windows processes, pull-only" pattern, different source files (outbox.md for inbox routing, daily/*.json for ledger). Could be combined into one `/sync-jinn` later if running separately gets annoying.

### Files Touched

**Dashboard (Step 2):**
- Jinn live + local `dashboard-deploy/`: `server.js` (parseOutbox/serializeOutbox + 4 CRUD handlers; `outbox` initial state field), `public/index.html` on Jinn / `index.html` locally (tab rename, render/CRUD functions, localStorage migration)

**Plan files (redesign):**
- Created: `.claude/plans/inbox-routing-pipeline.md` (4-step plan with redesign rationale section), `.claude/plans/inbox-routing-PROGRESS.md` (Steps 0-2 done, Step 3 sub-tasks broken out, session log)
- Deleted: `.claude/plans/outbox-routing-pipeline.md`, `.claude/plans/outbox-routing-PROGRESS.md`

**Index + companion docs:**
- `SECOND-BRAIN-INDEX.md` (workspace root) — consumer references → "/process-inbox", REVIEW-QUEUE path moved to root with new format spec, tag-shortcut text, "adding new destination" instructions
- `.claude/plans/second-brain-extensions.md` — companion link, slot references for origin frontmatter + wikilinks now point to /process-inbox Step 3, sequencing table updated
- `.claude/commands/sync-ledger.md` — sibling-pipeline reference updated to new plan name

### Pattern Captured — Asymmetric naming maps to perspective

The instinct to "make it consistent" by using one name on both sides loses semantic information about direction. **Outbox** on Jinn is correct (data going outbound from Jinn's POV). **Inbox** on Windows is correct (data inbound to the chief-of-staff's POV). Same file, two perspectives. Don't unify the naming just for symmetry.

### Open Follow-ups (next session candidates)

- **Step 3 — build `/process-inbox`** (the next concrete step). 5 sub-tasks listed in `.claude/plans/inbox-routing-PROGRESS.md`: command file, network reachability check, origin frontmatter stamping, wikilink enrichment (light pass), INBOX.md status comment format.
- **Step 4 — smoke test** with 6 sample items spanning destination types after Step 3 ships.
- **`.routing-inbox/` directory naming is now misleading** — only used by `/sync-ledger` for daily-ledger staging (`.routing-inbox/daily-pull/`). Rename to `.jin-staging/` or `.jin-pull/` in a future cleanup pass (touches sync-ledger.md, .gitignore, render-daily-ledger.js paths).
- **INBOX.md location** currently designed at workspace root. Could move to `Jinn-Vault/Inbox.md` if you want all "from Jinn" content under one folder. Cosmetic — defer until /process-inbox is running.
- **Cleanup on Jinn**: `~/.openclaw/workspace/content-queue.md` still exists as fallback. Once you've eyeballed the Outbox tab in the browser, `rm content-queue.md` on Jinn.

### Earned-by-bumping-into-it operational notes

- **Tailscale-VPN conflict:** when Tailscale shows a peer "online" but pings/SSH fail with "Permission denied" at the network layer, check if a separate VPN is running first. Tailscale routing breaks while VPN is active. Cost ~5 minutes this session before we figured it out.
- **Jinn SSH user is `openclaw`** (not `giancarnevale`, not `pi`, not `jinn`). `openclaw@100.124.64.28` over Tailscale. The `~/.ssh/id_ed25519` key authenticates.
- **pm2 needs the full nvm path on Jinn:** `/home/openclaw/.nvm/versions/node/v22.22.0/bin/pm2`. Bare `pm2` fails with "node: No such file or directory" because pm2 shebangs to `#!/usr/bin/env node` and `node` isn't on default PATH. Workaround: `export PATH=/home/openclaw/.nvm/versions/node/v22.22.0/bin:$PATH && pm2 ...`.
- **Plan line numbers go stale fast.** The original outbox-routing plan referenced `server.js:612-642` for the inbox CRUD pattern; actual location was 752-782 by the time Step 2 ran. Per the existing memory `feedback_no_hallucinated_identifiers.md`: grep before trusting line numbers from a plan written days ago.

### Earlier this session (Session 67 cleanup)

- Pushed Session 67's commit (`8f7b1c1`) to origin/master after confirming the .gitignore restructure scope. `c02b031..8f7b1c1` two commits to origin.

---

## Session 70 — Macro Threshold Audit + Velocity Logic Phase 0-3 + Macro-Dashboard reorg [signals/macro] (LIVE)

### What Shipped (deployed to Jinn, verified via /api/macro)

1. **Threshold audit** — 17 active-logic indicators recalibrated to 2024-2026 empirical regime (L1≈p25, L3≈p50, L5=top-decile-or-historical-anchor). Old thresholds were calibrated to pre-2020 norms — current regime sat in old L3-L4 producing false alarms. Examples: ON RRP at $0.77B flagged L5-critical → now L4 (post-QT structural normal); 10Y Real Yield old L1 `<0.5%` was unreachable since min has been 1.53%. Bank Reserves L2 gap restored. SOFR hardcoded IORB refreshed 4.40% → 3.65%.

2. **Architectural cleanup swap** — live `index.html` on Jinn (138KB) had inline accumulated macro tab code; local `dashboard-deploy/index.html` (114KB) used the clean external `<script src="/macro-tab.js">` architecture from Session 65. Deployed clean version. ~24KB inline removed. (Resolves the open architectural drift carried in Session 69's Open section.)

3. **Velocity logic Phase 0** — empirical velocity distribution audit. p50/p90/p95/p99 of |Δ(window)| for 24 series 2024-2026 → `Macro-Dashboard/audits/velocity_summary.json`. Empirically-grounded velocity-kick thresholds.

4. **Velocity logic Phase 1 plumbing** — `fetchFred` returns `{value, date, history}` (last 400 obs). New `velocity.js` with 6 primitives (delta, pctChange, rocPerWeek, drawdown, disinversion, yoyPct). 13/13 unit tests pass. Runner computes per-indicator primitives, passes via ctx, persists in data.json. Phase 1 verified as no-op (existing levels unchanged) before any scoring rule converted.

5. **Velocity logic Phase 2-3** — all 25 active-logic indicators got per-indicator velocity rules tuned against Phase 0 distributions. Notable transformations:
   - **WALCL**: dead `return 2` → live with `+$3.9B/wk (4w roc)` meta; declining=L1, rising=L4-5 (pivot signal). Pure velocity indicator now.
   - **C&I Loans**: dead `return 2` → L1 with `+5.7% YoY` meta; <0% YoY = L4, <-2% = L5.
   - **HY OAS**: asymmetric — fast widening kicks alarm up (5d > 50bp → L5), tightening doesn't lower it.
   - **2s10s + 3m10y**: 30d disinversion check — was-negative-now-positive forces +2 (canonical recession-arrival signal).
   - **ON RRP**: 5d build > $50B → L4+ (money fleeing back to Fed = risk-off). True L5 deferred (needs RRP+TGA composite).
   - **SOFR**: 1d spike > 10bp → L4+ regardless of absolute spread (Sept 2019-style detection).
   - **BTC**: drawdown from 90d high (-20%/-35%/-50% → L3/L4/L5).
   - **VIX**: +5pt/1d spike → L4 minimum (event in progress).
   - **USDJPY**: +2.5pt/5d in MOF zone (≥156) → L5 (carry-stress acceleration).
   - **CoinGecko fetcher** extended with `fetchCoinGeckoHistory` (market_chart endpoint) for BTC + Gold history.

6. **`Macro-Dashboard/` folder created at project root** (next to `OpenClaw Class/`). Consolidates design docs (INDICATORS.md, THRESHOLD-AUDIT.md, VELOCITY-DESIGN.md, ui-mockups), empirical audits, audit tooling, and a README with a per-indicator coverage table (level basis + velocity windows + kick rule). Source deploy code stays in `.claude/macro-deploy/`.

### Files Modified
- Jinn: `~/.openclaw/workspace/macro/{indicators,fetchers,runner}.js` + new `velocity.js`; `~/.openclaw/workspace/dashboard/public/index.html` (clean swap)
- Local source: `.claude/macro-deploy/{indicators,fetchers,runner,velocity}.js`
- Backups on Jinn: `*.2026-05-07-{threshold-audit,pre-clean-swap}.bak` and `*.2026-05-08-{pre-velocity,pre-phase3}.bak`
- New: `Macro-Dashboard/{README.md, design/, audits/, tooling/}` at project root
- Moved: `Research/MACRO-INDICATORS.md`, `Research/MACRO-VELOCITY-DESIGN.md`, `Research/MACRO-DASHBOARD-*.html`, `.jin-staging/{fred_summary,velocity_summary,*.py,*.js,threshold-audit-proposal}.{json,py,js,md}` → `Macro-Dashboard/{design,audits,tooling}/`

### Pattern Captured
**Per-indicator velocity, not a shared scoring engine.** Each indicator's velocity rule lives inline in its `computeLevel`, documented like the threshold-audit regime-basis comments. SOFR cares about 1d spikes; WALCL cares about 4w rate-of-change; C&I Loans cares about YoY. There is no universal "30d delta" default. Three similar lines beats a premature abstraction.

### Open Follow-ups (next session candidates, ordered by signal value)
- **Composites layer** (highest value) — RRP+TGA combined drain detection unlocks the deferred true L5 case for ON RRP; Bank Reserves + SOFR-IORB cross-confirmation
- **ETH/BTC velocity** — only un-wired indicator (computed source needs aligned ETH+BTC histories)
- **Phase 4 UI** — direction arrows, sparkline, hover tooltip in macro-tab.js
- **Indicator backlog** — currently 18/8/5; original spec is 30/105/28
- **Regime-shift detection** — fixed 2024-2026 quantile baselines will be wrong if Fed restarts QE / imposes YCC

---

## Session 69 — Daily Ledger Local Sync Layer (Phase 2.5) [daily-ledger] [sync] (LIVE)

### What Shipped
1. **Plan + scoping** at `c:\...\Ai Playground\.claude\plans\daily-ledger-sync.md` covering the architecture, sealed-day rule, file locations, three-layer backup story, and Phase E deferrals.
2. **Vault skeleton** `Jinn-Vault/` at workspace root (not nested in any project) -- top-level personal vault, mirrors `TBB/Bitcoin Notes/` separation. README.md explains population and warns against hand-edits.
3. **Render script** `scripts/render-daily-ledger.js` (Node, ~160 lines, pure function `renderLedger(ledger)` exported). Idempotent JSON-to-markdown conversion: YAML frontmatter (date, day_of_week, counts, tags, ledger_version, synced_at) + Notes/Completed/Habits/Scheduled sections + `[[YYYY-MM-DD]]` backlinks for Obsidian graph navigation.
4. **Slash command** `.claude/commands/sync-ledger.md` -- pulls via `scp -r` from Jin, walks candidates (`> last-synced AND < today`), renders, advances cursor at `.routing-inbox/daily-pull/.last-synced`, reports one-line summary.
5. **Three-layer backup verified**: Jin workspace-backup cron tracks `daily/` (commit `feb6582 Auto-backup`, no workspace `.gitignore`); local raw JSON mirror at `.routing-inbox/daily-pull/` (gitignored); rendered markdown at `Jinn-Vault/Daily/` (workspace-tracked, `.obsidian/` already gitignored).
6. **Scope decisions confirmed with user**: vault path = `Jinn-Vault/`, render = Node, track in workspace git, no GitHub push.

### Verification (all passing)
- Cold-start sync: scp pulled `2026-05-07.json` from Jin, rendered to `Jinn-Vault/Daily/2026-05-07.md` (745 bytes, frontmatter + 1 note + 3 completed + 1 habit + 0 events + backlinks). `.last-synced` set to 2026-05-07.
- Idempotency: re-run produces zero candidates (window `> 2026-05-07 AND < 2026-05-08` is empty). No-op as expected.
- `git check-ignore` confirms `.routing-inbox/` is properly excluded; `Jinn-Vault/` is untracked-and-trackable.

### Files Created
- `.claude/plans/daily-ledger-sync.md` (gitignored along with all `.claude/plans/`)
- `Jinn-Vault/README.md`, `Jinn-Vault/Daily/.gitkeep`
- `scripts/render-daily-ledger.js`
- `.claude/commands/sync-ledger.md`

### Files Modified
- `.gitignore` (workspace root) -- added `.routing-inbox/` exclusion (also covers the planned outbox routing pipeline)
- `AI/Clawdbot aka Openclaw/DAILY-LEDGER-ARCHITECTURE.md` -- new "Local Sync Layer (Phase 2.5 -- LIVE)" section + extended File Locations Summary

### Pattern Learned (Windows quirk)
`rsync` is not in the default Windows Git Bash environment; `scp -r` is. Slash command falls back to scp for portability. Volume is 1 file/day so the lack of incremental transfer is irrelevant.

### Open
- Windows Task Scheduler cron for `/sync-ledger` daily at ~02:00 ET (after sealed day rolls over) -- deferred to user.
- `/review-ledger` weekly insights command -- deferred to Phase E.
- Architectural drift on Jin live `index.html` (inline macro code vs `dashboard-deploy/` external `<script src="/macro-tab.js">`) still unresolved -- carried over from Sessions 66/68. Not blocking ledger work.

---

## Session 68 — Atomic Habits Editing + Daily Ledger Posterity Doc [daily-ledger] [habits] (LIVE)

### What Shipped
1. **Backend (`server.js`):** New `PUT /api/habits` endpoint -- edits habit text + stack trigger in place. Single text field re-parses the "After I X, I will Y" pattern (same regex as `parseHabits`), so a stack habit can become plain or vice versa just by editing the string. New `PUT /api/habits/section/rename` endpoint -- renames a section, with collision check.
2. **Frontend (`public/index.html`):** Atomic Habits card on the Today tab gets per-habit `edit` and `×` buttons, plus an `edit` button next to each section name. Click `edit` swaps the row/header for an inline input (Enter saves, Escape cancels). Delete prompts a confirm. New CSS rules for `.habit-section-header`, `.habit-actions`, `.habit-edit-input` etc. -- subdued at rest, full-opacity on hover.
3. **Confirmed already done in Session 66:** `/api/habits/toggle` already logs to `habitCompletions[]` of today's `daily/YYYY-MM-DD.json` ledger. So checkmarks on habits already integrate with the daily-ledger capture process. No new wiring needed for the user's "checkmarks integrated with daily notes" ask -- it was already true.
4. **Posterity doc:** Created `DAILY-LEDGER-ARCHITECTURE.md` at the project root. Consolidates the architecture, schema, endpoints, frontend wiring, deployment runbook, verification suite, drift open-issue, and Phase 2 roadmap. Future sessions should read this first before extending the ledger or habit system. Supersedes scattered notes across WORKLOG (Sessions 66 + 68), DECISIONS.md, and the original plan file.
5. **Source control:** All edits applied to **both** Jin live and `dashboard-deploy/` source-of-truth (lesson from Session 65 / Session 66 close call).

### Verification (all passing)
- `PUT /api/habits` edits "Morning stretch" -> "Morning stretch (5 min)"; checkmark state preserved
- Stack edit: trigger AND action both update via the regex re-parse ("After I coffee, I will immediately journal" -> "After I morning coffee, I will journal one paragraph")
- `PUT /api/habits/section/rename` "Daily Routines" -> "Morning Routine" then back, no collision issues
- Bad payload (`{section, index}` without `text`) -> 400 `Missing params`
- `/api/data` regression -> 200, ~24KB
- Test data restored to original state on Jin

### Files Modified
- `~/.openclaw/workspace/dashboard/server.js` (added 2 PUT routes after `/api/habits/section`)
- `~/.openclaw/workspace/dashboard/public/index.html` (CSS block, habits card markup, 5 helper functions: `editHabit`, `saveHabitEdit`, `deleteHabit`, `editHabitSection`, `saveHabitSectionEdit`)
- Same files in `.claude/dashboard-deploy/` (source-of-truth)
- New: `DAILY-LEDGER-ARCHITECTURE.md` at Clawdbot project root

### Pattern (Reinforced)
Same as Session 66's: edits go to **both** `dashboard-deploy/` and Jin live in the same session. The `cp` from `.jin-staging` to `dashboard-deploy/` is fine for `server.js` (changes are pure additions). For `index.html` they need separate Edit calls because the two files differ on the macro tab integration (Jin has inline accumulated code; `dashboard-deploy/` has external-file architecture). Until that drift is reconciled, never just `cp` index.html across the two locations.

### Open
- **Architectural drift unresolved**: Live Jin `index.html` (now 137KB) still carries inline macro tab code; `dashboard-deploy/index.html` (now 105KB) uses external `macro-tab.js`. Reconcile by deploying `dashboard-deploy/index.html` to Jin and verifying the Signals tab loads via the external script. Not blocking habit/ledger work. (Carried over from Session 66.)
- **Browser UI smoke test**: cannot run from this env. User to verify on phone or desktop: `edit` button on each Atomic Habit row swaps to input + saves; `×` confirms and deletes; section `edit` renames; checkbox state survives an edit.

---

## Session 67 — Codex/ChatGPT Plus Migration + Outbox Routing Kickoff [codex-migration] [outbox-routing] [soul-testing] (PARTIAL)

### What Shipped — Codex Migration (DONE)

1. **OpenClaw upgraded** 2026.2.26 → 2026.5.2 on Jinn. Backups at `~/.openclaw/backups/pre-upgrade-2026-05-03/`. Doctor --fix migrated telegram streaming config schema. Gateway restarted, all 7 cron jobs intact.

2. **`@openclaw/codex` plugin installed** (`npx openclaw plugins install @openclaw/codex`). Plugin loaded successfully on 2026.5.2 (failed on 2026.2.26 — version mismatch).

3. **OpenAI Codex CLI installed** (`npm install -g @openai/codex`). Used `codex login --device-auth` flow because OpenClaw's `models auth login --provider openai-codex` requires interactive TTY (failed over non-TTY SSH). User had to enable device-code authorization in ChatGPT Security Settings (Codex returned 403 until that was on).

4. **Auth bridged into OpenClaw** via custom Node script that decodes the JWT in `~/.codex/auth.json`, extracts `account_id` + `email`, and writes an `oauth` profile to `~/.openclaw/agents/main/agent/auth-profiles.json` as `openai-codex:giancarnevale@gmail.com`. OpenClaw's standard `setup-token` and `paste-token` paths don't work for openai-codex (requires the synthetic-auth marker pattern, not a plain token).

5. **All 4 cron jobs switched to `openai-codex/gpt-5.5`** with rewritten prompts that **require visible output** (e.g. "reply with one line: OK / NOOP / FAIL: <reason>"). Codex/GPT-5.x models produce reasoning-only output when prompts permit silence — original prompts ("be silent unless something fails") consistently failed with `incomplete turn detected: stopReason=stop payloads=0`. Verified per cron:
   - workspace-backup → `NOOP`
   - sleep-cycle → `AUDIT_DONE: 0 entries marked invalid`
   - morning-briefing → 3-line briefing (Sunday May 3, calendar items)
   - afternoon-checkin → Everyday list
6. **Default chat model switched** to `openai-codex/gpt-5.5` (was MiniMax M2.5). MiniMax demoted to fallback. Updated TOOLS.md so Jinn doesn't parrot stale model identity from context.

7. **Codex native web search enabled** by setting `plugins.entries.codex.config.appServer.args = ["-c", "tools.web_search=true", "app-server"]`. Verified: Jinn correctly answered "current BTC price" with live web data ($78,768 at test). No Brave key needed — uses ChatGPT Plus Responses API web search.

8. **IRC + calendar updated**:
   - INCIDENT-RESPONSE-CARD.md gained ChatGPT Plus account + Codex OAuth token entries
   - Jinn's `calendar.md` has 2026-05-10 reminder: "Cancel MiniMax Coding Plan + revoke API key (per IRC). Codex/GPT-5.5 has been running cron jobs for 1 week — verify quality before canceling."

### What Shipped — Soul Testing (DONE)

Three diagnostic prompts run via `npx openclaw agent --message ... --model openai-codex/gpt-5.5`:
- "Who are you?" → identified as Jinn with owl emoji, "quiet mentor" framing, anti-AI-tells voice
- "I keep procrastinating and don't know why" → refused abstract framing, asked for the actual thing, named avoidance mechanisms without coaching jargon
- "What's on my calendar today?" → transactional answer + small "Star Wars Day" footnote (soul present without inflating mundane)

**Verdict:** SOUL-2.md document was already strong (9 iterations, 36 dials). Previous flatness was MiniMax model limitation, not document weakness. With gpt-5.5 the soul executes. User to validate in real Telegram chat over the coming week before iterating on the document.

### What Shipped — Outbox Routing Pipeline (PARTIAL — Steps 0-1 of 6)

Multi-session build. Plan + tracker live in workspace:
- Plan: `c:\Users\GC\Documents\Ai Playground\.claude\plans\outbox-routing-pipeline.md`
- Progress: `c:\Users\GC\Documents\Ai Playground\.claude\plans\outbox-routing-PROGRESS.md`
- Destination map: `c:\Users\GC\Documents\Ai Playground\SECOND-BRAIN-INDEX.md`

Architecture: Outbox tab in Jinn dashboard → nightly Codex cron summarizes + classifies → rsync pulls to local `.routing-inbox/` → `/process-outbox` slash command routes to AI KD topic files / TBB Bitcoin notes / JC BTC CRM / WBIGAF chapter staging / FreedomLab / YouTube inspirations. Existing `/process-notes` stays scoped to Twitter bookmarks only.

**Steps remaining (Session 68+):** rename Content Queue → Outbox in dashboard (server.js + index.html), create `outbox-processor` cron at 03:00 ET, write `/process-outbox` slash command, scaffold `.routing-inbox/`, run end-to-end smoke test.

### Open Issues

- **Telegram outbound delivery broken from upgrade.** Cron "announce" path fails with "Outbound not configured for channel: telegram" even though plugin is enabled (`plugins.entries.telegram.enabled = true`) and `channels status --deep` shows running/connected. Failure-alert path still works (user got the workspace-backup error text). Best-effort-deliver suppresses cascading errors but messages don't reach Telegram. **Not yet fixed** — user wants to see if it self-resolves overnight (or the problem reveals itself with morning briefing tomorrow).

- **Smart extraction Phase 2 from this save** — pending below.

### Next

1. **Verify telegram delivery tomorrow morning** — check whether the 8 AM morning-briefing arrives. If not, debug outbound adapter loading.
2. **Continue outbox routing build** — Step 2 (rename Content Queue → Outbox in dashboard with full schema migration). Read `outbox-routing-PROGRESS.md` at session start.
3. **MiniMax cancellation** scheduled 2026-05-10 after 1-week soak.

---

## Session 66 — Daily Calendar Ledger Phase 1 (LIVE)

### What Shipped
1. **Backend (`server.js`):** New `daily/YYYY-MM-DD.json` ledger system. Helpers (`readDailyLedger`, `writeDailyLedger`, `logCompletedTodo`/`removeCompletedTodo`, `logHabitCompletion`/`removeHabitCompletion`, `isValidDate`). Routes: `GET /api/day`, `POST/PUT/DELETE /api/day/notes[/:id]`. Hooked logging into `/api/todos/toggle` (Everyday + regular), `checkEverydayReset` (nightly), `/api/habits/toggle`. Existing `entropy.md` writes preserved -- streaks unaffected.
2. **Frontend (`public/index.html`):** Today tab gets a Today's Notes card (multi-timestamped, add/edit/delete) plus a 3-pill summary strip. Calendar > Day view now reads `/api/day` and renders four sections: Scheduled / Completed / Habits / Notes. Today's notes editable; past days read-only.
3. **Schema:** `{ date, version: 1, notes[], completedTodos[], habitCompletions[] }`. Forward-only -- no `entropy.md` backfill. Local NY day bucketing via existing `todayStr()`; ISO timestamps inside entries.
4. **Dedupe:** Synthetic stable IDs -- `everyday::<text>` and `habit::<section>::<text>` are idempotent (toggle on/off/on = single entry). Regular todos use one-shot `hexId()-timestamp` IDs (one-way completion, can't double-fire).
5. **Source control:** Edits applied to **both** Jin live (deploy) and `dashboard-deploy/` (source of truth) -- see Pattern Captured below.

### Verification (all passing)
- `GET /api/day?date=today`: empty schema, version 1
- POST/PUT/DELETE notes round-trip; `updatedAt` set on PUT
- Toggle Everyday item -> appears in `completedTodos` with `id: everyday::<text>`
- Toggle on/off/on (3x) -> final count = 1 (dedupe works)
- Past day fetch -> empty ledger arrays + `scheduledEvents` from `calendar.md` still merge in
- Bad date -> 400 `Invalid date`
- Date boundary: note created at UTC `2026-05-08T00:57Z` correctly bucketed as `daily/2026-05-07.json` (NY local)
- `/api/data` regression -> 200, ~24KB; `/api/streaks` regression -> still works

### Files Modified
- `~/.openclaw/workspace/dashboard/server.js` (1340 -> ~1410 lines, deployed) + `dashboard-deploy/server.js` (source)
- `~/.openclaw/workspace/dashboard/public/index.html` (deployed) + `dashboard-deploy/index.html` (source)
- New artifact: `~/.openclaw/workspace/daily/YYYY-MM-DD.json` (lazy creation per local-NY day)
- Backups on Jin: `server.js.2026-05-07-2050.bak`, `public/index.html.2026-05-07-2050.bak`
- Plan file: `C:\Users\GC\.claude\plans\hi-i-m-pasting-a-gleaming-snail.md`

### Pattern Captured -- Almost Repeated Session 65's Anti-Pattern
Initial deploy went through `.jin-staging/` (pulled live Jin file, edited, scp'd back) **without updating `dashboard-deploy/` source**. Caught at save-progress time when WORKLOG showed Session 65's lesson. Back-ported all edits to `dashboard-deploy/server.js` (cp-replaceable since identical pre-edit) and `dashboard-deploy/index.html` (re-applied 6 Edit ops to the cleaner source). Going forward: pull-edit-deploy is fine *if and only if* the same edits also land in `dashboard-deploy/` before session end.

### Architectural Drift Surfaced (Open, Not Resolved This Session)
Live Jin `index.html` (was 123KB, now 133KB w/ my edits) contains **inline accumulated macro tab code**, while `dashboard-deploy/index.html` (now 102KB w/ my edits) uses the cleaner `<script src="/macro-tab.js">` external-file architecture from Session 65. Session 65 said it deployed the external version, but the live file has drifted back to inline. Reconcile by deploying `dashboard-deploy/index.html` to Jin in a future session and re-verifying the Signals tab still loads via `/macro-tab.js`. Not blocking Phase 1.

### Phase 2 (Parked)
- Calendar Week/Month indicators (counts/dots from `/api/day/range`)
- `/api/day/range` + Tracker insights view + JSON/MD export
- Best-effort `entropy.md` backfill parser
- Reflection text + daily score
- Goal tagging (health, learning, Bitcoin, Freedom Lab, etc.)

### What I Could Not Test
- The browser UI (cannot open a browser from this env). User to verify on phone/desktop at `http://100.124.64.28:4242/`: Today tab shows Notes card + summary; adding a note persists across reload; Calendar > Day shows all four sections; past days are read-only.

---

## Session 65 — Macro Tab Recovery + Source Refactor (LIVE)

### What Happened
Session 64's `scp` of `dashboard-deploy/index.html` to Jinn silently overwrote the Session 63 macro tab UI (which had been added via direct SSH edits to the live file, never back-ported to local source). User reported "signals tab isn't loading" hours after Session 64.

### What Shipped
1. **Re-injected macro tab inline** to restore live functionality (temporary hack, would have re-broken on next deploy).
2. **Refactored to separate source files** for durability:
   - `c:\...\dashboard-deploy\macro-tab.css` (~14KB) -- standalone stylesheet, scoped to `#signals`
   - `c:\...\dashboard-deploy\macro-tab.js` (~11KB) -- standalone module with self-healing wrapper
   - Wrapper auto-creates `<div id="signals">` section div if missing
   - Wrapper overrides `window.showSection` to call `loadMacro()` on signals navigation
3. **Updated `dashboard-deploy/index.html` source** to permanently include:
   - `<link rel="stylesheet" href="/macro-tab.css">` in head
   - `<script src="/macro-tab.js"></script>` before `</body>`
   - `<div id="signals" class="section"></div>` in section list (after entropy-view)
   - `if (id === 'signals' && !macroLoaded) loadMacro();` in showSection handler
4. **Updated `dashboard-deploy/server.js` source** to permanently include:
   - `const { registerMacroRoutes } = require('/home/openclaw/.openclaw/workspace/macro/api');`
   - `registerMacroRoutes(app);` before `app.listen()`
5. **Deployed all 4 files via scp**, restarted pm2, verified `/macro-tab.css` + `/macro-tab.js` serve 200, stress index live (3.7/10 Watching), Signals tab functional.

### Pattern Captured (saved to memory)
**Out-of-band edit drift** -- direct SSH edits to live files must be back-ported to local source-controlled files in the same session, or next deploy clobbers them. The gap between live and source grows silently. Saved to `~/.claude/projects/.../memory/feedback_outofband_drift.md`. Going forward: prefer source-edit-then-scp pattern over ssh-sed pattern, even when ssh-sed is faster in the moment.

### Open
- Hard-refresh required on browser to bust cached HTML/JS after deploy.

---

## Session 64 — Dashboard UX Fixes (LIVE)

## Session 64 — Dashboard UX Fixes (LIVE)

### What Shipped
1. **Issue 1 -- Entropy section collapse fixed.** `toggleEntropyItem` now does optimistic local update + capture/restore of open card state. No more full re-render on checkbox click.
2. **Issue 2 -- Goal/North Star + Reminders click-to-edit.** Pencil icon on each card swaps rendered markdown for textarea + Save/Cancel. New endpoints `POST /api/entropy/goals` and `POST /api/entropy/reminders`.
3. **Issue 3 -- Atomic Habits uncheck + daily reset working.** Two stacked bugs found and fixed:
   - `parseHabits` was missing `raw` field, so `checkHabitsDailyReset` never read the comment and always reset on every toggle (couldn't uncheck).
   - `serializeHabits` stripped the `<!-- last-reset -->` comment on every write -- caught after first deploy. Now round-trips correctly.
   - Added crontab entry: `1 0 * * * curl -s http://127.0.0.1:4242/api/habits > /dev/null` (daily 12:01 AM trigger).
4. **Issue 4 -- Sortable.js drag-and-drop.** CDN script tag, drag handle (☰), `POST /api/todos/move` endpoint. Cross-section drag works; Everyday section blocked from move (it's reset-on-day-rollover).
5. **Issue 5 -- Everyday filtered out of Todos tab.** One-line filter; still appears in Today tab.
6. **Issue 6 -- Lightning offer no longer wiped.** Auto-refresh interval skips when a QR canvas is in the active Lightning tab. "Hide QR (resume auto-refresh)" buttons added to invoice + offer views.
7. **Issue 7 -- Context window exclude UI.** `/api/context-info` reads `dashboard/exclude.json`, marks each file with `excluded` flag, subtracts excluded sizes from total. Systems tab shows full file list with checkboxes. Pre-loaded exclusions for the 4 files GC named: `research/freedomlab-venue-crm.md`, `research/demo-ideas.md`, `research-report.md`, `memory/2026-03-05-dashboard-error-report.md`. **Context dropped 164KB (112%) -> 108KB (74%).**

### Follow-Up Patches (same session)
- Bumped polling 15s -> 30s globally (tradeoffs documented: Lightning incoming payment confirmation lag is the main cost).
- Added `min-height: 28px` + dashed "Drop here" placeholder on empty `.todo-list-dnd` containers so empty Today section becomes a real drag target.

### Files Modified (deployed via scp)
- `~/.openclaw/workspace/dashboard/server.js` (1273 -> ~1325 lines)
- `~/.openclaw/workspace/dashboard/public/index.html` (2433 -> ~2480 lines)
- `~/.openclaw/workspace/dashboard/exclude.json` (NEW)
- `~/.openclaw/workspace/habits.md` (auto-seeded `<!-- last-reset -->`)
- Backups: `server.js.2026-05-03.bak`, `public/index.html.2026-05-03.bak`

### Pattern Captured
**Asymmetric serializer drift** -- when a parser extracts metadata into a structured field, verify the serializer puts it back. Round-tripping through parse → mutate → serialize is the actual test, not a single curl. (Caught the comment-stripping bug only after toggling twice and inspecting the file, not after the first toggle.)

### Open
- GC to verify drag-and-drop works on Today section after browser hard-refresh (service worker may cache old HTML).
- GC to decide on 30s vs 60s polling once they live with 30s for a day.

---

## Session 63 — Macro Stress Dashboard Tab (LIVE, partial)

### What Shipped
1. **New "Signals" tab** on Jinn dashboard at http://100.124.64.28:4242/ -- editorial dark-mode design (Didot serif values, 5-segment alarm bars, expandable explainers, tap-to-refresh on Tier 2).
2. **Macro module** at `~/.openclaw/workspace/macro/` -- four files: `indicators.js` (config), `fetchers.js` (FRED/CoinGecko/Yahoo with curl-backed HTTP/1.1), `runner.js` (CLI runner with CoinGecko batch preload), `api.js` (Express routes).
3. **API endpoints**: `GET /api/macro` (full state) and `POST /api/macro/refresh/:id` (manual refresh).
4. **Daily cron** in system crontab: `0 17 * * *` (5pm ET, post US close), runs `node runner.js all`, logs to `cron.log`.
5. **Initial fetch**: 26/26 indicators working (18 Tier 1 + 8 Tier 2 + 5 Tier 3 reference).
6. **Reference doc** at `Research/MACRO-INDICATORS.md` (full 163-indicator universe with rank/threshold/source).
7. **Design mockups** at `Research/MACRO-DASHBOARD-MOCKUPS.html` (20 design directions) and `Research/MACRO-DASHBOARD-HYBRID-DARK.html` (the design that shipped).

### Gaps to Close Next Session (Indicator Backlog)
Original spec was **30 / 105 / 28** indicators across Tier 1/2/3. Currently shipped **18 / 8 / 5** -- framework scales, just need more entries in `indicators.js`.

- **Tier 1 (12 to add)**: BTC Dominance, Stablecoin Supply (DefiLlama), MVRV (LookIntoBitcoin), JGB 10Y, Bund 10Y, UK Gilt 10Y, Fed Net Liquidity composite (WALCL - TGA - RRP), MOVE Index (Yahoo proxy), 5Y Real Yield, ISM Manufacturing PMI, Hyperscaler Capex tracker, Spot ETF Flows.
- **Tier 2 (97 to add)**: Bulk of remaining free indicators -- swap spreads, breakevens variants, EM CDS basket, banking H.8 series, commodity baskets, AI/labor signals, top-decile consumer (LVMH YoY etc.), TIC holdings, monetary plumbing deep cuts. Most are FRED, some CoinGecko/DefiLlama.
- **Tier 3 (23 to add)**: Pure config -- name, source URL, threshold table, 2-3 sentence explainer per. Fast.

### Threshold Audit Required (HIGH PRIORITY before adding more)
Several indicators have thresholds calibrated to a pre-2020 regime that don't reflect current macro reality. **TGA fixed this session** (was flagging $982B as L5 critical when it's normal post-tax-day). Others suspected wrong:

- **ON RRP**: Currently $0.0B = L5 critical, but near-zero is structural post-QT (was $2T+ in 2022, drained by design). Should max at L3 unless TGA is also refilling fast (combined signal). Real signal is rate-of-change, not absolute level.
- **Bank Reserves**: Currently $2.92T = L4 stressed, but SOFR is calm, suggesting reserves AREN'T actually scarce. Logan/Williams' "$3T scarcity" was theoretical, not empirical. Recalibrate using SOFR-IORB spread as the true scarcity signal.
- **WTI**: $99.89 from 2026-04-27 = L3 elevated, but the data may be stale and the threshold (>$90 = L1, >$110 = L3) might need a regime check.
- **USDJPY**: 159.35 = L4 stressed -- this is reasonable since intervention zone is 160+, but worth confirming current MOF/BOJ posture.
- **Real Yield 10Y**: 1.94% = L3 elevated -- thresholds need a fresh look against the actual 2024-2026 distribution.

Recommended approach next session: pull historical distributions from FRED for each indicator, set L1 = bottom quartile, L3 = median, L5 = top decile. Document the empirical basis in each `computeLevel` block.

### Holistic Stress Index (LIVE)
Above the indicator grid, Signals tab now displays a weighted system stress score. Each indicator carries a weight (1-10 signal density); SOFR/HY OAS/USDJPY weighted highest. Score = weighted average alarm level mapped to 1-10 scale. Currently reading **3.5/10 "Watching"** post-TGA-fix.

### Key Issues Encountered + Solved
- Node `https` timed out on FRED → switched to `curl` via `child_process.execFile`.
- HTTP/2 `INTERNAL_ERROR` from FRED → forced `--http1.1`.
- Yahoo Finance rate-limited from Tailscale IP → swapped VIX/USDJPY/DXY/Gold/Copper/WTI to FRED/CoinGecko equivalents.
- Stooq added apikey requirement (broken for free use).
- CoinGecko free tier rate-limit on multiple sequential calls → batched into single `simple/price?ids=a,b,c` call via `preloadCoinGecko()`.

### Cost
**Zero ongoing** -- all free APIs, no LLM calls in pipeline. Cron is pure data plumbing.

---

## Session 62 — Sleep Cycle Audit + Jinn Optimization (COMPLETE)

### What Was Done
1. **Audited sleep cycle** -- Compared against Orobator's "Your Agent Needs a Bedtime" article. Cycle fires nightly at 2 AM on MiniMax M2.5, ~146s runtime, 0 errors. Diagnosis: infrastructure works but cycle is shallow due to lack of raw material (only 3 memory files in 8 days). Detection works (found SOUL-2.md duplicate) but action doesn't happen without human closing the loop.
2. **Deleted SOUL-2.md** -- Old Session 38 draft sitting on Jinn's machine, content already merged into active SOUL.md. Sleep cycle had been proposing deletion nightly with nobody acting.
3. **Full optimization audit** -- Compared Jinn's setup against course Modules 05-11. Found 12 gaps.
4. **Quick wins applied via SSH:**
   - Populated TOOLS.md with operational knowledge (Tailscale IP, dashboard URL, pm2 details, SSH info, cron schedule, auth profiles)
   - Added workspace-backup cron (1 AM ET daily, MiniMax M2.5, git commits workspace changes)
   - Compaction: `safeguard` mode is the only option in this OpenClaw version, already set

### Jinn's Daily Schedule (4 jobs now)
| Time (ET) | Job | ID |
|-----------|-----|----|
| 1:00 AM | workspace-backup | ffe33b99-2412-4347-98e1-5e242d1bf0b6 |
| 2:00 AM | sleep-cycle | 5097a62f-c977-47f3-99ae-306a49d142a1 |
| 8:00 AM | morning-briefing | 92e92195-d162-4adb-a1a9-301b7bf3cd81 |
| 3:00 PM | afternoon-checkin | 09728259-5e90-410f-b884-341a053d2a12 |

### Remaining Optimization Gaps
| Gap | Priority |
|-----|----------|
| Daily memory files not being written (3 files in 8 days) | Medium |
| No prompt caching for Anthropic fallback | Medium |
| File permissions not hardened (group-readable) | Medium |
| HEARTBEAT.md disabled (no proactive checks) | Decide |
| No security audit cron | Decide |
| Only 1 skill installed (qmd) | Decide |
| No sandboxing (Docker) | Low |
| No UFW/fail2ban | Low |
| Bot token in plaintext config | Low |

## Next
1. Investigate why daily memory files aren't being written (session-memory hook enabled but not producing files)
2. Configure prompt caching for Anthropic fallback
3. Harden file permissions
4. GC to decide: heartbeats, security audit cron, more skills
5. GC to test dashboard on mobile
6. GC's laptop walkthrough: Modules 04-11

## Session 61 — Dashboard UX Improvements (COMPLETE)

Four fixes/features deployed to Jinn's dashboard via SSH.

### What Was Done
1. **Fixed weekly calendar view** — Replaced broken `getEventsForDay()` with async fetch from `/api/calendar/range`.
2. **Today tab — quick add to schedule** — Input field to add events to today.
3. **To-Do tab — swipe to schedule** — Swipe left to assign today's date to a todo.
4. **Entropy restore** — Click checkmark on completed items to restore to "This Week."

### Deployment Notes
- pm2 managing dashboard (`jinn-dashboard` process).
- `pm2 startup` systemd command NOT run (needs sudo on laptop). Dashboard won't survive reboot.

## Session 60 — Mission Control v2 (COMPLETE)

Major dashboard upgrade: desktop layout, Memory tab, System tab, PWA offline support, calendar import, streak tracker, birthday alerts.

### What Was Built
1. **Desktop layout** — Fixed left sidebar nav on screens >768px, mobile layout unchanged. 7 tabs: Today, To-Dos, Inbox, Calendar, Memory, Files, System.
2. **Memory tab** — Scrollable timeline of daily memories (newest first), search bar for filtering, "Long-Term" button opens modal with MEMORY.md sections. Morning briefing pinned at top.
3. **System tab** — Context window usage (67% at deploy: 100KB/150KB), per-file size breakdown, model info (MiniMax-M2.5 primary), auth profiles, cron job status with run logs.
4. **Annual calendar import** — 262 yearly events parsed from `Full Year.md` into `calendar.md` Yearly Events section. Birthdays, holidays, personal milestones — all permanent fixtures.
5. **Birthday alerts** — "Coming Up (7 days)" widget on Today tab showing upcoming yearly events.
6. **Streak tracker** — Parses entropy.md for consecutive Everyday habit completions, displays on Today tab.
7. **PWA offline support** — Service worker (cache-first for static, network-first for API), localStorage cache for offline data, sync queue for offline mutations, offline banner indicator.
8. **Auto-refresh fix** — 15-second refresh skips when user is typing in input/textarea/contenteditable.

## Session 59 — Dashboard Redesign (COMPLETE)

All 12 requirements from the approved redesign plan implemented and deployed.

### What Was Built
1. **quotes.md** — NEW file, 24 curated quotes (Stoic, Bitcoin, action-oriented). Date-seeded random picks one per day.
2. **server.js** — Full rewrite: sectioned todo parsing with everyday auto-reset, inbox CRUD with hex IDs, calendar merge (daily/weekly/yearly/events/dated-todos), quote endpoint, calendar day/range endpoints, todo section management.
3. **todos.md** — Migrated: added `## Everyday` section (Morning walk, Read 30 min, Journal), `<!-- last-reset -->` comment, `## Projects` section. Everyday items auto-reset overnight (completions logged to entropy.md).
4. **calendar.md** — Migrated: standardized sections (Daily Reminders, Weekly, Yearly Events, Events). Yearly Events section ready for GC to populate.
5. **index.html** — Full rewrite with 5 tabs:
   - **Today**: quote of the day, date, Everyday checklist with progress bar, today's schedule (merged events), Rediscover card (random old inbox item)
   - **To-Dos**: collapsible section cards, per-section inline add with optional date picker, Entropy (completed) card, "+ New Section" button
   - **Inbox**: add/edit/delete with age badges (>7d amber, >30d red), inline editing
   - **Calendar**: Day/Week/Month/Year sub-nav with arrow navigation, click any day to see events, simplified "add event" (just title + selected date), dated todos appear on calendar
   - **Files**: folders closed by default, expand on click, cron job status display
6. **Morning briefing cron** — Updated prompt to include quote of the day, inbox review with filing suggestions, and Rediscover resurfacing.

### Deployment Details
- Files deployed via SSH (base64 pipe for large files, heredoc for data files)
- Server restarted with NVM node path (`/home/openclaw/.nvm/versions/node/v22.22.0/bin`)
- All endpoints verified: /api/data, /api/quote, /api/calendar/day, /api/calendar/range, inbox CRUD, todo toggle, todo add with dates
- Test data cleaned up after verification

### Key Files on Jinn's Machine
- Dashboard code: `/home/openclaw/.openclaw/workspace/dashboard/` (server.js + public/index.html + public/view.html)
- Data files: `/home/openclaw/.openclaw/workspace/` (todos.md, inbox.md, calendar.md, entropy.md, quotes.md)
- Cron config: `/home/openclaw/.openclaw/cron/jobs.json`

## Next
1. **GC to test on mobile** — verify all tabs, check Everyday reset tomorrow morning, populate Yearly Events
2. Check sleep cycle results — verify 2 AM run succeeded
3. Monitor MiniMax M2.5 quality across cron jobs
4. GC's laptop walkthrough: Modules 04-11

## Current State
- All 12 module Scripts synced to Slides — **ALL SYNCED**
- All CLI commands verified against source code and fixed
- Gemini dual-path consistency applied to all spending limit sections
- CLI Reference updated with missing commands (devices, sandbox, cron subcommands)
- QA audit complete: 11 factual errors fixed across 22 files
- All VL overflows fixed — every slide ≤13 VL
- All 12 modified PDFs regenerated (Modules 00-09, Classes 1-2)
- Pushed to origin/master (commit c02b031)
- SOUL work tracked separately in `Activation/WORKLOG.md`

## Session 57 — MiniMax Debug + Sleep Cycle

### MiniMax Fix (COMPLETE)
- **Root cause:** `minimax:manual` auth profile was stored in `auth-profiles.json` but never registered in `openclaw.json`'s `auth.profiles` section. OpenClaw couldn't find MiniMax credentials → silently fell back to Anthropic → burned Anthropic credits.
- **Fix:** `npx openclaw config set "auth.profiles.minimax:manual" '{"provider":"minimax","mode":"token"}'` + gateway restart
- Both cron jobs (morning-briefing, afternoon-checkin) were also still using `claude-sonnet-4-6` — switched both to `minimax/MiniMax-M2.5`
- Morning briefing timeout increased from 60s → 120s (was timing out)
- Telegram session and cron jobs confirmed running on MiniMax

### Files Delivered to Jinn via SCP
- `EXPERT-PROMPT-EXPERIMENT.md` → `~/.openclaw/workspace/`
- `SOUL-2.md` → `~/.openclaw/workspace/`
- `SLEEP.md` → `~/.openclaw/workspace/`

### Sleep Cycle (COMPLETE)
- Based on Andrew Orobator's "Your Agent Needs a Bedtime" article (in `AI Notes/Andrew Vibe Coding/`)
- Full 3-phase architecture matching the article:
  - **NREM (Consolidation):** Scan daily memory, auto-patch stale refs, synaptic homeostasis (graduated decay), memory consolidation
  - **REM (Abstraction):** Contradiction detection across SOUL/AGENTS/skills, pattern extraction, genome change proposals
  - **Wake:** Write findings to `morning-briefing.md` for 8 AM delivery
- **Genome protection:** SOUL.md, USER.md, IDENTITY.md never modified — proposals only
- Protocol documented in `Activation/SLEEP.md` (local) and deployed to Jinn's workspace

### Jinn's Daily Schedule (all MiniMax M2.5)
| Time | Job | ID |
|------|-----|----|
| 2:00 AM | sleep-cycle | 5097a62f-c977-47f3-99ae-306a49d142a1 |
| 8:00 AM | morning-briefing | 92e92195-d162-4adb-a1a9-301b7bf3cd81 |
| 3:00 PM | afternoon-checkin | 09728259-5e90-410f-b884-341a053d2a12 |

- Morning briefing updated to read `morning-briefing.md` first (sleep findings), then todos, then research report
- Sleep cycle set to run tonight at 2 AM — not test-run, will verify in morning

### Key Files Changed
- `Activation/SLEEP.md` — NEW, full sleep protocol for Jinn
- Jinn's `~/.openclaw/openclaw.json` — `minimax:manual` auth profile registered
- Jinn's cron jobs — all 3 now on MiniMax M2.5, morning briefing reads sleep findings

## Next
1. **Check sleep cycle results tomorrow** — verify 2 AM run succeeded, morning brief includes findings
2. Monitor MiniMax M2.5 quality across all 3 cron jobs
3. GC's laptop walkthrough: Modules 04-11

### Activation To-Dos (Jinn's Ubuntu laptop — 16GB RAM, ~7GB free, no dedicated GPU)
1. **Ollama local model setup** — Install Ollama, pull a model that fits in ~7GB free RAM (likely `qwen3.5:4b` at 3.4GB), connect to OpenClaw via native Ollama API, verify tool calling works
2. **Local model use case** — Design a practical use case that works well within the constraints of a small local model (simple chat, quick lookups, offline notes — NOT multi-step agentic workflows). Test on Jinn and document what works vs what doesn't.
3. ~~**SSH workflow to Claude Code**~~ DONE (Session 56)

### Research Decisions (Session 55)
- **MiniMax M2.5: NOT recommended for course.** Distillation scandal, Chinese data law. But GC chose it as Jinn's personal default ($10 Coding Plan).
- **Kimi K2.5: NOT recommended as standalone path.** Available through OpenRouter if students want to try it.
- **OpenRouter: Already the right answer** for course. Taught in Module 09. US-based, 0% token markup, free models available.
- **Local models via Ollama: viable as advanced/optional content**, not a primary course path.

## Blockers
- CTA slides 33-34 still have placeholder text (waiting on membership/Telegram details)
