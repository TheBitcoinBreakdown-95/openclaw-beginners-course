# Module 02 Teaching Script: Preparing Your Old Laptop

**Total speaking time:** ~25 minutes (plus 10-minute hands-on activity)
**Slides:** 25

---

## Slide 1 — Title: Module 02 — Preparing Your Laptop

Alright, crew — welcome back aboard! If you're here, that means you survived Module 00 and Module 01. You know what OpenClaw is. You know what it can do. You know what it can do TO you if you're not careful. You've stared into the abyss and you're still standing. Good. I respect that. You've got spine.

Now — today? Today is DIFFERENT. Today we stop talking and start BUILDING. We are in the shipyard, crew. We're rolling up our sleeves, we're grabbing hammers and nails and tar and timber, and we are constructing the vessel that's going to carry us for the rest of this voyage. No more theory. No more "imagine if." Today we get our hands dirty.

I know what some of you are thinking. "It's a setup module. It's going to be boring. It's just clicking through installers and waiting for progress bars." And sure — if you squint at it sideways, that's technically what we're doing. But let me reframe that for you.

Every great ship starts as a pile of wood and iron on a dry dock. You don't get to cross the Atlantic by WISHING you had a ship. You build it. Plank by plank. Nail by nail. And today? Every single step we take — installing Ubuntu, getting Node.js running, configuring power settings — each one is a plank in the hull of your vessel. Skip a step, and you've got a hole below the waterline. Do them all RIGHT, and you've got a ship that'll carry you across any ocean.

And here's the good news. We've made this SIMPLE. We're not running Windows with Linux crammed inside it. We're not wrestling with compatibility layers and paste bugs and PATH issues. We're doing what the professionals do — we're installing Ubuntu directly. One operating system. Clean. Simple. Everything just works.

[pause]

So grab your laptops. Open them up. Power them on. We're doing this TOGETHER, step by step, and nobody leaves the shipyard until their vessel is seaworthy. Let's build!

---

## Slide 2 — Navigation Chart (Objectives)

Here's today's chart — eight ports of call. Eight things you'll be able to do by the time we drop anchor today.

First — you'll verify that your laptop actually has the guts for this. RAM, disk space. Think of it as a hull inspection. Is this boat going to float or is it going to sink the moment it hits water? We need to know BEFORE we start loading cargo.

Second — you'll understand WHY a dedicated Ubuntu laptop is the ideal setup. Not just "install this because I said so." You'll understand the engineering. The WHY behind the what.

Third — you'll create a bootable Ubuntu USB drive using Rufus. Download the operating system on your main computer, burn it to a USB stick, done. This is your key to the kingdom.

Fourth — you'll test WiFi compatibility BEFORE installing. This is the secret weapon — Ubuntu lets you try it out from the USB without changing anything on the hard drive. If WiFi works, full speed ahead. If it doesn't, we figure it out before committing.

Fifth — install Ubuntu 24.04 LTS. Replacing Windows. One clean operating system. No layers. No compatibility headaches.

Sixth — Node.js 22. The fuel. OpenClaw runs on JavaScript, and Node.js is the engine that burns it. No fuel, no voyage.

Seventh — power settings for 24/7 operation. Because if your ship falls asleep in the middle of the ocean, your agent goes dark.

Eighth — verify EVERYTHING works. Full systems check before we leave dry dock.

Let's move.

---

## Slide 3 — Ship's Logbook (Part 1)

Before we pick up a single tool — logbook time. Your vocabulary reference. Same drill as before — this is NOT a quiz. This is your cheat sheet. Pin it to the mast and keep it handy.

Ubuntu. That's the operating system we're installing on the laptop. Not Windows, not macOS — Ubuntu. It's a flavor of Linux that's designed for regular humans. The one with the guardrails. The one that doesn't expect you to already know what you're doing. Perfect for us.

ISO. This is a disk image file. Think of it like a blueprint rolled up in a tube. One file that contains an ENTIRE operating system installer. You download the ISO, put it on a USB stick, and boot from it. That's how we install Ubuntu.

