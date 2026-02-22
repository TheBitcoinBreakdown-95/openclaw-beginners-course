# Module 02: Preparing Your Laptop

## Learning Objectives

By the end of this module, you will be able to:

1. Verify your laptop meets the minimum requirements for OpenClaw
2. Explain why WSL2 is required and what it does
3. Install and configure WSL2 with Ubuntu on Windows 10
4. Enable systemd inside WSL2 (required for the OpenClaw daemon)
5. Install Node.js 22+ inside your WSL2 environment
6. Verify that your entire environment is ready for OpenClaw installation
7. Configure your laptop for 24/7 operation (disable sleep, power settings)
8. Optionally set up Tailscale for secure remote access

---

## Key Vocabulary

| Term | Definition |
|------|-----------|
| **WSL2** | Windows Subsystem for Linux, version 2 — a feature of Windows that lets you run a full Linux operating system inside Windows, without dual-booting or using a virtual machine |
| **Ubuntu** | A popular, beginner-friendly Linux distribution (version of Linux). We'll install this inside WSL2 |
| **Terminal** | A text-based interface where you type commands. On Windows, this is PowerShell or Command Prompt. Inside WSL2, this is a Linux bash shell |
| **systemd** | The system and service manager for Linux. OpenClaw's daemon (background service) needs systemd to start automatically and keep running |
| **Daemon** | A program that runs in the background continuously, like a service. The OpenClaw gateway runs as a daemon so it's always on |
| **Node.js** | A JavaScript runtime — the engine that OpenClaw is built on. You need version 22 or newer |
| **npm** | Node Package Manager — comes with Node.js. Used to install and manage JavaScript packages |
| **nvm** | Node Version Manager — a tool that lets you install and switch between different versions of Node.js easily |
| **PATH** | A list of directories your computer checks when you type a command. If a program isn't in your PATH, the computer can't find it |
| **Tailscale** | A secure networking tool that creates a private network between your devices over the internet — lets you access your OpenClaw from your phone or another computer |
| **Loopback** | A network address (127.0.0.1 or "localhost") that only your own computer can reach — nothing from the outside can connect |

---

## Before You Begin: Used or Pre-Owned Laptops

If you bought or were given a **used laptop** — especially one that came from a workplace — read this section carefully before doing anything else.

### The Problem with "Wiped" Corporate Laptops

Many used laptops were previously managed by a company's IT department. Corporate machines often have:

- **Group Policy restrictions** — rules that limit what you can install, what settings you can change, and whether you can run programs as administrator
- **MDM (Mobile Device Management) enrollment** — remote management software like Microsoft Intune that can push policies to the device even after a "reset"
- **Monitoring software** — agents that report device activity back to a central server
- **Restricted admin access** — the "Run as administrator" option may be blocked or broken

**A factory reset does NOT remove these.** "Reset this PC" from Windows Settings reinstalls Windows on top of the existing configuration. The corporate policies, MDM enrollment, and admin restrictions survive the reset. This is by design — corporations specifically prevent employees from removing management by resetting their machines.

### How to Check

Run these checks to see if your laptop has corporate remnants:

**Check 1: Domain membership**
1. Right-click the **Start menu** > click **System** (or press `Windows + Pause`)
2. Scroll down to "Related settings" and click **Domain or workgroup settings** (or look under "Device specifications")
3. If you see a domain name (anything other than "WORKGROUP"), the laptop is still domain-joined

**Check 2: MDM enrollment**
1. Open **Settings** > **Accounts** > **Access work or school**
2. If you see any connected accounts or organizations listed, the device is still enrolled in corporate management

**Check 3: Admin access**
1. Open the Start menu, type `PowerShell`
2. Try pressing `Ctrl + Shift + Enter` to open it as administrator
3. If you get an error like "the item you selected is unavailable" or a UAC prompt that won't accept your password, admin access is restricted

### The Fix: Clean Install from USB

If any of the above checks show corporate remnants, the safest path is a **clean Windows installation** from a USB drive — not a reset, not a refresh, a full clean install. This wipes the drive completely (including all corporate policies) and gives you a fresh, unmanaged copy of Windows.

