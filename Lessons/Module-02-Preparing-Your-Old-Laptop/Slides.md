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

# Module 02
# Preparing Your Laptop

## 🦞 WSL2, Node.js, and Everything You Need

### OpenClaw Course

<!-- Speaker notes: This is the hands-on setup module. Students will follow along on their own laptops. Budget extra time -- installation issues are common and vary by machine. -->

---

<!-- _class: objectives -->

## 🧭 Navigation Chart

By the end of this module, you will be able to:

1. **Verify** your laptop meets the minimum requirements
2. **Explain** why WSL2 is required and what it does
3. **Install** and configure WSL2 with Ubuntu on Windows 10
4. **Enable** systemd inside WSL2 (required for the 🦞 OpenClaw daemon)
5. **Install** Node.js 22+ inside your WSL2 environment
6. **Verify** your entire environment is ready for 🦞 OpenClaw
7. **Configure** your laptop for 24/7 operation
8. **Optionally** set up Tailscale for secure remote access

<!-- Speaker notes: Steps 1-6 are required. Steps 7-8 are optional but recommended for anyone who wants your agent available around the clock. -->

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

> Without admin access, WSL2 installation and several steps in this module will be blocked.

<!-- Speaker notes: Anyone using a pre-owned corporate laptop MUST do a clean install. A factory reset is not enough — enterprise policies survive it. This is the #1 gotcha for used laptops. If someone can't get admin access, this is why. -->

---

## 🔑 Network Setup: Guest WiFi First

Your 🦞 OpenClaw laptop needs **permanent** internet. Connect it to a **guest network** to isolate it from personal devices.

### Set up a guest network
1. Find your router address: run `ipconfig` in PowerShell, note the **Default Gateway**
2. Open that address in a browser to reach router admin
3. Enable **Guest Network** with a password, disable "access local network"
4. Connect the 🦞 OpenClaw laptop to the **guest** network

**Already on main WiFi?** Switch to guest, then forget it: **Settings > Wi-Fi > Manage known networks**

> Module 10 covers network isolation in depth. This is the quick version.

<!-- Speaker notes: The default gateway IS the router address. It's NOT always 192.168.1.1 — varies by ISP and router brand. ipconfig is the reliable way to find it. A guest network gives internet but isolates the device from phones, personal laptops, and smart home devices. -->

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
| Windows 10 v2004+ | Simplified install (`wsl --install`) |
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

## Step 1: Open PowerShell as Administrator

1. Click the **Start menu**
2. Type `PowerShell`
3. **Right-click** on Windows PowerShell
4. Click **Run as administrator**
5. Click **Yes** when prompted

You should see:

```
PS C:\WINDOWS\system32>
```

The blinking cursor is waiting for your input.

<!-- Speaker notes: Make sure every student has an admin PowerShell open before proceeding. This is where many first-time issues arise. -->

---

## Step 1: Install WSL with Ubuntu

Type this command exactly and press Enter:

```powershell
wsl --install
```

**What this does:** Enables WSL2, downloads the Linux kernel, and installs Ubuntu.

> **You MUST restart your computer after this step.** Use Restart, not Shut Down.

<!-- Speaker notes: If `wsl --install` succeeds with no errors, restart and proceed to the next slide. If Ubuntu fails with 0x80072EE7, DON'T troubleshoot the network — go straight to the fallback slide. -->

---

## If Ubuntu Failed to Install (Error `0x80072EE7`)

The Microsoft Store is blocked or broken. **Skip the Store entirely** -- download Ubuntu directly.

