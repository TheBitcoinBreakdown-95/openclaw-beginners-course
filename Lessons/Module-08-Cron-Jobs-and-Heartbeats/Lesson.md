# Module 08: Cron Jobs and Heartbeats

## Learning Objectives

By the end of this module, you will be able to:

1. Explain what heartbeats are and how they make your agent proactive
2. Configure heartbeat frequency and behavior
3. Use cheaper models for heartbeats to save money
4. Set up cron jobs for scheduled automations
5. Create a morning briefing that runs daily
6. Understand the difference between reactive and proactive agent behavior

---

## Key Vocabulary

| Term | Definition |
|------|-----------|
| **Heartbeat** | A periodic check-in where the agent "wakes up," reviews its instructions, and takes action if needed — like an alarm clock that goes off every 30 minutes |
| **Cron job** | A scheduled task that runs at a specific time or interval — named after the Unix `cron` scheduler |
| **Proactive** | Acting without being asked — the opposite of reactive. A proactive agent sends you a morning brief without you asking for it |
| **Morning brief** | A daily summary sent to you at a set time — weather, news, tasks, calendar, or whatever you configure |
| **Mission control** | A custom dashboard or workspace the agent builds and maintains for you |

---

## Reactive vs. Proactive

Up until now, your agent has been **reactive** — it responds when you ask. That's useful, but it's only half the value of OpenClaw.

The other half is **proactive behavior** — your agent doing things on its own, on a schedule, without you asking.

| Reactive | Proactive |
|----------|-----------|
| You: "What's the weather?" → your agent answers | your agent sends you the weather at 7 AM every morning |
| You: "Summarize this article" → your agent summarizes | your agent monitors your favorite news sources and sends summaries |
| You: "Remind me to..." → your agent sets a reminder | your agent reviews your goals and suggests priorities for the day |
| You ask, your agent answers | your agent acts, you benefit |

Heartbeats and cron jobs are what make proactive behavior possible.

---

## Heartbeats Explained

A heartbeat is a periodic "wake-up" for your agent. Every X minutes, the gateway triggers the agent to:

1. Read its `HEARTBEAT.md` instructions
2. Check for pending tasks, messages, or triggers
3. Take action if needed
4. Go back to sleep until the next heartbeat

### Default Behavior

- **Default frequency:** Every 30 minutes (or every hour if the daemon is installed)
- **What it does by default:** Checks for unread messages, pending tasks, and scheduled items
- **Cost:** Each heartbeat consumes tokens (because the AI processes the instructions)

### Why Heartbeats and Cron Jobs Are Expensive by Default

This is critical to understand. OpenClaw, by default, sends *everything* to your primary model. If your primary is Opus 4.6, you're paying $5/$25 per million tokens for a heartbeat check that a $0.30 model could easily handle.

Here's how the costs compound:

- **System prompt re-injection:** Your SOUL.md, AGENTS.md, MEMORY.md, and skill descriptions (3,000-14,000 tokens) are re-sent with *every single API call* — including every heartbeat
- **Heartbeat overhead:** At 30-minute intervals on Opus, that's **48 full-context API calls per day**
- **Cron job overhead:** Each cron trigger creates a fresh conversation with full context injection. At 15-minute intervals, that's 96 triggers/day — potentially **$10-20/day on Opus alone**
- **Tool output storage:** File listings, browser snapshots, and command outputs get logged into session history and re-transmitted

> **This is the #1 cost mistake new OpenClaw users make.** A well-configured multi-model setup with prompt caching can reduce monthly API costs by up to 90%. We cover this in detail in Module 09.

### Configuring Heartbeat Frequency

**Our recommended configuration** (combines cheapest model + prompt caching for maximum savings):

```bash
npx openclaw config set agents.defaults.heartbeat.every "55m"
npx openclaw config set agents.defaults.heartbeat.model "claude-haiku-4-5"
```

