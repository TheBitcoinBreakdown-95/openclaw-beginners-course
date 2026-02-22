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

# Module 09
## 🦞 Advanced Concepts
### Cost Optimization, Model Routing, and Power-User Techniques

<!-- Speaker notes: This module is where we go from "it works" to "it works efficiently." We'll cover the brains-and-muscles model, intelligent routing, prompt caching, reverse prompting, and multi-agent setups. The biggest impact here is on your wallet. -->

---

<!-- _class: objectives -->

## 🧭 Navigation Chart

By the end of this module, you will be able to:

1. **Understand** why 🦞 OpenClaw burns money by default and how to fix it
2. **Implement** the "Brains and Muscles" model for cost optimization
3. **Set up** intelligent model routing (manual, ClawRouter, or OpenRouter)
4. **Enable** prompt caching for up to 90% savings on system prompts
5. **Switch** between AI models for different tasks
6. **Understand** 🐙 multi-agent setups
7. **Use** reverse prompting to let the AI guide your decisions

---

<!-- _class: vocab -->

## 📜 Ship's Logbook (Part 1)

| Term | Definition |
|------|-----------|
| **Brains and Muscles** | Use an expensive model (the "brain") for thinking, and cheaper models (the "muscles") for execution |
| **Model switching** | Changing which AI model handles a conversation mid-stream |
| **ClawRouter** | 🦞 OpenClaw-native routing tool that classifies request complexity and routes to the cheapest capable model |
| **Prompt caching** | Provider feature that remembers static parts of your prompt between calls so you pay less |

---

<!-- _class: vocab -->

## 📜 Ship's Logbook (Part 2)

| Term | Definition |
|------|-----------|
| **Context accumulation** | Session history growing with every message -- a mature session can reach 200K+ tokens |
| **🐙 Multi-agent** | Running more than one 🦞 OpenClaw agent for different life domains |
| **Reverse prompting** | Instead of telling the AI what to do, you ask the AI what YOU should do |
| **Open Router** | A service providing access to 300+ AI models through a single API |
| **Agentic company** | Structuring your AI agents like employees with different roles |

---

## The Problem: Why 🦞 OpenClaw Burns Money

Running 🦞 OpenClaw with a single frontier model for all tasks is the **#1 cost mistake**.

| Cost Mechanism | What Happens |
|---------------|-------------|
| **Context accumulation** | Session history grows to 200K+ tokens; every follow-up carries enormous overhead |
| **System prompt re-injection** | 3,000-14,000 tokens re-sent with every API call |
| **Tool output storage** | File listings, browser snapshots bloat context over time |
| **Heartbeat overhead** | 48 full-context calls/day on Opus = $70-200/month |
| **Cron job overhead** | Each trigger creates a fresh conversation with full context |

> **90% of what your agent does is routine work that doesn't need a $5/MTok model.**

<!-- Speaker notes: Write this on the board: five cost mechanisms. Each one compounds the others. The good news is we can fix all of them. -->

---

## The Brains and Muscles Model

Split your workload between expensive and cheap models:

### The Brain (Opus 4.6)
- Complex decisions and strategy
- Creative writing
- Prompt injection defense
- Orchestrating other models

### The Muscles (Cheaper Models)
- **Haiku 4.5** -- quick lookups, heartbeats ($1-5/MTok)
- **Sonnet 4.5** -- code generation, summarization ($5-15/MTok)
- **Codex** -- development tasks (varies)

> The brain handles the **hard stuff**. The muscles handle the **grunt work**.

<!-- Speaker notes: Think of it like a CEO and their team. The CEO makes the big decisions. They don't answer every email personally. That's what the team is for. -->

---

## The Opus Orchestra Pattern

A named strategy used by experienced 🦞 OpenClaw operators:

| Role | Model | Cost |
|------|-------|------|
| **Orchestration/decisions** | Opus 4.6 | Premium |
| **Sub-agent execution** | Sonnet 4.5 | Mid-tier |
| **Heartbeats/routine** | Haiku 4.5 or Gemini Flash | Minimal |

