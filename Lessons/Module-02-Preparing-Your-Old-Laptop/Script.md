tr# Module 02 Teaching Script: Preparing Your Old Laptop

**Total speaking time:** ~30 minutes (plus 10-minute hands-on activity)
**Slides:** 28 (deck has 28 slides; script groups related slides into teaching sections)

---

## Slide 1 — Title: Module 02 — Preparing Your Laptop

Alright, crew — welcome back aboard! If you're here, that means you survived Module 00 and Module 01. You know what OpenClaw is. You know what it can do. You know what it can do TO you if you're not careful. You've stared into the abyss and you're still standing. Good. I respect that. You've got spine.

Now — today? Today is DIFFERENT. Today we stop talking and start BUILDING. We are in the shipyard, crew. We're rolling up our sleeves, we're grabbing hammers and nails and tar and timber, and we are constructing the vessel that's going to carry us for the rest of this voyage. No more theory. No more "imagine if." Today we get our hands dirty.

I know what some of you are thinking. "It's a setup module. It's going to be boring. It's just clicking through installers and waiting for progress bars." And sure — if you squint at it sideways, that's technically what we're doing. But let me reframe that for you.

Every great ship starts as a pile of wood and iron on a dry dock. You don't get to cross the Atlantic by WISHING you had a ship. You build it. Plank by plank. Nail by nail. And today? Every single step we take — checking your hardware, installing WSL2, enabling systemd, getting Node.js running — each one is a plank in the hull of your vessel. Skip a step, and you've got a hole below the waterline. Do them all RIGHT, and you've got a ship that'll carry you across any ocean.

And here's the good news. We've made this FOOLPROOF. Previous versions of this course had students running a command and hoping the Microsoft Store would cooperate. Spoiler: it often didn't. Pre-owned laptops, guest networks, corporate remnants — a dozen things could go wrong. Not anymore. Today, we prepared everything in advance on a USB stick. Three files. One path. No surprises. No "if this fails, try that." No typing long commands — everything is copy and paste from a text file. Everyone follows the same steps. Everyone gets the same result.

[pause]

So grab your laptops. Open them up. Power them on. We're doing this TOGETHER, step by step, and nobody leaves the shipyard until their vessel is seaworthy. Let's build!

---

## Slide 2 — Navigation Chart (Objectives)

Here's today's chart — eight ports of call. Eight things you'll be able to do by the time we drop anchor today.

First — you'll verify that your laptop actually has the guts for this. RAM, disk space, Windows version. Think of it as a hull inspection. Is this boat going to float or is it going to sink the moment it hits water? We need to know BEFORE we start loading cargo.

Second — you'll understand WHY we need WSL2 and what it actually does. Not just "install this because I said so." You'll understand the engineering. The WHY behind the what.

Third — this is new — you'll prepare a USB Setup Kit. Two files downloaded on your main computer, copied to a USB stick. This kit is your guarantee that installation works. No Microsoft Store. No network dependency. Just files on a stick.

Fourth — you'll install WSL2 and Ubuntu FROM that USB stick. Double-click an installer, drag a file, run a few commands. One path. Everyone does the same thing.

Fifth — you'll enable systemd and configure your Ubuntu account. That's the ignition system. Without it, the engine's just sitting there looking pretty. Systemd is what makes it TURN ON automatically.

Sixth — Node.js 22. The fuel. OpenClaw runs on JavaScript, and Node.js is the engine that burns it. No fuel, no voyage.

Seventh — verify EVERYTHING works. Full systems check before we leave dry dock.

Eighth — power settings. Because if your ship falls asleep in the middle of the ocean, your agent goes dark. We're configuring this thing for 24/7 watch duty.

Let's move.

---

## Slide 3 — Ship's Logbook (Part 1)

Before we pick up a single tool — logbook time. Your vocabulary reference. Same drill as before — this is NOT a quiz. This is your cheat sheet. Pin it to the mast and keep it handy.

WSL2. Windows Subsystem for Linux, version 2. This is how we run a full Linux operating system INSIDE your Windows machine. Think of it like adding a second deck to your ship. Same hull, but now you've got a whole new level to work with.

Ubuntu. That's the specific Linux distribution we're installing. There are hundreds of flavors of Linux out there. Ubuntu is the beginner-friendly one. The one with the guardrails. The one that doesn't expect you to already know what you're doing. Perfect for us.

Terminal. Your command line. The text interface where you type commands and things happen. On Windows, that's PowerShell. Inside WSL2, that's the Linux bash shell. Today, you're going to become VERY familiar with both.