Rufus. This is a free Windows tool that takes that ISO file and burns it onto a USB stick so you can boot from it. Select the ISO, pick the USB drive, click start. Done. Rufus does all the magic.

BIOS slash UEFI. This is the firmware that runs BEFORE your operating system. It's the very first thing that loads when you press the power button. We need to get into the BIOS to tell the laptop "boot from the USB stick, not the hard drive." You access it by pressing a key during startup — usually F2, F12, or Delete.

Boot from USB. Starting your computer from a USB stick instead of the hard drive. This is how we run the Ubuntu installer. The laptop thinks the USB stick IS the hard drive, temporarily.

And LTS. Long-Term Support. Ubuntu 24.04 is an LTS release, which means five YEARS of security updates. Until 2029. That's stability. That's a ship you can trust for a long voyage.

---

## Slide 4 — Ship's Logbook (Part 2)

Six more for the logbook. The supporting crew.

Terminal. Your command line interface. On Ubuntu, you open it from the dock on the left side of the screen, or press Ctrl+Alt+T. This is where you type commands. It's going to become your best friend.

Systemd. The service manager for Linux. And here's the BEAUTIFUL thing about native Ubuntu — systemd works OUT OF THE BOX. No configuration file to write. No restart dance. It's just... running. Already. You install Ubuntu and systemd is right there, waiting. That alone makes this approach worth it.

Daemon — pronounced "dee-mon." A program that runs in the background continuously, like a crew member standing watch below deck. You never see them, but they're always there, always working. The OpenClaw gateway runs as a daemon.

Node.js. The JavaScript runtime. The engine that OpenClaw is built on. Version 22 or newer. No exceptions.

nvm — Node VERSION Manager. It lets you install and switch between different versions of Node.js with one command. Dead simple. We use it because it's the recommended way.

And PATH. A list of directories your computer checks when you type a command. If you type "node" and your computer says "I have no idea what that is," it means Node.js isn't in your PATH. We'll make sure everything lands exactly where it needs to be.

---

## Slide 5 — Used or Pre-Owned Laptops

Okay — before we touch ANYTHING, we need to address this. If you got your laptop used, especially from a workplace, listen up.

Here's the thing about corporate laptops. IT departments lock them down. They put BIOS passwords on them. They enroll them in mobile device management. They restrict what you can install, what settings you can change, everything.

BUT — and this is the beautiful part — since we're ERASING Windows entirely and installing Ubuntu, almost all of that corporate junk goes away with Windows. It gets wiped. MDM enrollment? Gone. Group policies? Gone. Monitoring software? Gone. All of it lives on the Windows installation, and we're deleting the Windows installation.

The ONE thing that survives is a **BIOS password**. Because the BIOS isn't part of Windows — it's in the firmware, in the hardware itself. If the BIOS is password-locked, you can't change the boot order, which means you can't boot from USB, which means you can't install Ubuntu.

So check it. Restart the laptop, press the BIOS key — and we'll talk about which key that is in a few slides — and see if it opens the settings screen. If it does, no password, you're golden. If it asks for a password, try the usual suspects: blank, admin, password, 1234. If none work, check bios-pw.org with the service tag. If NOTHING works... you need a different laptop. That's the hard truth.

[pause]

But for most of you, this won't be an issue. Most personal and home laptops don't have BIOS passwords. It's mainly a corporate thing. Check it, move on.

---

## Slide 6 — Check Your Hardware: RAM

Hull inspection time! We need to verify this ship can handle the cargo before we start loading.

While you're still in Windows — because after today, Windows is GONE — press Ctrl+Shift+Esc. That opens Task Manager. Click Performance, then Memory, and look at the number in the top-right corner.

[wait for students]

What did you get? Shout it out.

[wait for responses]

Here's the guideline. Four gigs or less — sorry, this boat is too small. Eight gigs — that's minimum. It'll float, but don't expect it to break any speed records. Sixteen gigs — excellent, that's the sweet spot. Thirty-two plus — you've got a battleship and you're using it to fish. Overkill, but hey, no complaints.

For most old laptops, you'll be in the 4 to 16 range. Eight is fine. Sixteen is great. Anything above that is bonus. If you're at 4, we need to talk about whether this specific laptop is the right candidate.

