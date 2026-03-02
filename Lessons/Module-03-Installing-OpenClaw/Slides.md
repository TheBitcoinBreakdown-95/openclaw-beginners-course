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

# Module 03
# Installing OpenClaw 🦞

## From Zero to a Running AI Agent

<!-- Speaker notes: This is the module students have been waiting for. Walk through every wizard question carefully. The API key gotcha will trip someone up -- be ready for it. -->

---

<!-- _class: objectives -->

## 🧭 Navigation Chart

By the end of this module, you will be able to:

1. **Run** the 🦞 OpenClaw installer in your Ubuntu terminal
2. **Walk through** every step of the onboarding wizard
3. **Choose** an AI provider and configure your 🔑 API key
4. **Avoid** the token formatting gotcha that breaks most first installs
5. **Configure** the ⛵ gateway for secure local operation
6. **Install** the daemon so OpenClaw runs 24/7
7. **Verify** that everything is working
8. **Access** the dashboard and TUI (Terminal User Interface)

---

<!-- _class: vocab -->

## 📜 Ship's Logbook

| Term | Definition |
|------|-----------|
| **⛵ Gateway** | The core OpenClaw process -- coordinates messages, AI models, and actions |
| **Onboarding wizard** | Interactive setup process after installation |
| **🔑 API key** | Secret credential letting OpenClaw talk to your AI provider |
| **TUI** | Terminal User Interface -- text-based chat in your terminal |
| **Control UI** | Web-based dashboard for managing OpenClaw |
| **Provider** | Company whose AI model you use (Anthropic, OpenAI, Google, etc.) |
| **Daemon** | Background service that keeps the gateway running 24/7 |
| **Token** | (1) Authentication credential, or (2) units of text the AI processes |

---

## Before You Start

Make sure you have completed Module 02:

- [ ] Ubuntu installed and running
- [ ] systemd running (out of the box on native Ubuntu)
- [ ] Node.js 22+ installed
- [ ] Your 🐚 Ubuntu terminal open

**Everything in this module happens in the Ubuntu terminal.**

Also decide which AI provider you want to use...

---

## AI Provider Comparison

| Provider | Model | Cost | Free? |
|----------|-------|------|-------|
| **Google** | Gemini 2.5 Flash | Free | Yes — ~250 req/day |
| **Anthropic** | Claude Opus 4.6 | ~$200/mo | No |
| **Anthropic** | Claude Sonnet 4.6 | ~$50-100/mo | No |
| **OpenAI** | GPT-4 / GPT-5.2 Turbo | ~$20-200/mo | No |
| **Kimi** | K2.5 | Very cheap | No |
| **MiniMax** | M2.5 | ~$10/mo | No |

> **Two paths:** Free (Gemini) or Recommended (Anthropic Claude).

<!-- Speaker notes: Let students pick their own provider. Gemini is the no-cost option for students who want to try before they buy. Anthropic is the recommended path for best quality. -->

---

## Choose Your Path

**Path A: Start Free — Google Gemini 2.5 Flash**
- No credit card required — just your Google account
- ~250 free requests/day — plenty for learning
- Perfect for: "I want to try this before I spend a dollar"

**Path B: Full Power — Anthropic Claude**
- Best quality, strongest prompt injection resistance
- Costs ~$20-200/month
- Perfect for: "I want the best experience from day one"

> **Not sure?** Start free. You can switch anytime (Module 09).

<!-- Speaker notes: No wrong choice here. Students can always switch later. The free path removes the financial barrier entirely. -->

---

<!-- _class: warning -->

## 🚩 Rough Waters: Claude Max/Pro Subscriptions

*Path A (Gemini) users: these next two warnings are for paid providers. Listen anyway — you'll need this when you upgrade.*

**Can you use your Claude Max or Pro subscription with 🦞 OpenClaw?** No.

- Using Max/Pro with OpenClaw is **against Anthropic's Terms of Service**
- People have been **banned** -- losing access to **all Anthropic products**
- Use the **Anthropic API** with a separate 🔑 API key (pay-as-you-go)
- Set a **spending limit** ($20-50/month) — Module 09 covers reducing costs by **90%**

---

<!-- _class: warning -->

## 🚩 Rough Waters: No Spending Limits

