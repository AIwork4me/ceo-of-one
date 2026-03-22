# Google M3 Design System Redesign — CEO of One

## Objective
Refactor the CEO of One landing page to follow Google Material Design 3 (M3) principles while maintaining the dark, ambitious "one person is a company" brand identity. The goal: when users see the product, they think "this looks like a Google product" — clean, professional, trustworthy.

## Key Files
- `platform/tailwind.config.ts` — Design tokens (colors, spacing, typography)
- `platform/src/app/globals.css` — Global styles, CSS variables
- `platform/src/app/[locale]/page.tsx` — Main landing page (all sections)
- `platform/src/components/Navigation.tsx` — Top navigation
- `platform/src/app/[locale]/layout.tsx` — Layout, fonts
- `platform/src/i18n/dictionaries/en.json` — English translations
- `platform/src/i18n/dictionaries/zh.json` — Chinese translations

## Design System

### Color Palette (M3-inspired Dark Theme)
```
Background:        #0f0f0f (M3 surface-dim, not pure black)
Surface:           #1a1a1e (M3 surface)
Surface Container: #242429 (M3 surface-container)
Surface Elevated:  #2c2c31 (M3 surface-container-high)
Primary:           #d0bcff (M3 primary purple, softer than current #6366f1)
Primary Container: #4f378b (M3 primary-container, for solid CTAs)
On Primary:        #381e72 (text on primary)
On Surface:        #e6e0e9 (M3 on-surface, slightly warm white)
On Surface Var:    #cac4cf (M3 on-surface-variant, for secondary text)
Outline:           #938f99 (M3 outline, for borders)
Outline Var:       #49454f (M3 outline-variant, subtle borders)
Error:             #f2b8b5 (M3 error)
Success/Green:     #8bd3a8 (M3 tertiary-green)
Warning/Red:       #f2b8b5 (M3 error-red)
```

**Key changes from current:**
1. Background: `#0a0a0a` → `#0f0f0f` (slightly warmer, M3 standard)
2. Card: `#1a1a2e` → `#1a1a1e` (remove blue tint, more neutral)
3. Accent: `#6366f1` → `#d0bcff` (M3 primary, used for highlights/icons)
4. New: Primary Container `#4f378b` for CTA buttons (solid, not semi-transparent)
5. New: Surface Container `#242429` for elevated cards within sections
6. Text: pure `white` → `#e6e0e9` (warmer, less harsh)

### Typography Scale (M3-based)
```
Display:  36px/44px  font-bold    — Hero h1 only
H1:       28px/36px  font-semibold — Section titles (Hero, Solution, Pricing)
H2:       24px/32px  font-semibold — Section titles (smaller sections)
H3:       20px/28px  font-medium   — Card titles, narrative step text
Body:     16px/24px  font-normal   — Main text, descriptions
Body Sm:  14px/20px  font-normal   — Secondary text
Label:    12px/16px  font-medium   — Badges, tags, small labels
Caption:  11px/16px  font-normal   — Footer, disclaimers
```

**Key changes from current:**
1. Hero badge: `text-4xl` → `text-lg` (badge should be Label scale, not Display)
2. Hero h1: `text-4xl` → `text-[36px]` (Display scale)
3. Section titles: `text-4xl` → `text-[28px]` (H1 scale)
4. Body: `text-sm/text-base` → `text-[16px]` (consistent Body scale)
5. Introduce `text-[20px]` for H3 level (currently missing)

### Spacing & Radius (M3)
```
Radius XS:  4px   (tags, badges)
Radius SM:  8px   (small chips)
Radius MD:  12px  (buttons, inputs)
Radius LG:  16px  (cards)
Radius XL:  28px  (hero cards, pricing card)
Radius Full: 9999px (circles)
```

### Shadows (M3 Elevation)
```
Level 0: none (flat surface)
Level 1: 0 1px 3px rgba(0,0,0,0.3) (subtle card lift)
Level 2: 0 4px 8px rgba(0,0,0,0.3) (dropdown, dialog)
Level 3: 0 8px 24px rgba(0,0,0,0.4) (modal, floating)
```
Note: M3 dark mode prefers subtle shadows over heavy ones. Current `shadow-2xl shadow-accent/10` is too heavy.

## Section-by-Section Changes

### 1. Navigation
- Height: `h-16` → `h-20` (M3 top app bar is 64px)
- Background: `bg-dark-bg/80 backdrop-blur` → `bg-[#0f0f0f]/90 backdrop-blur-lg`
- Border: `border-white/10` → `border-[#49454f]/50` (M3 outline-variant)
- Active link color: `text-accent` → `text-[#d0bcff]` (M3 primary)
- Font size: `text-sm` → `text-[14px]` (M3 body-small)
- Logo: `text-xl` → `text-[22px] font-medium` (M3 title-large)

