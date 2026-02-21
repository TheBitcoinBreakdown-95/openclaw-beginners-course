# Module 09 Teaching Script: Advanced Concepts

**Total speaking time:** ~32 minutes (plus 25-minute activity)
**Slides:** 27

---

## Slide 1 — Title: Module 09 — Advanced Concepts

Alright, crew. ALRIGHT. Settle in. Buckle down. Lash yourselves to the mast if you have to because today is the day we stop sailing in calm waters.

You made it to Module 09. Advanced Concepts. That means you've survived eight modules of this course. You've installed OpenClaw. You've had your first conversations. You've built out your workspace files, connected Telegram, set up skills, configured heartbeats and cron jobs. You are no longer greenhorns. You are CREW. And I'm going to treat you like crew today.

So here's what this module is really about. It's about three things. ONE: your agent is burning a hole in your wallet and we're going to FIX that. TWO: you're going to learn how to run not just one ship, but an entire FLEET. And THREE: you're going to discover a secret weapon that most people never figure out — a technique where instead of YOU telling the agent what to do, the agent tells YOU what to do.

Cost optimization. Model routing. Multi-agent setups. Reverse prompting.

This is where we go from "it works" to "it works BRILLIANTLY and it doesn't cost me a fortune."

[pause]

Let's chart our course.

---

## Slide 2 — Navigation Chart (Objectives)

Seven ports today, and every single one of them is going to change how you operate.

Port one — we're going to rip off the bandage and look at WHY OpenClaw burns money by default. Not a little money. Not "oh, that's annoying" money. Potentially HUNDREDS of dollars a month money. We'll understand the five mechanisms that compound to create those bills.

Port two — the Brains and Muscles model. This is the single most important cost optimization technique you'll learn in this entire course. Expensive model for thinking. Cheap models for doing. Split your workload and watch your bills drop like an anchor.

Port three — intelligent model routing. Manual rules, ClawRouter, OpenRouter. Three ways to automate the "which model handles which task" decision so you don't have to think about it.

Port four — prompt caching. The HIDDEN savings multiplier. Ninety percent off your system prompt costs. It's like finding gold doubloons in your coat pocket.

Port five — model switching. Dead simple. One command changes your model mid-conversation.

Port six — multi-agent setups. Running a FLEET instead of one ship. How agents talk to each other. How to avoid the coordination tax.

Port seven — reverse prompting. The secret weapon. The mind-shift. The moment your relationship with your agent fundamentally changes.

Seven ports. Let's go.

---

## Slide 3 — Ship's Logbook (Part 1)

Logbook time — your vocabulary reference. You know the drill by now. This isn't a test. This is your anchor when the seas get choppy.

Brains and Muscles — this is THE pattern. You use an expensive, powerful model as the brain — the captain, the strategist, the decision-maker. And you use cheaper models as the muscles — the crew hauling rope, swabbing decks, doing the grunt work. Opus THINKS. Haiku DOES.

Model switching — changing which AI model handles your conversation in the middle of a session. You don't need to start over. You just swap engines while the ship is moving.

ClawRouter — this is the HOTTEST tool in the OpenClaw ecosystem right now. It's an automated harbor master. It looks at every incoming request, figures out how complex it is, and routes it to the cheapest model that can handle it. Twenty-four hundred GitHub stars in its first eleven days. The community is obsessed with it and for good reason.

Prompt caching — your AI provider remembers the static parts of your system prompt between calls, so you don't pay full price to re-process them every time. Your SOUL.md, your AGENTS.md, your MEMORY.md — they don't change between messages. Why are you paying full price to send them again? Caching fixes that.

Four terms. Stow them.

---

## Slide 4 — Ship's Logbook (Part 2)

Part two of the logbook. Five more terms.

Context accumulation — this is the sneaky one. Every message you send, every tool output, every response the agent gives — it all piles up in the session history. Like barnacles growing on a hull. A mature session can hit 200K tokens or more, and you're paying for ALL of that context every single time the agent responds. Even a simple "yes" follow-up carries the weight of the entire conversation before it.

Multi-agent — running more than one OpenClaw agent. One for personal life. One for work. One for a specific project. Separate ships, separate crews, separate missions. All in the same fleet.

Reverse prompting — instead of you telling the AI what to do, you ask the AI what YOU should do. You flip the entire relationship on its head. It sounds weird. It's INCREDIBLY powerful. We'll get there.

Open Router — a service that gives you access to over 300 AI models through a single API key. One account, one billing dashboard, hundreds of models. It's like having a harbor with docks for every ship in the world.

Agentic company — the idea of structuring your AI agents like employees in a company. A Chief of Staff agent. A CTO agent. A COO agent. Each with their own job description, their own responsibilities, their own personality.