Why 55 minutes specifically? Anthropic's prompt cache stays warm for about 55 minutes. By setting your heartbeat to 55 minutes, every heartbeat hits the warm cache — meaning your system prompt (3,000-14,000 tokens) is charged at a **90% discount** instead of full price. Combined with routing to Haiku, this drops heartbeat costs from ~$100+/month to ~$0.50/month. That's the single biggest cost optimization in this entire course.

If 55 minutes feels too infrequent for your needs, here are common settings:

| Interval | Use Case | Cost Impact |
|----------|----------|-------------|
| 15 minutes | High-responsiveness needs (urgent monitoring) | Higher |
| 30 minutes | Higher responsiveness (but doesn't hit cache window) | Moderate |
| **55 minutes** | **Recommended — hits prompt cache, great balance** | **Very low** |
| 60 minutes | Budget-conscious, low urgency | Lower |
| 0 (disabled) | No proactive behavior | Zero |

### Setting Heartbeats to Zero

If you're not ready for proactive behavior, or you want to minimize costs while learning:

```bash
npx openclaw config set agents.defaults.heartbeat.every "0m"
```

This disables heartbeats entirely. your agent only acts when you talk to it. You can enable them later when you're ready.

### Restricting Heartbeats to Active Hours

Don't want your agent pinging you at 3 AM? You can restrict heartbeats to a specific time window:

```bash
npx openclaw config set agents.defaults.heartbeat.activeHours.start "07:00"
npx openclaw config set agents.defaults.heartbeat.activeHours.end "23:00"
npx openclaw config set agents.defaults.heartbeat.activeHours.timezone "local"
```

With this configuration, heartbeats only fire between 7 AM and 11 PM in your local timezone. Outside that window, the agent sleeps — no API calls, no token costs, no 3 AM notifications. You can also set a specific IANA timezone like `"America/New_York"` instead of `"local"`.

---

## Using Cheap Models for Heartbeats

Here's a money-saving secret: **heartbeats don't need your expensive model.**

Most heartbeat checks are routine — "any new messages? any tasks due? no? go back to sleep." This doesn't require Claude Opus 4.6. A cheaper model handles it just fine.

### Configure a Heartbeat Model

```bash
npx openclaw config set agents.defaults.heartbeat.model "claude-haiku-4-5"
```

Or if you have Google Gemini configured:

```bash
npx openclaw config set agents.defaults.heartbeat.model "gemini-flash-3"
```

### Cost Comparison

| Model | Approximate Cost per Heartbeat | Monthly Cost (30-min intervals) |
|-------|-------------------------------|--------------------------------|
| Claude Opus 4.6 | ~$0.05-0.15 | ~$70-200 |
| Claude Sonnet 4.5 | ~$0.01-0.05 | ~$15-70 |
| Claude Haiku 4.5 | ~$0.001-0.005 | ~$1-7 |
| Gemini Flash 3 | Free (20/day) or very cheap | ~$0-5 |

Using Haiku 4.5 for heartbeats instead of Opus can save you **$50-190 per month**. That's significant.

### The Zero-Cost Option: Local Heartbeat Models via LM Studio

If you want to eliminate heartbeat costs entirely, you can run heartbeats on local models through LM Studio. Small 3-4B parameter models are more than capable of handling "anything new? no? go back to sleep" logic — and they're free once installed.

**Recommended local models for heartbeats (tested on M4 Mac Mini, 16GB RAM):**

| Model | Response Time | Strengths |
|-------|-------------|-----------|
| **Qwen 3 4B** | ~30 sec | The "Agentic King" — most stable for tool-use and routing tasks |
| **Gemma 3 4B** | ~21 sec | Excellent instruction following for its size |
| **Gemma 2 3B** | Very fast | Rock-solid stability |
| **Qwen 2.5 3B** | Very fast | Fastest response times, but weaker on complex logic |

These 3-4B models are roughly equivalent to GPT-4o mini for basic routing and checking tasks. They aren't as smart as Claude Sonnet, but for a heartbeat (which just needs to check if there's work to do), they're perfect.

