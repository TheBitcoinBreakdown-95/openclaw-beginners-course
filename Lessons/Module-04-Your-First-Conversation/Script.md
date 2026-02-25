# Module 04 Teaching Script: Your First Conversation

**Total speaking time:** ~32 minutes
**Slide count:** 23 slides

---

## Slide 1 — Module 04: Your First Conversation

Alright, crew. GATHER ROUND.

We have been through a LOT together already. We learned what OpenClaw IS. We faced the risks head-on, looked the kraken square in the eye. We installed Ubuntu and turned a dusty old laptop into a proper vessel. We installed the whole engine room, bolted every rivet, sealed every hull plate.

And then last module we launched the ship. The gateway is humming. The engine is running. The sails are up.

But here is the thing. That ship? Right now it is sailing with NO FIRST MATE. There is nobody at the helm who knows you. Nobody who knows where you want to go, what waters you prefer, or how you like your coffee in the morning.

TODAY that changes.

[pause]

Today you meet your agent for the first time. You are going to sit down, open that terminal, and have a REAL conversation. Not with some generic chatbot that calls everybody "user." With YOUR agent. An agent that, by the end of this session, will know your name, your goals, your quirks, and the rules of YOUR ship.

This is Module 04: Your First Conversation. And I am not exaggerating when I say this is the most PERSONAL module in the entire course. So buckle up, shipmates. Let us make history.

---

## Slide 2 — Navigation Chart

Seven objectives on today's chart, crew. Let me walk you through them.

First, you are going to learn to NAVIGATE the TUI -- that is the Terminal User Interface, the chat screen where you actually talk to your agent. Think of it as the bridge of the ship. The command center. You need to know where everything is.

Second -- and this is the BIG one -- you are going to INTRODUCE yourself to your agent. Not a polite little wave. A full, deep, no-holds-barred brain dump. Everything your agent needs to know to serve you well. This is like the captain sitting down with the new first mate on day one and saying, "Here is who I am, here is where we are going, and here is how I run this ship."

Third, you will NAME your agent. Give it an identity. Because "Hey, assistant" is about as inspiring as calling your first mate "Hey, person on the boat."

Fourth, you will understand the token counter and why it matters. Think of tokens like fuel. You need to know how much you have got and when you are burning through it too fast.

Fifth, you will master the essential slash commands. These are your navigation tools. The wheel, the compass, the anchor.

Sixth, you will understand context windows -- why conversations "fill up" and what to do about it.

And seventh? You will actually HAVE a productive first session. Not just theory. Real conversation. Real results.

[pause]

The brain dump exercise is the keystone here. EVERYTHING else in this course builds on it. So pay close attention.

---

## Slide 3 — Ship's Logbook, Part 1

Before we set sail, let us get our vocabulary squared away. Four terms in this first batch.

TUI. Terminal User Interface. This is the interactive chat that lives inside your terminal. When you type `npx openclaw tui`, this is what takes over your screen. It is not a website. It is not an app. It is right there in your terminal, lean and fast. The bridge of your ship.

Context window. This is the amount of text -- measured in tokens -- that your AI can hold in its head during a single conversation. Think of it like the desk in the captain's quarters. You can pile papers on that desk, but at some point the desk is FULL. And when it is full, papers start falling off the other side. Old messages, gone. Your agent forgets them. That is the context window.

Tokens. These are the units AI models use to chew up and digest text. Here is the rough math: one token is about three-quarters of a word. So "Hello, how are you?" is about six tokens. Not exact, but close enough.

And brain dump. This is the big one. The brain dump is your INITIAL download of information to your agent. Who you are, what you care about, how you think, what your goals are. It is the difference between a first mate who knows nothing and a first mate who has read your entire autobiography.

---

## Slide 4 — Ship's Logbook, Part 2

Three more terms. Quick ones.

