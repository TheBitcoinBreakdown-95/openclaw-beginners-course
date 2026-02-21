# Module 08 Teaching Script: Cron Jobs and Heartbeats

**Total speaking time:** ~32 minutes (plus 30-minute activity)
**Slides:** 27

---

## Slide 1 — Title: Module 08 — Cron Jobs and Heartbeats

Alright, crew — gather round. Welcome to Module Eight. Pull up a chair, pour yourself something strong, because today? Today is the day your agent comes ALIVE.

Everything we've done up to this point — installing OpenClaw, configuring the workspace, wiring up Telegram, loading skills — all of that was building the ship. Laying the keel, stepping the mast, rigging the sails. Important work. Critical work. But the ship has been sitting in the harbor. Waiting for you to bark orders before it does ANYTHING.

That ends today.

This module is about giving your agent a PULSE. A heartbeat. A ticking clock deep in the hull that wakes it up, makes it look around, check the horizon, and — if something needs doing — DO IT. Without you lifting a finger. Without you even being awake.

[pause]

We're also going to talk about cron jobs — which is a fancy way of saying "scheduled tasks." Think of them as standing orders nailed to the mast. "Every morning at 0700, send the captain a weather report." "Every Monday, review the ship's log." Your agent reads those orders and follows them. Rain or shine. Whether you're on deck or snoring in your bunk.

By the time we leave this module, your agent won't just be a crew member who waits for commands. It'll be a night watch. A first mate. A tireless sailor who keeps the ship running while the captain sleeps.

Let's set sail.

---

## Slide 2 — Navigation Chart (Objectives)

Here's our chart for today — six ports of call before we drop anchor.

Port one: you'll be able to explain what heartbeats ARE. Not just "oh it's a timer" — you'll understand the WHY. Why does an AI need a pulse? What happens when it wakes up? What does it check? Why does this change everything?

Port two: you'll configure that heartbeat. You'll decide how often the clock ticks. Every fifteen minutes? Every hour? Never? That's your call, captain. You set the rhythm.

Port three: cost. This is the one that bites people. Heartbeats cost money. Every single wake-up consumes tokens. And if you're not careful — if you leave the defaults and walk away — you WILL get a bill that makes your eyes water. So we're going to talk about using cheap models for heartbeats. The right tool for the right job.

Port four: cron jobs. Precise scheduling. "Do this exact thing at this exact time." We're going to demystify that five-field syntax that scares people and turn you into someone who can write a cron schedule in their sleep.

Port five: the morning briefing. This is the crown jewel. The flagship automation. The thing that makes people go "wait, my AI just... SENT me a weather report and a task list at 7 AM? I didn't ask for that!" Yeah. Yeah it did. And you're going to set that up today.

Port six: you'll walk out of here understanding the fundamental difference between reactive and proactive. Between a chatbot and an ASSISTANT.

Six stops. Let's hit them all.

---

## Slide 3 — Ship's Logbook (Vocabulary)

Logbook time. Five terms to stow in your brain before we push off.

Heartbeat. This is the big one for today. A heartbeat is a periodic check-in — an alarm clock — where your agent WAKES UP, reads its standing orders, looks around for anything that needs attention, and takes action if it finds something. If it doesn't find anything? It goes right back to sleep. Like a sailor on the night watch — eyes open every thirty minutes, scan the horizon, all clear, back to the hammock. That's a heartbeat.

Cron job. A scheduled task that fires at a specific time or on a specific interval. The name comes from the Unix cron scheduler, which has been running tasks on computers since the 1970s. It's OLD technology. Proven. Battle-tested. And now your AI agent uses it.

Proactive. Acting WITHOUT being asked. This is the opposite of reactive. A reactive agent waits for your question. A proactive agent sends you the answer before you even thought to ask.

Morning brief. A daily summary that shows up on your phone at a set time. Weather, news, tasks, calendar — whatever you configure. This is the automation that gets people hooked.

Mission control. A custom dashboard your agent builds and maintains. Think of it like a ship's bridge — one screen showing you everything that matters. Agent health, token spend, active tasks, messages. Your personal command center.

These terms are going to come up constantly for the next thirty minutes. Don't memorize them — just know they're here when you need them.

---

## Slide 4 — Reactive vs. Proactive

Alright, I need everyone to really HEAR this one. Because this is the pivot point. This is the moment where OpenClaw stops being "just another chatbot" and becomes something else entirely.

Up until now, your agent has been REACTIVE. You talk, it talks back. You ask a question, it answers. You say "what's the weather," it says "72 and sunny." Useful? Sure. But think about it — that's just a fancier version of Googling something.

[pause]

Now look at the other column. PROACTIVE. Your agent sends you the weather at 7 AM every morning. You didn't ask. You were brushing your teeth. But there it is on your phone — weather, top three news stories, your tasks for the day, and a suggestion about what to focus on first.

