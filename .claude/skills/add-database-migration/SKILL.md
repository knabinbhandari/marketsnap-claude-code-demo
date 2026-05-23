---
name: add-database-migration
description: Add a new Prisma migration for the dashboard schema. Use when changing the data model, adding/altering tables, or adding indexes.
paths:
  - "dashboard/prisma/**"
---

# Add Database Migration

## Steps

1. Edit `dashboard/prisma/schema.prisma` with the model change.
2. Run `pnpm --filter dashboard db:migrate -- --name <descriptive-snake-case-name>` to generate the migration.
3. Inspect the generated SQL under `dashboard/prisma/migrations/<timestamp>_<name>/migration.sql`. Edit if Prisma's default doesn't match what you want (e.g. you need a specific index name, or a backfill step).
4. Run `pnpm --filter dashboard db:generate` to refresh the Prisma client types.
5. Update any tRPC routers or agent tools that consume the changed model. The TypeScript will fail to compile until you do; let it guide you.
6. If the migration is non-trivial (adds NOT NULL on existing rows, drops a column with live readers, renames a column), open a draft PR and tag a second reviewer before merging.
7. Update `CHANGELOG.md` under `[Unreleased]`.

## Safety

- Never edit a migration after it's been applied to any shared environment. Create a new migration that supersedes it instead.
- For destructive changes (DROP, ALTER COLUMN TYPE), make them backwards-compatible across one release cycle: add the new shape, dual-write, migrate readers, then remove the old shape in the next release.
- Always run the migration locally against a fresh database (`pnpm --filter dashboard db:migrate reset`) before pushing.
