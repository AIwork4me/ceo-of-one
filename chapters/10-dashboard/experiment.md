<p align="left">
<a href="experiment_zh-CN.md"><img src="https://img.shields.io/badge/Experiment-简体中文-blue" alt="简体中文" /></a>
</p>

# Chapter 9 — Dashboard & Seed Data: Experiment Record

---

## Task

Add a data dashboard and seed data to make the platform look like a real operating business.

## COO Decision

**Use seed data instead of a database.**

Readers don't need to learn database setup. The dashboard shows what a real business dashboard looks like, powered by in-memory stores with pre-loaded demo data. This keeps the learning curve flat while demonstrating what real platform metrics look like.

## COO Flow

CEO said: "继续阶段十一" (Continue Phase 11).

The COO executed four steps:

1. **RECALL** — Applied Ch7 lessons: write precise specs, do structural checks, target zero bugs.
2. **ARCHITECT** — Decided on seed data + a dedicated dashboard module. Dashboard uses dependency injection to read from other modules — no cross-feature imports. No database.
3. **SPECIFY** — Wrote a detailed spec including seed data content, dashboard type definitions, page layout design, and a 15+ test requirement.
4. **EXECUTE** — Claude Code built everything from the spec.

## Result

| Metric | Value |
|---|---|
| Build errors | **0** (1 ESLint bug fixed during development) |
| Tests | **111/111 passed** (94 existing + 17 new dashboard) |
| Bug count | **1** (ESLint rule reference issue) |
| API | `/api/dashboard` returns real stats: 5 users, 6 courses, 8 orders, ¥1,124 revenue |
| Dashboard page | Dark theme, 4 stat cards, 2 tables (recent users, recent orders) |

## Bug Analysis

**The ESLint bug:** The COO's spec said "no cross-feature imports" but didn't anticipate that Claude Code would use `require()` in the payment store's seed function to access other stores (e.g., course and user stores). The auto-generated `eslint-disable` comment referenced a rule not configured in the project, causing a build failure.

**Root cause:** Spec gap. The COO should have explicitly forbidden `require()` in seed functions ("use dependency injection for seed data too") or banned `eslint-disable` comments entirely.

**Fix:** Removed the incorrect eslint-disable comment. Straightforward, but it's the kind of thing that's easy to miss in a large diff.

## Key Insight

Seed data transforms the product. Before Ch9: empty arrays, everything feels like a demo. After: real Chinese names, real course titles, real order amounts totaling ¥1,124. The same codebase — but with data, it feels like a business.

This is why Ch8's "empty courses" moment was the perfect motivation for Ch9. You can't appreciate data until you've felt the emptiness.

## Retained Knowledge

| Grade | Tag | Insight |
|---|---|---|
| B | `@seed-arch` | Payment store seed used `require()` for cross-module access, violating DI pattern. COO spec should have explicitly forbidden `require()` in seed functions. |
| O(c=0.85) | `@eslint` | ESLint rule comments for non-existent rules cause build failures. Simple fix, easy to miss. |
| B | `@data-transform` | Seed data (6 courses, 5 users, 8 orders, ¥1,124) made the product feel real. Data > features for perceived value. |
| O(c=0.90) | `@scope` | Dashboard module is the first that reads from ALL other modules. It's the convergence point. Architecture holds: dependency injection works at scale (3 source modules). |


