# OpenClaw Beginner's Course

A complete, 12-module classroom-style course for setting up and using [OpenClaw](https://github.com/openclaw/openclaw) — an open-source, 24/7 AI personal assistant that runs on your own hardware.

Designed for **complete beginners**. No coding experience required.

## Getting Started

Start with the [Course Guide](Course-Guide-README.md) — it has the full module table, prerequisites, and instructions for self-learners and classroom instructors.

For a fast-track setup (30 minutes), see the [Quick Start Guide](OpenClaw-Quick-Start-Guide.md).

## Modules

| # | Module | Time |
|---|--------|------|
| 00 | [What Is OpenClaw](Lessons/Module-00-What-Is-OpenClaw/Lesson.md) | 30 min |
| 01 | [Understanding the Risks](Lessons/Module-01-Understanding-the-Risks/Lesson.md) | 45 min |
| 02 | [Preparing Your Laptop](Lessons/Module-02-Preparing-Your-Old-Laptop/Lesson.md) | 60 min |
| 03 | [Installing OpenClaw](Lessons/Module-03-Installing-OpenClaw/Lesson.md) | 60 min |
| 04 | [Your First Conversation](Lessons/Module-04-Your-First-Conversation/Lesson.md) | 45 min |
| 05 | [Workspace and Memory](Lessons/Module-05-Workspace-and-Memory/Lesson.md) | 60 min |
| 06 | [Connecting Messaging Channels](Lessons/Module-06-Connecting-Messaging-Channels/Lesson.md) | 45 min |
| 07 | [Skills and ClawHub](Lessons/Module-07-Skills-and-ClawHub/Lesson.md) | 45 min |
| 08 | [Cron Jobs and Heartbeats](Lessons/Module-08-Cron-Jobs-and-Heartbeats/Lesson.md) | 45 min |
| 09 | [Advanced Concepts](Lessons/Module-09-Advanced-Concepts/Lesson.md) | 60 min |
| 10 | [Security Hardening](Lessons/Module-10-Security-Hardening/Lesson.md) | 60 min |
| 11 | [Maintenance and Troubleshooting](Lessons/Module-11-Maintenance-and-Troubleshooting/Lesson.md) | 30 min |

**Total: ~8-10 hours** across 4-6 sessions.

Each module folder contains:
- **Lesson.md** — Full lesson content
- **Slides.md** — Marp slide deck (Tidepool ocean theme)
- **Script.md** — Per-slide teaching script with speaker notes
- **Slides.pdf** — PDF export (where available)

## Prerequisites

- A computer with Windows 10+, macOS, or Linux
- 8 GB RAM (16 GB recommended), 20 GB free disk space
- A Telegram account (free)
- An API key from Anthropic, OpenAI, or Google

## Generating Slide PDFs

Slide decks use [Marp](https://marp.app/). To generate a PDF:

```bash
npx @marp-team/marp-cli "Lessons/Module-00-What-Is-OpenClaw/Slides.md" --pdf --allow-local-files -o "Lessons/Module-00-What-Is-OpenClaw/Slides.pdf"
```

## Additional Resources

- **[OPERATIONS-Template.md](OPERATIONS-Template.md)** — Operational knowledge base for your agent's workspace
- **[Slides-Design-System.md](Lessons/Slides-Design-System.md)** — Tidepool theme documentation and slide design guidelines
- **[OpenClaw Official Docs](https://docs.openclaw.ai/)**
- **[OpenClaw GitHub](https://github.com/openclaw/openclaw)**

## License

This course was built using official OpenClaw documentation and community resources. OpenClaw is open source.
