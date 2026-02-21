# Module 09: Advanced Concepts

## Learning Objectives

By the end of this module, you will be able to:

1. Understand why OpenClaw burns money by default and how to fix it
2. Implement the "Brains and Muscles" model for cost optimization
3. Set up intelligent model routing (manual, ClawRouter, or OpenRouter)
4. Enable prompt caching for up to 90% savings on system prompts
5. Switch between AI models for different tasks
6. Understand multi-agent setups (personal agent, work agent, team agent)
7. Use reverse prompting to let the AI guide your decision-making
8. Upgrade your web search with Perplexity Pro integration
9. Design a self-improvement workflow for your agent

---

## Key Vocabulary

| Term | Definition |
|------|-----------|
| **Brains and Muscles** | A pattern where you use an expensive, powerful model (the "brain") for thinking and orchestrating, and cheaper models (the "muscles") for specific tasks like coding, searching, or data processing |
| **Model switching** | Changing which AI model handles a conversation mid-stream — using Opus for creative decisions, Sonnet for coding, Haiku for quick lookups |
| **Multi-agent** | Running more than one OpenClaw agent — e.g., one for personal life, one for work, one for a specific project |
| **Reverse prompting** | Instead of telling the AI what to do, you ask the AI what YOU should do — letting it analyze your situation and suggest actions |
| **Open Router** | A service that provides access to many AI models through a single API — useful for model switching and accessing models like Perplexity |
| **ClawRouter** | An OpenClaw-native routing tool that automatically classifies request complexity and routes to the cheapest capable model — the hottest new tool in the ecosystem |
| **Prompt caching** | A provider feature that remembers static parts of your prompt (system files) between calls, so you don't pay full price to re-process them every time |
| **Context accumulation** | The problem of session history growing with every message — a mature session can reach 200K+ tokens, making even simple follow-ups expensive |
| **Agentic company** | The idea of structuring your AI agents like employees in a company, with different roles and responsibilities |

---

## The Brains and Muscles Model

This is the single most important cost optimization technique for OpenClaw users.

### The Problem: Why OpenClaw Burns Money by Default

Running OpenClaw with a single frontier model for all tasks is the #1 cost mistake users make. You can easily run up a monthly API bill in the **$1,000s** even with basic usage.

Why? Because OpenClaw sends *everything* to your primary model by default. Heartbeats, sub-agent tasks, simple calendar lookups, web searches — all go to your primary model. If that's Opus 4.6 ($5/$25 per million tokens), you're paying premium prices for tasks a $0.30 model could handle.

The costs compound through five mechanisms:

| Cost Mechanism | What Happens | Impact |
|---------------|-------------|--------|
| **Context accumulation** | Session history grows with every message. A mature session can reach 200K+ tokens. | Even a simple follow-up carries enormous context overhead |
| **System prompt re-injection** | Your SOUL.md, AGENTS.md, MEMORY.md, and skill descriptions (3,000-14,000 tokens) are re-sent with *every* API call | You pay for the same system prompt thousands of times per month |
| **Tool output storage** | File listings, browser snapshots, and command outputs get logged into session history | Context bloat accelerates over time |
| **Heartbeat overhead** | A heartbeat every 30 min on Opus = 48 full-context API calls/day | ~$70-200/month just for routine checks |
| **Cron job overhead** | Each cron trigger creates a fresh conversation with full context injection | 96 triggers/day at 15-min intervals = $10-20/day on Opus |

**The good news:** A well-configured multi-model setup with prompt caching can reduce monthly API costs by **up to 90%** while maintaining (or improving) output quality where it matters.

**Real cost benchmarks from the community:**
- Without optimization: **$100-400/month** (this is where most new users land)
- Well-configured setup: **$10-50/month** (brains and muscles + caching)
- Extreme optimization: **<$10/month** (free models + local models + aggressive routing)
- Worst case: One user spent **$800 in under a week** on uncapped pay-per-use API

**90% of what your agent does is routine work that doesn't need a $5/MTok model.** Let's fix that.

### The Solution

Split your workload:

```
┌─────────────────────────────────┐
│           THE BRAIN             │
│     Claude Opus 4.6             │
│                                 │
│  • Complex decisions            │
│  • Creative writing             │
│  • Strategy and planning        │
│  • Prompt injection defense     │
│  • Orchestrating other models   │
│                                 │
│  Cost: ~$15-75 per million tokens│
└──────────────┬──────────────────┘
               │ delegates to
    ┌──────────┼──────────┐
    ▼          ▼          ▼
┌────────┐ ┌────────┐ ┌────────┐
│ MUSCLE │ │ MUSCLE │ │ MUSCLE │
│ Haiku  │ │ Sonnet │ │ Codex  │
│ 4.5    │ │ 4.5    │ │        │
│        │ │        │ │        │
│ Quick  │ │ Code   │ │ Dev    │
│ lookups│ │ gen    │ │ tasks  │
│ $1-5/M │ │ $5-15/M│ │ varies │
└────────┘ └────────┘ └────────┘
```

**The brain** (Opus) handles the hard stuff: understanding your intent, making decisions, crafting nuanced responses, and orchestrating the muscles.

**The muscles** (cheaper models) handle the grunt work: generating code, searching the web, summarizing documents, running calculations.

### How to Configure It

In the TUI or via command line, you can switch models on the fly:

```
/model claude-haiku-4-5
```

Or configure it in your agent files so the agent automatically delegates.

### The Opus Orchestra Pattern

The community has a named strategy for the optimal model split:

- **Opus** — the conductor: orchestration, complex decisions, creative work, security-sensitive tasks
- **Sonnet** — the section leads: code generation, document analysis, moderate reasoning
- **Haiku / Gemini Flash** — the ensemble: heartbeats, simple lookups, routine checks
- **Free models** — the volunteers: tasks where cost must be zero

### Free and Ultra-Cheap Model Options

Don't overlook these — they can handle significant workloads at minimal or zero cost:

| Model | Cost | Capability | Best For |
|-------|------|-----------|----------|
| **Kimi K2.5** (via NVIDIA build.nvidia.com) | **Free** | Comparable to Opus 4.5 on many tasks | Complex reasoning without cost |
| **MiniMax M2.5** | ~$10-50/month | Surprisingly powerful for its price; Max plan gives 1,000 prompts per 5 hours | Budget primary model |
| **Google Cloud free credits** | **$300 free** | Sign-up credits for Gemini 2/2.5/3 Flash/Pro | Getting started at zero cost (rate limits apply) |
| **Gemini Flash** | Free (20 req/day) | Good for quick tasks | Heartbeats, simple queries |
| **DeepSeek** | Very cheap | Strong coding and reasoning | Code generation, analysis |

Kimi K2.5 is the community's current favorite free option — it's accessed through NVIDIA's API and delivers quality that rivals much more expensive models.

### Chat Quality ≠ Agent Quality

Not all AI models are equally good at agentic work. A model that gives beautiful, articulate chat responses may completely fall apart when it needs to call tools, chain multi-step actions, or follow structured workflows.

**Models proven for agentic OpenClaw work:**
- **Claude Sonnet / Opus** — excellent tool use, reliable multi-step execution
- **GPT-5.2** — strong agentic capabilities
- **Kimi K2 via API** — surprisingly capable for a free model

**Models to avoid for autonomous agent tasks:**

| Model | Problem |
|-------|---------|
| **DeepSeek Reasoner** | Amazing at thinking, terrible at doing. Reasons beautifully about why your code is broken while generating completely broken tool calls. |
| **GPT-5.1 Mini** | Cheap, but skips steps and ignores tool results. Multiple users report it as unreliable for agent work. |

**The 3-tool-call test:** Before trusting any model for autonomous work, test it with three sequential tool calls. If it can't complete three in sequence without hand-holding (hallucinating function names, generating malformed JSON, losing track of what it was doing), don't use it for unattended agent tasks.

This distinction matters because the cheapest model isn't always the cheapest *effective* model. A model that loops and fails costs more than one that succeeds on the first try.

### Practical Model Assignments

| Task | Recommended Model | Why |
|------|------------------|-----|
| Important conversations | Opus 4.6 | Best reasoning, most nuanced |
| Code generation | Sonnet 4.5 or Codex | Optimized for code, cheaper |
| Heartbeats | Haiku 4.5 | Routine checks, very cheap |
| Web search | Perplexity Pro (via Open Router) | Built for search |
| Document summarization | Sonnet 4.5 | Good enough, much cheaper |
| Quick factual lookups | Haiku 4.5 or Kimi K2.5 | Fast and cheap (or free) |
| Creative writing | Opus 4.6 | Best quality |
| Security-sensitive tasks | Opus 4.6 | Best prompt injection resistance |

