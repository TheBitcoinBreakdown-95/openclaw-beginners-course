# Module 11: Maintenance and Troubleshooting

## Learning Objectives

By the end of this module, you will be able to:

1. Follow a daily and weekly maintenance routine for OpenClaw
2. Monitor and optimize your token spending
3. Update OpenClaw safely
4. Back up and restore your workspace
5. Diagnose and fix the most common errors
6. Use the command cheat sheet for quick reference
7. Know where to get help from the community

---

## Key Vocabulary

| Term | Definition |
|------|-----------|
| **Token burn** | The rate at which your AI conversations consume tokens (and money) — a high token burn means expensive usage |
| **Context compaction** | Using `/compact` to summarize conversation history and reduce token usage |
| **Workspace backup** | A Git commit of your `~/.openclaw/` directory that captures your agent's current state |
| **Rolling update** | Updating OpenClaw while the gateway is running, with minimal downtime |

---

## Daily Maintenance Checklist

This takes about 2 minutes. Do it every day during your first month, then as needed.

```
DAILY CHECK (2 minutes)
========================
□ Gateway is running:      npx openclaw status
□ No errors in logs:       npx openclaw gateway logs (scan last few entries)
□ Token usage reasonable:  Check your provider dashboard
□ Morning brief was sent:  Check Telegram
□ No pending pairing reqs: Check dashboard for unknown senders
```

If everything checks out, you're good. If anything is off, see the troubleshooting section below.

---

## Weekly Maintenance Checklist

This takes about 10 minutes. Do it every weekend.

```
WEEKLY CHECK (10 minutes)
==========================
□ Security audit:          npx openclaw security audit --deep
□ Health check:            npx openclaw doctor
□ Fix any issues:          npx openclaw security audit --deep --fix && npx openclaw doctor fix
□ Review API spending:     Visit console.anthropic.com (or your provider)
□ Workspace backup:        cd ~/.openclaw && git add -A && git commit -m "Weekly backup $(date +%Y-%m-%d)"
□ Review core files:       Are USER.md and MEMORY.md still accurate?
□ Disable unused skills:   npx openclaw skills list (disable what you don't use)
□ Check disk space:        df -h (inside WSL2)
```

---

## What to Expect: Realistic Timelines

OpenClaw is powerful, but it doesn't deliver magic on day one. Setting realistic expectations will save you frustration.

### Level 1 — Works Immediately (minutes to set up)
- Basic conversation and Q&A
- File management and organization
- Simple web research
- Reading and summarizing documents
- Calendar and email checking (once connected)

### Level 2 — Requires Hours to Days of Setup
- Email automation with smart triage and drafting
- Trading bots and financial monitoring
- Social media management and content creation
- Code projects and software development
- Multi-step workflow automation

**The gap between YouTube demos and your first week is real.** The videos show polished setups that took days or weeks to build. Your first week will involve learning the system, experimenting with configurations, and encountering rough edges. APIs change, skills break, and maintenance is ongoing. Budget **2-4 hours per week** for setup and maintenance during your first month.

### ROI Reality Check

| Investment | Time |
|-----------|------|
| Initial technical setup | 20-30 minutes (technical users) to 1-2 hours (non-technical) |
| Learning and experimentation | 2-4 hours in the first week |
| Building each workflow | Hours to days, depending on complexity |
| Ongoing weekly maintenance | 10-30 minutes |

**The payoff:** Once configured, if OpenClaw saves you just 5 hours per week of manual work (email triage, research, scheduling, content creation), that's over **200 hours per year** — roughly 5 work weeks. At even a modest hourly value, the ROI is significant. The investment pays off. Just not on day one.

---

## Token Cost Monitoring and Optimization

### Understanding Your Costs

Your main cost is the AI model API. Here's how to track it:

**Anthropic:** Visit https://console.anthropic.com/ → Usage
**OpenAI:** Visit https://platform.openai.com/ → Usage
**Google:** Visit Google Cloud Console → Billing

### How to Reduce Costs

