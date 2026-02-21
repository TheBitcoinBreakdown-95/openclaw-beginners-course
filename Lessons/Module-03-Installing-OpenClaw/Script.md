# Module 03 Teaching Script: Installing OpenClaw

**Total speaking time:** ~30 minutes
**Slides:** 27

---

## Slide 1 — Title: Module 03 — Installing OpenClaw

Alright, CREW. This is it. This is the day you've been waiting for. If Module 00 was charting the map and Module 01 was packing the lifejackets and Module 02 was hammering the dock together with your bare hands — TODAY we launch the ship.

Today your agent comes to life.

I want you to feel that. I want you to feel the butterflies, the anticipation, the electric little hum in your chest. Because this is the moment where everything we've been talking about stops being theory and starts being REAL. A real AI agent. Running on YOUR machine. Twenty-four seven. After today.

Now — I'm going to walk you through every single step. Every wizard question. Every screen. Every gotcha. Nobody gets left behind. If something breaks, we fix it together. If something looks scary, I explain it. If you feel lost, you raise your hand and we course-correct IMMEDIATELY. Nobody drowns on my watch.

[pause]

One more thing before we shove off. There IS a gotcha in this module that trips up almost every first-time installer. A sneaky, invisible, infuriating little gremlin hiding in your clipboard. I will warn you before we get there. I will explain exactly how to dodge it. But if you zone out for thirty seconds at the wrong time, it WILL bite you. So stay sharp. Eyes on the horizon. Let's GO.

---

## Slide 2 — Navigation Chart (Objectives)

Here's our chart for today — eight ports of call, and every single one of them ends with something WORKING on your machine.

Port one: you'll run the OpenClaw installer inside WSL2. One command. That's it. One command and the software is on your ship.

Port two: the onboarding wizard. Fourteen questions, and we're walking through EVERY one of them together. No guessing. No "I think this is right?" We KNOW what's right because I'm going to tell you.

Port three: choosing your AI provider and getting that API key configured. This is where you pick your engine — the brain that powers your agent.

Port four: dodging the token formatting gotcha. The number one installation killer. The reef that sinks more ships than any other obstacle in this entire course. We're going to sail right around it.

Port five: configuring the gateway for secure local operation. Locking the hatches. Making sure only YOU can talk to your agent.

Port six: installing the daemon so your agent runs around the clock. No babysitting required.

Port seven: verifying EVERYTHING works. Status checks. Health checks. Security audits. The full inspection.

Port eight: opening the dashboard and the TUI — your two interfaces into this whole operation.

Eight ports. By the time we dock tonight, you will have a living, breathing, responding AI agent running on your laptop. Let's make it happen.

---

## Slide 3 — Ship's Logbook (Vocabulary)

Logbook time. Quick vocab check before we get our hands dirty. Don't memorize this — just know where to find it when a term pops up and you go "wait, what was that again?"

Gateway — the big one. This is the CORE process of OpenClaw. The engine room. Messages come in, the gateway sends them to your AI model, gets a response, routes it back. It also handles scheduled tasks, memory, tools — everything goes through the gateway. If the gateway's running, your agent is alive. If it's not, your agent is dead. Simple as that.

Onboarding wizard — the interactive setup that walks you through configuring everything step by step. We're spending the bulk of today inside this wizard.

API key — your secret credential. Think of it like the fuel key to your ship's engine. Without it, the AI brain can't power up. You get it from your provider — Anthropic, OpenAI, Google, whoever.

TUI — Terminal User Interface. That's the text-based chat where you talk directly to your agent inside the terminal. Think of it like the captain's speaking tube to the engine room.

Control UI — the web dashboard. Browser-based. For managing and monitoring.

Provider — the company whose AI model you use. Anthropic makes Claude. OpenAI makes ChatGPT. Google makes Gemini. You pick one.

Daemon — a background service. Runs continuously. Keeps the gateway alive 24/7 without you needing a terminal open.

Token — tricky word because it means TWO things. One: an authentication credential, like an API key or gateway token. Two: the units of text that AI models process, which is what you get charged for. Context will always tell you which meaning applies.

[pause]

Logbook stowed. Now let's check our gear.

---

## Slide 4 — Before You Start

Before we touch a single command, let's do a gear check. I need a show of hands for each one of these.

WSL2 with Ubuntu running — who's got that?

[wait for responses]

Systemd enabled — who confirmed that back in Module 02?

[wait for responses]

Node.js 22 or higher installed — who ran `node --version` and saw 22-something?

[wait for responses]

And who has their Ubuntu terminal OPEN right now, ready to go?