---

## Model Switching

You can switch models during a conversation without starting a new session.

### In the TUI

```
/model claude-opus-4-6      # Switch to Opus (expensive, best quality)
/model claude-sonnet-4-5     # Switch to Sonnet (good balance)
/model claude-haiku-4-5      # Switch to Haiku (fast, cheap)
```

### When to Switch

**Switch to Opus when:**
- Making important decisions
- You need the highest quality response
- Processing untrusted input (prompt injection risk)
- Having a nuanced personal conversation

**Switch to Sonnet when:**
- Generating code
- Summarizing documents
- Writing drafts
- Moderate-complexity tasks

**Switch to Haiku when:**
- Quick factual questions
- Simple formatting tasks
- Template generation
- Testing and debugging prompts

### Automatic Model Routing (Manual Rules)

The simplest approach: add routing rules to your AGENTS.md:

```markdown
## Model Routing Rules
- For heartbeat checks: use claude-haiku-4-5
- For code generation: use claude-sonnet-4-5
- For important decisions and conversations: use claude-opus-4-6
- For web search: use perplexity through Open Router
- For email triage and routine tasks: use haiku or gemini-flash
- When in doubt: use sonnet (good default)
```

This works but relies on the AI following its own rules, which isn't always consistent.

---

## Intelligent Routing: ClawRouter, Custom Skills, and OpenRouter

For more reliable routing, there are three increasingly automated approaches.

### Option 1: ClawRouter (Recommended — OpenClaw Native)

ClawRouter is the hottest new tool in the OpenClaw ecosystem — 2,400 GitHub stars in its first 11 days. It's an OpenClaw-native routing tool that sits between your agent and the LLM providers.

**How it works:** ClawRouter analyzes each incoming query using a fast, lightweight classifier that scores dimensions like query length, presence of code, reasoning markers, multi-step intent, and tool usage signals. It then classifies into tiers:

| Tier | Complexity | Routed To | Cost |
|------|-----------|-----------|------|
| **Simple** | Basic lookups, acknowledgments | DeepSeek, Gemini Flash | ~$0.27-0.60/MTok |
| **Medium** | Moderate tasks, summarization | GPT-4o-mini, Sonnet | ~$1-5/MTok |
| **Complex** | Analysis, writing, decisions | Claude Sonnet | ~$3-15/MTok |
| **Heavy** | Multi-step reasoning, agentic tasks | Opus 4.6, Kimi K2.5 | ~$5-25/MTok |

**ClawRouter profiles:**
- **Auto** — balanced quality and cost (recommended starting point)
- **Eco** — maximum savings, up to 95-100% on simple queries
- **Premium** — best quality, less aggressive routing
- **Free** — zero-cost models only (limited capability)

If you want a routing tool designed specifically for OpenClaw, this is the one.

### Option 2: Build a Custom Routing Skill

If you want full control, you can build a routing skill that uses keyword matching to direct tasks:

```python
import re
from openclaw import Skill, Context

class RouterSkill(Skill):
    def __init__(self):
        self.rules = {
            r'code|debug|script': 'openai/gpt-5.2-turbo',
            r'email|schedule|remind': 'anthropic/claude-3-haiku-20240307',
            r'plan|strategy|brainstorm': 'anthropic/claude-3-opus-20240229',
            'default': 'google/gemini-flash-1.5'
        }

    async def execute(self, context: Context):
        prompt = context.message.content.lower()
        for pattern, model in self.rules.items():
            if isinstance(pattern, str) and re.search(pattern, prompt):
                context.llm_model = model
                break
        return await self.next(context)
```

Enable it with:
```bash
openclaw skills enable router --path skills/router.py
```

Don't let the code scare you — ask your agent to help you build and customize it. The main point is giving the system rules so it doesn't treat all tokens as equal.

### Option 3: OpenRouter Auto-Routing (Easiest)

If you don't want to manage multiple providers or build routing skills, OpenRouter offers a hands-off approach. It analyzes prompts and routes automatically:

```yaml
llm:
  provider: openrouter
  routing:
    enabled: true
    rules:
      - task: "routine"
        model: "deepseek/deepseek-chat"
        max_cost: 0.50
      - task: "coding"
        model: "openai/gpt-5.2-turbo"
      - fallback: "anthropic/claude-3-haiku-20240307"
```

