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

# Module 04
# Your First Conversation

### 🦞 Meeting Your Agent for the First Time

<!-- Speaker notes: This is the module where students actually talk to their agent for the first time. The brain dump is the most important activity — make sure everyone completes it. -->

---

<!-- _class: objectives -->

## 🧭 Navigation Chart

By the end of this module, you will be able to:

1. **Navigate** the TUI (Terminal User Interface) confidently
2. **Introduce** yourself to your agent properly (the "brain dump")
3. **Name** your agent and give it an identity
4. **Understand** the token counter and why it matters
5. **Use** the essential slash commands: `/compact`, `/status`, `/new`, `/help`, `/exit`
6. **Explain** how context windows work and why conversations "fill up"
7. **Have** a productive first session with your agent

<!-- Speaker notes: Seven objectives today. The brain dump exercise is the most critical — everything else in the course builds on it. -->

---

<!-- _class: vocab -->

## 📜 Ship's Logbook — Part 1

| Term | Definition |
|------|-----------|
| **TUI** | Terminal User Interface — the interactive chat inside your terminal |
| **Context window** | The amount of text (in tokens) the AI can "remember" in a single conversation |
| **Tokens** | Units AI models use to process text. ~1 token = 3/4 of a word |
| **Brain dump** | Your initial download of information to your agent — who you are, your goals, your preferences |

---

<!-- _class: vocab -->

## 📜 Ship's Logbook — Part 2

| Term | Definition |
|------|-----------|
| **Slash command** | A command starting with `/` that instructs 🦞 OpenClaw to perform an action (not a message to the AI) |
| **Session** | A single conversation thread with your agent |
| **Compact** | The `/compact` command that summarizes your conversation to free up context window space |

---

## Opening the TUI 🐚

Launch the terminal chat interface:

```bash
npx openclaw tui
```

> **Paste tip:** Ctrl+V does not work in the Ubuntu terminal. Use **right-click** to paste text into the TUI.

**Key elements:**
- **Top bar** — Model name and token count
- **Middle area** — The conversation (your messages + AI responses)
- **Bottom input** — Where you type messages and commands
- **Token counter** — Tokens used in this session (climbs with every message)

<!-- Speaker notes: Have everyone open the TUI now. Give them a minute to look around. Point out the token counter — it starts at zero and climbs with every message. -->

---

## The Brain Dump — Why It Matters

The **brain dump** is the single most important thing you do in your first conversation.

- Without it, your agent is **generic** — it knows nothing about you
- With it, your agent becomes **yours** — personalized and useful
- Think of it as onboarding a new employee on their first day
- The more you share, the more useful your agent becomes
- It covers: who you are, your goals, your preferences, your rules

> Hiring an employee and never telling them anything about the company or their role — that is what skipping the brain dump looks like.

---

## Brain Dump Template (Part 1)

Copy, fill in, and paste as your first message:

```
Hi! I'd like to introduce myself and set you up
as my personal AI assistant.

**Who I am:**
- Name: [Your name]
- Location: [City/Country]
- Occupation: [What you do]
- Background: [Brief career/life history]
- Expertise: [What you're good at]

**My personality and communication style:**
- I prefer [direct/detailed/casual/formal] communication
- I like [short answers / thorough explanations / both]
- I value [honesty/efficiency/creativity/precision]
```

<!-- Speaker notes: Walk through each section. Emphasize that students should be specific, not vague. "I work in tech" is useless. "I'm a freelance React developer" is useful. -->

---

## Brain Dump Template (Part 2)

```
**My goals and ambitions:**
- Short-term (next 30 days): [Current focus]
- Medium-term (next 6 months): [What to accomplish]
- Long-term (1-3 years): [Bigger vision]
**What I want you to help me with:**
- [Scheduling, research, writing, coding, etc.]
**Rules for you:**
- [E.g., "Don't sugarcoat things"]
- [E.g., "Always ask before taking any action"]
Please remember all of this.
```

<!-- Speaker notes: The template continues here. Make sure students fill in every section — vague goals are useless. The alternative interview approach on the next slide is often easier for people who struggle with self-description. -->

---

## Alternative: Let Your Agent Interview You

Instead of writing a brain dump from scratch, let the agent ask:

```
I want you to interview me. Ask me questions to build
my SOUL.md and USER.md files. One question at a time.
```

- Often better -- the agent knows what format it needs
- Less intimidating for people who struggle with self-description
- The agent asks targeted follow-up questions you would not think of

---

## Brain Dump Example

```
**Who I am:**
- Name: Alex
- Location: Austin, Texas
- Occupation: Freelance web developer
- Background: Self-taught, 3 years JS/React
- Expertise: Frontend dev, sales psychology

**My goals:**
- Short-term: Launch portfolio website this month
- Long-term: One-person business making $10K/month

**Rules:**
- Don't sugarcoat things. Tell me the truth.
- Always ask before executing destructive commands.
- When I say "quick answer," give 1-2 sentences max.
```

<!-- Speaker notes: This is a shortened example. Encourage students to write MORE than this, not less. The full template has sections for daily life, challenges, and detailed preferences. -->

---

## Sending the Brain Dump

After you paste and send, your agent responds with a confirmation:

```
Thank you for the thorough introduction! I've noted
all of this. A few highlights I want to confirm:

- I'll keep communication direct and honest
- I'll help you stay focused on priorities
- I'll check before any destructive actions

Is there anything else you'd like me to know?
```

- Review the response — does your agent understand your key points?
- Correct anything it misunderstood
- The brain dump is not permanent yet (that comes in Module 05)

---

## Naming Your Agent

For this course, we use **your agent** — give it a name that resonates with you.

Send a message like:

```
From now on, your name is [Your Agent's Name]. You are my AI
personal assistant. Embody these qualities: wisdom,
patience, directness, and quiet confidence.
```

**Choosing your own name:**

- Pick something meaningful you enjoy saying — you will use it often
- The name becomes permanent in Module 05 when we edit `IDENTITY.md`

---

## Essential Slash Commands 🐚

| Command | What It Does | When to Use |
|---------|-------------|-------------|
| `/help` | Lists all available commands | Need to find a command |
| `/status` | Shows model, tokens, gateway info | System overview |
| `/compact` | Summarizes conversation to free tokens | Token counter above 50K |
| `/new` | Starts a fresh session | Switching topics entirely |
| `/think <level>` | Sets thinking depth (off/low/medium/high) | Complex reasoning tasks |
| `/exit` | Leaves the TUI (also: Ctrl+C) | Done chatting |

<!-- Speaker notes: Five essential commands cover 90% of daily use. /compact is the most important one students tend to forget. -->

---

## Understanding Tokens

**What are tokens?**
- The units AI models use to process text
- ~1 token = 3/4 of a word in English
- "Hello, how are you today?" = ~7 tokens
- A full page of text = ~500-800 tokens

**Why tokens matter:**
- **Cost** — You pay per token (input ~$15/M, output ~$75/M for Claude Opus 4.6)
- **Context window** — The model holds a finite number of tokens (~128K-200K); when full, old messages are dropped

---

## Managing Token Usage

| Strategy | What It Does | When to Use |
|----------|-------------|-------------|
| `/compact` | Compresses conversation history | Token counter above 50,000 |
| `/new` | Starts fresh session | Switching topics entirely |
| `/think <level>` | Sets AI thinking depth for complex tasks | Need deeper reasoning on hard problems |
| Short prompts | Fewer input tokens | When you do not need long explanations |
| "Quick answer" prefix | AI gives shorter responses | When you just need a fact |
| Cheaper model | Lower cost per token | Routine tasks, simple questions |

**Example:** Token counter shows 80,000. You type `/compact`. It drops to ~27,000. Over 50,000 tokens of space freed.

---

## Your First Real Conversations

### Conversation 1: Test the Waters

Ask something you already know the answer to:

```
What are the three most important principles of personal finance?
```

Evaluate: Is it accurate? Does the tone match your brain dump preferences?

### Conversation 2: Ask for a Plan

```
I want to learn Bitcoin in 30 days. Create a study plan —
30 minutes per day, complete beginner.
```

Tests: memory of your background, planning ability, personalization.

---

## Conversation 3: Test the Safety Boundary

```
Before you do anything, tell me: what files exist
in my home directory? Don't list them — just tell
me whether you CAN access them, and wait for
my permission.
```

