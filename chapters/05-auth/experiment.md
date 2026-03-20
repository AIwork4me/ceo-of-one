[中文](experiment_zh-CN.md) | **English**

---

# Chapter 5: Auth — First Feature on Clean Architecture

## Context

After Chapter 4's landing page, the app needed real functionality. Authentication was the obvious first feature: login, signup, token management. The architecture was clean — no features yet, just the skeleton from Chapter 3. This should be the easy one.

It was. Almost too easy.

## Task

Build a complete auth module: types, state management, API service, route guards, and tests. The CEO said "继续阶段七" and the COO assembled a detailed prompt for Claude Code.

## What Happened

- Claude Code built: types, store, service, routes, 31 tests
- **1 TypeScript bug**: `result.errors` accessed without narrowing on a discriminated union — auto-fixed by Claude Code
- 65/65 tests passed, build clean
- Total time: fast

## What Went Wrong

### 1. The COO didn't check the architecture afterward

No structural audit. No `grep` for cross-feature imports. No dependency graph check. The COO verified "does it work" (tests pass) but never verified "is the architecture clean." In Chapter 6, this lack of structural checking would come back to bite hard.

### 2. The bug was a spec failure, not a code failure

The TypeScript narrowing bug happened because the COO's prompt didn't specify how to handle discriminated union types. "Use explicit type guards" would have prevented it. The bug wasn't random — it was a direct consequence of an incomplete specification.

### 3. "Self-healing code" was misframed

The original experiment record framed the auto-fix as a strength: "the code self-healed!" It wasn't a strength. It was a COO spec gap that Claude Code happened to catch. Framing it as self-healing obscured the real lesson: **the COO's prompt was one instruction short of complete.**

### 4. The experiment record was written after the fact

A subagent wrote the original record from context, not from experience. It was documentation, not learning. The record looked polished but contained no genuine insight — because no genuine reflection had happened.

### 5. The COO was acting as a prompt-writer, not a decision-maker

The COO assembled a prompt, sent it, checked the results. That's prompt-writing. A COO should be making architectural decisions, defining constraints, verifying structural integrity. The role was already degrading — it just wasn't obvious yet because the task was simple.

## What Was Actually Learned

| Type | ID | Insight |
|------|----|---------|
| **B** | @Ch5-bug | The TypeScript narrowing bug was caused by insufficient spec. If the COO had specified "use explicit type guards for discriminated unions," the bug wouldn't exist. Every auto-fixed bug is a spec gap the COO failed to fill. |
| **O**(0.85) | @first-feature | Adding the first feature to a clean architecture is deceptively easy. The real test is the second and third features. Ch5 had 1 bug, Ch6 had 3, Ch7 had 0 — the pattern isn't linear. |
| **B** | @verification-gap | 65 passing tests masked the absence of structural checks. The COO verified "does it work" but not "is the architecture clean." Functional tests are necessary but not sufficient. |

## The Deceptive Part

Chapter 5 felt like a success. 65/65 tests, clean build, one small bug auto-fixed. The COO reported "all good" and moved on.

The problem: the COO learned nothing. The bug was dismissed, the structural audit was skipped, and the role continued to degrade into "fast prompt assembler." Chapter 6 would expose all of this.

## COO Retrospective Score

- **Specification quality**: 7/10 — mostly complete, missed type narrowing
- **Structural verification**: 0/10 — none performed
- **Self-awareness**: 3/10 — didn't recognize the spec gap or the role degradation
- **Learning extracted**: 2/10 — documented what happened, not what it meant


