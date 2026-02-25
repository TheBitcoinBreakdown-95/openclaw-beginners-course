# Module 05: Workspace and Memory

## Learning Objectives

By the end of this module, you will be able to:

1. Navigate the OpenClaw workspace directory (`~/.openclaw/`)
2. Explain the purpose of each of the 9 core markdown files
3. Customize your agent's identity, personality, and operating rules
4. Understand context engineering — the art of giving your AI the right information at the right time
5. Turn your brain dump from Module 04 into persistent configuration
6. Back up your workspace using Git
7. Apply the "living files" concept to keep your agent's knowledge current

---

## Key Vocabulary

| Term | Definition |
|------|-----------|
| **Workspace** | The `~/.openclaw/` directory where all of your agent's files live — configuration, memory, sessions, skills, and identity |
| **Core files** | The 9 essential markdown files that define who your agent is, what it knows, and how it behaves |
| **Context engineering** | The practice of designing and maintaining the information your AI has access to — what it knows, how it's organized, and how it gets loaded into conversations |
| **Living files** | Files that are actively accessible to your AI agent (as opposed to "dead files" sitting on your hard drive that no AI ever reads) |
| **System prompt** | The hidden instructions loaded before every conversation that tell the AI how to behave — your core files become part of this |
| **Persistent memory** | Information that survives across sessions, restarts, and updates — stored in the workspace files |
| **Verbalization** | The practice of writing down your thoughts, preferences, and knowledge as text so the AI can access them |

---

## The Workspace: Your Agent's Home

Everything about your OpenClaw agent lives in one directory:

```
~/.openclaw/
```

On your system, that translates to:

```
/home/openclaw/.openclaw/
```

Let's look inside. In your Ubuntu terminal:

```bash
ls -la ~/.openclaw/
```

You'll see something like:

```
drwx------  8 openclaw openclaw 4096 Feb 16 12:00 .
drwxr-xr-x  4 openclaw openclaw 4096 Feb 16 11:00 ..
drwx------  2 openclaw openclaw 4096 Feb 16 12:00 workspace/
drwx------  2 openclaw openclaw 4096 Feb 16 12:00 config/
drwx------  2 openclaw openclaw 4096 Feb 16 12:00 logs/
drwx------  2 openclaw openclaw 4096 Feb 16 12:00 memory/
drwx------  2 openclaw openclaw 4096 Feb 16 12:00 sessions/
drwx------  2 openclaw openclaw 4096 Feb 16 12:00 skills/
-rw-------  1 openclaw openclaw  142 Feb 16 12:00 gateway.json
-rw-------  1 openclaw openclaw   64 Feb 16 12:00 profiles.json
```

**Key directories:**

| Directory | What It Contains |
|-----------|-----------------|
| `workspace/` | The core markdown files that define your agent's identity, rules, and behavior |
| `config/` | Gateway configuration and settings |
| `logs/` | Activity logs (useful for security auditing) |
| `memory/` | Your agent's persistent memory — things it remembers across sessions |
| `sessions/` | Saved conversation transcripts |
| `skills/` | Installed skills (plugins) |

The most important directory for this module is `workspace/`.

---

## The 9 Core Markdown Files

Inside the `workspace/` directory, you'll find the files that make your agent who it is. These are plain markdown (`.md`) files — you can read and edit them with any text editor.

```bash
ls ~/.openclaw/workspace/
```

Here are the 9 core files and what each one does:

### 1. `IDENTITY.md` — Who Your Agent Is

**Purpose:** Defines your agent's name, role, and fundamental identity.

**What goes here:**
- Your agent's name
- Its role (personal assistant, advisor, researcher, etc.)
- Its core purpose

**Example content:**

```markdown
# Identity

Name: [Your Agent's Name]
Role: Personal AI Assistant
Creator: [Your name]

You are [Your Agent's Name], a personal AI assistant. You are reliable, wise, and direct.
You work for [Your name] as a dedicated aide, helping with research, planning,
writing, organization, and anything else needed.

You are always available and always working in service of your user's goals.
```

### 2. `SOUL.md` — Personality and Tone

**Purpose:** Defines your agent's personality, communication style, and emotional character.