**When to use local vs. cloud heartbeats:**
- **1-2 agents:** Cloud heartbeats via Haiku + prompt caching is simple and cheap enough (~$0.50/month)
- **3+ agents:** Local heartbeats start making more sense — multiple agents all pinging cloud APIs eat into rate limits quickly. Offload heartbeats to LM Studio and reserve your cloud API budget for actual thinking

To set this up, install LM Studio, download a 3-4B model, and point your heartbeat config to the local endpoint. See Module 09 for local model setup via Ollama (same principle applies to LM Studio).

### When to Use the Expensive Model

The heartbeat instructions in `HEARTBEAT.md` can include logic like:

```markdown
# Heartbeat Instructions

Use the cheapest available model for routine checks.
If something important is found (urgent message, critical alert, complex decision),
switch to Claude Opus 4.6 for the response.
```

This gives you the best of both worlds: cheap routine checks, expensive model only when it matters.

### The Prompt Caching Trick (Advanced — Big Savings)

This is one of the most underused optimizations for OpenClaw. When you send a request to Claude, the model processes every token from scratch each time. **Prompt caching** lets the provider remember the static parts of your prompt (your SOUL.md, AGENTS.md, MEMORY.md, and system instructions) so you only pay full price once.

With those 3,000-14,000 token system prompts being sent with every API call, caching means you only pay full price once — then it's **90% cheaper** for every subsequent hit within the cache window.

Here's the trick: Anthropic's extended cache stays warm for about **55 minutes**. If you set your heartbeat interval to 55 minutes (instead of the default 30), every heartbeat hits warm cache:

```bash
npx openclaw config set agents.defaults.heartbeat.every "55m"
```

Combined with routing heartbeats to Haiku and enabling prompt caching, your heartbeats drop from **~$100+/month to ~$0.50/month**. That's a 99.5% reduction on heartbeat costs alone.

We'll cover how to enable prompt caching in your configuration in Module 09.

### Compaction: Set Thresholds Early

Context compaction (summarizing conversation history to free up token space) should be a default configuration, not something you set up when the agent crashes from context overflow. Configure compaction thresholds now:

```bash
npx openclaw config set agents.defaults.compaction.threshold 80000
npx openclaw config set agents.defaults.compaction.flush 80000
```

This tells the agent to compact (summarize and trim) its context when it reaches 80,000 tokens, keeping sessions lean and preventing runaway token costs. Without this, a long-running session can accumulate 200K+ tokens of context — all of which gets re-sent with every API call.

---

## Configuring Your HEARTBEAT.md

This is the file that tells your agent what to do during each heartbeat. Let's write a practical one.

```bash
nano ~/.openclaw/workspace/HEARTBEAT.md
```

### Example HEARTBEAT.md

```markdown
# Heartbeat Instructions

## Priority 1: Check Messages
- Check all connected channels for unread messages
- If there are urgent messages, respond immediately
- If messages are non-urgent, queue them for the next user interaction

## Priority 2: Scheduled Tasks
- Check if any cron jobs or reminders are due
- Execute due tasks
- Log completed tasks

## Priority 3: Morning Brief (6:30-7:00 AM Only)
- If it's between 6:30 and 7:00 AM and today's brief hasn't been sent:
  - Prepare the morning briefing (see below)
  - Send it to Telegram

## Priority 4: Health Check
- Verify gateway is running normally
- Check API connectivity
- Log any issues

## Cost Rules
- Use the cheapest available model for routine checks
- Only escalate to the primary model for complex tasks
- If nothing needs attention, do nothing (don't burn tokens unnecessarily)

## Morning Brief Format
When preparing the morning brief, include:
1. **Date and greeting**
2. **Weather** for [your city]
3. **Top 3 news stories** in [your interest areas]
4. **Today's tasks** from memory and any pending reminders
5. **One proactive suggestion** based on user's goals
```