[wait for responses]

Good. If you're missing ANY of those, you need to hop back to Module 02 and get squared away. Everything — and I mean EVERYTHING — in this module happens inside WSL2. Not PowerShell. Not Command Prompt. Not your Windows desktop. Inside. Ubuntu. That's your ship. That's where we work.

Now — one more thing. Before we install, you need to know which AI provider you want to use. So let's talk about your options.

---

## Slide 5 — AI Provider Comparison

Alright, crew — choosing an AI provider is like choosing the engine for your ship. Different engines, different horsepower, different fuel costs. Let me walk you through the fleet.

Anthropic Claude Opus 4.6 — the BATTLESHIP. Most capable model on the market. Warmest personality. Best prompt injection resistance, which means it's the hardest to trick into doing something it shouldn't. The OpenClaw creator himself recommends it. Downside? About two hundred dollars a month if you let it run wild. That's premium fuel for a premium engine.

Claude Sonnet 4.5 — the FRIGATE. Lighter, cheaper, fifty to a hundred bucks a month. Not as sharp as Opus but still very capable. Solid choice if you want Anthropic quality on a tighter budget.

OpenAI GPT-4 and GPT-5.2 Turbo — the MERCHANT VESSEL. Strong, reliable, permissive about OpenClaw use. Twenty to two hundred a month depending on the model. Less personality warmth, but powerful workhorses.

Google Gemini 2.5 Flash — and HERE is your free option, crew. Free tier. Twenty requests per day. No credit card. No billing. It's like a dinghy with a surprisingly powerful motor. Great for testing. Great for learning. Great for "I want to try this before I spend a single dollar."

Kimi K2.5 and MiniMax M2.5 — the budget fleet. Very cheap. Surprisingly capable for the price. The community is still kicking the tires on these, but early reports are strong.

Our recommendation for this course? Anthropic Claude. That's what we'll demo. That's what we'll show. But if you want to start free and upgrade later? Google Gemini 2.5 Flash is a perfectly fine choice. No judgment. Pick the engine that matches your wallet and your comfort level.

[ask the audience] Quick poll — who's going Anthropic? Who's going Google free tier? Anyone else?

[wait for responses]

Beautiful. Whatever you picked, the wizard handles it the same way. Let's keep moving.

---

## Slide 6 — Rough Waters: Claude Max/Pro Subscriptions

HOLD. Before we go any further, I need to throw up a red flag. A BIG red flag. Because someone in this room is thinking it and I need to nip it in the bud RIGHT NOW.

"I already pay for Claude Max. Can't I just use THAT?"

NO. You cannot. Full stop. Using your Claude Max or Claude Pro subscription with OpenClaw is AGAINST Anthropic's Terms of Service. This is not a gray area. This is not a "technically maybe." People have been BANNED for this. Real people. Real bans. And when Anthropic bans you, they don't just cut off your subscription — they cut you off from ALL Anthropic products. Every. Single. One.

I've seen posts online claiming there are workarounds. Proxy this, tunnel that. DO NOT go down that road. Getting banned from Anthropic over a twenty-dollar-a-month subscription when the API costs barely more anyway — that's not clever seamanship. That's steering into the reef on purpose to save five minutes.

The CORRECT approach — and the only one I'm teaching — is to use the Anthropic API with a separate API key and pay-as-you-go billing. That's what OpenClaw is designed for. That's what works. And here's your silver lining: in Module 09, we're going to show you how to slash those API costs by up to NINETY PERCENT using smart model routing and prompt caching. So the sticker shock you might be feeling right now? Temporary.

Set a spending limit of twenty to fifty bucks a month to start. We'll handle that in just a few minutes.

---

## Slide 7 — Rough Waters: No Spending Limits

Okay, second red flag, and this one has TEETH. I'm going to tell you a horror story. A TRUE horror story from the OpenClaw community.

One user — real person, real money — ran eight agents simultaneously on the pay-per-use Anthropic API. No spending limit set. They figured they'd keep an eye on it. Monitor usage. Be responsible.

EIGHT HUNDRED DOLLARS. Burned. In less than a week.

[pause]

Another user hit one hundred and fifty MILLION tokens in a SINGLE DAY.

This is the most expensive mistake new users make and it happens because pay-per-use billing has no ceiling. No guardrails. No "hey are you sure about this?" There's no safety net unless YOU build one.

So here are your four protections and they are NON-NEGOTIABLE. I'm going to say that word again — NON-NEGOTIABLE.

One: set a hard spending limit in the Anthropic console. Twenty to fifty dollars a month. We'll do this together when we get to the API key step.

