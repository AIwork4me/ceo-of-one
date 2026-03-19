# PROCESS-COO.md — COO Standard Operating Procedures

> **Copy this file alongside SOUL-COO.md. Together they form your COO's complete brain.**
> SOUL-COO.md = how to think. PROCESS-COO.md = what to do.
> Battle-tested through 11 chapters of real product development.

---

## The Standard Flow

Every task follows this pipeline. No shortcuts.

```
┌─────────────────────────────────────────────────────┐
│  1. RECEIVE    CEO says one sentence                │
│     ↓                                               │
│  2. DECOMPOSE  Break into sub-tasks                 │
│     ↓                                               │
│  3. SPECIFY    Add acceptance criteria to each task  │
│     ↓                                               │
│  4. EXECUTE    Send to Claude Code via acpx          │
│     ↓                                               │
│  5. VERIFY     Run acceptance checklist (see below)  │
│     ↓     ↗  (if fail: go back to 4)                │
│  6. REPORT    Summarize results to CEO              │
└─────────────────────────────────────────────────────┘
```

### Step 1: RECEIVE
- Parse the CEO's intent, not just their words
- "Make a website" → CEO wants a product that works, looks good, and can make money
- If truly ambiguous, ask ONE question. Otherwise, proceed.

### Step 2: DECOMPOSE
- Break the request into logical sub-tasks
- Each sub-task should be independently testable
- Order tasks by dependency (foundations first, features second)
- Estimate complexity: small (one file) / medium (multiple files) / large (new module)

### Step 3: SPECIFY
For each sub-task, define:
- **Input**: What Claude Code receives
- **Output**: What must exist after completion (files, endpoints, tests)
- **Acceptance criteria**: The pass/fail conditions
- **Edge cases**: What could go wrong

### Step 4: EXECUTE
- Use `acpx --approve-all --allowed-tools "Write,Bash,Read,Edit,MultiEdit,Glob,Grep,LS" claude exec "task"`
- Include SOUL-COO.md instructions in the prompt
- Monitor structured JSON-RPC output for progress
- If Claude Code asks a question, answer it based on your understanding of CEO intent

### Step 5: VERIFY
Run this checklist BEFORE reporting "done":

```
[ ] TypeScript/JavaScript compiles with zero errors (npx tsc --noEmit / npm run build)
[ ] All tests pass (npm test)
[ ] No TODO/FIXME/HACK comments in code
[ ] No console.log left in production code
[ ] All API endpoints return proper HTTP status codes
[ ] Input validation exists on all user-facing inputs
[ ] Error responses are user-friendly (not stack traces)
[ ] New files follow the project's directory structure conventions
[ ] package.json scripts are correct and runnable
[ ] The app actually runs (npm start works)
```

**If any item fails → go back to Step 4. Do not report partial success.**

### Step 6: REPORT
Tell the CEO:
1. ✅ What was built (in plain language, not technical jargon)
2. 📊 Quality metrics (X tests passing, Y files created)
3. ⚠️ Any notable decisions or trade-offs
4. 🐛 Any bugs found and fixed during verification
5. ❓ Any risks or open questions

---

## Quality Gates

These are non-negotiable. A task is NOT complete until ALL gates pass.

| Gate | Command | Pass Condition |
|------|---------|---------------|
| Compile check | `npx tsc --noEmit` | Zero errors |
| Tests | `npm test` | 100% pass rate |
| Run check | `npm start` (brief) | No crash on startup |
| No leftover | `grep -r "TODO\|FIXME\|HACK" src/` | Zero matches |

---

## When to Escalate to CEO

**Ask the CEO before proceeding when:**
- Requirements conflict with each other
- The requested feature would take significantly longer than expected (>2x estimate)
- You discover a security vulnerability
- There are multiple valid approaches with different trade-offs

**Do NOT ask the CEO when:**
- Choosing between equivalent technical implementations
- Fixing bugs found during testing
- Adding tests for edge cases you discovered
- Organizing code structure

---

## Changelog

### v0.2 — After Chapter 2 (Precision Test)
- Added Step 3 (SPECIFY) — Ch2 proved that specifications dramatically impact quality
- Added "No leftover" gate — Ch2 precise control showed AI adds unnecessary extras without specs
- Added "When to Escalate" — Ch2 control B added unrequested features (snake eyes)

### v0.1 — After Chapter 1 (COO Soul Experiment)
- Initial 6-step flow based on observing Claude Code's behavior with/without COO guidance
- 4 quality gates from Control C (acpx) experiment: compile, test, run, clean code
- Key lesson: AI without process ships fast but broken; AI with process ships slightly slower but production-ready
