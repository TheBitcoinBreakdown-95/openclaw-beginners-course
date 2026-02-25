# Module 05 Teaching Script: Workspace and Memory

**Total speaking time:** ~32 minutes (plus 50-minute hands-on activity)
**Slides:** 26

---

## Slide 1 — Title: Module 05 — Workspace and Memory

Welcome back, crew. Welcome BACK. If you've been following along from Module 04 — and you better have been — you did something big last time. You sat down with your agent and you TALKED to it. You dumped your brain out on the table. Goals, preferences, frustrations, weird coffee habits, the whole messy beautiful pile of who-you-are.

And your agent? It listened. It responded. It felt like magic.

[pause]

Here's the problem. That conversation? It's GONE. The moment that session ended, your agent forgot every single word. Every preference. Every goal. Every detail about your life that you poured into that terminal. Poof. Like writing in the sand at high tide. The ocean doesn't care what you wrote.

Today we fix that. TODAY we take that beautiful brain dump and we carve it into the HULL of the ship. Permanent. Indelible. We're not writing in sand anymore — we're etching into timber.

This is Module 05: Workspace and Memory. And I'm going to show you the nine sacred files that make your agent WHO IT IS. Not just what it does — WHO it is. By the end of today, your agent will know your name, your goals, your pet peeves, and your communication style EVERY time you talk to it. Forever.

[pause]

This is the blueprints module. We're going below deck, opening up every compartment, and I'm going to show you exactly where everything lives. Let's go.

---

## Slide 2 — Navigation Chart (Objectives)

Seven ports on today's chart. And I mean it when I say EVERY person in this room is going to hit all seven before we come back to dock.

Port one: you'll be able to navigate the OpenClaw workspace directory. That's `~/.openclaw/`. You'll know where it is, what's inside it, and why it matters. This is your agent's HOME. Its quarters. Its bunk below deck.

Port two: you'll explain the purpose of each of the nine core markdown files. NINE files. Each one with a specific job. I'm going to walk you through every single one.

Port three: you'll CUSTOMIZE your agent's identity, personality, and operating rules. Not hypothetically. Not "I could do this later." Today. With your hands on the keyboard.

Port four: context engineering. This is THE skill. The one that separates people who have a generic chatbot from people who have a genuine, eerily personalized assistant. If you take one thing from this module, let it be this.

Port five: you'll turn that brain dump from Module 04 — the one that vanished — into permanent configuration. No more amnesia.

Port six: Git backup. Because your workspace is now precious cargo. You don't sail without insurance.

Port seven: living files. A concept that will change how you think about every document on your computer.

[pause]

Seven stops. Let's get moving.

---

## Slide 3 — Ship's Logbook (Part 1)

Vocabulary check. Four terms for the logbook before we leave the harbor.

WORKSPACE. The `~/.openclaw/` directory. This is the one folder on your entire machine where your agent's WHOLE LIFE lives. Configuration, memory, identity, history — all of it. One directory. Remember this path. Tattoo it on your brain.

CORE FILES. The nine essential markdown files. Plain text. Human-readable. Editable with any text editor on the planet. These nine files define who your agent is, what it knows, and how it behaves. Nine files. That's it. That's the whole personality.

CONTEXT ENGINEERING. Ohhhh, this one. This is the big one. This is the art — and it IS an art — of designing and maintaining the information your AI has access to. What it knows. How it's organized. How it gets loaded into conversations. Master this and your agent transforms from a polite stranger into someone who KNOWS you.

LIVING FILES. Files that an active AI agent reads, uses, and updates. The opposite of those dead files moldering on your desktop that no one's opened since 2019. If a file is alive, it's working for you every single day.

These four concepts are the foundation of everything we're building today.

---

## Slide 4 — Ship's Logbook (Part 2)

Three more terms. These are the spicier ones.

SYSTEM PROMPT. The hidden instructions loaded BEFORE every conversation that tell the AI how to behave. Here's the wild part — your core files BECOME the system prompt. When you write in IDENTITY.md or SOUL.md, you are literally writing the invisible instructions that shape every word your agent says. You're not just filling out a form. You're programming behavior.

PERSISTENT MEMORY. Information that survives across sessions, restarts, and updates. Stored in the workspace files. This is the cure for the amnesia problem we talked about. When something lives in persistent memory, your agent knows it FOREVER. Or at least until you deliberately remove it.