### Real Cost Benchmarks (Community Data)
- **Without optimization:** $100-400/month
- **Well-configured:** $10-50/month
- **Extreme optimization:** <$10/month
- **One user's $800 mistake** -- 8 agents, no limits, pay-per-use

---

## Practical Model Assignments

| Task | Recommended Model | Why |
|------|------------------|-----|
| Important conversations | Opus 4.6 | Best reasoning, most nuanced |
| Code generation | Sonnet 4.5 or Codex | Optimized for code, cheaper |
| Heartbeats | Haiku 4.5 | Routine checks, very cheap |
| Web search | Perplexity Pro | Built for search |
| Document summarization | Sonnet 4.5 | Good enough, much cheaper |
| Quick factual lookups | Haiku 4.5 | Fast and cheap |

<!-- Speaker notes: This is the cheat sheet. Match the task to the model. The goal is to use the cheapest model that can handle the job well. The second half of this table covers creative, security, and budget options. -->

---

## Practical Model Assignments (continued)

| Task | Recommended Model | Why |
|------|------------------|-----|
| Creative writing | Opus 4.6 | Best quality |
| Security-sensitive tasks | Opus 4.6 | Best prompt injection resistance |
| Budget tasks | Kimi K2.5 (free via NVIDIA) | Comparable to Opus, zero cost |
| Ultra-cheap tasks | MiniMax M2.5 (~$10-50/mo) | Surprisingly capable; Max plan gives 1,000 prompts per 5 hours |
| Free tier exploration | Google Cloud ($300 free credits) | Gemini models with sign-up credits (rate limits apply) |

---

## Model Switching in the TUI

Switch models during a conversation without starting a new session:

```
/model claude-opus-4-6       # Expensive, best quality
/model claude-sonnet-4-5      # Good balance
/model claude-haiku-4-5       # Fast and cheap
```

### When to switch:
- **Opus:** Important decisions, untrusted input, nuanced conversations
- **Sonnet:** Code generation, summarization, drafts
- **Haiku:** Quick facts, formatting, template generation, testing

---

## Intelligent Routing: ClawRouter

ClawRouter is the hottest tool in the 🦞 OpenClaw ecosystem -- 2,400 GitHub stars in its first 11 days.

### How it works:
Analyzes each query using a lightweight classifier, then routes to the cheapest capable model.

| Tier | Complexity | Routed To | Cost |
|------|-----------|-----------|------|
| **Simple** | Basic lookups, acknowledgments | DeepSeek, Gemini Flash | ~$0.27-0.60/MTok |
| **Medium** | Moderate tasks, summarization | GPT-4o-mini, Sonnet | ~$1-5/MTok |
| **Complex** | Analysis, writing, decisions | Claude Sonnet | ~$3-15/MTok |
| **Heavy** | Multi-step reasoning, agentic tasks | Opus 4.6, Kimi K2.5 | ~$5-25/MTok |

<!-- Speaker notes: This is the table to remember. ClawRouter looks at your query, figures out how hard it is, and sends it to the cheapest model that can handle it. Simple questions go to a $0.27 model. Only the hard stuff hits Opus. -->

---

## ClawRouter Profiles

| Profile | Description |
|---------|------------|
| **Auto** | Balanced quality and cost (recommended starting point) |
| **Eco** | Maximum savings, up to 95-100% on simple queries |
| **Premium** | Best quality, less aggressive routing |
| **Free** | Zero-cost models only (limited capability) |

### Other routing options:

| Approach | Best For |
|----------|----------|
| Manual rules in AGENTS.md | Getting started, simple setups |
| ClawRouter | Most users -- best balance of automation and control |
| Custom routing 🐠 skill | Power users who want exact control |
| OpenRouter auto-routing | Users who want zero configuration |

---

