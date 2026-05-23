# MarketSnap (BLOATED — DO NOT USE, EXAMPLE ONLY)

This file is intentionally bad. It is the "what NOT to do" version of CLAUDE.md used in the video's pruning demo. Claude does NOT load this file (different filename on purpose). The real root rules live in `CLAUDE.md`.

## General coding style

- Use camelCase for variable names.
- Use PascalCase for type names and React components.
- Use SCREAMING_SNAKE_CASE for constants.
- Use kebab-case for file names.
- Prefer const over let, never use var.
- Two-space indentation, not tabs.
- Always include semicolons at end of statements.
- Use single quotes for strings unless template literal is needed.
- Always use strict equality (=== and !==), never == or !=.
- Avoid magic numbers, define named constants.
- Avoid deeply nested ternaries.
- Prefer early returns over nested conditionals.
- Use optional chaining (?.) where appropriate.
- Use nullish coalescing (??) for default values.
- Keep functions under 50 lines.
- One responsibility per function.
- Limit function arguments to 3, use an options object for more.
- Avoid global state.
- Prefer pure functions where possible.
- Avoid mutating function arguments.
- Prefer immutable data structures.
- Use spread syntax for shallow copies.
- Use destructuring for object/array access.
- Avoid `any` type in TypeScript.
- Use `unknown` instead of `any` for type-unsafe inputs.
- Always type function return values explicitly.
- Use interfaces for object shapes, types for unions and intersections.
- Avoid enum, use union of string literals instead.

## Workflow

- Always run tests before committing.
- Always run lint before committing.
- Use feature branches off main.
- Squash-merge to main, never merge commit.
- Write descriptive commit messages, imperative mood.
- Reference the issue number in every commit message.
- Open a draft PR early for visibility.
- Tag a reviewer when the PR is ready for review.
- Update the changelog before merging.
- Bump the version number on every release.
- Use conventional commits format.
- Never force-push to main.
- Never commit directly to main, always go through PR.
- Rebase your branch on main before opening a PR.
- Resolve all merge conflicts locally before pushing.

## Documentation

- Every public function needs a JSDoc comment.
- Every module needs a top-of-file summary comment.
- Update README.md when commands change.
- Update the architecture doc when structure changes.
- Add inline comments for any non-obvious logic.
- Document all environment variables in the README.
- Document all API endpoints in the API docs.
- Use proper grammar and punctuation in comments.
- Avoid commented-out code in commits.
- Remove TODO comments before merging to main.

## Testing

- Write unit tests for every utility function.
- Write integration tests for every API route.
- Write E2E tests for every critical user flow.
- Mock external APIs in unit tests.
- Use real DB in integration tests.
- Aim for 80%+ code coverage.
- Tests should be deterministic, no flaky tests.
- Test names should describe the behaviour being tested.
- Use AAA pattern (Arrange, Act, Assert).
- Group related tests with describe blocks.
- Use beforeEach for setup, afterEach for teardown.
- Avoid sharing state between tests.

## Dashboard rules

- Use Next.js 15 app router, never the pages router.
- Use shadcn/ui for components, prefer over building from scratch.
- Use Tailwind for styling, no CSS modules.
- Use tRPC for API calls between dashboard and agents.
- Customer-facing routes live in `app/(customer)/`.
- Admin routes live in `app/(admin)/`.
- Auth-required pages use the `(authed)` group layout.
- Use server components by default, client components only when needed.
- Use the `use client` directive at the top of client components.
- Avoid useEffect for data fetching, use server components.
- Use loading.tsx and error.tsx for route segments.
- Implement proper SEO meta tags on every public page.

## Agent rules

- Default orchestrator model is claude-sonnet-4-6.
- Use claude-haiku-4-5-20251001 for short tool calls under 1K tokens.
- Use claude-opus-4-7 for long-context summarization or planning.
- Never call models by alias, always pin the full version string.
- Version every prompt file with a top-of-file comment.
- Update the prompt changelog on every change.
- Use the Anthropic SDK, not raw HTTP calls.
- Handle rate limits with exponential backoff.
- Cache prompts where possible.
- Use tool calls instead of parsing free-text output.

## Security

- Never hard-code API keys.
- Always use environment variables for secrets.
- Never commit .env files.
- Add .env to .gitignore.
- Rotate API keys quarterly.
- Use parameterized queries, never string-concat SQL.
- Sanitize all user input before rendering.
- Use Content Security Policy headers.
- Implement rate limiting on all public endpoints.
- For payment-related code, never log the raw card number.
- Use the masked-id helper for any card data.
- Use HTTPS everywhere, never HTTP.
- Validate JWT tokens on every request.
- Use CSRF tokens on state-changing requests.
- Audit dependencies monthly with npm audit.

## Deployment

- Deploy via the CI pipeline, never directly from a developer machine.
- Always smoke test in staging first.
- Tag the release in git after a successful deploy.
- Update the status page on every deploy.
- Roll back if error rate exceeds 1% in the first 5 minutes.
- Use blue-green deployment for zero-downtime releases.
- Run database migrations in a separate step from app deploy.
- Make migrations backwards-compatible for one release cycle.

## Code review

- Two approvals required for changes to main.
- One approval required for feature branches.
- Reviewer must run the code locally for non-trivial changes.
- Use the PR template.
- Address every review comment before merging.
- Don't merge your own PRs unless approved.
- Use the "Request changes" option for blocking issues.
- Use the "Comment" option for non-blocking suggestions.

## Performance

- Lazy-load images below the fold.
- Use Next.js Image component for all images.
- Minimize bundle size, audit with `next bundle-analyzer`.
- Use React.memo for expensive components.
- Use useMemo and useCallback judiciously, not by default.
- Profile before optimizing.
- Avoid N+1 queries in the database layer.
- Use database indexes on frequently queried columns.

## Error handling

- Use try/catch around all external API calls.
- Log errors with structured logging, not console.log.
- Send critical errors to Sentry.
- Don't swallow errors silently.
- Return typed error objects from API routes.
- Use error boundaries in React.

## Logging

- Use structured logging, JSON format.
- Include request ID in every log line.
- Don't log sensitive data (passwords, tokens, PII).
- Use log levels appropriately (debug, info, warn, error).
- Set log level to info in production.

## Database

- Use Prisma for the ORM.
- Write migrations for every schema change.
- Never edit migrations after they've been applied.
- Use transactions for multi-step operations.
- Always specify the connection pool size.
- Monitor slow queries.

## Naming conventions

- Boolean variables start with is/has/should.
- Async functions are named with verb-noun pattern.
- React components are nouns.
- Event handlers start with handle (e.g. handleClick).
- Custom hooks start with use.
- Files match the default export name.

## Environment management

- Use Node version specified in .nvmrc.
- Use pnpm, not npm or yarn.
- Lock dependencies with pnpm-lock.yaml.
- Don't commit node_modules.
- Use .env.local for local secrets.
- Use .env.example as a template for new developers.

## Dependencies

- Audit new dependencies before adding.
- Prefer well-maintained packages with recent commits.
- Avoid packages with > 100 dependencies.
- Use exact versions for security-critical packages.
- Remove unused dependencies regularly.

## File organization

- One component per file.
- Co-locate tests with the file under test.
- Group related files in folders by feature.
- Keep utility functions in `lib/`.
- Keep types in `types/` or co-located with the consumer.
