# Module 11 Teaching Script: Maintenance and Troubleshooting

**Total speaking time:** ~30 minutes
**Slides:** 26

---

## Slide 1 — Title: Module 11 — Maintenance and Troubleshooting

Alright, crew. Here we are.

Module Eleven. The LAST module. The final port of call.

[pause]

Look around the room. Every single person here started this journey not knowing what a gateway was. Not knowing what a daemon was. Some of you couldn't spell WSL2 let alone install it. And now? Now you've got a fully configured, security-hardened, skill-loaded, heartbeat-running AI personal assistant living on your laptop. You BUILT that. From scratch. From nothing.

But here's the thing — and I need you to hear this — building the ship is only half the job. The other half? KEEPING it afloat. Maintaining it. Knowing what to do when the engine sputters at 3 AM. Knowing what to do when the hull springs a leak and water starts pouring in. Because it WILL happen. Not if. WHEN.

That's what today is about. This is your field manual. Your captain's handbook. The grease-stained, coffee-ringed, dog-eared reference you keep in your back pocket for the rest of your voyage. We're covering daily routines, cost monitoring, updates, backups, troubleshooting every common error you'll hit, and a command cheat sheet that I want you to literally PRINT OUT and tape to the wall next to your computer.

This is the module that turns you from someone who SET UP an agent into someone who can OPERATE one. Long-term. Solo. Without calling for help every time the wind changes.

[pause]

Last voyage together. Let's make it count.

---

## Slide 2 — Navigation Chart (Objectives)

Seven ports on today's chart. Seven skills you're walking out of here with.

Port one: daily and weekly maintenance routines. The two-minute daily check and the ten-minute weekly deep dive that keep your agent healthy and your wallet safe.

Port two: token cost monitoring. Because if you don't watch your spending, your AI will happily eat through your credit card like a lobster through a crab pot. No shame. No hesitation. Just tokens, tokens, tokens.

Port three: updating OpenClaw safely. Not just running a command and praying. SAFELY. Backup first, update second, verify third. Every time.

Port four: backup and restore. Because the day you need a backup and don't have one? That's the worst day. And it's completely preventable.

Port five: diagnosing and fixing the most common errors. We're going through a whole catalog. Gateway won't start? Got it. API key invalid? Got it. Telegram bot silent? Got it. WSL2 acting possessed? Yeah, got that too.

Port six: the command cheat sheet. Your quick reference card. Every command you'll ever need, organized and ready to go.

Port seven: where to get help when you're truly stuck. Community resources, official docs, how to ask a good question that actually gets answered.

[pause]

Seven ports. Thirty minutes. Then you sail on your own.

---

## Slide 3 — Ship's Logbook (Vocabulary)

Four terms for the logbook today. And honestly? If you've been sailing with us since Module Zero, most of these will feel familiar. That's the POINT. You've been learning this language for eleven modules and you probably didn't even notice.

Token burn. The rate at which your conversations eat tokens and therefore money. High token burn means your wallet is bleeding. Low token burn means smooth sailing. We talked about this in Module Nine with routing and model selection, and today we're going to nail down exactly how to monitor it and keep it under control.

Context compaction. Remember `/compact` from way back? That slash command that squishes your conversation history down to save tokens? That's context compaction. It's one of your most powerful cost-saving tools, and you should be using it REGULARLY. Not when things get expensive. Before things get expensive.

Workspace backup. A Git commit of your `~/.openclaw/` directory. Your agent's entire brain, personality, memory, skills — frozen in time. One command. Completely reversible. This is your insurance policy against everything that can go wrong.

Rolling update. Updating OpenClaw while the gateway is still running, with minimal downtime. The idea is you don't have to take your agent completely offline to give it new software. But — and this is important — we're still going to back up first EVERY time. Trust but verify. Actually, just verify.

[pause]

Logbook's stowed. Let's talk about what to expect from this whole setup.

---

## Slide 4 — Realistic Timelines

Okay, this is the slide where I'm going to be brutally honest with you. Because I'd rather you hear it from me NOW than learn it the hard way at 2 AM with an angry Telegram bot and an empty API balance.

OpenClaw has two levels of capability.

Level one works IMMEDIATELY. Like, right now, today. Basic conversation, file management, simple web research, document summarization. You've been doing this since Module Four. This stuff just works out of the box.

Level two? Email automation, trading bots, social media management, code projects, multi-step workflows — that takes HOURS to DAYS of setup. Per workflow. Each one is its own project.

[pause]

And here's the part nobody tells you on YouTube.

[ask the audience] How many of you watched a demo video before taking this course? Where some guy had this perfect setup, agent doing everything, fully automated life? Raise your hand.

[wait for responses]

Yeah. Those demos? Those took DAYS or WEEKS to build. They just didn't show you that part. They showed you the finished ship, not the six months in the drydock.

