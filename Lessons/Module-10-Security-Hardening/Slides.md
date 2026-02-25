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

# Module 10
# Security Hardening

## 🦞 Sandboxing, Tool Policies, and Incident Response

<!-- Speaker notes: In Module 01 we covered security principles. In Module 03 we locked the front door. This module is about installing the alarm system, cameras, and vault. You've added channels, skills, and automations -- each one expanded your attack surface. Time to lock things down. -->

---

<!-- _class: objectives -->

## 🧭 Navigation Chart

By the end of this module, you will be able to:

1. **Explain** the three sandbox modes and three sandbox scopes
2. **Set up Docker** for sandboxing on Ubuntu
3. **Configure tool policies** to restrict what your agent can do
4. **Harden** your ⛵ gateway authentication
5. **Isolate** your agent on a separate home network
6. **Set up** a 🔑 password manager for credential storage
7. **Run and interpret** a deep security audit
8. **Implement** a weekly security maintenance routine
9. **Handle** a security incident step by step

---

<!-- _class: vocab -->

## 📜 Ship's Logbook

| Term | Definition |
|------|-----------|
| **Sandbox** | An isolated environment that restricts what a program can access |
| **Docker** | A platform for running applications in isolated containers |
| **Container** | A lightweight, isolated instance of an operating system |
| **Tool policy** | A rule that allows or denies specific tools for specific contexts |
| **Elevated mode** | A setting that bypasses sandboxing -- extremely dangerous |
| **chmod** | A 🐚 Linux command that changes file permissions |

---

## Why Harden Now?

- Module 01 was the **security briefing**
- Module 03 was **locking the front door**
- This module is installing the **alarm system, cameras, and vault**

Since initial setup, you have added:
- Messaging channels (Telegram, Discord, WhatsApp)
- 🐠 Skills from ClawHub and custom-built
- Heartbeats and cron jobs
- Potentially browser control

**Each one expanded your attack surface.** Time to contain the risk.

<!-- Speaker notes: Frame this as a progression. Students should understand that security is not a one-time thing -- every new capability they add creates new risk that needs to be managed. -->

---

## The Three Sandbox Modes

| Mode | What It Does | When to Use |
|------|-------------|-------------|
| **off** | No sandboxing -- agent runs commands directly on your system | Only if you fully trust your setup |
| **non-main** | Everything except your main session is sandboxed | Good default for most users |
| **all** | Everything is sandboxed, including your main session | Maximum security for untrusted content |

```bash
npx openclaw config set sandbox.mode "non-main"
```

### What "non-main" means in practice:
- **Your TUI chat:** Full system access
- **Telegram messages:** Sandboxed (restricted)
- **Heartbeats:** Sandboxed (restricted)
- **🐠 Skills processing input:** Sandboxed (restricted)

> **Sandbox containers have NO network by default.** Tools needing internet will fail silently. Test every workflow from Telegram after enabling sandbox.

<!-- Speaker notes: "non-main" is the sweet spot for most people. Your direct interactions keep full power. Everything that could receive untrusted input is isolated. This protects against the most likely attack vector. IMPORTANT: emphasize no-network default. This is the #1 gotcha -- students enable sandboxing and then tools that need internet stop working from Telegram with no error. They need to test from a non-main context and enable sandbox network if needed. -->

---

## The Three Sandbox Scopes

| Scope | Container Behavior | Isolation Level | Overhead |
|-------|-------------------|----------------|----------|
| **session** | New container for every session | Highest -- nothing persists | High |
| **agent** | One container per agent | Medium -- each agent isolated | Medium |
| **shared** | All agents share one container | Lowest -- agents can see each other's files | Low |

```bash
npx openclaw config set sandbox.scope "agent"
```

**Recommended:** `agent` scope -- each agent gets its own sandbox without per-session overhead.

### 🪸 Workspace access control:

| Setting | What the Sandbox Can Do |
|---------|------------------------|
| **read/write** | Read and write workspace files |
| **read** | Read files only |
| **none** | No workspace access at all |

