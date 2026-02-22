# Module 02 Teaching Script: Preparing Your Old Laptop

**Total speaking time:** ~30 minutes (plus 10-minute hands-on activity)
**Slides:** 30 (deck has 30 slides; script groups related slides into 23 teaching sections)

---

## Slide 1 — Title: Module 02 — Preparing Your Laptop

Alright, crew — welcome back aboard! If you're here, that means you survived Module 00 and Module 01. You know what OpenClaw is. You know what it can do. You know what it can do TO you if you're not careful. You've stared into the abyss and you're still standing. Good. I respect that. You've got spine.

Now — today? Today is DIFFERENT. Today we stop talking and start BUILDING. We are in the shipyard, crew. We're rolling up our sleeves, we're grabbing hammers and nails and tar and timber, and we are constructing the vessel that's going to carry us for the rest of this voyage. No more theory. No more "imagine if." Today we get our hands dirty.

I know what some of you are thinking. "It's a setup module. It's going to be boring. It's just clicking through installers and waiting for progress bars." And sure — if you squint at it sideways, that's technically what we're doing. But let me reframe that for you.

Every great ship starts as a pile of wood and iron on a dry dock. You don't get to cross the Atlantic by WISHING you had a ship. You build it. Plank by plank. Nail by nail. And today? Every single step we take — checking your hardware, installing WSL2, enabling systemd, getting Node.js running — each one is a plank in the hull of your vessel. Skip a step, and you've got a hole below the waterline. Do them all RIGHT, and you've got a ship that'll carry you across any ocean.

[pause]

So grab your laptops. Open them up. Power them on. We're doing this TOGETHER, step by step, and nobody leaves the shipyard until their vessel is seaworthy. Let's build!

---

## Slide 2 — Navigation Chart (Objectives)

Here's today's chart — eight ports of call. Eight things you'll be able to do by the time we drop anchor today.

First — you'll verify that your laptop actually has the guts for this. RAM, disk space, Windows version. Think of it as a hull inspection. Is this boat going to float or is it going to sink the moment it hits water? We need to know BEFORE we start loading cargo.

Second — you'll understand WHY we need WSL2 and what it actually does. Not just "install this because I said so." You'll understand the engineering. The WHY behind the what.

Third — you'll INSTALL WSL2 with Ubuntu. This is the big one. This is mounting the engine into the hull. The moment your laptop transforms from a regular Windows machine into something that can run OpenClaw.

Fourth — you'll enable systemd. That's the ignition system. Without it, the engine's just sitting there looking pretty. Systemd is what makes it TURN ON automatically.

Fifth — Node.js 22. The fuel. OpenClaw runs on JavaScript, and Node.js is the engine that burns it. No fuel, no voyage. Simple as that.

Sixth — verify EVERYTHING works. Full systems check before we leave dry dock.

Seventh — power settings. Because if your ship falls asleep in the middle of the ocean, your agent goes dark. We're configuring this thing for 24/7 watch duty.

Eighth — optionally, Tailscale. That's your long-range radio. Lets you reach your agent from anywhere in the world.

Steps one through six are REQUIRED. Nobody's leaving without those. Seven and eight are optional but recommended if you want your agent standing watch around the clock. Let's move.

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

Five more for the logbook. These are the supporting crew.

npm — Node Package Manager. Comes bundled with Node.js. It's the tool that installs and manages all the JavaScript packages OpenClaw needs. Think of it like the supply officer — it goes out, grabs what you need, organizes it, keeps track of inventory.

nvm — Node VERSION Manager. Notice the pattern? npm manages packages, nvm manages which VERSION of Node.js you're running. We use nvm because it makes installing and switching between Node.js versions dead simple. One command. Done.

PATH — this is a list of directories your computer checks when you type a command. If you type "node" and your computer goes "I have no idea what that is," it means Node.js isn't in your PATH. We'll make sure everything lands exactly where it needs to be.

Tailscale — a secure networking tool that creates a private, encrypted tunnel between your devices. Lets you reach your OpenClaw gateway from your phone, another computer, anywhere with internet. It's like having a secret underwater cable that only YOUR ships can use.

And Loopback — 127.0.0.1. Also called "localhost." This is a network address that ONLY your own machine can reach. Nothing from the outside world can touch it. It's a harbor with one dock, and only your ship has the key to the gate.

[pause]

Logbook's stowed. Vocabulary's loaded. But before we crack open those laptops — two important warnings.

---

## Slide 5 — Used or Pre-Owned Laptops (Slides 5-6)

Alright, hands up — how many of you are using a laptop that used to belong to someone else? Maybe you bought it used, maybe it was a hand-me-down from work, maybe you snagged it off eBay or Facebook Marketplace. Hands up.

[wait for responses]

If your hand is up, this slide is SPECIFICALLY for you. And if you got your laptop from a workplace — a company, a school, any kind of organization — listen VERY carefully because this could save you hours of headaches.

Here's the thing about corporate laptops. When a company gives you a laptop, their IT department installs management software on it. Group policies that restrict what you can install. MDM enrollment — that stands for Mobile Device Management — which lets the company push rules and updates to the device remotely. Admin restrictions that prevent you from making system changes. Sometimes even monitoring software that reports back to the company.

