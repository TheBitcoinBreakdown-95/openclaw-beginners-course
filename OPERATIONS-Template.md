# Operational Knowledge Base

> **For the agent, not the human.** This file contains deep operational knowledge about OpenClaw internals, failure patterns, security boundaries, and troubleshooting procedures. Place this file in `~/.openclaw/workspace/OPERATIONS.md` so your agent can reference it when diagnosing issues, answering operational questions, or helping you troubleshoot.
>
> **Students:** Copy this file to your workspace:
> ```bash
> cp OPERATIONS-Template.md ~/.openclaw/workspace/OPERATIONS.md
> ```

---

## Architecture Reference

### Gateway (Control Plane)

The Gateway is a single long-lived Node.js process that owns all coordination:

- **WebSocket control plane:** Typed WS API with schema-validated inbound frames and handshake-first behavior. Clients (CLI, web UI, mac app) and "nodes" connect to the Gateway via WebSocket.
- **HTTP surfaces:** Serves Control UI, WebChat, and Canvas hosts under `/__openclaw__/...` on the same port as the WS server.
- **Typed events:** Emits event types including `agent`, `chat`, `presence`, `cron`, and others.
- **Message serialization:** Inbound runs are serialized through a lane-aware in-process queue. Only one active run per session key at a time. Configurable parallelism across sessions via concurrency caps.
- **Config system:** JSON5 at `~/.openclaw/openclaw.json`. Hot-reloaded with strict schema validation. Unknown keys or invalid types cause the Gateway to refuse startup entirely — only diagnostics commands (`doctor`) work until the config is fixed.

**Key invariant:** One Gateway per host. The Gateway is the single source of truth for session state, tool policy enforcement, and message routing.

### Embedded Agent Runtime

OpenClaw embeds a Pi-based agent runtime rather than calling an external service:

- Entry point: `runEmbeddedPiAgent()` creates or reuses session managers and builds a Pi `AgentSession` via `createAgentSession()`.
- Subscribes to session events for streaming tool execution and message lifecycle.
- Owns model selection, auth profile rotation, and failover behavior above Pi's abstractions.
- Provider error classification drives failover logic (e.g., HTTP 503 is failover-eligible).

**Implication:** Pi SDK version changes are a primary vector for runtime behavior changes and regressions. When behavior changes after an update, check the changelog for Pi SDK bumps.

### Session Management

- **Session keys:** "Main vs non-main" is a session-key concept, not an agent-id concept. Your direct TUI/CLI session is "main." Telegram DMs, group messages, cron-triggered sessions, and heartbeats are "non-main." This distinction drives sandbox scoping.
- **Transcripts:** Session transcripts are stored as JSONL files under `~/.openclaw/agents/<agentId>/sessions/<SessionId>.jsonl`. These are OpenClaw-owned IDs.
- **Session locks:** Each session acquires a lock during active runs. If a run fails to release its lock (e.g., abort signal not respected during compaction), the session becomes "busy" until gateway restart.

### Workspace Bootstrap Context

OpenClaw injects workspace files (AGENTS.md, SOUL.md, TOOLS.md, USER.md, MEMORY.md, etc.) into the first-turn context of every conversation. Large files are trimmed. These files are both a **prompt-shaping mechanism** and a **state mechanism** — they're user-modified and change agent behavior.

**Loading order matters.** LLMs put heavy attention weight on the first and last tokens in context ("Lost in the Middle" research). SOUL.md is loaded early, which is correct. Don't reconfigure file loading order without understanding this.

---

## Configuration & Boot

### Strict Schema Validation

The Gateway uses strict config validation. If `openclaw.json` contains:
- An unknown key (typo, deprecated field, field from a different version)
- An invalid type (string where number expected, etc.)
- A malformed value

**The Gateway will refuse to boot entirely.** Only diagnostic commands like `npx openclaw doctor` will work.

**Diagnosis:**
```bash
npx openclaw doctor
```
The doctor output will identify the specific invalid key or value. Fix it, then restart.

**Common causes:**
- Typos in manually edited config (e.g., `hearbeat` instead of `heartbeat`)
- Config fields from a newer or older OpenClaw version after an update
- Copy-pasting config snippets from tutorials that use a different version
- Adding experimental fields that were renamed or removed

