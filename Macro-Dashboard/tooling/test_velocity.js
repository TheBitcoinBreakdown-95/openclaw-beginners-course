'use strict';
// Sanity tests for velocity.js primitives.
const v = require('c:/Users/GC/Documents/Ai Playground/AI/Clawdbot aka Openclaw/.claude/macro-deploy/velocity.js');

let pass = 0, fail = 0;
function t(name, expected, actual) {
  const ok = JSON.stringify(expected) === JSON.stringify(actual);
  if (ok) { pass++; console.log(`  PASS  ${name}`); }
  else    { fail++; console.log(`  FAIL  ${name}\n        expected ${JSON.stringify(expected)}\n        got      ${JSON.stringify(actual)}`); }
}

const history = [
  { date: '2026-04-01', value: 100 },
  { date: '2026-04-08', value: 105 },
  { date: '2026-04-15', value: 110 },
  { date: '2026-04-22', value: 108 },
  { date: '2026-04-29', value: 112 },
  { date: '2026-05-06', value: 115 },
];

// delta(5d) from 2026-05-06: target = 2026-05-01 → nearest prior obs = 2026-04-29 (value 112).
// 115 - 112 = 3
t('delta 5d', 3, v.delta(history, 115, '2026-05-06', 5));

// delta(30d) from 2026-05-06: target = 2026-04-06 → nearest prior = 2026-04-01 (100).
// 115 - 100 = 15
t('delta 30d', 15, v.delta(history, 115, '2026-05-06', 30));

// pctChange(30d) = (115-100)/100*100 = 15
t('pctChange 30d', 15, v.pctChange(history, 115, '2026-05-06', 30));

// rocPerWeek(30d) = 15 / (30/7) = 3.5
t('rocPerWeek 30d', 3.5, v.rocPerWeek(history, 115, '2026-05-06', 30));

// drawdown 30d: high in window since 2026-04-06 = 115. (115-115)/115*100 = 0.
t('drawdown 30d (at high)', 0, v.drawdown(history, 115, 30));

// drawdown when current is below the rolling high
t('drawdown (below high)', -10, v.drawdown(
  [...history, { date: '2026-05-07', value: 103.5 }], 103.5, 30));

// disinversion: prior was negative, now positive → 'disinverted'
const curve = [
  { date: '2026-04-01', value: -0.30 },
  { date: '2026-04-15', value: -0.10 },
  { date: '2026-04-29', value: 0.20 },
  { date: '2026-05-06', value: 0.49 },
];
t('disinversion arrived', 'disinverted', v.disinversion(curve, 0.49, '2026-05-06', 30));

// disinversion: prior was negative AND current is negative → 'inverted'
t('disinversion still inverted', 'inverted', v.disinversion(
  [{date:'2026-04-06', value:-0.50}, {date:'2026-05-06', value:-0.20}], -0.20, '2026-05-06', 30));

// disinversion: prior was positive, now negative → 'reinverting'
t('disinversion reinverting', 'reinverting', v.disinversion(
  [{date:'2026-04-06', value:0.20}, {date:'2026-05-06', value:-0.10}], -0.10, '2026-05-06', 30));

// disinversion with only 1 obs → 'unknown'
t('disinversion not enough history', 'unknown', v.disinversion([{date:'2026-05-06', value:0.5}], 0.5, '2026-05-06', 30));

// computeVelocity: integration test
const result = v.computeVelocity([
  { name: 'delta5d', primitive: 'delta', days: 5 },
  { name: 'delta30d', primitive: 'delta', days: 30 },
  { name: 'pct30d', primitive: 'pctChange', days: 30 },
], history, 115, '2026-05-06');
t('computeVelocity integration', { delta5d: 3, delta30d: 15, pct30d: 15 }, result);

// computeVelocity with empty history returns empty object
t('computeVelocity empty history', {}, v.computeVelocity([{name:'x',primitive:'delta',days:5}], [], 100, '2026-05-06'));

// delta when history is too short returns null
t('delta insufficient history', null, v.delta([{date:'2026-05-06', value:100}], 100, '2026-05-06', 30));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail > 0 ? 1 : 0);
