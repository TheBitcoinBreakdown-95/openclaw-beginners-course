# Daily Ledger Architecture

> The Jinn dashboard's unified day-record system. Built across Sessions 66 and 68 (both 2026-05-07). This doc is the consolidated source of truth — supersedes scattered notes across WORKLOG.md, DECISIONS.md, and the original plan file. Read this first when extending the system.

## Why This Exists

Before May 7, 2026, the Jinn dashboard had four surfaces that all kind of dealt with "what happened today" — Today tab (Everyday checklist + streaks), Calendar tab (events from `calendar.md`), Memory tab (timeline of daily memory files), and `entropy.md` (a fragile log of completed Everyday items + regular todos with two inconsistent formats). None of them shared a single durable day record. You couldn't ask "what did I do on May 3?" and get a clean answer. There was no place to write a quick note attached to a specific day.

The Daily Ledger fixes that. Every day gets one JSON file. Notes, completed todos, and habit completions all land there. The Today tab and Calendar > Day view both read from it. The schema is forward-compatible so Phase 2 (week/month rollups, tracker/export, goal tagging) can layer on without migrations.

## High-Level Picture

```
                       ┌─────────────────────────────┐
                       │  daily/YYYY-MM-DD.json      │  one file per local-NY day
                       │  (the spine)                │
                       └─────────────┬───────────────┘
                                     │
       ┌─────────────────────────────┼─────────────────────────────┐
       │                             │                             │
   writes to                     reads from                    reads from
       │                             │                             │
┌──────┴──────┐              ┌───────┴────────┐           ┌───────┴────────┐
│ Toggle Hooks │              │ Today tab UI   │           │ Calendar Day   │
│              │              │                │           │                │
│ /api/todos/  │              │ • Today's      │           │ • Scheduled    │
│   toggle     │              │   Notes card   │           │ • Completed    │
│ /api/habits/ │              │ • Day Summary  │           │ • Habits       │
│   toggle     │              │   strip        │           │ • Notes        │
│ checkEveryday│              │                │           │                │
│   Reset      │              │ (today only,   │           │ (today: edit;  │
│              │              │  editable)     │           │  past: read)   │
└──────────────┘              └────────────────┘           └────────────────┘
```

`entropy.md` writes are preserved unchanged — streaks tracker still parses it. The ledger is additive, not a replacement.

## Data Shape

`/home/openclaw/.openclaw/workspace/daily/2026-05-07.json`:

```json
{
  "date": "2026-05-07",
  "version": 1,
  "notes": [
    { "id": "abc123", "text": "...", "createdAt": "2026-05-07T19:30:00-04:00" }
  ],
  "completedTodos": [
    { "id": "everyday::Water", "text": "Water", "section": "Everyday",
      "completedAt": "...", "source": "everyday" },
    { "id": "a3f1-1715000000000", "text": "Reply to Jimmy", "section": "This Week",
      "completedAt": "...", "source": "todo", "scheduledDate": null }
  ],
  "habitCompletions": [
    { "id": "habit::Daily Routines::Cold shower", "text": "Cold shower",
      "section": "Daily Routines", "completedAt": "..." }
  ]
}
```

### Field guide

