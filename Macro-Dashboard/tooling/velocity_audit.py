"""
Phase 0 of velocity-logic implementation.
Pull FRED series and compute distributions of velocity primitives (|delta(window)|)
over 2024-2026. Output: /tmp/velocity_summary.json.

Each indicator gets:
- abs distribution (already have in fred_summary.json — included for completeness)
- delta distributions for windows declared in WINDOWS_PER_SERIES
- pctChange distributions where meaningful
- For each window: p50, p90, p95, p99 of |move|
- For directional moves (rising vs falling): same quantiles split by sign
"""
import csv
import json
import statistics
import subprocess
import io
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import date, datetime, timedelta

OUT_PATH = r"c:\Users\GC\Documents\Ai Playground\AI\Clawdbot aka Openclaw\Macro-Dashboard\audits\velocity_summary.json"
START = "2024-01-01"

# Per-series velocity windows to compute.
# Format: list of (label, days). Days = calendar days; we walk the series for nearest prior obs.
# For weekly/monthly series, windows are still expressed in days but we use observation-step instead of calendar-step.
WINDOWS = {
    # Daily series — short and medium windows
    "DGS10":        [("1d", 1), ("5d", 5), ("20d", 20)],
    "DGS2":         [("1d", 1), ("5d", 5), ("20d", 20)],
    "T10Y2Y":       [("5d", 5), ("30d", 30)],            # dis-inversion 30d
    "T10Y3M":       [("5d", 5), ("30d", 30)],
    "BAMLH0A0HYM2": [("1d", 1), ("5d", 5), ("20d", 20)], # widening velocity
    "BAMLC0A0CM":   [("5d", 5), ("20d", 20)],
    "DFII10":       [("5d", 5), ("30d", 30)],
    "T5YIFR":       [("10d", 10), ("30d", 30)],          # un-anchoring
    "T5YIE":        [("10d", 10), ("30d", 30)],
    "T10YIE":       [("10d", 10), ("30d", 30)],
    "RRPONTSYD":    [("5d", 5), ("30d", 30)],
    "WTREGEN":      [("30d", 30)],                       # TGA 30d build/spend (weekly data, ~4 obs)
    "VIXCLS":       [("1d", 1), ("5d", 5)],
    "DTWEXBGS":     [("5d", 5), ("20d", 20)],
    "DEXJPUS":      [("5d", 5), ("20d", 20)],
    "DCOILWTICO":   [("5d", 5), ("20d", 20)],
    "SOFR":         [("1d", 1), ("5d", 5)],              # spread vs IORB computed elsewhere
    "IORB":         [("30d", 30)],                       # for context — Fed change cadence
    # Weekly series
    "WALCL":        [("4w", 28), ("12w", 84)],           # QT pace
    "WRESBAL":      [("4w", 28), ("12w", 84)],
    "IC4WSA":       [("12w", 84)],                       # vs 12w ago
    "CCSA":         [("12w", 84)],
    "BUSLOANS":     [("yoy", 365)],                      # YoY
    # Monthly — narrow window options
    "PCOPPUSDM":    [("3m", 90)],
    # Session 75 additions (2026-05-10) — calibration debt audit
    # Daily series
    "EFFR":         [("1d", 1), ("5d", 5)],              # spread vs IORB; 5d kick on rising
    "DTB3":         [("5d", 5), ("20d", 20)],            # 3M T-Bill (peer-aware vs EFFR)
    "BAMLH0A3HYC":  [("1d", 1), ("5d", 5), ("20d", 20)], # CCC HY OAS — distress-tier
    "BAMLEMCBPIOAS":[("5d", 5), ("20d", 20)],            # EM Corp OAS
    "DGS30":        [("1d", 1), ("5d", 5), ("20d", 20)], # 30Y Yield
    "DFII30":       [("5d", 5), ("30d", 30)],            # 30Y Real Yield
    "DCOILBRENTEU": [("5d", 5), ("20d", 20)],            # Brent
    "DHHNGSP":      [("5d", 5), ("30d", 30)],            # Natural Gas (Henry Hub)
    # Weekly series
    "DPSACBW027SBOG": [("12w", 84), ("yoy", 365)],       # Bank Deposits — banking-system canary
    "MORTGAGE30US": [("4w", 28), ("12w", 84)],           # 30Y Mortgage
    # Monthly series
    "CPIAUCSL":     [("yoy", 365)],                      # Headline CPI YoY
    "CPILFESL":     [("yoy", 365)],                      # Core CPI YoY
    "PERMIT":       [("3m", 90), ("yoy", 365)],          # Building permits — housing leading
}


