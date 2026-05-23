#!/usr/bin/env bash
#
# SessionStart hook.
#
# Loads team-specific context dynamically at the beginning of every Claude
# Code session. Anthropic's framing: "a start hook can load team-specific
# context dynamically so every developer gets the right setup for their
# module without manual configuration."
#
# What this script surfaces:
#   - The current working directory (so Claude knows which subtree this
#     session is rooted in).
#   - Recent git activity on the current branch.
#   - Whether the working tree is clean.
#
# All output is JSON on stdout. Claude Code merges it into the session
# context. Keep this fast; it runs every time you start a session.

set -euo pipefail

cwd=$(pwd)
branch=$(git symbolic-ref --short HEAD 2>/dev/null || echo "detached")
recent=$(git log --oneline -n 5 2>/dev/null || echo "no commits yet")
status=$(git status --porcelain 2>/dev/null)

clean="clean"
if [[ -n "$status" ]]; then
  clean="dirty"
fi

cat <<EOF
{
  "session_start_context": {
    "cwd": "$cwd",
    "branch": "$branch",
    "tree_state": "$clean",
    "recent_commits": $(echo "$recent" | jq -R -s -c 'split("\n") | map(select(length > 0))')
  }
}
EOF