**What goes here:**
- How the agent should communicate (formal, casual, direct, warm)
- Its personality traits
- Its "voice" — how it sounds in conversation
- What it values and how it approaches problems

**Example content:**

```markdown
# Soul

## Communication Style
- Be direct and concise. Don't pad responses with unnecessary filler.
- When I ask a simple question, give a simple answer.
- When I ask for depth, go deep. Match the energy of my question.
- Use plain language. Avoid jargon unless I use it first.
- Don't start every response with "Great question!" or similar filler.

## Personality
- Confident but not arrogant
- Honest, even when the truth is uncomfortable
- Patient with genuine confusion, impatient with laziness
- Proactive — suggest things I haven't thought of
- Calm under pressure

## Values
- Truth over comfort
- Clarity over complexity
- Action over analysis paralysis
- Long-term thinking over short-term gratification

## What You Are Not
- Not a yes-man — push back when my ideas are bad
- Not a therapist — be supportive but stay focused on action
- Not a search engine — don't just summarize, synthesize and advise
```

**A note on soul documents:** Research into AI identity suggests that `SOUL.md` defines *who* the AI is, not *what* it does. Think of it as the agent's personality DNA — its values, boundaries, and relationship style. Unlike memory (which changes constantly) or identity (which is factual), the soul document captures the *character* of your agent. Update it rarely and with intention. When you do update it, you're reshaping how the agent thinks and communicates across every single interaction.

### Soul Design: What Research Actually Shows

Multiple academic papers have tested how role descriptions affect LLM performance, and the findings change how you should write `SOUL.md`:

**1. Generic labels do nothing measurable.** Researchers tested 162 different roles across four major LLM families on 2,410 factual questions. Adding generic labels like "You are a helpful assistant" or "You are a mathematician" produced **zero statistically significant improvement** over having no role at all. The effect was "largely random." If your SOUL.md is just a title and a few adjectives, it's burning context tokens for zero benefit.

**2. Detailed, experiential descriptions dramatically improve performance.** When researchers gave models rich expert identities — not "You are a mathematician" but "a number theorist with deep expertise in analytic methods who has spent two decades studying prime gap distributions" — performance improved significantly. On some tasks, a well-crafted role prompt outperformed few-shot prompting *with examples*. Just *being* someone beat *being shown how*.

**3. Write beliefs, not rules.** The key is writing soul descriptions *experientially*, not *practically*:

- **Wrong (a rule):** "Always check composition for proper visual weight before finalizing."
- **Right (a belief):** "Composition is something I feel before I can explain it. I've learned through hundreds of failed designs that when the weight is wrong, viewers sense it before they can articulate why."

The first is a checklist item. The second is an identity. The agent *becomes* someone who believes it, rather than following it mechanically. The format that works: **"I've learned that [insight] because [experience that taught it]."**

**4. Budget 30-40% of your soul for anti-patterns.** Research into persona prompting consistently finds that what an expert *refuses* is often more diagnostic of expertise than what they produce. Name specific things the agent will never do, written as strong identity claims:

- **Weak (a trait):** "I don't micromanage."
- **Strong (a behavior):** "I don't rewrite a delegate's output instead of giving feedback."

Traits are vague. Behaviors are catchable. Every ambiguity you resolve in the soul makes the agent sharper. Every one you leave makes it drift.

**5. The soul must go first in the system prompt.** The "Lost in the Middle" research found that LLMs put massive attention weight on the first and last tokens in context. Everything in the middle degrades — over a 20% accuracy drop in some tests. Your SOUL.md is loaded early in OpenClaw's context, which is correct. But if you ever reconfigure file loading order, keep the soul first. Every token you put before the soul dilutes it.

**6. A wrong soul is worse than no soul.** A well-calibrated persona improves performance by ~10% over neutral baselines. But a *miscalibrated* persona — one that doesn't match the task domain — actively degrades output. If your agent handles finances and research, the soul should reflect both, or use skill-specific souls that activate contextually. Don't force a "creative writing" personality onto a "financial analysis" task.