Your agent monitors your favorite news sources and sends you summaries when something important happens. You didn't ask. You were eating lunch. But there it is — "Hey captain, there's a major development in AI regulation you should know about."

Your agent reviews your goals and suggests priorities. Not because you said "what should I do today" — because it KNOWS your goals, it KNOWS your calendar, and it woke up at 6:30 AM, looked at everything, and thought "the captain needs to know this."

[ask the audience]

How many of you have ever wished you had a personal assistant who just... handled things? Who you didn't have to micromanage? Raise your hand.

[wait for responses]

That's what proactive behavior IS. And heartbeats and cron jobs are how we make it happen. This is where OpenClaw goes from a chatbot you talk TO... to an assistant that works FOR you.

---

## Slide 5 — How Heartbeats Work

So let's crack open the mechanism. How does a heartbeat actually WORK?

Picture your agent sleeping. Not doing anything. Just sitting there in the dark, quiet, waiting. Then — TICK. The gateway says "wake up." And your agent opens its eyes.

Step one: it reads its HEARTBEAT.md file. That's its standing orders. We wrote that file back when we set up the workspace, and we're going to customize it today. It tells the agent: "Here's what you check every time you wake up."

Step two: it checks for pending tasks, unread messages, scheduled items, triggers — anything that needs attention.

Step three: if something needs doing, it DOES it. Sends a message. Runs a task. Fires off that morning brief. Whatever the standing orders say.

Step four: nothing left to do? Back to sleep. Close its eyes. Wait for the next tick.

That's it. That's the whole cycle. Wake up, check, act, sleep. Wake up, check, act, sleep. Over and over and over, all day, all night. Like the ship's clock. Like the tide.

Now — the defaults. Out of the box, heartbeats fire every 30 minutes. Or every hour if you've got the daemon installed. What does a default heartbeat DO? Checks for unread messages, pending tasks, and scheduled items. Basic stuff.

But here's the thing you need to hear CLEARLY: each heartbeat costs tokens. Every time that alarm goes off, your AI processes instructions, reads context, thinks about what to do — and all of that gets billed to your API key.

Which brings us to the next slide, and it's a WARNING for a very good reason.

---

## Slide 6 — Rough Waters: Heartbeat Cost Explosion

Listen up. This is the "rocks ahead" moment. This is where people run their ship aground.

[pause]

OpenClaw, by default, sends EVERYTHING to your primary model. If your primary model is Claude Opus 4.6 — and for many of you it is, because that's the smart one, that's the one that handles complex tasks — then every single heartbeat, every routine "hey, anything new? nope, going back to sleep" check is being processed by the MOST EXPENSIVE model available.

That's like hiring a brain surgeon to take your temperature. Sure, the surgeon CAN do it. But why would you PAY surgeon rates for something a nurse handles in five seconds?

Let me give you the numbers so this REALLY sinks in.

System prompt re-injection: every API call — including every heartbeat — re-sends your SOUL.md, your AGENTS.md, your MEMORY.md, your skill descriptions. That's 3,000 to 14,000 tokens. Re-sent. Every. Single. Time.

At 30-minute intervals, that's 48 full-context API calls per day. Forty-eight times your agent wakes up and the AI has to read that entire system prompt from scratch.

And cron jobs? Each cron trigger creates a FRESH conversation with full context injection. If you set up a cron job that runs every 15 minutes, that's 96 triggers per day. On Opus, that can run you $10 to $20 PER DAY. Just for the cron jobs. Just for the scheduled checks.

[pause]

This is the number one cost mistake new OpenClaw users make. Bar none. People discover heartbeats, think "this is amazing, I want my agent checking every five minutes!" and then get a bill at the end of the month that's bigger than their rent.

But here's the good news: it's completely fixable. The next few slides are going to show you how to take that $100+ monthly heartbeat bill and crush it down to about fifty CENTS. Not fifty dollars. Fifty cents. Stay with me.

---

## Slide 7 — Configuring Heartbeat Frequency

The first knob you're going to turn: how often does the clock tick?

The command is dead simple. `openclaw config heartbeat interval` and then a number. That number is minutes. Thirty means every 30 minutes. Sixty means every hour. Zero means never — heartbeats off, agent sleeps until you talk to it.

Now look at this table. Fifteen minutes — that's for urgent monitoring. If you're tracking something time-sensitive and you need near-real-time awareness. Higher cost. Use with caution.

Thirty minutes — the default. Good balance for most people. Moderate cost.

Sixty minutes — budget-friendly. Low urgency. Your agent checks once an hour and you're fine with that.

Zero — no proactive behavior at all. Your agent is fully reactive. Only wakes up when you talk to it. Zero cost for heartbeats.

BUT — and I need you to write this down or burn it into your memory — the RECOMMENDED setting is not on this table's default row. It's 55 minutes. Fifty-five. Not sixty. Not thirty. Fifty-five. And I'm going to explain why in a few slides when we talk about prompt caching, and it's going to blow your mind.