Two: start with ONE agent only. Do not run multiple agents until you understand exactly how fast your tokens burn. Walk before you sprint. Crawl before you walk.

Three: monitor daily for the first week. Every single day, check your usage at console.anthropic.com. Watch the meter. Get a feel for it.

Four: use cheap models for routine tasks. Haiku for heartbeats, Sonnet for simple stuff. We cover this in Module 09, but plant the seed now.

Protect your wallet, crew. The ocean doesn't care how much money you brought.

---

## Slide 8 — Step 1: Install OpenClaw

ALRIGHT! Gear checked. Warnings received. Engine chosen. Wallet protected. It's time to BUILD THIS THING.

Open your Ubuntu terminal. Everyone. Right now. I'll wait.

[pause]

Got it? Good. Here's the command. One command. One line. Ready?

`curl -fsSL https://openclaw.ai/install.sh | bash`

That's it. Type it in. Hit enter.

[pause]

Let me tell you what this does while it runs. `curl` is a download tool — it grabs the install script from openclaw.ai. Those flags — `-fsSL` — mean fail silently on errors, show no progress bar, and follow redirects. Then the pipe symbol — that vertical bar — takes the downloaded script and feeds it directly into bash to run.

What you should see on screen: the OpenClaw ASCII art — that beautiful lobster outline — followed by "Installing OpenClaw..." then a Node.js version check, some packages installing, and finally the magic words: "Installation complete! Run `openclaw onboard` to get started."

[pause]

If you see that? Congratulations. OpenClaw is on your ship. The software is installed. That was the easy part.

If you see an error about Node.js version — go back to Module 02 Step 3. Your Node isn't new enough.

If you see a network error — check your internet. WSL2 uses your Windows network, so if your browser works, WSL should too. If it's being weird, try running `wsl --shutdown` from PowerShell, reopen Ubuntu, and try again.

[ask the audience] Everyone good? Anyone stuck? Raise a hand if you need a minute.

[wait for responses]

---

## Slide 9 — Step 2: Launch the Onboarding Wizard

Beautiful. OpenClaw is installed. Now we wake it up and teach it who it's working for.

Type this command — and pay attention because there's a flag at the end that matters:

`openclaw onboard --install-daemon`

That `--install-daemon` flag is important. It tells the wizard to also set up the background service so your agent keeps running even when you close the terminal. Without it, you'd have to do that manually later. With it, everything gets configured in one pass.

Hit enter.

[pause]

What you should see is an interactive wizard. It's going to ask you a series of questions — fourteen of them — one at a time. It waits for YOUR answer before moving on. There's no timer. There's no rush. If you need to think, think. If you need to ask me, ask.

And here's the beautiful part — if you mess something up? You can almost always fix it later by running `openclaw config` and changing individual settings. The wizard isn't a one-shot deal. So breathe. Relax. We're going to walk through EVERY question together.

Fourteen questions. Fourteen answers. By the end, your agent is alive. Let's start.

---

## Slide 10 — Wizard Q1-Q2: Gateway Type and Workspace

First two questions. These are the easy ones. Warm-up pitches.

Question one: Gateway type. You'll see two options — Local Gateway and Remote Gateway. Choose LOCAL GATEWAY. That means OpenClaw runs right here on this machine. "Remote Gateway" is for connecting to an OpenClaw instance running on a different computer — a VPS, a cloud server, something like that. We're not doing that. We're running local. Press enter.

Question two: Workspace directory. It'll show you a default path — `~/.openclaw` — and ask if that's cool. YES, that's cool. Press enter. Accept the default.

This creates the workspace directory in your Linux file system — inside WSL2 — at `/home/yourusername/.openclaw/`. NOT on your Windows C: drive. This is correct. This is important. Linux filesystem is faster for Linux processes. Don't fight it. Don't move it. Don't get creative. Default is perfect.

[pause]

Two down, twelve to go. Still easy. Enjoy it while it lasts.

---

## Slide 11 — Wizard Q3: AI Model Provider

Question three: Select your AI provider. You'll see a list — Anthropic, OpenAI, Google, MiniMax, Open Router, Custom.

Pick whichever provider you decided on back when we looked at the comparison table. If you're following our recommendation, that's ANTHROPIC. Arrow key down to it if it's not already highlighted, and press enter.

I'm going to walk through the Anthropic setup from here because that's what most of you are using. If you chose Google or OpenAI, the process is nearly identical — you'll be asked for an API key, and the same rules apply. The Notepad trick we're about to cover? Works for ALL providers. The spending limit advice? Applies to everyone with a paid API.

