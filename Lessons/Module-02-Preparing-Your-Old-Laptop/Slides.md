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

## 🦞 Ubuntu, Bootable USB, and Everything You Need

### OpenClaw Course

<!-- Speaker notes: This is the hands-on setup module. We install Ubuntu on the old laptop — replacing Windows entirely. The "Try Ubuntu" step before installing catches WiFi issues early. Budget extra time for BIOS boot menu access and the Ubuntu installer. -->

---

<!-- _class: objectives -->

## 🧭 Navigation Chart

By the end of this module, you will be able to:

1. **Verify** your laptop meets the minimum requirements
2. **Explain** why a dedicated Ubuntu laptop is the ideal setup
3. **Create** a bootable Ubuntu USB drive using Rufus
4. **Test** WiFi compatibility before installing
5. **Install** Ubuntu 24.04 LTS (replacing Windows)
6. **Install** Node.js 22+ using nvm
7. **Configure** your laptop for 24/7 operation
8. **Verify** your entire environment is ready for 🦞 OpenClaw

<!-- Speaker notes: No WSL, no compatibility layers, no workarounds. We install Ubuntu directly — simpler, more reliable, and everything just works. -->

---

<!-- _class: vocab -->

## 📖 Ship's Logbook *(Part 1)*

| Term | Definition |
|------|-----------|
| **Ubuntu** | A beginner-friendly Linux OS — we install version 24.04 LTS on your laptop |
| **ISO** | A disk image file containing an entire OS installer — one file, one USB, done |
| **Rufus** | A free Windows tool that turns a USB stick into a bootable installer |
| **BIOS/UEFI** | Firmware that runs before your OS — access it during startup to change boot order |
| **Boot from USB** | Starting your computer from a USB stick instead of the hard drive |
| **LTS** | Long-Term Support — 5 years of security updates (24.04 is supported until 2029) |

<!-- Speaker notes: These are the new terms for today. We had some of these words in our first module but now we're using them for real. -->

---

<!-- _class: vocab -->

## 📖 Ship's Logbook *(Part 2)*

| Term | Definition |
|------|-----------|
| **Terminal** | Text-based command interface — open with `Ctrl+Alt+T` on Ubuntu |
| **systemd** | Linux service manager — works out of the box on Ubuntu (no setup needed) |
| **Daemon** | A program that runs continuously in the background |
| **Node.js** | JavaScript runtime that OpenClaw is built on — need version 22+ |
| **nvm** | Node Version Manager — installs and manages Node.js versions |
| **PATH** | List of directories your computer checks when you type a command |

<!-- Speaker notes: The big difference from last session's approach — systemd just works on native Ubuntu. No configuration file to write, no restart dance. It's already running. -->

---

<!-- _class: warning -->

## ⚠️ Used or Pre-Owned Laptops

If your laptop came from a **workplace**, check this first:

- **BIOS password** is the only real blocker — if it's locked, you can't boot from USB
- Try: empty password, `admin`, `password`, `1234`, or look up the service tag on **bios-pw.org**
- **MDM / Group Policy / corporate software** — irrelevant, all wiped when Ubuntu is installed

| Check | How | Concern |
|-------|-----|---------|
| BIOS password | Restart, press BIOS key | **Blocker** if locked |
| Secure Boot | BIOS settings | Low — can be disabled |
| Corporate software | N/A | **Wiped** with Windows |

<!-- Speaker notes: Since we're erasing Windows entirely, corporate policies don't survive. The BIOS password is the one thing that can stop us because we need to change boot order. -->

---

## 🔍 Check Your Hardware: RAM

In Windows (before we erase it), check your RAM:

1. Press `Ctrl + Shift + Esc` to open **Task Manager**
2. Click **Performance** tab > **Memory**
3. Read the number in the top-right corner

| RAM | Verdict |
|-----|---------|
| 4 GB or less | Not enough — OpenClaw will struggle |
| 8 GB | Minimum — works but may be slow |
| 16 GB | Excellent — plenty for everything |
| 32 GB+ | Overkill, but great for local models later |

<!-- Speaker notes: Do these checks while still in Windows. After we install Ubuntu, Windows is gone. We need to know the hardware is good before we commit. -->

---

## 🔍 Check Your Hardware: Disk Space

1. Open **File Explorer** (`Windows + E`) > **This PC**
2. Look at your main drive (usually `C:`)

| Free Space | Verdict |
|------------|---------|
| Less than 10 GB | Not enough |
| 10–20 GB | Tight — will work |
| 20–50 GB | Good |
| 50 GB+ | Excellent |

**After Ubuntu install, space usage:**
- Ubuntu itself: ~10–15 GB
- Node.js + OpenClaw: ~700 MB
- OpenClaw data: grows over time (1–10 GB)

