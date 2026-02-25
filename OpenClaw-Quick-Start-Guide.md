# OpenClaw Quick Start Guide

## From Zero to a Running AI Assistant in 30 Minutes

OpenClaw is a self-hosted messaging gateway that turns a cloud AI model (like Claude or Gemini) into a persistent, always-on personal assistant you control. By the end of this guide, you will have an AI agent running 24/7 on your machine, accessible from your phone via Telegram, with proper security in place.

This guide is the streamlined version. For deep explanations and theory, see the full course in the `Lessons/` folder.

---

## What You Need

| Requirement | Details |
|-------------|---------|
| **Hardware** | 8 GB RAM minimum (16 GB recommended), 20 GB free disk space |
| **Operating System** | A dedicated laptop (we install Ubuntu), macOS, or Linux |
| **API Key** | Anthropic (paid, recommended) or Google Gemini (free tier available) |
| **Telegram** | Free account on your phone for mobile access |
| **Time** | 30-60 minutes of uninterrupted setup |

**Already running Ubuntu/macOS/Linux?** You can skip Phase 1. Install Node.js 22+ using nvm, then jump straight to Phase 2.

### Before You Connect: Prep Checklist

Create these accounts from any computer **before** your setup session. Everything else installs from the terminal once you are online.

- [ ] **Anthropic API account** — Go to https://console.anthropic.com/, sign up, add billing, and generate an API key. Save the key securely (password manager or secure note). It starts with `sk-ant-` and is shown only once.
- [ ] **Telegram account** — Install Telegram on your phone (App Store or Google Play) and create an account if you do not have one.
- [ ] **Set your API spending limit NOW** — While you are in the Anthropic console, go to Settings > Plans & Billing > Usage Limits and set a monthly limit of $20-50. Do this before installation, not after.
- [ ] **Read Module 01** — Understand the security risks before you install anything. See `Lessons/Module-01-Understanding-the-Risks/Lesson.md`.

That is it for the minimum viable setup. The dedicated laptop does not need anything pre-installed — Ubuntu, Node.js, and OpenClaw all install during Phase 1 and 2.

---

## Phase 1: Prepare Your Environment (60 minutes)

*This installs Ubuntu on a dedicated laptop. If you already have Ubuntu, macOS, or Linux running, skip to step 5.*

For the full walkthrough with screenshots and troubleshooting, see Module 02 in the `Lessons/` folder.

### 1. Download Ubuntu and Rufus (on your main computer)

- Download **Ubuntu 24.04 LTS** from https://ubuntu.com/download/desktop (~5.9 GB ISO)
- Download **Rufus portable** from https://rufus.ie (Windows) — or use Etcher on macOS

### 2. Create a bootable USB

- Insert a USB stick (12 GB or larger — **all data will be erased**)
- Open Rufus, select the Ubuntu ISO, select your USB drive, click Start
- Wait for it to finish (5-10 minutes)

### 3. Boot the laptop from USB

- Plug the USB into your dedicated laptop and power it on
- Press the BIOS/boot menu key repeatedly during startup (F12, F2, Esc, or Del — varies by manufacturer)
- Select the USB drive from the boot menu
- Choose **"Try Ubuntu"** first — test that WiFi works before installing

### 4. Install Ubuntu

- Once WiFi is confirmed working, double-click **"Install Ubuntu"** on the desktop
- Key choices: check **"Install third-party drivers"** (critical for WiFi), choose **"Erase disk and install Ubuntu"**
- Set username to `openclaw`, choose a password you will remember
- Wait for installation to complete, then restart when prompted and remove the USB

### 5. Update Ubuntu and install essentials

Open a terminal (`Ctrl+Alt+T`) and run:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl wget build-essential
```

### 6. Install Node.js 22

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
```

Close and reopen the terminal, then:

```bash
nvm install 22
nvm alias default 22
```

### 7. Verify

```bash
node --version
```

You should see `v22.x.x`. If you see `command not found`, close and reopen the terminal, then try again.

---

## Phase 2: Install OpenClaw (5 minutes)

All commands from here forward happen in your **Ubuntu terminal** (or native terminal on Mac/Linux).

### 1. Run the installer

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

### 2. Run the onboarding wizard

```bash
npx openclaw onboard --install-daemon
```

### 3. Walk through the wizard

The wizard asks a series of questions. Here are the recommended answers:

| Question | Answer | Why |
|----------|--------|-----|
| Gateway type | **Local Gateway** | Running on this machine |
| Workspace directory | **Accept default** (`~/.openclaw`) | Standard location |
| AI provider | **Anthropic** (or Google for free) | Best capability and prompt injection resistance |
| API key | Paste your key (see below) | Authentication for the AI model |
| Model | **claude-opus-4-6** | Most capable; use Gemini 2.5 Flash for free |
| Gateway port | **Accept default** (18789) | Standard port |
| Gateway bind | **Loopback** | Most secure -- only this machine can connect |
| Tailscale exposure | **Off** | Can enable later if needed |
| Gateway token | **Leave blank** (auto-generate) | Creates a secure random token |
| Chat channels | **Skip for now** | We will add Telegram in Phase 5 |
| Skills | **Skip all** | Add later once base install is verified |
| Hooks | **Enable boot.md and session memory** | Startup actions and cross-session context |
| Service runtime | **Node.js** | Only option |
| Install as service | **Yes** | Runs 24/7 as a background daemon |

### The Text Editor Trick (Critical for API Keys)

When you copy an API key from your browser, hidden characters (line breaks, extra spaces) can corrupt it. Before pasting any key into the wizard:

1. Open a text editor — type `gedit` in the terminal, or use any plain text editor
2. Paste the key there first (`Ctrl+V`)
3. Verify it is a single unbroken line with no extra spaces
4. Select all (`Ctrl+A`), copy (`Ctrl+C`)
5. Paste into the terminal (`Ctrl+Shift+V`)

This applies to API keys, bot tokens, and any credential you paste.

### Getting Your Anthropic API Key

1. Go to https://console.anthropic.com/ in your browser
2. Sign up or sign in
3. Go to **Settings > Billing** and add a payment method
4. Go to **Settings > API Keys** and click **Create Key**
5. Copy the key immediately (it starts with `sk-ant-` and is shown only once)
6. Use the text editor trick before pasting

**Free alternative:** Go to https://ai.google.dev/, sign in with Google, and create a Gemini API key. Gemini 2.5 Flash gives you 20 free requests per day.

### 4. Save your gateway token

After the wizard completes, it displays a gateway token. Save this somewhere secure (password manager, secure note). You need it for the web dashboard.

If you lose it, retrieve it with: `npx openclaw config get gateway.auth.token`

---

## Phase 3: Secure It Immediately (5 minutes)

Do this before anything else. These steps take two minutes and prevent the most common disasters.

### 1. Set an API spending limit

This is non-negotiable. Real users have burned $800+ in a single week without a limit.

1. Go to https://console.anthropic.com/
2. Navigate to **Settings > Plans & Billing > Usage Limits**
3. Set the **monthly spending limit** to **$20-50** to start
4. Set a notification threshold at 50% of your limit
5. Monitor your usage daily for the first week

### 2. Run the security audit

```bash
npx openclaw security audit --deep --fix
```

This checks file permissions, gateway authentication, and channel security, then auto-fixes what it can.

### 3. Lock down file permissions

```bash
chmod 700 ~/.openclaw
```

### 4. Install QMD (on-device search)

Without QMD, your agent re-reads entire memory files on every interaction, wasting tokens. Install it immediately:

```bash
npx clawhub install qmd
npx openclaw gateway restart
```

### 5. Set heartbeat to a cheap model

The heartbeat runs periodically in the background. Using your expensive main model for this wastes money:

```bash
npx openclaw config set agents.defaults.heartbeat.model "claude-haiku-4-5"
npx openclaw config set agents.defaults.heartbeat.every "55m"
```

### 6. Use a dedicated browser profile

If you enable browser access for your agent, **never** use your personal browser profile. Your personal browser has active sessions for email, banking, social media, and work tools — the AI can access all of them through your cookies.

Create a separate browser profile (Chrome: Settings > Profiles > Add Person, Firefox: `about:profiles`) and only log into services you explicitly want the AI to access in that profile.

### 7. Know your incident response plan

Before something goes wrong, know the five steps: **Stop. Close. Freeze. Investigate. Restore.**

```
1. STOP:        npx openclaw gateway stop  (or: pkill -f openclaw)
2. CLOSE:       Set gateway to loopback, disable all channels
3. FREEZE:      Rotate ALL secrets (API keys, bot tokens, passwords)
4. INVESTIGATE:  Check gateway logs, session transcripts, API billing
5. RESTORE:     Fix root cause, run security audit, restart with tighter config
```

See Module 01 for the full incident response plan and a fillable card to keep next to your computer.

### 8. Verify everything is running

```bash
npx openclaw status
npx openclaw doctor
```

