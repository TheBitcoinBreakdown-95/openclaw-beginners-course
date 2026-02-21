# Module 00: What Is OpenClaw?

> **Estimated time:** 30 minutes
> **Prerequisites:** None — this is where we start
> **What you'll need:** Just your attention

---

## Learning Objectives

By the end of this module, you will be able to:

1. Explain what OpenClaw is in one sentence to someone who has never heard of it
2. Describe how OpenClaw differs from ChatGPT, Claude, and other AI chatbots
3. Explain the "Gateway" concept in plain English
4. List the five core capabilities that make OpenClaw unique
5. Understand why people are excited about this technology — and why they should also be cautious

---

## Key Vocabulary

Before we begin, here are terms you'll encounter in this module. Don't memorize them now — just know they're here if you need to look something up.

| Term | Definition |
|------|-----------|
| **OpenClaw** | An open-source AI personal assistant that runs on your own hardware and connects to your messaging apps |
| **Gateway** | The central process that runs on your machine and coordinates everything — receiving messages, talking to AI models, executing actions |
| **LLM** | Large Language Model — the AI "brain" (like Claude, ChatGPT, or Gemini) that processes your messages and generates responses |
| **Open Source** | Software whose code is publicly available for anyone to inspect, modify, and use for free |
| **Persistent Memory** | The ability to remember information across conversations, permanently — not just within a single chat session |
| **Shell Access** | The ability to run commands on your computer's terminal/command line — like a human sitting at your keyboard |
| **Daemon** | A program that runs continuously in the background, even when you're not looking at it (pronounced "dee-mon") |
| **API Key** | A secret password that lets software connect to an AI service (like Anthropic's Claude API) |
| **Proactive** | Acting on its own initiative, without waiting for you to ask — the opposite of reactive |
| **Skill** | A set of instructions (usually a markdown file) that teaches your OpenClaw agent how to use a specific tool or perform a specific task |

---

## The Problem OpenClaw Solves

Let's start with what life looks like WITHOUT OpenClaw, because you're probably living this right now:

- You're paying for ChatGPT, Claude, maybe Gemini
- Every time you want something done, you open a new tab, start a new conversation
- The AI forgets everything you told it yesterday
- Your messages are scattered across WhatsApp, Telegram, Slack, email
- If you want AI to actually DO something (not just talk), you're copying and pasting between a dozen apps
- It feels like 2012

This is the current state of AI for most people. The intelligence exists. The tools exist. But **the infrastructure to make it actually useful in your daily life** — that's been missing.

OpenClaw is that missing infrastructure.

---

## What OpenClaw Actually Is

Here's the one-sentence version:

> **OpenClaw is an open-source AI personal assistant that runs on your own computer, lives inside the messaging apps you already use, remembers everything across all conversations, and can take real actions on your behalf — 24 hours a day, 7 days a week.**

Let's break that down piece by piece.

### "Open-source"

OpenClaw's code is completely free and public. You can download it, inspect it, modify it, and run it without paying anyone. The project was created by **Peter Steinberger** and is maintained by a growing community. The code lives on GitHub at [github.com/openclaw/openclaw](https://github.com/openclaw/openclaw).

This matters because:
- You're not locked into anyone's platform
- You can see exactly what the software does (no hidden data collection)
- If it does something you don't like, you (or the community) can change it
- It's free — the only cost is the AI model you choose to power it

### "Runs on your own computer"

Unlike ChatGPT or Claude's web interface (where the AI runs on someone else's servers), OpenClaw runs on YOUR machine. Your laptop. Your desktop. Your old dusty computer in the closet. A Mac Mini. A Raspberry Pi. Whatever you have.

The only requirement is that the device can run **Node.js** (a common programming runtime). If your computer was made in the last 10 years, it almost certainly can.

