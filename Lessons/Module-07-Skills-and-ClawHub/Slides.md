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

# Module 07 — Skills and ClawHub

## 🦞 Teaching Your Agent New Abilities

### 🐠 Browse, inspect, install, and build skills

<!-- Speaker notes: Skills are what make OpenClaw extensible. Today students will install a community skill and build their own from scratch. The security inspection step is non-negotiable — emphasize it. -->

---

<!-- _class: objectives -->

## 🧭 Navigation Chart

By the end of this module, you will be able to:

1. **Explain** what 🐠 skills are and how they work
2. **Browse and install** skills from 🦀 ClawHub (the skill marketplace)
3. **Evaluate** a skill for security before installing it
4. **Build** a simple custom skill from scratch
5. **Understand** the token impact of skills on your context window
6. **Manage** your installed skills (enable, disable, remove)

<!-- Speaker notes: Six objectives. The two most important are security evaluation (step 3) and building a custom skill (step 4). Everyone should leave today having done both. -->

---

<!-- _class: vocab -->

## 📜 Ship's Logbook

| Term | Definition |
|------|-----------|
| **Skill** | A plugin for 🦞 OpenClaw — markdown with YAML front matter that teaches your agent a new capability |
| **ClawHub** | The 🦀 community marketplace for OpenClaw skills (5,700+ available) |
| **YAML front matter** | The metadata section at the top of a skill file, between `---` markers |
| **Token impact** | The context window space a skill uses. More skills = less room for conversation |

---

## What Are Skills?

Without skills, your agent can chat, run commands, and read/write files.

**With 🐠 skills, your agent can:**

- Send and manage emails
- Create images with AI
- Interact with Google Workspace
- Post to Twitter/X
- Take and search notes in Obsidian
- Control smart home devices
- And thousands more

> A skill is just a markdown file with special metadata. When enabled, its content is loaded into the agent's context -- giving your agent new instructions.

<!-- Speaker notes: Skills are the extension mechanism for OpenClaw. They're just markdown files with YAML metadata. When a skill is active, the agent reads its instructions and gains new abilities. No code compilation, no APIs to configure — just write what you want the agent to do. -->

---

## Skill YAML Structure

Every 🐠 skill follows this format:

```yaml
---
name: "email-assistant"
description: "Manages email: read, write, reply, search"
triggers:
  - "email"
  - "send email"
  - "check my inbox"
tools:
  - "himalaya"
---
```

- **name** — Unique identifier for the skill
- **description** — What the skill does
- **triggers** — Keywords that activate the skill
- **tools** — External CLI tools or APIs the skill uses

<!-- Speaker notes: This is the anatomy of every skill. The YAML front matter is the metadata; the markdown body below it is the actual instructions. Both parts matter. -->

---

## Skill Markdown Body

Below the YAML front matter, write the instructions:

```markdown
# Email Assistant

When the user asks about email, use Himalaya CLI:

1. **Read emails**: `himalaya list`
2. **Read specific**: `himalaya read <id>`
3. **Send email**: `himalaya send --to <addr>`
4. **Reply**: `himalaya reply <id>`

## Rules
- Always confirm before sending
- Show a preview before sending
- Never auto-reply without user approval
```

When this skill is active and you say "check my inbox," your agent knows exactly what tool to use and how.

---

## Browsing 🦀 ClawHub

**Over 5,700 skills available.** Browse them:

```bash
npx openclaw skills browse      # Terminal
```

```
/skills browse              # TUI
```

| Category | Examples |
|----------|---------|
| **Communication** | Email, Slack, SMS, Telegram enhancements |
| **Productivity** | Obsidian, Notion, task management, calendar |
| **Development** | GitHub, code review, deployment |
| **Research** | Web search, data analysis, academic papers |
| **Social Media** | Twitter/X, LinkedIn, Instagram posting |
| **Creative** | Image generation, writing, music |
| **Smart Home** | Home Assistant, IoT devices, Tesla |
| **Finance** | Crypto tracking, accounting, invoicing |