[pause]

Alright. The next step is the big one. The one where first-time installers get shipwrecked. Brace yourselves. I'm about to save you an hour of frustration.

---

## Slide 12 — Wizard Q4: API Key Setup

Here's where we get your agent its fuel. Your API key. This is the secret credential that lets OpenClaw talk to Anthropic's servers and use Claude's brain. Without it, your agent is a ship with no engine. So let's do this right.

Step one: open your WINDOWS web browser. Not inside WSL. Your normal browser — Chrome, Edge, Firefox, whatever. Go to console.anthropic.com. This is Anthropic's developer console.

If you don't have an account, click Sign Up. Create one. Email and password. Verify your email. Standard stuff.

Step two: billing. In the console, go to Settings, then Billing. Add a payment method. Credit card, debit card, whatever works.

Step three — and DO NOT skip this — set your spending limit. In the sidebar: Settings, Plans and Billing, Usage Limits. Set the monthly spending limit to twenty to fifty dollars a month. Set a notification threshold at fifty percent so you get an email when you're halfway there. This is your emergency brake. This is the thing that prevents the eight-hundred-dollar disaster I told you about five minutes ago. DO IT NOW before you touch anything else.

[pause]

Step four: create the actual API key. Settings, API Keys, click Create Key. Name it "OpenClaw" or whatever you want. Click Create. And now — LISTEN CAREFULLY — your API key appears. It starts with `sk-ant-` and it's long. Very long. And you can only see it ONCE. After you leave this page, it's gone forever. You'd have to make a new one.

COPY IT. Right now. But — and here's the critical part — do NOT paste it into your terminal yet. There's one more step. And this step is the difference between your installation working on the first try and you spending forty-five minutes wondering why your perfectly valid API key is "invalid."

---

## Slide 13 — Rough Waters: The Token Formatting Gotcha

THIS. This right here is the single most common installation failure across every community guide, every tutorial, every "help me my install is broken" forum post. The Token Formatting Gotcha. Capitalize all of those words because they deserve it.

Here's what happens. You copy your API key from the Anthropic console in your browser. Seems fine. Looks fine. You paste it into the terminal. The wizard says "Invalid API key." You stare at the screen. You copied it right there. You can SEE it's correct. What the HECK?

The problem is invisible. Literally invisible. When you copy text from a web browser, your clipboard sometimes picks up hidden hitchhikers — line breaks, extra spaces, weird formatting characters. You can't see them. But the terminal can. And to the terminal, `sk-ant-[invisible garbage]api03-xxxxx` is NOT a valid key. Your key is corrupted and you don't even know it.

The solution is dead simple. I call it the Notepad Trick. And I need EVERY person in this room to do this. Not "I think my clipboard is fine." Not "I'll skip it this time." EVERY. PERSON.

Step one: you've copied the key from the Anthropic console. Good.

Step two: open Notepad on Windows. Start menu, type Notepad, open it.

Step three: paste the key into Notepad. Ctrl + V.

Step four: LOOK at it. Really look. It should be ONE single line of text. No line breaks in the middle. No extra spaces at the beginning or end. It should start with `sk-ant-` and be one continuous unbroken string of characters.

Step five: if you see line breaks — delete them. Squash it all onto one line.

Step six: select the entire key in Notepad. Ctrl + A. Copy it. Ctrl + C.

Step seven: NOW go to your Ubuntu terminal and paste it. Right-click to paste, or Ctrl + Shift + V.

The wizard will validate the key. If you see a checkmark and "API key validated, Connected to Anthropic" — you're GOLDEN. Your engine just roared to life.

If it still fails, try generating a brand new key and running the Notepad trick again. Make sure your billing is set up — keys don't work without billing activated.

[ask the audience] Everyone through? Anyone stuck on the API key? This is the one spot I expect trouble, so speak up now.

[wait for responses]

---

## Slide 14 — Wizard Q5-Q6: Model and Port

Good news — the hardest part is behind you. The API key is in. The engine is fueled. The rest of these wizard questions are quick and painless.

Question five: Model selection. You'll see a list — claude-opus-4-6, claude-sonnet-4-5, claude-haiku-4-5. Choose CLAUDE-OPUS-4-6. Most capable model. Strongest prompt injection resistance. Yes, it's the most expensive option, but remember what we said in Module 01 — security is not the place to cut corners. Your agent's brain is the one component you want to be SHARP.

Cost-saving tip for the anxious: in Module 09, we'll configure cheaper models for routine tasks like heartbeats and simple commands, and keep Opus reserved for the important stuff. You're not locked in at Opus-for-everything forever.