[pause]

Logbook's stowed. Now let's talk about money. Specifically, how you're hemorrhaging it.

---

## Slide 5 — The Problem: Why OpenClaw Burns Money

Alright, real talk. Raise your hand if you've checked your API bill in the last month.

[wait for responses]

Now raise your hand if the number made you uncomfortable.

[wait for responses]

Yeah. YEAH. That's what I thought. Here's why.

Running OpenClaw with a single frontier model for ALL tasks is the NUMBER ONE cost mistake users make. And it's what happens by default. Nobody tells you this when you set up. You pick Opus because it's the best, you fire up heartbeats, you start using cron jobs, and three weeks later you've got a bill that could buy a small boat.

There are FIVE cost mechanisms and they all COMPOUND each other. That's the nasty part. They don't just add up — they multiply.

Context accumulation. Your session history grows with every message until you're at 200K tokens and even asking "what time is it?" costs real money because the model has to process your entire life story first.

System prompt re-injection. Your SOUL.md, your AGENTS.md, your MEMORY.md — three to fourteen THOUSAND tokens — re-sent with EVERY SINGLE API call. Every heartbeat. Every cron trigger. Thousands of times per month and you're paying full price every time.

Tool output storage. File listings, browser snapshots, command outputs — all getting logged into the session history, making that context accumulation problem even worse.

Heartbeat overhead. If you've got heartbeats every 30 minutes on Opus, that's 48 full-context API calls per DAY. Seventy to two hundred dollars a month JUST for your agent to check in and go "yep, still here."

Cron job overhead. Each trigger creates a fresh conversation with full context injection. Ninety-six triggers a day at 15-minute intervals. Ten to twenty dollars DAILY on Opus.

[pause]

But here's the line I need you to remember. Write this down. Tattoo it on your hand. NINETY PERCENT of what your agent does is routine work that does NOT need a five-dollar-per-million-token model.

Ninety percent. The fix is coming.

---

## Slide 6 — The Brains and Muscles Model

HERE is the fix. The Brains and Muscles model. This is the single most important thing you'll learn today.

Think of it like captaining a ship. Are you, the captain, going to personally scrub every barnacle off the hull? Are you going to personally coil every rope, hoist every sail, check every compass reading? No. That would be INSANE. You'd never sleep, you'd never eat, and the ship would crash because you're too busy scrubbing barnacles to notice the rocks ahead.

You, the captain, make the BIG decisions. Where are we sailing? What's our strategy? How do we handle that storm? That's the BRAIN. That's Opus. Five to twenty-five dollars per million tokens, but worth every penny when it matters.

The crew handles everything else. Hauling rope. Checking the compass. Swabbing the deck. That's the MUSCLES. That's Haiku at one to five dollars per million tokens. That's Sonnet at five to fifteen. That's Codex for development tasks.

The brain — Opus — handles complex decisions, creative writing, strategy, prompt injection defense, and orchestrating the other models. The HARD stuff.

The muscles — Haiku, Sonnet, Codex — handle quick lookups, heartbeats, code generation, summarization, document processing. The GRUNT work.

[pause]

The brain handles the hard stuff. The muscles handle the grunt work. And your wallet starts breathing again.

---

## Slide 7 — The Opus Orchestra Pattern

The community has actually given this a proper name. The Opus Orchestra Pattern. I love it. Think of a symphony orchestra.

Opus is the CONDUCTOR. It doesn't play every instrument. It orchestrates. It makes the big artistic decisions. It handles orchestration, complex decisions, creative work, security-sensitive tasks. Premium cost, but it's doing premium work.

Sonnet is the SECTION LEADS. The first violin, the principal cellist. Strong, capable, doing serious work but not the conductor. Code generation, document analysis, moderate reasoning. Mid-tier cost.

Haiku or Gemini Flash — those are the ENSEMBLE. The whole orchestra behind the soloists. Heartbeats, simple lookups, routine checks. Minimal cost.

And then you've got your free models — the volunteers. Tasks where cost must be zero.

Now let me hit you with some numbers from the community. REAL numbers from REAL users.

Without optimization? A hundred to four hundred dollars a month. That's where most new users land.

With a well-configured brains and muscles setup? Ten to fifty dollars a month. Same quality where it matters. Ninety percent cheaper where it doesn't.

Extreme optimization with free models, local models, and aggressive routing? Under ten dollars a month.

And the cautionary tale — one user spent EIGHT HUNDRED DOLLARS in under a week. Eight agents, no spending limits, uncapped pay-per-use API. Don't be that person. Be the person who runs a tight ship.

---

## Slide 8 — Practical Model Assignments

Here's your cheat sheet. Match the task to the model. I want you to think of this as your assignment roster — which crew member handles which job.