<!-- Speaker notes: ClawHub is the npm of OpenClaw skills. Anyone can publish. That's the power and the risk. We'll talk about security inspection in a moment. -->

---

## Installing a Skill: Step 1 — Find

```bash
npx clawhub search "obsidian"
```

Results:

```
1. obsidian-notes (v1.2.3) - Read, write, search vault
   4/5 stars (423 installs)
2. obsidian-daily (v0.8.1) - Daily notes management
   3/5 stars (156 installs)
3. obsidian-tasks (v2.0.0) - Task management in vault
   5/5 stars (812 installs)
```

Look at **star rating** and **install count** as initial trust signals.

<!-- Speaker notes: Star ratings and install counts are useful but not definitive. We saw in the supply chain attack slide that rankings can be gamed. These are just starting points — always inspect before installing. -->

---

<!-- _class: warning -->

## 🚩 Rough Waters: Skill Inspection

**Do not install skills blindly.** Read the content first:

```bash
npx openclaw skills inspect obsidian-notes
```

**What to look for:**

- Does it request more permissions than it needs?
- Does the markdown contain suspicious instructions?
- Is the author reputable? How many installs?

**Red flags:**

- Skills requesting elevated/admin access
- Instructions to send data to external servers
- Instructions to disable security features

<!-- Speaker notes: This is the most important step. Drilling this habit now prevents security incidents later. Skills are community-contributed — anyone can publish. Trust but verify. -->

---

## Installing a Skill: Steps 3-4

### Step 3: Install (with version pinning)

```bash
npx clawhub install obsidian-notes --pin
```

> **Always use `--pin`** to lock the version and detect integrity drift.

### Step 4: Restart the gateway

```bash
npx openclaw gateway restart
```

> Skills do NOT activate until you restart. This is the most common "it's not working" issue.

---

## Installing a Skill: Step 5 -- Test

Open the TUI and try:

```
Can you list the notes in my Obsidian vault?
```

Your agent should use the skill's instructions to interact with Obsidian.

> If the skill does not respond, verify trigger words in the YAML front matter match what you typed.

---

## VirusTotal Scanning

🦀 ClawHub partners with VirusTotal to scan skills for malicious content.

**What it catches:**
- Known malware patterns
- Suspicious URLs
- Obvious data exfiltration attempts

**What it does NOT catch:**
- Subtle prompt injection instructions
- Novel attack patterns
- Social engineering embedded in instructions

> VirusTotal is one layer. Your manual inspection is another layer. Neither alone is sufficient. Together they provide reasonable safety.

<!-- Speaker notes: VirusTotal provides automated scanning but it has blind spots. Prompt injection attacks are text-based and look like normal instructions to a virus scanner. Your eyes are the last line of defense. -->

---

<!-- _class: warning -->

## 🚩 Rough Waters: The ClawHub Supply Chain Attack (2026)

- **1,184 malicious skills** found on 🦀 ClawHub
- One attacker uploaded **677 packages** alone
- Disguised as crypto bots, YouTube summarizers, wallet trackers
- Professional documentation hid malicious instructions in SKILL.md
- **#1 ranked skill** ("What Would Elon Do") had 9 vulnerabilities (Cisco scan)
- Payloads: **Atomic Stealer** (passwords, SSH keys, crypto wallets), **reverse shells**
- Rankings were **gamed** to reach #1

> This is npm supply chain attacks -- except the package can *think* and has shell access.

**Always inspect. Never trust install counts alone.**

<!-- Speaker notes: This actually happened. ClawHub's model lets anyone with a 1-week-old GitHub account publish. Same risks as npm, PyPI, or any open registry. The difference is these packages can think and have access to your computer. Read every skill before installing it. -->

---

## Building a Custom 🐠 Skill -- Step 1

Create a new skill file in your workspace:

```bash
nano ~/.openclaw/workspace/skills/daily-standup.md
```

Custom skills use the exact same format as ClawHub skills. The only difference is you write them yourself and store them locally.

