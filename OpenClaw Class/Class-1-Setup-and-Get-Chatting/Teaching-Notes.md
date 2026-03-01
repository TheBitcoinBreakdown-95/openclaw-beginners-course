# Class 1: Set Up and Get Chatting — Teaching Notes

Per-slide bullet points for the instructor. Not a read-aloud script — use your own words.

**Total time: ~2-2.5 hours** (including install wait times filled by "While We Wait" slides)

---

## Slide 1: Title
- Welcome, set expectations: "By the end of today, you'll have an AI assistant responding on Telegram."
- Check: does everyone have their laptop, power cable, Telegram, and an API key (or know how to get one)?
- **Time: 2 min**

## Slide 2: What We'll Do Today
- Walk through the four outcomes. Emphasize: we focus on getting it WORKING today.
- Customization and security hardening are Classes 2 and 3.
- **Time: 2 min**

## Slide 3: What Is OpenClaw?
- Read the one-sentence definition aloud. Let it sink in.
- Walk through the comparison table row by row. The "aha" moment is usually "persistent memory" and "can take actions."
- **Time: 5 min**

## Slide 4: How It Works
- Draw the arrow diagram on the whiteboard if possible.
- Key point: the Gateway sits on YOUR laptop. You → Telegram → Your Laptop → AI → back.
- "Your data stays local. Only the message text goes to the AI provider."
- **Time: 3 min**

## Slide 5: Five Core Capabilities
- Quick overview — don't deep-dive each one.
- Highlight #4 (full computer access) as the reason security matters.
- **Time: 2 min**

## Slide 6: Security — What You Need to Know
- Tone shift: get serious. "This is not a chatbot. It has shell access."
- Read through the five threats quickly — just names and one-liners.
- "We'll go deep on security in Class 3. For now, you need to know these exist."
- **Time: 5 min**

## Slide 7: Security Essentials for Today
- These are the five things they do RIGHT NOW, today.
- Have them set the API spending limit on their phone while you talk ($20 is a good starting point).
- Make sure everyone can see the emergency stop command.
- "If anything goes wrong at any point today: `npx openclaw gateway stop`"
- **Time: 5 min**

## Slide 8: What You Need
- Quick check: everyone has laptop + power? Telegram on phone? API key or creating one now?
- Write the WiFi name and password on the board.
- Hand out the bootable USB sticks.
- **Prep note:** USB sticks must be created with **Rufus** (rufus.ie), not by copying the ISO file onto the drive. If students are making their own: Rufus → SELECT the ISO → START. A "Download required" popup about a GRUB version mismatch is normal — click Yes.
- If anyone tries to copy the ISO directly, it'll fail (FAT32 has a 4GB file size limit and the ISO is ~6.2GB). Rufus formats and writes it properly.
- **Time: 3 min**

## Slide 9: Boot from USB
- **DO:** Students shut down, insert USB, boot. Walk around and help with boot keys.
- Most common issue: wrong boot key. The table covers the major brands. Have them tap the key REPEATEDLY as soon as the manufacturer logo appears.
- The boot menu wording varies by laptop. Students might see "USB Flash Drive," "UEFI Generic Mass Storage," "UEFI: USB Device," or the USB stick's brand name. Tell them: **"Pick the one that isn't your hard drive or Windows Boot Manager."**
- After selecting the USB, the installer launches (not a desktop — it goes straight to setup screens).
- **Time: 10 min** (students work at different speeds)

## Slide 10: The Ubuntu Installer / Test WiFi
- The installer walks through: Language → Accessibility → Keyboard → **WiFi connection**.
- The WiFi screen IS the WiFi test. If their networks appear and they can connect, their hardware works.
- If WiFi doesn't work: click "Do not connect" and use a backup (USB adapter, phone tethering, Ethernet).
- After WiFi, they'll see **"Try or Install Ubuntu."** If WiFi worked, choose **Install Ubuntu.** If they want to explore first, "Try Ubuntu" loads a desktop without changing anything.
- **Time: 5 min**

## Slide 11: Install Ubuntu
- Walk through the installer screens. Emphasize:
  - "Check BOTH boxes — third-party software AND additional media formats."
  - "Erase disk is correct. We're dedicating this laptop to OpenClaw."
  - **Advanced Features:** Skip it. No encryption, no LVM. Just the default.
  - **Active Directory:** Skip it. That's for corporate networks.
  - Username `openclaw` is recommended but not required.
- If they chose "Try Ubuntu" earlier and launched the installer from the desktop, they'll re-do language/keyboard — that's fine.
- **After install completes:** Students will see "Please remove the installation medium, then press ENTER" — possibly with a spinning wheel still showing. Tell them: "Pull out the USB, press Enter. The spinner is just waiting for you — it's done."
- **First-login prompts:** After rebooting into Ubuntu, students will see 3 welcome screens: **Ubuntu Pro** (skip — paid enterprise support), **Share system data** (skip), **App Center** (close it). Tell them: "Click through these — Skip, Skip, close. None of them matter for what we're doing."
- **WAIT TIME: 15-30 min.** Use the "While We Wait" slides (Slides 12-17) during this time.
- **Time: 5 min instruction + 15-30 min install wait**

## Slides 12-17: While We Wait (During Install)

Six slides fill the 15-30 minute install wait. Slide 12 is a practical activity (get API key), slides 13-15 are security deep-dives (serious tone), slides 16-17 lift the mood (inspiring, practical). Adjust pacing based on how much time the install takes.