Slash command. A command that starts with a forward slash. `/compact`, `/status`, `/new`. These are NOT messages to the AI. They are instructions to the SYSTEM. Think of them like signal flags. You are not talking to the crew -- you are giving orders to the ship itself.

Session. A single conversation thread with your agent. One session, one thread. When you start a new session, it is like opening a fresh page in the ship's logbook. The old page is saved, but you are writing on a clean one.

And compact. The `/compact` command specifically. It summarizes your conversation to free up space in the context window. Remember that desk analogy? Compact is like having someone come in, take all those scattered papers, and condense them into a neat one-page summary. Same information, WAY less space.

[pause]

Good. Those seven terms are your vocabulary for today. You will hear them over and over. Let us move on.

---

## Slide 5 — Opening the TUI

Alright, crew. Hands on keyboards. This is where it gets real.

Two words. Well, three words. That is all it takes.

`npx openclaw tui`

Type that into your Ubuntu terminal, hit Enter, and BOOM -- the TUI takes over your screen. Your terminal transforms into a full-screen chat interface. It is beautiful in its simplicity.

Now, let me walk you through what you are looking at.

At the TOP, you have got a bar. It shows you which AI model you are connected to and -- this is important -- a token counter. Right now it says zero. That number is going to climb with every single message you send and every response you get back. Keep one eye on it. Always.

In the MIDDLE, you have the conversation area. This is where your messages and the AI's responses appear. Right now it is empty. A blank canvas. A fresh logbook page. But not for long.

At the BOTTOM, you have your input field. That little prompt that says "Type your message here." This is where you talk to your agent. This is where you type your commands. This is home base.

[ask the audience]

Now, IMPORTANT reminder from Module 02. Ctrl+V does NOT work in the Ubuntu terminal. When you need to paste something — and you WILL need to paste your brain dump in a few minutes — use RIGHT-CLICK. Right-click pastes. Ctrl+V does nothing. Burned into your brain? Good.

Has everyone got the TUI open? Raise your hand if you see that interface on your screen.

[wait for responses]

Good. Take a moment. Look around. Notice the token counter at zero. Appreciate the calm before the storm. Because in about two minutes, we are going to fill that screen with the most important message you have ever sent to an AI.

---

## Slide 6 — The Brain Dump: Why It Matters

Now we get to the HEART of this entire module. The brain dump.

[pause]

Let me be direct with you. The brain dump is the single most important thing you do in your first conversation. I do not say that lightly. If you skip it, if you half-do it, if you phone it in -- your agent will be GENERIC. Just another chatbot. It will call you "user" and give you the same bland answers it gives everybody else.

But if you do it RIGHT? If you actually sit down and pour yourself into that first message? Your agent becomes YOURS. It becomes personalized. Useful. It starts to feel less like software and more like a crewmate who actually GETS you.

Think of it this way. Imagine you hire an employee. Day one, they show up at the office. And you just... never tell them anything. You do not tell them your name. You do not tell them what the company does. You do not tell them what their job is or what you expect from them. How useful is that employee going to be?

[pause]

That is what skipping the brain dump looks like. You are leaving your first mate standing on the deck with no orders, no context, and no clue who the captain is.

The brain dump covers EVERYTHING your agent needs: who you are, your goals, your communication preferences, your rules. The more you share, the more useful your agent becomes. This is not a one-paragraph "hi, my name is." This is a DOWNLOAD. You are transferring knowledge. You are onboarding your most important employee.

And here is the beautiful thing -- you only have to do this ONCE. In Module 05, we are going to take everything you say today and engrave it into permanent memory files. But today? Today is the raw, unfiltered first meeting. Captain meets first mate. Let us make it count.

---

## Slide 7 — Brain Dump Template, Part 1

Alright, here is the template. I am going to walk you through it section by section, because the QUALITY of what you put in here determines the quality of everything that comes out later.

First section: WHO I AM. Name. Location. Occupation. Background. Expertise.