Now here's the kicker. You might think "but I reset it! I did the factory reset!" And that's great. But a factory reset — "Reset this PC" from Windows Settings — does NOT remove any of that. Not the group policies. Not the MDM enrollment. Not the admin restrictions. NONE of it. A factory reset reinstalls Windows on top of the existing corporate configuration. The company DESIGNED it that way. They don't WANT employees removing management by resetting their machines.

So if you got a corporate laptop and you "wiped it" with a factory reset, you're still running a corporate-managed machine. Which means when you try to run PowerShell as administrator and it says "the item you selected is unavailable" — THAT'S why.

[pause]

Three quick checks. One — right-click the Start menu, click System, and look for a domain name. If it says anything other than "WORKGROUP," the laptop is still domain-joined to the old company. Two — go to Settings, Accounts, "Access work or school." If you see any connected organizations there, MDM is still active. Three — try opening PowerShell with Ctrl + Shift + Enter. If admin access is blocked, corporate policy is still in charge.

If ANY of those checks show corporate remnants, the fix is a CLEAN Windows install from USB. Not a reset — a real, from-scratch installation. Download the Media Creation Tool from microsoft.com on a different computer, create a bootable USB, boot from it, choose Custom Install, delete ALL existing partitions, and let Windows start fresh. Takes about 30 to 60 minutes, but it gives you a guaranteed clean machine with full admin access.

I know that sounds like a big step. But think of it this way — you're about to give an AI agent access to run shell commands on this machine. You want to KNOW that machine is clean, that nothing's phoning home, and that YOU have full control. Start with a clean deck.

Now — even if your laptop is brand new or you're sure it's clean, there's one more thing to do BEFORE we connect it to the internet.

---

## Slide 5 (continued) — Network Setup: Guest WiFi First

Your OpenClaw laptop needs permanent internet. Not just for setup — forever. API calls to your AI provider, Telegram messages, web searches for morning briefings — all of that needs a live connection. You can't just connect for setup and disconnect.

So the question is — WHICH network should this laptop live on?

If you connect it to your regular home WiFi, it sits on the same network as your phone, your personal laptop, your smart TV, maybe your smart home devices. They can all see each other. And if the OpenClaw laptop is ever compromised — through a prompt injection attack, a malicious skill, even leftover corporate software — that attacker can potentially reach your other devices too.

The fix is simple. Most home routers have a GUEST NETWORK feature. A guest network gives internet access but ISOLATES the device from everything else on your network. It's like putting the OpenClaw laptop in a separate harbor — it can still reach the open ocean, but it can't wander into the docks where your personal ships are moored.

Set this up BEFORE connecting the OpenClaw laptop to anything. First, you need your router's address. Open PowerShell and type ipconfig — look for the line that says Default Gateway. That's your router's address. It might be 192.168.1.1, it might be 10.0.0.1, it might be something else entirely — it varies by ISP and router brand. Type that address into a browser and you'll get the router admin page. The login password is usually on a sticker on the router itself. Find the guest network settings, enable it, set a password, and make sure "allow guests to access local network" is turned OFF. That last part is the isolation.

Then connect the OpenClaw laptop to the GUEST network. Keep your personal devices on the main network. Done.

[pause]

If you ALREADY connected the laptop to your main WiFi — no panic, just switch it to the guest network when you can, and then go to Settings, Network and Internet, Wi-Fi, Manage known networks, find your main network, and hit Forget. That removes the saved password so it won't silently reconnect to your main network later.

If your router doesn't support guest networks, don't worry — you can still proceed. Module 10 covers network isolation in detail with more advanced options. But if you CAN do it now, do it now. It takes five minutes and it's worth it.

Alright — NOW let's crack open those laptops. It's inspection time.

---

## Slide 6 — Check Your Hardware: RAM

First thing's first — hull inspection. We need to know what we're working with before we start bolting an engine into this thing.

Everybody do this with me right now. Press Ctrl + Shift + Esc. All three keys at once. That opens Task Manager. Got it? Good. Now click the Performance tab at the top. Then click Memory on the left side.

[pause]

Look at the number in the top-right corner. That's your RAM. That's how much working memory your ship has.

[ask the audience] Shout it out — what number do you see? Who's got 8? Who's got 16? Anyone rocking 32?

[wait for responses]

Here's the breakdown. If you've got 4 gigs or less — rough seas ahead, I'm not gonna lie. WSL2 and OpenClaw will be fighting each other for breathing room. It CAN work, but you'll feel it. 8 gigs is the MINIMUM. It'll float, but don't expect to be running a dozen browser tabs alongside it. 16 gigs? That's the sweet spot. That's a ship built for open water. You've got plenty of headroom. And 32 or more? You absolute overachiever. That's more than you'll ever need for OpenClaw, but it'll be gorgeous if you ever want to run local AI models down the road.

Now — quick side note for anyone thinking "what if I don't HAVE an old laptop?" A Raspberry Pi 5, about a hundred bucks, can actually run OpenClaw with cloud-based models. Silent. Low-power. Tiny. Always-on. Some people in the community pair it with a smart plug for remote restarts. But that's NOT what this course is built around. Your old laptop is the plan. The Pi is just a fun option for later.

Let's check the next gauge.

---

## Slide 7 — Check Your Hardware: Disk Space and Windows Version

Two more inspections. Quick ones.

Disk space first. Press Windows + E to open File Explorer. Click "This PC" on the left. Look at your C: drive. How much free space do you have?

