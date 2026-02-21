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

# Module 00
# What Is OpenClaw?

### 🦞 The Complete Beginner's Course

<!-- Speaker notes: Welcome everyone. Today we're starting from absolute zero. No prior knowledge required. By the end of this module, you'll understand what OpenClaw is, how it works, and why it matters. -->

---

<!-- _class: objectives -->

## 🧭 Navigation Chart

By the end of this module, you will be able to:

1. **Explain** what OpenClaw is in one sentence
2. **Describe** how it differs from ChatGPT, Claude, and other AI chatbots
3. **Explain** the "Gateway" concept in plain English
4. **List** the five core capabilities that make OpenClaw unique
5. **Understand** why this is exciting — and why it requires caution

<!-- Speaker notes: These are our five goals. Everything in this module builds toward these. -->

---

<!-- _class: vocab -->

## 📜 Ship's Logbook (Part 1)

| Term | Definition |
|------|-----------|
| **OpenClaw** | Open-source AI personal assistant that runs on your own hardware |
| **Gateway** | The central process coordinating messages, AI models, and actions |
| **LLM** | Large Language Model — the AI "brain" (Claude, ChatGPT, Gemini) |
| **Open Source** | Software whose code is publicly available for anyone to use |
| **API Key** | A secret password letting software connect to an AI service |

<!-- Speaker notes: Don't memorize these. They're reference. We'll explain each one as we go. -->

---

<!-- _class: vocab -->

## 📜 Ship's Logbook (Part 2)

| Term | Definition |
|------|-----------|
| **Persistent Memory** | Remembering information across ALL conversations, permanently |
| **Shell Access** | Running commands on your computer's terminal |
| **Daemon** | A program running continuously in the background (pronounced "dee-mon") |
| **Proactive** | Acting on its own, without waiting for you to ask |
| **Skill** | Instructions that teach your agent how to use a tool or do a task |

---

## The Problem

What life looks like **without** OpenClaw:

- You pay for ChatGPT, Claude, maybe Gemini
- Every task = new tab, new conversation
- The AI **forgets everything** you told it yesterday
- Messages scattered across WhatsApp, Telegram, Slack, email
- Want AI to DO something? Copy-paste across a dozen apps

> The intelligence exists. The tools exist. But the **infrastructure** to make it useful in your daily life — that's been missing.

<!-- Speaker notes: This is the pain point. Everyone in this room has experienced this. OpenClaw solves it. -->

---

## What OpenClaw Is — One Sentence

> **OpenClaw is an open-source AI personal assistant that runs on your own computer, lives inside the messaging apps you already use, remembers everything across all conversations, and can take real actions on your behalf — 24/7.**

Let's break that down, piece by piece...

---

## Breaking It Down

### "Open-source" 🦞
- Code is **free and public** on GitHub — created by **Peter Steinberger**
- You're not locked into anyone's platform — you can see exactly what it does
- Only cost = the AI model API you choose

### "Runs on your own computer"
- Your laptop, desktop, Mac Mini — whatever you have
- Your data **stays with you** — full control over what the AI can do
- Runs 24/7 as long as your computer is on

<!-- Speaker notes: Two key phrases unpacked. Open source means no vendor lock-in, full transparency. Local means your data, your rules. -->

---

## Breaking It Down (continued)

### "Lives inside your messaging apps"
- **You don't go to OpenClaw. OpenClaw comes to you.**
- Telegram, WhatsApp, Discord, Slack, iMessage, Signal, Teams
- Text it from your phone at the grocery store — no new app needed

### "Remembers everything" 🪸
- Every conversation, preference, detail — stored locally
- Gets **smarter and more personalized** over time
- Never starts from scratch — unlike ChatGPT or Claude web

<!-- Speaker notes: This is the "aha moment" for most people. You don't visit a website. You just text it. And it remembers everything forever. -->

---

## Breaking It Down (continued)

### "Takes real actions" 🐚

This is what separates OpenClaw from every chatbot you've ever used:

- **Execute commands** — run shell commands, install software, manage files
- **Browse the web** — search, read pages, interact with websites
- **Send messages** — reply on Telegram, email, any connected platform
- **Run scheduled tasks** — morning briefings, monitoring, automations

> **Anything a human can do at your computer, your agent can do too.**

<!-- Speaker notes: This is the biggest differentiator. ChatGPT talks. OpenClaw DOES. That power is why we need Module 01 on security. -->

---

## How OpenClaw Differs

| Feature | ChatGPT / Claude Web | OpenClaw |
|---------|---------------------|----------|
| Where it runs | Someone else's servers | **YOUR computer** |
| How you access it | Website | **Telegram, WhatsApp, etc.** |
| Memory | Limited, unreliable | **Persistent, permanent** |
| Can take actions? | No (just talks) | **Yes (shell, browser, APIs)** |
| Proactive? | No | **Yes** |
| Runs 24/7? | Only with tab open | **Yes, as a daemon** |
| Cost | $20-200/month subscription | **Free + API costs** |
| Data ownership | Company owns it | **You own everything** |

---

## OpenClaw vs. Claude Code

Two different tools for two different jobs:

| | Claude Code | OpenClaw |
|--|------------|----------|
| **Type** | Coding agent | Life agent |
| **Interface** | Terminal | Messaging apps |
| **Focus** | Your codebase | Your entire life |
| **Audience** | Developers | Everyone |

> Claude Code handles your **codebase**. OpenClaw handles your **life**. They're complementary.

Fun fact: You can install Claude Code as a *skill* inside OpenClaw! 🐠

---

## The Gateway — How It All Works ⛵

