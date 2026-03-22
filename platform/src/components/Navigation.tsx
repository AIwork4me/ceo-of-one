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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-dim/90 backdrop-blur-lg border-b border-outline-variant/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* M3 Title Large */}
          <Link href="/" className="text-[22px] font-medium text-on-surface">
            CEO of One
          </Link>

          {/* Desktop nav — M3 Body Small */}
          <div className="hidden sm:flex items-center gap-6">
            <Link href="/courses" className="text-on-surface font-medium text-[14px]">
              {t('courses')}
            </Link>
            <Link href="/profile" className="text-onsurface-variant hover:text-on-surface transition-colors text-[14px]">
              {t('myCourses')}
            </Link>
            <Link href="/dashboard" className="text-onsurface-variant hover:text-on-surface transition-colors text-[14px]">
              {t('dashboard')}
            </Link>
            <Link href="/graduation" className="text-onsurface-variant hover:text-on-surface transition-colors text-[14px]">
              {t('graduate')}
            </Link>
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-on-surface text-[14px]">{t('greeting', { name: user.name })}</span>
                <button onClick={handleLogout} className="text-onsurface-variant hover:text-on-surface text-[14px] cursor-pointer">
                  {t('logout')}
                </button>
              </div>
            ) : (
              <Link href="/auth" className="text-onsurface-variant hover:text-on-surface transition-colors text-[14px]">
                {t('login')}
              </Link>
            )}
            <LanguageSwitcher />
            <a href="https://github.com/AIwork4me/ceo-of-one" target="_blank" rel="noopener noreferrer" className="text-onsurface-variant hover:text-on-surface transition-colors text-[14px]">
              ⭐ GitHub
            </a>
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
            <Link href="/courses" className="text-on-surface text-[14px]" onClick={() => setMenuOpen(false)}>{t('courses')}</Link>
            <Link href="/profile" className="text-onsurface-variant text-[14px]" onClick={() => setMenuOpen(false)}>{t('myCourses')}</Link>
            <Link href="/dashboard" className="text-onsurface-variant text-[14px]" onClick={() => setMenuOpen(false)}>{t('dashboard')}</Link>
            <Link href="/graduation" className="text-onsurface-variant text-[14px]" onClick={() => setMenuOpen(false)}>{t('graduate')}</Link>
            {user ? (
              <>
                <span className="text-on-surface text-[14px]">{t('greeting', { name: user.name })}</span>
                <button onClick={handleLogout} className="text-onsurface-variant text-[14px] text-left cursor-pointer" >{t('logout')}</button>
              </>
            ) : (
              <Link href="/auth" className="text-onsurface-variant text-[14px]" onClick={() => setMenuOpen(false)}>{t('login')}</Link>
            )}
            <div className="pt-2">
              <LanguageSwitcher />
            </div>
            <a href="https://github.com/AIwork4me/ceo-of-one" target="_blank" rel="noopener noreferrer" className="text-onsurface-variant text-[14px]" onClick={() => setMenuOpen(false)}>
              ⭐ GitHub
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
