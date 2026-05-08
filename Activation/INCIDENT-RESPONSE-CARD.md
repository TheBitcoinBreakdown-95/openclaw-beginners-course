# Jinn — Incident Response Card

> **This is a living document.** It is updated every time a new secret, account, or permission is granted to Jinn. If this card is out of date, your incident response is incomplete.

**Last updated:** 2026-05-03 (OpenAI Codex / ChatGPT Plus OAuth added)
**Owner:** GC
**Agent name:** Jinn
**Monthly API budget:** $50 (raise to $75 only after 2 weeks of monitoring)

---

## Emergency Steps

When something goes wrong, follow these five steps IN ORDER:

| # | Action | Command / Steps | Time |
|---|--------|----------------|------|
| 1 | **STOP** | `npx openclaw gateway stop` (or `pkill -f openclaw`) | Seconds |
| 2 | **CLOSE** | Set gateway to loopback, disable all messaging channels | Minutes |
| 3 | **FREEZE** | Rotate ALL secrets listed below | Minutes-Hours |
| 4 | **INVESTIGATE** | Check all investigation locations listed below | Hours |
| 5 | **RESTORE** | Fix root cause, run security audit, restart with tighter config | Hours-Days |

**Say it out loud: Stop. Close. Freeze. Investigate. Restore.**

---

## Secrets Registry

Every secret Jinn has access to. **Rotate ALL of these during Step 3 (FREEZE).**

| Secret | Type | Where Stored | How to Rotate | Date Added |
|--------|------|-------------|---------------|------------|
| Anthropic API key | API key (`sk-ant-...`) | `~/.openclaw/openclaw.json` | Revoke at console.anthropic.com > API Keys > delete old key > create new > re-run `npx openclaw onboard` | 2026-02-22 |
| Gateway token | Auth token | `~/.openclaw/openclaw.json` (gateway.token field) | Re-run `npx openclaw onboard` and leave token blank to auto-generate a new one | 2026-02-22 |
| Telegram bot token | Bot token | `~/.openclaw/openclaw.json` (channels.telegram.botToken) | Revoke via @BotFather > /revoke, create new token, update with `npx openclaw config set channels.telegram.botToken "NEW_TOKEN"` | 2026-02-24 |
| Google Gemini API key | API key | `~/.openclaw/openclaw.json` (models.providers.google.apiKey) | Revoke at aistudio.google.com > Get API Key > delete old key > create new > `npx openclaw config set models.providers.google.apiKey "NEW_KEY"` | 2026-03-01 |
| SSH private key (ed25519) | SSH key pair | `C:\Users\GC\.ssh\id_ed25519` (Windows) | Delete key pair from Windows (`~/.ssh/id_ed25519*`), remove public key from Ubuntu (`~/.ssh/authorized_keys`), generate new pair | 2026-03-04 |
| MiniMax API key (Coding Plan) | API key (`sk-cp-...`) | `~/.openclaw/agents/main/agent/auth-profiles.json` | Revoke at minimax.chat > API Keys > delete old key > create new > update auth-profiles.json | 2026-03-04 |
| OpenAI Codex OAuth tokens (ChatGPT Plus) | OAuth access + refresh tokens | `~/.codex/auth.json` (Codex CLI) AND `~/.openclaw/agents/main/agent/auth-profiles.json` (`openai-codex:giancarnevale@gmail.com` profile) | Sign out: `codex logout` removes `~/.codex/auth.json`. Then delete `openai-codex:giancarnevale@gmail.com` from `auth-profiles.json`. Or change ChatGPT password to invalidate refresh token. Re-add via `codex login --device-auth` then re-run import script. | 2026-05-03 |

---

## Accounts Registry

Every account created for or connected to Jinn.

| Account | Platform | Purpose | Date Connected |
|---------|----------|---------|---------------|
| GC's Tailscale account | Tailscale | Secure remote access to OpenClaw gateway | 2026-02-22 |
| GC's Anthropic account | Anthropic (console.anthropic.com) | API access for Jinn's AI model (Claude) | 2026-02-22 |
| Telegram bot (@Jinn) | Telegram (via @BotFather) | Messaging channel for Jinn | 2026-02-24 |
| GC's Google AI Studio account | Google (aistudio.google.com) | API access for Gemini 2.5 Flash (free tier) | 2026-03-01 |
| GC's ChatGPT account (giancarnevale@gmail.com) | OpenAI ChatGPT Plus | Codex OAuth subscription auth for openai-codex/gpt-5.5 model (used by all 4 cron jobs as of 2026-05-03) | 2026-05-03 |

---

## Access and Permissions Registry

Every permission, platform, and service Jinn can reach.