For right now, here's the bottom line: set your heartbeat to 55 minutes, route it to Haiku, enable caching, and your heartbeat costs drop by 99.5 percent. That should be the FIRST thing you configure. Not an afterthought. Not something you do when the bill arrives. First thing.

And if you're not ready for any proactive behavior yet — if you're still learning the ropes and you want to keep costs at zero while you figure things out — that's totally fine. Set it to zero. Turn it on later when you're ready.

---

## Slide 8 — Use Cheap Models for Heartbeats

Here's the single fastest way to cut your bill. Five seconds of configuration. Ready?

Most heartbeat checks are BORING. I mean that in the best possible way. "Any new messages? No. Any tasks due? No. Anything scheduled? No. Cool. Going back to sleep." That does NOT require the most powerful AI model on the planet. That requires a model that can read a checklist and say "nothing here." THAT'S IT.

So you route your heartbeats to a cheap model. Haiku 4.5. One command:

`openclaw config heartbeat model claude-haiku-4-5`

Done. That's it. Your heartbeats now run on Haiku instead of Opus. Same wake-up cycle. Same standing orders. Same checks. But at a FRACTION of the cost.

Or if you've got Google Gemini configured:

`openclaw config heartbeat model gemini-flash-3`

Flash is even cheaper. And for the task of "look around, is there anything to do, no? ok bye" — it's more than capable.

[pause]

This single change — not upgrading hardware, not rewriting code, not doing anything complicated — just pointing heartbeats at a cheaper model — saves you $50 to $190 per month. That's not an exaggeration. That's math.

---

## Slide 9 — Heartbeat Cost Comparison

Let's put real numbers on the table so you can see what I'm talking about.

Claude Opus 4.6 — the flagship, the smartest model, the one you want for complex thinking — costs roughly 5 to 15 cents per heartbeat. At 30-minute intervals, that's 48 heartbeats a day. Do the math and you're looking at $70 to $200 per month. JUST for heartbeats. Just for the "anything new? no? cool" checks.

Claude Sonnet 4.5 — a step down in price, still very capable — one to five cents per heartbeat. $15 to $70 per month.

Claude Haiku 4.5 — now we're talking. A tenth of a cent to half a cent per heartbeat. $1 to $7 per month. That's the sweet spot for most people.

And Gemini Flash 3 — you get 20 free API calls per day, and after that it's dirt cheap. Zero to five bucks a month.

[ask the audience]

Look at the gap between that top row and that Haiku row. Raise your hand if you'd rather spend $7 a month than $200.

[wait for responses]

Yeah. Me too. And here's the thing — your heartbeat model handles the ROUTINE checks. It's the night watch. It scans the horizon. If it spots something important — an urgent message, a critical alert, something that actually requires deep thinking — THEN you escalate to Opus. The standing orders in your HEARTBEAT.md can include that logic. Use the cheap model for the checking. Use the expensive model for the thinking. Best of both worlds.

---

## Slide 10 — Local Heartbeat Models via LM Studio

Now for those of you who want to go full pirate — no cloud, no API bills, no monthly invoices — you can run heartbeats on LOCAL models. Models running on YOUR machine. Zero cost. Zero. The tokens are free because they never leave your ship.

We're talking about small 3 to 4 billion parameter models. Little ones. But more than capable for the job of "check if there's work, report back."

Qwen 3 4B — this one's been called the "Agentic King." It's the most stable for tool-use and structured output. Takes about 30 seconds per heartbeat on an M4 Mac Mini. Not fast, but for a heartbeat? You don't NEED fast. The agent's checking in. Thirty seconds is fine.

Gemma 3 4B — excellent instruction following, clean output, about 21 seconds per heartbeat. A little faster.

Both of these are roughly equivalent to GPT-4o mini for routing and checking tasks. They're not going to write you a novel or debug complex code. But for "is there mail? are there tasks? no? okay, sleep" — they're PERFECT.

Now — when should you go local versus cloud? If you're running one or two agents, honestly, cloud Haiku is fine. It's simple, it's cheap enough, it's already there. But if you're running THREE or more agents — and we'll talk about multi-agent setups in Module 09 — then local heartbeats start making a LOT of sense. Multiple agents all pinging cloud APIs eat into your rate limits fast. Offload the heartbeats to LM Studio and save your cloud budget for actual thinking work.

The privacy angle matters too. Local models mean no data leaves your machine. Your heartbeat checks, your standing orders, your agent's awareness of your life — none of it touches someone else's server. For some of you, that matters a great deal.

---

## Slide 11 — The 55-Minute Prompt Caching Trick

Okay, crew. THIS is the gold doubloon. The treasure in the chest. The one optimization that makes the biggest difference. Write this down.

Remember how I said every heartbeat re-sends your entire system prompt? Your SOUL.md, your AGENTS.md, your MEMORY.md — 3,000 to 14,000 tokens, resent from scratch every single time?

