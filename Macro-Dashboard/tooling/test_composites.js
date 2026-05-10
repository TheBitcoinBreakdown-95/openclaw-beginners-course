'use strict';
// Sanity tests for composite (peer-aware) scoring rules.
// on_rrp: RRP draining + TGA refilling → L5 escalation (combined drain).
// bank_reserves: declining + SOFR-IORB widening → +2 escalation (scarcity confirmed).
// fed_net_liquidity: synthetic indicator computed from WALCL/TGA/RRP peers — pure velocity scoring.
// tbill_3m: peer-aware primitive — reads ctx.peers.effr.raw to compute spread.
// gold_btc_ratio: synthetic indicator computed from gold/btc peers — asymmetric scoring.

const path = require('path');
const { TIER1, TIER2 } = require(path.resolve(
  'c:/Users/GC/Documents/Ai Playground/AI/Clawdbot aka Openclaw/.claude/macro-deploy/indicators.js'
));

const onRrp = TIER1.find(x => x.id === 'on_rrp');
const bankReserves = TIER1.find(x => x.id === 'bank_reserves');
const fedNetLiq = TIER1.find(x => x.id === 'fed_net_liquidity');
const tbill3m = TIER1.find(x => x.id === 'tbill_3m');
const goldBtcRatio = TIER2.find(x => x.id === 'gold_btc_ratio');

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

// ---- tbill_3m (peer-aware primitive: reads ctx.peers.effr.raw) ----

// Spread > -10bp: T-bill 3.61, EFFR 3.63 → spread = -2bp → L1.
t('tbill_3m L1 — calm spread (-2bp)',
  1,
  tbill3m.computeLevel(3.61, { peers: { effr: { raw: 3.63 } } }));

// Spread -10 to -25bp: T-bill 3.50, EFFR 3.65 → -15bp → L2.
t('tbill_3m L2 — mild cuts pricing (-15bp)',
  2,
  tbill3m.computeLevel(3.50, { peers: { effr: { raw: 3.65 } } }));

// Spread -25 to -50bp: T-bill 3.30, EFFR 3.65 → -35bp → L3.
t('tbill_3m L3 — moderate cuts pricing (-35bp)',
  3,
  tbill3m.computeLevel(3.30, { peers: { effr: { raw: 3.65 } } }));

// Spread -50 to -100bp: T-bill 2.90, EFFR 3.65 → -75bp → L4.
t('tbill_3m L4 — clear cuts pricing (-75bp)',
  4,
  tbill3m.computeLevel(2.90, { peers: { effr: { raw: 3.65 } } }));

// Spread <-100bp: T-bill 2.40, EFFR 3.65 → -125bp → L5 (recession territory).
t('tbill_3m L5 — panic-cut zone (-125bp)',
  5,
  tbill3m.computeLevel(2.40, { peers: { effr: { raw: 3.65 } } }));

// Positive spread is asymmetric — caps at L1 (uninformative for stress).
t('tbill_3m positive spread stays L1',
  1,
  tbill3m.computeLevel(3.70, { peers: { effr: { raw: 3.65 } } }));

// No effr peer → falls back to L2 placeholder.
t('tbill_3m no effr peer → L2 placeholder',
  2,
  tbill3m.computeLevel(3.61, { peers: {} }));

t('tbill_3m null peers obj → L2 placeholder',
  2,
  tbill3m.computeLevel(3.61, { peers: null }));

t('tbill_3m effr peer without raw → L2 placeholder',
  2,
  tbill3m.computeLevel(3.61, { peers: { effr: {} } }));

// ---- gold_btc_ratio (synthetic, asymmetric scoring) ----

