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

# Module 05
# Workspace and Memory

## 🦞 Making Your Agent Permanent

### OpenClaw Course

<!-- Speaker notes: In Module 04, students introduced themselves to their agent. But that brain dump only lives in one session. Today we make it permanent. This is the module where students truly customize their agent. -->

---

<!-- _class: objectives -->

## 🧭 Navigation Chart

By the end of this module, you will be able to:

1. **Navigate** the 🦞 OpenClaw workspace directory (`~/.openclaw/`)
2. **Explain** the purpose of each of the 9 core markdown files
3. **Customize** your agent's identity, personality, and operating rules
4. **Understand** context engineering — giving the AI the right info at the right time
5. **Turn** your brain dump from Module 04 into persistent configuration
6. **Back up** your workspace using Git
7. **Apply** the "living files" concept to keep your agent's knowledge current

<!-- Speaker notes: This module is hands-on. Everyone will be editing files by the end. Context engineering is the most important concept here — it's the skill that separates good agent setups from great ones. -->

---

<!-- _class: vocab -->

## 📜 Ship's Logbook — Part 1

| Term | Definition |
|------|-----------|
| **Workspace** | The `~/.openclaw/` directory where all agent files live |
| **Core files** | The 9 essential markdown files defining who your agent is |
| **Context engineering** | Designing and maintaining the information your AI has access to |
| **Living files** | Files actively accessible to your AI agent (not dead files sitting unread on disk) |

---

<!-- _class: vocab -->

## 📜 Ship's Logbook — Part 2

| Term | Definition |
|------|-----------|
| **System prompt** | Hidden instructions loaded before every conversation that tell the AI how to behave |
| **Persistent memory** | Information that survives across sessions, restarts, and updates |
| **Verbalization** | Writing down your thoughts and preferences as text so the AI can access them |

---

## The Workspace Directory

Everything about your 🦞 agent lives in one place:

```
~/.openclaw/
```

| Directory | What It Contains |
|-----------|-----------------|
| `workspace/` | The 9 core markdown files (identity, rules, behavior) |
| `config/` | ⛵ Gateway configuration and settings |
| `logs/` | Activity logs for security auditing |
| `memory/` | 🪸 Persistent memory across sessions |
| `sessions/` | Saved conversation transcripts |
| `skills/` | 🐠 Installed skills (plugins) |

**Today's focus:** the `workspace/` directory.

---

## The 9 Core Files — Overview

| File | Purpose | Summary |
|------|---------|---------|
| `IDENTITY.md` | Who the agent is | Name, role, purpose |
| `SOUL.md` | Personality/tone | Style, values |
| `USER.md` | Info about you | Brain dump, permanent |
| `MEMORY.md` | 🪸 Long-term memory | Facts, decisions |
| `AGENTS.md` | Operating rules | Permissions, boundaries |
| `TOOLS.md` | API tools docs | External integrations |
| `HEARTBEAT.md` | Periodic checks | Scheduled check tasks |
| `BOOTSTRAP.md` | First boot only | One-time setup |
| `BOOT.md` | Every gateway start | Startup tasks |

<!-- Speaker notes: There are nine files. Students don't need to memorize all nine today. The "Big Three" — identity, soul, user — are where they should spend 80% of their time. -->

---

## File 1: IDENTITY.md

**Purpose:** Your agent's name, role, and identity.

```markdown
# Identity
Name: [Your Agent's Name]
Role: Personal AI Assistant
Creator: [Your name]

You are your agent, a personal AI assistant. You are
reliable, wise, and direct. You work for [Your name]
as a dedicated aide, helping with research, planning,
writing, organization, and anything else needed.
```

- First thing the AI reads about itself
- Keep it clear and concise -- sets the foundation for all behavior

---

## File 2: SOUL.md

**Purpose:** Personality, communication style, emotional character.

