'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

const locales = ['en', 'zh'] as const
type Locale = (typeof locales)[number]

export default function LanguageSwitcher() {
  const t = useTranslations('languageSwitcher')
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const router = useRouter()

  const switchLocale = (newLocale: Locale) => {
    // Replace the current locale in the pathname
    const segments = pathname.split('/')
    segments[1] = newLocale
    const newPath = segments.join('/')
    router.push(newPath)
  }

  const otherLocale = locales.find((l) => l !== locale) as Locale

  return (
    <button
      onClick={() => switchLocale(otherLocale)}
      className="px-3 py-1.5 rounded-lg bg-dark-card border border-white/10 text-gray-300 hover:text-white hover:border-accent/50 transition-colors text-sm font-medium"
      aria-label={`Switch to ${otherLocale === 'en' ? 'English' : '中文'}`}
    >
      {t(otherLocale)}
    </button>
  )
}
