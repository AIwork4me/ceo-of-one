# 亮暗切换方案 — next-themes

## 核心方案

使用 `next-themes` 库（成熟、经过验证、SSR 友好）。

**关键点：**
1. `suppressHydrationWarning` 在 `<html>` 上
2. `attribute="class"` 配合 Tailwind dark mode
3. `mounted` 检查避免 hydration mismatch
4. CSS 变量定义两套（`:root` 亮色，`.dark` 暗色）

---

## 实施步骤

### Step 1: 安装依赖
```bash
cd platform
npm install next-themes
```

### Step 2: 创建 ThemeProvider wrapper
创建 `platform/src/components/ThemeProvider.tsx`

```tsx
'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

### Step 3: 更新 layout.tsx
关键改动：
- `<html suppressHydrationWarning>`
- 用 `<ThemeProvider attribute="class" defaultTheme="system">` 包裹 children

### Step 4: 更新 globals.css
添加亮色模式的 CSS 变量：
```css
:root {
  /* Light mode */
  --surface-dim: #DED8E1;
  --surface: #FFFBFE;
  --surface-container: #F3EDF7;
  /* ... */
}

.dark {
  /* Dark mode */
  --surface-dim: #0f0f0f;
  --surface: #1C1B1F;
  --surface-container: #211F26;
  /* ... */
}
```

### Step 5: 更新 tailwind.config.ts
颜色改为 CSS 变量：
```ts
colors: {
  surface: {
    dim: 'var(--surface-dim)',
    DEFAULT: 'var(--surface)',
    container: 'var(--surface-container)',
  },
  // ...
}
```

### Step 6: 更新 page.tsx
所有颜色类保持不变（`bg-surface-dim`），不需要 `dark:` 前缀（CSS 变量自动处理）

### Step 7: 创建 ThemeToggle 组件
创建 `platform/src/components/ThemeToggle.tsx`

```tsx
'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return null // 避免 hydration mismatch

  return (
    <button
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className="text-onsurface-variant hover:text-onsurface transition-colors text-[14px] cursor-pointer"
      aria-label="Toggle theme"
    >
      {resolvedTheme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
```

### Step 8: 添加 ThemeToggle 到 Navigation
在桌面导航和移动菜单中添加 ThemeToggle 组件

### Step 9: 测试验证
- `npm run build` 必须成功
- 111 tests 必须通过
- 本地 `npm run dev` 测试切换
- 检查 SSR/SSG 无 flash

---

## 关键注意事项

1. **suppressHydrationWarning** — 必须在 `<html>` 上，否则 hydration 报错
2. **mounted 检查** — ThemeToggle 必须等 mounted 后才渲染，否则 SSR/CSR 不一致
3. **CSS 变量** — 两套定义（:root + .dark），Tailwind 引用变量
4. **attribute="class"** — 配合 Tailwind darkMode: 'class'
5. **defaultTheme="system"** — 自动检测系统偏好

---

## 预期结果

- 默认跟随系统偏好 (prefers-color-scheme)
- 点击按钮可切换亮/暗
- 选择保存在 localStorage
- 跨 tab 同步
- 无 flash、无 hydration 错误

---

## 文件清单

| 文件 | 操作 |
|------|------|
| `platform/package.json` | + next-themes |
| `platform/src/components/ThemeProvider.tsx` | 新建 |
| `platform/src/components/ThemeToggle.tsx` | 新建 |
| `platform/src/app/[locale]/layout.tsx` | 修改 |
| `platform/src/app/globals.css` | 修改（加 :root 亮色变量）|
| `platform/tailwind.config.ts` | 修改（颜色改 CSS 变量）|
| `platform/src/components/Navigation.tsx` | 修改（加 ThemeToggle）|
| `platform/src/app/[locale]/page.tsx` | 不需要改 |

---

*准备就绪，等待执行*