```markdown
## Communication Style
- Be direct and concise. No filler.
- Match the energy of the question.
## Personality
- Confident but not arrogant
- Honest, even when uncomfortable
- Proactive — suggest things unprompted
## What You Are Not
- Not a yes-man — push back on bad ideas
- Not a search engine — synthesize and advise
```

<!-- Speaker notes: SOUL.md is where students define HOW your agent talks to them. The most common complaint about AI assistants is their tone. This file fixes that. -->

> **Key insight:** SOUL.md defines WHO the AI is, not what it does. Personality DNA -- update rarely, with intention.

---

## Soul Design: What Research Shows

**Generic labels do nothing.** "You are a helpful assistant" = zero measurable improvement (tested across 4 LLM families).

**Detailed descriptions work.** Not "You are a mathematician" but "a number theorist with two decades studying prime gap distributions."

### Writing effective soul documents:
- **Write beliefs, not rules:** "I've learned that [X] because [Y]"
- **Budget 30-40% for anti-patterns** -- what the agent *won't* do
- **Soul goes first** in system prompt (20%+ accuracy drop for mid-prompt info)
- **Wrong soul is worse than no soul** -- miscalibrated persona degrades output
- **Let the agent write its own soul** -- LLM-generated souls outperform human-written

<!-- Speaker notes: This is research-backed, not opinion. The difference between a generic label and a detailed experiential soul is enormous. If your SOUL.md is just a title and adjectives, rewrite it using the "I've learned that X because Y" format. Budget 30-40% of the soul for anti-patterns: specific things the agent will NEVER do. -->

---

## File 3: USER.md

**Purpose:** Everything the agent knows about you. Your brain dump, made permanent.

```markdown
## Basic Info
- Name: [Your name]
- Location: Austin, Texas
- Timezone: Central (UTC-6)
## Goals
- Immediate: Launch portfolio website, land 2 freelance clients
- Long-term: $10K/month from independent business
## Challenges
- Starts too many projects simultaneously
- Procrastinates on administrative tasks
```

---

## File 4: MEMORY.md

**Purpose:** Facts, decisions, and learnings that persist across sessions. **Grows over time**.

```markdown
## Important Decisions
- 2026-02-16: Named agent "[Your Agent's Name]"
- 2026-02-16: Set up on Windows 10 with WSL2

## Project Status
- Portfolio website: In progress (Next.js + Tailwind)

## Learned Preferences
- User prefers bullet points over paragraphs
- User wants daily morning brief at 7:00 AM
```

- Add entries as you go -- your agent may also update this file via session hooks
- Review monthly to keep it current

---

## Advanced: The 4-File 🪸 Memory System

When MEMORY.md gets too large, split into:
- `MEMORY.md` -- long-term context (permanent)
- `memory/active-tasks.md` -- in-progress work
- `memory/lessons.md` -- mistakes worth remembering
- `memory/YYYY-MM-DD.md` -- daily notes (archived periodically)

### Optional 5th File: `memory/decisions.md`
Records **why** decisions were made, not just what. Without this, `/compact` can erase the reasoning behind past choices -- and the agent may revisit or reverse them.

> **Cautionary tale:** One user nearly had their agent drop a production database table after compaction erased the schema decision context.

---

## 🪸 Memory Configuration: Three Failure Modes

Memory systems fail in three predictable ways:

1. **Memory never saved** -- the LLM decides what to save and skips info
2. **Memory saved but never retrieved** -- agent uses context, not memory
3. **Compaction destroys knowledge** -- `/compact` removes unsaved info

### The Fix: Memory Flush with Custom Prompt
- Set a **40K token threshold** for automatic memory flush
- Force the agent to write facts to `MEMORY.md` before compaction
- Without this, every `/compact` is a potential data loss event

### Additional Safeguards
- **Context pruning:** Set `cache-ttl` to **6 hours** to expire stale context
- **Hybrid search:** Combine **vector + BM25** for retrieval
- **Session indexing:** Index completed sessions for search

---

## Advanced 🪸 Memory Tools

