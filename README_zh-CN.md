<p align="left">
  <a href="README.md"><img src="https://img.shields.io/badge/README-English-blue" alt="English" /></a>
</p>

<p align="center">
  <h1 align="center">CEO of One</h1>
  <p align="center"><em>你的单人公司的 AI 操作系统。</em></p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/chapters-11-blue" alt="11 Chapters" />
  <img src="https://img.shields.io/badge/tests-111_passed-green" alt="111 Tests Passing" />
  <img src="https://img.shields.io/badge/deployed-live-brightgreen" alt="Deployed" />
  <img src="https://img.shields.io/badge/license-MIT-green" alt="MIT License" />
  <img src="https://img.shields.io/badge/status-complete-success" alt="Complete" />
</p>

---

> 2026 年，一个人就是一家公司。
> 你不需要团队，不需要学编程，不需要融资。
> OpenClaw 当你的 COO，Claude Code 当你的工程师。
> **你说一句话，他们把产品做出来，你拥有 100% 的股权。**

这本书教你这套方法。

## 你将做出什么

一个真实的、能赚钱的知识付费平台——**"CEO of One 训练营"**——从一句话到上线收费。

| 章 | 你将做出这个 |
|---|------------|
| 🚀 [0](chapters/00-setup/) | 5 分钟后你能跟 AI 对话了 |
| 🧠 [1](chapters/01-soul/) | 给 AI 装上一个顶级 COO 的大脑 |
| 🎯 [2](chapters/02-snake-game/) | 一句话做出一个能玩的贪吃蛇 |
| 📝 [3](chapters/03-quality-checklist/) | 让 AI 自己检查工作质量，不用你盯着 |
| 🏠 [4](chapters/04-landing-page/) | 训练营首页——漂亮、专业、上线 |
| 🔐 [5](chapters/05-auth/) | 学员可以注册、浏览课程 |
| 💳 [6](chapters/06-payment/) | 学员付钱 → 立刻解锁内容 |
| 🐛 [7](chapters/07-bugfix/) | 学会说"这不对，改"——一句话修好 bug |
| 🌍 [8](chapters/08-deploy/) | 买域名、上线，全世界都能访问 |
| 📊 [9](chapters/09-dashboard/) | 看到谁注册了、谁付钱了、赚了多少 |
| 🎓 [10](chapters/10-graduation/) | 不看教程，从零做出第二个产品 |

## 你的团队

```
CEO（你）
  │  "帮我做一个课程平台"
  │
  ▼
COO（OpenClaw）
  │  理解意图 → 拆解任务 → 分配工作 → 验收质量 → 汇报进度
  │  不写代码，只指挥
  │
  ▼
开发工程师（Claude Code）
  │  写代码 → 跑测试 → 改 bug → 上线
  │  不做产品决策，只做执行
  │
  ▼
CEO（你）
  ← "做好了，你看看效果"
```

## 为什么不一样

- 🗣️ **全程不需要写代码**，你只需要说话
- 🧪 **每句话术都经过实战验证**，先做出来，再写进书里
- 🏗️ **一个产品从头到尾**，不是碎片教程，是完整的产品之旅
- 💰 **第 6 章就能收钱**，你的产品具备付费能力

> ⚠️ **重要提示：** 本课程中的支付系统使用的是**模拟支付**（不涉及真实金额）。接入真实支付（Stripe、微信支付等）是毕业后的事。架构已经为真实支付做好准备——到时候替换一个模块就行。

- 🎓 **自证效应**：这本书本身就是用它教的方法做出来的

> ⚠️ **重要提示：** 平台使用的是**内存种子数据**（不是数据库）。用户、课程、订单在服务器重启后会重置。添加数据库（PostgreSQL、MongoDB 等）是毕业后的事。架构已经为数据库做好准备——到时候把 `store.ts` 替换成真实数据库模块就行。

## 前置条件

开始之前，你需要：

| 工具 | 是什么 | 怎么装 |
|------|--------|--------|
| **Node.js**（v18+） | JavaScript 运行环境 | [nodejs.org](https://nodejs.org) — 下载 LTS 版，安装，重启终端 |
| **OpenClaw** | 你的 AI COO | `npm install -g openclaw` — 参考 [openclaw.ai](https://docs.openclaw.ai) |
| **acpx** | Claude Code 连接器 | `npm install -g acpx` — 随 OpenClaw 一起安装 |
| **Claude API key** | 驱动你的工程师 | [console.anthropic.com](https://console.anthropic.com) — 获取 API key，设置环境变量 `ANTHROPIC_API_KEY` |
| **OpenClaw AI key** | 驱动你的 COO | 安装 OpenClaw 后按提示配置 |

> **不知道怎么设置环境变量？**
> - **Windows：** 开始菜单搜索"环境变量" → 编辑 → 新建 → 变量名 `ANTHROPIC_API_KEY`，值填你的 key → 重启终端
> - **macOS/Linux：** `echo 'export ANTHROPIC_API_KEY=你的key' >> ~/.bashrc && source ~/.bashrc`

> ⚠️ **两个 API 都需要付费。** Claude API 按量计费（完成全部课程约 $5-15）。OpenClaw 有自己的定价。这是经营一人公司的成本——仍然比雇一个开发便宜得多。

## 快速开始

1. 安装上面所有前置条件
2. 启动 OpenClaw：`openclaw gateway start`
3. 将 `templates/SOUL-COO.md` 复制到你的 OpenClaw 工作目录，重命名为 `SOUL.md`
4. 将 `templates/PROCESS-COO.md` 复制到同一个目录
5. 👉 从[第 0 章：5 分钟让 AI 听你的话](chapters/00-setup/)开始

> **OpenClaw 工作目录在哪？** 运行 `openclaw status` 可以查看路径。首次启动时 OpenClaw 会自动创建，通常在 `~/.openclaw/workspace/`（macOS/Linux）或 `C:\Users\<你的用户名>\.openclaw\workspace\`（Windows）。

👉 从 [第 0 章：5 分钟让 AI 听你说话](chapters/00-setup/) 开始

## 学员作品

真实的普通人，用学到的能力做出来的真实产品。

→ [看看一人 CEO 们做出了什么](showcase/)

## 贡献

- 📖 发现错误？[提交 issue](.github/ISSUE_TEMPLATE/bug-report.md)
- 💡 有建议？[告诉我们](.github/ISSUE_TEMPLATE/feature-request.md)
- 🎓 做出了产品？[来 showcase 展示](showcase/)

## 协议

[MIT](LICENSE) ❤️