[pause]

Less than 10 gigs? You need to clean house before we proceed. Delete some files, move some stuff to an external drive, make room. 10 to 20 gigs is tight — it'll work, but you're leaving yourself no margin for error. 20 to 50 is comfortable. 50 or more? Smooth sailing. You've got room for EVERYTHING.

Here's what actually eats the space: WSL2 and Ubuntu together, maybe 2 to 5 gigs. Node.js, about 200 megabytes. OpenClaw itself, roughly 500 megs. And then your agent's data — transcripts, memory, conversations — that grows over time. Figure 1 to 10 gigs depending on how chatty you are with your agent. So realistically, 20 gigs of free space and you're golden.

Now — Windows version. This is CRITICAL. Press Windows + R. Type "winver" — W-I-N-V-E-R. Hit Enter.

[pause]

A window pops up showing your Windows version. What you NEED is Windows 10 version 1903 or later. That's Build 18362. If you've got Windows 10 version 2004 or later, even better — that gives us the simplified installation command that makes our lives way easier. Windows 10 22H2 is current. Windows 11 is fully supported too.

[ask the audience] Anyone seeing something older than 1903? Anybody on an ancient build?

[wait for responses]

If your version is older, you'll need to update Windows first. Settings, Update and Security, Windows Update, install everything available. Do that BEFORE our next step.

Three inspections done. RAM? Check. Disk? Check. Windows? Check. The hull is sound. Time to install the engine.

---

## Slide 8 — Why WSL2 Is Required

But first — I owe you an explanation. Because I know what someone in this room is thinking right now. "Why can't I just install OpenClaw directly on Windows? Why do we need this extra Linux stuff? This feels like unnecessary work."

Fair question. Here's the answer, and I'm going to be blunt about it.

OpenClaw is built for Linux and macOS. The core gateway, the daemon system, the shell commands, the file permissions — ALL of it assumes a Unix-like operating system under the hood. The official documentation says it straight: "OpenClaw on Windows is recommended via WSL2." There IS a PowerShell install script, but the community consensus is clear — WSL2 is the way.

So what IS WSL2? It stands for Windows Subsystem for Linux, version 2. In plain English — it lets you run a REAL Linux operating system inside your Windows machine. Not a simulation. Not an emulator. A real Linux kernel, tightly integrated with Windows.

Here's the analogy I like. Your Windows laptop is an apartment building. Right now, it has one tenant — Windows. WSL2 adds a SECOND tenant — Linux. They share the building, which is your hardware. But they have their own separate apartments — their own file systems, their own processes, their own way of doing things. They're neighbors, not roommates. They can knock on each other's doors when they need something, but they've got their own space.

After we install WSL2, you'll have a Linux terminal sitting RIGHT alongside your normal Windows. You'll type OpenClaw commands in the Linux side. Your agent's files will live in the Linux file system. The gateway will run as a Linux daemon. And through ALL of this, your Windows desktop keeps working exactly like it always has. You won't even notice WSL2 is there unless you open the terminal.

Two tenants. One building. No conflict. That's the setup. Now let's build it.

---

## Slide 9 — Step 1: Open PowerShell as Administrator

Alright — tools down, eyes on me. This is where we start the REAL work. Step one, and I need EVERYONE to follow along. Do not get ahead. Do not freestyle. We do this TOGETHER.

Click your Start menu. The Windows icon, bottom-left corner of your screen. Now type "PowerShell." You'll see Windows PowerShell appear in the results. Here's the crucial part — do NOT just click it. RIGHT-CLICK on it. Then click "Run as administrator."

[pause]

A blue dialog box pops up. "Do you want to allow this app to make changes to your device?" Click YES.

[ask the audience] Has everyone got a blue PowerShell window open? Raise your hand if you're there.

[wait for responses]

You should see something like "PS C:\WINDOWS\system32>" with a blinking cursor. That's your PowerShell prompt. That blinking cursor is your ship's wheel. Every command you type here is an order to the ship. And right now, we're running as administrator — which means we have captain's authority. Full power. We need that for what comes next.

If anyone's getting an error or doesn't see the administrator prompt — flag me down. We need everyone at this exact same spot before we proceed. Nobody gets left at the dock.

[pause]

Good? Good. Next command. Here's where the magic happens.

---

## Slide 10 — Step 1: Install WSL with Ubuntu

This is it, crew. One command. ONE command, and your laptop transforms from a regular Windows machine into something that can run OpenClaw. Are you ready? Type this EXACTLY as I say it:

W-S-L, space, dash-dash-install.

```
wsl --install
```

Hit Enter.

[pause]

Now WATCH your screen. What's happening right now is beautiful. Windows is enabling the WSL feature. It's downloading the WSL2 Linux kernel. It's downloading and installing Ubuntu. It's setting WSL2 as the default version. All from that one command. One command! That's four major system changes in six characters. If that doesn't make you feel like a captain issuing orders, nothing will.

You should see messages about "Installing: Virtual Machine Platform," "Installing: Windows Subsystem for Linux," "Installing: Ubuntu." And then the big one — "The requested operation is successful. Changes will not be effective until the system is restarted."

NOW — hands up if you see an error code 0x80072EE7 next to the Ubuntu component. Anyone?

[wait for responses]