VERBALIZATION. The practice of writing down your thoughts, preferences, and knowledge as text so the AI can access them. This one sounds simple but it's actually the hardest skill in this entire course. Because you have MOUNTAINS of implicit knowledge in your head that you've never written down. Things you just "know." Your agent can't read your mind — it can only read your files.

[pause]

Logbook stowed. Seven terms locked and loaded. Now let's crack open the workspace and see what's inside.

---

## Slide 5 — The Workspace Directory

Everything — and I mean EVERYTHING — about your OpenClaw agent lives in one place.

`~/.openclaw/`

That's it. One directory. On your Ubuntu system, that translates to `/home/openclaw/.openclaw/`. One folder. The entire ship. Every plank, every sail, every cannon, every map in the captain's quarters — all of it lives right here.

Let me walk you through the compartments. Think of this like a tour of the ship's interior.

The `workspace/` directory — this is the CAPTAIN'S QUARTERS. The nine core markdown files that define your agent's identity, rules, and behavior. This is where we're spending most of our time today.

The `config/` directory — the ENGINE ROOM. Gateway configuration and settings. We touched this in Module 03.

`logs/` — the SHIP'S LOG. Activity records for security auditing. You want to know what your agent did at 3 AM? It's in here.

`memory/` — the TREASURE HOLD. Your agent's persistent memory. Things it remembers across sessions. This is where knowledge accumulates over time.

`sessions/` — saved conversation transcripts. Every conversation you've ever had with your agent, preserved.

`skills/` — the ARMORY. Installed skills and plugins. The tools your agent knows how to use.

[pause]

Today we're going DEEP into `workspace/`. That's the captain's quarters. That's where the magic happens. Everything else? Important, but secondary to what we're doing right now.

---

## Slide 6 — The 9 Core Files — Overview

Alright. HERE we go. The nine core files. The nine sacred documents that make your agent who it is.

I want you to take a breath and look at this table. Nine files. Nine markdown files. That's it. That's the ENTIRE personality, memory, rulebook, and operating system of your AI agent. Not some complex database. Not a thousand configuration files. Nine. Plain. Text. Files.

IDENTITY.md — who the agent IS. Name, role, core purpose.

SOUL.md — the personality and tone. How it communicates. What it values.

USER.md — everything about YOU. Your brain dump, made permanent.

MEMORY.md — long-term memory. Facts, decisions, things it's learned.

AGENTS.md — the operating rules. What it can do, what it can't, what it needs permission for.

TOOLS.md — API tools documentation. What external integrations exist.

HEARTBEAT.md — periodic check instructions. What does it do when it wakes up on its own? We'll cover this in Module 08.

BOOTSTRAP.md — first boot only. Runs once, then deletes itself. One-time setup.

BOOT.md — every gateway start. The startup routine that runs every time the engine turns on.

[pause]

Now here's the thing I need you to hear. You do NOT need to memorize all nine today. There are three files that matter more than all the others combined. I call them the Big Three: IDENTITY, SOUL, and USER. Those three files are where you should spend eighty percent of your time. The other six? Important. But the Big Three are the foundation.

Let me show you each one.

---

## Slide 7 — File 1: IDENTITY.md

First file. IDENTITY.md. The birth certificate. The name tag. The answer to the question: "Who are you?"

This is the FIRST thing the AI reads about itself when it wakes up. Before it knows anything about you, before it knows its rules, before it knows what tools it has — it reads this file and learns who it IS.

What goes in here? Your agent's name. Its role — personal assistant, advisor, researcher, whatever YOU need it to be. Its core purpose. Its reason for existing.

Look at the example. It's simple. Name, role, creator, a short paragraph about what the agent does. Clear. Concise. No fluff.

[ask the audience] Quick question — how many of you have already named your agent? Raise your hand.

[wait for responses]

Good! For those who haven't — today's the day. This is where that name becomes OFFICIAL. Written into the record. The ship's registry, if you will.

Now here's a tip that'll save you grief later. Keep this file SHORT. This is not the place for long essays. This is a crisp, clear statement of identity. Five to ten lines. The AI reads this first, which means every token here has MAXIMUM impact. Don't waste it on filler. Name. Role. Purpose. Done.

---

## Slide 8 — File 2: SOUL.md

Second file. And honestly? This might be the most IMPORTANT file in the entire workspace.

SOUL.md. The personality DNA of your agent.

