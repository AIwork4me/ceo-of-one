<p align="left">
<a href="experiment_zh-CN.md"><img src="https://img.shields.io/badge/Experiment-简体中文-blue" alt="简体中文" /></a>
</p>

# Chapter 8 — Deploy to Vercel

> **One sentence from the CEO:** "先部署到vercel" (Deploy it to Vercel first.)
>
> **COO cost:** ~15 min | **Files changed:** 4 | **Tests:** 94/94 ✅ | **Bugs:** 0

---

## What Happened

This chapter is different. Up to now, the CEO said one sentence and the COO did everything. This time, the CEO had to participate — register accounts, click through import dialogs, configure settings in a web UI. Deployment is not pure coding.

The CEO said: **"先部署到vercel"**

The COO's workflow:

### 1. Check Prerequisites
- No Vercel CLI installed locally
- `.env.example` was minimal (missing JWT_SECRET)
- `next.config.js` was empty

### 2. Architect Decision
**Vercel** — not Railway, not AWS. Reasons:
- Simplest platform for Next.js (it's made by the same company)
- Free tier sufficient for our traffic
- Zero-config deployment for standard Next.js apps
- No DevOps expertise required from the CEO

### 3. Specify Changes (4 files)

| File | Change | Why |
|------|--------|-----|
| `.env.example` | Add `JWT_SECRET` placeholder | Document env vars for deployment |
| `next.config.js` | Add `output: 'standalone'` | Optimize build for serverless |
| `src/app/api/health/route.ts` | Add `version` field | Track deployments |
| `vercel.json` | Create new file | Framework-aware routing config |

### 4. Execute
Claude Code made all 4 changes. Result:
- **0 bugs**
- **94/94 tests pass**
- Build produces zero errors

### 5. Guide CEO Through Vercel Import
The COO wrote step-by-step instructions for the CEO:
1. Register Vercel account (GitHub login)
2. Click "Add New Project" → Import from GitHub
3. **Critical step:** Set Root Directory to `"platform"` (not the repo root)
4. Deploy

### 6. Verify
CEO opened the browser and confirmed:
- ✅ Landing page loads at `https://ceo-of-one-seven.vercel.app/`
- ✅ `/api/health` returns `{"status":"ok","version":"1.0.0"}`
- ✅ `/api/courses` returns `{"success":true,"data":[]}`

---

## Result

| Checkpoint | Status |
|-----------|--------|
| Landing page live | ✅ |
| Health endpoint working | ✅ |
| Courses endpoint working | ✅ |
| Build zero errors | ✅ |
| 94/94 tests pass | ✅ |
| .env.example complete | ✅ |
| Standalone output configured | ✅ |
| vercel.json created | ✅ |
| Domain binding (tinkerclaw.io) | ⏳ Pending |
| JWT_SECRET set in Vercel | ⏳ Pending (auth uses dev default) |

---

## Key Insight: Empty Data Is Not a Bug

The courses endpoint returns `{"data":[]}` — an empty array. This is because all data lives in memory and gets reset on each deployment.

This is **not a bug.** This is the reason Chapter 9 exists.

When you deploy an in-memory app, you get the code but not the data. Seeing that empty page is the moment you understand why persistence matters. Chapter 9 (Database & Dashboard) becomes inevitable and urgent — not because someone said so, but because the live site proved it.

---

## Files Modified

```
.env.example                          # added JWT_SECRET placeholder
next.config.js                        # added output: 'standalone'
src/app/api/health/route.ts           # added version field
vercel.json                           # new file
```

---

## Real Retain

- **Root Directory = "platform"** is the #1 deployment pitfall. If you skip this, Vercel tries to build from the monorepo root and fails. The COO must specify this clearly.
- **China ↔ Vercel connectivity is unreliable.** The CEO verified endpoints in a browser (which worked) rather than the COO trying `curl` from the server (which didn't). Browser verification beats server-side verification across regions.
- **Seeing the page live transforms the project psychologically.** It goes from "local demo" to "real product." Chapter 8's value is emotional, not technical.
- **In-memory store → zero data after deployment.** This makes Chapter 9 inevitable.


