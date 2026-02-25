# Module 02: Preparing Your Old Laptop

## Learning Objectives

By the end of this module, you will be able to:

1. Verify your laptop meets the minimum requirements for OpenClaw
2. Explain why a dedicated Ubuntu laptop is the ideal setup
3. Create a bootable Ubuntu USB drive using Rufus
4. Install Ubuntu 24.04 LTS on your laptop (replacing Windows)
5. Verify WiFi compatibility before installing
6. Install Node.js 22+ using nvm
7. Configure your laptop for 24/7 operation (disable sleep, lid close behavior)
8. Optionally set up Tailscale for secure remote access

---

## Key Vocabulary

| Term | Definition |
|------|-----------|
| **Ubuntu** | A popular, beginner-friendly Linux operating system. We'll install version 24.04 LTS on your laptop |
| **ISO** | A disk image file — a single file that contains an entire operating system installer. You download one ISO, put it on a USB, and boot from it to install |
| **Rufus** | A free Windows tool that turns a USB stick into a bootable installer. You select the ISO, pick the USB drive, and click Start |
| **BIOS/UEFI** | The firmware that runs before your operating system. You access it during startup (usually by pressing F2, F12, or Delete) to change boot order or enable features |
| **Boot from USB** | Starting your computer from a USB stick instead of the hard drive. This lets you run or install an operating system from the USB |
| **LTS** | Long-Term Support — Ubuntu releases an LTS version every two years with five years of free security updates. Version 24.04 is supported until 2029 |
| **Terminal** | A text-based interface where you type commands. On Ubuntu, open it from the dock or press `Ctrl+Alt+T` |
| **systemd** | The system and service manager for Linux. OpenClaw's daemon (background service) needs systemd to start automatically and keep running. On native Ubuntu, systemd works out of the box — no configuration needed |
| **Daemon** | A program that runs in the background continuously, like a service. The OpenClaw gateway runs as a daemon so it's always on |
| **Node.js** | A JavaScript runtime — the engine that OpenClaw is built on. You need version 22 or newer |
| **npm** | Node Package Manager — comes with Node.js. Used to install and manage JavaScript packages |
| **nvm** | Node Version Manager — a tool that lets you install and switch between different versions of Node.js easily |
| **PATH** | A list of directories your computer checks when you type a command. If a program isn't in your PATH, the computer can't find it |
| **Tailscale** | A secure networking tool that creates a private network between your devices over the internet — lets you access your OpenClaw from your phone or another computer |

---

## Before You Begin: Used or Pre-Owned Laptops

If you bought or were given a **used laptop** — especially one that came from a workplace — read this section carefully before doing anything else.

### The Problem with Corporate Laptops

Many used laptops were previously managed by a company's IT department. Corporate machines often have:

- **BIOS passwords** — the most common blocker. If the BIOS is password-protected, you can't change the boot order to start from USB, which means you can't install Ubuntu
- **Secure Boot restrictions** — may prevent booting from USB drives with non-Windows operating systems
- **MDM (Mobile Device Management) enrollment** — remote management software that can survive a Windows reset

Since we're installing Ubuntu (erasing Windows entirely), most corporate software restrictions don't matter — they get wiped with Windows. The **BIOS password is the only real blocker**.

### How to Check for a BIOS Password

1. Restart the laptop
2. During startup, press the BIOS key for your manufacturer (see the BIOS key table in Step 3 below)
3. If it opens a settings screen — no BIOS password, you're fine
4. If it asks for a password — try common defaults first: empty (just press Enter), `admin`, `password`, `1234`
5. If none work, try looking up the service tag on **bios-pw.org** — it can sometimes generate a master password

> **If the BIOS is locked and nothing works:** This laptop isn't suitable for our purposes. Use a different laptop, or contact the original owner/company for the password.

### Corporate Check Summary