---

## Slide 7 — Check Your Hardware: Disk Space

Second inspection. Open File Explorer — Windows key + E — click This PC, and look at your main drive. Usually C.

Now here's the thing — the numbers you see NOW don't matter as much as you'd think. Because we're erasing the entire drive. All of Windows goes away. You get the FULL drive for Ubuntu. So even if Windows shows 30 GB free out of 500 GB, after Ubuntu you'll have almost the entire 500 GB.

What we're really checking is whether the total drive size is reasonable. Ubuntu itself is about 10 to 15 gigs. Node.js and OpenClaw add another gig. Data grows over time. As long as your drive is 50 GB or larger total, you're fine.

But if your laptop has some ancient 32 GB eMMC storage? That's going to be tight. Really tight.

[ask the audience] How much total drive space does everyone have?

[wait for responses]

Good. If you're all above 50 gigs total, we're in good shape. Let's move on.

---

## Slide 8 — Why an Old Laptop?

I know some of you are thinking: "Why not just rent a VPS? Why not a Mac Mini? Why am I sitting here with this dusty Dell from 2017?"

Let me show you the math.

A VPS — a cloud server — costs 5 to 20 bucks a month. That's 60 to 240 a year. And your data lives on someone ELSE's computer. You're trusting Amazon or DigitalOcean or whoever not to snoop, not to have a breach, not to shut down your instance without warning. And you have ZERO physical control.

A Mac Mini is 500 to 800 dollars. Great hardware. Also great overkill for running one AI agent.

Your old laptop? Zero dollars. Already paid for. Your data never leaves your house. Nobody can touch it but you.

Cost: old laptop wins. Privacy: old laptop wins. Control: old laptop wins. It's not even close.

Quick aside — Raspberry Pi 5. About 155 bucks for a complete kit. Runs Linux natively, sips power, tiny and silent. Totally viable. But for beginners, the laptop is simpler — it has a screen, a keyboard, WiFi built in. The Pi is headless, SSH-only, which adds complexity we don't need right now.

---

## Slide 9 — Avoid Plug-and-Play + Getting Windows Back

Two important things on this slide. First — a warning from the community.

"DO NOT use a service that sets up OpenClaw for you. I tried 5 popular services and pretty much all of them exposed the gateway."

Exposed the gateway means anyone on the internet could connect to your agent. No pairing mode. No verification that you're the owner. Root directory exposed means your files visible to the world. This is why we set it up ourselves. Our way. The right way.

[pause]

Second thing — and I know this question is burning in some of your minds — "What if I want Windows back?"

Good news. Your Windows license is tied to the MOTHERBOARD. Not the hard drive. If you ever want Windows back, you download the installer, burn it to a USB, boot from it, and install Windows. It auto-activates. Same process as what we're doing today, just in reverse. Difficulty: about 4 out of 10.

One word of caution — Windows 10 reached end-of-life in October 2025. Microsoft might eventually stop offering the ISO for download. So if you THINK you might want Windows back someday, download the ISO NOW and save it to your main computer. Just in case.

But honestly? For running OpenClaw, Ubuntu is objectively simpler. systemd works out of the box. No PATH issues. No paste bugs. No compatibility layers. That's why we're doing this.

---

## Slide 10 — What You Will Need

Supply check! Before we set sail, make sure you've got everything on board.

USB stick — 12 gigs or larger. The Ubuntu ISO is almost 6 gigs, so a tiny 4-gig stick won't cut it. Anything 12 and up works perfectly.

Another computer — your main machine. This is where we download Ubuntu and create the bootable USB. Can be Windows, Mac, or Linux. Doesn't matter.

WiFi password — for whatever network this laptop is going to connect to. Ideally your guest network, which we'll talk about in a few slides.

Time — budget 60 to 90 minutes for the full process. Could be faster, could be slower, depending on how your hardware cooperates.

You'll also need an Anthropic API key for Module 03, but not today. If you haven't created one yet, go to console.anthropic.com and sign up. We'll use it next module.

[ask the audience] Does everyone have a USB stick? Does everyone have their second computer or phone ready?

[wait for responses]