Important conversations? Opus. Best reasoning, most nuanced. When you're having a serious discussion about life direction, business strategy, or anything that requires the BEST thinking — that's when you bring in the captain.

Code generation? Sonnet or Codex. They're optimized for code and they're significantly cheaper. You don't need the world's most sophisticated reasoner to write a for loop.

Heartbeats? Haiku. All day, every day. It's routine check-ins. "Hey, any new messages? Any calendar events coming up? No? Cool." Haiku handles that beautifully at a fraction of the cost.

Web search? Perplexity Pro. We'll talk about this more later, but it's built specifically for search and it's significantly better than OpenClaw's built-in search.

Document summarization? Sonnet. Good enough quality, MUCH cheaper than Opus. You don't need the Mona Lisa — you need a quick sketch.

Quick factual lookups? Haiku. Fast. Cheap. Done.

The goal is simple. Use the CHEAPEST model that can handle the job WELL. Not the cheapest model period — the cheapest model that gets it RIGHT.

---

## Slide 9 — Practical Model Assignments (continued)

And the second half of the roster.

Creative writing? Opus. No shortcuts here. When quality matters — when you need nuance, voice, emotional depth — you bring in the best.

Security-sensitive tasks? Opus again. And this one's non-negotiable. Opus has the best prompt injection resistance. If your agent is processing untrusted input — emails from strangers, web content, anything where someone MIGHT be trying to trick your agent — you want Opus at the helm. This is where cutting costs can actually hurt you.

Now here's where it gets REALLY interesting. Budget tasks? Kimi K2.5 through NVIDIA. It's FREE. As in ZERO dollars. And the community says it's comparable to Opus on many tasks. Free! Look, I'm not saying it's perfect for everything, but for routine work where you want zero cost? This is the gold doubloon hiding in the sand.

Ultra-cheap tasks? MiniMax M2.5 at roughly ten to fifty a month. The Max plan gives you a thousand prompts per five hours. Surprisingly capable for the price.

And for exploration? Google Cloud gives you three hundred dollars in free sign-up credits for Gemini models. Rate limits apply, but three hundred dollars of free compute is not nothing.

[ask the audience]

How many of you were even aware these free and ultra-cheap options existed?

[wait for responses]

See? That's money you've been leaving on the table. Or in this case, on the ocean floor.

---

## Slide 10 — Model Switching in the TUI

Alright, so you're convinced. You want different models for different tasks. But how do you actually DO it? Because if it's complicated, nobody's going to bother.

Good news. It's one command. One. Slash model, model name, done.

Slash model claude-opus-4-6 — switches to Opus. Expensive, best quality. The captain takes the wheel.

Slash model claude-sonnet-4-5 — switches to Sonnet. Good balance. The section lead steps up.

Slash model claude-haiku-4-5 — switches to Haiku. Fast and cheap. The ensemble gets to work.

And here's the beautiful part — you do this MID-CONVERSATION. You don't start a new session. You don't lose your context. You're literally swapping the engine while the ship is sailing.

So the workflow looks like this. You start a conversation on Haiku because you're doing some quick lookups. Then the conversation gets deeper — you're making a strategic decision — so you switch to Opus. Decision made, now you need some code written, you switch to Sonnet. Three models in one conversation, each doing what they're best at, and your bill reflects the MIX instead of the most expensive option.

When to switch to Opus? Important decisions. Untrusted input. Nuanced conversations.

When to switch to Sonnet? Code generation. Summarization. Drafts.

When to switch to Haiku? Quick facts. Formatting. Template generation. Testing.

[pause]

Simple. Powerful. Start using it TODAY.

---

## Slide 11 — Intelligent Routing: ClawRouter

But let's be honest with ourselves. Raise your hand if you're actually going to remember to manually switch models every time you change tasks.

[wait for responses]

Yeah, that's what I thought. Nobody is. Which is why ClawRouter exists. And crew — ClawRouter is the HOTTEST new tool in the OpenClaw ecosystem. Twenty-four hundred GitHub stars in its first ELEVEN DAYS. The community lost its collective mind over this thing and I'm about to show you why.

ClawRouter is an automated harbor master. Imagine a harbor master standing at the dock, and every ship that comes in — every request, every query, every message — the harbor master looks at it, evaluates it, and goes "okay, this one goes to dock one, that one goes to dock three, this big one needs the deep-water berth."

That's what ClawRouter does with your AI queries. It has a lightweight classifier that analyzes each incoming request. It scores dimensions like query length, presence of code, reasoning markers, multi-step intent, tool usage signals. Then it classifies the request into one of four tiers.