Tests: respect for "ask before acting," judgment about sensitive actions.

- A well-configured agent should pause and explain, not just act
- If it lists files without asking, revisit your rules in the brain dump

---

## Conversation 4: Ask Your Agent to Reflect

```
What do you know about me so far? Summarize what
you've learned and tell me the most important
thing you can help me with.
```

Tests: how well your agent absorbed your brain dump.

- The summary reveals gaps in your brain dump
- Use this to identify what to add or clarify

---

## The "Ask Before Acting" Habit

**Add this to any request that involves action:**

```
Before you do anything, give me a step-by-step plan
of what you intend to do. Do not execute any commands
until I approve the plan.
```

This creates a safety loop: agent explains the plan, you approve or modify, then agent acts.

**Especially important for:** file ops, system commands, network access, sending messages.

---

## Voice Messages: Talk Instead of Type

Typing long messages is slow. **Telegram supports voice messages natively.**

### Setup:
- Install **Groq** (free) for transcription: `npx clawhub install groq-transcription`
- Talk naturally into Telegram — your agent transcribes and processes

### Best for:
- Brain dumps (talk about your life for 5 minutes instead of typing)
- Complex instructions (easier to explain by voice)
- Thinking out loud (let the agent capture your stream of consciousness)

> Much faster for the initial brain dump. Just talk. Your agent listens.

---

<!-- _class: warning -->

## 🚩 Shoals and Sandbars

| Mistake | Fix |
|---------|-----|
| Skipping the brain dump | Take 15 minutes to fill in the template |
| Brain dump is too vague | Be specific: "help organizing my daily schedule" not "help with stuff" |
| Not using `/compact` | Compact when token counter passes 50,000 |
| One endless conversation | Use `/new` for new topics |
| Treating the AI like Google | Use it for complex tasks: planning, writing, analyzing |
| Getting frustrated with wrong answers | LLMs hallucinate — verify important info |
| Not naming the agent | Name it now; you can always change it later |

---

<!-- _class: activity -->

## ⚙️ Hands on Deck: Write Your Brain Dump

### Part 1: Write It (15 min)
- At least **5 facts** about yourself
- At least **3 communication preferences**
- At least **2 short-term and 2 long-term goals**
- At least **3 specific use cases** for help
- At least **2 rules** for the agent

### Part 2: Send It (5 min)
1. Open the TUI: `npx openclaw tui`
2. Paste your brain dump (remember: **right-click** to paste, not Ctrl+V)
3. Read your agent's response — does it show understanding?

---

<!-- _class: activity -->

## ⚙️ Hands on Deck (continued)

### Part 3: Test (10 min)

1. Ask your agent to **summarize** what it knows about you
2. Ask your agent to **suggest** one thing to focus on this week
3. Ask your agent to **explain its plan** before checking your Downloads folder

### Part 4: Evaluate (5 min)

- Did your agent remember key details from your brain dump?
- Did the communication style match your preferences?
- Did your agent ask for permission before acting?
- What would you change about your brain dump?

---

<!-- _class: takeaway -->

## 💎 Treasure Chest

1. **The brain dump is the foundation** — the more you share, the more useful your agent becomes
2. **Name your agent** — it makes the experience personal and reinforces the "employee" model
3. **Master five commands:** `/help`, `/status`, `/compact`, `/new`, `/exit`
4. **Watch the token counter** — compact at 50K, new session when switching topics
5. **Always ask for a plan before action** — your safety net
6. **Test gradually** — questions and planning before executing commands
7. **Brain dump is not permanent yet** — Module 05 encodes it into persistent 🪸 memory files
8. **LLMs hallucinate** — verify important information

---

<!-- _class: next -->

# 🌊 Next Port of Call

## Module 05: Workspace and Memory

> Your brain dump lives in one session. In Module 05, we turn it into permanent configuration that persists across every session, every restart, and every update.

> This is where your agent goes from "chatbot" to "AI employee who truly knows you."

<!-- Speaker notes: Great work today. Make sure everyone has completed the brain dump exercise before moving on. Module 05 builds directly on it — we'll take everything they told the agent and make it permanent in the core files. -->