<!-- Speaker notes: Remember, we're erasing the whole drive. So even if you only have 30 GB free on Windows, you'll get the FULL drive for Ubuntu. We're just checking it's a reasonable size. -->

---

## 🐙 Why an Old Laptop?

| Option | Cost | Privacy | Control |
|--------|------|---------|---------|
| **Old laptop** | $0–100 | Data stays home | You own everything |
| VPS (cloud) | $5–20/month | Provider's machine | Provider can access |
| Mac Mini | $500–800 | Good, pricey | Overkill for one agent |

**The old laptop wins on cost, privacy, AND control.**

> 🐠 *Raspberry Pi 5 (4 GB+, ~$155 kit) is also viable — runs Linux natively, sips power. But the laptop is simpler for beginners.*

<!-- Speaker notes: You already have the old laptop. It costs you nothing. Your data never leaves your house. Nobody else can touch it. That's the trifecta. -->

---

<!-- _class: warning -->

## ⚠️ Avoid Plug-and-Play + Getting Windows Back

> *"DO NOT use a service that sets up OpenClaw for you. I tried 5 popular services and pretty much all of them exposed the gateway, didn't have pairing mode, and allowed the root directory to be discovered by the internet."*

**We set it up ourselves — correctly and securely.**

### Getting Windows Back (If You Ever Want It)

- Your Windows license is **tied to the motherboard** — it auto-activates on reinstall
- Download the ISO from microsoft.com as insurance before wiping
- Difficulty: **~4/10** — same process as installing Ubuntu, in reverse

<!-- Speaker notes: This is not a one-way door. You can always go back to Windows. But for OpenClaw, Ubuntu is objectively simpler — systemd works out of the box, no PATH issues, no paste bugs, no compatibility layers. -->

---

## 📋 What You Will Need

| Item | Details |
|------|---------|
| **USB stick** | 12 GB or larger (Ubuntu ISO is ~5.9 GB) |
| **Another computer** | To download Ubuntu + create the USB |
| **WiFi password** | For the network this laptop will use |
| **Time** | 60–90 minutes for the full process |

You'll also need an **Anthropic API key** for Module 03 — not yet.

> 🔑 *If you haven't created one: go to **console.anthropic.com**, sign up, create an API key.*

<!-- Speaker notes: Gather everything before you start. The USB stick is the big one — make sure it's at least 12 gigs. The Ubuntu ISO alone is almost 6 gigs. -->

---

## ⬇️ Step 1: Download Ubuntu and Rufus

