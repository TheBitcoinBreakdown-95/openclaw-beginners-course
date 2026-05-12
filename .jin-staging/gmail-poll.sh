#!/bin/bash
# Wrapper for gmail-poll.py — sources gog env vars then runs the polling script.
set -e
. "$HOME/.gog-env"
exec /usr/bin/python3 "$HOME/bin/gmail-poll.py"
