<p align="left"><a href="README_zh-CN.md">简体中文</a></p>

# Chapter 5: Let Users In

The first feature always feels like a victory. That's the trap.

---

## 🎯 You'll Learn

- What really happened when we added authentication to a clean architecture
- Why "all tests pass" is a dangerous phrase
- The one bug that revealed a deeper problem

> **65/65 tests passed, build clean.** The COO reported success. The COO was wrong.

---

## 🗣️ What the CEO Said

> 继续阶段七

*"Continue to Phase 7."*

One sentence. The CEO trusted the COO to know what Phase 7 meant. The COO did — auth module, the first real feature.

## 🏗️ What Got Built

Claude Code produced a complete auth module: type definitions, state management, API service layer, route guards, and 31 dedicated tests. Everything compiled. All 65 tests across the entire project passed.

By every conventional metric, this was a success.

It wasn't. Not entirely.

## 🐛 The Bug That Shouldn't Have Existed

One TypeScript bug surfaced during the build: accessing `result.errors` on a value that TypeScript couldn't narrow automatically. Claude Code caught it and fixed it. The build turned green. Everyone moved on.

But here's the thing: that bug wasn't random bad luck. It was a direct consequence of the COO's prompt not specifying how to handle discriminated union types. One missing instruction in the spec, one bug in the code. Cause and effect.

The COO framed it as "self-healing code" — look how smart Claude Code is, it fixed its own mistake! That framing was a lie we told ourselves. The code didn't self-heal. The COO failed to specify, and Claude Code filled the gap. Sometimes it fills gaps correctly. Sometimes it doesn't. You don't want to depend on "sometimes."

**Lesson: every auto-fixed bug is a spec gap the COO failed to fill.**

## 🔍 What the COO Didn't Do

Here's what should have happened after the build:

1. **Grep for cross-feature imports.** Didn't happen. The COO assumed Claude Code followed the rules because the instructions said so.
2. **Structural audit.** Didn't happen. "Tests pass" was treated as sufficient verification.
3. **Root cause analysis on the bug.** Didn't happen. "Auto-fixed" was treated as "problem solved."

The COO was optimizing for speed — assemble the prompt fast, get the green build, report success. That's not a COO. That's a prompt delivery service.

## 💡 What This Chapter Really Teaches

Adding the first feature to a clean architecture is deceptively easy. There's no accumulated complexity, no tangled dependencies, no legacy to fight. Of course it works. The architecture was designed to make the first feature easy.

The real test comes later — when features interact, when complexity accumulates, when the COO is tired and the CEO is impatient. Chapter 6 would prove exactly this.

But there's a subtler lesson too: **passing tests don't mean clean architecture.** They mean the code does what the tests check for. They don't check whether the code respects the boundaries you set. They don't check whether imports stay clean. They don't check whether the architecture is degrading quietly.

In Chapter 5, the architecture was probably fine. Probably. We didn't check.

That "probably" should keep you up at night.

## 📈 The Bigger Picture

Chapter 5 was the calm before the storm. One bug, quickly fixed, no structural issues (that we know of). The COO felt competent. The process felt smooth.

Chapter 6 would break that illusion — 3 bugs, 6 architectural violations, and a COO who had learned nothing from Chapter 5's near-miss.

The pattern: Ch5 had 1 bug, Ch6 had 3 bugs, Ch7 had 0. The turning point wasn't a better prompt or a smarter model. It was the CEO asking a simple question: *你学到了什么？* — "What did you learn?"

That question forced honest reflection. And honest reflection changed everything.

---

**Previous:** [← Chapter 4: Build the Real Landing Page](../04-landing-page/README.md) | **Next:** [Chapter 6: Make Money →](../06-payment/README.md)

