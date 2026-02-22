# Module 02: Preparing Your Laptop

## Learning Objectives

By the end of this module, you will be able to:

1. Verify your laptop meets the minimum requirements for OpenClaw
2. Explain why WSL2 is required and what it does
3. Prepare a USB Setup Kit with everything needed to install WSL2 and Ubuntu
4. Install WSL2 and Ubuntu from USB — no Microsoft Store, no network required
5. Enable systemd inside WSL2 (required for the OpenClaw daemon)
6. Install Node.js 22+ inside your WSL2 environment
7. Verify that your entire environment is ready for OpenClaw installation
8. Configure your laptop for 24/7 operation (disable sleep, power settings)
9. Optionally set up Tailscale for secure remote access

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
| **USB Setup Kit** | A USB stick containing the WSL installer and Ubuntu image, prepared on your main computer so that setup works on any laptop without depending on the Microsoft Store |
| **Tailscale** | A secure networking tool that creates a private network between your devices over the internet — lets you access your OpenClaw from your phone or another computer |
| **Loopback** | A network address (127.0.0.1 or "localhost") that only your own computer can reach — nothing from the outside can reach it |

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

> **Tip:** If you need to do a clean install, you can prepare the Windows installer USB at the same time you prepare the WSL Setup Kit in Step 1. Same session, two USB sticks.

---

## Before We Start: Check Your Hardware

Before preparing anything, let's make sure your laptop can handle OpenClaw. We need to check three things: RAM, disk space, and Windows version. You can do these checks on the laptop itself — no internet needed.

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
| Windows 10 version 2004 or later | WSL2 supported with simplified setup |
| Windows 10 22H2 | Current — fully supported |
| Windows 11 | Fully supported |

> **Our laptop:** Windows 10, Version 22H2, Build 19045.2006. This supports WSL2.

**If your version is older than 1903:** You'll need to update Windows first. Go to **Settings > Update & Security > Windows Update** and install all available updates. You can do this on the laptop's own internet connection before switching to guest WiFi.

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

## Why an Old Laptop?

Most tutorials say: rent a VPS or buy a Mac Mini. Here's why a **used Windows laptop** is the best choice for running OpenClaw:

| Option | Cost | Privacy | Control |
|--------|------|---------|---------|
| **Old laptop** | $0–100 | Data stays home | You own everything |
| VPS (cloud server) | $5–20/month forever | Provider's computer | Provider can access it |
| Mac Mini | $500–800 | Good, but pricey | Overkill for one agent |

**The old laptop wins on cost, privacy, AND control.** You pay once (or $0 if you already have one), your data never leaves your house, and nobody else can touch it.

### Avoid Plug-and-Play Services

Some companies sell pre-configured OpenClaw boxes or hosted setups. **Be very careful.**

> *"DO NOT use a service that sets up OpenClaw for you. I tried 5 popular services and pretty much all of them exposed the gateway, didn't have pairing mode, and allowed the root directory to be discovered by the internet."*

What "exposed the gateway" means:
- Anyone on the internet could connect to the agent
- No pairing mode = no verification that YOU are the owner
- Root directory exposed = your files visible to the world

**This course teaches you to set it up yourself — correctly and securely.** That's why we're doing it step by step on hardware you own.

---

## Step 1: Connect to Guest WiFi and Update Windows

Before installing anything, the laptop needs Windows updates. A freshly wiped or factory-reset laptop may be missing critical updates — without them, the WSL installer will refuse to run (error: `WSL_E_OS_NOT_SUPPORTED`). But the laptop should **never** connect to your main home WiFi.

### 1.1 Why a Guest Network?

Most home WiFi networks are "flat" — every device can see and talk to every other device. Your phone, your personal laptop, your smart TV, and now your OpenClaw machine would all be neighbors on the same network. If the OpenClaw laptop is ever compromised (through a prompt injection attack, a malicious skill, or residual corporate software), an attacker could potentially reach your other devices.

A **guest network** provides internet access but **isolates devices** from your main network. The OpenClaw laptop can reach the internet (for API calls, updates, and messaging) but can't see your personal devices.

### 1.2 Set Up a Guest Network

You can do this from your **main computer or phone** — you don't need to be on the OpenClaw laptop for this.

