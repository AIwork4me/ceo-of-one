# 🧠 Give AI a Top-Tier COO Brain

<p align="left">
  <a href="README_zh-CN.md"><img src="https://img.shields.io/badge/README-简体中文-blue" alt="简体中文" /></a>
</p>

## 🎯 You'll Get This

An AI that thinks like a COO — it plans, builds, tests, and self-verifies before reporting back to you.

---

## 📖 The Story

Meet Sam. Sam runs two experiments:

**Experiment 1:** Sam tells AI "Build me a Todo API." AI writes some code and says "Done!" Sam tries it — half the features are missing, no error handling, and when Sam sends bad data, the server crashes.

**Experiment 2:** Sam tells AI the same thing, but this time AI has a "COO brain" — it writes code, runs tests, finds a bug, fixes it, and only then says "Done. All 24 tests pass."

Same task. Same AI. Wildly different results.

The difference? Sam gave the AI a **soul** — a set of instructions that defines how it should think and work.

---

## 🗣️ What You'll Say

Here's the magic: **you only say one sentence.** OpenClaw (your COO) does the rest.

**What you say (CEO input):**
```
Build me a Todo REST API
```

**What OpenClaw (COO) does with it:**
1. Understands what you want (a REST API)
2. Thinks about product quality (error handling? validation? tests?)
3. Generates a detailed, structured prompt
4. Sends it to Claude Code (your engineer)
5. Claude Code builds it, tests it, verifies it
6. OpenClaw reports the result back to you

You didn't write a technical prompt. You didn't specify TypeScript or Express or Jest. **Your COO handled all of that.**

## 🔍 Why This Works

We tested three approaches. Same task: "Build a Todo REST API."

| Approach | Who Wrote the Prompt? | Tests | Quality | CEO Effort | Tool |
|----------|----------------------|-------|---------|------------|------|
| **A: No COO** | You (bare sentence) | 0 | Minimal | 1 sentence | acpx |
| **B: COO in prompt** | You (long structured prompt) | 24 ✅ | Good | ~200 words | acpx |
| **C: Real COO Flow** | **OpenClaw (COO)** | **28 ✅** | **Best** | **1 sentence** | **acpx** |

See the full experiment: [experiments/01-soul-comparison/](../../experiments/01-soul-comparison/)

**Approach B vs C produced similar quality. But in B, YOU wrote a 200-word prompt. In C, your COO generated it. Same result, zero effort from you.**

### What Made the Difference

The real COO flow added things even the "COO in prompt" approach missed:
- **Organized project structure** (`types/`, `store/`, `routes/`)
- **More thorough input validation** (trim whitespace, empty string check)
- **More test coverage** (28 tests vs 24 — added edge cases like whitespace-only titles)
- **Auto-fixed a test bug** (404 handler missing in test setup)

**Why?** Because the COO doesn't just paste a template — it thinks about what YOUR product needs. And because **acpx provides structured output**, the COO can precisely track what Claude Code built and verify it programmatically.

---

## The COO Soul Template

Here's the template. Save it. Use it for every task.

```
You are building a product, not just writing code. Follow these rules:

## Product Thinking
- Consider the user: what would break? what edge cases exist?
- Build for production: proper error handling, input validation

## Quality Standards
- Write automated tests for everything you build
- Run tests after writing code. If tests fail, fix them before finishing.
- Your code must compile/build with zero errors.

## Delivery
- Report what you built, how many tests pass, and any issues found.
- If something is unclear or risky, tell me before proceeding.

YOUR TASK HERE
```

### What Each Section Does

| Section | Purpose | Analogy |
|---------|---------|---------|
| Product Thinking | Makes AI think about users, not just code | CEO says "think about the customer" |
| Quality Standards | Forces self-verification | QA department says "test everything" |
| Delivery | Creates accountability | COO says "report results, not intentions" |

---

## ⚠️ Pitfall #1: "Just Tell It What to Do"

The most common mistake: skipping the soul and going straight to the task.

```
❌ "Build me a blog with user authentication"
```

This gets you code that might work. Maybe. Probably with bugs. No tests. No verification.

```
✅ [COO soul template] + "Build me a blog with user authentication"
```

This gets you tested, verified, production-quality code. Because the AI knows **what quality means** before it starts.

## ⚠️ Pitfall #2: The Soul Is Too Vague

```
❌ "Do a good job and test your work"
```

Too vague. AI will interpret "good" however it wants.

```
✅ "Write Jest tests covering all endpoints. Run npm test. All tests must pass."
```

Specific. Measurable. The AI knows exactly what "good" means.

---

## 💰 Cost Estimate

The COO instruction costs about 2-3x more in API tokens because the AI writes tests, runs them, and potentially fixes bugs.

| Approach | Estimated Cost | Quality |
|----------|---------------|---------|
| Bare instruction | ~$0.05 | 🟡 Might work |
| COO instruction | ~$0.15 | 🟢 Tested & verified |

**$0.10 more to go from "might work" to "tested and verified."** Worth it.

---

## 📝 Talk Template

Use this format for every command from now on:

```
acpx --approve-all --allowed-tools "Write,Bash,Read,Edit,MultiEdit,Glob,Grep,LS" claude exec "
[Copy the COO soul template here]

YOUR SPECIFIC TASK HERE
"
```

---

## ⬅️ Previous: [📋 Chapter 0 — Get AI to Listen to You](../00-setup/) | ➡️ Next: [🎯 Chapter 2 — Build a Snake game with one sentence](../02-snake-game/)

Now your AI thinks like a COO. In Chapter 2, you'll test your new power by building a playable Snake game — with just one sentence.

