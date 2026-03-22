<p align="left">
  <a href="README_zh-CN.md"><img src="https://img.shields.io/badge/README-简体中文-blue" alt="简体中文" /></a>
</p>

<p align="center">
  <h1 align="center">CEO of One</h1>
  <p align="center"><em>Build real products without writing code. Battle-tested across 12 chapters.</em></p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/chapters-13-blue" alt="13 Chapters" />
  <img src="https://img.shields.io/badge/tests-111_passed-green" alt="111 Tests Passing" />
  <img src="https://img.shields.io/badge/deployed-live-brightgreen" alt="Live Demo" />
  <img src="https://img.shields.io/badge/i18n-EN%20%2B%20ZH-blueviolet" alt="Bilingual" />
  <img src="https://img.shields.io/badge/license-MIT-green" alt="MIT" />
</p>

<p align="center">
  <img src="assets/og-image.png" alt="CEO of One — Build Real Products Without Writing Code" width="600">
</p>

---

> **One person. One sentence. One product.**
>
> In 2026, you don't need a team, you don't need to code, and you don't need funding.
> OpenClaw is your COO. Claude Code is your engineer.
> **You speak. They build. You own 100%.**

This open-source book teaches you how — with a real, deployed product as proof.

## How It Works

You play the **CEO**. You don't write code — you speak plain language.

```
You (CEO)  →  "Build me a course platform"
                     ↓
OpenClaw (COO)  →  Decomposes, plans, assigns, reviews
                     ↓
Claude Code (Engineer)  →  Writes code, runs tests, ships
                     ↓
You (CEO)  ←  "Done. Here's your product."
```

**OpenClaw** is an open-source AI agent platform that acts as your COO — it manages your AI coding agents, maintains context across sessions, and enforces quality standards. Think of it as the operating system for your one-person company. [Learn more →](https://github.com/openclaw/openclaw)

**Claude Code** is Anthropic's AI coding agent. It writes, tests, and deploys code based on natural language instructions. You don't need to understand the code it writes. [Learn more →](https://docs.anthropic.com/en/docs/claude-code)

## What You'll Build

A real, revenue-generating knowledge platform — the **"CEO of One Academy"** — from a single sentence to a deployed, paying product.

| Ch | You'll Build This |
|----|-------------------|
| 🚀 [0-setup](chapters/00-setup/) | Get AI to listen to you in 5 minutes |
| 🧠 [1-soul](chapters/01-soul/) | Give AI a top-tier COO brain |
| 🎯 [2-snake-game](chapters/02-snake-game/) | Build a playable Snake game — with one sentence |
| 📝 [3-quality-checklist](chapters/03-quality-checklist/) | Make AI check its own work (so you don't have to) |
| 🏠 [4-landing-page](chapters/04-landing-page/) | Your academy's homepage — in English first |
| 🌐 [5-going-global](chapters/05-going-global/) | Make your product bilingual (i18n with next-intl) |
| 🔐 [6-auth](chapters/06-auth/) | Students can sign up and browse courses |
| 💳 [7-payment](chapters/07-payment/) | Students pay → content unlocks instantly |
| 🐛 [8-bugfix](chapters/08-bugfix/) | Learn to say "this is wrong, fix it" — precisely |
| 🌍 [9-deploy](chapters/09-deploy/) | Buy a domain, deploy, the world can see it |
| 📊 [10-dashboard](chapters/10-dashboard/) | See who signed up, who paid, how much you made |
| 🎓 [11-graduation](chapters/11-graduation/) | Build a second product from scratch — no tutorial |
| 🔄 [12-product-flywheel](chapters/12-product-flywheel/) | Your product fixes itself — automatically |

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
| 🏠 Landing (EN) | https://ceo.tinkerclaw.io |
| 🏠 首页 (中文) | https://ceo.tinkerclaw.io/zh |
| 📚 Courses | https://ceo.tinkerclaw.io/courses |
| 🔐 Login | https://ceo.tinkerclaw.io/auth |
| 👤 Profile | https://ceo.tinkerclaw.io/profile |
| 📊 Dashboard | https://ceo.tinkerclaw.io/dashboard |
| 🎓 Graduation | https://ceo.tinkerclaw.io/graduation |
| 🔗 GitHub | https://github.com/AIwork4me/ceo-of-one |

> 12 chapters. 111 tests. Bilingual. 1 deployed product. Zero bullshit.

## Quick Start

**Total cost to complete:** ~$5-15 (Claude API usage). No subscription required.

1. **Clone this repo:**
   ```bash
   git clone https://github.com/AIwork4me/ceo-of-one.git
   cd ceo-of-one
   ```
2. 👉 Follow [Chapter 0: Get AI to listen to you in 5 minutes](chapters/00-setup/) — it walks you through every installation step, one by one.

> **In a hurry?** Here's the ultra-short version:
> ```bash
> npm install -g openclaw acpx @anthropic-ai/claude-code   # Install tools
> export ANTHROPIC_API_KEY=your-key-here                       # Set API key
> openclaw gateway start                                       # Start your COO
> cp templates/SOUL-COO.md ~/.openclaw/workspace/SOUL.md       # Load COO brain
> ```
> But really — read Chapter 0. It explains *why* each step matters and what to do when things go wrong.

## Showcase

Built something with this method? [Submit your product →](showcase/)

## License

[MIT](LICENSE) ❤️

---

<p align="center">
  <img src="assets/aiwork4me.jpg" alt="AIwork4me QR Code" width="200">
  <br>
  <strong>Scan to follow</strong> — let's achieve AI work for me together!
</p>