Well, Anthropic has this thing called prompt caching. And what it does is — the FIRST time you send that big system prompt, the provider REMEMBERS it. Caches it. And every subsequent call that uses the same prompt gets a 90 percent discount on those cached tokens.

[pause]

But here's the trick. The cache stays warm for about 55 minutes. After 55 minutes without a call, it goes cold, and the next call pays full price again to re-warm it.

So what do you do? You set your heartbeat interval to 55 minutes. Not 60 — because at 60, you might miss the cache window. Not 30 — because that's twice as many heartbeats and you don't need the extra frequency. FIFTY-FIVE. Every heartbeat lands right inside that warm cache window. Every single one gets the 90 percent discount.

Now combine that with routing to Haiku. And enabling prompt caching in your config — which we'll cover how to do in Module 09. Look at these numbers.

WITHOUT optimization: Opus for heartbeats, full system prompt every call, over $100 per month.

WITH optimization: Haiku for heartbeats, cached system prompt at 90 percent off, 55-minute intervals — fifty cents per month.

[pause]

Let me say that again. From over one hundred dollars to fifty cents. A 99.5 percent reduction on heartbeat costs. Three configuration changes. That's it. Interval 55. Model Haiku. Enable prompt caching.

This is the single biggest cost optimization in this entire course. If you remember NOTHING else from today, remember this.

---

## Slide 12 — Configuring HEARTBEAT.md

Now that your heartbeat is set to the right frequency and the right model — what do you actually TELL the agent to do when it wakes up?

That's what HEARTBEAT.md is for. This is the standing orders. The instructions nailed to the mast. Every time your agent's alarm goes off, it reads this file.

Open it up: `nano ~/.openclaw/workspace/HEARTBEAT.md`

And structure it by PRIORITY. Because you want your agent handling the most important things FIRST and spending the least amount of tokens possible.

Priority one: check messages. Are there unread messages on any connected channel? If something's urgent, respond immediately. If it's not urgent, queue it for later. Don't burn expensive tokens on "hey, how's it going" at 3 AM.

Priority two: scheduled tasks. Are any cron jobs or reminders due? Execute them. Log what was completed.

Priority three: morning brief. Is it between 6:30 and 7:00 AM? Has today's brief been sent yet? No? Then prepare it and fire it off to Telegram.

Priority four: health check. Is the gateway running? Are APIs reachable? Log any issues.

And at the bottom — COST RULES. This is crucial. Tell your agent explicitly: "Use the cheapest available model for routine checks. Only escalate to the primary model for complex tasks. If nothing needs attention, DO NOTHING. Don't burn tokens just because the alarm went off."

That last line is important. You don't want your agent generating a "hey everything's fine!" message every 55 minutes. If there's nothing to report, the cheapest heartbeat is the one that says "all clear" and goes right back to sleep.

---

## Slide 13 — Setting Up a Morning Briefing

Alright, here it is. The killer feature. The automation that makes people fall in love with OpenClaw. The morning briefing.

Imagine this: you wake up. You reach for your phone. Before you've even put your feet on the floor, there's a message from your agent on Telegram. "Good morning, Captain. It's Thursday, February 20th. The weather in your city is 48 degrees and partly cloudy. Here are today's top three stories in AI. Here are your tasks for the day. And based on your goals, I think you should focus on finishing that client proposal this morning."

[pause]

That's real. That's something your agent does. Every day. Without you asking.

Three ways to set it up:

Method one — put it in your HEARTBEAT.md. We just talked about that. If your heartbeat interval is frequent enough to catch the 6:30 to 7:00 AM window, the heartbeat handles it automatically. Simplest approach.

Method two — use a cron job for precise timing. `openclaw cron add "morning-brief" --schedule "0 7 * * *" --task "Send my morning brief to Telegram"`. That fires at EXACTLY 7:00 AM. Not 6:47, not 7:12 — seven o'clock, sharp. Every day.

Method three — the lazy captain's method, and honestly? My favorite. Just ASK your agent. Tell it: "Set up a daily morning brief at 7 AM on Telegram. Include weather, top AI news, my tasks, and one suggestion." Your agent will configure the automation FOR you. It'll set up the cron job, write the template, wire up the delivery. You just told it what you wanted and it handled the rigging.

---

## Slide 14 — Testing Your Morning Brief

Now — and this is CRITICAL — do NOT set up your morning brief and then go to bed thinking "I'll see if it worked tomorrow."

No. NO. Test it RIGHT NOW.

Type this into your chat: "Generate and send my morning brief right now as a test."

Your agent will spin up the brief immediately, format it, and send it to Telegram. Pull out your phone. Did it arrive? Is the format clean? Can you read it in 30 seconds while half-awake? Because that's the real test — your morning brief needs to be scannable, not a wall of text.

