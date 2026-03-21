'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function NotFound() {
  const t = useTranslations('notFound')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark-bg to-[#1a1a2e]">
      <div className="text-center px-4">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl text-gray-300 mb-4">{t('title')}</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">{t('description')}</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/80 transition-colors"
        >
          {t('backHome')}
        </Link>
      </div>
    </div>
  )
}
