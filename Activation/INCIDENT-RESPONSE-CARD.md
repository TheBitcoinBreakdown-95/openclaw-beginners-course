# Jinn — Incident Response Card

> **This is a living document.** It is updated every time a new secret, account, or permission is granted to Jinn. If this card is out of date, your incident response is incomplete.

**Last updated:** 2026-05-12 (Gmail access via gog/OAuth + GCP project jinn-gmail added)
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
| Gmail account password (gc@freedomlab.nyc) | Account password | GC's password manager (NOT on Jinn) | Change at myaccount.google.com while signed in as gc@freedomlab.nyc | 2026-05-11 |
| Gmail 2FA backup codes (gc@freedomlab.nyc) | 10 single-use backup codes | GC's password manager (NOT on Jinn) | Regenerate at myaccount.google.com > Security > 2-Step Verification > Backup codes | 2026-05-11 |
| Google OAuth client credentials (gog) | OAuth client_id + client_secret JSON | `~/.config/gogcli/credentials.json` (Jinn, 600) | Console > APIs & Services > Credentials > gog-jinn > Reset secret. Then `gog auth credentials set ~/.config/gogcli/credentials.json` | 2026-05-11 |
| gog OAuth refresh token (gc@freedomlab.nyc, gmail.modify scope) | OAuth refresh token | Encrypted file keyring: `~/.config/gogcli/keyring/` (Jinn, 600) | Revoke at myaccount.google.com > Security > Third-party access > Jinn > Remove. Then re-run `gog auth add gc@freedomlab.nyc --services=gmail --gmail-scope=full --gmail-no-send` | 2026-05-12 |
| GOG_KEYRING_PASSWORD | 32-char base64 password for gog's file keyring | `~/.config/gogcli/keyring-password` (Jinn, 600); exported from `~/.gog-env` | Rotate: generate new password, set `GOG_KEYRING_PASSWORD=<new>` and re-do `gog auth add` (re-encrypts the keyring) | 2026-05-12 |
| OPENCLAW_HOOK_TOKEN | 64-char hex bearer token for `/hooks/gmail` POSTs | `~/.config/gogcli/openclaw-hook-token` (Jinn, 600); also in `~/.openclaw/openclaw.json` `hooks.token` | Generate new with `openssl rand -hex 32 > ~/.config/gogcli/openclaw-hook-token`, then update `hooks.token` in `openclaw.json` and restart gateway | 2026-05-12 |
| Pub/Sub push token (unused, generated for future) | 64-char hex shared token | `~/.config/gogcli/pubsub-push-token` (Jinn, 600) | Orphan as of 2026-05-12 — Pub/Sub flow blocked by org policy; rotate same as hook token if Pub/Sub ever enabled | 2026-05-12 |
| gcloud user OAuth refresh token (gc@freedomlab.nyc, cloud-platform scope) | OAuth refresh token | `~/.config/gcloud/` (Jinn standard location) | `gcloud auth revoke gc@freedomlab.nyc` on Jinn, OR revoke at myaccount.google.com > Security > Third-party access > Google Cloud SDK | 2026-05-12 |

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
| gc@freedomlab.nyc (Google Workspace) | Google Workspace under freedomlab.nyc domain (admin: someone else) | Jinn-only mailbox — sole client; calendar/contacts compartmentalized from GC's personal account; 2FA enabled (authenticator app, not SMS) | 2026-05-11 |
| GCP project "jinn-gmail" | Google Cloud Platform (project ID: jinn-gmail, project number: 157619683458) | Owns OAuth client for gog, holds Pub/Sub topic (currently orphan, see below) | 2026-05-11 |

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
| Gmail read + modify scope (gc@freedomlab.nyc) | OAuth scope `gmail.modify` + `gmail.settings.basic/sharing` (NOT `gmail.send`) | Jinn can read inbox, search, manage labels, create drafts; cannot send (scope-restricted at Google level + `--gmail-no-send` flag at gog level) | 2026-05-12 |
| gcloud user auth (gc@freedomlab.nyc, full cloud-platform) | OAuth scope `cloud-platform` (full GCP project admin) | Lets Jinn manage Pub/Sub topics, IAM, etc. for jinn-gmail project; gcloud's stock OAuth client | 2026-05-12 |
| Gmail polling cron job | `*/2 * * * * /home/openclaw/bin/gmail-poll.sh` | Polls gc@freedomlab.nyc every 2 min, POSTs new mail to `/hooks/gmail` — alternative to blocked Pub/Sub push | 2026-05-12 |
| OpenClaw hooks endpoint enabled with `allowRequestSessionKey=true` | `hooks.enabled=true` + `allowRequestSessionKey=true` + `allowedSessionKeyPrefixes=["hook:", "hook:gmail:"]` in `~/.openclaw/openclaw.json` | Required for gmail hook mapping templated `sessionKey`; flagged DANGEROUS by OpenClaw security audit. Endpoint binds 127.0.0.1 only, token-gated | 2026-05-12 |
| Pub/Sub topic `gog-gmail-watch` (orphan, no subscription) | `projects/jinn-gmail/topics/gog-gmail-watch` | Created during wizard run before IAM binding failed; currently unused. Safe to leave or delete | 2026-05-12 |
| Org policy blockers (informational) | Workspace freedomlab.nyc enforces `iam.disableServiceAccountKeyCreation` and `iam.allowedPolicyMemberDomains` — blocks Pub/Sub push setup. Admin contact required to grant exception. | n/a | 2026-05-11 |

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
| Gmail polling logs | `~/.local/share/gmail-poll/poll.log` |
| Gmail polling state (last-seen + seen IDs) | `~/.config/gogcli/gmail-poll-state.json` |
| Hook delivery failures (incl. Telegram outbound bug fallout) | `~/.openclaw/delivery-queue/failed/` |
| gog authorizations (live) | `gog auth list` on Jinn |
| GCP project / billing | console.cloud.google.com (jinn-gmail) |

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
