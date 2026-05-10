"""
Phase 0 audit for synthetic indicators (fed_net_liquidity, gold_btc_ratio).

Source data isn't a single FRED ID — both indicators are computed from peers.
This script reconstructs each synthetic series over 2024-2026 and computes the
distribution of the velocity primitive each indicator's computeLevel consumes
(30d delta for net_liquidity, 30d pct change for gold_btc_ratio).

Output: Macro-Dashboard/audits/synthetic_summary.json (Linux when run on Jinn,
Windows path when run locally).

Run preference: Jinn (FRED-from-Windows hangs with rc=56; CoinGecko fine on either).
"""
import csv
import io
import json
import os
import statistics
import subprocess
import sys
import time
from datetime import datetime, timedelta

# Resolve OUT_PATH: Linux when on Jinn (no D: drive), Windows otherwise.
if os.name == 'nt':
    OUT_PATH = r"c:\Users\GC\Documents\Ai Playground\AI\Clawdbot aka Openclaw\Macro-Dashboard\audits\synthetic_summary.json"
else:
    OUT_PATH = "/tmp/synthetic_summary.json"

START = "2024-01-01"
START_TS = int(datetime(2024, 1, 1).timestamp())
END_TS = int(datetime.now().timestamp())


def fetch_fred(series_id):
    url = f"https://fred.stlouisfed.org/graph/fredgraph.csv?id={series_id}"
    p = subprocess.run(
        ["curl", "-sSL", "--http1.1", "--max-time", "30", "-A", "curl/8.0", url],
        capture_output=True, timeout=40,
    )
    if p.returncode != 0:
        raise RuntimeError(f"FRED {series_id}: curl rc={p.returncode}")
    reader = csv.reader(io.StringIO(p.stdout.decode("utf-8", errors="replace")))
    next(reader, None)
    out = {}  # date -> value
    for row in reader:
        if len(row) < 2 or row[1] in (".", "", "NA", "ND"):
            continue
        try:
            out[row[0]] = float(row[1])
        except ValueError:
            pass
    return out


def fetch_coingecko(coin_id):
    """market_chart with days=365 — CoinGecko free tier caps historical at ~1 year. The
    range endpoint requires from/to within 365 days; using the simpler days endpoint
    with daily interval gives last-365-days daily candles (a slightly narrower 2025-05
    to 2026-05 window for the audit, still ample for distribution)."""
    url = (
        f"https://api.coingecko.com/api/v3/coins/{coin_id}/market_chart"
        f"?vs_currency=usd&days=365&interval=daily"
    )
    last_err = ""
    for attempt in range(3):
        p = subprocess.run(
            ["curl", "-sSL", "--http1.1", "--max-time", "60", "-A", "curl/8.0", url],
            capture_output=True, timeout=70,
        )
        if p.returncode == 0:
            try:
                data = json.loads(p.stdout.decode("utf-8"))
            except json.JSONDecodeError as e:
                last_err = f"json decode: {e} ; body[:200]={p.stdout[:200]!r}"
                time.sleep(3 + attempt * 5)
                continue
            prices = data.get("prices") or []
            if not prices:
                last_err = f"no prices; payload[:200]={p.stdout[:200]!r}"
                time.sleep(3 + attempt * 5)
                continue
            # prices is [[ms_timestamp, price], ...] daily.
            out = {}  # ISO date -> price (last sample of the day)
            for ms, price in prices:
                d = datetime.utcfromtimestamp(ms / 1000).date().isoformat()
                out[d] = price
            return out
        last_err = f"curl rc={p.returncode}"
        time.sleep(3 + attempt * 5)
    raise RuntimeError(f"CoinGecko {coin_id} failed after retries: {last_err}")


def quantile(sorted_vals, p):
    if not sorted_vals:
        return None
    i = p * (len(sorted_vals) - 1)
    lo = int(i)
    hi = min(lo + 1, len(sorted_vals) - 1)
    return sorted_vals[lo] * (1 - (i - lo)) + sorted_vals[hi] * (i - lo)


def summarize(vals):
    if not vals:
        return None
    s = sorted(vals)
    abs_s = sorted(abs(x) for x in vals)
    rising = sorted(x for x in vals if x > 0)
    falling = sorted(-x for x in vals if x < 0)
    return {
        "n": len(vals),
        "min": s[0], "max": s[-1],
        "mean": statistics.mean(vals), "stdev": statistics.pstdev(vals),
        "p10": quantile(s, 0.10), "p25": quantile(s, 0.25),
        "p50": quantile(s, 0.50), "p75": quantile(s, 0.75),
        "p90": quantile(s, 0.90), "p99": quantile(s, 0.99),
        "abs": {
            "p50": quantile(abs_s, 0.50), "p75": quantile(abs_s, 0.75),
            "p90": quantile(abs_s, 0.90), "p95": quantile(abs_s, 0.95),
            "p99": quantile(abs_s, 0.99), "max": abs_s[-1],
        },
        "rising": {
            "n": len(rising),
            "p50": quantile(rising, 0.50) if rising else None,
            "p90": quantile(rising, 0.90) if rising else None,
            "p99": quantile(rising, 0.99) if rising else None,
            "max": rising[-1] if rising else None,
        },
        "falling": {
            "n": len(falling),
            "p50": quantile(falling, 0.50) if falling else None,
            "p90": quantile(falling, 0.90) if falling else None,
            "p99": quantile(falling, 0.99) if falling else None,
            "max": falling[-1] if falling else None,
        },
    }