If you got that error — don't worry, don't panic, and DEFINITELY don't spend an hour trying to fix the Microsoft Store. The Store is frequently broken on pre-owned laptops. We have a fallback that works on ANY computer. I'll walk you through it after the reboot. For now, the WSL2 kernel DID install successfully — it's just Ubuntu that couldn't download. We'll grab Ubuntu a different way.

[pause]

That last part is NON-NEGOTIABLE. You MUST restart your computer for this to take effect. Not shut down — RESTART. There's a difference. Shut down on modern Windows doesn't fully clear the state. Restart does. So — save any open work. Close your tabs. Click Start, Power, RESTART.

[pause]

I'll give everyone two minutes to restart. When you come back up, we'll complete the Ubuntu setup together. Go ahead — restart now.

[wait for restarts — approximately 2-3 minutes]

---

## Slide 11 — Step 1: Complete Ubuntu Setup

Welcome back from reboot! Now — two groups of people in this room right now.

GROUP ONE: Your wsl --install worked perfectly. Either a terminal window popped up automatically asking you to create a username and password, or you can click Start, type "Ubuntu," and the app opens. If that's you — great, stay right there.

GROUP TWO: You got that 0x80072EE7 error. Ubuntu didn't download. If that's you — don't touch anything yet. I'm coming to you in a moment.

[pause]

GROUP ONE — let's get you set up first. You should see a message that says "Please create a default UNIX user account." Type a simple, lowercase username. No spaces. No capitals. Something like "openclaw." Press Enter.

Now — PASSWORD. THIS is the part that trips up ABSOLUTELY everyone the first time, so listen carefully.

When you type your password, NOTHING appears on the screen. No dots. No asterisks. No little stars. NOTHING. The screen looks completely frozen. It is NOT frozen. Linux hides your password input for security. Just type your password blind and press Enter. Then type it again to confirm.

[pause]

Trust the process. Type it. Hit Enter. Type it again. Hit Enter.

GROUP ONE — you should now see a prompt like "openclaw@YOURPC" with a dollar sign. That's your Linux prompt. You're inside Ubuntu. Welcome aboard! Hold tight while I help Group Two.

[pause]

GROUP TWO — here's your path. We're going to download Ubuntu directly from the people who make it. No Microsoft Store needed.

Step one. Open your web browser — Edge, Chrome, whatever you've got. Go to cloud-images.ubuntu.com/wsl/noble/current/ — I'll spell it out and it's on the slide. On that page, click the file that has "amd64" in the name and ends in ".rootfs.tar.gz." It's the biggest file on the page, about 500 megabytes. AMD, not ARM — even if you have an Intel processor, you want the AMD one. Let that download.

[pause for download — 1-3 minutes depending on speed]

Step two. In your admin PowerShell, type: mkdir C:\WSL\Ubuntu — press Enter. Then type: wsl --import Ubuntu C:\WSL\Ubuntu — and here's the trick — DON'T press Enter yet. Open File Explorer, go to your Downloads folder, find the file you just downloaded, and DRAG it onto the PowerShell window. It fills in the full path for you. NOW press Enter.

If drag doesn't work, type the beginning of the path up to "ubuntu" and press Tab — PowerShell auto-completes it.

No output means success. Type: wsl -l -v — you should see Ubuntu, VERSION 2.

[pause]

Step three. Type: wsl -d Ubuntu — that opens Ubuntu. You'll see a root@ prompt. Now you need to create your user account, just like Group One did. Type these commands one at a time:

adduser openclaw — it asks for a password. Remember, NOTHING shows when you type. That's normal. Set the password, then press Enter through all the optional stuff like Full Name, Room Number — skip all of it. Type Y to confirm.

Then: usermod -aG sudo openclaw

Then: echo -e "[user]\ndefault=openclaw" > /etc/wsl.conf

That last one makes openclaw your default user so you don't log in as root every time.

Type exit. In PowerShell, type wsl --shutdown. Wait a few seconds. Then type wsl -d Ubuntu again. You should now see openclaw@ instead of root@.

[pause]

Last thing for Group Two — Ubuntu won't appear in your Start menu because we didn't use the Store. Let's fix that. Open File Explorer, type shell:programs in the address bar, press Enter. Right-click in the empty space, New, Shortcut. For the location type: C:\Windows\System32\wsl.exe -d Ubuntu. Click Next, name it Ubuntu, click Finish. Now you can open Ubuntu from the Start menu like everyone else. It opens as a command prompt window — that's your Linux terminal.

[pause]

[ask the audience] Both groups — who's got a prompt that shows "openclaw@" with a dollar sign? Raise your hand!

[wait for responses]

THAT is your Linux prompt. You are inside Ubuntu. Welcome aboard the Linux side, crew! WSL2 is installed and running. That dollar sign prompt is your new command center.

---

## Slide 12 — Step 2: Enable systemd

Alright — engine's mounted. But right now it's just sitting there. We need an ignition system. That's what systemd is. Without it, the OpenClaw daemon can't start automatically. And an agent that can't start automatically is an agent that needs you to babysit it every time your computer reboots. That's not a crew member — that's a liability.

Here's the thing — WSL2 does NOT enable systemd by default. We have to flip that switch ourselves. And we're going to do it by editing a tiny configuration file. Two lines. That's all.

In your Ubuntu terminal, type this command:

```
sudo nano /etc/wsl.conf
```

Let me break that down for anyone whose eyes just glazed over. "sudo" means "run this as administrator." Same concept as running PowerShell as admin earlier — captain's authority. "nano" is a simple text editor that runs right in the terminal. And "/etc/wsl.conf" is the file we're editing.

It's going to ask for your password — the LINUX password you just created, NOT your Windows password. Different tenant, different key. Remember, nothing appears on screen when you type it. Trust the process.

[pause]

Now you're inside the nano text editor. It might look a little alien if you've never used a terminal editor before. That's okay. Just type these two lines EXACTLY:

Line one: `[boot]`
Line two: `systemd=true`

That's it. Two lines. That's the entire ignition system for your daemon.

Now to save and exit — Ctrl + O to save. That's the letter O, not zero. Hit Enter to confirm the filename. Then Ctrl + X to exit.

You're back at your Linux prompt. Beautiful. Now we need to restart WSL2 for this to take effect. Open a POWERSHELL window — not Ubuntu, PowerShell — and type:

```
wsl --shutdown
```

Wait five seconds. Then go back to Ubuntu — Start menu, type Ubuntu, click it. And verify systemd is working by typing:

```
systemctl is-system-running
```

If you see "running" — you're golden. If you see "degraded" — that's usually fine too. It means some non-critical background services had minor hiccups, but systemd itself is working. If you see "offline" — something went wrong. Come find me and we'll check that config file together.

[pause]

Ignition system: ONLINE. Your daemon will be able to start automatically when we install OpenClaw. One more major component to go.

---

## Slide 13 — Step 3: Install Node.js 22+

Time to load the fuel. OpenClaw runs on JavaScript, and Node.js is the engine that makes JavaScript work outside a web browser. We need version 22 or newer. Anything older and OpenClaw won't even launch.

Now — we're NOT going to download Node.js from a website like some kind of landlubber. We're going to use nvm — Node Version Manager. It's the smart way. The recommended way. It lets you install, switch between, and manage different versions of Node.js with single commands. If version 23 comes out tomorrow and you need it? One command. Done. That's the power of nvm.

Three steps. Follow along.

Step one — install nvm. In your Ubuntu terminal, paste this command:

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

That downloads and runs the nvm installer. You'll see some text scrolling by — downloading, installing, configuring. When it's done, it'll tell you to restart your terminal or run a source command.

Step two — activate nvm. Type:

```
source ~/.bashrc
```

Then verify it worked:

```
nvm --version
```

You should see "0.40.1". If you see "nvm: command not found" — close your Ubuntu terminal COMPLETELY. Not minimize — close. Then reopen it and try again. Sometimes it just needs a fresh start.

Step three — install Node.js 22:

```
nvm install 22
nvm alias default 22
```

The first command downloads and installs Node.js 22. The second makes it your default — so every time you open a terminal, Node.js 22 is ready and waiting.

Now verify BOTH:

```
node --version
npm --version
```

Node should show v22-point-something. npm should show 10-point-something. As long as node starts with v22, you're fueled up and ready to sail.

[ask the audience] Raise your hand if both commands gave you version numbers. Beautiful! Anyone getting "command not found?" Flag me down.

[wait for responses]

The fuel's loaded. The engine's running. We're getting closer to launch.

---

## Slide 14 — Steps 4 and 5: Update Packages and Install Tools

Two quick maintenance tasks before we move on. Think of this as stocking the supply closet — making sure we've got all the provisions we need for the voyage ahead.

First — update Ubuntu's built-in packages. The copy of Ubuntu we installed might not have the latest versions of everything. Let's fix that:

```
sudo apt update && sudo apt upgrade -y
```

That first part refreshes the list of available packages — like checking the supply manifest. The second part actually installs the updates. The "-y" flag means "yes, just do it, don't ask me to confirm every single one." This takes two to five minutes depending on your internet speed. You'll see a LOT of text scrolling by. That's normal. Let it run. Go stretch your legs, pour some coffee, do some jumping jacks — whatever keeps you sane during a loading screen.

[pause]

When it's done, your prompt comes back. Now — essential tools:

```
sudo apt install -y git curl wget build-essential
```

Four tools, each one a different piece of kit for your ship.

Git — version control. You'll use this for backing up your OpenClaw workspace. Think of it as your ship's logbook system — keeping records of every change, every update, so you can always go back if something goes sideways.

Curl and wget — download tools. The OpenClaw installer uses these to fetch what it needs from the internet. Two tools that do similar things, because some scripts prefer one over the other. Belt and suspenders.

Build-essential — compilation tools. Some npm packages need to compile native code during installation. Without build-essential, those installs will fail with cryptic error messages that'll make you want to throw your laptop into the ocean. So we install it now and prevent that drama entirely.

Some of these might already be installed — you'll see messages like "git is already the newest version." That's fine. No harm done. Better to have them and not need them than need them and not have them.

Supply closet: stocked. Moving on.

---

## Slide 15 — Step 6: Configure Power Settings (Slides 19-21)

Here's one that people forget about and then WONDER why their agent goes dark at 2 AM. If you want your agent standing watch 24/7 — always listening, always ready, always running scheduled tasks — your laptop needs to stay AWAKE. Windows, by default, puts the computer to sleep. Which is great for saving battery. And TERRIBLE for running a daemon that's supposed to be your always-on digital crew member.