```
YOU (phone) → Telegram → YOUR LAPTOP (Gateway) → AI API (Claude)
                                  ↓
                         Execute tools if needed
                                  ↓
             YOU ← Telegram ← YOUR LAPTOP (response)
```

The **Gateway** is the central brain:
1. **Receives messages** from connected apps
2. **Sends them to an AI model** for processing
3. **Sends the response back** to the originating app

That's it. Message in → AI processes → Response out.

<!-- Speaker notes: Draw this on a whiteboard if possible. The arrow diagram really helps people understand. -->

---

## What Stays Local vs. What Leaves

### Stays on your computer (never leaves)
- All your files, data, conversation history, and memory
- Configuration, preferences, and tool execution

### Leaves your computer 🌊
- Message text sent to AI provider API for processing
- Web searches and platform messages (Telegram/WhatsApp traffic)
- Provider usage tracking and ClawHub telemetry during skill sync
- Remote embeddings for memory search (cloud providers only)

> **"Local-first" does NOT mean "offline."** Outbound calls happen. Control these paths in Module 10.

<!-- Speaker notes: This is a key distinction. Local-first is about data ownership, not about being disconnected. Module 10 covers how to tighten these outbound paths. -->

---

## The Five Core Capabilities

| # | Capability | What It Means |
|---|-----------|---------------|
| 1 | **Persistent Memory** 🪸 | Remembers everything, forever, across ALL conversations |
| 2 | **Proactive Automation** | Morning briefings, monitoring, tasks — acts without being asked |
| 3 | **Multi-Platform Messaging** | One agent, every platform: Telegram, WhatsApp, Discord, Slack |
| 4 | **Full Computer Access** 🐚 | Shell, file system, browser, APIs — anything a human can do |
| 5 | **Self-Improving** 🐠 | Open source, modifiable, 5,700+ community skills on ClawHub |

<!-- Speaker notes: These five capabilities are what make OpenClaw unique. No other AI tool combines all five. Each one builds on the others. -->

---

## Beyond Text: Canvas, Voice, and Agents 🐙

### Live Canvas (A2UI)
Agent pushes interactive UI — dashboards, charts, forms — directly to your device.

### Voice Wake + Talk Mode
Always-on speech via ElevenLabs for macOS/iOS/Android — talk naturally, hear responses.

### Agent-to-Agent Communication (Pinchboard)
Agents communicate through **Pinchboard** — a Twitter-like system for AI agents. Enables multi-agent coordination without human routing.

*All three features are optional — covered in Module 09.*

---

## Brief History

| Name | Period | Notes |
|------|--------|-------|
| **Clawdbot** | Early development | Original name (claw, not Claude) |
| **MoltBot** | Brief transition | Molting = lobster shedding its shell |
| **OpenClaw** | Current (2026+) | Open source + Claw. Logo is a lobster. 🦞 |

Created by **Peter Steinberger**. Community = "Friends of the Crustacean." 🦀

If you see "Clawdbot" or "MoltBot" online — they mean OpenClaw.

---

## Real-World Use Cases

| Category | Examples |
|----------|---------|
| **Personal Assistant** | Morning briefings, calendar management, email triage |
| **Second Brain** | Persistent knowledge base via WhatsApp |
| **Health & Fitness** | Whoop tracker integration, insurance reimbursements |
| **Business** | Twitter monitoring, newsletters, lead generation |
| **Development** | Vibe-coding apps, mission control dashboards |
| **Smart Home** | Tesla control, smart devices, restaurant bookings |
| **One-Week Results** | One user: 3 products + 4 autonomous agents in 7 days (~$600) |

> Limited only by your imagination and how much access you give it.

---

## The Right Mindset

1. **Think employee, not tool** — Give goals, not step-by-step instructions
2. **Don't touch config files** — Tell your agent in plain English what to change
3. **Use reverse prompting** — Ask "What should we work on?" instead of always commanding
4. **Every hour invested compounds forever** — Unlike ChatGPT, improvements are permanent
5. **Security is NOT optional** — Your agent has admin access. Treat that seriously.

---

<!-- _class: warning -->

## 🚩 Shoals and Sandbars

| Myth | Reality |
|------|---------|
| "I need a Mac Mini" | Any computer with Node.js works |
| "I should use a VPS" | Local is better for beginners |
| "It's complicated to install" | One command + setup wizard |
| "I need to code" | You talk in plain English |
| "It's free" | OpenClaw is free. AI API costs $20-200/month |
| "It's totally safe" | It has shell access. Read Module 01. |

---

<!-- _class: activity -->

## ⚙️ Hands on Deck (10 minutes)

Write down your answers — you'll use them in Module 04:

1. **What's your name and what do you do?**
2. **Why are you interested in OpenClaw?**
3. **What 3 things do you wish AI could do automatically?**
4. **What are you nervous about?**
5. **What are your goals for the next 6 months?**

> These answers become your "brain dump" — how you introduce yourself to your agent.

---

<!-- _class: takeaway -->

## 💎 Treasure Chest

- OpenClaw = open-source AI assistant on **YOUR** hardware
- The **Gateway** coordinates messages, AI, and actions
- It can do **anything a human can do** at your computer
- No Mac Mini, VPS, or coding experience needed
- **Security is critical** — covered in Module 01
- Think **employee**, not tool. Give goals, not instructions.
- Every improvement **compounds forever**

---

<!-- _class: next -->

# 🌊 Next Port of Call

## Module 01: Understanding the Risks

> *Read Module 01 before you install anything. This is not optional.*

<!-- Speaker notes: Thank you for Module 00. Before we touch any software, we need to understand the risks. Security comes first. See you in Module 01. -->
