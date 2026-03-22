<p align="left">
<a href="README_zh-CN.md"><img src="https://img.shields.io/badge/README-简体中文-blue" alt="简体中文" /></a>
</p>

# 🔄 The Product Flywheel

---

## 🎯 You'll Learn

- Why **shipping is the beginning, not the end** — real products evolve from user feedback
- How to build a **fully automated fix pipeline**: issue → fix → test → deploy → close
- Why **two separate cron jobs** (not one) is the only architecture that works
- That **CI is your last line of defense** — and why skipping it is the most expensive decision you can make

Most tutorials stop at "deploy." You ship your product, you celebrate, and then... nothing. The product sits there. Users find bugs, submit issues, and wait. Sometimes for days. Sometimes forever.

This chapter is about what happens after shipping. Because a product that doesn't respond to its users is a dead product — no matter how good the code is.

---

## 🗣️ What the CEO Said

> "让产品自己修 bug。"

One sentence. The COO's job was to build a system that turns user feedback into production improvements without human intervention.

---

## The Living Product

Think about the products you admire. Not the ones that launched perfectly — the ones that *kept getting better*. They share one trait: feedback loops shorter than a day.

A user reports a problem. By the time they check back, it's fixed. Not because someone was sitting there watching — but because the system was designed to heal itself.

This is not science fiction. We built it. Here's how it works.

### The Dead Product Pattern

Most solo developers follow this cycle:

1. Build product → deploy → celebrate
2. Users find bugs → submit issues
3. Developer checks issues (tomorrow? next week?)
4. Developer fixes bugs → tests → PR → merge → deploy
5. Go to step 2

The gap between step 2 and step 4 is where products die. Every day an issue sits open is a day a user loses trust. When the gap is a week, users stop reporting bugs. They just leave.

### The Living Product Pattern

The flywheel collapses the gap to near-zero:

1. User submits issue
2. **System** detects it (within 4 hours)
3. **System** spawns an AI agent to fix it (completes in ~2-5 minutes)
4. **System** creates a PR with tests
5. **System** runs CI (tests + build)
6. **System** merges if CI passes
7. **System** deploys to production
8. **System** closes the issue and notifies you

From the user's perspective: they report a problem, and by the time they check back, it's already fixed. They didn't wait for you. The product fixed itself.

This is the difference between *shipping* a product and *operating* a product.

---

## How the Flywheel Works

Here's the complete architecture we built for CEO of One:

```
┌─────────────────────────────────────────────────────────┐
│                    The Product Flywheel                   │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  User submits GitHub Issue                               │
│          │                                               │
│          ▼                                               │
│  ┌──────────────┐    every 4h                            │
│  │ Issue Fixer  │────── spawn Claude Code agent ────┐    │
│  │ (cron job 1) │    on isolated branch              │    │
│  └──────────────┘                                     │    │
│                                                       ▼    │
│                                          ┌─────────────┐   │
│                                          │ Claude Code  │   │
│                                          │ reads issue  │   │
│                                          │ makes fix    │   │
│                                          │ writes tests │   │
│                                          │ creates PR   │   │
│                                          │ (auto-fix)   │   │
│                                          └──────┬──────┘   │
│                                                 │          │
│                                                 ▼          │
│                                          GitHub Actions    │
│                                          CI: 111 tests    │
│                                          + build           │
│                                                 │          │
│                          ┌──────────────────┐  │          │
│                          │  Merge Watcher   │◄─┘  every 30min
│                          │  (cron job 2)   │              │
│                          │  checks CI      │              │
│                          │  merge if ✅    │              │
│                          │  close issue    │              │
│                          └───────┬─────────┘              │
│                                  │                        │
│                                  ▼                        │
│                           Vercel Deploy                  │
│                                  │                        │
│                                  ▼                        │
│                           Production Live                │
│                                  │                        │
│                                  ▼                        │
│                           Notify You (Feishu)            │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

Six moving parts, one loop. Let's look at each one.

---

## Two Jobs, One Loop

Here's the mistake we made first: we put everything in a single cron job. The flow was:

```
Fetch issues → spawn fix agent → wait for completion → check CI → merge → notify
```

It looked right on paper. In practice, it broke immediately.

The problem: `spawn fix agent` is fire-and-forget. The agent runs in a separate process. It takes 2-5 minutes. But the cron job doesn't wait — it moves to "check CI" immediately, finds nothing (the PR hasn't been created yet), and reports "No issues found." The fix agent finishes 3 minutes later, alone and unheard.

**The fix: split into two jobs.**

| Job | Runs | What it does | Why separate |
|-----|------|-------------|-------------|
| **Issue Fixer** | Every 4 hours | Detect issues → spawn agents → create PRs | Fix is slow (2-5 min) and unpredictable |
| **Merge Watcher** | Every 30 minutes | Check PRs → verify CI → merge → close issue | Merge is fast (instant) but needs CI to be done |

The fixer runs infrequently because users don't submit issues every minute. The merge watcher runs frequently because once a PR is created, you want it merged as soon as CI passes — not 4 hours later.

**Worst case:** issue submitted 3.5 hours after the last fixer run + 5 min to fix + 30 min for merge watcher = **~4 hours to production.**

**Best case:** issue submitted right as fixer runs + 5 min to fix + 30 min for merge watcher = **~35 minutes to production.**

Real data from our project:
- Issue #17 (Hero redesign): 1m52s to create PR, total ~3.5 min to production
- Issue #19 (OG image): 3m26s to create PR, merged after CI passed

This separation of concerns is not optional. It's the only architecture that works.

---

## CI: The Safety Net

Every PR goes through GitHub Actions before it can be merged:

```yaml
jobs:
  test-and-build:
    steps:
      - npm install
      - npx jest --ci --forceExit     # 111 tests
      - npm run build                  # production build
