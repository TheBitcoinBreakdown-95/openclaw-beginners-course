'use strict';
const path = require('path');
const { TIER1, TIER2 } = require(path.resolve('c:/Users/GC/Documents/Ai Playground/AI/Clawdbot aka Openclaw/.claude/macro-deploy/indicators.js'));

// Current values from FRED (as of 2026-05-07, from fred_summary.json).
// Where the indicator divides/multiplies, pass the raw FRED value (units in millions, etc).
const current = {
  sofr: 3.61,
  us10y: 4.36,
  us2y: 3.87,
  curve_2s10s: 0.49,
  hy_oas: 2.75,         // %, multiplier *100 for bp display
  ig_oas: 0.78,
  real_yield_10y: 1.94,
  '5y5y_inflation': 2.29,
  on_rrp: 773,          // millions (= $0.77B); display divisor /1000
  tga: 877761,          // millions
  walcl: 6709505,       // millions
  bank_reserves: 3032588, // millions
  jobless_claims: 203250, // people
  ci_loans: 2827.5,     // billions
  vix: 17.39,
  dxy: 118.39,
  usdjpy: 156.76,
  breakeven_10y: 2.45,
  breakeven_5y: 2.61,
  curve_3m10y: 0.72,
  continuing_claims: 1766000,
  copper: 12528.7,
  wti: 109.76,
};

// SOFR needs ctx.iorb
const ctx = { iorb: 3.65 };

function check(arr, label) {
  console.log(`\n=== ${label} ===`);
  for (const ind of arr) {
    if (typeof ind.computeLevel !== 'function') continue;
    const v = current[ind.id];
    if (v === undefined) {
      console.log(`SKIP  ${ind.id.padEnd(20)} (no current value)`);
      continue;
    }
    let level;
    try { level = ind.computeLevel(v, ctx); }
    catch (e) { console.log(`ERR   ${ind.id.padEnd(20)} ${e.message}`); continue; }
    const summary = ind.thresholdSummary || '';
    console.log(`L${level}    ${ind.id.padEnd(20)} v=${v}  ${summary}`);
  }
}

check(TIER1, 'TIER 1');
check(TIER2, 'TIER 2');
