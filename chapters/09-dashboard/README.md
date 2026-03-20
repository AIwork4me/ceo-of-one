<p align="left">
<a href="README_zh-CN.md"><img src="https://img.shields.io/badge/README-简体中文-blue" alt="简体中文" /></a>
</p>

# Know Your Numbers

> A dashboard turns a collection of features into a business.

---

## 🎯 You'll Learn

Data transforms products into businesses. A feature-complete app with empty screens feels like a prototype. The same app with real numbers — users, orders, revenue — feels like a company. The difference isn't code. It's data.

This chapter explores that transformation: how seed data turned a coding exercise into something that looks and feels like a real operating platform.

---

## 🗣️ What the CEO Said

"继续阶段十一" — Continue Phase 11.

---

## 🔍 What Got Built

A dashboard page with dark theme. Four stat cards at the top: total users, total courses, total orders, total revenue. Two tables below: recent users and recent orders.

The numbers are real — not placeholders, not lorem ipsum. Five users with Chinese names. Six courses with actual titles. Eight orders totaling ¥1,124 in revenue.

Behind the scenes: an API endpoint (`/api/dashboard`) aggregates data from the user, course, and payment modules. All powered by in-memory stores with pre-loaded seed data. No database needed.

The test suite grew from 94 to 111 tests — 17 new tests covering dashboard API responses, seed data integrity, and page rendering.

---

## 🏗️ Seed Data Strategy

Here's the key architectural decision: **no database**.

The COO chose seed data over a database for a simple reason — readers are learning to build products, not configure databases. Adding PostgreSQL or MongoDB would have doubled the complexity without adding proportional learning value.

Instead, each module (users, courses, payments) ships with a `seed()` function that populates its in-memory store with realistic demo data when the server starts. The dashboard module reads from these stores through dependency injection.

This works because the dashboard is read-only. It doesn't create, update, or delete anything. It just observes. For an observatory, pre-loaded data is perfect.

The result: you start the server, visit the dashboard, and see a business. No setup, no migrations, no `INSERT INTO` statements.

---

## 💡 One ESLint Bug

During development, Claude Code hit a build error. The payment store's seed function needed course and user data to create realistic orders. Instead of receiving these through dependency injection, it used `require()` to directly import the other stores.

This violated the project's dependency injection pattern. Claude Code tried to suppress the resulting ESLint warning with an `eslint-disable` comment — but the rule name didn't match any rule configured in the project. Build failed.

The fix was trivial: remove the comment. But the lesson is meaningful. The COO's spec said "no cross-feature imports" but didn't explicitly cover seed data functions. The spec was almost right, and "almost" still produced a bug.

**Rule:** If a pattern matters, specify it everywhere — including data initialization. Gaps in specifications produce gaps in implementation.

---

## 🎓 Chapter Takeaway

The same codebase, before and after seed data, tells two different stories.

Before: a platform with features but no proof. Registration works (for nobody). Payments work (for nobody). Courses exist (zero of them). It's technically correct and emotionally empty.

After: five users signed up. Six courses published. Eight orders placed. ¥1,124 in revenue. Now the platform isn't asking you to imagine — it's showing you what's already happening.

Data is proof. And a dashboard is proof visible at a glance.

This is the moment where the project stops being a tutorial and starts being a product. Not because of a new feature. Because of numbers on a screen.

---

📖 **Experiment Record:** [experiment.md](experiment.md) | [实验记录](experiment_zh-CN.md)

---

**Previous:** [← Chapter 8: Ship It](../08-deploy/README.md) | **Next:** [Chapter 10: Graduation →](../10-graduation/README.md)