IDENTITY.md tells the agent WHO it is. SOUL.md tells it HOW to be. The communication style. The personality traits. The values. The things it will NEVER do.

Look at this example. Communication style — be direct and concise. No unnecessary filler. Match the energy of the question. Don't start responses with "Great question!" We've all been there, right? You ask the AI what time it is and it goes "Great question! Time is a fascinating concept—" NO. STOP. Just tell me it's 3:15.

[pause]

The personality section — confident but not arrogant. Honest even when uncomfortable. Proactive. And look at that "What You Are Not" section. This is CRITICAL. Not a yes-man. Not a search engine. These boundaries define character just as much as the positive traits do.

Here's the key insight that separates a mediocre SOUL.md from a transformative one: this file defines WHO the AI IS, not what it DOES. Think of it as personality DNA. You don't update DNA every week. You update it RARELY. With intention. When you change SOUL.md, you're reshaping how the agent thinks and communicates across EVERY single interaction. That's power. Treat it with respect.

---

## Slide 9 — Soul Design: What Research Shows

Now I need to get a little nerdy with you for a minute because this is TOO important to skip. Real research. Published papers. Tested on thousands of questions across multiple AI models. And what they found should change how every single person in this room writes their SOUL.md.

[pause]

Finding number one: generic labels do NOTHING measurable. Researchers tested a hundred and sixty-two different roles. "You are a helpful assistant." "You are a mathematician." Zero statistically significant improvement. ZERO. Random noise. If your SOUL.md is just a title and a couple of adjectives, you are BURNING context tokens for nothing. Rip it up.

Finding number two: DETAILED, experiential descriptions dramatically improve performance. Not "you are a mathematician" — but "a number theorist with deep expertise in analytic methods who has spent two decades studying prime gap distributions." THAT works. The agent doesn't just follow a label — it BECOMES someone with that depth of experience.

Here's the format that works. Write BELIEFS, not rules. Wrong: "Always check composition for proper visual weight." Right: "I've learned through hundreds of failed designs that when the weight is wrong, viewers sense it before they can articulate why." See the difference? One is a checklist item. The other is an IDENTITY.

Budget thirty to forty percent of your soul for ANTI-PATTERNS — things the agent will NEVER do. What an expert refuses is often more diagnostic than what they produce.

The soul must go FIRST in the system prompt. Research found a twenty-percent accuracy drop for information stuck in the middle of context. OpenClaw already loads it early — don't mess with that order.

And here's a wild one — let the AGENT write its own soul. LLM-generated expert identities consistently outperform human-written ones. The model is better at designing who it needs to become than you are at describing it.

[pause]

Heavy stuff. But now you know how to write a SOUL.md that actually moves the needle.

---

## Slide 10 — File 3: USER.md

Third of the Big Three. And this one is about YOU.

USER.md. Everything your agent knows about its captain. This is where that brain dump from Module 04 — the one that disappeared when the session ended — becomes PERMANENT.

Look at the structure. Basic info — name, location, timezone. Goals broken into immediate, medium-term, and long-term. Challenges you face. Preferences for how you work. This is YOUR file. YOUR profile. Every weird quirk, every strong opinion, every detail about your life that would help an assistant serve you better.

[ask the audience] Think about the best human assistant you've ever worked with, or the best employee, or even the best friend who always knows what you need. What makes them so good? They KNOW you. They know your schedule. They know your triggers. They know that when you say "fine" you mean "I'm frustrated but I don't want to talk about it." They know you prefer bullet points over essays. They know you're a morning person. They know your wife's name.

[wait for responses]

THAT'S what USER.md does. It gives your agent that deep knowledge of who you are, so it doesn't have to start from scratch every single time. The more detailed this file is, the more your agent feels less like a tool and more like a trusted crew member who's been sailing with you for years.

Transfer EVERYTHING from your Module 04 brain dump into this file. And then keep adding to it. This file should grow as your life changes.

---

## Slide 11 — File 4: MEMORY.md

MEMORY.md. The ship's logbook. The running record of everything your agent has learned, every decision you've made, every fact worth preserving.

This file is different from the other core files because it GROWS. IDENTITY.md is relatively static. SOUL.md changes rarely. But MEMORY.md? This thing accumulates over time like barnacles on a hull. Every important decision, every project status update, every preference the agent discovers about you — it goes here.

Look at the example. Important decisions with dates. Project status. Learned preferences. Technical environment details. This is the living record.