| Strategy | Savings | Effort |
|----------|---------|--------|
| **Enable prompt caching** | ~90% off system prompt costs | Low (one config change — see Module 09) |
| **Use Haiku for heartbeats** | $50-190/month | Low (one config change) |
| **Set heartbeat interval to 55 min** | Stays within cache window, massive savings | Low (one config change) |
| **Install ClawRouter** | Up to 90% overall via intelligent routing | Medium (see Module 09) |
| Use `/compact` regularly | ~67% per conversation | Low (just type the command) |
| Start new sessions for new topics | Prevents runaway token counts | Low (use `/new`) |
| Disable unused skills | Reduces per-message context (3K-14K tokens per call) | Low |
| Use Sonnet for routine tasks | 50-75% cheaper than Opus | Low (model switch) |
| Use budget models (Kimi K2.5, MiniMax M2.5) | Up to 95% cheaper than Opus | Low (provider config) |
| Set API spending limits | Prevents surprise bills | Low (one-time setup) |
| Cache web research as files | Avoid repeated searches | Medium |

> **The single biggest cost win:** Enable prompt caching + route heartbeats to Haiku + set heartbeat interval to 55 minutes. This alone can take heartbeat costs from ~$100+/month to ~$0.50/month. See Module 09 for full details.

### Setting API Spending Limits

**Anthropic:**
1. Go to console.anthropic.com → Settings → Billing
2. Set monthly usage limit (e.g., $50)
3. Set alert threshold (e.g., alert at $40)

**OpenAI:**
1. Go to platform.openai.com → Settings → Billing
2. Set monthly budget cap

**Recommendation:** Start with a $50/month limit. Increase only when you understand your usage patterns.

---

## Updating OpenClaw

OpenClaw receives regular updates. Here's how to update safely.

### Check Current Version

```bash
npx openclaw --version
```

### Release Channels

OpenClaw has three release channels:

| Channel | Stability | Use For |
|---------|-----------|---------|
| **stable** | Tested, production-ready | **Use this** — it's the right choice for everyone in this course |
| **beta** | New features, may have bugs | Only if you want early access and can tolerate breakage |
| **dev** | Cutting edge, likely to break | Contributors and testers only |

The changelog shows frequent breaking changes and security hardening between versions. Stick with stable and update deliberately, not automatically.

### Update

```bash
# Back up first!
cd ~/.openclaw && git add -A && git commit -m "Pre-update backup $(date +%Y-%m-%d)"

# Record current state (useful if you need to compare after update)
npx openclaw status --json > ~/pre-update-status.json

# Update OpenClaw
npx openclaw update
```

Or manually:

```bash
npm update -g @tinybox/openclaw
```

### After Updating

```bash
# Restart the gateway
npx openclaw gateway restart

# Verify everything works
npx openclaw status
npx openclaw doctor

# Run security audit (updates may change defaults)
npx openclaw security audit --deep
```

### If an Update Breaks Something

1. Check the OpenClaw release notes for known issues
2. Check the Discord for reports from other users
3. If necessary, roll back:
   ```bash
   npm install -g @tinybox/openclaw@[previous-version]
   npx openclaw gateway restart
   ```
4. Restore your workspace from Git backup if needed:
   ```bash
   cd ~/.openclaw && git checkout HEAD~1
   npx openclaw gateway restart
   ```

---

## Backup and Restore

### Creating Backups

Your workspace is the most important thing to back up. Everything else can be reinstalled.

**Quick backup (Git):**
```bash
cd ~/.openclaw && git add -A && git commit -m "Backup $(date +%Y-%m-%d)"
```

**Full backup (archive):**
```bash
tar -czf ~/openclaw-backup-$(date +%Y%m%d).tar.gz ~/.openclaw/
```

### Restoring from Backup

**From Git:**
```bash
cd ~/.openclaw
git log --oneline    # Find the commit you want to restore
git checkout [commit-hash]
npx openclaw gateway restart
```

**From archive:**
```bash
# Stop the gateway first
npx openclaw gateway stop

# Restore
tar -xzf ~/openclaw-backup-20260216.tar.gz -C /

# Restart
npx openclaw gateway start
```

### What to Back Up

| File/Directory | Priority | Contains |
|---------------|----------|----------|
| `~/.openclaw/workspace/` | Critical | Agent identity, personality, rules, memory |
| `~/.openclaw/config/` | Critical | Gateway config, API keys, channel settings |
| `~/.openclaw/workspace/skills/` | Important | Custom skills you built |
| `~/.openclaw/sessions/` | Nice to have | Conversation history |
| `~/.openclaw/logs/` | Nice to have | Activity logs |

---

## Debugging Mindset: Two Rules That Save Hours

