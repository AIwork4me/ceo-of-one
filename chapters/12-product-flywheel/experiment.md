<p align="left">
<a href="experiment_zh-CN.md"><img src="https://img.shields.io/badge/Experiment-简体中文-blue" alt="简体中文" /></a>
</p>

# Chapter 12: Product Flywheel — Build an Auto-Healing Product

---

## Context

Chapters 1-11 taught you how to build a product with AI. You have a Next.js app with 111 tests, CI, and a Vercel deployment. Now you'll add the final piece: a system that automatically fixes bugs and ships improvements from user feedback — while you sleep.

## Task

Set up a product flywheel for your own project that:
1. Monitors GitHub issues automatically
2. Spawns AI agents to fix them
3. Runs CI before merging
4. Deploys to production
5. Closes issues and notifies you

## COO Process

### 1. RECALL

Key lessons from previous chapters:

- **Test-first verification** (Ch3): Acceptance criteria prevent bugs; tests catch regressions
- **Architecture before features** (Ch4): Modular structure makes targeted fixes safe
- **CI as a gate** (Ch8): Never merge without passing tests + build
- **Single-job fallacy** (this chapter): We learned that fix and merge must be separate processes

### 2. AUDIT

Check what you already have:

```
# 1. CI workflow exists?
ls .github/workflows/ci.yml

# 2. Tests passing?
cd platform && npx jest --ci --forceExit

# 3. Branch protection on master?
gh api repos/{owner}/{repo}/branches/master/protection
```

**Our setup:** GitHub Actions CI with 111 tests + build. No branch protection (we use the merge watcher as our gate instead — it only merges when CI passes).

### 3. ARCHITECT DECISION

Three architectures considered:

| Architecture | Latency | Complexity | Failure Mode |
|-------------|---------|-----------|-------------|
| Single cron job | Low (one thing to manage) | **Broken** — fix agent hasn't finished when merge step runs | Silent failure: reports "no issues" when fix is in progress |
| GitHub Actions bot | Medium (runs in cloud) | High — needs API keys in CI, no local dev environment | CI secrets exposure risk |
| **Two cron jobs** | Low | Medium (two configs) | Clean separation — each job has one responsibility |

**Decision: Two cron jobs.** The issue fixer (every 4h) and the merge watcher (every 30min) are independent processes with independent failure modes. If one breaks, the other keeps working.

### 4. SPECIFY

**Issue Fixer** (runs every 4 hours):
- Fetch open issues from GitHub API
- Skip issues with `needs-review` label
- Skip issues that already have a PR or in-progress branch
- For each eligible issue: spawn a Claude Code agent on an isolated branch
- Agent reads issue, makes fix, runs tests, creates PR with `auto-fix` label
- PR body includes `Closes #{issue_number}` for auto-close
- Fire-and-forget: do not wait for agent to finish

**Merge Watcher** (runs every 30 minutes):
- Find open PRs with `auto-fix` label
- Check `mergeable_state`: only merge if `clean`
- If `unstable`: check CI status, wait if still running, abort if failed
- If `clean`: squash merge, extract issue # from PR body, close issue
- If `blocked` or `behind`: report, do not merge
- **Always report status** — even if there's nothing to do

**Safety rules:**
- Never force-push
- Never merge when CI fails
- Label `needs-review` on failure → notify human
- Claims file prevents duplicate processing (same issue processed twice)
- Max 10 issues per fixer run
- Max 20 Claude Code turns per fix

### 5. EXECUTE

This depends on your platform. For OpenClaw:

```json
// ~/.openclaw/cron/jobs.json
{
  "version": 1,
  "jobs": [
    {
      "id": "my-project-issue-fixer",
      "name": "My Project: Issue Fixer",
      "schedule": { "kind": "cron", "expr": "0 */4 * * *" },
      "timezone": "Asia/Shanghai",
      "enabled": true,
      "prompt": "Fetch open issues from {owner}/{repo} using gh-issues skill with --yes --cron --limit 10. Report status. Always report."
    },
    {
      "id": "my-project-merge-watcher",
      "name": "My Project: Merge Watcher",
      "schedule": { "kind": "cron", "expr": "*/30 * * * *" },
      "timezone": "Asia/Shanghai",
      "enabled": true,
      "prompt": "Check open auto-fix PRs on {owner}/{repo}. Verify CI passes. Squash merge. Close related issues. Always report status."
    }
  ]
}
```

**CI workflow** (`.github/workflows/ci.yml`):

```yaml
on:
  pull_request:
    branches: [master]
    paths-ignore: ['**.md', '**.svg', '**.png']
  push:
    branches: [master]
    paths-ignore: ['**.md', '**.svg', '**.png']

jobs:
  test-and-build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install
        working-directory: platform
      - run: npx jest --ci --forceExit
        working-directory: platform
      - run: npm run build
        working-directory: platform
```

**GitHub Labels** to create:
- `auto-fix` — green, for PRs ready to merge
- `needs-review` — red, for issues needing human attention
- `auto-fixed` — blue, archive marker

### 6. VERIFY

**End-to-end test:**

1. Create a real issue on your repo with clear acceptance criteria
2. Wait for the fixer cron to trigger (or trigger manually)
3. Watch: PR should appear with `auto-fix` label within 5 minutes
4. Watch: CI should run automatically
5. Watch: Merge watcher should merge within 30 minutes of CI passing
6. Verify: Issue is auto-closed
7. Verify: Production deployment is live

**Our real results:**

| Issue | Description | Fix time | Total to production |
|-------|------------|----------|-------------------|
| #17 | Hero redesign (before/after narrative) | 1m52s | ~3.5 min |
| #19 | OG image redesign (visual narrative) | 3m26s | ~5 min |

**Things that can go wrong (and how to check):**
- Fix agent fails silently → Check for orphan branches: `git branch | grep fix/`
- CI fails → Merge watcher will notify you, check the Actions tab
- Claims file stale → Claims expire after 2 hours; stuck issues get retried
- GitHub rate limit → 5,000 requests/hour; unlikely with our frequency

### 7. RETAIN

- B @two-job-architecture: Fix and merge must be separate cron jobs with different frequencies. Evidence: Single-job approach failed in practice — fix agent hadn't finished when merge step ran.
- B @ci-gate: CI is the only safety net between a bad fix and production. Evidence: 111 tests + build on every PR; merge watcher refuses to merge on CI failure.
- B @labels-state-machine: Three labels (`auto-fix`, `needs-review`, `auto-fixed`) handle all states. Evidence: Clean state transitions across 10+ real issues.
- B @fire-and-forget: Sub-agents run in isolated branches. If they fail, master is untouched. Evidence: No bad merge in production despite agent failures.
- B @always-report: Every cron run must report status, even "nothing to do." Evidence: Silent failures are the worst failures.
- O(c=0.90) @feedback-latency: User feedback → fix deployment time is the most important product metric most teams don't measure. Ours: 3.5-5 minutes.
- O(c=0.85) @operational-thinking: The shift from "writing code" to "operating a system" is the most important mindset change in this course.

### 8. REPORT

**Results:**
- Product flywheel operational: ✅
- Two cron jobs configured: Issue Fixer (4h) + Merge Watcher (30min)
- CI gate: 111 tests + build, must pass before merge
- Labels: auto-fix / needs-review / auto-fixed
- End-to-end verified: Issue → PR → CI → merge → deploy → close
- Real-world latency: 3.5-5 minutes from issue to production

**What this means for your product:**
Your users will experience something rare: a product that responds to their feedback in minutes. Not because you're working harder — but because you built the right system. The flywheel turns user feedback into product improvements automatically. The faster it spins, the more feedback you get, the more improvements ship, the more users trust you.

This is Chapter 12. You now have everything: a product, a team (of AI), a quality system, and a self-improvement loop. One more chapter to go.
