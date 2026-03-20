# AGENTS.md — AI Agent Guidelines

This file helps any AI coding agent (Claude Code, Codex, Cursor, etc.) work effectively on this project. It complements README.md — README is for humans, this is for agents.

## Project Overview

**CEO of One** is a bilingual (EN/ZH) open-source tutorial that teaches non-programmers to build real products using AI agents. It consists of:

1. **Tutorial content** (root `chapters/` + `templates/`) — 12 chapters of educational material
2. **Working product** (`platform/`) — a Next.js 14 knowledge platform built through the tutorial

## Repository Structure

```
ceo-of-one/
├── chapters/              # Tutorial content (12 chapters, EN + ZH pairs)
│   ├── 00-setup/          #   Each has: README.md + README_zh-CN.md + experiment files
│   ├── 01-soul/
│   └── ...
├── templates/             # COO config pack — the methodology core
│   ├── SOUL-COO.md        #   Values, thinking style, anti-patterns
│   ├── PROCESS-COO.md     #   10-step workflow
│   ├── review-checklist.md
│   └── talk-templates/
├── platform/              # The actual product (Next.js fullstack app)
│   ├── src/
│   │   ├── app/           #   App Router: pages + API routes
│   │   ├── features/      #   Self-contained feature modules
│   │   │   ├── courses/   #     Course catalog, purchase, content unlock
│   │   │   ├── auth/      #     JWT + bcrypt authentication
│   │   │   ├── payment/   #     Payment processing
│   │   │   └── dashboard/ #     Admin analytics
│   │   └── lib/           #   Shared types, utils, config
│   │       └── types/     #     Shared TypeScript interfaces
│   └── public/            #   Static assets (robots.txt, sitemap.xml)
├── README.md              # English README
├── README_zh-CN.md        # Chinese README
└── AGENTS.md              # This file
```

## Architecture Principles

- **`features → lib` one-way dependency.** Features must never import from other features. Shared types go to `src/lib/types/`.
- **Feature isolation.** Each feature is self-contained: types, store, service, routes, and tests all live within its directory.
- **Templates are methodology, not code.** `templates/` contains the COO operating system — don't modify without understanding the methodology documented in `chapters/`.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Testing:** Jest + ts-jest
- **Auth:** jsonwebtoken + bcryptjs (JWT in httpOnly cookies)
- **Database:** In-memory store (educational/demo purpose — not production DB)

## Development Commands

```bash
cd platform/
npm install              # Install dependencies
npm run dev              # Start dev server (localhost:3000)
npm run build            # Production build (must pass before deploy)
npm run lint             # ESLint check
npm test                 # Run ALL tests — 111 tests, 0 failures allowed
```

## Rules

### Must Do
1. **Run `npm test` after every code change.** 111/111 must pass. Regressions are unacceptable.
2. **Run `npm run build` before committing.** Zero build errors, zero type errors.
3. **Update both `README.md` AND `README_zh-CN.md`** for any user-facing change.
4. **Use conventional commits:** `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`.
5. **New features go into `src/features/<name>/`** with their own types, store, service, and test files.

### Must Not Do
1. **Never import across features.** If two features need the same type, move it to `src/lib/types/`.
2. **Never modify `templates/` without reading the relevant chapter first.** Templates encode tested methodology.
3. **Never add files to `experiments/` in git.** It's gitignored for a reason (260MB of test artifacts).
4. **Never hardcode secrets.** Use `.env` (already gitignored).
5. **Never add `node_modules/` or `.next/` to git.** Already gitignored, but double-check.

## Bilingual Content Convention

Each chapter directory contains paired files:
- `README.md` — English version
- `README_zh-CN.md` — Chinese version
- Experiment files follow the same pattern: `experiment.md` + `experiment_zh-CN.md`

When adding or editing content, always update both language versions together.

## Testing

Tests live alongside source files within each feature module:
```
features/courses/courses.test.ts
features/auth/auth.test.ts
features/payment/payment.test.ts
features/dashboard/dashboard.test.ts
```

Each test file covers the full feature (types, store, service, API routes). Run the complete suite — partial testing masks regressions.
