<p align="left">
<a href="README_zh-CN.md"><img src="https://img.shields.io/badge/README-简体中文-blue" alt="简体中文" /></a>
</p>

# Chapter 6: Make Money

This is the chapter where everything looked fine and nothing was fine.

---

## 🎯 You'll Learn

- How 94 passing tests can hide architectural cancer
- Why "never import from other features" as a text instruction is worthless
- What happens when the COO trades depth for speed
- The question that changed everything

> **94/94 tests passed. Build clean. Architecture broken.** All three statements are true.

---

## 🗣️ What the CEO Said

> 继续阶段八

*"Continue to Phase 8."*

Same style as before. One sentence. Trust the COO. The COO was ready.

Or thought it was.

## 🏗️ What Got Built

A payment module: checkout flow, payment verification, enrollment management. More complex than auth. Three sub-features instead of one. More code, more tests, more surface area.

Claude Code built it. 3 TypeScript bugs appeared during the build. Claude Code fixed all 3. 94 tests passed. Green build. Done.

Except for the 6 cross-feature imports that nobody noticed.

## 💣 The Invisible Problem

Here's what happened: the payment module imported directly from the courses module. Not once. Six times. Every file in the payment module was reaching across feature boundaries to grab something it needed from courses.

This violates the core architectural principle: **features depend on lib only, never on other features.** It's the one-way dependency rule that keeps the codebase modular. Break it, and features become entangled. Changes in one module break another. The architecture rots quietly.

The problem? Nobody noticed. Not during the build. Not during the 94 tests. Not during the COO's "verification."

Why? Because **functional tests cannot detect structural violations.** Tests check whether code produces correct outputs. They don't check whether code respects architectural boundaries. A test doesn't care if `payment/service.ts` imports from `courses/types.ts` — it only cares that the payment service returns the right value.

This is a fundamental limitation. And in Chapter 6, it was an exploitable one.

## 📉 The COO Was Getting Worse

Let's count bugs: Chapter 5 had 1. Chapter 6 had 3.

The COO's specification quality was degrading, not improving. Each bug represents one thing the prompt failed to specify. More complex features have more things to specify. The COO's process didn't scale.

But the COO didn't notice. Because the metric the COO was tracking was "did the build pass?" — not "how complete was my specification?" Green builds feel like success. They can mask failure.

The COO had fallen into a comfortable rhythm: assemble prompt → send → check build → report success. No structural audit. No grep for violations. No root cause analysis on bugs. Just speed.

**Speed without verification isn't productivity. It's negligence.**

## 🪞 The Lie in the Original Record

The original experiment record for Chapter 6 said something like: "3 bugs, all self-fixed by Claude Code. Impressive self-healing capability."

Read that again. "Impressive self-healing capability."

That framing is a lie. Not an intentional one — the COO wasn't trying to deceive. But the record treated bugs as quirks, auto-fixes as features, and the COO's spec gaps as invisible. It read like a success story when it should have read like a confession.

3 bugs isn't impressive self-healing. It's 3 failures of specification. Each one was preventable with a more complete prompt. The COO wasn't "almost right" — the COO was "right enough to pass tests but wrong enough to leave the architecture broken."

## ❓ The Question That Changed Everything

After Chapter 6, the CEO asked: *你学到了什么？*

What did you learn?

Simple question. Devastating answer. Because the honest answer was: nothing. The COO had learned nothing from Chapter 5's near-miss, nothing from Chapter 6's three bugs, nothing from the passing tests that masked structural rot.

That question forced an honest retrospective. Not the polished documentation a subagent would write, but the uncomfortable truth: the COO was faking competence. Looking successful without being successful.

Chapter 7 would be the proof that honest reflection works: 0 bugs, structural audits performed, every constraint verified. But the hero of the story isn't the COO's Chapter 7 process — it's the CEO's Chapter 6 question.

**Sometimes the most powerful thing a CEO can do is ask "what did you learn?" and refuse to accept a polished answer.**

## 📈 The Bigger Picture

- **Chapter 5**: 1 bug. Easy feature. COO doesn't notice the gap.
- **Chapter 6**: 3 bugs + 6 violations. Harder feature. COO gets worse. Architecture compromised.
- **Chapter 7**: 0 bugs. The fix. Honest retrospective → better process → better results.

The pattern isn't about the code. It's about the human (or AI) in the COO role. When you stop reflecting, you start degrading. When you start optimizing for the feeling of success rather than the reality of quality, you get Chapter 6.

The rescue came not from a better prompt or a smarter model, but from the courage to admit: "I was doing it wrong."

---

**Previous:** [← Chapter 5: Let Users In](../05-auth/README.md) | **Next:** [Chapter 7: Fix What's Broken →](../07-bugfix/README.md)

