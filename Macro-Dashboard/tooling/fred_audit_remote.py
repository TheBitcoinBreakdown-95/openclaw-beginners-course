"""
Remote-version: runs on Jinn. Pulls FRED CSVs via curl (works from Jinn),
computes percentile distribution, writes /tmp/fred_summary.json.
"""
import csv
import json
import statistics
import subprocess
import io
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import date

OUT_PATH = "/tmp/fred_summary.json"

SERIES = {
    "DGS10":          ("10Y Yield",        "%"),
    "DGS2":           ("2Y Yield",         "%"),
    "T10Y2Y":         ("2s10s Curve",      "pct points (1.0 = 100bp)"),
    "T10Y3M":         ("3m10y Curve",      "pct points"),
    "BAMLH0A0HYM2":   ("HY OAS",           "% (1.0 = 100bp)"),
    "BAMLC0A0CM":     ("IG OAS",           "%"),
    "DFII10":         ("10Y Real Yield",   "%"),
    "T5YIFR":         ("5y5y Inflation",   "%"),
    "T5YIE":          ("5Y Breakeven",     "%"),
    "T10YIE":         ("10Y Breakeven",    "%"),
    "RRPONTSYD":      ("ON RRP",           "$ millions"),
    "WTREGEN":        ("TGA",              "$ millions (weekly)"),
    "VIXCLS":         ("VIX",              "index"),
    "DTWEXBGS":       ("Broad Dollar",     "index (Jan 2006 = 100)"),
    "DEXJPUS":        ("USDJPY",           "rate"),
    "DCOILWTICO":     ("WTI Crude",        "$/bbl"),
    "SOFR":           ("SOFR",             "%"),
    "IORB":           ("IORB",             "%"),
    "WALCL":          ("Fed Balance Sheet","$ millions (weekly)"),
    "WRESBAL":        ("Bank Reserves",    "$ millions (weekly)"),
    "IC4WSA":         ("Jobless 4WMA",     "people"),
    "CCSA":           ("Continuing Claims","people (weekly)"),
    "BUSLOANS":       ("C&I Loans",        "$ billions (weekly)"),
    "PCOPPUSDM":      ("Copper",           "$/MT (monthly)"),
    # Session 75 additions (2026-05-10) — calibration debt audit
    "EFFR":           ("EFFR",             "%"),
    "DTB3":           ("3M T-Bill",        "%"),
    "BAMLH0A3HYC":    ("CCC HY OAS",       "% (1.0 = 100bp)"),
    "BAMLEMCBPIOAS":  ("EM Corp OAS",      "% (1.0 = 100bp)"),
    "DPSACBW027SBOG": ("Bank Deposits",    "$ billions (weekly)"),
    "MORTGAGE30US":   ("30Y Mortgage",     "% (weekly)"),
    "DGS30":          ("30Y Yield",        "%"),
    "DFII30":         ("30Y Real Yield",   "%"),
    "CPIAUCSL":       ("CPI (level)",      "index (monthly)"),
    "CPILFESL":       ("Core CPI (level)", "index (monthly)"),
    "PERMIT":         ("Building Permits", "k SAAR (monthly)"),
    "DCOILBRENTEU":   ("Brent Crude",      "$/bbl"),
    "DHHNGSP":        ("Natural Gas HH",   "$/MMBTU"),
}

START = "2024-01-01"
TODAY = date.today().isoformat()


def fetch(series_id):
    # Match working fetcher in macro/fetchers.js: no cosd/coed (FRED hangs on those),
    # -A curl/8.0, --connect-timeout 5. Filter to 2024+ client-side.
    url = f"https://fred.stlouisfed.org/graph/fredgraph.csv?id={series_id}"
    try:
        proc = subprocess.run(
            [
                "curl", "-sSL", "--http1.1",
                "--max-time", "20", "--connect-timeout", "5",
                "-A", "curl/8.0", url,
            ],
            capture_output=True, timeout=30,
        )
        if proc.returncode != 0:
            return series_id, {"error": f"curl rc={proc.returncode}"}
        text = proc.stdout.decode("utf-8", errors="replace")
    except Exception as e:
        return series_id, {"error": f"fetch failed: {e}"}

    reader = csv.reader(io.StringIO(text))
    next(reader, None)
    values = []  # 2024+ for distribution
    all_values = []  # full series for current value lookup
    last_date = None
    last_value = None
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
        all_values.append((d, f))
        last_date = d
        last_value = f
        if d >= START:
            values.append(f)

    if not values:
        return series_id, {"error": "no numeric values"}

    label, units = SERIES[series_id]
    s = sorted(values)

    def pct(p):
        idx = p * (len(s) - 1)
        lo = int(idx)
        hi = min(lo + 1, len(s) - 1)
        frac = idx - lo
        return s[lo] * (1 - frac) + s[hi] * frac

    return series_id, {
        "label": label,
        "units": units,
        "n": len(values),
        "min": s[0],
        "p10": pct(0.10),
        "p25": pct(0.25),
        "p50": pct(0.50),
        "p75": pct(0.75),
        "p90": pct(0.90),
        "max": s[-1],
        "mean": statistics.mean(values),
        "stdev": statistics.pstdev(values),
        "current": last_value,
        "current_date": last_date,
    }


def main():
    results = {}
    with ThreadPoolExecutor(max_workers=6) as pool:
        futures = {pool.submit(fetch, sid): sid for sid in SERIES}
        for fut in as_completed(futures):
            sid_input = futures[fut]
            try:
                sid, data = fut.result()
            except Exception as e:
                sid, data = sid_input, {"error": f"unhandled: {e}"}
            results[sid] = data
            tag = data.get("label", sid) if isinstance(data, dict) else sid
            if "error" in data:
                print(f"[FAIL] {sid:14s} {tag:24s} {data['error']}", file=sys.stderr)
            else:
                print(f"[OK]   {sid:14s} {tag:24s} n={data['n']:5d} cur={data['current']:.4g} p50={data['p50']:.4g}")

    with open(OUT_PATH, "w") as f:
        json.dump(results, f, indent=2)
    print(f"\nWrote -> {OUT_PATH}")


if __name__ == "__main__":
    main()
