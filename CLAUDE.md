# CLAUDE.md — AI Agent Guidelines

This file helps AI coding agents (Claude Code, Codex, etc.) work effectively on this project.

## Project Overview

**CEO of One** is a bilingual (EN/ZH) tutorial teaching non-programmers to build real products using AI agents. The `platform/` directory is the actual product — a Next.js 14 knowledge platform.

## Architecture

```
platform/
├── src/
│   ├── app/              # Next.js App Router pages & API routes
│   ├── features/         # Self-contained feature modules
│   │   ├── courses/      # Course catalog, purchase, content unlock
│   │   ├── auth/         # JWT + bcrypt authentication
│   │   ├── payment/      # Payment processing
│   │   └── dashboard/    # Admin analytics dashboard
│   └── lib/              # Shared types, utils, config
│       └── types/        # Shared TypeScript interfaces
├── templates/            # COO config pack (SOUL, PROCESS, checklists)
└── chapters/             # Tutorial content (11 chapters, EN + ZH)
```

**Key principle:** `features → lib` one-way dependency. Features never import from other features.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS
- **Testing:** Jest + ts-jest
- **Auth:** jsonwebtoken + bcryptjs
- **Database:** In-memory store (demo/educational purpose)

## Development Commands

```bash
cd platform/
npm install
npm run dev       # Start dev server
npm run build     # Production build
npm run lint      # ESLint
npm test          # Run all tests (111 tests, must all pass)
```

## Rules

1. **Never break existing tests.** Run `npm test` after any change. 111/111 must pass.
2. **Keep features isolated.** Each feature module is self-contained (types, store, service, tests).
3. **Shared types go to `src/lib/types/`.** Never import types from one feature into another.
4. **Both README.md and README_zh-CN.md must be updated together** for any user-facing change.
5. **Commit messages:** use conventional commits (`feat:`, `fix:`, `docs:`, `chore:`).
6. **Templates in `templates/` are COO config** — not application code. Don't modify without understanding the methodology.

## Testing

Tests live alongside source files: `features/courses/courses.test.ts`. Each feature has its own test file. Run full suite after every change — regressions are unacceptable.
