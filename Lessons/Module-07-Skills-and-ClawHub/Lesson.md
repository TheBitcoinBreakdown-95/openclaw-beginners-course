# Module 07: Skills and ClawHub

## Learning Objectives

By the end of this module, you will be able to:

1. Explain what skills are and how they work
2. Browse and install skills from ClawHub (the skill marketplace)
3. Evaluate a skill for security before installing it
4. Build a simple custom skill from scratch
5. Understand the token impact of skills on your context window
6. Manage your installed skills (enable, disable, remove)

---

## Key Vocabulary

| Term | Definition |
|------|-----------|
| **Skill** | A plugin for OpenClaw — a set of instructions (in markdown with YAML front matter) that teaches your agent a new capability |
| **ClawHub** | The community marketplace for OpenClaw skills — anyone can publish, anyone can install |
| **YAML front matter** | The metadata section at the top of a skill file, between `---` markers. It defines the skill's name, description, triggers, and configuration |
| **Token impact** | The amount of context window space a skill uses. More skills = less room for conversation |

---

## What Are Skills?

Skills are how you teach your agent new abilities. Without skills, your agent can chat, run commands, and read/write files. With skills, your agent can:

- Send and manage emails
- Create images with AI
- Interact with Google Workspace
- Post to Twitter/X
- Take and search notes in Obsidian
- Control smart home devices
- And thousands more

### How Skills Work

A skill is just a markdown file with special metadata. When a skill is enabled, its content is loaded into the agent's context — effectively giving your agent new instructions on how to do something.

Here's the basic structure of a skill:

```markdown
---
name: "email-assistant"
description: "Manages email: read, write, reply, search"
triggers:
  - "email"
  - "send email"
  - "check my inbox"
tools:
  - "himalaya"
---

# Email Assistant

When the user asks about email, use the Himalaya CLI tool to:

1. **Read emails**: `himalaya list` to list recent emails
2. **Read a specific email**: `himalaya read <id>`
3. **Send an email**: `himalaya send --to <address> --subject <subject>`
4. **Reply**: `himalaya reply <id>`
5. **Search**: `himalaya search <query>`

## Rules
- Always confirm before sending an email
- Show a preview of the email before sending
- Never auto-reply without user approval
```

When this skill is active and you say "check my inbox," your agent knows exactly what tool to use and how to use it.

---

## Browsing ClawHub

ClawHub is the community marketplace for skills. As of early 2026, there are over 5,700 skills available.

### Accessing ClawHub

**From the terminal:**
```bash
npx openclaw skills browse
```

**From the TUI:**
```
/skills browse
```

**On the web:**
Visit the ClawHub section through the OpenClaw dashboard or documentation.

### What You'll Find

Skills are categorized by type:

| Category | Examples |
|----------|---------|
| **Communication** | Email, Slack, SMS, Telegram enhancements |
| **Productivity** | Note-taking (Obsidian, Notion), task management, calendar |
| **Development** | GitHub, code review, deployment |
| **Research** | Web search, data analysis, academic papers |
| **Social Media** | Twitter/X, LinkedIn, Instagram posting |
| **Creative** | Image generation, writing assistance, music |
| **Smart Home** | Home Assistant, IoT devices, Tesla |
| **Finance** | Crypto tracking, accounting, invoicing |
| **Custom** | Community-built tools for specific workflows |

---

## Installing a Skill

### Step 1: Find a Skill

```bash
npx clawhub search "obsidian"
```

This searches ClawHub for skills related to Obsidian. You'll see results like:

```
1. obsidian-notes (v1.2.3) - Read, write, and search Obsidian vault notes
   ★★★★☆ (423 installs)
2. obsidian-daily (v0.8.1) - Create and manage daily notes in Obsidian
   ★★★☆☆ (156 installs)
3. obsidian-tasks (v2.0.0) - Task management within Obsidian vault
   ★★★★★ (812 installs)
```

### Step 2: Inspect Before Installing (CRITICAL)

**Do not install skills blindly.** Read the skill's content first:

```bash
npx openclaw skills info obsidian-notes
```

This shows you:
- The full YAML front matter (what tools it uses, what triggers it has)
- The full markdown instructions (what it tells the AI to do)
- The author and version
- Community reviews and ratings

**What to look for:**
- Does it request more permissions than it needs?
- Does the markdown contain suspicious instructions? (e.g., "send data to..." or "access..." followed by external URLs)
- Does it ask the agent to run commands that seem unrelated to its purpose?
- Is the author reputable? How many installs does it have?

