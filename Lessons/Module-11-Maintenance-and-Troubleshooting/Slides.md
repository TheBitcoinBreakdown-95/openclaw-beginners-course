---
marp: true
theme: default
paginate: true
size: 16:9
style: |
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Playfair+Display:wght@400;600;700;900&family=Source+Sans+3:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&display=swap');
  :root {
    --ink: #1B3A4B;
    --teal: #3D8B8A;
    --coral: #E8725A;
    --gold: #D4A853;
    --seafoam: #A8D5D1;
    --parchment: #FAF6F0;
    --shallow: #EBF5F4;
    --tideline: #E2EDE9;
    --driftwood: #F0E8DC;
    --warning: #C84B31;
    --success: #4A8B6E;
    --muted: #6B8A8C;
    --stripe: #F4F0EA;
    --border: #C8D8D4;
  }

  /* ═══════════════════════════════════════════════
     BASE SECTION — Ocean atmosphere
     ═══════════════════════════════════════════════ */
  section {
    font-family: 'Source Sans 3', 'Segoe UI', Arial, sans-serif;
    color: var(--ink);
    padding: 40px 60px;
    line-height: 1.55;
    background-color: var(--parchment);
    background-image:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 120' preserveAspectRatio='none'%3E%3Cpath fill='%23A8D5D1' fill-opacity='0.60' d='M0,50 C120,72 240,28 360,50 C480,72 600,28 720,50 C840,72 960,28 1080,50 C1200,72 1320,28 1440,50 L1440,120 L0,120 Z'/%3E%3Cpath fill='%233D8B8A' fill-opacity='0.35' d='M0,70 C180,92 360,48 540,70 C720,92 900,48 1080,70 C1260,92 1440,55 1440,70 L1440,120 L0,120 Z'/%3E%3Cpath fill='%231B3A4B' fill-opacity='0.22' d='M0,90 C240,106 480,74 720,90 C960,106 1200,74 1440,90 L1440,120 L0,120 Z'/%3E%3C/svg%3E"),
      radial-gradient(ellipse at 0% 100%, rgba(168,213,209,0.30) 0%, transparent 50%),
      radial-gradient(ellipse at 100% 0%, rgba(212,168,83,0.20) 0%, transparent 40%),
      radial-gradient(ellipse at 50% 50%, rgba(168,213,209,0.14) 0%, transparent 70%);
    background-position: bottom center, center, center, center;
    background-size: 100% 160px, auto, auto, auto;
    background-repeat: no-repeat, no-repeat, no-repeat, no-repeat;
    border-top: 3px solid var(--seafoam);
  }

  /* ═══════════════════════════════════════════════
     TYPOGRAPHY
     ═══════════════════════════════════════════════ */
  h1 {
    font-family: 'Playfair Display', Georgia, serif;
    color: var(--ink);
    font-weight: 700;
    font-size: 2.2em;
    margin-bottom: 0.3em;
    line-height: 1.2;
    text-shadow: 0 1px 3px rgba(27,58,75,0.08), 0 0 1px rgba(27,58,75,0.04);
  }
  h2 {
    font-family: 'Playfair Display', Georgia, serif;
    color: var(--teal);
    font-weight: 600;
    font-size: 1.5em;
    padding-bottom: 8px;
    margin-bottom: 0.6em;
    border-bottom: 3px solid transparent;
    border-image: linear-gradient(90deg, var(--teal), var(--seafoam) 60%, transparent 100%) 1;
    text-shadow: 0 1px 2px rgba(61,139,138,0.12);
  }
  h3 {
    font-family: 'Source Sans 3', Arial, sans-serif;
    color: var(--coral);
    font-weight: 700;
    font-size: 1.15em;
    margin-bottom: 0.3em;
    text-shadow: 0 1px 2px rgba(232,114,90,0.10);
  }
  p { margin-bottom: 0.5em; }
  strong { color: var(--coral); }
  em { color: var(--muted); }
  a { color: var(--teal); text-decoration: underline; }
  a:hover { color: var(--coral); }

  /* ═══════════════════════════════════════════════
     LISTS
     ═══════════════════════════════════════════════ */
  ul, ol { margin-left: 0.5em; }
  li { margin-bottom: 0.25em; }
  li::marker { color: var(--teal); }

  /* ═══════════════════════════════════════════════
     TABLES — elevated with shadow
     ═══════════════════════════════════════════════ */
  table {
    font-size: 0.82em;
    border-collapse: separate;
    border-spacing: 0;
    width: fit-content !important;
    max-width: 96%;
    margin: 0.8em 0;
    border-radius: 10px;
    overflow: hidden;
    box-shadow:
      0 8px 30px rgba(27,58,75,0.14),
      0 3px 10px rgba(27,58,75,0.08),
      0 1px 3px rgba(27,58,75,0.05),
      inset 0 1px 0 rgba(255,255,255,0.6);
  }
  th {
    background: linear-gradient(135deg, #2A7A79 0%, var(--teal) 40%, #357E7D 100%);
    color: white;
    font-weight: 600;
    padding: 12px 14px;
    text-align: left;
    border: none;
    text-shadow: 0 1px 2px rgba(0,0,0,0.15);
    letter-spacing: 0.02em;
  }
  td {
    padding: 9px 14px;
    border-bottom: 1px solid var(--border);
  }
  tr:nth-child(even) td { background: var(--stripe); }
  tr:nth-child(odd) td { background: white; }
  tr:last-child td { border-bottom: none; }

  /* ═══════════════════════════════════════════════
     BLOCKQUOTES — elevated with shadow
     ═══════════════════════════════════════════════ */
  blockquote {
    border-left: 5px solid var(--teal);
    background: linear-gradient(135deg, #E0EDEB, rgba(235,245,244,0.7), rgba(250,246,240,0.4));
    padding: 14px 22px;
    margin: 0.8em 0;
    border-radius: 0 12px 12px 0;
    font-style: italic;
    font-weight: 300;
    color: var(--ink);
    box-shadow:
      0 6px 24px rgba(27,58,75,0.10),
      0 2px 8px rgba(27,58,75,0.06),
      inset 0 1px 0 rgba(255,255,255,0.7);
  }
  blockquote strong {
    color: var(--ink);
    font-weight: 700;
  }

  /* ═══════════════════════════════════════════════
     CODE BLOCKS — elevated with shadow
     ═══════════════════════════════════════════════ */
  code {
    font-family: 'JetBrains Mono', 'Consolas', monospace;
    background: linear-gradient(135deg, var(--tideline), #D8E8E4);
    color: var(--ink);
    padding: 2px 8px;
    border-radius: 5px;
    font-size: 0.85em;
    box-shadow: 0 1px 3px rgba(27,58,75,0.06);
  }
  pre {
    background: linear-gradient(160deg, #162F3D, #1B3A4B 30%, #1E4258);
    border-radius: 12px;
    padding: 18px 22px;
    margin: 0.8em 0;
    border-left: 5px solid var(--coral);
    overflow-x: auto;
    box-shadow:
      0 10px 40px rgba(27,58,75,0.22),
      0 4px 12px rgba(27,58,75,0.12),
      0 1px 4px rgba(27,58,75,0.06),
      inset 0 1px 0 rgba(255,255,255,0.05);
  }
  pre code {
    background: transparent;
    color: var(--parchment);
    padding: 0;
    font-size: 0.78em;
    line-height: 1.5;
  }

  /* ═══════════════════════════════════════════════
     UTILITY CLASSES
     ═══════════════════════════════════════════════ */
  .columns { display: flex; gap: 2em; align-items: flex-start; }
  .col { flex: 1; }
  .small { font-size: 0.75em; color: var(--muted); }
  .center { text-align: center; }

  /* ═══════════════════════════════════════════════
     PAGE NUMBERS
     ═══════════════════════════════════════════════ */
  section::after {
    font-family: 'Source Sans 3', sans-serif;
    font-size: 0.7em;
    color: var(--teal);
    font-weight: 600;
    opacity: 0.6;
  }

  /* ═══════════════════════════════════════════════
     TITLE SLIDE — dramatic ocean gradient
     ═══════════════════════════════════════════════ */
  section.title {
    background:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 120' preserveAspectRatio='none'%3E%3Cpath fill='%23FFFFFF' fill-opacity='0.18' d='M0,50 C120,72 240,28 360,50 C480,72 600,28 720,50 C840,72 960,28 1080,50 C1200,72 1320,28 1440,50 L1440,120 L0,120 Z'/%3E%3Cpath fill='%23FFFFFF' fill-opacity='0.12' d='M0,70 C180,92 360,48 540,70 C720,92 900,48 1080,70 C1260,92 1440,55 1440,70 L1440,120 L0,120 Z'/%3E%3C/svg%3E") bottom center / 100% 160px no-repeat,
      radial-gradient(ellipse at 20% 80%, rgba(168,213,209,0.35) 0%, transparent 50%),
      radial-gradient(ellipse at 80% 20%, rgba(61,139,138,0.40) 0%, transparent 50%),
      linear-gradient(135deg, #122A36 0%, #1B3A4B 25%, #2A6B6A 60%, #3D8B8A 100%);
    color: white;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 60px;
    border-top: none;
    border-bottom: 5px solid var(--gold);
  }
  section.title h1 {
    color: white;
    font-weight: 900;
    font-size: 2.6em;
    border: none;
    margin-bottom: 0.2em;
    text-shadow: 0 3px 12px rgba(0,0,0,0.3);
    letter-spacing: 0.01em;
  }
  section.title h2 {
    color: var(--seafoam);
    font-size: 1.3em;
    border: none;
    padding: 0;
    font-weight: 400;
    text-shadow: 0 1px 6px rgba(0,0,0,0.15);
  }
  section.title h3 {
    color: rgba(255,255,255,0.8);
    font-weight: 300;
    font-size: 1.1em;
    margin-top: 0.5em;
  }
  section.title::after { display: none; }

  /* ═══════════════════════════════════════════════
     CORNER BLOB BASE — positioning for ::before decorations
     ═══════════════════════════════════════════════ */
  section.objectives, section.vocab, section.activity, section.takeaway, section.warning {
    position: relative;
    overflow: hidden;
  }
  section.objectives::before, section.vocab::before, section.activity::before, section.takeaway::before, section.warning::before {
    content: '';
    position: absolute;
    border-radius: 50%;
    z-index: 0;
    pointer-events: none;
  }

  /* ═══════════════════════════════════════════════
     OBJECTIVES — chart room feel
     ═══════════════════════════════════════════════ */
  section.objectives {
    background:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 120' preserveAspectRatio='none'%3E%3Cpath fill='%233D8B8A' fill-opacity='0.35' d='M0,50 C120,72 240,28 360,50 C480,72 600,28 720,50 C840,72 960,28 1080,50 C1200,72 1320,28 1440,50 L1440,120 L0,120 Z'/%3E%3Cpath fill='%231B3A4B' fill-opacity='0.20' d='M0,70 C180,92 360,48 540,70 C720,92 900,48 1080,70 C1260,92 1440,55 1440,70 L1440,120 L0,120 Z'/%3E%3C/svg%3E") bottom center / 100% 160px no-repeat,
      radial-gradient(ellipse at 100% 100%, rgba(61,139,138,0.25) 0%, transparent 50%),
      linear-gradient(160deg, #D8EDEC 0%, #E5F2F1 30%, #EBF5F4 60%, #F2F8F7 100%);
    border-left: 6px solid var(--teal);
    padding-left: 54px;
  }
  section.objectives::before {
    width: 400px;
    height: 400px;
    bottom: -80px;
    right: -80px;
    background: radial-gradient(circle, rgba(61,139,138,0.18) 0%, rgba(168,213,209,0.10) 40%, transparent 70%);
  }
  section.objectives h2 { color: var(--teal); }
  section.objectives ol li { margin-bottom: 0.45em; line-height: 1.5; }

  /* ═══════════════════════════════════════════════
     VOCAB — old map parchment feel
     ═══════════════════════════════════════════════ */
  section.vocab {
    background:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 120' preserveAspectRatio='none'%3E%3Cpath fill='%23D4A853' fill-opacity='0.35' d='M0,50 C120,72 240,28 360,50 C480,72 600,28 720,50 C840,72 960,28 1080,50 C1200,72 1320,28 1440,50 L1440,120 L0,120 Z'/%3E%3Cpath fill='%231B3A4B' fill-opacity='0.18' d='M0,70 C180,92 360,48 540,70 C720,92 900,48 1080,70 C1260,92 1440,55 1440,70 L1440,120 L0,120 Z'/%3E%3C/svg%3E") bottom center / 100% 160px no-repeat,
      radial-gradient(ellipse at 90% 90%, rgba(212,168,83,0.28) 0%, transparent 50%),
      radial-gradient(ellipse at 10% 10%, rgba(212,168,83,0.18) 0%, transparent 40%),
      linear-gradient(170deg, #E8DCC8 0%, #EDE3D4 25%, #F0E8DC 50%, #F5F0E8 100%);
    border-top: 3px solid var(--gold);
  }
  section.vocab::before {
    width: 350px;
    height: 350px;
    top: -60px;
    right: -60px;
    background: radial-gradient(circle, rgba(212,168,83,0.20) 0%, rgba(212,168,83,0.08) 40%, transparent 70%);
  }
  section.vocab h2 { border-image: linear-gradient(90deg, var(--gold), #E8D5A8 60%, transparent 100%) 1; }

  /* ═══════════════════════════════════════════════
     ACTIVITY — gold anchor feel
     ═══════════════════════════════════════════════ */
  section.activity {
    border-left: 8px solid var(--gold);
    padding-left: 52px;
    background:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 120' preserveAspectRatio='none'%3E%3Cpath fill='%23D4A853' fill-opacity='0.40' d='M0,50 C120,72 240,28 360,50 C480,72 600,28 720,50 C840,72 960,28 1080,50 C1200,72 1320,28 1440,50 L1440,120 L0,120 Z'/%3E%3Cpath fill='%231B3A4B' fill-opacity='0.18' d='M0,80 C240,98 480,62 720,80 C960,98 1200,62 1440,80 L1440,120 L0,120 Z'/%3E%3C/svg%3E") bottom center / 100% 160px no-repeat,
      radial-gradient(ellipse at 100% 0%, rgba(212,168,83,0.25) 0%, transparent 50%),
      linear-gradient(175deg, #F2E8D0 0%, #F5EFE0 30%, #FAF6F0 60%);
  }
  section.activity::before {
    width: 380px;
    height: 380px;
    bottom: -70px;
    left: -70px;
    background: radial-gradient(circle, rgba(212,168,83,0.16) 0%, rgba(212,168,83,0.06) 40%, transparent 70%);
  }
  section.activity h2 { color: var(--gold); border-image: linear-gradient(90deg, var(--gold), #E8D5A8 60%, transparent 100%) 1; }
  section.activity pre { border-left-color: var(--gold); }
  section.activity strong { color: #A07828; }
  section.activity li::marker { color: var(--gold); }

  /* ═══════════════════════════════════════════════
     TAKEAWAY — treasure chest feel
     ═══════════════════════════════════════════════ */
  section.takeaway {
    background:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 120' preserveAspectRatio='none'%3E%3Cpath fill='%23E8725A' fill-opacity='0.30' d='M0,50 C120,72 240,28 360,50 C480,72 600,28 720,50 C840,72 960,28 1080,50 C1200,72 1320,28 1440,50 L1440,120 L0,120 Z'/%3E%3Cpath fill='%233D8B8A' fill-opacity='0.22' d='M0,80 C240,98 480,62 720,80 C960,98 1200,62 1440,80 L1440,120 L0,120 Z'/%3E%3C/svg%3E") bottom center / 100% 160px no-repeat,
      radial-gradient(ellipse at 50% 0%, rgba(232,114,90,0.20) 0%, transparent 50%),
      linear-gradient(150deg, #F0E8E6 0%, #EBF0EF 30%, #EBF5F4 50%, #F0F7F6 100%);
    border-top: 5px solid var(--coral);
  }
  section.takeaway::before {
    width: 350px;
    height: 350px;
    top: -60px;
    right: -80px;
    background: radial-gradient(circle, rgba(232,114,90,0.14) 0%, rgba(232,114,90,0.05) 40%, transparent 70%);
  }
  section.takeaway h2 { color: var(--coral); border-image: linear-gradient(90deg, var(--coral), #F0A899 60%, transparent 100%) 1; }
  section.takeaway strong { color: var(--teal); }
  section.takeaway li { margin-bottom: 0.4em; line-height: 1.5; }
  section.takeaway li::marker { color: var(--coral); }

  /* ═══════════════════════════════════════════════
     RECAP
     ═══════════════════════════════════════════════ */
  section.recap {
    background-color: var(--tideline);
    background-image:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 120' preserveAspectRatio='none'%3E%3Cpath fill='%233D8B8A' fill-opacity='0.35' d='M0,50 C120,72 240,28 360,50 C480,72 600,28 720,50 C840,72 960,28 1080,50 C1200,72 1320,28 1440,50 L1440,120 L0,120 Z'/%3E%3C/svg%3E");
    background-position: bottom center;
    background-size: 100% 160px;
    background-repeat: no-repeat;
  }
  section.recap h2 { color: var(--ink); }

  /* ═══════════════════════════════════════════════
     WARNING — red reef danger
     ═══════════════════════════════════════════════ */
  section.warning {
    border-left: 8px solid var(--warning);
    padding-left: 52px;
    background:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 120' preserveAspectRatio='none'%3E%3Cpath fill='%23C84B31' fill-opacity='0.25' d='M0,50 C120,72 240,28 360,50 C480,72 600,28 720,50 C840,72 960,28 1080,50 C1200,72 1320,28 1440,50 L1440,120 L0,120 Z'/%3E%3Cpath fill='%231B3A4B' fill-opacity='0.14' d='M0,80 C240,98 480,62 720,80 C960,98 1200,62 1440,80 L1440,120 L0,120 Z'/%3E%3C/svg%3E") bottom center / 100% 160px no-repeat,
      radial-gradient(ellipse at 0% 0%, rgba(200,75,49,0.18) 0%, transparent 50%),
      linear-gradient(160deg, #FBE8E4 0%, #F8F0EC 30%, #FAF6F0 60%);
  }
  section.warning::before {
    width: 300px;
    height: 300px;
    top: -50px;
    left: -50px;
    background: radial-gradient(circle, rgba(200,75,49,0.12) 0%, rgba(200,75,49,0.04) 40%, transparent 70%);
  }
  section.warning h2 { color: var(--warning); border-image: linear-gradient(90deg, var(--warning), #E8A090 60%, transparent 100%) 1; }
  section.warning strong { color: var(--warning); }
  section.warning blockquote { border-left-color: var(--warning); background: linear-gradient(135deg, #FDF0ED, #FEF6F4); }
  section.warning pre { border-left-color: var(--warning); }

  /* ═══════════════════════════════════════════════
     NEXT PORT — matching title gradient
     ═══════════════════════════════════════════════ */
  section.next {
    background:
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 120' preserveAspectRatio='none'%3E%3Cpath fill='%23FFFFFF' fill-opacity='0.18' d='M0,50 C120,72 240,28 360,50 C480,72 600,28 720,50 C840,72 960,28 1080,50 C1200,72 1320,28 1440,50 L1440,120 L0,120 Z'/%3E%3Cpath fill='%23FFFFFF' fill-opacity='0.12' d='M0,70 C180,92 360,48 540,70 C720,92 900,48 1080,70 C1260,92 1440,55 1440,70 L1440,120 L0,120 Z'/%3E%3C/svg%3E") bottom center / 100% 160px no-repeat,
      radial-gradient(ellipse at 30% 70%, rgba(168,213,209,0.30) 0%, transparent 50%),
      linear-gradient(135deg, #122A36 0%, #1B3A4B 25%, #2A6B6A 60%, #3D8B8A 100%);
    color: white;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-top: none;
    border-bottom: 4px solid var(--gold);
  }
  section.next h1 { color: white; font-size: 1.8em; font-weight: 700; text-shadow: 0 2px 8px rgba(0,0,0,0.25); border: none; }
  section.next h2 { color: var(--seafoam); border: none; font-size: 1.5em; padding: 0; }
  section.next blockquote {
    border-left-color: rgba(255,255,255,0.3);
    background: rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.9);
    max-width: 70%;
    margin-top: 1em;
    box-shadow: 0 2px 12px rgba(0,0,0,0.15);
  }
  section.next::after { display: none; }
---

<!-- _class: title -->

# Module 11
## Maintenance and Troubleshooting 🦞
### Keeping Your Agent Running Smoothly

<!-- Speaker notes: This is the final module. We're covering the day-to-day: maintenance routines, cost monitoring, updates, backups, common errors, and a command cheat sheet you can print out. This is your field manual for operating OpenClaw long-term. -->

---

<!-- _class: objectives -->

## 🧭 Navigation Chart

By the end of this module, you will be able to:

1. **Follow** a daily and weekly maintenance routine
2. **Monitor and optimize** your token spending
3. **Update** 🦞 OpenClaw safely
4. **Back up and restore** your workspace
5. **Diagnose and fix** the most common errors
6. **Use** the command cheat sheet for quick reference
7. **Know** where to get help from the community

---

<!-- _class: vocab -->

## 📜 Ship's Logbook

| Term | Definition |
|------|-----------|
| **Token burn** | The rate at which your AI conversations consume tokens (and money) |
| **Context compaction** | Using `/compact` to summarize conversation history and reduce token usage |
| **Workspace backup** | A Git commit of your `~/.openclaw/` directory that captures your agent's current state |
| **Rolling update** | Updating 🦞 OpenClaw while the gateway is running, with minimal downtime |

---

## Realistic Timelines

### Level 1 -- Works Immediately
Basic conversation, file management, simple research, document summarization

### Level 2 -- Requires Hours to Days of Setup
Email automation, trading bots, social media management, code projects, multi-step workflows

### The Reality
- YouTube demos show polished setups that took **days or weeks** to build
- Budget **2-4 hours/week** for setup and maintenance during your first month
- The investment pays off -- but not on day one

### ROI
5 hours/week saved = **200+ hours/year**. At $50/hour, that's $10,000/year in value. But expect setup time first.

---

## Daily Maintenance Checklist

This takes about **2 minutes**. Do it every day during your first month.

- ⛵ Gateway is running: `openclaw status`
- No errors in logs: `openclaw service logs`
- Token usage reasonable: check your provider dashboard
- Morning brief was sent: check Telegram
- No pending pairing requests: check dashboard for unknown senders

> If everything checks out, you are good. If anything is off, see the troubleshooting slides later in this deck.

---

## Weekly Maintenance Checklist

This takes about **10 minutes**. Do it every weekend.

- Security audit: `openclaw security audit --deep`
- Health check: `openclaw doctor`
- Fix any issues: `--fix` flags on both commands
- Review API spending: visit your provider dashboard
- 🪸 Workspace backup: `git add -A && git commit -m "Weekly backup"`
- Review core files: are `USER.md` and `MEMORY.md` still accurate?
- Disable unused 🐠 skills: `openclaw skills list`
- Check disk space: `df -h` (inside WSL2)

---

## Cost Reduction Strategies

| Strategy | Savings | Effort |
|----------|---------|--------|
| **Enable prompt caching** | ~90% off system prompt costs | Low |
| **Use Haiku for heartbeats** | $50-190/month | Low |
| **Set heartbeat to 55 min** | Stays within cache window | Low |
| **Install ClawRouter** | Up to 90% via intelligent routing | Medium |
| **Use `/compact` regularly** | ~67% per conversation | Low |

<!-- Speaker notes: Most of these are low effort. The single biggest win: prompt caching + Haiku heartbeats + 55-minute interval. That alone takes heartbeat costs from $100+/month to about fifty cents. -->

---

## Cost Reduction Strategies (continued)

| Strategy | Savings | Effort |
|----------|---------|--------|
| **Start new sessions** for new topics | Prevents runaway token counts | Low |
| **Disable unused 🐠 skills** | Reduces context (3K-14K tokens/call) | Low |
| **Use Sonnet for routine tasks** | 50-75% cheaper than Opus | Low |
| **Use budget models** (Kimi K2.5, MiniMax M2.5) | Up to 95% cheaper than Opus | Low |
| **Set API spending limits** | Prevents surprise bills | Low |

---

## Setting API Spending Limits

### Anthropic:
1. Go to console.anthropic.com -- Settings -- Billing
2. Set monthly usage limit (e.g., $50)
3. Set alert threshold (e.g., alert at $40)

### OpenAI:
1. Go to platform.openai.com -- Settings -- Billing
2. Set monthly budget cap

> **Recommendation:** Start with a $50/month limit. Increase only when you understand your usage patterns.

---

## Updating 🦞 OpenClaw

### Release channels: Use **stable** (not beta or dev)

| Channel | Use For |
|---------|---------|
| **stable** | Everyone in this course |
| **beta** | Early access (expect bugs) |
| **dev** | Contributors only |

### Always back up first:

```bash
cd ~/.openclaw && git add -A && git commit -m "Pre-update backup"
openclaw status --json > ~/pre-update-status.json
```

### Update:

```bash
openclaw update
```

### After updating:

```bash
openclaw service restart
openclaw status
openclaw doctor
openclaw security audit --deep
```

### If an update breaks something:

```bash
npm install -g @tinybox/openclaw@[previous-version]
openclaw service restart
```

---

## Backup and Restore

### Quick backup (Git):
```bash
cd ~/.openclaw && git add -A && git commit -m "Backup"
```

### Full backup (archive):
```bash
tar -czf ~/openclaw-backup-$(date +%Y%m%d).tar.gz ~/.openclaw/
```

### What to back up:

| Directory | Priority | Contains |
|-----------|----------|----------|
| `~/.openclaw/workspace/` | Critical | Identity, personality, rules, 🪸 memory |
| `~/.openclaw/config/` | Critical | ⛵ Gateway config, 🔑 API keys, channel settings |
| `~/.openclaw/workspace/skills/` | Important | Custom 🐠 skills you built |
| `~/.openclaw/sessions/` | Nice to have | Conversation history |
| `~/.openclaw/logs/` | Nice to have | Activity logs |

---

## Debugging Mindset

Before diving into specific errors, adopt this approach:

### Rule 1: Run `openclaw doctor --fix` First
Most "my agent is being stupid" issues are actually **configuration problems**, not AI problems. The doctor command catches and fixes the majority of them automatically.

### Rule 2: One Workflow at a Time
Get one workflow running **end-to-end** before adding the next. Every new integration is a new failure mode.

- Set up Telegram? Test it thoroughly before adding Discord.
- Adding a 🐠 skill? Verify it works before installing another.
- Building a cron job? Confirm it triggers correctly before scheduling more.

> **Master each workflow before stacking.** Debugging two broken things at once is exponentially harder than debugging one.

---

<!-- _class: warning -->

## 🚩 Damage Control: Gateway Errors

**"Gateway refuses to start" (config schema rejection)**
- **Cause:** One invalid key in `openclaw.json` blocks boot entirely
- **Fix:** Run `openclaw doctor` -- it identifies the bad key. Fix it, restart.
- **Prevention:** Use `openclaw config` commands instead of editing JSON directly

**"Gateway not running"**
- Check: `openclaw status`
- Fix: `openclaw service start`
- Review: `openclaw service logs`

**"Port already in use"**
- Find the process: `lsof -i :18789`
- Kill it, or change port: `openclaw config gateway port 18790`

**"Gateway keeps crashing"**
- Check logs for specific errors
- Run: `openclaw doctor fix`
- If a plugin was recently installed, try disabling it (plugins run in-process)
- If persistent: restore config from backup, restart

**"Session stuck on busy"**
- **Cause:** Session lock not released (compaction/abort failure)
- **Fix:** `openclaw service restart` (releases all locks)
- **Diagnosis:** `openclaw status --json` shows stuck sessions

---

<!-- _class: warning -->

## 🚩 Damage Control: API and Channels

**"API key invalid"**
- Check 🔑 key at your provider's console
- Regenerate if needed (use the Notepad trick when pasting)
- Update: `openclaw config provider key [NEW_KEY]`

**"Rate limit exceeded"**
- Wait 1-5 minutes, then retry
- If persistent: reduce heartbeat frequency

**"Telegram bot not responding"**
- Check ⛵ gateway: `openclaw status`
- Check pairing: look for pending requests
- Verify token in BotFather

**"WhatsApp disconnected"**
- Re-scan QR code: `openclaw channels login`

---

<!-- _class: warning -->

## 🚩 Damage Control: WSL2

**"WSL2 not running after reboot"**
- Open PowerShell: `wsl --list --running`
- If empty: open Ubuntu from Start menu

**"WSL2 very slow"**
- Exclude WSL2 directory from Windows Defender
- Edit `%USERPROFILE%\.wslconfig` with memory limits
- Run: `wsl --shutdown`, then reopen Ubuntu

**"systemd not running"**
- Edit `/etc/wsl.conf`:
  - Add `[boot]` on one line
  - Add `systemd=true` on next line
- Run `wsl --shutdown` from PowerShell, reopen Ubuntu

---

<!-- _class: warning -->

## 🚩 Damage Control: Performance

**"AI responses very slow (30+ seconds)"**
- Test internet connectivity
- Check provider status page
- Use `/compact` to reduce context size
- Switch to a faster model temporarily

**"Token counter climbing very fast"**
- Use `/compact` to compress conversation
- Use `/new` to start a fresh session
- Disable unused 🐠 skills
- Check if large files are being loaded unnecessarily

---

## Command Cheat Sheet: ⛵ Gateway and Status

```bash
# Start / Stop
openclaw service start         # Start the daemon
openclaw service stop          # Stop the daemon
openclaw service restart       # Restart the daemon
openclaw tui                   # Open chat interface

# Check Status
openclaw status                # Is the gateway running?
openclaw doctor                # Health check
openclaw doctor fix            # Auto-fix health issues
openclaw service logs          # View logs
```

---

## Command Cheat Sheet: Security

```bash
# Security Audit
openclaw security audit --deep        # Full audit
openclaw security audit --deep --fix  # Audit and auto-fix

# Authentication
openclaw config gateway auth          # Check auth settings
openclaw config gateway token rotate  # Rotate token
openclaw config gateway bind          # Check bind address

# Sandboxing
openclaw config sandbox mode [mode]   # off / non-main / all
openclaw config sandbox scope [scope] # session / agent / shared

# Tool Policies
openclaw config tools deny [tool]     # Deny a tool
openclaw config tools elevated off    # Disable elevated mode
```

---

## Command Cheat Sheet: Configuration and Channels

```bash
# Configuration
openclaw config                       # Open configuration
openclaw config gateway port          # Check/set port
openclaw config provider key          # Update 🔑 API key
openclaw config heartbeat interval    # Set heartbeat frequency
openclaw config heartbeat model       # Set heartbeat model

# Channels
openclaw channels add [channel]       # Add messaging channel
openclaw channels login               # Re-authenticate
openclaw config channels [ch] dm-mode # Check/set DM mode

# Cron Jobs
openclaw cron list                    # List scheduled jobs
openclaw cron add [name] --schedule [cron] --task [desc]
openclaw cron remove [name]           # Remove a job
openclaw cron disable [name]          # Disable a job
```

---

## Command Cheat Sheet: 🐠 Skills and TUI

```bash
# Skills
openclaw skills browse        # Browse ClawHub
openclaw skills search [q]    # Search skills
openclaw skills install [n]   # Install a skill
openclaw skills list           # List installed
openclaw skills enable [n]    # Enable a skill
openclaw skills disable [n]   # Disable a skill
```

### Inside the Chat (TUI):

| Command | Action |
|---------|--------|
| `/help` | List all slash commands |
| `/compact` | Compress conversation to save tokens |
| `/new` | Start a fresh session |
| `/model [name]` | Switch AI model |
| `/think [level]` | Set thinking depth (off/low/medium/high/xhigh) |
| `/status` | Current session info |
| `/exit` | Leave the TUI |

---

<!-- _class: warning -->

## 🚩 Rough Waters: Emergency Quick Reference

| Step | Action | Command |
|------|--------|---------|
| **1. STOP** | Kill the agent | `openclaw service stop` |
| **2. CLOSE** | Lock down access | `openclaw config gateway bind loopback` |
| **3. FREEZE** | Rotate all tokens/keys | `openclaw config gateway token rotate` |
| **4. INVESTIGATE** | Review logs and sessions | `openclaw service logs` |
| **5. RESTORE** | Fix, audit, restart | `openclaw security audit --deep --fix` |

> Print this table and keep it next to your computer.

---

## Community Resources

| Resource | Best For |
|----------|---------|
| **Official Docs** (docs.openclaw.ai) | Configuration, features, API reference |
| **GitHub** (github.com/openclaw/openclaw) | Bug reports, feature requests, source code |
| **🦞 OpenClaw Discord** | Real-time help, community discussion |
| **🦞 OpenClaw Reddit** | Longer-form discussions, tutorials |
| **ClawHub** | 🐠 Skills marketplace, community contributions |

### When asking for help, include:
1. What you were trying to do
2. The exact error message
3. Your 🦞 OpenClaw version (`openclaw --version`)
4. Your OS (Windows 10 WSL2)
5. What you have already tried

---

## 🐠 Skills vs. Agents: Know the Difference

### Use a Skill when:
- Task is triggered by a specific command
- Doesn't need its own persistent 🪸 memory
- Doesn't run independently
- It's a capability, not an identity

### Use a Separate Agent when:
- Needs persistent 🪸 memory separate from main agent
- Needs its own identity (e.g., trading bot with different risk parameters)
- Runs independently and proactively
- Communicates through different channels

> **Default to skills.** Every agent has its own context window and token costs. Multiple agents = multiple costs. Only create a new agent when you genuinely need independence.

---

## Course Completion Checklist

### You should now have:
- **Your agent** -- a fully configured AI assistant running 24/7
- **Security** -- sandboxing, tool policies, authentication, incident response plan
- **Communication** -- Telegram (and optionally Discord/WhatsApp)
- **Automation** -- morning briefs, cron jobs, proactive heartbeats
- **🐠 Skills** -- from ClawHub and custom-built
- **Knowledge** -- how it all works, how to maintain it, how to troubleshoot it

### What to do next:
- Use it daily -- 🪸 memory builds over time
- Update core files monthly -- your goals change
- Try reverse prompting weekly
- Join the 🦞 OpenClaw Discord community

---

<!-- _class: takeaway -->

## 💎 Treasure Chest

1. **Maintenance is not optional** -- daily checks (2 min) and weekly audits (10 min) prevent problems
2. **Monitor your spending** -- set limits and check your provider dashboard weekly
3. **Back up religiously** -- Git commit your workspace at least weekly
4. **Update carefully** -- back up before updating, test after updating
5. **Keep the cheat sheet accessible** -- print it, bookmark it, save it to your phone
6. **The community is your resource** -- Discord, GitHub, and Reddit when you are stuck
7. **Security is ongoing** -- run audits weekly, rotate secrets periodically

---

<!-- _class: next -->

# 🌊 Bon Voyage!

## Congratulations -- You Have Completed the Course

> You're not just running a chatbot. You're running infrastructure. Infrastructure for thought. Infrastructure for action. Infrastructure for a new kind of relationship between humans and AI.

### Welcome to the future. You built it safely. Now go use it.

<!-- Speaker notes: That's it. Twelve modules, from zero to a fully configured, secured, optimized AI personal assistant. The foundation you've built -- understanding the architecture, security mindset, context engineering -- will carry you through whatever comes next. Thank you for taking this course. -->
