<p align="left"><a href="experiment_zh-CN.md"><img src="https://img.shields.io/badge/Experiment-简体中文-blue" alt="简体中文" /></a></p>

# Chapter 3 Experiment: Acceptance Criteria and the Quality Checklist

## Objective

Determine whether structured acceptance criteria (a quality checklist) attached to a task improve output quality compared to a vague "make sure it works" instruction — and whether the COO can generate these criteria automatically.

## Setup

| Item | Detail |
|---|---|
| **Task** | Build a Course List REST API with CRUD, filtering, and sorting |
| **Tool** | acpx + Claude Code with COO soul template |
| **Variable** | Acceptance criteria presence (none vs. structured checklist) |
| **Metric** | Test count, bugs, feature completeness, time |

## Process

### Step 1: Approach A — "Make Sure It Works"

Sent the task with the COO soul template but no specific acceptance criteria beyond the implicit "make sure it works."

Claude Code built a functional API. Tests passed. But:
- Only 16 test cases (vs. 23 with criteria)
- No input validation (empty strings, negative prices, invalid categories passed through)
- No filtering support
- No sorting support
- Error responses were bare status codes, no JSON body

**Time:** ~5 minutes

### Step 2: Approach B — COO-Generated Acceptance Criteria

Same task, but the COO generated 13 acceptance criteria before sending to the engineer:

1. Zero compilation errors
2. Minimum 20 test cases
3. Input validation (non-empty, positive prices, valid categories)
4. Sorted by newest first
5. Filter support (category, publish status)
6. Proper 404 responses with JSON body
7. Specific validation error messages (which field, why)
8. Consistent error format
9. No TODO/FIXME/console.log
10. Organized directory structure
11. Pagination support
12. Edge case coverage (empty results, duplicates, special characters)
13. Documentation

Claude Code built the same API, but now:
- 23 test cases covering edge cases
- Input validation for all fields
- Filtering and sorting working
- Structured JSON error responses
- No developer leftovers

**Time:** ~5 minutes 15 seconds

### Step 3: Checklist Format Iteration

We tried three checklist formats before settling on the final template:

| Format | Problem | Verdict |
|---|---|---|
| Free-form paragraph | Claude Code missed items, no clear pass/fail | ❌ Abandoned |
| Numbered list (1-13) | Better, but items felt disconnected | ⚠️ Worked but not ideal |
| Categorized with checkboxes | Clear grouping (Build, Quality, UX, Edge Cases) | ✅ **Adopted** |

The categorized format became the `review-checklist.md` template used in subsequent chapters.

## Results

| Metric | No Criteria | With Criteria | Delta |
|---|---|---|---|
| Time | ~5:00 | ~5:15 | +15 seconds |
| Test cases | 16 | 23 | +44% |
| Bugs found | 2 | 0 | — |
| Input validation | ❌ | ✅ | — |
| Filter support | ❌ | ✅ | — |
| Sorting | ❌ | ✅ | — |
| Structured errors | ❌ | ✅ | — |

## Key Insights

1. **15 seconds.** That's the cost of acceptance criteria. 15 extra seconds for zero bugs, 44% more tests, and three additional features. The ROI is absurd. Every argument against "over-specifying" collapses in the face of this number.

2. **"Make sure it works" is the most expensive sentence in software.** It sounds responsible but it's actually the laziest quality standard possible. The team *did* make sure it worked — by their definition (it compiles and returns data when everything goes right). Your definition is different. Acceptance criteria close that gap.

3. **The COO should generate criteria, not the CEO.** The CEO says "build a course list API." The COO adds 13 criteria automatically. The CEO never needs to think about pagination or input validation — the COO handles that domain knowledge.

4. **Checklist format matters less than checklist existence.** We iterated on format (paragraph → numbered list → categorized), but the biggest quality jump was from "no checklist" to "any checklist." Format optimization is Chapter 3.5 stuff. Having a checklist at all is the Chapter 3 insight.

5. **The methodology was still forming.** Same early-chapter caveat: the COO ran both approaches and did the comparison. In a mature pipeline, these would be independent engineer runs coordinated by the COO. We were still learning the workflow ourselves while documenting it.

## What This Proves

Structured acceptance criteria are the highest-ROI quality intervention available. They cost 15 seconds and eliminate entire categories of bugs and missing features. The COO can generate them automatically, meaning the CEO pays zero attention cost. The checklist format we settled on (categorized, with pass/fail per item) became the permanent template for all subsequent chapters.

## Retained Knowledge

- B: Acceptance criteria add ~15 seconds to a build but produce 44% more test coverage and zero bugs.
- B: "Make sure it works" is insufficient — it means different things to different people.
- B: The COO generates criteria automatically from the CEO's one-sentence request.
- B: Categorized checklist format (Build / Quality / UX / Edge Cases) is clearest for engineer consumption.
- O: The `review-checklist.md` template was born from this experiment's format iteration.
- O: Checklist format iteration matters, but checklist *existence* matters 10x more.

---

← [Previous: Chapter 2 — Build a Snake Game](../02-snake-game/) | [README](../../README.md) | [Next: Chapter 4 — Building the Real Landing Page](../04-landing-page/) →