| Check | How | Concern Level |
|-------|-----|--------------|
| BIOS password | Restart, press BIOS key | **Blocker** if locked |
| Secure Boot | Check BIOS settings | Low — can usually be disabled |
| MDM / Group Policy | Irrelevant | **Wiped** when Ubuntu is installed |

---

## Check Your Hardware

Before preparing anything, let's make sure your laptop can handle OpenClaw. We need to check two things while still in Windows: RAM and disk space.

### Checking Your RAM

1. Press `Ctrl + Shift + Esc` to open **Task Manager**
2. Click the **Performance** tab at the top
3. Click **Memory** on the left sidebar
4. Look at the number in the top-right corner

**Minimum requirements:**
| RAM | Verdict |
|-----|---------|
| 4 GB or less | Not enough — OpenClaw will struggle |
| 8 GB | Minimum — it will work but may be slow when multitasking |
| 16 GB | Excellent — plenty for OpenClaw and everything else |
| 32 GB+ | Overkill for OpenClaw, but great if you want to run local models later |

### Alternative Hardware: Raspberry Pi 5

If you'd rather use a dedicated, low-power device instead of an old laptop, a **Raspberry Pi 5** (4 GB+ model, ~$155–165 for a complete kit) can run OpenClaw with cloud-based models. It runs Linux natively, uses very little power, and some community members pair it with a smart plug for remote restart capability.

This is **not required** — your old laptop works perfectly fine, and that's what this course is designed around. But if you're interested in a tiny, silent, always-on device, it's a viable option.

### Checking Your Disk Space

1. Open **File Explorer** (press `Windows + E`)
2. Click **This PC** in the left sidebar
3. Look at your main drive (usually `C:`)

**Minimum requirements:**
| Free Space | Verdict |
|------------|---------|
| Less than 10 GB | Not enough — you need more space |
| 10–20 GB | Tight — will work but leaves no room for growth |
| 20–50 GB | Good — comfortable for OpenClaw and its data |
| 50 GB+ | Excellent — plenty of room for everything |

**What uses the space after Ubuntu is installed:**
- Ubuntu itself: ~10–15 GB
- Node.js: ~200 MB
- OpenClaw itself: ~500 MB
- OpenClaw data (transcripts, memory, sessions): grows over time, typically 1–10 GB

---

## Why an Old Laptop?

Most tutorials say: rent a VPS or buy a Mac Mini. Here's why a **used laptop** is the best choice for running OpenClaw:

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

## Getting Windows Back

Before we erase Windows and install Ubuntu, let's address the obvious question: *What if I want Windows back later?*

**Good news:** Your Windows license is tied to the motherboard, not the hard drive. If you reinstall Windows later, it will automatically reactivate — no product key needed.

**How to get Windows back (if you ever want it):**
1. On another computer, download the Windows 10 Media Creation Tool from microsoft.com
2. Create a bootable USB installer
3. Boot from the USB and install Windows
4. It will activate automatically using the license stored in your BIOS

**Difficulty: about 4 out of 10.** It's the same process as installing Ubuntu, just in reverse.

> **Insurance:** Windows 10 reaches end-of-life in October 2025. Microsoft may eventually stop offering the ISO for download. If you think you might want Windows back someday, download the ISO now and save it to your main computer — just in case.

> **Bottom line:** Installing Ubuntu is not a one-way door. You can always go back. But for running OpenClaw, Ubuntu is objectively simpler: systemd works out of the box, no PATH issues, no paste bugs, no compatibility layers. That's why we're using it.

---

## What You Will Need

Before starting, gather everything:

| Item | Details |
|------|---------|
| **USB stick** | 12 GB or larger (the Ubuntu ISO is ~5.9 GB) |
| **Another computer** | To download Ubuntu and create the USB — can be Windows, Mac, or Linux |
| **WiFi password** | For the network this laptop will connect to (ideally a guest network) |
| **Time** | 60–90 minutes for the full process |

You'll also need an **Anthropic API key** for Module 03, but not yet. We'll cover that when we get there.

---

## Step 1: Download Ubuntu and Rufus