When Windows sleeps, WSL2 sleeps. When WSL2 sleeps, your agent sleeps. When your agent sleeps, nobody's manning the helm. Messages pile up unanswered. Scheduled tasks don't run. Your morning briefing never arrives. Your ship is adrift.

Now here's the thing — and this is the part that trips up EVERYONE, and I mean everyone, so listen carefully. There are TWO separate settings that control whether your laptop sleeps. TWO. And you need to change BOTH of them. Miss one and you're sunk.

Setting number one — the idle sleep timeout. This is the one most guides tell you about. Open Windows Settings — press Windows + I. Go to System, then Power and Sleep. Under the Sleep section, set "When plugged in, PC goes to sleep after" to NEVER. If there's a battery option, set that to Never too. This controls what happens when you WALK AWAY from your laptop. Good. That's done.

[pause]

But here's the gotcha. Setting number TWO — what happens when you CLOSE THE LID. The Settings app does NOT control this. This is a COMPLETELY separate setting, buried in the OLD Control Panel. And by default? Closing the lid puts the laptop to sleep. Regardless of what you just set in Settings. You could set every sleep option in the universe to Never, and the MOMENT you close that lid, your laptop goes to sleep anyway.

So let's fix it. Open the Start menu, type "Control Panel," click it. Go to Hardware and Sound, then Power Options. On the left sidebar, click "Choose what closing the lid does." Now look at the "When I close the lid" row. Set BOTH columns — On battery AND Plugged in — to "Do nothing." Click Save changes.

[ask the audience] Has everyone found that setting? It's in the old-school Control Panel, NOT the modern Settings app. Two different places, two different settings, and BOTH have to be changed. Raise your hand when you've got "Do nothing" saved.

[wait for responses]

[pause]

And PLEASE — keep this thing plugged in. Running 24/7 on battery is like trying to cross the Atlantic powered by a hamster wheel. It's technically running, but it's not going to end well.

Now — hibernate. Open PowerShell as administrator — and I mean ADMINISTRATOR. Start menu, type PowerShell, RIGHT-CLICK, "Run as administrator." If you just click it normally, the next command will yell at you about needing admin privileges. You need captain's authority for this one.

```
powercfg /hibernate off
```

Hibernate can interrupt WSL2, and it's basically sleep's more aggressive cousin. Turn it off.

For the display — you CAN let the screen turn off after a few minutes. That's just the display going dark to save power. The computer itself keeps running. WSL2 keeps running. Your agent keeps running. The ship's still sailing even when the lights on deck go out.

Now — verification. And this is important — we're testing with the LID, not just a screen lock. Close your laptop lid. Wait one minute. Open it back up. Log in. Open your UBUNTU terminal — not PowerShell, the Ubuntu terminal — and type "uptime." The number should show continuous uptime, not a reset. If WSL2 restarted and shows a fresh boot time, one of your two settings didn't take. Go back and check BOTH — the idle timeout in Settings AND the lid close in Control Panel.

---

## Slide 16 — Step 7: Understand the File System Boundary

STOP. Everybody stop what you're doing and listen because this next bit trips up MORE Windows users running WSL2 than almost anything else. And the mistake is invisible — you won't know you made it until things start running slow and you can't figure out why.

There are TWO separate file systems on your machine now. Two. And knowing which one you're in is CRITICAL.

On one side — the Windows file system. Your familiar C:\Users\YourName\Documents\ world. Everything you've always known. Your desktop, your downloads, your regular files.

On the other side — the Linux file system. /home/openclaw/. A completely separate universe of files living inside WSL2.

Now here's the tricky part — they CAN see each other. From Linux, you can reach Windows files at /mnt/c/Users/YourName/. From Windows File Explorer, you can reach Linux files at \\wsl$\Ubuntu\home\openclaw\. The bridge exists. They can talk to each other.

BUT — and this is the golden rule, so tattoo it somewhere —

OpenClaw's data should live in the LINUX file system. NOT the Windows file system.

Why? Performance. Files in /home/openclaw/ are FAST. Native Linux speed. Files accessed through /mnt/c/ are SLOW. Dramatically slower. Because every single file operation has to cross the WSL2 boundary, and that boundary has a toll booth that adds real, measurable latency. The official OpenClaw docs say it explicitly: store ~/.openclaw inside the WSL filesystem, not in /mnt/c/.

Quick tip — if you're ever lost and don't know which side you're on, type "pwd" in your Ubuntu terminal. If you see "/home/something" — you're in Linux land. Good. If you see "/mnt/c/" — you've wandered into Windows territory. Sail back to /home/.

[pause]

When we install OpenClaw in the next module, it'll create its files in /home/openclaw/.openclaw/. That's EXACTLY where they belong. Don't move them. Don't try to put them in your Windows Documents folder. Keep the cargo in the right hold.

---

## Slide 17 — Step 8: Tailscale (Optional)

Alright — this one's optional. I want to be clear about that up front. If you're only going to access your agent from this laptop and nowhere else, you can skip this step entirely and come back to it later. No judgment. Your ship still sails without it.

BUT — if you want to text your agent from your phone while you're at the grocery store? If you want to check the gateway dashboard from your work computer? If you want your agent reachable from ANYWHERE, not just the machine it's running on? Then Tailscale is your long-range radio system.

