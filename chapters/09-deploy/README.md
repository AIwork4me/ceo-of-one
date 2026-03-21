<p align="left">
<a href="README_zh-CN.md"><img src="https://img.shields.io/badge/README-简体中文-blue" alt="简体中文" /></a>
</p>

# Chapter 8 — The World Can See You

> [📖 Full Experiment Record](experiment.md)

---

## 🎯 You'll Learn

Deployment is a business decision, not just a technical one.

In previous chapters, the CEO said one sentence and the COO did everything. This time, the CEO had to register accounts, click through dialogs, and make configuration choices. That's because deployment crosses a line — it takes your project from private to public. Once it's live, anyone with a URL can see it. That's not just a technical milestone. That's a business decision with real consequences.

You'll learn:
- Why the COO prepares but the CEO deploys
- The single setting that breaks 90% of first-time deployments
- Why your data disappears in production (and why that's a good thing)
- The psychological shift from "local demo" to "real product"

---

## 🗣️ What the CEO Said

"先部署到vercel" — Deploy it to Vercel first.

One sentence. But behind that sentence, the CEO had to do more work than in any previous chapter:

1. **Register a Vercel account** — choosing GitHub as the login method
2. **Import the repository** — selecting the right repo from a list
3. **Set the Root Directory to "platform"** — the critical step that most people miss
4. **Verify the deployment** — opening the live URL in a browser and checking that endpoints respond

The CEO didn't write code. But they made decisions: which platform to use, which authentication method, how to configure the project. In a real one-person company, you'd make these same decisions yourself. No one else is going to log into Vercel for you.

This is the chapter where the "one-person company" stops being a metaphor and becomes real. Your code is on the internet. A stranger in another country could visit your URL right now. That changes things.

---

## 🔍 What Got Built

The COO made four deployment-ready changes:

**`.env.example`** — Added `JWT_SECRET` as a documented placeholder. When you deploy, you need to tell the hosting platform about your environment variables. This file is the template.

**`next.config.js`** — Added `output: 'standalone'`. This tells Next.js to build a self-contained server bundle optimized for serverless platforms like Vercel.

**`src/app/api/health/route.ts`** — Added a `version` field. A tiny addition, but useful: when you deploy to multiple environments, checking `/api/health` tells you which version is running where.

**`vercel.json`** — Created from scratch. This file tells Vercel how to handle the project: routing rules, function configuration, framework detection. Without it, Vercel guesses — and guesses can be wrong.

All 94 tests passed. Zero build errors. The COO's job was to make sure that when the CEO clicked "Deploy," nothing would go wrong.

And nothing did.

---

## 🏗️ Root Directory — The #1 Deployment Pitfall

This needs its own section because it's the single most common reason first-time deployments fail.

Our project is a monorepo. The repository root contains `platform/`, `docs/`, and other folders. The Next.js application lives inside `platform/`. When Vercel imports your repository, its default behavior is to build from the repository root. But there's no `package.json` at the root — it's inside `platform/`. So the build fails with a confusing error about missing dependencies.

The fix is one setting: **Root Directory = "platform"**.

This tells Vercel to look inside the `platform/` folder for the application. It finds the `package.json`, the `next.config.js`, the `src/` directory — everything it needs.

If you're following along and your deployment fails, check this setting first. 90% of "Vercel can't build my project" issues are solved by this one line.

---

## 💡 Empty Data — Not a Bug, a Lesson

After deployment, the CEO opened `/api/courses` and saw:

```json
{"success": true, "data": []}
```

Empty. No courses. The page loads, but there's nothing to show.

This is not a bug. This is exactly what should happen.

All our data lives in memory. Every time the server starts (and Vercel starts fresh on each deployment), the in-memory store resets to empty. On your local machine, this was invisible because you kept the dev server running. In production, where servers start and stop constantly, it becomes obvious.

This is the moment you understand why every real application needs a database. Not because someone told you, but because your live site proved it. You deployed your code and the code works perfectly — but there's no data because you never saved any.

Chapter 9 is about fixing this. You'll add a database, store your courses persistently, and build a dashboard to manage them. But the motivation comes from this chapter — from seeing the empty page and understanding *why*.

---

## 🎓 Chapter Takeaway

Up to now, this project was a story you told yourself. "I'm building a course platform." But nobody could see it except you.

Today, that changed. The landing page is live. The API endpoints respond. A URL exists that anyone on the internet can visit. That's not a small thing.

The technical work was minimal — four config files, zero bugs, existing tests all pass. The real work was the CEO's: registering the account, making the deployment decisions, verifying the result. In a one-person company, you don't get to skip these steps. You are the CEO who clicks "Deploy."

And the empty data? That's a gift. It gives you urgency. Chapter 9 isn't an abstract "best practice" — it's the thing standing between your live site and an actual product people can use.

**One-person company principle:** Deployment is the moment your project becomes real. Prepare your code carefully, but remember — the person who clicks "Deploy" matters more than the code they're deploying.

---

**Previous:** [← Chapter 8: Fix What's Broken](../08-bugfix/README.md) | **Next:** [Chapter 10: Dashboard →](../10-dashboard/README.md)

