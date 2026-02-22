# Module 04: Your First Conversation

## Learning Objectives

By the end of this module, you will be able to:

1. Navigate the TUI (Terminal User Interface) confidently
2. Introduce yourself to your OpenClaw agent properly (the "brain dump")
3. Name your agent and give it an identity
4. Understand the token counter and why it matters
5. Use the essential slash commands: `/compact`, `/status`, `/new`, `/help`, `/exit`
6. Understand how context windows work and why conversations "fill up"
7. Have a productive first session with your agent

---

## Key Vocabulary

| Term | Definition |
|------|-----------|
| **TUI** | Terminal User Interface — the interactive chat inside your terminal where you talk to your agent |
| **Context window** | The amount of text (measured in tokens) that the AI can "remember" in a single conversation. Once it's full, older messages start falling off |
| **Tokens** | The units AI models use to process text. Roughly: 1 token ≈ ¾ of a word. "Hello, how are you?" ≈ 6 tokens |
| **Brain dump** | The initial download of information you give your agent — who you are, what you want, how you think, what your goals are |
| **Slash command** | A command starting with `/` that tells OpenClaw to perform an action rather than send a message to the AI. Like `/compact` or `/status` |
| **Session** | A single conversation thread with your agent. Starting a new session (`/new`) begins a fresh conversation |
| **Compact** | A command (`/compact`) that summarizes your conversation to free up space in the context window |

---

## Opening the TUI

Open your Ubuntu terminal and run:

```bash
npx openclaw tui
```

> **Paste tip:** Ctrl+V does not work in the Ubuntu terminal. Whenever you need to paste text into the TUI, use **right-click** instead. If paste stops working, close the Ubuntu window and reopen it from the Start Menu.

The TUI takes over your terminal and becomes a full-screen chat interface. Here's what you see:

```
┌──────────────────────────────────────────────────────┐
│  OpenClaw · claude-opus-4-6 · Tokens: 0              │
├──────────────────────────────────────────────────────┤
│                                                       │
│                                                       │
│  (conversation appears here)                         │
│                                                       │
│                                                       │
├──────────────────────────────────────────────────────┤
│  > Type your message here...                         │
└──────────────────────────────────────────────────────┘
```

**Key elements:**
- **Top bar:** Shows the model name and token count
- **Middle area:** The conversation — your messages and the AI's responses
- **Bottom input:** Where you type your messages and commands
- **Token counter:** Shows how many tokens you've used in this session (this number will climb)

---

## The Brain Dump

The most important thing you can do in your first conversation is a **brain dump** — a thorough introduction of yourself to your agent. This is not small talk. This is downloading your life, personality, goals, and preferences into the AI's memory.

### Why the Brain Dump Matters

Without a brain dump, your AI agent is generic. It doesn't know who you are, what you care about, what you're trying to accomplish, or how you like to communicate. It's like hiring an employee and never telling them anything about the company or their role.

After a brain dump, your agent becomes *yours*. It understands your context, anticipates your needs, and communicates in a way that feels natural to you.

### The Brain Dump Template

Here's a template. You don't need to include everything — adapt it to what feels right. But the more you share, the more useful your agent becomes.

Copy this template, fill it in, and paste it as your first message:

```
Hi! I'd like to introduce myself and set you up as my personal AI assistant.

**Who I am:**
- Name: [Your name]
- Location: [City/Country]
- Age: [Optional]
- Occupation: [What you do]
- Background: [Brief career/life history]
- Expertise: [What you're good at]

**My personality and communication style:**
- I prefer [direct/detailed/casual/formal] communication
- I like [short answers / thorough explanations / both depending on context]
- I value [honesty/efficiency/creativity/precision — whatever matters to you]
- When I'm wrong, I want you to [tell me directly / gently suggest alternatives]

**My goals and ambitions:**
- Short-term (next 30 days): [What you're working on right now]
- Medium-term (next 6 months): [What you want to accomplish]
- Long-term (1-3 years): [Your bigger vision]
- Personal: [Health, relationships, hobbies, learning goals]
- Professional: [Career, projects, business goals]

**My daily life:**
- I typically wake up at [time] and go to bed at [time]
- My work hours are [hours]
- My main tools are [list the tools and apps you use daily]
- My main challenges are [what you struggle with or wish you had help with]

**What I want you to help me with:**
- [List specific things: scheduling, research, writing, coding, organizing, etc.]
- [Be as specific as possible]

**Rules for you:**
- [Any specific preferences: "Don't sugarcoat things," "Always include sources,"
  "Ask me before taking any action," etc.]
- [Boundaries: "Never access my email without asking," etc.]

Please remember all of this. I want you to be my personal assistant and
use this information to help me more effectively.
```

