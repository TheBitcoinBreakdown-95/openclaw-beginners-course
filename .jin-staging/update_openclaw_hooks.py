#!/usr/bin/env python3
"""Add hooks.gmail mapping to ~/.openclaw/openclaw.json (idempotent, backed up)."""
import json
import shutil
import sys
from pathlib import Path

CONFIG = Path.home() / ".openclaw/openclaw.json"
BACKUP = Path.home() / ".openclaw/openclaw.json.pre-gmail-hooks"
TOKEN_FILE = Path.home() / ".config/gogcli/openclaw-hook-token"

token = TOKEN_FILE.read_text().strip()
cfg = json.loads(CONFIG.read_text())

shutil.copy2(CONFIG, BACKUP)

hooks = cfg.setdefault("hooks", {})
hooks["enabled"] = True
hooks["token"] = token
hooks["path"] = hooks.get("path", "/hooks")
hooks.setdefault("presets", [])
if "gmail" not in hooks["presets"]:
    hooks["presets"].append("gmail")

hooks.setdefault("mappings", [])
existing_gmail_mapping = next(
    (m for m in hooks["mappings"] if m.get("match", {}).get("path") == "gmail"),
    None,
)
gmail_mapping = {
    "match": {"path": "gmail"},
    "action": "agent",
    "wakeMode": "now",
    "name": "Gmail",
    "sessionKey": "hook:gmail:{{messages[0].id}}",
    "messageTemplate": (
        "New email from {{messages[0].from}}\n"
        "Subject: {{messages[0].subject}}\n\n"
        "{{messages[0].snippet}}\n\n"
        "{{messages[0].body}}"
    ),
    "deliver": True,
    "channel": "telegram",
}
if existing_gmail_mapping:
    existing_gmail_mapping.update(gmail_mapping)
else:
    hooks["mappings"].append(gmail_mapping)

CONFIG.write_text(json.dumps(cfg, indent=2) + "\n")
print(f"backup at {BACKUP}")
print(f"hooks.enabled = {cfg['hooks']['enabled']}")
print(f"hooks.path = {cfg['hooks']['path']}")
print(f"hooks.presets = {cfg['hooks']['presets']}")
print(f"hooks.mappings count = {len(cfg['hooks']['mappings'])}")
