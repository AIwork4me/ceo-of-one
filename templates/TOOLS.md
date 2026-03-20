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
| L3: dontAsk | (inside prompt) | Tell Claude Code not to ask for confirmation |

### Important
- **Always include `--allowed-tools`**. Without it, Claude Code in dontAsk mode will refuse to write files.
- The standard whitelist `"Write,Bash,Read,Edit,MultiEdit,Glob,Grep,LS"` covers 99% of tasks.
- For tasks needing file deletion, add `MultiEdit` (already included).

---

## Project Directory Convention

```
ceo-project/
├── src/              # All source code
│   ├── types/        # TypeScript interfaces and types
│   ├── store/        # Data storage / database layer
│   ├── routes/       # API route definitions
│   ├── controllers/  # Business logic handlers
│   ├── middleware/    # Express middleware (auth, errors, etc.)
│   └── index.ts      # Entry point
├── tests/            # All test files
├── public/           # Static assets (if needed)
├── package.json
├── tsconfig.json
└── jest.config.js    # or vitest.config.ts
```

---

## 智谱 MCP Tools (via exec + curl)

### GitHub Reader: zread
```bash
curl -s -X POST "https://open.bigmodel.cn/api/mcp/zread/mcp" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -H "Authorization: <ZHIPU_API_KEY>" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"read_file","arguments":{"repo_name":"owner/repo","file_path":"path/to/file"}}}'
```
Tools: `search_doc`, `read_file`, `get_repo_structure`

### Web Reader: web_reader
```bash
curl -s -X POST "https://open.bigmodel.cn/api/mcp/web_reader/mcp" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -H "Authorization: <ZHIPU_API_KEY>" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"webReader","arguments":{"url":"https://example.com","return_format":"markdown"}}}'
```

### Web Search: web_search_prime (needs separate API key)
```bash
curl -s -X POST "https://open.bigmodel.cn/api/mcp/web_search_prime/mcp" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -H "Authorization: Bearer <SEARCH_API_KEY>" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"web_search_prime","arguments":{"search_query":"query","content_size":"medium","location":"us"}}}'
```
Params: content_size (low/medium/high), location (cn/us), search_recency_filter (oneDay/oneWeek/oneMonth/oneYear/noLimit)

### Notes
- All use MCP Streamable HTTP protocol (JSON-RPC)
- Accept header MUST include both `application/json` and `text/event-stream`
- Response format: SSE with `data:` lines containing JSON-RPC results
- zread: `tools/list` confirmed working; `tools/call` returned 500 (temporarily, retry)
- web_search_prime: needs separate API key (not the same as the MAX plan key)
- web_reader: `tools/list` confirmed working; `tools/call` has URL restrictions

---

## Changelog

### v0.2 — After Chapter 2
- Added project directory convention (standardized from Control C acpx experiment)
- Added quick reference table
- Documented the `--allowed-tools` gotcha from Chapter 0

### v0.1 — After Chapter 0
- Initial acpx command template
- Discovered: without `--allowed-tools`, Claude Code refuses writes in dontAsk mode