## Prompt Caching: The Hidden Savings Multiplier

Every API call re-sends your full system prompt (SOUL.md, AGENTS.md, 🪸 MEMORY.md) -- typically **3,000-14,000 tokens**. You pay full price every time.

### With caching enabled:
- First call pays full price
- Subsequent calls within the cache window pay **90% less** for cached tokens

### Enable it:

```json
{
  "cacheRetention": "long",
  "cacheSystemPrompts": true,
  "cacheThresholdTokens": 2048
}
```

- `"long"` uses Anthropic's extended cache (~55 minutes)
- Only caches prompts above 2,048 tokens

---

## The 55-Minute Heartbeat Trick (Revisited)

Combine three optimizations for maximum savings:

1. Set heartbeat interval to **55 minutes** (stays within cache window)
2. Enable **prompt caching**
3. Route heartbeats to **Haiku 4.5**

| Without Optimization | With Optimization |
|---------------------|-------------------|
| Opus for heartbeats | Haiku for heartbeats |
| Full system prompt every call | Cached system prompt (90% off) |
| **~$100+/month** | **~$0.50/month** |

**99.5% reduction** on heartbeat costs.

> Prompt caching also works for regular conversations -- 90% off system prompt costs for every message after the first in a session.

---

## Upgrading Web Search with Perplexity Pro

🦞 OpenClaw's built-in search is functional, but **Perplexity Pro** is significantly better for research.

### Setup via Open Router:
1. Create an account at openrouter.ai
2. Get your 🔑 API key
3. Add to 🦞 OpenClaw:
```bash
openclaw config provider add openrouter --key YOUR_KEY
openclaw config search model perplexity-pro
```

### Cost tip:
Save research results as markdown files so you do not pay for the same search twice:

```
Save this research to ~/.openclaw/workspace/projects/topic.md
```

---

## 🐙 Agent-to-Agent Communication (sessions_* Tools)

Three built-in tools for agent communication -- no external service required:

| Tool | What It Does |
|------|-------------|
| `sessions_list` | Discover active sessions and their metadata |
| `sessions_history` | Fetch transcript logs from another session |
| `sessions_send` | Message another session; supports reply-back |

**Example flow:** Chief of Staff receives email about crypto → uses `sessions_send` to forward to Crypto Trader → Trader evaluates and sends back assessment → Chief of Staff summarizes for you on Telegram.

Individual agents communicating through `sessions_send` is more reliable and cheaper than one mega-agent doing everything.

<!-- Speaker notes: These three tools are the foundation for multi-agent architectures. sessions_send with reply-back is the most powerful -- it allows agents to delegate and receive results. This is how the "Agentic Company Structure" actually works under the hood. -->

---

## 🐙 Multi-Agent Management

As you get comfortable, you might want separate agents for different areas of your life.

### The Agentic Company Structure:

**Real example (7 days, ~$600):**
- **Sam (Chief of Staff)** -- email, calendar, CRM
- **Midas (Crypto Trader)** -- autonomous portfolio management
- **Ritam (Physics Research)** -- cross-domain synthesis
- **Personal assistant** -- daily life management

### Individual Agents > Sub-Agents
Community consensus: **multiple individual agents** with separate Telegram bots work better than one agent spinning up sub-agents. Sub-agents lose context and forget. Individual agents maintain their own 🪸 memory.

> **Start simple.** One agent is enough for most people. Add more only when you have a clear need.

---

<!-- _class: warning -->

## 🚩 Rough Waters: The Coordination Tax

Google DeepMind research: accuracy **saturates or degrades past 4 agents** ("Coordination Tax")

The "17x error trap": more agents = multiplied error rate, not throughput.

### The 17 → 4 Consolidation
One user went from 17 agents to 4 core roles:
1. **Architect** (CEO) -- strategy, priorities
2. **Builder** (CTO) -- engineering, quality
3. **Money Maker** -- growth, pricing, channels
4. **Operator** (COO) -- processes, tools, financial ops