Systemd. The service manager for Linux. It's what keeps programs running in the background automatically. OpenClaw's daemon — its always-on background process — NEEDS systemd to start up and keep running without you babysitting it.

Daemon. Pronounced "dee-mon." A program that runs in the background continuously, like a crew member standing watch below deck. You never see them, but they're always there, always working.

And Node.js. The JavaScript runtime. The engine that OpenClaw is built on. You need version 22 or newer. No exceptions.

Don't memorize this. Just know it's here. We'll hit every term naturally as we work through the steps.

---

## Slide 4 — Ship's Logbook (Part 2)

Six more for the logbook. These are the supporting crew.

npm — Node Package Manager. Comes bundled with Node.js. It's the tool that installs and manages all the JavaScript packages OpenClaw needs. Think of it like the supply officer — it goes out, grabs what you need, organizes it, keeps track of inventory.

nvm — Node VERSION Manager. Notice the pattern? npm manages packages, nvm manages which VERSION of Node.js you're running. We use nvm because it makes installing and switching between Node.js versions dead simple. One command. Done.

USB Setup Kit — this is new vocabulary for us. It's simply a USB stick with two files on it: the WSL installer and the Ubuntu image. You prepare it on your main computer, then plug it into the OpenClaw laptop. It's your insurance policy against network problems, broken Microsoft Stores, and all the headaches we've seen in the past.

PATH — this is a list of directories your computer checks when you type a command. If you type "node" and your computer goes "I have no idea what that is," it means Node.js isn't in your PATH. We'll make sure everything lands exactly where it needs to be.

Tailscale — a secure networking tool that creates a private, encrypted tunnel between your devices. Lets you reach your OpenClaw gateway from your phone, another computer, anywhere with internet. It's like having a secret underwater cable that only YOUR ships can use.

And Loopback — 127.0.0.1. Also called "localhost." This is a network address that ONLY your own machine can reach. Nothing from the outside world can touch it. It's a harbor with one dock, and only your ship has the key to the gate.

[pause]

Logbook's stowed. Vocabulary's loaded. But before we crack open those laptops — one important warning.

---

## Slide 5 — Used or Pre-Owned Laptops

Alright, hands up — how many of you are using a laptop that used to belong to someone else? Maybe you bought it used, maybe it was a hand-me-down from work, maybe you snagged it off eBay or Facebook Marketplace. Hands up.

[wait for responses]

If your hand is up, this slide is SPECIFICALLY for you. And if you got your laptop from a workplace — a company, a school, any kind of organization — listen VERY carefully because this could save you hours of headaches.

Here's the thing about corporate laptops. When a company gives you a laptop, their IT department installs management software on it. Group policies that restrict what you can install. MDM enrollment — that stands for Mobile Device Management — which lets the company push rules and updates to the device remotely. Admin restrictions that prevent you from making system changes. Sometimes even monitoring software that reports back to the company.

Now here's the kicker. You might think "but I reset it! I did the factory reset!" And that's great. But a factory reset — "Reset this PC" from Windows Settings — does NOT remove any of that. Not the group policies. Not the MDM enrollment. Not the admin restrictions. NONE of it. A factory reset reinstalls Windows on top of the existing corporate configuration. The company DESIGNED it that way.

[pause]

Three quick checks. One — right-click the Start menu, click System, and look for a domain name. If it says anything other than "WORKGROUP," the laptop is still domain-joined to the old company. Two — go to Settings, Accounts, "Access work or school." If you see any connected organizations there, MDM is still active. Three — try opening PowerShell with Ctrl + Shift + Enter. If admin access is blocked, corporate policy is still in charge.

If ANY of those checks show corporate remnants, the fix is a CLEAN Windows install from USB. Not a reset — a real, from-scratch installation. Download the Media Creation Tool from microsoft.com on a different computer, create a bootable USB, boot from it, choose Custom Install, delete ALL existing partitions, and let Windows start fresh. Takes about 30 to 60 minutes, but it gives you a guaranteed clean machine with full admin access.

Now — even if your laptop is brand new or you're sure it's clean, let's make sure it has the guts for what's coming.

---

## Slide 6 — Check Your Hardware: RAM

Hull inspection time. We need to know what we're working with before we start bolting an engine into this thing.

Everybody do this with me right now. Press Ctrl + Shift + Esc. All three keys at once. That opens Task Manager. Got it? Good. Now click the Performance tab at the top. Then click Memory on the left side.

[pause]

Look at the number in the top-right corner. That's your RAM. That's how much working memory your ship has.