### Rule 1: Run the Doctor First

When something feels broken, run the built-in diagnostics before investigating manually:

```bash
npx openclaw doctor --fix
```

This catches a surprising number of issues. As one community member put it: *"Half the 'my agent is stupid' complaints are actually 'my config is borked' problems."* The doctor command checks configuration integrity, file permissions, service health, and dependency versions — and auto-fixes what it can.

### Rule 2: One Workflow at a Time

If you set up email, calendar, Telegram, web scraping, and reporting all at once and everything breaks, you won't be able to tell which integration is failing.

**The pattern that works:** Get one workflow running end-to-end — running without you touching it, messaging you reliably, failing loudly instead of silently — before adding the next. Every new integration is a new failure mode. Master each one before stacking.

---

## Common Error Catalog

### Gateway Errors

**"Gateway not running"**
```
Symptom:  npx openclaw status shows "Stopped"
Cause:    Gateway crashed or wasn't started
Fix:      npx openclaw gateway start
Check:    npx openclaw gateway logs (look for error messages)
```

**"Port already in use"**
```
Symptom:  Gateway fails to start, error mentions port 18789
Cause:    Another process is using the port, or a zombie gateway process
Fix:      lsof -i :18789 to find the process, then kill it
          OR change port: npx openclaw config gateway port 18790
```

**"Gateway refuses to start — config schema rejection"**
```
Symptom:  Gateway won't boot at all, or exits immediately with a validation error
Cause:    openclaw.json contains an unknown key, invalid type, or malformed value.
          OpenClaw uses STRICT schema validation — one bad key blocks everything.
Fix:      1. Run: npx openclaw doctor (it will identify the invalid key)
          2. Fix the specific key in ~/.openclaw/openclaw.json
          3. Common causes: typos (e.g., "hearbeat"), deprecated fields after
             an update, or copy-pasted config from a different OpenClaw version
Prevention: Use "npx openclaw config" commands instead of editing JSON directly
```

**"Gateway keeps crashing"**
```
Symptom:  Gateway starts and stops repeatedly
Cause:    Bad configuration, corrupted state, or a faulty plugin
Fix:      npx openclaw gateway logs (check for specific errors)
          npx openclaw doctor fix
          If persistent: stop gateway, restore config from backup, restart
Note:     Plugins run in-process — a buggy plugin crash is a Gateway crash.
          Try disabling recently installed plugins if crashes started after install.
```

**"Session stuck on busy — agent won't respond"**
```
Symptom:  Agent shows "busy" status that never clears, messages get no response
Cause:    Session lock not released — usually from a failed compaction or
          an abort signal not being respected during compaction wait
Fix:      npx openclaw gateway restart (releases all locks and clears stuck sessions)
Prevention: Keep context manageable with /compact, avoid very large tool outputs
            that trigger emergency compaction
Diagnosis: npx openclaw status --json (shows session states including "busy")
```

### API Errors

**"API key invalid" / "Authentication failed"**
```
Symptom:  AI doesn't respond, error about invalid key
Cause:    Token formatting issue, expired key, or billing problem
Fix:      1. Check key at your provider's console
          2. Regenerate if needed
          3. Use Notepad trick when pasting new key
          4. npx openclaw config provider key [NEW_KEY]
```

**"Rate limit exceeded"**
```
Symptom:  AI stops responding temporarily
Cause:    Too many requests in a short period
Fix:      Wait 1-5 minutes, then try again
          If persistent: reduce heartbeat frequency
```

**"Insufficient credits"**
```
Symptom:  AI won't respond, billing error
Cause:    API account has no credits or hit spending limit
Fix:      Add credits at your provider's billing page
          OR increase spending limit
```

### Channel Errors

**"Telegram bot not responding"**
```
Symptom:  Messages sent on Telegram get no reply
Cause:    Gateway down, DM pairing incomplete, or token invalid
Fix:      1. Check gateway: npx openclaw status
          2. Check pairing: look for pending requests in dashboard
          3. Check token: verify in BotFather → /mybots → API Token
```

**"WhatsApp disconnected"**
```
Symptom:  WhatsApp messages not going through
Cause:    Session expired (happens periodically)
Fix:      npx openclaw channels login (re-scan QR code)
```