Your first month, budget two to four hours a WEEK for setup and maintenance. That's real. That's not failure. That's the job. The ROI is there — five hours a week saved is two hundred hours a year, that's FIVE WORK WEEKS — but the payoff comes AFTER the setup. Not during it.

Set your expectations right and you won't get frustrated. Get frustrated and you'll quit. And you've come too far to quit now.

---

## Slide 5 — Daily Maintenance Checklist

Now we get practical. This is your daily routine. Two minutes. That's it. Do this every morning during your first month, then dial it back to whenever you feel like checking in.

Five things. Five quick checks.

One: Is the gateway running? `npx openclaw status`. Takes two seconds. Green means go. Stopped means something crashed overnight and you need to restart it.

Two: Any errors in the logs? `npx openclaw logs`. Scan the last few entries. You're not reading every line — you're looking for anything red, anything scary, anything that says ERROR in big capital letters. If it's all clean, move on.

Three: Token usage reasonable? Pop open your provider dashboard — Anthropic, OpenAI, whatever you're using. Is the number where you expected it? Or did something go haywire overnight and burn through forty bucks while you slept? You want to catch that EARLY, not at the end of the month.

Four: Did your morning brief arrive? Check Telegram. If you set up a morning brief in Module Eight and it didn't fire, something's off. Maybe the cron job died. Maybe the gateway restarted. Either way, investigate.

Five: Any pending pairing requests? Check the dashboard for unknown senders. If someone you don't recognize is trying to pair with your agent — that's a security concern. Handle it.

[pause]

Five checks. Two minutes. Coffee in one hand, terminal in the other. Make it a habit. Make it automatic. Make it as natural as brushing your teeth. Because the day you skip it is the day something breaks and you don't notice for a week.

---

## Slide 6 — Weekly Maintenance Checklist

Every weekend. Ten minutes. Non-negotiable. This is your deep maintenance pass.

Security audit first. `npx openclaw security audit --deep`. We hammered this in Module Ten. If anything changed — a skill was installed, a config was tweaked, an update was applied — the audit catches misconfigurations before they become vulnerabilities.

Health check. `npx openclaw doctor`. The good doctor looks at EVERYTHING. Config integrity, file permissions, service health, dependency versions. If it finds issues, slap `--fix` on both commands and let it auto-repair what it can.

Review API spending. Visit your provider dashboard. Not just a glance — actually LOOK at the numbers. What's your daily average? Is it trending up or down? Did any particular day spike? Understand your spending pattern because that pattern is telling you a story about how your agent is behaving.

Workspace backup. `git add -A && git commit -m "Weekly backup"`. I cannot stress this enough. This is your agent's brain committed to version control. If ANYTHING goes wrong — bad update, corrupted config, you accidentally delete something critical — you can roll back. But only if you committed first. Do. The. Backup.

Review your core files. Are USER.md and MEMORY.md still accurate? Your life changes. Your goals change. Your agent should change too. If you got a new job, moved to a new city, started a new project — update those files.

Disable unused skills. Every skill loaded into context costs tokens on EVERY message. Three thousand to fourteen thousand tokens per call. If you installed a skill three weeks ago and haven't used it since? Disable it. You can re-enable it anytime.

Check disk space. `df -h` inside WSL2. Logs accumulate. Sessions accumulate. Make sure you're not running out of room on the boat.

[pause]

Ten minutes. Every weekend. Treat it like changing the oil. Boring? Sure. But the alternative is your engine seizing on the open ocean.

---

## Slide 7 — Cost Reduction Strategies

Now let's talk about money. Because this is where people either get smart or get poor.

Your main cost — your ONLY significant cost — is the AI model API. The tokens you burn every time your agent thinks, responds, runs a heartbeat, processes a skill. Everything else is free. The software is free. Running it on your laptop is free. But the AI brain? That charges per thought. And those thoughts add up FAST.

Here are the biggest wins, and I want you to listen carefully because the order matters.

Enable prompt caching. Ninety percent off system prompt costs. ONE config change. We covered this in Module Nine. If you haven't done it yet, do it TODAY. There is no reason not to.

Route heartbeats to Haiku. Your heartbeat runs every hour. It doesn't need the big brain. Haiku is tiny, fast, and cheap. This single change can save you fifty to a hundred and ninety dollars a MONTH. Per month!

Set your heartbeat interval to fifty-five minutes. Why fifty-five and not sixty? Because the prompt cache window is about sixty minutes. At fifty-five, each heartbeat hits the warm cache. At sixty-five, you're paying full price every single time. Five minutes makes the difference between fifty cents a month and a hundred dollars a month. FIVE MINUTES.

Install ClawRouter for intelligent model routing. Up to ninety percent savings by sending easy questions to cheap models and hard questions to smart models.

