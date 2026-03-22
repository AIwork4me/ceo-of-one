# M3 Design System 实施状态

## 已完成 ✅

### 配色系统
- [x] M3 暗色主题配色
  - Surface: `#0f0f0f` / `#1C1B1F` / `#211F26` / `#2B2930` / `#36343B`
  - Primary: `#d0bcff` / `#4F378B`
  - OnSurface: `#E6E1E5` / `#CAC4D0`
  - Outline: `#938F99` / `#49454F`
  - Success/Danger/Warning: `#8BD3A8` / `#F2B8B5` / `#F9CB9C`

### 字号体系
- [x] Display Medium: 36-45px (Hero h1)
- [x] Headline Large: 28-32px (Section titles)
- [x] Title Large: 22px (Card titles)
- [x] Body Large: 16px (Main text)
- [x] Body Small: 14px (Secondary text)
- [x] Label: 12px (Badges, tags)

### 阴影 & 圆角
- [x] M3 Elevation: `m3-1` / `m3-2` / `m3-3`
- [x] M3 Radius: `m3-sm` (8px) / `m3-md` (12px) / `m3-lg` (16px) / `m3-xl` (28px)

### 页面应用
- [x] Landing page (9 个 section)
- [x] Navigation
- [x] LanguageSwitcher
- [x] BackToTop

---

## 待完成 ⏸️

### 亮暗主题切换
- [ ] 主题切换按钮（☀️/🌙）
- [ ] ThemeProvider（使用 `next-themes` 库，避免 SSR hydration 问题）
- [ ] 自动检测系统偏好 (`prefers-color-scheme`)
- [ ] localStorage 持久化

**为什么暂停：**
Tailwind + CSS 变量 + SSR hydration 在 React 18 下有边界情况，尝试 5 种方案后决定先保持稳定的暗色模式。

**解决方案（待明天实施）：**
使用成熟的 `next-themes` 库，它已经处理好了所有 SSR 边界情况。

### 其他页面适配
- [ ] /auth
- [ ] /courses
- [ ] /dashboard
- [ ] /profile
- [ ] /graduation

---

## 相关文件

| 文件 | 用途 |
|------|------|
| `platform/tailwind.config.ts` | M3 颜色/阴影/圆角 token |
| `platform/src/app/globals.css` | 全局样式、body 背景 |
| `platform/src/app/[locale]/page.tsx` | Landing page 9 个 section |
| `platform/src/components/Navigation.tsx` | 导航栏 |
| `MEMORY.md` | 实践教训 |

---

## Commits

| Hash | 描述 |
|------|------|
| `36611e7` | M3 design system — color palette, typography, spacing, elevation |
| `04088ad` | Full dark/light theme — landing page + nav toggle (later reverted) |
| `83d55fa` | Remove ThemeProvider to resolve client-side exception |
| `f2dea14` | Remove CSS variables, use direct hex colors |

---

*创建：2026-03-22*
