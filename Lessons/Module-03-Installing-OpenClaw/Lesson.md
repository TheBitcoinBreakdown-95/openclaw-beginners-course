# Module 03: Installing OpenClaw

## Learning Objectives

By the end of this module, you will be able to:

1. Run the OpenClaw installer inside WSL2
2. Walk through every step of the onboarding wizard with confidence
3. Choose an AI provider and configure your API key correctly
4. Avoid the token formatting gotcha that breaks most first installations
5. Configure the gateway for secure local operation
6. Install the daemon so OpenClaw runs 24/7 in the background
7. Verify that everything is working
8. Access the dashboard and TUI (Terminal User Interface)

---

## Key Vocabulary

| Term | Definition |
|------|-----------|
| **Gateway** | The core process of OpenClaw — it coordinates everything. Messages come in, the gateway sends them to your AI model, gets a response, and routes it back. It also manages scheduled tasks, memory, and tool execution |
| **Onboarding wizard** | The interactive setup process you run after installing OpenClaw — it walks you through configuration step by step |
| **API key** | A secret credential (like a password) that lets OpenClaw communicate with your AI provider (Anthropic, OpenAI, etc.) |
| **TUI** | Terminal User Interface — the text-based chat interface where you talk to your agent directly in the terminal |
| **Control UI** | The web-based dashboard for managing your OpenClaw setup — accessible in a browser |
| **Provider** | The company whose AI model you use — Anthropic (Claude), OpenAI (ChatGPT), Google (Gemini), etc. |
| **Daemon** | A background service that runs continuously without a terminal window. The OpenClaw daemon keeps the gateway running 24/7 |
| **Token** | Two meanings: (1) An authentication credential (API key, gateway token), and (2) the units that AI models use to process text (affects cost) |

---

## Before You Start

Make sure you've completed Module 02 and have:

- [ ] WSL2 with Ubuntu running
- [ ] systemd enabled
- [ ] Node.js 22+ installed
- [ ] Your Ubuntu terminal open

**Open your Ubuntu terminal now.** Everything in this module happens inside WSL2.

Also decide which AI provider you want to use. Here's the comparison:

### AI Provider Comparison

| Provider | Model | Monthly Cost | Strengths | Weaknesses |
|----------|-------|-------------|-----------|------------|
| **Anthropic** | Claude Opus 4.6 | ~$200/month | Most capable, warmest personality, best prompt injection resistance, recommended by OpenClaw creator | Most expensive, TOS gray area (see warning below) |
| **Anthropic** | Claude Sonnet 4.5 | ~$50-100/month | Good balance of capability and cost | Less capable than Opus |
| **OpenAI** | GPT-4 / GPT-5.2 Turbo | ~$20-200/month | Permissive about OpenClaw use, strong coding models | Less "warm" personality |
| **Google** | Gemini 2.5 Flash | Free (20 req/day) | Free tier available, great value without sacrificing quality | Limited free requests, personality varies |
| **Kimi** | K2.5 | Very cheap | Excellent bang-for-buck, latest open model generation | Newer, less community testing |
| **MiniMax** | M2.5 | ~$10/month | Extremely affordable, recently released, surprisingly powerful | Less capable for complex reasoning, weaker prompt injection resistance |

> **Our choice for this course:** Anthropic Claude. It's what we'll demonstrate, and it's what the OpenClaw creator recommends. If you want to save money or start free, Google Gemini 2.5 Flash is a solid alternative. For the absolute cheapest option with good quality, Kimi K2.5 and MiniMax M2.5 are the current community favorites.

### Important: Can You Use Your Claude Max/Pro Subscription?

**No.** Using your Claude Max or Pro subscription with OpenClaw is against Anthropic's Terms of Service. There are reports of people getting banned for this, and it appears Anthropic is enforcing it. Some people claim workarounds exist, but we don't recommend them — getting banned from Anthropic means losing access to all their products.

**The correct approach:** Use the Anthropic API with a separate API key and pay-as-you-go billing. This is what OpenClaw is designed for. In Module 09, we'll show you how to reduce these costs by up to 90% using intelligent model routing and prompt caching.

### The #1 Beginner Mistake: Pay-Per-Use Without Limits

> **Real story from the community:** One user ran 8 agents simultaneously on the pay-per-use Anthropic API without setting a spending limit. They burned through **$800 in less than a week** before realizing what happened. Another user hit 150 million tokens in a single day.