And use `/compact` regularly. Every time you compact, you cut about sixty-seven percent of that conversation's token cost going forward.

[pause]

The single biggest cost win — and I want you to tattoo this on the inside of your eyelids — prompt caching PLUS Haiku heartbeats PLUS fifty-five-minute interval. That combo alone takes heartbeat costs from over a hundred dollars a month to about FIFTY CENTS. That's not a typo. Fifty cents.

---

## Slide 8 — Cost Reduction Strategies (continued)

More savings. These are the supporting cast — not as dramatic as the big three, but they add up.

Start new sessions for new topics. Every time you keep chatting in the same session about a completely different subject, you're dragging all that old context along for the ride. That's tokens. Use `/new` when you switch topics. Clean slate. Fresh start. Cheaper.

Disable unused skills. I said this in the weekly checklist and I'm saying it again because people FORGET. Every skill loaded into your agent's context is extra tokens on every single message. It's like packing extra cargo on a ship you're not going to deliver anywhere. Dead weight. Drop it.

Use Sonnet for routine tasks. Opus is brilliant. Opus is also expensive. For everyday stuff — email drafts, simple questions, basic research — Sonnet does the job at fifty to seventy-five percent less cost.

Budget models exist. Kimi K2.5, MiniMax M2.5 — up to ninety-five percent cheaper than Opus. The quality varies, but for simple tasks? Totally viable.

And for the love of all that is nautical — set API spending limits. Every provider lets you cap your monthly spend. Set it. Set it at fifty dollars to start. Set an alert at forty. That way, when something goes sideways and your agent starts burning through tokens like a furnace, you get a warning BEFORE you get a bill that makes you cry.

[ask the audience] How many of you have already set a spending limit on your API provider? Show of hands.

[wait for responses]

If your hand isn't up, that's your homework tonight. Ten minutes. Could save you hundreds. Do it.

---

## Slide 9 — Setting API Spending Limits

Let me walk you through this because it's so important that I'm giving it its own slide.

Anthropic. Go to console.anthropic.com. Settings. Billing. Two things to set. First: monthly usage limit. Put in a hard cap — fifty bucks is a great starting point. Second: alert threshold. Set it lower than your limit — say, alert me at forty dollars. That way you get a heads-up before you actually hit the wall.

OpenAI. Same idea. platform.openai.com. Settings. Billing. Set a monthly budget cap.

That's it. Two minutes of work. And here's my recommendation — start at fifty dollars a month. Don't go higher until you actually understand your usage patterns. Run for a month. See what your real costs look like. THEN adjust. Don't guess. Don't estimate. Look at real data.

[pause]

I have seen people burn through two hundred dollars in a WEEK because they left a misconfigured heartbeat running every five minutes on Opus with no spending limit. That's not an AI problem. That's a guardrails problem. And the guardrails take TWO MINUTES to install.

Set your limits. Protect your wallet. Sail smart.

---

## Slide 10 — Updating OpenClaw

OpenClaw gets regular updates. New features, bug fixes, security patches. You WANT to stay current. But you want to do it CAREFULLY.

First — always know what version you're running. `npx openclaw --version`. Write it down. Know it.

Second — release channels. There are three. Stable, beta, and dev. You are using STABLE. Say it with me: STABLE. Beta has new features but might have bugs. Dev is for contributors and testers and people who enjoy suffering. Stable is tested, production-ready, and the right choice for everyone in this room. Full stop.

Now here's the update process, and I want you to follow this EXACTLY. Every single time.

Step one: BACK UP FIRST. Before you touch anything. `cd ~/.openclaw && git add -A && git commit -m "Pre-update backup"`. I don't care if the update is tiny. I don't care if the release notes say "minor bug fix." Back up. Always. No exceptions.

Step two: Save your current state. `npx openclaw status --json > ~/pre-update-status.json`. This gives you a snapshot you can compare against after the update, in case something subtle changes.

Step three: Run the update. `npx openclaw update`. That's the actual update command.

Step four: After updating — restart the gateway, check status, run the doctor, run a security audit. Four commands, takes thirty seconds, and confirms everything came through clean.

And if the update BREAKS something? Don't panic. You backed up. You can roll back to the previous version with `npm install -g @tinybox/openclaw@` and the previous version number. Restart. You're back to where you were. The backup saves you. The backup ALWAYS saves you. That's why we do the backup.

[pause]

Back up. Update. Verify. That's the rhythm. Never skip a beat.

---

## Slide 11 — Backup and Restore

Let's talk about backups properly because this is the single most important habit you will build as an OpenClaw operator.

Two methods. Quick backup with Git — `cd ~/.openclaw && git add -A && git commit -m "Backup"`. Fast, lightweight, version-controlled. You can roll back to any previous commit. This is your daily and weekly workhorse.