Now, here's where it gets interesting for the power users. When MEMORY.md gets big — and it WILL get big — you split it. The four-file memory system. Your main MEMORY.md stays for long-term permanent context. Then you add `memory/active-tasks.md` for in-progress work that changes daily. `memory/lessons.md` for mistakes worth remembering — so your agent never makes the same error twice. And dated files like `memory/YYYY-MM-DD.md` for daily notes.

[pause]

And here's a cautionary tale that should put the FEAR in you. One user — real person, real story — had their agent nearly DROP A PRODUCTION DATABASE TABLE. Why? Because context compaction erased the reasoning behind a schema decision. The agent knew the table existed but forgot WHY it existed. So it proposed deleting it. That's why you want a `memory/decisions.md` file that records not just WHAT you decided but WHY. The reasoning is more important than the decision itself.

---

## Slide 12 — Memory Configuration: Three Failure Modes

Alright, rough waters ahead. Memory systems can FAIL, and they fail in three predictable, fixable ways. Knowing these failure modes is like knowing where the reefs are — you can navigate around them.

Failure mode one: memory is NEVER SAVED. You tell your agent something important. "Hey, my kid's birthday is March 15th." Session ends. Gone. The LLM decided it wasn't worth saving. Thanks for nothing.

Failure mode two: memory is saved but NEVER RETRIEVED. The information exists in the files! It's RIGHT THERE on disk! But the agent answers from its context window instead of searching memory. It has a filing cabinet full of answers and it just... doesn't open the drawer.

Failure mode three: compaction DESTROYS knowledge. This one is sneaky. Mid-conversation, when the context window gets too full, the system compresses older messages. And sometimes it compresses away information that was never saved to files. Poof. Knowledge that existed five minutes ago is just... gone.

[pause]

The fix? Memory flush. This is the SINGLE most impactful configuration change you can make. You set a forty-thousand-token threshold. Before compaction happens, the system triggers a silent turn that prompts the agent to write durable memories to disk. Think of it like a sailor shouting "SAVE THE MAPS!" before the storm hits.

Additional safeguards — set a six-hour cache TTL to expire stale context. Enable hybrid search that combines vector similarity with BM25 keyword matching. And turn on session indexing so past conversations become searchable.

We'll get deeper into configuration in later modules. For now, just know these three failure modes exist and there are fixes for all of them.

---

## Slide 13 — Advanced Memory Tools

For the ambitious crew members who want to go BEYOND the built-in memory system, there are some serious tools out there. I'm going to give you the quick tour — we're not installing any of these today, but I want you to know they exist for when you're ready.

QMD. This is your recommended starting point. Built by Shopify's CEO, runs locally on your machine, your data stays with you. It combines three retrieval methods — BM25 keyword search, vector similarity, and reranking — for high-quality search results. The killer feature? You can index EXTERNAL documents. Your Obsidian vault. Your Notion exports. Project folders. Anything. Make it all searchable through your agent.

Mem0. This one solves the memory failure modes we just talked about. It auto-captures facts during conversations without depending on the LLM's judgment, and auto-recalls them when they're relevant. Compaction-proof. If you find yourself constantly losing context to compaction, Mem0 is your lifeboat.

Cognee. Knowledge graphs. Entity relationships. "Alice owns the auth module." "This project depends on that library." Enterprise-grade. If you're running a single agent for personal use, this is overkill. But if you're coordinating MULTIPLE agents? Powerful.

And Obsidian integration — either symlink your memory folder so agent notes appear in Obsidian across all your devices, or index your entire vault via QMD so everything you capture becomes searchable by your agents.

[pause]

The rule of thumb: start with QMD. Add Mem0 if compaction keeps eating your context. Consider Cognee only if you're running a fleet of agents that need to share structured knowledge. Crawl, walk, run.

---

## Slide 14 — File 5: AGENTS.md

Back to the core files. File number five. AGENTS.md. The employee handbook. The rules of engagement.

This file defines what your agent CAN do, what it CANNOT do, and what it needs to ASK PERMISSION for. Think of it like the standing orders posted on the bridge of a naval vessel. Clear, unambiguous, non-negotiable.

Look at the structure. An "Always" section — ask before executing destructive commands. Provide a step-by-step plan before multi-step operations. Cite sources. Be transparent about uncertainty. These are the behaviors you ALWAYS want.