Create a free account at https://openrouter.ai/, fund it with credits, update your config, and let OpenRouter handle the routing. Access 300+ models through a single API.

### Which Routing Approach to Choose?

| Approach | Complexity | Control | Best For |
|----------|-----------|---------|----------|
| Manual rules in AGENTS.md | Low | Low | Getting started, simple setups |
| ClawRouter | Medium | Medium | Most users — best balance of automation and control |
| Custom routing skill | High | Full | Power users who want exact control |
| OpenRouter auto-routing | Low | Low | Users who want zero configuration |

**Our recommendation:** Start with manual rules in AGENTS.md. When you're ready for more automation, install ClawRouter.

---

## Prompt Caching: The Hidden Savings Multiplier

Prompt caching is one of the most underused optimizations for OpenClaw. It can reduce your system prompt costs by up to **90%**.

### The Problem It Solves

Every time you send a message (or a heartbeat fires, or a cron job triggers), OpenClaw sends your full system prompt to the AI model: SOUL.md, AGENTS.md, MEMORY.md, skill descriptions — typically 3,000-14,000 tokens. The model processes these from scratch every time, and you pay full price every time.

### How Prompt Caching Works

Anthropic and OpenAI can cache the static parts of your prompt. After the first call, they remember your system prompt. Subsequent calls within the cache window only pay a fraction of the cost — **90% cheaper** for cached tokens.

### Enabling Prompt Caching

Add this to your OpenClaw configuration:

```json
{
  "models": {
    "anthropic/claude-opus-4.6": {
      "cacheRetention": "long",
      "cacheSystemPrompts": true,
      "cacheThresholdTokens": 2048
    }
  }
}
```

- `cacheRetention: "long"` — Use Anthropic's extended cache (stays warm ~55 minutes)
- `cacheSystemPrompts: true` — Cache the system files (SOUL.md, AGENTS.md, etc.)
- `cacheThresholdTokens: 2048` — Only cache prompts above this size (avoids caching tiny requests)

### The 55-Minute Heartbeat Trick

Anthropic's extended cache stays warm for about 55 minutes. Here's how to exploit this:

1. Set your heartbeat interval to 55 minutes (not 30)
2. Enable prompt caching
3. Route heartbeats to Haiku 4.5

**Result:** The first heartbeat pays full price for the system prompt. Every subsequent heartbeat hits warm cache and pays 90% less. Combined with Haiku pricing:

| Without optimization | With optimization |
|---------------------|-------------------|
| Opus for heartbeats | Haiku for heartbeats |
| Full system prompt every call | Cached system prompt (90% off) |
| ~$100+/month | ~$0.50/month |

That's a **99.5% reduction** on heartbeat costs.

### Prompt Caching Works for Regular Conversations Too

When you're chatting with your agent, your system prompt is also re-sent with every message. With caching enabled, you pay full price once at the start of a session, then 90% off for the rest of the conversation. Over a month of active use, this adds up to significant savings.

---

## Upgrading Web Search with Perplexity Pro

OpenClaw's built-in web search is functional, but Perplexity Pro is significantly better for research tasks.

### What Perplexity Pro Offers

- AI-powered web search that synthesizes results
- Source citations for every claim
- Deeper analysis than standard search
- Costs approximately $0.02-0.10 per search via Open Router

### Setting Up Perplexity via Open Router

1. **Create an Open Router account:**
   - Go to https://openrouter.ai/
   - Sign up
   - Add billing (start with $20)

2. **Get your Open Router API key:**
   - Go to Keys in the dashboard
   - Create a new key
   - Copy it (Notepad trick!)

3. **Add to OpenClaw:**
   ```bash
   openclaw config provider add openrouter --key YOUR_API_KEY
   ```

4. **Configure Perplexity as a search model:**
   ```bash
   openclaw config search model perplexity-pro
   ```

### Using It

Ask your agent to research something:

```
Research the current state of AI regulation in the EU.
Use web search and cite your sources.
```

With Perplexity Pro, the results are significantly more comprehensive and up-to-date than built-in search.

### Cost Tip

Cache research results. Ask your agent to save research as markdown files in your workspace:

```
Save this research to ~/.openclaw/workspace/projects/ai-regulation-eu.md
so we don't have to search for it again.
```

This turns a paid search into a free file read next time.

---

## Multi-Agent Management

As you get more comfortable, you might want separate agents for different areas of your life.

### Why Multiple Agents?

