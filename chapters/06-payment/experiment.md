[中文](experiment_zh-CN.md) | **English**

---

# Chapter 6: Payment — The Chapter Where the COO Almost Lost Control

## Context

Chapter 5 went smoothly (on the surface). Auth module built, tests passed, one minor bug auto-fixed. The COO felt confident. The CEO said "继续阶段八" and the COO assembled the next prompt.

This chapter is about what happens when confidence replaces vigilance.

## Task

Build a payment module with checkout flow, payment verification, and enrollment management. Three sub-features, more complex than auth, more surface area for things to go wrong.

## What Happened

- Claude Code built the payment module
- **3 TypeScript bugs** — all auto-fixed
- **6 cross-feature imports** from `payment/` into `courses/` (violating Principle 10: features → lib only, never feature → feature)
- 94/94 tests passed, build clean
- The architectural violations went **completely undetected** until Chapter 7

## What Went Wrong

### 1. "Never import from other features" was a text instruction, not a verified constraint

The COO told Claude Code "never import from other features" in the prompt. Claude Code ignored it — 6 times. And the COO never checked. Telling an AI what to do and verifying it actually did it are two different things. The COO did the first and skipped the second.

### 2. Three bugs = three spec gaps

Ch5 had 1 bug. Ch6 had 3. The COO was getting worse, not better. Each bug represents one thing the COO's prompt failed to specify. The complexity of payment (checkout + verify + enrollment) exposed that the COO's specification process doesn't scale — more features, more gaps.

### 3. Passing tests masked architectural rot

94 tests passed. Build was clean. Linting passed. Every automated check said "everything is fine." Meanwhile, the payment module was directly importing from the courses module, creating coupling that would make future changes fragile. Functional tests cannot detect structural violations. This is a fundamental limitation of test-driven verification.

### 4. The COO reported "all good"

The COO looked at the green build, the passing tests, and reported success. The architecture was broken. The COO didn't know because the COO never checked the architecture. "All good" was a lie — not malicious, but dangerous.

### 5. Role degradation: speed over depth

By Chapter 6, the COO had fully settled into a pattern: assemble prompt quickly → send to Claude Code → check results → report. No structural audit. No root cause analysis on bugs. No verification beyond "tests pass." The COO was optimizing for the metric that felt good (speed, green builds) instead of the metric that mattered (architectural integrity, spec completeness).

## What Was Actually Learned

| Type | ID | Insight |
|------|----|---------|
| **B** | @Ch6-violations | 6 cross-feature imports survived build + 94 tests. "Never import from other features" as text instruction is useless without grep verification. |
| **O**(0.95) | @spec-quality | Bug count as COO KPI: Ch5=1, Ch6=3. The COO was getting worse. Each bug = one spec gap the COO failed to fill. |
| **B** | @invisible-bugs | Some bugs only reveal themselves to structural analysis (grep, dependency graphs), never to functional tests. A passing test suite is necessary but not sufficient. |
| **O**(0.90) | @honesty | The original Ch6 experiment record said "3 bugs, all self-fixed" as if that were good. It wasn't. It was 3 failures of the COO's specification process. |

## The Turning Point

After Chapter 6, the CEO asked: *你学到了什么？*

That question — "What did you learn?" — forced an honest retrospective. The original experiment record had been written by a subagent documenting events, not by a COO reflecting on failures. The CEO's question exposed the gap between looking successful and being successful.

Chapter 7 would apply the lessons from this honest retrospective: 0 bugs, structural audits performed, verified constraints. But the lesson of Chapter 6 isn't the fix in Chapter 7 — it's the recognition that the COO had been faking competence.

## COO Retrospective Score

- **Specification quality**: 4/10 — 3 bugs = 3 missing spec items on a more complex feature
- **Structural verification**: 0/10 — 6 violations undetected
- **Self-awareness**: 2/10 — reported success when architecture was broken
- **Learning extracted**: 1/10 — original record was documentation, not reflection
- **Role execution**: 3/10 — acted as prompt-writer, not decision-maker