**Prevention:** Never edit `openclaw.json` directly unless necessary. Use `npx openclaw config get/set` commands or the TUI `/config` interface, which validate before writing.

### Hot-Reload vs Restart

Some configuration changes take effect immediately via hot-reload. Others require a gateway restart.

**Hot-reloaded (no restart needed):**
- Model selection changes
- Some tool policy changes
- Channel configuration updates (varies)

**Requires restart:**
- Workspace file changes (SOUL.md, IDENTITY.md, AGENTS.md, etc.)
- Plugin installation or removal
- Sandbox mode changes
- Gateway bind/port changes
- Structural config changes

**When in doubt:** Restart. `npx openclaw gateway restart` is always safe and takes seconds.

### Useful Diagnostic Commands

```bash
npx openclaw doctor              # Health check — catches config, dependency, and service issues
npx openclaw doctor --fix        # Auto-fix what it can
npx openclaw status              # Is the gateway running?
npx openclaw status --json       # Machine-readable status output (useful for debugging)
npx openclaw --version           # Current OpenClaw version
npx openclaw gateway logs        # Gateway logs (look for errors, warnings)
```

---

## Tool Execution & Policy

### Three Separate Control Layers

OpenClaw's tool safety model has three independent layers. They are NOT the same thing:

| Layer | What It Controls | What It Does NOT Control |
|-------|-----------------|------------------------|
| **Tool policy** | **Which** tools are callable (allow/deny) | Where they run or who triggers them |
| **Sandbox** | **Where** tools run (Docker container vs host) | Which tools are available |
| **Elevated mode** | Exec-only host escape hatch when sandboxed | Any tool besides exec |

### Policy Precedence Rules

Tool policies are layered with strict precedence:

1. **Global defaults** — base allow/deny for all contexts
2. **Provider-specific profiles** — overrides for specific AI providers
3. **Agent-specific profiles** — overrides for specific agents
4. **Sandbox-specific policies** — overrides within sandboxed contexts

**Critical rule: Deny always wins.** If any layer denies a tool, it is denied regardless of what other layers allow. This is intentional — it prevents accidental over-permissioning.

**Debugging "tool not available" issues:**
1. Check global policy: `npx openclaw config get tools`
2. Check agent-specific policy (if using multi-agent)
3. Check sandbox policy (if sandbox is enabled)
4. Check provider-specific policy
5. Remember: deny at ANY level = denied everywhere

### Policy Drift Across Execution Paths

**Known issue:** Agent-specific exec and elevated configuration may not be forwarded across all execution paths. This has been observed in:
- Cron-triggered isolated agents (agent-specific exec config not forwarded)
- Certain CLI command paths (elevated permission resolution missing)

**Implication:** The policy you see in config may not be the policy enforced in every runner. If a cron job or sub-agent behaves differently than expected regarding tool access, this is a likely cause.

**Mitigation:**
- Test tool availability explicitly in cron and sub-agent contexts
- Don't assume agent-level policy applies everywhere — verify
- Check the OpenClaw changelog for policy-forwarding fixes in newer versions

### Elevated Mode

Elevated exec is a deliberate security boundary break. It allows exec tool calls to run directly on the host system, bypassing sandbox isolation.

- It ONLY applies to the `exec` tool (shell commands), not all tools
- It is NOT "just convenience" — it pierces the sandbox completely for command execution
- Never enable it for untrusted senders, external channels, or contexts processing external content
- OpenClaw surfaces elevated mode status in `npx openclaw security audit`

---

## Sandbox Operations

### Default Behavior

When sandbox mode is enabled (`non-main` or `all`):

- **Containers default to NO NETWORK.** Tools that need internet access (package installs, API calls, web fetches) will fail silently or cascade into retries.
- **Environment variables are NOT inherited** from the host. Tools relying on `PATH`, API keys in env vars, or other host environment will fail.
- **Root filesystem is read-only** by default.
- **Workspace access is controlled separately** via `workspaceAccess` setting (read/write, read, or none).