Good. Let's download some software.

---

## Slide 11 — Step 1: Download Ubuntu and Rufus

Alright — this step happens on your MAIN computer. Not the old laptop. Your main machine with internet access.

Two downloads.

First: Ubuntu. Go to ubuntu.com/download/desktop. Click the big download button for Ubuntu 24.04 LTS. It's about 5.9 gigabytes, so it'll take a few minutes. Maybe grab a coffee while it downloads.

Why 24.04 LTS? LTS means Long-Term Support. Five years of security updates. Supported until 2029. That's the stable, reliable, boring-in-a-good-way version. You want boring for a server that runs 24/7.

Second: Rufus. Go to rufus.ie. Download Rufus Portable — it's about 1.9 megabytes. Tiny. Downloads in a blink. And "portable" means you don't have to install it — just double-click and it runs.

[wait for students to start downloads]

While Ubuntu downloads — because it's going to take a minute — let me explain what Rufus does. Rufus takes that ISO file — the disk image containing the entire Ubuntu installer — and writes it to your USB stick in a way that makes the USB bootable. When your laptop starts up, it can boot from this USB stick as if it were a hard drive with an operating system on it. That's the magic.

---

## Slide 12 — Step 2: Create Bootable USB with Rufus

Ubuntu downloaded? Good. Grab your USB stick — plug it into your MAIN computer. And fair warning: everything on that USB stick is about to be ERASED. If you've got family photos on there, back them up first. You have been warned.

Now run Rufus. Double-click it. If Windows asks for permission, click Yes.

Four things to set. Device — this is your USB stick. Check the SIZE. If it says 14 GB, that's your USB. If it says 500 GB, STOP — that's your hard drive. Don't burn Ubuntu onto your hard drive.

Boot selection — click SELECT and navigate to the Ubuntu ISO file you just downloaded.

Partition scheme — GPT. This should be the default.

Everything else — leave it alone. The defaults are fine.

Click START. It'll warn you that all data on the USB will be destroyed. Click OK. Then wait. Five to fifteen minutes depending on your USB speed.

When the progress bar says READY — congratulations. You've just created a bootable Ubuntu installer. Click close, safely eject the USB.

[wait for students to finish]

Everyone got a READY? Good. Unplug that USB and grab the old laptop. We're moving to the other machine.

---

## Slide 13 — Step 3: Boot from USB

Alright — the old laptop. The patient on the operating table. Plug in your bootable USB. Restart the laptop, or power it on if it's off.

Now here's where it gets fun. Timing. You need to press a specific key the MOMENT you see the manufacturer's logo. Before Windows starts loading. The key depends on who made your laptop.

Dell — F12. HP — F9 or Escape. Lenovo — F12. Acer — F12. ASUS — Escape or F8. Samsung — F2. MSI — F11.

Press the key REPEATEDLY as soon as you see the logo. Like you're knocking on a door and really need to get in. If you miss it — no worries, just restart and try again. Nobody gets it on the first try.

[wait for students]

When the boot menu appears, you'll see a list of devices. Look for anything that says USB, UEFI USB, or shows your USB stick's brand name. Select it. Press Enter.

If the laptop goes straight to Windows anyway, two things to try. One — you might have missed the timing window. Restart and try again, faster. Two — Secure Boot might be blocking the USB. You'll need to enter the BIOS settings — usually F2 or Delete during startup — find Secure Boot, disable it, save, and try again.

[wait for students to boot from USB]

---

## Slide 14 — Step 4: Try Ubuntu — Test WiFi First

You should be looking at a welcome screen now. And I want you to do something that might seem counterintuitive.

Do NOT click "Install Ubuntu." Not yet.

Click **"Try Ubuntu."**

This is the secret weapon. "Try Ubuntu" loads the entire operating system from the USB stick into RAM. It doesn't touch the hard drive. Doesn't change anything. It's like walking through a house before you buy it. You get to look around, open cupboards, check the plumbing.

And the plumbing we need to check is WiFi.

Top-right corner of the screen. See the system menu? WiFi icon? Click it. Your available networks should appear.

[wait for students]

[ask the audience] Can everyone see WiFi networks? Raise your hand if you see networks.