*On your main computer (not the laptop you're converting):*

### Ubuntu
1. Go to **ubuntu.com/download/desktop**
2. Download **Ubuntu 24.04.x LTS** (~5.9 GB)

### Rufus
1. Go to **rufus.ie**
2. Download **Rufus Portable** (~1.9 MB)

> 🐚 *Why 24.04 LTS? Long-Term Support = 5 years of security updates (until 2029). Stable, reliable, perfect for a 24/7 server.*

<!-- Speaker notes: Both downloads happen on your main computer — not the old laptop. Rufus is tiny, it downloads in seconds. Ubuntu is almost 6 gigs so it takes a few minutes. -->

---

## 💾 Step 2: Create Bootable USB with Rufus

1. Plug USB into your **main computer** *(everything on it will be erased!)*
2. Run Rufus (double-click — no install needed)
3. Configure:

| Setting | Choose |
|---------|--------|
| **Device** | Your USB stick (check the size!) |
| **Boot selection** | Click SELECT → pick the Ubuntu `.iso` |
| **Partition scheme** | GPT *(default)* |
| **Everything else** | Leave as default |

4. Click **START** → accept warnings → wait 5–15 minutes
5. When it says **READY**, click Close — your USB is bootable

<!-- Speaker notes: The most important thing — make absolutely sure you select the USB stick, not your hard drive. Check the size. If it says 500 GB, that's your hard drive, not your USB. -->

---

## ⌨️ Step 3: Boot from USB

*Now move to the old laptop.*

1. Plug in the bootable USB
2. Restart (or power on) the laptop
3. Press the **boot menu key** repeatedly during startup:

| Manufacturer | Key |
|-------------|-----|
| Dell | F12 |
| HP | F9 or Esc |
| Lenovo | F12 |
| Acer | F12 |
| ASUS | Esc or F8 |
| Toshiba | F12 |
| Samsung | F2 |
| MSI | F11 |

4. Select the **USB drive** from the boot menu

<!-- Speaker notes: Timing is everything. Start pressing the key the moment you see the manufacturer's logo. Miss it? Just restart and try again. If the boot menu key doesn't work, try F2 or Delete to enter BIOS and change the boot order there. -->

---

## 🔭 Step 4: Try Ubuntu — Test WiFi First

After booting from USB, you'll see a welcome screen.

### Choose "Try Ubuntu" *(not Install — not yet!)*

This loads Ubuntu from the USB without changing anything on the hard drive.

### Test WiFi immediately:
1. Click the **system menu** (top-right corner)
2. Click **Wi-Fi** → your networks should appear
3. Connect to any network

| Chipset | Ubuntu Support |
|---------|---------------|
| Intel | Excellent — almost always works |
| Qualcomm/Atheros | Good — usually works |
| Realtek | Hit or miss |
| Broadcom | Worst — often needs drivers |

### If WiFi doesn't work — three backup plans:
- **USB WiFi adapter** (~$15, Linux-compatible)
- **Phone USB tethering** — plug phone in, enable tethering
- **Ethernet cable** — plug directly into router

<!-- Speaker notes: This is the whole reason we do "Try Ubuntu" first. If WiFi doesn't work here, it won't work after installing either. Test it NOW before you erase anything. Most Intel chips work perfectly. Broadcom is the troublemaker. -->

---

## 🖥️ Step 5: Install Ubuntu *(Key Screens)*

From the "Try Ubuntu" desktop, double-click **"Install Ubuntu"**.

The installer walks you through several screens:

- **Language + Keyboard** — choose yours, click Continue
- **Installation type** — choose **Interactive installation**
- **Software selection** — choose **Default selection**

### 🔑 Critical checkbox:
> **"Install third-party software for graphics and Wi-Fi hardware"** — **CHECK THIS BOX.** This is the #1 cause of WiFi not working after installation.

- **Installation type (disk)** — choose **"Erase disk and install Ubuntu"**

> ⚠️ *This permanently deletes all Windows files, programs, and data. Make sure you've backed up anything you need.*

<!-- Speaker notes: That third-party drivers checkbox is the single most important click in this entire installation. Without it, half the WiFi chips in the world won't work. Check that box. -->

---

## 🖥️ Step 5: Install Ubuntu *(Continued)*

### Create your account:
- Your name: whatever you like
- Computer name: e.g., `openclaw-laptop`
- Username: **`openclaw`** *(keeps things consistent with the course)*
- Password: choose something memorable — you'll type it often for `sudo`

> 🔑 *Remember this password! There's no "forgot password" link.*

### Finish:
- Select your **timezone**
- Click **Install** → wait **15–40 minutes**
- When done: click **Restart Now**, remove the USB when prompted

**Your laptop is now running Ubuntu.**

<!-- Speaker notes: Username openclaw keeps things consistent with the commands in setup-commands.txt. But you can use any name you want — just remember to adjust paths in your head when following along. -->

---

## 📡 Step 6: Connect to Guest WiFi

### Why a guest network?

Home WiFi is "flat" — all devices see each other. If the OpenClaw laptop is compromised, an attacker could reach your phone, personal laptop, etc.

A **guest network** provides internet but **isolates** this laptop from your personal devices.

### Set up a guest network *(from your phone or main computer):*
1. Open your router's admin page (Default Gateway address in browser)
2. Find **Guest Network** settings → enable it, set a password
3. Ensure **"Allow guests to access local network"** is **OFF**

### Connect the laptop:
- Top-right system menu → **Wi-Fi** → connect to the **guest** network

<!-- Speaker notes: If your router doesn't support guest networks, you can still proceed on your main network and revisit network isolation in Module 10. It's not a blocker. -->

---

## 📦 Step 7: Update Ubuntu and Install Tools

Open a terminal: click **Terminal** in the dock or press `Ctrl+Alt+T`

```bash
sudo apt update && sudo apt upgrade -y
```

*First run takes 5–10 minutes. Password won't show when you type — that's normal.*

Then install essential tools:

```bash
sudo apt install -y git curl wget build-essential
```

| Tool | Purpose |
|------|---------|
| `git` | Version control and backups |
| `curl` / `wget` | Download files (used by installers) |
| `build-essential` | Compilation tools for npm packages |

<!-- Speaker notes: To paste in the terminal, use Ctrl+Shift+V — regular Ctrl+V doesn't work. You can also right-click and choose Paste. -->

---

## 🟢 Step 8: Install Node.js 22

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash
```

Close the terminal, reopen it (`Ctrl+Alt+T`), then:

```bash
nvm install 22
nvm alias default 22
```

### Verify:

```bash
node --version    # Should show: v22.x.x
npm --version     # Should show: 10.x.x or 11.x.x
```

> 🐠 *nvm lets you switch Node.js versions easily — useful if OpenClaw ever needs a different version.*

<!-- Speaker notes: Close and reopen the terminal after installing nvm — this loads it into your session. If you skip this step, you'll get "nvm: command not found." -->

---

## 🔋 Step 9: Power Settings for 24/7 Operation

### GUI: Disable auto-suspend
1. Open **Settings** > **Power**
2. Set **Automatic Suspend** → **OFF** (both battery and plugged in)
3. Set **Screen Blank** → **Never**

### Terminal: Lid close behavior

```bash
sudo sed -i 's/#HandleLidSwitch=suspend/HandleLidSwitch=ignore/' /etc/systemd/logind.conf
sudo sed -i 's/#HandleLidSwitchExternalPower=suspend/HandleLidSwitchExternalPower=ignore/' /etc/systemd/logind.conf
sudo systemctl restart systemd-logind
```

> ⚠️ *The restart command logs you out. Save work first! Log back in after.*

**Test:** Close lid, wait 30 seconds, open lid. If it didn't sleep — you're good.

<!-- Speaker notes: Two separate settings that both need changing. The GUI handles idle timeout. The config file handles what happens when you close the lid. Miss either one and the laptop goes to sleep. -->

---

<!-- _class: warning -->

## 🪸 Shoals and Sandbars

| Problem | Fix |
|---------|-----|
| Laptop won't boot from USB | Check BIOS key (table in Step 3). Try disabling Secure Boot |
| WiFi not working | Did you check "third-party drivers" during install? Try `sudo ubuntu-drivers autoinstall`. Use USB adapter, phone tethering, or Ethernet as backup |
| BIOS password locked | Try defaults, bios-pw.org, or use a different laptop |
| `node: command not found` | Close terminal and reopen. Or: `source ~/.bashrc` |
| Laptop sleeps despite settings | Check both Settings > Power AND logind.conf (Step 9) |
| Password not accepted for `sudo` | Nothing shows when you type — that's normal. Type carefully |

<!-- Speaker notes: These are the most common issues students hit. The top three are all about getting the USB to boot and WiFi to work. Once you're past those, the rest is smooth sailing. -->

---

## ✅ Verification Checklist

Run these in the terminal to confirm everything is ready:

```bash
systemctl is-system-running     # Should say: running
node --version                  # Should say: v22.x.x
npm --version                   # Should say: 10.x.x or 11.x.x
git --version                   # Should say: git version 2.x.x
curl --version | head -1        # Should show curl version
pwd                             # Should say: /home/openclaw
```

**If all six pass — your environment is ready for Module 03.**

> 🐙 *On native Ubuntu, systemd works out of the box. No config file to write, no restart dance. It's already running.*

<!-- Speaker notes: Six checks. That's it. Compare this to the old WSL approach — we had seven checks plus a WSL version check plus a file system boundary check. Native Ubuntu is just simpler. -->

---

<!-- _class: activity -->

## 🦀 Hands on Deck

Complete this checklist before moving to Module 03:

- [ ] RAM confirmed ≥ 8 GB
- [ ] Ubuntu 24.04 LTS installed and booting
- [ ] WiFi connected (guest network if possible)
- [ ] `systemctl is-system-running` → running
- [ ] `node --version` → v22.x.x
- [ ] `npm --version` → 10.x.x+
- [ ] `git --version` → version number
- [ ] Power: auto-suspend OFF, lid close = ignore
- [ ] `pwd` → `/home/openclaw`
- [ ] Optional: Tailscale installed

> 🐚 *Write down your RAM, disk size, and Ubuntu version for your records.*

<!-- Speaker notes: If every box is checked, you're done. Your laptop is a dedicated Ubuntu machine ready for OpenClaw. If something failed, check the troubleshooting section before moving on. -->

---

<!-- _class: takeaway -->

## 🐙 Treasure Chest

1. **An old laptop is the best OpenClaw host** — $0 cost, full privacy, full control
2. **Ubuntu replaces Windows** — native Linux is simpler than running Linux inside Windows
3. **You can always get Windows back** — license is tied to the motherboard
4. **Test WiFi before installing** — "Try Ubuntu" catches problems early
5. **Third-party drivers checkbox is critical** — determines if WiFi works after install
6. **systemd works out of the box** — no configuration needed on native Ubuntu
7. **Node.js 22+ via nvm** — easy version management
8. **Disable auto-suspend AND lid close** — both settings, or the laptop sleeps

<!-- Speaker notes: Eight takeaways. The big theme is simplicity. Native Ubuntu is dramatically simpler than the alternative. systemd just works. No PATH issues, no paste bugs, no compatibility layers. Just a clean Linux system ready for OpenClaw. -->

---

<!-- _class: next -->

# ⛵ Next Port of Call

## Module 03: Installing OpenClaw

> *Your laptop is ready. Ubuntu is running. Node.js is installed. Time to bring your agent to life.*

<!-- Speaker notes: Module 03 is where it gets real. We run the OpenClaw installer, walk through the onboarding wizard, configure the API key, and get the gateway running. By the end of Module 03, you'll be chatting with your agent. -->