### Common Sandbox Failures

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| Tool that worked in TUI fails from Telegram | Sandbox mode is `non-main`; Telegram sessions are sandboxed | Enable network for sandbox if tool needs it, or adjust tool policy |
| `npm install` fails inside sandbox | No network by default in sandbox containers | Enable sandbox network for this context, or run installs on host |
| Agent can't read workspace files from Telegram | `workspaceAccess` set to `none` | Set to `read` if the agent needs to reference workspace files |
| Agent can't find environment variables | Sandbox doesn't inherit host env | Pass required env vars explicitly in sandbox config |
| Commands succeed in TUI but hang from channels | Sandbox container resource limits or network timeout | Check sandbox logs, increase timeout, enable network if needed |

### "More Sandboxing Can Reduce Reliability"

**Counterintuitive but true.** If you enable sandboxing without aligning it with network needs and tool availability, you can create more failures than you prevent. The docs explicitly call out these pitfalls.

**Best practice:** Enable sandbox mode `non-main`, then test every workflow from a non-main context (e.g., Telegram) to verify nothing breaks. Fix failures before relying on the sandbox for security.

### Bind Mounts and Workspace Access

Sandbox isolation can be pierced by:
- Bind mounts that expose host directories into the container
- `workspaceAccess: "read/write"` which gives the sandboxed agent write access to workspace files
- Elevated mode (`elevated: true`) which allows host exec from within sandbox

Keep bind mounts minimal. Use `workspaceAccess: "read"` or `"none"` for contexts processing untrusted input.

---

## Memory System

### Architecture

Memory in OpenClaw is a two-layer system:

1. **Source of truth:** Plain Markdown files in the workspace (`MEMORY.md`, `memory/YYYY-MM-DD.md`, and optional curated files)
2. **Retrieval indexing:** Optional search layer using hybrid retrieval (BM25 keyword search + vector similarity + re-ranking + temporal decay)

### Memory Flush Before Compaction

When the context window fills up, OpenClaw compacts (summarizes) the conversation to free space. This can destroy important information.

**Memory flush** is a mechanism that triggers a silent turn BEFORE compaction, prompting the agent to write durable memories to disk:

```json
{
  "compaction": {
    "memoryFlush": {
      "enabled": true,
      "softThresholdTokens": 40000,
      "prompt": "Distill this session to memory/YYYY-MM-DD.md. Focus on decisions, state changes, lessons, blockers. If nothing: NO_FLUSH",
      "systemPrompt": "Extract only what is worth remembering. No fluff."
    }
  }
}
```

Set `softThresholdTokens` to **40,000** to trigger flushes before valuable context gets compacted.

### Three Memory Failure Modes

| Failure Mode | Symptom | Root Cause | Fix |
|-------------|---------|------------|-----|
| Memory never saved | You tell the agent something; it doesn't persist | LLM decides what's worth saving and often decides "no" | Enable memory flush; use explicit "remember this" instructions |
| Memory saved but never retrieved | Facts on disk, but agent answers from context instead of searching | Agent has to choose to use `memory_search`; often doesn't | Add instruction in AGENTS.md: "Always search memory before answering questions about past decisions" |
| Compaction destroys knowledge | Mid-conversation, agent forgets earlier context | Context compaction summarized away info before it was saved | Enable memory flush with early threshold; use `cache-ttl` mode |

### Hybrid Memory Search

When configured, memory search uses multiple retrieval strategies:

- **BM25 (keyword):** Exact token matching. Catches error codes, project names, specific terms that vector search misses.
- **Vector similarity:** Conceptual matching. Finds related content even when exact words differ.
- **Re-ranking:** Scores and orders results by relevance.
- **Temporal decay:** Prioritizes recent memories over old ones.

Recommended weights: `vectorWeight: 0.7`, `textWeight: 0.3`.

### QMD (Local Retrieval Sidecar)

QMD is an opt-in local retrieval engine that replaces the built-in SQLite indexer:
- Runs as a local sidecar invoked by the Gateway
- Combines BM25 + vectors + re-ranking
- Can index external document collections (Obsidian vaults, project docs, Notion exports)
- Caches under the OpenClaw state directory
- **Windows support is best via WSL2**