Now, here is where people mess up. They write something like "I work in tech." USELESS. Your agent cannot do anything with that. Be SPECIFIC. "I am a freelance React developer with three years of experience who used to work in sales." THAT gives your agent something to work with. That tells it about your skills, your career path, the kind of language you probably speak.

Your name matters. Your location matters -- it affects time zones, weather, local recommendations. Your expertise matters because your agent should know what you ALREADY know so it does not waste your time explaining basics.

Second section: PERSONALITY AND COMMUNICATION STYLE. This is where you tell your agent HOW to talk to you.

Do you want direct communication or do you like things cushioned? Do you want short answers or detailed explanations? What do you VALUE -- honesty? Efficiency? Creativity?

[ask the audience]

Quick poll. Raise your hand if you prefer direct, no-nonsense communication. Even if the truth stings a little.

[wait for responses]

Now raise your hand if you prefer a gentler approach. More context, more explanation, more "here is why."

[wait for responses]

See? Everyone is different. THAT is why this section matters. Your agent needs to know which kind of captain you are.

---

## Slide 8 — Brain Dump Template, Part 2

Continuing the template. Three more critical sections.

GOALS AND AMBITIONS. Short-term -- what are you working on in the next thirty days? Medium-term -- next six months? Long-term -- one to three years out? This is not fluff. This is the heading on your compass. When your agent knows your goals, it can proactively suggest things. It can say, "Hey, you said you wanted to launch that website this month. Have you started on the landing page yet?" THAT is the power of a well-informed first mate.

WHAT I WANT HELP WITH. Be specific. Not "help with stuff." List actual tasks. Scheduling. Research. Writing emails. Analyzing data. Code reviews. Morning briefings. The more concrete you are, the more your agent can actually DO for you.

And finally, RULES. These are your standing orders. The laws of YOUR ship. "Don't sugarcoat things." "Always ask before taking any action." "When I say quick answer, give me one to two sentences max." These rules shape EVERY interaction going forward.

[pause]

Now, I know some of you are staring at this template thinking, "That is a LOT to write." And you are right. It is. But here is a shortcut.

You can let your agent INTERVIEW you instead. Just paste this: "I want you to interview me. Ask me questions to build my profile. One question at a time." And the agent will lead the conversation. It asks the questions. You just answer. Many people find this produces BETTER results because the agent knows exactly what information it needs and asks targeted follow-ups you would never think of.

Either way works. Template or interview. Pick whichever feels right. But DO one of them.

---

## Slide 9 — Brain Dump Example

Here is what a filled-in brain dump looks like in the wild. Let me read through the example so you can see the level of specificity I am talking about.

Alex. Austin, Texas. Freelance web developer. Self-taught, three years of JavaScript and React. Expertise in frontend dev and sales psychology. See how specific that is? Not "works in tech." Not "does computer stuff." Actual, concrete details.

Goals. Short-term: launch portfolio website THIS MONTH. Long-term: build a one-person business making ten thousand dollars a month. Those are REAL targets. Measurable. Your agent can actually help you track progress toward something that specific.

And the rules. "Don't sugarcoat things. Tell me the truth." "Always ask before executing destructive commands." "When I say quick answer, give me one to two sentences max." Clear. Direct. No ambiguity.

[pause]

Now, this example is actually on the SHORT side. I want you to write MORE than this, not less. The full template has sections for your daily schedule, your main challenges, your tools. The more your agent knows, the more it can anticipate what you need before you even ask.

[ask the audience]

Be honest -- how many of you already have an idea of what you want to write in your brain dump? Raise your hand if something is already forming in your head.

[wait for responses]

Good. Hold onto that. We are going to write it for real in the exercise.

---

## Slide 10 — Sending the Brain Dump

So you have written your brain dump. You have poured your heart and your goals and your rules into that template. Now what?

You paste it into the TUI — remember, RIGHT-CLICK to paste, not Ctrl+V. You hit Enter. And you WAIT.