Full backup with an archive — `tar -czf` and a filename with today's date. This creates a compressed snapshot of your ENTIRE OpenClaw directory. Good for before major changes, or for copying to an external drive, or for that "just in case the whole laptop dies" scenario.

Now — what to back up and what's the priority.

[pause]

Your workspace directory is CRITICAL. Capital C critical. That's your agent's identity, personality, rules, memory — everything that makes your agent YOUR agent. Lose that and you're starting from scratch. Not from Module Three. From Module FOUR. All that brain dump work, all those core files you painstakingly crafted — gone.

Your config directory is also critical. Gateway config, API keys, channel settings. Lose that and you're re-doing Module Three, Module Six, Module Eight — reconnecting everything.

Custom skills? Important. You built those. They represent real work.

Sessions and logs? Nice to have. Conversation history and activity records. Useful but not critical.

The bottom line: your workspace and config directories are the crown jewels. Protect them. Back them up weekly at minimum. Keep at least one copy somewhere that isn't your laptop — an external drive, a USB stick, a private Git repo. Because laptops die. Hard drives fail. And the ocean doesn't care about your backup schedule.

[pause]

Git commit. Every week. I will haunt your dreams if you don't.

---

## Slide 12 — Debugging Mindset

Before we dive into the error catalog, I need to install two rules in your brain. Two rules that will save you HOURS of frustration. Maybe days. Maybe your sanity.

Rule one: Run the doctor first.

When something feels broken — your agent is acting weird, messages aren't going through, things are slow, something just feels OFF — your first instinct is going to be to start poking around. Reading logs. Googling error messages. Asking on Discord. NO. Stop. Before any of that, run ONE command: `npx openclaw doctor --repair`.

The doctor checks configuration integrity, file permissions, service health, dependency versions — and it auto-fixes what it can. A surprising number of "my agent is stupid" complaints are actually "my config is broken" problems. The doctor catches them. The doctor fixes them. Let the doctor do its job FIRST.

[pause]

Rule two: One workflow at a time.

[ask the audience] How many of you, when you get excited about something new, try to set up EVERYTHING all at once? Email, calendar, Telegram, Discord, web scraping, cron jobs, five new skills — all in one afternoon? Be honest.

[wait for responses]

I see those hands. And I get it. The excitement is real. But here's what happens: you set up six things at once, and then SOMETHING breaks, and you have NO IDEA which of the six things caused it. Now you're debugging six possible failure points simultaneously. That's not troubleshooting. That's suffering.

The pattern that works: Get ONE workflow running end-to-end. Running without you touching it. Messaging you reliably. Failing LOUDLY instead of silently. Master that one. THEN add the next. Every new integration is a new failure mode. Stack them one at a time and you'll always know exactly what broke and why.

---

## Slide 13 — Damage Control: Gateway Errors

Alright, here we go. The error catalog. These are the most common problems you'll hit, and I'm giving you the exact fix for each one. This is your field guide. Dog-ear this page.

"Gateway refuses to start — config schema rejection." This is a nasty one because it's a COMPLETE block. One invalid key in your `openclaw.json` file and the gateway won't boot AT ALL. OpenClaw uses strict schema validation. One typo — like spelling "heartbeat" as "hearbeat" — and the whole thing refuses to start. The fix? Run `npx openclaw doctor`. It'll identify exactly which key is bad. Fix it. Restart. And going forward, use `npx openclaw config` commands instead of editing the JSON directly. Let the tool validate for you.

"Gateway not running." The classic. `npx openclaw status` shows "Stopped." The gateway crashed or wasn't started. Fix: `npx openclaw gateway start`. Then check the logs with `npx openclaw logs` to find out WHY it stopped in the first place. Don't just restart and walk away — find the cause.

"Port already in use." The gateway tries to start but something else is already using port 18789. Find the culprit with `lsof -i :18789`, kill it, or change your port with `npx openclaw config set gateway.port 18790`. Usually this means a zombie gateway process from a previous crash is still hanging around.

"Gateway keeps crashing." Starts and stops repeatedly. Check the logs for specific errors. Run `npx openclaw doctor --repair`. If you recently installed a plugin, that might be your problem — plugins run IN-PROCESS, so a buggy plugin crash IS a gateway crash. Try disabling recent plugins. If nothing works, restore config from backup and restart.

"Session stuck on busy." Your agent shows "busy" and never clears. Messages get no response. This is a stuck session lock, usually from a failed compaction. The fix is simple: `npx openclaw gateway restart`. That releases all locks and clears stuck sessions. Use `npx openclaw status --json` to see the session states if you want to diagnose it.

[pause]

Gateway errors are the most common category. And the good news? Every single one of them has a clear fix. No mysteries. No voodoo. Just commands.

---

## Slide 14 — Damage Control: API and Channels

API errors. These are about your connection to the AI brain.

