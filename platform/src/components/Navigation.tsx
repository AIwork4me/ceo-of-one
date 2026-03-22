'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link, useRouter } from '@/i18n/navigation'
import LanguageSwitcher from './LanguageSwitcher'

interface User {
  id: string
  email: string
  name: string
}

export default function Navigation() {
  const t = useTranslations('nav')
  const [user, setUser] = useState<User | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => {
        if (res.ok) return res.json()
        throw new Error('not logged in')
      })
      .then(data => {
        if (data.success) setUser(data.data)
      })
      .catch(() => setUser(null))
  }, [])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
    router.push('/courses')
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl text-on-surface">
            CEO of One
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-6">
            <Link href="/courses" className="text-on-surface font-medium text-sm">
              {t('courses')}
            </Link>
            <Link href="/profile" className="text-on-surface-variant hover:text-on-surface transition-colors text-sm">
              {t('myCourses')}
            </Link>
            <Link href="/dashboard" className="text-on-surface-variant hover:text-on-surface transition-colors text-sm">
              {t('dashboard')}
            </Link>
            <Link href="/graduation" className="text-on-surface-variant hover:text-on-surface transition-colors text-sm">
              {t('graduate')}
            </Link>
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-on-surface text-sm">{t('greeting', { name: user.name })}</span>
                <button onClick={handleLogout} className="text-on-surface-variant hover:text-on-surface text-sm cursor-pointer">
                  {t('logout')}
                </button>
              </div>
            ) : (
              <Link href="/auth" className="text-on-surface-variant hover:text-on-surface transition-colors text-sm">
                {t('login')}
              </Link>
            )}
            <a
              href="https://github.com/AIwork4me/ceo-of-one"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-on-surface transition-colors text-sm"
            >
              ⭐ GitHub
            </a>
            <LanguageSwitcher />
          </div>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden text-on-surface text-xl cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="sm:hidden pb-4 flex flex-col gap-3">
            <Link href="/courses" className="text-on-surface text-sm" onClick={() => setMenuOpen(false)}>{t('courses')}</Link>
            <Link href="/profile" className="text-on-surface-variant text-sm" onClick={() => setMenuOpen(false)}>{t('myCourses')}</Link>
            <Link href="/dashboard" className="text-on-surface-variant text-sm" onClick={() => setMenuOpen(false)}>{t('dashboard')}</Link>
            <Link href="/graduation" className="text-on-surface-variant text-sm" onClick={() => setMenuOpen(false)}>{t('graduate')}</Link>
            {user ? (
              <>
                <span className="text-on-surface text-sm">{t('greeting', { name: user.name })}</span>
                <button onClick={handleLogout} className="text-on-surface-variant text-sm text-left cursor-pointer" >{t('logout')}</button>
              </>
            ) : (
              <Link href="/auth" className="text-on-surface-variant text-sm" onClick={() => setMenuOpen(false)}>{t('login')}</Link>
            )}
            <a
              href="https://github.com/AIwork4me/ceo-of-one"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-on-surface text-sm"
              onClick={() => setMenuOpen(false)}
            >
              ⭐ GitHub
            </a>
            <div className="pt-2">
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
