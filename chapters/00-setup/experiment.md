<p align="left"><a href="experiment_zh-CN.md">简体中文</a></p>

# Chapter 0 Experiment: Installing the AI Team

## Objective

Verify that a non-programmer can install the three required tools (OpenClaw, acpx, Claude Code) and successfully issue their first AI command — end to end, from zero to a file created by AI.

## Setup

| Item | Detail |
|---|---|
| **CEO** | Non-programmer, no prior Node.js experience |
| **Tools to install** | Node.js ≥18, OpenClaw, acpx, @anthropic-ai/claude-code |
| **API Key** | Anthropic API key from console.anthropic.com |
| **Success criteria** | `acpx claude exec` creates `hello.txt` without errors |
| **Environment** | Windows 11 (PowerShell), fresh Node.js install |

## Process

### Step 1: Install Node.js

Downloaded LTS from nodejs.org, ran installer, verified:

```bash
node -v   # v20.x
npm -v    # 10.x
```

No issues. Standard installer, next-next-next-finish.

### Step 2: Install the three tools

```bash
npm install -g openclaw
npm install -g acpx
npm install -g @anthropic-ai/claude-code
```

All three installed successfully. No dependency conflicts.

### Step 3: Set API key

```bash
$env:ANTHROPIC_API_KEY = "sk-ant-..."
```

### Step 4: Run the first command

```bash
acpx --approve-all --allowed-tools "Write,Bash,Read,Edit" claude exec "Create a file called hello.txt with content: Hello from CEO of One!"
```

Result: `hello.txt` created with the exact content specified.

### Step 5: Verify

Opened `hello.txt` in Notepad. Content matched. ✅

## Results

| Step | Status | Notes |
|---|---|---|
| Node.js install | ✅ | 2 minutes, no issues |
| OpenClaw install | ✅ | `npm install -g openclaw` |
| acpx install | ✅ | `npm install -g acpx` |
| Claude Code install | ✅ | `npm install -g @anthropic-ai/claude-code` |
| API key setup | ✅ | PowerShell `$env:` syntax |
| First command execution | ✅ | `hello.txt` created |
| `usage_update` errors | ⚠️ | Appeared but harmless — known acpx bug |

## Key Insights

1. **It actually worked on the first try.** No drama, no troubleshooting. Download Node, run three npm installs, set a key, send a command. The hardest part was finding where to get the Anthropic API key.

2. **`--allowed-tools` is the #1 pitfall.** Without it, Claude Code refuses to write files. This single flag is the difference between "AI does something" and "AI sits there asking for permission." We spent more time explaining *why* this flag matters than actually using it.

3. **The `usage_update` error is a red herring.** It looks scary but does nothing. We should have documented this pitfall from day one instead of letting users discover it on their own.

4. **"First success moment" matters more than the tool itself.** Seeing a file that AI created for you is the hook. Everything after this chapter builds on that moment of "wait, it actually worked."

## What This Proves

A non-programmer can go from zero to "AI built something for me" in under 5 minutes. The entire CEO of One method rests on this foundation — if the tools don't install cleanly, nothing else matters. They did.

## Retained Knowledge

- B: Node.js LTS (≥18) is the only prerequisite. Everything else installs via npm.
- B: `--allowed-tools "Write,Bash,Read,Edit"` is mandatory for Claude Code to create files.
- B: `usage_update` errors from acpx are cosmetic and can be ignored.
- O: The first command should be as simple as possible — create a text file, not build an app. The goal is proof of concept, not impressiveness.

---

[README](README.md) | [Next: Chapter 1 — Give AI a Top-Tier COO Brain](../01-soul/) →

