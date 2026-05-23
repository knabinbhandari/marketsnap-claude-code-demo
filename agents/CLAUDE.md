# Agents conventions

## Stack

TypeScript. Anthropic SDK. The orchestrator lives in `orchestrator.ts`, individual tools in `tools/`, prompts in `prompts/`.

## Model picker

- Orchestrator calls: `claude-sonnet-4-6` (default).
- One-shot tool calls under 1K tokens: `claude-haiku-4-5-20251001`.
- Long-context summarization or planning: `claude-opus-4-7`.
- Never call models by alias. Always pin the full version string.

## Prompt versioning

Every prompt file in `prompts/` has a top-of-file comment with the version (`// v3, 2026-04-12`) and a one-line changelog entry below it.

## Gotchas

For payment-related code (anything touching the Stripe tool), never log the raw card number. Use the masked-id helper in `tools/stripe.ts`. This is repo-specific, there's no other system catching it.

## Commands

Test (agents only): `pnpm --filter agents test`
Lint (agents only): `pnpm --filter agents lint`
