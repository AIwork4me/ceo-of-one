# 网站风格学习与应用流程

> **目标：** 输入对标网站链接 → 自动学习风格 → 应用到产品
> **创建时间：** 2026-03-23

---

## 流程概述

```
用户输入 URL
    ↓
1. 抓取网站内容
    ↓
2. 分析设计元素
   - 字体（font-family, font-size, line-height）
   - 色彩（主色、辅助色、背景色、文字色）
   - 间距（padding, margin, gap）
   - 圆角（border-radius）
   - 阴影（box-shadow）
   - 布局（grid, flex）
   - 动效（transition, animation）
    ↓
3. 生成设计 token
   - Tailwind 配置
   - CSS 变量
    ↓
4. 应用到产品
   - 更新配置文件
   - 更新组件样式
    ↓
5. 验证效果
   - 构建
   - 部署
   - 用户反馈
```

---

## 详细步骤

### Step 1: 抓取网站

**工具：** `web_fetch` + `exec(curl)`

**获取内容：**
```bash
# 获取 HTML
curl -s https://target-site.com > site.html

# 获取 CSS（内联 + 外链）
# 解析 <style> 和 <link rel="stylesheet">
```

**关键信息：**
- `<head>` 中的字体引入
- `<style>` 中的 CSS 规则
- 行内样式 `style="..."`

---

### Step 2: 分析设计元素

#### 2.1 字体

**查找：**
```css
font-family: "Inter", -apple-system, ...
font-size: 16px;
font-weight: 400;
line-height: 1.5;
letter-spacing: -0.01em;
```

**提取：**
- 主字体名称
- 字号范围（最小/最大）
- 字重使用（400/500/600/700）
- 行高规律
- 字距规律

#### 2.2 色彩

**查找：**
```css
/* CSS 变量 */
--color-primary: #6750A4;
--color-bg: #141218;

/* 直接使用 */
color: #E6E1E5;
background: #211F26;
```

**提取：**
- 主色（Primary）
- 背景色（Surface）
- 文字色（On-Surface）
- 边框色（Outline）
- 语义色（Success/Error/Warning）

#### 2.3 间距

**查找：**
```css
padding: 24px;
margin: 16px;
gap: 8px;
```

**提取规律：**
- 基准单位（4px? 8px?）
- 常用值（8/12/16/24/32/48）
- 响应式规律

#### 2.4 圆角

**查找：**
```css
border-radius: 8px;
border-radius: 50%;
```

**提取：**
- 按钮：8px?
- 卡片：12px?
- 大容器：16px?
- 圆形：50%

#### 2.5 阴影

**查找：**
```css
box-shadow: 0 1px 3px rgba(0,0,0,0.1);
```

**提取：**
- 卡片阴影
- 按钮阴影
- 悬浮阴影
- 发光效果

#### 2.6 布局

**查找：**
```css
/* Grid */
grid-template-columns: repeat(3, 1fr);
gap: 24px;

/* Flex */
display: flex;
justify-content: space-between;
```

**提取：**
- 网格列数
- 断点规则
- 对齐方式

#### 2.7 动效

**查找：**
```css
transition: all 0.2s ease;
animation: fadeIn 0.3s;
```

**提取：**
- 时长（100ms/200ms/300ms）
- 缓动函数（ease/linear/cubic-bezier）
- 触发条件（hover/active/load）

---

### Step 3: 生成设计 Token

#### 3.1 Tailwind 配置

```javascript
// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        // 从对标网站提取的色彩
        primary: { DEFAULT: '#6750A4', ... },
        surface: { DEFAULT: '#141218', ... },
        // ...
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans SC', ...],
      },
      spacing: {
        // 从对标网站提取的间距
      },
      borderRadius: {
        // 从对标网站提取的圆角
      },
      boxShadow: {
        // 从对标网站提取的阴影
      },
    },
  },
}
```

#### 3.2 CSS 变量

```css
:root {
  --font-sans: "Inter", sans-serif;
  --color-primary: #6750A4;
  --spacing-base: 8px;
  --radius-card: 12px;
}
```

---

### Step 4: 应用到产品

#### 4.1 更新配置

1. `tailwind.config.ts` → 设计 token
2. `globals.css` → 基础样式
3. `layout.tsx` → 字体引入

#### 4.2 更新组件

1. 统一使用新的 token
2. 删除硬编码的值
3. 确保一致性

---

### Step 5: 验证效果

1. `npm run build` → 确保构建成功
2. 本地预览 → 检查视觉效果
3. 部署上线 → 用户反馈

---

## 自动化程度

| 步骤 | 自动化 | 需要人工 |
|------|--------|---------|
| 抓取网站 | ✅ 自动 | - |
| 分析设计 | ⚠️ 半自动 | AI 提取，人工确认 |
| 生成 token | ✅ 自动 | - |
| 应用配置 | ✅ 自动 | - |
| 更新组件 | ⚠️ 半自动 | AI 修改，人工检查 |
| 验证效果 | ❌ 手动 | 必须用户反馈 |

---

## 对标网站示例分析

### 示例：Linear.app

**字体：**
- 英文：Inter
- 字号：13-48px
- 行高：1.5

**色彩：**
- 主色：#5E6AD2（紫色）
- 背景：#0A0A0A（深黑）
- 文字：#E5E5E5（浅灰）

**间距：**
- 基准：8px
- 常用：8/16/24/32/48/64

**圆角：**
- 按钮：6px
- 卡片：8px
- 大容器：12px

**阴影：**
- 卡片：0 2px 8px rgba(0,0,0,0.1)
- 悬浮：0 8px 24px rgba(0,0,0,0.2)

**动效：**
- 时长：150-300ms
- 缓动：cubic-bezier(0.4, 0, 0.2, 1)

---

## 使用方法

### 1. 作为 AI Agent 流程

```
用户：学习 https://linear.com，应用到 CEO of One

AI 执行：
1. web_fetch https://linear.com
2. 分析设计元素（字体/色彩/间距...）
3. 生成 tailwind.config.ts
4. 更新 globals.css
5. 修改组件样式
6. npm run build 验证
7. git commit & push
8. 等待用户反馈
```

### 2. 作为可复用 Skill

```bash
# 未来可以做成 OpenClaw skill
/openclaw skill install website-style-clone

# 使用
/style-clone --url https://linear.com --project ceo-of-one
```

---

## 注意事项

### 1. 不要照抄

- 提取**规律**，不是复制代码
- 理解**为什么**这样设计
- 适应自己的产品场景

### 2. 版权问题

- 设计系统（配色/间距/字体）不可版权
- 具体文案/图片/代码受版权保护
- **只学风格，不抄内容**

### 3. 适配调整

- 对标网站可能不适合你的场景
- 需要根据产品特性调整
- **快上快验，持续迭代**

---

## 待优化

- [ ] 自动抓取 CSS 外链文件
- [ ] 自动识别响应式断点
- [ ] 生成对比报告（对标网站 vs 当前网站）
- [ ] 批量应用样式到多个组件

---

*创建时间：2026-03-23*