Simple tier — basic lookups, acknowledgments. These get routed to DeepSeek or Gemini Flash at twenty-seven to sixty cents per million tokens. Pennies.

Medium tier — moderate tasks, summarization. Routed to GPT-4o-mini or Sonnet at one to five dollars per million tokens.

Complex tier — analysis, writing, decisions. Routed to Claude Sonnet at three to fifteen dollars per million tokens.

Heavy tier — multi-step reasoning, agentic tasks. Only THESE hit Opus or Kimi K2.5 at five to twenty-five dollars per million tokens.

See what's happening? Simple questions go to the twenty-seven-cent model. Only the HARD stuff hits Opus. Your harbor master is making sure each ship goes to the right dock automatically.

---

## Slide 12 — ClawRouter Profiles

ClawRouter comes with four pre-built profiles so you don't have to configure all the routing rules yourself.

Auto — balanced quality and cost. This is your starting point. I recommend everyone begin here. It makes smart decisions without being too aggressive about cutting costs.

Eco — maximum savings. Up to ninety-five to ONE HUNDRED percent savings on simple queries. This is the "every penny counts" profile. Some of your queries might go to free models. Quality might dip slightly on edge cases.

Premium — best quality, less aggressive routing. For when you want the optimization but you're not willing to compromise on output quality. It routes less aggressively — more queries go to higher-tier models.

Free — zero-cost models only. Limited capability, but your bill is literally zero. Good for testing, for non-critical tasks, for when you're broke at the end of the month and your agent still needs to function.

[pause]

Now, ClawRouter isn't the ONLY routing option. Let me give you the full landscape.

Manual rules in AGENTS.md — lowest complexity, lowest control. Good for getting started. You just write "for heartbeats, use Haiku; for code, use Sonnet" and hope the agent follows the rules. It usually does. Usually.

ClawRouter — medium complexity, medium control. Best balance for most users. Automated, intelligent, purpose-built for OpenClaw.

Custom routing skill — highest complexity, full control. For power users who want to write actual Python code to define exact routing logic. If you're the type who wants to specify EXACTLY which model handles EXACTLY which type of query — this is your lane.

OpenRouter auto-routing — lowest complexity, lowest control. You plug in your OpenRouter API key and let THEM handle everything. Three hundred models, one API. Zero configuration from you.

My recommendation? Start with manual rules in AGENTS.md. When you're ready to level up, install ClawRouter. You'll know when you're ready.

---

## Slide 13 — Prompt Caching: The Hidden Savings Multiplier

Okay, this one is the hidden treasure. The chest buried in the sand that most people walk right over.

Prompt caching. Let me explain WHY this matters so much.

Every single time you send a message — every heartbeat, every cron trigger, every conversation turn — OpenClaw sends your FULL system prompt to the AI model. Your SOUL.md. Your AGENTS.md. Your MEMORY.md. Your skill descriptions. That's three to fourteen THOUSAND tokens. The model processes them from scratch. And you pay FULL PRICE. Every. Single. Time.

Think about that for a second. Your SOUL.md doesn't change between messages. Your AGENTS.md doesn't change between heartbeats. But you're paying to send them again and again and again and again. It's like faxing the same hundred-page document to someone every five minutes when they already HAVE it on their desk.

Prompt caching says: "Hey, you already have this. You already processed it. Just REMEMBER it."

With caching enabled, the FIRST call pays full price — fair enough, the provider needs to process it once. But every subsequent call within the cache window pays NINETY PERCENT LESS for those cached tokens. Ninety percent.

To enable it, three lines in your config. Cache retention set to "long" — that gives you Anthropic's extended cache at about fifty-five minutes. Cache system prompts set to true. Cache threshold tokens set to 2,048 — so it only caches prompts above a minimum size, doesn't waste effort on tiny requests.

[pause]

Three lines of config. Ninety percent savings on system prompt costs. This is the easiest win in this entire module.

---

## Slide 14 — The 55-Minute Heartbeat Trick (Revisited)

Now we combine THREE optimizations into one beautiful, elegant cost destroyer. I call this the 55-Minute Heartbeat Trick, and if you only implement ONE thing from today's module, make it this.

Step one — set your heartbeat interval to fifty-five minutes. Not thirty. FIFTY-FIVE. Why? Because Anthropic's extended cache stays warm for about fifty-five minutes. You set your heartbeat to that same interval and every heartbeat lands inside the cache window. The cache never goes cold.

Step two — enable prompt caching. We just covered this.

Step three — route heartbeats to Haiku. Not Opus. Not Sonnet. HAIKU. Because heartbeats are routine check-ins. "Any new messages? Calendar events? Alerts?" Haiku handles this beautifully.

Now watch what happens when you stack these three together.