**Red flags:**
- Skills that ask for elevated/admin access
- Skills with instructions to send data to external servers
- Skills from authors with no other published skills and no reviews
- Skills that ask the agent to disable security features

### Step 3: Install (with Version Pinning)

Once you've inspected and are satisfied, install with the `--pin` flag to lock the version:

```bash
npx clawhub install obsidian-notes --pin
```

**Expected output:**
```
✓ Installing obsidian-notes v1.2.3...
✓ Version pinned with integrity metadata
✓ Skill installed successfully
✓ Restart gateway to activate
```

**Why pin?** Without pinning, a skill can silently update and change behavior — or worse, a compromised upstream could push malicious code. Pinning stores integrity metadata so OpenClaw can detect when a skill's contents have changed since installation. If you ever see an **integrity drift warning**, do NOT ignore it — investigate before allowing the update.

### Step 4: Restart

```bash
npx openclaw gateway restart
```

### Step 5: Test

Open the TUI and try the skill:

```
Can you list the notes in my Obsidian vault?
```

Your agent should use the skill's instructions to interact with Obsidian.

---

## VirusTotal Scanning

ClawHub has a partnership with VirusTotal to scan skills for malicious content. This provides a baseline of safety, but it's not foolproof.

**What it catches:**
- Known malware patterns
- Suspicious URLs
- Obvious data exfiltration attempts

**What it doesn't catch:**
- Subtle prompt injection instructions
- Novel attack patterns
- Social engineering embedded in instructions

**Bottom line:** VirusTotal scanning is one layer of defense. Your manual inspection (Step 2 above) is another layer. Neither alone is sufficient. Together they provide reasonable safety.

### The ClawHub Supply Chain Attack (Why This Matters)

If the above sounds theoretical, it isn't. In early 2026, security researchers discovered **1,184 malicious skills** on ClawHub. One attacker uploaded 677 packages alone. The skills were disguised as legitimate tools — crypto trading bots, YouTube summarizers, wallet trackers — with professional-looking documentation. But the SKILL.md files contained hidden instructions that tricked the AI into getting users to run malicious commands.

The **#1 ranked skill** on ClawHub ("What Would Elon Do") was scanned by Cisco and found to have 9 security vulnerabilities, 2 critical. It exfiltrated data silently and used prompt injection to bypass safety guidelines. Downloaded thousands of times. The ranking was gamed.

The payloads included Atomic Stealer (macOS malware that grabs passwords, SSH keys, crypto wallets, and API keys) and reverse shells giving attackers full remote control.

**The takeaway:** ClawHub's marketplace model — where anyone with a 1-week-old GitHub account can publish — means the skill ecosystem has the same risks as npm, PyPI, or any open package registry. Except these packages can *think*, have shell access, and run on your personal machine. Always inspect. Never trust install counts or star ratings alone.

---

## Building a Custom Skill

The most powerful thing about skills is that you can build your own. Let's create a simple one from scratch.

### Example: Daily Standup Skill

Let's build a skill that generates a daily standup report.

### Step 1: Create the Skill File

```bash
nano ~/.openclaw/workspace/skills/daily-standup.md
```

### Step 2: Write the Skill

```markdown
---
name: "daily-standup"
description: "Generates a daily standup report"
triggers:
  - "standup"
  - "daily standup"
  - "what did I do yesterday"
---

# Daily Standup Generator

When the user asks for a standup report, generate a structured update with:

## Format

**Yesterday:**
- [What was accomplished — check recent session history and memory]

**Today:**
- [What's planned — check user's goals and any scheduled tasks]

**Blockers:**
- [Any issues or obstacles mentioned recently]

## Rules
- Keep each section to 3-5 bullet points
- Pull from actual session history and memory, don't make things up
- If you don't have enough information, ask the user
- Format as clean markdown
```

### Step 3: Save and Restart

Save the file (`Ctrl + O`, Enter, `Ctrl + X`), then restart:

```bash
npx openclaw gateway restart
```

### Step 4: Test It

In the TUI:

```
Give me my daily standup
```

Your agent should generate a standup report using the format you defined.

### Building More Complex Skills

As you get comfortable, you can build skills that:
- Use specific CLI tools (like `himalaya` for email or `gh` for GitHub)
- Have complex multi-step workflows
- Integrate with APIs
- Include conditional logic ("if the user asks X, do Y")

The key principle: **a skill is just instructions in markdown**. If you can explain the process to a human, you can write it as a skill.

