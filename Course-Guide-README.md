# OpenClaw Complete Beginner's Course

## Welcome

This is a complete, classroom-style course for setting up and using **OpenClaw** (formerly Clawdbot / MoltBot) — an open-source, 24/7 AI personal assistant that runs on your own hardware.

By the end of this course, you will have a fully configured OpenClaw agent running on your own machine, connected to Telegram, with persistent memory, scheduled automations, and proper security.

This guide was designed for **complete beginners**. Every step is explained. Every command includes expected output. Every common error has a solution. Nothing is skipped.

---

## How to Use This Guide

### If you're learning on your own:
1. Read the modules in order (Module 00 → Module 11)
2. Don't skip Module 01 (Security) — read it BEFORE you install anything
3. Do every Class Exercise — they're not optional, they're how you learn
4. When you reach Module 05, copy the included **OPERATIONS-Template.md** into your agent's workspace
5. Keep this README open as your table of contents

### If you're teaching a class:
1. Each module is a standalone lesson (45-90 minutes each)
2. Learning Objectives at the top of each module tell students what they'll know by the end
3. Key Vocabulary sections define every new term before it's used
4. Class Exercises can be done live, together
5. The course is designed to be taught over 4-6 sessions:
   - **Session 1:** Modules 00-01 (What is OpenClaw + Security mindset)
   - **Session 2:** Modules 02-03 (Preparing hardware + Installation)
   - **Session 3:** Modules 04-05 (First conversation + Workspace/Memory)
   - **Session 4:** Modules 06-07 (Messaging channels + Skills)
   - **Session 5:** Modules 08-09 (Automation + Advanced concepts)
   - **Session 6:** Modules 10-11 (Security hardening + Maintenance)

---

## Prerequisites

Before starting this course, you need:

- [ ] A computer running **Windows 10** or later, **macOS**, or **Linux** (we install Ubuntu on a dedicated laptop in Module 02)
- [ ] At least **8 GB RAM** (16 GB recommended)
- [ ] At least **20 GB free disk space** (more is better)
- [ ] A stable **internet connection**
- [ ] A **Telegram** account (free, download from telegram.org)
- [ ] An **API key** from an AI provider (we'll walk you through getting one):
  - Anthropic (Claude) — recommended, ~$20-200/month depending on usage
  - OpenAI (ChatGPT) — good alternative, can use existing subscription
  - Google (Gemini) — has free tier (20 requests/day)
- [ ] Basic comfort with typing commands (we'll teach you everything else)

**You do NOT need:**
- A Mac Mini (despite what Twitter says)
- A VPS or cloud server
- Coding experience
- Prior AI experience beyond using ChatGPT/Claude

---

## Course Modules

| # | Module | What You'll Learn | Time |
|---|--------|-------------------|------|
| 00 | [What Is OpenClaw](Lessons/Module-00-What-Is-OpenClaw/Lesson.md) | What OpenClaw is, how it works, why it matters | 30 min |
| 01 | [Understanding the Risks](Lessons/Module-01-Understanding-the-Risks/Lesson.md) | Security threats, the danger model, how to stay safe | 45 min |
| 02 | [Preparing Your Laptop](Lessons/Module-02-Preparing-Your-Old-Laptop/Lesson.md) | Ubuntu installation, Node.js, getting your machine ready | 60 min |
| 03 | [Installing OpenClaw](Lessons/Module-03-Installing-OpenClaw/Lesson.md) | Installation, onboarding wizard, API keys, gateway | 60 min |
| 04 | [Your First Conversation](Lessons/Module-04-Your-First-Conversation/Lesson.md) | Meeting your agent, brain-dumping, essential commands | 45 min |
| 05 | [Workspace and Memory](Lessons/Module-05-Workspace-and-Memory/Lesson.md) | The 9 core files, context engineering, living files | 60 min |
| 06 | [Connecting Messaging Channels](Lessons/Module-06-Connecting-Messaging-Channels/Lesson.md) | Telegram setup, Discord, WhatsApp, channel security | 45 min |
| 07 | [Skills and ClawHub](Lessons/Module-07-Skills-and-ClawHub/Lesson.md) | Installing skills, building custom skills, marketplace | 45 min |
| 08 | [Cron Jobs and Heartbeats](Lessons/Module-08-Cron-Jobs-and-Heartbeats/Lesson.md) | Morning briefs, scheduled tasks, proactive automation | 45 min |
| 09 | [Advanced Concepts](Lessons/Module-09-Advanced-Concepts/Lesson.md) | Brains & muscles, model switching, multi-agent, reverse prompting | 60 min |
| 10 | [Security Hardening](Lessons/Module-10-Security-Hardening/Lesson.md) | Sandboxing, Docker, tool policies, security audits | 60 min |
| 11 | [Maintenance and Troubleshooting](Lessons/Module-11-Maintenance-and-Troubleshooting/Lesson.md) | Updates, backups, error catalog, command cheat sheet | 30 min |

**Total estimated time: 8-10 hours** (spread across multiple sessions)

---

## Hardware Used in This Guide

This course was written and tested on:
- A dedicated laptop running **Ubuntu 24.04 LTS** (native installation)
- **16 GB RAM**
- **465 GB storage** (438 GB free)
- Running OpenClaw directly on Ubuntu

If your specs are different, don't worry — the minimum requirements are 8 GB RAM and 20 GB free space. The guide notes where your experience might differ based on hardware.

---

## Naming Your Agent

Throughout this course, we refer to the agent generically as "your agent." You'll choose your own name during setup — pick something that feels right to you. In example configurations, we use placeholder names like `[Your Agent's Name]`.

---

## Bonus Material: OPERATIONS Template

This course includes an **OPERATIONS-Template.md** file — a comprehensive operational knowledge base designed to be placed directly in your agent's workspace at `~/.openclaw/workspace/OPERATIONS.md`.

Unlike the lesson modules (which teach *you*), this file is written **for your agent**. It contains deep technical reference on architecture, failure patterns, troubleshooting procedures, security boundaries, and configuration gotchas that help your agent diagnose and fix problems on its own.

You'll learn how to set this up in [Module 05: Workspace and Memory](Lessons/Module-05-Workspace-and-Memory/Lesson.md).

> **You don't need to read or understand OPERATIONS.md.** It's written in technical language your agent understands. Just copy it into the workspace and let your agent use it.

---

## Reference Materials

This course was built by synthesizing 36+ community articles, tutorials, and research papers (all available in the `Research/` folder). Key sources include:

| File | Source | Focus |
|------|--------|-------|
| `100 hours of OpenClaw lessons in 35 minutes.md` | @ghostdoc007 | Comprehensive masterclass |
| `I made my OpenClaw 10x more powerful (seriously).md` | @UncleBasil | Advanced VPS + context engineering |
| `OpenClaw Full Tutorial for Beginners.md` | FreeCodeCamp / Kian | 9-module beginner course |
| `The Easiest Way To Install and Use OpenClaw For Beginners.md` | Security-focused setup | VM isolation + 5 security principles |
| `Why Everyone's Buying a Mac Mini for Clawdbot.md` | @AndrewGoodnough | Overview + security deep dive |
| `How to Reduce OpenClaw Model Costs by up to 90% (Full Guide).md` | Cost optimization guide | Model routing, prompt caching, ClawRouter, local models |
| `OpenClaw Ecosystem Systems Intelligence Outline...` | Deep systems research | Architecture, failure modes, policy layering, curriculum readiness |
| `OpenClaw GitHub README (2026-02-20).md` | Official repo | Feature reference snapshot (now in `GitHub-Repo/`) |
| `the 1 most downloaded skill on OpenClaw marketplace was MALWARE.md` | Security alert | ClawHub supply chain attack (1,184 malicious skills) |
| `The Latest Research on Agent Design...` | Soul design research | 7 principles for agent personality |
| `3 cron jobs.md` | Automation guide | Three essential scheduled tasks |

Plus official documentation from:
- [OpenClaw Official Docs](https://docs.openclaw.ai/)
- [OpenClaw GitHub](https://github.com/openclaw/openclaw)
- [OpenClaw Security Guide](https://docs.openclaw.ai/gateway/security)

---

## A Note on Security

This guide teaches security **before** installation (Module 01 comes before Module 03). This is intentional.

OpenClaw gives an AI agent shell access to your computer. That means it can execute commands, read files, send messages, and browse the web — on your behalf, 24 hours a day. If you don't understand the risks before you start, you can cause real damage to your digital life.

Read Module 01. Do not skip it. Come back and re-read it periodically as you give your agent more access and capabilities.

As the original project notes say: **Here be dragons.**

---

## Let's Begin

When you're ready, start with [Module 00: What Is OpenClaw](Lessons/Module-00-What-Is-OpenClaw/Lesson.md).

Welcome to the future. Let's build it safely.
