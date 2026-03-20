<p align="left">
  <a href="README_zh-CN.md"><img src="https://img.shields.io/badge/README-简体中文-blue" alt="简体中文" /></a>
</p>

<p align="center">
  <h1 align="center">CEO of One</h1>
  <p align="center"><em>The AI operating system for your One-Person Company.</em></p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/chapters-11-blue" alt="11 Chapters" />
  <img src="https://img.shields.io/badge/tests-111_passed-green" alt="111 Tests Passing" />
  <img src="https://img.shields.io/badge/deployed-live-brightgreen" alt="Deployed" />
  <img src="https://img.shields.io/badge/license-MIT-green" alt="MIT License" />
  <img src="https://img.shields.io/badge/status-complete-success" alt="Complete" />
</p>

---

> 2026. One person is a company.
> You don't need a team. You don't need to code. You don't need funding.
> OpenClaw is your COO. Claude Code is your engineer.
> **Say it. They build it. You own 100%.**

This book teaches you how.

## What You'll Build

A real, revenue-generating knowledge platform — the **"CEO of One Academy"** — from a single sentence to a deployed, paying product.

| Ch | You'll Build This |
|----|-------------------|
| 🚀 [0-setup](chapters/00-setup/) | Get AI to listen to you in 5 minutes |
| 🧠 [1-soul](chapters/01-soul/) | Give AI a top-tier COO brain |
| 🎯 [2-snake-game](chapters/02-snake-game/) | Build a playable Snake game — with one sentence |
| 📝 [3-quality-checklist](chapters/03-quality-checklist/) | Make AI check its own work (so you don't have to) |
| 🏠 [4-landing-page](chapters/04-landing-page/) | Your academy's homepage — live, beautiful |
| 🔐 [5-auth](chapters/05-auth/) | Students can sign up and browse courses |
| 💳 [6-payment](chapters/06-payment/) | Students pay → content unlocks instantly |
| 🐛 [7-bugfix](chapters/07-bugfix/) | Learn to say "this is wrong, fix it" — precisely |
| 🌍 [8-deploy](chapters/08-deploy/) | Buy a domain, deploy, the world can see it |
| 📊 [9-dashboard](chapters/09-dashboard/) | See who signed up, who paid, how much you made |
| 🎓 [10-graduation](chapters/10-graduation/) | Build a second product from scratch — no tutorial |

## The Team

```
CEO (You)
  │  "Build me a course platform"
  │
  ▼
COO (OpenClaw)
  │  Understands → Plans → Assigns → Reviews → Reports
  │  Doesn't write code. Commands the engineer.
  │
  ▼
Engineer (Claude Code)
  │  Writes code → Runs tests → Fixes bugs → Ships
  │  No product decisions. Just executes.
  │
  ▼
CEO (You)
  ← "Done. Here's the result."
```

## Why This Is Different

- 🗣️ **No code required.** You speak natural language. That's it.
- 🧪 **Every claim is battle-tested.** We built the examples first, then wrote the book.
- 🏗️ **One product, end to end.** Not fragmented tutorials — a complete product journey.
- 💰 **Revenue-ready.** Your product can accept payments by Chapter 6.

> ⚠️ **Important:** The payment system in this course uses **simulated payments** (no real money). Connecting real payment providers (Stripe, WeChat Pay, etc.) is a post-graduation task. The architecture is payment-provider-ready — you just plug in a real one when you're ready.

- 🎓 **Self-proving.** This very book was built using the method it teaches.

> ⚠️ **Important:** The platform uses **in-memory seed data** (not a database). Users, courses, and orders reset when the server restarts. Adding a database (PostgreSQL, MongoDB, etc.) is a post-graduation task. The architecture is database-ready — you just swap `store.ts` with a real database module when you're ready.

## 🚀 Live Demo

**The product this book teaches you to build — already built and deployed:**

| Page | URL |
|------|-----|
| 🏠 Landing Page | https://ceo.tinkerclaw.io/ |
| 📚 Courses | https://ceo.tinkerclaw.io/courses |
| 🔐 Login | https://ceo.tinkerclaw.io/auth |
| 👤 Profile | https://ceo.tinkerclaw.io/profile |
| 📊 Dashboard | https://ceo.tinkerclaw.io/dashboard |
| 🎓 Graduation | https://ceo.tinkerclaw.io/graduation |
| 🔗 GitHub | https://github.com/AIwork4me/ceo-of-one |

> 111 tests passing. 4 feature modules. 1 deployed product. Zero bullshit.

## Prerequisites

Before you start, you need:

| Tool | What it is | How to get it |
|------|-----------|---------------|
| **Node.js** (v18+) | JavaScript runtime | [nodejs.org](https://nodejs.org) — download LTS, install, restart terminal |
| **OpenClaw** | Your AI COO | `npm install -g openclaw` — see [openclaw.ai](https://docs.openclaw.ai) |
| **acpx** | Claude Code connector | `npm install -g acpx` — comes with OpenClaw |
| **Claude API key** | Powers your engineer | [console.anthropic.com](https://console.anthropic.com) — get API key, set `ANTHROPIC_API_KEY` environment variable |
| **OpenClaw AI key** | Powers your COO | Configure in OpenClaw after install |

> **Don't know how to set environment variables?**
> - **Windows:** Search "Environment Variables" in Start → Edit → New → `ANTHROPIC_API_KEY` = your key → Restart terminal
> - **macOS/Linux:** `echo 'export ANTHROPIC_API_KEY=your-key' >> ~/.bashrc && source ~/.bashrc`

> ⚠️ **Both API keys cost money.** Claude API usage is pay-as-you-go (~$5-15 for the full course). OpenClaw has its own pricing. This is the cost of running a one-person company — still cheaper than hiring a single developer.

## Quick Start

1. Install all prerequisites above
2. Start OpenClaw: `openclaw gateway start`
3. Copy `templates/SOUL-COO.md` to your OpenClaw workspace as `SOUL.md`
4. Copy `templates/PROCESS-COO.md` to the same workspace
5. 👉 Start with [Chapter 0: Get AI to listen to you in 5 minutes](chapters/00-setup/)

> **What is the OpenClaw workspace?** It's the folder where OpenClaw stores your AI's memory and configuration. Run `openclaw status` to find its path. On first launch, OpenClaw creates it automatically — usually at `~/.openclaw/workspace/` (macOS/Linux) or `C:\Users\<YourName>\.openclaw\workspace\` (Windows).

## Showcase

Real products built by real readers.

→ [See what one-person CEOs have built](showcase/)

## License

[MIT](LICENSE) ❤️