**7. Let the agent write its own soul.** LLM-generated expert identities consistently outperform human-written ones. The model is better at designing the expert it needs to become than you are at writing that description. Try this: give the agent the task domain, ask it to generate a detailed expert identity, then have it answer *as that expert*. Two-stage prompting beats hand-crafted souls almost every time.

### 3. `USER.md` — Information About You

**Purpose:** Stores everything the agent knows about you — your background, preferences, goals, and context. This is where your brain dump from Module 04 becomes permanent.

**What goes here:**
- Everything from your brain dump
- Personal details the agent should know
- Your schedule, preferences, and working style
- Updated over time as your life changes

**Example content:**

```markdown
# User Profile

## Basic Info
- Name: [Your name]
- Location: Austin, Texas
- Timezone: Central (UTC-6)

## Background
- Self-taught developer with 3 years experience
- Previous career in sales (5 years)
- Currently freelancing in web development

## Goals
### Immediate (This Month)
- Launch portfolio website
- Land 2 new freelance clients

### Medium-Term (6 Months)
- Build and launch SaaS product
- Grow to $5K/month revenue

### Long-Term (1-3 Years)
- $10K/month from independent business
- Location-independent lifestyle
- Write a book about my journey

## Preferences
- Morning person — most productive 6 AM - 12 PM
- Prefer Telegram for async communication
- Use VS Code for development, Notion for notes
- Coffee, not tea
- Prefers actionable advice over theory

## Challenges
- Tendency to start too many projects simultaneously
- Procrastinates on administrative tasks
- Needs help with discipline and accountability
```

### 4. `MEMORY.md` — Long-Term Memory

**Purpose:** Stores facts, decisions, and learned information that should persist across all conversations.

**What goes here:**
- Important decisions you've made (and why)
- Facts the agent has learned about your preferences
- Project notes and status updates
- Anything the agent should "just know" without being told again

**Example content:**

```markdown
# Memory

## Important Decisions
- 2026-02-16: Chose Anthropic Claude as primary AI provider
- 2026-02-16: Named agent "[Your Agent's Name]"
- 2026-02-16: Set up on dedicated Ubuntu laptop

## Project Status
- Portfolio website: In progress, using Next.js + Tailwind
- SaaS idea: Still brainstorming, considering project management tool

## Learned Preferences
- User prefers bullet points over paragraphs
- User wants daily morning brief at 7:00 AM
- User's favorite format for research: executive summary + key findings + sources

## Important Contacts
- (Add as relevant)

## Technical Environment
- Ubuntu 24.04 LTS
- Node.js 22, VS Code
- GitHub for version control
- Vercel for deployments
```

**This file grows over time.** As you have conversations with your agent, important information gets added here (either automatically via the session memory hook, or manually by you).

#### Advanced: The 4-File Memory System

As your agent matures, a single `MEMORY.md` file can become unwieldy — hundreds of lines that the agent has to parse every conversation. Community experience shows that splitting memory into specialized files dramatically improves recall and reduces token waste:

| File | Purpose | Update Frequency |
|------|---------|-----------------|
| `MEMORY.md` | Long-term context (decisions, preferences, key facts) | Weekly |
| `memory/active-tasks.md` | Currently in-progress work and next steps | Daily |
| `memory/lessons.md` | Mistakes made and lessons learned (so the agent never repeats them) | As they happen |
| `memory/YYYY-MM-DD.md` | Daily notes — what happened today, what was discussed | Daily (auto or manual) |

To set this up:

```bash
mkdir -p ~/.openclaw/workspace/memory
```

The key insight: when memory is broken into targeted files, the agent can search for what it needs instead of reading everything. This is especially powerful when combined with QMD (the on-device search skill from Module 03).

**Optional addition — Decision logs:** If your agent works on technical projects or makes architectural choices, consider adding a `memory/decisions.md` file where you (or the agent) record *why* certain decisions were made — not just *what* was decided. For example: "Chose PostgreSQL over SQLite because we need concurrent write access." Without this, compaction can erase the reasoning behind a decision, and the agent may propose reverting to an approach you already rejected. One user nearly had their agent drop a production database table after compaction erased the context around a schema decision.