Everything else: a **specialist library** (36+ types) spawned on demand by core agents.

### Sub-Agent Best Practice
**Values inherit, identity does not.** Don't say "You are the CTO." Say "You are a code security auditor. Apply these standards. Your task: review this module."

<!-- Speaker notes: Google DeepMind proved this. More agents doesn't mean more output -- it means more coordination overhead. Three well-designed agents outperform seventeen mediocre ones. Before adding another agent, ask if a skill would do the job instead. -->

---

## The Freshman Rule & 🐙 Multi-Agent 🪸 Memory

### The Freshman Rule
- **One task at a time** -- do not stack requests
- **Ground-up instructions every time** -- assume the agent knows nothing unless it is in files
- **If it is not in files, it does not exist** -- never assume agents remember past sessions

### Multi-Agent Memory: 4-Layer Architecture

| Layer | What | Example |
|-------|------|---------|
| **1: Private** | Each agent has its own `MEMORY.md` | Midas knows crypto; Sam knows email |
| **2: Shared dir** | A common `_shared/` folder all agents read | User profile, roster, conventions |
| **3: QMD paths** | Cross-agent search via shared indexed paths | Any agent searches another's docs |
| **4: Coordinator** | Dedicated agent maintaining consistency | Resolves conflicts, propagates updates |

### The Principle
Treat agent memory like **team documentation** -- shared docs (wiki, style guide), private docs (notes, task context), and a team lead keeping everyone aligned.

> **If you would not expect a new employee to know it without docs, do not expect your agent to know it either.**

---

## Reverse Prompting

### The normal way (You tell AI what to do):
```
Build me a landing page for my freelance business.
```

### The reverse way (AI tells YOU what to do):
```
Based on everything you know about me, my goals,
and my current situation, what should I be working
on right now? What would move the needle the most?
```

### Why it is powerful:
- your agent has **perfect 🪸 memory** of every goal and conversation
- your agent has **no ego** -- will tell you uncomfortable truths
- your agent **sees patterns** -- spots contradictions in your behavior
- your agent is **objective** -- evaluates based on data, not emotion

<!-- Speaker notes: This is a mind-shift. Most people think of AI as "I tell it, it does." Reverse prompting flips that. You ask your agent to analyze your situation and tell you what to do. Try it once -- it's surprisingly insightful. -->

---

## Reverse Prompting: Try These

**Strategic:**
```
What am I overlooking? Based on my goals and what
I've been working on, what blind spots do you see?
```

**Accountability:**
```
Review my goals from last month. What did I accomplish?
What did I skip? What pattern do you notice?
```

**Self-improvement:**
```
Based on our interactions, what are my three biggest
strengths and three biggest weaknesses in how I work?
```

---

## Self-Improvement Workflows

### Weekly Agent Tuning (make it a cron job):

Ask your agent:
1. What instructions in your core files feel unclear?
2. What information about me seems outdated?
3. What do I keep asking that should be in your 🪸 memory?
4. What 🐠 skills or automations would make us more efficient?
5. What suggestions do you have for improving our workflow?

Then **actually implement** the suggestions by editing core files.

### Context Optimization:
- Use `/compact` to reduce conversation history
- Start new sessions with `/new` for new topics
- Disable unused 🐠 skills to reduce per-message context

### The Docs Folder Pattern
Save ALL web research as markdown files in `~/.openclaw/workspace/docs/`. Agent references these instead of re-searching (saves tokens). Avoid the #1 waste: paying to re-search topics you've already researched.

### Token Hygiene
Review MEMORY.md and TOOLS.md weekly. Remove outdated entries, compress verbose sections. Set 80K token memory flush + 80K compaction threshold.

---

<!-- _class: warning -->

## 🚩 Shoals and Sandbars: Chat Quality ≠ Agent Quality