Question six: Gateway port. Default is 18789. Unless you have some OTHER service running on port 18789 — which, let's be honest, you almost certainly do not — accept the default. Press enter.

[pause]

Two more quick ones. Moving right along.

---

## Slide 15 — Wizard Q7: Gateway Bind

Question seven: Gateway bind. Now THIS one is a security decision, so ears up.

You'll see five options: Loopback, LAN, Tailscale, Custom, Auto. Choose LOOPBACK. This is the most secure option and it's what the official docs recommend.

Let me tell you what each one means in plain language.

Loopback — ONLY this computer can connect to the gateway. Nobody on your WiFi. Nobody on the internet. Nobody across the room. Just you, on this machine. The gateway only listens for connections from localhost. It's like locking the bridge door and only the captain has the key.

LAN — any device on your local network can connect. Your phone, another laptop, your spouse's computer — anything on the same WiFi. More convenient, less secure.

Tailscale — if you set up Tailscale in Module 02, devices on your Tailscale network can connect. This is for secure remote access.

Custom — you specify an IP address. Advanced users only. If you don't know what this means, it's not for you.

Auto — automatic detection. Skip this. "Auto" and "security" don't belong in the same sentence.

Choose Loopback. Press enter. We can always change it later with `openclaw config gateway bind` if you decide you want phone access down the road. But for now? Lock it down. We can loosen later. You can never un-ring a security bell.

---

## Slide 16 — Wizard Q8-Q10: Tailscale, Token, Channels

Three quick questions in a row. Rapid fire.

Question eight: Tailscale exposure. Default is Off. KEEP IT OFF. Even if you installed Tailscale in Module 02, leave this disabled for now. We'll enable it later when you're confident your security posture is solid. No reason to open another door before the house is finished.

Question nine: Gateway token. It says "leave blank to auto-generate." DO leave it blank. Press enter. The wizard will generate a secure random token for you — a long, random password that protects access to your dashboard. You'll see it at the end of the wizard. SAVE IT when it appears. I cannot stress this enough. Write it down. Put it in a password manager. Text it to yourself. Whatever you need to do. You'll need this token to log into the dashboard.

Question ten: Configure chat channels? You'll see options for WhatsApp, Telegram, Discord, Slack, or Skip for now. Choose SKIP FOR NOW. We are setting up Telegram in Module 06. Right now our mission is to get the BASE gateway running and verified. Adding messaging channels before we've confirmed the foundation works is like hanging curtains before the walls are up. Foundation first. Decoration later.

[pause]

Three down. Four more to go and we're through the wizard.

---

## Slide 17 — Wizard Q11-Q14: Skills, Hooks, Service

Home stretch, crew! Four more questions and the wizard is DONE.

Question eleven: Skills. You'll see a list with checkboxes — Obsidian, Apple Notes, Google, Twitter, email, image generation, a whole buffet. DO NOT select any of them. Skip all. Press enter with nothing checked. Skills are modular — you can add any of them later with a single command. We cover them in detail in Module 07. Adding complexity before you've verified the base works is asking for trouble. Walk, THEN run.

Question twelve: Hooks. THIS one we DO make selections. Enable two things: BOOT.md and session memory. Use the spacebar to toggle each one on.

BOOT.md runs a file every time the gateway starts up. This is how you'll set up morning briefings, routine checks, startup instructions — anything you want your agent to do first thing when it wakes up.

Session memory automatically saves context from your conversations. This means your agent remembers what you talked about between sessions. Without this, every new session starts fresh. With this, your agent builds up knowledge over time. That persistent memory we keep talking about? This is how it works.

If you want, you can also enable command logger for security auditing. Not required, but nice to have.

Question thirteen: Service runtime. Node.js. It's the only option. Press enter.

Question fourteen: Install gateway as background service? YES. Since we used the `--install-daemon` flag, this should already be selected. Confirm with Y and press enter. This makes the gateway start automatically when your computer boots and run continuously in the background. Your agent becomes a DAEMON — always on, always watching, always ready. Even when you close the terminal. Even when you walk away from the computer.

[pause]

And that... is the LAST question.

---

## Slide 18 — Step 3: Onboarding Complete

The wizard is done. And if everything went right — and it DID go right, because we did it together — you should see something BEAUTIFUL on your screen right now.

Checkmarks. Green checkmarks. Gateway configured. AI provider connected — Anthropic, Claude Opus 4.6. Daemon installed as a systemd service. Gateway started.

And then the big box. The announcement. The output that says:

"OpenClaw is running!"