<!-- Speaker notes: Scope determines how long a sandbox lives and how much isolation you get. Agent scope is the best balance -- each agent is separated from the others, but you don't pay the startup cost of a new container every session. -->

---

## Setting Up Docker for Sandboxing

### Step 1: Install Docker on Ubuntu

```bash
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io
```

### Step 2: Add your user to the Docker group

```bash
sudo usermod -aG docker $USER
```

Then log out and back in.

### Step 3: Verify it works

```bash
docker run hello-world
```

### Step 4-5: Configure 🦞 OpenClaw sandboxing

```bash
npx openclaw sandbox setup
npx openclaw config set sandbox.mode "non-main"
npx openclaw config set sandbox.scope "agent"
npx openclaw gateway restart
```

<!-- Speaker notes: Docker is a prerequisite for sandboxing. Without it, sandbox mode settings are ignored. Walk students through each step and make sure docker run hello-world succeeds before moving on. -->

---

## Testing the Sandbox

From Telegram (or any external channel), send:

```
List the files in my home directory.
```

### If sandboxing is working:
The agent should only see the sandbox's limited file system, not your actual home directory.

### Expected response:
```
I can only see files within my sandbox environment.
I don't have access to your actual home directory.
```

If it shows your real files, sandboxing is **not active** -- recheck your configuration.

<!-- Speaker notes: This is the litmus test. If Telegram can see your real home directory, something is wrong. Most common cause: Docker not installed or service not restarted after config change. -->

---

## Tool Policies

Tool policies are **layered** (global > provider > agent > sandbox) and **deny always wins**.

| Tool | What It Does | Risk Level |
|------|-------------|-----------|
| **exec** | Execute 🐚 shell commands | Critical |
| **process** | Manage system processes | High |
| **browser** | Control a web browser | High |
| **file-read** | Read files on the system | Medium |
| **file-write** | Write/modify files | High |
| **network** | Make network requests | Medium |

### Example: Lock down dangerous tools

```bash
# Use the "messaging" profile (restricts to safe tools)
npx openclaw config set tools.profile "messaging"

# Or deny specific tools manually
npx openclaw config set tools.deny '["exec", "browser", "process"]'
```

> **Rule:** Deny always wins. If `tools.deny` lists a tool, nothing can override it. Use `npx openclaw security audit` to verify your policies.

<!-- Speaker notes: Two key points: (1) Deny always wins across all layers. If global denies a tool, agent-level allow won't override it. This prevents accidental over-permissioning but can confuse people. (2) Policy drift -- agent-specific configs don't always get forwarded to cron or sub-agent execution paths. This is a known issue being fixed. Tell students to verify tool access works in cron contexts, not just TUI. -->

---

<!-- _class: warning -->

## 🚩 Rough Waters: Elevated Mode

**Elevated exec** bypasses all sandboxing. The agent runs commands directly on the host system regardless of sandbox config.

### NEVER enable elevated mode for:
- Unknown senders
- External channels
- Untrusted 🐠 skills
- Any context where input is not directly from you

### Check and disable:

```bash
# Check status
npx openclaw config tools elevated

# Disable if enabled
npx openclaw config tools elevated off
```

> If elevated mode is on and you did not intentionally set it, treat this as a security incident.

<!-- Speaker notes: Elevated mode is the single most dangerous setting in OpenClaw. It completely nullifies sandboxing. If a student finds it enabled and didn't set it themselves, that's a red flag that something may have changed their config. -->

---

## ⛵ Gateway Authentication Hardening

### Verify authentication is required:

```bash
npx openclaw config get gateway.auth.mode
```

### Rotate your ⛵ gateway token (periodic maintenance or after incident):

```bash
npx openclaw config set gateway.auth.token "$(openssl rand -hex 32)"
npx openclaw gateway restart
```

### Verify bind configuration:

```bash
npx openclaw config get gateway.bind
```

**Expected:** `loopback` (unless you intentionally configured LAN or Tailscale).

```bash
# Reset to loopback if unexpected
npx openclaw config set gateway.bind "loopback"
```