def fetch_series(series_id):
    url = f"https://fred.stlouisfed.org/graph/fredgraph.csv?id={series_id}"
    last_err = ""
    for attempt in range(3):
        try:
            proc = subprocess.run(
                ["curl", "-sSL", "--http1.1",
                 "--max-time", "30", "--connect-timeout", "8",
                 "-A", "curl/8.0", url],
                capture_output=True, timeout=40,
            )
            if proc.returncode == 0:
                text = proc.stdout.decode("utf-8", errors="replace")
                break
            last_err = f"curl rc={proc.returncode}"
        except Exception as e:
            last_err = f"fetch failed: {e}"
        # backoff between retries
        import time
        time.sleep(2 + attempt * 2)
    else:
        return series_id, {"error": last_err}

    reader = csv.reader(io.StringIO(text))
    next(reader, None)
    series = []  # (date, value) pairs in chronological order
    for row in reader:
        if len(row) < 2:
            continue
        d, v = row[0], row[1]
        if v in (".", "", "NA", "ND"):
            continue
        try:
            f = float(v)
        except ValueError:
            continue
        if d >= START:
            series.append((d, f))
    if not series:
        return series_id, {"error": "no values"}
    return series_id, series


def quantile(sorted_vals, p):
    if not sorted_vals:
        return None
    idx = p * (len(sorted_vals) - 1)
    lo = int(idx)
    hi = min(lo + 1, len(sorted_vals) - 1)
    frac = idx - lo
    return sorted_vals[lo] * (1 - frac) + sorted_vals[hi] * frac


def compute_deltas(series, window_days):
    """For each observation, find the value `window_days` calendar-days prior
    (using nearest-prior observation if exact date missing). Return list of deltas."""
    parsed = [(datetime.fromisoformat(d), v) for d, v in series]
    deltas = []
    for i, (d_curr, v_curr) in enumerate(parsed):
        target = d_curr - timedelta(days=window_days)
        # walk backward to find nearest prior obs at or before target
        prior = None
        for j in range(i - 1, -1, -1):
            if parsed[j][0] <= target:
                prior = parsed[j][1]
                break
        if prior is None:
            continue
        deltas.append(v_curr - prior)
    return deltas


def summarize_deltas(deltas):
    if not deltas:
        return None
    abs_sorted = sorted(abs(d) for d in deltas)
    rising = sorted(d for d in deltas if d > 0)
    falling = sorted(-d for d in deltas if d < 0)
    return {
        "n": len(deltas),
        "abs": {
            "p50": quantile(abs_sorted, 0.50),
            "p75": quantile(abs_sorted, 0.75),
            "p90": quantile(abs_sorted, 0.90),
            "p95": quantile(abs_sorted, 0.95),
            "p99": quantile(abs_sorted, 0.99),
            "max": abs_sorted[-1],
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


def compute_pct_changes(series, window_days):
    """Same as compute_deltas but as % change."""
    parsed = [(datetime.fromisoformat(d), v) for d, v in series]
    pcts = []
    for i, (d_curr, v_curr) in enumerate(parsed):
        target = d_curr - timedelta(days=window_days)
        prior = None
        for j in range(i - 1, -1, -1):
            if parsed[j][0] <= target:
                prior = parsed[j][1]
                break
        if prior is None or prior == 0:
            continue
        pcts.append((v_curr - prior) / prior * 100)
    return pcts


def main():
    results = {}
    # Sequential — FRED rate-limits parallel requests aggressively
    for sid in WINDOWS:
        sid_out, payload = fetch_series(sid)
        if isinstance(payload, dict) and "error" in payload:
            results[sid] = payload
            print(f"[FAIL] {sid:14s} {payload['error']}", file=sys.stderr)
            continue
        series = payload
        entry = {"n_obs": len(series), "windows": {}}
        for label, days in WINDOWS[sid]:
            deltas = compute_deltas(series, days)
            pcts = compute_pct_changes(series, days)
            entry["windows"][label] = {
                "delta": summarize_deltas(deltas),
                "pct": summarize_deltas(pcts) if pcts else None,
            }
        results[sid] = entry
        print(f"[OK]   {sid:14s} obs={len(series):4d}")

    with open(OUT_PATH, "w") as f:
        json.dump(results, f, indent=2)
    print(f"\nWrote -> {OUT_PATH}")


if __name__ == "__main__":
    main()
