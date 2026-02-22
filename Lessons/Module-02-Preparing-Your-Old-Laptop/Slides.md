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
  pre code *,
  pre code span {
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

# Module 02
# Preparing Your Laptop

## 🦞 USB Setup Kit, WSL2, and Everything You Need

### OpenClaw Course

<!-- Speaker notes: This is the hands-on setup module. The USB-first approach means everyone follows the same steps — no branching, no "if this fails try that." Budget extra time for BIOS issues (virtualization) and power settings. -->

---

<!-- _class: objectives -->

## 🧭 Navigation Chart

By the end of this module, you will be able to:

1. **Verify** your laptop meets the minimum requirements
2. **Explain** why WSL2 is required and what it does
3. **Prepare** a USB Setup Kit with WSL installer + Ubuntu image
4. **Install** WSL2 and Ubuntu from USB — no Store, no network needed
5. **Enable** systemd inside WSL2 (required for the 🦞 OpenClaw daemon)
6. **Install** Node.js 22+ inside your WSL2 environment
7. **Verify** your entire environment is ready for 🦞 OpenClaw
8. **Configure** your laptop for 24/7 operation

<!-- Speaker notes: The USB Setup Kit is new — students prepare it on their main computer before touching the OpenClaw laptop. This eliminates the #1 source of installation failures (Microsoft Store). Everyone follows the same path. -->

---

<!-- _class: vocab -->

## 📜 Ship's Logbook (Part 1)

| Term | Definition |
|------|-----------|
| **WSL2** | Windows Subsystem for Linux v2 -- run a full Linux OS inside Windows |
| **Ubuntu** | A beginner-friendly Linux distribution we install inside WSL2 |
| **Terminal** | Text-based interface for typing commands |
| **systemd** | Linux service manager -- OpenClaw's daemon needs it to start automatically |
| **Daemon** | A program that runs continuously in the background |
| **Node.js** | JavaScript runtime that 🦞 OpenClaw is built on (version 22+ required) |

---

<!-- _class: vocab -->

## 📜 Ship's Logbook (Part 2)

| Term | Definition |
|------|-----------|
| **npm** | Node Package Manager -- installs JavaScript packages |
| **nvm** | Node Version Manager -- install and switch between Node.js versions |
| **USB Setup Kit** | A USB stick with the WSL installer and Ubuntu image, prepared on your main computer |
| **PATH** | List of directories your computer checks when you type a command |
| **Tailscale** | Secure networking tool for private remote access between your devices |
| **Loopback** | Network address (127.0.0.1) that only your own computer can reach |

---

<!-- _class: warning -->

## 🚩 Used or Pre-Owned Laptops

**"Reset this PC" does NOT remove corporate policies.** Admin restrictions, MDM enrollment, and monitoring software survive a factory reset.

### Check for corporate remnants
- **Start > System** — is a domain listed? (should say "WORKGROUP")
- **Settings > Accounts > Access work or school** — any organizations?
- Can you open PowerShell as admin? (`Ctrl + Shift + Enter`)

**If restricted → clean install from USB** (not a reset). Download the Media Creation Tool from microsoft.com, boot from USB, choose "Custom Install," and wipe all partitions.

> Without admin access, WSL2 installation will be blocked.

<!-- Speaker notes: Anyone using a pre-owned corporate laptop MUST do a clean install. A factory reset is not enough. This is the #1 gotcha for used laptops. -->

---

## Check Your Hardware: RAM

Open **Task Manager** (`Ctrl + Shift + Esc`) > **Performance** tab > **Memory**.

| RAM | Verdict |
|-----|---------|
| 4 GB or less | Not enough -- will struggle |
| 8 GB | Minimum -- works but slow when multitasking |
| **16 GB** | Excellent -- plenty for 🦞 OpenClaw |
| 32 GB+ | Overkill, but great for local models later |

**What uses the RAM:** WSL2 uses 1-4 GB, Node.js a few hundred MB. The rest is yours.

---

## Check Your Hardware: Disk Space

Open **File Explorer** > **This PC** > Check your C: drive.

| Free Space | Verdict |
|------------|---------|
| Less than 10 GB | Not enough |
| 10-20 GB | Tight but workable |
| 20-50 GB | Comfortable |
| **50 GB+** | Plenty of room |

**Total footprint:** WSL2 + Ubuntu (~5 GB) + Node.js (~200 MB) + 🦞 OpenClaw (~500 MB) + agent data over time (1-10 GB). About **20 GB** covers everything comfortably.

---

## Check Your Hardware: Windows Version

Press `Win + R`, type `winver`, press Enter.

| Version | WSL2 Support |
|---------|-------------|
| Windows 10 v1903+ (Build 18362) | Supported |
| Windows 10 v2004+ | Supported with simplified setup |
| **Windows 10 22H2** | Current -- fully supported |
| Windows 11 | Fully supported |

> **If your version is older than 1903:** Update Windows first. Go to **Settings > Update & Security > Windows Update** and install all available updates.

---

## Why WSL2 Is Required

**🦞 OpenClaw is built for Linux/macOS.** The ⛵ gateway, daemon, 🐚 shell commands, and file permissions all assume a Unix-like OS.

> *"OpenClaw on Windows is recommended via WSL2 (Ubuntu recommended)."* -- Official docs

### What WSL2 Actually Is
- Runs a **real Linux kernel** inside Windows
- Not an emulator, not a traditional VM
- Runs **alongside** Windows, not instead of it
- Access Windows files from Linux, and vice versa

**Apartment analogy:** Your laptop is a building with two tenants -- Windows and Linux. They share the hardware but have their own separate units.

---

## Why an Old Laptop?

Most tutorials say: rent a VPS or buy a Mac Mini. Here's why a **used Windows laptop** wins:

| Option | Cost | Privacy | Control |
|--------|------|---------|---------|
| **Old laptop** | $0-100 | Data stays home | You own everything |
| VPS | $5-20/mo forever | Provider's computer | Provider can access it |
| Mac Mini | $500-800 | Good, but pricey | Overkill for one agent |

**The old laptop wins on cost, privacy, AND control.** You pay once (or $0 if you already have one), your data never leaves your house, and nobody else can touch it.

---

## Avoid Plug-and-Play Services

Some companies sell pre-configured OpenClaw boxes or hosted setups. **Be very careful.**

> *"DO NOT use a service that sets up OpenClaw for you. I tried 5 popular services and pretty much all of them exposed the gateway, didn't have pairing mode, and allowed the root directory to be discovered by the internet."*

### What "exposed the gateway" means
- Anyone on the internet could connect to the agent
- No pairing mode = no verification that YOU are the owner
- Root directory exposed = your files visible to the world

**This course teaches you to set it up yourself — correctly and securely.**

---

## Step 1: Connect to Guest WiFi & Update Windows

Before installing anything, the laptop needs to be updated. But it should **never** connect to your main home WiFi.

### Set up a guest network (from your phone or main computer)
1. Find your router address: run `ipconfig`, note the **Default Gateway**
2. Open that address in a browser to reach router admin
3. Enable **Guest Network** with a password, disable "access local network"

### Connect the OpenClaw laptop to guest WiFi, then update
1. Connect to the **guest** network only
2. **Settings > Update & Security > Windows Update**
3. Click **"Check for updates"** — install everything, restart when prompted
4. **Expect 20-30 minutes** — check for updates again after each restart

<!-- Speaker notes: This step is essential for any laptop that's been wiped or factory-reset. Without cumulative updates, the WSL installer will refuse to run with error WSL_E_OS_NOT_SUPPORTED. The guest network gives internet access while keeping the laptop isolated from personal devices. -->

---

## Step 2: Prepare Your USB Setup Kit

This step happens on your **main computer** (not the OpenClaw laptop). You need a USB stick with at least 1 GB free.

### Download three files and copy all to your USB stick
1. **WSL installer** (.msi) — from **github.com/microsoft/WSL/releases**, download the **x64** `.msi` (~70 MB)
2. **Ubuntu image** — from **cloud-images.ubuntu.com/wsl/releases/24.04/current/**, download the **amd64** `.rootfs.tar.gz` (~340 MB)
3. **Setup commands** — `setup-commands.txt` from the course materials (every command you need, ready to copy and paste)

> If the Ubuntu link is empty, navigate from **cloud-images.ubuntu.com/wsl/** → releases → 24.04 → current

> **Why USB?** This bypasses the Microsoft Store completely. No Store = no download failures, no typing long commands. Works every time, on any laptop.

<!-- Speaker notes: This is the key change from previous versions of this module. Instead of running wsl --install and hoping the Store works, we pre-download everything. Two files on a USB stick. Done. Every student follows the same path. -->

---

## Step 3: Install WSL from USB

Plug the USB into the **OpenClaw laptop**. No WiFi needed.

1. **Copy all files** from USB to your **Downloads** folder
2. In Downloads, **double-click** the `.msi` file — click **Yes**. Installs silently — that's normal.
3. Open **PowerShell as Admin** (Start > type "PowerShell" > `Ctrl + Shift + Enter`)
4. Open `setup-commands.txt` from Downloads. Copy-paste **STEP 1**:

```powershell
& 'C:\Program Files\WSL\wsl.exe' --install --no-distribution
```

5. **Restart** your computer (Start > Power > Restart)

> The .msi installs the WSL program. The command enables the Windows features WSL2 needs. Both are required.

<!-- Speaker notes: TWO things happen here: (1) double-click .msi installs the WSL binary, (2) the command enables Virtual Machine Platform and WSL optional components. Without the command, import fails. Copy to Downloads first so commands work on any machine. -->

---

## Step 4: Import Ubuntu

After restarting, open **PowerShell as Administrator** (`Ctrl + Shift + Enter`).

Paste **STEP 2** and **STEP 3** from `setup-commands.txt`:

```powershell
mkdir C:\WSL\Ubuntu
& 'C:\Program Files\WSL\wsl.exe' --import Ubuntu C:\WSL\Ubuntu "$env:USERPROFILE\Downloads\ubuntu-noble-wsl-amd64-wsl.rootfs.tar.gz"
```

No output = success. Verify with **STEP 4**:

```powershell
& 'C:\Program Files\WSL\wsl.exe' -l -v
```

Expected: **Ubuntu, VERSION 2**

> `$env:USERPROFILE` expands to your user folder automatically. No drive letters to guess — that's why we copied to Downloads.

<!-- Speaker notes: Because students copied the tar.gz to Downloads in Step 3, the import command works on any machine with no editing. $env:USERPROFILE expands to C:\Users\TheirName. No USB drive letters to figure out. -->

---

## Step 5: Configure Ubuntu (Create User)

Open Ubuntu and create your account:

```powershell
& 'C:\Program Files\WSL\wsl.exe' -d Ubuntu
```

You'll see a `root@` prompt. **To paste in Ubuntu: right-click** (Ctrl+V does NOT work here — right-click pastes automatically). Run these one at a time:

```bash
adduser openclaw
usermod -aG sudo openclaw
echo -e "[boot]\nsystemd=true\n\n[user]\ndefault=openclaw" > /etc/wsl.conf
```

- **Password won't show** when you type it -- no dots, no stars, nothing. This is normal!
- Skip optional fields (Full Name, Room, etc.) by pressing Enter

Type `exit`, then in PowerShell: `& 'C:\Program Files\WSL\wsl.exe' --shutdown`. Wait 5 seconds, then `& 'C:\Program Files\WSL\wsl.exe' -d Ubuntu`. You should see **`openclaw@`** instead of `root@`.

<!-- Speaker notes: The invisible password trips up everyone. Emphasize BEFORE they type. The echo command does two things: enables systemd AND sets the default user. After shutdown and reopen, they should see openclaw@ not root@. -->

---

## Step 5: Configure Ubuntu (Start Menu + Verify)

### Verify Start Menu shortcut

Type **ubuntu** in the Start menu. If it appears and launches, you're set — skip ahead.

**If it doesn't appear**, create one manually:
1. `Win+R` → type `shell:programs` → Enter
2. Right-click > **New** > **Shortcut**
3. Location: `"C:\Program Files\WSL\wsl.exe" -d Ubuntu`
4. Name it **Ubuntu**, click Finish

### Verify systemd

Open Ubuntu from the Start Menu and run:

```bash
systemctl is-system-running
```

Expected: `running` (or `degraded` is OK)

> You can safely remove the USB stick now. The remaining steps use guest WiFi.

<!-- Speaker notes: The Start Menu shortcut is important — without it, students would have to open PowerShell every time. After this point, the USB is done. Everything else uses standard internet. -->

---

## Step 7: Update Ubuntu and Install Tools

In your Ubuntu terminal:

### Update packages (5-10 minutes on first run)

```bash
sudo apt update && sudo apt upgrade -y
```

### Install essential tools

```bash
sudo apt install -y git curl wget build-essential
```

These provide version control, download utilities, and compilation tools needed by npm.

---

## Step 8a: Install nvm

We use **nvm** (Node Version Manager) -- the recommended way.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

Then activate it:

```bash
source ~/.bashrc
nvm --version          # Should show: 0.40.1
```

> If you see `nvm: command not found` -- close the Ubuntu window, then reopen it: **Start Menu** (type "Ubuntu") or **PowerShell**: `& 'C:\Program Files\WSL\wsl.exe' -d Ubuntu`

---

## Step 8b: Install Node.js 22

> If paste isn't working, close the Ubuntu window, then reopen it: **Start Menu** (type "Ubuntu") or **PowerShell**: `& 'C:\Program Files\WSL\wsl.exe' -d Ubuntu`

```bash
nvm install 22
nvm alias default 22
```

### Verify both

```bash
node --version         # Should show: v22.x.x
npm --version          # Should show: 10.x.x
```

As long as `node` starts with **v22**, you're fueled up.

---

## Step 9a: Power Settings — Disable Sleep

For **24/7 operation**, your laptop must stay awake. **Two settings** must BOTH be changed.

### Idle sleep timeout
- **Settings** > **System** > **Power & sleep** → set sleep to **Never**

### Lid close behavior (most guides miss this!)
1. **Control Panel** > **Hardware and Sound** > **Power Options**
2. Click **Choose what closing the lid does**
3. Set "When I close the lid" → **Do nothing** (both columns)
4. Click **Save changes**

> Without BOTH settings, your laptop sleeps when the lid closes — regardless of idle timeout.

<!-- Speaker notes: The Settings app only controls idle timeout. Lid close is a separate setting in the old Control Panel. Miss this and the laptop still sleeps when closed. This is the #1 gotcha for 24/7 laptop setups. -->

---

## Step 9b: Hibernate, Display, and Plug In

### Disable hibernate (requires admin PowerShell)

```powershell
powercfg /hibernate off
```

> Start menu > type "PowerShell" > press `Ctrl + Shift + Enter` for admin. A regular terminal will reject this command.

### Display can turn off — that's fine
- "Turn off screen after" → **5 minutes** (display off, computer still runs)

Keep the laptop **plugged in** — running 24/7 on battery is not practical.

<!-- Speaker notes: The powercfg command requires admin privileges. If students get "requires administrator privilege" they opened a regular PowerShell. -->

---

## Step 9c: Power Settings — Verify

### Test with the lid closed (not just screen lock)

1. Close your laptop lid
2. Wait one minute
3. Open the lid, log back in
4. Open your **Ubuntu terminal** (not PowerShell) and run:

```bash
uptime
```

You should see **continuous uptime** — not a fresh boot. If it restarted:
- Recheck **lid close** in Control Panel (Step 9a)
- Recheck **sleep** in Settings (Step 9a)

<!-- Speaker notes: The real test is closing the lid, not just locking the screen. If uptime resets, lid close is still set to Sleep. -->

---

## Step 10: Understand the File System Boundary

There are **two separate file systems**. Knowing which you are in matters.

| Location | Path Style | Example |
|----------|-----------|---------|
| **Windows** | `C:\Users\...` | `C:\Users\GC\Documents\` |
| **Linux (WSL2)** | `/home/username/...` | `/home/openclaw/` |

### The Golden Rule

> **🦞 OpenClaw's data should live in the Linux file system, NOT the Windows file system.**

Files in `/home/openclaw/` are fast. Files through `/mnt/c/` are **significantly slower** (every operation crosses the WSL2 boundary). Run `pwd` to check which side you're on.

---

## Optional: Tailscale (Remote Access)

Tailscale lets you access 🦞 OpenClaw from your phone or another computer. **Skip if** you'll only use this laptop locally.

```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```

This gives you a URL to open in your browser to authorize the device. Once connected:

- **From this laptop:** `http://127.0.0.1:18789/`
- **From your phone (on Tailscale):** `http://100.x.x.x:18789/`
- **From everywhere else:** no access (secure by default)

<!-- Speaker notes: Tailscale is optional. It's useful for checking on the agent from your phone or another computer. Skip it for now if students just want to get OpenClaw running. They can always add it later. -->

---

## Optional: Disk Encryption

If your laptop stores API keys, conversation history, and agent memory — encrypt the disk.

| Platform | How |
|----------|-----|
| **Windows Pro/Enterprise** | BitLocker (Settings > Update & Security) |
| **Windows Home** | Device Encryption (requires Microsoft account) |

> If that laptop walks off, encrypted data is unreadable without your password.

---

<!-- _class: warning -->

## 🚩 Shoals and Sandbars (1/2)

| Problem | Cause | Fix |
|---------|-------|-----|
| "Warning 1964" during .msi install | Cosmetic shortcut property | Ignore — WSL installed fine |
| Error `0x80370102` | Virtualization disabled in BIOS | Enable "Intel VT" or "AMD-V" in BIOS settings |
| "WSL optional component not enabled" | Windows features not activated | Run `--install --no-distribution` from Step 3 and restart |
| USB stick not detected | Bad port or drive letter | Try another USB port; check File Explorer for drive letter |
| `wsl --import` error | Wrong file path | Paste command from `setup-commands.txt` (path is pre-filled) |

---

## 🚩 Shoals and Sandbars (2/2)

| Problem | Cause | Fix |
|---------|-------|-----|
| Paste stops working | Terminal gets stuck | Close the Ubuntu window, reopen from Start Menu |
| `node: command not found` | nvm not loaded | Run `source ~/.bashrc` or reopen from Start Menu |
| Password not accepted | Using Windows password | Use the **Linux** password from Ubuntu setup |
| Laptop sleeps when lid closes | Lid close not configured | Control Panel > Power Options > lid → Do nothing |
| "Run as admin" unavailable | Corporate policy remnants | Clean install from USB (not a reset) |

---

## The Verification Checklist

Run each command in your 🐚 Ubuntu terminal:

| Check | Command | Expected |
|-------|---------|----------|
| WSL2 version | `wsl.exe -l -v` | Ubuntu, VERSION **2** |
| systemd | `systemctl is-system-running` | `running` or `degraded` |
| Node.js | `node --version` | `v22.x.x` |
| npm | `npm --version` | `10.x.x` |
| Git | `git --version` | `git version 2.x.x` |
| curl | `curl --version` | Any version output |
| File system | `pwd` | `/home/openclaw` (not `/mnt/c/`) |

**All seven must pass before moving to Module 03.**

---

<!-- _class: activity -->

## ⚙️ Hands on Deck

Complete this checklist:

- [ ] **Hardware:** 8+ GB RAM, 20+ GB free disk, Windows 1903+
- [ ] **USB Setup Kit:** Prepared with WSL .msi + Ubuntu .tar.gz
- [ ] **WSL2:** Installed from USB, VERSION 2, username created
- [ ] **systemd:** Enabled and running
- [ ] **Node.js + npm:** v22.x.x and 10.x.x installed
- [ ] **Git:** Installed
- [ ] **Power settings:** Sleep disabled AND lid close set to "Do nothing"
- [ ] **Network:** Connected to guest WiFi only
- [ ] **Bonus:** Navigate to `\\wsl$\Ubuntu\home\openclaw\` in File Explorer

---

<!-- _class: takeaway -->

## 💎 Treasure Chest

1. **Prepare a USB Setup Kit** -- WSL .msi + Ubuntu image + setup-commands.txt on your main computer
2. **Copy to Downloads, then install** -- no drive letters to guess, commands are ready to paste
3. **🦞 OpenClaw requires WSL2** -- it runs inside Linux, not directly on Windows
4. **systemd is enabled** during Ubuntu configuration -- one command handles it
5. **Node.js 22+ is required** -- install with nvm for easy version management
6. **Keep 🦞 OpenClaw files in the Linux file system** -- `/home/username/`, not `/mnt/c/`
7. **Disable sleep AND configure lid close** -- both Settings and Control Panel must be changed
8. **Guest WiFi only** -- the OpenClaw laptop never connects to your main home network

---

<!-- _class: next -->

# 🌊 Next Port of Call

## Module 03: Installing 🦞 OpenClaw

> Your laptop is ready — installed from USB, configured, and verified. Time to run the installer, walk through the onboarding wizard, and bring your agent to life.

<!-- Speaker notes: Environment is set. Module 03 is the big one -- actual installation. Make sure every student's verification checklist passes before they leave today. -->
