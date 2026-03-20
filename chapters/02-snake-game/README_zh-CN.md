# 🎯 一句话造一个贪吃蛇

<p align="left">
  <a href="README.md"><img src="https://img.shields.io/badge/README-English-blue" alt="English" /></a>
</p>

## 🎯 你将收获

一个能玩的贪吃蛇游戏——你只说了一句话，AI 就做好了。

---

## 📖 故事

小张对 AI 说："做一个贪吃蛇。"

AI 做了一个贪吃蛇。能玩。但蛇是蓝色的不是绿色的，游戏跑得太快，没有重新开始按钮。

小王对 AI 说："做一个贪吃蛇。画布 400x400，深色背景 #1a1a2e，绿色蛇 #00ff41，150ms 速度，方向键控制，Game Over 画面带重新开始按钮。"

AI 精确地做出了小王想要的每一个细节。

**同样的 AI，同样的任务，不同的指令，天差地别的结果。**

---

## 🗣️ 话术模板

下面是产生精确结果的指令：

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

**结合第 1 章的 COO 灵魂：**

```
acpx --approve-all --allowed-tools "Write,Bash,Read,Edit,MultiEdit,Glob,Grep,LS" claude exec "
[粘贴第 1 章的 COO 灵魂模板]

Build a web-based Snake game. All code in a single index.html file.
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

## 🔍 精确度的三个层级

我们测试了同一种需求的三个版本：

| | 模糊 | 中等 | 精确 |
|--|------|------|------|
| **指令** | "做一个贪吃蛇" | 加了：HTML/CSS/JS、长大、Game Over | 完整规格：颜色、大小、速度、控制方式 |
| **结果** | 能玩，但颜色不对、没有重新开始 | 能玩，还多了蛇眼睛、渐变身体 | **完全符合要求** |
| **什么时候用** | 快速原型 | 创意探索 | **正式产品** |

### 精确指令公式

每条指令应该包含三个维度：

```
1. 做什么 → "一个贪吃蛇游戏"
2. 怎么运作 → "方向键控制，400x400 画布，150ms 循环"
3. 长什么样 → "深色背景，绿色蛇，红色食物"
```

**如果你只说了第 1 点，AI 会自己发挥第 2 和第 3 点。** 有时这没问题，但做产品时你通常三个都要说。

---

## ⚠️ 翻车 #1："我不知道该指定什么"

你不需要懂技术，只需要描述你脑海中的画面：

```
❌ "做一个好看的网站"
✅ "做一个深色背景、白色文字、顶部大图片、蓝色注册按钮的网站"
```

你没写任何代码，只是描述了你想要的效果。这就够了。

## ⚠️ 翻车 #2：过度指定

不要管每一个像素。指定**结果**，不指定**实现方式**：

```
❌ "用一个 div 设置 class 为 game-container，position 设为 relative..."
✅ "游戏区域 400x400 像素，页面居中"
```

---

## 💰 花费预估

| 精确度 | 预估花费 |
|--------|---------|
| 模糊 | ~$0.03 |
| 中等 | ~$0.05 |
| 精确 | ~$0.04 |

---

## ⬅️ 上一篇：[🧠 第 1 章 —— 给 AI 装一个顶级 COO 的大脑](../01-soul/README_zh-CN.md) | ➡️ 下一章：[📝 第 3 章 —— 让 AI 自己检查工作质量](../03-quality-checklist/README_zh-CN.md)

现在你能精确告诉 AI 做什么了。第 3 章，你要学会让 AI 自己验收工作——这样你就不用盯着它了。