[pause]

Look at that. LOOK AT THAT. Your agent is ALIVE. Running. Right now. On your machine. The gateway is humming. The daemon is standing watch. Claude is connected and waiting for orders.

You just built something. Something real. Something that will be running on your laptop tonight while you sleep. That's not a demo. That's not a simulation. That's YOUR agent on YOUR hardware.

Now — immediately — two things you need to do before the excitement makes you forget.

First: SAVE YOUR GATEWAY TOKEN. It's displayed right there in the output. Copy it. Open a password manager, a notes app, a text file — anywhere secure. You need this token to access the web dashboard. If you lose it, you can retrieve it later with `openclaw config gateway token`, but let's not rely on that. Save it NOW.

[pause]

Second thing — and this is important enough to get its own slide.

---

## Slide 19 — Immediately After Onboarding: Install QMD

Before you do ANYTHING else. Before you open the dashboard. Before you chat with your agent. Before you celebrate. Run these two commands:

`openclaw skills install qmd`

Then:

`openclaw service restart`

QMD is an on-device search engine for your agent's memory files. Here's why this matters and why it's FIRST on the post-install list.

Without QMD, every time your agent needs information from its memory, it has to re-read entire files from start to finish. That's like looking up a word in the dictionary by reading every single page from A to Z. Every time. For every word. It WORKS, but it burns through tokens like a bonfire burns through kindling. And tokens cost MONEY.

With QMD, your agent can search indexed files instantly. Jump straight to the answer. No wasted reads. No wasted tokens. Community consensus is unanimous on this: install QMD from day one. Users who waited reported significantly higher costs during the gap.

It takes thirty seconds to install. It saves you money on literally every conversation from here on out. Run the commands. I'll wait.

[pause]

Done? Good. Now let's make sure everything is shipshape.

---

## Slide 20 — Step 4: Verify the Installation

Trust but verify, crew. We're going to run three checks. Think of this as the post-launch inspection — checking the hull, testing the engines, scanning for leaks.

Check one: Gateway status. Run `openclaw status`. What you're looking for is one phrase: "Gateway Status: Running." If it says Running, your engine is alive. You should also see your version number, the port (18789), the bind (loopback), and your provider (Anthropic, Claude Opus 4.6). Everything should match what we configured.

Check two: Gateway health. Run `openclaw doctor`. This is your ship's doctor — it runs a full diagnostic. API key valid? Model reachable? Workspace accessible? Daemon active? You want all green checkmarks. If anything fails, the doctor will tell you what's wrong AND suggest fixes. You can even run `openclaw doctor fix` and it'll try to patch things up automatically.

Check three: Security audit. Run `openclaw security audit --deep --fix`. This checks your file permissions, your gateway authentication, your bind settings — the whole security posture. The `--fix` flag means it automatically corrects anything it finds. It'll set proper permissions — 700 for directories, 600 for files — so only YOUR user account can read or write OpenClaw's configuration.

[ask the audience] Everyone getting green across the board? Any red flags? Any errors?

[wait for responses]

Three checks passed. Your ship is seaworthy. Now let's look around the bridge.

---

## Slide 21 — Step 5: Access the Dashboard

Time to see the pretty side of your operation. Open your WINDOWS web browser — Chrome, Edge, Firefox, whatever you've got — and go to:

`http://127.0.0.1:18789/`

That's HTTP — not HTTPS. Important distinction. And 127.0.0.1 is just "this computer" — it's the loopback address. Port 18789 is where your gateway is listening.

You'll be asked for your gateway token. Remember that token you saved two minutes ago? Paste it in. And...

You're in. Welcome to the Control UI. The dashboard. The bridge of your ship, rendered in a web browser.

What you'll see: your gateway status front and center. Connected channels — none yet, that's Module 06. Agent information. Conversation history — empty for now, but not for long. Configuration options. It's clean, it's functional, and it's running entirely on YOUR machine.

[pause]

Now — quick but important distinction. You have TWO interfaces for interacting with OpenClaw.

The Control UI — this dashboard — is for MANAGEMENT. Configuration, monitoring, reviewing logs, checking status. Think of it as the captain's chart room. You go there to plan and observe, not to steer.

The TUI — the Terminal User Interface — is for TALKING. That's where you actually chat with your agent, run commands, give orders. Think of it as standing on deck, face to face with your crew.

Most of your day-to-day interaction will happen in the TUI. The dashboard is for when you need to check the instruments.

---

## Slide 22 — Step 6: Your First Chat

Alright crew. This is the MOMENT. The one we've been building toward since Module 00. You're about to speak to your AI agent for the very first time.