- **`date`**: local NY day (`YYYY-MM-DD`). The bucketing key. A note added at 11:30 PM ET on May 7 lands in `2026-05-07.json`, not `2026-05-08.json`. Never UTC.
- **`version`**: `1`. For future schema migrations.
- **`notes[]`**: timestamped quick-capture notes. `id` is `hexId()` (6 hex chars). `createdAt` is ISO 8601 with timezone. Notes are append-mostly; PUT/DELETE supported only for the same day.
- **`completedTodos[]`**: every todo that got checked off today. Three sources:
  - `source: "everyday"` — Everyday checklist items, with synthetic id `everyday::<text>` (idempotent: toggle on/off/on = single entry)
  - `source: "todo"` — regular todos that got spliced out of `todos.md` after completion. Id is `<hexId>-<timestamp>` (one-shot, can't double-fire because the source row no longer exists)
- **`habitCompletions[]`**: Atomic Habits checkmarks. Synthetic id `habit::<section>::<text>` (idempotent like Everyday). Distinct from `completedTodos` because habits and todos are different surfaces (habits.md vs todos.md).

## Files on Jin

```
/home/openclaw/.openclaw/workspace/
├── dashboard/
│   ├── server.js                    ← all backend logic
│   ├── public/index.html            ← all frontend logic
│   └── public/macro-tab.{css,js}    ← Signals tab (separate, Session 65)
├── daily/                            ← NEW: ledger files
│   └── YYYY-MM-DD.json
├── todos.md                          ← Everyday + sections
├── habits.md                         ← Atomic Habits + Habit Stacks
├── calendar.md                       ← daily/weekly/yearly/events
├── entropy.md                        ← unchanged; streaks still parse it
├── inbox.md, quotes.md, ...
```

## Files in Source Control (local)

```
c:\...\AI\Clawdbot aka Openclaw\
├── .claude/dashboard-deploy/        ← canonical source for next deploy
│   ├── server.js                    ← keep in sync with Jin
│   ├── index.html                   ← keep in sync with Jin
│   ├── macro-tab.css, macro-tab.js  ← unchanged from Session 65
├── .jin-staging/                    ← scratch pull-from-Jin area
└── DAILY-LEDGER-ARCHITECTURE.md     ← this file
```

**Critical lesson** (Session 65): direct SSH/scp edits to live Jin files must be back-ported to `dashboard-deploy/` in the same session. Otherwise the next deploy from `dashboard-deploy/` will silently overwrite your work. Session 66 almost repeated this anti-pattern; caught it at save-progress time.

## Backend API

All routes are in `dashboard/server.js`. Reference line numbers are approximate (server.js grows; line numbers drift).

### Read

| Route | Behavior |
|---|---|
| `GET /api/day?date=YYYY-MM-DD` | Returns the merged day: ledger fields + `scheduledEvents` from `calendar.md` (using existing `getEventsForDate`). Date defaults to today. Empty days return the schema with empty arrays. |
| `GET /api/data` | Unchanged. The dashboard's main pull. Returns todos, habits, inbox, quote, streaks, etc. |
| `GET /api/streaks` | Unchanged. Reads `entropy.md`. |

### Write — notes

| Route | Body | Behavior |
|---|---|---|
| `POST /api/day/notes` | `{ date, text }` | Append note with new `hexId()` and `createdAt`. |
| `PUT /api/day/notes/:id` | `{ date, text }` | Edit note text. Sets `updatedAt`. 404 if id not in that day's ledger. |
| `DELETE /api/day/notes/:id?date=YYYY-MM-DD` | (query) | Remove from notes array. 404 if not found. |

### Write — habits (Session 68)

| Route | Body | Behavior |
|---|---|---|
| `POST /api/habits` | `{ text, section?, trigger? }` | Add habit. Existing. |
| `PUT /api/habits` | `{ section, index, text }` | **NEW.** Edit habit. Re-parses "After I X, I will Y" pattern; reverts to plain habit if pattern is removed, becomes a stack if added. |
| `DELETE /api/habits?section=&index=` | (query) | Existing. |
| `POST /api/habits/section` | `{ name }` | Add section. Existing. |
| `PUT /api/habits/section/rename` | `{ oldName, newName }` | **NEW.** Rename a section. 404 if `oldName` missing, 400 if `newName` exists. |
| `POST /api/habits/toggle` | `{ section, index }` | **Hooked.** Logs to `habitCompletions[]` of today's ledger when checked; removes when unchecked. |

### Write — todos (hooked)

| Route | Behavior |
|---|---|
| `POST /api/todos/toggle` | **Hooked.** For Everyday: idempotent log/unlog. For regular todos: log on completion (one-shot id), then splice from `todos.md`. `entropy.md` writes preserved. |
| (`checkEverydayReset`) | Internal. Nightly Everyday reset writes both to `entropy.md` (existing) and to that resetDate's ledger (new). |

## Frontend

All changes are in `dashboard/public/index.html`. The macro/Signals tab is in separate files (`macro-tab.{css,js}`) and is not affected by ledger work.

### State

```js
let state = { ..., dayLedger: null };  // populated by loadDay()
```

`loadDay(date)` calls `GET /api/day` and stores the result. Called on page load (always for today) and after every note add/edit/delete.

### Today tab additions

1. **Today's Notes card** (between Everyday checklist and Atomic Habits): textarea + Add button + list of today's notes (newest first, with `7:30p`-style timestamps). Click any note text to edit inline; × to delete.
2. **Today Summary strip** (small pill row below streaks): `X completed · Y notes · Z events`. Hidden if all three are zero.
3. **Atomic Habits card** (Session 68 enhancements): each habit row gets `edit` and `×` buttons. Each section header gets an `edit` button to rename. Edit swaps text for inline input (Enter saves, Escape cancels). Delete prompts confirmation.

### Calendar > Day enrichment

The Day sub-view used to show only events. Now it reads `/api/day` and renders four sections:

- **Scheduled** — events from `calendar.md` (unchanged)
- **Completed** — today's `completedTodos`, Everyday on top, then chronological
- **Habits** — `habitCompletions` (only shown if non-empty)
- **Notes** — newest first

For the **today** date, notes show a × delete button. For **past days**, the day view is read-only display (notes not editable; calendar events still addable via the existing input row).

## Date Handling

This is the trap to avoid. All ledger bucketing uses **local NY day** via the existing helper:

```js
// server.js
function todayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
```

```js
// public/index.html
function dateStr(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}
```

Both return the local-time `YYYY-MM-DD`. Never `toISOString().split('T')[0]` (that's UTC).

Inside ledger entries, `createdAt` and `completedAt` are full ISO 8601 strings (`new Date().toISOString()`) — those are UTC. Both can coexist because the bucketing key (file name) is local while the entry timestamp is universal. A note created at UTC `2026-05-08T00:57Z` correctly lands in `daily/2026-05-07.json` (verified end-to-end).

## How Habit Edits Persist Across Days

Habits live in `habits.md`. The reset logic (`checkHabitsDailyReset`) runs once per day and only flips `checked: true` back to `false` — it doesn't touch habit text, stack triggers, or section names. So when you edit "Morning stretch" → "Morning stretch (5 min)" via the dashboard, the change is written to `habits.md` and persists across all future days. Tomorrow's checklist shows the new text with the box unchecked.

The same is true for habit stacks (the `After I X, I will Y` pattern). The PUT endpoint re-parses the full string with the same regex `parseHabits` uses, so the round-trip stays consistent: parse → mutate → serialize → parse again gives an identical structure.

If a habit's text changes, its dedupe key in `habitCompletions[]` (`habit::<section>::<text>`) changes too. Existing entries from before the edit remain in past day files with the old key — that's fine, those are historical records. Going forward, the new key is what gets logged.

## Verification (end-to-end)

Run on Jin to verify the system after any redeploy:

```bash
TODAY=$(date +%F)

# 1. Empty day ledger
curl -s "http://localhost:4242/api/day?date=$TODAY"
# Expect: {"date":"YYYY-MM-DD","version":1,"notes":[],"completedTodos":[],"habitCompletions":[],"scheduledEvents":[...]}

# 2. Note round-trip
curl -s -X POST http://localhost:4242/api/day/notes \
  -H "Content-Type: application/json" \
  -d "{\"date\":\"$TODAY\",\"text\":\"smoke test\"}"
cat ~/.openclaw/workspace/daily/$TODAY.json
# Verify the note is there. Then DELETE by id.

# 3. Toggle dedupe (Everyday)
for i in 1 2 3; do
  curl -s -X POST http://localhost:4242/api/todos/toggle \
    -H "Content-Type: application/json" \
    -d '{"section":"Everyday","index":0}' >/dev/null
done
cat ~/.openclaw/workspace/daily/$TODAY.json | python3 -c "import json,sys; print(len(json.load(sys.stdin)['completedTodos']))"
# Expect: 1 (not 3) — dedupe works

# 4. Habit edit
curl -s -X PUT http://localhost:4242/api/habits \
  -H "Content-Type: application/json" \
  -d '{"section":"Daily Routines","index":0,"text":"Morning stretch (5 min)"}'
cat ~/.openclaw/workspace/habits.md
# Verify "- [ ] Morning stretch (5 min)" appears

# 5. Section rename
curl -s -X PUT http://localhost:4242/api/habits/section/rename \
  -H "Content-Type: application/json" \
  -d '{"oldName":"Daily Routines","newName":"Morning Routine"}'
# Verify, then rename back

# 6. Regression: existing endpoints still work
curl -s http://localhost:4242/api/data -o /dev/null -w "%{http_code}\n"  # 200
curl -s http://localhost:4242/api/streaks                                # {"streaks": {...}}
```

UI smoke (manual, in a browser at `http://100.124.64.28:4242/`):
- Today tab: Today's Notes card visible; add a note; reload; note still there
- Today tab: edit a habit's text; reload; new text persists
- Today tab: rename "Daily Routines" → "Morning Routine"; reload; new name persists
- Calendar > Day for today: all four sections render
- Calendar > Day for yesterday: read-only display, scheduled events still work

## Deployment

Always: pull → edit local source → push → restart. The `dashboard-deploy/` directory is the source of truth.

```bash
# 1. SSH in (Tailscale, ed25519 key, NVM path needed for non-interactive node)
ssh openclaw@100.124.64.28

# 2. Backup live files first
cd ~/.openclaw/workspace/dashboard
DATE=$(date +%F-%H%M)
cp server.js "server.js.${DATE}.bak"
cp public/index.html "public/index.html.${DATE}.bak"

# 3. From local: scp from .claude/dashboard-deploy/ (NOT from .jin-staging unless you know what you're doing)
# (Local) scp .claude/dashboard-deploy/server.js openclaw@100.124.64.28:~/.openclaw/workspace/dashboard/server.js
# (Local) scp .claude/dashboard-deploy/index.html openclaw@100.124.64.28:~/.openclaw/workspace/dashboard/public/index.html

# 4. Syntax check + restart
export PATH=$HOME/.nvm/versions/node/v22.22.0/bin:$PATH
node --check server.js
pm2 restart jinn-dashboard
```

Rollback: `cp <bak> <orig> && pm2 restart jinn-dashboard`.

## Architectural Drift Open Issue

As of Session 66, the live Jin `index.html` had been drifting from `dashboard-deploy/index.html` since Session 65. The live file accumulated inline macro-tab code while `dashboard-deploy/` carried the cleaner external-file architecture (`<script src="/macro-tab.js">`). My Session 66 deploy preserved the live drift state (because I pulled from live, edited, pushed back). The Session 68 deploy continued from the same drifted base.

**Reconciliation move**: redeploy `dashboard-deploy/index.html` to Jin and verify the Signals tab still loads. The macro tab files are present at `~/.openclaw/workspace/dashboard/public/macro-tab.{css,js}`, so the external-script architecture should work — but it needs to be tested. Not blocking for daily-ledger or habit-edit functionality.

## Phase 2 (Parked)

Build these once Phase 1 has produced clean data for several days:

1. **Calendar Week/Month indicators** — counts/dots in week and month cells from `/api/day/range`. Range endpoint returns array of summaries (counts only, not full ledgers).
2. **Tracker view** — date-range selector + insights: total completed, daily averages, best/worst days, recurring completions, missed days. JSON + Markdown export.
3. **`entropy.md` backfill** — best-effort parser to surface historical completions in past Calendar Day views. Risk: format inconsistency. Probably ship as a one-shot script in `Activation/`, not as a permanent route.
4. **Reflection field** — add `reflection: ""` and `dailyScore: null` to the ledger; surface as an end-of-day textarea on Today tab.
5. **Goal tagging** — add `tags: []` to ledger entries (notes, completed, habits). UI for tag management. Tracker filters by tag. Defer until you have categories worth tracking (health, learning, Bitcoin, Freedom Lab, JC BTC, etc.).

The Phase 1 schema accommodates all of these without migration. The `version: 1` field is there for if/when one is needed.

## File Locations Summary

| Thing | Path |
|---|---|
| This doc | `c:\...\AI\Clawdbot aka Openclaw\DAILY-LEDGER-ARCHITECTURE.md` |
| Original plan | `c:\Users\GC\.claude\plans\hi-i-m-pasting-a-gleaming-snail.md` |
| Decision trace | `c:\...\Ai Playground\DECISIONS.md` (entry: "Daily Calendar Ledger -- Phase 1") |
| Worklog entries | `c:\...\AI\Clawdbot aka Openclaw\WORKLOG.md` (Sessions 66 + 68) |
| Live backend | `openclaw@100.124.64.28:~/.openclaw/workspace/dashboard/server.js` |
| Live frontend | `openclaw@100.124.64.28:~/.openclaw/workspace/dashboard/public/index.html` |
| Source-of-truth backend | `c:\...\.claude\dashboard-deploy\server.js` |
| Source-of-truth frontend | `c:\...\.claude\dashboard-deploy\index.html` |
| Ledger files | `openclaw@100.124.64.28:~/.openclaw/workspace/daily/YYYY-MM-DD.json` |

## Glossary

- **Daily Ledger** / **the spine** — the JSON-per-day system this doc describes
- **Phase 1** — what's shipped: ledger + Today notes + Calendar Day enrichment + habit edit
- **Phase 2** — parked: week/month indicators, tracker, export, reflection, tags
- **Out-of-band edit drift** — the anti-pattern where live edits via SSH get clobbered on next deploy because `dashboard-deploy/` was never updated. Captured in Session 65 lessons.
- **Holistic stress index** — separate Signals tab system (Session 63), not part of the ledger
- **Jinn** — the user's personal AI assistant agent. Course materials use neutral "your agent."
