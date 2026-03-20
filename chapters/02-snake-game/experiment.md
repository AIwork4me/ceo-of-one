<p align="left"><a href="experiment_zh-CN.md"><img src="https://img.shields.io/badge/Experiment-简体中文-blue" alt="简体中文" /></a></p>

# Chapter 2 Experiment: Prompt Precision and the Snake Game

## Objective

Measure how instruction precision affects AI output fidelity by building the same Snake game with three different levels of detail, then comparing results against specifications.

## Setup

| Item | Detail |
|---|---|
| **Task** | Build a web-based Snake game (single `index.html` file) |
| **Tool** | acpx + Claude Code with COO soul template |
| **Variable** | Instruction precision (Vague / Medium / Precise) |
| **Evaluation** | Does the output match what was asked? Feature-by-feature. |

## Process

### Step 1: Version A — Vague Instruction

```
Build a Snake game.
```

Claude Code produced a playable Snake game. It worked. But:
- Snake was blue instead of green (we hadn't specified a color)
- Game speed was ~100ms (too fast, we hadn't specified)
- No restart button (we hadn't asked for one)
- Canvas size was non-standard

**Verdict:** Functional. Not what we had in mind. We just hadn't said what we had in mind.

### Step 2: Version B — Medium Instruction

```
Build a Snake game. Single HTML file. The snake grows when eating food.
Game over when hitting walls or itself. Include arrow key controls.
```

Claude Code added requested features and also got creative — adding snake eyes, gradient body, and a pulsing food animation.

**Verdict:** Better. Core mechanics matched. Extra features were a pleasant surprise for prototyping, but would be unwanted if we had specific visual requirements.

### Step 3: Version C — Precise Instruction

```
Build a web-based Snake game. All code in a single index.html file.
- Canvas 400x400, dark background #1a1a2e, green snake #00ff41, red food #ff0044
- Snake starts center, moving right, length 3
- Arrow keys, prevent 180-degree reversal
- +10 points per food, grow on eat
- Game over on wall/self hit, score display, restart button
- 150ms game loop, pure HTML/CSS/JS
```

Claude Code produced exactly what was specified. Every color, every dimension, every behavior matched.

**Verdict:** Exact match. No surprises. This is what you want for production.

### Step 4: Feature-by-Feature Comparison

## Results

| Feature | Vague | Medium | Precise |
|---|---|---|---|
| Playable Snake game | ✅ | ✅ | ✅ |
| Single HTML file | ✅ | ✅ | ✅ |
| Correct canvas size | ❌ | ❌ | ✅ 400×400 |
| Dark background | ❌ | ❌ | ✅ #1a1a2e |
| Green snake | ❌ (blue) | ❌ (random) | ✅ #00ff41 |
| Red food | ❌ | ✅ | ✅ #ff0044 |
| Arrow key controls | ✅ | ✅ | ✅ |
| Prevent 180° reversal | ❌ | ✅ | ✅ |
| Score display | ❌ | ✅ | ✅ |
| Restart button | ❌ | ❌ | ✅ |
| Game loop speed | ❌ (~100ms) | ❌ (~100ms) | ✅ 150ms |
| Spec match rate | ~30% | ~60% | **100%** |

## Key Insights

1. **Precision doesn't cost more — it costs less.** The precise version (Version C) was actually the cheapest run because Claude Code didn't waste tokens guessing or iterating on ambiguous requirements. Vague instructions force the AI to make assumptions, and wrong assumptions cost tokens to fix.

2. **The methodology flow was still imperfect.** Same issue as Chapter 1: OpenClaw (COO) ran the comparison directly rather than following the clean CEO→COO→engineer pipeline. In a mature workflow, the CEO would say "compare these three prompt approaches" and the COO would coordinate the three engineer runs independently. We did it more ad-hoc here.

3. **AI gets creative when you're vague, not when you're precise.** Version B's snake eyes and gradient body were "AI being creative" — fun for a prototype, problematic for a product. Precision eliminates unwanted creativity without eliminating capability.

4. **The precision formula is simple: WHAT + HOW + WHAT IT LOOKS LIKE.** Three categories cover almost everything a CEO needs to specify. You don't need to write code. You need to describe what you see in your head.

## What This Proves

Instruction precision has a direct, linear relationship with output fidelity. There is no "sweet spot" between vague and precise — for production work, precise always wins. The precision formula (What + How + Looks Like) gives non-technical CEOs a framework for giving clear instructions without writing code.

## Retained Knowledge

- B: Vague instructions produce functional but unpredictable output. Spec match ~30%.
- B: Precise instructions produce exact matches. Spec match 100%.
- B: The precision formula: WHAT to build + HOW it works + WHAT it looks like.
- B: Precision actually reduces cost — fewer assumption-iteration cycles.
- O: AI "creativity" (Version B's snake eyes) is a feature for prototyping, a bug for production.
- O: The COO should coordinate A/B test runs independently (methodology fix applied in later chapters).

---

← [Previous: Chapter 1 — Give AI a Top-Tier COO Brain](../01-soul/) | [README](../../README.md) | [Next: Chapter 3 — Make AI Check Its Own Work](../03-quality-checklist/) →