Go back to your Ubuntu terminal. Type:

`openclaw tui`

[pause]

What you should see: a full-screen terminal interface. Message area at the top. Text input at the bottom. Your agent's name and model info. A token counter. It might look bare. It might look simple. Don't let that fool you. Behind that humble interface is a Claude Opus brain connected to your local machine with full shell access and permanent memory. That's a LOT of power behind a blinking cursor.

Type a simple greeting. Something like:

"Hello! My name is [your name]. What's your name?"

Hit enter.

[pause]

Watch the screen. Your message appears. One second. Two seconds. Maybe five. And then...

A response. From YOUR agent. Running on YOUR machine. Using YOUR API key. Stored in YOUR local memory.

[pause]

If you got a response — and you DID get a response, didn't you? — then OpenClaw is WORKING. Your agent is alive. The engine is running. The hull is intact. The sails are full.

CONGRATULATIONS, crew. You just launched your ship.

[pause]

Now — resist the urge to have a full conversation. I know it's tempting. I KNOW you want to ask it to do things. Hold that energy. Module 04 is where we do the proper introduction — the brain dump, the identity setup, the whole meet-and-greet. For now, just verify it works.

Type `/exit` or press Ctrl + C to leave the TUI. We've got one more thing to check.

---

## Slide 23 — Step 7: Verify the Daemon

Your agent responded. Amazing. But here's the question: will it KEEP running when you walk away? That's what the daemon is for, and that's what we need to verify.

First: check the service status. Run `openclaw service status`. Look for the magic words: "Active: active (running)." That means the systemd service is alive and well.

Second: the REAL test. Close your Ubuntu terminal. Completely. Click the X. Kill it. Walk away from it.

[pause]

Wait ten seconds. Let the silence sit. Your terminal is gone. No command line. No shell. Nothing.

Now open your Windows browser. Go to `http://127.0.0.1:18789/`. The dashboard.

Does it load?

[pause]

If the dashboard loads — and it SHOULD — then your daemon is working perfectly. The gateway kept running even after you slammed the terminal shut. It's running as a background service now. A daemon. A tireless watchman standing guard while you live your life.

That's the whole point. Your agent doesn't need you babysitting it. It runs on its own. Starts on boot. Survives terminal closures. Keeps humming along twenty-four hours a day, seven days a week.

Keep these service commands handy — write them on a sticky note, save them in a file, tattoo them somewhere visible:

`openclaw service start` — starts the daemon.
`openclaw service stop` — stops it.
`openclaw service restart` — bounces it.
`openclaw service logs` — shows you what it's been up to.
`openclaw service status` — tells you if it's alive.

Those five commands are your engine room controls. You'll use them often.

---

## Slide 24 — Rough Waters: Damage Control (Troubleshooting)

Alright — let's talk about what happens when things go sideways. Because they WILL go sideways for somebody, and that somebody should not panic. Damage control. Stay calm. Here's your repair manual.

"openclaw: command not found" — your PATH didn't update. Run `source ~/.bashrc` or just close and reopen your terminal. If that doesn't work, check if the installation actually completed by running `ls ~/.openclaw/`. If that directory doesn't exist, re-run the install command from Step 1.

"API key invalid" — the token formatting gotcha. I TOLD you. Nine times out of ten, hidden characters in your clipboard corrupted the key. Go back to the Anthropic console, generate a FRESH key, run the Notepad trick, paste the clean version. Use `openclaw config provider key` to update it without re-running the whole wizard.

"Port already in use" — something else claimed port 18789 before you did. Run `openclaw config gateway port 18790` to shift to a different port, then `openclaw service restart`.

"Connection refused" when opening the dashboard — the gateway isn't running. Check with `openclaw service status`. If it's down, run `openclaw service start`. Also make sure you're using HTTP, not HTTPS, in the browser URL. Common mistake.

Daemon doesn't start on boot — systemd probably isn't enabled. Run `systemctl is-system-running`. If that's the problem, go back to Module 02 and enable systemd in your wsl.conf.

AI responses are very slow — like thirty seconds or more — check the Anthropic status page at status.anthropic.com. Opus IS slower than lighter models. One to ten seconds is normal. If it's consistently glacial, try switching to Sonnet temporarily with `openclaw config provider model claude-sonnet-4-5`.

"Insufficient credits" — check your billing at console.anthropic.com. Make sure your spending limit hasn't already been hit.

Token counter climbing fast — that's actually normal. AI models charge per token and conversations use thousands of them. Use `/compact` in the TUI to compress your conversation history — that can cut token usage by about sixty-seven percent. Start fresh conversations with `/new` instead of letting old ones grow forever.

