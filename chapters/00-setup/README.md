# 🚀 Get AI to Listen to You in 5 Minutes

>装好工具，5 分钟后你能跟 AI 对话

<p align="center">
  <a href="README_zh.md"><img src="https://img.shields.io/badge/🇨🇳-中文版-blue" alt="中文版" /></a>
</p>

## 🎯 You'll Get This

An AI assistant that can create files, run commands, and build things for you — all from your first message.

---

## 📖 The Story

小张是个火锅店老板。他有个想法：做个小程序让顾客在线排队。

他不懂编程。但他听说了一个人人能用的方法——对着 AI 说一句话，AI 帮你把产品做出来。

5 分钟后，他发出了人生中第一条"开发指令"。AI 替他创建了一个文件。

这就是一切的开始。

---

## 🗣️ What You'll Say

After setup, you'll type this into your terminal:

```
acpx --approve-all --allowed-tools "Write,Bash,Read,Edit" claude exec "Create a file called hello.txt with content: Hello from CEO of One!"
```

And AI will create that file for you. That's it — your first "AI did something for me" moment.

---

## Step-by-Step Setup

### Prerequisite: Install Node.js

You need Node.js (v18+) installed on your computer.

👉 Download from [nodejs.org](https://nodejs.org) and install the LTS version.

Verify:
```bash
node -v    # Should show v18 or higher
npm -v     # Should show a version number
```

### Step 1: Install OpenClaw (Your COO)

```bash
npm install -g openclaw
```

OpenClaw is your AI COO. It understands what you want, breaks it into tasks, and commands Claude Code to execute.

### Step 2: Install acpx (The Bridge)

```bash
npm install -g acpx
```

acpx connects OpenClaw to Claude Code. It's the communication protocol.

### Step 3: Install Claude Code (Your Engineer)

```bash
npm install -g @anthropic-ai/claude-code
```

Claude Code is your AI engineer. It writes code, runs tests, and ships products.

### Step 4: Get Your API Key

You need an Anthropic API key to power Claude Code.

👉 Get one at [console.anthropic.com](https://console.anthropic.com)

Then set it:
```bash
# Mac/Linux
export ANTHROPIC_API_KEY=sk-ant-your-key-here

# Windows PowerShell
$env:ANTHROPIC_API_KEY = "sk-ant-your-key-here"
```

### Step 5: Say Your First Command 🎉

```bash
acpx --approve-all --allowed-tools "Write,Bash,Read,Edit" claude exec "Create a file called hello.txt with content: Hello from CEO of One!"
```

If everything works, you'll see:
```
[tool] Write hello.txt (completed)
Created `hello.txt` with the message "Hello from CEO of One!"
[done] end_turn
```

**Check it:** You now have a `hello.txt` file. AI created it for you.

---

## 🔍 Why This Exact Command?

Let's break down the command you just typed:

| Part | What It Does | Why It Matters |
|------|-------------|----------------|
| `acpx` | Starts the AI bridge | Connects you to Claude Code |
| `--approve-all` | Auto-approves permissions | Claude Code won't stop and ask you questions |
| `--allowed-tools "Write,Bash,Read,Edit"` | Tells Claude what tools it can use | **Without this, Claude can't create files** |
| `claude exec` | One-shot execution mode | Do the task and finish |
| `"Create a file..."` | Your instruction in plain English | This is where you speak |

**The most important part is `--allowed-tools`.** Without it, Claude Code refuses to create or modify any files. This is the #1 pitfall for beginners.

---

## ⚠️ Pitfall #1: "Permission Denied"

If you forget `--allowed-tools`, you'll see:
```
Permission to use Write has been denied because Claude Code is running in don't ask mode.
```

**Fix:** Always include `--allowed-tools "Write,Bash,Read,Edit"` in your command.

**Why does this happen?** Claude Code has three layers of security. By default, it won't write anything without explicit permission. `--allowed-tools` tells it "you're allowed to use these tools." We'll learn more about this in later chapters.

## ⚠️ Pitfall #2: "usage_update Error"

You might see some error messages about `session/update usage_update`. **Ignore these.** They're a known bug in acpx and don't affect anything.

---

## 💰 Cost Estimate

This setup test costs approximately **$0.01** (less than 1 cent). Your Anthropic API account starts with free credits.

---

## 📝 Talk Template

For future commands, use this format:

```
acpx --approve-all --allowed-tools "Write,Bash,Read,Edit" claude exec "[What you want AI to do]"
```

Replace `[What you want AI to do]` with your instruction in plain English.

---

## ➡️ Next: [🧠 Chapter 1 — Give AI a top-tier COO brain](../01-soul/)

Right now, your AI is a blank slate. It does exactly what you say — no more, no less. In Chapter 1, we'll give it a COO's brain so it thinks about product quality, task planning, and progress reporting on its own.