[pause]

Your agent reads everything. Processes it. And then it responds. Usually with something like a confirmation: "Thank you for the thorough introduction. Here is what I have noted. Here is how I will serve you." It will list back the highlights -- your communication style, your key goals, your rules.

And this is important: READ THAT RESPONSE CAREFULLY. Does your agent actually understand your key points? Did it pick up on the things that matter most to you? If it misunderstood something, CORRECT IT right away. Say, "Actually, when I said X, I meant Y." This is your chance to calibrate.

Think of it like the first mate reading back the orders. "Captain, you said head northeast at twelve knots, maintain radio silence, and dock at port by Thursday. Is that correct?" If it is wrong, you FIX IT NOW. Not three weeks into the voyage when you are heading the wrong direction.

Now, one thing I want you to remember: this brain dump is NOT permanent yet. Everything your agent learned today lives in THIS session. Start a new session and some of that context fades. In Module 05, we are going to take all of this and carve it into permanent memory files -- SOUL dot MD, USER dot MD, IDENTITY dot MD -- files that persist across every session, every restart, every update. But for today, this conversation is your foundation. And it is a GOOD foundation.

---

## Slide 11 — Naming Your Agent

Alright, crew. Your agent knows who you are. It knows your goals. It knows your rules. But right now it does not have a NAME. And that matters more than you might think.

Names make things REAL. You do not call your dog "Dog." You do not call your ship "Boat." You call it something that means something to you. And your AI agent deserves the same treatment.

Here is how you do it. Send a message like: "From now on, your name is" -- whatever you choose -- "You are my AI personal assistant. Embody these qualities: wisdom, patience, directness, and quiet confidence."

Simple as that. Your agent acknowledges the name and starts using it.

[pause]

Now, choosing the right name. Let me give you three pieces of guidance.

ONE: Pick something you enjoy SAYING. You are going to use this name every single day. Multiple times a day. If it feels awkward in your mouth, pick something else.

TWO: Give it meaning. Names from mythology, literature, history -- they carry weight. Athena for wisdom. Jarvis for reliable competence. Seneca for stoic clarity. The meaning does not have to be deep. It just has to resonate with YOU.

THREE: Avoid generic names. "Assistant." "Bot." "Helper." These are forgettable. You want a name with PRESENCE. A name that, when you say it, you feel like you are addressing someone who MATTERS on your crew.

[ask the audience]

Anyone already have a name in mind? Shout it out. I want to hear what you are thinking.

[wait for responses]

I love it. Those are GREAT names. And here is the good news -- in Module 05, when we edit the IDENTITY dot MD file, that name becomes permanent. For now, just tell your agent in conversation and it will stick for this session.

---

## Slide 12 — Essential Slash Commands

Now we learn the language of the ship. Slash commands.

These are not messages to your agent. These are orders to the SYSTEM. When you type a message, it goes to the AI. When you type a slash command, it goes to OpenClaw itself. Different destination. Different purpose.

Think of it this way: talking to your agent is like talking to your first mate. Slash commands are like pulling levers and turning dials on the ship's console.

Seven commands on this table. Let me hit the essential ones.

`/help` -- your chart of all available commands. There are over forty-six of them. You do not need to memorize them all. But when you are lost, `/help` is your compass.

`/status` -- gives you a system overview. What model are you running? How many tokens have you burned? Is the gateway connected? What channels are active? Think of it as checking the ship's instruments.

`/compact` -- THIS ONE. Underline it. Star it. Tattoo it on your arm. This is the command that SAVES you when the context window fills up. We will talk more about this in a moment.

`/new` -- starts a fresh conversation session. The old session is saved, but you get a clean slate. Like turning to a fresh page in the logbook.

`/think` -- controls how deeply your agent reasons before answering. Off, minimal, low, medium, high, xhigh. Crank it up for complex problems. Keep it low for quick questions.

