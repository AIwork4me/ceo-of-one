# 第五章：走向全球 — 实验记录

## 目标

给 CEO of One 平台添加完整的国际化（i18n）支持，支持英文（默认）和中文。

## 假设

使用 next-intl 配合 `localePrefix: 'as-needed'`，平台可以为两种语言提供：
- 干净的 URL（默认语言无 `/en` 前缀）
- 通过浏览器 `Accept-Language` 自动检测
- 所有 205+ 个文本字符串正确翻译
- 现有 111 个测试零回归

## 变量

| 变量 | 值 |
|------|-----|
| i18n 库 | next-intl |
| 默认语言 | en（无 URL 前缀） |
| 第二语言 | zh（前缀：/zh） |
| 语言检测 | 浏览器 Accept-Language 请求头 |
| 翻译键 | 共 205 个 |
| 受影响页面 | 7 个（landing、auth、courses、dashboard、graduation、profile、navigation） |

## 过程

### 阶段一：基础设施
1. 安装 next-intl
2. 创建 `src/i18n/routing.ts` 语言配置
3. 创建 `src/i18n/request.ts` 服务端消息加载
4. 创建 `src/middleware.ts` 语言检测和路由

### 阶段二：架构迁移
5. 所有页面从 `src/app/` 移到 `src/app/[locale]/`
6. 创建根 `layout.tsx`（最小化）和 `[locale]/layout.tsx`（含 html lang 属性）
7. 创建 `src/i18n/navigation.ts`，使用 `createNavigation` 生成支持 locale 的 Link 和 router

### 阶段三：文案提取
8. 从 7 个页面提取所有中文到 `en.json` 和 `zh.json`
9. 用 `useTranslations()` 替换硬编码字符串
10. 添加 LanguageSwitcher 组件到导航栏

### 阶段四：修 Bug
11. 修复 zh.json 解析错误（转义未转义的引号）
12. 修复 TypeScript 类型错误（API 返回值空值合并）
13. 修复子页面 404（替换 next/link 为 next-intl navigation）
14. 修复 LanguageSwitcher 路径错误（使用 router.replace + locale 选项）
15. 修复 middleware matcher（扩展覆盖所有非 api/_next/static 路径）
16. 设置 `localePrefix: 'as-needed'`（移除 `/en` 前缀）

### 阶段五：SEO
17. 添加 og:image（1200×630 PNG）用于社交分享
18. 每种语言设置 OG 和 Twitter metadata
19. 更新 sitemap.xml 添加双语 URL
20. 更新 robots.txt

## 结果

### 构建与测试
| 指标 | 改造前 | 改造后 |
|------|--------|--------|
| Build | ✅ 通过 | ✅ 通过 |
| Tests | 111/111 | 111/111 |
| TypeScript 错误 | 0 | 0 |
| 渲染页面 | 7 | 7 × 2 语言 |

### Bug 统计
| 阶段 | 发现 Bug | 修复 Bug |
|------|---------|---------|
| 阶段一：基础设施 | 0 | 0 |
| 阶段二：架构迁移 | 0 | 0 |
| 阶段三：文案提取 | 1（JSON 解析） | 1 |
| 阶段四：修 Bug | 4 | 4 |
| 阶段五：SEO | 0 | 0 |
| **合计** | **5** | **5** |

### 路由验证
| 路由 | 状态 | 语言 |
|------|------|------|
| `/` | 200 | en ✅ |
| `/zh` | 200 | zh ✅ |
| `/courses` | 200 | en ✅ |
| `/zh/courses` | 200 | zh ✅ |
| `/dashboard` | 200 | en ✅ |
| `/zh/dashboard` | 200 | zh ✅ |
| `/auth` | 200 | en ✅ |
| `/zh/auth` | 200 | zh ✅ |
| `/en` | 307 → `/` | 重定向 ✅ |

## 记忆

- `B @i18n-时机`：7 个页面后做 i18n = 5 个 bug。1 个页面后做 i18n = 0 个结构性 bug。早做 i18n 防止级联失败。
- `B @locale-prefix`：`localePrefix: 'as-needed'` 是国际标准。默认语言 = 干净 URL。用户不想看到 `/en`。
- `B @next-intl-navigation`：所有 Link 和 router 操作必须用 `createNavigation()`。`next/link` 不兼容 `[locale]` 路由。
- `B @json-验证`：永远不要信任 AI 生成的 JSON，提交前必须验证。
- `O(c=0.95) @尽早i18n`：i18n 应该在构建周期中尽早完成——理想情况是第一个用户可见页面之后。置信度高，因为数据清晰：7 个页面 5 个 bug，外推到 11 章以上意味着 8+ 个 bug。

## 结论

**假设成立。** next-intl 配合 `localePrefix: 'as-needed'` 提供了干净的 URL、浏览器自动检测和完整的双语支持。遇到的 5 个 bug 都在迁移窗口内可修复，且没有导致测试回归。

**核心洞察：** 在第五章（而不是第十章）做 i18n 的决定是正确的。早期做意味着只有 Landing page 需要文案提取。后续每个功能从一开始就是双语构建。
