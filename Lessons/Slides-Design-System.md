# OpenClaw Course — Slide Decks

## Theme: Tidepool (Ocean Watercolor)

These slides use the **Tidepool** design system — an ocean/nautical theme with watercolor colors, elegant typography, and learning design principles baked into every slide.

## How to Use These Slides

These slides are written in **Marp** format — a markdown-to-slides tool. Each `.md` file is a complete slide deck for one module.

### Option 1: Marp CLI (Recommended)

Install Marp CLI and export to PDF, PPTX, or HTML:

```bash
# Install
npm install -g @marp-team/marp-cli

# Export to PDF
marp Slides-Module-00.md --pdf

# Export to PowerPoint
marp Slides-Module-00.md --pptx

# Export to HTML (interactive)
marp Slides-Module-00.md --html

# Export ALL slides at once
marp *.md --pdf
```

### Option 2: VS Code Extension

1. Install the **Marp for VS Code** extension
2. Open any `.md` slide file
3. Click the preview icon to see the slides
4. Export via the command palette: `Marp: Export Slide Deck`

### Option 3: Marp Web (No Install)

1. Go to [marp.app](https://marp.app/)
2. Paste the markdown content
3. Preview and export

## Slide Format

- Each `---` creates a new slide
- The YAML header at the top controls theme, size, and styling
- Speaker notes are inside `<!-- Speaker notes: ... -->` comments
- Slides are designed for 16:9 widescreen
- Google Fonts load via `@import` in the CSS (requires internet for first render)

## Design System: Tidepool

### Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| **Ink** | `#1B3A4B` | Primary text (deep navy) |
| **Teal** | `#3D8B8A` | Headings, links, structure |
| **Coral** | `#E8725A` | Emphasis, bold text |
| **Gold** | `#D4A853` | Activities, highlights |
| **Seafoam** | `#A8D5D1` | Borders, soft accents |
| **Parchment** | `#FAF6F0` | Default background |
| **Shallow** | `#EBF5F4` | Alternate background |
| **Warning** | `#C84B31` | Security/danger slides |

### Typography

- **Headings:** Playfair Display (serif, nautical elegance)
- **Body:** Source Sans 3 (clean, readable)
- **Code:** JetBrains Mono (developer-grade monospace)

### Slide Type Classes

Use `<!-- _class: classname -->` before a slide to apply its type styling:

| Class | Purpose | Visual |
|-------|---------|--------|
| `title` | Module opener | Ink-to-teal gradient, white text, gold border |
| `objectives` | Learning goals | Cool bg, teal left border |
| `vocab` | Definitions | Warm driftwood bg |
| *(default)* | Teaching content | Parchment bg |
| `activity` | Exercises | Gold left border |
| `takeaway` | Key concepts | Cool bg, coral top border |
| `recap` | Review | Tideline bg |
| `warning` | Security/danger | Red left border |
| `next` | Module transition | Gradient bg (bookends title) |

### Ocean-Themed Section Names

| Standard Name | Ocean Name | Emoji |
|---------------|-----------|-------|
| Learning Objectives | Navigation Chart | 🧭 |
| Key Vocabulary | Ship's Logbook | 📜 |
| Class Exercise | Hands on Deck | ⚙️ |
| Key Takeaways | Treasure Chest | 💎 |
| Review/Recap | Harbor Review | ⚓ |
| Security Warning | Rough Waters | 🚩 |
| Next Module | Next Port of Call | 🌊 |
| Common Mistakes | Shoals and Sandbars | 🚩 |
| Troubleshooting | Damage Control | 🚩 |

### Inline Emoji Guide

| Emoji | Meaning |
|-------|---------|
| 🦞 | OpenClaw itself |
| 🦀 | Community / ClawHub |
| 🐚 | Shell / CLI |
| 🐙 | Multi-agent / advanced |
| 🐠 | Skills / plugins |
| 🪸 | Memory / persistence |
| ⛵ | Gateway |
| 🔑 | API keys / auth |
| 🔭 | Monitoring |

## Files

| File | Module | Slides |
|------|--------|--------|
| `Slides-Module-00.md` | What Is OpenClaw? | ~15 slides |
| `Slides-Module-01.md` | Understanding the Risks | ~18 slides |
| `Slides-Module-02.md` | Preparing Your Old Laptop | ~16 slides |
| `Slides-Module-03.md` | Installing OpenClaw | ~20 slides |
| `Slides-Module-04.md` | Your First Conversation | ~15 slides |
| `Slides-Module-05.md` | Workspace and Memory | ~18 slides |
| `Slides-Module-06.md` | Connecting Messaging Channels | ~16 slides |
| `Slides-Module-07.md` | Skills and ClawHub | ~15 slides |
| `Slides-Module-08.md` | Cron Jobs and Heartbeats | ~16 slides |
| `Slides-Module-09.md` | Advanced Concepts | ~20 slides |
| `Slides-Module-10.md` | Security Hardening | ~18 slides |
| `Slides-Module-11.md` | Maintenance and Troubleshooting | ~15 slides |
