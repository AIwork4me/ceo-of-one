<p align="left">
<a href="README.md"><img src="https://img.shields.io/badge/README-English-blue" alt="English" /></a>
</p>

# 第五章：走向全球

Landing page 很漂亮，产品也能跑，测试全绿。

然后我们把它给了一个英语用户。他盯着满屏的中文字符，关掉了页面。

就在那一刻，一个全球产品变成了一个地区小项目。

---

## 🎯 你将学到

- 为什么国际化不是"锦上添花"，而是生存必需
- 如何用 next-intl 给 Next.js 应用加完整 i18n 支持
- 国际化过程中遇到的 5 个 bug（每个教会了我们什么）
- 为什么默认语言不应该有 URL 前缀

> **"酒香不怕巷子深"的前提是——客人能看懂你的招牌。**

---

## 🔍 COO 做了什么

### 第一步：诊断问题

COO 做了一个简单的测试：像一个陌生人一样打开网站。诊断结果很残酷：

| 问题 | 影响 |
|------|------|
| Landing page 100% 中文 | 英语用户直接关闭 |
| 没有语言切换按钮 | 无法切换语言 |
| Social proof 用中文名 | 国际用户无法产生共鸣 |
| 价格只有人民币（¥299） | 没有美元定价 |
| `<html lang="zh-CN">` 写死 | Google 把它当成纯中文站点 |

这不是小问题。这是**全球化的致命伤**。

### 第二步：设计架构

COO 选择了 `next-intl` — Next.js App Router 的标准 i18n 库。架构决策：

```
改造前：                          改造后：
src/app/page.tsx                src/app/[locale]/page.tsx
src/app/auth/page.tsx            src/app/[locale]/auth/page.tsx
                                 src/i18n/routing.ts        ← 语言配置
                                 src/i18n/dictionaries/     ← 翻译文件
                                   en.json
                                   zh.json
                                 src/middleware.ts           ← 语言检测
                                 src/components/
                                   LanguageSwitcher.tsx     ← 语言切换按钮
```

关键决策：
- **默认语言英文，无前缀**（`/` = 英文，`/zh` = 中文）
- **浏览器自动检测**，通过 `Accept-Language` 请求头
- **所有文案放入字典** — 组件中零硬编码字符串

### 第三步：提取所有文案

7 个页面中的每一处中文都被提取到翻译字典中：

```json
{
  "hero": {
    "title": "一个人就是一家公司",
    "subtitle": "2026 年，你不需要学编程……"
  }
}
```

共 205 个翻译键。每个页面、每个按钮、每条错误提示。

### 第四步：本地化一切

- **定价：** $39（英文）/ ¥299（中文）
- **用户证言：** 英文用国际名字（Sarah, James, Mei）；中文用中文名
- **SEO：** 每种语言独立的 OG 标题、描述、关键词
- **Sitemap：** `/` 和 `/zh` 页面都注册

---

## 🐛 五个 Bug

这是诚实部分。i18n 迁移并不顺利。以下是遇到的每一个 bug：

### Bug 1：zh.json 解析错误
**症状：** `npm run build` 失败，报 "Cannot parse JSON at position 1649"
**原因：** Claude Code 生成的中文文本包含弯引号（`"` `"`），被转换成了 JSON 字符串内的 ASCII 双引号
**修复：** 写了一个 Python 脚本，转义所有内部未转义的双引号
**教训：** 永远不要信任 AI 生成的 JSON，必须验证

### Bug 2：TypeScript 类型错误
**症状：** `Type 'string | undefined' is not assignable to type 'string | number | Date'`
**原因：** API 返回的 `data.courseName` 可能是 `undefined`，直接传给了翻译函数
**修复：** 添加空值合并（`data.courseName ?? ''`）
**教训：** API 返回值永远不会像你预期的那样干净

### Bug 3：i18n 后所有子页面 404
**症状：** `/courses`、`/dashboard`、`/auth` 全部返回 404
**原因：** 使用了 `next/link` 和 `next/navigation` 而不是 next-intl 的 `createNavigation`。链接没有 locale 前缀。
**修复：** 创建了 `src/i18n/navigation.ts`，替换所有导入
**教训：** 页面移到 `[locale]/` 下后，每一个链接都必须走 i18n 路由

### Bug 4：LanguageSwitcher 跳转到 `/zh/en`
**症状：** 在 `/zh/courses` 点"English"按钮，跳转到了 `/zh/en/courses`
**原因：** 手动拼接路径（`segments[1] = newLocale`）在 `localePrefix: 'as-needed'` 模式下不工作
**修复：** 使用 `router.replace(pathname, { locale: otherLocale })` — next-intl 内置的语言切换 API
**教训：** 不要跟框架对抗，用它提供的 API

### Bug 5：默认语言有前缀
**症状：** 默认英文页面在 `/en/dashboard` 而不是 `/dashboard`
**原因：** 默认的 `localePrefix` 模式给所有语言加前缀
**修复：** 在 routing 配置中设置 `localePrefix: 'as-needed'`
**教训：** 国际惯例是：默认语言 = 干净的 URL。不要让英文用户看 `/en`。

---

## ✅ 最终结果

修复全部 5 个 bug 后：

| 路由 | 语言 | 状态 |
|------|------|------|
| `/` | English（自动检测） | ✅ |
| `/zh` | 中文（自动检测） | ✅ |
| `/courses` | English | ✅ |
| `/zh/courses` | 中文 | ✅ |
| `/dashboard` | English | ✅ |
| `/zh/dashboard` | 中文 | ✅ |

浏览器语言检测生效。语言切换按钮生效。所有翻译正确渲染。SEO metadata 跟随语言。Build 通过。111/111 tests 通过。

---

## 💡 为什么这很重要

**国际化不是第十章，是第五章。**

旧计划是：先用中文做完所有功能，最后再加 i18n。那意味着：
- 要从 11 章的代码中重新提取文案
- 修复几百个文件中的引用
- 可能破坏"一直好好的"功能

在 Landing page 之后立刻做 i18n：
- 只需要提取 1 个页面的文案（不是 7 个以上）
- 后续每个功能从一开始就是双语的
- 架构从一开始就是干净的

**这就是 COO 的价值：** 在你踩到地雷之前看到它，而不是踩到之后再去处理。

---

## 🎓 本章要点

> **从第一天起就为全球用户构建，而不是为你的桌面构建。** 早期加 i18n 的成本是几个小时，晚期加的成本是几周的重构和坏掉的链接。COO 的战略价值不在于执行任务——而在于看到 CEO 还没看到的东西。

一次迁移 5 个 bug。每个都是小问题、容易修。但如果我们带着这些 bug 发布，每一个都会成为真实用户的负面第一印象。质量不是零 bug——而是在用户遇到 bug 之前抓住它们。

---

📖 **实战：** 查看完整的实验记录 [`experiment_zh-CN.md`](experiment_zh-CN.md)
⬅️ **上一章：** [第四章：搭建真正的 Landing Page](../04-landing-page/README_zh-CN.md) | ➡️ **下一章：** [第六章：让用户留下来](../06-auth/README_zh-CN.md)