> **Real story:** One user used pay-per-use API billing without a cap, ran 8 agents. **$800 burned in less than a week.**

| Protection | How | Priority |
|-----------|-----|----------|
| **Hard spending limit** | Anthropic Console > Settings > Usage Limits > $20-50/month | Non-negotiable |
| **Start with one agent** | Understand your token burn rate first | Critical |
| **Monitor daily (first week)** | Check console.anthropic.com/usage every day | High |
| **Use cheap models for routine** | Haiku for heartbeats, Sonnet for simple tasks (Module 09) | High |

---

## Step 1: Install 🦞 OpenClaw

In your 🐚 Ubuntu terminal, run:

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

**What this does:**
- Downloads the install script from openclaw.ai
- `-fsSL` = fail silently, no progress bar, follow redirects
- Pipes the script into bash to execute

---

## Step 1: Install 🦞 OpenClaw (continued)

**Expected output:**

```
Installing OpenClaw...
Checking Node.js version... v22.x.x
Installing OpenClaw packages...
Installation complete!
```

The **onboarding wizard starts automatically** after install. When asked "Quick Setup" or "Manual" -- choose **Manual**.

The wizard asks a series of questions. We will walk through **every single one**.

> Take your time. If you make a mistake, you can re-run the wizard with `npx openclaw config`.

---

## Wizard Q1-Q2: ⛵ Gateway Type and Workspace

### Question 1: Gateway Type

```
? Gateway type: > Local Gateway
```

**Choose: Local Gateway** -- runs on this machine.

### Question 2: Workspace Directory

```
? Workspace directory: (~/.openclaw)
```

**Accept the default** (press Enter). Creates `~/.openclaw/` in your home directory. Workspace files (SOUL.md, etc.) live at `~/.openclaw/workspace/`.

---

## Wizard Q3: AI Model Provider

```
? Select your AI provider:
  > Anthropic
    OpenAI
    Google
    MiniMax
    Open Router
    Custom
```

**Path A (Free):** Choose **Google**
**Path B (Full Power):** Choose **Anthropic**

---

## Wizard Q4: 🔑 API Key Setup

**Path A (Free — Gemini):**
1. Go to **aistudio.google.com** — sign in with your Google account
2. Click **Get API Key** (bottom left) — a key already exists in your default project
3. Copy the key — no billing or spending limit needed

**Path B (Paid — Anthropic):**
1. Go to **console.anthropic.com** — create account, verify email
2. **Settings > Billing** — add payment, **set spending limit** ($20-50/month)
3. **Settings > API Keys** → "Create Key" → name it "OpenClaw"
4. Copy the key (starts with `sk-ant-...`) — you can only see it once

Both paths: use the **text editor trick** on the next slide before pasting.

---

<!-- _class: warning -->

## 🚩 Rough Waters: The Token Formatting Gotcha

