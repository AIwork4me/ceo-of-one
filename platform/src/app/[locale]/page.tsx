'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Navigation from '@/components/Navigation'

function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-surface via-surface to-surface-container py-32 sm:py-40 md:py-44">
      {/* 背景装饰：柔和的径向渐变 */}
      <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent opacity-80" />
      
      {/* 额外的光晕效果 - 响应式尺寸 */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[clamp(400px,50vw,800px)] h-[clamp(200px,25vw,400px)] bg-primary/5 blur-3xl rounded-full" />
      
      {/* 主内容区 - 固定 padding-top，不再居中 */}
      <div className="relative z-10 text-center px-[clamp(1.5rem,4vw,3rem)] max-w-5xl mx-auto pt-32 sm:pt-40 md:pt-44">
        {/* 主标题：响应式 32px - 80px */}
        <h1 className="text-responsive-hero font-bold text-on-surface mb-8 tracking-tight animate-fade-in-up">
          {t('title')}
        </h1>
        
        {/* 副标题：响应式 16px - 24px */}
        <p className="text-responsive-subtitle text-on-surface-variant mb-12 max-w-3xl mx-auto font-normal animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          {t('subtitle')}
        </p>
        
        {/* CTA 按钮 - 响应式尺寸 */}
        <a
          href="#outline"
          className="
            inline-flex
            items-center
            justify-center
            bg-primary-container
            hover:bg-primary-container-light
            text-on-surface
            px-responsive-button
            py-responsive-button
            rounded-xl
            text-responsive-button
            font-semibold
            transition-all
            duration-200
            ease-m3-standard
            transform
            hover:scale-[1.03]
            hover:shadow-primary-glow
            active:scale-[0.98]
            animate-fade-in-up
          "
          style={{ animationDelay: '200ms' }}
        >
          {t('cta')}
        </a>
        
        {/* 向下滚动提示 */}
        <div className="mt-12 animate-bounce">
          <a
            href="#outline"
            className="text-on-surface-variant hover:text-primary transition-colors"
            aria-label="Scroll down"
          >
            <svg
              className="w-8 h-8 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </a>
        </div>
      </div>
      
      {/* 底部渐变遮罩，柔和过渡到下一个区块 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-surface to-transparent" />
    </section>
  )
}

function PainPoints() {
  const t = useTranslations('painPoints.items')

  const pains = [
    { key: 'noCoding', ...t.raw('noCoding') },
    { key: 'outsourcing', ...t.raw('outsourcing') },
    { key: 'alwaysLearning', ...t.raw('alwaysLearning') },
  ]

  return (
    <section className="py-responsive-section bg-surface">
      <div className="max-w-7xl mx-auto px-[clamp(1rem,3vw,2rem)]">
        {/* 响应式网格：自动适配 1-3 列 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(1rem,2vw,1.5rem)]">
          {pains.map((pain) => (
            <div
              key={pain.key}
              className="bg-surface-container rounded-2xl p-responsive-card text-center border border-outline-variant hover:border-outline transition-colors"
            >
              <div className="text-4xl mb-4">{pain.icon}</div>
              <h3 className="text-responsive-card font-medium text-on-surface">{pain.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Solution() {
  const t = useTranslations('solution')

  const steps = [
    { key: 'ceo', ...t.raw('steps.ceo') },
    { key: 'coo', ...t.raw('steps.coo') },
    { key: 'engineer', ...t.raw('steps.engineer') },
  ]

  return (
    <section className="py-responsive-section bg-surface-container">
      <div className="max-w-7xl mx-auto px-[clamp(1rem,3vw,2rem)]">
        <h2 className="text-responsive-section font-bold text-on-surface text-center mb-16">
          {t('title')}
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-[clamp(1rem,2vw,2rem)]">
          {steps.map((step, index) => (
            <div key={step.key} className="flex items-center">
              <div className="bg-surface rounded-2xl p-responsive-card text-center min-w-[clamp(140px,18vw,200px)] border border-outline-variant">
                <div className="text-3xl mb-2">{step.icon}</div>
                <div className="text-responsive-card text-on-surface font-medium mb-1">{step.title}</div>
                <div className="text-responsive-small text-on-surface-variant">{step.role}</div>
              </div>
              {index < steps.length - 1 && (
                <span className="hidden md:block text-primary text-2xl mx-2">→</span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-surface rounded-2xl px-responsive-button py-4 border border-primary/30">
            <span className="text-2xl">{t('result.icon')}</span>
            <span className="text-responsive-card text-on-surface font-medium">{t('result.title')}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function CourseOutline() {
  const t = useTranslations('courseOutline')

  const chapters = Array.from({ length: 11 }, (_, i) => ({
    num: i + 1,
    title: t(`chapters.${i + 1}.title`),
    desc: t(`chapters.${i + 1}.desc`),
  }))

  return (
    <section id="outline" className="py-responsive-section bg-surface">
      <div className="max-w-4xl mx-auto px-[clamp(1rem,3vw,2rem)]">
        <h2 className="text-responsive-section font-bold text-on-surface text-center mb-16">
          {t('title')}
        </h2>
        <div className="space-y-4">
          {chapters.map((chapter) => (
            <div
              key={chapter.num}
              className="flex items-start gap-4 bg-surface-container rounded-xl p-4 border border-outline-variant hover:border-primary/40 transition-colors"
            >
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/15 text-primary font-bold flex items-center justify-center">
                {chapter.num}
              </span>
              <div>
                <h3 className="text-responsive-card text-on-surface font-medium">{chapter.title}</h3>
                <p className="text-responsive-small text-on-surface-variant">{chapter.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SocialProof() {
  const t = useTranslations('socialProof')

  const testimonials = [1, 2, 3].map((i) => ({
    quote: t(`testimonials.${i}.quote`),
    author: t(`testimonials.${i}.author`),
    role: t(`testimonials.${i}.role`),
  }))

  return (
    <section id="about" className="py-responsive-section bg-surface-container">
      <div className="max-w-7xl mx-auto px-[clamp(1rem,3vw,2rem)]">
        <h2 className="text-responsive-section font-bold text-on-surface text-center mb-16">
          {t('title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[clamp(1rem,2vw,1.5rem)]">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-surface rounded-2xl p-responsive-card border border-outline-variant"
            >
              <p className="text-responsive-body text-on-surface-variant mb-4 leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary font-medium">
                  {item.author[0]}
                </div>
                <div>
                  <div className="text-responsive-card text-on-surface font-medium">{item.author}</div>
                  <div className="text-responsive-small text-on-surface-variant">{item.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const t = useTranslations('pricing')
  const tOutline = useTranslations('courseOutline')
  const [showOutline, setShowOutline] = useState(false)

  const features = [1, 2, 3, 4, 5].map((i) => t(`features.${i}`))

  const chapters = Array.from({ length: 11 }, (_, i) => ({
    num: i + 1,
    title: tOutline(`chapters.${i + 1}.title`),
  }))

  return (
    <section id="pricing" className="py-responsive-section bg-surface">
      <div className="max-w-lg mx-auto px-[clamp(1rem,3vw,2rem)]">
        <h2 className="text-responsive-section font-bold text-on-surface text-center mb-16">
          {t('title')}
        </h2>
        <div className="bg-surface-container rounded-3xl p-responsive-card border border-outline-variant shadow-2xl shadow-primary/10">
          <div className="text-center mb-8">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-responsive-hero font-bold text-on-surface">{t('price')}</span>
              <span className="text-responsive-card text-on-surface-variant line-through">{t('originalPrice')}</span>
            </div>
            <p className="text-responsive-small text-on-surface-variant mt-2">{t('lifetime')}</p>
          </div>
          <ul className="space-y-4 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="text-primary text-lg">✅</span>
                <span className="text-responsive-body text-on-surface">{feature}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-outline-variant pt-4 mb-6">
            <button
              onClick={() => setShowOutline(!showOutline)}
              className="w-full text-center text-responsive-small text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            >
              📖 {showOutline ? t('hideOutline') : t('seeOutline')}
            </button>
            {showOutline && (
              <div className="mt-3 space-y-2">
                {chapters.map((chapter) => (
                  <div key={chapter.num} className="flex items-center gap-2 text-responsive-small text-on-surface-variant">
                    <span className="text-primary font-medium w-6">{chapter.num}.</span>
                    <span>{chapter.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="w-full bg-primary-container hover:bg-primary-container-high text-on-surface py-responsive-button rounded-xl font-semibold text-responsive-button transition-all transform hover:scale-[1.02] shadow-lg shadow-primary/20">
            {t('cta')}
          </button>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const t = useTranslations('faq')

  const faqs = [1, 2, 3, 4].map((i) => ({
    q: t(`items.${i}.q`),
    a: t(`items.${i}.a`),
  }))

  return (
    <section className="py-responsive-section bg-surface-container">
      <div className="max-w-3xl mx-auto px-[clamp(1rem,3vw,2rem)]">
        <h2 className="text-responsive-section font-bold text-on-surface text-center mb-16">
          {t('title')}
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-surface rounded-xl border border-outline-variant overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-responsive-button py-4 text-left flex items-center justify-between hover:bg-surface-container-high transition-colors"
              >
                <span className="text-responsive-card text-on-surface font-medium">{faq.q}</span>
                <span className={`text-primary transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {openIndex === index && (
                <div className="px-responsive-button pb-4">
                  <p className="text-responsive-body text-on-surface-variant">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="py-12 bg-surface border-t border-outline-variant">
      <div className="max-w-7xl mx-auto px-[clamp(1rem,3vw,2rem)]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-responsive-small text-on-surface-variant">
            {t('copyright')}
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/AIwork4me/ceo-of-one"
              target="_blank"
              rel="noopener noreferrer"
              className="text-responsive-small text-on-surface-variant hover:text-on-surface transition-colors"
            >
              GitHub
            </a>
          </div>
          <div className="text-responsive-small text-on-surface-variant">
            {t('madeWith')}
          </div>
          <div className="text-responsive-small text-on-surface-variant">
            {t('lastUpdated')}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-surface">
      <Navigation />
      <Hero />
      <PainPoints />
      <Solution />
      <CourseOutline />
      <SocialProof />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  )
}