**The "Twice = Skill" rule:** If you do something more than twice, make a skill for it. Don't wait for the third or fourth time to think "I should automate this." The moment you repeat an instruction — email format, research structure, standup report — turn it into a skill. It costs nothing when inactive and saves time and tokens every time it fires.

### Channels as Departments

A powerful pattern from experienced users: **map each messaging channel to a specific skill.** If you're using Discord or Telegram with multiple channels/groups, each channel can serve as a "department" that tells your agent which skill to load.

For example:
- `#x-scan` channel → loads the X/Twitter skill (scanning, writing tweets, engagement analysis)
- `#finances` channel → loads the finance skill (budget tracking, payments, income)
- `#writing` channel → loads the writing skill (your voice, your rules, your banned words)
- `#general` channel → no specific skill, just regular conversation

The agent knows what "mode" to be in based on which channel the message arrives from. You walk into a channel, and your agent automatically wears the right hat — while retaining all its other context and memory. This gives you the organizational benefit of multiple agents (separation of concerns) with the cost efficiency of one (shared context, one set of core files).

To set this up, add routing rules to your `AGENTS.md`:

```markdown
## Channel-Skill Routing
- Messages from #x-scan: load the X skill
- Messages from #finances: load the finance skill
- Messages from #writing: load the writing skill
- All other channels: use general behavior
```

### Skill Description Best Practices

The difference between a skill that fires reliably and one that misfires constantly comes down to how you write the description and instructions. Here's what experienced users have learned:

**Include "Use when" AND "Don't use when":**

```markdown
---
name: "research-assistant"
description: "Deep research on topics. Use when the user asks for research, analysis, or 'look into this.' Don't use when the user just wants a quick factual answer or definition."
---
```

The negative examples ("Don't use when...") are just as important as the positive ones. Without them, your agent might trigger your research skill when someone just asks "What's the capital of France?"

