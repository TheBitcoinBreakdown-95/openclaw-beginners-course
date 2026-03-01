# USB Kit — Instructor Preparation

Prepare these before Class 1. Total prep time: ~30 minutes (plus download time).

---

## What You Need

| Item | Purpose | Size |
|------|---------|------|
| Ubuntu 24.04 LTS ISO | Operating system for student laptops | ~5.9 GB |
| Rufus (portable) | Burns the ISO to USB | ~1.4 MB |
| 2-3 USB sticks (8 GB+) | Bootable Ubuntu installers | — |
| 1 small USB or printed copies | Terminal commands for students | — |

---

## Step 1: Download Files

On your main computer (Windows):

1. **Ubuntu ISO:** https://ubuntu.com/download/desktop
   - Download **Ubuntu 24.04.x LTS** (the one marked "LTS")
   - File is about 5.9 GB — allow 10-20 minutes depending on your connection

2. **Rufus:** https://rufus.ie
   - Download the **portable** version (no install needed)
   - File is about 1.4 MB

---

## Step 2: Create Bootable USB Sticks

For each USB stick (make 2-3 so students can share):

1. Insert an 8 GB+ USB stick
2. Open Rufus
3. **Device:** Select your USB stick
4. **Boot selection:** Click SELECT, choose the Ubuntu ISO you downloaded
5. **Partition scheme:** GPT (or MBR if the laptop is very old)
6. **Everything else:** Leave defaults
7. Click **START**
8. If asked about ISO vs DD mode, choose **ISO (Recommended)**
9. Wait for it to finish (~5-10 minutes per stick)

**WARNING:** This erases everything on the USB stick!

---

## Step 3: Prepare the Commands Handout

Students need terminal commands after Ubuntu is installed and WiFi is connected. Options:

**Option A: Small USB drive** (recommended for no-internet-at-start scenarios)
- Copy `setup-commands.txt` from this folder onto a separate small USB
- Students can open it in Ubuntu's text editor after installation

**Option B: Project on screen**
- Display the commands on the projector
- Students type them in (good for learning, slower)

**Option C: Web URL** (easiest, requires WiFi)
- Once students have Ubuntu + WiFi, they open a browser
- Direct them to the GitHub repo's `setup-commands.txt`

---

## Class Day Checklist

- [ ] 2-3 bootable Ubuntu USB sticks ready
- [ ] Commands available (USB, printout, or URL)
- [ ] WiFi network name and password written on the board
- [ ] Your own OpenClaw setup running for live demos
- [ ] Projector working with your slides
- [ ] Each student has: laptop, Telegram account, API key (or will create one in class)
