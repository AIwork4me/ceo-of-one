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
    <div className="flex flex-wrap gap-[clamp(0.5rem,1vw,1rem)] justify-center">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-6 py-3 rounded-lg text-responsive-small font-medium transition-all duration-200 ${
            selected === category
              ? 'bg-primary-container text-on-surface scale-105'
              : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:scale-105'
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
    <div className="bg-surface-container rounded-2xl p-responsive-card border border-outline-variant hover:border-primary/40 transition-all duration-200 flex flex-col hover:shadow-m3-card">
      <div className="flex items-start justify-between mb-3">
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/15 text-primary">
          {labels[course.category] || course.category}
        </span>
        {course.published ? (
          <span className="px-2 py-1 rounded text-xs bg-success/20 text-success">{t('published')}</span>
        ) : (
          <span className="px-2 py-1 rounded text-xs bg-warning/20 text-warning">{t('draft')}</span>
        )}
      </div>
      <h3 className="text-responsive-card font-semibold text-on-surface mb-2">{course.title}</h3>
      <p className="text-on-surface-variant text-responsive-small mb-4 line-clamp-2 flex-grow">{course.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-on-surface-variant text-responsive-small">{course.instructor}</span>
        <span className="text-primary font-bold text-lg">¥{course.price}</span>
      </div>
      {isLoggedIn ? (
        <button
          onClick={() => onPurchase(course)}
          className="mt-4 w-full py-3 rounded-xl bg-primary-container hover:bg-primary-container-light text-on-surface font-medium transition-all duration-200 cursor-pointer hover:scale-[1.02]"
        >
          {t('buyNow')}
        </button>
      ) : (
        <a
          href="/auth"
          className="mt-4 w-full py-3 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant font-medium transition-all duration-200 text-center block hover:scale-[1.02]"
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
          setError(data.message || t('fetchError'))
        }
      } catch {
        setError(t('fetchError'))
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
    <main className="min-h-screen bg-surface">
      <Navigation />

      <section className="py-responsive-section px-[clamp(1rem,3vw,2rem)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-responsive-section font-bold text-on-surface mb-4">
              {t('title')}
            </h1>
            <p className="text-responsive-subtitle text-on-surface-variant">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[clamp(1rem,2vw,1.5rem)]" aria-label={t('loading')}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-surface-container rounded-2xl p-6 border border-outline-variant animate-shimmer">
                  <div className="flex items-start justify-between mb-3">
                    <div className="h-6 w-20 rounded-full bg-outline-variant/20" />
                    <div className="h-5 w-14 rounded bg-outline-variant/20" />
                  </div>
                  <div className="h-5 w-3/4 rounded bg-outline-variant/20 mb-2" />
                  <div className="h-4 w-full rounded bg-outline-variant/20 mb-1" />
                  <div className="h-4 w-5/6 rounded bg-outline-variant/20 mb-4" />
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-24 rounded bg-outline-variant/20" />
                    <div className="h-6 w-16 rounded bg-outline-variant/20" />
                  </div>
                  <div className="mt-4 h-12 rounded-xl bg-outline-variant/20" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-danger">{error}</p>
            </div>
          ) : (
            <>
              {purchaseMsg && (
                <div className={`mb-6 p-4 rounded-xl text-center animate-fade-in ${
                purchaseMsg.type === 'success' ? 'bg-success/15 text-success' : 'bg-danger/15 text-danger'
              }`}>
                  {purchaseMsg.text}
                  <button onClick={() => setPurchaseMsg(null)} className="ml-3 underline cursor-pointer">{t('close')}</button>
                </div>
              )}
              {filteredCourses.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-on-surface-variant">{t('noCourses')}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[clamp(1rem,2vw,1.5rem)]">
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
