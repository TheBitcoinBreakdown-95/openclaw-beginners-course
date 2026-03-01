# Class 2: Make It Yours — Teaching Notes

**Total time: ~2 hours** (including exercises)

---

## Slide 1: Title
- **Time: 1 min**

## Slide 2: Quick Check
- Don't skip this. Check if anyone's setup broke between classes.
- Common fix: `npx openclaw gateway restart` and `npx openclaw doctor`.
- Spend up to 10 min helping anyone who's stuck before moving on.
- **Time: 5-10 min**

## Slide 3: Objectives
- Four outcomes. Today is about personalization and automation.
- **Time: 2 min**

## Slide 4: The Workspace
- Have students run `ls ~/.openclaw/workspace/` to see the files.
- Walk through the table — don't explain every file. Emphasize: USER, SOUL, IDENTITY are the ones they'll edit today.
- **Time: 5 min**

## Slide 5: How Workspace Files Work
- Key point: hot-reload means no restart needed for .md files. This is what makes it practical.
- Mention the 20K/150K limits. "Keep your files concise."
- **Time: 3 min**

## Slide 6: USER.md
- This is the most important slide of the class. Spend time here.
- "This is the brain dump. Everything your agent needs to know about you."
- **Time: 5 min**

## Slide 7: Exercise — Write USER.md
- **DO:** Students open nano and write their USER.md. Walk around and help.
- Encourage at least 4 sections: About Me, Goals, Preferences, Daily Routine.
- "When you're done, message your agent on Telegram and ask 'What do you know about me?'"
- **Time: 15 min**

## Slide 8: SOUL.md
- "USER.md is WHAT the agent knows. SOUL.md is HOW it communicates."
- Read the example aloud. It's concrete and short.
- **Time: 5 min**

## Slide 9: Exercise — Write SOUL.md
- **DO:** Students write at least communication style + hard rules.
- "Test it by chatting. If the tone is wrong, edit the file and try again."
- Pro tip: "You can also just tell your agent in chat to update its own SOUL.md."
- **Time: 10 min**

## Slide 10: IDENTITY.md
- Quick — just name and role. Most students already have an idea.
- **Time: 3 min**

## Slide 11: Context Engineering Tips
- Walk through the table. Key message: "Write for the machine, not for yourself."
- "Every word costs tokens. Make them count."
- **Time: 3 min**

## Slide 12: What Are Skills
- Brief overview. "Skills are just markdown files that teach your agent new tricks."
- **Time: 3 min**

## Slide 13: ClawHub Security Warning
- Tone shift. "1,184 malicious skills. The #1 ranked skill was malware."
- "Always inspect before installing. Pin the version."
- **Time: 5 min**

## Slide 14: Exercise — Install Skills
- **DO:** Students search and install 1-2 skills.
- Walk around and help. Some skill slugs can be tricky.
- "Don't go overboard. Each skill costs context tokens."
- **Time: 15 min**

## Slide 15: Managing Skills
- Quick reference. "Disable instead of delete if you might use it later."
- **Time: 2 min**

## Slide 16: What Are Cron Jobs
- "Scheduled tasks. The most common one is a morning briefing."
- Walk through the schedule format table.
- **Time: 3 min**

## Slide 17: The Morning Brief
- Explain what a good morning brief contains.
- "The easiest way: just ask your agent to set it up."
- **Time: 3 min**

## Slide 18: Exercise — Morning Brief
- **DO:** Students set up their morning brief.
- Two paths: Method 1 (just ask the agent) is easiest. Method 2 for precise control.
- Active hours is important — "No one wants a 3 AM notification."
- **Time: 10 min**

## Slide 19: Cost Tips
- Key point: use Haiku or Sonnet for heartbeats, not Opus.
- 55-minute cache trick is a nice bonus for tech-curious students.
- **Time: 3 min**

## Slide 20: Three Essential Automations
- Morning brief is the one they set up today.
- Backups and security audits are Class 3 territory.
- **Time: 2 min**

## Slide 21: Verify Everything
- **DO:** Students test all four pieces.
- "What do you know about me?" is the key test for workspace config.
- **Time: 5 min**

## Slide 22: Takeaway
- Recap and homework. "Refine your files based on how the agent responds."
- **Time: 3 min**

## Slide 23: Next Port
- Quick teaser. "Next time we lock everything down."
- **Time: 1 min**