A "Never" section — never access email without explicit permission. Never send messages without approval. Never install software without asking. Never delete files without confirmation. These are the hard boundaries. The lines that shall not be crossed.

And a "Default Behavior" section — simple questions get direct answers with no preamble. Complex tasks get explained first. Errors get explained with suggested fixes.

[ask the audience] Here's a question for you. What would YOUR "never" rules be? What's the one thing that, if your agent did it without permission, would make you want to throw the laptop out the window?

[wait for responses]

Write THOSE things down. The rules that matter most to you. Be explicit. Be specific. The vaguer you are, the more room you leave for the agent to interpret — and interpretation is where things go sideways.

---

## Slide 15 — Files 6-9: Supporting Files

Four more files to round out the nine. These are the supporting cast — important, but you won't be spending as much time on them today.

TOOLS.md — API tools documentation. Documents the external tools and APIs your agent has access to. Good news: this is often auto-populated by installed skills. You may not need to touch it at all initially.

HEARTBEAT.md — periodic check instructions. What should the agent do during its scheduled heartbeat checks, roughly every thirty minutes? Check messages? Review tasks? Prepare a morning briefing? We're going to go DEEP on heartbeats in Module 08, so don't worry about this one today. Just know it exists.

BOOTSTRAP.md — first boot ONLY. This runs once, on the very first gateway startup, and then it DELETES ITSELF. Like a message that self-destructs. If your gateway has started at least once, this file is probably already gone. That's normal. That's by design.

BOOT.md — every gateway start. Unlike BOOTSTRAP, this one runs EVERY TIME the engine turns on. Check the date. Review scheduled tasks. Look for missed heartbeats. Send the morning brief if it hasn't gone out yet. Think of it as the startup checklist a pilot runs before takeoff. Every. Single. Time.

[pause]

So there you have it. All nine. The Big Three — IDENTITY, SOUL, USER — are your priority. MEMORY and AGENTS come next. And the last four are supporting infrastructure that we'll configure as we go through later modules.

---

## Slide 16 — How the Files Work Together

Now here's the moment where it all clicks. This is the diagram that should make your eyes go wide. Look at this flow.

You send a message to your agent. Simple enough. You type "Hey, what's on my schedule today?"

What happens BEFORE your agent even starts thinking about a response? The gateway loads context. It reads IDENTITY.md — who is your agent? It reads SOUL.md — how should it communicate? It reads USER.md — who are YOU? It reads MEMORY.md — what does it already know? It reads AGENTS.md — what are the rules? It reads TOOLS.md — what tools can it use?

ALL of that gets loaded. Plus your current message. Plus recent conversation history. Then — and ONLY then — does the AI model start processing.

[pause]

Do you see what this means? Every conversation starts with these files as the foundation. EVERY. SINGLE. ONE. That's why editing these files is the most powerful thing you can do. You're not just changing a setting in some menu. You're literally rewriting the instructions that shape the AI's entire understanding of reality before every interaction.

Change SOUL.md? Every future response is different. Add a goal to USER.md? The agent factors it into every suggestion it makes. Add a rule to AGENTS.md? That boundary is enforced in every conversation from now on.

This is not configuration. This is PROGRAMMING. In plain English. In markdown. And that's the whole beauty of it.

---

## Slide 17 — Context Engineering Principles

Alright, you know WHERE the files are. You know WHAT they do. Now comes the real skill: WHAT do you actually write in them?

This is context engineering. And I'm going to argue this is the most important skill you'll learn in this entire course. Maybe the most important skill for getting value out of AI in 2026, period.

Principle one: be SPECIFIC, not vague.

Bad: "Be helpful and nice." That tells the AI NOTHING. That's like telling a new crew member "do a good job." Useless. Vague instructions produce vague behavior. Every single time.

Good: "When I ask a question, answer directly without preamble. If I'm wrong about something, tell me directly. When giving recommendations, give exactly three options with pros and cons." THAT is specific. The agent knows EXACTLY what to do. No guessing. No interpretation.

Principle two: write for the MACHINE, not for yourself.

Bad: "I work in tech." You know what that means. The AI does NOT. Tech could mean you're a senior engineer at Google or you sell phones at Best Buy.

Good: "I'm a freelance web developer specializing in React and Next.js. My typical project takes two to four weeks and costs three to eight thousand dollars." NOW the AI has actual context it can use. Spell it out like you're explaining to someone who's never met you, because you ARE.