"API key invalid." The AI doesn't respond. Authentication error. This usually means one of three things: the key has a formatting issue from when you pasted it, the key expired, or you have a billing problem. Go to your provider's console, check the key, regenerate if needed. Remember the Notepad trick from Module Three — paste the key into Notepad first to strip hidden characters, then copy from Notepad into the terminal. Update with `npx openclaw config set models.providers.anthropic.apiKey` and the new key.

"Rate limit exceeded." The AI stops responding temporarily. You sent too many requests too fast. Just wait one to five minutes and try again. If it keeps happening, reduce your heartbeat frequency. You might be hitting the provider's rate ceiling.

"Insufficient credits." Billing error. Your API account is empty or you hit your spending limit. Add credits or increase your limit. Simple as that — but frustrating when it happens at 11 PM and you need your agent for something.

Now, channel errors. These are about your messaging connections.

"Telegram bot not responding." Three things to check, in order. One: is the gateway running? `npx openclaw status`. Two: is the pairing complete? Check for pending requests. Three: is the bot token still valid? Verify in BotFather. Nine times out of ten, it's the gateway. It crashed overnight and nobody noticed because nobody was doing their daily check. See? The daily checklist matters.

"WhatsApp disconnected." Session expired. This happens periodically with WhatsApp. Just re-scan the QR code: `npx openclaw channels login`. Annoying but fast.

[pause]

API and channel errors are almost always quick fixes. The trick is KNOWING what to check. Now you know.

---

## Slide 15 — Damage Control: WSL2

WSL2 errors. These are Windows-specific and they will get you at least once. Guaranteed.

"WSL2 not running after reboot." You restart your Windows machine, try to open Ubuntu, and... nothing. This happens because WSL2 doesn't always auto-start after a Windows reboot. Open PowerShell, run `wsl --list --running`. If the list is empty, just open Ubuntu from the Start menu. It'll start up. Crisis over.

"WSL2 very slow." Commands taking forever. Everything feels like molasses. Three possible causes, three fixes. First: Windows Defender is scanning your WSL2 directory in real time. Exclude it. Second: RAM limits. Create or edit a file called `.wslconfig` in your Windows user profile directory and set memory limits so WSL2 isn't fighting with Windows for resources. Third: just do a clean restart — `wsl --shutdown` from PowerShell, then reopen Ubuntu. Sometimes WSL2 just needs a fresh start. Like all of us.

"systemd not running." You try to run `systemctl` commands and they fail. This means systemd isn't enabled in your WSL2 configuration. The fix: edit `/etc/wsl.conf`, add `[boot]` on one line and `systemd=true` on the next. Save it. Run `wsl --shutdown` from PowerShell. Reopen Ubuntu. Systemd will be running. We covered this in Module Two, but it's worth repeating because it bites people when they reinstall or update WSL2.

[pause]

WSL2 is the foundation your whole ship sits on. When the foundation wobbles, everything wobbles. These three fixes cover ninety percent of WSL2 issues you'll ever see.

---

## Slide 16 — Damage Control: Performance

Performance issues. These are the sneaky ones because nothing is technically BROKEN — it's just slow or weird or getting progressively worse.

"AI responses very slow — thirty seconds or more." Four things to check. Internet connectivity — `ping google.com`. If your internet is down, your agent can't reach the AI. Provider status page — sometimes Anthropic or OpenAI is having a bad day. It happens. Use `/compact` to reduce your context size — a huge context means more data to process means slower responses. And if you need speed RIGHT NOW, temporarily switch to a faster model. Haiku responds in seconds.

"Token counter climbing very fast." Your usage is spiking and you don't know why. Four culprits. First: you've been in the same conversation for too long without compacting. Use `/compact`. Second: you could start a fresh session with `/new`. Third: too many skills loaded. Every loaded skill adds thousands of tokens to every single message. Disable what you're not using. Fourth: check if your agent is loading large files unnecessarily. A big file dump into context will eat tokens fast.

And then there's the big one — "Agent gets confused or forgets mid-conversation." This is the context overflow cascade. Your agent loses track of what it was doing, gives contradictory answers, repeats questions it already asked. What happened is a large tool output — a file listing, a browser snapshot, a command result — pushed the context past its limits, triggering emergency compaction that aggressively summarized recent context. Your agent basically lost its short-term memory. Fix: start a fresh session with `/new`. Prevention: compact PROACTIVELY, before the context fills up. And add a line to your AGENTS.md telling your agent to limit output size and use pagination for large results.

[pause]

Performance issues are never emergencies. But they're always annoying. And now you know how to fix every single one of them.

---

## Slide 17 — Command Cheat Sheet: Gateway and Status

Okay, crew. We've reached the part of this module that I'm most excited about. The command cheat sheet. This is your gift. Your parting treasure. The map that keeps giving after the course is over.

We're going to go through this category by category, and I want you to think of these as muscle memory. You don't memorize them today — you REFERENCE them until they become automatic.