**Put templates inside skills (they're free when unused):**

Templates, checklists, and reference material inside a skill cost zero tokens when the skill isn't active. They're only loaded into context when triggered. So don't be afraid to include:
- Output format templates
- Step-by-step checklists
- Reference tables
- Example outputs

This means you can build rich, detailed skills without worrying about bloating your context window — the content only loads when it's needed.

### Self-Improving Skills

Skills don't have to be static. You can add a "Lessons" section to any skill file where the agent records what worked and what didn't:

```markdown
## Lessons Learned
<!-- your agent: add entries below when you learn something about this skill -->
- 2026-02-15: User prefers bullet points over paragraphs for research summaries
- 2026-02-16: When searching academic papers, Google Scholar gives better results than general web search
- 2026-02-17: Always include source URLs — user checks them
```

Tell your agent: *"After using the [skill-name] skill, if you learn something about what works better, add it to the Lessons section of the skill file."*

Over time, each skill becomes fine-tuned to YOUR preferences. The agent never makes the same mistake twice because it's reading its own notes every time the skill loads.

### Guardrail Skills: Preventing Loops and Runaway Behavior

One of the most frustrating (and expensive) failure modes is when your agent gets stuck in a loop — trying the same broken approach over and over, burning tokens with every attempt. Experienced users build explicit **guardrail skills** to prevent this.

**Example: `anti-loop.md`**

```markdown
---
name: "anti-loop"
description: "Prevents the agent from looping on failed tasks. Always active."
triggers:
  - always
---

# Anti-Loop Guardrail

- If you see the same error twice, STOP and ask the user. Do not try a third variation.
- If a tool call fails twice with the same error, report the failure and wait for instructions.
- If you find yourself generating similar output repeatedly, pause and reassess your approach.
- Always check USER.md and MEMORY.md before asking questions the user may have already answered.
```

This is one of the first skills community members recommend building. A loop on Opus can burn $5-20 in minutes. A 50-token guardrail skill that prevents loops pays for itself instantly.

---

## Token Impact of Skills

Every active skill takes up space in your context window. This is important to understand.

### How It Works

When you start a conversation, OpenClaw loads:
- Your core files (identity, soul, user, memory, agents, etc.)
- All active skill instructions
- The conversation history

This all has to fit in the context window (typically 128K-200K tokens for Claude Opus 4.6).

### The Problem

If you install 50 skills, each with 500 tokens of instructions, that's 25,000 tokens used just for skills — before you've said a word. That means:
- Less room for conversation history
- More frequent need for `/compact`
- Higher token costs (you pay for the skill instructions every message)

### The Solution

- **Only enable skills you actively use.** Disable the rest.
- **Keep custom skills concise.** Write efficient instructions.
- **Review periodically.** Remove skills you no longer need.

### Skills + Networking = High Risk

> **Security note:** When a skill has network access (web requests, API calls, sending messages), the attack surface expands significantly. A malicious or poorly-written skill with network access could exfiltrate data, send unauthorized messages, or interact with external services you didn't intend.

**How to manage this:**
- **Keep network allowlists minimal.** Only whitelist the specific domains a skill needs (e.g., `api.github.com` for a GitHub skill, not `*`)
- **Use `domain_secrets` for authentication** rather than embedding API keys directly in skill files. This way, credentials are managed centrally and aren't scattered across skill markdown
- **Be extra cautious with community skills that request network access.** A note-taking skill that talks to the internet is suspicious. A web search skill that talks to the internet is expected. Use judgment.

### Managing Active Skills

```bash
# List all installed skills
npx openclaw skills list

# Disable a skill (keeps it installed but doesn't load it)
npx openclaw config set skills.entries.obsidian-notes.enabled false

# Re-enable a previously disabled skill
npx openclaw config set skills.entries.obsidian-notes.enabled true

# Remove a skill entirely
npx clawhub delete obsidian-notes
```

---

## Common Mistakes and Troubleshooting

| Mistake | Why It's a Problem | Fix |
|---------|-------------------|-----|
| Installing skills without reading them | Potential security risk | Always use `npx openclaw skills info` first |
| Installing too many skills at once | Context window fills up, costs increase | Start with 2-3, add more as needed |
| Not restarting after installing a skill | Skill doesn't activate until gateway restarts | Run `npx openclaw gateway restart` |
| Skill doesn't seem to work | Trigger words might not match what you're saying | Check the skill's triggers in the YAML front matter |
| Building a custom skill with vague instructions | AI doesn't know what to do | Be specific in your markdown instructions |
| Leaving unused skills enabled | Wastes context window tokens | Disable via config or remove skills you're not using |

---

## Class Exercise: Install One Skill, Build One Custom Skill

### Part 1: Install from ClawHub (10 minutes)

1. Browse available skills: `npx openclaw skills browse`
2. Search for something relevant to your use case
3. Inspect the skill: `npx openclaw skills info [skill-name]`
4. Check for security red flags
5. Install it: `npx clawhub install [skill-name]`
6. Restart: `npx openclaw gateway restart`
7. Test it in the TUI

### Part 2: Build a Custom Skill (15 minutes)

Create a custom skill that's useful for YOUR workflow. Ideas:
- A research template skill (how you want research formatted)
- A meeting notes skill (structured format for meeting summaries)
- A decision framework skill (pros/cons analysis template)
- A weekly review skill (questions for your weekly reflection)

1. Create the file: `nano ~/.openclaw/workspace/skills/my-custom-skill.md`
2. Write the YAML front matter and markdown instructions
3. Save, restart, and test

### Part 3: Evaluate (5 minutes)

- Does the installed skill work as expected?
- Does your custom skill produce the output you wanted?
- What would you improve about either skill?

---

## Key Takeaways

1. **Skills are markdown files with YAML metadata** — they teach your agent new capabilities through instructions
2. **ClawHub has 5,700+ skills** — browse before building from scratch
3. **Always inspect before installing** — read the full skill content and check for security issues
4. **Pin your skill versions** — use `--pin` to lock versions and detect integrity drift
5. **Token impact matters** — every active skill uses context window space; only keep what you need active
6. **Building custom skills is easy** — if you can write instructions for a human, you can write a skill
7. **VirusTotal scanning helps but isn't sufficient** — your manual review is the last line of defense
8. **Disable unused skills** — keeps your context lean and your costs down

---

## Further Reading

- [OpenClaw Skills Documentation](https://docs.openclaw.ai/) — Official skill format and publishing guide
- Source material in the `../Research/` folder:
  - `OpenClaw Full Tutorial for Beginners – How to Set Up and Use OpenClaw (ClawdBot MoltBot).md` — Skills and multi-agent setup
  - `100 hours of OpenClaw lessons in 35 minutes.md` — Skill ecosystem and community hub
  - `Why Everyone's Buying a Mac Mini for Clawdbot.md` — Skill security warnings

---

## What's Next

Your agent has new skills. But skills are reactive — they work when you ask. What about making your agent proactive?

In **[Module 08: Cron Jobs and Heartbeats](Module-08-Cron-Jobs-and-Heartbeats.md)**, we'll set up scheduled automations. Morning briefings, periodic check-ins, monitoring tasks — your agent will work for you even when you're not asking.
