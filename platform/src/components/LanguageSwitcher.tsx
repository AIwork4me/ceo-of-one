'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'

export default function LanguageSwitcher() {
  const t = useTranslations('languageSwitcher')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const otherLocale = locale === 'en' ? 'zh' : 'en'

  const switchLocale = () => {
    // 使用 next-intl 的 router.push 方法
    router.push(pathname, { locale: otherLocale })
  }

  return (
    <button
      onClick={switchLocale}
      className="px-3 py-1.5 rounded-lg bg-surface-container border border-outline-variant text-on-surface-variant hover:text-on-surface hover:border-primary/50 transition-all duration-200 text-sm font-medium cursor-pointer hover:scale-105"
      aria-label={`Switch to ${otherLocale === 'en' ? 'English' : '中文'}`}
      type="button"
    >
      {t(otherLocale)}
    </button>
  )
}
