---
name: review-pr
description: Run a structured review on a pull request diff. Use when the user asks "review this PR" or pastes a diff and wants substantive feedback, not just lint nitpicks.
---

# Review PR

A structured PR review pass. Goes beyond syntax to ask the questions a senior reviewer would ask.

## Pass 1: Intent

- What is this PR trying to do, in one sentence?
- Does the diff actually do that, or does it do more / less?
- Is the scope right, or should this be split into multiple PRs?

## Pass 2: Correctness

- Walk every non-trivial code path. Are the inputs and outputs typed?
- Are error cases handled, or do they bubble up as unhandled rejections?
- For data changes: is the migration backwards-compatible? See the `add-database-migration` skill for the rules.
- For changes that touch Stripe or payment data: does the diff respect `agents/CLAUDE.md` (use `maskedCardId`, never log raw PANs)?
- Are there race conditions in concurrent code paths?

## Pass 3: Tests

- Is there at least one test that fails before the change and passes after?
- For new tools or routers: integration tests, not just unit tests.
- Are the tests asserting behaviour, or just exercising lines for coverage?

## Pass 4: Conventions

- Does the diff respect the relevant subtree's `CLAUDE.md`?
- If the diff touches a folder with a path-scoped skill (see `.claude/skills/`), did the author follow it?

## Pass 5: Maintainability

- Will a developer who's never seen this code understand it in six months?
- Are there comments that explain WHY (kept) vs WHAT (cut)?
- Is anything in the diff load-bearing that doesn't have a test?

## Output

Return findings grouped by Pass. For each finding, label as one of:
- BLOCKING (must fix before merge)
- NIT (suggested but optional)
- QUESTION (asks for clarification, not a request to change)
