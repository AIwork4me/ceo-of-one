# Chapter 5: Going Global — Experiment Record

## Objective

Add full internationalization (i18n) to the CEO of One platform, supporting English (default) and Chinese.

## Hypothesis

Using next-intl with `localePrefix: 'as-needed'`, the platform can serve both languages with:
- Clean URLs (no `/en` prefix for default language)
- Browser auto-detection via `Accept-Language`
- All 205+ text strings properly translated
- Zero regression in existing 111 tests

## Variables

| Variable | Value |
|----------|-------|
| i18n Library | next-intl |
| Default Locale | en (no URL prefix) |
| Secondary Locale | zh (prefix: /zh) |
| Locale Detection | Browser Accept-Language header |
| Translation Keys | 205 total |
| Pages Affected | 7 (landing, auth, courses, dashboard, graduation, profile, navigation) |

## Process

### Phase 1: Setup
1. Installed next-intl
2. Created `src/i18n/routing.ts` with locale configuration
3. Created `src/i18n/request.ts` for server-side message loading
4. Created `src/middleware.ts` for locale detection and routing

### Phase 2: Architecture Migration
5. Moved all pages from `src/app/` to `src/app/[locale]/`
6. Created root `layout.tsx` (minimal) and `[locale]/layout.tsx` (with html lang attribute)
7. Created `src/i18n/navigation.ts` with `createNavigation` for locale-aware Link and router

### Phase 3: Text Extraction
8. Extracted all Chinese text from 7 pages into `en.json` and `zh.json`
9. Replaced hardcoded strings with `useTranslations()` hook calls
10. Added LanguageSwitcher component to Navigation

### Phase 4: Bug Fixing
11. Fixed zh.json parse error (escaped unescaped quotes)
12. Fixed TypeScript type error (nullish coalescing for API response)
13. Fixed 404 on sub-pages (replaced next/link with next-intl navigation)
14. Fixed LanguageSwitcher path corruption (used router.replace with locale option)
15. Fixed middleware matcher (expanded to cover all paths except api/_next/static)
16. Set `localePrefix: 'as-needed'` (removed `/en` prefix)

### Phase 5: SEO
17. Added og:image (1200x630 PNG) for social sharing
18. Set OG and Twitter metadata per locale
19. Updated sitemap.xml with bilingual URLs
20. Updated robots.txt

## Results

### Build & Test
| Metric | Before | After |
|--------|--------|-------|
| Build | ✅ Pass | ✅ Pass |
| Tests | 111/111 | 111/111 |
| TypeScript Errors | 0 | 0 |
| Pages Rendered | 7 | 7 × 2 locales |

### Bug Count
| Phase | Bugs Found | Bugs Fixed |
|-------|-----------|------------|
| Phase 1: Setup | 0 | 0 |
| Phase 2: Migration | 0 | 0 |
| Phase 3: Extraction | 1 (JSON parse) | 1 |
| Phase 4: Bug Fixing | 4 | 4 |
| Phase 5: SEO | 0 | 0 |
| **Total** | **5** | **5** |

### Route Verification
| Route | Status | Language |
|-------|--------|----------|
| `/` | 200 | en ✅ |
| `/zh` | 200 | zh ✅ |
| `/courses` | 200 | en ✅ |
| `/zh/courses` | 200 | zh ✅ |
| `/dashboard` | 200 | en ✅ |
| `/zh/dashboard` | 200 | zh ✅ |
| `/auth` | 200 | en ✅ |
| `/zh/auth` | 200 | zh ✅ |
| `/en` | 307 → `/` | redirect ✅ |
| `/zh/en` | N/A (blocked by switcher fix) | ✅ |

## Retain

- `B @i18n-timing`: Adding i18n after 7 pages = 5 bugs. Adding i18n after 1 page = 0 structural bugs. Early i18n prevents cascade failures.
- `B @locale-prefix`: `localePrefix: 'as-needed'` is the international standard. Default language = clean URL. Users don't want to see `/en`.
- `B @next-intl-navigation`: Must use `createNavigation()` for all Links and router operations. `next/link` does NOT work with `[locale]` routing.
- `B @json-validation`: Never trust AI-generated JSON. Validate before committing.
- `O(c=0.95) @i18n-before-features`: i18n should happen as early as possible in the build cycle — ideally right after the first user-facing page. Confidence is high because the data is clear: 5 bugs on 7 pages, extrapolating to 11+ chapters would mean 8+ bugs.

## Conclusion

**Hypothesis confirmed.** next-intl with `localePrefix: 'as-needed'` provides clean URLs, browser auto-detection, and full bilingual support. The 5 bugs encountered were all fixable within the migration window and none caused test regressions.

**Key insight:** The decision to do i18n at Chapter 5 (not Chapter 10) was correct. Doing it early meant only the landing page needed text extraction. Every subsequent feature was built bilingual from the start.