[ask the audience] Shout it out — what number do you see? Who's got 8? Who's got 16? Anyone rocking 32?

[wait for responses]

Here's the breakdown. If you've got 4 gigs or less — rough seas ahead. WSL2 and OpenClaw will be fighting for breathing room. 8 gigs is the MINIMUM. It'll float, but don't expect to be running a dozen browser tabs alongside it. 16 gigs? That's the sweet spot. And 32 or more? More than you'll ever need for OpenClaw.

Quick side note — a Raspberry Pi 5, about a hundred bucks, can actually run OpenClaw with cloud-based models. Silent. Low-power. Always-on. But that's NOT what this course is built around. Your old laptop is the plan.

---

## Slide 7 — Check Your Hardware: Disk Space and Windows Version

Two more inspections. Quick ones.

Disk space first. Press Windows + E to open File Explorer. Click "This PC" on the left. Look at your C: drive. How much free space do you have?

[pause]

Less than 10 gigs? You need to clean house before we proceed. 10 to 20 is tight. 20 to 50 is comfortable. 50 or more? Smooth sailing.

Realistically, 20 gigs of free space and you're golden. WSL2 and Ubuntu together, maybe 5 gigs. Node.js, about 200 megabytes. OpenClaw itself, roughly 500 megs. And then your agent's data grows over time.

Now — Windows version. Press Windows + R. Type "winver." Hit Enter.

[pause]

What you NEED is Windows 10 version 1903 or later. That's Build 18362. Windows 10 22H2 is current. Windows 11 is fully supported too.

[ask the audience] Anyone seeing something older than 1903?

[wait for responses]

If your version is older, you'll need to update Windows first. Settings, Update and Security, Windows Update, install everything available.

Three inspections done. RAM? Check. Disk? Check. Windows? Check. The hull is sound. Let me explain what we're about to install.

---

## Slide 8 — Why WSL2 Is Required

I know what someone in this room is thinking right now. "Why can't I just install OpenClaw directly on Windows? Why do we need this extra Linux stuff?"

Fair question. Here's the answer.

OpenClaw is built for Linux and macOS. The core gateway, the daemon system, the shell commands, the file permissions — ALL of it assumes a Unix-like operating system. The official documentation says it straight: "OpenClaw on Windows is recommended via WSL2."

So what IS WSL2? Windows Subsystem for Linux, version 2. In plain English — it lets you run a REAL Linux operating system inside your Windows machine. Not a simulation. Not an emulator. A real Linux kernel, tightly integrated with Windows.

Here's the analogy I like. Your Windows laptop is an apartment building. Right now, it has one tenant — Windows. WSL2 adds a SECOND tenant — Linux. They share the building, which is your hardware. But they have their own separate apartments — their own file systems, their own processes, their own way of doing things. They're neighbors, not roommates.

After we install WSL2, you'll have a Linux terminal alongside your normal Windows. You'll type OpenClaw commands in the Linux side. Your agent's files will live in the Linux file system. And through ALL of this, your Windows desktop keeps working exactly like it always has.

Two tenants. One building. No conflict. That's the setup. But before we get to the USB kit, there's one thing we need to do first.

---

## Slide 9 — Step 1: Connect to Guest WiFi & Update Windows

Before we install ANYTHING, we need to get your laptop updated. Windows 10 — especially if it's been freshly wiped or factory-reset — is probably missing critical updates. Without them, WSL flat-out refuses to work. You'll get an error that says "OS not supported" and nothing will make sense.

But here's the thing — we're NOT connecting this laptop to your main home WiFi. Ever. This laptop is going to be an always-on device running an AI agent. If it's ever compromised, you want it isolated from your personal devices.

So first — set up a guest network. You can do this from your phone or main computer. Run ipconfig on any Windows machine, look for Default Gateway. Open that address in a browser, log into your router admin panel — the password is usually on a sticker on the router. Find Guest Network settings, enable it, set a password, and make sure "allow guests to access local network" is turned OFF.

[pause]

If your router doesn't support guest networks, no worries — connect to your regular WiFi for now. Module 10 covers network isolation in detail.

Now connect the OpenClaw laptop to the GUEST network. Settings, Network and Internet, Wi-Fi. Connect to the guest network. Not the main one.

Once you're connected — go to **Settings, Update and Security, Windows Update**. And here's the important part — you MUST click the **"Check for updates"** button. It won't search automatically on a fresh install. Click the button, let it find everything, install everything, and restart when it asks you to.