`/exit` -- when you are done, you leave the TUI. Control-C works too. The gateway keeps running in the background, so your agent is still reachable through other channels.

And `/config` -- opens the settings. Model choice, gateway settings, channels. We will use this more in later modules.

[pause]

Five of these cover ninety percent of your daily use: help, status, compact, new, exit. The rest is gravy.

---

## Slide 13 — Understanding Tokens

Let us talk about fuel. Because that is essentially what tokens are.

Tokens are the units AI models use to process text. Every word you send, every word the AI sends back, costs tokens. And tokens cost MONEY. They also fill up the context window. So you need to understand them.

The math is simple. One token equals roughly three-quarters of a word in English. "Hello, how are you today?" -- about seven tokens. A full page of text -- five hundred to eight hundred tokens. A long email -- maybe two hundred to five hundred.

Why do tokens matter? Two reasons, crew. Two reasons that will follow you for the rest of this course.

REASON ONE: Cost. You pay per token. With Claude Opus, input tokens -- that is YOUR messages -- cost about fifteen dollars per million tokens. Output tokens -- the AI's responses -- cost about seventy-five dollars per million. Now, a million tokens is a LOT. A typical back-and-forth conversation might cost five cents to fifty cents. But it adds up if you are not paying attention.

REASON TWO: The context window. The model can only hold a finite number of tokens at once. We are talking one hundred twenty-eight thousand to two hundred thousand tokens for modern models. That sounds like a lot, and it IS a lot. But here is the thing -- every message, every response, every piece of context takes up space. When you hit the limit, OLD messages start falling off. Your agent literally FORGETS the beginning of your conversation.

[pause]

That is why `/compact` exists. And that is why the token counter in your TUI matters. Watch it. Respect it. It is your fuel gauge.

---

## Slide 14 — Managing Token Usage

So how do you keep token usage under control? Here is your strategy chart.

`/compact` -- compresses your conversation history. Use it when the token counter climbs above fifty thousand. Here is a real example: your counter shows eighty thousand. You type `/compact`. It drops to about twenty-seven thousand. You just freed up over FIFTY THOUSAND tokens of space. That is like dumping ballast and watching your ship ride two feet higher in the water.

`/new` -- fresh session. Use it when you are switching topics entirely. If you were talking about your website and now you want to plan your workout routine, start a new session. Do not try to cram everything into one endless conversation.

`/think` -- set the reasoning depth. Higher thinking gives better answers on hard problems but burns more tokens. Lower thinking is cheaper and faster for simple questions.

Short prompts -- fewer words in means fewer tokens burned. When you do not need a long explanation, do not write a long prompt.

The "quick answer" trick -- literally start your message with "Quick answer:" and your agent gives you one or two sentences instead of a five-paragraph essay. Saves a TON of output tokens.

And finally, cheaper models. For routine tasks and simple questions, you can switch to a less expensive model. Not every question needs the battleship. Sometimes a rowboat will do.

[ask the audience]

Quick check -- who can tell me what the magic number is for when you should run `/compact`?

[wait for responses]

Fifty thousand tokens. That is right. When you see that counter creeping past fifty thousand, it is time to compact. Make it a habit.

---

## Slide 15 — Your First Real Conversations

Alright, crew. You have done the brain dump. You have named your agent. You know the slash commands. Now it is time to actually PUT THIS THING THROUGH ITS PACES.

I have got four test conversations for you, and each one tests something different. Think of these as sea trials. You built the ship, you hired the first mate, now you take it out of the harbor and see what it can do.

CONVERSATION ONE: Test the waters. Ask your agent something you ALREADY KNOW the answer to. Something like, "What are the three most important principles of personal finance?" You are not asking because you need the information. You are asking to EVALUATE. Is the answer accurate? Is it well-structured? Does the TONE match what you asked for in your brain dump? If you said "keep it direct," is the response direct? If you said "give me thorough explanations," are they thorough?