| Permission | Scope | Why Needed | Date Granted |
|-----------|-------|-----------|-------------|
| Tailscale network access | OpenClaw laptop (WSL2 + Windows) | Remote access to gateway from phone/other devices | 2026-02-22 |
| OpenClaw gateway daemon | Runs as systemd service in WSL | Keeps Jinn available even when terminal is closed | 2026-02-22 |
| Device pairing (TUI) | Local TUI client approved | Allows chatting with Jinn via `npx openclaw tui` | 2026-02-22 |
| QMD skill | ClawHub skill — memory search engine | Efficient token usage via semantic search over agent memory | 2026-02-22 |
| Bash shell completion | OpenClaw CLI | Tab-completion for openclaw commands in terminal | 2026-02-22 |
| Telegram channel | Messaging platform (allowFrom locked to GC's user ID) | DM access to Jinn via Telegram bot (pairing mode) | 2026-02-24 |
| SSH remote access (Claude Code → Jinn-HP) | Key-based SSH via Tailscale (100.124.64.28) | Claude Code can run commands on Ubuntu laptop remotely | 2026-03-04 |

---

## Investigation Locations

Where to look during Step 4 (INVESTIGATE):

| What to Check | Location / Command |
|--------------|-------------------|
| Gateway logs | `npx openclaw logs` |
| Session transcripts | `~/.openclaw/sessions/` |
| Anthropic API billing | console.anthropic.com/usage |
| Google AI Studio usage | aistudio.google.com (usage dashboard) |
| Messages sent by bot | Check Telegram chat history |
| File modifications | `ls -lt ~/.openclaw/` |
| Security audit | `npx openclaw security audit --deep` |

---

## Monthly Audit Checklist

Run this at least once a month, or after any configuration change:

- [ ] Run `npx openclaw security audit --deep`
- [ ] Review API spending vs. budget
- [ ] Review session transcripts for unexpected actions
- [ ] Verify DM pairing mode is still enabled
- [ ] Check file permissions on `~/.openclaw/` (should be 700)
- [ ] Verify all secrets in the registry above are still valid and not compromised
- [ ] Review any new skills installed since last audit

---

## Pre-Activation Security Decisions (Module 01)

These decisions were made BEFORE installation based on GC's threat model.

### Hard Rules — Non-Negotiable
- **No work access** — Everything from the fiat mining job is off limits. No work files, no work services, no work accounts. Ever.
- **No crypto on this machine** — Never store wallet files, seed phrases, or exchange API keys on the same machine Jinn runs on. Crypto is irreversible.
- **No email access** — Not until Jinn has been running for at least 1 month with reviewed transcripts
- **No social media posting** — Same as email. No outreach capabilities initially.
- **No group chats** — DM pairing mode only. No one besides GC messages Jinn.
- **Book in git** — Always commit before a Jinn writing session. Non-negotiable backup strategy.
- **Golden prompt for destructive actions** — "Give me a plan. Don't execute until I approve."

### Services NOT Connected Initially
- Email
- Social media accounts
- Browser control (web search tool only, not full browser)
- Crypto exchanges, wallets, or financial services
- Work-related services of any kind

### Files and Directories Off-Limits
- Anything work-related
- `~/.ssh/` — SSH keys
- `.env` files outside the OpenClaw directory
- Browser profile directories (personal profiles)
- Financial records, tax documents, banking files
- Crypto wallet files (should not exist on this machine)

### Services TO Connect (in order)
1. Telegram — first and only messaging platform at launch
2. Obsidian vault — read access for second brain (after initial setup is stable)
3. Calendar — read access for morning briefings (after Telegram is tested)
4. Web search — for morning briefings and research (with Claude Opus 4.6 only)

### Sandboxing Timeline
- Module 03: No sandboxing needed (basic install)
- Module 10: Enable sandboxing, especially for web research tasks (Use Case 3 is highest prompt injection exposure)

### Use-Case-Specific Mitigations
| Use Case | Highest Risk | Key Mitigation |
|----------|-------------|----------------|
| Daily planner / morning briefings | Poisoned web search during news gathering | Use Opus 4.6 for web tasks, review briefings for odd content |
| Bitcoin education / tool testing | Supply chain attack via malicious npm package | No crypto assets on this machine, review all installs |
| Learning assistant / AI news | Prompt injection from reading unknown web content | Opus 4.6 only, sandbox by Module 10, review transcripts |
| Book writing / voice refinement | Voice misinterpretation overwrites originals | Git version control, commit before every session |
| Side project / entrepreneurship | Unauthorized outreach to real people | No email/social, golden prompt for all external actions |

---

## Emergency Contacts

| Resource | Location |
|----------|----------|
| OpenClaw Discord | *(add during setup)* |
| Anthropic API security | console.anthropic.com |
| Telegram BotFather | @BotFather on Telegram |
