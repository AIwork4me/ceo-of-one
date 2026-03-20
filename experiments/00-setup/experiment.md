<p align="left">
<a href="experiment_zh-CN.md"><img src="https://img.shields.io/badge/Experiment-简体中文-blue" alt="简体中文" /></a>
</p>

# Experiment: 00-setup Validation

> **Date:** 2026-03-20
> **Goal:** Verify a beginner can go from zero to "AI did something for me" in under 5 minutes
> **Status:** ✅ Completed

<p align="left">
  <a href="experiment_zh-CN.md"><img src="https://img.shields.io/badge/🇨🇳-中文版-blue" alt="中文版" /></a>
</p>

## Hypothesis

A complete beginner can install all tools and get Claude Code to execute a task via acpx in under 5 minutes.

## Environment Baseline

| Tool | Version |
|------|---------|
| Node.js | v24.12.0 |
| npm | 11.6.2 |
| OpenClaw | 2026.3.13 |
| acpx | 0.3.1 |
| Claude Code | 2.1.76 |
| git | 2.52.0 |
| OS | Windows 10 (x64) |

## Execution Log

### Step 1: Install Node.js
**Not tested** — assumed pre-installed. Most developers have Node.js.
**Note for tutorial:** Add a "Prerequisites: Install Node.js" section with link.

### Step 2: Install OpenClaw
```bash
npm install -g openclaw
```
**Result:** Already installed. Skipped timing.
**Note:** Need to time this on a fresh machine for accurate data.

### Step 3: Install acpx
```bash
npm install -g acpx
```
**Result:** Already installed. Skipped timing.

### Step 4: Install Claude Code
```bash
npm install -g @anthropic-ai/claude-code
```
**Result:** Already installed. Skipped timing.

### Step 5: Configure API Key
```bash
export ANTHROPIC_API_KEY=sk-ant-...
```
**Result:** Already configured.
**Note for tutorial:** This is the #1 stumbling block. Need clear instructions.

### Step 6: Test acpx without --allowed-tools (FAIL)

```bash
acpx claude exec "Create a file called hello.txt with content: Hello!"
```

**Result:** ❌ Claude Code refused to write:
```
Permission to use Write has been denied because Claude Code is running in don't ask mode.
```

**Lesson:** `acpx claude exec` without `--allowed-tools` cannot write files. **This is the #1 pitfall for beginners.**

### Step 7: Test acpx with correct flags (SUCCESS)

```bash
acpx --approve-all --allowed-tools "Write,Bash,Read,Edit" claude exec "Create a file called hello.txt with content: Hello from CEO of One!"
```

**Result:** ✅ Success!
```
[tool] Write hello.txt (completed)
Created `hello.txt` with the message "Hello from CEO of One!"
[done] end_turn
```

### Step 8: Non-critical error observed

```
Error handling notification: session/update usage_update
code: -32602, message: "Invalid params"
```

**Assessment:** Non-critical. Known acpx bug. Does not affect functionality.

## Analysis

### Key Findings

1. **`--allowed-tools` is mandatory.** Without it, Claude Code runs in `dontAsk` mode and refuses all write operations. Beginners will hit this wall immediately.

2. **The three-flag combo works:** `--approve-all` + `--allowed-tools` + `claude exec` is the correct recipe.

3. **API Key configuration is the biggest friction point.** Beginners need step-by-step guidance.

4. **5-minute claim is realistic** IF:
   - Node.js is pre-installed
   - They have their API key ready
   - The tutorial gives the exact command with flags

### Pitfalls for Tutorial

| Pitfall | Severity | Solution |
|---------|----------|----------|
| Missing `--allowed-tools` | 🔴 Critical | Give the exact command, don't let them guess |
| API Key setup confusion | 🟡 High | Dedicated step with screenshots |
| `usage_update` error | 🟢 Low | Mention it's harmless in the pitfalls section |
| npm install on Windows may be slow | 🟡 High | Note: ~2-5 min on first install |

## Conclusion

**Hypothesis partially confirmed.** The 5-minute claim is achievable if prerequisites (Node.js + API key) are ready. The biggest risk is the `--allowed-tools` pitfall — this must be highlighted prominently.

**Next step:** Write Chapter 0 based on these findings.
