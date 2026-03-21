'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Navigation from '@/components/Navigation'

function Hero() {
  const t = useTranslations('hero')

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 bg-gradient-to-br from-dark-bg to-[#1a1a2e]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          {t('title')}
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          {t('subtitle')}
        </p>
        <a
          href="#pricing"
          className="inline-block bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-accent/30"
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
    <section className="py-20 bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pains.map((pain) => (
            <div
              key={pain.key}
              className="bg-dark-card rounded-2xl p-8 text-center border border-white/5 hover:border-white/10 transition-colors"
            >
              <div className="text-4xl mb-4">{pain.icon}</div>
              <h3 className="text-lg font-medium text-white">{pain.title}</h3>
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
    <section className="py-24 bg-dark-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          {t('title')}
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          {steps.map((step, index) => (
            <div key={step.key} className="flex items-center">
              <div className="bg-dark-bg rounded-2xl p-6 text-center min-w-[160px] border border-white/5">
                <div className="text-3xl mb-2">{step.icon}</div>
                <div className="text-white font-medium mb-1">{step.title}</div>
                <div className="text-gray-400 text-sm">{step.role}</div>
              </div>
              {index < steps.length - 1 && (
                <span className="hidden md:block text-accent text-2xl mx-2">→</span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-dark-bg rounded-2xl px-8 py-4 border border-accent/30">
            <span className="text-2xl">{t('result.icon')}</span>
            <span className="text-white font-medium">{t('result.title')}</span>
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
    <section id="outline" className="py-24 bg-dark-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          {t('title')}
        </h2>
        <div className="space-y-4">
          {chapters.map((chapter) => (
            <div
              key={chapter.num}
              className="flex items-start gap-4 bg-dark-card rounded-xl p-4 border border-white/5 hover:border-accent/30 transition-colors"
            >
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-accent/20 text-accent font-bold flex items-center justify-center">
                {chapter.num}
              </span>
              <div>
                <h3 className="text-white font-medium">{chapter.title}</h3>
                <p className="text-gray-400 text-sm">{chapter.desc}</p>
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
    <section id="about" className="py-24 bg-dark-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          {t('title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-dark-bg rounded-2xl p-6 border border-white/5"
            >
              <p className="text-gray-300 mb-4 leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-medium">
                  {item.author[0]}
                </div>
                <div>
                  <div className="text-white font-medium">{item.author}</div>
                  <div className="text-gray-400 text-sm">{item.role}</div>
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

  const features = [1, 2, 3, 4, 5].map((i) => t(`features.${i}`))

  return (
    <section id="pricing" className="py-24 bg-dark-bg">
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          {t('title')}
        </h2>
        <div className="bg-dark-card rounded-3xl p-8 border border-white/10 shadow-2xl shadow-accent/10">
          <div className="text-center mb-8">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-5xl font-bold text-white">{t('price')}</span>
              <span className="text-xl text-gray-500 line-through">{t('originalPrice')}</span>
            </div>
            <p className="text-gray-400 mt-2">{t('lifetime')}</p>
          </div>
          <ul className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="text-accent text-lg">✅</span>
                <span className="text-gray-200">{feature}</span>
              </li>
            ))}
          </ul>
          <button className="w-full bg-accent hover:bg-accent-hover text-white py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-accent/30">
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
    <section className="py-24 bg-dark-card">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          {t('title')}
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-dark-bg rounded-xl border border-white/5 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <span className="text-white font-medium">{faq.q}</span>
                <span className={`text-accent transition-transform ${openIndex === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-300">{faq.a}</p>
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
    <footer className="py-12 bg-dark-bg border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-400">
            {t('copyright')}
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/AIwork4me/ceo-of-one"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
          </div>
          <div className="text-gray-400 text-sm">
            {t('madeWith')}
          </div>
          <div className="text-gray-400 text-sm">
            {t('lastUpdated')}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-dark-bg">
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