| Scenario | Problem with One Agent | Multi-Agent Solution |
|----------|----------------------|---------------------|
| Personal + work | Work context bleeds into personal conversations | Separate personal and work agents |
| Team collaboration | One agent can't serve multiple people well | Each team member gets their own agent |
| Specialized tasks | One agent can't be expert at everything | Dedicated agent for coding, another for research |

### How Multi-Agent Works

Each agent has its own:
- Identity and personality (IDENTITY.md, SOUL.md)
- Memory (MEMORY.md)
- Rules (AGENTS.md)
- Skills
- Connected channels

They share the same gateway but operate independently.

### Setting Up a Second Agent

```bash
openclaw agents create work-agent
```

This creates a new agent directory with its own set of core files. You then customize those files for the work context:

- `IDENTITY.md`: "You are [Agent]-Work, focused on professional tasks."
- `USER.md`: Work-related goals, projects, and context only
- `AGENTS.md`: Stricter rules for work communication
- `MEMORY.md`: Work projects and decisions

### Individual Agents vs. Sub-Agents

Community consensus is clear on this: **multiple individual agents with separate Telegram bots work better than one agent spinning up sub-agents.**

Why? Sub-agents that get spawned by a primary agent don't maintain their own memory between calls. They lose context, forget what they were doing, and cost more per interaction because they need the full context re-injected every time. Individual agents, by contrast:

- Maintain their own persistent memory
- Have their own Telegram bot (easy to communicate with directly)
- Don't bloat the primary agent's context window
- Are cheaper per-interaction because their context is focused

If you need a second "employee," create a second agent — don't try to make one agent do everything through sub-agents.

### The Coordination Tax: Why More Agents ≠ More Output

Google DeepMind research shows that accuracy actually **saturates or degrades past 4 agents** due to what they call the "Coordination Tax." One analysis called it the "17x error trap" — where naively adding agents to a system multiplies your error rate, not your throughput.

One experienced user ran 17 agents, talked to 3-4 regularly, and the rest were "just sitting there, burning tokens every heartbeat." After studying the research, they consolidated from 17 to 4 core agents:

1. **The Architect** (CEO function) — Strategy, capital allocation, priority-setting
2. **The Builder** (CTO/Product function) — Engineering, architecture, quality standards
3. **The Money Maker** — Growth, pricing, channels, demand generation
4. **The Operator** (COO function) — Processes, tool stack, financial ops

Everything else became a **specialist library** — 36+ pre-defined specialist types that core agents spawn when needed. Not generated at runtime; pre-defined and selected dynamically. One team across all businesses, with business-specific context injected at spawn time.

**The lesson:** Three good agents with well-crafted souls ship more than 17 mediocre ones ever could. Before adding another agent, ask: "Would a skill do this job instead?" Skills are lighter, cheaper, and don't need their own context window.

### Sub-Agent Best Practices

When your core agents *do* spawn sub-agents for bounded tasks, there's a critical distinction: **values inherit, identity does not.**

Don't tell a sub-agent "You are the CTO." Tell it "You are a code security auditor. Apply these standards: [specific standards]. Your task: review this authentication module." Give it the *values* of your CTO. Not the identity. Sub-agents with precise, task-scoped instructions outperform ones given vague identities.

### The Freshman Rule

When you do run multiple agents (or even one), treat each agent like a new hire who knows nothing beyond what's in its files. Community experience calls this the "Freshman Rule":

1. **One task per agent at a time.** If you give an AI five jobs, it fails at four. Assign one clear task, let it complete, then assign the next.
2. **Give ground-up instructions every time.** Don't assume the agent remembers your project's history or conventions. The context files are its only memory — if something isn't written there, it doesn't exist.

This applies doubly to sub-agents, which start with even less context than your main agent. The combination of clear single-task assignments and explicit instructions dramatically reduces failures and wasted tokens.

### Multi-Agent Memory Architecture

When running multiple agents, memory management becomes the difference between a functional team and chaos. The most successful multi-agent setups use a **4-layer memory architecture:**

| Layer | What It Contains | Who Sees It |
|-------|-----------------|-------------|
| **Private memory** | Each agent's own `MEMORY.md` and daily notes | That agent only |
| **Shared reference files** | Symlinked `_shared/` directory with user profile, agent roster, team conventions | All agents |
| **QMD with shared paths** | Each agent's QMD config includes the shared directory for cross-agent search | All agents (read-only search) |
| **Coordinator** | A "Chief of Staff" agent reads core files at session start and maintains consistency | Coordinator agent |