WITHOUT optimization: Opus for heartbeats. Full system prompt every call. Over a hundred dollars a month JUST for heartbeats.

WITH optimization: Haiku for heartbeats. Cached system prompt at ninety percent off. About fifty CENTS a month.

[pause]

Let me say that again. A hundred dollars versus fifty cents. That's a ninety-nine point five percent reduction on heartbeat costs.

And here's the bonus — prompt caching works for your regular conversations too. When you're chatting with your agent, the system prompt is re-sent with every message. With caching, you pay full price ONCE at the start of the session, then ninety percent off for every message after that. Over a month of active use, this adds up to SERIOUS savings.

The 55-minute trick alone can pay for this entire course.

---

## Slide 15 — Upgrading Web Search with Perplexity Pro

Let's talk about search for a minute. OpenClaw's built-in web search works. It gets the job done. But if you're using your agent for actual RESEARCH — deep dives, analysis, synthesizing multiple sources — built-in search is like using a rowboat when you could have a research vessel.

Perplexity Pro is that research vessel. It's an AI-powered web search that doesn't just return links — it synthesizes results, provides source citations for every claim, and does significantly deeper analysis than standard search. Costs about two to ten cents per search through Open Router. Pennies for professional-grade research.

Setting it up through Open Router is four steps. Create an account at openrouter.ai. Get your API key from the dashboard. Add it to OpenClaw with the config command. Then configure Perplexity as your search model.

And here's the COST TIP — this is the smart sailor's trick. After your agent does research, tell it to SAVE the results as a markdown file in your workspace. "Save this research to tilde slash dot openclaw slash workspace slash projects slash topic dot md." Done. Next time you need that information, the agent reads a FREE local file instead of making a PAID web search.

Turn a paid search into a free file read. Cache your knowledge. Build a living research library. This is the docs folder pattern and it's one of the smartest token-saving tricks in the entire OpenClaw playbook.

---

## Slide 16 — Agent-to-Agent Communication (sessions_* Tools)

Alright, crew. We're leaving single-ship territory. It's time to talk about FLEETS.

Before we get into multi-agent setups — how agents are structured, how many to run, all of that — we need to understand the PLUMBING. How do agents actually TALK to each other? Because a fleet where the ships can't communicate is just a bunch of boats floating around bumping into each other.

OpenClaw gives you three built-in tools for agent-to-agent communication. No external service required. No Pinchboard. No webhook wizardry. Built right in.

Sessions list — discovers which agents are currently active and their metadata. Think of it as the harbor master's board showing which ships are in port.

Sessions history — fetches transcript logs from another agent's session. Your Chief of Staff can go check what the research agent found this morning without interrupting it.

Sessions send — and THIS is the big one — sends a message directly to another agent's session. It supports reply-back, meaning Agent A sends a request, Agent B processes it and sends the result BACK. Ping-pong communication.

Here's a real example of how this works in practice. Your Chief of Staff agent receives an email about a crypto opportunity. It uses sessions send to forward the details to your Crypto Trader agent. The trader evaluates the opportunity, runs its analysis, and sends back its assessment via reply-back. The Chief of Staff then summarizes everything and messages you on Telegram.

That whole flow happened without you lifting a finger. Three agents coordinated autonomously.

[pause]

Individual agents communicating through sessions send is more reliable AND cheaper than one mega-agent trying to do everything. That's the foundation. Now let's build on it.

---

## Slide 17 — Multi-Agent Management

So you've got the communication infrastructure. Now the question is: how many ships do you NEED?

The Agentic Company Structure is the most ambitious pattern in the community. You structure your agents like employees in a company. You're the CEO. Your agents are your executive team.

And there's a REAL-WORLD example that'll blow your mind. One user deployed four agents in seven days. Sam — the Chief of Staff — handling email, calendar, and CRM management across six hundred and ninety-seven contacts. Midas — the Crypto Trader — running autonomous portfolio management with risk guardrails. Ritam — a Physics Research agent doing cross-domain synthesis. Plus a personal assistant for daily life.

They simultaneously built THREE products. This setup would have required a ten-to-twenty-person human team previously. Total cost? About six hundred dollars for the week.

Now, critical lesson from the community. Individual agents are BETTER than sub-agents. I need you to hear this clearly. Multiple individual agents with their own separate Telegram bots work better than one agent trying to spawn sub-agents on the fly.

Why? Sub-agents lose context. They forget what they were doing. They need the full context re-injected every time they're spawned. Individual agents maintain their own persistent memory, have their own communication channel, don't bloat each other's context windows, and are CHEAPER per-interaction because their context is focused.

If you need a second "employee," CREATE a second agent. Don't try to make one agent do everything through sub-agents.

[pause]