> Custom skills live in `~/.openclaw/workspace/skills/`. One `.md` file per skill.

<!-- Speaker notes: Custom skills follow the exact same format as ClawHub skills. The only difference is you write them yourself and store them in your workspace skills directory. -->

---

## Building a Custom 🐠 Skill -- Step 2

Write the YAML front matter and markdown body:

```markdown
---
name: "daily-standup"
description: "Generates a daily standup report"
triggers:
  - "standup"
  - "daily standup"
---

# Daily Standup Generator

When the user asks for a standup, generate:
```

---

## Custom Skill: The Markdown Body

```markdown
## Format
**Yesterday:** [Check session history and memory]
**Today:** [Check user goals and scheduled tasks]
**Blockers:** [Any issues mentioned recently]

## Rules
- Keep each section to 3-5 bullets
- Pull from actual history, don't fabricate
- If not enough info, ask the user
```

**Save** (`Ctrl + O`, Enter, `Ctrl + X`), **restart** (`npx openclaw gateway restart`), and **test** ("Give me my daily standup").

---

## Custom Skill Ideas

Build 🐠 skills that match YOUR workflow:

- **Research template** — how you want research formatted (executive summary + findings + sources)
- **Meeting notes** — structured format for meeting summaries
- **Decision framework** — pros/cons analysis template
- **Weekly review** — questions for your weekly reflection
- **Client onboarding** — checklist for new freelance clients

> The key principle: if you can explain the process to a human, you can write it as a skill.

<!-- Speaker notes: Encourage students to think about their own workflows. The best custom skills are the ones tailored to how you actually work, not generic templates downloaded from ClawHub. -->

---

## Skill Best Practices (1 of 2)

### Write Better Descriptions
Include **"Use when"** AND **"Don't use when"** in descriptions:
```yaml
description: "Deep research. Use when user asks for analysis.
Don't use when user just wants a quick factual answer."
```

### Put Templates Inside Skills
Templates cost **zero tokens when inactive** -- they only load when triggered. Build rich, detailed skills without context bloat.

---

## Skill Best Practices (2 of 2)

### Self-Improving Skills
Add a "Lessons" section so your agent records what worked and failed:
```markdown
## Lessons Learned
- 2026-02-15: User prefers bullet points over paragraphs
```

### Skills + Networking = High Risk
Keep **domain allowlists minimal**. Use `domain_secrets` for auth instead of embedding 🔑 credentials in skill files.

---

## The "Twice = Skill" Rule

### If you do something more than twice, make a 🐠 skill for it

- First time is exploration. Second time is a pattern. **Third time is waste.**
- Turn any repeated workflow into a skill and never explain the process again.

> Ask yourself: "Have I explained this to my agent before?" If yes, write a skill so you never have to again.

---

## Channels as Departments

Map each messaging channel to a specific skill:

| Channel | Skill | Behavior |
|---------|-------|----------|
| `#x-scan` | X/Twitter | Scan threads, summarize, draft replies |
| `#finances` | Finance | Track expenses, check markets |
| `#research` | Research | Deep search, summarize sources |

- The agent switches **"mode"** based on which channel the message arrives from
- Add routing rules to `AGENTS.md` for automatic behavior switching

> One agent, many hats -- multi-agent benefits at single-agent cost.

---

## Guardrail Skills

Some skills **prevent disasters** instead of adding features.

### The `anti-loop.md` Pattern

```markdown
---
name: "anti-loop"
triggers: ["error", "failed", "retry"]
---
If you see the same error twice, STOP and ask the user.
```

- **Loops on Opus burn $5-20 in minutes** -- the agent retries the same failing approach endlessly
- A **50-token guardrail pays for itself instantly** -- one prevented loop saves more than it costs

> Build guardrail skills before feature skills. Cheapest insurance in your setup.

<!-- Speaker notes: This is one of the most valuable patterns in the course. Students who have used Opus or any frontier model for agentic work will immediately relate to the pain of watching the agent loop on the same error 15 times. The anti-loop skill is trivial to write and prevents the single most expensive mistake in agentic AI work. -->