### Context Window Management

- Tool output size is a recurring pressure point. Large tool results bloat the context window.
- OpenClaw has ongoing work to truncate oversized tool results and adjust read-tool budgets based on model context window size.
- Context overflow is a common real-world bottleneck and a major failure mode.

**Prevention:**
- Use `/compact` proactively before context fills up
- Start new sessions (`/new`) for new topics
- Keep system prompt (all core files) under 8,000 tokens
- Disable unused skills to reduce per-message context
- Use memory flush to save important info before compaction

---

## Prompt Caching

### How It Works

Prompt caching uses **prefix matching** — the API caches computation from the start of the request up to designated breakpoints. Every request that shares the same prefix reuses that cached computation, dramatically reducing cost and latency.

**The order of content in the request matters enormously.** OpenClaw's request layout:

1. **Static system prompt + tool definitions** (globally cached across all sessions)
2. **Workspace files** — SOUL.md, IDENTITY.md, AGENTS.md, etc. (cached within a project/agent)
3. **Session context** (cached within a session)
4. **Conversation messages** (new each turn)

This ordering maximizes shared cache hits: all sessions share layer 1, all sessions for the same agent share layers 1-2, and each session builds on layers 1-3.

### Rules to Preserve Cache Hits

**Rule 1: Never change models mid-session.**
Prompt caches are unique per model. If you're 100K tokens into a conversation with Opus and switch to Haiku for a "simple" question, the entire cache must be rebuilt for Haiku — making it MORE expensive than just using Opus. If you need a cheaper model for a subtask, use subagents (the parent agent delegates via a handoff message to a new session on the smaller model).

**Rule 2: Never add or remove tools mid-session.**
Tool definitions are part of the cached prefix. Adding or removing a tool invalidates the cache for the entire conversation history. OpenClaw handles this by keeping all tool definitions present at all times and using state transitions (messages, not tool changes) to alter behavior.

**Rule 3: Don't modify the system prompt mid-session.**
Changing the system prompt breaks the prefix match. Instead, pass updated information via messages in the next turn (e.g., `<system-reminder>` tags with updated context). This preserves the cached prefix while still giving the model current information.

**Rule 4: Keep workspace files stable during sessions.**
Since workspace files (SOUL.md, AGENTS.md, etc.) are injected into the prompt prefix, editing them mid-session can break the cache for the active session. Edits take effect on the next session or after a gateway restart — this is by design, not a bug.

### Cache-Safe Compaction

When the context window fills and compaction triggers, the summarization request must reuse the same prefix (system prompt, tools, workspace files, conversation history) as the parent conversation. This way the cached prefix is reused and only the compaction prompt itself is new tokens.

**If compaction uses a different system prompt or tool set** (e.g., a stripped-down "summarizer" config), the entire cache is rebuilt from scratch — dramatically increasing the cost of compaction.

OpenClaw handles this internally, but be aware: custom compaction configurations that alter the prompt structure can break this optimization.

### Cost Impact

Prompt caching can reduce input token costs by **up to 90%** in long-running sessions. The savings come from:
- Not reprocessing the system prompt on every turn
- Not reprocessing workspace files on every turn
- Not reprocessing conversation history on every turn
- Only paying full price for genuinely new tokens

**When caching breaks** (model switch, tool change, prompt edit), you pay full price for ALL accumulated tokens in that session. In a long conversation, this can mean thousands of tokens billed at full rate instead of cached rate — a sudden cost spike.

### Operational Implications

| Action | Cache Impact | Recommendation |
|--------|-------------|----------------|
| Switching models mid-conversation | Cache rebuild (full cost) | Use subagents for model delegation |
| Adding/removing tools mid-session | Cache invalidated | Keep tool set constant; use tool search for discovery |
| Editing workspace files | Cache miss on next turn | Edit between sessions, not during |
| Frequent gateway restarts | New sessions = new cache warmup | Minimize unnecessary restarts |
| Compaction | Can preserve or break cache depending on implementation | Let OpenClaw handle compaction; avoid custom overrides |
| Long stable sessions | Maximum cache benefit | Prefer long sessions over many short ones for repetitive work |