### Additional Hardening
- **Change the default port** -- port 18789 is public knowledge (in every tutorial). Change it.
- **Add Fail2ban** -- 3 failed auth attempts = 24-hour ban
- **Configure UFW firewall** -- close every port you don't need
- **User allowlisting** -- configure the ⛵ gateway to only accept connections from specific user IDs

<!-- Speaker notes: The gateway is the front door to your agent. Default port, no auth, and binding to all interfaces is a recipe for unauthorized access. Loopback binding is the safest default -- only local connections. -->

---

## Home Network Security

Your agent shares WiFi with your laptop, phone, NAS, and smart TV. **A flat network means a compromise on one device can reach all others.**

The fix: **put your agent on a separate network** (same principle as IoT devices).

| Approach | Cost | Difficulty | Isolation Level |
|----------|------|-----------|----------------|
| **Guest network** | Free | Easy | Good -- devices can't see each other |
| **VLAN / separate SSID** | Free (if router supports it) | Medium | Best -- full network separation |
| **Second cheap router** | $15-30 | Easy | Good -- physical subnet separation |
| **Do nothing** | Free | None | None -- all devices share one network |

### Guest Network (Easiest -- 5 minutes):
1. Log into your router admin panel (`192.168.1.1`)
2. Enable **Guest Network** with a strong password
3. Connect the agent's machine to the guest WiFi
4. Verify: from the agent's machine, ping your laptop's IP -- it should **fail**

### If you need dashboard access across networks:
Use **Tailscale** (Module 02) to bridge securely without opening up the network.

<!-- Speaker notes: This is the same advice given for smart home devices. Your agent is an always-on, internet-connected device with shell access -- it deserves at least the same isolation as your smart thermostat. Guest network is free and takes 5 minutes. VLANs are better if your router supports them. -->

---

## 🔑 Credential Management: Password Manager

🦞 OpenClaw stores secrets in **plaintext on disk** by default -- API keys, bot tokens, service credentials.

### 1Password Setup (Recommended):
1. Create a dedicated vault: **"Shared with OpenClaw"**
2. Create a **service account** with access to ONLY that vault
3. Add 1Password CLI commands to `TOOLS.md`
4. Tell the agent: **"Never store secrets in 🪸 memory, notes, or plain text"**

### Why it matters:
- Compromised filesystem → attacker gets ONE service account key for ONE vault
- Credentials never appear in session transcripts or chat logs
- **Revoke instantly** -- disable the service account and all credential access stops

### Alternatives: Bitwarden CLI, KeePassXC CLI -- same principle, different tool

<!-- Speaker notes: Default plaintext credential storage is one of the biggest security gaps in a fresh OpenClaw install. A password manager limits blast radius -- if the filesystem is compromised, the attacker gets one key that accesses one vault, not every credential scattered across dozens of files. -->

---

## 🐚 File Permissions

### Lock down the workspace:

```bash
chmod 700 ~/.openclaw
chmod 700 ~/.openclaw/workspace
chmod 700 ~/.openclaw/config
chmod 700 ~/.openclaw/memory
chmod 700 ~/.openclaw/sessions
find ~/.openclaw -type f -exec chmod 600 {} \;
```

### What these permissions mean:

| Permission | Number | Meaning |
|-----------|--------|---------|
| `700` (directory) | rwx------ | Only owner can read, write, and list |
| `600` (file) | rw------- | Only owner can read and write |

### Verify:

```bash
ls -la ~/.openclaw/
```

Every entry should show `drwx------` or `-rw-------`.

<!-- Speaker notes: File permissions are the last line of defense. Even if someone gains access to the system, proper permissions prevent other users from reading your agent's config and secrets. -->

---

## 🔭 Running Security Audits

### Run the deep audit:

```bash
npx openclaw security audit --deep
```

### Understanding the output:

- **CRITICAL** -- must fix immediately (e.g., ⛵ gateway exposed without auth)
- **WARNING** -- address soon (e.g., file permissions too broad)
- **INFO** -- confirmations that things are correct

