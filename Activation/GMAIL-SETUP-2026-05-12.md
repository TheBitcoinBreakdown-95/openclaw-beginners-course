# Jinn Gmail Setup — Session Document

**Built:** 2026-05-11 evening through 2026-05-12 early morning EDT
**Status:** Polling pipeline live; Telegram delivery to user blocked by separate OpenClaw bug
**Author of this doc:** Claude Code session

---

## TL;DR for the next session

Jinn now has read + draft access to `gc@freedomlab.nyc` (Google Workspace mailbox dedicated to Jinn). Every 2 minutes a cron job on Jinn polls Gmail for new messages and POSTs them to OpenClaw's `/hooks/gmail` endpoint, which queues an agent run.

**What you have:**
- gc@freedomlab.nyc fully wired up for read + drafts
- Polling pipeline working end-to-end (verified with 2 real Google security-alert emails)
- All credentials documented in `Activation/INCIDENT-RESPONSE-CARD.md`

**What's NOT working:**
- The final notification step: OpenClaw's Telegram outbound delivery is broken (pre-existing 2026.5.2 bug). Agent summaries land in `~/.openclaw/delivery-queue/failed/` instead of pinging GC on Telegram.

**What's deliberately deferred:**
- `gmail.send` scope (autonomous send) — needs explicit decision before enabling
- Calendar + Contacts scopes — fully scoped to gc@freedomlab.nyc only (no access to personal data)
- Pub/Sub push (near-instant notifications) — blocked by two Google Workspace org policies; admin email drafted

---

## Architecture (what runs where)

```
                      ┌──────────────────────────────────────────┐
                      │           Jinn (Ubuntu 24.04)            │
                      │     Tailscale: 100.124.64.28             │
                      │                                          │
                      │  cron every 2 min                        │
                      │  └─► gmail-poll.sh                       │
                      │      └─► gmail-poll.py                   │
gmail.googleapis.com  │          └─► gog gmail messages search   │
   (gc@freedomlab.nyc)│              (uses OAuth refresh token   │
   ◄─────read─────────┤               in encrypted file keyring) │
                      │                                          │
                      │  For each new msg:                       │
                      │  └─► HTTP POST /hooks/gmail              │
                      │      (Authorization: Bearer <token>)     │
                      │      └─► OpenClaw gateway (port 18789)   │
                      │          └─► hook mapping fires          │
                      │              └─► agent run queued        │
                      │                  └─► LLM analyzes email  │
                      │                      └─► delivery tries  │
                      │                          channel="last"  │
                      │                          ❌ Telegram out  │
                      │                          broken in 2026  │
                      │                          .5.2 → file in  │
                      │                          delivery-queue/ │
                      │                          failed/         │
                      └──────────────────────────────────────────┘
```

---

## Files we touched

### On Jinn (`openclaw@100.124.64.28`)

| Path | Purpose | Perms |
|---|---|---|
| `~/bin/gog` | gogcli v0.16.0 binary (installed from openclaw/gogcli release) | 755 |
| `~/google-cloud-sdk/` | Google Cloud SDK 567.0.0 (user-local install, no sudo) | 755 |
| `~/bin/gmail-poll.py` | Polling script — queries gog, POSTs to hooks | 755 |
| `~/bin/gmail-poll.sh` | Wrapper: sources `~/.gog-env`, runs poll.py | 755 |
| `~/bin/update_openclaw_hooks.py` | Idempotent config patcher (kept for re-runs) | 755 |
| `~/.config/gogcli/credentials.json` | OAuth client (Desktop app type) for jinn-gmail project | 600 |
| `~/.config/gogcli/keyring/` | gog's encrypted file keyring (refresh tokens live here) | 700 |
| `~/.config/gogcli/keyring-password` | Password for the file keyring (45 char base64) | 600 |
| `~/.config/gogcli/openclaw-hook-token` | 64-char hex bearer token for /hooks/gmail | 600 |
| `~/.config/gogcli/pubsub-push-token` | 64-char hex — generated but unused (Pub/Sub blocked) | 600 |
| `~/.config/gogcli/gmail-poll-state.json` | Polling state: last_seen_internal_date + seen_ids ring buffer | 600 |
| `~/.local/share/gmail-poll/poll.log` | Polling activity log | 644 |
| `~/.gog-env` | Sources GOG_KEYRING_BACKEND/PASSWORD; sourced from `.bashrc` top + `.profile` tail | 600 |
| `~/.openclaw/openclaw.json` | Modified: added `hooks.enabled`, `hooks.token`, `hooks.path`, `hooks.presets=["gmail"]`, `hooks.mappings`, `hooks.allowRequestSessionKey=true`, `hooks.allowedSessionKeyPrefixes=["hook:","hook:gmail:"]` | 600 |
| `~/.openclaw/openclaw.json.pre-gmail-hooks` | Pre-edit backup of openclaw.json | 600 |
| `crontab -l` | New entry: `*/2 * * * * /home/openclaw/bin/gmail-poll.sh` | n/a |