---

## Session Troubleshooting

### Stuck Sessions

**Symptom:** Agent stops responding to messages, or shows "busy" status that never clears.

**Root cause:** Session lock not released. This can happen when:
- An abort signal isn't respected during compaction wait (`waitForCompactionRetry()`)
- A tool call hangs and cleanup code in `finally` blocks doesn't execute
- A crash during session processing leaves the lock held

**Diagnosis:**
```bash
npx openclaw status --json    # Check for sessions showing "busy" or "locked"
npx openclaw gateway logs     # Look for "sessionLock" or "compaction" errors
```

**Fix:**
```bash
npx openclaw gateway restart  # Releases all locks and clears stuck sessions
```

**Prevention:**
- Keep context window manageable (compact before overflow)
- Avoid very large tool outputs that trigger emergency compaction
- Update OpenClaw regularly — stuck session bugs are actively being fixed

### Context Overflow Cascades

**Pattern:** Tool output → context overflow → emergency compaction → agent confusion or stuck session

This is a recurring failure cascade:
1. A tool call returns a very large result (file listing, browser snapshot, command output)
2. The result gets logged into session history, pushing context past limits
3. Emergency compaction triggers, aggressively summarizing recent context
4. The agent loses track of what it was doing, or compaction itself fails
5. Session may become stuck if compaction encounters errors

**Prevention:**
- Instruct the agent to read files in chunks, not entire large files
- Use paged output for directory listings and search results
- Add to AGENTS.md: "When reading files or running commands that might produce large output, limit output size. Use head, tail, or pagination."
- Set appropriate context compaction thresholds

### Silent "No Reply" Behavior

**Symptom:** Client sends a message, no response comes back, no error shown.

**Possible cause:** `chat:final` event skipped when `sessionKey` is undefined in certain code paths. No fallback or warning is logged.

**Diagnosis:**
- Check gateway logs for the message receipt (was it received?)
- Check if the session is stuck (see above)
- Check if the channel is properly paired and active
- Try sending from TUI to see if the agent responds there

---

## Plugin & Skill Management

### Plugins vs Skills

| Aspect | Plugins | Skills |
|--------|---------|--------|
| **Format** | TypeScript modules | Markdown + YAML |
| **Execution** | In-process with Gateway (loaded via jiti) | Loaded as context for the LLM |
| **Risk level** | HIGH — any plugin bug is a Gateway bug | MEDIUM — instructions interpreted by the LLM |
| **Capabilities** | Tools, RPC methods, CLI commands, background services, hooks, channels | New instructions and workflows for the agent |
| **Trust model** | Must be treated as trusted code (shared fate with Gateway) | Can be somewhat sandboxed by tool policies |

### Plugin Discovery Order

Plugins are discovered in this order (first match wins on plugin ID collision):
1. Explicit config paths
2. Workspace extensions
3. Global extensions
4. Bundled extensions

**Implication:** A workspace plugin with the same ID as a bundled plugin will shadow it. This can be intentional (override) or accidental (name collision).

### Plugin Security

- Plugins run **in-process** with the Gateway. A plugin crash, unhandled rejection, or resource leak is a Gateway-wide problem (shared fate).
- Plugins can register deep capabilities: tools, RPC methods, CLI commands, background services, hooks, and channels.
- When `plugins.allow` is empty and non-bundled plugins are discoverable, OpenClaw surfaces a security warning.
- The memory system itself can be replaced by a plugin via exclusive "memory" plugin slots.

### Version Pinning

```bash
# Install a skill
npx clawhub install skill-name

# Check integrity status
npx openclaw skills list --integrity
```

**Why pin:** Plugin/skill install mechanisms have changed repeatedly across OpenClaw versions (ignore-scripts, pinning, integrity drift warnings). Without pinning:
- An auto-update could change behavior without your knowledge
- A compromised upstream could push malicious code
- Your reproducible setup stops being reproducible

**Integrity drift warnings:** OpenClaw can detect when a pinned plugin's contents have changed since installation. If you see an integrity drift warning, do NOT ignore it — investigate before allowing the update.