**"Discord bot offline"**
```
Symptom:  Bot shows as offline in Discord
Cause:    Gateway not running, or bot token expired
Fix:      1. npx openclaw status
          2. Regenerate bot token in Discord Developer Portal
          3. Update: npx openclaw config channels discord token [NEW_TOKEN]
```

### WSL2 Errors

**"WSL2 not running after reboot"**
```
Symptom:  Can't open Ubuntu terminal after Windows restart
Cause:    WSL2 didn't start automatically
Fix:      Open PowerShell: wsl --list --running
          If empty: open Ubuntu from Start menu (it auto-starts)
```

**"WSL2 very slow"**
```
Symptom:  Commands take forever inside WSL2
Cause:    Windows Defender scanning, RAM limits, or disk I/O
Fix:      1. Exclude WSL2 directory from Windows Defender
          2. Create/edit %USERPROFILE%\.wslconfig with memory limits
          3. Run: wsl --shutdown, then reopen Ubuntu
```

**"systemd not running"**
```
Symptom:  systemctl commands fail, daemon won't start
Cause:    systemd not enabled in wsl.conf
Fix:      sudo nano /etc/wsl.conf
          Add: [boot] on one line, systemd=true on next line
          Save, then: wsl --shutdown from PowerShell, reopen Ubuntu
```

### Performance Issues

**"AI responses very slow (30+ seconds)"**
```
Symptom:  Long delays before AI responds
Cause:    Network latency, provider overload, or very long context
Fix:      1. Test internet: ping google.com
          2. Check provider status page
          3. Use /compact to reduce context size
          4. Try switching to a faster model temporarily
```

**"Token counter climbing very fast"**
```
Symptom:  Token usage increasing rapidly per message
Cause:    Too many skills loaded, very long conversation, or large files in context
Fix:      1. /compact to compress conversation
          2. /new to start fresh session
          3. Disable unused skills
          4. Check if large files are being loaded unnecessarily
```

**"Agent gets confused or forgets mid-conversation" (Context Overflow Cascade)**
```
Symptom:  Agent loses track of what it was doing, gives contradictory answers,
          or repeats questions it already asked
Cause:    Context overflow cascade — a large tool output (file listing, browser
          snapshot, command result) pushed context past limits, triggering
          emergency compaction that aggressively summarized recent context
Fix:      1. Start a fresh session: /new
          2. Enable memory flush (Module 05) so important info is saved before
             compaction
          3. Add to AGENTS.md: "When reading files or running commands, limit
             output size. Use pagination for large results."
Prevention: Compact proactively before the context fills up. Avoid asking the
            agent to read entire large files at once.
```

---

## Useful CLI Commands Reference

### Gateway Management

```bash
npx openclaw status                    # Check gateway status
npx openclaw status --json             # Machine-readable status (useful for debugging stuck sessions)
npx openclaw gateway start             # Start the daemon
npx openclaw gateway stop              # Stop the daemon
npx openclaw gateway restart           # Restart the daemon
npx openclaw gateway logs              # View daemon logs
npx openclaw doctor                    # Health check
npx openclaw doctor fix                # Auto-fix health issues
```

### Security

```bash
npx openclaw security audit --deep     # Full security audit
npx openclaw security audit --deep --fix  # Audit and auto-fix
npx openclaw config gateway auth       # Check auth settings
npx openclaw config gateway token rotate  # Rotate gateway token
npx openclaw config sandbox mode [mode]   # Set sandbox mode
npx openclaw config tools deny [tool]     # Deny a tool
```

### Configuration

```bash
npx openclaw config                    # Open configuration
npx openclaw config gateway bind       # Check/set bind address
npx openclaw config gateway port       # Check/set port
npx openclaw config provider key       # Update API key
npx openclaw config heartbeat interval # Set heartbeat frequency
npx openclaw config heartbeat model    # Set heartbeat model
```

### Channels

```bash
npx openclaw channels add [channel]    # Add a messaging channel
npx openclaw channels login            # Re-authenticate channels
npx openclaw config channels [channel] dm-mode  # Check/set DM mode
```

### Skills

```bash
npx clawhub browse             # Browse ClawHub
npx clawhub search [query]     # Search skills
npx openclaw skills inspect [name]     # View skill details
npx clawhub install [name]     # Install a skill
npx openclaw skills list               # List installed skills
npx openclaw skills enable [name]      # Enable a skill
npx openclaw skills disable [name]     # Disable a skill
npx openclaw skills remove [name]      # Uninstall a skill
```