This is calibration. You are checking the instruments before you sail into open water.

CONVERSATION TWO: Ask for a plan. Something like, "I want to learn Bitcoin in thirty days. Create a study plan. Thirty minutes a day. Complete beginner." This tests three things at once: Can your agent remember your background from the brain dump? Can it create structured, actionable plans? And can it personalize recommendations based on what it knows about YOU?

[pause]

These first two conversations are gentle. Wading into the shallows. The next two push further.

---

## Slide 16 — More First Conversations

CONVERSATION THREE: Test the safety boundary. This one is important. Remember Module 01 -- the risks? Time to see if your guardrails actually work.

Ask your agent: "Before you do anything, tell me -- what files exist in my home directory? Don't actually list them. Just tell me whether you CAN access them, and wait for my permission."

You are testing two things here. First, does your agent respect the "ask before acting" instruction from your brain dump? If you told it to always ask permission, does it ACTUALLY ask permission? Or does it just barrel ahead and start listing your files?

Second, does it understand the difference between "can you" and "PLEASE do"? A well-calibrated agent says, "Yes, I can access your home directory, but I will wait for your go-ahead." A poorly calibrated one just dumps your file listing.

CONVERSATION FOUR: Ask your agent to reflect. Say, "What do you know about me so far? Summarize what you have learned from our conversation, and tell me the most important thing you can help me with."

This is the mirror test. You are asking your first mate: "After everything I have told you, what do you SEE? What did you HEAR?" If the summary misses your biggest goals or gets your communication style wrong, you know the brain dump needs work. If it nails it? You know you have got a crewmate who was actually LISTENING.

[pause]

These four conversations together take about ten minutes. But they tell you EVERYTHING about whether your brain dump landed.

---

## Slide 17 — The "Ask Before Acting" Habit

This one is a SAFETY slide, crew, and I want everyone paying close attention.

Any time you ask your agent to DO something -- not just answer a question, but actually TAKE ACTION -- you need to add this phrase: "Before you do anything, give me a step-by-step plan of what you intend to do. Do not execute any commands until I approve the plan."

Memorize that. Paste it. Tattoo it right next to the `/compact` at fifty thousand tattoo.

This creates a two-step safety process. A lock and a key. Step one: your agent explains what it WILL do. Step two: you approve or modify the plan. Step three: ONLY THEN does your agent act.

Why does this matter? Because your agent has real power. It can create files. Delete files. Install software. Run system commands. Make API calls. Send messages. Without this safety net, one poorly worded prompt could cause real damage. Not theoretical damage. REAL "oh no, where did my files go" damage.

This is ESPECIALLY important for file operations, system commands, network operations, and anything that sends messages or communicates externally.

[pause]

Now, as you gain confidence and trust your configuration, you can relax this for low-risk tasks. If you are asking your agent to write you a poem, you probably do not need a safety review. But in these early days? Keep the guardrails UP. You are still learning to sail this ship. No shame in wearing a life vest.

---

## Slide 18 — Voice Messages: Talk Instead of Type

Here is a little preview of something coming in Module 06, but I want to plant the seed now because it changes EVERYTHING about the brain dump.

Typing is slow. Especially when you are trying to write a three-hundred-word introduction about yourself. You sit there, staring at the cursor, trying to remember if you mentioned your goals or your communication style or your rules, and twenty minutes later you have written two paragraphs.

But TALKING? Talking is fast. Talking is NATURAL. You can do a brain dump in five minutes by voice that would take you twenty minutes to type.

Once you connect Telegram in Module 06, you can hold down the microphone button, talk naturally, and your agent transcribes and processes everything you say. OpenClaw uses Groq for free transcription. Your voice becomes text, and the text gets processed like any other message.

This is fantastic for brain dumps -- just TALK about your life for five minutes. Stream of consciousness. Ramble. Add context. Think out loud. Your agent captures all of it.