Now — fair warning. This part takes a while. On a freshly wiped laptop, **expect 20 to 30 minutes** for the first round of updates. Sometimes longer. After it restarts, check for updates AGAIN — some updates only appear after earlier ones are installed. You might need to do this two or three times until Windows says "You're up to date." I know that's tedious. But if you skip this, the WSL installer will refuse to work later. Better to wait now than debug later.

[pause — wait for updates to finish, approximately 20-30 minutes]

After the updates are done, your laptop is ready for the real work. Now let's build the USB Setup Kit.

---

## Slide 10 — Step 2: Prepare Your USB Setup Kit

Alright — this is where we do something SMART. Something that saves us from every headache that used to plague this module.

In previous versions of this course, we'd run a command called "wsl --install" and cross our fingers. If the Microsoft Store worked, great. If it didn't — and on pre-owned laptops it OFTEN didn't — students would get error codes, broken downloads, and twenty minutes of troubleshooting. No more.

We're going to prepare EVERYTHING in advance on your main computer. Three files. One USB stick. Done.

Everybody pull up a browser on your MAIN computer — not the OpenClaw laptop. We're downloading two things and grabbing a text file.

First — the WSL installer. Go to github.com/microsoft/WSL/releases. You'll see a list of releases. The latest one is at the top. Under "Assets" — you might need to click to expand that section — you'll see several files listed. You want the one that ends in **x64.msi**. Not the ARM64 one — x64. That's for all standard Intel and AMD laptops. It's about 70 megabytes. Download it.

[pause]

Second — the Ubuntu image. Go to cloud-images.ubuntu.com/wsl/releases/24.04/current/. Look for the file that has "amd64" in the name and ends in ".rootfs.tar.gz." It's about 340 megabytes. Even if you have an Intel processor, you want the "amd64" one — that name just means 64-bit, it works on both Intel and AMD. Download it.

Now — if that page is empty or the link doesn't work, don't panic. Ubuntu moves these files around sometimes. Go up to cloud-images.ubuntu.com/wsl/ — that's the parent directory — and click your way through: releases, then 24.04, then current. The file will be in there. And if the whole site has moved, just search the web for "Ubuntu WSL rootfs download" — you need the .rootfs.tar.gz file for amd64.

[pause for downloads]

There's also a third file — setup-commands.txt. This is a text file with every single command you'll need to type, already written out and ready to copy and paste. No typing long paths. No memorizing anything. Just open the file, copy a command, paste it into PowerShell. That's it.

Now plug in your USB stick and copy ALL THREE files onto it. The .msi, the .tar.gz, and the setup-commands.txt. That's your entire USB Setup Kit. This is your insurance policy. No matter what state the OpenClaw laptop is in — broken Store, weird network, whatever — these three files will get WSL2 and Ubuntu running. Every time.

[ask the audience] Hold up your USB sticks when you've got all three files on them!

[wait for responses]

Beautiful. Now let's move to the OpenClaw laptop.

---

## Slide 11 — Step 3: Install WSL from USB

Plug that USB stick into your OpenClaw laptop. Notice — we haven't connected this laptop to ANY WiFi yet. We don't need to. Everything we need is on the stick.

First thing — open File Explorer, navigate to the USB drive. You should see your three files sitting there. Now, select ALL three files, copy them, and paste them into your **Downloads** folder. You know where Downloads is — it's right there in the left sidebar of File Explorer. Click it, then paste.

[pause]

Why Downloads? Because the setup commands are written to look in your Downloads folder automatically. There's a shortcut built in — `$env:USERPROFILE\Downloads` — that points to YOUR Downloads folder no matter what your Windows username is. So by putting the files in Downloads, every command in that text file works perfectly on any machine. No drive letters to figure out. No paths to edit.

Now — go to your Downloads folder and double-click the .msi file. The WSL installer. You'll get a security prompt — "Do you want to allow this app to make changes?" — click Yes.

[pause]

And... it's done. Did it feel like nothing happened? That's normal. This installer runs silently — no wizard, no progress bar, no "Finish" button. It installs in a few seconds and the window just closes. If you saw a brief flash and then nothing — congratulations, the WSL program is installed.

But we're not done yet. The .msi installed the WSL program, but Windows ALSO needs its virtualization features turned on. Think of it like this — the .msi installed the steering wheel, but we still need to start the engine.

Open PowerShell as administrator. Start menu, type "PowerShell," press Ctrl + Shift + Enter. Click Yes on the permission prompt.

Now open that setup-commands.txt file from your Downloads folder — just double-click it, it opens in Notepad. Find STEP 1 and copy that command. Paste it into PowerShell:

```
& 'C:\Program Files\WSL\wsl.exe' --install --no-distribution
```

You'll see messages about enabling Windows features. When it's done, it'll tell you a restart is needed.

Now — RESTART. Click Start, Power, RESTART. Not Shut Down — RESTART.

[wait for restarts — approximately 2-3 minutes]

---

## Slide 12 — Step 4: Import Ubuntu

Welcome back from reboot! WSL2 is now fully installed — program AND Windows features. But it's like having an apartment building with no tenants — the infrastructure is there, but nobody's moved in yet. Let's bring in Ubuntu.

Open PowerShell as administrator. Start menu, type "PowerShell," and press Ctrl + Shift + Enter. Click Yes on the permission prompt.

[pause]

[ask the audience] Everyone got a blue PowerShell window? Hands up.

[wait for responses]

Good. Now open that setup-commands.txt from your Downloads folder again. We're going to copy and paste two commands from it.

First — STEP 2 from the text file. Copy it and paste it into PowerShell:

```
mkdir C:\WSL\Ubuntu
```

Press Enter. That creates a folder where Ubuntu will live.

Now — STEP 3 from the text file. This is the big one. Copy it and paste it into PowerShell:

```
& 'C:\Program Files\WSL\wsl.exe' --import Ubuntu C:\WSL\Ubuntu "$env:USERPROFILE\Downloads\ubuntu-noble-wsl-amd64-wsl.rootfs.tar.gz"
```

Now — quick explanation of why this works so smoothly. That `$env:USERPROFILE` part? It automatically expands to YOUR user folder — whatever your Windows username is. So if your name is Sarah, it becomes `C:\Users\Sarah\Downloads\...`. If your name is Mike, it becomes `C:\Users\Mike\Downloads\...`. Because you copied the Ubuntu file to your Downloads folder earlier, this command just WORKS. No drive letters to figure out. No paths to type by hand. Just paste and go.

[pause]

You'll wait a moment — maybe 30 seconds to a minute. Then... nothing. No output. No message. Just your prompt back. And that NOTHING? That means SUCCESS. In the Linux world, silence is golden. No news is good news.

Now paste STEP 4 from the text file to verify:

```
& 'C:\Program Files\WSL\wsl.exe' -l -v
```

You should see Ubuntu listed with VERSION 2. Two columns. NAME: Ubuntu. VERSION: 2.

[ask the audience] Who sees Ubuntu, VERSION 2? Hands up!

[wait for responses]

Ubuntu has moved in. The tenant is in the building. Now let's set up their apartment.

---

## Slide 13 — Step 5: Configure Ubuntu (Create User)

Type this in PowerShell:

```
& 'C:\Program Files\WSL\wsl.exe' -d Ubuntu
```

That opens Ubuntu. You'll see a prompt that says "root@" something. Root is the administrator account — the all-powerful user. We don't want to run as root every day. That's like giving every crew member the captain's master key. We need a normal user account.

Now — IMPORTANT. Pasting commands works differently in the Ubuntu terminal. Ctrl+V does NOT work here. Instead, just **right-click** to paste. That's it — right-click and it pastes automatically. This trips up everyone the first time. Right-click to paste. Get it in your muscle memory now.

Type this:

```
adduser openclaw
```

Now — PASSWORD. THIS is the part that trips up ABSOLUTELY everyone the first time, so listen carefully.

When you type your password, NOTHING appears on the screen. No dots. No asterisks. No little stars. NOTHING. The screen looks completely frozen. It is NOT frozen. Linux hides your password input for security. Just type your password blind and press Enter. Then type it again to confirm.

[pause]

Trust the process. Type it. Hit Enter. Type it again. Hit Enter.

It'll ask for Full Name, Room Number, Work Phone — press Enter through all of those. Skip them. Type Y to confirm.

Now give that account admin privileges:

```
usermod -aG sudo openclaw
```

And now the clever part — one command that does TWO things at once:

```
echo -e "[boot]\nsystemd=true\n\n[user]\ndefault=openclaw" > /etc/wsl.conf
```

That sets openclaw as your default user AND enables systemd — the daemon manager we need for OpenClaw. Two birds, one command. Efficient.

Type exit. In PowerShell, type `& 'C:\Program Files\WSL\wsl.exe' --shutdown`. Wait five seconds. Then type `& 'C:\Program Files\WSL\wsl.exe' -d Ubuntu` again. You should now see openclaw@ instead of root@.

[ask the audience] Who's seeing "openclaw@" with a dollar sign? Raise your hand!