---

## Slide 18 — More Context Engineering Principles

Three more principles. These are the ones that separate the crew from the captain.

Principle three: use STRUCTURE. Markdown headings. Bullet points. Tables. The AI parses structured text FAR better than walls of prose. A paragraph that says "I wake up at six thirty and work from eight to five and my wife's name is Sarah and we have a dog named Max" is a mess. Break it into sections. Daily schedule. Household. Health goals. Clean, scannable, organized. The AI will extract information from a well-structured file ten times faster and more accurately than from a rambling paragraph.

Principle four: update REGULARLY. These files are not "set and forget." Schedule a monthly review. Read through all nine files. Update goals that have changed. Add new preferences you've discovered. Remove outdated information. Your agent should evolve as YOU evolve. A file from six months ago that still lists a goal you've already achieved? That's dead weight. Trim it.

Principle five: VERBALIZE the implicit. This is the hardest one and the most valuable. You have a MOUNTAIN of knowledge, preferences, and context in your head that you've never written down. The AI cannot access it unless you write it.

[pause]

Ask yourself: what do I always explain to new assistants? What assumptions do I make that others don't? What frustrates me about how AI usually responds?

Don't just say "I like short emails." Specify the tone, the length, when to CC someone, when to flag for review, whether to auto-reply or draft and show you first. THAT level of detail is the difference between a generic chatbot and a truly personalized assistant.

The community calls verbalization the most valuable skill of 2026. I agree.

---

## Slide 19 — Living Files vs. Dead Files

Alright, this concept is going to reframe how you think about EVERY file on your computer. I'm not exaggerating.

Dead files. We ALL have them. The tax returns from 2019 sitting in a folder you haven't opened in years. That Word document you started and never finished. The screenshots folder that's become a digital graveyard. PDFs downloaded once and forgotten. These files SIT on your hard drive taking up space and contributing NOTHING. No AI reads them. No agent uses them. They're dead weight in the hull.

Living files. Files that an active AI agent reads, uses, and updates. Your core files are living files. MEMORY.md grows as your agent learns. USER.md evolves as your goals change. These files are ALIVE because they're part of an active system.

[pause]

Here's the key insight from the community, and this is the one I want tattooed on the inside of your eyelids: EVERY file you move into your agent's workspace becomes exponentially more valuable. A research document sitting on your desktop? Dead. The same document in `~/.openclaw/workspace/docs/`? ALIVE. The agent can reference it, update it, cross-reference it with other files, build on it.

Create folders. `workspace/projects/` for project tracking. `workspace/personal/` for health goals and reading lists. `workspace/business/` for client notes. Every file you put in there becomes part of your agent's knowledge base.

And there's a BONUS file. The course includes an OPERATIONS.md template. Copy it into your workspace. This file is written FOR the agent — deep troubleshooting knowledge, failure patterns, security boundaries, configuration gotchas. When something breaks at 2 AM, instead of you googling frantically, your agent already has the diagnostic knowledge to help. You don't need to read this file. Your AGENT does.

---

## Slide 20 — Editing the Core Files

Alright, enough theory. Let's talk about actually DOING this.

You're going to use `nano` in your terminal. `nano` is the simplest terminal text editor on the planet. If you can type, you can use `nano`. No learning curve. No arcane key commands. Well — two key commands.

`nano ~/.openclaw/workspace/IDENTITY.md`

That opens the file. You type. You edit. You make it yours.

Save: Control-O, then Enter. Exit: Control-X. That's it. Those are the only two things you need to know.

[pause]

Now here's the thing that trips up EVERY class I've ever taught, and I need you to hear this because I promise someone in this room is going to make this mistake today:

After you edit the files, you MUST restart the gateway.

`npx openclaw gateway restart`

The gateway loads these files on startup. If you edit SOUL.md and don't restart, your agent is still running on the OLD soul. You'll sit there wondering why nothing changed, getting frustrated, thinking you did something wrong — and the answer is just that you forgot to restart. It's always the restart. ALWAYS.

Write it on a sticky note. Stick it to your monitor. "Did you restart the gateway?" Save yourself the headache.

---

## Slide 21 — Backing Up with Git

Your workspace is now precious. I mean that literally. The files you're about to create? They're irreplaceable. Your agent's identity, your personal profile, your memory, your rules — all of it. If something corrupts those files, or a bad update wipes them, or your cat walks across the keyboard at the worst possible moment — you want a backup.