To set this up, create a shared directory and symlink it into each agent's workspace:

```bash
mkdir -p ~/.openclaw/workspace/shared
ln -s ~/.openclaw/workspace/shared ~/.openclaw/workspace/agent-1/_shared
ln -s ~/.openclaw/workspace/shared ~/.openclaw/workspace/agent-2/_shared
```

The key insight: treat agent memory like a human team's documentation. Some things are shared (handbook, org chart, project docs). Some things are private (personal notes, work in progress). Build the same structure for your agents.

### Agent-to-Agent Communication (sessions_* Tools)

OpenClaw provides three built-in tools for agent-to-agent communication — no Pinchboard or external service required:

| Tool | What It Does | Example Use |
|------|-------------|-------------|
| `sessions_list` | Discover active sessions (agents) and their metadata | "Show me which agents are currently running" |
| `sessions_history` | Fetch transcript logs from another session | "What did the research agent find this morning?" |
| `sessions_send` | Message another session directly; supports reply-back ping-pong | "Tell the ops agent to run the weekly report" |

**How it works:** Each agent runs in its own session. The `sessions_send` tool lets one agent message another, optionally with a reply-back mechanism — Agent A sends a request, Agent B processes it and sends the result back. You can even add an "announce step" where the sending agent notifies you that it's delegating work.

**Practical example:**
```
Your Chief of Staff agent receives an email about a crypto opportunity.
It uses sessions_send to forward the details to your Crypto Trader agent.
The trader evaluates, then sends back its assessment via reply-back.
The Chief of Staff summarizes everything and messages you on Telegram.
```

This is the foundation for the multi-agent architectures described below. Individual agents communicating through `sessions_send` is more reliable and cheaper than one mega-agent trying to do everything.

### The Agentic Company Structure

An advanced concept from the community: structure your agents like a company.

```
CEO (You)
  ├── Chief of Staff (Personal Agent)
  │     ├── Handles personal tasks
  │     ├── Morning briefs
  │     └── Life management
  │
  ├── CTO (Dev Agent)
  │     ├── Code generation
  │     ├── Technical research
  │     └── Project management
  │
  └── COO (Ops Agent)
        ├── Business operations
        ├── Client communication
        └── Financial tracking
```

Each "executive" agent has clear responsibilities and doesn't interfere with the others.

**Real-world example:** One user deployed 4 agents in 7 days — Sam (Chief of Staff: email, calendar, CRM management across 697 contacts), Midas (Crypto Trader: autonomous portfolio management with risk guardrails), and Ritam (Physics Research: cross-domain synthesis). They simultaneously built 3 products. This setup would have required a 10-20 person team previously — total cost was ~$600 for the week.

The pattern that works: personal OpenClaw per employee + a central team OpenClaw with shared company data. The ratio that produces best results: **50% human direction, 50% agent execution.**

> **Start simple.** One agent is enough for most people. Add more only when you have a clear need.

---

## Reverse Prompting

This is a mind-shift technique that transforms how you use your agent.

### The Normal Way (You → AI)

```
You: "Build me a landing page for my freelance business."
AI: [builds the landing page]
```

You tell the AI what to do. It does it.

### The Reverse Way (AI → You)

```
You: "Based on everything you know about me, my goals, and my current situation,
     what should I be working on right now? What would move the needle the most?"

AI: "Based on your goals and current status, here are the three highest-impact things
     you could do this week:
     1. Finish your portfolio website (you're 80% done — the last 20% is what
        actually gets you clients)
     2. Write one case study from your last project (social proof converts better
        than any other content)
     3. Set up automated follow-up emails for past leads (you mentioned you have
        leads going cold)

     Which of these should we tackle first?"
```

### Why Reverse Prompting Is Powerful

- **The AI has perfect memory** — it remembers every goal, decision, and conversation
- **The AI has no ego** — it won't avoid telling you uncomfortable truths
- **The AI sees patterns** — it can spot contradictions between your stated goals and actual behavior
- **The AI is objective** — it evaluates based on data, not emotion

### Prompts for Reverse Prompting

Try these with your agent:

**Strategic:**
```
What am I overlooking? Based on my goals and what I've been working on,
what blind spots do you see?
```

**Accountability:**
```
Review my goals from last month. What did I accomplish? What did I skip?
What pattern do you notice?
```