[wait for responses]

THAT is your Linux prompt. You are inside Ubuntu, logged in as your user. Welcome aboard the Linux side, crew!

---

## Slide 14 — Step 5: Configure Ubuntu (Start Menu + Verify)

Quick check — click the Start menu and type "ubuntu." Does it show up? If it does and it launches, you're golden — the WSL installer already created the shortcut for you. Skip ahead to the systemd check.

If it does NOT show up — we'll create one. Open File Explorer, type shell:programs in the address bar, press Enter. Right-click in the empty space, New, Shortcut. For the location type: "C:\Program Files\WSL\wsl.exe" -d Ubuntu. With the quotes around the path because of the space in "Program Files." Click Next, name it Ubuntu, click Finish.

Either way — open Ubuntu from the Start Menu and let's verify systemd. Type:

```
systemctl is-system-running
```

If you see "running" — perfect. If you see "degraded" — that's usually fine, some non-critical services had hiccups. If you see "offline" — come find me and we'll check that config.

[pause]

Good news — you can safely remove your USB stick now. We're done with it. Everything from here on uses standard internet, which brings us to our next step.

---

## Slide 15 — Step 7: Update Ubuntu and Install Tools

Two quick maintenance tasks. Think of this as stocking the supply closet.

Open your Ubuntu terminal — Start menu, type Ubuntu, click it. Now run:

```
sudo apt update && sudo apt upgrade -y
```

That refreshes the package list and installs updates. The "-y" flag means "yes, just do it." Now — this takes **five to ten minutes** on the first run. Sometimes longer. A LOT of text will scroll by — hundreds of lines. That's normal. It's downloading and updating the entire operating system. Let it run. Go grab a coffee. Do NOT close the window.

[pause]

When it's done, install the essential tools:

```
sudo apt install -y git curl wget build-essential
```

Git — version control. Curl and wget — download tools. Build-essential — compilation tools that some npm packages need. Belt and suspenders.

Some of these might already be installed. Messages like "git is already the newest version" are fine. Better to have them and not need them.

Supply closet: stocked. Moving on.

---

## Slide 16 — Step 8a: Install nvm

Time to load the fuel. OpenClaw runs on JavaScript, and Node.js is the engine that makes JavaScript work outside a web browser. We need version 22 or newer.

We're using nvm — Node Version Manager. It lets you install, switch between, and manage different versions of Node.js with single commands.

In your Ubuntu terminal, paste this command:

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

That downloads and runs the nvm installer. When it's done, activate it:

```
source ~/.bashrc
```

Then verify:

```
nvm --version
```

You should see "0.40.1". If you see "nvm: command not found" — close the Ubuntu window COMPLETELY, then reopen it. You've got two ways to do that — either type "Ubuntu" in the Start Menu and click it, or go back to PowerShell and paste `& 'C:\Program Files\WSL\wsl.exe' -d Ubuntu`. Either way gets you back in. Then try `nvm --version` again.

---

## Slide 17 — Step 8b: Install Node.js 22

Now install Node.js 22. Quick heads-up — sometimes paste stops working after the nvm install. If right-click paste isn't responding, just close the Ubuntu window and reopen it. Two ways to get back in — type "Ubuntu" in the Start Menu, or go to PowerShell and paste `& 'C:\Program Files\WSL\wsl.exe' -d Ubuntu`. Either one works. Paste will work again once you're back in.

```
nvm install 22
nvm alias default 22
```

The first command downloads and installs Node.js 22. The second makes it your default.

Verify BOTH:

```
node --version
npm --version
```

Node should show v22-point-something. npm should show 10-point-something.

[ask the audience] Raise your hand if both commands gave you version numbers!

[wait for responses]

The fuel's loaded. The engine's running. We're getting closer to launch.

---

## Slide 18 — Step 9a: Power Settings — Disable Sleep

Here's one that people forget about and then WONDER why their agent goes dark at 2 AM. If you want your agent standing watch 24/7, your laptop needs to stay AWAKE.

When Windows sleeps, WSL2 sleeps. When WSL2 sleeps, your agent sleeps. Messages pile up unanswered. Scheduled tasks don't run. Your ship is adrift.

Now listen carefully. There are TWO separate settings that control whether your laptop sleeps. TWO. And you need to change BOTH. Miss one and you're sunk.

Setting number one — the idle sleep timeout. Open Windows Settings — press Windows + I. Go to System, then Power and Sleep. Under Sleep, set "When plugged in, PC goes to sleep after" to NEVER.

[pause]

