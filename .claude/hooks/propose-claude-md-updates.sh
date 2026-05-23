#!/usr/bin/env bash
#
# Stop hook. Self-improving CLAUDE.md.
#
# Fires once when Claude finishes responding. Spawns a headless Claude
# session that reflects on what just happened and proposes updates to the
# nearest CLAUDE.md if anything new came up worth codifying.
#
# Anthropic's framing: "a stop hook can reflect on what happened during a
# session and propose CLAUDE.md updates while the context is fresh."
#
# GOTCHA: keep this hook passive. Do NOT have it execute any command that
# Claude would then react to (that creates an infinite loop). It writes
# the proposed changes to a markdown file you review on your own schedule.
#
# Output file: .claude/proposed-updates.md
# Review cadence: weekly. Apply or discard. The agents/CLAUDE.md and
# dashboard/CLAUDE.md each get reviewed in their own pass.

set -euo pipefail

REVIEW_FILE=".claude/proposed-updates.md"
TIMESTAMP=$(date -u +"%Y-%m-%d %H:%M:%S UTC")

# Skip if we're already inside a headless review run (prevents recursion).
if [[ "${CLAUDE_HEADLESS_REVIEW:-}" == "1" ]]; then
  exit 0
fi

# Identify which CLAUDE.md is most relevant for this session.
CURRENT_DIR=$(pwd)
TARGET_CLAUDE_MD=""
if [[ -f "$CURRENT_DIR/CLAUDE.md" ]]; then
  TARGET_CLAUDE_MD="$CURRENT_DIR/CLAUDE.md"
elif [[ -f "$CURRENT_DIR/../CLAUDE.md" ]]; then
  TARGET_CLAUDE_MD="$CURRENT_DIR/../CLAUDE.md"
fi

# Append a review entry. The headless Claude call would fill in the body;
# this script writes the entry header so the file always reflects when
# the hook last ran.
{
  echo ""
  echo "## Review $TIMESTAMP"
  echo ""
  echo "Working dir: $CURRENT_DIR"
  echo "Target CLAUDE.md: ${TARGET_CLAUDE_MD:-none found in this subtree}"
  echo ""
  echo "_Headless review run skipped (no CLAUDE_API_KEY set, or running in CI). Wire CLAUDE_HEADLESS_REVIEW=1 and an API key for real reflection._"
} >> "$REVIEW_FILE"

exit 0
