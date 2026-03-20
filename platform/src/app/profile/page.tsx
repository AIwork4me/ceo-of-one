'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Link from 'next/link'

interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

interface EnrolledCourse {
  courseId: string
  courseDetails: {
    id: string
    title: string
    description: string
    instructor: string
    price: number
    category: string
  }
}

function EnrolledCourseCard({ course }: { course: EnrolledCourse }) {
  const categoryLabels: Record<string, string> = {
    programming: '编程',
    design: '设计',
    business: '商业',
    marketing: '营销',
  }

  return (
    <div className="bg-dark-bg rounded-xl p-5 border border-white/5 hover:border-accent/30 transition-colors">
      <div className="flex items-start justify-between mb-2">
        <span className="px-2 py-1 rounded text-xs font-medium bg-accent/20 text-accent">
          {categoryLabels[course.courseDetails.category] || course.courseDetails.category}
        </span>
        <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-400">已报名</span>
      </div>
      <h3 className="text-white font-medium mb-1">{course.courseDetails.title}</h3>
      <p className="text-gray-500 text-sm">{course.courseDetails.instructor}</p>
    </div>
  )
}

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null)
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([])
  const [loading, setLoading] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    async function fetchProfile() {
      try {
        const userResponse = await fetch('/api/auth/me')
        if (!userResponse.ok) {
          setIsLoggedIn(false)
          setLoading(false)
          return
        }

        const userData = await userResponse.json()
        if (userData.success) {
          setIsLoggedIn(true)
          setUser(userData.data)

          const enrollmentResponse = await fetch('/api/payments/enrollment')
          const enrollmentData = await enrollmentResponse.json()
          if (enrollmentData.success) {
            setEnrolledCourses(enrollmentData.data.enrolledCourses)
          }
        }
      } catch {
        setIsLoggedIn(false)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) {
    return (
      <main className="min-h-screen bg-dark-bg">
        <Navigation />
        <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-accent border-t-transparent" />
            <p className="text-gray-400 mt-4">加载中...</p>
          </div>
        </section>
      </main>
    )
  }

  if (!isLoggedIn) {
    return (
      <main className="min-h-screen bg-dark-bg">
        <Navigation />
        <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center py-12">
            <div className="text-6xl mb-6">🔐</div>
            <h1 className="text-2xl font-bold text-white mb-4">请先登录</h1>
            <p className="text-gray-400 mb-8">登录后查看您的课程</p>
            <Link
              href="/auth"
              className="inline-block bg-accent hover:bg-accent-hover text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              前往登录
            </Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-dark-bg">
      <Navigation />

      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-dark-card rounded-2xl border border-white/10 p-6 mb-8">
            <h1 className="text-2xl font-bold text-white mb-4">👤 我的资料</h1>
            <div className="space-y-2">
              <p className="text-gray-300">
                <span className="text-gray-500">姓名：</span>
                {user?.name}
              </p>
              <p className="text-gray-300">
                <span className="text-gray-500">邮箱：</span>
                {user?.email}
              </p>
            </div>
          </div>

          <div className="bg-dark-card rounded-2xl border border-white/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">📚 已报名课程</h2>
              <Link
                href="/courses"
                className="bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                购买更多课程
              </Link>
            </div>

            {enrolledCourses.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400 mb-4">您还没有报名任何课程</p>
                <Link
                  href="/courses"
                  className="text-accent hover:underline"
                >
                  浏览课程中心
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {enrolledCourses.map((course) => (
                  <EnrolledCourseCard key={course.courseId} course={course} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  )
}