Setting number TWO — what happens when you CLOSE THE LID. The Settings app does NOT control this. This is a COMPLETELY separate setting in the old Control Panel. And by default? Closing the lid puts the laptop to sleep, regardless of what you just set.

Open the Start menu, type "Control Panel," click it. Go to Hardware and Sound, then Power Options. On the left sidebar, click "Choose what closing the lid does." Set "When I close the lid" to "Do nothing" in BOTH columns. Click Save changes.

[ask the audience] Has everyone found that setting? Raise your hand when you've got "Do nothing" saved.

[wait for responses]

---

## Slide 19 — Step 9b: Hibernate, Display, and Plug In

Now — hibernate. Open PowerShell as administrator — Ctrl + Shift + Enter — and run:

```
powercfg /hibernate off
```

Hibernate can interrupt WSL2. Turn it off.

For the display — you CAN let the screen turn off after a few minutes. The computer itself keeps running. WSL2 keeps running. Your agent keeps running.

And PLEASE — keep this thing plugged in. Running 24/7 on battery is like trying to cross the Atlantic powered by a hamster wheel.

---

## Slide 20 — Step 9c: Power Settings — Verify

Verification. Close your laptop lid. Wait one minute. Open it back up. Log in. Open your UBUNTU terminal and type "uptime." The number should show continuous uptime, not a reset. If WSL2 restarted, one of your two settings didn't take. Go back and check BOTH — the idle timeout in Settings AND the lid close in Control Panel.

---

## Slide 21 — Step 10: Understand the File System Boundary

STOP. Everybody stop what you're doing and listen because this next bit trips up MORE Windows users running WSL2 than almost anything else.

There are TWO separate file systems on your machine now. Two. And knowing which one you're in is CRITICAL.

On one side — the Windows file system. Your familiar C:\Users\YourName\Documents\ world.

On the other side — the Linux file system. /home/openclaw/. A completely separate universe of files inside WSL2.

They CAN see each other. From Linux, you can reach Windows at /mnt/c/. From Windows File Explorer, you can reach Linux at \\wsl$\Ubuntu\home\openclaw\. The bridge exists.

BUT — the golden rule —

OpenClaw's data should live in the LINUX file system. NOT the Windows file system.

Why? Performance. Files in /home/openclaw/ are FAST. Native Linux speed. Files through /mnt/c/ are SLOW. Dramatically slower. Because every file operation has to cross the WSL2 boundary.

Quick tip — type "pwd" in your Ubuntu terminal. If you see "/home/something" — you're in Linux land. Good. If you see "/mnt/c/" — you've wandered into Windows territory. Sail back to /home/.

---

## Slide 22 — Optional: Tailscale and Encryption

This one's optional. If you're only going to access your agent from this laptop, skip this and come back to it later.

BUT — if you want to text your agent from your phone while you're at the grocery store? If you want to check the gateway dashboard from your work computer? Tailscale is your long-range radio system.

Tailscale creates a secure, encrypted private network between your devices. Only YOUR devices. The setup is straightforward:

```
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```

From this laptop — 127.0.0.1. From your phone on Tailscale — 100-point-something. From everywhere else? NO ACCESS. Secure by default.

And while we're talking security — consider disk encryption. BitLocker on Windows Pro, Device Encryption on Windows Home. If that laptop walks off, encrypted data is unreadable.

---

## Slide 23 — Shoals and Sandbars (Troubleshooting)

Before we do our verification checks, let me chart the known hazards. Because we used the USB Setup Kit AND copied everything to Downloads, we've eliminated the TWO most common errors — the Microsoft Store failing and drive letter confusion. Gone. Bypassed entirely.

But there are still a few rocks out there.

Error 0x80370102 — "Virtual Machine Platform is not enabled." Your BIOS has virtualization turned off. WSL2 needs it. The fix: restart, enter BIOS — usually F2, F12, Delete, or Esc during startup — find "Intel Virtualization Technology" or "AMD-V," enable it, save, reboot.

"WSL optional component is not enabled" — this means the enable-components step from Step 2 didn't happen or didn't complete. Go back and run `--install --no-distribution` in admin PowerShell, then restart.

USB stick not detected — try a different USB port. But remember, you already copied the files to Downloads, so the USB is only needed for that initial copy. If you can't get the USB working, you can also download the files directly on the laptop if it has internet.

"node: command not found" — nvm not being loaded. Run "source ~/.bashrc" or close and reopen your Ubuntu terminal.

Password not accepted — you're using your WINDOWS password instead of your LINUX password. Different systems, different passwords.