### Plugin Install Failures

Common install failures and their fixes:

| Error | Cause | Fix |
|-------|-------|-----|
| `npm pack produced no archive` | npm-spec install failure | Try reinstalling npm, or install the plugin manually |
| Dependency resolution failure | Conflicting versions | Clear npm cache: `npm cache clean --force`, retry |
| Windows: `.cmd` execution error | Node spawn without shell on Windows | Run inside WSL2, not native Windows |
| Plugin not discovered after install | Discovery order issue or ID collision | Check `npx openclaw plugins list`, verify install path |
| Permission denied during install | File ownership issues | Check file permissions in `~/.openclaw/` |

---

## Security Operations

### Outbound Calls (Even in "Local-First" Mode)

Even with a local Gateway, OpenClaw makes outbound network calls:

| Call Type | When It Happens | How to Minimize/Disable |
|-----------|----------------|------------------------|
| **Model inference** | Every message, heartbeat, cron job | Required — cannot disable (this IS the AI) |
| **Provider usage tracking** | Periodic — pulls usage/quota from provider endpoints | Disable if not needed (check config) |
| **ClawHub telemetry** | During `npx clawhub sync` while logged in | Set `CLAWHUB_DISABLE_TELEMETRY=1` |
| **Remote embeddings** | Memory search with remote providers | Configure local embeddings, or accept as tradeoff |
| **Plugin/skill acquisition** | During install — npm registry, archive extraction | Only happens during installs, not at runtime |
| **Web search** | When agent uses web search tools | Disable web search tool if not needed |

**"Local-first" does NOT mean "offline-first."** A privacy-conscious setup must explicitly enumerate and shut off these call paths. Otherwise "local-first" becomes a misleading mental shortcut.

### Log Poisoning

A documented security advisory describes header values being included in Gateway logs when WebSocket connections close before handshake completion. This means:
- An attacker can inject content into your logs without authenticating
- If logs are ever fed back to the agent (for analysis, debugging, monitoring), this becomes a prompt injection vector
- Log content should never be treated as trusted input

**Mitigation:**
- Keep sensitive redaction enabled in Gateway config
- Don't feed raw logs to the agent without sanitization
- Monitor logs for unexpected content patterns

### SSRF Guards

OpenClaw includes SSRF (Server-Side Request Forgery) protections for:
- Browser automation (preventing the agent from accessing internal network services via browser)
- Webhook endpoints (preventing external services from triggering internal actions)

These guards are part of the security boundary. Don't disable them unless you understand the implications.

### Infostealer Malware

Security reporting indicates that infostealer malware has begun specifically targeting OpenClaw-associated files:
- `~/.openclaw/openclaw.json` (API keys, tokens)
- `.env` files in common project directories
- SSH keys, browser credentials, crypto wallets
- Telegram session files

**This is a real, active threat — not theoretical.** It's a natural consequence of "local config contains credentials."

**Mitigation:**
- Use a password manager (1Password, Bitwarden) for credentials instead of plaintext files
- Keep file permissions tight (700 directories, 600 files)
- Run antivirus/antimalware on the host system
- Monitor for unexpected file access patterns
- Consider isolating OpenClaw on a dedicated machine or network

### Insecure Auth Modes

OpenClaw has auth mode downgrades that weaken device identity/pairing checks. These are explicitly documented as "break-glass" downgrades:
- Token-only flows (no device identity verification)
- Reduced pairing requirements

**These are surfaced in `npx openclaw security audit`.** If you see warnings about insecure auth modes, treat them seriously. They exist for emergency access, not as a convenience default.

### Security Audit Reference

```bash
npx openclaw security audit --deep          # Full audit
npx openclaw security audit --deep --fix    # Audit and auto-fix
```

The audit checks:
- Gateway authentication and bind configuration
- DM channel modes (open vs pairing)
- File permissions
- Sandbox configuration
- Tool policies and elevated mode
- Browser control exposure
- Plugin security warnings
- Insecure auth mode status
- Credential exposure

---

## Concurrency Control

### Lane-Aware Queue