This step happens on your **main computer** (not the laptop you're converting).

### 1.1 Download Ubuntu

1. Open a browser and go to: **ubuntu.com/download/desktop**
2. Click the **Download** button for **Ubuntu 24.04.x LTS**
3. The download is about **5.9 GB** — it will take a few minutes depending on your connection
4. Save the `.iso` file to your Downloads folder

> **Why 24.04 LTS?** LTS means Long-Term Support — five years of security updates (until 2029). This is the stable, reliable choice for a server that runs 24/7.

### 1.2 Download Rufus

1. In your browser, go to: **rufus.ie**
2. Download **Rufus Portable** (the smaller file, about 1.9 MB) — no installation needed
3. Save it to your Downloads folder

> **What is Rufus?** It's a free tool that turns a USB stick into a bootable installer. Ubuntu's own website recommends it for creating bootable USBs on Windows.

---

## Step 2: Create a Bootable USB with Rufus

### 2.1 Plug In Your USB Stick

Insert the USB stick into your **main computer** (the one where you downloaded Ubuntu and Rufus).

> **Warning:** Everything on the USB stick will be erased. If you have files on it, back them up first.

### 2.2 Run Rufus

1. Double-click the Rufus file you downloaded — it runs directly, no installation
2. If Windows asks "Do you want to allow this app to make changes to your device?" — click **Yes**

### 2.3 Configure Rufus

Rufus opens with a simple window. Set these options:

| Setting | What to Choose |
|---------|---------------|
| **Device** | Select your USB stick (check the size matches your USB — don't select your hard drive!) |
| **Boot selection** | Click **SELECT** and browse to the Ubuntu `.iso` file you downloaded |
| **Partition scheme** | GPT (this is the default for most modern laptops) |
| **Target system** | UEFI (non CSM) — the default |
| Everything else | Leave as default |

### 2.4 Start Writing

1. Click **START**
2. If Rufus asks about the write mode, accept the recommended option (usually "Write in ISO image mode")
3. Rufus will warn you that all data on the USB will be destroyed — click **OK**
4. Wait for it to finish (usually 5–15 minutes depending on USB speed)
5. When the progress bar says "READY," click **CLOSE**

Your USB stick is now a bootable Ubuntu installer. You can safely eject it.

---

## Step 3: Boot from USB

Now we move to the **old laptop** — the one that will become your OpenClaw machine.

### 3.1 Plug In the USB and Restart

1. Plug the bootable USB stick into the laptop
2. Restart the laptop (or turn it on if it's off)

### 3.2 Access the Boot Menu

During startup, you need to press a key to access the boot menu. The key depends on your laptop manufacturer:

| Manufacturer | BIOS / Boot Menu Key |
|-------------|---------------------|
| Dell | F12 |
| HP | F9 or Esc |
| Lenovo | F12 or Fn+F12 |
| Acer | F12 |
| ASUS | Esc or F8 |
| Toshiba | F12 or F2 |
| Samsung | F2 or F10 |
| MSI | F11 |

> **Timing:** Press the key repeatedly as soon as you see the manufacturer's logo, before Windows starts loading. If you miss it, just restart and try again.

> **If none of these keys work:** Try `F2` or `Delete` to enter BIOS settings instead. Once in BIOS, look for "Boot Order" or "Boot Priority" and move "USB" to the top. Save and exit.

### 3.3 Select the USB Drive

The boot menu shows a list of devices. Select the one that says **USB**, **UEFI USB**, or shows your USB stick's brand name. Press Enter.

> **Secure Boot:** If the laptop won't boot from USB, you may need to disable Secure Boot in BIOS. Enter BIOS (usually F2 or Delete during startup), find the Secure Boot setting, disable it, save, and try again.

---

## Step 4: "Try Ubuntu" — Test WiFi First

After booting from USB, the Ubuntu installer loads. You'll see a welcome screen.

### 4.1 Choose "Try Ubuntu"

Click **"Try Ubuntu"** (NOT "Install Ubuntu" — not yet). This loads Ubuntu from the USB without making any changes to your hard drive. You can explore, test things, and make sure everything works before committing.

### 4.2 Test Your WiFi

This is the most important test. If WiFi doesn't work in "Try Ubuntu" mode, it won't work after installation either.

1. Look at the **top-right corner** of the screen — you'll see a system menu with WiFi, battery, and power icons
2. Click the **WiFi icon**
3. Your available WiFi networks should appear
4. Connect to any network to test

**If your WiFi networks appear and you can connect — you're good.** Skip to Step 5.

### WiFi Compatibility

Most laptop WiFi chips work with Ubuntu out of the box. Here's a rough guide:

| WiFi Chipset | Ubuntu Support |
|-------------|---------------|
| Intel | Excellent — almost always works immediately |
| Qualcomm/Atheros | Good — usually works |
| Realtek | Hit or miss — some models need extra drivers |
| Broadcom | Worst compatibility — often needs manual driver installation |

> **How to check your chipset (while still in Windows):** Open Device Manager > Network adapters. Your WiFi adapter's name tells you the brand.

### If WiFi Doesn't Work

Don't panic. You have three backup options:

1. **USB WiFi adapter** (~$15) — a small USB dongle with better Linux support. Buy one with an Atheros or Ralink chipset, or search "Linux compatible USB WiFi adapter"
2. **Phone tethering** — connect your phone via USB cable, enable USB tethering in your phone's settings. Ubuntu recognizes it as a wired connection
3. **Ethernet cable** — if the laptop has an Ethernet port, plug it directly into your router

Any of these will get you online. WiFi through the built-in chip is ideal, but not the only way.

---

## Step 5: Install Ubuntu

If WiFi works (or you have a backup plan), you're ready to install.

### 5.1 Launch the Installer

From the "Try Ubuntu" desktop, double-click the **"Install Ubuntu"** icon (it's on the desktop).

### 5.2 Walk Through the Installer

The Ubuntu installer is a graphical wizard. Here are the key screens:

**Language:** Choose your language and click **Continue**.

**Keyboard layout:** The default is usually correct. Click **Continue**.

**Installation type:** Choose **"Interactive installation"** (not Automated).

**Software selection:** Choose **"Default selection"** — this includes the basic desktop, browser, and utilities. You don't need the extended selection.

**Install third-party software:**
> **CRITICAL:** Check the box for **"Install third-party software for graphics and Wi-Fi hardware"**. This installs proprietary drivers that many WiFi chips need. Skipping this is the #1 cause of WiFi not working after installation.

**Installation type (disk):** Choose **"Erase disk and install Ubuntu"**

> **This erases everything on the laptop's hard drive.** All Windows files, programs, and data will be permanently deleted. Make sure you've backed up anything you need. The laptop becomes a dedicated Ubuntu machine.

**Create your account:**
- Your name: whatever you like
- Computer name: whatever you like (e.g., `openclaw-laptop`)
- Username: **`openclaw`** (this keeps things consistent with the course)
- Password: choose something you'll remember — you'll type it often for `sudo` commands

> **Remember this password!** There's no "forgot password" link. If you forget it, you'll need to boot into recovery mode to reset it.

**Timezone:** Select your timezone.

**Review and Install:** Click **Install** and wait. The installation takes 15–40 minutes depending on your hardware.

### 5.3 Restart

When the installer says "Installation Complete," click **Restart Now**. Remove the USB stick when prompted (or when the screen goes black during restart).

The laptop boots into Ubuntu. Log in with the username and password you created.

**Congratulations — your laptop is now running Ubuntu.**

---

## Step 6: Connect to Guest WiFi

### 6.1 Why a Guest Network?

Most home WiFi networks are "flat" — every device can see and talk to every other device. Your phone, your personal laptop, your smart TV, and now your OpenClaw machine would all be neighbors on the same network. If the OpenClaw laptop is ever compromised (through a prompt injection attack, a malicious skill, or other exploit), an attacker could potentially reach your other devices.

A **guest network** provides internet access but **isolates devices** from your main network. The OpenClaw laptop can reach the internet (for API calls, updates, and messaging) but can't see your personal devices.

### 6.2 Set Up a Guest Network

You can do this from your **main computer or phone** — you don't need to be on the OpenClaw laptop for this.

1. Find your router's address: on any computer on your home network, check your network settings or open a terminal and run `ipconfig` (Windows) or `ip route` (Linux). Look for **Default Gateway** (e.g., `192.168.1.1`, `10.0.0.1`, etc.). This varies by ISP and router brand
2. Open that address in a browser to reach your router's admin panel (check the label on the router for the login password)
3. Find the **Guest Network** or **Guest WiFi** settings (location varies by router brand)
4. Enable the guest network and set a password
5. Make sure **"Allow guests to access local network"** is **OFF** (this is the isolation setting)

> **If your router doesn't support guest networks**, you can still proceed on your main network and revisit network isolation in Module 10 (Security Hardening).

### 6.3 Connect the OpenClaw Laptop

1. Click the **system menu** in the top-right corner of the Ubuntu desktop (WiFi/battery/power area)
2. Click **Wi-Fi** and then **Select Network**
3. Connect to the **guest** network you created
4. **Do NOT connect to your main home WiFi** — the OpenClaw laptop should never be on your main network

---

## Step 7: Update Ubuntu and Install Tools

### 7.1 Open the Terminal

You can open a terminal in Ubuntu two ways:
- Click the **Terminal** icon in the dock (taskbar) on the left side of the screen
- Press **`Ctrl + Alt + T`** anywhere

You should see a prompt like:
```
openclaw@openclaw-laptop:~$
```

> **Pasting commands in the terminal:** Use **`Ctrl+Shift+V`** to paste (not `Ctrl+V` — that doesn't work in the terminal). You can also right-click and choose Paste.

### 7.2 Update Ubuntu Packages

```bash
sudo apt update && sudo apt upgrade -y
```

**Breaking this down:**
- `sudo` = "run as administrator" (it will ask for your password)
- `apt update` — refreshes the list of available packages
- `apt upgrade -y` — installs any available updates (`-y` means "yes to all")

**What you'll see:** A lot of text scrolling by. This is normal. **Expect 5–10 minutes** on the first run — it's downloading and installing updates for the entire operating system.

> **Password won't show when you type** — no dots, no stars, nothing. This is normal Linux behavior. Type your password and press Enter.

When it's done, you'll see your prompt again.

### 7.3 Install Essential Tools

```bash
sudo apt install -y git curl wget build-essential
```

**What these are:**
| Tool | What It's For |
|------|--------------|
| `git` | Version control — used for backing up your OpenClaw workspace |
| `curl` | Downloading files from the internet — used by installers |
| `wget` | Another download tool — some scripts prefer it |
| `build-essential` | Compilation tools — some npm packages need to compile native code |

These may already be installed. If so, you'll see messages like `git is already the newest version`. That's fine.

---

## Step 8: Install Node.js 22+

OpenClaw requires Node.js version 22 or newer. We'll install it using **nvm** (Node Version Manager), which is the recommended way to manage Node.js versions on Linux.

### 8.1 Install nvm

In your terminal, run:

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
```

**What this does:**
- Downloads the nvm installer script
- Runs it, which installs nvm to `~/.nvm/`
- Adds nvm to your shell's startup file

### 8.2 Activate nvm

Close the terminal and reopen it (click Terminal in the dock, or press `Ctrl+Alt+T`). This loads nvm into your session.

Then verify nvm is installed:

```bash
nvm --version
```

**Expected output:**
```
0.40.4
```

If you see a version number, nvm is installed. If you see `nvm: command not found`, try running `source ~/.bashrc` first. If that doesn't work, close the terminal completely and reopen it.

### 8.3 Install Node.js 22

```bash
nvm install 22
```

**What you should see:**
```
Downloading and installing node v22.x.x...
Now using node v22.x.x (npm v10.x.x)
Creating default alias: default -> 22 (-> v22.x.x)
```

### 8.4 Set Node.js 22 as Default

Make sure Node.js 22 is used every time you open a terminal:

```bash
nvm alias default 22
```

### 8.5 Verify Node.js and npm

```bash
node --version
```

**Expected:** `v22.x.x` (any version starting with 22)

```bash
npm --version
```

**Expected:** `10.x.x` or `11.x.x` (comes bundled with Node.js 22)

---

## Step 9: Power Settings for 24/7 Operation

If you want your agent to be available 24/7 (receiving messages, running scheduled tasks, monitoring things), your laptop needs to stay awake.

### 9.1 Disable Automatic Suspend

1. Open **Settings** (click the gear icon in the top-right system menu, or search for "Settings" in the Activities overview)
2. Go to **Power**
3. Set **"Automatic Suspend"** to **OFF** for both "On Battery Power" and "Plugged In"
4. Set **"Screen Blank"** to **Never** (or a short time like 5 minutes if you want the screen to turn off but the computer to stay on)

> **Keep the laptop plugged in.** Running 24/7 on battery isn't practical.

### 9.2 Configure Lid Close Behavior

By default, closing the laptop lid suspends the computer. We need to change this so the laptop stays running when the lid is closed.

Open a terminal and run these three commands:

```bash
sudo sed -i 's/#HandleLidSwitch=suspend/HandleLidSwitch=ignore/' /etc/systemd/logind.conf
sudo sed -i 's/#HandleLidSwitchExternalPower=suspend/HandleLidSwitchExternalPower=ignore/' /etc/systemd/logind.conf
sudo systemctl restart systemd-logind
```

**What this does:** Changes the lid close action from "suspend" to "ignore" (do nothing) in the system configuration, then restarts the login manager to apply the change.

> **Warning:** The `systemctl restart systemd-logind` command will log you out of your current session. Save any open work first. After running it, log back in at the login screen.

### 9.3 Verify Lid Close Behavior

After logging back in:
1. Close your laptop lid
2. Wait 30 seconds
3. Open the lid

If the computer didn't go to sleep and the login screen appears (or the desktop is still there), the lid close setting is working correctly.

---

## The Verification Checklist

Before moving to Module 03, let's verify everything is ready. Open a terminal and run each command:

### Check 1: systemd Is Running

```bash
systemctl is-system-running
```

**Expected:** `running`

On native Ubuntu, systemd works out of the box — no configuration needed. If you see `degraded`, that's usually fine (some non-critical services had minor issues).

### Check 2: Node.js Version

```bash
node --version
```

**Expected:** `v22.x.x` — must be 22 or higher.

### Check 3: npm Version

```bash
npm --version
```

**Expected:** `10.x.x` or `11.x.x`

### Check 4: Git Is Installed

```bash
git --version
```

**Expected:** `git version 2.x.x`

### Check 5: curl Is Available

```bash
curl --version | head -1
```

**Expected:** A line starting with `curl 7.x.x` or `curl 8.x.x`.

### Check 6: You're in the Right Place

```bash
pwd
```

**Expected:** `/home/openclaw` (or `/home/yourusername` if you chose a different name)

### The Summary

If all six checks pass, your environment is ready. Here's what you now have:

```
┌──────────────────────────────────────────────────┐
│            Ubuntu 24.04 LTS                       │
│                                                   │
│  ✓ systemd running (out of the box)              │
│  ✓ Node.js 22+                                   │
│  ✓ npm 10+                                       │
│  ✓ git, curl, wget, build-essential              │
│  ✓ Home directory: /home/openclaw/               │
│                                                   │
│  Power Settings:                                  │
│  ✓ Auto-suspend disabled                         │
│  ✓ Lid close set to ignore                       │
│  ✓ Tailscale installed (optional)                │
│                                                   │
│  Ready for OpenClaw installation ──────►         │
│                                                   │
└──────────────────────────────────────────────────┘
```

---

## Optional: Tailscale (Remote Access)

Tailscale lets you access your OpenClaw gateway from other devices — your phone, another computer, or anywhere with internet. It creates a secure, encrypted network between your devices.

**Skip this if:**
- You'll only access OpenClaw from this laptop
- You want to get OpenClaw running first and add remote access later

**Do this if:**
- You want to access OpenClaw from your phone
- You want to access OpenClaw from another computer

### Install Tailscale

In your Ubuntu terminal:

```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```

This gives you a URL to open in your browser to authorize the device. Open it and approve.

**Verify:**

```bash
tailscale status
```

You should see your devices listed with Tailscale IP addresses (usually `100.x.x.x`).

Also install Tailscale on your phone or main computer from **tailscale.com/download** and sign in with the same account.

**What this means for OpenClaw:**
- From this laptop: `http://127.0.0.1:18789/`
- From your phone (on Tailscale): `http://100.x.x.x:18789/`
- From anywhere else (without Tailscale): no access (secure by default)

We'll configure this in Module 03.

### Enable Disk Encryption (Recommended)

If your OpenClaw device stores API keys, personal data, conversation history, and agent memory, you should consider encrypting the disk. If the device is ever lost or stolen, encrypted data is unreadable without your password.

The Ubuntu installer offers **LUKS encryption** as an option during installation. If you didn't enable it during install, you can still encrypt the home directory or set up LUKS on a fresh install.

> **Simplest approach:** If you want encryption, it's easiest to start over and check the encryption option during installation. This adds one extra step (typing a passphrase at boot) but protects everything on disk.

---

## Troubleshooting

### Laptop Won't Boot from USB

**What happened:** The laptop loads Windows instead of booting from the USB.

**Fixes to try:**
1. Make sure you're pressing the correct boot menu key (see the table in Step 3) — press it repeatedly right when the manufacturer logo appears
2. Try a different USB port
3. Enter BIOS settings (usually F2 or Delete) and:
   - Change **Boot Order** so USB is first
   - **Disable Secure Boot** if it's enabled
   - **Enable Legacy/CSM boot** if UEFI boot doesn't work
4. Save BIOS settings and restart

### WiFi Not Working After Installation

**What happened:** WiFi worked in "Try Ubuntu" but not after installing, OR it never worked.

**Fixes:**
1. Check if you enabled **"Install third-party software for graphics and Wi-Fi hardware"** during installation. If not, you may need to reinstall with this option checked
2. Open a terminal and run:
   ```bash
   sudo ubuntu-drivers autoinstall
   ```
   This installs recommended proprietary drivers
3. Use one of the three backup methods (USB WiFi adapter, phone tethering, or Ethernet) to get online, then install drivers

### BIOS Password Blocking Access

**What happened:** You can't enter BIOS or change boot order because of a password.

**Fixes:**
1. Try common defaults: empty, `admin`, `password`, `1234`
2. Look up the service tag on **bios-pw.org**
3. Contact the original owner or company
4. If none work, this laptop isn't suitable — use a different one

### "node: command not found" After Installing nvm

**What happened:** nvm hasn't been loaded into your current shell session.

**Fix:** Close the terminal completely and reopen it (click Terminal in the dock, or press `Ctrl+Alt+T`). Then try `node --version` again.

If it still doesn't work:
```bash
source ~/.bashrc
```

If the `~/.nvm/` directory doesn't exist, re-run the nvm install command from Step 8.1.

### Laptop Suspends Despite Settings

**What happened:** The laptop still goes to sleep when you close the lid or leave it idle.

**Fixes:**
1. Verify **Settings > Power > Automatic Suspend** is OFF
2. Verify `logind.conf` has the lid close changes:
   ```bash
   grep HandleLidSwitch /etc/systemd/logind.conf
   ```
   You should see `HandleLidSwitch=ignore` (without a `#` at the start)
3. If the lines still start with `#`, edit the file manually:
   ```bash
   sudo nano /etc/systemd/logind.conf
   ```
   Find the `HandleLidSwitch` lines, remove the `#`, change `suspend` to `ignore`, save (Ctrl+O, Enter, Ctrl+X), then:
   ```bash
   sudo systemctl restart systemd-logind
   ```

### Password Not Accepted for sudo

**What happened:** You're typing the right password but it's not working.

**Fix:** Remember that **nothing appears when you type** — no dots, no stars. This is normal. Type your password carefully and press Enter. If it still fails, you may have a different password than you remember. To reset:

1. Restart the laptop
2. Hold **Shift** during boot to access the GRUB menu
3. Select "Advanced options for Ubuntu" > "Recovery mode"
4. Choose "root" to get a root shell
5. Run: `passwd openclaw` (replace with your username)
6. Set a new password
7. Type `exit` and select "Resume normal boot"

---

## Class Exercise: Verify Your Environment

Complete the following checklist. Each item should have a checkmark before you proceed to Module 03.

- [ ] **RAM:** Confirmed at least 8 GB (how much? ______ GB)
- [ ] **Disk space:** Confirmed at least 20 GB was available (before Ubuntu install)
- [ ] **Ubuntu:** Installed and booting (version: 24.04 LTS)
- [ ] **WiFi:** Connected (to guest network if possible)
- [ ] **systemd:** Running (`systemctl is-system-running` shows "running")
- [ ] **Node.js:** Version 22+ installed (`node --version` shows v22.x.x)
- [ ] **npm:** Installed (`npm --version` shows 10.x.x or higher)
- [ ] **Git:** Installed (`git --version` shows a version number)
- [ ] **Power settings:** Auto-suspend disabled AND lid close set to "ignore"
- [ ] **Home directory:** You're in `/home/openclaw/` (`pwd` confirms)
- [ ] **Optional: Tailscale** installed and connected
- [ ] **Optional: Disk encryption** enabled

---

## Key Takeaways

1. **An old laptop is the best OpenClaw host** — $0 cost, full privacy, full control. Better than a VPS or cloud service
2. **Ubuntu replaces Windows** — on a dedicated agent laptop, native Linux is simpler and more reliable than running Linux inside Windows
3. **You can always get Windows back** — the license is tied to the motherboard and reactivates automatically on reinstall
4. **Test WiFi before installing** — "Try Ubuntu" lets you verify hardware compatibility without making changes
5. **The third-party drivers checkbox is critical** — this single checkbox during installation determines whether most WiFi chips work
6. **systemd works out of the box** — no configuration needed on native Ubuntu (unlike WSL2, which required manual setup)
7. **Node.js 22+ is required** — install with nvm for easy version management
8. **Disable both auto-suspend AND lid close** — they're separate settings; both must be changed for 24/7 operation
9. **Guest WiFi only** — the OpenClaw laptop should never be on your main home network

---

## Further Reading

- [Ubuntu Desktop Download](https://ubuntu.com/download/desktop) — Where you downloaded the ISO
- [Ubuntu Installation Tutorial](https://ubuntu.com/tutorials/install-ubuntu-desktop) — Official step-by-step guide
- [Rufus](https://rufus.ie/) — The tool you used to create the bootable USB
- [Node.js Downloads](https://nodejs.org/) — Official Node.js (we used nvm instead, but this is the source)
- [nvm GitHub](https://github.com/nvm-sh/nvm) — Node Version Manager documentation
- [Tailscale Documentation](https://tailscale.com/kb/) — Setting up and using Tailscale

---

## What's Next

Your laptop is ready. Ubuntu is running. Node.js is installed. systemd works out of the box. And the best part? No compatibility layers, no PATH issues, no paste bugs — just a clean Linux system ready for OpenClaw.

In **Module 03: Installing OpenClaw**, we'll run the actual installer, walk through the onboarding wizard step by step, configure your API key, and get the gateway running.

Time to bring your agent to life.
