<p align="left">
<a href="README_zh-CN.md"><img src="https://img.shields.io/badge/README-简体中文-blue" alt="简体中文" /></a>
</p>

# Chapter 5: Going Global

The landing page was beautiful. The product was functional. Tests were green.

Then we showed it to an English speaker. They stared at the screen, saw a wall of Chinese characters, and closed the tab.

In that moment, a global product became a regional side project.

---

## 🎯 You'll Learn

- Why internationalization is not a "nice-to-have" — it's a survival requirement
- How to add full i18n support to a Next.js app using next-intl
- The five bugs we hit during i18n (and what each one taught us)
- Why the default language should never have a URL prefix

> **"If you build it, they will come" only works if they can read it.**

---

## 🔍 What the COO Did

### Step 1: Diagnosed the Problem

The COO ran a simple test: open the site as a stranger would. The diagnosis was brutal:

| Issue | Impact |
|-------|--------|
| Landing page 100% Chinese | English users leave immediately |
| No language switcher | No way to change language |
| Social proof = Chinese names | International audience can't relate |
| Price only in CNY (¥299) | No USD pricing |
| `<html lang="zh-CN">` hardcoded | Google treats it as Chinese-only site |

This wasn't a minor issue. This was a **showstopper for global reach**.

### Step 2: Designed the Architecture

The COO chose `next-intl` — the standard i18n library for Next.js App Router. The architecture decision:

```
Before:                          After:
src/app/page.tsx                src/app/[locale]/page.tsx
src/app/auth/page.tsx            src/app/[locale]/auth/page.tsx
                                 src/i18n/routing.ts        ← locale config
                                 src/i18n/dictionaries/     ← translations
                                   en.json
                                   zh.json
                                 src/middleware.ts           ← locale detection
                                 src/components/
                                   LanguageSwitcher.tsx     ← user-facing toggle
```

Key decisions:
- **Default locale: English, no prefix** (`/` = English, `/zh` = Chinese)
- **Browser auto-detection** via `Accept-Language` header
- **All text in dictionaries** — zero hardcoded strings in components

### Step 3: Extracted All Text

Every Chinese string across 7 pages was extracted into translation dictionaries:

```json
{
  "hero": {
    "title": "One Person, One Company",
    "subtitle": "In 2026, you don't need to learn code..."
  }
}
```

205 translation keys total. Each page, each button, each error message.

### Step 4: Localized Everything

- **Pricing:** $39 (English) / ¥299 (Chinese)
- **Testimonials:** International names (Sarah, James, Mei) for EN; Chinese names for ZH
- **SEO:** Separate OG titles, descriptions, and keywords per language
- **Sitemap:** Both `/` and `/zh` pages registered

---

## 🐛 The Five Bugs

This is the honest part. The i18n migration was not smooth. Here's every bug we hit:

### Bug 1: zh.json Parse Error
**Symptom:** `npm run build` failed with "Cannot parse JSON at position 1649"
**Cause:** Claude Code generated Chinese text with curly quotes (`"` `"`) that got converted to ASCII double quotes inside JSON strings
**Fix:** Wrote a Python script to escape all inner unescaped quotes
**Lesson:** Never trust AI-generated JSON without validation

### Bug 2: TypeScript Type Error
**Symptom:** `Type 'string | undefined' is not assignable to type 'string | number | Date'`
**Cause:** `data.courseName` from API could be `undefined`, passed directly to translation function
**Fix:** Added nullish coalescing (`data.courseName ?? ''`)
**Lesson:** API responses are never as clean as you expect

### Bug 3: All Sub-pages 404 After i18n
**Symptom:** `/courses`, `/dashboard`, `/auth` all returned 404
**Cause:** Used `next/link` and `next/navigation` instead of next-intl's `createNavigation`. Links had no locale prefix.
**Fix:** Created `src/i18n/navigation.ts` and replaced all imports
**Lesson:** When you move pages under `[locale]/`, every single link must go through the i18n router

### Bug 4: LanguageSwitcher → `/zh/en`
**Symptom:** Clicking "English" on `/zh/courses` navigated to `/zh/en/courses`
**Cause:** Manual pathname string manipulation (`segments[1] = newLocale`) doesn't work with `localePrefix: 'as-needed'`
**Fix:** Used `router.replace(pathname, { locale: otherLocale })` — next-intl's built-in locale switching
**Lesson:** Don't fight the framework. Use the API it provides.

### Bug 5: Default Locale Had a Prefix
**Symptom:** Default English pages were at `/en/dashboard` instead of `/dashboard`
**Cause:** Default `localePrefix` mode adds prefix to all locales
**Fix:** Set `localePrefix: 'as-needed'` in routing config
**Lesson:** The international standard is: default language = clean URL. Don't make English users look at `/en`.

---

## ✅ The Result

After fixing all 5 bugs:

| Route | Language | Status |
|-------|----------|--------|
| `/` | English (auto-detected) | ✅ |
| `/zh` | 中文 (auto-detected) | ✅ |
| `/courses` | English | ✅ |
| `/zh/courses` | 中文 | ✅ |
| `/dashboard` | English | ✅ |
| `/zh/dashboard` | 中文 | ✅ |

Browser language detection works. Language switcher works. All translations render correctly. SEO metadata follows locale. Build clean. 111/111 tests pass.

---

## 💡 Why This Matters

**Internationalization is not Chapter 10. It's Chapter 5.**

The old plan was: build everything in Chinese, then i18n at the end. That would have meant:
- Re-extracting text from 11 chapters of code
- Fixing references across hundreds of files
- Potentially breaking features that were "working fine"

By doing i18n right after the landing page:
- Only 1 page needed text extraction (not 7+)
- Every subsequent feature was built bilingual from the start
- The architecture was clean from day one

**This is the COO's job:** see the landmine before you step on it. Not react to it after.

---

## 🎓 Chapter Takeaway

> **Build for the world from the start, not for your desk.** The cost of adding i18n early is a few hours. The cost of adding it late is weeks of refactoring and broken links. The COO's strategic value isn't in executing tasks — it's in seeing what the CEO doesn't see yet.

Five bugs in one migration. Each one was a small, fixable issue. But if we'd shipped without catching them, each one would have been a negative first impression for a real user. Quality isn't about zero bugs — it's about catching them before your users do.

---

📖 **Hands-on:** See the full experiment breakdown in [`experiment.md`](experiment.md)
⬅️ **Previous:** [Chapter 4: Build the Real Landing Page](../04-landing-page/README.md) | ➡️ **Next:** [Chapter 6: Let Users In](../06-auth/README.md)