A model that writes beautiful essays may **completely fail** at agentic work. Chat benchmarks do not measure tool-calling reliability, multi-step planning, or error recovery.

### Proven for Agentic Work
| Model | Strengths |
|-------|----------|
| **Claude Sonnet 4.5 / Opus 4.6** | Reliable tool calls, strong planning, consistent execution |
| **GPT-5.2** | Solid multi-step reasoning, dependable function calling |
| **Kimi K2 / K2.5** | Comparable to Opus on many tasks, excellent cost-to-quality ratio |

### Avoid for Autonomous Tasks
| Model | Problem |
|-------|---------|
| **DeepSeek Reasoner** | Great at thinking and analysis, but **broken tool calls** -- it reasons beautifully then fails to execute |
| **GPT-5.1 Mini** | Skips steps, takes shortcuts, produces incomplete results on multi-step tasks |

### The 3-Tool-Call Test
Before trusting any model for autonomous work, give it a task requiring **at least 3 sequential tool calls** (e.g., "search for X, save results to a file, then summarize the file"). If it drops a step, misformats a call, or hallucinates a tool -- it is not ready for agentic work.

> **The cheapest model is not always the cheapest *effective* model.** A $0.50 model that fails 40% of the time costs more than a $3.00 model that succeeds every time -- because you pay for retries, debugging, and lost output.

<!-- Speaker notes: This slide addresses a common misconception. Students will see a model topping the chat leaderboard and assume it's the best choice for OpenClaw. Agentic work is a completely different evaluation axis. The 3-tool-call test is a practical heuristic they can use immediately. The DeepSeek example resonates because it genuinely is an excellent reasoning model that falls apart the moment you need it to call tools reliably. -->

---

<!-- _class: warning -->

## 🚩 Shoals and Sandbars: Common Mistakes

| Mistake | Fix |
|---------|-----|
| Using Opus for everything | Set up brains and muscles model |
| Not enabling prompt caching | Enable `cacheSystemPrompts` -- instant 90% savings |
| Heartbeat interval at 30 min without caching | Set to 55 minutes to stay in cache window |
| Setting up 5 agents before mastering 1 | Master one agent, then expand |
| Ignoring reverse prompting | Try it once a week |
| Never doing agent tuning | Schedule weekly tuning (10 min) |
| Expecting local models to match Opus | Use local for low-stakes tasks, cloud for important work |

---

<!-- _class: activity -->

## ⚙️ Hands on Deck: Design Your Ideal 🐙 Multi-Agent Setup

### Part 1: Map Your Life Domains (10 min)
- List 3-5 areas: personal, professional, business, creative, other

### Part 2: Design the Roles (10 min)
For each domain:
- What would the agent focus on?
- What personality should it have?
- What model should it use?

### Part 3: Start Simple (5 min)
- Pick the **ONE domain** that would benefit most
- That is your first agent -- master it before adding more

---

<!-- _class: takeaway -->

## 💎 Treasure Chest

1. **🦞 OpenClaw burns money by default** -- five cost mechanisms compound to create huge bills
2. **Brains and Muscles saves serious money** -- expensive model for thinking, cheap for execution
3. **Prompt caching is the biggest hidden savings** -- 90% off system prompt costs
4. **ClawRouter automates routing** -- classifies complexity, routes to cheapest capable model
5. **Model switching is easy** -- `/model [name]` changes mid-conversation
6. **Perplexity Pro is worth the upgrade** -- significantly better research
7. **🐙 Multi-agent is powerful but complex** -- master one agent first
8. **Reverse prompting is the secret weapon** -- let your agent analyze your situation

---

<!-- _class: next -->

# 🌊 Next Port of Call

## Module 10: Security Hardening

> Sandboxing with Docker, tool policies, ⛵ gateway hardening, and incident response. Time to lock everything down.

<!-- Speaker notes: You now know the advanced techniques. But with great power comes the need for greater security. Module 10 is about making sure all of this runs safely. -->