**How to do a clean install:**
1. On a different computer, go to https://www.microsoft.com/software-download/windows10
2. Download the **Media Creation Tool**
3. Use it to create a bootable USB drive (you'll need an 8 GB+ USB stick)
4. Plug the USB into the used laptop
5. Restart the laptop and boot from USB (usually press F12, F2, or Esc during startup to access the boot menu)
6. Choose **Custom: Install Windows only** (not "Upgrade")
7. Delete all existing partitions and let Windows create fresh ones
8. Complete the setup — create a local account (NOT a Microsoft account, for simplicity)

This takes 30-60 minutes but gives you a guaranteed clean machine with full admin access. It's the right foundation for an always-on agent.

> **If you can't do a clean install right now**, you can still follow this module — but you may hit admin-related blockers during setup. The troubleshooting section covers workarounds for common restrictions.

---

## Before You Begin: Network Setup

Your OpenClaw laptop needs **ongoing internet access** — not just for setup, but permanently. API calls to your AI provider, Telegram messages, web searches for morning briefings — all of these require a live connection. You can't set it up and disconnect.

The question is: **which network should it be on?**

### Why This Matters

Most home WiFi networks are "flat" — every device can see and talk to every other device. Your phone, your personal laptop, your smart TV, and now your OpenClaw machine are all neighbors on the same network. If the OpenClaw laptop is ever compromised (through a prompt injection attack, a malicious skill, or residual corporate software), an attacker could potentially reach your other devices.

### Recommendation: Set Up a Guest Network First

Most home routers have a **guest network** feature that provides internet access but **isolates devices** from your main network. Set this up BEFORE connecting the OpenClaw laptop.

1. Find your router's address: open PowerShell and run `ipconfig` — look for **Default Gateway** (e.g., `192.168.1.1`, `10.0.0.1`, etc.). This varies by ISP and router brand
2. Open that address in a browser to reach your router's admin panel (check the label on the router for the login password)
3. Find the **Guest Network** or **Guest WiFi** settings (location varies by router brand)
3. Enable the guest network and set a password
4. Make sure **"Allow guests to access local network"** is **OFF** (this is the isolation setting)
5. Connect your OpenClaw laptop to the **guest** network
6. Keep your personal devices on the **main** network

> **If your router doesn't support guest networks**, you can still proceed on your main network and revisit network isolation in Module 10 (Security Hardening), which covers this topic in depth.

> **Note:** Some guest networks and pre-owned laptops block the Microsoft Store. If `wsl --install` can't download Ubuntu, don't panic — Section 1.6 provides a manual installation method that works on any computer with any network, no Store needed.

### If You Already Connected to Your Main WiFi

No harm done — but once you've set up a guest network, switch the OpenClaw laptop to it and then **forget** the main network:

1. Open **Settings** > **Network & Internet** > **Wi-Fi**
2. Click **Manage known networks**
3. Find your main WiFi network and click **Forget**

This removes the saved password so the laptop won't silently reconnect to your main network later.

---

## Before We Start: Check Your Hardware

Before installing anything, let's make sure your laptop can handle OpenClaw. We need to check three things: RAM, disk space, and Windows version.

### Checking Your RAM

1. Press `Ctrl + Shift + Esc` to open **Task Manager**
2. Click the **Performance** tab at the top
3. Click **Memory** on the left sidebar
4. Look at the number in the top-right corner

**What you should see:**

```
Memory
16.0 GB
```

**Minimum requirements:**
| RAM | Verdict |
|-----|---------|
| 4 GB or less | Not enough — OpenClaw + WSL2 will struggle |
| 8 GB | Minimum — it will work but may be slow when multitasking |
| 16 GB | Excellent — this is what we have, and it's plenty |
| 32 GB+ | Overkill for OpenClaw, but great if you want to run local models later |

> **Our laptop:** 16 GB RAM. This is more than enough. WSL2 typically uses 1-4 GB, Node.js uses a few hundred MB, and the rest is available for your normal activities.

### Alternative Hardware: Raspberry Pi 5

If you'd rather use a dedicated, low-power device instead of an old laptop, a **Raspberry Pi 5** ($100) can run OpenClaw with cloud-based models. Some community members pair it with a smart plug ($15) for energy monitoring and remote restart capability. You can even cluster multiple Pis for running several agents.

This is **not required** — your old laptop works perfectly fine, and that's what this course is designed around. But if you're interested in a tiny, silent, always-on device that sips power, it's a viable option. The Raspberry Pi runs Linux natively, so you won't even need WSL2.

### Checking Your Disk Space

1. Open **File Explorer** (press `Windows + E`)
2. Click **This PC** in the left sidebar
3. Look at your main drive (usually `C:`)
4. You'll see something like: `438 GB free of 465 GB`

**Minimum requirements:**
| Free Space | Verdict |
|------------|---------|
| Less than 10 GB | Not enough — you need more space |
| 10-20 GB | Tight — will work but leaves no room for growth |
| 20-50 GB | Good — comfortable for OpenClaw and its data |
| 50 GB+ | Excellent — plenty of room for everything |

> **Our laptop:** 438 GB free of 465 GB total. That's more than enough.

**What uses the space:**
- WSL2 + Ubuntu: ~2-5 GB
- Node.js: ~200 MB
- OpenClaw itself: ~500 MB
- OpenClaw data (transcripts, memory, sessions): grows over time, typically 1-10 GB
- Docker (if you use sandboxing later): ~2-5 GB

### Checking Your Windows Version

1. Press `Windows + R` to open the Run dialog
2. Type `winver` and press Enter
3. A window appears showing your Windows version

**What you should see:**

```
Windows 10
Version 22H2 (OS Build 19045.xxxx)
```

**Requirements:**
| Version | WSL2 Support |
|---------|-------------|
| Windows 10 version 1903 (Build 18362) or later | WSL2 supported |
| Windows 10 version 2004 or later | Simplified WSL2 installation (`wsl --install`) |
| Windows 10 22H2 | Current — fully supported |
| Windows 11 | Fully supported |

> **Our laptop:** Windows 10, Version 22H2, Build 19045.2006. This supports WSL2 with the simplified installation command.

**If your version is older than 1903:** You'll need to update Windows first. Go to **Settings > Update & Security > Windows Update** and install all available updates.

---

## Why WSL2 Is Required

You might be wondering: *Why can't I just install OpenClaw directly on Windows?*

Here's the situation:

**OpenClaw is built for Linux/macOS.** The core gateway, the daemon system, the shell commands, the file permissions — all of it assumes a Unix-like operating system. While there is a PowerShell install script for Windows, the official documentation recommends running OpenClaw inside WSL2:

> *"OpenClaw on Windows is recommended via WSL2 (Ubuntu recommended). Running the CLI and Gateway inside Linux ensures consistent runtime behavior and better tooling compatibility."*

### What WSL2 Actually Is

WSL2 stands for **Windows Subsystem for Linux, version 2**. In plain English:

- It lets you run a real Linux operating system inside Windows
- It's not an emulator — it runs a real Linux kernel
- It's not a virtual machine in the traditional sense — it's tightly integrated with Windows
- It runs alongside Windows, not instead of it
- You can access your Windows files from Linux, and vice versa

**Think of it like this:** Your Windows laptop is an apartment building. Right now, it has one tenant: Windows. WSL2 adds a second tenant: Linux (Ubuntu). They share the building (your hardware) but have their own separate units (file systems, processes, networking).

### What WSL2 Means for You

After we install WSL2:
- You'll have a **Linux terminal** available alongside your normal Windows
- OpenClaw will run inside this Linux environment
- You'll type OpenClaw commands in the Linux terminal, not in PowerShell
- Your OpenClaw files will live inside the Linux file system (not in `C:\Users\...`)
- The OpenClaw gateway will run as a Linux daemon (background service)

**You can still use Windows normally.** WSL2 runs quietly in the background. You won't notice it unless you open the Linux terminal.

---

## Step 1: Install WSL2

This is the big one. Follow every step carefully.

### 1.1 Open PowerShell as Administrator

1. Click the **Start menu** (Windows icon, bottom-left)
2. Type `PowerShell`
3. You'll see **Windows PowerShell** appear in the results
4. **Right-click** on it
5. Click **Run as administrator**
6. A blue dialog box asks "Do you want to allow this app to make changes to your device?"
7. Click **Yes**

A blue PowerShell window opens. You should see something like:

```
Windows PowerShell
Copyright (C) Microsoft Corporation. All rights reserved.

PS C:\WINDOWS\system32>
```

The `PS C:\WINDOWS\system32>` part is your prompt — it's where you type commands. The blinking cursor is waiting for your input.

### 1.2 Install WSL with Ubuntu

Type this command exactly and press Enter:

```powershell
wsl --install
```

**What this command does:**
- Enables the WSL feature in Windows
- Downloads and installs the WSL2 Linux kernel
- Downloads and installs Ubuntu (the default Linux distribution)
- Sets WSL2 as the default version

**What you should see:**

```
Installing: Virtual Machine Platform
Virtual Machine Platform has been installed.
Installing: Windows Subsystem for Linux
Windows Subsystem for Linux has been installed.
Installing: Ubuntu
Ubuntu has been installed.
The requested operation is successful. Changes will not be effective until the system is restarted.
```

> **Note:** The exact output may vary. If you see messages about features being enabled and Ubuntu being downloaded, you're on the right track.

> **Error `0x80072EE7` (Ubuntu fails to download)?** The Microsoft Store is blocked or broken on your machine. This is common on pre-owned laptops and some networks. **Don't waste time troubleshooting the Store.** Skip to Section 1.6 below for the manual installation method — it works on any computer, any network.

### 1.3 Restart Your Computer

This is required. WSL2 needs a reboot to fully activate.

1. Save any open work
2. Click Start > Power > **Restart** (not Shut Down — Restart)
3. Wait for your computer to reboot

### 1.4 Complete Ubuntu Setup

After restarting, one of two things will happen:

**Option A: Ubuntu opens automatically**
A terminal window appears asking you to create a username and password.

**Option B: Nothing happens automatically**
1. Click the Start menu
2. Type `Ubuntu`
3. Click the **Ubuntu** app that appears
4. A terminal window opens

Either way, you'll see:

```
Installing, this may take a few minutes...
Please create a default UNIX user account. The username does not need to match your Windows username.
For more information visit: https://aka.ms/wslusers
Enter new UNIX username:
```

### 1.5 Create Your Linux Username and Password

**Username:**
- Type a simple, lowercase username (e.g., `openclaw` or your first name)
- No spaces, no capital letters, no special characters
- Press Enter

```
Enter new UNIX username: openclaw
```

**Password:**
- Type a password you'll remember
- **Important:** When you type your password, nothing appears on screen — no dots, no asterisks, nothing. This is normal! Linux hides password input for security. Just type it and press Enter.
- You'll be asked to type it again to confirm

```
New password:
Retype new password:
passwd: password updated successfully
```

**After successful setup, you'll see:**

```
Installation successful!
To run a command as administrator (root), use "sudo <command>".
See "man sudo_root" for details.

Welcome to Ubuntu 24.04 LTS (GNU/Linux 5.15.xxx.x-microsoft-standard-WSL2 x86_64)

openclaw@YOURPC:~$
```

That last line (`openclaw@YOURPC:~$`) is your Linux prompt. You're now inside Ubuntu. The `~` means you're in your home directory.

**Congratulations — WSL2 is installed!** Skip Section 1.6 and go straight to Step 2.

> **Troubleshooting:** If you see an error like `WslRegisterDistribution failed with error: 0x80370102`, it usually means virtualization is disabled in your BIOS. See the troubleshooting section at the end of this module.

---

### 1.6 If Ubuntu Failed to Install (Manual Method)

If `wsl --install` gave you error `0x80072EE7`, or Ubuntu didn't download for any reason, **don't waste time troubleshooting the Microsoft Store**. The Store is frequently broken on pre-owned laptops and some networks block it. This manual method bypasses the Store entirely and works on any computer with any network.

**Step 1: Download Ubuntu through your browser**

1. Open your web browser (Edge, Chrome, whatever works)
2. Go to: **cloud-images.ubuntu.com/wsl/noble/current/**
3. Click the file that contains **amd64** and ends in **`.rootfs.tar.gz`** — it's the largest file on the page (about 500 MB)
4. Wait for the download to finish

> **AMD or ARM?** Choose **amd64** — this is for all standard Intel and AMD laptops. The ARM file is only for ARM-based devices like Surface Pro X.

**Step 2: Import Ubuntu into WSL**

Open your admin PowerShell and run:

```powershell
mkdir C:\WSL\Ubuntu
```

Then type this much (don't press Enter yet):

```
wsl --import Ubuntu C:\WSL\Ubuntu
```

Now open **File Explorer**, navigate to your **Downloads** folder, and **drag the downloaded file onto the PowerShell window**. This fills in the full path automatically so you don't have to type it. Now press Enter.

If drag-and-drop doesn't work, type the beginning of the path and press **Tab** to auto-complete:

```powershell
wsl --import Ubuntu C:\WSL\Ubuntu C:\Users\YourName\Downloads\ubuntu
```

Press Tab → PowerShell completes the rest of the filename. Press Enter.

No output means success. Verify it worked:

```powershell
wsl -l -v
```

You should see Ubuntu listed with VERSION 2.

**Step 3: Create your user account**

The manual import logs you in as `root` (the administrator account) by default. You need to create a normal user account.

Open Ubuntu:

```powershell
wsl -d Ubuntu
```

You'll see a `root@` prompt. Run these commands one at a time:

```bash
adduser openclaw
```

- Set a password when prompted. **Nothing appears on screen when you type** — no dots, no stars, nothing. This is normal. Type your password and press Enter.
- It asks for Full Name, Room Number, Work Phone, etc. — **press Enter to skip all of these**
- Type **Y** when asked "Is the information correct?"

Then run:

```bash
usermod -aG sudo openclaw
```

Then set this as the default user so you don't log in as root every time:

```bash
echo -e "[user]\ndefault=openclaw" > /etc/wsl.conf
```

Type `exit` to leave Ubuntu. In PowerShell, restart WSL:

```powershell
wsl --shutdown
```

Wait a few seconds, then open Ubuntu again:

```powershell
wsl -d Ubuntu
```

You should now see `openclaw@YOURPC` at the prompt instead of `root@`.

**Step 4: Create a Start Menu shortcut**

The manual import doesn't create a Start Menu entry. To add one:

1. Open **File Explorer**
2. Type `shell:programs` in the address bar and press Enter
3. Right-click in the empty space > **New** > **Shortcut**
4. For the location, type: `C:\Windows\System32\wsl.exe -d Ubuntu`
5. Click Next, name it **Ubuntu**, click Finish

Now you can open Ubuntu from the Start Menu like any other app. It opens as a command prompt window — that's normal, that's your Linux terminal.

**Congratulations — WSL2 is installed!**

---

## Step 2: Enable systemd

OpenClaw's gateway needs to run as a system service (daemon) that starts automatically when your computer boots. This requires **systemd**, which is not enabled by default in WSL2.

### 2.1 Open Your WSL2 Terminal

If you closed the Ubuntu window:
1. Click the Start menu
2. Type `Ubuntu`
3. Click the Ubuntu app

You should see your Linux prompt:
```
openclaw@YOURPC:~$
```

### 2.2 Edit the WSL Configuration File

Type this command and press Enter:

```bash
sudo nano /etc/wsl.conf
```

**Breaking this down:**
- `sudo` = "run as administrator" (it will ask for your Linux password)
- `nano` = a simple text editor that runs in the terminal
- `/etc/wsl.conf` = the file we're editing

You'll be asked for your password:
```
[sudo] password for openclaw:
```

Type the password you created during Ubuntu setup (remember, nothing appears on screen) and press Enter.

The nano text editor opens. You'll see either an empty file or a file with some existing content.

### 2.3 Add the systemd Configuration

If the file is empty, type exactly:

```
[boot]
systemd=true
```

If the file already has content, use the arrow keys to navigate to the end and add these two lines.

**What this looks like in nano:**

```
  GNU nano 6.2          /etc/wsl.conf

[boot]
systemd=true


^G Help    ^O Write Out   ^W Where Is   ^K Cut       ^J Justify
^X Exit    ^R Read File   ^\ Replace    ^U Paste     ^T Execute
```

### 2.4 Save and Exit

1. Press `Ctrl + O` (that's the letter O, not zero) to save
2. Press `Enter` to confirm the filename
3. Press `Ctrl + X` to exit nano

You're back at the Linux prompt.

### 2.5 Restart WSL2

For the systemd change to take effect, we need to restart WSL. Open a **PowerShell** window (not the Ubuntu terminal) and run:

```powershell
wsl --shutdown
```

This stops WSL2 completely. Wait about 5 seconds.

Now reopen Ubuntu:
1. Click Start menu
2. Type `Ubuntu`
3. Click the Ubuntu app

### 2.6 Verify systemd Is Working

In your Ubuntu terminal, type:

```bash
systemctl list-units --type=service --state=running
```

**What you should see:** A list of running services. If you see output with service names (like `systemd-journald.service`, `systemd-logind.service`, etc.), systemd is working.

```
  UNIT                         LOAD   ACTIVE SUB     DESCRIPTION
  cron.service                 loaded active running Regular background program processing daemon
  dbus.service                 loaded active running D-Bus System Message Bus
  systemd-journald.service     loaded active running Journal Service
  systemd-logind.service       loaded active running User Login Management
  ...
```

**If you see an error** like `System has not been booted with systemd as init system`, the configuration didn't take effect. Double-check that:
1. The `/etc/wsl.conf` file contains `[boot]` on one line and `systemd=true` on the next
2. You ran `wsl --shutdown` from PowerShell
3. You reopened Ubuntu after the shutdown

---

## Step 3: Install Node.js 22+

OpenClaw requires Node.js version 22 or newer. We'll install it using **nvm** (Node Version Manager), which is the recommended way to manage Node.js versions on Linux.

### 3.1 Install nvm

In your Ubuntu terminal, run:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

**What this does:**
- Downloads the nvm installer script
- Runs it, which installs nvm to `~/.nvm/`
- Adds nvm to your shell's startup file

**What you should see:**

```
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100 16555  100 16555    0     0  45678      0 --:--:-- --:--:-- --:--:-- 45678
=> Downloading nvm as script to '/home/openclaw/.nvm'

=> Appending nvm source string to /home/openclaw/.bashrc
=> Appending bash_completion source string to /home/openclaw/.bashrc

=> Close and reopen your terminal to start using nvm or run the following to use it now:

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

### 3.2 Activate nvm

You need to either restart your terminal or run the activation command. The easiest way:

```bash
source ~/.bashrc
```

Then verify nvm is installed:

```bash
nvm --version
```

**What you should see:**

```
0.40.1
```

If you see a version number, nvm is installed. If you see `nvm: command not found`, close your Ubuntu terminal completely and reopen it, then try again.

### 3.3 Install Node.js 22

Now install Node.js:

```bash
nvm install 22
```

**What you should see:**

```
Downloading and installing node v22.x.x...
Downloading https://nodejs.org/dist/v22.x.x/node-v22.x.x-linux-x64.tar.xz...
######################################################################## 100.0%
Computing checksum with sha256sum
Checksums matched!
Now using node v22.x.x (npm v10.x.x)
Creating default alias: default -> 22 (-> v22.x.x)
```

### 3.4 Set Node.js 22 as Default

Make sure Node.js 22 is used every time you open a terminal:

```bash
nvm alias default 22
```

**What you should see:**

```
default -> 22 (-> v22.x.x)
```

### 3.5 Verify Node.js and npm

Run both of these commands:

```bash
node --version
```

**Expected output:**
```
v22.x.x
```

(The `x.x` will be whatever the latest patch version is. As long as it starts with `v22`, you're good.)

```bash
npm --version
```

**Expected output:**
```
10.x.x
```

(npm version 10 or higher. This comes bundled with Node.js 22.)

---

## Step 4: Update Ubuntu Packages

While we're setting up, let's make sure Ubuntu's built-in packages are up to date. This takes a few minutes but prevents compatibility issues later.

```bash
sudo apt update && sudo apt upgrade -y
```

**What this does:**
- `sudo apt update` — refreshes the list of available packages
- `sudo apt upgrade -y` — installs any available updates (`-y` means "yes, don't ask me to confirm each one")

**What you'll see:** A lot of text scrolling by. This is normal. It might take 2-5 minutes depending on your internet speed.

**When it's done, you'll see your prompt again:**
```
openclaw@YOURPC:~$
```

---

## Step 5: Install Essential Tools

There are a few tools that OpenClaw or its features may need. Let's install them now:

```bash
sudo apt install -y git curl wget build-essential
```

**What these are:**
| Tool | What It's For |
|------|--------------|
| `git` | Version control — used for backing up your OpenClaw workspace |
| `curl` | Downloading files from the internet — used by the installer |
| `wget` | Another download tool — some scripts prefer it |
| `build-essential` | Compilation tools — some npm packages need to compile native code |

These may already be installed. If so, you'll see messages like `git is already the newest version`. That's fine.

---

## Step 6: Configure Power Settings (24/7 Operation)

If you want your agent to be available 24/7 (receiving messages, running scheduled tasks, monitoring things), your laptop needs to stay awake. By default, Windows puts the computer to sleep after a period of inactivity. We need to change that.

### 6.1 Disable Sleep Mode

1. Press `Windows + I` to open **Settings**
2. Click **System**
3. Click **Power & sleep** on the left sidebar
4. Under **Sleep**, set both dropdowns to **Never**:
   - "When plugged in, PC goes to sleep after" → **Never**
   - "On battery power, PC goes to sleep after" → **Never** (if this option exists)

> **Important:** If you're running on a laptop, keep it plugged in. Running 24/7 on battery will drain it quickly and isn't practical.

### 6.2 Configure Lid Close Behavior (Laptops Only)

This is the step most guides miss. The Power & sleep settings from 6.1 only control the *idle timeout* — what happens when you walk away. They do **NOT** control what happens when you **close the laptop lid**. By default, closing the lid puts the laptop to sleep regardless of your idle timeout settings. You must change this separately.

1. Open **Control Panel** (type "Control Panel" in the Start menu search)
2. Click **Hardware and Sound**
3. Click **Power Options**
4. On the left sidebar, click **Choose what closing the lid does**
5. Under "When I close the lid":
   - Set "On battery" → **Do nothing**
   - Set "Plugged in" → **Do nothing**
6. Click **Save changes**

> **Why this matters:** If you set sleep to "Never" but leave lid close on its default, your laptop will still sleep the moment you close the lid. Your agent goes dark, scheduled tasks stop, messages pile up unanswered. Both settings must be changed.

### 6.3 Disable Hibernate (Optional but Recommended)

Hibernate saves your computer's state to disk and shuts down. It can interrupt WSL2. To disable it:

1. Open **PowerShell as Administrator** (Start menu > type "PowerShell" > right-click > Run as administrator)
2. Run:

```powershell
powercfg /hibernate off
```

> **Note:** This command requires administrator privileges. If you see "The operation requires administrator privilege," you opened a regular PowerShell instead of an admin one. Close it and reopen with right-click > Run as administrator.

### 6.4 Prevent the Display from Turning Off (Optional)

You might want the screen off to save power, but the computer itself stays on:

1. In **Settings > System > Power & sleep**
2. Under **Screen**, set:
   - "When plugged in, turn off after" → Your preference (5 minutes is fine)
   - This only turns off the display — the computer and WSL2 keep running

### 6.5 Verify WSL2 Survives Lid Close

After making these changes, verify everything works together:
1. Close your laptop lid
2. Wait one minute
3. Open the lid and log back in
4. Open your **Ubuntu terminal** (not PowerShell) and type `uptime`

**Expected output:**
```
 14:30:22 up 5 min,  1 user,  load average: 0.00, 0.01, 0.00
```

The "up X min" should show continuous uptime, not a reset. If WSL2 restarted (uptime shows a very low number), check that:
- Lid close is set to "Do nothing" in Control Panel (Step 6.2)
- Sleep is set to "Never" in Settings (Step 6.1)
- Both settings are configured for "Plugged in" (keep the laptop plugged in)

---

## Step 7: Understand the File System Boundary

This is a critical concept that trips up many Windows users running WSL2. There are **two separate file systems**, and knowing which one you're in matters.

### The Two File Systems

| Location | What It Is | Path Style | Example |
|----------|-----------|------------|---------|
| **Windows file system** | Your normal Windows files | `C:\Users\YourName\...` | `C:\Users\GC\Documents\` |
| **Linux file system** | Ubuntu's files (inside WSL2) | `/home/username/...` | `/home/openclaw/` |

### Accessing Across the Boundary

From **Linux**, you can access Windows files at:
```
/mnt/c/Users/YourName/Documents/
```

From **Windows File Explorer**, you can access Linux files at:
```
\\wsl$\Ubuntu\home\openclaw\
```

### The Golden Rule

> **OpenClaw's data should live in the Linux file system, NOT the Windows file system.**

Why? Performance. Files on the Linux file system (`/home/openclaw/`) are fast. Files on the Windows file system accessed through `/mnt/c/` are slow — significantly slower, because every file operation has to cross the WSL2 boundary.

The official OpenClaw documentation confirms this:

> *"Store `~/.openclaw` inside the WSL filesystem, not in `/mnt/c/`."*

**What this means in practice:**
- When you install OpenClaw (next module), it will create `~/.openclaw/` in your Linux home directory
- Your agent's memory, configuration, and transcripts will all live there
- Don't try to move them to your Windows Documents folder
- If you need to copy files between Windows and Linux, use the paths above — but don't keep OpenClaw's working files on the Windows side

### Quick Reference: Where Am I?

If you're ever confused about which file system you're in, run:

```bash
pwd
```

**If you see:**
- `/home/openclaw` or `/home/something` — You're in the **Linux** file system (good for OpenClaw)
- `/mnt/c/Users/...` — You're in the **Windows** file system (not ideal for OpenClaw)

---

## Step 8: Set Up Tailscale (Optional)

Tailscale is optional but incredibly useful. It lets you access your OpenClaw gateway from other devices — your phone, another computer, or anywhere with internet. It creates a secure, encrypted network between your devices.

**Skip this step if:**
- You'll only access OpenClaw from this laptop
- You want to get OpenClaw running first and add remote access later

**Do this step if:**
- You want to access OpenClaw from your phone
- You want to access OpenClaw from another computer
- You want to access the gateway dashboard remotely

### 8.1 Create a Tailscale Account

1. Go to https://tailscale.com in your browser
2. Click **Get Started** or **Sign Up**
3. Sign in with Google, Microsoft, or GitHub
4. The free plan is sufficient for personal use

### 8.2 Install Tailscale on Windows

1. Go to https://tailscale.com/download
2. Download the Windows installer
3. Run the installer
4. Tailscale will appear in your system tray (bottom-right of your taskbar)
5. Click the Tailscale icon and sign in

### 8.3 Install Tailscale Inside WSL2

Open your Ubuntu terminal and run:

```bash
curl -fsSL https://tailscale.com/install.sh | sh
```

Then start Tailscale:

```bash
sudo tailscale up
```

This will give you a URL to open in your browser to authorize the device. Open it and approve.

### 8.4 Verify Tailscale

After authorization:

```bash
tailscale status
```

You should see your devices listed with their Tailscale IP addresses (usually `100.x.x.x`).

### 8.5 Why This Matters for OpenClaw

Later, when we configure the OpenClaw gateway, we'll have the option to set its bind address. If you want remote access, you'll set it to listen on the Tailscale interface instead of just localhost. This means:

- From this laptop: access via `http://127.0.0.1:18789/`
- From your phone (on Tailscale): access via `http://100.x.x.x:18789/`
- From anywhere else (without Tailscale): no access (secure by default)

We'll configure this in Module 03.

---

## Step 8.5: Enable Disk Encryption (Optional but Recommended)

If your OpenClaw device stores API keys, personal data, conversation history, and agent memory, you should consider encrypting the disk. If the device is ever lost or stolen, encrypted data is unreadable without your password.

**Windows (BitLocker):**
- Open **Settings > Update & Security > Device encryption** (or search for "BitLocker" in the Start menu)
- Turn on BitLocker for your main drive
- Save your recovery key somewhere safe (NOT on the same machine)

> **Note:** BitLocker is available on Windows 10 Pro and Enterprise. Windows 10 Home has "Device Encryption" instead, which works similarly but requires a Microsoft account.

**Linux (LUKS):**
- If you're using a dedicated Linux machine (not WSL2), enable LUKS encryption during OS installation
- Most Linux installers offer a "Encrypt the disk" checkbox — check it

**Mac (FileVault):**
- Open **System Preferences > Security & Privacy > FileVault**
- Click "Turn On FileVault"

This is especially important if your device stores API keys and personal data, and doubly important if it's a laptop that could be physically accessed by others.

---

## Step 9: Create a Dedicated User Account (Optional but Recommended)

This is a security measure from Module 01's Principle 2 (Least Privilege). Creating a separate Linux user account for OpenClaw means:

- If something goes wrong, the damage is limited to that account's files
- The OpenClaw agent can't access your personal Linux files
- It's cleaner separation of concerns

**Skip this step if:**
- You want to keep things simple for now
- You're the only user and aren't concerned about isolation
- You plan to use Docker sandboxing instead (Module 10)

**Do this step if:**
- You want an extra layer of security
- You like clean separation between your personal files and OpenClaw's files

### 9.1 Create the Account

```bash
sudo adduser myagent
```

(Using "myagent" as our agent-dedicated account name. You can use any name you like.)

**What you'll see:**

```
Adding user `myagent' ...
Adding new group `myagent' (1001) ...
Adding new user `myagent' (1001) with group `myagent' ...
Creating home directory `/home/myagent' ...
Copying files from `/etc/skel' ...
New password:
Retype new password:
passwd: password updated successfully
Changing the user information for myagent
        Full Name []:
        Room Number []:
        Work Phone []:
        Home Phone []:
        Other []:
Is the information correct? [Y/n]
```

Set a password and press Enter through the other fields (they're optional). Type `Y` at the end.

### 9.2 Switch to the New Account

```bash
su - myagent
```

Enter the password you just created. Your prompt changes to:

```
myagent@YOURPC:~$
```

You're now "myagent." When you install OpenClaw in the next module, it will be installed for this account. To go back to your original account, type `exit`.

---

## The Verification Checklist

Before moving to Module 03, let's verify everything is ready. Run each of these commands in your Ubuntu terminal and confirm the output:

### Check 1: WSL2 Version

```bash
wsl.exe -l -v
```

**Expected output:**
```
  NAME      STATE           VERSION
* Ubuntu    Running         2
```

The VERSION column should say `2`. If it says `1`, run this in PowerShell:
```powershell
wsl --set-version Ubuntu 2
```

### Check 2: systemd Is Running

```bash
systemctl is-system-running
```

**Expected output:**
```
running
```

If it says `degraded`, that's usually fine — it means some non-critical services had issues. If it says `offline`, systemd isn't enabled. Go back to Step 2.

### Check 3: Node.js Version

```bash
node --version
```

**Expected output:**
```
v22.x.x
```

Must be 22 or higher. If you see `command not found`, go back to Step 3.

### Check 4: npm Version

```bash
npm --version
```

**Expected output:**
```
10.x.x
```

### Check 5: Git Is Installed

```bash
git --version
```

**Expected output:**
```
git version 2.x.x
```

### Check 6: curl Is Available

```bash
curl --version
```

**Expected output:** A block of text starting with `curl 7.x.x` or `curl 8.x.x`. As long as it doesn't say `command not found`, you're good.

### Check 7: You're in the Right File System

```bash
pwd
```

**Expected output:**
```
/home/openclaw
```

(Or `/home/aslan` if you created a dedicated account.)

You should see a Linux path starting with `/home/`, not `/mnt/c/`.

### The Summary

If all seven checks pass, your environment is ready. Here's what you now have:

```
┌──────────────────────────────────────────────────┐
│                 Windows 10 22H2                   │
│                                                   │
│  ┌─────────────────────────────────────────────┐  │
│  │              WSL2 (Ubuntu)                   │  │
│  │                                              │  │
│  │  ✓ systemd enabled                          │  │
│  │  ✓ Node.js 22+                              │  │
│  │  ✓ npm 10+                                  │  │
│  │  ✓ git, curl, wget, build-essential         │  │
│  │  ✓ Home directory: /home/openclaw/          │  │
│  │                                              │  │
│  │  Ready for OpenClaw installation ──────►    │  │
│  │                                              │  │
│  └─────────────────────────────────────────────┘  │
│                                                   │
│  Power Settings:                                  │
│  ✓ Sleep disabled                                │
│  ✓ Hibernate disabled (optional)                 │
│  ✓ Tailscale installed (optional)                │
│                                                   │
└──────────────────────────────────────────────────┘
```

---

## Common Mistakes and Troubleshooting

### "wsl --install" says "WSL is already installed"

**What happened:** WSL was already enabled on your system (perhaps WSL1 from an older setup).

**Fix:** Install Ubuntu specifically:
```powershell
wsl --install -d Ubuntu-24.04
```

If that doesn't work, check which distributions are available:
```powershell
wsl --list --online
```

### Error 0x80370102 — "Virtual Machine Platform is not enabled"

**What happened:** Your computer's BIOS has virtualization turned off. WSL2 needs it.

**Fix:**
1. Restart your computer
2. Enter your BIOS setup (usually press `F2`, `F12`, `Delete`, or `Esc` during startup — the key varies by manufacturer)
3. Look for a setting called:
   - "Intel Virtualization Technology" (Intel CPUs)
   - "AMD-V" or "SVM Mode" (AMD CPUs)
4. Enable it
5. Save and exit BIOS
6. Boot back into Windows
7. Try `wsl --install` again

**How to know your CPU brand:** Press `Ctrl + Shift + Esc` (Task Manager) > Performance > CPU. The name at the top tells you (e.g., "Intel Core i5-..." or "AMD Ryzen 5-...").

### Error 0x80004002 — "The system cannot find the file specified"

**What happened:** Windows features aren't enabled.

**Fix:** Open PowerShell as Administrator and run:
```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

Restart your computer, then try `wsl --install` again.

### Error 0x80072EE7 — Ubuntu Fails to Download

**What happened:** WSL2 installed successfully, but Ubuntu couldn't download. Error code `0x80072EE7` means the Microsoft Store can't connect. This is common on pre-owned laptops (corporate images often break or disable the Store) and on some networks that block Store traffic.

**Fix:** Don't troubleshoot the Store — it's a rabbit hole. Use the manual installation method in **Section 1.6** of this module instead. It downloads Ubuntu directly from Canonical's website using your browser, completely bypassing the Microsoft Store.

### No Ubuntu App in the Start Menu

**What happened:** You used the manual import method (`wsl --import`) to install Ubuntu. This method doesn't create a Start Menu shortcut.

**Fix:** Create one manually — see the "Create a Start Menu shortcut" step in Section 1.6. Or just open PowerShell and type `wsl -d Ubuntu` any time you need Ubuntu.

### "node: command not found" After Installing nvm

**What happened:** nvm hasn't been loaded into your current shell session.

**Fix:** Run:
```bash
source ~/.bashrc
```

Or close and reopen your Ubuntu terminal. Then try `node --version` again.

If it still doesn't work, verify nvm is installed:
```bash
ls ~/.nvm/
```

If the directory doesn't exist, re-run the nvm installation command from Step 3.1.

### "sudo: command not found" or Password Not Accepted

**What happened:** You might be typing your Windows password instead of your Linux password.

**Fix:** Use the password you created during Ubuntu setup (Step 1.5), not your Windows login password. They are separate.

If you've forgotten your Linux password, reset it from PowerShell:
```powershell
wsl -u root passwd openclaw
```

(Replace `openclaw` with your Linux username.)

### "Run as administrator" Is Unavailable or Blocked

**What happened:** The laptop has residual corporate Group Policy restrictions. This is common on used laptops that were previously managed by a company's IT department. A "Reset this PC" does not remove these restrictions.

**Fix:** Try these alternatives:
1. Start menu > type "PowerShell" > press `Ctrl + Shift + Enter` (instead of right-clicking)
2. Open Task Manager (`Ctrl + Shift + Esc`) > File > Run new task > type `powershell` > check "Create this task with administrative privileges"
3. Start menu > type "cmd" > press `Ctrl + Shift + Enter` > type `powershell` inside the admin command prompt

If none of these work, the corporate policy is actively blocking elevation. The permanent fix is a **clean Windows install from USB** (see "Before You Begin: Used or Pre-Owned Laptops" at the top of this module).

### WSL2 Uses Too Much RAM

**What happened:** WSL2 can be hungry for RAM, especially if you're running many processes.

**Fix:** Create a `.wslconfig` file to limit RAM usage. In PowerShell:

```powershell
notepad "$env:USERPROFILE\.wslconfig"
```

Add these lines:
```
[wsl2]
memory=4GB
swap=2GB
```

Save, close Notepad, then restart WSL:
```powershell
wsl --shutdown
```

This limits WSL2 to 4 GB RAM (plenty for OpenClaw) instead of letting it use up to half your total RAM.

### "Permission denied" When Editing /etc/wsl.conf

**What happened:** You forgot `sudo` before the command.

**Fix:** You need `sudo` (administrator privileges) to edit system files:
```bash
sudo nano /etc/wsl.conf
```

### Ubuntu Terminal Is Extremely Slow

**What happened:** This sometimes happens on the first launch after installation, or if Windows Defender is scanning WSL2 files.

**Fix:**
1. Wait a few minutes for the initial setup to complete
2. Optionally, exclude the WSL2 directory from Windows Defender:
   - Open **Windows Security**
   - Click **Virus & threat protection**
   - Under **Virus & threat protection settings**, click **Manage settings**
   - Scroll to **Exclusions**, click **Add or remove exclusions**
   - Click **Add an exclusion** > **Folder**
   - Navigate to `%USERPROFILE%\AppData\Local\Packages\CanonicalGroupLimited.Ubuntu...` (find the Ubuntu folder)
   - Add it

### WSL2 Stops When I Close the Terminal Window

**What happened:** By default, WSL2 stays running in the background for about 8 seconds after you close all Linux terminals, then shuts down.

**This is fine for now.** The OpenClaw daemon (which we install in Module 03) handles this — it keeps WSL2 running continuously.

However, if you want WSL2 to stay running even with no terminals open, you can use the Windows Task Scheduler to launch it at startup, or simply keep a terminal window open.

---

## Class Exercise: Verify Your Environment

Complete the following checklist. Each item should have a checkmark before you proceed to Module 03.

- [ ] **RAM:** Confirmed at least 8 GB (how much? ______ GB)
- [ ] **Disk space:** Confirmed at least 20 GB free (how much free? ______ GB)
- [ ] **Windows version:** Confirmed Windows 10 version 1903+ or Windows 11 (your version: ______)
- [ ] **WSL2:** Installed and running (`wsl -l -v` shows Ubuntu, VERSION 2)
- [ ] **Ubuntu username:** Created (username: ______)
- [ ] **systemd:** Enabled (`systemctl is-system-running` shows "running" or "degraded")
- [ ] **Node.js:** Version 22+ installed (`node --version` shows v22.x.x)
- [ ] **npm:** Installed (`npm --version` shows 10.x.x)
- [ ] **Git:** Installed (`git --version` shows a version number)
- [ ] **Power settings:** Sleep disabled AND lid close set to "Do nothing" (if running 24/7)
- [ ] **File system:** You're in `/home/username/`, not `/mnt/c/`
- [ ] **Optional: Tailscale** installed and connected
- [ ] **Optional: Dedicated user account** created

**Bonus exercise:** Open File Explorer and navigate to `\\wsl$\Ubuntu\home\openclaw\` (replace `openclaw` with your username). You should see an empty or near-empty home directory. This is where OpenClaw will live.

---

## Key Takeaways

1. **OpenClaw requires WSL2 on Windows** — it runs inside a Linux environment, not directly on Windows
2. **systemd must be enabled** for the OpenClaw daemon to work — add `[boot] systemd=true` to `/etc/wsl.conf`
3. **Node.js 22+ is required** — install it with nvm inside WSL2 for easy version management
4. **Keep OpenClaw files in the Linux file system** (`/home/username/`), not the Windows file system (`/mnt/c/`) — performance matters
5. **Disable sleep AND configure lid close behavior** if you want 24/7 operation — the Settings app idle timeout and the Control Panel lid close setting are separate; both must be changed
6. **Tailscale is optional** but useful for remote access — we'll configure it with the gateway in Module 03
7. **A dedicated user account is optional** but adds a layer of security isolation
8. **Most installation errors** come from virtualization being disabled in BIOS or nvm not being sourced — the troubleshooting section covers both

---

## Further Reading

- [Microsoft WSL Documentation](https://learn.microsoft.com/en-us/windows/wsl/) — Official WSL2 docs
- [Node.js Downloads](https://nodejs.org/) — Official Node.js (we used nvm instead, but this is the source)
- [nvm GitHub](https://github.com/nvm-sh/nvm) — Node Version Manager documentation
- [Tailscale Documentation](https://tailscale.com/kb/) — Setting up and using Tailscale
- [OpenClaw Windows Platform Guide](https://docs.openclaw.ai/platforms/windows) — Official Windows instructions
- Source material in the `../Research/` folder:
  - `Some initial notes.md` — personal notes on WSL2, sleep mode, and Tailscale
  - `The Easiest Way To Install and Use OpenClaw For Beginners (Clawdbot).md` — environment setup principles

---

## What's Next

Your laptop is ready. WSL2 is running. Node.js is installed. systemd is enabled. You're in the right file system.

In **[Module 03: Installing OpenClaw](Module-03-Installing-OpenClaw.md)**, we'll run the actual installer, walk through the onboarding wizard step by step, configure your API key, and get the gateway running.

Time to bring your agent to life.