**Creative:**
```
If you were building my business, what would you do differently than what
I've been doing? Be honest and specific.
```

**Self-improvement:**
```
Based on our interactions, what are my three biggest strengths and three
biggest weaknesses in how I work? How can I leverage the strengths and
compensate for the weaknesses?
```

### The Docs Folder Pattern

One of the biggest token wastes: paying to re-search topics you've already researched. The fix is simple — save everything:

```bash
mkdir -p ~/.openclaw/workspace/docs
```

Every time the agent does web research, ask it to save the results:

```
Save this research to ~/.openclaw/workspace/docs/[topic-name].md
so we can reference it later without re-searching.
```

Over time, your `docs/` folder becomes a living knowledge base. The agent reads a free local file instead of making an expensive API-powered web search. This is the "living files" concept from Module 05 applied directly to cost savings.

---

## Self-Improvement Workflows

Your agent should get better over time. Here are patterns for continuous improvement.

### Weekly Agent Tuning

Every week (or make it a cron job), run this conversation:

```
Let's do our weekly tuning session:

1. What instructions in your core files feel unclear or contradictory?
2. What information about me seems outdated?
3. What do I keep asking you that should be in your memory?
4. What skills or automations would make us more efficient?
5. What suggestions do you have for improving our workflow?
```

Then actually implement the suggestions by editing the core files.

### Feedback Loop

After your agent completes a task:

```
How did that go? Rate your own performance.
What could you have done better?
What information would have helped you do a better job?
```

Then add any insights to MEMORY.md or the relevant core file.

### Token Hygiene: Regular Reviews

Your context files grow over time. Outdated entries in MEMORY.md and TOOLS.md waste tokens on every single API call because they're re-sent as part of the system prompt. Make it a weekly or nightly habit:

- Review MEMORY.md — remove entries for completed projects, outdated preferences, or stale information
- Review TOOLS.md — remove documentation for tools you no longer use
- Compress verbose sections — summarize paragraphs into bullet points
- Archive completed projects to separate files (still accessible, but not loaded into every conversation)

Specific thresholds to aim for: keep your system prompt (all core files combined) under 8,000 tokens if possible. Set context compaction at 80K tokens and memory flush at 80K tokens.

### Context Optimization

Periodically review what's in your context window:

```
How many tokens are we currently using?
What's taking up the most space?
What could we remove or condense without losing important context?
```

---

## Local Models via Ollama: Zero Marginal Cost

If you're running OpenClaw 24/7 with heavy automation, local models start to become economically compelling. Once you've paid for the hardware, every inference is free.

### What Are Local Models?

Instead of sending your messages to Anthropic or OpenAI's servers, you run the AI model on your own hardware. This means:
- **Complete privacy** — nothing leaves your machine
- **Zero marginal cost** — once set up, every inference is free
- **Full control** — no terms of service restrictions

### When Local Models Make Sense

