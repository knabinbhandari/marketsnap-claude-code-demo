# Dashboard conventions

## Stack

Next.js 15 (app router). shadcn/ui for components. Tailwind. tRPC for API calls into the agents layer.

## Routing

Customer-facing routes live in `app/(customer)/`. Admin routes in `app/(admin)/`. Auth-required pages use the `(authed)` group layout.

## Components

Use shadcn primitives over building from scratch. New components go in `components/` with a colocated `.test.tsx` file.

## Commands

Test (dashboard only): `pnpm --filter dashboard test`
Lint (dashboard only): `pnpm --filter dashboard lint`
Dev server: `pnpm --filter dashboard dev`