Tailscale creates a secure, encrypted private network between your devices. Only YOUR devices. Nobody else can see it. Nobody else can access it. It's like an underwater cable that only your fleet uses. Your laptop gets a Tailscale address, your phone gets one, and suddenly they can talk to each other no matter where in the world they are.

The setup is straightforward. Create a free account at tailscale.com. Install the Windows app from their website. Then install it inside WSL2:

```
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```

That second command gives you a URL to open in your browser to authorize the device. Open it, click approve, done.

Once it's running, here's what access looks like. From this laptop — you reach OpenClaw at 127.0.0.1, the loopback address. Local only. From your phone on the Tailscale network — you reach it at 100-point-something-something, the Tailscale address. From everywhere else without Tailscale? NO ACCESS. Secure by default. That's the beauty of it. We'll configure the exact addresses when we install the gateway in Module 03.

One more thing while we're talking about security — if your device is going to store API keys, personal data, and conversation history, consider enabling disk encryption. BitLocker on Windows Pro, Device Encryption on Windows Home, FileVault on Mac. If that laptop ever walks off, encrypted data is unreadable without your password. Smart insurance for a ship carrying valuable cargo.

---

## Slide 18 — Step 9: Dedicated User Account (Optional)

One more optional step — and this one's for the security-minded among you. Remember Module 01? Principle 2 — Least Privilege? The idea that you give things ONLY the access they need and nothing more?

Here's how that applies. Right now, if we install OpenClaw under YOUR Linux user account, the agent has access to everything in your home directory. All your files. All your stuff. If something goes haywire — and things DO go haywire sometimes, this is software after all — the blast radius is your entire home directory.

Creating a DEDICATED user account for OpenClaw is like putting the powder magazine in a separate compartment on the ship. If something explodes, the damage stays contained. The rest of the ship survives.

The command is simple:

```
sudo adduser aslan
```

Use whatever name you want. Set a password. Skip the optional fields by pressing Enter through them. Type Y to confirm. Done.

Then to switch into that account:

```
su - aslan
```

Your prompt changes to show the new username. When we install OpenClaw in Module 03, we'd install it under THIS account. Separate home directory. Separate files. Separate permissions. Clean isolation.

Type "exit" to go back to your regular account.

Now — if you want to keep things simple for now, skip this. It's not required. You can always set this up later. And if you're planning to use Docker sandboxing in Module 10, that provides even stronger isolation. This is just an extra layer for anyone who likes their security in depth.

---

## Slide 19 — Shoals and Sandbars (Troubleshooting)

Before we do our verification checks, let me chart out the KNOWN hazards. These are the rocks that people run aground on most often. If you hit ANY of these during today's work, don't panic. Every one of them has a fix.

Error 0x80370102 — "Virtual Machine Platform is not enabled." This is the most common one. It means your computer's BIOS has virtualization turned off. WSL2 needs virtualization. The fix: restart your computer, enter your BIOS setup — usually by pressing F2, F12, Delete, or Esc during startup, it varies by manufacturer — find the setting called "Intel Virtualization Technology" or "AMD-V" or "SVM Mode," enable it, save, and reboot. Then try wsl --install again.

Error 0x80004002 — Windows features aren't enabled. This means the underlying Windows components didn't activate properly. Fix: open PowerShell as admin and run the two dism.exe commands to manually enable WSL and Virtual Machine Platform. Reboot. Try again.

"node: command not found" — this is nvm not being loaded into your current shell session. Easy fix: run "source ~/.bashrc" or just close and reopen your Ubuntu terminal. nvm needs to be sourced fresh.

Password not accepted — you're using your WINDOWS password instead of your LINUX password. Different systems, different passwords. Use the one you created during Ubuntu setup.

WSL2 using too much RAM — by default, WSL2 can grab up to half your total RAM. If that's causing problems, create a .wslconfig file in your Windows user profile that caps it at 4 gigs. Plenty for OpenClaw.

Error 0x80072EE7 — Ubuntu failed to download during wsl --install. The Microsoft Store is blocked or broken — common on pre-owned laptops and some networks. Don't troubleshoot the Store. Use the manual method: download Ubuntu from cloud-images.ubuntu.com in your browser and import it with wsl --import. It's all in the lesson materials and we walked through it today.

No Ubuntu app in the Start menu — if you used the manual import method, Ubuntu won't appear automatically. You either open PowerShell and type "wsl -d Ubuntu," or create a Start menu shortcut using the steps in the lesson.

Ubuntu terminal running slow — sometimes Windows Defender gets overzealous and starts scanning WSL2 files in real time. You can exclude the WSL2 directory from Defender scanning. That usually fixes the sluggishness immediately.

[pause]

These are all charted hazards. Known shoals. If you hit one, you know exactly where you are and how to navigate around it. No need to abandon ship.

---

## Slide 20 — The Verification Checklist

Alright — moment of truth, crew! We've built the ship. We've mounted the engine. We've loaded the fuel. We've stocked the supplies. Now we do a FULL systems check before we declare this vessel seaworthy.

Seven checks. Run EACH of these commands in your Ubuntu terminal and confirm the output. This is your pre-voyage inspection. Every single one must pass.

Check one — WSL2 version:

```
wsl.exe -l -v
```

