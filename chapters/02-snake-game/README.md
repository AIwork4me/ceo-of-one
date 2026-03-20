# 🎯 Build a Snake Game with One Sentence

<p align="left">
  <a href="README_zh-CN.md"><img src="https://img.shields.io/badge/README-简体中文-blue" alt="简体中文" /></a>
</p>

## 🎯 You'll Get This

A playable Snake game — built by AI from a single sentence you type.

---

## 📖 The Story

Alex tells AI: "Make a snake game."

AI makes a snake game. It works. But the snake is blue instead of green, the game runs too fast, and there's no way to restart.

Sam tells AI: "Make a snake game. Canvas 400x400, dark background #1a1a2e, green snake #00ff41, 150ms speed, arrow keys, game over screen with restart button."

AI makes exactly that. Every detail matches.

**Same AI. Same task. Different instructions. Wildly different results.**

---

## 🗣️ The Talk Template

Here's the precise instruction that produced the exact result:

```
Build a web-based Snake game. All code in a single index.html file (inline CSS and JavaScript).

Requirements:
- Canvas-based rendering, game area 400x400 pixels
- Snake starts at center, moving right, length 3
- Arrow keys to control direction (prevent 180-degree reversal)
- Red food spawns randomly, snake grows +10 points when eating
- Game over when hitting wall or self
- Dark background (#1a1a2e), green snake (#00ff41), red food (#ff0044)
- Score display at top, 'Game Over' screen with final score and restart button
- Smooth 150ms game loop
- No external dependencies, pure HTML/CSS/JS
```

**Combine with the COO soul from Chapter 1:**

```
acpx --approve-all --allowed-tools "Write,Bash,Read,Edit,MultiEdit,Glob,Grep,LS" claude exec "
[Paste the COO soul template from Chapter 1 here]

Build a web-based Snake game. All code in a single index.html file (inline CSS and JavaScript).
Requirements:
- Canvas 400x400, dark background #1a1a2e
- Snake starts center, moving right, length 3
- Arrow keys, prevent 180-degree reversal
- Red food, +10 points, grow on eat
- Game over on wall/self hit
- Score at top, Game Over screen with restart
- 150ms game loop, pure HTML/CSS/JS
"
```

---

## 🔍 The Three Levels of Precision

We tested three versions of the same request. Here's what happened:

| | Vague | Medium | Precise |
|--|-------|--------|---------|
| **Instruction** | "Make a snake game" | Added: HTML/CSS/JS, grow, game over | Full spec: colors, size, speed, controls |
| **Result** | Works, but wrong colors, no restart | Works, extra features (eyes, gradient) | **Exactly what was asked** |
| **When to use** | Quick prototype | Creative exploration | **Production** |

### The Precision Formula

Every instruction should specify three things:

```
1. WHAT to build    → "A Snake game"
2. HOW it works     → "Arrow keys, 400x400 canvas, 150ms loop"
3. WHAT it looks like → "Dark background, green snake, red food"
```

**If you only say #1, AI improvises #2 and #3.** Sometimes that's fine. For your product, you usually want all three.

---

## ⚠️ Pitfall #1: "I Don't Know What to Specify"

You don't need to be technical. You just need to describe what you see in your head:

```
❌ "Make a nice website"
✅ "Make a website with a dark background, white text, a big photo at the top, and a sign-up button in blue"
```

You didn't write any code. You just described what you want it to look like. That's enough.

## ⚠️ Pitfall #2: Over-Specifying

Don't micromanage every pixel. Specify the **outcome**, not the implementation:

```
❌ "Use a div with class game-container, set position to relative..."
✅ "Game area 400x400 pixels, centered on the page"
```

---

## 💰 Cost Estimate

| Precision Level | Estimated Cost |
|----------------|---------------|
| Vague | ~$0.03 |
| Medium | ~$0.05 |
| Precise | ~$0.04 |

---

## ⬅️ Previous: [🧠 Chapter 1 — Give AI a top-tier COO brain](../01-soul/) | ➡️ Next: [📝 Chapter 3 — Make AI check its own work](../03-quality-checklist/)

You can now tell AI exactly what to build. In Chapter 3, you'll learn how to make AI verify its own work — so you don't have to sit there watching it.