Git. Three commands. That's all it takes.

`cd ~/.openclaw` — navigate to the workspace.
`git init` — initialize a repository.
`git add -A` — stage everything.
`git commit -m "Initial workspace backup"` — save the snapshot.

Done. You now have version control on your agent's entire life. If something goes wrong, you can roll back. If you make a change to SOUL.md that turns your agent into a passive-aggressive nightmare, you can undo it.

Get in the habit of committing regularly. Every time you make significant edits, commit. `git commit -m "Workspace update:"` with the date. Ten seconds of your time. Infinite regret prevented.

[pause]

OPTIONAL but RECOMMENDED: push to a private GitHub repository for off-machine backup. Create a new repo, make ABSOLUTELY SURE it's set to PRIVATE — not public, PRIVATE — and push.

[ask the audience] Why private? Who can tell me why it HAS to be private?

[wait for responses]

Because your workspace contains personal information, potentially API keys, and detailed knowledge about your life and preferences. Making that public would be like posting your diary on a billboard. Don't do it.

---

## Slide 22 — Shoals and Sandbars

Alright, danger zone. Let's talk about the mistakes I see EVERY time. The shoals and sandbars that will run your ship aground if you're not watching for them.

Mistake number one: not editing the core files AT ALL. You install OpenClaw, you start chatting, and you never touch IDENTITY.md. Your agent remains generic. Boring. A stranger who happens to live in your terminal. Fix: spend thirty minutes — just thirty minutes — customizing at least the Big Three. Identity, Soul, User. That's all it takes to transform the experience.

Mistake number two: writing vague instructions. "Be good." "Be helpful." "Be nice." These tell the AI NOTHING. Be specific. "Respond in two to three sentences for simple questions." THAT'S useful.

Mistake number three: putting everything in one file. Your SOUL.md should not contain your schedule, your goals, your project notes, AND your rules. Each file has a purpose. Use them.

Mistake number four: editing JSON config files directly with a text editor. One misplaced comma and your installation breaks. Use `npx openclaw config` or the TUI `/config` command instead.

Mistake number five: THE BIG ONE. Forgetting to restart after changes. Say it with me — `npx openclaw gateway restart`.

Mistake number six: never updating. Your goals change. Your preferences evolve. Your files should too. Monthly review. Put it in your calendar.

Mistake number seven: making the workspace repo public. We just covered this. Private. ALWAYS private.

Watch for these. Every single one of them is a real sandbar that real students have run aground on.

---

## Slide 23 — Hands on Deck: Customize Your 9 Core Files

This is it, crew. Hands on the keyboard. We're doing this RIGHT NOW.

Part one: the Big Three. Twenty minutes. Open up that terminal and let's go.

First — IDENTITY.md. Give your agent a name. Give it a role. Give it a purpose. At least five lines. I want you to think about this like you're writing a crew manifest. Who IS this agent? What is its job on your ship? Why does it exist?

Second — SOUL.md. This is the personality blueprint. At least ten lines. Think about every time an AI response annoyed you. Every time it was too wordy, too vague, too cheerful, too robotic. Now write the OPPOSITE. Write the communication style that would make you think "finally, someone who gets it." Use the research-backed format: beliefs over rules. "I've learned that X because Y." Budget a third of it for anti-patterns — things the agent must NEVER do.

Third — USER.md. Pull up your brain dump from Module 04. Transfer everything into this file in a structured format. At least twenty lines. Headings, bullet points, sections. Your schedule, your goals, your preferences, your challenges, the names of people in your life, your technical environment. Everything.

Part two: set your rules. Ten minutes. Open AGENTS.md. Write at least three "always" rules and three "never" rules. Be specific. Be concrete. Think about what requires permission and what the agent should never, ever touch.

Part three: start your memory. Five minutes. Open MEMORY.md. Record today's date. Record that you set up OpenClaw. Record your chosen AI provider and model. Add at least one goal you want your agent to help with. This is the first entry in the ship's logbook. The first of many.

[pause]

Go. I'll be walking around if anyone needs help with nano or gets stuck. Twenty minutes on the Big Three. Clock starts now.

---

## Slide 24 — Hands on Deck (continued)

Alright, pens down — or, keyboards down. Fingers off the keys. Let's see if this actually WORKED.

Part four: restart and test. Ten minutes.

