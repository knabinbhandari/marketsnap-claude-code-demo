# MarketSnap

Small AI SaaS. Customer dashboard plus an AI agent layer behind it.

## Where things live

- `dashboard/` — Next.js customer dashboard. UI, routing, billing screens.
- `agents/` — TypeScript agent layer. Orchestrator, tools, prompts.

## Repo-wide gotcha

Env vars are loaded via `dotenv-flow` at the root. Never hard-code keys. New vars go in `.env.local` for dev and the deploy pipeline for prod.

## Commands

Test all: `pnpm test`
Lint all: `pnpm lint`
Dev server (dashboard only): `pnpm --filter dashboard dev`