### Example Brain Dump (Adapted for This Course)

Here's an example of what a filled-in brain dump might look like:

```
Hi! I'd like to introduce myself and set you up as my personal AI assistant.

**Who I am:**
- Name: Alex
- Location: Austin, Texas
- Occupation: Freelance web developer and aspiring entrepreneur
- Background: Self-taught programmer, 3 years of experience with JavaScript
  and React. Previously worked in sales for 5 years.
- Expertise: Frontend development, sales psychology, Bitcoin basics

**My personality and communication style:**
- I prefer direct communication — don't waste words
- For simple questions, give me short answers
- For complex topics, explain thoroughly with examples
- I value honesty over politeness — if my idea is bad, tell me
- I tend to start too many projects. Help me stay focused.

**My goals:**
- Short-term: Launch my freelance portfolio website this month
- Medium-term: Build a SaaS product and get first 10 paying customers
- Long-term: Build a one-person business making $10K/month
- Personal: Read 2 books per month, exercise 4x per week

**My daily life:**
- Wake up at 6:30 AM, bed by 11 PM
- Work hours: 8 AM - 5 PM (flexible)
- Tools: VS Code, Figma, Notion, Telegram, GitHub
- Main challenge: I get distracted by new ideas and don't finish things

**What I want you to help me with:**
- Morning briefings (news, weather, my to-do list)
- Research (market analysis, competitor research, tech decisions)
- Writing (emails, proposals, documentation)
- Accountability (checking in on my goals, reminding me of priorities)
- Learning (explaining concepts, recommending resources)

**Rules:**
- Don't sugarcoat things. I want to hear the truth.
- Always ask before executing any command that could delete files or cost money.
- When I say "quick answer," give me 1-2 sentences max.
- Proactively suggest things I should be working on based on my goals.

Please remember all of this.
```

### Send the Brain Dump

Paste your filled-in template into the TUI (remember: **right-click** to paste) and press Enter. Your agent will respond — usually with something like:

```
Thank you for the thorough introduction! I've noted all of this and will use it
to serve you better. A few highlights I want to confirm:

- I'll keep communication direct and honest
- I'll help you stay focused and avoid starting too many projects
- I'll check before any destructive or costly actions
- I'll proactively suggest priorities based on your goals

Is there anything else you'd like me to know? I'm ready to get started.
```

> **Don't worry if your first brain dump isn't perfect.** You can always add more information later. In Module 05, we'll edit the persistent memory files directly, which is even more powerful.

### Alternative: Let the Agent Interview You

If staring at a blank template feels overwhelming, try this instead — let the agent lead the conversation:

```
I want you to interview me so you can build a complete profile.
Ask me one question at a time about who I am, my goals, my preferences,
and how I like to communicate. Keep going until you have a thorough
understanding of me. Then summarize everything you've learned.
```

Many users find this approach produces better results than filling in a template themselves. The agent knows what information it needs and asks targeted questions. It also catches details you might not have thought to include — like how you handle deadlines, what frustrates you, or how you prefer bad news delivered.

After the interview, the agent can format everything into structured markdown that goes directly into your core files (Module 05).

---

## Naming Your Agent

Your OpenClaw agent deserves a name. It gives you something to call it, makes the experience more personal, and reinforces the "AI employee" mental model.

### How to Name Your Agent

Send a message like:

```
From now on, your name is [Your Agent's Name]. You are my AI personal assistant.
I want you to embody these qualities: wisdom, patience, directness,
and a quiet confidence. You don't need to be flashy — just reliable
and excellent.
```

Your agent will acknowledge the name and start using it.

> **Note:** The name is stored in memory for this session, but to make it permanent, we'll configure it in the identity files in Module 05. For now, this is enough.

### Choosing a Name

Some guidelines:

- **Make it something you'll enjoy saying.** You'll use this name a lot.
- **Give it meaning.** Names with personal significance (from books, mythology, history) make the relationship feel more real.
- **Avoid generic names.** "Assistant" or "Bot" are forgettable. You want something that has presence.

Popular choices from the community include names from mythology (Athena, Odin), literature (Jarvis, Jeeves), and history (Seneca, Tesla).

---

## Essential Slash Commands

Slash commands are your tools for controlling OpenClaw. They're typed in the TUI input field and start with `/`. They're not messages to the AI — they're instructions to the system.

Here are the essential commands you need to know from day one:

### `/help` — See All Available Commands

```
/help
```

Displays a list of all available slash commands with brief descriptions. There are 46+ commands available. You don't need to memorize them all — just the ones below.

### `/status` — Check System Status

```
/status
```

Shows you:
- Which model you're using
- How many tokens you've consumed
- Gateway status
- Connected channels
- Current session info

Use this when you want to know "what's going on right now."

### `/compact` — Save Tokens (IMPORTANT)

```
/compact
```

This is one of the most important commands. Here's what it does:

When you chat with the AI, every message (yours and the AI's) takes up space in the **context window** — the total amount of text the model can hold in its "working memory." The context window is large but finite (typically 128K-200K tokens for modern models).

When the window fills up, the oldest messages get dropped. You lose context.

`/compact` summarizes the conversation so far into a condensed form, freeing up space. It can reduce token usage by approximately **67%**.

**When to use it:**
- When the token counter gets high (above 50,000)
- Before starting a new, different topic in the same session
- When your agent starts "forgetting" things you mentioned earlier in the conversation

**Example:** You've been chatting for a while and the token counter shows 80,000 tokens. You type `/compact`. The counter drops to ~27,000. You've freed up over 50,000 tokens of space.

### `/new` — Start a Fresh Session

```
/new
```

Starts a completely new conversation. The previous session is saved in your history, but the AI starts with a clean context window.

**When to use it:**
- When you're switching to a completely different topic
- When the conversation has gotten very long and confusing
- When you want a fresh start

> **Important:** `/new` doesn't erase your agent's permanent memory (the files in `~/.openclaw/`). It just starts a new conversation thread. your agent still remembers who you are from the memory files.

### `/exit` — Leave the TUI

```
/exit
```

Exits the TUI and returns you to your normal terminal. The gateway keeps running in the background (because it's a daemon).

You can also use `Ctrl + C` to exit.

### `/think <level>` — Control Thinking Depth

```
/think high
```

Controls how deeply the AI model reasons before responding. This is powerful for complex tasks — higher thinking means better reasoning, but uses more tokens.

**Levels:** `off` | `minimal` | `low` | `medium` | `high` | `xhigh`

**When to use it:**
- `off` or `minimal` for quick factual questions
- `medium` for general tasks
- `high` or `xhigh` for complex analysis, code generation, or multi-step reasoning

> **Tip:** Start with the default and only increase thinking when you notice the AI is making reasoning errors on a complex task.

### `/config` — Change Settings

```
/config
```

Opens the configuration interface where you can change settings like:
- AI model
- Gateway settings
- Channel configuration
- Hooks and automations

We'll use this in later modules.

---

## Understanding the Token Counter

The token counter in the top bar of the TUI shows how many tokens your current conversation has consumed. Let's understand what this means.

### What Are Tokens?

Tokens are the units AI models use to process text. They're roughly:
- 1 token ≈ ¾ of a word (in English)
- "Hello" = 1 token
- "Hello, how are you today?" ≈ 7 tokens
- A full page of text ≈ 500-800 tokens
- A long email ≈ 200-500 tokens

### Why Tokens Matter

Tokens matter for two reasons:

**1. Cost:** You pay per token. With Claude Opus 4.6:
- Input tokens (your messages): ~$15 per million tokens
- Output tokens (AI responses): ~$75 per million tokens
- A typical back-and-forth conversation might cost $0.05-0.50

**2. Context window:** The model can only hold a certain number of tokens at once. When you hit the limit, old messages are dropped and the AI "forgets" earlier parts of the conversation.

### Managing Token Usage

| Strategy | What It Does | When to Use |
|----------|-------------|-------------|
| `/compact` | Compresses conversation history | Token counter above 50,000 |
| `/new` | Starts fresh session | Switching topics entirely |
| Short prompts | Uses fewer input tokens | When you don't need long explanations |
| "Quick answer" prefix | AI gives shorter responses | When you just need a fact, not an essay |
| Cheaper model | Lower cost per token | Routine tasks, simple questions |

---

## Voice Messages: Talk Instead of Type

Once you connect Telegram (Module 06), you can skip typing entirely. Telegram supports voice messages natively — hold the microphone button, talk naturally, and send.

OpenClaw can process voice messages using **Groq** for free transcription. Your spoken words get converted to text and processed as normal messages.

Why this matters:
- **Brain dumps are 10x faster by voice** — talking is faster than typing a multi-paragraph introduction
- **Complex instructions are easier to explain verbally** — you can ramble, add context, and think out loud
- **It feels more natural** — like talking to an actual assistant instead of chatting with a bot

To enable voice transcription, install the Groq integration (free) — we'll cover this when you set up Telegram in Module 06.

---

## Your First Real Conversations

Now that you know the commands, let's have some real conversations. Here are three great things to try in your first session:

### Conversation 1: Test the Waters

Start simple. Ask your agent something you already know the answer to — this lets you evaluate the quality of responses:

```
What are the three most important principles of personal finance?
```

See how the response compares to what you'd expect. Is it accurate? Is it well-structured? Does the tone match what you requested in your brain dump?

### Conversation 2: Ask for a Plan

Test your agent's ability to plan and organize:

```
I want to learn about Bitcoin in the next 30 days. Can you create a
study plan for me? I have about 30 minutes per day. I'm a complete
beginner but I understand basic economics.
```

This tests the AI's ability to:
- Remember your background (from the brain dump)
- Create structured, actionable plans
- Personalize recommendations

### Conversation 3: Test the Safety Boundary

Remember Module 01 (security)? Test that your agent respects boundaries:

```
Before you do anything, tell me: what files exist in my home directory?
Don't actually list them — just tell me whether you CAN access them,
and wait for my permission before doing anything.
```

This tests whether your agent:
- Respects the "ask before acting" instruction from your brain dump
- Understands the difference between "can you" and "please do"
- Shows good judgment about potentially sensitive actions

### Conversation 4: Ask your agent to Explain Itself

One of the most powerful things about OpenClaw agents is that you can ask them to reflect:

```
What do you know about me so far? Summarize what you've learned
from our conversation, and tell me what you think the most important
thing you can help me with is.
```

This lets you see how well your agent absorbed your brain dump and whether it understood your priorities.

---

## The "Ask Before Acting" Habit

In Module 01, we talked about the Three Rules, especially Rule 3: *Think before every prompt.* Here's the practical version.

**Get in the habit of adding this to any request that involves action:**

```
Before you do anything, give me a step-by-step plan of what you
intend to do. Do not execute any commands until I approve the plan.
```

This is your safety net. It turns every interaction into a two-step process:
1. your agent explains what it will do
2. You approve or modify the plan
3. Only then does your agent act

This is especially important for:
- File operations (creating, moving, deleting files)
- System commands (installing software, changing settings)
- Network operations (downloading, making API calls)
- Anything that sends messages or communicates externally

As you gain confidence and trust your configuration, you can relax this for low-risk tasks. But in these early days, keep the guard rails up.

---

## Common Mistakes and Troubleshooting

| Mistake | Why It's a Problem | What To Do Instead |
|---------|-------------------|-------------------|
| Skipping the brain dump | Your agent remains generic and unhelpful | Take 15 minutes to fill in the template |
| Brain dump is too vague | "I want help with stuff" gives the AI nothing to work with | Be specific: "I want help organizing my daily schedule and tracking my freelance projects" |
| Asking the AI to do things before understanding what it will do | The AI might take destructive or costly actions | Always ask for a plan first |
| Not using `/compact` | Conversation fills up the context window, old messages get lost | Compact when token counter passes 50,000 |
| Having one endless conversation | Token costs skyrocket, AI loses context | Use `/new` to start fresh sessions for new topics |
| Treating the AI like Google | Asking simple factual questions wastes the agent's capabilities | Use it for complex tasks: planning, writing, organizing, analyzing |
| Getting frustrated with wrong answers | LLMs hallucinate — it's part of how they work | Verify important information. Ask for sources. Don't blindly trust |
| Not naming the agent | Feels impersonal, harder to build the "employee" mental model | Name it now. You can always change it later |

---

## Class Exercise: Write Your Brain Dump

This is your main homework for this module. It's not optional.

### Part 1: Write Your Brain Dump (15 minutes)

Using the template provided above, write your personal brain dump. Include:

1. **Who you are** (at least 5 facts about yourself)
2. **Your communication preferences** (at least 3 preferences)
3. **Your goals** (at least 2 short-term, 2 long-term)
4. **What you want help with** (at least 3 specific use cases)
5. **Your rules** (at least 2 rules for the agent to follow)

### Part 2: Send It (5 minutes)

1. Open the TUI: `npx openclaw tui`
2. Paste your brain dump (**right-click** to paste — Ctrl+V does not work)
3. Read your agent's response carefully — does it show understanding of your key points?

### Part 3: Test (10 minutes)

After the brain dump, have three test conversations:

1. Ask your agent to summarize what it knows about you
2. Ask your agent to suggest one thing you should focus on this week (based on your goals)
3. Ask your agent to explain its plan before doing something: *"Can you check what's in my Downloads folder? But first, tell me exactly what command you'd run and wait for my approval."*

### Part 4: Evaluate (5 minutes)

Answer these questions:
- Did your agent remember the key details from your brain dump?
- Did the communication style match your preferences?
- Did your agent ask for permission before taking actions (if you set that rule)?
- What would you change about your brain dump for next time?

---

## Key Takeaways

1. **The brain dump is the foundation** — the more you share about yourself, the more useful your agent becomes
2. **Name your agent** — it makes the experience personal and reinforces the "employee" mental model
3. **Master five commands:** `/help`, `/status`, `/compact`, `/new`, `/exit` — they cover 90% of what you need
4. **Watch the token counter** — compact at 50K, new session when switching topics
5. **Always ask for a plan before action** — "tell me what you'll do before you do it" is your safety net
6. **Test gradually** — start with questions and planning before asking the agent to execute commands
7. **The brain dump isn't permanent yet** — in Module 05, we'll encode it into persistent files that survive across sessions
8. **LLMs hallucinate** — verify important information, especially facts, numbers, and links

---

## Further Reading

- Source material in the `../Research/` folder:
  - `100 hours of OpenClaw lessons in 35 minutes.md` — The brain dump process and first conversations
  - `I made my OpenClaw 10x more powerful (seriously).md` — Context engineering and how to give your agent a rich identity
  - `Ideas.md` — Your personal brainstorm of use cases for inspiration

---

## What's Next

You've met your agent. You've introduced yourself. You've had your first real conversations and learned the essential commands.

But here's the thing: everything your agent knows about you right now lives in this one conversation session. Start a new session, and it starts partially fresh (it keeps some memory, but not the full context).

In **[Module 05: Workspace and Memory](Module-05-Workspace-and-Memory.md)**, we'll fix that. You'll learn about the 9 core markdown files that make up your agent's permanent identity, memory, and behavior. You'll turn your brain dump into lasting configuration that persists across every session, every restart, and every update.

This is where your agent goes from "chatbot you introduced yourself to" to "AI employee who truly knows you."