Laptop sleeps when lid closes — the lid close setting in Control Panel. Two places, remember. Both must be changed.

"Run as admin" unavailable — corporate policy remnants. Clean install from USB is the permanent fix.

These are all charted hazards. Known shoals. If you hit one, you know exactly where you are and how to navigate around it.

---

## Slide 24 — The Verification Checklist

Moment of truth, crew! We've built the ship. We've mounted the engine. We've loaded the fuel. Full systems check.

Seven checks. Run EACH in your Ubuntu terminal.

Check one — WSL2 version: wsl.exe -l -v. Ubuntu, VERSION 2.

Check two — systemd: systemctl is-system-running. "Running" or "degraded."

Check three — Node.js: node --version. Must start with v22.

Check four — npm: npm --version. 10 or higher.

Check five — Git: git --version. Any version number.

Check six — curl: curl --version. Any output.

Check seven — file system: pwd. /home/openclaw, not /mnt/c/.

Seven checks. All green? Then your vessel is SEAWORTHY!

---

## Slide 25 — Hands on Deck (Activity)

ALL HANDS ON DECK! Time to make it official. Work through the checklist and fill in the blanks. This is your ship's certification.

[pause]

Grab your checklist. Work through each item:

Hardware — 8 gigs of RAM, 20 gigs free disk, Windows 1903+.

USB Setup Kit — prepared with both files. Check.

WSL2 — installed from USB, VERSION 2, username created.

systemd — enabled and running.

Node.js + npm — v22 and 10+ installed.

Git — installed.

Power settings — both sleep AND lid close configured.

Network — connected to guest WiFi, not main WiFi.

[ask the audience] Raise your hand when you've got all required items checked. I'll come around and help anyone stuck.

[wait for students to work through checklist — approximately 5-10 minutes]

Bonus for the fast finishers — open File Explorer and navigate to \\wsl$\Ubuntu\home\openclaw\. Replace "openclaw" with your username. You should see your Linux home directory from the Windows side. That's the bridge between the two file systems.

---

## Slide 26 — Treasure Chest (Key Takeaways)

Let's bring this ship out of dry dock. Eight pieces of hard-won knowledge.

One — prepare a USB Setup Kit first. Three files — WSL .msi, Ubuntu .tar.gz, and setup-commands.txt — downloaded on your main computer and copied to a USB stick. This eliminates every Microsoft Store dependency and gives you every command ready to paste.

Two — copy files to Downloads, then install. No drive letters to guess. The commands use a built-in shortcut that finds your Downloads folder automatically. Paste and go.

Three — OpenClaw requires WSL2 on Windows. It runs inside Linux, not directly on Windows. That's the architecture.

Four — systemd is enabled during Ubuntu configuration. One command handles it.

Five — Node.js 22 or newer is required. Install it with nvm for easy version management.

Six — keep OpenClaw's files in the LINUX file system. /home/username/. NOT /mnt/c/. Performance matters.

Seven — disable sleep AND configure the lid close behavior. Two separate settings, two separate places. Both must be changed. That was our gotcha of the day.

Eight — the OpenClaw laptop connects only to guest WiFi. Never to your main home network. Isolation by default.

Every plank is nailed. Every rivet is set. Your ship is BUILT, crew.

---

## Slide 27 — Next Port of Call: Module 03 — Installing OpenClaw

[pause — let the energy build]

Look at what you've done today. You walked into this room with a regular Windows laptop and a USB stick. You're walking out with a PREPARED VESSEL. WSL2 installed from USB. Ubuntu imported and configured. Systemd enabled. Node.js 22 fueled up and ready. Tools stocked. Power settings configured. Guest WiFi connected. Your ship is sitting in dry dock, gleaming, waiting to be launched.

And the best part? No one hit a Microsoft Store error. No one spent twenty minutes troubleshooting a download that wouldn't start. No one had to type a single command from scratch — it was all copy and paste. Because we prepared. We put everything on a USB stick, we copied files to Downloads, and every command just WORKED. That's the power of preparation.

Module 03? Module 03 is LAUNCH DAY.

We're going to run the actual OpenClaw installer. We're going to walk through the onboarding wizard step by step. We're going to watch the daemon start up for the first time. And when that gateway comes online and starts listening for messages?

That's the moment your ship hits open water.

[pause]

Before you leave — make SURE your verification checklist is complete. All seven checks passing. If something's red, come find me now. Don't leave the shipyard with a hole in the hull.

Fair winds and calm seas, crew. Next time — we bring your agent to LIFE.
