# OpenClaw CLI Reference

**Source:** [docs.openclaw.ai/cli](https://docs.openclaw.ai/cli) — verified 2026-02-24

This file lists the correct CLI commands and config paths used in this course. Always check here before writing commands in course materials.

---

## Config Operations

The `config` command ONLY works with `get`, `set`, and `unset`. Subcommands like `config gateway bind` or `config channels telegram dm-mode` give "too many arguments."

```bash
npx openclaw config get <dot.path>         # Read a value
npx openclaw config set <dot.path> <value> # Set a value
npx openclaw config unset <dot.path>       # Remove a value
npx openclaw configure                     # Interactive wizard
```

---

## Config Paths Used in Course

### Channels

| Path | Values | Description |
|------|--------|-------------|
| `channels.<ch>.enabled` | `true` / `false` | Enable/disable a channel |
| `channels.<ch>.dmPolicy` | `pairing` / `allowlist` / `open` / `disabled` | DM access control |
| `channels.<ch>.allowFrom` | JSON array of user IDs | DM allowlist (numeric Telegram IDs, E.164 phone numbers) |
| `channels.<ch>.botToken` | string | Bot token (Telegram, Discord) |
| `channels.<ch>.groupPolicy` | `open` / `allowlist` / `disabled` | Group message access |
| `channels.<ch>.groups."*".requireMention` | `true` / `false` | Require @mention in groups |

Replace `<ch>` with: `telegram`, `discord`, `whatsapp`, `slack`, etc.

### Gateway

| Path | Values | Description |
|------|--------|-------------|
| `gateway.auth.mode` | `token` / `password` | Authentication method |
| `gateway.auth.token` | string | The auth token value |
| `gateway.bind` | `loopback` / `lan` / `tailnet` / `custom` | Network binding (default: loopback) |
| `gateway.port` | number | Port number (default: 18789) |
| `gateway.mode` | `local` | Gateway mode |

### Heartbeat

| Path | Values | Description |
|------|--------|-------------|
| `agents.defaults.heartbeat.every` | `"55m"`, `"30m"`, `"2h"`, `"0m"` | Interval (0m = disabled) |
| `agents.defaults.heartbeat.model` | `"claude-haiku-4-5"`, `"gemini-flash-3"` | Model for heartbeat (use cheap model) |
| `agents.defaults.heartbeat.target` | `"last"`, `"telegram"`, `"none"` | Where heartbeat sends |

### Models & Providers

| Path | Values | Description |
|------|--------|-------------|
| `agents.defaults.model.primary` | `"anthropic/claude-opus-4-6"` | Primary model |
| `models.providers.<name>.apiKey` | string | Provider API key |
| `models.providers.<name>.baseUrl` | URL | Custom provider endpoint (e.g., Ollama) |

Replace `<name>` with: `anthropic`, `openai`, `openrouter`, `ollama`, etc.

---

## Gateway Management

```bash
npx openclaw gateway start       # Start gateway service
npx openclaw gateway stop        # Stop gateway service
npx openclaw gateway restart     # Restart gateway service
npx openclaw gateway status      # Check status
npx openclaw gateway install     # Install as background service
npx openclaw gateway uninstall   # Remove background service
npx openclaw gateway logs        # Not a real command — use `npx openclaw logs`
```

Note: `openclaw service` does NOT exist. Always use `openclaw gateway`.

---

## Channel Management

```bash
npx openclaw channels add [--channel <name>]    # Add a channel (wizard)
npx openclaw channels remove [--channel <name>]  # Remove a channel
npx openclaw channels list                        # List configured channels
npx openclaw channels status [--probe]            # Check channel health
npx openclaw channels login [--channel <name>]    # WhatsApp QR login
npx openclaw channels logout [--channel <name>]   # Log out of channel
npx openclaw channels logs [--channel <name>]     # Channel activity logs
```

---

## Pairing

```bash
npx openclaw pairing list <channel>              # List pending DM requests
npx openclaw pairing approve <channel> <code>    # Approve a pairing request
```

---

## Skills (ClawHub — Separate CLI)

ClawHub is a separate npm package. NOT `openclaw skills install`.

```bash
npx clawhub install <slug>        # Install a skill
npx clawhub search "query"        # Search for skills
npx clawhub list                  # List installed skills
npx clawhub update <slug>         # Update a skill
npx clawhub update --all          # Update all skills
```

Note: `npx openclaw skills list` works for listing, but install/search must use `clawhub`.

---

## Models

```bash
npx openclaw models list                  # List available models
npx openclaw models status [--probe]      # Check model availability
npx openclaw models set <model>           # Set default model
npx openclaw models auth add              # Interactive provider auth setup
```

---

## Diagnostics

```bash
npx openclaw doctor [--fix]               # Health checks (--fix auto-repairs)
npx openclaw security audit [--deep] [--fix]  # Security audit
npx openclaw status [--all] [--deep]      # Session/gateway status
npx openclaw health                       # Gateway health check
npx openclaw logs [--follow]              # Tail gateway logs
```

---

## Other Commands Used in Course

```bash
npx openclaw tui                          # Terminal chat interface
npx openclaw dashboard [--no-open]        # Web dashboard
npx openclaw onboard [--install-daemon]   # Onboarding wizard
npx openclaw cron add --name "..." --cron "..." --system-event "..."  # Schedule job
npx openclaw cron list                    # List scheduled jobs
npx openclaw system event --text "..."    # Trigger immediate heartbeat
npx openclaw stop                         # Stop everything (alias)
```

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `TELEGRAM_BOT_TOKEN` | Fallback Telegram token |
| `DISCORD_BOT_TOKEN` | Fallback Discord token |
| `OPENCLAW_GATEWAY_PASSWORD` | Gateway password auth |
| `OPENCLAW_GATEWAY_PORT` | Override default port |
| `OPENCLAW_STATE_DIR` | State directory (default: ~/.openclaw) |