[wait for responses]

If you see networks and can connect — GREAT. Full speed ahead. You're cleared for installation.

If you DON'T see any networks — don't panic. This happens sometimes, especially with Realtek and Broadcom chips. You've got three backup plans. One — a USB WiFi adapter, about 15 bucks, plugs right in. Two — phone USB tethering. Plug your phone in with a cable, enable USB tethering in your phone settings, Ubuntu sees it as a wired connection. Three — good old Ethernet cable. Plug directly into the router.

The point is: we test WiFi NOW, before we erase anything. If it doesn't work from the USB, it won't work after installing either. Better to find out now.

---

## Slide 15 — Step 5: Install Ubuntu (Key Screens)

WiFi works? Or you've got a backup plan? Good. Let's commit.

From the "Try Ubuntu" desktop, double-click the **Install Ubuntu** icon. It's right there on the desktop.

The installer is graphical. Point and click. It walks you through several screens.

Language and keyboard — choose yours, click continue. Easy.

Installation type — choose **Interactive installation**. Not automated. We want to see what's happening.

Software selection — **Default selection** is fine. It includes a browser, text editor, basic utilities. Everything you need.

Now — LISTEN TO ME CAREFULLY. The next checkbox is the most important click in this entire installation.

**"Install third-party software for graphics and Wi-Fi hardware."**

CHECK. THAT. BOX.

This single checkbox determines whether half the WiFi chips in the world work after installation. Without it, Ubuntu only installs open-source drivers. Many WiFi chips need proprietary drivers to function. Check. The. Box.

[pause]

Next screen — Installation type for the disk. Choose **"Erase disk and install Ubuntu."**

And yes — this PERMANENTLY deletes everything. All of Windows. All programs. All data. Gone. If you have anything you need to save, NOW is the time to back it up. After this point, there is no undo.

[pause for gravity]

---

## Slide 16 — Step 5: Install Ubuntu (Continued)

Create your account. This is the user you'll log in with every day.

Your name — whatever you like. Computer name — something memorable. I suggest something like "openclaw-laptop" so you can identify it on your network.

Username — **openclaw**. This keeps things consistent with the commands in setup-commands.txt. You CAN use a different name, but every time the course says "/home/openclaw" you'll need to mentally substitute your own username.

Password — choose something you'll remember. You're going to type this A LOT. Every time you use `sudo` — which is the "run as administrator" command — it asks for this password.

And here's the critical thing — REMEMBER THIS PASSWORD. There's no "forgot password" link. There's no email reset. If you forget it, you're booting into recovery mode to reset it manually. Don't lose it.

Select your timezone. Click Install. And wait.

Fifteen to forty minutes. Depending on your hardware. Get another coffee. Chat with your neighbor. This is the waiting part.

[wait]

When it says "Installation Complete" — click Restart Now. Pull out the USB stick when the screen goes dark. The laptop restarts into Ubuntu. Log in with your username and password.

[pause]

Congratulations. Your laptop is now running Ubuntu. Windows is gone. You've got a clean Linux system. Let's keep building.

---

## Slide 17 — Step 6: Connect to Guest WiFi

Okay — before we install anything else, let's get this laptop on the right network.

Why a GUEST network? Because your regular home WiFi is flat. Every device can see every other device. Your phone, your personal laptop, your smart TV, your kids' tablet — they're all neighbors. And now you're adding an AI agent with shell access to that neighborhood. If this laptop is EVER compromised — through a prompt injection, a malicious skill, anything — an attacker sitting on this machine could potentially reach all those other devices.

A guest network provides internet access but ISOLATES this laptop. It can reach the internet — for API calls, for updates, for messaging — but it CANNOT see your personal devices. Separation of concerns. Military thinking. The agent gets its own barracks.

Setting one up is easy. On your phone or main computer, open your router's admin page — check the label on the router for the address and password. Find Guest Network in the settings. Enable it, set a password, and MAKE SURE "allow guests to access local network" is OFF. That's the isolation switch.

Then connect this Ubuntu laptop to the guest network. Top-right system menu, WiFi, select the guest network, enter the password.