But — and this is a big but — start simple. One agent is enough for most people. Add more ONLY when you have a clear need. Not because it's cool. Because you NEED it.

---

## Slide 18 — Rough Waters: The Coordination Tax

Now for the warning. The rocks beneath the surface. This is where I have to be the captain who points at the reef and says "do NOT sail over that."

Google DeepMind did research on this. Actual published research. And what they found is that accuracy SATURATES or DEGRADES past four agents. Let me say that again. Past FOUR agents, you actually get WORSE results. Not the same. WORSE.

They call it the Coordination Tax. The more agents you add, the more they have to coordinate. The more they coordinate, the more they miscommunicate. The more they miscommunicate, the more errors propagate. One analysis called it the "17x error trap" — where naively adding agents to a system multiplies your error rate, not your throughput.

And there's a real cautionary tale. One experienced user was running SEVENTEEN agents. Talking to three or four of them regularly. The rest? Just sitting there. Burning tokens every heartbeat. Doing nothing useful. After studying the DeepMind research, they consolidated from seventeen down to four core agents.

The Architect — CEO function — strategy, capital allocation, priority-setting.
The Builder — CTO function — engineering, architecture, quality standards.
The Money Maker — growth, pricing, channels, demand generation.
The Operator — COO function — processes, tool stack, financial ops.

Everything else became a specialist library. Thirty-six pre-defined specialist types that the core agents spawn when needed. Not generated at runtime — pre-defined and selected dynamically.

[pause]

The lesson? Three good agents with well-crafted souls ship more than seventeen mediocre ones EVER could. Before you add another agent, ask yourself: "Would a SKILL do this job instead?" Skills are lighter. Cheaper. Don't need their own context window.

And when your core agents DO spawn sub-agents? Remember this: values inherit, identity does NOT. Don't tell a sub-agent "You are the CTO." Tell it "You are a code security auditor. Apply THESE standards. Your task: review THIS module." Precise. Task-scoped. Effective.

---

## Slide 19 — The Freshman Rule and Multi-Agent Memory

Two more critical concepts for running a fleet.

The Freshman Rule. This is community wisdom born from hard experience, and it applies to one agent OR twenty.

Rule one: ONE task per agent at a time. I know, I know — you've got ten things you need done. You want to throw all ten at your agent and go make coffee. DON'T. If you give an AI five jobs, it fails at four. Assign one clear task. Let it complete. THEN assign the next.

Rule two: give ground-up instructions every time. Do NOT assume the agent remembers your project's history. The context files are its ONLY memory. If something isn't written in SOUL.md, AGENTS.md, MEMORY.md, or the relevant workspace files — it does NOT exist. Not for the agent. Not in any conversation. If you wouldn't expect a brand-new hire to know something without documentation, don't expect your agent to know it either.

[pause]

Now — multi-agent memory. This is where fleet management gets sophisticated. The most successful multi-agent setups use a four-layer memory architecture.

Layer one — private memory. Each agent's own MEMORY.md and daily notes. Midas remembers crypto positions. Sam remembers email threads. None of the other agents need that information.

Layer two — shared reference files. A common shared directory that all agents can read. Your user profile, agent roster, team conventions. Stuff everybody needs to know.

Layer three — cross-agent search through shared indexed paths. Any agent can search another agent's docs folder. Read-only. Useful for "hey, did the research agent already look into this topic?"

Layer four — a coordinator agent. A "Chief of Staff" who reads core files at session start and maintains consistency across the whole team. Resolves conflicts. Propagates updates. Keeps everyone aligned.

Treat agent memory like a human team's documentation. Some docs are shared — the company wiki, the style guide. Some docs are private — personal notes, work in progress. Build the same structure for your agents.

---

## Slide 20 — Reverse Prompting

Alright, crew. This is the moment. This is the slide I've been looking forward to all day. Because THIS is the secret weapon that changes EVERYTHING.

Reverse prompting.

The normal way of using your agent looks like this: "Build me a landing page for my freelance business." You tell it what to do. It does it. Transaction complete. And that works fine. But it's leaving the most powerful capability of this entire system UNUSED.

The reverse way looks like this: "Based on everything you know about me, my goals, and my current situation — what should I be working on right now? What would move the needle the most?"

[pause]

Feel the difference? You're not giving orders. You're asking for GUIDANCE. You're asking your agent — which has PERFECT MEMORY of every goal you've stated, every decision you've made, every conversation you've had — to analyze YOUR situation and tell YOU what to do.

Why is this so powerful? Four reasons.

Your agent has perfect memory. It remembers every goal, every conversation, every preference. YOUR brain drops things. Your agent's doesn't.