**The Problem (the #1 install error):** Browsers add hidden characters (line breaks, spaces) when copying. Pasting directly into the terminal **corrupts the key**.

**The Solution — The Text Editor Trick:**
1. Copy the 🔑 API key from your provider's console
2. Paste into a **text editor** (Text Editor app or `gedit`) -- verify it is **one single line**
3. Select all (`Ctrl + A`), copy (`Ctrl + C`)
4. Paste into the terminal (`Ctrl + Shift + V`)

```
? Enter your API key: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

<!-- Speaker notes: This will save at least one student in every class. The text editor trick is not optional -- make everyone do it. Applies to ALL providers, not just Anthropic. -->

---

## Wizard Q5-Q6: Model and Port

### Question 5: Model Selection

**Path A (Gemini):** Choose `gemini-2.5-flash` — covered by the free tier
**Path B (Anthropic):** Choose `claude-opus-4-6` — most capable model

**Question 6: ⛵ Gateway Port**

```
? Gateway port: (18789)
```

**Accept the default** (press Enter). Port 18789 is the standard OpenClaw port.

---

## Wizard Q7: ⛵ Gateway Bind

```
? Gateway bind: > Loopback
```

**Choose: Loopback** (most secure -- only this computer can connect)

| Option | Who Can Connect | When to Use |
|--------|----------------|-------------|
| **Loopback** | Only this computer | Default -- most secure |
| **LAN** | Devices on your WiFi | Access from another local machine |
| **Tailscale** | Your Tailscale network | Secure remote access |
| **Custom** | Whatever IP you specify | Advanced users only |

> Change later with `npx openclaw config` (re-runs the wizard)

---

## Wizard Q8-Q9: Tailscale and Token

### Question 8: Tailscale Exposure
```
? Tailscale exposure: (Off)
```
**Choose: Off** -- enable later when security is fully configured.

### Question 9: ⛵ Gateway Token
```
? Gateway token: (leave blank to auto-generate)
```
**Leave blank** -- auto-generates a secure random token. **Save it when displayed.**

---

## Wizard Q10: Chat Channels

```
? Configure chat channels? > Skip for now
```

**Choose: Skip for now** -- we set up Telegram in Module 06.

Get the base installation working first. You can always add channels later with `npx openclaw config` (re-runs the wizard).

---

## Wizard Q11-Q14: 🐠 Skills, Hooks, Service

- **Q11: Skills** -- Skip all (covered in Module 07)
- **Q12: Hooks** -- Enable BOOT.md and session 🪸 memory
- **Q13: Service Runtime** -- Choose Node.js (only option)
- **Q14: Install as Background Service** -- Choose **Y**

If the wizard says "Gateway service already installed" -- choose **Restart**

When asked "How do you want to hatch your bot?" -- choose **do this later**

When asked "Enable bash shell completion?" -- choose **Yes**

---

## Step 2: Onboarding Complete

The wizard finishes with output like this:

```
  Gateway configured
  AI provider connected (your chosen provider and model)
  Daemon installed (systemd service)
  Dashboard:     http://127.0.0.1:18789/
  Gateway Token: abc123xyz... (save this!)
```

**Save your gateway token immediately** -- store it in a password manager or secure note. You need it for dashboard access.

Retrieve it later with: `cat ~/.openclaw/openclaw.json` (look for the token field)

---

## Troubleshooting: Device Pairing

> Skip this unless the TUI or web UI won't connect.

If you see "pairing required":

```bash
npx openclaw devices list --json
```

Find the `requestId` for the pending entry, then approve it:

```bash
npx openclaw devices approve YOUR-REQUEST-ID
```

Replace `YOUR-REQUEST-ID` with the actual ID from the list output.

---

## Immediately After Onboarding: Install QMD

Before doing anything else, install **QMD** -- an on-device search engine for your agent's 🪸 memory files:

```bash
npx clawhub install qmd
npx openclaw gateway restart
```

(If npx says "Need to install clawhub" -- type **y**. ClawHub is the skill marketplace CLI.)

> **Rate limit error?** Wait a few minutes and retry. If it keeps failing, skip QMD and move on — your agent works without it. Install later.

**Why this matters:**
- Without QMD, your agent re-reads files every time (wastes tokens)
- With QMD, your agent searches indexed files instantly — saves money from day one
- Takes 30 seconds to install

<!-- Speaker notes: Install this before your first real conversation. Module 09 covers configuring cheaper models for routine tasks. -->

---

## Step 3: Verify the Installation

Run these three commands in order:

```bash
npx openclaw status                      # Should show: gateway reachable
npx openclaw doctor                      # All critical checks should pass
npx openclaw security audit --deep --fix # Fixes file permissions
```

- If `doctor` reports failures, run `npx openclaw doctor --repair`
- Security audit sets dirs to 700 and files to 600

---

## Step 4: Access the Dashboard

1. In your terminal, run: `npx openclaw dashboard --no-open`
2. Copy the **full URL** it prints (includes your token)
3. Paste it into your browser

> If the dashboard won't connect, skip it — the **TUI is the primary interface**.

**Dashboard vs. TUI:**

| Interface | What It Is | Best For |
|-----------|-----------|----------|
| **Control UI** (Dashboard) | Web page at localhost:18789 | Configuration, monitoring, logs |
| **TUI** (Terminal UI) | Text chat in your terminal | Talking to your agent, running commands |

Most day-to-day interaction happens in the **TUI**. The dashboard is for **management**.

---

## Step 5: Your First Chat

```bash
npx openclaw tui
```

A full-screen terminal interface opens. Type a simple greeting:

```
Hello! My name is [your name]. What's your name?
```

---

## Step 5: Your First Chat (continued)

**What should happen:**
- Your message appears in the chat
- After 1-5 seconds, the AI responds
- The token counter increments

**If you get a response -- 🦞 OpenClaw is working!**

> Do not have a full conversation yet. We will do that in Module 04. Type `/exit` or `Ctrl + C` to leave.

<!-- Speaker notes: This is the moment. Give students a minute to enjoy it. Then move on to daemon verification. -->

---

## Step 6: Verify the Daemon

### Check the service status
```bash
npx openclaw gateway status    # Look for: Active: active (running)
```

### Test terminal independence
1. **Close** your 🐚 Ubuntu terminal completely
2. Wait 10 seconds, then open `http://127.0.0.1:18789/`
3. Dashboard should **still load** -- the daemon kept it alive

---

## Step 6: Service Commands Reference

```bash
npx openclaw gateway start     # Start the daemon
npx openclaw gateway stop      # Stop the daemon
npx openclaw gateway restart   # Restart the daemon
npx openclaw logs      # View daemon logs
```

Use `restart` after any config change. Use `logs` to debug startup issues.

---

<!-- _class: warning -->

## 🚩 Damage Control

| Problem | Fix |
|---------|-----|
| `openclaw: command not found` | Use `npx openclaw` instead -- the install does not add it to PATH |
| "API key invalid" | Use the **text editor trick** -- hidden line breaks are the #1 cause |
| "Port already in use" | `npx openclaw config` (re-run wizard, change port), then restart |
| "Connection refused" in browser | Check `npx openclaw gateway status`; use `http://` not `https://` |
| Daemon does not start on boot | Verify systemd: `systemctl is-system-running` |
| AI responses very slow (30s+) | Check `status.anthropic.com`; try Sonnet 4.6 temporarily |

---

<!-- _class: warning -->

## 🚩 Damage Control (continued)

| Problem | Fix |
|---------|-----|
| "Insufficient credits" | Check billing at your provider's console |
| Token counter climbs fast | Use `/compact` to compress history; start new chats with `/new` |
| "pairing required" | Run `npx openclaw devices list --json`, find requestId, approve with `npx openclaw devices approve ID` |
| "auth failed" on dashboard | Run `npx openclaw dashboard --no-open` to get a tokenized URL. Paste the full URL into your browser. |
| Dashboard still won't connect | Skip it — the TUI is the primary interface |
| `http` vs `https` | Use `http://` not `https://` for the dashboard URL |

---

<!-- _class: activity -->

## ⚙️ Hands on Deck

Complete this checklist before proceeding to Module 04:

- [ ] `npx openclaw --version` shows a version number
- [ ] `npx openclaw status` shows "gateway reachable" and `npx openclaw doctor` passes
- [ ] `npx openclaw security audit --deep` has no critical issues
- [ ] Dashboard loads at `http://127.0.0.1:18789/`
- [ ] TUI opens with `npx openclaw tui` and AI responds to a test message
- [ ] ⛵ Gateway stays running after closing the terminal
- [ ] Gateway token saved somewhere secure
- [ ] `~/.openclaw/` directory is mode 700

**Bonus:** Run `npx openclaw logs` and read the last few lines.

---

<!-- _class: takeaway -->

## 💎 Treasure Chest

1. **Installation is one command** -- the onboarding wizard starts automatically
2. **The token formatting gotcha is real** -- always paste API keys into a text editor first
3. **Start with loopback binding** -- most secure, only this machine can connect
4. **Set API spending limits** (paid providers) -- Gemini free users skip this step
5. **The daemon keeps the gateway running 24/7** -- even after closing the terminal
6. **Two interfaces**: TUI for chatting, Dashboard for managing
7. **Run the security audit** after installation -- catches permission issues
8. **Save your gateway token** -- retrieve with `cat ~/.openclaw/openclaw.json`
9. **Everything stays local except API calls** -- your data never leaves your machine

---

<!-- _class: next -->

# 🌊 Next Port of Call

## Module 04: Your First Conversation 🦞

> Your agent is awake. Time to introduce yourself, do a "brain dump" of your life and goals, and learn the essential commands for daily use.

<!-- Speaker notes: OpenClaw is installed and running. Gateway is active. AI is connected. Daemon is alive. In Module 04, students properly meet their agent. Congratulations -- the hard part is done. -->
