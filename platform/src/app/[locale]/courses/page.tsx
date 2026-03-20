'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Navigation from '@/components/Navigation'

interface CheckoutResult {
  success: boolean
  message?: string
  courseName?: string
}

interface User {
  id: string
  email: string
  name: string
}

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  price: number
  category: string
  published: boolean
}

function CategoryFilter({
  selected,
  onSelect,
  labels,
}: {
  selected: string
  onSelect: (category: string) => void
  labels: Record<string, string>
}) {
  const categories = ['all', 'programming', 'design', 'business', 'marketing']

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selected === category
              ? 'bg-accent text-white'
              : 'bg-dark-card text-gray-300 hover:bg-white/10'
          }`}
        >
          {labels[category]}
        </button>
      ))}
    </div>
  )
}

function CourseCard({
  course,
  isLoggedIn,
  onPurchase,
  labels,
  t,
}: {
  course: Course
  isLoggedIn: boolean
  onPurchase: (course: Course) => void
  labels: Record<string, string>
  t: (key: string) => string
}) {
  return (
    <div className="bg-dark-card rounded-2xl p-6 border border-white/5 hover:border-accent/30 transition-all flex flex-col">
      <div className="flex items-start justify-between mb-3">
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent">
          {labels[course.category] || course.category}
        </span>
        {course.published ? (
          <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-400">{t('published')}</span>
        ) : (
          <span className="px-2 py-1 rounded text-xs bg-yellow-500/20 text-yellow-400">{t('draft')}</span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{course.title}</h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">{course.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-gray-500 text-sm">{course.instructor}</span>
        <span className="text-accent font-bold text-lg">¥{course.price}</span>
      </div>
      {isLoggedIn ? (
        <button
          onClick={() => onPurchase(course)}
          className="mt-4 w-full py-3 rounded-xl bg-accent hover:bg-accent/80 text-white font-medium transition-colors cursor-pointer"
        >
          {t('buyNow')}
        </button>
      ) : (
        <a
          href="/auth"
          className="mt-4 w-full py-3 rounded-xl bg-gray-700 hover:bg-gray-600 text-gray-300 font-medium transition-colors text-center block"
        >
          {t('loginToBuy')}
        </a>
      )}
    </div>
  )
}

export default function CoursesPage() {
  const t = useTranslations('courses')
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [user, setUser] = useState<User | null>(null)
  const [purchaseMsg, setPurchaseMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  const [purchasing, setPurchasing] = useState<string | null>(null)

  const categoryLabels: Record<string, string> = {
    all: t('categories.all'),
    programming: t('categories.programming'),
    design: t('categories.design'),
    business: t('categories.business'),
    marketing: t('categories.marketing'),
  }

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => { if (data.success) setUser(data.data) })
      .catch(() => setUser(null))
  }, [])

  useEffect(() => {
    async function fetchCourses() {
      try {
        const url =
          selectedCategory === 'all'
            ? '/api/courses'
            : `/api/courses?category=${selectedCategory}`
        const response = await fetch(url)
        const data = await response.json()

        if (data.success) {
          setCourses(data.data)
        } else {
          setError(data.message || 'Failed to load courses')
        }
      } catch {
        setError('Failed to load courses')
      } finally {
        setLoading(false)
      }
    }

    fetchCourses()
  }, [selectedCategory])

  const filteredCourses =
    selectedCategory === 'all'
      ? courses
      : courses.filter((c) => c.category === selectedCategory)

  const handlePurchase = async (course: Course) => {
    if (!user) return
    setPurchasing(course.id)
    setPurchaseMsg(null)
    try {
      const res = await fetch('/api/payments/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId: course.id }),
      })
      const data: CheckoutResult = await res.json()
      if (data.success) {
        setPurchaseMsg({ type: 'success', text: t('purchaseSuccess', { courseName: data.courseName ?? '' }) })
      } else {
        setPurchaseMsg({ type: 'error', text: data.message || t('purchaseFailed') })
      }
    } catch {
      setPurchaseMsg({ type: 'error', text: t('networkError') })
    } finally {
      setPurchasing(null)
    }
  }

  return (
    <main className="min-h-screen bg-dark-bg">
      <Navigation />

      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              {t('title')}
            </h1>
            <p className="text-gray-400 text-lg">
              {t('subtitle')}
            </p>
          </div>

          <div className="mb-8">
            <CategoryFilter
              selected={selectedCategory}
              onSelect={setSelectedCategory}
              labels={categoryLabels}
            />
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-accent border-t-transparent" />
              <p className="text-gray-400 mt-4">{t('loading')}</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400">{error}</p>
            </div>
          ) : (
            <>
              {purchaseMsg && (
                <div className={`mb-6 p-4 rounded-xl text-center ${purchaseMsg.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                  {purchaseMsg.text}
                  <button onClick={() => setPurchaseMsg(null)} className="ml-3 underline cursor-pointer">{t('close')}</button>
                </div>
              )}
              {filteredCourses.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-400">{t('noCourses')}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCourses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      isLoggedIn={!!user}
                      onPurchase={handlePurchase}
                      labels={categoryLabels}
                      t={t}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  )
}