| Tool | What It Does | Best For |
|------|-------------|----------|
| **QMD** | Local search combining BM25 + vectors + reranking | Power users who want full control |
| **Mem0** | External memory layer with auto-capture + auto-recall | Compaction-proof persistent memory |
| **Cognee** | Knowledge graphs for entity relationships | Enterprise and multi-agent setups |
| **Obsidian** | Symlink memory folder or index vault via QMD | Users with existing Obsidian vaults |

### QMD (Recommended Starting Point)
- Runs locally -- your data stays on your machine
- Can index Obsidian vaults, Notion exports, project folders
- Combines three retrieval methods for high-quality results

### Mem0
- Auto-captures and auto-recalls facts across conversations
- **Compaction-proof** -- memory lives outside the context window

### Cognee
- Builds knowledge graphs mapping entity relationships; best for enterprise/multi-agent setups

> **Start with QMD** for local search. Add **Mem0** if compaction erases context. **Cognee** only for multi-agent setups.

---

## File 5: AGENTS.md

**Purpose:** The employee handbook -- what your agent can and cannot do.

```markdown
## Always
- Ask before destructive commands
- Plan before multi-step operations
- Cite sources; be transparent about uncertainty

## Never
- Never access email without permission
- Never send messages without approval
- Never install software or delete files without asking

## Default Behavior
- Simple questions: answer directly, no preamble
- Complex tasks: explain approach, wait for approval
```

---

## Files 6-9: Supporting Files

### `TOOLS.md` — API Tools Documentation
- Documents external tools and APIs the agent can access
- Often auto-populated by installed 🐠 skills

### `HEARTBEAT.md` — Periodic Checks
- Scheduled heartbeat tasks (every ~30 min)
- Covered in Module 08

### `BOOTSTRAP.md` — First Boot Only
- Runs once on very first ⛵ gateway startup, then deleted
- May already be gone on your system

### `BOOT.md` — Every Gateway Start
- Runs on every ⛵ gateway restart
- Startup tasks: check date, review schedule

---

## How the Files Work Together

```
You send a message
    ↓
Gateway loads: IDENTITY · SOUL · USER · MEMORY
               AGENTS · TOOLS + conversation history
    ↓
AI Model (Claude) processes everything
    ↓
Your agent's response
```

**Editing these files = changing your agent's behavior before every interaction.**

<!-- Speaker notes: This is the key insight. These files are loaded as context BEFORE every conversation. That's why editing them is so powerful — you're programming the AI's starting point. -->

---

## Context Engineering Principles

### Principle 1: Be Specific, Not Vague

**Bad:** `Be helpful and nice.`

**Good:** `Answer directly, no preamble. If I'm wrong, say so. Give exactly 3 options with pros/cons.`

### Principle 2: Write for the Machine

**Bad:** `I work in tech.`

**Good:** `Freelance React/Next.js developer. Typical project: 2-4 weeks, $3K-$8K.`

---

## More Context Engineering Principles

### Principle 3: Use Structure

- Use markdown headings, bullet points, tables
- The AI parses structured text far better than prose paragraphs
- Break information into clear, scannable sections

### Principle 4: Update Regularly

- Schedule a **monthly review** of all 9 files
- Update goals, add new preferences, remove outdated info

### Principle 5: Verbalize the Implicit

- Write down knowledge you take for granted
- Ask yourself: "What do I always explain to new employees?"
- If it is not written down, the AI cannot access it

> **Verbalization is the most valuable skill of 2026.** Don't just say "I like short emails." Specify: tone, length, signature, when to CC, when to flag for review.

---

## Living Files vs. Dead Files

**Dead files:** Sit on your hard drive unread. Tax returns, unfinished Word docs.

**Living files:** Actively read and updated by your AI agent.

### Expand your living files:

- `workspace/projects/portfolio-website.md` -- project status
- `workspace/personal/health-goals.md` -- fitness tracking
- `workspace/business/client-notes.md` -- client context

```bash
mkdir -p ~/.openclaw/workspace/{personal,business,projects}
```

