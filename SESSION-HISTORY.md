# Transition Prompt — OpenClaw/Clawdbot Course Project

**Last updated:** 2026-03-01
**Status:** Session 49. QA audit complete (5 parallel checks), 45+ issues found, fix plan approved. Sessions 46-48 committed (7e0760b). Ready to execute QA fixes (Phases 1-7), then script drift sync (Session 50).

---

## What This Project Is

A comprehensive 12-module educational course teaching non-technical users how to set up, configure, and use OpenClaw — an open-source personal AI assistant. The course includes lesson modules, Marp slide decks (ocean-themed "Tidepool" design), and draws from 36+ community research articles.

## Where Everything Lives

```
Clawdbot aka Openclaw/
├── TRANSITION-PROMPT.md               # This file (active status)
├── SESSION-ARCHIVE.md                # Sessions 1-44 history
├── Course-Guide-README.md             # Course overview and table of contents
├── OPERATIONS-Template.md             # Workspace file for the agent (students copy to ~/.openclaw/workspace/)
├── OpenClaw-Quick-Start-Guide.md      # Standalone quick start reference
├── Activation/                        # Hands-on setup artifacts
│   ├── INCIDENT-RESPONSE-CARD.md      # Living security document (secrets, accounts, permissions)
│   ├── SOUL-2.md                      # Jinn's soul document (1,174 words, 36 dials as prose beliefs)
│   └── USER.md                        # GC-specific context (rhythm, world, communication preferences)
├── GitHub-Repo/                       # Full clone of openclaw/openclaw repo
│   ├── (full repo contents — 6,100+ files)
│   └── OpenClaw GitHub README (2026-02-20).md  # Dated snapshot
├── Lessons/
│   ├── Slides-Design-System.md        # Tidepool theme documentation
│   ├── Module-00-What-Is-OpenClaw/    # Each module folder contains:
│   │   ├── Lesson.md                  #   Lesson content
│   │   ├── Slides.md                  #   Marp slide deck (Tidepool theme)
│   │   ├── Script.md                  #   Per-slide teaching script
│   │   └── Slides.pdf                 #   PDF export (when generated)
│   ├── Module-01-Understanding-the-Risks/
│   ├── Module-02-Preparing-Your-Old-Laptop/
│   ├── Module-03-Installing-OpenClaw/
│   ├── Module-04-Your-First-Conversation/
│   ├── Module-05-Workspace-and-Memory/
│   ├── Module-06-Connecting-Messaging-Channels/
│   ├── Module-07-Skills-and-ClawHub/
│   ├── Module-08-Cron-Jobs-and-Heartbeats/
│   ├── Module-09-Advanced-Concepts/
│   ├── Module-10-Security-Hardening/
│   └── Module-11-Maintenance-and-Troubleshooting/
├── OpenClaw Class/                    # 3-class streamlined version (Session 29-30)
│   ├── README.md                      # Overview, instructor prep, 3-class schedule
│   ├── USB-Kit/
│   │   ├── setup-commands.txt         # Streamlined commands organized by class (35 steps)
│   │   └── README.md                  # Instructor prep: download ISO, create USBs
│   ├── Class-1-Setup-and-Get-Chatting/
│   │   ├── Slides.md                  # 26 slides, Tidepool theme
│   │   ├── Teaching-Notes.md          # Per-slide instructor guide
│   │   └── Slides.pdf
│   ├── Class-2-Make-It-Yours/
│   │   ├── Slides.md                  # 23 slides
│   │   ├── Teaching-Notes.md
│   │   └── Slides.pdf
│   └── Class-3-Lock-It-Down/
│       ├── Slides.md                  # 20 slides
│       ├── Teaching-Notes.md
│       └── Slides.pdf
├── Freedom Lab Presentation/          # Separate presentation for Freedom Lab (Session 30)
│   └── Content-Outline.md            # 6-section content organized from existing materials
├── Reference/                         # Command references and documentation
│   └── CLI-Reference.md              # Ground-truth CLI command reference (from docs.openclaw.ai)
├── Research/                          # 35 remaining source articles
│   ├── Notes.md                       # User's personal exercise notes + completed threat model
│   ├── WSL/                           # Archived WSL-era Module 02 files (Session 27)
│   │   ├── README.md                  # Why the WSL approach was replaced
│   │   ├── Lesson.md, Slides.md, Script.md, Slides.pdf  # Original WSL Module 02
│   │   └── setup-commands.txt         # Original 28-step WSL setup commands
│   └── OpenClaw Ecosystem Systems Intelligence Outline...  # Deep systems research
└── .claude/                           # Project-level settings

Ai Playground/.claude/commands/
└── transition.md                      # /transition slash command (lives at git root, not subfolder)
```