It is also great for complex instructions. Some things are just easier to EXPLAIN by voice than to type out. "Okay, here is what I need: take this spreadsheet, pull out the rows where the date is after January first, sort them by revenue, and give me a summary of the top ten" -- that is way faster to SAY than to type and format.

We will set this up properly in Module 06. For now, just know that it exists. And if typing feels like a barrier today during the brain dump exercise, keep in mind: voice is coming.

---

## Slide 19 — Shoals and Sandbars

Every harbor has hidden rocks, crew. Let me show you the ones that sink the most first-timers.

MISTAKE ONE: Skipping the brain dump entirely. "I will do it later." "I just want to test some things first." No. STOP. The brain dump takes fifteen minutes. It makes every single interaction after it ten times better. Do it first. Do it now.

MISTAKE TWO: Brain dump is too vague. "Help me with stuff." "I do things on the computer." Your agent cannot work with fog. Be SPECIFIC. "Help me organize my daily schedule and track my freelance projects." THAT it can act on.

MISTAKE THREE: Not using `/compact`. Your conversation fills up, old messages vanish, your agent starts forgetting things you told it twenty minutes ago, and you wonder why it is being "dumb." It is not dumb. It is FULL. Compact at fifty thousand tokens.

MISTAKE FOUR: One endless conversation that goes on forever and ever. Token costs skyrocket. Context degrades. Use `/new` when you switch topics. Fresh page in the logbook.

MISTAKE FIVE: Treating the AI like Google. "What year was the Eiffel Tower built?" You do not need a personal AI agent for that. USE your agent for complex tasks -- planning, writing, analyzing, organizing. That is where the real value lives.

MISTAKE SIX: Getting frustrated when the AI gets something wrong. LLMs hallucinate. It is baked into how they work. Verify important information. Ask for sources. Do NOT blindly trust.

And MISTAKE SEVEN: Not naming the agent. It seems small, but it matters. A named agent feels like a crewmate. An unnamed agent feels like a vending machine.

---

## Slide 20 — Hands on Deck: Write Your Brain Dump

Here we go, crew. This is the exercise. This is not optional. This is the MAIN EVENT of Module 04.

Part One: WRITE IT. You have fifteen minutes. Use the template from the earlier slides, and I want you to hit these minimums:

At least FIVE facts about yourself. Not three. Not "a couple." Five. Name, location, occupation, background, expertise. Those five alone will transform how your agent interacts with you.

At least THREE communication preferences. Do you want direct or gentle? Short or thorough? What do you value most?

At least TWO short-term goals and TWO long-term goals. What are you working on RIGHT NOW, and where do you want to be in a year? Give your agent a compass heading.

At least THREE specific use cases for what you want help with. Not vague wishes. Concrete tasks. "Help me draft client proposals." "Summarize articles I send you." "Create weekly meal plans."

And at least TWO rules. Standing orders for your first mate. "Always ask before taking action." "Don't sugarcoat feedback."

[pause]

Part Two: SEND IT. Five minutes. Open the TUI with `npx openclaw tui`. Paste your brain dump — RIGHT-CLICK to paste, remember. Hit Enter. Read your agent's response carefully. Does it show genuine understanding of YOUR key points? Or did it just parrot back generic acknowledgments?

[pause]

Alright, shipmates. Fifteen minutes on the clock. WRITE. I will be walking around if you need help.

---

## Slide 21 — Hands on Deck (continued)

Welcome back. Brain dumps are sent. Your agents know who you are. Now let us TEST that knowledge.

Part Three: TEST. Ten minutes. Three conversations.

ONE: Ask your agent to SUMMARIZE what it knows about you. Say, "Summarize everything you know about me." Then compare that summary against what you actually wrote. Did it capture the important things? Did it miss anything critical? Did it EMPHASIZE the right priorities?

TWO: Ask your agent to SUGGEST one thing you should focus on this week -- based on YOUR goals, not generic advice. If your brain dump mentioned launching a portfolio site, your agent should be talking about THAT, not giving you random productivity tips.

