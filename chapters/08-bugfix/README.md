<p align="left">
<a href="README_zh-CN.md"><img src="https://img.shields.io/badge/README-简体中文-blue" alt="简体中文" /></a>
</p>

# This Is Wrong, Fix It

---

## 🎯 You'll Learn

- How to **find problems that tests can't catch** through structural audits
- Why **inspecting before specifying** is the single most powerful COO habit
- How **dependency injection** fixes architectural violations with minimal change
- That **zero bugs** isn't luck — it's the natural result of precise specifications

This chapter is different from the previous ones. We're not adding a feature. We're fixing what's already broken. And that makes it maybe the most important chapter so far.

---

## 🗣️ What the CEO Said

> "做好阶段九。"

One sentence. The COO's job was to figure out what needed fixing, decide how to fix it, and make sure it got done right.

---

## 🔍 The Audit

Here's the uncomfortable truth about Chapter 6: every single test passed. 94 out of 94. Green across the board.

And the architecture was violated.

The payment module was importing directly from the courses module — six times, across every file. The one-way dependency rule (features can only depend on shared libraries, never on other features) was broken. Functional tests don't catch this. They test *what the code does*, not *how the code is structured*.

The COO found this by doing something simple: a structural audit. Instead of just running tests, the COO grepped for cross-feature imports. One command, and the full picture appeared.

This is a habit worth building. After every feature is built, before you declare it done, ask: *is the structure clean?* Tests tell you the code works. Structural checks tell you the code is *right*.

The audit also caught a bonus bug: `enrolledCourses` in the auth store was never initialized. Not a crash-causing bug, but a time bomb waiting for the right moment.

---

## 🏗️ The Fix

When you find a structural problem, you have options. The COO considered three approaches: a facade layer, an event system, and dependency injection.

Facade would have added a new abstraction — more code, more complexity, more things that could go wrong. Event system would have fully decoupled the modules, but at the cost of making the data flow invisible and hard to debug.

Dependency injection was the boring choice. Instead of the payment module reaching into the courses module to grab what it needs, you hand it what it needs through function parameters. The payment module says: "I need a way to look up a course. Give me a function that does that." And whoever calls the payment code provides that function.

The change was minimal. The benefit was enormous. The payment module no longer knows the courses module exists. They're strangers passing notes through a mutual friend (the API route adapter, a thin layer of glue code that lives outside the feature boundary).

And there was a side benefit nobody planned for: testability. Because the payment module now receives its dependencies from outside, tests can pass in mock data instead of real stores. The tests got faster, more isolated, and more honest about what they're actually testing.

---

## 💡 Zero Bugs

Let's look at the bug count across chapters:

- Chapter 5 (auth): 1 bug
- Chapter 6 (payment): 3 bugs
- Chapter 7 (bugfix): 0 bugs

The difference isn't talent. The difference is process.

In Chapter 7, the COO did something that wasn't done in previous chapters: the COO inspected the problem thoroughly *before* writing the specification. By the time the engineer received instructions, there was no ambiguity. Exact function signatures. Exact file permissions — which files could be changed and which couldn't. Exact validation commands to run afterward.

When the specification is that precise, the engineer has no room to make wrong choices. Zero bugs isn't impressive — it's the natural outcome of removing ambiguity.

Think about it this way: if you tell someone "fix the payment module," you get creative solutions and creative bugs. If you tell someone "in `service.ts`, change `createOrder` to accept a `findCourse` parameter of type `(id: string) => Promise<Course | null>`, and do not modify any file in `courses/`," you get exactly what you asked for.

Precision in instructions is kindness. It saves everyone time.

---

## 🎓 Chapter Takeaway

The most important skill isn't building things. It's **spotting what's wrong and fixing it cleanly**.

Anyone can add a feature. The real skill is looking at working code and saying: "This passes all tests, but it's structured wrong." Then having the discipline to fix it before it becomes someone else's emergency.

Structural audits are cheap. One grep command takes five seconds and can save hours of debugging later. Make it part of your VERIFY step. Always.

Zero bugs isn't a goal to strive for — it's a sign that your process is working. When the COO inspects before specifying, when the specs are precise enough to remove ambiguity, zero bugs becomes the default.

---

📖 [Full experiment record →](experiment.md)

---

**Previous:** [← Chapter 7: Make Money](../07-payment/README.md) | **Next:** [Chapter 9: Ship It →](../09-deploy/README.md)

