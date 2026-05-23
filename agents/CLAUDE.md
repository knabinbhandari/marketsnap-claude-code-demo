# Agents conventions

## Stack

TypeScript. Anthropic SDK. The orchestrator lives in `src/orchestrator.ts`, individual tools in `src/tools/`, prompts in `prompts/`. Tests in `tests/`.

## Model picker

- Orchestrator calls: `claude-sonnet-4-6` (default).
- One-shot tool calls under 1K tokens: `claude-haiku-4-5-20251001`.
- Long-context summarization or planning: `claude-opus-4-7`.
- Never call models by alias. Always pin the full version string.
- Model constants live in `src/orchestrator.ts` under `MODELS`.

## Tool registry

Every tool exports a `Tool` (see `src/types.ts`) from its own file under `src/tools/`. Register it by appending to the array in `src/tools/index.ts`. The orchestrator iterates that array to build the tool list it sends to Claude.

When adding a new tool, also run the `add-api-route` skill if the tool talks to the dashboard via tRPC, so the matching `dashboard/server/routers/<domain>.ts` procedure gets scaffolded in the same flow.

## Prompt versioning

Every prompt file in `prompts/` has a top-of-file comment with the version (`// v3, 2026-04-12`) and a one-line changelog entry below it.

## Gotchas

For payment-related code (anything touching the Stripe tool), never log the raw card number. Use `maskedCardId` from `src/tools/stripe.ts` before any card identifier leaves the tool boundary. The pino logger in `src/lib/log.ts` redacts known PAN field names, but the helper is the primary defense. This is repo-specific, there's no other system catching it.

## Commands

Test (agents only): `pnpm --filter agents test`
Lint (agents only): `pnpm --filter agents lint`
Dev (watch): `pnpm --filter agents dev`