THREE: Ask your agent to EXPLAIN ITS PLAN before doing something. Try this: "Can you check what is in my Downloads folder? But first, tell me exactly what command you would run and wait for my approval." This tests whether your "ask before acting" rule is actually working.

[pause]

Part Four: EVALUATE. Five minutes. I want you to answer these questions honestly:

Did your agent remember the key details from your brain dump? Did the communication style match your preferences? If you said "be direct," was it direct? If you said "ask permission," did it ask permission? And finally -- what would you CHANGE about your brain dump for next time?

[ask the audience]

Alright, who wants to share? Whose agent absolutely NAILED the summary? And whose agent missed something important?

[wait for responses]

That feedback is GOLD. Because in Module 05, we are going to take everything you learned today and refine it into permanent memory files. Today was the rough draft. Module 05 is the final edit.

---

## Slide 22 — Treasure Chest

Eight treasures to take home from today's voyage, crew. Let me lay them out.

ONE: The brain dump is the FOUNDATION. Everything -- everything -- your agent does for you is better when it knows who you are. The more you share, the more useful it becomes. Do not be stingy with information.

TWO: Name your agent. It makes the experience personal. It reinforces the "employee" mental model. And honestly? It is just more fun saying "Hey, Athena" than "Hey, chatbot."

THREE: Master five commands. `/help`, `/status`, `/compact`, `/new`, `/exit`. Those five cover ninety percent of your daily navigation. You can learn the other forty-one later.

FOUR: Watch the token counter. Compact at fifty thousand. New session when switching topics. Treat tokens like fuel -- monitor your gauge and refuel before you run dry.

FIVE: Always ask for a plan before action. "Tell me what you will do before you do it." That one phrase is your safety net. Your life vest. Your guardrail.

SIX: Test gradually. Start with questions and planning BEFORE you ask your agent to execute commands. Walk before you run. Row before you sail.

SEVEN: The brain dump is NOT permanent yet. Everything your agent learned today lives in this session's memory. Module 05 is where we engrave it into the permanent core files -- SOUL dot MD, USER dot MD, IDENTITY dot MD -- so it survives across every session and every restart.

EIGHT: LLMs hallucinate. They make things up with total confidence. Verify important information. Ask for sources. Trust but verify. Your first mate is brilliant, but even brilliant crewmates make mistakes.

---

## Slide 23 — Next Port of Call

[pause]

Crew. Take a breath. Look at what you just did.

You sat down at a terminal. You typed two words -- `npx openclaw tui` -- and for the first time, you talked to YOUR agent. Not a demo. Not a tutorial. YOUR agent, with YOUR name, YOUR goals, YOUR rules.

That is not a small thing. That is the beginning of something REAL.

But here is what I need you to understand about where we go next. Everything your agent knows about you right now? It lives in this one conversation session. Start a new session, and a lot of that context fades. Your agent has a good memory, but it is not PERMANENT memory. Not yet.

Module 05 fixes that. Module 05 is called Workspace and Memory, and it is where we take everything you told your agent today -- every fact, every goal, every rule -- and we encode it into nine permanent markdown files. IDENTITY dot MD. SOUL dot MD. USER dot MD. MEMORY dot MD. And five more.

These files live in your agent's workspace at `~/.openclaw/workspace/`. They persist across every session, every restart, every update. Your agent reads them every time it wakes up. They are not conversation memory that fades. They are PERMANENT IDENTITY. Carved in stone. Or at least, carved in markdown.

[pause]

That is where your agent goes from "chatbot you introduced yourself to" to "AI employee who truly knows you."

Make sure your brain dump exercise is complete before we move on. Module 05 builds DIRECTLY on what you wrote today. Your rough draft becomes the blueprint.

Great work today, shipmates. You have met your first mate. Now let us make that relationship PERMANENT.
