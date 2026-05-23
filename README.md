# MarketSnap

AI-powered customer insights for small SaaS teams. Ask a question in plain English, get a structured report grounded in your actual customer and billing data.

This repo doubles as the reference workspace for a video on working with Claude Code in big projects, based on Anthropic's article [How Claude Code works in large codebases](https://claude.com/blog/how-claude-code-works-in-large-codebases-best-practices-and-where-to-start). The layered `CLAUDE.md` setup, the path-scoped skills, the hooks, and the tool-registry pattern are all wired up the way the article recommends.

## Stack

- **Dashboard:** Next.js 15 (app router) · shadcn/ui · Tailwind · tRPC · NextAuth · Prisma · Postgres
- **Agents:** TypeScript · Anthropic SDK · Stripe · Resend · pino · zod · vitest
- **Tooling:** pnpm workspaces · ESLint · Prettier · GitHub Actions CI

## Workspace layout

```
.
├── CLAUDE.md                                # root, lean (pointers + repo-wide gotcha)
├── CLAUDE-BLOATED.md                        # anti-example, NOT loaded by Claude
├── package.json · pnpm-workspace.yaml       # pnpm workspace root
├── tsconfig.base.json                       # shared TS config
├── .env.example · .nvmrc · .editorconfig    # standard scaffolding
├── eslint.config.mjs · prettier.config.mjs
├── .github/
│   ├── workflows/ci.yml                     # lint + test on every PR
│   └── PULL_REQUEST_TEMPLATE.md
├── .claude/
│   ├── settings.json                        # SessionStart + Stop hooks wired
│   ├── hooks/
│   │   ├── session-start.sh                 # loads team context per session
│   │   └── propose-claude-md-updates.sh     # self-improving stop hook
│   └── skills/                              # path-scoped reusable workflows
│       ├── add-api-route/SKILL.md
│       ├── add-database-migration/SKILL.md
│       └── review-pr/SKILL.md
├── dashboard/                               # Next.js 15 + tRPC + Prisma
│   ├── CLAUDE.md                            # dashboard-only conventions
│   ├── app/
│   │   ├── layout.tsx · page.tsx · globals.css
│   │   ├── (authed)/{layout,dashboard,reports,billing}
│   │   └── api/trpc/[trpc]/route.ts
│   ├── components/{dashboard-shell, ui/{button,card,input}}
│   ├── lib/{db,utils}.ts
│   ├── server/{trpc,router,routers/{customer,reports}}.ts
│   ├── prisma/schema.prisma
│   └── types/index.ts
└── agents/                                  # Anthropic SDK orchestrator + tools
    ├── CLAUDE.md                            # agents-only conventions
    ├── src/
    │   ├── index.ts · orchestrator.ts
    │   ├── tools/{stripe, email, customer-lookup, reports, index}.ts
    │   ├── lib/{env, log}.ts
    │   └── types.ts
    ├── prompts/{main, report-builder}.md
    └── tests/maskedCardId.test.ts
```

## Why layered CLAUDE.md

Three CLAUDE.md files, one per concern:

- **Root** (`CLAUDE.md`, ~15 lines): one-sentence product description, where the two main folders live, the one repo-wide gotcha (env var loading via dotenv-flow). Pointers and critical gotchas only.
- **`dashboard/CLAUDE.md`**: Next.js / shadcn / tRPC conventions, routing groups, dashboard-only commands. None of this loads when Claude is working in `agents/`.
- **`agents/CLAUDE.md`**: model picker rules, prompt versioning, the masked-id payment gotcha, agents-only commands. None of this loads when Claude is working in `dashboard/`.

Launch Claude from inside `agents/` or `dashboard/` and it walks up the directory tree, picking up both the root and the local CLAUDE.md additively. Context stays scoped to what's relevant.

The anti-example, `CLAUDE-BLOATED.md`, is what most teams end up with: hundreds of lines dumped into one file. It's at the root with a different filename so Claude does not load it; it's there for comparison. Three lines in the bloated file are the canonical pruning examples:

- `Use camelCase for variable names.` → **CUT.** Modern Claude does this by default.
- `Always run tests before committing.` → **CUT.** Belongs in a hook, not a CLAUDE.md rule.
- `For payment-related code, never log the raw card number.` → **KEEP.** Real gotcha specific to this repo, no other system catches it.

## Try it

```bash
git clone https://github.com/knabinbhandari/marketsnap-claude-code-demo
cd marketsnap-claude-code-demo
cp .env.example .env.local      # fill in API keys
pnpm install
```

Then launch Claude from inside one of the workspaces:

```bash
cd agents
claude
> add a new tool to the orchestrator that pulls the user's Stripe customer ID from the dashboard schema
```

Watch Claude pick up both the root `CLAUDE.md` (env-var gotcha) AND `agents/CLAUDE.md` (the model picker, the payment gotcha) before it writes anything. Then it follows the `add-api-route` skill from `.claude/skills/` because the work crosses the agent/dashboard boundary.

Try the same prompt from inside `dashboard/` instead. Different local context, same session pattern.

## Source

Companion to Anthropic's [How Claude Code works in large codebases: Best practices and where to start](https://claude.com/blog/how-claude-code-works-in-large-codebases-best-practices-and-where-to-start). Read the article for the full theory. This repo is the operator version: a working layered setup you can clone and modify.

## License

MIT. See [LICENSE](./LICENSE).