## What's Been Done

> **Sessions 1-44 archived** → See [SESSION-ARCHIVE.md](SESSION-ARCHIVE.md) for full history.
>
> **Summary:** 47 sessions spanning initial course build, 12-module lesson/slide/script creation, Tidepool theme design, GitHub repo setup, WSL→native Ubuntu rewrite (Session 28), CLI command verification against docs.openclaw.ai (~500+ fixes), 3-class OpenClaw Class version (69→77 slides), Gemini free path added (Session 41), hands-on field testing (Modules 02-06), soul document work (SOUL-2.md + USER.md), VL audit system (13 VL max), and comprehensive Script↔Slides sync.

### Session 45: Script Drift Fix — 8 of 11 Modules Synced

- **Committed and pushed all Sessions 30-44 changes** — 47 files across 14 sessions, commit 4b7a966
- **Fixed Module 04 Lesson.md** — WSL "Start Menu" artifact on line 39 → "close the terminal and reopen it"
- **Fixed Module 04 Slides.md** — added Gemini free tier note to Understanding Tokens slide (paid + free paths)
- **Fixed Module 04 Script.md** — synced 23→25 slides: added Slide 9 "Interview" section, split Conversations 3/4, removed `/config` from slash commands, added Gemini free tier mention
- **Audited all 11 Scripts for slide drift** — found 8 of 11 mismatched:
  - Module 07: -10 slides (critical, needs full rewrite)
  - Module 03: -4 slides + non-standard 5b/18b numbering (high)
  - Module 05: -3 slides (high)
  - Modules 01, 06, 10: -2 each (medium)
  - Modules 02, 11: -1 each (low)
  - Modules 00, 08, 09: matched
- **Fixed 8 drifted Scripts** across 2 commits (08e76cc, 8cc44b1):
  - Module 01: 28→30 slides (split Principles 3/4/5, split Threat Model activity)
  - Module 02: 25→26 slides (split at Try/Install transition)
  - Module 03: 27→33 slides (fixed 5b/18b numbering, split Q8-Q10, First Chat, Verify Daemon, Damage Control)
  - Module 04: 23→25 slides (Interview slide, Conversations 3/4, Gemini mention)
  - Module 05: 26→29 slides (split 4-File Memory, QMD/Mem0 Closer Look, Files 6-7 vs 8-9)
  - Module 06: 24→25 slides (fixed numbering skip, split Discord and WhatsApp)
  - Module 10: 23→25 slides (split Gateway Hardening, Home Network Setup)
  - Module 11: 26→28 slides (split Configuration/Channels, fixed header count)
- **Only Module 07 Script remains** — -10 slide gap, needs complete rewrite (deferred)
- **User asked about OpenClaw multi-model config** — answered from CLI Reference: `agents.defaults.model.primary` for main model, `agents.defaults.heartbeat.model` for heartbeats, no documented fallback/routing

### Session 46: VL Overflow Fix + Module 07 Script Rewrite + PDFs
- **Fixed all VL overflows across Modules 07-11** (~47 overflowing slides):
  - Module 07: 9 slides fixed (Browsing ClawHub split into 2, h3→bold conversions, code trimming)
  - Module 08: 12 slides fixed (6 splits: Heartbeat config, Local models, Cron Syntax, Mission Statement into 3, Compaction, Session Lifecycle, Hands on Deck)
  - Module 09: 19 slides fixed (7 splits: ClawRouter, Prompt Caching, Freshman Rule, Reverse Prompting, Self-Improvement, Chat Quality + h3→bold trims)
  - Module 10: 15 slides fixed (10 splits: Sandbox Modes, Scopes, Docker, Tool Policies, File Permissions, Security Audits, Browser Control, Weekly Maintenance, Incident Response into 3, Hands on Deck)
  - Module 11: 13 slides fixed (8 splits: Updating, Backup, Gateway Errors, Security cheat sheet, Skills/TUI, Community Resources + h3→bold and bullet merges)
