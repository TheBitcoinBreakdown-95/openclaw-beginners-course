# WORKLOG

**Last saved:** 2026-05-04 (post Session 64 dashboard fixes, deployed + verified)
**Status:** Session 64 complete -- 7 dashboard glitches fixed and live on Jinn; context window dropped 112%->74% via new exclusion UI; awaiting GC test of drag-and-drop on Today.

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