### In the repo (`Clawdbot aka Openclaw/`)

| Path | Purpose |
|---|---|
| `.jin-staging/update_openclaw_hooks.py` | Source of truth for the openclaw.json hook patch — re-runnable |
| `.jin-staging/gmail-poll.py` | Source of truth for the poller |
| `.jin-staging/gmail-poll.sh` | Source of truth for the wrapper |
| `Activation/INCIDENT-RESPONSE-CARD.md` | Updated with 10 new entries (5 secrets, 2 accounts, 3 access perms + 1 informational) |
| `Activation/GMAIL-SETUP-2026-05-12.md` | This file |

Note: `.jin-staging/` is local; the Jin-staging directory was already in use as a staging area for files going to Jinn. Per the memory `feedback_outofband_drift`, anything edited directly on Jinn but not back-ported here gets clobbered on next push. **The three scripts in `.jin-staging/` are the canonical versions; do not edit `~/bin/*.py` on Jinn without back-porting.**

---

## GCP project

| | |
|---|---|
| Project name | `jinn-gmail` |
| Project ID | `jinn-gmail` |
| Project number | `157619683458` |
| Console URL | https://console.cloud.google.com/home/dashboard?project=jinn-gmail |
| Organization | freedomlab.nyc (Workspace — admin is someone else) |
| APIs enabled | Gmail API, Cloud Pub/Sub API |
| OAuth consent screen | External, Testing mode, single test user (gc@freedomlab.nyc) |
| OAuth client | "gog-jinn" (Desktop app type) |
| Pub/Sub topic | `projects/jinn-gmail/topics/gog-gmail-watch` — created but no subscription (orphan) |
| Service account | `jinn-pubsub@jinn-gmail.iam.gserviceaccount.com` — created with Pub/Sub Admin + Service Usage Consumer roles; **JSON key download blocked by org policy** |

---

## OAuth scopes currently granted

For `gc@freedomlab.nyc` to `gog` client:
- `email`, `openid`, `userinfo.email` (identity)
- `gmail.modify` (read, label, draft — **NOT send**)
- `gmail.settings.basic` + `gmail.settings.sharing`

For `gc@freedomlab.nyc` to `gcloud` client:
- `cloud-platform` (full GCP project admin)
- + standard openid/email/profile

**Importantly, no calendar or contacts scopes yet.** Adding them is a single `gog auth add` re-run with `--services=gmail,calendar,contacts`.

---

## The two org policies blocking Pub/Sub push