Save (`Ctrl + O`, Enter, `Ctrl + X`) and restart:

```bash
npx openclaw gateway restart
```

---

## Setting Up a Morning Briefing

The morning brief is the "killer feature" that most OpenClaw users set up first. Here's how to make it work reliably.

### Method 1: Via HEARTBEAT.md (Above)

If your heartbeat interval is 30 minutes or less, the heartbeat will catch the 6:30-7:00 AM window and trigger the morning brief. This is the simplest approach.

### Method 2: Via Cron Job (More Precise)

For exact timing, you can set up a cron job. In your Ubuntu terminal:

```bash
npx openclaw cron add "morning-brief" --schedule "0 7 * * *" --task "Send my morning brief to Telegram"
```

This creates a cron job that runs at exactly 7:00 AM every day.

### Method 3: Ask your agent to Set It Up

The easiest way — just ask:

```
Please set up a recurring daily task. Every day at 7:00 AM,
send me a morning brief on Telegram. Include:
1. A friendly greeting with today's date
2. Weather for Austin, Texas
3. Top 3 AI news stories
4. My pending tasks and priorities for the day
5. One thing you think I should focus on based on my goals

Format it cleanly with headers and bullet points.
```

Your agent will configure the automation for you.

### Testing Your Morning Brief

Don't wait until tomorrow morning. Test it now:

```
Generate and send my morning brief right now as a test.
```

Check Telegram. If the brief arrives and looks good, you're set. If it needs adjustments, tell your agent what to change.

---

## Cron Jobs: Scheduled Automations

Beyond the morning brief, cron jobs let you schedule any recurring task.

### Cost Warning for Cron Jobs

Each cron trigger creates a **fresh conversation with full context injection**. That means every cron job pays full price for your system prompts (3,000-14,000 tokens) plus whatever the task requires.

**Do the math before scheduling:**
- 1 cron job per day = ~30 API calls/month (manageable)
- 1 cron job per hour = ~720 API calls/month (adds up fast)
- 1 cron job every 15 minutes = ~2,880 API calls/month (expensive on Opus!)

**Best practices:**
- Use cheap models for routine cron jobs (email triage, status checks)
- Reserve Opus for complex cron jobs (weekly reviews, strategic planning)
- Enable prompt caching to reduce the system prompt overhead (see Module 09)
- Combine related checks into a single cron job instead of running separate ones

### Cron Job Examples

| Schedule | Task | Example Command |
|----------|------|----------------|
| Every day at 7 AM | Morning brief | `0 7 * * *` |
| Every Monday at 9 AM | Weekly review | `0 9 * * 1` |
| Every hour | Check Bitcoin price | `0 * * * *` |
| Every day at 6 PM | End-of-day summary | `0 18 * * *` |
| First of month at 10 AM | Monthly goals review | `0 10 1 * *` |

### Understanding Cron Syntax

Cron uses five fields: `minute hour day-of-month month day-of-week`

```
┌───────────── minute (0-59)
│ ┌───────────── hour (0-23)
│ │ ┌───────────── day of month (1-31)
│ │ │ ┌───────────── month (1-12)
│ │ │ │ ┌───────────── day of week (0-7, where 0 and 7 = Sunday)
│ │ │ │ │
* * * * *
```

**Common patterns:**
- `0 7 * * *` = 7:00 AM every day
- `30 8 * * 1-5` = 8:30 AM weekdays only
- `0 */2 * * *` = Every 2 hours
- `0 9 * * 1` = 9:00 AM every Monday
- `0 0 1 * *` = Midnight on the 1st of each month

### Managing Cron Jobs

```bash
# List all cron jobs
npx openclaw cron list

# Add a cron job
npx openclaw cron add "weekly-review" --schedule "0 9 * * 1" --task "Conduct my weekly review"

# Remove a cron job
npx openclaw cron remove "weekly-review"

# Temporarily disable a cron job
npx openclaw cron disable "weekly-review"
```