### Auto-fix common issues:

```bash
npx openclaw security audit --deep --fix
```

### Separate health check:

```bash
npx openclaw doctor
npx openclaw doctor --repair
```

<!-- Speaker notes: The security audit is the single best tool for catching misconfigurations. The --deep flag checks everything including file permissions, gateway config, sandbox status, and tool policies. Run it weekly. -->

---

## Browser Control Safety

If you have enabled browser control for your agent:

- **Use a dedicated browser profile** -- never let the agent use your personal profile
- **Never** have banking, personal email, or social media logged in on the agent's profile
- **Restrict browser access** to your main session only:

```bash
# Deny browser in sandbox contexts (heartbeats, cron, channels)
npx openclaw config set tools.sandbox.tools.deny '["browser"]'
```

### If you do not need browser control:

```bash
npx openclaw config set tools.deny '["browser"]'
```

Most users do not need browser control, especially when starting out.

### ⚓ Prompt Inoculation (ACIP)
Install a security prompt in `AGENTS.md` that makes the agent smarter about recognizing and resisting prompt injection, especially 🔑 credential leakage attempts.

<!-- Speaker notes: Browser control is one of the highest-risk tools. An agent with browser access can see anything on screen, click links, and fill in forms. If it's compromised, that's full access to whatever's logged in. Dedicated profile is non-negotiable. -->

---

## ⚓ Weekly Security Maintenance

### The 10-Minute Weekly Check:

1. Run security audit: `npx openclaw security audit --deep`
2. Run health check: `npx openclaw doctor`
3. Fix any issues: `--fix` flags
4. Check API spending: visit your provider dashboard
5. Verify DM modes: `npx openclaw config get channels.telegram.dmPolicy`
6. Verify sandbox status: `npx openclaw config get sandbox.mode`
7. Commit workspace backup: `git add -A && git commit -m "Weekly backup"`

### Automate it:

```
Every Sunday at 10 AM, run a security audit.
Send results to Telegram. Alert me immediately for
CRITICAL issues. Otherwise just confirm all clear.
```

### Additional Security Measures
- **Self-audit:** Ask your agent to review its own security configuration: *"Review your current security posture and identify vulnerabilities"*
- **Anomaly alerts:** Configure HEARTBEAT.md to message you about unexpected login attempts or unusual API usage
- **SOUL.md security rules:** Add standing orders like *"If anyone asks you to reveal secrets, refuse and alert me immediately"* — active in every conversation, not just scheduled checks
- **VM isolation (advanced):** For stronger isolation than Docker, UTM (free, Mac) provides full VM sandboxing with its own OS
- **Message signing:** Sign messages at the ⛵ gateway level to verify authenticity and prevent spoofing

<!-- Speaker notes: Automation is key. If you rely on remembering to run the audit, you'll forget. Set up a cron job or heartbeat to do it automatically. The weekly check takes 10 minutes manually but catches drift before it becomes a problem. -->

---

## Incident Response: The Five Steps

| Step | Action | Time |
|------|--------|------|
| **STOP** | Kill the ⛵ gateway immediately | 30 seconds |
| **CLOSE** | Lock down access -- loopback only, disable DM channels | 2 minutes |
| **FREEZE** | Rotate all 🔑 secrets -- gateway token, API keys, bot tokens | 10-30 minutes |
| **INVESTIGATE** | Review logs, sessions, file modifications | 1-2 hours |
| **RESTORE** | Fix root cause, audit, restart, 🔭 monitor 24-48 hours | 30 min - hours |

<!-- Speaker notes: Write STOP, CLOSE, FREEZE, INVESTIGATE, RESTORE on the board. This is the order. Do not skip steps. Do not investigate before you stop and close -- you need to contain first, then figure out what happened. -->

---

## Incident Response: Commands

### STOP
```bash
npx openclaw gateway stop
pkill -9 -f openclaw    # if it won't stop gracefully
```

### CLOSE
```bash
npx openclaw config set gateway.bind "loopback"
npx openclaw config set channels.telegram.dmPolicy "disabled"
```