Gateway and status commands. The basics. The foundation of everything.

`npx openclaw gateway start` — starts the daemon. `npx openclaw gateway stop` — stops it. `npx openclaw gateway restart` — the universal "have you tried turning it off and on again" of OpenClaw. These three commands will solve more problems than any amount of debugging.

`npx openclaw tui` — opens the chat interface. This is how you talk to your agent from the terminal.

`npx openclaw status` — is the gateway running? One-word answer. Running or stopped.

`npx openclaw doctor` — the health check. Catches configuration issues, permission problems, dependency mismatches.

`npx openclaw doctor --repair` — same as above but it actually FIXES what it finds instead of just reporting it.

`npx openclaw logs` — view the daemon logs. When something goes wrong, this is where the story is written.

[pause]

These eight commands are your core toolkit. You'll use them more than anything else. Learn these, and you can handle ninety percent of day-to-day operations.

---

## Slide 18 — Command Cheat Sheet: Security

Security commands. Module Ten gave you the theory. These are the actual tools.

`npx openclaw security audit --deep` — the full security audit. Checks everything. Run this weekly. Run this after every update. Run this after every config change. Run it when you're bored. You can't run it too often.

`npx openclaw security audit --deep --fix` — same audit but with auto-fix. It doesn't just tell you what's wrong, it FIXES what it can. This is the one-two punch.

`npx openclaw config get gateway.auth.mode` — check your authentication settings. Is auth enabled? What type? Is it configured correctly?

`npx openclaw config set gateway.auth.token "$(openssl rand -hex 32)"` — rotate your gateway token. Do this periodically. Do this immediately if you suspect any kind of compromise.

`npx openclaw config get gateway.bind` — check your bind address. This should be loopback. If it's not loopback and you don't have a VERY good reason, change it back to loopback.

`npx openclaw config set sandbox.mode` — set your sandboxing mode. Off, non-main, or all. We went deep on this in Module Ten.

`npx openclaw config set tools.deny` — deny a specific tool. If there's a tool your agent should NEVER have access to, this is how you block it.

[pause]

Security commands aren't exciting. They're not flashy. But they're the difference between an agent you control and an agent that controls you. Use them.

---

## Slide 19 — Command Cheat Sheet: Configuration and Channels

Configuration commands. The knobs and dials of your ship.

`npx openclaw config` — opens the main configuration. The dashboard for everything.

`npx openclaw config get gateway.port` — check or change your gateway port. Default is 18789 but you can change it if something else is using that port.

`npx openclaw config set models.providers.anthropic.apiKey` — update your API key. When you rotate keys at your provider, this is how you tell OpenClaw about the new one.

`npx openclaw config set agents.defaults.heartbeat.every` — set how often your agent's heartbeat fires. Remember: fifty-five minutes for optimal caching.

`npx openclaw config set agents.defaults.heartbeat.model` — set which model runs the heartbeat. Haiku. The answer is Haiku. Or Gemini Flash. Something cheap and fast.

Channel commands. Your messaging connections.

`npx openclaw channels add` — add a new messaging channel. Telegram, Discord, WhatsApp, whatever.

`npx openclaw channels login` — re-authenticate your channels. When WhatsApp disconnects or a token expires, this is your fix.

`npx openclaw config get channels.[channel].dmPolicy` — check or set DM pairing mode for a channel. Controls who can talk to your agent.

Cron job commands. Your scheduled automation.

`npx openclaw cron list` — see all your scheduled jobs. `npx openclaw cron add` — create a new one. `npx openclaw cron remove` — delete one. `npx openclaw cron disable` — turn one off without deleting it.

[pause]

Configuration, channels, and cron jobs. The three C's that keep your ship running on schedule.

---

## Slide 20 — Command Cheat Sheet: Skills and TUI

Last category. Skills and TUI commands.

Skills management. `npx clawhub browse` — browse ClawHub. Window shopping for new capabilities. `npx clawhub search` — search for something specific. `npx clawhub install` — install a skill. `npx openclaw skills list` — see what you've got installed. `npx openclaw config set skills.entries.[name].enabled true` and `false` — toggle skills on and off without uninstalling them. This is KEY for cost management. Disable what you're not using. Re-enable when you need it.

And then the TUI commands — the ones you type INSIDE the chat with your agent.

`/help` — lists everything available. When in doubt, start here.

`/compact` — compress your conversation to save tokens. You know this one by now. USE IT.

`/new` — fresh session. Clean slate. When context gets messy, when you're switching topics, when your agent seems confused — `/new`.

`/model` — switch AI models on the fly. Need to go cheap? Switch to Haiku. Need firepower? Switch to Opus. You can change mid-conversation.

`/think` — set thinking depth. Off, low, medium, high, extra high. More thinking means slower but smarter responses. Less thinking means faster but more surface-level.

