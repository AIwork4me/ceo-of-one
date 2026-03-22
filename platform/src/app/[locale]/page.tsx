'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Navigation from '@/components/Navigation'

function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 bg-gradient-to-br from-surface to-surface-container">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent" />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-on-surface mb-6 leading-tight">
          {t('title')}
        </h1>
        <p className="text-lg sm:text-xl text-on-surface-variant mb-8 max-w-2xl mx-auto leading-relaxed">
          {t('subtitle')}
        </p>
        <a
          href="#pricing"
          className="inline-block bg-primary-container hover:bg-primary-container-high text-on-surface px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-primary/20"
        >
          {t('cta')}
        </a>
      </div>
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
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pains.map((pain) => (
            <div
              key={pain.key}
              className="bg-surface-container rounded-2xl p-8 text-center border border-outline-variant hover:border-outline transition-colors"
            >
              <div className="text-4xl mb-4">{pain.icon}</div>
              <h3 className="text-lg font-medium text-on-surface">{pain.title}</h3>
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
    <section className="py-24 bg-surface-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-on-surface text-center mb-16">
          {t('title')}
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          {steps.map((step, index) => (
            <div key={step.key} className="flex items-center">
              <div className="bg-surface rounded-2xl p-6 text-center min-w-[160px] border border-outline-variant">
                <div className="text-3xl mb-2">{step.icon}</div>
                <div className="text-on-surface font-medium mb-1">{step.title}</div>
                <div className="text-on-surface-variant text-sm">{step.role}</div>
              </div>
              {index < steps.length - 1 && (
                <span className="hidden md:block text-primary text-2xl mx-2">→</span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-surface rounded-2xl px-8 py-4 border border-primary/30">
            <span className="text-2xl">{t('result.icon')}</span>
            <span className="text-on-surface font-medium">{t('result.title')}</span>
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
    <section id="outline" className="py-24 bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-on-surface text-center mb-16">
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
                <h3 className="text-on-surface font-medium">{chapter.title}</h3>
                <p className="text-on-surface-variant text-sm">{chapter.desc}</p>
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
    <section id="about" className="py-24 bg-surface-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-on-surface text-center mb-16">
          {t('title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-surface rounded-2xl p-6 border border-outline-variant"
            >
              <p className="text-on-surface-variant mb-4 leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary font-medium">
                  {item.author[0]}
                </div>
                <div>
                  <div className="text-on-surface font-medium">{item.author}</div>
                  <div className="text-on-surface-variant text-sm">{item.role}</div>
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
    <section id="pricing" className="py-24 bg-surface">
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-on-surface text-center mb-16">
          {t('title')}
        </h2>
        <div className="bg-surface-container rounded-3xl p-8 border border-outline-variant shadow-2xl shadow-primary/10">
          <div className="text-center mb-8">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-5xl font-bold text-on-surface">{t('price')}</span>
              <span className="text-xl text-on-surface-variant line-through">{t('originalPrice')}</span>
            </div>
            <p className="text-on-surface-variant mt-2">{t('lifetime')}</p>
          </div>
          <ul className="space-y-4 mb-6">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="text-primary text-lg">✅</span>
                <span className="text-on-surface">{feature}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-outline-variant pt-4 mb-6">
            <button
              onClick={() => setShowOutline(!showOutline)}
              className="w-full text-center text-on-surface-variant hover:text-on-surface transition-colors text-sm cursor-pointer"
            >
              📖 {showOutline ? t('hideOutline') : t('seeOutline')}
            </button>
            {showOutline && (
              <div className="mt-3 space-y-2">
                {chapters.map((chapter) => (
                  <div key={chapter.num} className="flex items-center gap-2 text-sm text-on-surface-variant">
                    <span className="text-primary font-medium w-6">{chapter.num}.</span>
                    <span>{chapter.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button className="w-full bg-primary-container hover:bg-primary-container-high text-on-surface py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-primary/20">
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
    <section className="py-24 bg-surface-container">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-on-surface text-center mb-16">
          {t('title')}
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-surface rounded-xl border border-outline-variant overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-surface-container-high transition-colors"
              >
                <span className="text-on-surface font-medium">{faq.q}</span>
                <span className={`text-primary transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-on-surface-variant">{faq.a}</p>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-on-surface-variant">
            {t('copyright')}
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/AIwork4me/ceo-of-one"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-surface-variant hover:text-on-surface transition-colors"
            >
              GitHub
            </a>
          </div>
          <div className="text-on-surface-variant text-sm">
            {t('madeWith')}
          </div>
          <div className="text-on-surface-variant text-sm">
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