If your router doesn't support guest networks? Not a deal breaker. Proceed on your main network. We'll revisit isolation in Module 10. But if your router HAS the option, use it. It's free security.

---

## Slide 18 — Step 7: Update Ubuntu and Install Tools

Time to bring this ship up to date. Open a terminal — click Terminal in the dock on the left, or press Ctrl+Alt+T. Either way.

Now — important tip before we type anything. To PASTE in the terminal, you use **Ctrl+Shift+V**. NOT Ctrl+V. Regular Ctrl+V does not work in Linux terminals. Ctrl+SHIFT+V. Burn that into muscle memory because you're going to paste a LOT of commands today.

You can also right-click and choose Paste. That works too.

First command — paste this in:

`sudo apt update && sudo apt upgrade -y`

Sudo means "run as administrator." It'll ask for your password — the one you created during installation. And here's the thing that catches EVERYONE the first time — when you type the password, NOTHING APPEARS ON SCREEN. No dots. No stars. Nothing. It looks like nothing is happening. It IS registering your keystrokes. This is a security feature. Type your password and press Enter.

This command updates Ubuntu's package list and installs all available updates. First run after a fresh install takes 5 to 10 minutes. Let it run.

Then install the essential tools:

`sudo apt install -y git curl wget build-essential`

These are developer tools that OpenClaw and Node.js need. Git for version control, curl and wget for downloading files, build-essential for compiling native code. Most of them might already be installed — that's fine.

[wait for commands to finish]

---

## Slide 19 — Step 8: Install Node.js 22

Node.js is the engine. OpenClaw is built on it. Without it, nothing runs. We need version 22 or newer.

We install it using nvm — Node Version Manager. One command to install nvm:

`curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash`

This downloads and runs the nvm installer. It takes about 10 seconds.

IMPORTANT — after running this, you need to **close the terminal and reopen it**. Click the X, then open Terminal again from the dock or press Ctrl+Alt+T. This loads nvm into your session. If you skip this step, you'll get "nvm: command not found" and wonder what went wrong.

[wait for students]

Terminal reopened? Good. Verify nvm:

`nvm --version`

You should see 0.40.4. If you see that — install Node.js:

`nvm install 22`
`nvm alias default 22`

And verify:

`node --version` — should say v22 point something.
`npm --version` — should say 10 or 11 point something.

[wait for students]

[ask the audience] Everyone seeing v22? Raise your hand if it's working.

[wait for responses]

Beautiful. You've got the fuel loaded. The engine is ready.

---

## Slide 20 — Step 9: Power Settings for 24/7 Operation

This is the step that separates a laptop from a SERVER. A laptop is designed to sleep when you walk away. A server is designed to NEVER sleep. We need to convert one into the other.

Two settings. Both must be changed. Miss either one and your agent goes dark when you least expect it.

First — the GUI setting. Open Settings — click the gear icon in the top-right system menu. Go to Power. Set Automatic Suspend to OFF for both battery and plugged in. Set Screen Blank to Never. That handles the idle timeout.

But THAT DOESN'T HANDLE THE LID. Close the lid on a default Ubuntu laptop and it suspends. Even with auto-suspend off. The lid close behavior is a SEPARATE setting. They're not connected. This trips up everyone.

For the lid, we use the terminal. Three commands:

These sed commands change the config file to set HandleLidSwitch to "ignore" — meaning closing the lid does nothing. Then we restart the login manager to apply it.

One warning — that restart command will LOG YOU OUT. Save any open work before running it. After it runs, you'll see the login screen. Log back in.

Test it. Close the lid. Wait 30 seconds. Open the lid. If the computer didn't sleep — you're configured for 24/7 duty. If it DID sleep, one of the settings didn't take. Check both the GUI and the config file.

---

## Slide 21 — Shoals and Sandbars

Troubleshooting time. Here's what can go wrong and how to fix it.

Laptop won't boot from USB — this is the most common issue. Check the BIOS key table from slide 13. Press it REPEATEDLY right when the logo appears. If the boot menu doesn't come up, try F2 or Delete to enter BIOS settings and change the boot order. Also try disabling Secure Boot.

