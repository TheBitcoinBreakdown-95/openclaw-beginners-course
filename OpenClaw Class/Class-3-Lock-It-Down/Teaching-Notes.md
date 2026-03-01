# Class 3: Lock It Down — Teaching Notes

Per-slide guide: key point, talking points, activities, and timing.

**Total class time: ~90-100 minutes**

---

## Slide 1: Title — Lock It Down
- **Key point:** This is the final class — students leave with a hardened, maintainable setup.
- **Say:** "Your agent is running and personalized. Today we make sure nobody else can mess with it, and you know how to keep it healthy long-term."
- **Time:** 1 min

---

## Slide 2: What We'll Cover Today
- **Key point:** Five topics — security threats, Docker, tool policies, model switching, maintenance.
- **Say:** "We'll move faster today — less installing, more configuring. Most of this is copy-paste commands."
- **Time:** 1 min

---

## Slide 3: Security Deep Dive — The Real Threats
- **Key point:** Prompt injection and social engineering are the two threats students need to viscerally understand.
- **Say:** "In Class 1, I listed five threats and you probably forgot them. Now I'm going to show you what they actually look like."
- **Do:** Read the prompt injection example out loud. Ask: "Would YOUR agent fall for this?" (Most would.)
- **Time:** 3 min

---

## Slide 4: Real Incidents
- **Key point:** These are real patterns from the OpenClaw community — not hypothetical.
- **Say:** "The group chat one happens ALL the time. Someone asks a 'fun' question and your agent happily answers with your private info."
- **Say:** "The $800 bill — that's someone who didn't set a spending limit. We'll fix that today."
- **Say:** "The malicious skills — this is why we said in Class 2 to check reviews and download counts. ClawHub is like any app store: most things are fine, some are not."
- **Time:** 3 min

---

## Slide 5: Incident Response — Five Steps
- **Key point:** When something goes wrong, you need a procedure — not panic.
- **Do:** Have the class say it together: "Stop. Close. Freeze. Investigate. Restore."
- **Say:** "Step 1 is the most important. If your agent is doing something bad, KILL THE GATEWAY. You can figure out why later."
- **Say:** "The kill command is `npx openclaw gateway stop`. If that doesn't work, `pkill -9 -f openclaw` kills everything."
- **Time:** 3 min

---

## Slide 6: Exercise — Docker Sandboxing (15 min)
- **Key point:** Docker isolates your agent so even if it's compromised, it can't touch your real system.
- **Do:** Walk through the commands together. The `usermod` command requires logging out and back in — warn students before they run it.
- **Say:** "After you run `sudo usermod -aG docker $USER`, you need to log out and log back in. Don't just close the terminal — log out of Ubuntu."
- **Do:** After logging back in, verify with `docker run hello-world`. Then set the sandbox config.
- **Time:** 15 min (including logout/login)

---

## Slide 7: Sandbox Modes Explained
- **Key point:** `non-main` mode with `agent` scope is the recommended default.
- **Say:** "Think of it like this: your main TUI session is you sitting at the keyboard. That's trusted. But scheduled tasks, skills, and heartbeats run without you watching — those get sandboxed."
- **Time:** 2 min

---

## Slide 8: Exercise — Tool Policies (10 min)
- **Key point:** Even with sandboxing, you should explicitly block tools your agent doesn't need.
- **Do:** Have students run the deny list command. Then run the security audit to see the result.
- **Say:** "If your agent doesn't need to run shell commands, why let it? Block `exec`. If it doesn't need a browser, block `browser`."
- **Say:** "The `messaging` profile is a good starting point — it only allows what a personal assistant needs."
- **Time:** 10 min

---

## Slide 9: SOUL.md Security Rules
- **Key point:** Technical controls (Docker, tool policies) plus behavioral rules (SOUL.md) = defense in depth.
- **Say:** "Docker and tool policies are locks on the doors. SOUL.md rules are instructions your agent follows voluntarily. You want both."
- **Do:** Have students open their AGENTS.md and add at least the four rules shown. They can customize after class.
- **Time:** 5 min

---

## Slide 10: Exercise — Full Security Audit (5 min)
- **Key point:** The audit command checks everything at once — run it regularly.
- **Do:** Run `npx openclaw security audit --deep --fix` together. Walk through any findings on the projector.
- **Say:** "The file permission commands (chmod) make sure nobody else on the system can read your config. 700 means only you."
- **Time:** 5 min

---