**Memory hygiene:** Set up a periodic cron (covered in Module 08) to archive old daily notes, move completed tasks out of `active-tasks.md`, and trim outdated entries from `lessons.md`. Clean memory = fewer tokens = lower costs.

#### Memory Configuration: Fixing the Three Failure Modes

Even with a good file structure, OpenClaw memory can fail in three specific ways. Understanding these failure modes lets you fix them with configuration rather than frustration:

| Failure Mode | What Happens | Root Cause |
|-------------|-------------|-----------|
| **Memory is never saved** | You tell the agent something important; it doesn't persist | The LLM decides what's worth saving — and often decides "no" |
| **Memory is saved but never retrieved** | Facts exist on disk, but the agent answers from its context window instead of searching | The agent has to choose to use `memory_search`; often it doesn't |
| **Compaction destroys knowledge** | Mid-conversation, the agent forgets things it knew earlier | Context compaction summarized away information that hadn't been saved to disk yet |

**The fix: enable memory flush.** This is the single most impactful configuration change. Memory flush triggers a silent turn *before* compaction that prompts the agent to write durable memories to disk:

```json
{
  "compaction": {
    "memoryFlush": {
      "enabled": true,
      "softThresholdTokens": 40000,
      "prompt": "Distill this session to memory/YYYY-MM-DD.md. Focus on decisions, state changes, lessons, blockers. If nothing: NO_FLUSH",
      "systemPrompt": "Extract only what is worth remembering. No fluff."
    }
  }
}
```

Key detail: raise `softThresholdTokens` to **40,000** to trigger flushes earlier — before the good stuff gets compacted. Customize the prompt to tell it exactly what to capture (decisions, state changes, lessons, blockers).

**Additional configuration fixes:**

- **Context pruning:** Use `cache-ttl` mode with a 6-hour TTL and `keepLastAssistants: 3` to prevent repeating recent messages after a context flush
- **Hybrid search:** Enable both vector similarity (conceptual matching) and BM25 keyword search (exact tokens) with `vectorWeight: 0.7` and `textWeight: 0.3` — BM25 catches exact matches like error codes and project names that vector search misses
- **Session transcript indexing:** Enable `experimental.sessionMemory: true` to chunk and index past conversations alongside your memory files, making questions like "What did we decide about X last Tuesday?" answerable

#### Advanced Memory Tools (When Basic Config Isn't Enough)

For agents running multi-day projects or multi-agent coordination, the built-in memory system can hit limitations. These tools go further:

**QMD (recommended first step):** Developed by Shopify's CEO, QMD is an opt-in replacement for the built-in SQLite indexer. It runs as a local sidecar combining BM25 + vectors + reranking. The killer feature: you can index external document collections — your Obsidian vault, project documentation, Notion exports — making them searchable through `memory_search`.