---

## Practical Automation Ideas

Here are automations that OpenClaw users find most valuable:

### 1. Morning Brief (Daily at 7 AM)
Already covered above. This is the #1 automation.

### 2. End-of-Day Summary (Daily at 6 PM)

```
Every day at 6 PM, send me a summary to Telegram:
- What tasks were completed today
- What's still pending
- Any messages I haven't responded to
- Tomorrow's top 3 priorities
```

### 3. Weekly Review (Monday at 9 AM)

```
Every Monday at 9 AM, prepare a weekly review:
- Goals progress (compare to what I set last week)
- Key accomplishments
- Lessons learned
- Priorities for this week
- Anything I've been procrastinating on
```

### 4. Price Alerts (Hourly)

```
Every hour, check the Bitcoin price.
If it's above $X or below $Y, alert me on Telegram.
Otherwise, do nothing (don't message me for routine checks).
```

### 5. Mission Control Dashboard (Daily at 8 AM)

```
Every day at 8 AM, generate a Mission Control status dashboard and send it to Telegram:
- Agent health: gateway status, uptime, last heartbeat
- Token spend: yesterday's usage and month-to-date
- Active tasks: what's in progress and what's blocked
- Upcoming calendar: today's appointments and deadlines
- Unread priority messages: anything flagged as important
Format as a clean, scannable summary I can read in 30 seconds.
```

This gives you a single daily snapshot of everything that matters — a custom control room for your AI agent.

### 6. The Three Essential Cron Jobs (Baseline for Every Setup)

Before you build custom automations, set up these three maintenance cron jobs. Experienced users consider them non-negotiable:

| Cron Job | Schedule | What It Does |
|----------|----------|-------------|
| **Session cleanup** | Every 72 hours | Deletes bloated session files that slow down your agent. Old sessions accumulate and waste disk space. |
| **Daily security audit** | Every morning | Checks firewall status, Fail2ban, SSH configuration, open ports, Docker status. Catches drift before it becomes a vulnerability. |
| **Silent backups** | Every 2 hours | Runs `git push` on your workspace so you never lose config, memory, or skill files. If something breaks, you can always roll back. |

```bash
# Session cleanup - every 72 hours
npx openclaw cron add "session-cleanup" --schedule "0 0 */3 * *" --task "Clean up session files older than 7 days to free disk space. Remove bloated or orphaned session data."

# Daily security audit - every morning at 6 AM
npx openclaw cron add "security-audit" --schedule "0 6 * * *" --task "Run a security audit: check firewall status, fail2ban logs, SSH config, open ports, Docker status. Send results to Telegram. Alert immediately for any critical findings."

# Silent backups - every 2 hours
npx openclaw cron add "workspace-backup" --schedule "0 */2 * * *" --task "Git commit and push the workspace. Commit message: 'Auto-backup [timestamp]'. Do not message me unless the backup fails."
```

Set these up first. Everything else is a bonus.

### 7. News Monitoring (Every 4 hours)

```
Every 4 hours, check for major news in AI and technology.
Only alert me if something genuinely important happens.
Don't message me for routine news — save it for the morning brief.
```

### 8. Mission Statement Reverse Prompt (Daily or Multiple Times Daily)

One of the highest-value automations: give your agent a persistent mission statement, then schedule it to reverse-prompt itself against that mission.

**Step 1:** Add a mission statement to your `IDENTITY.md` or `AGENTS.md`:

```markdown
## Mission Statement
Build an autonomous organization of AI agents that does work for me and produces value 24/7.
```

**Step 2:** Schedule a cron that reverse-prompts against the mission:

```
Every day at 9 AM and 3 PM, review our mission statement and suggest:
"What is 1 task we can do right now to get closer to our mission statement?"
Consider what's been accomplished, what's in progress, and what opportunities exist.
Send the suggestion to Telegram.
```