> The more living files you have, the smarter your agent becomes.

**Suggested categories:** `projects/`, `contacts/`, `interests/`, `procedures/`, `docs/`

**Bonus:** Copy `OPERATIONS-Template.md` into your workspace -- written **for the agent** to diagnose problems.

---

## Editing the Core Files

Use `nano` (or any text editor) inside WSL2:

```bash
nano ~/.openclaw/workspace/IDENTITY.md
```

- **Save:** `Ctrl + O`, then Enter
- **Exit:** `Ctrl + X`

**After editing, restart the ⛵ gateway to load changes:**

```bash
openclaw service restart
```

Changes do NOT take effect until you restart. This is the most common mistake students make.

---

## Backing Up with Git

Your workspace is precious. Back it up.

```bash
cd ~/.openclaw
git init
git add -A
git commit -m "Initial workspace backup"
```

**Regular backups:**

```bash
cd ~/.openclaw
git add -A
git commit -m "Workspace update: $(date +%Y-%m-%d)"
```

**Optional: Push to a private GitHub repo** (never public — contains personal info and API config).

---

<!-- _class: warning -->

## 🚩 Shoals and Sandbars

| Mistake | Fix |
|---------|-----|
| Not editing core files at all | Spend 30 min on identity, soul, and user |
| Writing vague instructions | Be specific: "Respond in 2-3 sentences for simple questions" |
| Putting everything in one file | Use each file for its intended purpose |
| Editing JSON config files directly | Use `openclaw config` or `/config` instead |
| Forgetting to restart after changes | Run `openclaw service restart` |
| Never updating the files | Schedule a monthly review |
| Making the workspace repo public | Always use a **private** repository |

---

<!-- _class: activity -->

## ⚙️ Hands on Deck: Customize Your 9 Core Files

### Part 1: Edit the Big Three (20 min)
1. **`IDENTITY.md`** — Name, role, purpose (5+ lines)
2. **`SOUL.md`** — Personality and style (10+ lines)
3. **`USER.md`** — Brain dump in structured format (20+ lines)

### Part 2: Set Your Rules (10 min)
- Edit **`AGENTS.md`** with 3 "always" and 3 "never" rules

### Part 3: Start Your 🪸 Memory (5 min)
- Edit **`MEMORY.md`** with today's date and one goal

---

<!-- _class: activity -->

## ⚙️ Hands on Deck (continued)

### Part 4: Restart and Test (10 min)

1. Restart the ⛵ gateway: `openclaw service restart`
2. Open the 🐚 TUI: `openclaw tui`
3. Ask your agent: *"What is your name, and what do you know about me?"*
4. The response should reflect everything you wrote in the core files
5. If it does not, check that you saved the files and restarted

### Part 5: Back Up (5 min)

```bash
cd ~/.openclaw
git init
git add -A
git commit -m "Initial workspace: agent configured"
```

---

<!-- _class: takeaway -->

## 💎 Treasure Chest

1. **The workspace (`~/.openclaw/`) is your agent's entire world**
2. **The 9 core files define who your agent is** — identity, soul, user, memory, agents, tools, heartbeat, bootstrap, boot
3. **Context engineering is the most impactful skill** — be specific, structured, thorough
4. **Living files > dead files** — the more knowledge in the workspace, the smarter your agent becomes
5. **Back up your workspace with Git** — it is irreplaceable
6. **Update regularly** — your agent should evolve as you do
7. **Restart the ⛵ gateway after editing** — changes only take effect on restart

---

<!-- _class: next -->

# 🌊 Next Port of Call

## Module 06: Connecting Messaging Channels

> Right now, you can only talk to your agent through the terminal. In Module 06, we connect your agent to Telegram so you can chat from your phone, your tablet, or any device.

> Your 🦞 agent is about to go mobile.

<!-- Speaker notes: Great work today. Everyone should have their Big Three files customized before moving on. Module 06 is where we connect Telegram and the experience really starts to feel like having a personal assistant in your pocket. -->