**Why does this matter?** Because when AI runs on YOUR hardware:
- Your data stays with you (it's not sent to some company's cloud)
- You have full control over what the AI can and cannot do
- It runs 24/7 as long as your computer is on
- You're not subject to anyone's terms of service or usage limits (beyond the AI model's API)

### "Lives inside the messaging apps you already use"

This is the key insight that makes OpenClaw different from every other AI tool.

**You don't go to OpenClaw. OpenClaw comes to you.**

You message it on **Telegram**. Or **WhatsApp**. Or **Discord**. Or **Slack**. Or **iMessage**. Or **Signal**. Or **Microsoft Teams**. Or **Google Chat**. Whatever app you already have open, that's where OpenClaw lives.

You text it from your phone while you're at the grocery store. It responds in the same thread. No new app to download. No website to visit. No special interface to learn.

### "Remembers everything across all conversations"

This is probably the biggest difference from normal AI chatbots.

When you use ChatGPT or Claude on the web, the AI has limited memory. Start a new conversation, and it's like talking to a stranger again. There's some memory features now, but they're basic and unreliable.

OpenClaw stores **everything** locally on your machine. Every conversation, every detail you share, every preference you mention. It remembers:
- Your name, your goals, your ambitions
- What projects you're working on
- Your preferences for how you like things done
- Past conversations and decisions
- What tools and workflows you've set up

This means the more you use OpenClaw, the **better and more personalized** it becomes. It's not starting from scratch every time. It's building on everything it knows about you.

### "Can take real actions on your behalf"

This is where it gets powerful — and where it gets dangerous (which is why Module 01 is about security).

OpenClaw doesn't just chat. It can:
- **Execute commands** on your computer (like a person sitting at your terminal)
- **Read and write files** on your machine
- **Browse the web** using a real browser
- **Send messages** through your connected apps
- **Create and run scheduled tasks** (like sending you a morning briefing every day at 8am)
- **Build software** (it can write code and run it)
- **Control other apps** through their APIs (calendar, email, to-do lists, etc.)

Anything a human can do sitting at your computer, OpenClaw can do too. That's what makes it revolutionary. It's also what makes it dangerous if you don't set it up carefully.

### "24 hours a day, 7 days a week"

Because OpenClaw runs as a **daemon** (a background process) on your machine, it doesn't stop when you close a window. It doesn't sleep when you sleep. It's always running, always checking, always available.

This means:
- You can text it at 3am and get an answer
- It can do work while you sleep (research, writing, building)
- It can monitor things for you and alert you when something needs attention
- It can send you a morning briefing before you wake up

---

## How OpenClaw Differs from What You Already Use

| Feature | ChatGPT / Claude Web | OpenClaw |
|---------|---------------------|----------|
| Where it runs | On someone else's servers | On YOUR computer |
| How you access it | Through a website | Through Telegram, WhatsApp, Discord, etc. |
| Memory | Limited, unreliable | Persistent, permanent, stored locally |
| Can take actions? | No (just talks) | Yes (shell access, browser, file system, APIs) |
| Proactive? | No (waits for you to ask) | Yes (can message you, do work on its own) |
| Runs 24/7? | Only when you have the tab open | Yes, runs as a background service |
| Customizable? | Limited settings | Fully open-source, infinitely customizable |
| Cost | Subscription ($20-200/month) | Free (you only pay for the AI model API) |
| Data ownership | Company owns your data | You own everything |

### How OpenClaw Differs from Claude Code

If you've used **Claude Code** (Anthropic's CLI coding tool), you might be wondering how OpenClaw compares. They're related but different:

- **Claude Code** is a terminal-based **coding agent**. It writes code, tests it, and ships it. It's designed for software developers working in a codebase.
- **OpenClaw** is an autonomous **life agent**. It manages email, calendar, messaging, research, and anything else in your daily life. It's designed for everyone.

Think of it this way: Claude Code handles your **codebase**. OpenClaw handles your **life**. They're complementary tools, not competitors.

Fun fact: OpenClaw is actually built on some of the same foundations as Claude Code. And you can even install Claude Code as a *skill* inside OpenClaw so your agent can code for you.

---

## The Gateway: How It All Works

The word "Gateway" comes up constantly in OpenClaw. Understanding it is key to understanding the whole system.

### The Simple Explanation

The **Gateway** is the central brain of your OpenClaw setup. It's a program that runs on your computer and does three things:

1. **Receives messages** from your connected apps (Telegram, WhatsApp, Discord, etc.)
2. **Sends those messages to an AI model** (like Claude Opus 4.6) for processing
3. **Takes the AI's response** and sends it back to whichever app the message came from

That's it. Message in → AI processes → Response out.

### A Slightly More Detailed Explanation

```
YOU (on your phone)
    |
    | Send a message on Telegram: "Hey your agent, what's on my calendar today?"
    |
    v
TELEGRAM SERVERS
    |
    | Message forwarded via Telegram Bot API
    |
    v
YOUR LAPTOP (running OpenClaw Gateway)
    |
    | Gateway receives the message
    | Gateway loads context (your preferences, memory, conversation history)
    | Gateway sends everything to the AI model
    |
    v
ANTHROPIC'S API (Claude Opus 4.6)
    |
    | AI processes your message + context
    | AI generates a response
    | AI might decide to use tools (check calendar, browse web, etc.)
    |
    v
YOUR LAPTOP (Gateway receives AI response)
    |
    | If AI used tools: Gateway executes them on your machine
    | Gateway sends the response back through Telegram
    |
    v
TELEGRAM SERVERS
    |
    | Response delivered to your phone
    |
    v
YOU (reading your agent's response on Telegram)
```

### What Stays Local vs. What Leaves Your Computer

This is important for understanding privacy:

**Stays on your computer (never leaves):**
- All your files and data
- Your conversation history and memory
- Your configuration and preferences
- Tool execution (commands run on YOUR machine)
- Your workspace files