Step one: restart the gateway. `npx openclaw gateway restart`. Say it with me. Out loud. I'm serious. NPX OPENCLAW GATEWAY RESTART. Good. Now actually do it.

Step two: open the TUI. `npx openclaw tui`.

Step three: ask your agent this exact question — "What is your name, and what do you know about me?"

[pause]

The response should reflect EVERYTHING you just wrote. If you named your agent and wrote it in IDENTITY.md, it should introduce itself by that name. If you wrote your goals in USER.md, it should mention them. If you defined the communication style in SOUL.md, the TONE of the response should match what you wrote.

If it doesn't? Check two things. Did you save the files? Control-O, Enter. Did you edit the right files in the right directory — `~/.openclaw/workspace/`? Here's the good news — workspace `.md` files are hot-reloaded. Your agent picks up changes on the NEXT message you send. No restart needed for identity, soul, memory — any of the `.md` files. JSON config changes are different — those still need a gateway restart. But your workspace files? Just save and send a message.

One more thing while we're here — file size limits. Each workspace file can be at most 20,000 characters. The total across ALL workspace files is capped at 150,000 characters. Go over that limit and your files get silently truncated — the agent just doesn't see the rest. So keep your files focused and concise. If something is getting huge, split it into smaller files.

[ask the audience] Who got a response that actually reflected their files? Hands up.

[wait for responses]

Beautiful. For anyone who didn't — don't panic. We'll troubleshoot together. Check that you saved and that you're in the right directory.

Part five: back it up. Five minutes. Initialize Git if you haven't already, add everything, commit with the message "Initial workspace: agent configured." Your first official backup. The first snapshot of your agent's identity. Treasure that commit.

---

## Slide 25 — Treasure Chest

Seven treasures to take home from today's voyage. Seven things to nail to the mast.

Number one: the workspace at `~/.openclaw/` is your agent's ENTIRE WORLD. Configuration, memory, identity, history — all of it. One directory. Guard it.

Number two: nine core files define who your agent is. IDENTITY, SOUL, USER, MEMORY, AGENTS, TOOLS, HEARTBEAT, BOOTSTRAP, BOOT. Nine files. Nine aspects of your agent's existence.

Number three: context engineering is the most impactful skill you will learn in this course. Be specific. Be structured. Be thorough. Vague in, vague out. Specific in, specific out.

Number four: living files are worth more than dead files. Every document you move into your agent's workspace becomes exponentially more valuable. Build that knowledge base.

Number five: back up your workspace with Git. It is IRREPLACEABLE. Not "inconvenient to lose." Irreplaceable. Treat it accordingly.

Number six: update regularly. Your agent should evolve as you do. Monthly review. Keep it current. Trim what's outdated.

Number seven: workspace files hot-reload — just send a new message after saving. Config changes still need a gateway restart. And watch those file size limits — 20,000 characters per file, 150,000 total.

[pause]

You walked in here today with an agent that forgot you after every session. You're walking out with an agent that knows your name, your goals, your personality preferences, and your rules — permanently. That's not a small thing. That's a fundamental shift in what this AI is to you.

---

## Slide 26 — Next Port of Call

So your agent knows who it is. It knows who YOU are. It remembers things. It has rules. It has personality. Beautiful.

But right now, the only way to talk to your agent is through the terminal. You have to sit down at the computer, open a terminal, fire up the TUI, and type. Which is fine for deep work sessions, but what about when you're on the bus? What about when you're lying in bed at 11 PM and you remember something you need your agent to handle? What about when you're walking the dog and an idea hits you?

Module 06: Connecting Messaging Channels. We're connecting your agent to Telegram. Your phone. Your tablet. Any device with Telegram installed. You'll be able to text your agent like you text a friend. Send it a message from the grocery store. Get a response while you're making dinner.

Your agent is about to go MOBILE. It's about to leave the terminal and step out into the real world, riding in your pocket wherever you go.

[pause]

Before next time — make sure your Big Three files are customized. IDENTITY, SOUL, and USER. If you didn't finish them in class today, finish them tonight. Restart the gateway. Test them. Back them up. Because Module 06 builds directly on what we did today, and you'll want a solid foundation before we start connecting channels.

Great work today, crew. Seriously. What you built here is the foundation that everything else in this course sits on top of. The workspace is no longer a mystery — it's YOUR ship, and you know every compartment by name.

See you at the next port.