### Slide 12: Get Your API Key
- "Who doesn't have an API key yet? Now's the time."
- Free path students: aistudio.google.com on their phone, sign in, tap Get API Key — it already exists.
- Paid path students: console.anthropic.com, create account, add billing, set spending limit, create key.
- Everyone: copy the key to your phone's Notes app. You'll paste it later.
- Students who already have a key can sit tight.
- **Time: 2-3 min**

### Slide 13: The Paradox of Power
- Walk through the table row by row. Each row: the SAME access that enables a feature also enables an attack.
- "This is why we started with security, not saved it for last."
- **Time: 3 min**

### Slide 14: What Shell Access Means
- Read each command aloud. Pause after `rm -rf`. Let it sink in.
- The typo story is the most memorable point: "One missing word. Everything gone. No recycle bin."
- "Your agent types commands just like a human would. It can make the same mistakes."
- **Time: 3 min**

### Slide 15: A Real Attack
- Tell the Peter Steinberger story — this is the most engaging moment in the whole class.
- Key point: the AI wasn't hacked — it was CONVINCED. Social engineering works on AI the same way it works on people.
- Ask the room: "How would you protect against this?" (Answers: restrict file access, monitor activity, use modern models that resist manipulation better, DMs only.)
- **Time: 4 min**

### Slide 16: What People Are Building
- Shift tone: "OK, enough scary stuff. Here's what people are actually DOING with this."
- Let them read the table, then hit them with the $600 vs $1M quote.
- "This is what's possible when you invest time in your agent."
- **Time: 3 min**

### Slide 17: The Right Mindset
- Reverse prompting deserves emphasis: "Instead of giving your agent a long instruction, say: 'Before you start, ask me 5 questions.' It'll figure out what it needs to know."
- End with the bank password analogy. "Don't hand over everything on day one. Build trust."
- "OK — let's check on our installs!"
- **Time: 3 min**

## Slide 18: Update Ubuntu
- WiFi auto-reconnects from the installer — no need to reconnect.
- After reboot, students log in and open terminal (Ctrl+Alt+T).
- "Password won't show characters when you type it — no dots, no stars. That's normal."
- `apt update` takes 5-10 minutes on first run. Students can start chatting while they wait.
- **Time: 2 min instruction + 5-10 min wait**

## Slide 19: Install Node.js
- Key gotcha: they MUST close and reopen the terminal after the nvm install script.
- Walk around and verify `node --version` shows v22.x.x for everyone.
- **Time: 5 min**

## Slide 20: Power Settings
- GUI part is straightforward — Settings > Power.
- The `logind.conf` commands keep the laptop running with the lid closed.
- WARN them: `systemctl restart systemd-logind` logs them out. Save work first.
- **Time: 5 min**

## Slide 21: Verify Ubuntu Setup
- Quick checkpoint. Everyone runs the four commands.
- Anyone stuck? This is the last chance to fix Ubuntu issues before we move on.
- **Time: 3 min**

## Slide 22: Install OpenClaw
- The curl install script takes 1-3 minutes. Don't let students panic.
- The onboarding wizard starts automatically after install — no separate command needed.
- If terminal freezes: close and reopen, re-run the install command.
- "Choose MANUAL, not Quick Setup."
- **Time: 5 min**

## Slide 23: Wizard Cheat Sheet
- Project this slide while students go through the wizard.
- Walk around and help. Most questions are "press Enter for default."
- The API key step is where most people get stuck — next slide covers the trick.
- **Time: 10 min**

## Slide 24: Wizard Tips
- Text editor trick: open gedit, paste key there first, verify it's one line, then copy to terminal.
- Ctrl+Shift+V for terminal paste (not Ctrl+V).
- "Save your gateway token! If you lose it: `cat ~/.openclaw/openclaw.json`"
- **Time: 5 min** (included in wizard time above)

## Slide 25: Device Pairing, QMD, Verify
- Device pairing may or may not be needed — depends on wizard flow.
- QMD is quick: one command, then restart gateway.
- **If students hit "rate limit exceeded"** on QMD install: tell them to wait 2-3 minutes and retry. If it keeps failing, skip QMD and move on — it's not required for the agent to work, just makes it more efficient. They can install it anytime later.
- `npx openclaw doctor` — say Yes to everything it suggests.
- **Time: 5 min**

## Slide 26: First Chat
- The big moment. Everyone runs `npx openclaw tui`.
- "Type hello and press Enter. If the agent responds — it's alive."
- Celebrate! Then `/exit` to leave, because we're connecting Telegram next.
- **Time: 3 min**

## Slide 27: Create a Telegram Bot
- Students do this on their phones. Walk through the BotFather steps.
- "The username must end in 'bot' — that's a Telegram requirement."
- Make sure they SAVE the token. Suggest: paste it in their Notes app.
- **Time: 5 min**

## Slide 28: Connect Telegram to OpenClaw
- **First** have students message @userinfobot on Telegram to get their numeric user ID.
- Students paste their bot token AND user ID into the terminal commands.
- Secure from the start — no "open" phase. Only their user ID can message the bot.
- "Search for your bot on Telegram, tap Start, send a message. If it responds — you did it."
- If anyone gets a "config validation" error: they likely set things in the wrong order. Have them run the commands exactly as shown (botToken first, then allowFrom, then restart).
- **Time: 8 min**

## Slide 30: What You Built Today
- Recap: Ubuntu, OpenClaw, Telegram, first chat. All working.
- Homework: use it for a few days. Get comfortable. Think about what you want it to know about you.
- "Class 2: we teach the agent who you are, install skills, set up automations."
- **Time: 3 min**

## Slide 31: Next Port
- Quick teaser for Class 2. No details needed.
- **Time: 1 min**

## Slide 32: Appendix
- Reference slide — don't present it. "This is here if you need to look up a command later."
- **Time: 0 min**