Check the five pieces. Is the date and greeting there? Weather for your city? Top three news stories in whatever you care about? Today's tasks pulled from memory? And that proactive suggestion — the one thing your agent thinks you should focus on based on your goals?

If something's off — the format is ugly, it's missing sections, the weather is for the wrong city — tell your agent. "Hey, the weather should be for Austin, not New York." "Make the headers bigger." "Skip the news section, I don't care about that." Adjust and re-test until it's right.

[pause]

The morning brief is going to evolve over time. Nobody gets it perfect on the first try. But the act of TESTING it — right now, not tomorrow — that's how you avoid that sinking feeling when you wake up at 7 AM and your phone is silent because something was misconfigured. Test it now. Fix it now. Trust it tomorrow.

---

## Slide 15 — Understanding Cron Syntax

Okay, let's talk about cron syntax. I can see some of you already tensing up. Relax. I promise you, this is simpler than it looks.

Cron uses five fields. That's it. Five numbers — or asterisks — separated by spaces. Each field controls one thing:

Minute. Hour. Day of the month. Month. Day of the week.

Read it left to right. The first number is WHEN in the hour — what minute. The second is WHAT hour. The third is what day of the month. Fourth is what month. Fifth is what day of the week.

An asterisk means "every." So if the hour field is an asterisk, it means "every hour." If the day field is an asterisk, it means "every day."

Let me walk through some real examples.

`0 7 * * *` — minute zero, hour seven, every day, every month, every day of the week. That's 7:00 AM every day. That's your morning brief.

`30 8 * * 1-5` — minute thirty, hour eight, every day of the month, every month, days one through five. Days one through five are Monday through Friday. So that's 8:30 AM on weekdays only. Weekend captain gets to sleep in.

`0 */2 * * *` — minute zero, every two hours. The slash means "every N." So this fires at midnight, 2 AM, 4 AM, 6 AM, and so on. Every two hours on the dot.

`0 9 * * 1` — 9:00 AM, day one of the week. Day one is Monday. So that's your Monday morning check-in. Perfect for a weekly review.

[ask the audience]

Anyone want to take a crack at it? What would `0 18 * * *` mean? Shout it out.

[wait for responses]

6:00 PM every day. Minute zero, hour eighteen — that's 6 PM in 24-hour time. Every day. That's your end-of-day summary right there.

See? Not scary. Five fields. Left to right. You've got this.

---

## Slide 16 — Cron Job Examples

Here's a treasure map of the most common cron jobs people set up. Consider this your starter pack.

Morning brief, every day at 7 AM: `0 7 * * *`. We just covered this one. The flagship.

Weekly review, every Monday at 9 AM: `0 9 * * 1`. Your agent looks back at the week, compares against your goals, highlights accomplishments, flags what you procrastinated on, and sets priorities for the week ahead. Incredibly valuable.

Check Bitcoin price every hour: `0 * * * *`. Minute zero, every hour. If you're monitoring prices or anything that fluctuates, this is the pattern.

End-of-day summary, daily at 6 PM: `0 18 * * *`. What got done, what's still pending, what tomorrow looks like. Like a first mate's report at the end of the watch.

Monthly goals review, first of the month at 10 AM: `0 10 1 * *`. Day one of the month. Zoom out, look at the big picture, recalibrate.

Now — cost warning. I have to put the brakes on excitement for a second. Every cron trigger is an API call. One cron per day is about 30 API calls per month — that's totally manageable. One cron per hour is 720 calls per month — that starts adding up. One cron every 15 minutes is 2,880 calls — and if those are hitting Opus, you are BURNING money.

So be intentional. Use cheap models for routine cron jobs. Save Opus for the complex ones like weekly reviews or strategic planning. And combine related checks into a single job instead of running three separate ones.

---

## Slide 17 — Managing Cron Jobs

Let's talk about the day-to-day management. How do you wrangle these scheduled tasks once they're running?

Four commands. That's your whole toolkit.

`openclaw cron list` — shows you everything that's scheduled. Your full roster of standing orders. Run this first to see what's already there.

`openclaw cron add` — creates a new job. Give it a name, a schedule, and a task description. Be SPECIFIC about what you want. "Conduct my weekly review" is okay. "Conduct my weekly review: compare this week's accomplishments against my goals in MEMORY.md, list lessons learned, identify anything I procrastinated on, set three priorities for next week, and send it as a formatted message to Telegram" — THAT is better. The more specific you are, the better the output.

`openclaw cron remove` — deletes a job permanently. Use the name you gave it when you created it.

`openclaw cron disable` — temporarily turns off a job without deleting it. Going on vacation? Disable your price alerts. Coming back? Enable them again. The configuration stays, you just flip the switch.

And remember the three principles: use CHEAP models for routine jobs. COMBINE related checks into a single job whenever possible. And ENABLE prompt caching to reduce that system prompt overhead on every trigger.

---

## Slide 18 — Practical Automation Ideas