## Slide 11: Brains and Muscles — Model Switching
- **Key point:** Using the right model for each task saves 60-90% on costs.
- **Say:** "Opus is the genius. Sonnet is the workhorse. Haiku is the intern. Don't pay genius prices for intern work."
- **Say:** "Your morning brief? That's a Haiku job. A complex research question? That's Opus."
- **Do:** Show the `/model` command in TUI if you have a live demo. Otherwise, show the config set command.
- **Time:** 3 min

---

## Slide 12: Cost Management
- **Key point:** A well-configured setup costs $10-50/month, not $100-400.
- **Say:** "The single biggest savings: Haiku for heartbeats. If you're running hourly heartbeats with Opus, you're burning money."
- **Do:** Have students set their spending limit now — open console.anthropic.com, Settings > Billing > set $50/month.
- **Say:** "You can always raise it later. But set SOMETHING. The $800 disaster happened because there was no limit."
- **Time:** 5 min

---

## Slide 13: Reverse Prompting
- **Key point:** Your agent knows everything you've told it — ask it to reflect that back.
- **Say:** "This is the fun one. Instead of giving your agent tasks, ask it what YOU should be doing. It has perfect memory of your goals, your situation, your priorities."
- **Do:** If students have Telegram open, have them try the prompt right now. Give 2 minutes for people to read their responses.
- **Time:** 4 min

---

## Slide 14: Keeping OpenClaw Updated
- **Key point:** Always back up before updating. Always run doctor after.
- **Say:** "Updates can change config format. That's why we back up first and run doctor after — it catches and fixes format changes automatically."
- **Say:** "The git init trick turns your .openclaw folder into a version-controlled repo. If an update breaks something, you can roll back."
- **Time:** 3 min

---

## Slide 15: Backup Strategy
- **Key point:** Workspace and config are critical. Everything else is nice to have.
- **Say:** "If you lose your workspace files, you lose your agent's personality, memory, and rules. That's months of tuning gone."
- **Say:** "Weekly git commit takes 5 seconds. The tar backup is for before major changes — updates, migrations, experiments."
- **Time:** 3 min

---

## Slide 16: Top 5 Error Fixes
- **Key point:** These five problems cover 90% of what goes wrong. Keep this slide bookmarked.
- **Say:** "If your gateway won't start, `doctor --repair` fixes it 9 times out of 10."
- **Say:** "If your Telegram bot stops responding, restart the gateway first. If that doesn't work, check that your bot token is still valid."
- **Say:** "The nuclear options are LAST RESORT. `reset --scope config` wipes your settings but keeps your workspace. `uninstall` removes everything."
- **Time:** 3 min

---

## Slide 17: Weekly Maintenance Checklist
- **Key point:** 10 minutes per week prevents hours of problems.
- **Do:** Walk through the 7 steps. Have students run steps 1-2 right now.
- **Say:** "Set a weekly reminder on your phone. Sunday evening, 10 minutes. Run these commands, check your spending, do a backup."
- **Time:** 5 min

---

## Slide 18: Command Cheat Sheet
- **Key point:** Reference slide — students should screenshot or bookmark this.
- **Say:** "This is your quick reference. These are also in the setup-commands.txt file on the USB if you need them later."
- **Do:** Point out that these same commands are in the Useful Commands section of setup-commands.txt.
- **Time:** 2 min

---

## Slide 19: What You've Built Across 3 Classes
- **Key point:** Students built a complete, secure AI assistant from scratch.
- **Say:** "Look at what you've done. Three classes ago, you had an old laptop and no idea what OpenClaw was. Now you have a personal AI assistant that's secure, personalized, and running 24/7."
- **Say:** "Daily: use it. The more you use it, the better it gets. Weekly: 10-minute checkup. Monthly: update and review costs."
- **Time:** 3 min

---

## Slide 20: Congratulations
- **Key point:** Celebrate the accomplishment. Point to the full course for deeper learning.
- **Say:** "You're not beginners anymore. The 12-module course on GitHub goes deeper into every topic we covered — custom skills, multi-agent setups, advanced security. Read it at your own pace."
- **Do:** Take questions. Help anyone who's stuck on a specific issue.
- **Time:** 10 min (Q&A)

---

## Timing Summary

| Section | Slides | Time |
|---------|--------|------|
| Security deep dive | 1-5 | ~11 min |
| Docker sandboxing | 6-7 | ~17 min |
| Tool policies + SOUL.md | 8-10 | ~20 min |
| Model switching + costs | 11-13 | ~12 min |
| Maintenance + updates | 14-17 | ~14 min |
| Wrap-up + cheat sheet | 18-20 | ~15 min |
| **Total** | **20** | **~90 min** |