1. Find your router's address: on any computer on your home network, open a terminal/command prompt and run `ipconfig` (Windows) or check your network settings. Look for **Default Gateway** (e.g., `192.168.1.1`, `10.0.0.1`, etc.). This varies by ISP and router brand
2. Open that address in a browser to reach your router's admin panel (check the label on the router for the login password)
3. Find the **Guest Network** or **Guest WiFi** settings (location varies by router brand)
4. Enable the guest network and set a password
5. Make sure **"Allow guests to access local network"** is **OFF** (this is the isolation setting)

> **If your router doesn't support guest networks**, you can still proceed on your main network and revisit network isolation in Module 10 (Security Hardening).

### 1.3 Connect the OpenClaw Laptop and Run Windows Update

1. On the OpenClaw laptop, open **Settings** > **Network & Internet** > **Wi-Fi**
2. Connect to the **guest** network you just created
3. **Do NOT connect to your main home WiFi** — the OpenClaw laptop should never be on your main network
4. Go to **Settings** > **Update & Security** > **Windows Update**
5. Click **"Check for updates"** — install everything, restart when prompted
6. After restarting, check for updates again (some updates only appear after earlier ones are installed)
7. Repeat until Windows says "You're up to date"

> **How long does this take?** On a freshly wiped laptop, the first round of updates can take **20-30 minutes** (sometimes longer). Be patient — this is normal. Some updates require a restart before more updates appear, so you may need to check 2-3 times.

> **Why is this first?** A freshly wiped laptop (especially Windows 10) ships without cumulative updates. The WSL installer (.msi) checks the OS build number and refuses to install on outdated builds. Running Windows Update first prevents this error and saves a frustrating round-trip later.

---

## Step 2: Prepare Your USB Setup Kit

This step happens on your **main computer** (not the OpenClaw laptop). You need a computer with internet access and a USB stick with at least 1 GB of free space.

The USB Setup Kit contains two installer files and a text file with all the commands you'll need to copy and paste — no Microsoft Store needed, no special network needed, no typing long commands from scratch. Once these files are on your USB stick, setup will work every time, on any machine.

### 2.1 Download the WSL Installer

1. On your main computer, open a browser
2. Go to: **github.com/microsoft/WSL/releases**
3. Find the latest release (it will be at the top of the page)
4. Under "Assets," you'll see several files. Download the one that ends in **`x64.msi`** — it will be named something like `wsl.2.x.x.x.x64.msi`
5. This is about 70 MB

> **x64 or ARM64?** Choose **x64** — this is for all standard Intel and AMD laptops. Only choose ARM64 if you have an ARM-based device like a Surface Pro X.

> **What is this?** This is the official WSL installer from Microsoft, packaged as a standard Windows installer. Double-click to install — no command line needed, no Microsoft Store needed.

### 2.2 Download the Ubuntu Image