[pause]

Any of those sound familiar? Anyone hitting something not on this list? Speak up now while we're all here together.

[wait for responses]

---

## Slide 25 — Hands on Deck (Verification Checklist)

ALL HANDS ON DECK! This is your launch day inspection. Ten items. Every single one needs to pass before you're cleared to proceed to Module 04. No exceptions. No "I'll check it later." We do this NOW, together, and nobody leaves the harbor with an unchecked box.

Run through the list with me:

One: `openclaw --version` shows a version number. Not an error. A number.

Two: `openclaw status` shows "Running."

Three: `openclaw doctor` passes all critical checks.

Four: `openclaw security audit --deep` has no critical issues.

Five: your `~/.openclaw/` directory is mode 700. That means only you can read or write it.

Six: the dashboard loads at `http://127.0.0.1:18789/` in your browser.

Seven: the TUI opens when you run `openclaw tui`.

Eight: your AI responds to a test message. You already did this — but confirm it.

Nine: the gateway stays running after closing the terminal. The daemon test.

Ten: your gateway token is saved somewhere secure. Not "I'll remember it." SAVED.

[ask the audience] Who's got all ten? Raise your hand if you're ten for ten.

[wait for responses]

If you're not there yet, that's okay. Take the next few minutes. Work through the ones that are failing. Ask for help. We'll get everyone across the finish line.

BONUS for the overachievers: run `openclaw service logs` and read the last few lines. You should see entries showing the gateway starting up and handling your test message. That's your agent's logbook. Its own version of a ship's log.

---

## Slide 26 — Treasure Chest (Key Takeaways)

Alright, crew — let's haul the treasure chest out of the hold and count our loot. Here's what you're taking away from today.

One: installation is ONE COMMAND. `curl -fsSL https://openclaw.ai/install.sh | bash`. But the onboarding wizard is where the real setup happens. One command to install. Fourteen questions to configure. That's the whole process.

Two: the token formatting gotcha is REAL. Always paste API keys into Notepad first. Check for hidden line breaks. Copy clean. Paste clean. This will save you every time.

Three: start with loopback binding. Only this machine can connect to your gateway. Most secure option. Loosen later if you need to, but start tight.

Four: set API spending limits BEFORE you start chatting. Tokens burn faster than you expect. Twenty to fifty dollars a month. Set it and forget it.

Five: the daemon keeps the gateway running twenty-four seven. Close the terminal, walk away, go to sleep — your agent is still on watch. Always.

Six: two interfaces. TUI for chatting. Dashboard for managing. You'll use both. Most daily interaction happens in the TUI.

Seven: run the security audit after installation. `openclaw security audit --deep --fix` catches permission issues and misconfigurations before they become problems.

Eight: save your gateway token. You need it for dashboard access. Retrieve it with `openclaw config gateway token` if you lose it, but don't rely on that.

Nine: everything stays local except API calls. Your data, your memory, your conversations — all stored on YOUR machine. The only thing that leaves your ship is the text you send to the AI provider for processing. Everything else stays in YOUR hold.

[pause]

That's nine pieces of treasure from one module. Not bad for a day's work, crew.

---

## Slide 27 — Next Port of Call: Module 04 — Your First Conversation

[tone shifts — warm, excited, forward-looking]

Look at what you've built today. Seriously. Take a second and look at it.

You have an AI agent. Running on your machine. Twenty-four seven. Connected to one of the most powerful AI models on the planet. Secured behind loopback binding and a gateway token. With a daemon keeping watch around the clock. And a search engine indexing its memory for maximum efficiency.

That's not nothing, crew. That's EVERYTHING. That's the foundation. The keel is laid. The hull is sealed. The engine is running. The ship is in the water.

[pause]

In Module 04, we set sail for real. You're going to properly MEET your agent. Sit down. Introduce yourself. Do a brain dump — remember those five questions from Module 00? That's where they come back into play. You'll teach your agent who you are, what you care about, what you need help with. You'll name your agent. You'll learn the essential commands for daily use. You'll have your first REAL conversation — not a test message, but a genuine back-and-forth with an AI that's going to remember every word you say from now until the end of time.

Your agent is awake. It's been running quietly in the background this whole time, patient and ready, waiting for its captain to step onto the bridge and say hello.

[pause]

The hard part is done. The installation is behind you. From here on out, it's about the RELATIONSHIP you build with your agent — and that, crew, is where the real adventure begins.

Fair winds. See you in Module 04.
