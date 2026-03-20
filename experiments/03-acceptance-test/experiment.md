<p align="left">
<a href="experiment_zh-CN.md"><img src="https://img.shields.io/badge/Experiment-简体中文-blue" alt="简体中文" /></a>
</p>

# Experiment 03: Acceptance Criteria — Do They Actually Matter?

## Setup

| | Control A | Control B |
|---|---|---|
| **Task** | Course List API (Express + TypeScript) | Same task |
| **Prompt** | Feature description + "Write tests. Make sure it works." | Feature description + **13 acceptance criteria** |
| **Agent** | Claude Code | Claude Code |
| **Environment** | Identical | Identical |

## 13 Acceptance Criteria (Group B only)

| # | Criterion |
|---|-----------|
| 1 | TypeScript compiles with zero errors |
| 2 | All tests pass, minimum 20 test cases |
| 3 | Input validation: title/instructor non-empty, price ≥ 0, category enum |
| 4 | GET /api/courses sorted by createdAt desc |
| 5 | ?category= filter |
| 6 | ?published= filter |
| 7 | GET /api/courses/:id returns 404 with JSON error body |
| 8 | POST returns 400 with specific error messages |
| 9 | PUT returns 404 for non-existent |
| 10 | DELETE returns 204, subsequent GET returns 404 |
| 11 | Error format: { error, message, details? } |
| 12 | No TODO, FIXME, console.log |
| 13 | Code organized in src/types/, src/routes/, src/store/, src/controllers/ |

## Results

| Metric | A (No Criteria) | B (13 Criteria) | Delta |
|--------|:-:|:-:|:-:|
| Tests passing | 16/16 | 23/23 | +44% |
| Duration | ~5 min | ~5.25 min | +5% |
| Bugs encountered | 2 | 0 | — |
| Test lines | 259 | 342 | +32% |
| Filter support | ❌ | ✅ | — |
| Sorting by createdAt | ❌ | ✅ | — |
| Category enum validation | ❌ | ✅ | — |
| Structured error format | ❌ | ✅ | — |
| MVC structure (controllers/) | ❌ | ✅ | — |

### Bugs (Group A only)

1. **Express 5 params type error** — required explicit type annotation
2. **uuid ESM compatibility** — needed import adjustment

Both fixed during the session. Group B never hit either.

## Key Findings

### 1. Acceptance criteria = fewer bugs

A hit 2 bugs. B hit 0. Criteria forced B to think about types and imports upfront.

### 2. "Make sure it works" ≠ acceptance criteria

A's vague instruction → build, break, fix. B's specific criteria → build right the first time.

### 3. Criteria drive completeness

Without criteria, A skipped filtering, sorting, enum validation, structured errors. With criteria, B delivered all 13.

### 4. Error format: prototype vs. production

**Group A:**
```json
{ "error": "Course not found" }
```

**Group B:**
```json
{ "error": "NOT_FOUND", "message": "Course not found", "details": { "field": "id", "issue": "not_found" } }
```

### 5. Quality is almost free

B took only 5% longer despite delivering 44% more tests and full feature coverage.

### 6. The COO's job is to write acceptance criteria

| Role | Does this |
|------|-----------|
| **CEO** | "Build me a course list API" |
| **COO** | Writes the 13 criteria |
| **Engineer** | Delivers to spec |

## Conclusion

Acceptance criteria are the cheapest quality multiplier available. They cost minutes to write, eliminate bugs, guarantee completeness, and add negligible time to execution. The question isn't whether to write them — it's who writes them. In a one-person company, that's the COO brain: disciplined prompt engineering with specific, verifiable criteria.