You should see Ubuntu listed with VERSION 2. If it says 1, you need to convert it. Come see me.

Check two — systemd:

```
systemctl is-system-running
```

"Running" is perfect. "Degraded" is acceptable. "Offline" means go back to Step 2.

Check three — Node.js:

```
node --version
```

Must start with v22. If it says "command not found," nvm didn't load. Source your bashrc.

Check four — npm:

```
npm --version
```

Should be 10 or higher. This comes bundled with Node.js 22, so if Node works, npm should too.

Check five — Git:

```
git --version
```

Any version number means it's installed. "Command not found" means go back and run that apt install command.

Check six — curl:

```
curl --version
```

Same deal — any version output means you're good.

Check seven — file system:

```
pwd
```

You should see /home/openclaw or /home/whatever-username-you-chose. NOT /mnt/c/. If you're in /mnt/c, type "cd ~" to get back to your Linux home directory.

[pause]

Seven checks. All green? Then your vessel is SEAWORTHY, crew!

---

## Slide 21 — Hands on Deck (Activity)

ALL HANDS ON DECK! Time to make it official. I want every single person to work through this checklist and fill in the blanks. This is your ship's certification. Your vessel inspection report. You're not leaving the shipyard without it.

[pause]

Grab your checklist — it's right there on screen. Work through each item:

RAM — at least 8 gigs. Write down your exact number.

Disk space — at least 20 gigs free. Write down your number.

Windows version — 1903 or later, or Windows 11. Write down your version.

WSL2 — running, VERSION 2. Check it with the command.

Ubuntu username — write it down. You're going to need this later.

Systemd — enabled and running.

Node.js — v22 something.

npm — 10 something.

Git — installed.

Power settings — sleep disabled if you want 24/7 operation.

File system — confirm you're in /home/username, not /mnt/c/.

[ask the audience] Raise your hand when you've got all the required items checked off. I'll come around and help anyone who's stuck.

[wait for students to work through checklist — approximately 5-10 minutes]

Bonus challenge for the fast finishers — open File Explorer on the Windows side and navigate to \\wsl$\Ubuntu\home\openclaw\. Replace "openclaw" with your actual username. You should see your Linux home directory from the Windows side. That's the bridge between the two file systems we talked about. You just peeked across the boundary. Pretty cool, right?

[pause]

How's everyone doing? Anyone stuck? Anyone need a hand?

[wait for responses, help as needed]

---

## Slide 22 — Treasure Chest (Key Takeaways)

Let's bring this ship out of dry dock and anchor up the treasure we've earned today. Eight pieces of hard-won knowledge, every one of them forged in the shipyard.

One — OpenClaw requires WSL2 on Windows. It runs inside Linux, not directly on Windows. That's not a limitation — that's the architecture. Linux is the ocean your ship was designed to sail on.

Two — systemd must be enabled. Two lines in a config file. [boot] and systemd=true. Without it, your daemon can't start automatically, and your agent becomes a crew member who needs to be woken up manually every morning. Nobody wants that.

Three — Node.js 22 or newer is required. Install it with nvm, not from a website. nvm gives you control, flexibility, and the ability to switch versions with a single command.

Four — keep OpenClaw's files in the LINUX file system. /home/username/. NOT /mnt/c/. Performance matters. The wrong file system will slow your agent to a crawl.

Five — disable sleep AND configure the lid close behavior. Two separate settings, two separate places. The Settings app controls idle timeout. The Control Panel controls what happens when you close the lid. Miss EITHER one and your laptop still sleeps. Your ship goes dark. Remember — both settings, both changed. That was our gotcha of the day.

Six — Tailscale is optional but powerful. Your long-range radio for reaching your agent from anywhere in the world.

Seven — a dedicated user account adds security isolation. Separate compartment for the powder magazine. Optional, but wise.

Eight — most installation errors come from two places: virtualization disabled in BIOS, or nvm not being sourced. Now you know both fixes. You've charted the shoals.

Every plank is nailed. Every rivet is set. Your ship is BUILT, crew.

---

## Slide 23 — Next Port of Call: Module 03 — Installing OpenClaw

[pause — let the energy build]

Look at what you've done today. You walked into this room with a regular Windows laptop. You're walking out with a PREPARED VESSEL. WSL2 running. Ubuntu installed. Systemd enabled. Node.js 22 fueled up and ready. Tools stocked. Power settings configured. Your ship is sitting in dry dock, gleaming, waiting to be launched.

And Module 03? Module 03 is LAUNCH DAY.

We're going to run the actual OpenClaw installer. One command. We're going to walk through the onboarding wizard step by step — choosing your AI provider, entering your API key, configuring the gateway. We're going to watch the daemon start up for the first time. And when that gateway comes online and starts listening for messages?

That's the moment your ship hits open water.

[pause]

Everything we did today was preparation. Necessary, critical, unglamorous preparation. And you did ALL of it. Every step. Every command. Every configuration. You should be proud of that. A lot of people out there try to skip the preparation, jump straight to installation, hit a wall of errors, and give up. Not you. You built the ship RIGHT. And in Module 03, you're going to be VERY glad you did.

[pause]

Before you leave — make SURE your verification checklist is complete. All seven checks passing. If something's red, come find me now. Don't leave the shipyard with a hole in the hull.

Fair winds and calm seas, crew. Next time — we bring your agent to LIFE.