OpenClaw serializes inbound runs through a lane-aware queue:
- Only one active run per session key at a time (prevents collisions)
- Configurable parallelism across different sessions
- Concurrency caps prevent resource exhaustion

### Configuration

```json
{
  "agents": {
    "defaults": {
      "maxConcurrent": 2
    }
  }
}
```

**On constrained hardware (16 GB RAM):** Treat `maxConcurrent` as a hard resource budget, not a throughput knob. More concurrent sessions = more memory, more context windows, more API calls.

### Chat Steering Modes

Queue modes affect how incoming messages are handled when the agent is busy:

| Mode | Behavior | Best For |
|------|----------|----------|
| **collect** | Collects messages and processes them together when current run finishes | Reducing duplicate responses and wasted tokens |
| **steer-backlog** | Redirects backlogged messages | High-traffic channels |

`collect` is generally preferred for cost efficiency — it reduces duplicate responses and tool-cancel churn.

---

## Update Management

### Release Channels

OpenClaw supports three release channels:

| Channel | Stability | Best For |
|---------|-----------|----------|
| **stable** | Tested, production-ready | Most users — use this |
| **beta** | New features, may have bugs | Users who want early access |
| **dev** | Cutting edge, may break | Contributors and testers only |

**Always use stable for production setups.** Beta and dev channels may introduce breaking changes without notice.

### Safe Update Procedure

```bash
# 1. Record current state
npx openclaw --version
npx openclaw status --json > ~/pre-update-status.json

# 2. Back up
cd ~/.openclaw && git add -A && git commit -m "Pre-update backup $(date +%Y-%m-%d)"

# 3. Update
npx openclaw update

# 4. Verify
npx openclaw gateway restart
npx openclaw doctor
npx openclaw security audit --deep
```

### Version Pinning for Reproducibility

