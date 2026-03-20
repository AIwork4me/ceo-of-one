# Chapter 7: Bugfix — Fixing Architectural Violations

[中文](experiment_zh-CN.md) | **English**

---

## Context

Chapters 5 and 6 added authentication and payment features. Both chapters passed all tests. But Chapter 6 introduced a problem that tests couldn't catch: the payment module was importing directly from the courses module, violating the one-way dependency rule (**features → lib only, never feature → feature**).

This chapter is different. We're not building anything new. We're fixing what's broken.

## Task

Fix 6 cross-feature imports in the payment module and resolve 1 related bug (enrolledCourses not initialized in auth store).

## COO Process

### 1. RECALL

Read the Retain entries from Chapters 5 and 6. Key lessons applied:

- Always grep for cross-feature imports in VERIFY (Ch6 lesson: we didn't, and violations slipped through)
- Specify function signatures explicitly (Ch5 lesson: ambiguity leads to bugs)
- File permissions: specify which files CAN and CANNOT be modified

### 2. AUDIT

Ran structural checks on the payment module:

```
grep -r "@/features/courses" src/features/payment/
```

Found **6 violations** — every payment file was directly importing from courses. Also found **1 bug**: `enrolledCourses` in `auth/store.ts` was never initialized.

### 3. ARCHITECT DECISION

Three options considered:

| Approach | Pros | Cons |
|----------|------|------|
| Facade | Single entry point | Extra abstraction layer |
| Event system | Fully decoupled | Complex, hard to debug |
| **Dependency injection** | **Minimal change, better testability** | Slightly more parameters |

**Decision: Dependency injection.** The payment module receives course data through function parameters instead of importing course stores directly.

### 4. SPECIFY

Wrote precise specifications including:

- Exact function signatures for `createOrder`, `getEnrollment`, route handlers
- `PaymentRouteDeps` interface with `getToken`, `getCurrentUser`, `findCourse`
- File permissions: payment files CANNOT import from courses; API route adapters CAN (they're glue code)
- Grep validation criteria for VERIFY step

### 5. EXECUTE

Sent specs to Claude Code via file-based prompt (avoiding PowerShell escape issues from previous chapters).

### 6. VERIFY

- ✅ `npm run build` — zero errors
- ✅ `npm test` — 94/94 passed
- ✅ `grep -r "@/features/courses" src/features/payment/` — ZERO results
- ✅ `grep -r "TODO\|FIXME\|console\.log" src/features/payment/` — ZERO results
- ✅ `grep -r ": any" src/features/payment/` — ZERO results
- ✅ Bug count: **0**

## Key Changes

| File | Change |
|------|--------|
| `payment/types.ts` | `Category` now imported from `@/lib/config`, not `@/features/courses/types` |
| `payment/service.ts` | `createOrder`/`getEnrollment` accept `findCourse` function parameter |
| `payment/routes.ts` | All handlers accept `PaymentRouteDeps` with `getToken`/`getCurrentUser`/`findCourse` |
| `src/app/api/*/route.ts` | API route adapters import real stores and pass to handlers (thin glue layer) |
| `payment.test.ts` | Uses mocks instead of real `courseStore`/`authStore` |
| `auth/store.ts` | 1-line fix: `enrolledCourses` initialization |
| `courses/*` | **ZERO modifications** |

## Bug Count Trend

| Chapter | Feature | Bugs |
|---------|---------|------|
| Ch5 | Auth | 1 |
| Ch6 | Payment | 3 |
| **Ch7** | **Bugfix** | **0** |

## Key Insights

1. **The COO makes the architecture decision. The engineer implements it.** Chapter 6 had violations because the COO didn't inspect the result. Chapter 7 had zero violations because the COO inspected *before* specifying.

2. **Structural checks catch what functional tests miss.** All 94 tests passed in Ch6, but the architecture was violated. Grep for cross-feature imports is now mandatory in every VERIFY step.

3. **Zero bugs is possible when specs are precise.** The COO specified function signatures, file permissions, and validation commands. The engineer had no room to make wrong choices.

4. **Thin adapter pattern.** API route files in `src/app/api/` CAN import from features (they're glue code). Feature modules themselves cannot. This distinction is crucial.

5. **Dependency injection improved testability.** Tests now use mock course data instead of real stores — faster and more isolated.

## COO Quality Score

| Chapter | Quality |
|---------|---------|
| Ch5 | Good (1 bug) |
| Ch6 | Poor (3 bugs) |
| **Ch7** | **Perfect (0 bugs)** |