```

This is non-negotiable. Here's why:

**The AI agent is smart but not infallible.** It will occasionally introduce regressions — changing a component that breaks another component, adding a dependency that conflicts with an existing one, or "fixing" a bug by breaking something else. CI catches these.

**Our CI also skips doc-only changes** with `paths-ignore`:

```yaml
paths-ignore:
  - '**.md'      # No CI for docs
  - '**.svg'
  - '**.png'
  - 'showcase/**'
```

This saves resources. Markdown changes don't need 111 tests to validate.

**What happens when CI fails?** The merge watcher sees `conclusion: "failure"` and stops. It does NOT merge. It notifies you with the failure details. You review, fix manually or let the next cycle retry.

**Never skip CI.** The 90 seconds it takes to run is the cheapest insurance you'll ever buy. A single bad merge can cost hours of debugging and lost user trust.

---

## Labels as State Machine

Labels are how the flywheel tracks what's been processed, what's pending, and what needs human attention:

| Label | Meaning | Action |
|-------|---------|--------|
| `auto-fix` | PR created by the flywheel | Merge watcher picks this up |
| `needs-review` | Fix failed or needs human judgment | Notify human, skip auto-merge |
| `auto-fixed` | Issue resolved and deployed | Archive marker |

The flow is simple:

```
Issue opened (no label)
  → Fix agent creates PR with "auto-fix" label
  → Merge watcher sees "auto-fix" → checks CI → merges
  → Issue auto-closes (PR body contains "Closes #XX")
```

**If anything goes wrong**, the issue gets labeled `needs-review` and you get notified. The flywheel never force-merges. It never force-pushes. It fails safe.

---

## What This Means

Let's be honest about what you've built across these 12 chapters.

You started with nothing. One sentence from a CEO. An AI COO that decomposed it, specified it, and handed it to an AI engineer that built it. Twelve chapters, twelve modules, 111 tests, a bilingual website, and now — a system that keeps improving the product while you sleep.

This is not a tutorial anymore. It's a business.

**The philosophical shift:** Most developers think of their job as *writing code*. The COO thinks of their job as *operating a system*. Code is just one component. The CI pipeline, the labels, the cron jobs, the notification channels — these are all components. And like any system, each component has a role, and the system only works when the roles are clear and the handoffs are clean.

**The practical implication:** You now have a product that responds to its users in minutes, not days. That's not a feature — it's a competitive advantage. Users notice when their feedback disappears and reappears as a fix. They tell their friends. They submit more feedback. The flywheel spins faster.

**What's next:** Chapter 13 is your graduation project. Take everything you've learned and build something entirely your own — from idea to revenue, with the full flywheel running.

---

## 🧠 Retain

- B @flywheel: A product flywheel turns feedback into production fixes automatically. Evidence: Issue #17 fixed and deployed in 3.5 minutes from submission.
- B @two-job-architecture: Fix and merge must be separate cron jobs. Evidence: Single-job approach failed — fix agent hadn't finished when merge step ran.
- B @ci-gate: CI is non-negotiable. It catches regressions the AI agent introduces. Evidence: 111 tests run on every PR; no merge without pass.
- B @labels-state: Labels are the state machine. `auto-fix` = ready, `needs-review` = human needed, `auto-fixed` = done. Evidence: Three-label system handles success, failure, and edge cases.
- B @fail-safe: The flywheel never force-merges, never force-pushes. Evidence: CI failure → notification to human, no merge.
- O(c=0.95) @living-product: The gap between user feedback and fix deployment is the single most important metric for product health. Shorter gap = more trust = more feedback = faster improvement.