`/status` — current session info. Token count, model in use, active skills.

`/exit` — leave the TUI.

[pause]

That's the complete cheat sheet. Every command you'll ever need for daily operations. And I meant what I said — PRINT IT OUT. Tape it to the wall. Laminate it if you're fancy. This is your captain's quick reference card and it WILL save you time.

---

## Slide 21 — Rough Waters: Emergency Quick Reference

Now. The emergency procedure. We covered incident response in Module Ten, but this is the condensed, print-it-out, tape-it-next-to-your-monitor version. Five steps. In order. No thinking required.

Step one: STOP. `npx openclaw gateway stop`. Kill the agent. Whatever it's doing, it stops NOW. Don't negotiate. Don't investigate first. Don't try to figure out what went wrong while it's still running. STOP IT.

Step two: CLOSE. Lock down access. `npx openclaw config set gateway.bind "loopback"`. No one gets in. No external connections. The drawbridge goes up.

Step three: FREEZE. Rotate all tokens and keys. `npx openclaw config set gateway.auth.token "$(openssl rand -hex 32)"`. Then rotate your API keys at your provider. If something was compromised, the old credentials are now useless.

Step four: INVESTIGATE. NOW you read the logs. `npx openclaw logs`. NOW you look at sessions. NOW you figure out what happened. But only AFTER the agent is stopped, access is locked, and secrets are rotated.

Step five: RESTORE. Fix whatever went wrong. Run the security audit. Restart when you're confident everything is clean.

Stop, close, freeze, investigate, restore. In that order. ALWAYS in that order.

[ask the audience] Can someone give me the five steps back? Just the verbs.

[wait for responses]

Stop. Close. Freeze. Investigate. Restore. Perfect. Now PRINT THAT TABLE and keep it next to your computer. Because when an emergency actually happens, you won't be calm enough to think clearly. You'll be panicking. And a laminated card with five steps is the difference between a controlled response and a chaotic mess.

---

## Slide 22 — Community Resources

You are not alone out there. I need you to internalize that. When you leave this course, you are NOT sailing solo into empty ocean. There's an entire fleet out there.

Official docs at docs.openclaw.ai. This is your comprehensive reference. Configuration, features, API reference, security guides — everything is documented. When you need to look up a specific config option or understand how a feature works in detail, this is where you go.

GitHub at github.com/openclaw/openclaw. Bug reports, feature requests, source code. If you find a genuine bug — not a config issue, not a user error, but an actual bug — file it here. The developers are active and responsive.

The OpenClaw Discord. This is the heartbeat of the community. Real-time help, discussion, skill reviews, people sharing their setups, people helping newcomers. When you're stuck and the docs don't have the answer, Discord is where you go.

OpenClaw Reddit. Longer-form discussions, tutorials, showcases. When someone builds something cool with OpenClaw, they usually post it here.

ClawHub. The skills marketplace. Community-contributed skills you can install with one command.

[pause]

And here's the KEY to getting good help when you need it. Five things to include EVERY TIME you ask a question. What you were trying to do. The exact error message — not a summary, the EXACT message. Your OpenClaw version. Your OS. And what you've already tried. Include those five things and you'll get a useful answer. Leave them out and you'll get "can you provide more info?" back and forth for three hours. Don't waste your time or theirs. Give them what they need upfront.

---

## Slide 23 — Skills vs. Agents: Know the Difference

One more thing before we wrap up the technical content. This is a trap that catches EVERYONE eventually, and I want to inoculate you against it right now.

As your setup grows, you're going to be tempted to create a new agent for every task. Email agent. Calendar agent. Research agent. Trading agent. Social media agent. You'll look at your one agent and think "this is getting complicated, I should split it into specialists."

RESIST. THAT. URGE.

[pause]

Use a skill when the task is triggered by a specific command. When it doesn't need its own persistent memory. When it doesn't run independently. When it's a CAPABILITY, not an IDENTITY. Email formatting? Skill. Web research? Skill. Document summarization? Skill.

Use a separate agent ONLY when the task genuinely needs its own persistent memory separate from your main agent. When it needs its own identity — like a trading bot with different risk parameters than your personal assistant. When it runs independently and proactively. When it communicates through different channels with different people.

Why does this matter? Because every agent has its own context window, its own token costs, and its own maintenance overhead. Multiple agents means multiple costs. Multiple things to monitor. Multiple things that can break. A skill that handles email formatting is VASTLY cheaper than a dedicated "email agent" running its own heartbeat, its own context, its own everything.

Default to skills. ALWAYS default to skills. Only create a new agent when you genuinely, truly, no-other-option need independence. The restraint will save you money, time, and headaches.

---

## Slide 24 — Course Completion Checklist

Let's take inventory. Let's see what you've actually built over these twelve modules.

