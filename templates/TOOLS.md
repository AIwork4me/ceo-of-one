# TOOLS.md — COO Tool Configuration

> Environment-specific settings for the COO. Update as you set up tools.

---

## acpx — Communicating with Claude Code

### Standard Command Template
```bash
acpx --approve-all --allowed-tools "Write,Bash,Read,Edit,MultiEdit,Glob,Grep,LS" claude exec "[TASK]"
```

### Permission Layers
| Layer | Flag | Purpose |
|-------|------|---------|
| L1: Approve all | `--approve-all` | Auto-approve all Claude Code actions |
| L2: Tool whitelist | `--allowed-tools "..."` | Restrict which tools Claude Code can use |

### Important
- **Always include `--allowed-tools`**. Without it, Claude Code in dontAsk mode will refuse to write files.
- The standard whitelist `"Write,Bash,Read,Edit,MultiEdit,Glob,Grep,LS"` covers 99% of tasks.

### PowerShell Note (Windows)
If you use PowerShell, complex task descriptions may have escaping issues. Solution: write the task to a file first, then pass it:
```powershell
# Write task to file
"Build me a login page" | Out-File -Encoding utf8 task.md
# Pass file content to acpx
acpx --approve-all --allowed-tools "Write,Bash,Read,Edit,MultiEdit,Glob,Grep,LS" claude exec (Get-Content task.md -Raw)
```

---

## Project Directory Convention (Next.js + Modular Architecture)

```
platform/
├── src/
│   ├── app/                    # Next.js App Router pages & API routes
│   │   ├── page.tsx            # Landing page
│   │   ├── courses/page.tsx    # Course catalog
│   │   ├── auth/page.tsx       # Login / Register
│   │   ├── profile/page.tsx    # User profile
│   │   ├── dashboard/page.tsx  # Admin dashboard
│   │   └── api/                # API endpoints (thin adapters)
│   │       ├── auth/
│   │       ├── courses/
│   │       ├── payments/
│   │       └── dashboard/
│   ├── features/               # Feature modules (one per domain)
│   │   ├── auth/               # types.ts, store.ts, service.ts, routes.ts
│   │   ├── courses/
│   │   ├── payment/
│   │   └── dashboard/
│   └── lib/                    # Shared utilities (one-way dependency)
│       ├── types/
│       └── utils/
├── public/                     # Static assets
├── package.json
├── next.config.js
├── tailwind.config.js
└── jest.config.js
```

### Architecture Rules
- `features/` modules are independent — NO cross-feature imports
- `features/` can import from `lib/` — `lib/` NEVER imports from `features/`
- API routes in `app/api/` are thin adapters — they can import from `features/`
- Each new feature = one new folder in `features/`, never modify existing ones

---

## Changelog

### v0.3 — After Full Project Review
- Updated directory convention to match actual Next.js architecture
- Removed project-specific MCP tools (not universal)
- Added PowerShell escaping workaround

### v0.2 — After Chapter 2
- Added project directory convention
- Documented the `--allowed-tools` gotcha

### v0.1 — After Chapter 0
- Initial acpx command template
