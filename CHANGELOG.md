# Changelog

All notable changes to MarketSnap are documented here.

## [Unreleased]

### Added

- Reports tab in the customer dashboard.
- `add-database-migration` skill for the Prisma schema directory.
- Path-scoped `add-api-route` skill that scaffolds a tRPC procedure plus the matching agents-side tool wrapper in one step.

### Changed

- Default orchestrator model bumped to `claude-sonnet-4-6`.
- Bumped haiku to `claude-haiku-4-5-20251001` for sub-1K-token tool calls.

### Removed

- Old `single-file-refactor` rule from `agents/CLAUDE.md`. New models do better with coordinated cross-file edits and the rule was blocking them.

## [0.1.0] - 2026-04-12

### Added

- Initial dashboard scaffold (Next.js 15, app router, shadcn/ui, Tailwind).
- Initial agents scaffold (Anthropic SDK, tool registry, Stripe + Email + Customer-lookup tools).
- Prisma schema for User, Subscription, Report.
- Self-improving CLAUDE.md via Stop hook.
- Team-context loader via SessionStart hook.
