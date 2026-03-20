<p align="left"><a href="experiment_zh-CN.md"><img src="https://img.shields.io/badge/Experiment-简体中文-blue" alt="简体中文" /></a></p>

# Chapter 1 Experiment: Giving AI a COO Brain (A/B Test)

## Objective

Determine whether adding a structured "COO soul" instruction to Claude Code significantly improves output quality, test coverage, and product completeness — compared to bare instructions and hand-written structured prompts.

## Setup

| Item | Detail |
|---|---|
| **Task** | Build a Todo REST API with CRUD operations |
| **Tool** | acpx + Claude Code |
| **Variable** | Prompt structure (3 approaches tested) |
| **Engineer** | Claude Code (same model, same session type) |
| **Metric** | Test count, bugs found, feature completeness, CEO effort |

## Process

### Step 1: Approach A — Bare Instruction

Sent a single sentence: "Build me a Todo REST API." No soul, no structure, no quality requirements.

Claude Code built a basic Express server with CRUD endpoints. It returned data. No tests. No input validation. No error handling beyond basic try/catch.

### Step 2: Approach B — Hand-Written Structured Prompt

Wrote a ~200-word structured prompt including requirements for tests, error handling, and input validation. Sent it directly via acpx.

Result: 24 tests passing, proper error responses, input validation. Good quality — but the CEO had to write 200 words of technical requirements.

### Step 3: Approach C — COO Soul (via OpenClaw)

Used the COO soul template and let OpenClaw decompose "Build me a Todo REST API" into a full engineering spec. Claude Code executed it.

Result: 28 tests passing, organized project structure (`types/`, `store/`, `routes/`), input validation (including whitespace trimming), auto-fixed a test bug (missing 404 handler).

### Step 4: Comparison

Measured all three against the same criteria.

## Results

| Metric | A: Bare | B: Hand-Written | C: COO Soul |
|---|---|---|---|
| Tests written | 0 | 24 ✅ | 28 ✅ |
| Bugs found | 2 (no validation, crashes on bad input) | 0 | 0 |
| Input validation | ❌ | ✅ Basic | ✅ Thorough (whitespace, empty) |
| Project structure | Flat (one file) | Organized | Organized |
| CEO effort | 1 sentence | ~200 words | 1 sentence |
| Auto-fixed issues | — | — | ✅ (404 handler in tests) |
| Filter support | ❌ | ❌ | ✅ |

## Key Insights

1. **Approach B and C produced similar quality, but with vastly different CEO effort.** This is the core finding. Writing a 200-word prompt yourself works — but why would you when your COO can generate an equivalent (or better) one from one sentence?

2. **The methodology flow was imperfect.** In this early chapter, OpenClaw (COO) performed the comparison and analysis directly. The ideal flow — "CEO says → COO decomposes → engineer executes → COO reports" — wasn't fully established yet. The COO acted as both experimenter and operator. This is a known imperfection we fixed in later chapters.

3. **Zero tests is the default, not the exception.** Without explicit quality instructions, Claude Code simply doesn't write tests. This isn't a bug — it's the expected behavior when you don't specify quality standards. The COO soul template fixes this by default.

4. **Edge cases emerge from structured thinking, not from prompting harder.** The COO thought of whitespace trimming and empty string handling because it was working from a structured quality framework, not just "try harder."

## What This Proves

A structured COO instruction consistently outperforms bare instructions, and an AI-generated COO spec matches or exceeds hand-written specs while requiring zero technical effort from the CEO. The COO soul template is the minimum viable quality layer.

## Retained Knowledge

- B: Bare instructions to Claude Code produce functional but untested code by default.
- B: The COO soul template (Product Thinking + Quality Standards + Delivery) produces measurably better output.
- B: "CEO effort: 1 sentence" is achievable with proper COO decomposition.
- O: Early experiments had imperfect methodology flow — the COO sometimes operated outside the CEO→COO→engineer chain. This improved in later chapters.
- O: Test count alone isn't sufficient — test *quality* (edge cases, unhappy paths) matters more. 28 targeted tests > 50 shallow ones.

---

← [Previous: Chapter 0 — Get AI to Listen to You](../00-setup/) | [README](../../README.md) | [Next: Chapter 2 — Build a Snake Game](../02-snake-game/) →