// compute() with both peers + matching pct30d returns correct raw + delta30dPct.
// gold = $4715, btc = $80,749, gold.pct30d = +5%, btc.pct30d = -10%
// gold prior = 4715 / 1.05 = 4490.48; btc prior = 80749 / 0.90 = 89721.11
// ratio_now = 4715/80749 = 0.058391; ratio_prior = 4490.48/89721.11 = 0.050050
// pct = (0.058391 - 0.050050) / 0.050050 * 100 = 16.665...
const goldBtcPeers = {
  gold: { raw: 4715, velocity: { pct30d: 5 } },
  btc:  { raw: 80749, velocity: { pct30d: -10 } }
};
const goldBtcCalc = goldBtcRatio.composite.compute(goldBtcPeers);
t('gold_btc_ratio compute raw',
  true,
  Math.abs(goldBtcCalc.raw - (4715 / 80749)) < 1e-9);
t('gold_btc_ratio compute delta30dPct (gold +5, btc -10 → ratio +~16.67%)',
  true,
  Math.abs(goldBtcCalc.velocity.delta30dPct - 16.6666666) < 0.01);

// compute() returns null when either peer missing.
t('gold_btc_ratio compute null on missing gold',
  null,
  goldBtcRatio.composite.compute({ btc: goldBtcPeers.btc }));
t('gold_btc_ratio compute null on missing btc',
  null,
  goldBtcRatio.composite.compute({ gold: goldBtcPeers.gold }));
t('gold_btc_ratio compute null on null peers',
  null,
  goldBtcRatio.composite.compute(null));

// compute() returns null on zero btc (avoid divide-by-zero).
t('gold_btc_ratio compute null on btc.raw === 0',
  null,
  goldBtcRatio.composite.compute({
    gold: { raw: 4715, velocity: { pct30d: 5 } },
    btc:  { raw: 0,    velocity: { pct30d: -10 } }
  }));

// compute() degrades gracefully when peer pct30d missing — raw still computes, delta30dPct goes null.
const noVelPair = {
  gold: { raw: 4715, velocity: {} },
  btc:  { raw: 80749, velocity: {} }
};
const goldBtcNoVel = goldBtcRatio.composite.compute(noVelPair);
t('gold_btc_ratio compute raw without velocity',
  true,
  Math.abs(goldBtcNoVel.raw - (4715 / 80749)) < 1e-9);
t('gold_btc_ratio compute null delta30dPct without component pct30d',
  null,
  goldBtcNoVel.velocity.delta30dPct);

// Scoring — asymmetric: rising = stress, falling caps at L2.
t('gold_btc_ratio L1 — calm (+5%/30d)',
  1,
  goldBtcRatio.computeLevel(0.058, { delta30dPct: 5, peers: {} }));
t('gold_btc_ratio L2 — mild gold outperformance (+20%/30d)',
  2,
  goldBtcRatio.computeLevel(0.058, { delta30dPct: 20, peers: {} }));
t('gold_btc_ratio L3 — clear gold outperformance (+30%/30d)',
  3,
  goldBtcRatio.computeLevel(0.058, { delta30dPct: 30, peers: {} }));
t('gold_btc_ratio L4 — major flight (+45%/30d)',
  4,
  goldBtcRatio.computeLevel(0.058, { delta30dPct: 45, peers: {} }));
t('gold_btc_ratio L5 — crisis flight (+70%/30d)',
  5,
  goldBtcRatio.computeLevel(0.058, { delta30dPct: 70, peers: {} }));
t('gold_btc_ratio L1 — modest BTC outperformance (-15%/30d)',
  1,
  goldBtcRatio.computeLevel(0.058, { delta30dPct: -15, peers: {} }));
t('gold_btc_ratio L2 — strong BTC outperformance caps at L2 (-40%/30d)',
  2,
  goldBtcRatio.computeLevel(0.058, { delta30dPct: -40, peers: {} }));
t('gold_btc_ratio L2 placeholder when delta30dPct missing',
  2,
  goldBtcRatio.computeLevel(0.058, { delta30dPct: null, peers: {} }));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail > 0 ? 1 : 0);