- You have consistent, predictable load (not bursty)
- You need privacy (sensitive data that shouldn't hit external APIs)
- You're running high-volume, low-complexity tasks (data processing, classification, routine checks)
- You have spare compute (existing server, gaming PC that's idle during work hours)

### When Local Models Don't Make Sense

- You need frontier capabilities (extended reasoning, complex creative work, advanced coding)
- Your workload is bursty (you'd be paying for idle hardware)
- You don't want to manage infrastructure
- You need the best prompt injection resistance (frontier cloud models are better)

### The Community's Local Model of Choice

**Qwen 3 32B** is the current favorite for local OpenClaw deployments:
- Competitive with Claude Sonnet 3.5 on many tasks
- Runs at **40+ tokens/sec on a single NVIDIA 4090**
- Good enough for routine tasks, heartbeats, and basic conversations

Unless you're willing to shell out ~$14,000 for a decked-out Mac Studio, you won't be able to run anything in the Opus 4.6 category locally. But with a mid-range GPU ($500-1,500), you can run models that compare well with Sonnet 3.5.

### Hardware Requirements

| Model Size | RAM Needed | GPU Needed | Performance |
|-----------|-----------|-----------|-------------|
| 7-8B parameters | 8 GB | Optional (CPU works, slow) | Basic tasks, fast on GPU |
| 13B parameters | 16 GB | Recommended | Good general purpose |
| 32B parameters (Qwen 3) | 24+ GB VRAM | Required (4090 or better) | Competitive with Sonnet 3.5 |
| 70B+ parameters | 48+ GB VRAM | Multiple GPUs | Approaching Opus quality |

### Getting Started (If Interested)

```bash
# Install Ollama (inside WSL2)
curl -fsSL https://ollama.com/install.sh | sh

# Download Qwen 3 32B (if you have the hardware)
ollama pull qwen3:32b

# Or a smaller model for testing
ollama pull qwen3:8b

# Configure OpenClaw to use it
openclaw config provider add ollama --model qwen3:32b
```

> **For this course,** we'll stick with cloud models. Local models are best explored after you've mastered the basics and want to optimize for specific use cases.

---

## Common Mistakes and Troubleshooting

| Mistake | Why It's a Problem | Fix |
|---------|-------------------|-----|
| Using Opus for everything | Expensive, unnecessary for routine tasks | Set up brains and muscles model |
| Not enabling prompt caching | Paying full price for system prompts on every API call | Enable cacheSystemPrompts in config — instant 90% savings on static context |
| Heartbeat interval at 30 min without caching | Cache expires, every heartbeat pays full price | Set to 55 minutes to stay within Anthropic's cache window |
| Setting up 5 agents before mastering 1 | Adds complexity without benefit | Master one agent, then expand |
| Ignoring reverse prompting | You're leaving the most powerful feature unused | Try it once a week — ask your agent what you should do |
| Never doing agent tuning | Agent's knowledge becomes stale | Schedule weekly tuning (even 10 minutes helps) |
| Running expensive web searches for things already researched | Wastes money | Save research to files, reuse later |
| Expecting local models to match Opus | They won't — they're smaller and less capable | Use local for low-stakes tasks, cloud for important work |

---

## Class Discussion: Design Your Ideal Multi-Agent Setup

This is a thought exercise — you don't need to build it today.

### Part 1: Map Your Life Domains (10 minutes)

List the 3-5 main areas of your life that could benefit from an AI agent:
- Personal life (health, learning, scheduling)
- Professional work (clients, projects, coding)
- Business (strategy, marketing, operations)
- Creative (writing, music, art)
- Other

### Part 2: Design the Roles (10 minutes)

For each domain, describe:
- What would the agent focus on?
- What personality should it have?
- What tools and skills would it need?
- What model should it use?

### Part 3: Start Simple (5 minutes)

Pick the ONE domain that would benefit most from dedicated attention. That's your first agent. Master it before adding more.

---

## Key Takeaways

1. **OpenClaw burns money by default** — it sends everything to your primary model; five cost mechanisms compound to create huge bills
2. **Brains and Muscles saves serious money** — expensive model for thinking, cheap models for execution
3. **Prompt caching is the biggest hidden savings** — 90% off system prompt costs; use the 55-minute heartbeat trick
4. **ClawRouter automates routing** — classifies query complexity and routes to cheapest capable model automatically
5. **Model switching is easy** — `/model [model-name]` changes mid-conversation
6. **Budget models like Kimi K2.5 and MiniMax M2.5** are surprisingly capable for routine tasks
7. **Perplexity Pro upgrade is worth it** — significantly better web search for research tasks
8. **Multi-agent is powerful but complex** — master one agent before creating more
9. **Reverse prompting is the secret weapon** — let the AI analyze your situation and suggest actions
10. **Qwen 3 32B is the local model to try** — competitive with Sonnet 3.5, runs at 40+ tokens/sec on a 4090

---

## Further Reading

- Source material in the `../Research/` folder:
  - `How to Reduce OpenClaw Model Costs by up to 90% (Full Guide).md` — **The definitive cost optimization guide**: routing, prompt caching, ClawRouter, local models, provider comparison
  - `I made my OpenClaw 10x more powerful (seriously).md` — Brains/muscles, model switching, Perplexity Pro, cron jobs, living files
  - `100 hours of OpenClaw lessons in 35 minutes.md` — Reverse prompting, multi-agent, mission control
  - `OpenClaw Full Tutorial for Beginners – How to Set Up and Use OpenClaw (ClawdBot MoltBot).md` — Multi-agent configuration

---

## What's Next

You now know the advanced techniques. But with great power comes the need for greater security.

In **[Module 10: Security Hardening](Module-10-Security-Hardening.md)**, we'll deep-dive into sandboxing with Docker, tool policies, gateway hardening, and security audits. This is where we lock everything down properly.
