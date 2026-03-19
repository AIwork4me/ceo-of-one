# CEO of One — 创建计划书

> *创建时间：2026-03-20 05:59*
> *状态：⏳ 待 CEO 审阅*

---

## 总览

| 项目 | 内容 |
|------|------|
| GitHub 仓库 | `AIwork4me/ceo-of-one` |
| 本地路径 | `C:\Users\ASUS\Desktop\cc_projects\ceo-of-one` |
| 工作路径 | `C:\Users\ASUS\.openclaw\workspace\ceo-of-one` |
| 协议 | MIT |

---

## 阶段一：Repo 骨架创建

### 1.1 初始化仓库
- 在 `cc_projects` 下创建目录
- `git init` + 关联远程 `AIwork4me/ceo-of-one`
- 创建 `.gitignore`（node_modules、.env、experiments/ 中的临时文件等）

### 1.2 创建目录结构
```
ceo-of-one/
├── PRINCIPLES.md
├── README.md
├── README_zh.md
├── LICENSE
├── .gitignore
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   └── bug-report.md
│   └── PULL_REQUEST_TEMPLATE.md
├── chapters/
│   ├── 00-setup/
│   │   └── README.md        # 占位
│   ├── 01-soul/
│   │   └── README.md        # 占位
│   ├── 02-snake-game/
│   ├── 03-quality-check/
│   ├── 04-landing-page/
│   ├── 05-auth/
│   ├── 06-payment/
│   ├── 07-fix-bugs/
│   ├── 08-deploy/
│   ├── 09-dashboard/
│   └── 10-graduation/
├── showcase/
│   └── README.md            # 投稿规则 + 模板
├── templates/
│   ├── SOUL-COO.md          # COO 灵魂模板（待验证后填充）
│   ├── review-checklist.md
│   └── talk-templates/
├── experiments/
│   └── README.md            # 实验说明
└── assets/
    └── README.md            # 资源说明
```

### 1.3 写 README.md（英文主 README）
内容：
- 项目名 + 副标题
- 核心定位（3 行）
- 角色分工图（CEO / COO / 工程师）
- 章节列表（表格，含每章产出）
- 为什么这个项目不一样（差异化亮点）
- 快速开始（指向第 0 章）
- Showcase 链接
- License

### 1.4 写 README_zh.md（中文版）
内容同上，中文。

### 1.5 写 LICENSE（MIT）

### 1.6 写 showcase/README.md
- 什么是 showcase
- 如何提交你的作品（PR 模板）
- 条目格式模板（说了什么 → 做出了什么 → 上线地址 → 赚了多少）

### 1.7 写 .github 模板
- issue 模板（bug 报告、功能建议、展示提交）
- PR 模板

### 1.8 写每个 chapter 的占位 README.md
标题 + "Coming soon..." + 链接到前一章和下一章

### 1.9 首次 commit + push

**阶段一完成标志**：仓库在 GitHub 上可见，目录结构完整，README 能看。

**完成后向你报告。**

---

## 阶段二：第 0 章验证 + 写作

### 2.1 验证实验
- 在 `experiments/00-setup/` 下记录
- 目标：验证"从零安装到第一次成功执行"是否能在 5 分钟内完成
- 步骤：
  1. 记录当前已安装的工具（Node.js 版本、npm 版本）
  2. 清理 acpx 缓存，模拟全新安装
  3. `npm install -g openclaw` → 记录耗时和问题
  4. `npm install -g acpx` → 记录耗时和问题
  5. `npm install -g @anthropic-ai/claude-code` → 记录耗时和问题
  6. 配置 API key → 记录步骤
  7. 发送第一条指令 → 记录结果
  8. 总结：实际耗时、卡点、优化建议

### 2.2 基于验证结果写 chapters/00-setup/README.md
- 场景故事：一个从未接触过编程的人，今天要开始
- 指挥话术："你好，帮我做一个贪吃蛇"（预览下一章）
- 完整安装步骤（基于验证结果优化）
- 翻车实录：安装过程中遇到的问题
- 话术模板
- API key 费用预估

### 2.3 commit + push

**阶段二完成标志**：第 0 章内容完整，读者能跟着完成安装。

**完成后向你报告。**

---

## 阶段三：第 1 章验证 + 写作

### 3.1 验证实验（最关键）
- 在 `experiments/01-soul-comparison/` 下记录
- **对比实验设计**：
  - 任务：做一个"待办清单 API"（跟 ai-dev-arena 的 Challenge 0 类似）
  - 对照组 A：OpenClaw 用**空 SOUL.md**（默认人格，无产品思维）
  - 对照组 B：OpenClaw 用**COO 灵魂 SOUL.md**
  - 记录指标：
    - 拆解质量（有没有自动拆任务？拆得合理吗？）
    - 代码质量（测试通过率）
    - 是否主动验收
    - 是否主动汇报进度
    - 总耗时
    - API 花费
  - 对比分析 + 截图