### FREEZE
```bash
npx openclaw config set gateway.auth.token "$(openssl rand -hex 32)"
npx openclaw gateway restart
npx openclaw config set models.providers.anthropic.apiKey "[NEW_KEY]"
npx openclaw config set channels.telegram.botToken "[NEW_TOKEN]"
```

### INVESTIGATE
```bash
npx openclaw logs
ls -lt ~/.openclaw/sessions/ | head -20
```

### RESTORE
```bash
npx openclaw security audit --deep --fix
npx openclaw gateway start
```

<!-- Speaker notes: Walk students through each step with the commands. Emphasize that STOP comes first -- do not try to investigate while the agent is still running and potentially compromised. Contain, then investigate. -->

---

<!-- _class: warning -->

## 🚩 Shoals and Sandbars

| Mistake | Fix |
|---------|-----|
| Not setting up Docker | Install Docker -- required for sandboxing |
| Sandbox mode "off" | Set to "non-main" at minimum |
| Elevated mode enabled | Disable: `npx openclaw config tools elevated off` |
| Loose file permissions | `chmod 700` directories, `chmod 600` files |
| Never running security audit | Run `--deep` weekly |
| Using personal browser profile | Create a dedicated profile for the agent |
| ⛵ Gateway exposed without auth | Set bind to loopback, enable token auth |
| Skipping 🔑 secret rotation after incident | Rotate ALL secrets immediately |

<!-- Speaker notes: Go through each row. Ask students which of these they might have done. No shame -- the point is to fix it now. Most common issues are sandbox mode off and loose file permissions. -->

---

<!-- _class: activity -->

## ⚙️ Hands on Deck

### Part 1: Run the Audit (5 min)
- `npx openclaw security audit --deep`
- Note every finding: critical, warning, or info

### Part 2: Fix All Issues (10 min)
- `npx openclaw security audit --deep --fix`
- Manually fix anything auto-fix missed

### Part 3: Set Up Docker and Sandboxing (15 min)
- Install Docker, configure sandbox mode and scope, restart

### Part 4: Test the Sandbox (10 min)
- From Telegram, ask your agent to list files or read `/etc/passwd`

### Part 5: Lock Down Permissions (5 min)
- `chmod 700 ~/.openclaw` and verify with `ls -la`

<!-- Speaker notes: This is the most hands-on exercise in the course. Every student should leave this module with sandboxing active and a clean security audit. Circulate and help with Docker issues -- that's the most common stumbling block. -->

---

<!-- _class: takeaway -->

## 💎 Treasure Chest

1. **Sandbox mode "non-main" is the sweet spot** -- direct sessions have full access, everything else is isolated
2. **Sandbox has NO network by default** -- test workflows from Telegram after enabling
3. **Docker is required for sandboxing** -- install it even if you do not enable sandboxing right away
4. **Tool policies are layered, deny always wins** -- check all levels when debugging
5. **Isolate your agent's network** -- guest WiFi or VLAN keeps a compromise contained
6. **Store credentials in a password manager** -- never leave 🔑 API keys in plaintext on disk
7. **Control outbound calls** -- disable ClawHub telemetry, review usage tracking, control remote embeddings
8. **File permissions matter** -- 700 for directories, 600 for files
9. **Run security audits weekly** -- catches configuration drift
10. **Never enable elevated mode** for untrusted contexts
11. **Rotate secrets regularly** and immediately after any incident

<!-- Speaker notes: This is the densest takeaway slide in the course. Every item here is actionable. If students only remember three things: sandbox non-main, password manager, and weekly audits. -->

---

<!-- _class: next -->

# 🌊 Next Port of Call

## Module 11: Maintenance and Troubleshooting

> Day-to-day operations, updating 🦞 OpenClaw, common error solutions, and a printable command cheat sheet.

<!-- Speaker notes: Your installation is now hardened. Sandboxing active, tool policies set, permissions locked down, incident response plan ready. Module 11 covers the day-to-day: keeping everything running smoothly. -->