- **Rewrote Module 07 Script.md** — 25→30 slides to match Slides.md structure:
  - Split: Browsing ClawHub (7→7+8), Installing Steps 3-5 (10→11+12), Building Custom Skill (13→15+16), Best Practices (16→19+20), Twice=Skill + Channels (17→21+22)
  - All 11 teaching scripts now synced to their slide decks
- **Generated Modules 07-11 PDFs** — all 12 module PDFs now current

### Session 47: Module 02 VL Fix + MiniMax Research + Telegram Diagnosis + allowFrom Hardening
- **Fixed Module 02 Slide 21 VL overflow** — "Step 9: Power Settings for 24/7 Operation" was at 14 VL. Merged standalone test line into existing blockquote warning (14→13 VL).
- **Researched MiniMax AI as potential third provider path:**
  - Shanghai-based AI company, built-in OpenClaw provider (in onboarding wizard alongside Anthropic, OpenAI, Google, Open Router)
  - $10/month Coding Plan: 100 prompts per 5-hour rolling window, Anthropic-compatible API at `https://api.minimax.io/anthropic`
  - M2.5 flagship model, 200K context, very cheap per-token ($0.80/$3.20 per million tokens)
  - Known GitHub issue #15275: wrong API type defaults, needs `apiType: "anthropic"` in config
  - Setup commands: `npx openclaw config set models.providers.minimax.apiKey "YOUR_KEY"`, `npx openclaw config set models.providers.minimax.baseUrl "https://api.minimax.io/anthropic"`, `npx openclaw config set agents.defaults.model.primary "minimax/MiniMax-M1-80k"`
  - **Decision: test on Jinn before adding to course materials** (learned from Session 43 that real testing catches undocumented issues)
- **Diagnosed Telegram briefing failure:**
  - 8am cron briefing failed to deliver. `openclaw status` showed gateway + Telegram healthy.
  - Root cause in logs: `Claude: HTTP 401: Invalid bearer token` at 19:27:22 — Anthropic API key temporarily rejected
  - GC noted Anthropic console was behaving oddly (workspace creation forced credit purchase, "come back later" errors)
  - Turned out to be transient — Jinn was responding to direct Telegram messages when tested
  - Gemini (`google:default`) also configured as fallback provider
- **Hardened live Jinn — allowFrom tightened:**
  - Changed Telegram `allowFrom` from wildcard `*` to GC's specific numeric user ID
  - Command: `npx openclaw config set channels.telegram.allowFrom '["USER_ID"]'`
  - **Quoting gotcha:** Without quotes, bash passes bare number → "config validation failed, expected array received number." Must use single quotes wrapping JSON array with double-quoted string.
- **Verified course materials for allowFrom quoting** — grep confirmed Module 06 (Slides, Script, Lesson) and Module 10 (Lesson) all have correct `'["YOUR-USER-ID"]'` quoting. Session 43 rewrite already handled this.
- **INCIDENT-RESPONSE-CARD.md updated** — added Google API key to Secrets Registry, noted allowFrom tightening in Access Registry
- **No files committed this session** — only Module 02 Slides.md edited (1 line change)

### Session 48: Context Optimization — Archive Split + MCP Relocation
- **Created SESSION-ARCHIVE.md** (798 lines) — moved Sessions 1-44 history out of TRANSITION-PROMPT.md into a separate archive file. Zero information lost, fully preserved.
- **Slimmed TRANSITION-PROMPT.md from ~1001 → 168 lines** (83% reduction)
- **Moved Google Slides MCP server from global to FreedomLab project scope** — was loading 80+ tool definitions into every project
- **Net context savings for future sessions:** ~830 lines from TRANSITION-PROMPT.md + 80+ MCP tool schemas no longer loading

