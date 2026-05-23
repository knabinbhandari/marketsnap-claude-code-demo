---
name: add-api-route
description: Scaffold a new tRPC API route in the dashboard with the matching agents-side tool wrapper. Use when adding a new endpoint that the agent layer needs to call.
paths:
  - "agents/**"
  - "dashboard/app/api/**"
---

# Add API Route

## Steps

1. Create the tRPC procedure file at `dashboard/app/api/[domain]/route.ts`.
2. Define the input and output schemas with zod.
3. Add the matching tool wrapper at `agents/tools/[domain].ts`.
4. Register the tool in `agents/orchestrator.ts`.
5. Add an integration test at `dashboard/app/api/[domain]/route.test.ts`.

## Conventions

- Use camelCase for procedure names.
- Inputs and outputs are always zod-validated.
- Tool wrappers throw on non-2xx responses, never return error envelopes.
- If the route touches Stripe data, route it through `agents/tools/stripe.ts` and respect the masked-id rule in `agents/CLAUDE.md`.
