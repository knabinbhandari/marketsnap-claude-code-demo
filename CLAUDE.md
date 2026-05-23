# MarketSnap

AI-powered customer insights for small SaaS teams.

## Where things live

- `dashboard/` Next.js 15 customer dashboard. UI, routing, billing, tRPC API, Prisma schema.
- `agents/` TypeScript agent layer. Orchestrator, tools, prompts.

## Repo-wide gotcha

Env vars are loaded via `dotenv-flow` at the root. Never hard-code keys. New vars go in `.env.local` for dev and the deploy pipeline for prod. Add the variable to `.env.example` first so the team has a template.

## Commands

Test all: `pnpm test`
Lint all: `pnpm lint`
Dev (dashboard only): `pnpm --filter dashboard dev`
Dev (agents only): `pnpm --filter agents dev`
