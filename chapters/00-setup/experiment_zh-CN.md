<p align="left"><a href="experiment.md">English</a></p>

# 第 0 章实验：安装 AI 团队

## 目标

验证一个非程序员能否完成三个必需工具（OpenClaw、acpx、Claude Code）的安装，并成功发出第一条 AI 指令——从零到 AI 创建文件，端到端跑通。

## 实验设置

| 项目 | 详情 |
|---|---|
| **CEO** | 非程序员，无 Node.js 经验 |
| **需安装工具** | Node.js ≥18、OpenClaw、acpx、@anthropic-ai/claude-code |
| **API Key** | 从 console.anthropic.com 获取 |
| **成功标准** | `acpx claude exec` 成功创建 `hello.txt` |
| **环境** | Windows 11（PowerShell），全新 Node.js 安装 |

## 实验过程

### 步骤 1：安装 Node.js

从 nodejs.org 下载 LTS 版本，运行安装程序，验证：

```bash
node -v   # v20.x
npm -v    # 10.x
```

无问题。标准安装程序，下一步下一步完成。

### 步骤 2：安装三个工具

```bash
npm install -g openclaw
npm install -g acpx
npm install -g @anthropic-ai/claude-code
```

三个工具全部安装成功，无依赖冲突。

### 步骤 3：设置 API Key

```bash
$env:ANTHROPIC_API_KEY = "sk-ant-..."
```

### 步骤 4：运行第一条指令

```bash
acpx --approve-all --allowed-tools "Write,Bash,Read,Edit" claude exec "Create a file called hello.txt with content: Hello from CEO of One!"
```

结果：`hello.txt` 被成功创建，内容完全匹配。

### 步骤 5：验证

用记事本打开 `hello.txt`，内容正确。✅

## 实验结果

| 步骤 | 状态 | 备注 |
|---|---|---|
| Node.js 安装 | ✅ | 2 分钟，无问题 |
| OpenClaw 安装 | ✅ | `npm install -g openclaw` |
| acpx 安装 | ✅ | `npm install -g acpx` |
| Claude Code 安装 | ✅ | `npm install -g @anthropic-ai/claude-code` |
| API Key 设置 | ✅ | PowerShell `$env:` 语法 |
| 首条指令执行 | ✅ | `hello.txt` 创建成功 |
| `usage_update` 错误 | ⚠️ | 出现但无害 — 已知 acpx bug |

## 关键发现

1. **第一次就成功了。** 没有波折，没有排错。下载 Node、跑三个 npm install、设 key、发指令。最难的部分是找到在哪获取 Anthropic API Key。

2. **`--allowed-tools` 是第一大坑。** 没有它，Claude Code 会拒绝写入文件。这个参数是"AI 帮你做事"和"AI 在那要权限"的区别。

3. **`usage_update` 错误是红鲱鱼。** 看着吓人但实际无害。我们应该从第一天就记录这个坑。

4. **"第一次成功时刻"比工具本身更重要。** 看到一张 AI 为你创建的文件，就是钩子。本章之后的一切都建立在这个"等等，它真的能行"的时刻之上。

## 这证明了什么

非程序员可以在 5 分钟内从零到"AI 为我建了东西"。整个 CEO of One 方法建立在这个基础之上——如果工具装不上，后面什么都没意义。它们装上了。

## 沉淀知识

- B：Node.js LTS（≥18）是唯一前置条件，其余全部通过 npm 安装。
- B：`--allowed-tools "Write,Bash,Read,Edit"` 是 Claude Code 创建文件的必要参数。
- B：acpx 的 `usage_update` 错误是表面问题，可以忽略。
- O：第一条指令应该尽可能简单——创建文本文件，不是构建应用。目标是证明可行性，不是炫技。

---

[README](README_zh-CN.md) | [下一章: 第 1 章 — 给 AI 一个顶级 COO 大脑](../01-soul/) →