1. Open your **browser** and go to: **cloud-images.ubuntu.com/wsl/noble/current/**
2. Download the **amd64** file ending in `.rootfs.tar.gz`
3. In admin PowerShell, run:

```powershell
mkdir C:\WSL\Ubuntu
wsl --import Ubuntu C:\WSL\Ubuntu [drag file here]
```

**Drag the downloaded file** from File Explorer onto the PowerShell window to fill in the path, then press Enter.

<!-- Speaker notes: This is the fallback for when `wsl --install` can't download Ubuntu. Common on pre-owned laptops with broken Microsoft Store or networks that block Store traffic. The browser download works on ANY network. The drag trick avoids typing the long filename. -->

---

## Step 1: Complete Ubuntu Setup

**If `wsl --install` worked:** Open **Ubuntu** from the Start menu after restarting.

**If you used the manual download:** Ubuntu won't appear in Start. Open **PowerShell** and type `wsl -d Ubuntu`. Then create your user:

```bash
adduser openclaw
usermod -aG sudo openclaw
echo -e "[user]\ndefault=openclaw" > /etc/wsl.conf
```

- **Password won't show** when you type it -- no dots, no stars, nothing. This is normal!
- Skip optional fields (Full Name, Room, etc.) by pressing Enter
- After setup: type `exit`, run `wsl --shutdown` in PowerShell, reopen Ubuntu

<!-- Speaker notes: The invisible password trips up everyone. Emphasize BEFORE they type. The manual import logs in as root by default -- the adduser + wsl.conf steps fix that. After wsl --shutdown and reopen, they should see openclaw@ not root@. -->

---

## Step 2: Enable systemd (Edit Config)

🦞 OpenClaw's daemon needs systemd. It is **not enabled by default** in WSL2.

### Edit the WSL config file and add these lines

```bash
sudo nano /etc/wsl.conf
```

```
[boot]
systemd=true
```

**Save and exit:** `Ctrl + O`, `Enter`, then `Ctrl + X`

---

## Step 2: Enable systemd (Restart and Verify)

### Restart WSL from PowerShell

```powershell
wsl --shutdown
```

Wait 5 seconds, then reopen Ubuntu and verify:

```bash
systemctl is-system-running
```

Expected: `running` (or `degraded` is OK)

---

## Step 3a: Install nvm

We use **nvm** (Node Version Manager) -- the recommended way.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

Then activate it:

```bash
source ~/.bashrc
nvm --version          # Should show: 0.40.1
```

> If you see `nvm: command not found` -- close and reopen your Ubuntu terminal, then try again.

---

## Step 3b: Install Node.js 22

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

## Steps 4 and 5: Update Packages and Install Tools

### Update Ubuntu packages (2-5 minutes)

```bash
sudo apt update && sudo apt upgrade -y
```

### Install essential tools

```bash
sudo apt install -y git curl wget build-essential
```

These provide version control, download utilities, and compilation tools needed by npm.

---

## Step 6a: Power Settings — Disable Sleep

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

## Step 6b: Hibernate, Display, and Plug In

### Disable hibernate (requires admin PowerShell)

```powershell
powercfg /hibernate off
```

> Start menu > type "PowerShell" > **right-click** > **Run as administrator**. A regular terminal will reject this command.

### Display can turn off — that's fine
- "Turn off screen after" → **5 minutes** (display off, computer still runs)

Keep the laptop **plugged in** — running 24/7 on battery is not practical.

<!-- Speaker notes: The powercfg command requires admin privileges. If students get "requires administrator privilege" they opened a regular PowerShell. -->

---

## Step 6c: Power Settings — Verify

### Test with the lid closed (not just screen lock)

1. Close your laptop lid
2. Wait one minute
3. Open the lid, log back in
4. Open your **Ubuntu terminal** (not PowerShell) and run:

```bash
uptime
```

You should see **continuous uptime** — not a fresh boot. If it restarted:
- Recheck **lid close** in Control Panel (Step 6a)
- Recheck **sleep** in Settings (Step 6a)

<!-- Speaker notes: The real test is closing the lid, not just locking the screen. If uptime resets, lid close is still set to Sleep. -->

---

## Step 7: Understand the File System Boundary

There are **two separate file systems**. Knowing which you are in matters.

| Location | Path Style | Example |
|----------|-----------|---------|
| **Windows** | `C:\Users\...` | `C:\Users\GC\Documents\` |
| **Linux (WSL2)** | `/home/username/...` | `/home/openclaw/` |

### The Golden Rule

> **🦞 OpenClaw's data should live in the Linux file system, NOT the Windows file system.**

Files in `/home/openclaw/` are fast. Files through `/mnt/c/` are **significantly slower** (every operation crosses the WSL2 boundary). Run `pwd` to check which side you're on.

---

## Step 8: Tailscale (Optional)

Tailscale lets you access 🦞 OpenClaw from your phone or another computer. **Skip if** you'll only use this laptop.

### Setup
1. Create account at **tailscale.com** (free plan works)
2. Install on **Windows** (download from website) and inside **WSL2**:

```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
```

From your phone via Tailscale: `http://100.x.x.x:18789/`. From everywhere else: **no access** (secure by default).

---

## Step 8.5: Disk Encryption (Recommended)

If your device stores API keys and personal data, encrypt the disk.

| Platform | How |
|----------|-----|
| **Windows Pro/Enterprise** | BitLocker |
| **Windows Home** | Device Encryption (requires Microsoft account) |
| **Linux (native, not WSL)** | LUKS -- enable during OS installation |
| **Mac** | FileVault |

> If that laptop walks off, encrypted data is unreadable without your password.

---

## Step 9: Dedicated User Account (Optional)

A security measure from Module 01's **Principle 2: Least Privilege**.

```bash
sudo adduser myagent
su - myagent
```

- Set a password, skip optional fields
- 🦞 OpenClaw installs under this account only
- If something goes wrong, damage is limited to this account
- Type `exit` to return to your regular account

**Skip this if** you want simplicity or plan to use Docker sandboxing (Module 10).

---

<!-- _class: warning -->

## 🚩 Shoals and Sandbars

| Problem | Cause | Fix |
|---------|-------|-----|
| Error `0x80370102` | Virtualization disabled in BIOS | Enable "Intel VT" or "AMD-V" in BIOS settings |
| Error `0x80004002` | Windows features not enabled | Run `dism.exe` commands to enable WSL and VM Platform |
| `node: command not found` | nvm not loaded | Run `source ~/.bashrc` or reopen terminal |
| Password not accepted | Using Windows password | Use the **Linux** password from Ubuntu setup |
| WSL2 uses too much RAM | Default is half your RAM | Create `.wslconfig` with `memory=4GB` |
| `powercfg` needs admin | Regular PowerShell | **Right-click** > Run as administrator |
| Laptop sleeps when lid closes | Lid close not configured | Control Panel > Power Options > lid → Do nothing |
| "Run as admin" unavailable | Corporate policy remnants | Clean install from USB (not a reset) |
| Error `0x80072EE7` on Ubuntu | MS Store blocked or broken | Use browser fallback: download from cloud-images.ubuntu.com |
| No Ubuntu in Start menu | Used manual import method | Open PowerShell, type `wsl -d Ubuntu` |
| Ubuntu terminal is slow | Windows Defender scanning | Exclude WSL2 directory from Defender |

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
- [ ] **WSL2:** Running, VERSION 2, Ubuntu username created
- [ ] **systemd:** Enabled and running
- [ ] **Node.js + npm:** v22.x.x and 10.x.x installed
- [ ] **Git:** Installed
- [ ] **Power settings:** Sleep disabled AND lid close set to "Do nothing" (if running 24/7)
- [ ] **File system:** Working in `/home/username/`, not `/mnt/c/`
- [ ] **Bonus:** Navigate to `\\wsl$\Ubuntu\home\openclaw\` in File Explorer

---

<!-- _class: takeaway -->

## 💎 Treasure Chest

1. **🦞 OpenClaw requires WSL2** -- it runs inside Linux, not directly on Windows
2. **systemd must be enabled** -- add `[boot] systemd=true` to `/etc/wsl.conf`
3. **Node.js 22+ is required** -- install with nvm for easy version management
4. **Keep 🦞 OpenClaw files in the Linux file system** -- `/home/username/`, not `/mnt/c/`
5. **Disable sleep AND configure lid close** -- both Settings and Control Panel must be changed
6. **Tailscale is optional** but useful for remote access
7. **A dedicated user account** adds security isolation
8. **Most errors** come from virtualization disabled in BIOS or nvm not sourced

---

<!-- _class: next -->

# 🌊 Next Port of Call

## Module 03: Installing 🦞 OpenClaw

> Your laptop is ready. Time to run the installer, walk through the onboarding wizard, and bring your agent to life.

<!-- Speaker notes: Environment is set. Module 03 is the big one -- actual installation. Make sure every student's verification checklist passes before they leave today. -->
