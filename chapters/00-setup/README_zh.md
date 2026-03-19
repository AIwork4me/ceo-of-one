# 🚀 装好工具，5 分钟后你能跟 AI 对话

<p align="left">
  <a href="README.md"><img src="https://img.shields.io/badge/🇺🇸-English-blue" alt="English" /></a>
</p>

## 🎯 你将收获

一个能替你创建文件、运行命令、建造东西的 AI 助手——从你的第一条消息开始。

---

## 📖 故事

小张是个火锅店老板。他有个想法：做个小程序让顾客在线排队。

他不懂编程。但他听说了一个人人能用的方法——对着 AI 说一句话，AI 帮你把产品做出来。

5 分钟后，他发出了人生中第一条"开发指令"。AI 替他创建了一个文件。

这就是一切的开始。

---

## 🗣️ 你将说出的话

安装完成后，你在终端里输入：

```bash
acpx --approve-all --allowed-tools "Write,Bash,Read,Edit" claude exec "Create a file called hello.txt with content: Hello from CEO of One!"
```

AI 就会替你创建那个文件。这就是你的第一个"AI 帮我干了活"的瞬间。

---

## 手把手安装

### 前提：安装 Node.js

你的电脑需要 Node.js（v18 及以上）。

👉 去 [nodejs.org](https://nodejs.org) 下载并安装 LTS 版本。

验证：
```bash
node -v    # 应该显示 v18 或更高
npm -v     # 应该显示版本号
```

### 第 1 步：安装 OpenClaw（你的 COO）

```bash
npm install -g openclaw
```

OpenClaw 是你的 AI COO。它理解你想要什么，拆解任务，指挥 Claude Code 执行。

### 第 2 步：安装 acpx（桥梁）

```bash
npm install -g acpx
```

acpx 连接 OpenClaw 和 Claude Code，是它们之间的通信协议。

### 第 3 步：安装 Claude Code（你的工程师）

```bash
npm install -g @anthropic-ai/claude-code
```

Claude Code 是你的 AI 工程师。它写代码、跑测试、交付产品。

### 第 4 步：获取 API Key

你需要一个 Anthropic API Key 来驱动 Claude Code。

👉 去 [console.anthropic.com](https://console.anthropic.com) 获取。

然后设置：
```bash
# Mac / Linux
export ANTHROPIC_API_KEY=sk-ant-你的key

# Windows PowerShell
$env:ANTHROPIC_API_KEY = "sk-ant-你的key"
```

### 第 5 步：发出你的第一条指令 🎉

```bash
acpx --approve-all --allowed-tools "Write,Bash,Read,Edit" claude exec "Create a file called hello.txt with content: Hello from CEO of One!"
```

如果一切正常，你会看到：
```
[tool] Write hello.txt (completed)
Created `hello.txt` with the message "Hello from CEO of One!"
[done] end_turn
```

**确认一下：** 你的目录里现在多了一个 `hello.txt` 文件。AI 帮你创建的。

---

## 🔍 为什么是这个命令？

拆解一下你刚才输入的命令：

| 部分 | 作用 | 为什么重要 |
|------|------|-----------|
| `acpx` | 启动 AI 桥梁 | 连接你和 Claude Code |
| `--approve-all` | 自动批准权限 | Claude Code 不会停下来问你 |
| `--allowed-tools "Write,Bash,Read,Edit"` | 告诉 Claude 它能用哪些工具 | **没有这个，Claude 无法创建文件** |
| `claude exec` | 一次性执行模式 | 干完活就结束 |
| `"Create a file..."` | 你的指令（用英语） | 这就是你"说话"的地方 |

**最重要的部分是 `--allowed-tools`。** 没有它，Claude Code 会拒绝创建或修改任何文件。这是新手最容易踩的坑。

---

## ⚠️ 翻车 #1："Permission Denied"

如果你忘了加 `--allowed-tools`，你会看到：
```
Permission to use Write has been denied because Claude Code is running in don't ask mode.
```

**解法：** 命令里始终包含 `--allowed-tools "Write,Bash,Read,Edit"`。

**为什么会这样？** Claude Code 有三层安全机制。默认情况下，它不会写入任何东西，除非你明确授权。`--allowed-tools` 就是告诉它"这些工具你可以用"。后面的章节会深入讲这个。

## ⚠️ 翻车 #2："usage_update Error"

你可能会看到一些关于 `session/update usage_update` 的报错。**忽略它。** 这是 acpx 的已知 bug，不影响任何功能。

---

## 💰 花费预估

这个安装测试大约花费 **$0.01**（不到 1 分钱）。你的 Anthropic 账户注册后有免费额度。

---

## 📝 话术模板

以后发指令都用这个格式：

```
acpx --approve-all --allowed-tools "Write,Bash,Read,Edit" claude exec "[你想让 AI 做什么]"
```

把 `[你想让 AI 做什么]` 替换成你的指令（用英语写）。

---

## ➡️ 下一章：[🧠 第 1 章 —— 给 AI 装上一个顶级 COO 的大脑](../01-soul/README_zh.md)

现在你的 AI 是一张白纸。你说什么它做什么——不多也不少。在第 1 章，我们要给它装上一个 COO 的大脑，让它自己思考产品质量、任务规划和进度汇报。