### Session 49: QA Audit + Fix Plan — GitHub Publish Readiness
- **Committed Sessions 46-48** — commit 7e0760b (13 files: VL fixes Modules 07-11, Module 07 Script, 5 PDFs, .gitignore update). SESSION-ARCHIVE.md added to .gitignore.
- **Ran 5 parallel QA audits** across all 12 modules + 3 classes:
  1. **WSL artifacts: CLEAN** — no fixes needed, all remaining WSL refs are legitimate (speaker notes, comparisons, archives)
  2. **VL compliance: 4 overflows** — Module 01 Slide 9 (14 VL), Module 02 Slide 7 (14 VL), Module 03 Slide 31 (13.5 VL), Class 1 Slide 9 (13.5 VL)
  3. **Dual-path consistency: 6 gaps** — Modules 10-11 Anthropic-only key rotation, Module 10 spending cap missing Gemini note, Class 3 Teaching Notes Anthropic-only, Quick Start spending limit section
  4. **CLI commands: 15 issues** — 4 confirmed wrong (config paths, heartbeat.every, cron syntax), 11 verified against source code in GitHub-Repo/
  5. **Cross-references: 5 issues** — Quick Start HEARTBEAT.md wrong case/path, 38 unscripted slides from VL splits (Modules 07-11 script drift)
- **Verified all Tier 2 commands against OpenClaw source code:**
  - `skills browse`/`clawhub browse` — DON'T EXIST → change to `clawhub search`/`clawhub list`
  - `sandbox setup` — DOESN'T EXIST → change to `sandbox recreate`
  - `cron add` flags — `--schedule`/`--task` DON'T EXIST → correct flags are `--name`/`--cron`/`--system-event`/`--message`
  - `devices` command — EXISTS (verified, not in CLI Reference)
  - `cron remove`/`disable`/`enable` — ALL EXIST (not in CLI Reference)
  - `sandbox.mode`/`sandbox.scope` — EXIST as config paths
  - `clawhub install --pin` — EXISTS (keep in course)
  - `channels add telegram` (positional) — WORKS (Session 43 testing, keep as-is)
  - `tools.elevated` — EXISTS as object `{enabled, allowFrom}`, NOT a string
  - `tools.deny` — takes JSON array, not string
- **Gemini model decision:** Standardize on `gemini-2.5-flash` everywhere (matches onboarding wizard). Fix Module 08 + CLI Reference (`gemini-flash-3` → `gemini-2.5-flash`).
- **Fix plan written and approved** — saved at `.claude/plans/joyful-watching-sprout.md`. 7 phases of fixes (config paths, command names, Gemini model, dual-path, VL overflows, CLI Reference update, emoji fix) + commit. Script drift (38 slides) deferred to Session 50.
- **No course files edited this session** — audit and planning only

## Standing Instructions
- **Do NOT regenerate PDFs** until explicitly asked
- **Do NOT personalize** course materials with agent names
- **Slides** use Tidepool ocean theme (Marp-compatible markdown)
- **Tone** stays professional, direct, beginner-friendly
- When editing, always read files first before modifying
- Match existing formatting patterns (headers, tables, callout boxes)

## What's NOT Done / Next Steps
- **IMMEDIATE: Execute QA fix plan** — Phases 1-7 in `.claude/plans/joyful-watching-sprout.md`. ~45 fixes across ~20 files. Auto-accept plan and execute.
- **Script drift sync (Session 50)** — 38 unscripted slides across Modules 07-11 Scripts (from Session 46 VL splits). Deferred from Session 49.
- **Push to GitHub** — After QA fixes committed. Currently 1 commit ahead of origin (7e0760b).
- **Regenerate PDFs** — After all fixes are applied (Modules 01-03, 07-11 slides changed; Class 1-3 slides changed).
- **Explore MiniMax on Jinn** — Test MiniMax M2.5 as third provider on live Jinn before adding to course.
- **Create post-course advanced security document** — proxy auth, mDNS, multi-agent, hook tokens, browser hardening.
- **GC's laptop:** Module 03 COMPLETE. Remaining walkthrough: Modules 04-11.
- **GitHub repo:** `openclaw-beginners-course` (public, 8 commits after push).

## Quick Reference (details in CLAUDE.md + MEMORY.md)
- **CLI ground truth:** `Reference/CLI-Reference.md` — always check before writing commands
- **All `openclaw` commands need `npx` prefix** (never on PATH)
- **Config:** `config get/set <dot.path>` only — subcommands give "too many arguments"
- **GitHub repo:** `openclaw-beginners-course` — identity: TheBitcoinBreakdown-95, noreply email
