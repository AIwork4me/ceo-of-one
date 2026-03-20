# COO Configuration Package

> Copy everything in this folder to your OpenClaw workspace. That's it. Your COO is ready.

## Files

| File | Copy To | Purpose |
|------|---------|---------|
| `SOUL-COO.md` | `SOUL.md` | COO's values and thinking style |
| `PROCESS-COO.md` | `PROCESS-COO.md` | Standard operating procedures (10-step flow) |
| `review-checklist.md` | `review-checklist.md` | Pre-delivery verification checklist |
| `TOOLS.md` | `TOOLS.md` | acpx commands, conventions, quick reference |
| `HEARTBEAT.md` | `HEARTBEAT.md` | What the COO monitors proactively |
| `talk-templates/` | (read-only, for CEO) | Example phrases for common situations |

## Setup

```bash
# 1. Copy to your OpenClaw workspace
cp templates/SOUL-COO.md ~/path/to/workspace/SOUL.md
cp templates/PROCESS-COO.md ~/path/to/workspace/PROCESS-COO.md
cp templates/review-checklist.md ~/path/to/workspace/review-checklist.md
cp templates/TOOLS.md ~/path/to/workspace/TOOLS.md
cp templates/HEARTBEAT.md ~/path/to/workspace/HEARTBEAT.md

# 2. Restart OpenClaw
# 3. Start talking to your COO
```

## How It Works

SOUL-COO.md = how the COO **thinks** (values, priorities, mindset)
PROCESS-COO.md = what the COO **does** (10-step flow, quality gates, anti-degradation rules)
review-checklist.md = how the COO **verifies** (pre-delivery checklist)
TOOLS.md = how the COO **builds** (acpx commands, project structure)
HEARTBEAT.md = how the COO **watches** (proactive monitoring)
talk-templates/ = how the CEO **talks** (example phrases for common situations)

## Evolution

Every file evolves through real project development (see each file's changelog).
Battle-tested across 11 chapters of building a real product.
