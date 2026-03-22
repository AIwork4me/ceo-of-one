'use client'

import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'

export default function LanguageSwitcher() {
  const t = useTranslations('languageSwitcher')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const otherLocale = locale === 'en' ? 'zh' : 'en'

  const switchLocale = () => {
    // 使用 push 而不是 replace，确保导航发生
    router.push(pathname, { locale: otherLocale })
  }

  return (
    <button
      onClick={switchLocale}
      className="px-3 py-1.5 rounded-m3-sm bg-surface-container border border-outline-variant text-onsurface-variant hover:text-onsurface hover:border-primary/50 transition-colors text-[14px] font-medium cursor-pointer"
      aria-label={`Switch to ${otherLocale === 'en' ? 'English' : '中文'}`}
    >
      {t(otherLocale)}
    </button>
  )
}