Let's get the creative juices flowing. Here's what real OpenClaw users are running day-to-day. Things that actually make their lives better.

End-of-day summary at 6 PM: tasks completed, what's still pending, messages you haven't responded to, tomorrow's top three priorities. This is like having your first mate hand you a report when the watch changes. "Here's what happened on my shift, captain. Here's what's left for the morning crew."

Weekly review on Monday at 9 AM: goals progress, key accomplishments, lessons learned, priorities for the week, anything you've been dodging. This one STINGS sometimes. The agent doesn't care about your feelings — it'll flag that project you've been avoiding for three weeks. And that's exactly why it's valuable.

Price alerts, hourly: check the Bitcoin price, or any stock, or any metric you care about. But HERE'S THE KEY — only message you if something crosses a threshold. Above X? Alert. Below Y? Alert. Everything in normal range? SILENCE. Do nothing. Don't send a "Bitcoin is still $97,000" message every hour. That's how you train yourself to ignore your agent.

News monitoring every four hours: same principle. Only alert for genuinely important stories. Save the routine stuff for the morning brief.

Best practices — be SPECIFIC about format, content, and where the message goes. Set alerts for important things ONLY. Notification fatigue is real — if your agent messages you forty times a day, you'll start ignoring it, and then you'll miss the one message that actually mattered. And always verify your WSL2 timezone with `timedatectl`. Nothing more frustrating than a morning brief arriving at 2 AM because your system thinks you're in UTC.

---

## Slide 19 — The Three Essential Cron Jobs

Before you go wild building custom automations — before you set up Bitcoin trackers and news monitors and mission dashboards — set up these three FIRST. Experienced captains consider them non-negotiable. This is your baseline maintenance. This is keeping the hull clean and the rigging tight.

Number one: session cleanup. Every 72 hours. What does it do? Deletes old, bloated session files that accumulate over time and slow your agent down. Think of it as scraping the barnacles off the hull. If you don't do it, eventually the ship drags. Old sessions waste disk space and can slow down context loading. Every 72 hours, clean sweep, fresh start.

Number two: daily security audit. Every morning. Checks your firewall status, Fail2ban logs, SSH configuration, open ports, Docker containers. This is your morning hull inspection. You're looking for drift — something that changed overnight, a port that shouldn't be open, a failed login attempt that might mean someone's probing your defenses. Catches problems BEFORE they become vulnerabilities.

Number three: silent backups. Every two hours. Runs a `git push` on your workspace. Your HEARTBEAT.md, your SOUL.md, your MEMORY.md, your skills, your configs — all of it pushed to a git repo. If something breaks — if you accidentally overwrite a file, if a bad configuration wrecks something — you can always roll back. Always. Two-hour intervals means you never lose more than two hours of work.

And notice that word "silent." The backup cron should NOT message you every two hours saying "backup complete!" Nobody needs that. It should only message you if the backup FAILS. Silence means success. Noise means trouble. That's good automation design.

Now — there's also an executive assistant pattern here, with SCHEDULING.md. But that's a bigger topic. Set these three up first. Everything else is a bonus.

---

## Slide 20 — Mission Statement Reverse Prompt

Alright, now we're getting into the DEEP water. This is one of the highest-value automations you can set up, and most people don't even think of it.

Step one: give your agent a mission statement. Put it in your IDENTITY.md or AGENTS.md. Something concrete. Something aspirational. "Build a sustainable freelance business doing $10K per month by helping small businesses with AI automation." Or whatever YOUR mission is.

Step two: schedule a cron job that makes your agent reverse-prompt ITSELF against that mission. Every day at 8 AM — or twice a day, at 9 AM and 3 PM — your agent reads the mission statement, looks at everything it knows about your projects, your progress, your goals, your conversations, and asks itself: "What is ONE task we can do RIGHT NOW to get closer to this mission?"

Then it sends you that suggestion on Telegram.

[pause]

Here's why this is so powerful. Your agent has a perspective you DON'T have. It's read every conversation you've had with it. It knows your projects. It knows what's in progress, what's stalled, what you've been excited about, what you've been avoiding. It sees patterns across EVERYTHING. And when you ask it "what should we do to get closer to the mission?" — it generates ideas you never would have thought of on your own.

Users report getting task suggestions that connect dots across projects they'd never linked together. The agent sees that your skill in one area could be applied to a completely different project in a way that serves the mission.

And here's the really wild part — you can schedule it to proactively EXECUTE low-risk mission tasks overnight. Go to bed, give the agent permission to handle tasks below a certain risk level, and wake up to completed work.

[ask the audience]

How many of you have a mission statement? Even a rough one? Raise your hand.

[wait for responses]

If you don't — that's fine. Ask your agent. Say: "Based on everything you know about me — my goals, my skills, my projects, our conversations — suggest a mission statement for me." Let it connect the dots. It might surprise you.

---

## Slide 21 — Advanced: Compaction and Mission Control

