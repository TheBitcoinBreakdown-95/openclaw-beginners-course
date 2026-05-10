'use strict';
const path = require('path');
const { TIER1, TIER2 } = require(path.resolve('c:/Users/GC/Documents/Ai Playground/AI/Clawdbot aka Openclaw/.claude/macro-deploy/indicators.js'));

// Current values from FRED (as of 2026-05-07, from fred_summary.json).
// Where the indicator divides/multiplies, pass the raw FRED value (units in millions, etc).
const current = {
  sofr: 3.61,
  effr: 3.63,          // 2026-05-07 — IORB 3.65, spread -2bp
  tbill_3m: 3.61,      // 2026-05-07 — DTB3; verify_levels has no peers so falls back to L2 placeholder
  ccc_hy_oas: 9.15,    // 2026-05-07 — 915bp, expect L3
  em_corp_oas: 1.46,   // 2026-05-07 — 146bp, expect L1 (current regime is unusually tight)
  bank_deposits: 19113.30, // 2026-04-29 weekly — verify_levels has no YoY ctx, falls back to L2 placeholder
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
  mortgage_30y: 6.37,  // 2026-05-07 — FRED MORTGAGE30US weekly; expect L1 (sub-6.5)
  us30y: 4.97,         // 2026-05-07 — DGS30; expect L3 (4.7-5.2)
  real_yield_30y: 2.68, // 2026-05-07 — DFII30; expect L3 (2.0-2.5 lower bound) actually L4 (2.5-3.0)
  building_permits: 1363, // 2026-03 — PERMIT thousands SAAR; expect L2 (1300-1500)
  cpi_yoy: 330.293,    // 2026-03 — CPIAUCSL index; verify_levels has no pctYoY ctx → L2 placeholder
  core_cpi_yoy: 334.165, // 2026-03 — CPILFESL index; same placeholder behavior
  brent: 118.26,       // 2026-05-01 — DCOILBRENTEU; expect L4 (105-120)
  natgas: 2.67,        // 2026-05-04 — DHHNGSP; expect L1 (2.5-5.0 normal)
  swap_lines: 206,     // 2026-05-06 — SWPT $millions; expect L1 (<$1B)
  discount_window: 5097.5, // 2026-03 — BORROW $millions monthly; expect L2 ($1-10B)
  fima_repo: 2,        // 2026-05-06 — WORAL $millions; expect L1 (<$500M)
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
