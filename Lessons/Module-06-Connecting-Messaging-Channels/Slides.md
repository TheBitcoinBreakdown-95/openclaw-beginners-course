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

# Module 06
## 🦞 Connecting Messaging Channels
### Taking Your Agent Mobile

<!-- Speaker notes: This is a fun module — students go from talking to their agent in a terminal to chatting from their phone. Telegram setup is the priority. Discord and WhatsApp are optional extras. Security is the thread running through everything here. -->

---

<!-- _class: objectives -->

## 🧭 Navigation Chart

By the end of this module, you will be able to:

1. **Create** a Telegram bot and connect it to 🦞 OpenClaw
2. **Understand** DM pairing mode and why it is critical for security
3. **Explain** the security implications of each messaging channel
4. **Chat** with your agent from your phone via Telegram
5. **Optionally** set up Discord and WhatsApp 🪢 connections
6. **Apply** the security rules from Module 01 to your channel configuration

<!-- Speaker notes: Telegram is the only required channel. Discord and WhatsApp are optional. Spend most of the class time on Telegram setup and security verification. -->

---

<!-- _class: vocab -->

## 📜 Ship's Logbook

| Term | Definition |
|------|-----------|
| **Channel** | A messaging platform connected to 🦞 OpenClaw (Telegram, Discord, WhatsApp, etc.) |
| **Bot token** | A secret 🔑 credential from the messaging platform that lets OpenClaw control a bot account |
| **DM pairing** | Security feature: unknown senders must enter a code before the bot responds |
| **BotFather** | Telegram's official bot for creating and managing other bots |
| **Guild ID** | Discord's term for a server ID |
| **Allowlist** | A list of specific users permitted to message your bot — everyone else is blocked |

---

## Which Channel to Set Up First