You should now have your agent — a fully configured AI personal assistant running twenty-four seven on your laptop. Not a demo. Not a toy. A real, working, secured, maintained piece of infrastructure.

Security — sandboxing, tool policies, authentication, an incident response plan. Your agent is locked down. It can do what it needs to do and NOTHING more.

Communication — Telegram connected, maybe Discord or WhatsApp too. You can chat with your agent from your phone, from anywhere, anytime.

Automation — morning briefs, cron jobs, proactive heartbeats. Your agent works while you sleep.

Skills — from ClawHub and custom-built for your specific workflow. Your agent can do things that no off-the-shelf chatbot can do, because you TAUGHT it.

Knowledge — you understand how it all works. How to maintain it. How to troubleshoot it. How to make it better over time.

[pause]

And here's what to do next. Four things.

Use it daily. The more you use your agent, the more useful it becomes. Memory builds over time. A month from now, your agent will know you better than it does today.

Update your core files monthly. Your goals change. Your agent should change with you.

Try reverse prompting weekly. Let your agent analyze YOUR situation and suggest what you should be working on. We covered this in Module Nine and it's powerful.

Join the OpenClaw Discord community. The people there are where you were twelve modules ago. Help them. Teach them. The best way to master something is to teach it to someone else.

---

## Slide 25 — Treasure Chest (Key Takeaways)

Seven takeaways. The treasure chest for Module Eleven. The FINAL treasure chest of the course.

One: Maintenance is NOT optional. Two minutes daily. Ten minutes weekly. These tiny investments prevent catastrophic failures. Skip them and you're gambling.

Two: Monitor your spending. Set limits. Check your dashboard weekly. Understand your burn rate. Don't let your agent eat your wallet.

Three: Back up religiously. Git commit your workspace at least weekly. More often when you're making changes. The day you need a backup and don't have one is the worst day of your OpenClaw life.

Four: Update carefully. Back up BEFORE updating. Test AFTER updating. Never update and walk away.

Five: Keep the cheat sheet accessible. Print it. Bookmark it. Save it to your phone. Put it on the fridge. Whatever it takes to make sure it's THERE when you need it at 2 AM.

Six: The community is your resource. Discord, GitHub, Reddit. You're not alone. There are thousands of people running OpenClaw and most of them are happy to help.

Seven: Security is ongoing. Not a one-time setup. Run audits weekly. Rotate secrets periodically. Review your configuration as you add new features and skills. Security is a practice, not a checkbox.

[pause]

Seven rules. Follow them and your ship sails smooth. Break them and... well, you know how the ocean works by now.

---

## Slide 26 — Bon Voyage!

[pause]

Alright, crew. This is it.

Twelve modules. From "what is OpenClaw" to a fully configured, security-hardened, automated, skill-loaded, heartbeat-running AI personal assistant on your Windows 10 laptop. You did that. Not me. YOU.

I gave you the charts. I pointed at the reefs. I yelled about backups until I was hoarse. But YOU did the work. You installed WSL2. You configured the gateway. You set up the security. You wrote the brain dump. You crafted those core files word by word. You connected Telegram. You installed skills. You built custom skills. You set up heartbeats and cron jobs. You hardened your system with sandboxing and tool policies and incident response plans. And today, you learned how to keep all of it running for the long haul.

[pause]

I want to read you something. We said this in Module Zero, on our very first day together, and it's even more true now than it was then.

"You're not just running a chatbot. You're running infrastructure. Infrastructure for thought. Infrastructure for action. Infrastructure for a new kind of relationship between humans and AI."

[pause]

That's what you built. That's what you're taking out of this harbor with you.

OpenClaw is evolving fast. New features. New skills. New models. New integrations. Things are going to change in ways none of us can predict. But the foundation you built in this course — understanding the architecture, the security mindset, context engineering, maintenance discipline — that foundation doesn't expire. That carries you through whatever comes next.

[pause]

So here's what I want you to do. Go home tonight. Open that terminal. Run `npx openclaw status`. Make sure your agent is running. Talk to it. Ask it something. Give it a task. Use the thing you built.

And then tomorrow? Do it again. And the next day. And the day after that. Because the more you use it, the better it gets. The more memory it builds, the more useful it becomes, the more it feels like... yours. Not a tool you borrowed. Not a service you rent. YOURS. Running on YOUR machine. Under YOUR control. Knowing YOUR life.

[pause]

[ask the audience] One last thing. Look around this room.

[wait for responses]

Every person in here started this course not knowing what a daemon was. And now every person in here is capable of maintaining their own AI infrastructure. That's not a small thing. That's a rare thing. You're part of a very small group of people who actually understand how this works, not just how to use a chat window.

Be proud of that. And go help someone else get there.

[pause]

Welcome to the future, crew. You built it safely.

Now go use it.

Fair winds and following seas.
