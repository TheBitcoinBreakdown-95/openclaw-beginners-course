---
marp: true
theme: default
paginate: true
size: 16:9
style: |
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Playfair+Display:wght@400;600;700;900&family=Source+Sans+3:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&display=swap');
  :root {
    --ink: #1B3A4B;
    --teal: #3D8B8A;
    --coral: #E8725A;
    --gold: #D4A853;
    --seafoam: #A8D5D1;
    --parchment: #FAF6F0;
    --shallow: #EBF5F4;
    --tideline: #E2EDE9;
    --driftwood: #F0E8DC;
    --warning: #C84B31;
    --success: #4A8B6E;
    --muted: #6B8A8C;
    --stripe: #F4F0EA;
    --border: #C8D8D4;
  }

  section {
    font-family: 'Source Sans 3', 'Segoe UI', Arial, sans-serif;
    color: var(--ink);
    padding: 40px 60px;
    line-height: 1.55;
    background-color: var(--parchment);
    background-image:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 120' preserveAspectRatio='none'%3E%3Cpath fill='%23A8D5D1' fill-opacity='0.60' d='M0,50 C120,72 240,28 360,50 C480,72 600,28 720,50 C840,72 960,28 1080,50 C1200,72 1320,28 1440,50 L1440,120 L0,120 Z'/%3E%3Cpath fill='%233D8B8A' fill-opacity='0.35' d='M0,70 C180,92 360,48 540,70 C720,92 900,48 1080,70 C1260,92 1440,55 1440,70 L1440,120 L0,120 Z'/%3E%3Cpath fill='%231B3A4B' fill-opacity='0.22' d='M0,90 C240,106 480,74 720,90 C960,106 1200,74 1440,90 L1440,120 L0,120 Z'/%3E%3C/svg%3E"),
      radial-gradient(ellipse at 0% 100%, rgba(168,213,209,0.30) 0%, transparent 50%),
      radial-gradient(ellipse at 100% 0%, rgba(212,168,83,0.20) 0%, transparent 40%),
      radial-gradient(ellipse at 50% 50%, rgba(168,213,209,0.14) 0%, transparent 70%);
    background-position: bottom center, center, center, center;
    background-size: 100% 160px, auto, auto, auto;
    background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
    border-top: 3px solid var(--seafoam);
  }

  h1 { font-family: 'Playfair Display', Georgia, serif; color: var(--ink); font-weight: 700; font-size: 2.2em; margin-bottom: 0.3em; line-height: 1.2; text-shadow: 0 1px 3px rgba(27,58,75,0.08); }
  h2 { font-family: 'Playfair Display', Georgia, serif; color: var(--teal); font-weight: 600; font-size: 1.5em; padding-bottom: 8px; margin-bottom: 0.6em; border-bottom: 3px solid transparent; border-image: linear-gradient(90deg, var(--teal), var(--seafoam) 60%, transparent 100%) 1; text-shadow: 0 1px 2px rgba(61,139,138,0.12); }
  h3 { font-family: 'Source Sans 3', Arial, sans-serif; color: var(--coral); font-weight: 700; font-size: 1.15em; margin-bottom: 0.3em; }
  p { margin-bottom: 0.5em; }
  strong { color: var(--coral); }
  em { color: var(--muted); }
  a { color: var(--teal); text-decoration: underline; }
  ul, ol { margin-left: 0.5em; }
  li { margin-bottom: 0.25em; }
  li::marker { color: var(--teal); }

  table { font-size: 0.82em; border-collapse: separate; border-spacing: 0; width: fit-content !important; max-width: 96%; margin: 0.8em 0; border-radius: 10px; overflow: hidden; box-shadow: 0 8px 30px rgba(27,58,75,0.14), 0 3px 10px rgba(27,58,75,0.08), inset 0 1px 0 rgba(255,255,255,0.6); }
  th { background: linear-gradient(135deg, #2A7A79 0%, var(--teal) 40%, #357E7D 100%); color: white; font-weight: 600; padding: 12px 14px; text-align: left; border: none; text-shadow: 0 1px 2px rgba(0,0,0,0.15); }
  td { padding: 9px 14px; border-bottom: 1px solid var(--border); }
  tr:nth-child(even) td { background: var(--stripe); }
  tr:nth-child(odd) td { background: white; }
  tr:last-child td { border-bottom: none; }

  blockquote { border-left: 5px solid var(--teal); background: linear-gradient(135deg, #E0EDEB, rgba(235,245,244,0.7), rgba(250,246,240,0.4)); padding: 14px 22px; margin: 0.8em 0; border-radius: 0 12px 12px 0; font-style: italic; font-weight: 300; color: var(--ink); box-shadow: 0 6px 24px rgba(27,58,75,0.10), 0 2px 8px rgba(27,58,75,0.06); }
  blockquote strong { color: var(--ink); font-weight: 700; }

  code { font-family: 'JetBrains Mono', 'Consolas', monospace; background: linear-gradient(135deg, var(--tideline), #D8E8E4); color: var(--ink); padding: 2px 8px; border-radius: 5px; font-size: 0.85em; }
  pre { background: linear-gradient(160deg, #162F3D, #1B3A4B 30%, #1E4258); border-radius: 12px; padding: 18px 22px; margin: 0.8em 0; border-left: 5px solid var(--coral); overflow-x: auto; box-shadow: 0 10px 40px rgba(27,58,75,0.22), 0 4px 12px rgba(27,58,75,0.12); }
  pre code { background: transparent; color: var(--parchment); padding: 0; font-size: 0.78em; line-height: 1.5; }
  pre code *, pre code span { color: var(--parchment) !important; }

  .small { font-size: 0.75em; color: var(--muted); }
  section::after { font-family: 'Source Sans 3', sans-serif; font-size: 0.7em; color: var(--teal); font-weight: 600; opacity: 0.6; }

  section.title { background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 120' preserveAspectRatio='none'%3E%3Cpath fill='%23FFFFFF' fill-opacity='0.18' d='M0,50 C120,72 240,28 360,50 C480,72 600,28 720,50 C840,72 960,28 1080,50 C1200,72 1320,28 1440,50 L1440,120 L0,120 Z'/%3E%3Cpath fill='%23FFFFFF' fill-opacity='0.12' d='M0,70 C180,92 360,48 540,70 C720,92 900,48 1080,70 C1260,92 1440,55 1440,70 L1440,120 L0,120 Z'/%3E%3C/svg%3E") bottom center / 100% 160px no-repeat, radial-gradient(ellipse at 20% 80%, rgba(168,213,209,0.35) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(61,139,138,0.40) 0%, transparent 50%), linear-gradient(135deg, #122A36 0%, #1B3A4B 25%, #2A6B6A 60%, #3D8B8A 100%); color: white; text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 60px; border-top: none; border-bottom: 5px solid var(--gold); }
  section.title h1 { color: white; font-weight: 900; font-size: 2.6em; border: none; margin-bottom: 0.2em; text-shadow: 0 3px 12px rgba(0,0,0,0.3); }
  section.title h2 { color: var(--seafoam); font-size: 1.3em; border: none; padding: 0; font-weight: 400; text-shadow: 0 1px 6px rgba(0,0,0,0.15); }
  section.title h3 { color: rgba(255,255,255,0.8); font-weight: 300; font-size: 1.1em; margin-top: 0.5em; }
  section.title::after { display: none; }

  section.objectives, section.activity, section.takeaway, section.warning { position: relative; overflow: hidden; }
  section.objectives::before, section.activity::before, section.takeaway::before, section.warning::before { content: ''; position: absolute; border-radius: 50%; z-index: 0; pointer-events: none; }

  section.objectives { background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 120' preserveAspectRatio='none'%3E%3Cpath fill='%233D8B8A' fill-opacity='0.35' d='M0,50 C120,72 240,28 360,50 C480,72 600,28 720,50 C840,72 960,28 1080,50 C1200,72 1320,28 1440,50 L1440,120 L0,120 Z'/%3E%3Cpath fill='%231B3A4B' fill-opacity='0.20' d='M0,70 C180,92 360,48 540,70 C720,92 900,48 1080,70 C1260,92 1440,55 1440,70 L1440,120 L0,120 Z'/%3E%3C/svg%3E") bottom center / 100% 160px no-repeat, radial-gradient(ellipse at 100% 100%, rgba(61,139,138,0.25) 0%, transparent 50%), linear-gradient(160deg, #D8EDEC 0%, #E5F2F1 30%, #EBF5F4 60%, #F2F8F7 100%); border-left: 6px solid var(--teal); padding-left: 54px; }
  section.objectives::before { width: 400px; height: 400px; bottom: -80px; right: -80px; background: radial-gradient(circle, rgba(61,139,138,0.18) 0%, rgba(168,213,209,0.10) 40%, transparent 70%); }
  section.objectives h2 { color: var(--teal); }

  section.activity { border-left: 8px solid var(--gold); padding-left: 52px; background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 120' preserveAspectRatio='none'%3E%3Cpath fill='%23D4A853' fill-opacity='0.40' d='M0,50 C120,72 240,28 360,50 C480,72 600,28 720,50 C840,72 960,28 1080,50 C1200,72 1320,28 1440,50 L1440,120 L0,120 Z'/%3E%3Cpath fill='%231B3A4B' fill-opacity='0.18' d='M0,80 C240,98 480,62 720,80 C960,98 1200,62 1440,80 L1440,120 L0,120 Z'/%3E%3C/svg%3E") bottom center / 100% 160px no-repeat, radial-gradient(ellipse at 100% 0%, rgba(212,168,83,0.25) 0%, transparent 50%), linear-gradient(175deg, #F2E8D0 0%, #F5EFE0 30%, #FAF6F0 60%); }
  section.activity::before { width: 380px; height: 380px; bottom: -70px; left: -70px; background: radial-gradient(circle, rgba(212,168,83,0.16) 0%, rgba(212,168,83,0.06) 40%, transparent 70%); }
  section.activity h2 { color: var(--gold); border-image: linear-gradient(90deg, var(--gold), #E8D5A8 60%, transparent 100%) 1; }
  section.activity pre { border-left-color: var(--gold); }
  section.activity strong { color: #A07828; }
  section.activity li::marker { color: var(--gold); }

  section.takeaway { background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 120' preserveAspectRatio='none'%3E%3Cpath fill='%23E8725A' fill-opacity='0.30' d='M0,50 C120,72 240,28 360,50 C480,72 600,28 720,50 C840,72 960,28 1080,50 C1200,72 1320,28 1440,50 L1440,120 L0,120 Z'/%3E%3Cpath fill='%233D8B8A' fill-opacity='0.22' d='M0,80 C240,98 480,62 720,80 C960,98 1200,62 1440,80 L1440,120 L0,120 Z'/%3E%3C/svg%3E") bottom center / 100% 160px no-repeat, radial-gradient(ellipse at 50% 0%, rgba(232,114,90,0.20) 0%, transparent 50%), linear-gradient(150deg, #F0E8E6 0%, #EBF0EF 30%, #EBF5F4 50%, #F0F7F6 100%); border-top: 5px solid var(--coral); }
  section.takeaway::before { width: 350px; height: 350px; top: -60px; right: -80px; background: radial-gradient(circle, rgba(232,114,90,0.14) 0%, rgba(232,114,90,0.05) 40%, transparent 70%); }
  section.takeaway h2 { color: var(--coral); border-image: linear-gradient(90deg, var(--coral), #F0A899 60%, transparent 100%) 1; }
  section.takeaway strong { color: var(--teal); }
  section.takeaway li { margin-bottom: 0.4em; line-height: 1.5; }
  section.takeaway li::marker { color: var(--coral); }

  section.warning { border-left: 8px solid var(--warning); padding-left: 52px; background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 120' preserveAspectRatio='none'%3E%3Cpath fill='%23C84B31' fill-opacity='0.25' d='M0,50 C120,72 240,28 360,50 C480,72 600,28 720,50 C840,72 960,28 1080,50 C1200,72 1320,28 1440,50 L1440,120 L0,120 Z'/%3E%3Cpath fill='%231B3A4B' fill-opacity='0.14' d='M0,80 C240,98 480,62 720,80 C960,98 1200,62 1440,80 L1440,120 L0,120 Z'/%3E%3C/svg%3E") bottom center / 100% 160px no-repeat, radial-gradient(ellipse at 0% 0%, rgba(200,75,49,0.18) 0%, transparent 50%), linear-gradient(160deg, #FBE8E4 0%, #F8F0EC 30%, #FAF6F0 60%); }
  section.warning::before { width: 300px; height: 300px; top: -50px; left: -50px; background: radial-gradient(circle, rgba(200,75,49,0.12) 0%, rgba(200,75,49,0.04) 40%, transparent 70%); }
  section.warning h2 { color: var(--warning); border-image: linear-gradient(90deg, var(--warning), #E8A090 60%, transparent 100%) 1; }
  section.warning strong { color: var(--warning); }
  section.warning blockquote { border-left-color: var(--warning); background: linear-gradient(135deg, #FDF0ED, #FEF6F4); }

  section.next { background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 120' preserveAspectRatio='none'%3E%3Cpath fill='%23FFFFFF' fill-opacity='0.18' d='M0,50 C120,72 240,28 360,50 C480,72 600,28 720,50 C840,72 960,28 1080,50 C1200,72 1320,28 1440,50 L1440,120 L0,120 Z'/%3E%3Cpath fill='%23FFFFFF' fill-opacity='0.12' d='M0,70 C180,92 360,48 540,70 C720,92 900,48 1080,70 C1260,92 1440,55 1440,70 L1440,120 L0,120 Z'/%3E%3C/svg%3E") bottom center / 100% 160px no-repeat, radial-gradient(ellipse at 30% 70%, rgba(168,213,209,0.30) 0%, transparent 50%), linear-gradient(135deg, #122A36 0%, #1B3A4B 25%, #2A6B6A 60%, #3D8B8A 100%); color: white; text-align: center; display: flex; flex-direction: column; justify-content: center; align-items: center; border-top: none; border-bottom: 4px solid var(--gold); }
  section.next h1 { color: white; font-size: 1.8em; font-weight: 700; text-shadow: 0 2px 8px rgba(0,0,0,0.25); border: none; }
  section.next h2 { color: var(--seafoam); border: none; font-size: 1.5em; padding: 0; }
  section.next blockquote { border-left-color: rgba(255,255,255,0.3); background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.9); max-width: 70%; margin-top: 1em; box-shadow: 0 2px 12px rgba(0,0,0,0.15); }
  section.next::after { display: none; }
---

<!-- _class: title -->

# Class 2
# Make It Yours

### Workspace, Skills, and Automations

---

## Quick Check: Class 1 Recap

You should have:
- Ubuntu running on your dedicated laptop
- OpenClaw installed with gateway daemon running
- Telegram connected and responding to messages

**If anything broke since last class**, open a terminal and run:

```bash
npx openclaw gateway restart
npx openclaw doctor
```

*If you need help, raise your hand now — we'll fix it before moving on.*

---

<!-- _class: objectives -->

## What We'll Do Today

By the end of this class, you will have:

1. **Configured** your agent's workspace files (who it is, who you are)
2. **Installed** useful skills from ClawHub
3. **Set up** a daily morning briefing on Telegram
4. **Understood** context engineering — how to make your agent smarter

---

## The Workspace: Your Agent's Brain

Everything your agent knows lives in `~/.openclaw/workspace/`

```bash
ls ~/.openclaw/workspace/
```

---

## The 9 Core Files

| File | What It Does |
|------|-------------|
| **IDENTITY.md** | Agent's name, role, purpose |
| **SOUL.md** | Personality, communication style |
| **USER.md** | Everything about YOU (the owner) |
| **MEMORY.md** | Long-term facts and learnings (grows over time) |
| **AGENTS.md** | Operating rules and boundaries |
| **HEARTBEAT.md** | Scheduled task instructions |
| **BOOT.md** | Runs every gateway start |
| **BOOTSTRAP.md** | Runs on first boot only |
| **TOOLS.md** | API tools documentation |

---

## How Workspace Files Work

**Hot Reload:**
Edit any `.md` file in the workspace → changes take effect on the **next message**. No restart needed.

**File Size Limits:**
- **20,000 characters** per file (max)
- **150,000 characters** total across all files
- Files over the limit are silently truncated — keep them concise

**The Rule:**
> **Write for the machine, not for yourself.** Use headings, bullets, and tables. Skip prose. Be specific.

---

## USER.md — Teaching Your Agent About You

This is the most important file. It's your agent's permanent knowledge of who you are.

**What to Include:**
- Your name, location, timezone
- What you do for work
- Current goals (next 6 months)
- Preferences (communication style, tools you use)
- Important people in your life (names, relationships)
- Daily routine and habits
- What you're learning or working on

> **Think of it as the brain dump you'd give a new executive assistant on day one.**

---

<!-- _class: activity -->

## Exercise: Write Your USER.md (15 min)

```bash
nano ~/.openclaw/workspace/USER.md
```

Write at least these sections:

```markdown
## About Me        → Name, location, what you do
## Goals           → 3-5 goals for the next 6 months
## Preferences     → Communication style, tools you use
## Daily Routine   → Wake time, key daily activities
```

*Save: Ctrl+O, Enter. Exit: Ctrl+X.*
*Changes take effect immediately — test by messaging your agent on Telegram.*

---

## SOUL.md — Your Agent's Personality

This defines **how** your agent communicates, not what it knows.

### What to Include:
- Communication style (formal, casual, direct, gentle)
- How it should push back on bad ideas
- When to ask for clarification vs. just do it
- Hard rules ("never do X", "always do Y")

---

## SOUL.md — Example

```markdown
## Communication Style
Direct and concise. No fluff. Lead with yes or no.

## Hard Rules
- Never send messages without my explicit approval
- If unsure about a destructive action, ask first
- Keep responses under 3 paragraphs unless I ask for more
```

---

<!-- _class: activity -->

## Exercise: Write Your SOUL.md (10 min)

```bash
nano ~/.openclaw/workspace/SOUL.md
```

Write at least a communication style and hard rules section.

**Then test it:** send your agent a message on Telegram and see if the tone matches what you wrote.

*Pro tip: you can also just tell your agent in chat — "Update your SOUL.md with these rules: ..." — and it will edit the file itself.*

---

## IDENTITY.md — Naming Your Agent

```bash
nano ~/.openclaw/workspace/IDENTITY.md
```

### Keep it simple:
```markdown
## Name         → [Your agent's name]
## Role         → Personal AI assistant for [your name]
## Purpose      → Help me manage my daily life and get things done
```

*Pick a name that feels right. Human names, robot names, mythology — it's your agent.*

---

## Context Engineering Tips

| Principle | Example |
|-----------|---------|
| **Be specific** | "I live in Jersey City, NJ" not "I live near NYC" |
| **Use structure** | Headings, bullets, tables — not long paragraphs |
| **Verbalize the implicit** | Write down things you take for granted |
| **Update monthly** | Goals change. Routines shift. Keep files current. |
| **Less is more** | 20K char limit exists for a reason — cut the fluff |

> **Every word in your workspace costs tokens.** Make them count.

---

## What Are Skills?

Skills are **markdown instruction files** that teach your agent new capabilities.

- Stored in `~/.openclaw/workspace/skills/`
- No code — just text-based instructions with YAML metadata
- 5,700+ community skills on **ClawHub** marketplace

### Examples:
- Weather lookups, news summaries, calendar integration
- Obsidian note-taking, email management, web scraping
- Crypto tracking, fitness logging, recipe finding

---

<!-- _class: warning -->

## ClawHub Security: The 1,184 Malicious Skills

In 2026, security researchers found **1,184 malicious skills** on ClawHub.

- One attacker uploaded **677 packages** alone
- Disguised as crypto bots, YouTube tools, wallet trackers
- The **#1 ranked skill** had 9 vulnerabilities
- Payloads: password stealers, reverse shells, data exfiltration

### Before installing ANY skill:
1. Run `npx openclaw skills info [name]` and **read the output**
2. Look for: excessive permissions, external server calls, security-disabling instructions
3. Pin the version: `npx clawhub install [name] --pin`

<!--
Speaker notes:
- Rankings were gamed to look legitimate — mention this verbally when discussing the threat.
-->

---

<!-- _class: activity -->

## Exercise: Install Skills (15 min)

**Search, install, and test:**
```bash
npx clawhub search weather        # or: news, calendar, etc.
npx clawhub install SKILL-NAME --pin
npx openclaw gateway restart
```

Then message your agent on Telegram and try a trigger phrase.

**Important:**
- Install **1-2 skills max** — each uses context window space
- 50 skills = 25,000 tokens before you even say a word
- Pin the version (`--pin`) to prevent silent updates

---

## Managing Skills

```bash
npx openclaw skills list                                      # List installed
npx openclaw config set skills.entries.NAME.enabled false      # Disable (saves tokens)
npx clawhub delete SKILL-NAME                                  # Remove completely
npx openclaw gateway restart                                   # Apply changes
```

> **Rule of thumb:** Only keep skills you use at least weekly. Disable the rest.

*Disabled skills stay installed but don't consume context window tokens.*

---

## What Are Cron Jobs?

**Scheduled tasks** that run automatically at specific times.

| Schedule | Meaning |
|----------|---------|
| `0 7 * * *` | 7:00 AM every day |
| `30 8 * * 1-5` | 8:30 AM weekdays only |
| `0 9 * * 1` | 9:00 AM every Monday |
| `0 */2 * * *` | Every 2 hours |

Format: `minute hour day-of-month month day-of-week`

The most common use: **morning briefings** via Telegram.

---

## The Morning Brief

Tell your agent to send you a daily summary every morning:

**What a good morning brief includes:**
1. Date and personalized greeting
2. Weather for your city
3. Top 3 news stories in your interest areas
4. Today's tasks and reminders
5. One proactive suggestion based on your goals

**The easiest way to set it up:**

> Just message your agent: *"Set up a daily morning brief at 7 AM on Telegram. Include weather for [your city], top AI news, my tasks, and one suggestion."*

---

<!-- _class: activity -->

## Exercise: Set Up Your Morning Brief (10 min)

### Method 1: Just ask your agent (easiest)
Tell it in Telegram what you want and when.

### Method 2: Config commands (precise control)

```bash
npx openclaw config set agents.defaults.heartbeat.every "0 8 * * *"
npx openclaw config set agents.defaults.heartbeat.model "claude-sonnet-4-6"
npx openclaw config set agents.defaults.heartbeat.target "telegram"
npx openclaw gateway restart
```

---

<!-- _class: activity -->

## Morning Brief: Active Hours

### Prevent 3 AM pings:
```bash
npx openclaw config set agents.defaults.heartbeat.activeHours.start "07:00"
npx openclaw config set agents.defaults.heartbeat.activeHours.end "23:00"
npx openclaw config set agents.defaults.heartbeat.activeHours.timezone "America/New_York"
```

*Replace the timezone with yours. This ensures heartbeats only fire during waking hours.*

---

## Heartbeat Cost Tips

| Model | Cost per Heartbeat | Monthly (daily) |
|-------|-------------------|-----------------|
| Claude Opus 4.6 | ~$0.05-0.15 | ~$2-5 |
| Claude Sonnet 4.6 | ~$0.01-0.05 | ~$0.50-1.50 |
| Claude Haiku 4.5 | ~$0.001-0.005 | ~$0.03-0.15 |

### Save money:
- Use **Haiku or Sonnet** for heartbeats (Opus for real conversations)
- Set heartbeat interval to **55 minutes** — hits Anthropic's prompt cache (90% savings)
- **activeHours** = zero tokens wasted overnight

---

## The Three Essential Automations

| Automation | Schedule | What It Does |
|------------|----------|-------------|
| **Morning Brief** | Daily at your wake time | News, weather, tasks, suggestions |
| **Workspace Backup** | Every few hours | `cp -r ~/.openclaw/workspace ~/backup-$(date +%Y%m%d)` |
| **Security Audit** | Weekly | `npx openclaw security audit --deep --fix` |

*Set up the morning brief today. Backups and security audits are covered in Class 3.*

---

<!-- _class: activity -->

## Verify Everything Works

Test each piece:

1. **Workspace:** Message your agent — "What do you know about me?" *(Should reflect your USER.md)*
2. **Personality:** "Tell me a joke" *(Should match your SOUL.md tone)*
3. **Skills:** Try a trigger phrase for your installed skill
4. **Heartbeat:** `npx openclaw config get agents.defaults.heartbeat` *(Should show your schedule)*

**All working? You're done with Class 2.**

---

<!-- _class: takeaway -->

## What You Built Today

- **Workspace configured** — your agent knows who you are and how to behave
- **Skills installed** — new capabilities from ClawHub
- **Morning brief** — automated daily summary on Telegram
- **Context engineering** — you know how to make your agent smarter over time

### Homework Before Class 3:
- **Refine** your USER.md and SOUL.md based on how the agent responds
- **Use the morning brief** for a few days — adjust the content
- Think about: What should your agent NOT be allowed to do?

---

<!-- _class: next -->

# Class 3: Lock It Down

## Security Hardening and Advanced Features

> *Next time: Docker sandboxing, tool policies, model switching, and maintenance.*