| Channel | Ease of Setup | Security | Recommendation |
|---------|--------------|----------|----------------|
| **Telegram** | Easy | Good (pairing mode) | **Start here** |
| **Discord** | Medium | Moderate (server isolation) | Second option |
| **WhatsApp** | Medium | Moderate (needs 2nd phone #) | Third option |
| **iMessage** | macOS only | N/A for us | Not available on Windows |
| **Slack** | Medium | Good (workspace isolation) | For work contexts |

> **Telegram is recommended as your first and possibly only 🪢 channel.**

<!-- Speaker notes: Keep this slide brief. The table speaks for itself. Emphasize that Telegram is the only required channel for this course. -->

---

## Why Telegram?

- **Free** and available on every platform (phone, desktop, web)
- **Native bot support** — no hacks or workarounds needed
- **Threading and message chunking** — long AI responses split cleanly
- **DM pairing mode** works well for security
- **Access from any device** without touching your 🦞 OpenClaw laptop

<!-- Speaker notes: Telegram's bot API is one of the most mature and well-documented out there. OpenClaw leverages it cleanly. -->

---

## Telegram Step 1: Install Telegram

1. **Phone:** Download "Telegram" from App Store (iPhone) or Google Play (Android)
2. **Computer:** Download from https://telegram.org/ or use https://web.telegram.org/
3. Create an account (requires a phone number)
4. Sign in on at least your phone — that is where you will chat with your agent most often

<!-- Speaker notes: Most students will already have Telegram. For those who don't, installation takes about 2 minutes. -->

---

## Telegram Step 2: Create a Bot with BotFather

1. Open Telegram and search for `@BotFather`
2. Click on **BotFather** (look for the blue checkmark)
3. Click **Start** or type `/start`
4. Type `/newbot` and send it
5. When asked for a name, type: `your agent`
6. When asked for a username, choose something ending in `bot`:
   - Example: `MyAssistantBot`
   - Must be globally unique on Telegram
   - If taken, try: `MyAI_bot` or `My_2026_bot`

<!-- Speaker notes: Walk the class through this step by step. Have everyone create their bot at the same time. The most common issue is the username being taken — have them try variations. -->

---

## Telegram Step 3: Copy Your Bot 🔑 Token

BotFather responds with:

```
Done! Congratulations on your new bot.

Use this token to access the HTTP API:
7123456789:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw
```

**Copy the bot token** — the long string starting with numbers.

> **Security warning:** This 🔑 token controls your bot. Anyone with it can send messages as your bot. Treat it like a password. Never share it, screenshot it, or commit it to public repos.

**Use the text editor trick:** Paste into a text editor first (`gedit`), verify it is one clean line, then copy from there.

<!-- Speaker notes: Stress the security warning. Bot tokens are the single most common credential students accidentally leak. -->

---

## Telegram Step 4: Get Your User ID

Before connecting, get your Telegram user ID:

1. In Telegram, search for **@userinfobot**
2. Start a chat with it
3. It replies with your numeric user ID — **write it down**

This locks down your bot so only YOU can message it.

<!-- Speaker notes: Have everyone do this now. It takes 10 seconds. They'll need the numeric ID for the next step. -->

---

## Telegram Step 5: Connect to 🦞 OpenClaw

In your Ubuntu terminal (replace values with yours):

```bash
npx openclaw config set channels.telegram.botToken "YOUR-TOKEN"
npx openclaw config set channels.telegram.allowFrom '["YOUR-USER-ID"]'
npx openclaw gateway restart
```

> Set `allowFrom` before restarting — skipping it causes a config validation error.

**Use the text editor trick** if paste gives you trouble: `gedit`, paste, verify, copy.

<!-- Speaker notes: If students get errors, the most common causes are: (1) malformed token from copy-paste (use text editor trick), (2) missing allowFrom before restart (config validation error — just run the allowFrom command and restart again). -->

---

## Telegram Step 6: Test It

1. Open Telegram on your phone
2. Search for your bot's username (e.g., `@MyAssistantBot`)
3. Tap **Start** and send a message

If your agent responds — everything is connected and working!

**Optional — Set a profile picture:**
1. Go back to BotFather → `/setuserpic` → select your bot → send a picture
2. Also try `/setdescription` and `/setabouttext`

<!-- Speaker notes: This is the moment of truth. Walk around the room. If anyone's bot doesn't respond: check the token is correct, check allowFrom has their actual user ID, and make sure they restarted the gateway. -->

---

## Security: DM Modes

| Mode | What Happens |
|------|-------------|
| **allowFrom** | Only your user ID can message the bot (what we just set) |
| **pairing** | Unknown senders must enter a code you approve |
| **open** | Anyone can message the bot — **NEVER use this** |

We set `allowFrom` during setup — your bot is already locked down.

> **Tip:** Run `npx openclaw doctor` after connecting any channel to check for misconfigurations.

<!-- Speaker notes: Emphasize that "open" mode is never acceptable for a personal agent. The allowFrom approach is the simplest AND most secure for a single-user setup. -->

---

<!-- _class: warning -->

## 🚩 Rough Waters: Group Chat Danger

**DO NOT put your 🦞 OpenClaw bot in group chats.**

Not "be careful." Not "use with caution." **Do not do it.**

- Every person in the group can send messages the bot reads
- Every message is a potential **prompt injection**
- You cannot control what other people type
- The bot might respond with **private information**
- Social engineering is easy in groups

**The rule: DMs only. Always.**

The only exception requires sandboxing (Module 10), require-mention, and tool policies.

> **Telegram Privacy Mode** (on by default) means bots only see @mentions in groups. Disabling it lets the bot see ALL messages — never do this.

<!-- Speaker notes: Be firm here. Group chats are one of the biggest attack surfaces for personal AI agents. Even well-meaning friends can accidentally trigger dangerous behavior through prompt injection. Telegram's Privacy Mode is a safeguard — bots only see messages that @mention them. If someone disables it via BotFather, the bot sees everything in the group. -->

---

## Setting Up Discord (Optional)

1. Go to https://discord.com/developers/applications
2. Click **New Application**, name it "your agent"
3. Click **Bot** in sidebar, click **Reset Token**, copy 🔑 token
4. Enable **Message Content Intent** under Privileged Gateway Intents

<!-- Speaker notes: Discord setup has more steps than Telegram but it's still straightforward. Walk through each step carefully. -->

---

## Setting Up Discord (continued)

5. Click **OAuth2**, check `bot` scope, set permissions:
   - Read Messages / View Channels
   - Send Messages
   - Read Message History
6. Copy invite URL, invite bot to your **private server**
7. Enable Developer Mode, copy **Server ID** and **Channel ID**

```bash
npx openclaw channels add discord
```

> **Discord security:** Use a private server. Never add the bot to public servers.

<!-- Speaker notes: The key security point is server isolation — the bot should only ever be in a server you fully control. -->

---

## Setting Up WhatsApp (Optional)

```bash
npx openclaw channels add whatsapp
```

1. A QR code appears in the terminal
2. On your phone: **Settings > Linked Devices > Link a Device**
3. Scan the QR code

<!-- Speaker notes: WhatsApp setup is quick but carries more risk than Telegram. Walk through the QR code scan step by step. -->

---

## WhatsApp Security

**Important considerations:**

- **Strongly recommended:** Use a second phone number, not your personal one
- The bot can see your entire WhatsApp message history
- The bot can send messages as you
- If compromised, damage is limited to the secondary account

```bash
npx openclaw config set channels.whatsapp.allowFrom \
  '["+1234567890"]'
```

<!-- Speaker notes: WhatsApp is the riskiest channel because it links to a real phone number and exposes existing message history. Strongly encourage a second number. Cheap prepaid SIMs work fine. -->

---

## Security Checklist for All 🪢 Channels

| Check | Status |
|-------|--------|
| DM pairing mode is enabled (not "open") | [ ] |
| Only your user ID / phone number is in the allowlist | [ ] |
| Bot is NOT in any group chats | [ ] |
| Bot 🔑 token is stored securely (not in public repos or screenshots) | [ ] |

<!-- Speaker notes: Walk through each item with the class. Have students check off each one as they verify it. This is a good time to run npx openclaw doctor to catch anything missed. -->

---

## Security Checklist for All 🪢 Channels (continued)

| Check | Status |
|-------|--------|
| If using Discord: bot is in a private server with only you | [ ] |
| If using WhatsApp: ideally using a second phone number | [ ] |
| ⛵ Gateway authentication token is set | [ ] |
| You have tested that the bot responds ONLY to you | [ ] |

---

## Channel Security: Best Practices from the Community

**Dedicated Accounts:**
- Create a **fresh Gmail/email** specifically for the bot
- Share calendar **read-only** from your personal account
- If compromised, you only lose the bot account — not your personal one

**Email Safety Protocol:**
If connecting email: check inbox every 2 minutes. **Trusted senders** (whitelist) can trigger actions. All other senders: **read-only summary only**. NEVER auto-reply to unknown senders.

**Password Manager Integration:**
Store bot 🔑 credentials in a **dedicated password manager vault** (e.g., "Shared with OpenClaw" in 1Password). API keys belong in the password manager, not in TOOLS.md or on disk.

<!-- Speaker notes: These best practices come from the OpenClaw community and represent hard-won lessons. The dedicated account strategy is especially important — it limits blast radius if something goes wrong. -->

---

<!-- _class: warning -->

## 🚩 Shoals and Sandbars

| Mistake | Fix |
|---------|-----|
| Bot does not respond on Telegram | Check dashboard for pending pairing requests |
| "Unauthorized" error | Regenerate 🔑 token via BotFather, use text editor trick |
| Bot responds to strangers | Change DM mode to "pairing" immediately |
| WhatsApp connection drops | Re-scan QR code: `npx openclaw channels login` |
| Discord bot can't see messages | Enable Message Content Intent in Developer Portal |
| Bot is slow to respond | Normal: AI responses take 2-10 seconds |
| Bot 🔑 token accidentally shared | Regenerate immediately via BotFather `/revoke` |

<!-- Speaker notes: The most common issues are copy-paste errors with the bot token and forgetting to approve pairing requests. Walk through each row and ask if anyone has hit any of these. -->

---

<!-- _class: activity -->

## ⚙️ Hands on Deck

**Part 1: Set Up Telegram *(15 min)***
1. Create a bot with BotFather
2. Connect it to 🦞 OpenClaw
3. Complete DM pairing
4. Send a test message from your phone

**Part 2: Verify Security *(5 min)***
1. Confirm DM pairing mode is active
2. Check that only your user ID is allowed
3. If possible, test that the bot blocks other accounts

<!-- Speaker notes: This is the main hands-on exercise. Walk around the room and help students who get stuck. Most issues will be at the token copy-paste step or the pairing approval step. -->

---

<!-- _class: activity -->

## ⚙️ Hands on Deck *(continued)*

**Part 3: Have a Mobile Conversation *(10 min)***

From your phone via Telegram:

1. Ask your agent: *"What's your name and what do you know about me?"*
2. Ask your agent to create a to-do list for tomorrow
3. Ask your agent a question about a topic you are interested in

**Part 4: Security Test *(5 min)***

- Have a friend (or second account) try to message the bot
- They should be blocked by DM pairing mode
- Do NOT approve their pairing request

<!-- Speaker notes: Notice how the experience feels different from the TUI. Telegram feels like texting a knowledgeable friend. The TUI feels like working at a terminal. Part 3 is the fun part — let students explore. Part 4 is critical for understanding why DM pairing matters. If students don't have a second account, pair them up to test each other's bots. -->

---

<!-- _class: takeaway -->

## 💎 Treasure Chest

1. **Telegram is the recommended first channel** — easy setup, good security, available everywhere
2. **DM pairing mode is your first line of defense** — never set it to "open"
3. **Never put your bot in group chats** — DMs only, always
4. **Bot tokens are secrets** — treat them like passwords
5. **WhatsApp ideally needs a second phone number** — otherwise the bot accesses your personal messages
6. **Discord needs a private server** — do not add the bot to public servers
7. **Test security after setup** — verify the bot only responds to you
8. **Start with one channel** — expand when comfortable

<!-- Speaker notes: Recap the key points. Security is the recurring theme. If students take away only one thing, it should be: DM pairing mode on, group chats off. -->

---

<!-- _class: next -->

# 🌊 Next Port of Call

## Module 07: Skills and ClawHub

> Your agent is now mobile. In Module 07, we teach your agent new 🐠 abilities. Skills are like apps for your agent — email management, image generation, note-taking, and thousands more from the community marketplace.

<!-- Speaker notes: Congratulations — everyone now has their agent in their pocket via Telegram. Module 07 is where we start adding capabilities. The skill marketplace has over 5,700 skills and students can build their own. -->