| Constraint | What it blocks | Reference / Fix |
|---|---|---|
| `iam.disableServiceAccountKeyCreation` | Downloading JSON keys for service accounts | Tracking number c3800960390272819. Need admin to disable globally OR grant project-level exception for jinn-gmail. |
| `iam.allowedPolicyMemberDomains` | IAM bindings to principals outside freedomlab.nyc org (incl. Google's own `gmail-api-push@system.gserviceaccount.com`) | Need admin to disable globally OR grant project-level exception. |

Admin email drafted in conversation (request both project-level exceptions for jinn-gmail only).

When admin grants exceptions, the Pub/Sub push setup is one wizard run:
```bash
openclaw webhooks gmail setup \
  --account gc@freedomlab.nyc \
  --project jinn-gmail \
  --hook-token "$(cat ~/.config/gogcli/openclaw-hook-token)" \
  --push-token "$(cat ~/.config/gogcli/pubsub-push-token)"
```
Then disable the polling cron (one line) and we're on push.

---

## Decisions made (with rationale)

1. **Full compartmentalization between Jinn and GC's personal Google account.**
   - GC's personal calendar is NOT shared with Jinn. Jinn books on its own gc@freedomlab.nyc calendar and CC's GC's personal address for invites.
   - GC's personal contacts not exposed; Jinn maintains its own contact book.
   - Rationale: blast radius — if Jinn's OAuth token leaks, attacker sees Jinn's data, not GC's personal life.

2. **Gmail scope: `gmail.modify` + `--gmail-no-send` flag, not full send.**
   - `gmail.modify` grants read/label/archive/draft but Google does not include send in this scope.
   - The gog `--gmail-no-send` flag is belt-and-suspenders (refuses send at tool layer even if scope expanded).
   - Rationale: course Module 06 line 359 — "never auto-replies and never takes action without explicit approval." Drafts + manual click is the trust-building step before autonomous send.

3. **Polling, not Pub/Sub push.**
   - Org policy block left two paths: polling (works tonight) or wait for admin (uncertain timeline).
   - Trade-off: 1-2 min latency vs near-instant. Acceptable for a personal AI assistant.
   - Rationale: don't block on external dependency for a feature where latency doesn't matter.

4. **`hooks.allowRequestSessionKey=true` accepted as a known risk.**
   - OpenClaw flags this dangerous because it lets external POST payloads influence session keys.
   - Mitigated by: `allowedSessionKeyPrefixes=["hook:", "hook:gmail:"]`, token-gated endpoint, 127.0.0.1-only binding.
   - Rationale: needed for the templated `sessionKey: hook:gmail:{{messages[0].id}}` which dedupes per-email-id agent runs.

5. **gcloud auth via user OAuth (interactive PTY wrapper), not service account key.**
   - Service account key path blocked by `iam.disableServiceAccountKeyCreation`.
   - Solved with Python pty.fork daemon that orchestrates gcloud across multiple SSH calls.
   - Rationale: avoids manual user work per the feedback memory `feedback_no_manual_user_work.md`.

---

## What we tried that didn't work (and why)

| Attempt | Failure mode | Lesson |
|---|---|---|
| `openclaw webhooks gmail setup` wizard (direct) | Calls `gcloud auth login --no-launch-browser` internally; crashes on EOF | Wizard requires gcloud already authed |
| Inline `echo CODE \| gcloud auth login --no-launch-browser` | PKCE code_verifier mismatch — each gcloud invocation generates fresh code_challenge | Single-process auth flow requirement |
| FIFO + nohup gcloud | Read-end blocks until write-end opens; can't open write-end in a separate SSH call | FIFO open semantics |
| Service account JSON key | Org policy `iam.disableServiceAccountKeyCreation` blocks downloads | Workspace Secure-by-Default |
| Pub/Sub IAM binding via wizard | Org policy `iam.allowedPolicyMemberDomains` blocks granting access to Google's service account | Workspace Secure-by-Default |
| `gog auth add` without keyring env vars | D-Bus secret-service unreachable on headless server | Need file keyring with password |
| `~/.bashrc` env vars below the interactive guard | Non-interactive SSH commands hit the `case $- in *i*) ;; *) return;;` early-return | Source from a file at top of .bashrc |

The Python pty wrapper (`/tmp/gcloud_auth_wrap.py` on Jinn — daemonized, reads code from `/tmp/gauth_code`) is what made gcloud auth work. Keep this pattern in mind for any future headless-interactive-tool problem.

---

## How to verify everything is still working (smoke tests)

Run from your local machine (or in an SSH session on Jinn):

```bash
# 1. SSH reachable
ssh openclaw@100.124.64.28 'echo ok'

# 2. gog authed
ssh openclaw@100.124.64.28 'gog auth list'
# Expected: gc@freedomlab.nyc default gmail <expires-date> oauth

# 3. gcloud authed
ssh openclaw@100.124.64.28 'gcloud auth list'
# Expected: * gc@freedomlab.nyc

# 4. Gateway up
ssh openclaw@100.124.64.28 'systemctl --user is-active openclaw-gateway.service'
# Expected: active

# 5. Hook endpoint listening
ssh openclaw@100.124.64.28 'ss -tlnp 2>/dev/null | grep 18789'
# Expected: LISTEN ... 127.0.0.1:18789 ... node

# 6. Hook endpoint accepts POSTs
ssh openclaw@100.124.64.28 'TOKEN=$(cat ~/.config/gogcli/openclaw-hook-token); curl -s -w "\nHTTP:%{http_code}\n" http://127.0.0.1:18789/hooks/gmail -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" -d "{\"messages\":[{\"id\":\"smoke-test\",\"from\":\"smoke@test\",\"subject\":\"smoke\",\"snippet\":\"\",\"body\":\"\"}]}"'
# Expected: {"ok":true,"runId":"..."} HTTP:200

# 7. Polling cron entry exists
ssh openclaw@100.124.64.28 'crontab -l | grep gmail-poll'
# Expected: */2 * * * * /home/openclaw/bin/gmail-poll.sh

# 8. Polling log fresh
ssh openclaw@100.124.64.28 'tail -3 ~/.local/share/gmail-poll/poll.log'
# Expected: timestamps within last few minutes

# 9. Send yourself an email from your personal Gmail to gc@freedomlab.nyc
# Then wait ≤2 min and check:
ssh openclaw@100.124.64.28 'tail -5 ~/.local/share/gmail-poll/poll.log'
# Expected: POST <msgid> from=<you> subject=<...> -> 200
```

---

## What to fix next (priority order)

### P0: Telegram outbound delivery (blocks user-facing notifications)
- Root cause: `loadChannelOutboundAdapter("telegram")` returns null on OpenClaw 2026.5.2
- See `GitHub-Repo/src/infra/outbound/deliver.ts:124`
- It's a plugin loading issue, not a config typo — telegram plugin isn't registered in the running gateway
- **Workaround (fastest):** cron job reads `~/.openclaw/delivery-queue/failed/*.json`, extracts `payloads[].text`, POSTs to `https://api.telegram.org/bot<token>/sendMessage?chat_id=<id>&text=...` directly. Bot token + chat ID are already in `~/.openclaw/openclaw.json` (`channels.telegram.botToken`, `channels.telegram.allowFrom[0]`). After successful send, move the file to a `sent/` subfolder. This bypasses OpenClaw's broken delivery routing entirely. Implementation sketch in the appendix.
- **Proper fix:** investigate why the telegram outbound plugin isn't loading. Possibly a plugin config issue, possibly a 2026.5.2 regression. Search `src/channels/plugins/outbound/load.ts`.

### P1: Send admin email for org policy exceptions
- Email drafted in conversation, copy in this doc's appendix
- When admin grants both exceptions:
  1. Re-run `openclaw webhooks gmail setup` (will create Pub/Sub subscription successfully)
  2. Disable polling cron: `crontab -l | grep -v gmail-poll | crontab -`
  3. Verify push notifications come in <5 seconds

### P2: Add calendar + contacts scopes
- One command: `gog auth add gc@freedomlab.nyc --services=gmail,calendar,contacts --gmail-scope=full --gmail-no-send` (browser click + paste flow)
- Then Jinn can manage its own calendar (book meetings, send invites) and contacts
- Note: scope is per-account — Jinn still has NO access to GC's personal calendar/contacts. That's preserved by the compartmentalization decision.

### P3: Enable send (Phase 4 from original plan)
- Decide whether to go scope-level (re-auth with `mail.google.com` scope; remove `--gmail-no-send`) or stay flag-level (just remove `--gmail-no-send`)
- Scope-level is stronger guarantee. Flag-level is faster.
- Add a sender allowlist before enabling (e.g., only allow Jinn to send to specific email addresses initially)
- Module 06 line 359 of the course is the lodestar here — never autonomous-send without explicit user approval gating

---

## Surprises / Patterns Named

1. **Headless-keyring state coupling** — When a tool stores credentials AND intermediate flow state in the same keyring, every command in a multi-step flow needs the keyring env vars, not just the "save" steps. (Burned an OAuth code learning this.)

2. **Org-policy-blocked auth recipe** — Google Workspace orgs auto-apply Secure-by-Default policies that block the standard "service account JSON key" recipe most cloud tutorials prescribe. Validate org policies before choosing an auth pattern.

3. **PKCE single-process requirement** — OAuth's PKCE flow generates a code_verifier in process A and requires it in process B for code exchange. If you can't keep one process alive across the user's "click URL → paste code" round trip, you'll fail with "invalid code verifier" every time. Solution: PTY wrapper daemon.

4. **pkill-self foot-gun** — `pkill -f <pattern>` matches against process command lines including the parent shell's command line. SSH'd `pkill -f gcloud` matches the bash command line containing `gcloud` and self-kills the parent → SSH exits 255. Use `pgrep -af` first, filter PIDs that aren't the parent, then kill explicitly.

5. **Workspace verification mode 7-day token expiry MYTH** — I told the user gcloud refresh tokens expire weekly. That applies to OAuth apps in "Testing" mode under an unpublished consent screen. gcloud's own pre-built OAuth client is fully published, so its refresh tokens are persistent. Only the gog client (our own Desktop app type, Testing mode) has the 7-day limit — and that only matters once when we expand scopes.

---

## Appendix A — Admin email (copy-paste)

```
Subject: Request: org policy exceptions for GCP project "jinn-gmail"

Hey [admin name],

I'm setting up a small automation project on a GCP project I created called "jinn-gmail"
(project number 157619683458) under the freedomlab.nyc Workspace. It's hitting two
Secure-by-Default org policy constraints. Asking for project-level exceptions for both,
not org-wide.

Constraint 1: iam.disableServiceAccountKeyCreation
- Reference tracking number: c3800960390272819
- I need to generate a service account JSON key so a headless server can authenticate to
  Google Cloud APIs without me logging in interactively every week.

Constraint 2: iam.allowedPolicyMemberDomains
- This blocks IAM bindings to principals outside our org.
- I need to grant Pub/Sub Publisher to gmail-api-push@system.gserviceaccount.com
  (a Google-managed service account) on a Pub/Sub topic in my project. This is the
  documented Gmail-to-Pub/Sub push pattern from Google's own docs:
  https://developers.google.com/gmail/api/guides/push

Both keys live entirely within the jinn-gmail project; nothing else affected. The server
that uses them is on Tailscale-only access, behind SSH keys, with the keys at 0600 perms.

If easier, you can grant both exceptions at the project level only via Organization
Policy override (not org-wide). Docs:
https://cloud.google.com/resource-manager/docs/organization-policy/using-constraints

Happy to jump on 5 min if it's easier. Thanks!
- Gian
```

---

## Appendix B — Failed-queue → Telegram bypass cron (sketch)

When you want this implemented, the script is roughly:

```python
#!/usr/bin/env python3
"""Read delivery-queue/failed/*.json, POST to Telegram Bot API directly,
move successful ones to delivery-queue/failed/sent/."""
import json, os, urllib.parse, urllib.request
from pathlib import Path

FAILED = Path.home() / ".openclaw/delivery-queue/failed"
SENT = FAILED / "sent"
SENT.mkdir(exist_ok=True)

# Read bot token + chat id from openclaw.json
cfg = json.loads((Path.home() / ".openclaw/openclaw.json").read_text())
tg = cfg["channels"]["telegram"]
TOKEN = tg["botToken"]
CHAT_ID = tg["allowFrom"][0]

for f in sorted(FAILED.glob("*.json")):
    if f.parent != FAILED:
        continue
    d = json.loads(f.read_text())
    if d.get("channel") != "telegram":
        continue
    text_parts = [p.get("text", "") for p in d.get("payloads", []) if p.get("text")]
    if not text_parts:
        f.rename(SENT / f.name)
        continue
    text = "\n\n".join(text_parts)[:4000]  # Telegram 4096 char limit
    data = urllib.parse.urlencode({
        "chat_id": CHAT_ID,
        "text": text,
        "disable_web_page_preview": "true",
    }).encode()
    try:
        urllib.request.urlopen(
            f"https://api.telegram.org/bot{TOKEN}/sendMessage",
            data=data, timeout=15,
        ).read()
        f.rename(SENT / f.name)
    except Exception as e:
        print(f"failed {f.name}: {e}")
```

Add to cron:
```
*/3 * * * * /usr/bin/python3 /home/openclaw/bin/failed-queue-telegram.py >> ~/.local/share/gmail-poll/telegram-bypass.log 2>&1
```

This pulls every 3 min, sends accumulated failed deliveries, moves to `sent/` on success. Token comes from openclaw.json which is already 0600 — no new secret introduced.

---

## Appendix C — Re-running anything

If openclaw.json gets clobbered (per `feedback_outofband_drift`):
```bash
scp .jin-staging/update_openclaw_hooks.py openclaw@100.124.64.28:~/bin/
ssh openclaw@100.124.64.28 'python3 ~/bin/update_openclaw_hooks.py && systemctl --user restart openclaw-gateway.service'
```

If polling state gets corrupted:
```bash
ssh openclaw@100.124.64.28 'python3 -c "
import json, time
from pathlib import Path
p = Path.home() / \".config/gogcli/gmail-poll-state.json\"
p.write_text(json.dumps({\"last_seen_internal_date\": (int(time.time())-300)*1000, \"seen_ids\": []}))
"'
```

If keyring password is lost (full re-auth needed):
```bash
ssh openclaw@100.124.64.28 'rm -rf ~/.config/gogcli/keyring ~/.config/gogcli/keyring-password
openssl rand -base64 32 > ~/.config/gogcli/keyring-password
chmod 600 ~/.config/gogcli/keyring-password'
# Then re-run the gog auth add flow (browser click required)
```

---

## Appendix D — Quick reference of secrets and where they live

| Name | Location on Jinn | Sensitivity |
|---|---|---|
| Gmail account password | NOT on Jinn (GC's password manager) | High |
| Gmail 2FA backup codes | NOT on Jinn (GC's password manager) | High |
| OAuth client secret (gog) | `~/.config/gogcli/credentials.json` | Medium — re-downloadable from console |
| gog refresh token | encrypted in `~/.config/gogcli/keyring/` | High — full Gmail read+modify access |
| Keyring encryption password | `~/.config/gogcli/keyring-password` | High — decrypts refresh token |
| OPENCLAW_HOOK_TOKEN | `~/.config/gogcli/openclaw-hook-token` + `~/.openclaw/openclaw.json` `hooks.token` | Medium — only allows POST to /hooks/gmail |
| Pub/Sub push token (orphan) | `~/.config/gogcli/pubsub-push-token` | Low — unused |
| gcloud refresh token | `~/.config/gcloud/` (standard) | High — full GCP project admin |
| Telegram bot token (pre-existing) | `~/.openclaw/openclaw.json` `channels.telegram.botToken` | Medium — sends as @Jinn_Ai_Bot |

Rotation guidance for each is in `Activation/INCIDENT-RESPONSE-CARD.md`.
