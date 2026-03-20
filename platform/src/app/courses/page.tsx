'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'

interface Course {
  id: string
  title: string
  description: string
  instructor: string
  price: number
  category: string
  published: boolean
}

const CATEGORY_LABELS: Record<string, string> = {
  all: '全部',
  programming: '编程',
  design: '设计',
  business: '商业',
  marketing: '营销',
}

function CategoryFilter({
  selected,
  onSelect,
}: {
  selected: string
  onSelect: (category: string) => void
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
          {CATEGORY_LABELS[category]}
        </button>
      ))}
    </div>
  )
}

function CourseCard({ course }: { course: Course }) {
  const categoryLabels: Record<string, string> = {
    programming: '编程',
    design: '设计',
    business: '商业',
    marketing: '营销',
  }

  return (
    <div className="bg-dark-card rounded-2xl p-6 border border-white/5 hover:border-accent/30 transition-all">
      <div className="flex items-start justify-between mb-3">
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent">
          {categoryLabels[course.category] || course.category}
        </span>
        {course.published ? (
          <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-400">已发布</span>
        ) : (
          <span className="px-2 py-1 rounded text-xs bg-yellow-500/20 text-yellow-400">草稿</span>
        )}
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{course.title}</h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{course.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-gray-500 text-sm">{course.instructor}</span>
        <span className="text-accent font-bold">¥{course.price}</span>
      </div>
    </div>
  )
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')

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

  return (
    <main className="min-h-screen bg-dark-bg">
      <Navigation />

      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              📚 课程中心
            </h1>
            <p className="text-gray-400 text-lg">
              发现适合你的课程，开启学习之旅
            </p>
          </div>

          <div className="mb-8">
            <CategoryFilter selected={selectedCategory} onSelect={setSelectedCategory} />
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-accent border-t-transparent" />
              <p className="text-gray-400 mt-4">加载中...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-400">{error}</p>
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">暂无课程</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
