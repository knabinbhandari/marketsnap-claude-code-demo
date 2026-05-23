#!/usr/bin/env bash
#
# Stop hook. Self-improving CLAUDE.md.
#
# Fires once when Claude finishes responding. Reviews what happened in the
# session and writes proposed CLAUDE.md changes to a markdown file you can
# review on your own schedule. Per Anthropic's article: "a stop hook can
# reflect on what happened during a session and propose CLAUDE.md updates
# while the context is fresh."
#
# Gotcha: keep this hook passive. Do NOT have it trigger commands that
# Claude reacts to (creates an infinite loop). Use the stop_hook_active
# field to break out if you do.
#
# This placeholder is a no-op so the screenshot in the video shows a real
# hooks setup wired into settings.json. Real implementation would call a
# separate headless Claude session to do the reflection.

exit 0