def fed_net_liquidity_audit():
    print("Fetching WALCL, WTREGEN, RRPONTSYD...", file=sys.stderr)
    walcl = fetch_fred("WALCL")
    tga = fetch_fred("WTREGEN")
    rrp = fetch_fred("RRPONTSYD")
    print(f"  walcl={len(walcl)} obs, tga={len(tga)} obs, rrp={len(rrp)} obs", file=sys.stderr)

    # Build synthetic series: align on WALCL's weekly Wed dates.
    # For each WALCL date, find the most-recent prior or same-day TGA and RRP value.
    walcl_dates = sorted(d for d in walcl if d >= START)
    tga_dates = sorted(tga.keys())
    rrp_dates = sorted(rrp.keys())

    def latest_at_or_before(target, sorted_keys, lookup):
        # binary search would be tidier but linear suffices at this size
        v = None
        for k in sorted_keys:
            if k <= target:
                v = lookup[k]
            else:
                break
        return v

    synth = []  # (date, value) in $millions
    for d in walcl_dates:
        t = latest_at_or_before(d, tga_dates, tga)
        r = latest_at_or_before(d, rrp_dates, rrp)
        if t is None or r is None:
            continue
        synth.append((d, walcl[d] - t - r))

    print(f"  synthetic_net_liq: {len(synth)} weekly observations", file=sys.stderr)

    # 30d delta distribution
    deltas = []
    parsed = [(datetime.fromisoformat(d), v) for d, v in synth]
    for i, (d_curr, v_curr) in enumerate(parsed):
        target = d_curr - timedelta(days=30)
        prior = None
        for j in range(i - 1, -1, -1):
            if parsed[j][0] <= target:
                prior = parsed[j][1]
                break
        if prior is not None:
            deltas.append(v_curr - prior)

    return {
        "synthetic": "fed_net_liquidity = WALCL - TGA - RRPONTSYD",
        "units": "$millions",
        "n_obs": len(synth),
        "current_raw": synth[-1][1] if synth else None,
        "current_date": synth[-1][0] if synth else None,
        "delta30d_distribution": summarize(deltas),
    }


def gold_btc_ratio_audit():
    print("Fetching CoinGecko histories (gold=pax-gold, btc=bitcoin)...", file=sys.stderr)
    gold = fetch_coingecko("pax-gold")
    time.sleep(2)  # be polite
    btc = fetch_coingecko("bitcoin")
    print(f"  gold={len(gold)} days, btc={len(btc)} days", file=sys.stderr)

    # Align by date
    aligned = []  # (date, ratio)
    for d in sorted(set(gold.keys()) & set(btc.keys())):
        if d < START:
            continue
        if btc[d] == 0:
            continue
        aligned.append((d, gold[d] / btc[d]))

    print(f"  ratio: {len(aligned)} aligned daily observations", file=sys.stderr)

    # 30d pct change distribution
    pcts = []
    parsed = [(datetime.fromisoformat(d), v) for d, v in aligned]
    for i, (d_curr, v_curr) in enumerate(parsed):
        target = d_curr - timedelta(days=30)
        prior = None
        for j in range(i - 1, -1, -1):
            if parsed[j][0] <= target:
                prior = parsed[j][1]
                break
        if prior is not None and prior != 0:
            pcts.append((v_curr - prior) / prior * 100)

    return {
        "synthetic": "gold_btc_ratio = gold / btc",
        "units": "ratio (BTC per ounce gold)",
        "n_obs": len(aligned),
        "current_raw": aligned[-1][1] if aligned else None,
        "current_date": aligned[-1][0] if aligned else None,
        "delta30d_pct_distribution": summarize(pcts),
    }


def main():
    out = {}
    out["fed_net_liquidity"] = fed_net_liquidity_audit()
    out["gold_btc_ratio"] = gold_btc_ratio_audit()
    with open(OUT_PATH, "w", encoding="utf-8") as f:
        json.dump(out, f, indent=2)
    print(f"\nWrote -> {OUT_PATH}")
    # Also pretty-print key results to stdout
    for sid, r in out.items():
        print(f"\n=== {sid} ===")
        print(f"  obs={r['n_obs']}  current={r['current_raw']:.4g} ({r.get('current_date','?')})")
        for key in ("delta30d_distribution", "delta30d_pct_distribution"):
            d = r.get(key)
            if d:
                print(f"  {key}: n={d['n']} p10={d['p10']:.4g} p25={d['p25']:.4g} p50={d['p50']:.4g} p75={d['p75']:.4g} p90={d['p90']:.4g} p99={d['p99']:.4g}")
                print(f"    rising p50={d['rising']['p50'] or 0:.4g} p90={d['rising']['p90'] or 0:.4g} p99={d['rising']['p99'] or 0:.4g} max={d['rising']['max'] or 0:.4g}")
                print(f"    falling p50={d['falling']['p50'] or 0:.4g} p90={d['falling']['p90'] or 0:.4g} p99={d['falling']['p99'] or 0:.4g} max={d['falling']['max'] or 0:.4g}")


if __name__ == "__main__":
    main()
