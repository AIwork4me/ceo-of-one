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

### Step 1: Find your OpenClaw workspace

Run `openclaw status` to find your workspace path.

Default locations:
- **Windows:** `C:\Users\<YourName>\.openclaw\workspace\`
- **macOS/Linux:** `~/.openclaw/workspace/`

### Step 2: Copy configuration files

**Windows (PowerShell):**
```powershell
$workspace = "$env:USERPROFILE\.openclaw\workspace"
Copy-Item templates/SOUL-COO.md "$workspace/SOUL.md"
Copy-Item templates/PROCESS-COO.md "$workspace/PROCESS-COO.md"
Copy-Item templates/review-checklist.md "$workspace/review-checklist.md"
Copy-Item templates/TOOLS.md "$workspace/TOOLS.md"
Copy-Item templates/HEARTBEAT.md "$workspace/HEARTBEAT.md"
```

**macOS/Linux:**
```bash
WORKSPACE="$HOME/.openclaw/workspace"
cp templates/SOUL-COO.md "$WORKSPACE/SOUL.md"
cp templates/PROCESS-COO.md "$WORKSPACE/PROCESS-COO.md"
cp templates/review-checklist.md "$WORKSPACE/review-checklist.md"
cp templates/TOOLS.md "$WORKSPACE/TOOLS.md"
cp templates/HEARTBEAT.md "$WORKSPACE/HEARTBEAT.md"
```

### Step 3: Restart OpenClaw and start talking

```bash
openclaw gateway restart
```

Then open your OpenClaw chat and say: "帮我做一个课程平台。"

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