Two more tools for the serious captain. Both of these are about keeping your ship running LEAN and giving you VISIBILITY.

Compaction first. Remember how I said sessions accumulate context — all those tokens piling up like cargo in the hold? If you don't manage it, your agent's context balloons to 200,000+ tokens. And every single API call re-sends all of that. The agent gets slower, dumber, and more expensive with every message.

So you set compaction thresholds EARLY. Right now. Don't wait until the agent crashes. Set memory flush at 80,000 tokens. Set compaction at 80,000 tokens. When the context gets too big, the agent summarizes and trims it. Keeps things lean. Keeps things fast. Keeps the cost down.

Think of it like ballast management. Too much weight and the ship sits low, moves slow, and wastes fuel. Keep the hold clean and the ship cuts through the water.

Now — Mission Control. This is the dashboard. Create a cron job that generates a daily status report and sends it to Telegram. Agent health and uptime. Token spend — daily, weekly, monthly. Active tasks and progress. Upcoming calendar events. Unread priority messages. All in one formatted summary you can scan in 30 seconds.

Your personal bridge. One glance and you know the state of your entire operation. Is the agent healthy? How much am I spending? What's on deck for today? Any fires? No? Great, carry on.

---

## Slide 22 — Gmail Pub/Sub and Webhook Automation

We've been talking about two kinds of triggers: heartbeats — which are periodic, "check every X minutes" — and cron jobs — which are time-based, "do this at 7 AM." But there's a third kind, and it's the most responsive of all: EVENT-DRIVEN automation.

Gmail Pub/Sub. Instead of your agent polling your email on a timer — "any new mail? any new mail? any new mail?" — Google Cloud notifies your agent INSTANTLY when a new email arrives. Real-time. The email hits your inbox, and within seconds your agent knows about it and can take action. Process an invoice. Flag a priority message. Draft a response. Without waiting for the next heartbeat cycle.

Webhooks. Your agent's gateway can receive incoming HTTP requests from external services. GitHub merges a pull request — webhook fires, agent reacts. Stripe processes a payment — webhook fires, agent logs it. Shopify gets an order — webhook fires, agent updates inventory.

Look at this table. Four trigger types. Cron for scheduled tasks. Heartbeat for periodic check-ins. Gmail Pub/Sub for real-time email. Webhooks for external service events. Together, they cover virtually EVERY scenario. Your agent can respond to anything, anytime, whether you're at your desk or sound asleep.

You don't need to set any of this up today. This is a "know it exists" moment. But when you're ready to go deeper — the full guide is at docs.openclaw.ai/automation/gmail-pubsub. Plant the flag now. Come back for it later.

---

## Slide 23 — Session Lifecycle

Alright, I need to warn you about something. This catches EVERYONE. And I mean everyone. Even experienced users forget this sometimes.

Sessions are stateful ONLY while the chat window is open.

[pause]

Let me say that differently. If you tell your agent to work on something big, close your laptop, go to bed, and come back tomorrow morning expecting the work to be done — it won't be. The work stopped the SECOND you closed the lid. The session died. The agent stopped. Everything halted.

There is no background daemon keeping your conversation alive. When the TUI closes, the session is gone. When you reopen, you might get a summary of what was discussed, but the full context — the reasoning, the "where was I in this task," the deep thought — that's gone.

[ask the audience]

Be honest — how many of you have already done this? Told your agent to work on something and then walked away expecting it to keep going?

[wait for responses]

Don't feel bad. Everyone does it. It's the most natural assumption in the world. But the fix is simple: use cron jobs for background work. Cron jobs spin up fresh agent instances, do one task, report the results, and exit cleanly. They don't depend on your terminal being open.

For one-off tasks, break the work into discrete steps. Have the agent complete step one, save the output to a file, then pick up from there in the next session or with a cron trigger. File-based handoffs. Like leaving a logbook entry for the next watch.

And here's the cost angle — look at this table. A fresh session, zero to 30 minutes, has 5 to 20K tokens of context. Quality is high, cost is low. A medium session, one to three hours, has 50 to 100K tokens. Quality is still good but cost is climbing. A long session, three hours plus? 100K to 200K+ tokens. Quality is DEGRADING. The agent starts hallucinating more. Costs are through the roof. Every message in a 200K context session is sending ALL of that context back to the AI.

Rule of thumb: if a task takes more than an hour, design it as a cron job or a series of short sessions with file-based handoffs. Keep your sessions short, sharp, and focused. Start fresh often. Your agent — and your wallet — will thank you.

---

## Slide 24 — Shoals and Sandbars (Common Mistakes)

Warning reef ahead. Let's go through the most common ways people run aground with heartbeats and cron jobs, so you can steer clear.

Setting heartbeats too frequent. I know the temptation. "Every five minutes! I want my agent checking CONSTANTLY!" Stop. Start at 55 to 60 minutes. Only decrease if you genuinely need faster response times for something specific. More frequent heartbeats means more money. Period.

