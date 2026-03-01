# OpenClaw Class — 3-Session Instructor Guide

A streamlined, classroom-ready version of the OpenClaw Beginner's Course. Three classes, ~2 hours each, taking students from zero to a fully configured AI personal assistant.

For the complete self-paced course (12 modules with detailed lessons), see the [Lessons/](../Lessons/) folder.

---

## Schedule

| Class | Title | Duration | End State |
|-------|-------|----------|-----------|
| 1 | **Set Up and Get Chatting** | ~2 hours | Ubuntu installed, OpenClaw running, Telegram connected |
| 2 | **Make It Yours** | ~2 hours | Workspace configured, skills installed, morning brief running |
| 3 | **Lock It Down** | ~1.5 hours | Security hardened, advanced features understood, maintenance plan |

**Total: ~5.5 hours across 3 sessions**

---

## What's in Each Folder

- **Slides.md** — Marp slide deck (Tidepool ocean theme, same as the full course)
- **Slides.pdf** — PDF export for presenting
- **Teaching-Notes.md** — Per-slide bullet points: key point, talking points, activities, timing
- **USB-Kit/** — Setup commands and USB preparation instructions

---

## Before Class 1: Instructor Prep

### 1. Prepare USB Sticks (30 minutes, one time)
Follow the instructions in [USB-Kit/README.md](USB-Kit/README.md). You'll need:
- 2-3 bootable Ubuntu USB sticks (8 GB+ each)
- A separate small USB or printed handout with terminal commands

### 2. Gather Student Prerequisites
Each student needs:
- [ ] An old laptop (8 GB+ RAM, 20 GB+ free space) they're willing to wipe
- [ ] A Telegram account (free, download from telegram.org)
- [ ] An API key from an AI provider (Anthropic recommended, ~$20/month)

### 3. Prepare Your Environment
- [ ] Projector/screen for slides
- [ ] WiFi network (guest network preferred — see Class 1 slides)
- [ ] Your own OpenClaw setup working, for live demos

---

## Between Classes

| After Class... | Students Should... |
|---------------|--------------------|
| 1 | Use their agent via Telegram for a few days. Get comfortable chatting. |
| 2 | Customize their workspace files. Try asking their agent to install a skill. |
| 3 | Run `npx openclaw security audit --deep --fix` monthly. Keep OpenClaw updated. |

---

## Relationship to the Full Course

| | OpenClaw Class (this folder) | Lessons (12 modules) |
|--|-----|---------|
| **Format** | Classroom slides + teaching notes | Self-paced lessons + scripts |
| **Depth** | Essential setup + key concepts | Complete deep dives |
| **Time** | ~5.5 hours (3 sessions) | ~8-10 hours |
| **Audience** | Live class with instructor | Solo learner |

Students are encouraged to read the full module lessons on their own for deeper understanding. The self-paced modules cover topics we skip or skim in class (detailed security analysis, building custom skills, advanced multi-agent setups, comprehensive troubleshooting).

---

## Self-Paced Module Mapping

| Class | Draws From |
|-------|-----------|
| Class 1 | Modules 00, 01, 02, 03, 06 |
| Class 2 | Modules 05, 07, 08 |
| Class 3 | Modules 01 (deep), 09, 10, 11 |

Module 04 (Your First Conversation) is folded into Class 1 — students have their first chat as part of the setup flow.
