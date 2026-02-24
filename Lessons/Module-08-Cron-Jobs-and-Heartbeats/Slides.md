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
  pre code *, pre code span {
    color: var(--parchment) !important;
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

# Module 08
## 🦞 Cron Jobs and Heartbeats
### Making Your Agent Proactive

<!-- Speaker notes: Up until now, your agent only responds when asked. This module is about making it act on its own — sending briefings, monitoring things, running scheduled tasks. This is where OpenClaw starts to feel like a real assistant. -->

---

<!-- _class: objectives -->

## 🧭 Navigation Chart

By the end of this module, you will be able to:

1. **Explain** what heartbeats are and how they make your agent proactive
2. **Configure** heartbeat frequency and behavior
3. **Use cheaper models** for heartbeats to save money
4. **Set up cron jobs** for scheduled automations
5. **Create a morning briefing** that runs daily
6. **Understand** the difference between reactive and proactive behavior

---

<!-- _class: vocab -->

## 📜 Ship's Logbook

| Term | Definition |
|------|-----------|
| **Heartbeat** | A periodic check-in where the agent "wakes up," reviews its instructions, and takes action if needed |
| **Cron job** | A scheduled task that runs at a specific time or interval, named after the Unix `cron` scheduler |
| **Proactive** | Acting without being asked -- the opposite of reactive |
| **Morning brief** | A daily summary sent to you at a set time -- weather, news, tasks, calendar |
| **Mission control** | A custom dashboard or workspace the agent builds and maintains for you |

---

## Reactive vs. Proactive

| Reactive | Proactive |
|----------|-----------|
| You ask "What's the weather?" | Your agent sends weather at 7 AM every morning |
| You ask "Summarize this article" | Your agent monitors news sources and sends summaries |
| You say "Remind me to..." | Your agent reviews your goals and suggests priorities |
| **You ask, your agent answers** | **Your agent acts, you benefit** |

- Heartbeats and cron jobs are what make **proactive behavior** possible
- This is where 🦞 OpenClaw goes from chatbot to true assistant

<!-- Speaker notes: This table is the core concept. Reactive is useful but it's only half the value. The other half is your agent doing things on its own schedule without you lifting a finger. -->

---

## How Heartbeats Work

A heartbeat is a periodic "wake-up" for your agent. Every X minutes, the ⛵ gateway triggers your agent to:

1. Read its `HEARTBEAT.md` instructions
2. Check for pending tasks, messages, or triggers
3. Take action if needed
4. Go back to sleep until the next heartbeat

### Defaults
- **Frequency:** Every 30 minutes (or every hour with the daemon)
- **What it does:** Checks for unread messages, pending tasks, scheduled items
- **Cost:** Each heartbeat consumes tokens

---

<!-- _class: warning -->

## 🚩 Rough Waters: Heartbeat Cost Explosion

🦞 OpenClaw sends **everything** to your primary model by default. If your primary is Opus 4.6, you are paying premium prices for routine checks.

- **System prompt re-injection:** 3,000-14,000 tokens re-sent with every API call
- **Heartbeat overhead:** 48 full-context API calls per day at 30-min intervals
- **Cron job overhead:** Each trigger creates a fresh conversation with full context

> **This is the #1 cost mistake new OpenClaw users make.** A well-configured multi-model setup with prompt caching can reduce monthly API costs by up to 90%.

<!-- Speaker notes: Stress this point. People discover OpenClaw, leave defaults on, and get a $500 bill at the end of the month. The fix is in the next few slides. -->

---

## Configuring Heartbeat Frequency

```bash
npx openclaw config set agents.defaults.heartbeat.every "30m"
```

| Interval | Use Case | Cost Impact |
|----------|----------|-------------|
| 15 minutes | High-responsiveness (urgent monitoring) | Higher |
| 30 minutes | Good balance for most users | Moderate |
| 60 minutes | Budget-conscious, low urgency | Lower |
| 0 (disabled) | No proactive behavior | Zero |

> **Recommended default:** Set heartbeat to **55 minutes** + route to **Haiku** + enable caching = 99.5% cost reduction on heartbeats. This should be the first thing you configure, not an afterthought.

- **To disable heartbeats entirely:**

```bash
npx openclaw config set agents.defaults.heartbeat.every "0m"
```

---

## Use Cheap Models for Heartbeats

Most heartbeat checks are routine: "Any new messages? Any tasks due? No? Go back to sleep." This does not require Opus 4.6.

```bash
npx openclaw config set agents.defaults.heartbeat.model "claude-haiku-4-5"
```

Or with Google Gemini:

```bash
npx openclaw config set agents.defaults.heartbeat.model "gemini-flash-3"
```

<!-- Speaker notes: This single change -- routing heartbeats to a cheap model -- is the fastest way to cut your bill. Five seconds of configuration, $50-190/month saved. -->

---

## Heartbeat Cost Comparison

| Model | Cost per Heartbeat | Monthly Cost (30-min intervals) |
|-------|-------------------------------|--------------------------------|
| Claude Opus 4.6 | ~$0.05-0.15 | ~$70-200 |
| Claude Sonnet 4.5 | ~$0.01-0.05 | ~$15-70 |
| Claude Haiku 4.5 | ~$0.001-0.005 | ~$1-7 |
| Gemini Flash 3 | Free (20/day) or very cheap | ~$0-5 |

Using Haiku 4.5 instead of Opus saves **$50-190 per month**.

- Use the cheap model for routine checks
- Escalate to Opus only when something important is found

---

## Local Heartbeat Models via LM Studio

Run heartbeats on **local 3-4B models** for literally zero cost -- no API calls, no tokens billed.

### Recommended Local Models

| Model | Strength | Speed |
|-------|----------|-------|
| **Qwen 3 4B** | "Agentic King" -- most stable for tool-use and structured output | ~30 sec per heartbeat |
| **Gemma 3 4B** | Excellent instruction following, clean output | ~21 sec per heartbeat |

- Both are roughly **GPT-4o mini equivalent** for routing and heartbeat tasks
- Run them in **LM Studio** with the OpenAI-compatible API endpoint
- Point 🦞 OpenClaw's heartbeat config at `http://localhost:1234`

### When to Use Local vs. Cloud

| Setup | Recommendation |
|-------|---------------|
| **3+ agents** | Local models -- the savings multiply with each agent |
| **1-2 agents** | Cloud Haiku is fine -- simplicity beats marginal savings |
| **Offline/privacy** | Local models -- no data leaves your machine |

> Local heartbeats are free but slower. If 21-30 seconds per heartbeat is acceptable (it almost always is), this is the cheapest possible setup.

---

## The 55-Minute Prompt Caching Trick

Anthropic's extended cache stays warm for about **55 minutes**. Set your heartbeat to 55 minutes so every heartbeat hits warm cache:

```bash
npx openclaw config set agents.defaults.heartbeat.every "55m"
```

### Combined savings: Haiku + prompt caching + 55-min interval

| Without Optimization | With Optimization |
|---------------------|-------------------|
| Opus for heartbeats | Haiku for heartbeats |
| Full system prompt every call | Cached system prompt (90% off) |
| **~$100+/month** | **~$0.50/month** |

That is a **99.5% reduction** on heartbeat costs alone.

<!-- Speaker notes: This is the big one. Three config changes and you go from $100+/month to fifty cents. Write this down: interval 55, model haiku, enable prompt caching. We cover how to enable caching in Module 09. -->

---

## Configuring HEARTBEAT.md 🪸

This file tells your agent what to do during each heartbeat:

```bash
nano ~/.openclaw/workspace/HEARTBEAT.md
```

### Structure your priorities:

- **Priority 1:** Check messages -- respond to urgent ones immediately
- **Priority 2:** Scheduled tasks -- execute due tasks, log completions
- **Priority 3:** Morning brief -- send between 6:30-7:00 AM if not yet sent
- **Priority 4:** Health check -- verify ⛵ gateway and API connectivity
- **Cost rules:** Use cheapest model for routine, escalate for complex tasks

---

## Setting Up a Morning Briefing

The morning brief is the "killer feature" most 🦞 OpenClaw users set up first.

### Three methods:

**Method 1: Via HEARTBEAT.md** -- simplest, catches the AM window automatically

**Method 2: Via cron job** -- precise timing:
```bash
npx openclaw cron add "morning-brief" \
  --schedule "0 7 * * *" \
  --task "Send my morning brief to Telegram"
```

**Method 3: Just ask your agent** -- easiest:
```
Set up a daily morning brief at 7 AM on Telegram.
Include weather, top AI news, my tasks, and one suggestion.
```

---

## Testing Your Morning Brief

Do not wait until tomorrow morning. Test it now:

```
Generate and send my morning brief right now as a test.
```

### Morning brief format should include:
1. Date and greeting
2. Weather for your city
3. Top 3 news stories in your interest areas
4. Today's tasks from 🪸 memory and pending reminders
5. One proactive suggestion based on your goals

Check Telegram. Adjust and re-test until it is right.

---

## Understanding Cron Syntax

Cron uses five fields: `minute hour day-of-month month day-of-week`

```
  *  *  *  *  *
  |  |  |  |  |
  |  |  |  |  day of week (0-7, 0 and 7 = Sunday)
  |  |  |  month (1-12)
  |  |  day of month (1-31)
  |  hour (0-23)
  minute (0-59)
```

| Pattern | Meaning |
|---------|---------|
| `0 7 * * *` | 7:00 AM every day |
| `30 8 * * 1-5` | 8:30 AM weekdays only |
| `0 */2 * * *` | Every 2 hours |
| `0 9 * * 1` | 9:00 AM every Monday |

---

## Cron Job Examples

| Schedule | Task | Cron Pattern |
|----------|------|-------------|
| Every day at 7 AM | Morning brief | `0 7 * * *` |
| Every Monday at 9 AM | Weekly review | `0 9 * * 1` |
| Every hour | Check Bitcoin price | `0 * * * *` |
| Every day at 6 PM | End-of-day summary | `0 18 * * *` |
| 1st of month at 10 AM | Monthly goals review | `0 10 1 * *` |

### Cost warning:
- 1 cron/day = ~30 API calls/month (manageable)
- 1 cron/hour = ~720 API calls/month (adds up)
- 1 cron/15 min = ~2,880 API calls/month (expensive on Opus)

---

## Managing Cron Jobs

```bash
# List all cron jobs
npx openclaw cron list

# Add a cron job
npx openclaw cron add "weekly-review" \
  --schedule "0 9 * * 1" \
  --task "Conduct my weekly review"

# Remove a cron job
npx openclaw cron remove "weekly-review"

# Temporarily disable a cron job
npx openclaw cron disable "weekly-review"
```

- Use **cheap models** for routine cron jobs
- **Combine related checks** into a single job
- **Enable prompt caching** to reduce system prompt overhead

---

## Practical Automation Ideas

- **End-of-day summary (6 PM):** Tasks completed, what is pending, tomorrow's priorities
- **Weekly review (Monday 9 AM):** Goals progress, accomplishments, lessons learned
- **Price alerts (hourly):** Only message if above/below threshold -- silence for routine checks
- **News monitoring (every 4 hours):** Only alert for genuinely important stories

### Best practices:
- Be **specific** about format, content, and delivery channel
- Set alerts for **important things only** -- avoid notification fatigue
- Verify your WSL2 timezone: `timedatectl`

---

## The Three Essential Cron Jobs

Set these up before anything else -- experienced users consider them **non-negotiable**:

| Cron Job | Schedule | Purpose |
|----------|----------|---------|
| **Session cleanup** | Every 72 hours | Delete bloated session files that slow your agent |
| **Daily security audit** | Every morning | Check firewall, fail2ban, SSH, ports, Docker |
| **Silent backups** | Every 2 hours | Git push workspace -- never lose config/memory |

### Executive Assistant Scheduling
Create a `SCHEDULING.md` with your rules:
- Working hours, hard boundaries, VIP overrides
- Travel buffers, video platform defaults
- CC your agent into email threads for autonomous scheduling

<!-- Speaker notes: These three cron jobs are maintenance hygiene. Session cleanup prevents disk bloat, the security audit catches drift, and silent backups mean you can always roll back. Set them up first, everything else is bonus. The SCHEDULING.md pattern turns your agent into a real executive assistant. -->

---

## Mission Statement Reverse Prompt

### Add a Mission Statement
Add a mission statement to `IDENTITY.md` or `AGENTS.md`:
```markdown
## Mission
Build a sustainable freelance business doing $10K/month
by helping small businesses with AI automation.
```

### Schedule a Cron to Reverse-Prompt
```bash
npx openclaw cron add "mission-nudge" \
  --schedule "0 8 * * *" \
  --task "What is 1 task we can do today to get closer to our mission?"
```

### Why This Works
- The agent **suggests tasks you never thought of** -- it sees patterns across all your projects, goals, and conversations
- Unlike a to-do list, the agent weighs your **current context** (deadlines, energy, dependencies) against your **long-term mission**
- Schedule proactive **overnight mission execution** -- give the agent a task before bed, wake up to results

### If You Do Not Have a Mission Yet
Ask the agent:
```
Based on everything you know about me -- my goals, my skills,
my projects, and our conversations -- suggest a mission
statement for me.
```

> The agent knows more about your patterns than you do. Let it connect the dots.

---

## Advanced: Compaction and Mission Control

### Set Compaction Thresholds Early
Design for long-running sessions from the start:
- Set 🪸 memory flush threshold: **80K tokens**
- Set compaction threshold: **80K tokens**
- Don't wait until the agent crashes from context overflow

### Mission Control Dashboard
Create a cron job that generates a **daily status dashboard**:
- Agent health and uptime
- Token spend (daily/weekly/monthly)
- Active tasks and progress
- Upcoming calendar events
- Unread priority messages

Send as a formatted summary to Telegram. Your personal command center.

---

## Gmail Pub/Sub and Webhook Automation

Beyond cron and heartbeats, 🦞 OpenClaw supports **event-driven automation**:

| Trigger Type | When to Use | Example |
|-------------|-------------|---------|
| Cron | Time-based, recurring | Morning brief at 7 AM |
| Heartbeat | Periodic check-in | Check messages every 30 min |
| Gmail Pub/Sub | Real-time email events | Process invoices immediately |
| Webhook | External service events | React to GitHub PRs, Stripe payments |

- **Gmail Pub/Sub:** Instant notification when email arrives (no polling needed)
- **Webhooks:** Connect GitHub, Stripe, Shopify, monitoring tools to trigger agent actions
- Full guide: [docs.openclaw.ai/automation/gmail-pubsub](https://docs.openclaw.ai/automation/gmail-pubsub)

<!-- Speaker notes: Event-driven automation complements cron and heartbeats. Cron is for scheduled tasks, heartbeats for periodic checks, and webhooks/pub-sub for real-time events. Students don't need to set these up now but should know they exist. -->

---

## Session Lifecycle

Understanding when sessions live and die prevents lost work and wasted money.

### Sessions Are Stateful Only While the Chat Window Is Open
- The moment you **close the TUI or terminal**, the session dies and work stops
- There is no background daemon keeping your conversation alive
- Any in-progress task the agent was working on **halts immediately**

### What This Means for Long Tasks
- **Use cron jobs for background work**, not long-running sessions -- cron jobs trigger fresh conversations on a schedule and do not depend on an open window
- **Break one-off tasks into discrete steps** with saved output -- ask the agent to write results to a file after each step so nothing is lost if the session drops
- **Long-running sessions accumulate context (200K+ tokens)** -- the agent hallucinates more, costs more, and produces lower quality output as the session grows

### The Cost of Ignoring This
| Session Length | Context Size | Quality | Cost per Message |
|---------------|-------------|---------|-----------------|
| Fresh (0-30 min) | 5-20K tokens | High | Low |
| Medium (1-3 hours) | 50-100K tokens | Good | Moderate |
| Long (3+ hours) | 100-200K+ tokens | Degrading | High |

> **Rule of thumb:** If a task will take more than an hour, design it as a cron job or a series of short sessions with file-based handoffs.

<!-- Speaker notes: This is one of those things that seems obvious once you say it, but catches everyone. Students will try to leave your agent running overnight on a big task and come back to find it stopped when their laptop went to sleep. The fix is architectural: use cron jobs for anything that needs to outlive your terminal session. -->

---

<!-- _class: warning -->

## 🚩 Shoals and Sandbars

| Mistake | Fix |
|---------|-----|
| Setting heartbeats too frequent | Start at 55-60 minutes, decrease only if needed |
| Using Opus for heartbeats | Use Haiku 4.5 or Gemini Flash |
| Not testing automations | Always test with "do it now" |
| Vague cron job instructions | Be specific about format and delivery |
| Too many alerts | Only alert for genuinely important things |
| Cron jobs in wrong timezone | Verify with `timedatectl`, fix with `sudo timedatectl set-timezone` |

---

<!-- _class: activity -->

## ⚙️ Hands on Deck

### Part 1: Set Up the Morning Brief (15 min)
1. Edit `HEARTBEAT.md` with morning brief instructions
2. Set heartbeat model to Haiku or Gemini Flash
3. Restart the ⛵ gateway
4. Test by asking your agent to generate the brief now
5. Verify it arrives on Telegram

### Part 2: Create One Custom Cron Job (10 min)
- Choose: weekly review, daily summary, price alert, news, or custom reminder
- Set it up, test it, verify it works

### Part 3: Evaluate (5 min)
- Was the format easy to read on your phone?
- Is the heartbeat interval appropriate for your needs?

---

<!-- _class: takeaway -->

## 💎 Treasure Chest

1. **Heartbeats make your agent proactive** -- it checks in periodically and acts without being asked
2. **Use cheap models for heartbeats** -- Haiku 4.5 or Gemini Flash saves significant money
3. **The 55-minute trick** -- set heartbeats to 55 min to hit the prompt cache window, reducing costs by 90%
4. **The morning brief is the killer feature** -- set it up first, customize over time
5. **Cron jobs give precise scheduling** -- but each trigger costs tokens, so use cheap models
6. **Start conservative** -- 55-60 min heartbeats, minimal alerts; increase as needed
7. **Test everything immediately** -- do not wait for the next trigger

---

<!-- _class: next -->

# 🌊 Next Port of Call

## Module 09: Advanced Concepts

> Brains and muscles, model switching, ClawRouter, prompt caching, reverse prompting, and multi-agent setups.

<!-- Speaker notes: Your agent is now proactive. In Module 09, we go deeper on cost optimization with the brains-and-muscles model, intelligent routing, and some mind-bending techniques like reverse prompting. -->