1. In your browser, go to: **cloud-images.ubuntu.com/wsl/releases/24.04/current/**
2. Find the file that contains **amd64** and ends in **`.rootfs.tar.gz`** — look for `ubuntu-noble-wsl-amd64-wsl.rootfs.tar.gz`
3. Click it to download — it's about 340 MB
4. Wait for the download to finish

> **AMD or ARM?** Choose **amd64** — this is for all standard Intel and AMD laptops. Despite the name, "amd64" works on Intel processors too. The ARM file is only for ARM-based devices like Surface Pro X.

> **If the page is empty or the link doesn't work:** Ubuntu occasionally moves these files. Go to **cloud-images.ubuntu.com/wsl/** and navigate: click **releases/** → **24.04/** → **current/** → download the `amd64...rootfs.tar.gz` file. If the entire site has moved, search the web for **"Ubuntu WSL rootfs download"** — you need the `.rootfs.tar.gz` file for amd64.

### 2.3 Get the Setup Commands File

The course includes a file called **`setup-commands.txt`** that has every command you'll need to type, ready to copy and paste. Your instructor will provide this file, or you can download it from the course materials on GitHub.

> **What's in it?** All 18 commands you'll need for the entire module — PowerShell WSL commands, Ubuntu user setup, Start Menu shortcut, apt update, nvm, Node.js, power settings, and a final verification checklist. Each step is labeled and ready to copy-paste.

### 2.4 Copy All Three Files to Your USB Stick

1. Plug in your USB stick
2. Open **File Explorer** and navigate to the USB drive
3. Copy all three files to the USB stick:
   - The `.msi` file (WSL installer)
   - The `.rootfs.tar.gz` file (Ubuntu image)
   - The `setup-commands.txt` file (commands to copy and paste)

### 2.5 Verify Your USB Setup Kit

Before you unplug the USB, check that it has all three files:

| File | Size | What It Does |
|------|------|-------------|
| `wsl.2.x.x.x.x64.msi` | ~70 MB | Installs WSL2 on Windows |
| `ubuntu-noble-wsl-amd64-wsl.rootfs.tar.gz` | ~340 MB | Ubuntu operating system image |
| `setup-commands.txt` | ~1 KB | Every command you need, ready to copy and paste |

**That's your entire kit.** Three files, one USB stick. This is everything you need to get WSL2 and Ubuntu running on any Windows laptop, regardless of its network situation or Microsoft Store status.

---

## Step 3: Install WSL from USB

Now we move to the **OpenClaw laptop**. For this step, the laptop does NOT need to be connected to any WiFi network.

### 3.1 Copy Files from USB to Your Downloads Folder

This makes every command work on any machine — no drive letters to guess.

1. Plug your USB Setup Kit into the OpenClaw laptop
2. Open **File Explorer** and navigate to the USB drive
3. Select all three files on the USB stick
4. Copy them to your **Downloads** folder (in the left sidebar of File Explorer, click **Downloads**, then paste)

> **Why Downloads?** The setup commands use a shortcut (`$env:USERPROFILE\Downloads\`) that automatically points to your Downloads folder regardless of your Windows username. This means the commands work on any machine without editing.

### 3.2 Run the WSL Installer

1. Open your **Downloads** folder in File Explorer
2. **Double-click** the `.msi` file (the WSL installer)
3. You'll see a User Account Control prompt ("Do you want to allow this app to make changes to your device?") — click **Yes**
4. The installer runs silently and closes on its own — there's no wizard, no progress bar, no "Finish" button. **This is normal.** It installs in a few seconds and disappears.

That's it — no command line, no PowerShell, no Microsoft Store. If it felt like nothing happened, that's actually success.

### 3.3 Enable WSL Components

The `.msi` installed the WSL program, but Windows also needs its built-in virtualization features turned on. Without this step, importing Ubuntu will fail.

1. Click the **Start menu**, type `PowerShell`
2. Press `Ctrl + Shift + Enter` to open it as administrator
3. Click **Yes** on the permission prompt
4. Open the `setup-commands.txt` file from your Downloads folder (double-click it — it opens in Notepad)
5. Copy the command from **STEP 1** in the text file and paste it into PowerShell:

```powershell
& 'C:\Program Files\WSL\wsl.exe' --install --no-distribution
```

You'll see messages about enabling Windows features. When it finishes, it will say a restart is needed.

> **What does this do?** It turns on two Windows features: "Virtual Machine Platform" and "Windows Subsystem for Linux." These are the engines under the hood that WSL2 needs. The `.msi` installed the steering wheel — this command starts the engine.

### 3.4 Restart Your Computer

This is required. The Windows features you just enabled need a reboot to activate.

1. Save any open work
2. Click Start > Power > **Restart** (not Shut Down — Restart)
3. Wait for your computer to reboot

---

## Step 4: Import Ubuntu

After restarting, your laptop has WSL2 installed but no Linux distribution yet. Now we'll import Ubuntu from the file you copied to Downloads.

### 4.1 Open PowerShell as Administrator

1. Click the **Start menu** (Windows icon, bottom-left)
2. Type `PowerShell`
3. You'll see **Windows PowerShell** appear in the results
4. Press `Ctrl + Shift + Enter` to open it as administrator
5. A dialog box asks "Do you want to allow this app to make changes to your device?"
6. Click **Yes**

A blue PowerShell window opens. You should see something like:

```
Windows PowerShell
Copyright (C) Microsoft Corporation. All rights reserved.

PS C:\WINDOWS\system32>
```

> **Alternative:** If `Ctrl + Shift + Enter` doesn't work, right-click on Windows PowerShell and click **Run as administrator**.

### 4.2 Create a Folder for Ubuntu

Open `setup-commands.txt` from your Downloads folder (double-click it to open in Notepad). Copy the command from **STEP 2** and paste it into PowerShell:

```powershell
mkdir C:\WSL\Ubuntu
```

This creates a folder where Ubuntu's files will live on your Windows drive.

### 4.3 Import Ubuntu

> **Important — why the long command:** Windows 10 ships with an old, basic version of WSL in `C:\Windows\System32\` that doesn't support the `--import` command. The .msi you installed put the full version in `C:\Program Files\WSL\`. We need to call that one directly by using its full path. This is a one-time thing — once Ubuntu is imported, you won't need the full path anymore.

Copy the command from **STEP 3** in `setup-commands.txt` and paste it into PowerShell:

```powershell
& 'C:\Program Files\WSL\wsl.exe' --import Ubuntu C:\WSL\Ubuntu "$env:USERPROFILE\Downloads\ubuntu-noble-wsl-amd64-wsl.rootfs.tar.gz"
```

> **What's `$env:USERPROFILE`?** It's a shortcut that automatically expands to your user folder (e.g., `C:\Users\YourName`). Because you copied the Ubuntu file to Downloads earlier, this command works on any machine — no drive letters to figure out, no paths to edit.

**No output means success.** Verify it worked by copying the command from **STEP 4** in the text file:

```powershell
& 'C:\Program Files\WSL\wsl.exe' -l -v
```

You should see:

```
  NAME      STATE           VERSION
* Ubuntu    Running         2
```

Ubuntu is listed with VERSION 2. You're good.

---

## Step 5: Configure Ubuntu

The import logs you in as `root` (the administrator account) by default. You need to create a normal user account, enable systemd, and set up a Start Menu shortcut.

### 5.1 Open Ubuntu

In your PowerShell window, type:

```powershell
& 'C:\Program Files\WSL\wsl.exe' -d Ubuntu
```

You'll see a `root@` prompt. This means you're inside Ubuntu, logged in as the root (administrator) user.

> **Pasting commands in Ubuntu:** `Ctrl+V` does NOT work in the Ubuntu terminal. **Right-click** to paste — it pastes automatically. This catches everyone the first time.

### 5.2 Create Your User Account

Run this command:

```bash
adduser openclaw
```

- Set a password when prompted. **Nothing appears on screen when you type** — no dots, no stars, nothing. This is normal Linux behavior. Type your password and press Enter.
- It asks for Full Name, Room Number, Work Phone, etc. — **press Enter to skip all of these**
- Type **Y** when asked "Is the information correct?"

Then give your account administrator privileges:

```bash
usermod -aG sudo openclaw
```

### 5.3 Enable systemd and Set Your Default User

This single command does two things at once — it enables systemd (which the OpenClaw daemon needs) and sets your new account as the default user:

```bash
echo -e "[boot]\nsystemd=true\n\n[user]\ndefault=openclaw" > /etc/wsl.conf
```

### 5.4 Restart WSL and Verify

Type `exit` to leave Ubuntu. Back in PowerShell, restart WSL:

```powershell
& 'C:\Program Files\WSL\wsl.exe' --shutdown
```

Wait a few seconds, then open Ubuntu again:

```powershell
& 'C:\Program Files\WSL\wsl.exe' -d Ubuntu
```

**You should now see `openclaw@YOURPC` at the prompt instead of `root@`.** This confirms your user account is set up and is the default.

Verify systemd is running:

```bash
systemctl is-system-running
```

**Expected output:** `running` (or `degraded` — that's usually fine, it means some non-critical services had minor issues).

If you see `offline`, the wsl.conf didn't take effect. Re-run the echo command from Step 5.3, then `exit`, `wsl --shutdown`, and reopen.

### 5.5 Verify the Start Menu Shortcut

The WSL installer usually adds Ubuntu to the Start Menu automatically. Click the **Start menu** and type `ubuntu` — if it appears and launches, you're all set. Skip to the next step.

**If Ubuntu does NOT appear in the Start Menu**, create a shortcut manually:

1. Open **File Explorer**
2. Type `shell:programs` in the address bar and press Enter
3. Right-click in the empty space > **New** > **Shortcut**
4. For the location, type: `"C:\Program Files\WSL\wsl.exe" -d Ubuntu`
5. Click Next, name it **Ubuntu**, click Finish

**Congratulations — WSL2 and Ubuntu are installed and configured!** You can safely remove the USB stick now.

---

## Step 6: Update Ubuntu and Install Tools

Now that you have internet, let's update Ubuntu and install the tools OpenClaw needs.

### 6.1 Open Your Ubuntu Terminal

1. Click the Start menu
2. Type `Ubuntu`
3. Click the Ubuntu shortcut you created

You should see your Linux prompt:
```
openclaw@YOURPC:~$
```

### 6.2 Update Ubuntu Packages

```bash
sudo apt update && sudo apt upgrade -y
```

**Breaking this down:**
- `sudo` = "run as administrator" (it will ask for your Linux password)
- `apt update` — refreshes the list of available packages
- `apt upgrade -y` — installs any available updates (`-y` means "yes, don't ask me to confirm each one")

**What you'll see:** A lot of text scrolling by. This is normal. **Expect 5-10 minutes** on the first run — it's downloading and installing updates for the entire operating system. On slower connections, it can take longer.

When it's done, you'll see your prompt again:
```
openclaw@YOURPC:~$
```

### 6.3 Install Essential Tools

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

## Step 7: Install Node.js 22+

OpenClaw requires Node.js version 22 or newer. We'll install it using **nvm** (Node Version Manager), which is the recommended way to manage Node.js versions on Linux.

### 7.1 Install nvm

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

### 7.2 Activate nvm

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

If you see a version number, nvm is installed. If you see `nvm: command not found`, close the Ubuntu window completely, then reopen it using either method:
- **Start Menu:** type "Ubuntu" and click it
- **PowerShell:** `& 'C:\Program Files\WSL\wsl.exe' -d Ubuntu`

Then try `nvm --version` again.

### 7.3 Install Node.js 22

> **If paste stops working:** Sometimes the terminal gets stuck and right-click paste stops responding. Close the Ubuntu window completely, then reopen it using either method:
> - **Start Menu:** type "Ubuntu" and click it
> - **PowerShell:** `& 'C:\Program Files\WSL\wsl.exe' -d Ubuntu`
>
> Paste will work again.

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

### 7.4 Set Node.js 22 as Default

Make sure Node.js 22 is used every time you open a terminal:

```bash
nvm alias default 22
```

**What you should see:**

```
default -> 22 (-> v22.x.x)
```

### 7.5 Verify Node.js and npm

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

## Step 8: Configure Power Settings (24/7 Operation)

If you want your agent to be available 24/7 (receiving messages, running scheduled tasks, monitoring things), your laptop needs to stay awake. By default, Windows puts the computer to sleep after a period of inactivity. We need to change that.

### 8.1 Disable Sleep Mode

1. Press `Windows + I` to open **Settings**
2. Click **System**
3. Click **Power & sleep** on the left sidebar
4. Under **Sleep**, set both dropdowns to **Never**:
   - "When plugged in, PC goes to sleep after" → **Never**
   - "On battery power, PC goes to sleep after" → **Never** (if this option exists)

> **Important:** If you're running on a laptop, keep it plugged in. Running 24/7 on battery will drain it quickly and isn't practical.

### 8.2 Configure Lid Close Behavior (Laptops Only)

This is the step most guides miss. The Power & sleep settings from 8.1 only control the *idle timeout* — what happens when you walk away. They do **NOT** control what happens when you **close the laptop lid**. By default, closing the lid puts the laptop to sleep regardless of your idle timeout settings. You must change this separately.

1. Open **Control Panel** (type "Control Panel" in the Start menu search)
2. Click **Hardware and Sound**
3. Click **Power Options**
4. On the left sidebar, click **Choose what closing the lid does**
5. Under "When I close the lid":
   - Set "On battery" → **Do nothing**
   - Set "Plugged in" → **Do nothing**
6. Click **Save changes**

> **Why this matters:** If you set sleep to "Never" but leave lid close on its default, your laptop will still sleep the moment you close the lid. Your agent goes dark, scheduled tasks stop, messages pile up unanswered. Both settings must be changed.

### 8.3 Disable Hibernate (Optional but Recommended)

Hibernate saves your computer's state to disk and shuts down. It can interrupt WSL2. To disable it:

1. Open **PowerShell as Administrator** (Start menu > type "PowerShell" > press `Ctrl + Shift + Enter`)
2. Run:

```powershell
powercfg /hibernate off
```

> **Note:** This command requires administrator privileges. If you see "The operation requires administrator privilege," you opened a regular PowerShell instead of an admin one. Close it and reopen with `Ctrl + Shift + Enter`.

### 8.4 Prevent the Display from Turning Off (Optional)

You might want the screen off to save power, but the computer itself stays on:

1. In **Settings > System > Power & sleep**
2. Under **Screen**, set:
   - "When plugged in, turn off after" → Your preference (5 minutes is fine)
   - This only turns off the display — the computer and WSL2 keep running

### 8.5 Verify WSL2 Survives Lid Close

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
- Lid close is set to "Do nothing" in Control Panel (Step 8.2)
- Sleep is set to "Never" in Settings (Step 8.1)
- Both settings are configured for "Plugged in" (keep the laptop plugged in)

---

## Step 9: Understand the File System Boundary

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

If it says `degraded`, that's usually fine — it means some non-critical services had issues. If it says `offline`, systemd isn't enabled. Re-run the echo command from Step 5.3, then restart WSL.

### Check 3: Node.js Version

```bash
node --version
```

**Expected output:**
```
v22.x.x
```

Must be 22 or higher. If you see `command not found`, go back to Step 7.

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

(Or `/home/yourusername` if you chose a different name.)

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

## Optional Steps

### Set Up Tailscale (Remote Access)

Tailscale is optional but incredibly useful. It lets you access your OpenClaw gateway from other devices — your phone, another computer, or anywhere with internet. It creates a secure, encrypted network between your devices.

**Skip this step if:**
- You'll only access OpenClaw from this laptop
- You want to get OpenClaw running first and add remote access later

**Do this step if:**
- You want to access OpenClaw from your phone
- You want to access OpenClaw from another computer
- You want to access the gateway dashboard remotely

**Create a Tailscale Account:**
1. Go to https://tailscale.com in your browser
2. Click **Get Started** or **Sign Up**
3. Sign in with Google, Microsoft, or GitHub
4. The free plan is sufficient for personal use

**Install Tailscale on Windows:**
1. Go to https://tailscale.com/download
2. Download the Windows installer
3. Run the installer
4. Tailscale will appear in your system tray (bottom-right of your taskbar)
5. Click the Tailscale icon and sign in

**Install Tailscale Inside WSL2:**

Open your Ubuntu terminal and run:

```bash
curl -fsSL https://tailscale.com/install.sh | sh
```

Then start Tailscale:

```bash
sudo tailscale up
```

This will give you a URL to open in your browser to authorize the device. Open it and approve.

**Verify Tailscale:**

```bash
tailscale status
```

You should see your devices listed with their Tailscale IP addresses (usually `100.x.x.x`).

**What this means for OpenClaw:**

Later, when we configure the OpenClaw gateway, we'll have the option to set its bind address. If you want remote access, you'll set it to listen on the Tailscale interface:
- From this laptop: access via `http://127.0.0.1:18789/`
- From your phone (on Tailscale): access via `http://100.x.x.x:18789/`
- From anywhere else (without Tailscale): no access (secure by default)

We'll configure this in Module 03.

### Enable Disk Encryption (Recommended)

If your OpenClaw device stores API keys, personal data, conversation history, and agent memory, you should consider encrypting the disk. If the device is ever lost or stolen, encrypted data is unreadable without your password.

**Windows (BitLocker):**
- Open **Settings > Update & Security > Device encryption** (or search for "BitLocker" in the Start menu)
- Turn on BitLocker for your main drive
- Save your recovery key somewhere safe (NOT on the same machine)

> **Note:** BitLocker is available on Windows 10 Pro and Enterprise. Windows 10 Home has "Device Encryption" instead, which works similarly but requires a Microsoft account.

**Linux (LUKS):**
- If you're using a dedicated Linux machine (not WSL2), enable LUKS encryption during OS installation

**Mac (FileVault):**
- Open **System Preferences > Security & Privacy > FileVault**
- Click "Turn On FileVault"

### Create a Dedicated User Account (Security Isolation)

This is a security measure from Module 01's Principle 2 (Least Privilege). Creating a separate Linux user account for OpenClaw means:

- If something goes wrong, the damage is limited to that account's files
- The OpenClaw agent can't access your personal Linux files
- It's cleaner separation of concerns

**Skip this step if:**
- You want to keep things simple for now
- You're the only user and aren't concerned about isolation
- You plan to use Docker sandboxing instead (Module 10)

**To create the account:**

```bash
sudo adduser myagent
```

Set a password, skip optional fields by pressing Enter. Type `Y` to confirm.

**To switch into the account:**

```bash
su - myagent
```

When you install OpenClaw in Module 03, you'd install it under this account. Type `exit` to return to your regular account.

---

## Common Mistakes and Troubleshooting

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
7. Re-run the WSL `.msi` installer from your USB stick

**How to know your CPU brand:** Press `Ctrl + Shift + Esc` (Task Manager) > Performance > CPU. The name at the top tells you (e.g., "Intel Core i5-..." or "AMD Ryzen 5-...").

### Error WSL_E_OS_NOT_SUPPORTED

**What happened:** The WSL .msi installer refuses to run because Windows is missing cumulative updates. This is common on freshly wiped laptops.

**Fix:** Run Windows Update first (Step 1). Go to **Settings > Update & Security > Windows Update**, install all updates, restart, and repeat until no more updates are available. Then re-run the .msi installer.

### "Warning 1964" During .msi Install

**What happened:** You see a "Warning 1964" message during the WSL .msi installation. This is a cosmetic shortcut property error.

**Fix:** Ignore it — WSL installed fine. This warning is harmless.

### "The WSL optional component is not enabled" or Error 0x80004002

**What happened:** The WSL program is installed (from the .msi), but the Windows features it needs aren't turned on yet. This happens when Step 3.3 (Enable WSL Components) was skipped or didn't complete.

**Fix:** Open PowerShell as Administrator and run:
```powershell
& 'C:\Program Files\WSL\wsl.exe' --install --no-distribution
```

Restart your computer, then try the import command again.

**Alternative fix** (if the above doesn't work): Run these two commands manually:
```powershell
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

Restart your computer, then try the import command again.

### USB Stick Not Detected or Wrong Drive Letter

**What happened:** The laptop doesn't see the USB stick, or you're not sure which drive letter it has.

**Fix:**
1. Try a different USB port (some older laptops have flaky USB ports)
2. Open **File Explorer** > **This PC** to see all drives and their letters
3. The USB stick will typically be `D:`, `E:`, or `F:` — look for the one that has your two setup files

### "wsl --import" Gives an Error

**What happened:** The import command has a typo or the file path is wrong.

**Fix:** Use the exact command from `setup-commands.txt` — it uses `$env:USERPROFILE\Downloads\` which automatically points to the right place. If you copied the Ubuntu file to your Downloads folder (Step 2.1), the command works as-is with no editing.

If you still get an error, make sure:
1. The Ubuntu `.tar.gz` file is actually in your Downloads folder (open Downloads in File Explorer and check)
2. The filename in the command matches the actual filename exactly
3. You're using the full path to WSL (`& 'C:\Program Files\WSL\wsl.exe'`)

### Paste Stops Working in Ubuntu Terminal

**What happened:** Sometimes the Ubuntu terminal gets stuck and right-click paste stops responding. This can happen after running long commands like the nvm installer.

**Fix:** Close the Ubuntu window completely, then reopen it using either method:
- **Start Menu:** type "Ubuntu" and click it
- **PowerShell:** `& 'C:\Program Files\WSL\wsl.exe' -d Ubuntu`

Paste will work again. You won't lose anything — your installed software is all still there.

### "node: command not found" After Installing nvm

**What happened:** nvm hasn't been loaded into your current shell session.

**Fix:** Run:
```bash
source ~/.bashrc
```

Or close the Ubuntu window and reopen it:
- **Start Menu:** type "Ubuntu" and click it
- **PowerShell:** `& 'C:\Program Files\WSL\wsl.exe' -d Ubuntu`

Then try `node --version` again.

If it still doesn't work, verify nvm is installed:
```bash
ls ~/.nvm/
```

If the directory doesn't exist, re-run the nvm installation command from Step 7.1.

### "sudo: command not found" or Password Not Accepted

**What happened:** You might be typing your Windows password instead of your Linux password.

**Fix:** Use the password you created during Ubuntu setup (Step 4.2), not your Windows login password. They are separate.

If you've forgotten your Linux password, reset it from PowerShell:
```powershell
wsl -u root passwd openclaw
```

(Replace `openclaw` with your Linux username.)

### "Run as administrator" Is Unavailable or Blocked

**What happened:** The laptop has residual corporate Group Policy restrictions.

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

### Laptop Sleeps When Lid Closes

**What happened:** The lid close behavior wasn't changed.

**Fix:** You must change **two separate settings**:
1. **Settings > System > Power & sleep** — set Sleep to **Never** (this controls idle timeout)
2. **Control Panel > Hardware and Sound > Power Options > Choose what closing the lid does** — set to **Do nothing** (this controls the lid)

Both must be set. The Settings app does NOT control what happens when you close the lid — that's only in the old Control Panel.

### Ubuntu Terminal Is Extremely Slow

**What happened:** This sometimes happens on the first launch after installation, or if Windows Defender is scanning WSL2 files.

**Fix:**
1. Wait a few minutes for the initial setup to complete
2. Optionally, exclude the WSL2 directory from Windows Defender:
   - Open **Windows Security**
   - Click **Virus & threat protection**
   - Under "Virus & threat protection settings", click **Manage settings**
   - Scroll to **Exclusions**, click **Add or remove exclusions**
   - Click **Add an exclusion** > **Folder**
   - Navigate to `C:\WSL\Ubuntu` and add it

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
- [ ] **USB Setup Kit:** Prepared with WSL .msi and Ubuntu .tar.gz
- [ ] **WSL2:** Installed from USB and running (`wsl -l -v` shows Ubuntu, VERSION 2)
- [ ] **Ubuntu username:** Created (username: ______)
- [ ] **systemd:** Enabled (`systemctl is-system-running` shows "running" or "degraded")
- [ ] **Node.js:** Version 22+ installed (`node --version` shows v22.x.x)
- [ ] **npm:** Installed (`npm --version` shows 10.x.x)
- [ ] **Git:** Installed (`git --version` shows a version number)
- [ ] **Power settings:** Sleep disabled AND lid close set to "Do nothing" (if running 24/7)
- [ ] **Network:** Connected to guest WiFi (not main WiFi)
- [ ] **File system:** You're in `/home/username/`, not `/mnt/c/`
- [ ] **Optional: Tailscale** installed and connected
- [ ] **Optional: Dedicated user account** created

**Bonus exercise:** Open File Explorer and navigate to `\\wsl$\Ubuntu\home\openclaw\` (replace `openclaw` with your username). You should see an empty or near-empty home directory. This is where OpenClaw will live.

---

## Key Takeaways

1. **Guest WiFi and Windows Update come first** — the laptop connects to a guest network (never your main WiFi) and gets updated before anything else. Fresh installs need updates or the WSL installer will refuse to run
2. **Prepare a USB Setup Kit** — WSL .msi + Ubuntu image + setup-commands.txt on your main computer. Copy to Downloads on the laptop, and every command is ready to paste — no typing, no drive letters to guess
3. **OpenClaw requires WSL2 on Windows** — it runs inside a Linux environment, not directly on Windows
4. **Install WSL, enable components, then import Ubuntu** — the core WSL installation happens from USB, no internet needed
5. **systemd is enabled** during Ubuntu configuration — one command handles it
6. **Node.js 22+ is required** — install with nvm for easy version management
7. **Keep OpenClaw files in the Linux file system** (`/home/username/`), not the Windows file system (`/mnt/c/`) — performance matters
8. **Disable sleep AND configure lid close behavior** — both the Settings app idle timeout and the Control Panel lid close setting must be changed; they're separate
9. **Guest WiFi only** — the OpenClaw laptop never connects to your main home network

---

## Further Reading

- [Microsoft WSL Documentation](https://learn.microsoft.com/en-us/windows/wsl/) — Official WSL2 docs
- [WSL GitHub Releases](https://github.com/microsoft/WSL/releases) — Where you downloaded the .msi installer
- [Ubuntu Cloud Images](https://cloud-images.ubuntu.com/wsl/) — Where you downloaded the Ubuntu rootfs
- [Node.js Downloads](https://nodejs.org/) — Official Node.js (we used nvm instead, but this is the source)
- [nvm GitHub](https://github.com/nvm-sh/nvm) — Node Version Manager documentation
- [Tailscale Documentation](https://tailscale.com/kb/) — Setting up and using Tailscale
- [OpenClaw Windows Platform Guide](https://docs.openclaw.ai/platforms/windows) — Official Windows instructions
- Source material in the `../Research/` folder:
  - `Some initial notes.md` — personal notes on WSL2, sleep mode, and Tailscale
  - `The Easiest Way To Install and Use OpenClaw For Beginners (Clawdbot).md` — environment setup principles

---

## What's Next

Your laptop is ready. WSL2 is running. Node.js is installed. systemd is enabled. You're in the right file system. And the best part? Everything was installed from a USB stick with copy-paste commands — no Microsoft Store headaches, no network surprises, no typing long paths from scratch.

In **[Module 03: Installing OpenClaw](Module-03-Installing-OpenClaw.md)**, we'll run the actual installer, walk through the onboarding wizard step by step, configure your API key, and get the gateway running.

Time to bring your agent to life.
