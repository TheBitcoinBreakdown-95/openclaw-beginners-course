# Module 06: Connecting Messaging Channels

## Learning Objectives

By the end of this module, you will be able to:

1. Create a Telegram bot and connect it to OpenClaw
2. Understand DM pairing mode and why it's critical for security
3. Explain the security implications of each messaging channel
4. Chat with your agent from your phone via Telegram
5. Optionally set up Discord and WhatsApp connections
6. Apply the security rules from Module 01 to your channel configuration

---

## Key Vocabulary

| Term | Definition |
|------|-----------|
| **Channel** | A messaging platform connected to OpenClaw — Telegram, Discord, WhatsApp, etc. |
| **Bot token** | A secret credential from the messaging platform that lets OpenClaw control a bot account |
| **DM pairing** | A security feature where unknown senders must enter a code before the bot responds to them — prevents random people from talking to your agent |
| **BotFather** | Telegram's official bot for creating and managing other bots — you use it to create your your agent bot |
| **Guild ID** | Discord's term for a server ID — a unique number identifying your Discord server |
| **Allowlist** | A list of specific users or phone numbers that are permitted to message your bot — everyone else is blocked |

---

## Which Channel to Set Up First

We recommend **Telegram** as your first (and possibly only) messaging channel. Here's why:

| Channel | Ease of Setup | Security | Features | Recommendation |
|---------|--------------|----------|----------|----------------|
| **Telegram** | Easy | Good (pairing mode) | Threading, chunking, cross-platform | **Start here** |
| **Discord** | Medium | Moderate (server isolation) | Rich formatting, reactions | Second option |
| **WhatsApp** | Medium | Moderate (phone number required) | Familiar, always have it | Requires second phone number ideally |
| **iMessage** | macOS only | N/A for us | N/A | Not available on Windows |
| **Slack** | Medium | Good (workspace isolation) | Channel-based | For work contexts |

---

## Setting Up Telegram (Recommended)

### Why Telegram

- Free to use, available on every platform (phone, desktop, web)
- Has native bot support (no hacks or workarounds needed)
- Supports threading and message chunking (long AI responses are split cleanly)
- DM pairing mode works well
- You can access it from any device without touching your OpenClaw laptop

### Step 1: Install Telegram

If you don't already have Telegram:

1. On your **phone**: Download "Telegram" from the App Store (iPhone) or Google Play (Android)
2. On your **computer**: Download from https://telegram.org/ or use the web version at https://web.telegram.org/
3. Create an account (requires a phone number)
4. Sign in on at least your phone — that's where you'll chat with your agent most often

### Step 2: Create a Bot with BotFather

Every Telegram bot is created through **BotFather** — Telegram's official bot manager.

