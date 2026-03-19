# Experiment: 01-soul-comparison

> **Date:** 2026-03-20
> **Goal:** Compare "empty soul" (bare instruction) vs "COO soul" (structured, quality-focused instruction)
> **Status:** ✅ Completed

<p align="left">
  <a href="experiment_zh-CN.md"><img src="https://img.shields.io/badge/🇨🇳-中文版-blue" alt="中文版" /></a>
</p>

## Hypothesis

A well-structured COO-style instruction produces significantly better results than a bare instruction for the same task.

## Experiment Design

**Task:** Build a Todo REST API with CRUD operations using Express + TypeScript.

**Control A (Empty Soul):** Bare instruction with minimal guidance.
```
"Build a Todo REST API with CRUD operations using Express and TypeScript. Put all code in a src/ directory. Include package.json."
```

**Control B (COO Soul):** Structured instruction with product requirements, technical requirements, and quality gates.
```
"You are building a Todo REST API for a production product. Follow these requirements precisely:

## Product Requirements
- CRUD for todos with UUID, title, completed, timestamps
- Soft delete support

## Technical Requirements
- Express + TypeScript, proper error handling (400/404/500), input validation

## Quality Requirements (MUST PASS)
- Jest tests covering ALL endpoints, must pass
- TypeScript must compile with zero errors
- Run tests and fix failures before finishing"
```

## Results

### Original Two Controls (acpx direct — no OpenClaw COO layer)

| Metric | Control A (Empty Soul) | Control B (COO Soul in prompt) | Difference |
|--------|----------------------|---------------------|------------|
| **Source files** | 4 | 4 + 1 test file | +tests |
| **Lines of code** | 164 | ~290 (code) + ~334 (tests) | +460 lines |
| **TypeScript compilation** | ✅ Pass | ✅ Pass | Same |
| **Tests** | ❌ None | ✅ 24/24 passed | +24 tests |
| **Soft delete** | ❌ No | ✅ Yes | +feature |
| **Error handling** | ❌ Minimal | ✅ 400/404/500 | +quality |
| **Input validation** | ❌ No | ✅ Yes | +quality |
| **Auto self-verification** | ❌ No | ✅ Ran tests, fixed bug | +reliability |
| **Plan/tracking** | ✅ Basic | ✅ Detailed 6-step plan | +structure |

### NEW: Control C (Real OpenClaw COO Flow)

> **This is the correct flow:** CEO says one sentence → OpenClaw (COO) expands into structured prompt → Claude Code executes → OpenClaw verifies.

**CEO input:** `"Build me a Todo REST API"`

**OpenClaw (COO) generated the full structured prompt with product thinking, quality standards, and delivery requirements** — then sent it to Claude Code via `claude --permission-mode bypassPermissions --print`.

| Metric | Control C (OpenClaw COO Flow) |
|--------|------------------------------|
| **Source files** | 8 (6 code + 1 test + 1 middleware) |
| **Lines of code** | ~572 (code) + ~289 (tests) = ~861 total |
| **TypeScript compilation** | ✅ Pass (zero errors) |
| **Tests** | ✅ **25/25 passed** |
| **Soft delete** | ✅ Yes (with `deletedAt` timestamp) |
| **Error handling** | ✅ 400/404/500 + JSON parse errors |
| **Input validation** | ✅ Title required, completed must be boolean |
| **Auto self-verification** | ✅ Claude Code ran tests internally |
| **Project structure** | ✅ Proper: `src/controllers/`, `src/store/`, `src/middleware/`, `src/routes/` |
| **Duration** | ~5.4 minutes |
| **CEO effort** | **1 sentence** |

### Three-Way Comparison

| Metric | A (No COO) | B (COO in prompt) | C (Real COO Flow) |
|--------|-----------|-------------------|-------------------|
| Tests | 0 | 24 ✅ | 25 ✅ |
| Lines of code | 164 | ~624 | **~861** |
| Project structure | Flat | Flat | **Organized** (controllers/store/middleware/routes) |
| Error classes | None | None | ✅ **Custom error classes** |
| Health endpoint | No | No | ✅ `/health` |
| Duration | ~2 min | ~4 min | ~5.4 min |
| CEO effort | 1 sentence | 1 long prompt | **1 sentence** |

**The key difference between B and C:** In B, the human wrote a long structured prompt. In C, the **human said one sentence** and OpenClaw (COO) generated the structured prompt. Same quality, **zero effort from the CEO**.

## Key Observations

### Control A Behavior
- Created basic CRUD structure quickly
- No tests at all — didn't even consider testing
- No error handling for edge cases (missing title, invalid input)
- Finished and declared "done" without any self-verification
- Like a junior developer who writes code and walks away

### Control B Behavior
- Created a structured plan upfront (6 steps)
- Wrote comprehensive tests (334 lines, 24 test cases)
- Ran TypeScript compilation ✅
- Ran tests → discovered a bug (error handler returning 500 instead of 400)
- **Fixed the bug automatically** → re-ran tests → 24/24 passed
- Like a senior engineer who writes code AND verifies it works

### Observation: The Planning Instinct

Control B didn't just write code — it created a **6-step plan** before touching any files:

```
1. Initialize package.json and install dependencies
2. Create TypeScript configuration
3. Create Todo type definitions and in-memory storage
4. Implement Express server with CRUD endpoints
5. Write Jest tests for all endpoints
6. Run TypeScript compilation and tests
```

Control A didn't plan at all. It just started writing.

**Insight:** The COO soul doesn't just improve code quality — it gives AI a *planning instinct*. Real COOs don't let teams jump into coding without a plan. Neither should your AI.

### Observation: The Bug Story

When Control B ran its tests, it discovered a real bug:

> **The problem:** When you send invalid JSON (like `"bad data"`) to the API, the error handler returned `500 Internal Server Error` instead of `400 Bad Request`. This is because Express's body-parser throws an error with `status: 400`, but the generic error handler always returned 500.

> **The fix:** Claude Code updated the error handler to check if the error already has a status code, and if so, use that instead of defaulting to 500.

This is a **production-level bug** that would have crashed in real usage. Control A never tested for this — it didn't even have tests. Control B caught it automatically because the COO soul said *"run tests, fix failures before finishing."*

### The Critical Difference

Control B's instruction said: *"After writing code: run npx tsc --noEmit, then run npm test, report results. If any test fails, fix it before finishing."*

This single sentence caused Claude Code to:
1. Run tests on its own
2. Discover a bug (the error handler story above)
3. Fix the bug
4. Re-run tests to confirm (24/24 passed)

**Without this sentence (Control A), none of that happened.**

## Conclusion

**Hypothesis strongly confirmed.**

The COO-style instruction produced:
- ✅ 24 automated tests vs 0
- ✅ Self-verification and bug fixing vs no verification
- ✅ Production-quality features (soft delete, validation, error handling) vs bare minimum
- ✅ Higher code quality with same base effort

**The key insight:** The "soul" isn't about making the AI smarter — it's about telling it **what quality means** and **demanding self-verification**. This is exactly what a real COO does: set standards, demand accountability.

## Raw Data

- Control A output: `control-a/output.log`
- Control B output: `control-b/output.log`
