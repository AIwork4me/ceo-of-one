<p align="left">
<a href="README_zh-CN.md"><img src="https://img.shields.io/badge/README-简体中文-blue" alt="简体中文" /></a>
</p>

# Your COO Has a Checklist

> The difference between "make sure it works" and a proper acceptance checklist is the difference between a prototype and a product.

---

## 🎯 You'll Learn

- Why "make sure it works" is the most expensive sentence in software
- What acceptance criteria are (in plain English)
- The exact checklist your COO uses — and why you never need to write it yourself
- The real numbers from our experiment: same task, two approaches, very different results

---

## 🗣️ What You'll Say

Your entire job as CEO is one sentence:

> "Build me a course list API."

That's it. Your COO receives this, adds acceptance criteria automatically, and the engineering team gets a clear definition of "done."

You don't need to say "make sure it handles errors" or "add sorting" or "validate the inputs." The COO does that. That's what a COO is for.

---

## 🔍 Why Acceptance Criteria Matter

We ran an experiment. Same task (a Course List API), same tools, same team — just two different approaches.

### The Results

| | No Acceptance Criteria | With Acceptance Criteria |
|---|---|---|
| **Time** | ~5 minutes | ~5.25 minutes |
| **Test cases** | 16 | 23 |
| **Bugs found** | 2 | 0 |
| **Filter support** | ❌ | ✅ |
| **Sorting** | ❌ | ✅ |
| **Input validation** | ❌ | ✅ |
| **Structured error responses** | ❌ | ✅ |

Read that again. **15 seconds more time.** Ten times better result.

### What Went Wrong Without Criteria

When you just say "make sure it works," the team builds what *they think* "works" means. And their definition is usually different from yours. They might skip error handling because "it works when you use it correctly." They might skip sorting because "the data shows up." They might skip validation because "the frontend handles that."

Every skipped item is a bug waiting to happen. Every assumption is a disagreement waiting to surface.

---

## 📋 The COO's Checklist

These are the 13 acceptance criteria the COO adds to a task like "Build a course list API." You don't need to memorize them. You just need to know they exist.

1. **Zero compilation errors** — The code must build cleanly. No warnings treated as optional.
2. **Minimum 20 test cases** — Not a suggestion. A floor. Every path, every edge case, every unhappy path.
3. **Input validation** — Non-empty strings, prices can't be negative, categories must match the allowed list.
4. **Sorted by newest first** — Results should be ordered by creation date, descending.
5. **Filter support** — Users can filter by category and publish status via query parameters.
6. **Proper 404 responses** — Not a bare status code. A JSON body explaining what's missing.
7. **Specific validation errors** — Don't just say "invalid input." Say *which* field and *why*.
8. **Consistent error format** — Every error follows the same structure: error type, message, and optional details.
9. **No shortcuts** — No TODO comments, no FIXME markers, no leftover debug logs.
10. **Organized directory structure** — Files go where they belong. No dumping everything in one folder.
11. **Pagination support** — Large lists shouldn't dump everything at once.
12. **Edge case coverage** — Empty results, duplicate entries, special characters in names.
13. **Documentation** — A brief description of what the endpoint does and how to use it.

That's the checklist. Your COO writes it. Your team follows it. You get a product, not a prototype.

---

## 💡 The Secret

"Make sure it works" sounds responsible. It sounds like you're holding the team accountable.

It's not. It's the opposite.

"Make sure it works" is vague. Vague requirements produce vague results. The team *did* make sure it worked — by their definition. And their definition was: it compiles and returns data when everything goes perfectly.

Acceptance criteria are specific. Specific requirements produce specific results. The team knows exactly what "done" looks like. No guessing. No assumptions. No surprises.

Here's the thing: **you don't need to write acceptance criteria.** That's the COO's job. The COO takes your one-sentence request and turns it into a detailed, unambiguous specification. The 5% extra time (in our experiment, 15 seconds) buys you:

- 44% more test coverage
- Zero bugs instead of two
- Features you'd have to request later (filtering, sorting, validation)
- Error handling that tells users what actually went wrong

The COO doesn't slow you down. The COO makes sure you don't have to do it twice.

---

## 🎓 Chapter Takeaway

> You say "build it." Your COO says "here's what 'done' looks like." That's the partnership — and that's how a prototype becomes a product.

---

📖 **Full experiment data:** [`../experiments/03-acceptance-test/`](../experiments/03-acceptance-test/)

---

**Next:** [Chapter 4 →](../04-landing-page/README.md) | **Previous:** [← Chapter 2](../02-snake-game/README.md)