1. Open Telegram on any device
2. In the search bar, type `@BotFather`
3. Click on **BotFather** (it has a blue checkmark — that's the official one)
4. Click **Start** or type `/start`

BotFather responds with a list of commands. You want `/newbot`.

5. Type `/newbot` and send it

BotFather asks:

```
Alright, a new bot. How are we going to call it?
Please choose a name for your bot.
```

6. Type the display name for your bot: `your agent`

(This is what appears as the bot's name in chats.)

BotFather asks:

```
Good. Now let's choose a username for your bot.
It must end in 'bot'. Like this, for example: TetrisBot or tetris_bot.
```

7. Choose a unique username ending in `bot`: `MyAssistantBot`

(This must be globally unique on Telegram. If it's taken, try variations like `MyAI_bot` or `My_2026_bot`.)

If the username is available, BotFather responds with:

```
Done! Congratulations on your new bot. You will find it at t.me/MyAssistantBot.
You can now add a description, about section and profile picture for your bot.

Use this token to access the HTTP API:
7123456789:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw

Keep your token secure and store it safely, it can be used by anyone
to control your bot.
```

8. **Copy the bot token** — the long string that looks like `7123456789:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw`

> **Security warning:** This token controls your bot. Anyone with this token can send messages as your bot. Treat it like a password. Don't share it, don't post it in screenshots, don't commit it to public repositories.

### Step 3: Use the Notepad Trick

Just like with your API key in Module 03:

1. Paste the bot token into **Notepad** first
2. Verify it's on a single line with no extra spaces or line breaks
3. Copy it from Notepad

### Step 4: Connect Telegram to OpenClaw

In your Ubuntu terminal (you can have the TUI and a regular terminal open at the same time):

```bash
npx openclaw config channels telegram
```

Or use the onboarding-style channel setup:

```bash
npx openclaw channels add telegram
```

The wizard will ask for your bot token. Paste it (using the clean copy from Notepad).

```
? Enter your Telegram bot token: 7123456789:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw
```

Press Enter.

**Expected output:**
```
✓ Telegram bot connected: @MyAssistantBot
✓ DM pairing mode: enabled (default)
```

### Step 5: Restart the Gateway

```bash
npx openclaw gateway restart
```

### Step 6: Start a Chat with Your Bot

1. Open Telegram on your phone
2. Search for your bot's username (e.g., `@MyAssistantBot`)
3. Click on it
4. Click **Start** or type `/start`

### Step 7: Complete DM Pairing

Because DM pairing mode is enabled (as it should be), the bot won't respond to you yet. Instead, it will send you a pairing code or ask you to verify through the gateway.

The exact pairing process depends on the OpenClaw version, but typically:

1. The bot sends you a message like: *"Pairing required. Your code: ABC123"*
2. In your OpenClaw TUI or dashboard, you'll see a notification about a new pairing request
3. Approve the pairing by entering the code or confirming in the dashboard
4. Once paired, the bot responds to your messages

**After pairing is complete,** try sending a message:

```
Hi there! This is a test from Telegram. Do you remember my name?
```

If your agent responds with your name (from the USER.md file you configured in Module 05), congratulations — everything is connected and working!

### Step 8: Optional — Set a Profile Picture

Make your bot feel more personal:

1. Go back to BotFather in Telegram
2. Type `/setuserpic`
3. Select your bot
4. Send a profile picture (you could use an image of a lion for your agent)

You can also set a description (`/setdescription`) and about text (`/setabouttext`).

---

## Security Configuration for Telegram

Now that Telegram is connected, let's make sure the security is right. Refer back to Module 01's 9-Point Checklist.

### Verify DM Pairing Mode Is Active

```bash
npx openclaw config channels telegram dm-mode
```

**Expected:** `pairing`

If it shows `open`, change it immediately:

```bash
npx openclaw config channels telegram dm-mode pairing
```

**Never set this to "open"** unless you have a very specific reason and understand the prompt injection risks.

> **Tip:** Run `npx openclaw doctor` after connecting any new channel. It will surface risky or misconfigured DM policies and other potential issues with your channel setup.

### What the Modes Mean

| Mode | What Happens | Security Level |
|------|-------------|----------------|
| **pairing** (recommended) | Unknown senders get a code; you must approve them | High |
| **allowlist** | Only pre-approved usernames/IDs can message the bot | Very high |
| **open** | Anyone can message the bot | **DANGEROUS** |
| **disabled** | Bot doesn't respond to any DMs | Maximum (but useless) |

### Set an Allowlist (Optional, Extra Secure)

If you want to lock it down even further, you can specify exactly who is allowed to message the bot:

```bash
npx openclaw config channels telegram allowlist add YOUR_TELEGRAM_USER_ID
```

To find your Telegram user ID:
1. Search for `@userinfobot` on Telegram
2. Start a chat with it
3. It will tell you your numeric user ID

---

## Setting Up Discord (Optional)

Discord is a solid second channel, especially if you already use it. The setup is more involved than Telegram.

### Step 1: Create a Discord Application

1. Go to https://discord.com/developers/applications in your browser
2. Click **New Application**
3. Name it "your agent" and click **Create**

### Step 2: Create a Bot User

1. In your application settings, click **Bot** in the left sidebar
2. Click **Reset Token** to generate a bot token
3. **Copy the token** (use the Notepad trick!)
4. Under **Privileged Gateway Intents**, enable:
   - **Message Content Intent** (required for the bot to read messages)

### Step 3: Generate an Invite Link

1. Click **OAuth2** in the left sidebar
2. Under **Scopes**, check `bot`
3. Under **Bot Permissions**, check:
   - Read Messages/View Channels
   - Send Messages
   - Read Message History
4. Copy the generated URL at the bottom
5. Open the URL in your browser and invite the bot to your **private server**

### Step 4: Get Your Server and Channel IDs

1. In Discord, go to **User Settings > Advanced > Developer Mode** and enable it
2. Right-click your server icon → **Copy Server ID** (this is the Guild ID)
3. Right-click the channel you want the bot in → **Copy Channel ID**

### Step 5: Connect to OpenClaw

```bash
npx openclaw channels add discord
```

Provide:
- Bot token (from Step 2)
- Guild ID (server ID from Step 4)
- Channel ID (from Step 4)

### Step 6: Restart and Test

```bash
npx openclaw gateway restart
```

Go to your Discord server and type a message in the configured channel.

### Discord Security Rules

- **Use a private server** — create a new server where only you are a member
- **Never add the bot to public servers** — anyone in the server could prompt inject
- **If using a shared server,** require @mentions so the bot only responds when directly addressed

---

## Setting Up WhatsApp (Optional)

WhatsApp integration uses your WhatsApp account — the bot sends messages as you, not as a separate bot account.

### Important Considerations

- WhatsApp requires a phone number
- **Strongly recommended:** Use a **second phone number** for the bot, not your personal number
  - This prevents confusion in your chat history
  - It cleanly separates bot conversations from personal ones
  - You can get a second number via Google Voice, a prepaid SIM, or similar services
- If you use your personal number, be aware that the bot can see your entire WhatsApp message history

### Step 1: Connect WhatsApp

```bash
npx openclaw channels login
```

Or:

```bash
npx openclaw channels add whatsapp
```

### Step 2: Scan QR Code

The terminal will display a QR code. Open WhatsApp on your phone:

1. Go to **Settings > Linked Devices**
2. Tap **Link a Device**
3. Scan the QR code shown in your terminal

### Step 3: Configure Allowlist

Set which phone numbers can communicate with the bot:

```bash
npx openclaw config channels whatsapp allowlist add +1234567890
```

(Replace with your actual phone number.)

### Step 4: Security Warning

Once WhatsApp is connected, the gateway has access to your WhatsApp account. It can:
- Read your messages
- Send messages as you
- Access your chat history

**This is why a second phone number is recommended.** If the bot is compromised, the damage is limited to the secondary account.

---

## Security Summary for All Channels

Here's the security checklist for messaging channels. Review this after setting up any channel:

| Check | Status |
|-------|--------|
| DM pairing mode is enabled (not "open") | [ ] |
| Only your user ID / phone number is in the allowlist | [ ] |
| Bot is NOT in any group chats | [ ] |
| Bot token is stored securely (not in public repos, not in screenshots) | [ ] |
| If using Discord: bot is in a private server with only you | [ ] |
| If using WhatsApp: ideally using a second phone number | [ ] |
| Gateway authentication token is set | [ ] |
| You've tested that the bot responds ONLY to you | [ ] |

---

## Dedicated Accounts and Credential Safety

### Create Dedicated Accounts for Your Bot

Never give the bot access to your primary personal accounts. Instead:

- **Email:** Create a fresh Gmail (e.g., `aslan.assistant@gmail.com`) specifically for the bot. Share your personal calendar as read-only to this account. If the bot account is ever compromised, your personal email is untouched.
- **GitHub:** If the bot needs code access, create a separate GitHub account with limited repository access — never your main account with elevated privileges.
- **Other services:** Same principle. The bot gets its own accounts. You share specific data with those accounts (read-only where possible).

### Email Safety Protocol

If you connect email to your agent, follow this protocol to prevent social engineering:

1. **Check inbox every 2 minutes** (via integration like `gog` library)
2. **Trusted senders** (a whitelist you maintain): can trigger actions (reply, schedule, file)
3. **All other senders**: read-only summary to you. The agent reads the email and tells you what it says, but **never auto-replies and never takes action** without your explicit approval
4. **Never forward, reply to, or act on emails from unknown senders** without asking you first

This is critical because email is a prime attack vector — an attacker can send a carefully crafted email containing prompt injection hidden in the body or subject line.

### Password Manager Integration

Store all bot credentials in a dedicated password manager vault — not in memory files, not in TOOLS.md, not in plain text anywhere:

- **1Password:** Create a vault called "Shared with OpenClaw." Set up a service account with access to this vault only. The agent retrieves credentials through the 1Password API, never writing them to disk.
- **Other managers:** Similar approach — dedicated vault, API access, minimal permissions.

The rule: **API keys and secrets belong in the password manager, not in your agent's files.** Memory files and TOOLS.md are plain text that could be exposed through data leakage.

---

## Group Chat Safety Rules

Let's be very clear about this, because it's the single biggest security mistake new OpenClaw users make:

### DO NOT put your OpenClaw bot in group chats.

Not "be careful." Not "use with caution." **Do not do it.**

Here's why:

1. **Every person in the group can send messages the bot reads** — every message is a potential prompt injection
2. **You can't control what other people type** — even well-meaning friends might accidentally trigger something dangerous
3. **The bot might respond with private information** — leaking data to everyone in the group
4. **Social engineering is easy in groups** — bad actors can build trust gradually and manipulate the bot

The only exception is if you have:
- Sandboxing enabled (Module 10)
- Require-mention enabled (bot only responds when @mentioned)
- Tool policies that restrict what the bot can do from that channel
- A very specific, controlled use case

For now (and probably forever for most users): **DMs only.**

---

## Common Mistakes and Troubleshooting

| Mistake | Why It's Wrong | Fix |
|---------|---------------|-----|
| Bot doesn't respond on Telegram | DM pairing not completed | Check the dashboard for pending pairing requests |
| "Unauthorized" error when connecting | Bot token is wrong or has formatting issues | Regenerate the token via BotFather, use Notepad trick |
| Bot responds to strangers | DM mode is set to "open" | Change to "pairing": `npx openclaw config channels telegram dm-mode pairing` |
| WhatsApp connection drops frequently | Session expired or phone disconnected | Re-scan QR code with `npx openclaw channels login` |
| Discord bot doesn't see messages | Message Content Intent not enabled | Enable it in Discord Developer Portal > Bot settings |
| Bot is very slow to respond via Telegram | Normal — API call + network latency | AI responses take 2-10 seconds. Longer responses take more time |
| Bot token accidentally shared | Anyone with the token can control the bot | Regenerate immediately via BotFather (`/revoke`) and update OpenClaw |

---

## Class Exercise: Connect Your First Channel

### Part 1: Set Up Telegram (15 minutes)

1. Create a bot with BotFather
2. Connect it to OpenClaw
3. Complete DM pairing
4. Send a test message from your phone

### Part 2: Verify Security (5 minutes)

1. Confirm DM pairing mode is active
2. Check that only your user ID is allowed
3. Verify the bot doesn't respond to messages from other Telegram accounts (if you have a second one to test with)

### Part 3: Have a Mobile Conversation (10 minutes)

From your phone via Telegram:

1. Ask your agent: *"What's your name and what do you know about me?"*
2. Ask your agent to create a to-do list for tomorrow
3. Ask your agent a question about a topic you're interested in

Notice how the experience feels different from the TUI. Telegram feels more like texting a knowledgeable friend. The TUI feels more like working at a terminal.

### Part 4: Security Test (5 minutes)

If you have a second Telegram account or a friend willing to help:

1. Have them search for your bot and try to message it
2. They should be blocked by DM pairing mode
3. Do NOT approve their pairing request (unless you intentionally want to give them access)

---

## Key Takeaways

1. **Telegram is the recommended first channel** — easy setup, good security, available everywhere
2. **DM pairing mode is your first line of defense** — never set it to "open"
3. **Never put your bot in group chats** — DMs only, always
4. **Bot tokens are secrets** — treat them like passwords (Notepad trick, don't share, regenerate if exposed)
5. **WhatsApp ideally needs a second phone number** — otherwise the bot has access to your personal messages
6. **Discord needs a private server** — don't add the bot to public servers
7. **Test security after setup** — verify the bot only responds to you
8. **You can always add more channels later** — start with one and expand when comfortable

---

## Further Reading

- [Telegram BotFather Documentation](https://core.telegram.org/bots#botfather) — Official bot creation guide
- [Discord Developer Portal](https://discord.com/developers/docs) — Bot creation and permissions
- [OpenClaw Security Guide](https://docs.openclaw.ai/gateway/security) — DM modes and channel security
- Source material in the `../Research/` folder:
  - `100 hours of OpenClaw lessons in 35 minutes.md` — Channel setup and security warnings
  - `OpenClaw Full Tutorial for Beginners – How to Set Up and Use OpenClaw (ClawdBot MoltBot).md` — WhatsApp and Discord setup walkthroughs
  - `Why Everyone's Buying a Mac Mini for Clawdbot.md` — Messaging security deep dive

---

## What's Next

Your agent is now mobile. You can chat from your phone, your laptop, or anywhere you have Telegram.

In **[Module 07: Skills and ClawHub](Module-07-Skills-and-ClawHub.md)**, we'll teach your agent new abilities. Skills are like apps for your agent — email management, image generation, note-taking, and thousands more from the community marketplace.

Time to level up.
