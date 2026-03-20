'use client'

import { useState, useEffect } from 'react'
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
    <div className="bg-dark-card rounded-2xl p-6 border border-white/5">
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <p className="text-3xl font-bold text-white">
        {value}
        {suffix && <span className="text-lg text-gray-400 ml-1">{suffix}</span>}
      </p>
    </div>
  )
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function StatusBadge({ status }: { status: string }) {
  const statusStyles: Record<string, string> = {
    completed: 'bg-green-500/20 text-green-400',
    pending: 'bg-yellow-500/20 text-yellow-400',
    failed: 'bg-red-500/20 text-red-400',
    refunded: 'bg-gray-500/20 text-gray-400',
  }

  const style = statusStyles[status] || 'bg-gray-500/20 text-gray-400'

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${style}`}>
      {status}
    </span>
  )
}



export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const response = await fetch('/api/dashboard')
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard stats')
        }
        const data = await response.json()
        setStats(data.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-dark-bg pt-20">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-400">Loading...</div>
          </div>
        </div>
      </main>
    )
  }

  if (error || !stats) {
    return (
      <main className="min-h-screen bg-dark-bg pt-20">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-red-400">{error || 'No data available'}</div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-dark-bg pt-20">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Users" value={stats.totalUsers} />
          <StatCard title="Total Courses" value={stats.totalCourses} />
          <StatCard title="Total Orders" value={stats.totalOrders} />
          <StatCard title="Total Revenue" value={stats.totalRevenue} suffix="CNY" />
        </div>

        {/* Recent Users */}
        <div className="bg-dark-card rounded-2xl border border-white/5 mb-8 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5">
            <h2 className="text-xl font-semibold text-white">Recent Users</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-bg/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Joined At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {stats.recentUsers.map((user) => (
                  <tr key={user.email} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{formatDate(user.createdAt)}</td>
                  </tr>
                ))}
                {stats.recentUsers.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-400">No users yet</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-dark-card rounded-2xl border border-white/5 overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5">
            <h2 className="text-xl font-semibold text-white">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-bg/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Course</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Created At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {stats.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">{order.courseName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.userName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{order.amount} CNY</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">{formatDate(order.createdAt)}</td>
                  </tr>
                ))}
                {stats.recentOrders.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-400">No orders yet</td>
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