This is the most expensive mistake new users make, and it happens because pay-per-use billing has no natural ceiling. Every API call, every heartbeat, every cron job costs tokens — and tokens add up fast.

**How to protect yourself:**

| Protection | How | Priority |
|-----------|-----|----------|
| **Set a hard spending limit** | Anthropic Console → Settings → Usage Limits → set $20-50/month | Non-negotiable |
| **Start with one agent only** | Don't run multiple agents until you understand your token burn rate | Critical |
| **Monitor daily for the first week** | Check console.anthropic.com/usage every day | High |
| **Use cheap models for routine tasks** | Haiku for heartbeats, Sonnet for simple tasks (covered in Module 09) | High |

We'll walk through setting the spending limit in Step 4b below.

---

## Step 1: Install OpenClaw

In your Ubuntu terminal, run the official installation command:

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

**What this command does:**
- `curl` downloads the install script from openclaw.ai
- `-fsSL` means: fail silently on errors, show no progress bar, follow redirects
- `| bash` pipes the downloaded script directly into bash to execute it

**What you should see:**

```
  ___                    ____ _
 / _ \ _ __   ___ _ __ / ___| | __ ___      __
| | | | '_ \ / _ \ '_ \ |   | |/ _` \ \ /\ / /
| |_| | |_) |  __/ | | | |___| | (_| |\ V  V /
 \___/| .__/ \___|_| |_|\____|_|\__,_| \_/\_/
      |_|

Installing OpenClaw...
Checking Node.js version... ✓ v22.x.x
Installing OpenClaw packages...
...
Installation complete!

Run 'openclaw onboard' to get started.
```

> **If you see an error about Node.js version:** Go back to Module 02 Step 3 and make sure you installed Node.js 22+ with nvm.

> **If you see a network error:** Check your internet connection. WSL2 uses your Windows network, so if your Windows internet is working, WSL2 should too. If not, try `wsl --shutdown` from PowerShell and reopen Ubuntu.

---

## Step 2: Run the Onboarding Wizard

Now run the onboarding wizard with the daemon flag (so the gateway installs as a background service):

```bash
npx openclaw onboard --install-daemon
```

> **If `openclaw` gives "command not found":** The installer does not always add `openclaw` to your PATH. Use `npx openclaw` instead — this works every time. If npx says "Need to install the following packages," type `y` and press Enter. Expect 1-3 minutes of downloading before the wizard appears.

This starts an interactive wizard that will ask you a series of questions. We'll walk through **every single one**.

> **Important:** The wizard is interactive — it waits for your answer before proceeding. Take your time. If you make a mistake, you can usually re-run the wizard later with `npx openclaw config` (note: this re-runs the full wizard).

---

### Question 1: Gateway Type

```
? Gateway type:
  ❯ Local Gateway
    Remote Gateway
```

**Choose: Local Gateway**

This means OpenClaw runs on this machine. "Remote Gateway" is for connecting to an OpenClaw instance running on a different machine (like a VPS).

Press Enter to select **Local Gateway**.

---

### Question 2: Workspace Directory

```
? Workspace directory: (~/.openclaw)
```

**Choose: Accept the default (press Enter)**

The workspace is where OpenClaw stores everything — your agent's memory, configuration, session transcripts, skills, and more. The default `~/.openclaw/` is perfect.

> **Remember from Module 02:** This creates the directory in your Linux file system (`/home/openclaw/.openclaw/`), not on your Windows C: drive. This is correct and important for performance.

---

### Question 3: AI Model Provider

```
? Select your AI provider:
  ❯ Anthropic
    OpenAI
    Google
    MiniMax
    Open Router
    Custom
```

**Choose: Anthropic** (or your preferred provider)

We'll walk through the Anthropic setup since that's our recommendation. If you chose a different provider, the process is similar — you'll be asked for an API key.

---

### Question 4: API Key Setup

This is where most beginners get tripped up. Pay very close attention.

#### Getting Your Anthropic API Key

After selecting Anthropic, the wizard will guide you through getting your API key. Here's exactly what to do:

**Step 4a: Create an Anthropic Account (if you don't have one)**

1. Open your **Windows** web browser (not inside WSL)
2. Go to: https://console.anthropic.com/
3. Click **Sign Up** if you don't have an account
4. Create your account with email and password
5. Verify your email

**Step 4b: Add Billing**

1. In the Anthropic console, go to **Settings > Billing**
2. Add a payment method (credit card)
3. **Set a spending limit!** This is non-negotiable.
   - In the Anthropic console sidebar, click **Settings → Plans & Billing → Usage Limits**
   - Set the **Monthly spending limit** to **$20-50/month** for starters
   - Set a **notification threshold** at 50% of your limit (so you get an email at $10-25)
   - You can increase the limit later once you understand your token burn rate
   - Without a limit, the AI can burn through hundreds of dollars in days (this has happened to real users — see the $800 story above)

**Step 4c: Create an API Key**

1. In the Anthropic console, go to **Settings > API Keys**
2. Click **Create Key**
3. Give it a name like "OpenClaw"
4. Click **Create**
5. **Your API key appears.** It starts with `sk-ant-...` and is very long
6. **Copy it immediately** — you can only see it once!

> **Transferring your API key from another device:** If you created your API key on your phone or another computer, you can transfer it to your OpenClaw laptop by pasting it in an email to yourself (then open the email on the laptop), or by using Tailscale Taildrop if you set up Tailscale in Module 02 (right-click the file > "Send with Tailscale..." > pick this laptop).

#### The Token Formatting Gotcha (CRITICAL)

This is the number one installation error. It's mentioned in multiple community guides. Here's what happens and how to avoid it:

**The Problem:**
When you copy an API key from your browser, your clipboard sometimes includes hidden characters — line breaks, extra spaces, or formatting. If you paste this directly into the OpenClaw wizard, the key is corrupted and authentication fails. You'll get errors like "Invalid API key" or "Authentication failed" even though the key is correct.

**The Solution — The Notepad Trick:**

1. After copying the API key from the Anthropic console, **do NOT paste it into the terminal yet**
2. Open **Notepad** on Windows (Start > type "Notepad" > open it)
3. Paste the key into Notepad (`Ctrl + V`)
4. **Look at the key carefully:**
   - It should be **one single line** of text
   - No line breaks in the middle
   - No extra spaces at the beginning or end
   - It should start with `sk-ant-` and be a continuous string
5. If you see line breaks, delete them so the entire key is on one line
6. Select the entire key in Notepad (`Ctrl + A`)
7. Copy it (`Ctrl + C`)
8. Go back to your Ubuntu terminal
9. Paste it into the wizard (`right-click` to paste in most terminals, or `Ctrl + Shift + V`)

```
? Enter your Anthropic API key: sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Press Enter.

**If the key is accepted,** the wizard moves to the next question. You might see a message like:

```
✓ API key validated. Connected to Anthropic.
```

**If you see an error:**
- Double-check you used the Notepad trick
- Make sure you're pasting the API key, not the API key name
- Try generating a new key at console.anthropic.com
- Make sure billing is set up (keys don't work without billing)

---

#### Alternative: Getting a Google Gemini API Key (Free Option)

If you chose Google instead of Anthropic:

1. Go to: https://ai.google.dev/
2. Sign in with your Google account
3. Click **Get API key** or go to Google AI Studio
4. Create a new API key
5. Copy it and use the **same Notepad trick** before pasting

Gemini Flash 3 gives you 20 free requests per day — enough to try everything in this course without spending money.

#### Alternative: Getting an OpenAI API Key

If you chose OpenAI:

1. Go to: https://platform.openai.com/
2. Sign in or create an account
3. Go to **API Keys** in settings
4. Click **Create new secret key**
5. Copy it and use the **Notepad trick**
6. Add billing at **Settings > Billing**

---

### Question 5: Model Selection

After entering your API key, you may be asked which specific model to use:

```
? Select model:
  ❯ claude-opus-4-6
    claude-sonnet-4-5
    claude-haiku-4-5
```

**Choose: claude-opus-4-6** (recommended)

This is the most capable model and has the strongest prompt injection resistance. Yes, it's the most expensive — but as we discussed in Module 01, security is not the place to cut corners.

> **Cost-saving tip:** After you're comfortable with OpenClaw, you can configure cheaper models for routine tasks (like heartbeats) and keep Opus for important interactions. We'll cover this in Module 09.

---

### Question 6: Gateway Port

```
? Gateway port: (18789)
```

**Choose: Accept the default (press Enter)**

Port 18789 is the standard port for OpenClaw's gateway. Unless you have another service using this port (which is unlikely), the default is fine.

---

### Question 7: Gateway Bind

```
? Gateway bind:
  ❯ Loopback
    LAN
    Tailscale
    Custom
    Auto
```

**Choose: Loopback** (recommended)

This is a security decision. Here's what each option means:

| Option | Who Can Connect | When to Use |
|--------|----------------|-------------|
| **Loopback** | Only this computer | Default — most secure. Choose this. |
| **LAN** | Any device on your local network | If you want to access from another computer on your WiFi |
| **Tailscale** | Any device on your Tailscale network | If you set up Tailscale in Module 02 and want remote access |
| **Custom** | Whatever IP you specify | Advanced users only |
| **Auto** | Automatic detection | May be less secure — avoid |

**Loopback means:** Only programs running on this computer can connect to the gateway. No one on your WiFi, no one on the internet, no one at all — just you, on this machine. This is the most secure option and what the official docs recommend for local setups.

> **You can always change this later** by re-running: `npx openclaw config`

---

### Question 8: Tailscale Exposure

```
? Tailscale exposure: (Off)
```

**Choose: Off (press Enter)**

Even if you installed Tailscale in Module 02, keep this off for now. You can enable it later when you're confident your security is properly configured.

---

### Question 9: Gateway Token

```
? Gateway token: (leave blank to auto-generate)
```

**Choose: Leave blank (press Enter)**

The gateway token is the password for accessing the OpenClaw dashboard and Control UI. Auto-generating is fine — it creates a secure random token. You'll be shown the token after onboarding completes.

> **Important:** Save this token somewhere secure when it's displayed. You'll need it to log into the dashboard.

---

### Question 10: Chat Channels

```
? Configure chat channels?
  ❯ Skip for now
    WhatsApp
    Telegram
    Discord
    Slack
```

**Choose: Skip for now**

We'll set up Telegram in Module 06. It's better to get the basic gateway running and verified before adding messaging channels.

---

### Question 11: Skills

```
? Select skills to enable:
  ◻ Obsidian
  ◻ Apple Notes
  ◻ Google
  ◻ Twitter/Bird
  ◻ Himalaya (Email)
  ◻ Nano Banana (Image Generation)
  ...
```

**Choose: Skip all for now (press Enter without selecting any)**

Skills can be added at any time. We'll cover them in detail in Module 07. Adding skills now just adds complexity before you've verified the base installation works.

---

### Question 12: Hooks

```
? Enable hooks:
  ◻ BOOT.md (runs on startup)
  ◻ command logger (logs all commands)
  ◻ session memory (saves session context)
```

**Recommended: Enable BOOT.md and session memory**

- **BOOT.md**: Runs a file on every gateway startup — useful for morning briefings and routine checks
- **session memory**: Automatically saves context from conversations to memory — helps your agent remember between sessions
- **command logger**: Logs all commands — useful for security auditing (enable this if you want monitoring from day one)

Use the spacebar to toggle selections, then press Enter.

---

### Question 13: Service Runtime

```
? Service runtime:
  ❯ Node.js
```

**Choose: Node.js** (it's the only option)

Press Enter.

---

### Question 14: Install Gateway as Service

```
? Install gateway as background service? (Y/n)
```

**Choose: Y (press Enter)**

Since we used `--install-daemon`, this should already be selected. This makes the OpenClaw gateway start automatically when your computer boots and run continuously in the background.

---

### Question 15: Gateway Service Already Installed

If the wizard says:

```
Gateway service already installed. What would you like to do?
  ❯ Restart
    Keep running
    Stop
```

**Choose: Restart**

This just restarts the background service with your new configuration. No data is lost.

---

### Question 16: How Do You Want to Hatch Your Bot?

```
? How do you want to hatch your bot?
  ❯ Hatch now
    Do this later
```

**Choose: Do this later**

We'll test the TUI manually in Step 6 below. Hatching now can add confusion before you've verified the basic installation works.

---

### Question 17: Enable Bash Shell Completion

```
? Enable bash shell completion? (Y/n)
```

**Choose: Y (press Enter)**

This lets you press Tab to auto-complete OpenClaw commands in the terminal — handy for discovering commands you've forgotten.

---

## Step 3: Onboarding Complete

After answering all questions, the wizard finishes with output that looks something like this:

```
✓ Gateway configured
✓ AI provider connected (Anthropic - claude-opus-4-6)
✓ Daemon installed (systemd service)
✓ Gateway started

════════════════════════════════════════════════════
  OpenClaw is running!
════════════════════════════════════════════════════

  Dashboard:     http://127.0.0.1:18789/
  Gateway Token: abc123xyz... (save this!)

  To open the TUI:  openclaw tui
  To check status:  openclaw status
  To view logs:     openclaw logs

════════════════════════════════════════════════════
```

### Step 3b: Device Pairing (If Required)

After onboarding, the TUI or dashboard may require device pairing before it can connect. If you see "pairing required" when trying to use the TUI or dashboard:

1. List pending device requests:
```bash
npx openclaw devices list --json
```

2. Find the `requestId` for the pending entry — it will be a long string of letters and numbers.

3. Approve the device:
```bash
npx openclaw devices approve YOUR-REQUEST-ID-HERE
```

Replace `YOUR-REQUEST-ID-HERE` with the actual requestId from the previous command's output.

After approving, the TUI and dashboard should connect normally. If you don't see "pairing required," you can skip this step.

---

### Install QMD Immediately (Don't Skip This)

Before doing anything else, install QMD — the on-device search engine for your agent's memory files. Without QMD, your agent has to re-read entire files to find information, which wastes tokens on every single interaction.

```bash
npx clawhub install qmd
npx openclaw gateway restart
```

> **Note:** `clawhub` is a separate CLI for installing skills from ClawHub (the skill marketplace). If npx says "Need to install the following packages: clawhub," type `y` and press Enter. If the slug `qmd` isn't found, try `npx clawhub search qmd` first to find the correct slug.

QMD lets the agent search its own memory files efficiently. Community consensus: **install QMD from day one.** Users who installed it later reported significant token waste during the gap — every conversation without QMD costs more tokens than it needs to because the agent can't search, only read.

### Save Your Gateway Token

The gateway token is displayed here. **Save it immediately:**

1. Copy the token from the terminal
2. Save it somewhere secure — a password manager, a note on your phone, or a secure text file
3. You'll need this token to:
   - Access the web dashboard
   - Reconnect if you reset the gateway
   - Configure remote access

If you ever forget the token, you can retrieve it by checking your configuration file:
```bash
cat ~/.openclaw/openclaw.json
```

Look for the token field in the JSON output.

---

## Step 4: Verify the Installation

Let's make sure everything is working. Run each of these commands:

### 4.1 Check Gateway Status

```bash
npx openclaw status
```

**Expected output:**
```
Gateway Status: Running
Version: x.x.x
Uptime: 0h 2m
Port: 18789
Bind: loopback
Provider: anthropic (claude-opus-4-6)
Channels: none configured
```

The key thing is **Gateway Status: Running**. If it says "Stopped" or "Error," see troubleshooting below.

### 4.2 Check Gateway Health

```bash
npx openclaw doctor
```

**Expected output:**
```
Running health checks...
✓ Gateway process running
✓ API key valid
✓ Model reachable
✓ Workspace directory accessible
✓ Daemon service active
...
All checks passed.
```

If any checks fail, the doctor will suggest fixes. Run `npx openclaw doctor --repair` to apply automatic fixes.

### 4.3 Run Your First Security Audit

Remember the 9-Point Checklist from Module 01? Let's run the built-in security audit:

```bash
npx openclaw security audit --deep
```

**Expected output:**
```
Running deep security audit...

✓ Gateway authentication: configured
✓ Gateway bind: loopback (secure)
⚠ DM channels: none configured (OK for now)
✓ File permissions: checking...
  ⚠ Some files have excessive permissions
✓ Sandbox: not configured (configure in settings)
...

1 warning found. Run 'openclaw security audit --deep --fix' to fix.
```

If there are warnings about file permissions, fix them:

```bash
npx openclaw security audit --deep --fix
```

This automatically sets proper file permissions (700 for directories, 600 for files) on your OpenClaw workspace.

### 4.4 Set File Permissions Manually (If Needed)

If the audit didn't fix permissions automatically, or you want to do it yourself:

```bash
chmod 700 ~/.openclaw
chmod 600 ~/.openclaw/*.json
```

This ensures only your user account can read or write OpenClaw's configuration files.

---

## Step 5: Access the Dashboard (Control UI) — Optional on WSL

The Control UI is a web-based dashboard for managing OpenClaw. You can access it from your Windows browser. However, the dashboard has a known authentication bug on WSL — if it won't connect, skip it. The TUI is the primary interface and does everything you need.

### 5.1 Open the Dashboard

1. In Ubuntu, run: `npx openclaw dashboard --no-open`
2. It prints a URL with your token already included — copy the **full URL**
3. Paste it into your Windows browser (Chrome, Edge, Firefox)
4. If it loads, you're in!

**What you'll see:**
- A dashboard showing your gateway status
- Connected channels (none yet)
- Agent information
- Conversation history (empty for now)
- Configuration options

### 5.2 The Dashboard vs. The TUI

You have two ways to interact with OpenClaw:

| Interface | What It Is | Best For |
|-----------|-----------|----------|
| **Control UI** (Dashboard) | Web page at localhost:18789 | Configuration, monitoring, reviewing logs |
| **TUI** (Terminal UI) | Text chat in your terminal | Talking to your agent, running commands |

Most day-to-day interaction happens in the TUI. The dashboard is for management.

---

## Step 6: Open the TUI (Your First Chat)

This is the moment — you're about to talk to your AI agent for the first time.

```bash
npx openclaw tui
```

**What you should see:**

A full-screen terminal interface with:
- A message area at the top
- A text input area at the bottom
- Your agent name and model info
- A token counter

You might see a greeting from OpenClaw, or the cursor will be waiting for your first message.

### Your First Message

Type a simple greeting and press Enter:

```
Hello! My name is [your name]. What's your name?
```

**What should happen:**
- Your message appears in the chat
- After a moment (usually 1-5 seconds), the AI responds
- The response comes from your chosen model (Claude Opus 4.6 if you followed our recommendation)
- The token counter increments

If you get a response, **congratulations — OpenClaw is working!**

> **Don't have a full conversation yet.** We'll do that properly in Module 04. For now, just verify that the AI responds. Type `/exit` or press `Ctrl + C` to leave the TUI.

---

## Step 7: Verify the Daemon

Let's make sure the gateway runs as a background service (daemon) and will survive terminal closures and reboots.

### 7.1 Check the Service Status

```bash
npx openclaw gateway status
```

**Expected output:**
```
● openclaw-gateway.service - OpenClaw Gateway
     Loaded: loaded
     Active: active (running)
     ...
```

The key is **Active: active (running)**.

### 7.2 Test Terminal Independence

1. Close your Ubuntu terminal window completely (click the X)
2. Wait 10 seconds
3. Reopen Ubuntu from the Start Menu (type "Ubuntu" and click it)
4. Run: `npx openclaw tui`
5. The TUI should connect — if it does, the daemon is working

The daemon keeps the gateway running even with no terminal open. That's the whole point.

### 7.3 Useful Service Commands

Keep these handy:

```bash
npx openclaw gateway start       # Start the daemon
npx openclaw gateway stop        # Stop the daemon
npx openclaw gateway restart     # Restart the daemon
npx openclaw logs        # View daemon logs
npx openclaw gateway status      # Check if daemon is running
```

---

## Understanding What You Just Built

Let's take a step back and understand the architecture of what's now running on your machine:

```
┌─────────────── Your Windows 10 Laptop ───────────────┐
│                                                        │
│  ┌──────────── WSL2 (Ubuntu) ─────────────────────┐   │
│  │                                                 │   │
│  │  ┌─────────────────────────────────────────┐   │   │
│  │  │        OpenClaw Gateway (daemon)         │   │   │
│  │  │                                          │   │   │
│  │  │  Port: 18789 (loopback only)            │   │   │
│  │  │  Provider: Anthropic Claude Opus 4.6    │   │   │
│  │  │                                          │   │   │
│  │  │  ┌────────┐  ┌──────────┐  ┌────────┐  │   │   │
│  │  │  │ Memory │  │ Sessions │  │ Config │  │   │   │
│  │  │  └────────┘  └──────────┘  └────────┘  │   │   │
│  │  │                                          │   │   │
│  │  └──────────────────┬──────────────────────┘   │   │
│  │                     │                           │   │
│  │            ┌────────┴────────┐                  │   │
│  │            │ ~/.openclaw/    │                  │   │
│  │            │ (workspace)     │                  │   │
│  │            └─────────────────┘                  │   │
│  │                                                 │   │
│  └─────────────────────────────────────────────────┘   │
│                                                        │
│  ┌─────── Windows Browser ────────┐                    │
│  │ http://127.0.0.1:18789/       │                    │
│  │ (Dashboard / Control UI)       │                    │
│  └────────────────────────────────┘                    │
│                                                        │
└────────────────────────────────────────────────────────┘
                         │
                         │ API calls (encrypted)
                         ▼
                ┌────────────────┐
                │   Anthropic    │
                │   API Server   │
                │ (Claude Opus)  │
                └────────────────┘
```

Here's what's happening:
1. The **OpenClaw gateway** runs as a daemon inside WSL2
2. It stores everything in `~/.openclaw/` (the Linux file system)
3. When you chat (via TUI or dashboard), your messages go to the gateway
4. The gateway sends them to **Anthropic's API** and gets a response
5. The response comes back to you
6. The gateway also stores conversation history, memory, and configuration locally
7. Only the AI model calls leave your computer — everything else stays local

---

## Common Mistakes and Troubleshooting

### "openclaw: command not found"

**What happened:** The installation does not reliably add `openclaw` to your PATH. This is the most common issue.

**Fix:** Use `npx openclaw` instead of `openclaw` for all commands. This works every time. If npx says "Need to install the following packages," type `y` and press Enter.

If you want to try getting the bare `openclaw` command to work, try closing and reopening your Ubuntu terminal (Start Menu > Ubuntu), or run:

```bash
source ~/.bashrc
```

But `npx openclaw` is the most reliable approach and is what we recommend throughout this course.

### "API key invalid" or "Authentication failed"

**What happened:** Almost always the token formatting gotcha.

**Fix:**
1. Go back to the Anthropic console (console.anthropic.com)
2. Create a new API key
3. Copy it
4. Paste into Notepad — verify it's one single line, no line breaks
5. Copy from Notepad
6. Run: `npx openclaw config` to re-run the wizard and paste the clean key when prompted

### Gateway Won't Start — "Port already in use"

**What happened:** Something else is using port 18789.

**Fix:**
```bash
# Check what's using the port:
lsof -i :18789

# Change the port by re-running the wizard:
npx openclaw config
# When it asks for the gateway port, enter 18790

npx openclaw gateway restart
```

### "Connection refused" When Opening Dashboard

**What happened:** The gateway isn't running, or WSL2 networking isn't forwarding correctly.

**Fix:**
1. Make sure the gateway is running: `npx openclaw gateway status`
2. If it's not running: `npx openclaw gateway start`
3. Make sure you're using `http://` not `https://` in the browser URL
4. Try: `http://localhost:18789/` instead of `http://127.0.0.1:18789/`
5. If WSL2 networking is the issue, try from inside WSL: `curl http://127.0.0.1:18789/`

### Daemon Doesn't Start on Boot

**What happened:** systemd isn't enabled, or the service wasn't properly installed.

**Fix:**
1. Verify systemd is running: `systemctl is-system-running`
2. If not: go back to Module 02 Step 2 (enable systemd in wsl.conf)
3. If systemd is running, reinstall the service:
```bash
npx openclaw gateway install
npx openclaw gateway start
```

### AI Responses Are Extremely Slow

**What happened:** Could be network latency, a slow model, or API rate limiting.

**Fix:**
1. Check your internet: `ping google.com` (Ctrl+C to stop)
2. AI responses typically take 1-10 seconds. Opus is slower than Sonnet/Haiku
3. If it's consistently slow (30+ seconds), check the Anthropic status page: status.anthropic.com
4. Consider using a faster model (Sonnet 4.5) for testing: run `npx openclaw config` and select claude-sonnet-4-5 when prompted for the model

### "Insufficient credits" or "Rate limit exceeded"

**What happened:** Your API account doesn't have enough credits, or you've exceeded the rate limit.

**Fix:**
1. Check your Anthropic account at console.anthropic.com
2. Make sure billing is set up and your spending limit hasn't been reached
3. Wait a few minutes if rate limited (the limit resets)
4. Consider lowering your usage or using a cheaper model temporarily

### Token Counter Climbs Fast

**What happened:** This is normal. AI models charge per token (roughly per word). A typical conversation can use thousands of tokens per exchange.

**Fix (cost management):**
1. Use the `/compact` command in the TUI to compress your conversation history — this can reduce token usage by ~67%
2. Start new conversations with `/new` instead of continuing very long ones
3. Consider using Sonnet 4.5 or Haiku 4.5 for routine tasks
4. Monitor your spending at console.anthropic.com

### "Pairing required" in TUI or Dashboard

**What happened:** After onboarding, the TUI or dashboard may require device pairing before it can connect.

**Fix:**
```bash
npx openclaw devices list --json
```

Find the `requestId` for the pending entry (a long string of letters and numbers), then approve it:
```bash
npx openclaw devices approve <id>
```

Replace `<id>` with the actual requestId from the previous command's output.

### "Auth failed" or "Connect failed" on Dashboard

**What happened:** The dashboard can't authenticate with the gateway. This is a known issue on WSL.

**Fix:**
1. Run `npx openclaw dashboard --no-open` to get a tokenized URL
2. Copy the **full URL** and paste it into your Windows browser
3. Make sure you're using `http://` not `https://`
4. If it still won't connect, skip it — use the TUI instead (`npx openclaw tui`). The dashboard has a known auth bug on WSL that may be fixed in a future update.

Also try restarting the service with `npx openclaw gateway restart` and refreshing the browser.

---

## Class Exercise: Verify Your Installation

Complete this checklist. Every item should pass before you proceed to Module 04.

- [ ] **Installation:** `npx openclaw --version` shows a version number
- [ ] **Gateway running:** `npx openclaw status` shows "Running"
- [ ] **Health check:** `npx openclaw doctor` passes all critical checks
- [ ] **Security audit:** `npx openclaw security audit --deep` has no critical issues
- [ ] **File permissions:** `~/.openclaw/` is mode 700
- [ ] **Dashboard:** `http://127.0.0.1:18789/` loads in your browser
- [ ] **TUI works:** `npx openclaw tui` opens and you can send a message
- [ ] **AI responds:** Your AI model sends back a coherent response
- [ ] **Daemon works:** Gateway stays running after closing the terminal
- [ ] **Gateway token:** Saved somewhere secure

**Bonus:** Run `npx openclaw logs` and read the last few lines. You should see entries showing the gateway starting up and handling your test message.

---

## Key Takeaways

1. **Installation is one command** — `curl -fsSL https://openclaw.ai/install.sh | bash` — but the onboarding wizard is where the real setup happens
2. **The token formatting gotcha is real** — always paste API keys into Notepad first to check for hidden line breaks
3. **Start with loopback binding** — only this machine can connect, which is the most secure option
4. **Set API spending limits** before you start chatting — the AI burns through tokens faster than you expect
5. **The daemon keeps the gateway running 24/7** — even when you close the terminal or restart your computer
6. **Two interfaces: TUI for chatting, Dashboard for managing** — you'll use both
7. **Run the security audit after installation** — `npx openclaw security audit --deep --fix` catches permission issues and misconfigurations
8. **Save your gateway token** — you need it for dashboard access and can retrieve it from `cat ~/.openclaw/openclaw.json` if lost
9. **Everything stays local except API calls** — your data, memory, and conversations are stored on your machine; only the AI model requests go to the cloud

---

## Further Reading

- [OpenClaw Getting Started Guide](https://docs.openclaw.ai/start/getting-started) — Official installation docs
- [OpenClaw Windows Guide](https://docs.openclaw.ai/platforms/windows) — Windows-specific instructions
- [Anthropic Console](https://console.anthropic.com/) — API key management and billing
- Source material in the `../Research/` folder:
  - `100 hours of OpenClaw lessons in 35 minutes.md` — ghostdoc007's installation walkthrough
  - `OpenClaw Full Tutorial for Beginners – How to Set Up and Use OpenClaw (ClawdBot MoltBot).md` — FreeCodeCamp's detailed onboarding walkthrough
  - `I made my OpenClaw 10x more powerful (seriously).md` — UncleBasil's advanced configuration

---

## What's Next

OpenClaw is installed and running. Your gateway is active. Your AI model is connected. The daemon is keeping everything alive.

In **[Module 04: Your First Conversation](Module-04-Your-First-Conversation.md)**, you'll properly meet your agent. You'll learn how to introduce yourself, do a "brain dump" of your life and goals, name your agent, and learn the essential commands for daily use.

Your agent is awake. Time to say hello.