For reliable setups:
- Pin the OpenClaw version in your update strategy (don't auto-update)
- Pin plugin versions with `--pin`
- Record `npx openclaw status --json` output for reference
- Store integrity metadata for installed plugins

**Why this matters:** OpenClaw's changelog includes frequent breaking changes and security hardening. Behavior that works on version X may change on version X+1.

### After an Update Breaks Something

1. Check release notes and changelog for known issues
2. Check Discord for community reports
3. Roll back if needed:
   ```bash
   npm install -g @tinybox/openclaw@[previous-version]
   cd ~/.openclaw && git checkout HEAD~1
   npx openclaw gateway restart
   ```
4. Run `npx openclaw doctor` and `npx openclaw security audit --deep` after rollback

---

## Windows / WSL2 Specific Issues

### Windows Is a Special-Risk Environment

OpenClaw treats Windows as a special-risk platform. Known issues:

- **npm `.cmd` execution:** Plugin installation on Windows can hit pathologies with Node.js spawning `.cmd` files without a shell
- **Command injection in scheduled tasks:** The changelog includes Windows daemon hardening against command injection in scheduled task script generation
- **QMD (local retrieval):** Best supported via WSL2, not native Windows
- **Docker integration:** WSL2's Docker integration has networking quirks — Docker bridge IPs may trigger WS security rules that block plaintext `ws://` to non-loopback addresses
- **Path separators:** Windows paths vs WSL2 paths can cause confusion when referencing files across the boundary

### WSL2 Networking Gotchas

- **WS security hardening:** A regression can block plaintext `ws://` connections to non-loopback addresses, including Docker bridge IPs. This is "secure by default" conflicting with local virtualization realities.
- **Gateway bind:** When binding to `lan`, the Gateway is accessible from the Windows host. When binding to `loopback`, it's only accessible from within WSL2.
- **Port forwarding:** WSL2 ports are typically accessible from the Windows host automatically, but this depends on Windows network configuration.

---

## Error Pattern Reference

### Boot / Startup Failures

| Error Pattern | Diagnosis | Resolution |
|--------------|-----------|------------|
| Gateway refuses to start, no clear error | Config schema validation failure | Run `npx openclaw doctor`, fix invalid config keys |
| "Port already in use" | Zombie process or conflicting service | `lsof -i :18789`, kill conflicting process, or change port |
| Gateway starts then immediately stops | Corrupted state, bad plugin, or dependency issue | Check `npx openclaw gateway logs`, try `npx openclaw doctor --fix` |
| "Cannot find module" errors | Dependency not installed or version mismatch | `npm install -g @tinybox/openclaw`, or reinstall |

### Runtime Failures

| Error Pattern | Diagnosis | Resolution |
|--------------|-----------|------------|
| Session stuck on "busy" | Lock not released after abort/compaction failure | `npx openclaw gateway restart` |
| Agent stops responding mid-conversation | Context overflow triggered emergency compaction | Use `/compact` proactively, start new session with `/new` |
| Silent no-reply from agent | `sessionKey` undefined in message routing path | Check gateway logs, verify channel pairing, restart gateway |
| Tool calls fail only from Telegram | Sandbox mode `non-main` — Telegram is sandboxed | Check sandbox config, enable network if needed |
| Agent "forgets" mid-conversation | Compaction destroyed context before memory flush | Enable memory flush with early threshold (40K tokens) |
| Costs spiking unexpectedly | Context accumulation, too many heartbeats, or loops | Check token usage, compact sessions, reduce heartbeat frequency |

### Security Failures

| Error Pattern | Diagnosis | Resolution |
|--------------|-----------|------------|
| Unexpected pairing requests | Someone discovered your bot | Verify pairing mode is enabled, check allowlists |
| Agent runs commands you didn't expect | Policy drift — config not forwarded to cron/sub-agent paths | Test tool availability in all execution contexts |
| Credentials appear in logs or chat | Sensitive redaction not enabled, or skill leaking data | Enable redaction, audit skill instructions, check AGENTS.md directives |
| Security audit shows new warnings after update | New security checks added in update, or defaults changed | Run `npx openclaw security audit --deep --fix`, review each finding |

---

## Design Philosophy (Why Things Work This Way)

### "Model Output Is Adversarial Unless Constrained"

OpenClaw's security model does NOT rely on hoping the model behaves correctly. The safety boundary is:
1. **Tool policies** — which tools can be called
2. **Sandboxing** — where tools execute
3. **Elevated mode gates** — explicit escape hatches
4. **Pairing policies** — who can send messages
5. **Gateway authentication** — who can connect

This is a "defense in depth" approach where each layer is independent. If the model is manipulated via prompt injection, the tool policy layer still prevents unauthorized tool access. If a tool policy is misconfigured, the sandbox layer still limits blast radius.

### Single Gateway = Single Point of Failure

The Gateway centralizes everything. This simplifies the mental model ("one host, one truth") but means:
- Gateway uptime = system uptime
- Gateway bugs affect all agents, channels, and sessions
- Gateway restarts clear all active sessions and locks

For production reliability, ensure the daemon auto-restarts on failure (`npx openclaw gateway install` handles this).

### Loose Coupling Points (What You CAN Swap)

Despite tight integration, several surfaces are intentionally replaceable:
- **Messaging channels** can be plugins
- **Memory implementation** can be swapped via exclusive plugin slots
- **Model providers** can be extended via provider plugins and `models.json` merges
- **Client surfaces** (CLI, WebChat, Control UI) are separate WS clients with a typed contract

---

## Ecosystem Awareness

### Related Projects

| Project | What It Is | Relevance |
|---------|-----------|-----------|
| **PicoClaw** | Ultra-lightweight Go-based assistant (<20 MB RAM) | Alternative for extremely constrained hardware |
| **TinyClaw** | Multi-agent system using tmux + file-based queue | Alternative orchestration approach |
| **Kimi Claw** | Cloud-hosted OpenClaw deployment | Managed alternative (different privacy posture) |

### Ecosystem Trajectory Signals

- OpenClaw may evolve toward runtime generalization beyond Pi (supporting multiple execution backends). Curricula should avoid overfitting to Pi-specific semantics and instead focus on the Gateway/tool policy/session model as the stable architectural spine.
- Plugin install hardening is actively evolving (pinning, integrity drift warnings, ignore-scripts, containment checks) — expect behavior changes between versions.
- Provider failover logic is being tuned continuously (new error classes, fallback indicators) — provider-related failures may resolve or change with updates.
