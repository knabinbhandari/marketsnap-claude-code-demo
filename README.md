# MarketSnap (demo repo)

A sample workspace showing what a layered Claude Code setup looks like on a real small AI SaaS. Built as the companion to the YouTube video on working with Claude Code in big projects, based on Anthropic's article [How Claude Code works in large codebases](https://claude.com/blog/how-claude-code-works-in-large-codebases-best-practices-and-where-to-start).

Clone it, open it in your editor, launch Claude Code from inside `agents/` or `dashboard/`, and watch the layered `CLAUDE.md` files load additively.

## What's in here

```
.
├── CLAUDE.md                          ← root, lean (15 lines), pointers and gotchas only
├── CLAUDE-BLOATED.md                  ← anti-example, NOT loaded by Claude. The "what NOT to do" version
├── package.json                       ← pnpm workspace root
├── .claude/
│   ├── settings.json                  ← one start hook + one stop hook configured
│   ├── hooks/                         ← placeholder hook scripts (no-ops)
│   └── skills/
│       └── add-api-route/
│           └── SKILL.md               ← path-scoped skill (only fires under agents/)
├── dashboard/
│   ├── CLAUDE.md                      ← dashboard-only conventions (Next.js, shadcn, tRPC)
│   ├── package.json
│   ├── app/
│   │   ├── page.tsx
│   │   └── (authed)/dashboard/page.tsx
│   └── components/ui/button.tsx
└── agents/
    ├── CLAUDE.md                      ← agents-only conventions (model picker, prompt versioning)
    ├── package.json
    ├── orchestrator.ts
    ├── tools/
    │   ├── stripe.ts
    │   └── email.ts
    └── prompts/main.md
```

## How to use it

1. Clone this repo locally.
2. Open the repo in your editor (VS Code, Cursor, whatever).
3. Open a terminal inside the `agents/` folder and run `claude`.
4. Ask Claude: `add a new tool to the orchestrator that pulls the user's Stripe customer ID from the dashboard schema`.
5. Watch Claude pick up both the root `CLAUDE.md` (the env-var gotcha) AND `agents/CLAUDE.md` (the model picker rule, the payment-data gotcha) before it writes anything.
6. Try the same prompt from inside `dashboard/` instead. Claude picks up the root + `dashboard/CLAUDE.md` (shadcn, routing convention). Different setup, same session pattern.

## The bloated file

`CLAUDE-BLOATED.md` at the root is a deliberately-bad example of the trap most teams fall into: hundreds of lines of conventions dumped into one file. Claude will not load it (different filename on purpose). It's there to compare side-by-side with the lean `CLAUDE.md` and to demonstrate the "would removing this line cause Claude to make a real mistake?" pruning test.

Three lines in `CLAUDE-BLOATED.md` are the canonical pruning examples:

- `Use camelCase for variable names.` — **CUT.** Modern Claude does this by default.
- `Always run tests before committing.` — **CUT.** That belongs in a hook, not a CLAUDE.md rule.
- `For payment-related code, never log the raw card number.` — **KEEP.** Real gotcha specific to this repo, no other system catches it.

## Source

Built as a companion to Anthropic's [How Claude Code works in large codebases: Best practices and where to start](https://claude.com/blog/how-claude-code-works-in-large-codebases-best-practices-and-where-to-start). Read the article first if you want the full theory. This repo is the operator version: a working layered setup you can clone and modify.