You should see `Gateway Status: Running` and all health checks passing. If any checks fail, run `npx openclaw doctor --repair`.

---

## Phase 4: Meet Your Agent (5 minutes)

### 1. Open the TUI

```bash
npx openclaw tui
```

The Terminal User Interface is a full-screen chat. Your messages go at the bottom, responses appear above, and a token counter sits in the top bar.

### 2. Send a brain dump

Paste the following template (filled in with your own information) as your first message:

```
Hi! I want to set you up as my personal AI assistant. Here's who I am:

- Name: [Your name]
- Location: [City/Country]
- Occupation: [What you do]
- Communication style: [Direct/detailed/casual -- your preference]
- Goals: [2-3 things you're working toward right now]
- I want help with: [3-5 specific things: scheduling, research, writing, etc.]
- Rules: [e.g., "Always ask before executing commands," "Be direct, don't sugarcoat"]

Remember all of this and use it to help me effectively.
```

The more detail you provide, the more useful the agent becomes. You can always add more later.

### 3. Name your agent

```
From now on, your name is [Your Agent's Name]. You are my AI personal assistant.
```

Use any name you like. Pick something you will enjoy saying -- you will use it often.

### 4. Test with a few questions

- Ask it to summarize what it knows about you
- Ask it to suggest one thing you should focus on this week
- Ask a factual question you know the answer to (to gauge response quality)

### 5. Exit the TUI

```
/exit
```

The gateway continues running in the background.

---

## Phase 5: Connect Telegram (5 minutes)

This gives you mobile access to your agent from anywhere.

### 1. Install Telegram

Download Telegram on your phone (App Store or Google Play). Create an account if you do not have one.

### 2. Create a bot with BotFather

1. Open Telegram and search for `@BotFather` (has a blue checkmark)
2. Tap **Start**, then type `/newbot`
3. Enter a display name: `your agent` (or whatever you named your agent)
4. Enter a username ending in `bot`: `MyAssistantBot` (must be globally unique -- try variations if taken)
5. BotFather responds with a **bot token** (looks like `7123456789:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw`)
6. Copy this token

### 3. Connect to OpenClaw

Use the text editor trick to clean the token, then in your terminal:

```bash
npx openclaw channels add telegram
```

Paste the cleaned token when prompted.

### 4. Restart the gateway

```bash
npx openclaw gateway restart
```

### 5. Start chatting

1. Open Telegram on your phone
2. Search for your bot's username (e.g., `@MyAssistantBot`)
3. Tap **Start**
4. Complete the DM pairing process (the bot will send you a code or prompt you to verify through the dashboard)
5. Once paired, send a test message: `Hi there, this is a test from Telegram.`

### 6. Verify DM pairing mode

```bash
npx openclaw config get channels.telegram.dmPolicy
```

This must say `pairing`. If it says `open`, fix it immediately:

```bash
npx openclaw config set channels.telegram.dmPolicy "pairing"
```

**Never set this to "open."** Open mode allows anyone on Telegram to talk to your agent, which is a direct prompt injection risk. Similarly, never add your bot to group chats.

---

## Phase 6: Set Up Your Morning Brief (5 minutes)

A morning brief turns your agent from a chatbot into a proactive assistant. It sends you a daily summary without you having to ask.

### 1. Edit heartbeat.md

Open the heartbeat file:

```bash
nano ~/.openclaw/heartbeat.md
```

Add your morning brief instructions. For example:

```markdown
# Morning Brief (7:00 AM)

When triggered for the morning brief, send a message to Telegram with:

1. Today's date and day of week
2. Weather forecast for [your city]
3. Top 3 news headlines relevant to [your interests]
4. My priority tasks for today (check memory for ongoing projects)
5. Any reminders or follow-ups due today

Keep it concise -- 10-15 lines maximum.
```

Save and exit: `Ctrl+O`, `Enter`, `Ctrl+X`.

### 2. Schedule it

```bash
npx openclaw cron add "morning-brief" --schedule "0 7 * * *" --task "Send morning brief to Telegram"
```

The schedule `0 7 * * *` means 7:00 AM every day. Adjust the hour to your preference.

### 3. Test it now

In the TUI or Telegram, send:

```
Generate and send my morning brief now.
```

Verify it arrives on Telegram with the format you specified.

---

## You Are Done

Here is what you now have:

- An AI agent (running Claude or Gemini) operating 24/7 as a background service
- Accessible from your terminal via `npx openclaw tui`
- Accessible from your phone via Telegram
- A web dashboard at `http://127.0.0.1:18789/`
- API spending limits in place
- Security audit passed with proper file permissions
- QMD installed for efficient memory search
- Heartbeat running on a cost-effective model
- Morning briefs scheduled to your phone

### First Week Priorities

1. **Monitor your API spending daily** at console.anthropic.com -- get comfortable with your token burn rate before relaxing
2. **Expand your brain dump** -- add more context about your projects, preferences, and communication style over the first few days
3. **Learn `/compact`** -- when your token counter in the TUI passes 50,000, type `/compact` to compress your conversation and save tokens (roughly 67% reduction)
4. **Explore the workspace files** -- the markdown files in `~/.openclaw/` define your agent's identity, memory, and behavior. See Module 05 in the course for a deep dive.
5. **Try voice messages on Telegram** -- hold the mic button, talk naturally. Brain dumps and complex instructions are much faster by voice.

### What to Learn Next

| Topic | Where to Find It |
|-------|-----------------|
| Workspace and memory files | `Lessons/Module-05-Workspace-and-Memory/Lesson.md` |
| Skills and ClawHub | `Lessons/Module-07-Skills-and-ClawHub/Lesson.md` |
| Multi-agent setups | `Lessons/Module-08-Cron-Jobs-and-Heartbeats/Lesson.md` |
| Cost reduction (up to 90%) | `Lessons/Module-09-Advanced-Concepts/Lesson.md` |
| Sandboxing and Docker | `Lessons/Module-10-Security-Hardening/Lesson.md` |
| Security deep dive | `Lessons/Module-01-Understanding-the-Risks/Lesson.md` |

---

## Quick Reference

### Essential TUI Commands

| Command | What It Does |
|---------|-------------|
| `npx openclaw tui` | Open the chat interface |
| `/compact` | Compress conversation to save tokens (use at 50K+ tokens) |
| `/new` | Start a fresh conversation session |
| `/status` | Show current model, tokens used, gateway info |
| `/help` | List all available slash commands |
| `/exit` | Leave the TUI (gateway keeps running) |

### Service Management

| Command | What It Does |
|---------|-------------|
| `npx openclaw status` | Check if gateway is running |
| `npx openclaw gateway start` | Start the gateway daemon |
| `npx openclaw gateway stop` | Stop the gateway daemon |
| `npx openclaw gateway restart` | Restart the gateway daemon |
| `npx openclaw logs` | View gateway logs |
| `npx openclaw doctor` | Run health checks |
| `npx openclaw doctor --repair` | Auto-fix health check issues |

### Security

| Command | What It Does |
|---------|-------------|
| `npx openclaw security audit --deep` | Run a full security audit |
| `npx openclaw security audit --deep --fix` | Audit and auto-fix issues |
| `npx openclaw config get channels.telegram.dmPolicy` | Check Telegram DM security mode |
| `npx openclaw config get gateway.auth.token` | Retrieve your gateway token |

### Configuration

| Command | What It Does |
|---------|-------------|
| `npx openclaw config set models.default "[model]"` | Change AI model |
| `npx openclaw config set agents.defaults.heartbeat.model "[model]"` | Set heartbeat model |
| `npx openclaw config set agents.defaults.heartbeat.every "[N]m"` | Set heartbeat interval in minutes |
| `npx openclaw channels add [platform]` | Add a messaging channel |
| `npx clawhub install [skill]` | Install a skill from ClawHub |

---

## Troubleshooting Quick Fixes

| Problem | Fix |
|---------|-----|
| `openclaw: command not found` | Use `npx openclaw` instead, or run `source ~/.bashrc` and try again |
| API key invalid / authentication failed | Regenerate key, use the text editor trick, verify billing is set up |
| Gateway not running | `npx openclaw gateway start` |
| Dashboard won't load in browser | Use `http://127.0.0.1:18789/` (not `https`), run `npx openclaw dashboard --no-open` for a tokenized URL |
| Telegram bot not responding | Complete DM pairing, check `npx openclaw logs` for errors |
| `node: command not found` | Close and reopen the terminal, or run `source ~/.bashrc` |
| Token counter climbing fast | Use `/compact` frequently, start `/new` sessions for new topics |
| Spending higher than expected | Set model routing (Haiku for heartbeats, Sonnet for simple tasks), check `console.anthropic.com/usage` daily |

---

*This guide covers the essentials. For the full course with detailed explanations, security theory, workspace configuration, cost optimization, multi-agent setups, and sandboxing, see the modules in the `Lessons/` folder.*