WiFi not working — did you check the third-party drivers box during installation? If not, that's probably it. You might need to reinstall. If WiFi worked in "Try Ubuntu" but not after install, run `sudo ubuntu-drivers autoinstall` from a terminal with internet access (via Ethernet, phone tethering, or USB adapter).

BIOS password locked — try defaults, check bios-pw.org. If nothing works, you need a different laptop.

Node command not found — close the terminal and reopen it. nvm needs to load. If that doesn't work, try `source ~/.bashrc`.

Laptop sleeps despite settings — check BOTH the Settings > Power setting AND the logind.conf file. Both must be changed.

Password not accepted for sudo — nothing shows when you type. That's normal. Type your password carefully and press Enter. If you genuinely forgot it, you can reset from recovery mode.

---

## Slide 22 — Verification Checklist

Full systems check. Six commands. Let's run them all.

`systemctl is-system-running` — should say "running." And here's the beautiful thing — on native Ubuntu, systemd just WORKS. No config file to write, no restart dance, no wsl.conf nonsense. It's just running. Already. Out of the box.

`node --version` — should start with v22.

`npm --version` — should be 10 or higher.

`git --version` — should show a version number.

`curl --version | head -1` — should show curl with a version number.

`pwd` — should say /home/openclaw. Or whatever username you chose.

[wait for students to run all six]

[ask the audience] Six checks. Who's got all six passing? Raise your hand.

[wait for responses]

If all six pass — your environment is READY. Your ship is seaworthy. You are cleared for Module 03.

---

## Slide 23 — Hands on Deck

Activity time! This is your chance to verify everything and fill in your records.

Run through the checklist. RAM confirmed? Check. Ubuntu installed and booting? Check. WiFi connected, ideally to a guest network? Check. systemd running? Check. Node 22? Check. npm? Check. git? Check. Power settings — auto-suspend off AND lid close set to ignore? Check. pwd shows /home/openclaw? Check. Optional — Tailscale installed? Check or skip.

Write down your numbers. How much RAM. How much total disk space. Which Ubuntu version. These are your ship's specifications. You'll want them for reference.

[give students 10 minutes]

If anything failed, troubleshoot it now. Check the Shoals and Sandbars slide. Ask a neighbor. Ask me. We're not leaving this shipyard until every vessel is seaworthy.

---

## Slide 24 — Treasure Chest

Eight takeaways. Your treasure from today's voyage.

One — an old laptop is the best OpenClaw host. Zero cost. Full privacy. Full control. Nobody beats that combination.

Two — Ubuntu replaces Windows. On a dedicated agent laptop, native Linux is simpler and more reliable than running Linux inside Windows. We proved that today.

Three — you can always get Windows back. The license is tied to the motherboard. It's not a one-way door.

Four — test WiFi before installing. "Try Ubuntu" lets you kick the tires without committing. That's not a feature most people know about, and it saved us from potential heartache.

Five — the third-party drivers checkbox is critical. One checkbox. Determines whether WiFi works. Check. The. Box.

Six — systemd works out of the box on native Ubuntu. No configuration. No wsl.conf. No restart dance. It's just running. That alone is worth the switch from other approaches.

Seven — Node.js 22 via nvm. Easy to install, easy to manage, easy to upgrade later.

Eight — disable BOTH auto-suspend AND lid close. Two separate settings. Both required. Miss either one and your agent takes unexpected naps.

---

## Slide 25 — Next Port of Call: Module 03

Your laptop is ready. Ubuntu is running. Node.js is installed. systemd works out of the box. No compatibility layers. No PATH issues. No paste bugs. Just a clean Linux system ready for OpenClaw.

Next time — Module 03 — we install OpenClaw itself. We run the installer. We walk through the onboarding wizard. We configure the API key. We get the gateway running. And by the end of Module 03, you will be CHATTING with your agent.

[pause]

The ship is built. The hull is tight. The engine is loaded with fuel. Next time, we set sail.

Good work today, crew. Seriously. You just installed an operating system from scratch. Most people in the world have never done that. You did it in under an hour. Give yourselves a round of applause.

[wait for applause]

See you at the next port. Dismissed!