### 2. Hero Section
- Background gradient: `from-dark-bg to-[#1a1a2e]` → `from-[#0f0f0f] to-[#1a1a1e]`
- Radial glow: `from-accent/20` → `from-[#4f378b]/15` (primary-container, very subtle)
- Badge: `text-4xl text-accent` → `text-lg text-[#d0bcff] tracking-widest` (Label scale)
- H1: `text-4xl font-bold` → `text-[36px] md:text-[45px] font-semibold leading-[1.2]` (Display Medium)
- Subtitle: `text-lg text-gray-300` → `text-[16px] text-[#cac4cf]` (Body scale)
- Before/After cards: 
  - Border: `border-red-500/20` → `border-[#49454f]` (neutral outline)
  - Background: `bg-red-950/20` → `bg-[#242429]` (surface-container)
  - Label: `text-red-400` → `text-[#f2b8b5]` (M3 error), `text-green-400` → `text-[#8bd3a8]` (M3 success)
- Stats cards: `bg-white/5 border-white/10` → `bg-[#242429] border-[#49454f]/50`
- CTA button: `bg-accent rounded-xl shadow-lg` → `bg-[#4f378b] rounded-[12px] shadow-[0_1px_3px_rgba(0,0,0,0.3)] hover:bg-[#6750a4]`

### 3. Narrative Section
- Background: `bg-dark-bg` → `bg-[#0f0f0f]`
- H2: `text-3xl font-bold` → `text-[28px] font-semibold`
- Step circles: `bg-accent/20 text-accent` → `bg-[#4f378b]/20 text-[#d0bcff]`
- Text: `text-gray-300` → `text-[#e6e0e9]`

### 4. Solution Section (CEO → COO → Engineer)
- Background: `bg-dark-card` → `bg-[#1a1a1e]`
- Role cards: `bg-dark-bg border-white/5` → `bg-[#0f0f0f] border-[#49454f]/50 rounded-[16px]`
- Result pill: `border-accent/30` → `border-[#d0bcff]/30`

### 5. Course Outline
- Background: `bg-dark-bg` → `bg-[#0f0f0f]`
- H2: `text-3xl font-bold` → `text-[28px] font-semibold`
- Chapter cards: `bg-dark-card border-white/5 hover:border-accent/30` → `bg-[#1a1a1e] border-[#49454f]/50 hover:border-[#d0bcff]/30`
- Chapter number circles: `bg-accent/20 text-accent` → `bg-[#4f378b]/20 text-[#d0bcff]`

### 6. Social Proof
- Background: `bg-dark-card` → `bg-[#1a1a1e]`
- Testimonial cards: `bg-dark-bg border-white/5` → `bg-[#0f0f0f] border-[#49454f]/50`
- Avatar: `bg-accent/20 text-accent` → `bg-[#4f378b]/20 text-[#d0bcff]`

### 7. Pricing
- Background: `bg-dark-bg` → `bg-[#0f0f0f]`
- Pricing card: `bg-dark-card border-white/10 shadow-2xl` → `bg-[#1a1a1e] border-[#49454f]/50 shadow-[0_4px_8px_rgba(0,0,0,0.3)] rounded-[28px]`
- Price: `text-5xl` → `text-[36px] font-semibold` (Display scale, not bigger)
- Original price: `text-xl` → `text-[16px] text-[#49454f]` (M3 outline)
- CTA: same as Hero CTA style

### 8. FAQ
- Background: `bg-dark-card` → `bg-[#1a1a1e]`
- FAQ items: `bg-dark-bg border-white/5` → `bg-[#0f0f0f] border-[#49454f]/50`
- Arrow: `text-accent` → `text-[#d0bcff]`

### 9. Footer
- Background: `bg-dark-bg border-white/5` → `bg-[#0f0f0f] border-[#49454f]/30`
- Text: `text-gray-400` → `text-[#938f99]` (M3 outline)

## Tailwind Config Changes
Update `tailwind.config.ts` with new design tokens:
```typescript
colors: {
  surface: {
    dim: '#0f0f0f',
    base: '#1a1a1e',
    container: '#242429',
    elevated: '#2c2c31',
  },
  primary: {
    DEFAULT: '#d0bcff',
    container: '#4f378b',
    on: '#381e72',
  },
  outline: {
    DEFAULT: '#938f99',
    variant: '#49454f',
  },
  onsurface: {
    DEFAULT: '#e6e0e9',
    variant: '#cac4cf',
  },
  success: '#8bd3a8',
  danger: '#f2b8b5',
},
```

## Globals CSS Changes
Update CSS variables and add M3 elevation utilities.

## CRITICAL RULES
1. Run `cd platform && npx jest --ci --forceExit` after ALL changes — must pass 111 tests
2. Run `cd platform && npm run build` after tests pass
3. If build fails, fix and retry until both pass
4. Do NOT change any i18n translation values — only change styling/classes
5. Do NOT modify any component logic or state management
6. Do NOT add or remove any sections or elements
7. Do NOT change the Navigation.tsx structure or links
8. Only change CSS classes, Tailwind config, and globals.css
9. Preserve ALL existing responsive breakpoints (sm, md, lg)
10. Preserve ALL hover/focus/transition effects — update their colors to match new palette
