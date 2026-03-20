<p align="left">
<a href="experiment.md"><img src="https://img.shields.io/badge/Experiment-English-blue" alt="English" /></a>
</p>

# 实验：第 0 章验证

> **日期：** 2026-03-20
> **目标：** 验证初学者能否在 5 分钟内从零安装到"AI 替我做了件事"
> **状态：** ✅ 已完成

<p align="left">
  <a href="experiment.md"><img src="https://img.shields.io/badge/🇺🇸-English-blue" alt="English" /></a>
</p>

## 假设

一个完全的新手可以在 5 分钟内安装所有工具，并通过 acpx 让 Claude Code 成功执行一个任务。

## 环境基线

| 工具 | 版本 |
|------|------|
| Node.js | v24.12.0 |
| npm | 11.6.2 |
| OpenClaw | 2026.3.13 |
| acpx | 0.3.1 |
| Claude Code | 2.1.76 |
| git | 2.52.0 |
| 操作系统 | Windows 10 (x64) |

## 执行记录

### 步骤 1：安装 Node.js
**未测试** — 假设已预装。大多数开发者已有 Node.js。
**教程备注：** 需要添加"前提条件：安装 Node.js"章节并附链接。

### 步骤 2：安装 OpenClaw
```bash
npm install -g openclaw
```
**结果：** 已安装，跳过计时。
**备注：** 需要在全新机器上计时以获取准确数据。

### 步骤 3：安装 acpx
```bash
npm install -g acpx
```
**结果：** 已安装，跳过计时。

### 步骤 4：安装 Claude Code
```bash
npm install -g @anthropic-ai/claude-code
```
**结果：** 已安装，跳过计时。

### 步骤 5：配置 API Key
```bash
export ANTHROPIC_API_KEY=sk-ant-...
```
**结果：** 已配置。
**教程备注：** 这是新手的 #1 卡点。需要清晰的步骤指引。

### 步骤 6：测试不带 --allowed-tools 的 acpx（❌ 失败）

```bash
acpx claude exec "Create a file called hello.txt with content: Hello!"
```

**结果：** ❌ Claude Code 拒绝写入：
```
Permission to use Write has been denied because Claude Code is running in don't ask mode.
```

**教训：** 不加 `--allowed-tools` 的 `acpx claude exec` 无法写入文件。**这是新手必踩的坑。**

### 步骤 7：测试带正确参数的 acpx（✅ 成功）

```bash
acpx --approve-all --allowed-tools "Write,Bash,Read,Edit" claude exec "Create a file called hello.txt with content: Hello from CEO of One!"
```

**结果：** ✅ 成功！
```
[tool] Write hello.txt (completed)
Created `hello.txt` with the message "Hello from CEO of One!"
[done] end_turn
```

### 步骤 8：观察到非关键错误

```
Error handling notification: session/update usage_update
code: -32602, message: "Invalid params"
```

**评估：** 非关键。acpx 的已知 bug。不影响功能。

## 分析

### 关键发现

1. **`--allowed-tools` 是必须的。** 没有它，Claude Code 以 `dontAsk` 模式运行，拒绝所有写入操作。新手会立刻撞墙。

2. **三参数组合有效：** `--approve-all` + `--allowed-tools` + `claude exec` 是正确的配方。

3. **API Key 配置是最大的摩擦点。** 新手需要一步步的引导。

4. **5 分钟的宣称是现实的，前提是：**
   - Node.js 已预装
   - API Key 已准备好
   - 教程给出了带参数的精确命令

### 教程中的翻车点

| 翻车点 | 严重程度 | 解决方案 |
|--------|---------|---------|
| 忘加 `--allowed-tools` | 🔴 严重 | 给出精确命令，不要让读者猜 |
| API Key 配置困惑 | 🟡 高 | 专门步骤 + 截图 |
| `usage_update` 报错 | 🟢 低 | 在翻车实录中说明无害 |
| Windows 上 npm install 可能很慢 | 🟡 高 | 备注：首次安装约 2-5 分钟 |

## 结论

**假设部分成立。** 如果前提条件（Node.js + API Key）就绪，5 分钟的宣称是可达成的。最大风险是 `--allowed-tools` 这个坑——必须在教程中醒目标注。