**Mem0:** A YC-backed external memory layer that runs two processes every turn: Auto-Capture (detects and stores information without depending on the LLM's judgment) and Auto-Recall (searches and injects relevant memories before the agent responds). This completely solves Failure Modes 1 and 3 — memory is captured automatically and survives any compaction. Installs as an OpenClaw plug-in.

**Cognee:** Builds a knowledge graph from your data — structured representation of entities and relationships (e.g., "Alice owns the auth module"). Best for enterprise settings or multi-agent teams that need to query relationships between people, places, and things. Requires Docker and is more complex to set up.

**Obsidian integration:** Two approaches — (1) symlink your memory folder (`ln -s ~/workspace/memory ~/Obsidian/AgentMemory`) so agent notes appear in Obsidian on all devices, or (2) index your Obsidian vault via QMD so everything you capture in Obsidian becomes searchable by your agents. The second approach is more powerful: one knowledge base, multiple access patterns.

### 5. `AGENTS.md` — Operating Rules and Permissions

**Purpose:** Defines what your agent can and cannot do. Think of it as the employee handbook.

**What goes here:**
- What tools the agent is allowed to use
- What it should ask permission for
- What it should never do
- Operating boundaries and guardrails

**Example content:**

```markdown
# Agent Rules

## Always
- Ask before executing any command that could delete files
- Ask before making any API calls that cost money
- Provide a step-by-step plan before any multi-step operation
- Cite sources when presenting facts or data
- Be transparent about uncertainty — say "I'm not sure" when appropriate

## Never
- Never access or read email without explicit permission
- Never send messages on any platform without explicit approval
- Never install software without asking first
- Never share personal information with any external service
- Never delete files without confirmation

## Default Behavior
- For simple questions: answer directly, no preamble
- For complex tasks: explain approach first, wait for approval
- For errors: explain what went wrong and suggest fixes
- For scheduled tasks: log what was done and report in morning brief
```

### 6. `TOOLS.md` — API Tools Documentation

**Purpose:** Documents external tools and APIs the agent has access to and how to use them.

**What goes here:**
- API endpoints and authentication details
- Tool-specific instructions
- Integration configurations

**Initial content:** This is often auto-populated based on your configured skills and integrations. You may not need to edit it much initially.

### 7. `HEARTBEAT.md` — Periodic Check Instructions

**Purpose:** Tells the agent what to do during its periodic "heartbeat" checks — the routine that runs automatically on a schedule (default: every 30 minutes).

**What goes here:**
- What to check during each heartbeat
- Priority order of checks
- What to report and what to act on silently
- What model to use for heartbeats (hint: use a cheap one)

**Example content:**

```markdown
# Heartbeat Instructions

When you wake up for a heartbeat check, do the following in order:

1. Check if there are any unread messages on connected channels
2. Check if any scheduled tasks are due
3. Review any pending reminders
4. If it's between 6:30-7:00 AM, prepare the morning briefing

## Rules for Heartbeats
- Do NOT send messages unless there's something important to report
- Use the cheapest available model for routine checks
- Log all heartbeat activity to the log file
- If something urgent comes up, switch to the main model and alert the user
```

> **We'll configure heartbeats in detail in Module 08.**

### 8. `BOOTSTRAP.md` — First Boot Only

**Purpose:** Instructions that run ONLY on the very first gateway startup. After executing once, this file is deleted.

**What goes here:**
- Initial setup tasks
- One-time configuration
- Welcome message or onboarding sequence

**Note:** This file may already be gone if your gateway has been started at least once. That's normal — it's designed to run once and then be deleted. You don't need to create a new one.

### 9. `BOOT.md` — Every Gateway Start

**Purpose:** Instructions that run every time the gateway starts up. Unlike BOOTSTRAP.md (one-time), this runs on every restart.

**What goes here:**
- Routine startup tasks
- Status checks
- Morning routine setup
- Reminders to check things

**Example content:**

```markdown
# Boot Instructions

On every startup:

1. Check current date and time
2. Review today's scheduled tasks
3. Check for any missed heartbeats while offline
4. If the morning brief hasn't been sent today, prepare and send it
5. Log startup time and system status
```

---

## How These Files Work Together

Here's how the 9 core files come together during a typical interaction:

```
You send a message to your agent
         │
         ▼
┌─────────────────────────────┐
│     Gateway loads context    │
│                              │
│  IDENTITY.md → Who is your agent  │
│  SOUL.md → How to communicate│
│  USER.md → Who are you       │
│  MEMORY.md → What it knows   │
│  AGENTS.md → What it can do  │
│  TOOLS.md → What tools exist │
│                              │
│  + Your current message      │
│  + Recent conversation history│
│                              │
└──────────────┬──────────────┘
               │
               ▼
        AI Model (Claude)
               │
               ▼
         your agent's response
```

Every conversation starts with these files loaded as context. That's why editing them is so powerful — you're literally changing what the AI knows and how it behaves before every single interaction.

---

## Context Engineering: The Art of What to Write

You now know *where* the files are. But *what* should you write in them? This is **context engineering** — arguably the most important skill for getting the most out of OpenClaw.

### Principle 1: Be Specific, Not Vague

**Bad:**
```
Be helpful and nice.
```

**Good:**
```
When I ask a question, answer directly without preamble.
If I'm wrong about something, tell me directly. Don't soften it.
When giving recommendations, give exactly 3 options with pros and cons.
```

Vague instructions produce vague behavior. Specific instructions produce specific behavior.

### Principle 2: Write for the Machine, Not for Yourself

Your agent reads these files as text. It doesn't have context that you take for granted.

**Bad:**
```
I work in tech.
```

**Good:**
```
I'm a freelance web developer specializing in React and Next.js.
I build websites and web applications for small businesses.
My typical project takes 2-4 weeks and costs $3,000-$8,000.
```

The AI can't infer what "tech" means for you. Spell it out.

### Principle 3: Use Structure

Markdown headings, bullet points, and tables are your friends. The AI parses structured text much better than walls of prose.

**Bad:**
```
I wake up at 6:30 and work from 8 to 5. I like coffee and exercise in the mornings. My wife's name is Sarah and she works from home too. We have a dog named Max. I'm trying to lose 10 pounds.
```

**Good:**
```
## Daily Schedule
- 6:30 AM: Wake up
- 7:00 AM: Exercise (30 min)
- 8:00 AM - 12:00 PM: Deep work (most productive time)
- 12:00 PM - 1:00 PM: Lunch
- 1:00 PM - 5:00 PM: Client work and meetings
- 6:00 PM - 10:30 PM: Personal time

## Household
- Wife: Sarah (works from home, respect her focus time)
- Dog: Max (walks at 7 AM and 6 PM)

## Health Goals
- Target: Lose 10 pounds by April
- Method: Exercise 4x/week + calorie tracking
```

### Principle 4: Update Regularly

These files are not "set and forget." They should evolve as your life evolves.

**Schedule a monthly review:**
- Read through all 9 files
- Update goals that have changed
- Add new preferences you've discovered
- Remove outdated information
- Add lessons learned from the past month

### Principle 5: Verbalize the Implicit

You have a huge amount of knowledge, preferences, and context in your head that you've never written down. The AI can't access it unless you write it.

Ask yourself:
- What do I always explain to new assistants/employees?
- What assumptions do I make that others don't?
- What frustrates me about how AI assistants usually respond?
- What would make me say "this AI really gets me"?

Write those things down and put them in the appropriate core file.

Community research calls verbalization **the most valuable skill of 2026** — the ability to express your preferences, workflows, and decision-making criteria in clear markdown. The difference between a user who says "I like short emails" and one who writes:

```markdown
## Email Preferences
- Length: 2-3 sentences maximum for routine replies
- Tone: Professional but warm, never corporate
- Always include a clear next action or question
- CC my manager only on client-facing threads
- Flag anything from [VIP list] as urgent
- Never auto-reply — draft and show me first
```

...is the difference between a generic chatbot and a truly personalized assistant. The more precisely you verbalize, the more precisely the AI behaves.

---

## The Living Files Concept

This is an advanced but important idea from the OpenClaw community.

### Dead Files vs. Living Files

Most files on your computer are **dead files** — they sit on your MacBook, in Google Drive, on a USB stick somewhere. No AI reads them. No agent uses them. They accumulate but they don't contribute.

**Living files** are files that an active AI agent reads, uses, and updates. Your OpenClaw core files are living files. Your MEMORY.md grows as your agent learns. Your USER.md evolves as your goals change.

Here's the key insight from the community: **every file you move into your agent's workspace becomes exponentially more valuable.** A research document sitting on your desktop is dead. The same document in `~/.openclaw/workspace/docs/` is alive — the agent can reference it, update it, cross-reference it with other files, and build on it.

### Why This Matters

The more living files you have, the more knowledge your AI agent has access to. Consider creating additional files in your workspace for:

- **Projects:** A markdown file for each active project (status, decisions, next steps)
- **Contacts:** Key people and your relationship with them
- **Interests:** Topics you're learning about, with notes
- **Procedures:** How you like things done (email format, reporting style, etc.)
- **Docs:** Saved web research — every time the agent researches something, save the results as a markdown file so you never pay tokens to re-search the same topic

These don't need to be in the `workspace/` directory — they can be anywhere in your workspace, and your agent can read them when needed.

### The OPERATIONS.md Template (Recommended)

This course includes a ready-made operational knowledge file called `OPERATIONS-Template.md` in the course root folder. Copy it into your workspace:

```bash
cp /path/to/course/OPERATIONS-Template.md ~/.openclaw/workspace/OPERATIONS.md
```

This file contains deep operational knowledge about OpenClaw internals — failure patterns, troubleshooting procedures, security boundaries, and configuration gotchas. It's written for the **agent**, not for you. When something breaks, instead of googling or searching Discord, you can ask your agent: *"My gateway won't start"* or *"Why did you stop responding from Telegram?"* — and the agent will already have the diagnostic knowledge to help you.

You don't need to read or memorize this file. Its purpose is to make your agent a better troubleshooter.

### Creating Personal and Business Folders

A practical organizational structure:

```bash
mkdir -p ~/.openclaw/workspace/personal
mkdir -p ~/.openclaw/workspace/business
mkdir -p ~/.openclaw/workspace/projects
```

Then create files like:
- `~/.openclaw/workspace/personal/health-goals.md`
- `~/.openclaw/workspace/personal/reading-list.md`
- `~/.openclaw/workspace/business/client-notes.md`
- `~/.openclaw/workspace/projects/portfolio-website.md`

Your agent can reference these files during conversations, creating a rich knowledge base that grows over time.

---

## Hands-On: Customizing Your Core Files

Let's actually edit the files now. We'll use `nano` (the simple terminal text editor) in your terminal.

### Editing IDENTITY.md

```bash
nano ~/.openclaw/workspace/IDENTITY.md
```

Add your agent's name and role. Use the example from earlier in this module as a starting point, but make it your own.

**Save:** `Ctrl + O`, then Enter
**Exit:** `Ctrl + X`

### Editing SOUL.md

```bash
nano ~/.openclaw/workspace/SOUL.md
```

Define how you want your agent to communicate. Think about:
- What communication style frustrates you? (Prohibit it.)
- What style makes you feel understood? (Require it.)
- What personality would you hire for a real assistant?

### Editing USER.md

```bash
nano ~/.openclaw/workspace/USER.md
```

This is where your brain dump from Module 04 becomes permanent. Transfer everything you told the AI during your first conversation into this file in a structured format.

### Editing AGENTS.md

```bash
nano ~/.openclaw/workspace/AGENTS.md
```

Set your operating rules and boundaries. Be explicit about:
- What requires your permission
- What the agent should never do
- How the agent should handle uncertainty

### Editing MEMORY.md

```bash
nano ~/.openclaw/workspace/MEMORY.md
```

Start with basic facts and decisions. This file will grow the most over time.

> **Tip:** After editing, restart the gateway to load the new files:
> ```bash
> npx openclaw gateway restart
> ```

---

## Backing Up Your Workspace with Git

Your workspace is precious. It contains your agent's identity, memory, and configuration. Back it up.

### Initialize a Git Repository

```bash
cd ~/.openclaw
git init
git add -A
git commit -m "Initial workspace backup"
```

### Create Regular Backups

Get in the habit of committing your changes:

```bash
cd ~/.openclaw
git add -A
git commit -m "Workspace update: $(date +%Y-%m-%d)"
```

### Optional: Push to a Private Remote

If you want off-machine backups (recommended), create a **private** repository on GitHub:

1. Go to github.com and create a new **private** repository (call it "openclaw-workspace" or similar)
2. **Make sure it's private!** Your workspace contains API configuration and personal information
3. Add the remote and push:

```bash
cd ~/.openclaw
git remote add origin https://github.com/YOUR_USERNAME/openclaw-workspace.git
git push -u origin main
```

> **Security warning:** Never make this repository public. It contains personal information and potentially sensitive configuration.

---

## Common Mistakes and Troubleshooting

| Mistake | Why It's a Problem | What To Do Instead |
|---------|-------------------|-------------------|
| Not editing the core files at all | Your agent remains generic and unhelpful | Spend 30 minutes customizing at least IDENTITY.md, SOUL.md, and USER.md |
| Writing vague instructions | "Be good" tells the AI nothing useful | Be specific: "Respond in 2-3 sentences for simple questions" |
| Putting everything in one file | Hard to maintain, hard for the AI to parse | Use each file for its intended purpose |
| Editing JSON config files directly | Can break your installation | Use `npx openclaw config` or the TUI `/config` command instead |
| Expecting instant changes | Workspace `.md` files are picked up on the **next message** (hot-reload), but config changes (JSON) require a gateway restart | Edit `.md` files freely — just send a new message. For config changes: `npx openclaw gateway restart` |
| Never updating the files | Your agent's knowledge becomes stale | Schedule a monthly review of all core files |
| Writing files that are too large | Files over **20,000 characters** are silently truncated; total workspace is capped at **150,000 characters** | Keep files focused and concise. Split large files into smaller ones. |
| Making the workspace repo public | Exposes personal information and API configurations | Always use a **private** repository |
| Not backing up at all | A corrupted file or failed update could lose everything | Set up Git and commit regularly |

---

## Class Exercise: Customize Your 9 Core Files

### Part 1: Edit the Big Three (20 minutes)

Edit these three files using `nano` (or any text editor):

1. **`IDENTITY.md`** — Give your agent a name, role, and purpose (at least 5 lines)
2. **`SOUL.md`** — Define your agent's personality and communication style (at least 10 lines)
3. **`USER.md`** — Transfer your brain dump into structured format (at least 20 lines)

### Part 2: Set Your Rules (10 minutes)

Edit **`AGENTS.md`** with:
- At least 3 "always" rules
- At least 3 "never" rules
- A default behavior section

### Part 3: Start Your Memory (5 minutes)

Edit **`MEMORY.md`** with:
- Today's date and the fact that you set up OpenClaw
- Your chosen AI provider and model
- At least one goal you want your agent to help you with

### Part 4: Restart and Test (10 minutes)

1. Restart the gateway: `npx openclaw gateway restart`
2. Open the TUI: `npx openclaw tui`
3. Ask your agent: *"What is your name, and what do you know about me?"*
4. The response should reflect everything you wrote in the core files
5. If it doesn't, check that you saved the files and restarted the gateway

### Part 5: Back Up (5 minutes)

```bash
cd ~/.openclaw
git init
git add -A
git commit -m "Initial workspace: agent configured"
```

---

## Key Takeaways

1. **The workspace (`~/.openclaw/`) is your agent's entire world** — configuration, memory, identity, and history
2. **The 9 core files define who your agent is:**
   - `IDENTITY.md` = Name and role
   - `SOUL.md` = Personality and communication style
   - `USER.md` = Everything about you
   - `MEMORY.md` = Persistent facts and learnings
   - `AGENTS.md` = Rules and permissions
   - `TOOLS.md` = Available integrations
   - `HEARTBEAT.md` = Scheduled check behavior
   - `BOOTSTRAP.md` = One-time first boot (then deleted)
   - `BOOT.md` = Every startup routine
3. **Context engineering is the most impactful skill** — be specific, structured, and thorough
4. **Living files > dead files** — the more knowledge you put in the workspace, the smarter your agent becomes
5. **Back up your workspace with Git** — it's irreplaceable
6. **Update regularly** — your agent should evolve as you do
7. **Restart the gateway after editing** — changes only take effect on restart

---

## Further Reading

- [OpenClaw Official Docs](https://docs.openclaw.ai/) — Workspace and configuration documentation
- Source material in the `../Research/` folder:
  - `I made my OpenClaw 10x more powerful (seriously).md` — UncleBasil's deep dive on context engineering and the 9 core files
  - `OpenClaw Full Tutorial for Beginners – How to Set Up and Use OpenClaw (ClawdBot MoltBot).md` — FreeCodeCamp's workspace walkthrough
  - `100 hours of OpenClaw lessons in 35 minutes.md` — The "brain dump" process and living files concept

---

## What's Next

Your agent now has a permanent identity, personality, and knowledge of who you are. But right now, you can only talk to your agent through the terminal. Wouldn't it be nice to message your agent from your phone?

In **[Module 06: Connecting Messaging Channels](Module-06-Connecting-Messaging-Channels.md)**, we'll connect your agent to Telegram so you can chat from anywhere — your phone, your tablet, or any device with Telegram installed.

Your agent is about to go mobile.
