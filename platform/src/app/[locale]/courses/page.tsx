'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import Navigation from '@/components/Navigation'

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

// 多语言课程数据
const COURSES_DATA = {
  en: [
    { 
      id: '1',
      title: 'AI Prompt Engineering Masterclass', 
      description: 'Master the art of prompt engineering to get the best results from AI tools.', 
      instructor: 'Dr. Sarah Chen', 
      price: 199, 
      category: 'programming', 
      published: true 
    },
    { 
      id: '2',
      title: 'One-Person Company Setup Guide', 
      description: 'Everything you need to know about setting up and running a one-person business.', 
      instructor: 'Mike Johnson', 
      price: 99, 
      category: 'business', 
      published: true 
    },
    { 
      id: '3',
      title: 'Design with AI Tools', 
      description: 'Learn to create stunning designs using AI-powered design tools.', 
      instructor: 'Emma Wilson', 
      price: 149, 
      category: 'design', 
      published: true 
    },
    { 
      id: '4',
      title: 'Content Marketing Automation', 
      description: 'Automate your content marketing workflow with AI and modern tools.', 
      instructor: 'Alex Turner', 
      price: 129, 
      category: 'marketing', 
      published: true 
    },
    { 
      id: '5',
      title: 'Build Your First SaaS', 
      description: 'A complete guide to building and launching your first Software as a Service product.', 
      instructor: 'David Park', 
      price: 299, 
      category: 'programming', 
      published: true 
    },
    { 
      id: '6',
      title: 'Personal Branding Strategy', 
      description: 'Build a powerful personal brand that attracts opportunities.', 
      instructor: 'Lisa Brown', 
      price: 79, 
      category: 'business', 
      published: true 
    },
  ],
  zh: [
    { 
      id: '1',
      title: 'AI 提示工程大师课', 
      description: '掌握提示工程的艺术，从 AI 工具中获得最佳结果。', 
      instructor: '陈博士', 
      price: 199, 
      category: 'programming', 
      published: true 
    },
    { 
      id: '2',
      title: '一人公司创建指南', 
      description: '关于建立和运营一人公司的所有知识。', 
      instructor: '迈克·约翰逊', 
      price: 99, 
      category: 'business', 
      published: true 
    },
    { 
      id: '3',
      title: '用 AI 工具设计', 
      description: '学习使用 AI 驱动的设计工具创建出色的设计。', 
      instructor: '艾玛·威尔逊', 
      price: 149, 
      category: 'design', 
      published: true 
    },
    { 
      id: '4',
      title: '内容营销自动化', 
      description: '用 AI 和现代工具自动化你的内容营销工作流程。', 
      instructor: '亚历克斯·特纳', 
      price: 129, 
      category: 'marketing', 
      published: true 
    },
    { 
      id: '5',
      title: '构建你的第一个 SaaS', 
      description: '构建和发布你的第一个软件即服务产品的完整指南。', 
      instructor: '大卫·帕克', 
      price: 299, 
      category: 'programming', 
      published: true 
    },
    { 
      id: '6',
      title: '个人品牌策略', 
      description: '建立强大的个人品牌，吸引机会。', 
      instructor: '丽莎·布朗', 
      price: 79, 
      category: 'business', 
      published: true 
    },
  ]
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
  const locale = useLocale()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [user, setUser] = useState<User | null>(null)

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

  // 使用当前语言的课程数据
  const courses = COURSES_DATA[locale as 'en' | 'zh'] || COURSES_DATA.en

  const filteredCourses =
    selectedCategory === 'all'
      ? courses
      : courses.filter((c) => c.category === selectedCategory)

  const handlePurchase = async (course: Course) => {
    alert(`购买课程: ${course.title} - 功能开发中`)
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
        </div>
      </section>
    </main>
  )
}