Users report this generates tasks they never would have thought of — the agent sees patterns across your projects, goals, and conversations and proposes actions aligned with the bigger picture. You can even schedule it to proactively *execute* low-risk mission tasks overnight.

If you don't have a mission statement yet, ask your agent: *"Based on what you know about me and what we've worked on, what would be a great mission statement for us?"*

### 9. Executive Assistant Scheduling (Ongoing)

One of the most practical automations: teach your agent to manage your calendar like an executive assistant. Create a `SCHEDULING.md` file in your workspace with your scheduling rules:

```markdown
# Scheduling Rules

## Working Hours
- Days: Monday – Friday
- Hours: 9:00am – 5:00pm [your timezone]
- Hard boundaries: No meetings before 9am or after 5pm unless explicitly requested
- Fridays: Avoid scheduling after 3pm except as last resort

## Availability Rules
- Protect these events: Do not schedule over "Travel" or "Drive Kids to School"
- Travel buffer: No scheduling within 3 hours before flight departure or 1 hour after landing
- PTO: Don't book future meetings during PTO

## VIPs (Can Override "No Meetings" Blocks)
- [Name 1], [Name 2]
- Anyone with @[company].com email
- Any meeting flagged as "priority"

## Preferences
- Default video platform: Zoom (personal link: [your link])
- Prefer batching meetings back-to-back to create larger free blocks
- For West Coast contacts: prefer early afternoon ET slots (their morning)

## Special Instructions
- For investor meetings or anything unusual: ping via Telegram before confirming
```

Reference this file from `TOOLS.md` so the agent loads it when scheduling. Combined with email access (Module 06), you can CC your agent into email threads — "I'm copying in my assistant who can help us find a time" — and watch it negotiate scheduling according to your rules.

### 10. Gmail Pub/Sub and Webhook Automation

Beyond time-based triggers (cron) and periodic checks (heartbeats), OpenClaw supports **event-driven automation** through webhooks and Gmail Pub/Sub:

**Gmail Pub/Sub:** OpenClaw can subscribe to your Gmail inbox via Google Cloud Pub/Sub. Instead of polling your email on a timer, the system gets notified instantly when a new email arrives. This means your agent can respond to emails in real-time rather than waiting for the next heartbeat cycle.

