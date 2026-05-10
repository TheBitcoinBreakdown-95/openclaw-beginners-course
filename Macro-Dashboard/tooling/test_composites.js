'use strict';
// Sanity tests for composite (peer-aware) scoring rules.
// on_rrp: RRP draining + TGA refilling → L5 escalation (combined drain).
// bank_reserves: declining + SOFR-IORB widening → +2 escalation (scarcity confirmed).
// fed_net_liquidity: synthetic indicator computed from WALCL/TGA/RRP peers — pure velocity scoring.

const path = require('path');
const { TIER1 } = require(path.resolve(
  'c:/Users/GC/Documents/Ai Playground/AI/Clawdbot aka Openclaw/.claude/macro-deploy/indicators.js'
));

const onRrp = TIER1.find(x => x.id === 'on_rrp');
const bankReserves = TIER1.find(x => x.id === 'bank_reserves');
const fedNetLiq = TIER1.find(x => x.id === 'fed_net_liquidity');

let pass = 0, fail = 0;
function t(name, expected, actual) {
  const ok = expected === actual;
  if (ok) { pass++; console.log(`  PASS  ${name}`); }
  else    { fail++; console.log(`  FAIL  ${name}\n        expected ${expected}\n        got      ${actual}`); }
}

// ---- on_rrp composite ----

// Baseline: RRP at $773M (drained, b=0.77) with no velocity context → L4 (single-variable cap).
t('on_rrp drained no peers',
  4,
  onRrp.computeLevel(773, { delta5d: null, delta30d: null, peers: {} }));

// Composite L5: RRP draining (-$120B/30d) AND TGA refilling (+$250B/30d).
t('on_rrp composite L5 — RRP drain + TGA refill',
  5,
  onRrp.computeLevel(773, {
    delta5d: 0,
    delta30d: -120000,
    peers: { tga: { raw: 1000000, velocity: { delta30d: 250000 } } }
  }));

// Composite NOT triggered: RRP draining hard but TGA only +$150B (below threshold) → still L4.
t('on_rrp composite blocked — TGA build below threshold',
  4,
  onRrp.computeLevel(773, {
    delta5d: 0,
    delta30d: -120000,
    peers: { tga: { raw: 1000000, velocity: { delta30d: 150000 } } }
  }));

// Composite NOT triggered: TGA refilling fast but RRP delta30d only -$80B (below -$100B threshold).
t('on_rrp composite blocked — RRP drain below threshold',
  4,
  onRrp.computeLevel(773, {
    delta5d: 0,
    delta30d: -80000,
    peers: { tga: { raw: 1000000, velocity: { delta30d: 250000 } } }
  }));

// Composite NOT triggered when peer is missing.
t('on_rrp composite skipped — no tga peer',
  4,
  onRrp.computeLevel(773, {
    delta5d: 0,
    delta30d: -120000,
    peers: {}
  }));

// Sudden 5d build still triggers L5 directly (path 1, independent of composite).
t('on_rrp 5d panic build → L5',
  5,
  onRrp.computeLevel(773, {
    delta5d: 110000,
    delta30d: 0,
    peers: {}
  }));

// High RRP ($350B) at L1 with composite condition still fires (composite is velocity-only,
// not absolute-level-gated — joint p90+ velocity is the signal).
t('on_rrp composite fires even at high absolute level',
  5,
  onRrp.computeLevel(350000, {
    delta5d: 0,
    delta30d: -120000,
    peers: { tga: { raw: 1000000, velocity: { delta30d: 250000 } } }
  }));

// ---- bank_reserves composite ----

// Baseline: $3.0T reserves (t=3.0), no velocity → L3.
t('bank_reserves $3.0T no velocity → L3',
  3,
  bankReserves.computeLevel(3000000, { delta4w: null, delta12w: null, peers: {} }));

// Single-variable kick: declining fast (-$250B/4w) in low zone → L4.
t('bank_reserves -$250B/4w in low zone → L4',
  4,
  bankReserves.computeLevel(3000000, { delta4w: -250000, delta12w: null, peers: {} }));

// Composite +2: declining (-$120B/4w) AND SOFR at 3.72 (IORB+7bp) → L5 from L3 base.
t('bank_reserves composite — declining + SOFR widening → L5',
  5,
  bankReserves.computeLevel(3000000, {
    delta4w: -120000,
    delta12w: null,
    peers: { sofr: { raw: 3.72 } }
  }));

// Composite NOT fired: declining but SOFR calm (3.66 = IORB+1bp, below 5bp threshold).
t('bank_reserves composite blocked — SOFR calm',
  3,
  bankReserves.computeLevel(3000000, {
    delta4w: -120000,
    delta12w: null,
    peers: { sofr: { raw: 3.66 } }
  }));

