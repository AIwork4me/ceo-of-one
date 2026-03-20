# 第八章 — 部署到 Vercel

[English](experiment.md)

> **CEO 的一句话：** "先部署到vercel"
>
> **COO 花费：** ~15 分钟 | **修改文件：** 4 | **测试：** 94/94 ✅ | **Bug：** 0

---

## 发生了什么

这一章不一样。之前每章都是 CEO 说一句话，COO 全搞定。这一次，CEO 必须亲自参与——注册账号、点击导入、在网页里配置。部署不是纯粹的编码。

CEO 说：**"先部署到vercel"**

COO 的工作流：

### 1. 检查前置条件
- 本地没有安装 Vercel CLI
- `.env.example` 内容太少（缺少 JWT_SECRET）
- `next.config.js` 是空的

### 2. 架构师决策
**选 Vercel**——不用 Railway，不用 AWS。原因：
- 对 Next.js 最简单（同一家公司的产品）
- 免费额度足够
- 标准 Next.js 应用零配置部署
- CEO 不需要 DevOps 经验

### 3. 明确改动（4 个文件）

| 文件 | 改动 | 原因 |
|------|------|------|
| `.env.example` | 添加 `JWT_SECRET` 占位符 | 文档化环境变量 |
| `next.config.js` | 添加 `output: 'standalone'` | 优化 serverless 构建 |
| `src/app/api/health/route.ts` | 添加 `version` 字段 | 追踪部署版本 |
| `vercel.json` | 新建文件 | 框架感知的路由配置 |

### 4. 执行
Claude Code 完成了全部 4 项改动。结果：
- **0 bug**
- **94/94 测试通过**
- 构建零错误

### 5. 指导 CEO 完成 Vercel 导入
COO 写了详细的步骤指导：
1. 注册 Vercel 账号（GitHub 登录）
2. 点击 "Add New Project" → 从 GitHub 导入
3. **关键步骤：** 把 Root Directory 设为 `"platform"`（不是仓库根目录）
4. 部署

### 6. 验证
CEO 打开浏览器确认：
- ✅ 首页加载正常 `https://ceo-of-one-seven.vercel.app/`
- ✅ `/api/health` 返回 `{"status":"ok","version":"1.0.0"}`
- ✅ `/api/courses` 返回 `{"success":true,"data":[]}`

---

## 结果

| 检查项 | 状态 |
|--------|------|
| 首页上线 | ✅ |
| 健康端点正常 | ✅ |
| 课程端点正常 | ✅ |
| 构建零错误 | ✅ |
| 94/94 测试通过 | ✅ |
| .env.example 完整 | ✅ |
| standalone 输出已配置 | ✅ |
| vercel.json 已创建 | ✅ |
| 域名绑定（tinkerclaw.io） | ⏳ 待完成 |
| JWT_SECRET 在 Vercel 中设置 | ⏳ 待完成（auth 使用开发默认值） |

---

## 核心洞察：空数据不是 Bug

课程端点返回 `{"data":[]}` ——空数组。因为所有数据都存在内存里，每次部署都会重置。

这**不是 bug**。这正是第九章存在的原因。

当你部署一个纯内存应用，你得到了代码，但得不到数据。看到那个空白的页面，你就理解了为什么持久化如此重要。第九章（数据库和仪表盘）变得不可避免且紧迫——不是因为谁说了算，而是因为线上站点证明了这一点。

---

## 修改的文件

```
.env.example                          # 添加 JWT_SECRET 占位符
next.config.js                        # 添加 output: 'standalone'
src/app/api/health/route.ts           # 添加 version 字段
vercel.json                           # 新建文件
```

---

## 实际保留

- **Root Directory = "platform"** 是部署的头号陷阱。跳过这一步，Vercel 会尝试从 monorepo 根目录构建然后失败。COO 必须明确指出。
- **中国 ↔ Vercel 的连接不稳定。** CEO 在浏览器里验证端点（成功了），而不是 COO 从服务器 curl（失败了）。跨区域场景下，浏览器验证胜过服务端验证。
- **看到页面上线会带来心理转变。** 项目从"本地 demo"变成了"真实产品"。第八章的价值是情感层面的，不是技术层面的。
- **内存存储 → 部署后数据为零。** 这让第九章变得不可避免。