Using Opus for heartbeats. We beat this one to death already, but I'm saying it again because people STILL do it. Use Haiku 4.5 or Gemini Flash. Save Opus for thinking, not for checking.

Not testing automations. You set up a morning brief, you feel clever, you go to bed, and it doesn't fire because you had a typo in the schedule. ALWAYS test immediately. "Do it now." Never wait for the next trigger.

Vague cron job instructions. "Do my weekly review" — your agent doesn't know what that means to YOU. Be specific. What should it include? What format? Where should it send it? The more detail you give, the better the output.

Too many alerts. If your phone is buzzing every ten minutes with updates from your agent, you will start ignoring ALL of them. Then the one that says "URGENT: your server is down" gets lost in the noise. Only alert for things that genuinely need your attention.

And timezone issues. This one is sneaky. Your cron jobs use your system timezone. If your WSL2 instance thinks it's in UTC and you're in Central time, your "7 AM" morning brief arrives at 1 AM. Check it with `timedatectl`. Fix it once. Never think about it again.

---

## Slide 25 — Hands on Deck (Activity)

Alright, crew. Enough talking. Time to get your hands dirty. This is a 30-minute exercise in three parts.

Part one: fifteen minutes. Set up your morning briefing. Edit your HEARTBEAT.md with morning brief instructions. Set your heartbeat model to something cheap — Haiku or Gemini Flash. Restart the gateway. Then TEST IT. Ask your agent to generate the brief right now. Check Telegram. Is it there? Is it formatted well? Can you read it in 30 seconds on your phone? If not, adjust and test again. Don't move on until you've got a morning brief you're happy with.

Part two: ten minutes. Create ONE custom cron job. Just one. Pick something that would actually be useful in YOUR life. Weekly review. Daily task summary. Price alert for something you're tracking. News monitoring for your industry. A custom reminder. Whatever floats YOUR boat — pun absolutely intended. Set it up, test it, verify it works.

Part three: five minutes. Step back and evaluate. Was the morning brief actually useful, or was it full of fluff? Was the format easy to read on your phone, or did you have to squint and scroll? What would you add? What would you remove? Is the heartbeat interval right for your needs, or should you adjust it?

[pause]

One last thing before you dive in — if you get stuck, ASK YOUR AGENT. Seriously. Say "help me set up a cron job that does X" and let it walk you through it. That's what it's there for. You don't have to memorize every command.

Go. Thirty minutes. Make your ship run itself.

---

## Slide 26 — Treasure Chest (Key Takeaways)

Welcome back to port. Let's lock in what we learned today. Seven pieces of treasure to carry with you.

One. Heartbeats make your agent PROACTIVE. It checks in periodically and acts without being asked. This is the fundamental shift from chatbot to assistant.

Two. Use CHEAP models for heartbeats. Haiku 4.5 or Gemini Flash for the routine checks. Save the expensive model for the actual thinking. This alone saves you $50 to $190 per month.

Three. The 55-minute trick. Set your heartbeat to 55 minutes to hit Anthropic's prompt cache window. Combined with Haiku and caching enabled, your heartbeat costs drop from $100+ per month to fifty cents. That's the single biggest cost optimization in this entire course.

Four. The morning brief is the killer feature. Set it up first. Customize it over time. This is the automation that makes people go "okay, now I GET it."

Five. Cron jobs give you precise scheduling. But every trigger costs tokens. Use cheap models. Combine related jobs. Don't schedule more than you need.

Six. Start conservative. 55 to 60 minute heartbeats. Minimal alerts. You can always increase frequency later. You cannot un-spend the money from a month of aggressive heartbeats you didn't need.

Seven. Test EVERYTHING immediately. Never wait for the next trigger. Ask your agent to run it now. Fix it now. Trust it tomorrow.

[pause]

Your ship now runs itself while you sleep. That's not a metaphor. That's literally what you built today.

---

## Slide 27 — Next Port of Call

Your agent has a heartbeat. It wakes up on its own, checks the horizon, takes action, and reports back. It sends you a morning briefing. It runs scheduled tasks. It cleans up after itself and backs up its own memory. That's no small thing. That's a working crew.

But we've only scratched the surface.

In Module 09 — Advanced Concepts — we go DEEP. The brains-and-muscles model for cost optimization — where you use a cheap model for routing and an expensive model for thinking, and the system figures out which is which automatically. Model switching. ClawRouter. How to actually enable that prompt caching we keep talking about. Multi-agent setups where you've got a fleet of specialized agents working together. And reverse prompting — where your agent doesn't just answer your questions... it starts asking YOU the right questions.

That's when things get really interesting. That's when the ship stops being a ship and starts being a fleet.

Until then — go home, wake up tomorrow morning, and check your phone. If that morning brief is sitting there waiting for you... congratulations, captain. Your crew is on duty.

Fair winds.
