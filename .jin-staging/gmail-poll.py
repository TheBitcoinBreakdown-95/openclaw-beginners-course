#!/usr/bin/env python3
"""Poll gc@freedomlab.nyc inbox for new mail and POST to OpenClaw /hooks/gmail.

Runs every 2 min via cron. Tracks last-seen state in JSON. Idempotent —
duplicate IDs are skipped via seen_ids ring buffer.
"""
import json
import os
import subprocess
import time
import urllib.error
import urllib.request
from pathlib import Path

ACCOUNT = "gc@freedomlab.nyc"
HOOK_URL = "http://127.0.0.1:18789/hooks/gmail"
HOOK_TOKEN_FILE = Path.home() / ".config/gogcli/openclaw-hook-token"
STATE_FILE = Path.home() / ".config/gogcli/gmail-poll-state.json"
GOG = str(Path.home() / "bin/gog")
LOG_FILE = Path.home() / ".local/share/gmail-poll/poll.log"
LOG_FILE.parent.mkdir(parents=True, exist_ok=True)

INITIAL_LOOKBACK_SEC = 300  # on first run, look back 5 min (avoids flooding from old mail)
MAX_PER_POLL = 20
BODY_TRUNCATE = 5000
SEEN_IDS_KEEP = 200


def log(msg: str) -> None:
    ts = time.strftime("%Y-%m-%d %H:%M:%S")
    with LOG_FILE.open("a") as f:
        f.write(f"{ts} {msg}\n")


def load_state() -> dict:
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text())
    return {
        "last_seen_internal_date": (int(time.time()) - INITIAL_LOOKBACK_SEC) * 1000,
        "seen_ids": [],
    }


def save_state(state: dict) -> None:
    STATE_FILE.write_text(json.dumps(state))


def fetch_messages(last_seen_ts_sec: int) -> list[dict]:
    query = f"in:inbox after:{last_seen_ts_sec}"
    result = subprocess.run(
        [
            GOG, "gmail", "messages", "search", query,
            "--account", ACCOUNT,
            "--json",
            "--max", str(MAX_PER_POLL),
        ],
        capture_output=True, text=True, env=os.environ,
    )
    if result.returncode != 0:
        log(f"gog search failed rc={result.returncode}: {result.stderr[:500]}")
        return []
    stdout = result.stdout.strip()
    if not stdout:
        return []
    try:
        data = json.loads(stdout)
    except json.JSONDecodeError as e:
        log(f"gog json decode failed: {e}: {stdout[:500]}")
        return []
    # gog response shape varies — try both
    if isinstance(data, list):
        return data
    return data.get("results") or data.get("messages") or []


def post_hook(msg: dict, token: str) -> tuple[int, str]:
    body = msg.get("body") or msg.get("plainBody") or msg.get("textBody") or ""
    payload = {
        "messages": [{
            "id": msg.get("id"),
            "from": msg.get("from", "unknown"),
            "subject": msg.get("subject", "(no subject)"),
            "snippet": msg.get("snippet", ""),
            "body": body[:BODY_TRUNCATE],
        }],
    }
    req = urllib.request.Request(
        HOOK_URL,
        data=json.dumps(payload).encode(),
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {token}",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return resp.status, resp.read().decode()[:200]
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode()[:200]
    except Exception as e:  # noqa: BLE001
        return 0, str(e)[:200]


def main() -> None:
    if not HOOK_TOKEN_FILE.exists():
        log("hook token file missing — aborting")
        return
    token = HOOK_TOKEN_FILE.read_text().strip()
    state = load_state()
    last_seen_ts_sec = state["last_seen_internal_date"] // 1000

    messages = fetch_messages(last_seen_ts_sec)
    if not messages:
        log(f"poll: 0 new messages (after={last_seen_ts_sec})")
        return

    seen_ids = set(state.get("seen_ids", []))
    new_seen: list[str] = []
    max_internal_date = state["last_seen_internal_date"]
    posted = 0
    for msg in messages:
        mid = msg.get("id")
        if not mid or mid in seen_ids:
            continue
        status, body = post_hook(msg, token)
        log(
            f"POST {mid} from={msg.get('from','?')[:40]} "
            f"subject={msg.get('subject','?')[:50]} -> {status} {body[:80]}"
        )
        if 200 <= status < 300:
            new_seen.append(mid)
            posted += 1
            idate = int(msg.get("internalDate", 0))
            if idate > max_internal_date:
                max_internal_date = idate

    log(f"poll: {len(messages)} found, {posted} posted, {len(messages) - posted} skipped")

    state["last_seen_internal_date"] = max_internal_date
    state["seen_ids"] = list((seen_ids | set(new_seen)))[-SEEN_IDS_KEEP:]
    save_state(state)


if __name__ == "__main__":
    main()
