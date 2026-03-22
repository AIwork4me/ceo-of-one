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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-bold text-xl text-white">
            CEO of One
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-6">
            <Link href="/courses" className="text-white font-medium text-sm">
              {t('courses')}
            </Link>
            <Link href="/profile" className="text-gray-300 hover:text-white transition-colors text-sm">
              {t('myCourses')}
            </Link>
            <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors text-sm">
              {t('dashboard')}
            </Link>
            <Link href="/graduation" className="text-gray-300 hover:text-white transition-colors text-sm">
              {t('graduate')}
            </Link>
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-white text-sm">{t('greeting', { name: user.name })}</span>
                <button onClick={handleLogout} className="text-gray-400 hover:text-white text-sm cursor-pointer">
                  {t('logout')}
                </button>
              </div>
            ) : (
              <Link href="/auth" className="text-gray-300 hover:text-white transition-colors text-sm">
                {t('login')}
              </Link>
            )}
            <LanguageSwitcher />
            <a href="https://github.com/AIwork4me/ceo-of-one" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors text-sm">
              ⭐ GitHub
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden text-white text-xl cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="sm:hidden pb-4 flex flex-col gap-3">
            <Link href="/courses" className="text-white text-sm" onClick={() => setMenuOpen(false)}>{t('courses')}</Link>
            <Link href="/profile" className="text-gray-300 text-sm" onClick={() => setMenuOpen(false)}>{t('myCourses')}</Link>
            <Link href="/dashboard" className="text-gray-300 text-sm" onClick={() => setMenuOpen(false)}>{t('dashboard')}</Link>
            <Link href="/graduation" className="text-gray-300 text-sm" onClick={() => setMenuOpen(false)}>{t('graduate')}</Link>
            {user ? (
              <>
                <span className="text-white text-sm">{t('greeting', { name: user.name })}</span>
                <button onClick={handleLogout} className="text-gray-400 text-sm text-left cursor-pointer" >{t('logout')}</button>
              </>
            ) : (
              <Link href="/auth" className="text-gray-300 text-sm" onClick={() => setMenuOpen(false)}>{t('login')}</Link>
            )}
            <div className="pt-2">
              <LanguageSwitcher />
            </div>
            <a href="https://github.com/AIwork4me/ceo-of-one" target="_blank" rel="noopener noreferrer" className="text-gray-300 text-sm" onClick={() => setMenuOpen(false)}>
              ⭐ GitHub
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