Your agent has no ego. It will tell you uncomfortable truths that your friends won't. "You said this was your top priority six weeks ago and you haven't touched it once." Your friends might say "it's fine, you've been busy." Your agent will say "you're avoiding this."

Your agent sees patterns. It can spot contradictions between your STATED goals and your ACTUAL behavior. "You say you want to launch a freelance business, but every week you spend all your time on personal projects."

Your agent is objective. It evaluates based on data, not emotion. Not feelings. Not social pressure. Data.

[pause]

This is a mind-shift. Most people think of AI as "I tell it, it does." Reverse prompting flips that dynamic completely.

---

## Slide 21 — Reverse Prompting: Try These

Here are specific prompts you can try. TODAY. Right after this session. Go home, open your agent, and copy-paste one of these.

Strategic prompt: "What am I overlooking? Based on my goals and what I've been working on, what blind spots do you see?"

This one is GOLD for entrepreneurs, for project managers, for anyone juggling multiple priorities. Your agent sees the full picture. You're in the trenches. It has the bird's-eye view.

Accountability prompt: "Review my goals from last month. What did I accomplish? What did I skip? What pattern do you notice?"

This one stings. I'm not going to lie to you. The first time your agent says "you consistently skip tasks related to X" and you realize it's RIGHT — that's a gut punch. A helpful gut punch. The kind of gut punch that actually changes behavior.

Self-improvement prompt: "Based on our interactions, what are my three biggest strengths and three biggest weaknesses in how I work? How can I leverage the strengths and compensate for the weaknesses?"

[pause]

I want everyone to commit right now. Pick ONE of these three prompts and try it with your agent this week.

[ask the audience]

Which one are you going to try? Strategic, accountability, or self-improvement? Shout it out.

[wait for responses]

Good. Hold each other to it. Check in next week. I promise you — the conversation you have will surprise you.

---

## Slide 22 — Self-Improvement Workflows

Your agent should get BETTER over time. Not stay the same. Not stagnate. Get better. And that doesn't happen automatically — it happens because you TUNE it.

Weekly agent tuning. Make this a habit. Or better yet — make it a cron job. Five questions, ten minutes, once a week.

One: "What instructions in your core files feel unclear or contradictory?" Let the agent tell you where its OWN instructions confuse it.

Two: "What information about me seems outdated?" Maybe you changed jobs two months ago but USER.md still says you work at the old place.

Three: "What do I keep asking you that should be in your memory?" If you're answering the same question every session, that answer should be in MEMORY.md.

Four: "What skills or automations would make us more efficient?" Your agent knows what it does repeatedly. It can suggest what to automate.

Five: "What suggestions do you have for improving our workflow?" Open-ended. Let it surprise you.

Then — and this is the critical part — actually IMPLEMENT the suggestions. Edit the core files. Don't just nod and move on. Do the work.

Two more things. The docs folder pattern — save ALL web research as markdown files in your workspace docs directory. Over time, your docs folder becomes a living knowledge base. The agent reads a free local file instead of making expensive API-powered web searches. This is the "living files" concept from Module 05 applied directly to cost savings.

And token hygiene. Review MEMORY.md and TOOLS.md weekly. Remove outdated entries. Compress verbose sections into bullet points. Set your context compaction at 80K tokens and memory flush at 80K tokens. Keep your system prompt under eight thousand tokens if possible. Your context files grow like barnacles — scrape them regularly.

---

## Slide 23 — Shoals and Sandbars: Chat Quality Does Not Equal Agent Quality

Alright, one more warning before we hit the activity. This one catches EVERYONE.

[pause]

A model that writes beautiful, eloquent, thoughtful essays might COMPLETELY FALL APART when you ask it to call tools, chain multi-step actions, and follow structured workflows. Chat quality and agent quality are DIFFERENT THINGS. Chat benchmarks do not measure tool-calling reliability, multi-step planning, or error recovery.

Proven for agentic work — Claude Sonnet and Opus. Reliable tool calls. Strong planning. Consistent execution. GPT-5.2 — solid multi-step reasoning, dependable function calling. Kimi K2 and K2.5 — comparable to Opus on many tasks, excellent cost-to-quality ratio.

Avoid for autonomous tasks — DeepSeek Reasoner. And this one HURTS because it's an incredible model. Amazing at thinking. Amazing at analysis. But its tool calls are BROKEN. It reasons beautifully about why your code is broken and then generates completely broken tool calls trying to fix it. It thinks like a genius and acts like it's never seen a keyboard.

GPT-5.1 Mini — skips steps, takes shortcuts, produces incomplete results on multi-step tasks. Multiple users report it as unreliable for agent work.

Here's your practical test. The 3-Tool-Call Test. Before you trust ANY model for autonomous work, give it a task that requires at least three sequential tool calls. "Search for X. Save the results to a file. Then summarize the file." If it drops a step, misformats a call, or hallucinates a tool name — it is NOT ready for unattended agent work.