### 3.2 基于验证结果写 chapters/01-soul/README.md
- 场景故事：为什么你的 AI 有时候很蠢，有时候很聪明？
- 核心概念：SOUL.md 是 AI 的"操作系统"
- COO 灵魂模板详解（逐行解释为什么这么写）
- 对比实验结果展示（A vs B 的差异，用数据说话）
- 翻车实录：不合理的 SOUL 设置导致的问题
- 话术模板：如何描述你想要的 AI 性格
- 交付：templates/SOUL-COO.md

### 3.3 commit + push

**阶段三完成标志**：第 1 章内容完整，SOUL-COO.md 模板可用。

**完成后向你报告。**

---

## 阶段四：第 2 章验证 + 写作

### 4.1 验证实验
- 在 `experiments/02-precision-test/` 下记录
- **精确度对比实验**：
  - 任务：做一个贪吃蛇游戏
  - 话术 A（模糊）："做一个贪吃蛇"
  - 话术 B（中等）："做一个网页版贪吃蛇游戏，蛇吃到食物会变长，撞到墙或自己就死"
  - 话术 C（精确）："做一个网页版贪吃蛇游戏。技术栈：HTML + CSS + JavaScript 单文件。功能：蛇用方向键控制，吃到红色食物变长加分，撞墙或自身则游戏结束，显示最终分数，有重新开始按钮。风格：深色背景，蛇是绿色，食物是红色，有简单的 CSS 动画。"
  - 记录：首次产出质量、是否需要返工、总耗时

### 4.2 写 chapters/02-snake-game/README.md
- 场景故事：同样说"做一个贪吃蛇"，为什么有人做出来很好玩，有人做出来一坨
- 话术对比 + 分析
- 话术模板：3 个维度（功能、技术约束、视觉风格）

### 4.3 commit + push

**完成后向你报告。**

---

## 阶段五：第 3 章验证 + 写作

### 5.1 验证实验
- 任务：做一个待办清单
- 对照：有验收要求 vs 无验收要求
- 指标：首次通过率、bug 数量、返工次数

### 5.2 写 chapters/03-quality-check/README.md
- 核心概念：你不盯着，怎么知道 AI 做得好不好？
- 话术模板：如何在指令中加入质量标准
- 交付：验收话术模板

### 5.3 commit + push

**完成后向你报告。**

---

## 阶段六：第 4-6 章验证 + 写作

主线产品"CEO of One 训练营"开始搭建。

### 6.1 第 4 章验证
- 真实指令：让 OpenClaw 搭建训练营首页
- 记录完整对话过程
- 写 chapters/04-landing-page/README.md

### 6.2 第 5 章验证
- 在第 4 章基础上加注册登录
- 写 chapters/05-auth/README.md

### 6.3 第 6 章验证
- 在第 5 章基础上加支付功能
- 写 chapters/06-payment/README.md

**每章完成后向你报告。**

---

## 阶段七：第 7-9 章验证 + 写作

### 7.1 第 7 章：真实 bug 修复过程
### 7.2 第 8 章：部署到 Vercel/Railway
### 7.3 第 9 章：数据看板

**每章完成后向你报告。**

---

## 阶段八：第 10 章 + 打磨

### 8.1 第 10 章验证
- 从零开始，不看教程，用话术模板做一个全新的知识付费平台
- 记录全程

### 8.2 收尾
- 补充 showcase/README.md 的详细模板
- 更新 README.md 加入 showcase 链接
- 检查所有章节的链接和格式
- 中英双语检查

**完成后向你报告。**

---

## 时间线估算

| 阶段 | 内容 | 预计时间 |
|------|------|----------|
| 一 | Repo 骨架 | 30 分钟 |
| 二 | 第 0 章 | 1 小时 |
| 三 | 第 1 章（最关键） | 2-3 小时 |
| 四 | 第 2 章 | 1-2 小时 |
| 五 | 第 3 章 | 1 小时 |
| 六 | 第 4-6 章 | 4-6 小时 |
| 七 | 第 7-9 章 | 4-6 小时 |
| 八 | 第 10 章 + 打磨 | 2-3 小时 |
| **总计** | | **约 16-22 小时** |

---

## 风险与应对

| 风险 | 应对 |
|------|------|
| 验证实验结果与预期不符 | 如实记录，调整方法论，这是最有价值的内容 |
| 某些功能（如支付）验证受阻 | 先用模拟方案，标注为"待真实验证" |
| Claude Code API 费用超出预算 | 每次验证前预估成本，设置上限 |
| 篇幅过长 | 每章控制在 2000 字以内，多余内容放附录 |

---

**请审阅。确认后从阶段一开始执行。**