Setup requires a Google Cloud project with Pub/Sub enabled and a Gmail API connection. Full guide: [docs.openclaw.ai/automation/gmail-pubsub](https://docs.openclaw.ai/automation/gmail-pubsub)

**Webhooks:** OpenClaw's gateway can receive incoming webhooks — HTTP requests that trigger agent actions. This lets you connect external services (GitHub, Stripe, Shopify, monitoring tools) that fire events your agent should respond to.

| Trigger Type | When to Use | Example |
|-------------|-------------|---------|
| Cron | Time-based, recurring | Morning brief at 7 AM |
| Heartbeat | Periodic check-in | Check for unread messages every 30 min |
| Gmail Pub/Sub | Real-time email events | Process incoming invoices immediately |
| Webhook | External service events | React to GitHub PR merges, Stripe payments |

The combination of cron + heartbeat + event-driven triggers gives your agent the ability to respond to virtually any situation without you having to be present.

---

## Session Lifecycle: What Happens When You Close the Chat

A common gotcha for new users: **sessions are stateful only while the chat window is open.** If you tell your agent to work on something, close your laptop, and come back the next morning — the work didn't happen.

When you close the TUI or disconnect, the session ends. When you reopen, you may get a summary, but the full context — the reasoning stack, the "where was I" — is gone.

**How to handle background work:**

- **Cron jobs** are the right tool for recurring background tasks (see above). They spin up fresh agent instances on a schedule, do one task, message you the results, and exit cleanly.
- **For one-off tasks,** don't try to maintain a long-running thinking session. Instead, break the work into discrete steps: have your agent complete step 1, save the output to a file, then use a cron or your next session to pick up from there.
- **Long-running sessions are expensive and unreliable.** They accumulate context (200K+ tokens), hallucinate more as context grows, and cost money with every message. Use `/compact` aggressively, or start `/new` sessions for new topics.

---

## Common Mistakes and Troubleshooting

| Mistake | Why It's a Problem | Fix |
|---------|-------------------|-----|
| Closing the chat and expecting work to continue | Sessions die on close — the agent stops working | Use cron jobs for background tasks; break one-off work into discrete saved steps |
| Setting heartbeats too frequent | Burns through tokens and money | Start at 60 minutes, decrease only if needed |
| Using Opus for heartbeats | Expensive for routine checks | Use Haiku 4.5 or Gemini Flash for heartbeats |
| Not testing automations | You won't know if they work until the next trigger | Always test immediately with "do it now" |
| Vague cron job instructions | AI doesn't know what you want | Be specific about format, content, and delivery channel |
| Too many alerts | Notification fatigue — you start ignoring them | Only alert for genuinely important things |
| Setting heartbeat to 0 and forgetting | Agent becomes completely passive | If you want proactive behavior, enable heartbeats |
| Cron jobs in wrong timezone | Tasks trigger at the wrong time | Verify your timezone: `timedatectl` |

### Fix Your Timezone

If cron jobs fire at the wrong time:

```bash
# Check current timezone
timedatectl

# Set to your timezone (example: US Central)
sudo timedatectl set-timezone America/Chicago
```

---

## Class Exercise: Create Your Morning Brief and One Custom Cron Job

### Part 1: Set Up the Morning Brief (15 minutes)

1. Edit `HEARTBEAT.md` with morning brief instructions
2. Set the heartbeat model to a cheap option (Haiku or Gemini Flash)
3. Restart the gateway
4. Test by asking your agent to generate the brief immediately
5. Verify it arrives on Telegram

### Part 2: Create One Custom Cron Job (10 minutes)

Choose one automation that would be useful for your life:
- Weekly review
- Daily task summary
- Price alert
- News monitoring
- Custom reminder

Set it up, test it, and verify it works.

### Part 3: Evaluate (5 minutes)

- Did the morning brief contain useful information?
- Was the format easy to read on your phone?
- What would you add or remove?
- Is the heartbeat interval appropriate for your needs?

---

## Key Takeaways

1. **Heartbeats make your agent proactive** — it checks in periodically and takes action without being asked
2. **Use cheap models for heartbeats** — Haiku 4.5 or Gemini Flash saves significant money
3. **The 55-minute trick** — set heartbeats to 55 minutes to hit Anthropic's prompt cache window, reducing system prompt costs by 90%
4. **The morning brief is the killer feature** — set it up first, customize it over time
5. **Cron jobs give you precise scheduling** — but each trigger costs tokens, so use cheap models and combine where possible
6. **Start conservative** — 55-60 minute heartbeats, minimal alerts; increase as needed
7. **Test everything immediately** — don't wait for the next trigger; ask your agent to run it now
8. **Set your timezone** — cron jobs use your system timezone

---

## Further Reading

- Source material in the `../Research/` folder:
  - `100 hours of OpenClaw lessons in 35 minutes.md` — Morning brief setup and mission control
  - `I made my OpenClaw 10x more powerful (seriously).md` — Cron job configuration and automation patterns
  - `How to Reduce OpenClaw Model Costs by up to 90% (Full Guide).md` — Heartbeat cost analysis, prompt caching, cron job optimization

---

## What's Next

Your agent is now proactive — sending you briefings, monitoring things, running scheduled tasks. But we've only scratched the surface of what's possible.

In **[Module 09: Advanced Concepts](Module-09-Advanced-Concepts.md)**, we'll cover power-user techniques: the brains-and-muscles model for cost optimization, model switching, multi-agent setups, and reverse prompting — letting your agent tell *you* what to build next.
