'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Navigation from '@/components/Navigation'
import { useRouter } from 'next/navigation'

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-3 text-center font-medium transition-colors ${
        active
          ? 'text-white border-b-2 border-accent'
          : 'text-gray-400 hover:text-white border-b-2 border-transparent'
      }`}
    >
      {children}
    </button>
  )
}

function InputField({
  label,
  type,
  value,
  onChange,
  placeholder,
  error,
}: {
  label: string
  type: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  error?: string
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-lg bg-dark-bg border ${
          error ? 'border-red-500' : 'border-white/10'
        } text-white placeholder-gray-500 focus:outline-none focus:border-accent transition-colors`}
      />
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  )
}

export default function AuthPage() {
  const router = useRouter()
  const t = useTranslations('auth')

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login')

  const [loginForm, setLoginForm] = useState({ email: '', password: '' })
  const [loginError, setLoginError] = useState<string | null>(null)
  const [loginLoading, setLoginLoading] = useState(false)

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [registerError, setRegisterError] = useState<string | null>(null)
  const [registerSuccess, setRegisterSuccess] = useState(false)
  const [registerLoading, setRegisterLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginError(null)
    setLoginLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginForm.email, password: loginForm.password }),
      })

      const data = await response.json()

      if (data.success) {
        router.push('/courses')
      } else {
        setLoginError(data.message || t('loginFailed'))
      }
    } catch {
      setLoginError(t('networkError'))
    } finally {
      setLoginLoading(false)
    }
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setRegisterError(null)

    if (registerForm.password !== registerForm.confirmPassword) {
      setRegisterError(t('passwordMismatch'))
      return
    }

    if (registerForm.password.length < 6) {
      setRegisterError(t('passwordTooShort'))
      return
    }

    setRegisterLoading(true)

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: registerForm.name,
          email: registerForm.email,
          password: registerForm.password,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setRegisterSuccess(true)
        setRegisterForm({ name: '', email: '', password: '', confirmPassword: '' })
        setTimeout(() => {
          setActiveTab('login')
          setRegisterSuccess(false)
        }, 2000)
      } else {
        setRegisterError(data.message || t('registerFailed'))
      }
    } catch {
      setRegisterError(t('networkError'))
    } finally {
      setRegisterLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-dark-bg">
      <Navigation />

      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-dark-card rounded-2xl border border-white/10 overflow-hidden">
            <div className="flex border-b border-white/10">
              <TabButton active={activeTab === 'login'} onClick={() => setActiveTab('login')}>
                {t('loginTab')}
              </TabButton>
              <TabButton active={activeTab === 'register'} onClick={() => setActiveTab('register')}>
                {t('registerTab')}
              </TabButton>
            </div>

            <div className="p-6">
              {registerSuccess && (
                <div className="mb-4 p-4 bg-green-500/20 text-green-400 rounded-lg text-center">
                  {t('registerSuccess')}
                </div>
              )}

              {activeTab === 'login' ? (
                <form onSubmit={handleLogin} className="space-y-4">
                  <InputField
                    label={t('email')}
                    type="email"
                    value={loginForm.email}
                    onChange={(v) => setLoginForm({ ...loginForm, email: v })}
                    placeholder={t('emailPlaceholder')}
                  />
                  <InputField
                    label={t('password')}
                    type="password"
                    value={loginForm.password}
                    onChange={(v) => setLoginForm({ ...loginForm, password: v })}
                    placeholder={t('passwordPlaceholder')}
                  />

                  {loginError && (
                    <div className="p-3 bg-red-500/20 text-red-400 rounded-lg text-sm">
                      {loginError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loginLoading}
                    className="w-full py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loginLoading ? t('loggingIn') : t('loginButton')}
                  </button>

                  <p className="text-center text-gray-400 text-sm">
                    {t('noAccount')}
                    <button
                      type="button"
                      onClick={() => setActiveTab('register')}
                      className="text-accent hover:underline ml-1"
                    >
                      {t('registerNow')}
                    </button>
                  </p>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <InputField
                    label={t('name')}
                    type="text"
                    value={registerForm.name}
                    onChange={(v) => setRegisterForm({ ...registerForm, name: v })}
                    placeholder={t('namePlaceholder')}
                  />
                  <InputField
                    label={t('email')}
                    type="email"
                    value={registerForm.email}
                    onChange={(v) => setRegisterForm({ ...registerForm, email: v })}
                    placeholder={t('emailPlaceholder')}
                  />
                  <InputField
                    label={t('password')}
                    type="password"
                    value={registerForm.password}
                    onChange={(v) => setRegisterForm({ ...registerForm, password: v })}
                    placeholder={t('passwordMinPlaceholder')}
                  />
                  <InputField
                    label={t('confirmPassword')}
                    type="password"
                    value={registerForm.confirmPassword}
                    onChange={(v) => setRegisterForm({ ...registerForm, confirmPassword: v })}
                    placeholder={t('confirmPasswordPlaceholder')}
                  />

                  {registerError && (
                    <div className="p-3 bg-red-500/20 text-red-400 rounded-lg text-sm">
                      {registerError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={registerLoading}
                    className="w-full py-3 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {registerLoading ? t('registering') : t('registerButton')}
                  </button>

                  <p className="text-center text-gray-400 text-sm">
                    {t('hasAccount')}
                    <button
                      type="button"
                      onClick={() => setActiveTab('login')}
                      className="text-accent hover:underline ml-1"
                    >
                      {t('loginNow')}
                    </button>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