### Cron Jobs

```bash
npx openclaw cron list                 # List scheduled jobs
npx openclaw cron add [name] --schedule [cron] --task [desc]  # Add a job
npx openclaw cron remove [name]        # Remove a job
npx openclaw cron disable [name]       # Disable a job
```

### TUI Commands (Inside the Chat)

```
/help              # List all slash commands
/status            # Current session status
/compact           # Compress conversation to save tokens
/new               # Start new session
/exit              # Exit TUI
/model [name]      # Switch AI model
/think [level]     # Set thinking depth (off|minimal|low|medium|high|xhigh)
/config            # Open configuration
/skills browse     # Browse skills from TUI
```

---

## Quick Command Cheat Sheet (Print This)

```
╔════════════════════════════════════════════════════════════════════╗
║                    OPENCLAW QUICK REFERENCE                       ║
╠════════════════════════════════════════════════════════════════════╣
║                                                                   ║
║  START / STOP                                                     ║
║  npx openclaw gateway start       Start the daemon                ║
║  npx openclaw gateway stop        Stop the daemon                 ║
║  npx openclaw gateway restart     Restart the daemon              ║
║  npx openclaw tui                 Open chat interface             ║
║                                                                   ║
║  CHECK STATUS                                                     ║
║  npx openclaw status              Is the gateway running?         ║
║  npx openclaw doctor              Health check                    ║
║  npx openclaw gateway logs        View logs                       ║
║                                                                   ║
║  SECURITY                                                         ║
║  npx openclaw security audit --deep         Full audit            ║
║  npx openclaw security audit --deep --fix   Audit + fix           ║
║  npx openclaw config gateway token rotate   New token             ║
║                                                                   ║
║  INSIDE THE CHAT (TUI)                                            ║
║  /compact     Save tokens (compress history)                      ║
║  /new         Fresh conversation                                  ║
║  /model X     Switch AI model                                     ║
║  /think X     Thinking depth (off/low/medium/high/xhigh)          ║
║  /status      Session info                                        ║
║  /help        All commands                                        ║
║  /exit        Leave chat                                          ║
║                                                                   ║
║  EMERGENCY (INCIDENT RESPONSE)                                    ║
║  1. npx openclaw gateway stop     STOP the agent                  ║
║  2. Set bind to loopback          CLOSE access                    ║
║  3. Rotate all tokens/keys        FREEZE secrets                  ║
║  4. Review logs and sessions      INVESTIGATE                     ║
║  5. Fix, audit, restart           RESTORE                         ║
║                                                                   ║
╚════════════════════════════════════════════════════════════════════╝
```

---

## Skills vs. Agents: Know When to Use Which

As you grow your OpenClaw setup, you'll be tempted to create new agents for every task. Resist this urge.

**Use a skill when:**
- The task is triggered by a specific command or phrase
- It doesn't need its own persistent memory
- It doesn't run independently (it responds to you, not acts on its own)
- It's a capability, not an identity

**Use a separate agent when:**
- The task needs persistent memory separate from your main agent
- It needs its own identity (e.g., a trading bot with different risk parameters)
- It runs independently and proactively (monitoring, trading, research loops)
- It communicates with different people or through different channels

**Why this matters:** Every agent has its own context window, its own token costs, and its own maintenance overhead. Multiple agents = multiple costs. A skill that handles email formatting is much cheaper than a dedicated "email agent" running its own heartbeat and context. Default to skills. Only create a new agent when you genuinely need independence.

---

## Community Resources

When you're stuck:

### Official Resources

| Resource | URL | Best For |
|----------|-----|----------|
| Official Docs | https://docs.openclaw.ai/ | Configuration, features, API reference |
| GitHub | https://github.com/openclaw/openclaw | Bug reports, feature requests, source code |
| Security Guide | https://docs.openclaw.ai/gateway/security | Security configuration reference |

### Community

| Resource | Best For |
|----------|---------|
| OpenClaw Discord | Real-time help, community discussion, skill reviews |
| OpenClaw Reddit | Longer-form discussions, tutorials, showcases |
| ClawHub | Skills marketplace, community contributions |
| YouTube | Video tutorials (search "OpenClaw tutorial") |

### Getting Help