And remember this: the cheapest model is NOT always the cheapest EFFECTIVE model. A fifty-cent model that fails forty percent of the time costs MORE than a three-dollar model that succeeds every time. Because you're paying for retries, debugging, wasted output, and your own frustration.

---

## Slide 24 — Shoals and Sandbars: Common Mistakes

Quick-fire round. The reef map. Steer clear of these.

Using Opus for everything — we've beaten this drum. Set up brains and muscles.

Not enabling prompt caching — enable cache system prompts in your config. Instant ninety percent savings. Three lines of config. DO IT.

Heartbeat interval at thirty minutes without caching — set it to fifty-five minutes. Stay in the cache window. Save ninety-nine percent on heartbeat costs.

Setting up five agents before mastering one — I see you over there planning your fleet of ten. Stop it. Master ONE agent. Prove the concept. THEN expand.

Ignoring reverse prompting — try it once a week. Just once. I promise it'll become a habit.

Never doing agent tuning — schedule ten minutes a week. Your agent gets stale if you don't maintain it. Like a ship that never gets its hull scraped.

Expecting local models to match Opus — they won't. Not today. Use local models for low-stakes routine tasks. Cloud models for important work. Don't expect a rowboat to keep up with a battleship.

[pause]

Avoid the reefs. Sail the open water. Simple.

---

## Slide 25 — Hands on Deck: Design Your Ideal Multi-Agent Setup

Alright crew, this is your activity. Twenty-five minutes. This is a THOUGHT EXERCISE — you're not building anything today. You're designing. You're architecting. You're drawing the blueprint for your fleet.

Part one — ten minutes. Map your life domains. I want you to list three to five areas of your life that could benefit from a dedicated AI agent. Personal life — health, learning, scheduling. Professional work — clients, projects, coding. Business — strategy, marketing, operations. Creative — writing, music, art. Something else entirely.

Write them down. Be specific. Not just "work" — WHAT about work?

[pause — give them time]

Part two — ten minutes. Design the roles. For EACH domain you listed, answer these questions. What would the agent focus on? What personality should it have? Be specific — should it be blunt and direct, or gentle and supportive? What model should it use? Apply what you just learned — not everything needs Opus.

[pause — give them time]

Part three — five minutes. Start simple. Pick the ONE domain that would benefit MOST from dedicated attention. Not the coolest. Not the most impressive. The most USEFUL. That's your first agent. Master it before adding more.

Remember — three good agents with well-crafted souls ship more than seventeen mediocre ones. Start with one. Make it exceptional.

[wait for activity to complete]

---

## Slide 26 — Treasure Chest

Alright crew, let's haul in the treasure. Eight gems from today's voyage.

ONE: OpenClaw burns money by default. Five cost mechanisms compound to create massive bills. Now you know what they are.

TWO: Brains and Muscles saves serious money. Expensive model for thinking. Cheap models for execution. The Opus Orchestra Pattern.

THREE: Prompt caching is the biggest hidden savings. Ninety percent off system prompt costs. The 55-minute heartbeat trick alone can save you a hundred dollars a month.

FOUR: ClawRouter automates routing. It classifies query complexity and routes to the cheapest capable model automatically. Twenty-four hundred stars in eleven days.

FIVE: Model switching is easy. Slash model, model name, done. Mid-conversation. No restart needed.

SIX: Perplexity Pro is worth the upgrade. Significantly better research. Save results as files to avoid paying twice.

SEVEN: Multi-agent is powerful but complex. Master one agent first. Respect the Coordination Tax. Four agents max for most setups.

EIGHT: Reverse prompting is the secret weapon. Stop always giving orders. Start asking for guidance. Let the agent analyze YOUR situation and tell YOU what to do.

[pause]

You came in today as crew. You're leaving as CAPTAINS. Captains who know how to run a tight ship, manage a fleet, and find treasure nobody else even knows is there.

---

## Slide 27 — Next Port of Call

So where are we sailing next?

Module 10. Security Hardening.

Because here's the truth — everything we covered today makes your agent MORE powerful. More models. More agents. More automation. More capability. But with great power comes great RESPONSIBILITY.

Module 10 is where we lock everything DOWN. Sandboxing with Docker. Tool policies. Gateway hardening. Incident response. Security audits.

Think of it this way — today we upgraded the fleet from rowboats to warships. Next module, we make sure those warships don't get HIJACKED.

[pause]

You've earned your rest, crew. Go home. Implement the 55-minute heartbeat trick. Try one reverse prompt this week. And I'll see you at the next port.

Fair winds and following seas.