// Composite NOT fired: SOFR widening but reserves stable (delta4w small).
t('bank_reserves composite blocked — reserves not declining',
  3,
  bankReserves.computeLevel(3000000, {
    delta4w: -50000,
    delta12w: null,
    peers: { sofr: { raw: 3.72 } }
  }));

// Composite at low base level: $2.8T (L4) declining + SOFR widening = L5 cap.
t('bank_reserves composite caps at L5',
  5,
  bankReserves.computeLevel(2800000, {
    delta4w: -120000,
    delta12w: null,
    peers: { sofr: { raw: 3.72 } }
  }));

// Composite NOT fired when sofr peer missing.
t('bank_reserves composite skipped — no sofr peer',
  3,
  bankReserves.computeLevel(3000000, {
    delta4w: -120000,
    delta12w: null,
    peers: {}
  }));

// Both single-variable kick AND composite fire: -$250B/4w in low zone (+1) AND SOFR widening (+2).
// $3.0T base = L3 → +1 from kick = L4 → +2 from composite = L5 cap.
t('bank_reserves both kicks compound but cap at L5',
  5,
  bankReserves.computeLevel(3000000, {
    delta4w: -250000,
    delta12w: null,
    peers: { sofr: { raw: 3.72 } }
  }));

// ---- fed_net_liquidity (synthetic / composite of WALCL−TGA−RRP) ----

// compute() with all three peers populated returns correct raw + velocity.
// WALCL=$6.71T, TGA=$0.88T, RRP=$0.001T → NL = 5.83T (= 5,829,200 millions)
// Component delta30ds: WALCL +$87B, TGA +$30B, RRP +$0.6B → NL Δ30d = 87 - 30 - 0.6 = +$56.4B
const goodPeers = {
  walcl:  { raw: 6710000, velocity: { delta30d: 87000 } },
  tga:    { raw: 877760,  velocity: { delta30d: 30000 } },
  on_rrp: { raw: 800,     velocity: { delta30d: 600 } }
};
const computed = fedNetLiq.composite.compute(goodPeers);
t('fed_net_liquidity compute raw',     5831440,   computed.raw);
t('fed_net_liquidity compute delta30d', 56400,    computed.velocity.delta30d);

// compute() returns null when any peer missing — runner will emit ok:false.
t('fed_net_liquidity compute null on missing walcl',
  null,
  fedNetLiq.composite.compute({ tga: goodPeers.tga, on_rrp: goodPeers.on_rrp }));
t('fed_net_liquidity compute null on missing tga',
  null,
  fedNetLiq.composite.compute({ walcl: goodPeers.walcl, on_rrp: goodPeers.on_rrp }));
t('fed_net_liquidity compute null on missing rrp',
  null,
  fedNetLiq.composite.compute({ walcl: goodPeers.walcl, tga: goodPeers.tga }));
t('fed_net_liquidity compute null on null peers',
  null,
  fedNetLiq.composite.compute(null));

// compute() degrades gracefully when component velocity missing — raw still computes,
// delta30d goes null, scoring will fall back to placeholder L2.
const noVelPeers = {
  walcl:  { raw: 6710000, velocity: {} },
  tga:    { raw: 877760,  velocity: {} },
  on_rrp: { raw: 800,     velocity: {} }
};
const computedNoVel = fedNetLiq.composite.compute(noVelPeers);
t('fed_net_liquidity compute raw without velocity', 5831440, computedNoVel.raw);
t('fed_net_liquidity compute null delta30d when components missing it', null, computedNoVel.velocity.delta30d);

// Scoring across the 5 levels (asymmetric — drains are alarming, rises bullish).
t('fed_net_liquidity L1 — clear injection (+$150B/30d)',
  1,
  fedNetLiq.computeLevel(5800000, { delta30d: 150000, peers: {} }));
t('fed_net_liquidity L2 — stable (+$50B/30d)',
  2,
  fedNetLiq.computeLevel(5800000, { delta30d: 50000, peers: {} }));
t('fed_net_liquidity L2 — slight drain (-$10B/30d)',
  2,
  fedNetLiq.computeLevel(5800000, { delta30d: -10000, peers: {} }));
t('fed_net_liquidity L3 — moderate drain (-$60B/30d, normal QT pace)',
  3,
  fedNetLiq.computeLevel(5800000, { delta30d: -60000, peers: {} }));
t('fed_net_liquidity L4 — clear drain (-$150B/30d)',
  4,
  fedNetLiq.computeLevel(5800000, { delta30d: -150000, peers: {} }));
t('fed_net_liquidity L5 — regime change (-$300B/30d)',
  5,
  fedNetLiq.computeLevel(5800000, { delta30d: -300000, peers: {} }));

// Placeholder L2 when delta30d is missing.
t('fed_net_liquidity L2 placeholder when delta30d missing',
  2,
  fedNetLiq.computeLevel(5800000, { delta30d: null, peers: {} }));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail > 0 ? 1 : 0);