When asking for help, include:
1. What you were trying to do
2. The exact error message
3. Your OpenClaw version (`npx openclaw --version`)
4. Your OS (Windows 10 WSL2 in our case)
5. What you've already tried

---

## Course Completion Checklist

If you've followed this course from Module 00 to Module 11, verify you've accomplished everything:

### Foundation
- [ ] Understand what OpenClaw is and how it works (Module 00)
- [ ] Understand the security risks and have a threat model (Module 01)
- [ ] WSL2 installed with Ubuntu, systemd enabled, Node.js 22+ (Module 02)

### Installation
- [ ] OpenClaw installed and running as a daemon (Module 03)
- [ ] API key configured with spending limits (Module 03)
- [ ] Gateway running on loopback with authentication (Module 03)

### Configuration
- [ ] Brain dump completed, agent named and configured (Module 04)
- [ ] All 9 core files customized (Module 05)
- [ ] Workspace backed up with Git (Module 05)

### Communication
- [ ] Telegram connected with DM pairing mode (Module 06)
- [ ] Can chat with your agent from your phone (Module 06)

### Capabilities
- [ ] At least one skill installed from ClawHub (Module 07)
- [ ] At least one custom skill built (Module 07)
- [ ] Morning brief configured and tested (Module 08)
- [ ] At least one cron job set up (Module 08)

### Advanced
- [ ] Heartbeats using cheap model (Haiku/Gemini Flash) (Module 08/09)
- [ ] Understand brains-and-muscles model (Module 09)
- [ ] Tried reverse prompting at least once (Module 09)

### Security
- [ ] Docker installed, sandboxing enabled (Module 10)
- [ ] File permissions locked down (Module 10)
- [ ] Security audit passes with no critical issues (Module 10)
- [ ] Incident response plan documented (Module 01/10)

### Maintenance
- [ ] Know the daily and weekly maintenance routines (Module 11)
- [ ] Know where to find help (Module 11)
- [ ] Have this cheat sheet accessible (Module 11)

---

## Key Takeaways

1. **Maintenance is not optional** — daily checks (2 min) and weekly audits (10 min) prevent problems
2. **Monitor your spending** — set limits and check your provider dashboard weekly
3. **Back up religiously** — Git commit your workspace at least weekly
4. **Update carefully** — back up before updating, test after updating
5. **Keep the cheat sheet accessible** — print it, bookmark it, save it to your phone
6. **The community is your resource** — Discord, GitHub, and Reddit when you're stuck
7. **Security is ongoing** — run audits weekly, rotate secrets periodically, review your configuration as you add features

---

## Congratulations

You've completed the entire OpenClaw Beginner's Course.

You now have:
- **your agent** — a fully configured AI personal assistant running 24/7 on your Windows 10 laptop
- **Security** — sandboxing, tool policies, authentication, and an incident response plan
- **Communication** — Telegram (and optionally Discord/WhatsApp) for chatting from anywhere
- **Automation** — morning briefs, cron jobs, and proactive heartbeats
- **Skills** — from ClawHub and custom-built for your workflow
- **Knowledge** — how it all works, how to maintain it, and how to troubleshoot it

### What to Do Next

1. **Use it daily.** The more you use your agent, the more useful it becomes. Memory builds over time.
2. **Update your core files monthly.** Your goals change. Your agent should change too.
3. **Explore ClawHub.** New skills are published regularly.
4. **Try reverse prompting weekly.** Let your agent analyze your situation and suggest priorities.
5. **Join the community.** The OpenClaw Discord is full of people sharing tips and skills.
6. **Teach someone else.** Use this guide. The best way to learn is to teach.

### The Future

OpenClaw is evolving rapidly. New features, new skills, new models, new integrations. The foundation you've built in this course — understanding the architecture, security mindset, context engineering — will carry you through whatever comes next.

As we said in Module 00:

> You're not just running a chatbot. You're running infrastructure. Infrastructure for thought. Infrastructure for action. Infrastructure for a new kind of relationship between humans and AI.

Welcome to the future. You built it safely.

Now go use it.

---

## Further Reading

- [OpenClaw Official Documentation](https://docs.openclaw.ai/) — Complete reference
- [OpenClaw GitHub](https://github.com/openclaw/openclaw) — Source code and releases
- [OpenClaw Discord](https://discord.gg/openclaw) — Community support
- All source material in the `../Research/` folder
