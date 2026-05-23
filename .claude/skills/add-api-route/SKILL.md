---
name: add-api-route
description: Scaffold a new tRPC procedure in the dashboard plus the matching agents-side tool wrapper. Use when adding an endpoint the agent layer needs to call.
paths:
  - "agents/src/tools/**"
  - "dashboard/server/routers/**"
  - "dashboard/app/api/**"
---

# Add API Route

Two-sided scaffold: a tRPC procedure on the dashboard side, plus the tool wrapper the agents layer calls into.

## Steps

1. Pick a domain name. One word, kebab-case if multi-word (e.g. `customer-lookup`, `reports`).
2. Add the tRPC procedure in `dashboard/server/routers/<domain>.ts`. Mount it on the root router in `dashboard/server/router.ts`.
3. Define inputs and outputs with zod. Use `protectedProcedure` unless the route is genuinely public.
4. Add the tool wrapper in `agents/src/tools/<domain>.ts`. Export a `Tool` per the `Tool` contract in `agents/src/types.ts`.
5. Register the tool in `agents/src/tools/index.ts` by importing and appending to the `tools` array.
6. Add an integration test in `agents/tests/<domain>.test.ts` (or alongside the procedure on the dashboard side, depending on what's being tested).
7. Update `CHANGELOG.md` under `[Unreleased]`.

## Conventions

- Procedure names: `camelCase`.
- Tool names: `<domain>.<verb>` (e.g. `customer.lookup`, `reports.create`).
- Inputs and outputs are always zod-validated.
- Tool wrappers throw on non-2xx responses, never return error envelopes.
- If the route touches Stripe data, route it through `agents/src/tools/stripe.ts` and respect the masked-id rule in `agents/CLAUDE.md`.