**Leaves your computer:**
- The text of your messages (sent to the AI provider's API for processing)
- Web searches (if you enable web search tools)
- Messages sent through platforms (obviously, Telegram/WhatsApp messages go through their servers)
- Provider usage tracking (OpenClaw checks your API usage/quota against provider endpoints)
- ClawHub telemetry when syncing skills while logged in (can be disabled with `CLAWHUB_DISABLE_TELEMETRY=1`)
- Remote embeddings for memory search (when using cloud-based embedding providers for your agent's memory retrieval)

> **"Local-first" does NOT mean "offline."** Even with a local Gateway, your agent makes outbound calls for model inference, usage tracking, and optionally memory indexing. A truly privacy-conscious setup requires explicitly enumerating and controlling these call paths — we cover this in Module 10.

The key thing to understand: the AI model itself doesn't run on your laptop (unless you use local models, which is an advanced topic in Module 09). You're sending messages to an API (like Anthropic's) and getting responses back. But all the **storage, memory, execution, and coordination** happens on your machine.

---

## The Five Core Capabilities

Let's summarize what makes OpenClaw unique with five core capabilities:

### 1. Persistent Memory
Your agent remembers everything, forever. Not just within a conversation — across ALL conversations. It stores memories, facts, preferences, and context in local files on your machine. The more you use it, the smarter and more personalized it becomes.

### 2. Proactive Automation
Your agent doesn't just wait for you to ask. Through **heartbeats** (periodic check-ins) and **cron jobs** (scheduled tasks), it can:
- Send you a morning briefing every day
- Monitor your email and alert you about important messages
- Research topics on its own and report back
- Build things while you sleep

### 3. Multi-Platform Messaging
One agent, every platform. Telegram, WhatsApp, Discord, Slack, iMessage, Signal, Microsoft Teams, Google Chat — your agent lives wherever you are. No new app to learn.

### 4. Full Computer Access
Your agent can do anything a human can do at a computer: run commands, read/write files, browse the web, interact with APIs, install software, build applications. This is what makes it powerful. This is also what makes it dangerous (see Module 01).

### 5. Self-Improving & Customizable
Because it's open source and has access to its own configuration:
- It can modify its own memory and context files
- It can build new tools for itself (skills)
- It can change its own settings when you ask
- The community shares skills through ClawHub (a skill marketplace with 5,700+ skills)
- You can ask your agent to improve itself, and it will

### Beyond Text: Canvas and Voice

Two capabilities that extend OpenClaw well beyond chat:

- **Live Canvas (A2UI):** An agent-driven visual workspace. Your agent can push interactive UI — dashboards, charts, forms, visualizations — directly to a canvas you control on your device. Think of it as the agent building a custom app interface on the fly. This is accessible via macOS, iOS, and Android companion apps.
- **Voice Wake + Talk Mode:** Always-on speech for macOS, iOS, and Android via ElevenLabs. You can talk to your agent naturally and hear it respond with a realistic voice. Voice Wake detects when you start speaking; Talk Mode keeps a continuous conversation flowing. Combined with the canvas, this approaches a true voice-driven AI assistant.

Both features are optional and covered in more detail in Module 09.

### Bonus: Agent-to-Agent Communication (Pinchboard)

As you get deeper into OpenClaw, you'll discover that agents can communicate with **each other** through a system called **Pinchboard** — think of it as a Twitter-like social network for AI agents. One agent posts updates, others subscribe and react. This enables multi-agent coordination without you having to manually route messages between them.

For example, your personal assistant agent could post "User has a meeting at 3pm" and your research agent could see that and prioritize finishing its report before then. This is an advanced feature (covered in Module 09), but it's worth knowing that the architecture supports it from the ground up.

---

## The Brief History

Understanding the name changes helps when you're reading community resources:

| Name | Period | Notes |
|------|--------|-------|
| **Clawdbot** | Early development | The original name. "Clawd" spelled with a W — like a lobster claw, not related to Claude/Anthropic |
| **MoltBot** | Brief transition period | Short-lived name change (molting = a lobster shedding its shell) |
| **OpenClaw** | Current (2026+) | The official name. Open source + Claw (lobster). Logo is a lobster. |

The creator, **Peter Steinberger**, apparently came out of retirement to build this. The mascot is a lobster because of the claw wordplay. The community is called "Friends of the Crustacean."

When you see people online talking about "Clawdbot" or "MoltBot," they're talking about OpenClaw.

---

## Real-World Use Cases

People are doing wild things with OpenClaw. Here are real examples from the community:

**Personal Assistant:**
- Custom morning briefings with weather, news, to-do lists, and task recommendations
- Calendar management and meeting preparation
- Email triage and response drafting

**Second Brain:**
- One person connected WhatsApp and uses their agent as a persistent knowledge base — anything they tell it, it remembers and can recall later
- Research that persists across sessions (your agent can deep-dive a topic over days)

**Health & Fitness:**
- Someone connected their Whoop fitness tracker and gets daily health summaries
- Another person has their agent handling health insurance reimbursements

**Business Automation:**
- Agents that monitor Twitter/X for trends and write content based on them
- Automated newsletter drafting
- Customer research and lead generation
- Multi-agent company structures where personal agents communicate with a central "team" agent

**Software Development:**
- Agents that vibe-code entire applications
- "Mission Control" dashboards built by the agent for the agent
- Approval queues where the agent drafts content and waits for human sign-off

**Smart Home:**
- Tesla control through a skill
- Smart home device management
- Restaurant bookings using AI voice (via ElevenLabs integration)

### Real Results: What's Possible in One Week

To put this in perspective, here's what one early adopter accomplished in **seven days** with OpenClaw:

- Built **3 products** from scratch (a notes app, an Obsidian replacement, and a Telegram AI tool)
- Deployed **4 autonomous agents** — Sam (Chief of Staff: email, calendar, CRM), Midas (Crypto Trader: autonomous portfolio management), Ritam (Physics Research: cross-domain synthesis), and a general personal assistant
- Total cost: approximately **$600** in AI API usage

In traditional terms, this would have required a 10-20 person team, 6-9 months of development, and over $1M in costs. This is the kind of acceleration that's possible — though expect your first week to be more about learning and configuration than production output (see Module 11 for realistic expectations).

The use cases are limited only by your imagination and how much access you're willing to give your agent.

---

## Who Is This For?

**OpenClaw is for you if:**
- You want an AI that actually remembers you and gets smarter over time
- You're tired of copy-pasting between AI chatbots and your real apps
- You like the idea of having a "second brain" that lives in your messages
- You're willing to invest time setting it up properly and securely
- You want full control over your AI system and your data

**OpenClaw might NOT be for you if:**
- You want something that "just works" out of the box with zero configuration
- You're not willing to learn about security risks
- You want a plug-and-play SaaS tool with customer support
- You're uncomfortable with the idea of an AI having access to your computer

As one of the video creators put it: *"This is not a plug-and-play SaaS tool. It's infrastructure. And infrastructure requires deliberate configuration and ongoing maintenance."*

---

## The Mindset You Need

Before we move on, here are the mental models that will help you succeed with OpenClaw:

### 1. Think of it as a super-intelligent employee, not a tool
You are the **manager**. your agent is your employee. You don't micromanage. You give goals and objectives. You say "I want X result" — not "do step 1, then step 2, then step 3." Let your agent figure out the how.

### 2. Don't touch the config files manually
If you want your agent to behave differently, **tell it in plain English**. Say "Hey your agent, change your heartbeat to every 15 minutes." Don't go digging in JSON files. Your agent can modify its own configuration better than you can.

### 3. Reverse prompting is your superpower
Instead of always telling your agent what to do, **ask it questions**:
- "Based on what you know about me, what should we build?"
- "What tasks could you do today that would bring me closer to my goals?"
- "How would you improve our current workflow?"

This is called **reverse prompting** and it's the single most powerful habit you can develop with OpenClaw.

### 4. Every hour you invest pays dividends forever
Unlike a ChatGPT conversation that disappears, every improvement you make to your OpenClaw — every preference you share, every file you create, every workflow you set up — is permanent. It compounds over time. An hour spent today will save you hours every week for as long as your agent runs.

### 5. Security is not optional
With great power comes great responsibility. Your agent has admin-level access to your computer. Treat this seriously. We cover this in depth in the next module.

---

## Common Mistakes & Misconceptions

| Mistake | Reality |
|---------|---------|
| "I need a Mac Mini to run OpenClaw" | No. Any computer with Node.js works. An old laptop is fine. |
| "I should put this on a VPS" | For beginners, local is better. Easier to set up, more secure by default, better integration with your life. |
| "Installation is complicated" | It's literally one command and a setup wizard. |
| "I need coding experience" | You don't. You talk to your agent in plain English. |
| "It's free to run" | OpenClaw itself is free. But you'll pay for the AI model's API usage (like Anthropic or OpenAI). Budget $20-200/month depending on your usage and model choice. |
| "It's totally safe" | It is NOT totally safe. It has shell access to your computer. Read Module 01. |

---

## Class Exercise

Take 10 minutes and answer these questions (write them down — you'll use these answers later when you introduce yourself to your agent):

1. **What's your name and what do you do?** (Job, hobbies, interests)
2. **Why are you interested in OpenClaw?** (What problem do you want to solve?)
3. **What are 3 things you wish an AI assistant could do for you automatically?**
4. **What are you nervous about?** (Security concerns, technical ability, etc.)
5. **What are your goals for the next 6 months?** (Personal, professional, anything)

Save these answers. They'll become the foundation of your "brain dump" in Module 04.

---

## Key Takeaways

- OpenClaw is an open-source AI assistant that runs on YOUR hardware, connects to YOUR messaging apps, and remembers EVERYTHING
- The Gateway is the central process that coordinates messages, AI, and actions
- It can do anything a human can do at a computer — which is both its power and its danger
- You don't need a Mac Mini, a VPS, or coding experience
- Security is critical and non-negotiable (covered in Module 01)
- Think of your agent as an employee, not a tool. Give it goals, not instructions.
- Every improvement you make compounds forever

---

## Further Reading

- [OpenClaw Official Website](https://openclaw.ai/)
- [OpenClaw GitHub Repository](https://github.com/openclaw/openclaw)
- [OpenClaw Official Documentation](https://docs.openclaw.ai/)
- Reference: `Why Everyone's Buying a Mac Mini for Clawdbot.md` (in this directory)
- Reference: `100 hours of OpenClaw lessons in 35 minutes.md` (in this directory)

---

**Next up:** [Module 01: Understanding the Risks →](Module-01-Understanding-the-Risks.md)

*Read Module 01 before you install anything. This is not optional.*