---

## Token Impact of 🐠 Skills

Every active skill takes up context window space.

**When you start a conversation, 🦞 OpenClaw loads:**
- Your core files (identity, soul, user, 🪸 memory, agents, etc.)
- All active skill instructions
- The conversation history

**The problem:** 50 skills x 500 tokens each = 25,000 tokens used before you say a word. That means less room for conversation, more `/compact`, and higher costs.

**The solution:**
- Only enable skills you actively use
- Keep custom skills concise
- Review and remove periodically

<!-- Speaker notes: Token budgeting is a real concern. Students often get excited and install 20+ skills, then wonder why their conversations feel shorter and their bills are higher. Help them understand the direct relationship between active skills and available context. -->

---

## Managing Installed Skills

```bash
# List all installed skills
npx openclaw skills list

# Disable (keeps installed, doesn't load)
npx openclaw skills disable obsidian-notes

# Enable a previously disabled skill
npx openclaw skills enable obsidian-notes

# Remove entirely
npx openclaw skills remove obsidian-notes
```

> **Disable vs. Remove:** Disable keeps the skill for later. Remove deletes it. Prefer disabling unless you are sure you will never need it again.

---

<!-- _class: warning -->

## 🚩 Shoals and Sandbars

| Mistake | Fix |
|---------|-----|
| Installing skills without reading them | Always use `npx openclaw skills inspect` first |
| Installing too many skills at once | Start with 2-3, add more as needed |
| Not restarting after installing | Run `npx openclaw gateway restart` |
| Skill does not seem to work | Check trigger words in the YAML front matter |
| Custom skill has vague instructions | Be specific in your markdown body |
| Leaving unused skills enabled | Disable or remove to save tokens |

---

<!-- _class: activity -->

## ⚙️ Hands on Deck: Install One, Build One

### Part 1: Install from 🦀 ClawHub (10 min)
1. Browse and search: `npx openclaw skills browse`
2. Inspect for red flags: `npx openclaw skills inspect [skill-name]`
3. Install with pinning: `npx clawhub install [skill-name] --pin`
4. Restart: `npx openclaw gateway restart`
5. Test it in the TUI

### Part 2: Build a Custom Skill (15 min)
1. Create file: `nano ~/.openclaw/workspace/skills/my-skill.md`
2. Write YAML front matter + markdown body, save, restart, and test

---

<!-- _class: activity -->

## ⚙️ Hands on Deck (continued)

### Part 3: Evaluate (5 min)

- Does the installed skill work as expected?
- Does your custom skill produce the output you wanted?
- What would you improve about either skill?
- How many tokens do your active skills consume? (Check with `/status`)

---

<!-- _class: takeaway -->

## 💎 Treasure Chest

1. **Skills are markdown files with YAML metadata** — they teach your agent new capabilities through instructions
2. **ClawHub has 5,700+ skills** — browse before building from scratch
3. **Always inspect before installing** — read the full content and check for security issues
4. **Pin your skill versions** — use `--pin` to lock versions and detect integrity drift
5. **Token impact matters** — every active skill uses context window space; only keep what you need
6. **Building custom skills is easy** — if you can write instructions for a human, you can write a skill
7. **VirusTotal scanning helps but is not sufficient** — your manual review is the last line of defense
8. **Disable unused skills** — keeps your context lean and your costs down

---

<!-- _class: next -->

# 🌊 Next Port of Call

## Module 08: Cron Jobs and Heartbeats

> Skills are reactive -- they work when you ask. In Module 08, we make your agent proactive. Morning briefings, periodic check-ins, monitoring tasks -- your agent will work for you even when you are not asking.

<!-- Speaker notes: Great work today. Everyone should have at least one community skill and one custom skill installed. Module 08 takes us from reactive (you ask, your agent answers) to proactive (your agent acts on its own schedule). That's where it really starts to feel like having an employee. -->
