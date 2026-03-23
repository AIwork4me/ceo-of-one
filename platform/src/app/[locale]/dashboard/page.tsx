'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Navigation from '@/components/Navigation'

interface DashboardStats {
  totalUsers: number
  totalCourses: number
  totalOrders: number
  completedOrders: number
  totalRevenue: number
  recentUsers: Array<{
    name: string
    email: string
    createdAt: string
  }>
  recentOrders: Array<{
    id: string
    courseName: string
    userName: string
    amount: number
    status: string
    createdAt: string
  }>
}

function StatCard({ title, value, suffix }: { title: string; value: number | string; suffix?: string }) {
  return (
    <div className="bg-surface-container rounded-2xl p-6 border border-outline-variant hover:border-primary/30 transition-all duration-200 hover:shadow-m3-card">
      <p className="text-on-surface-variant text-responsive-small mb-2">{title}</p>
      <p className="text-3xl font-bold text-on-surface">
        {value}
        {suffix && <span className="text-lg text-on-surface-variant ml-1">{suffix}</span>}
      </p>
    </div>
  )
}

function formatDate(dateString: string, locale: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function StatusBadge({ status, label }: { status: string; label: string }) {
  const statusStyles: Record<string, string> = {
    completed: 'bg-success/15 text-success',
    pending: 'bg-warning/15 text-warning',
    failed: 'bg-danger/15 text-danger',
    refunded: 'bg-on-surface-variant/15 text-on-surface-variant',
  }

  const style = statusStyles[status] || 'bg-on-surface-variant/15 text-on-surface-variant'

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${style}`}>
      {label}
    </span>
  )
}



export default function DashboardPage() {
  const t = useTranslations('dashboard')
  const locale = useLocale()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/dashboard')
        if (!response.ok) {
          throw new Error(t('fetchError'))
        }
        const data = await response.json()
        setStats(data.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : t('genericError'))
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-surface pt-20">
        <Navigation />
        <div className="max-w-7xl mx-auto px-[clamp(1rem,3vw,2rem)] py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-on-surface-variant">{t('loading')}</div>
          </div>
        </div>
      </main>
    )
  }

  if (error || !stats) {
    return (
      <main className="min-h-screen bg-surface pt-20">
        <Navigation />
        <div className="max-w-7xl mx-auto px-[clamp(1rem,3vw,2rem)] py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-danger">{error || t('error')}</div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-surface pt-20">
      <Navigation />
      <div className="max-w-7xl mx-auto px-[clamp(1rem,3vw,2rem)] py-8">
        <h1 className="text-responsive-section font-bold text-on-surface mb-8">{t('title')}</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[clamp(1rem,2vw,1.5rem)] mb-8">
          <StatCard title={t('totalUsers')} value={stats.totalUsers} />
          <StatCard title={t('totalCourses')} value={stats.totalCourses} />
          <StatCard title={t('totalOrders')} value={stats.totalOrders} />
          <StatCard title={t('totalRevenue')} value={stats.totalRevenue} suffix={t('currency')} />
        </div>

        {/* Recent Users */}
        <div className="bg-surface-container rounded-2xl border border-outline-variant mb-8 overflow-hidden">
          <div className="px-6 py-4 border-b border-outline-variant">
            <h2 className="text-xl font-semibold text-on-surface">{t('recentUsers')}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-container-high">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-on-surface-variant uppercase tracking-wider">{t('tableHeaders.name')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-on-surface-variant uppercase tracking-wider">{t('tableHeaders.email')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-on-surface-variant uppercase tracking-wider">{t('tableHeaders.joinedAt')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {stats.recentUsers.map((user) => (
                  <tr key={user.email} className="hover:bg-surface-container-high transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-on-surface">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-on-surface-variant">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-on-surface-variant">{formatDate(user.createdAt, locale)}</td>
                  </tr>
                ))}
                {stats.recentUsers.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-on-surface-variant">{t('noUsers')}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-surface-container rounded-2xl border border-outline-variant overflow-hidden">
          <div className="px-6 py-4 border-b border-outline-variant">
            <h2 className="text-xl font-semibold text-on-surface">{t('recentOrders')}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-container-high">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-on-surface-variant uppercase tracking-wider">{t('tableHeaders.course')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-on-surface-variant uppercase tracking-wider">{t('tableHeaders.user')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-on-surface-variant uppercase tracking-wider">{t('tableHeaders.amount')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-on-surface-variant uppercase tracking-wider">{t('tableHeaders.status')}</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-on-surface-variant uppercase tracking-wider">{t('tableHeaders.createdAt')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {stats.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-surface-container-high transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-on-surface">{order.courseName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-on-surface-variant">{order.userName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-on-surface-variant">{order.amount} {t('currency')}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={order.status} label={t(`statuses.${order.status}`)} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-on-surface-variant">{formatDate(order.createdAt, locale)}</td>
                  </tr>
                ))}
                {stats.recentOrders.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant">{t('noOrders')}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
