'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Navigation from '@/components/Navigation'

function Hero() {
  const t = useTranslations('hero')

  const stats = [
    { label: t('stats.feature.label'), before: t('stats.feature.before'), after: t('stats.feature.after') },
    { label: t('stats.bugfix.label'), before: t('stats.bugfix.before'), after: t('stats.bugfix.after') },
    { label: t('stats.tests.label'), before: t('stats.tests.before'), after: t('stats.tests.after') },
  ]

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 bg-gradient-to-br from-light-surface-dim dark:from-surface-dim to-light-surface dark:to-surface">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-light-primary-container/15 dark:from-primary-container/15 via-transparent to-transparent" />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Provocative hook — M3 Label Large scale */}
        <p className="text-base sm:text-lg text-light-primary dark:text-primary font-medium mb-4 tracking-[0.15em] uppercase">
          {t('badge')}
        </p>
        {/* M3 Display Medium */}
        <h1 className="text-[28px] sm:text-[36px] md:text-[45px] font-semibold text-light-onsurface dark:text-on-surface mb-6 leading-[1.2]">
          {t('title')}
        </h1>
        {/* M3 Body Large */}
        <p className="text-[16px] sm:text-[18px] text-light-onsurface-variant dark:text-onsurface-variant mb-10 max-w-2xl mx-auto leading-[1.5]">
          {t('subtitle')}
        </p>

        {/* Before/After comparison — M3 surface-container cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto">
          <div className="rounded-m3-lg p-5 bg-light-surface-container dark:bg-surface-container border border-light-outline-variant dark:border-outline-variant">
            <div className="text-[12px] font-medium text-light-danger dark:text-danger uppercase tracking-wider mb-2">{t('before.label')}</div>
            <div className="text-[14px] text-light-onsurface-variant dark:text-onsurface-variant leading-relaxed">{t('before.text')}</div>
          </div>
          <div className="rounded-m3-lg p-5 bg-light-surface-container dark:bg-surface-container border border-light-outline-variant dark:border-outline-variant">
            <div className="text-[12px] font-medium text-light-success dark:text-success uppercase tracking-wider mb-2">{t('after.label')}</div>
            <div className="text-[14px] text-light-onsurface-variant dark:text-onsurface-variant leading-relaxed">{t('after.text')}</div>
          </div>
        </div>

        {/* AI compression stats — M3 surface-container cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10 max-w-2xl mx-auto">
          {stats.map((stat, i) => (
            <div key={i} className="rounded-m3-md p-4 bg-light-surface-container dark:bg-surface-container border border-light-outline-variant/50 dark:border-outline-variant/50">
              <div className="text-[12px] text-light-onsurface-variant dark:text-onsurface-variant mb-2">{stat.label}</div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-[14px] text-light-danger dark:text-danger line-through">{stat.before}</span>
                <span className="text-light-primary dark:text-primary">→</span>
                <span className="text-[14px] font-semibold text-light-success dark:text-success">{stat.after}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA — M3 Filled Button */}
        <a
          href="#outline"
          className="inline-block bg-light-primary-container dark:bg-primary-container hover:bg-light-primary-container/80 dark:hover:bg-primary-container-high text-light-primary-on dark:text-on-surface px-8 py-4 rounded-m3-md text-[14px] font-medium tracking-wide transition-all transform hover:scale-[1.02] shadow-m3-1"
        >
          {t('cta')}
        </a>
        {/* M3 Body Small / Caption */}
        <p className="text-[12px] text-light-onsurface-variant dark:text-onsurface-variant mt-3">{t('ctaProof')}</p>
      </div>
    </section>
  )
}

function Narrative() {
  const t = useTranslations('narrative')

  const items = [1, 2, 3].map((i) => ({
    step: t(`items.${i}.step`),
    text: t(`items.${i}.text`),
  }))

  return (
    <section className="py-20 bg-light-surface-dim dark:bg-surface-dim">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* M3 Headline Large */}
        <h2 className="text-[28px] sm:text-[32px] font-semibold text-light-onsurface dark:text-on-surface text-center mb-12">
          {t('title')}
        </h2>
        <div className="space-y-6">
          {items.map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-light-primary-container/20 dark:bg-primary-container/20 text-light-primary dark:text-primary font-semibold flex items-center justify-center text-[14px]">
                {item.step}
              </span>
              {/* M3 Body Large */}
              <p className="text-[16px] text-light-onsurface-variant dark:text-onsurface-variant leading-[1.5] pt-1">{item.text}</p>
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
    <section className="py-24 bg-light-surface dark:bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-[28px] sm:text-[32px] font-semibold text-light-onsurface dark:text-on-surface text-center mb-16">
          {t('title')}
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          {steps.map((step, index) => (
            <div key={step.key} className="flex items-center">
              <div className="bg-light-surface-dim dark:bg-surface-dim rounded-m3-lg p-6 text-center min-w-[160px] border border-light-outline-variant/50 dark:border-outline-variant/50">
                <div className="text-3xl mb-2">{step.icon}</div>
                {/* M3 Title Large */}
                <div className="text-[22px] font-medium text-light-onsurface dark:text-on-surface mb-1">{step.title}</div>
                {/* M3 Body Small */}
                <div className="text-[14px] text-light-onsurface-variant dark:text-onsurface-variant">{step.role}</div>
              </div>
              {index < steps.length - 1 && (
                <span className="hidden md:block text-light-primary dark:text-primary text-2xl mx-2">→</span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-light-surface-dim dark:bg-surface-dim rounded-m3-lg px-8 py-4 border border-light-primary/30 dark:border-primary/30">
            <span className="text-2xl">{t('result.icon')}</span>
            <span className="text-[16px] font-medium text-light-onsurface dark:text-on-surface">{t('result.title')}</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function CourseOutline() {
  const t = useTranslations('courseOutline')

  const chapters = Array.from({ length: 13 }, (_, i) => ({
    num: i,
    title: t(`chapters.${i}.title`),
    desc: t(`chapters.${i}.desc`),
  }))

  return (
    <section id="outline" className="py-24 bg-light-surface-dim dark:bg-surface-dim">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-[28px] sm:text-[32px] font-semibold text-light-onsurface dark:text-on-surface text-center mb-16">
          {t('title')}
        </h2>
        <div className="space-y-3">
          {chapters.map((chapter) => (
            <div
              key={chapter.num}
              className="flex items-start gap-4 bg-light-surface dark:bg-surface rounded-m3-lg p-4 border border-light-outline-variant/50 dark:border-outline-variant/50 hover:border-light-primary/30 dark:hover:border-primary/30 transition-colors"
            >
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-light-primary-container/20 dark:bg-primary-container/20 text-light-primary dark:text-primary font-semibold flex items-center justify-center text-[14px]">
                {chapter.num}
              </span>
              <div>
                <h3 className="text-[16px] font-medium text-light-onsurface dark:text-on-surface">{chapter.title}</h3>
                <p className="text-[14px] text-light-onsurface-variant dark:text-onsurface-variant">{chapter.desc}</p>
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
    <section id="about" className="py-24 bg-light-surface dark:bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-[28px] sm:text-[32px] font-semibold text-light-onsurface dark:text-on-surface text-center mb-16">
          {t('title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-light-surface-dim dark:bg-surface-dim rounded-m3-lg p-6 border border-light-outline-variant/50 dark:border-outline-variant/50"
            >
              <p className="text-[16px] text-light-onsurface-variant dark:text-onsurface-variant mb-4 leading-[1.5]">&ldquo;{item.quote}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-light-primary-container/20 dark:bg-primary-container/20 flex items-center justify-center text-light-primary dark:text-primary font-medium text-[14px]">
                  {item.author[0]}
                </div>
                <div>
                  <div className="text-[14px] font-medium text-light-onsurface dark:text-on-surface">{item.author}</div>
                  <div className="text-[12px] text-light-onsurface-variant dark:text-onsurface-variant">{item.role}</div>
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
  const outline = useTranslations('courseOutline')
  const [showOutline, setShowOutline] = useState(false)

  const features = [1, 2, 3, 4, 5].map((i) => t(`features.${i}`))
  const chapters = Array.from({ length: 13 }, (_, i) => ({
    num: i,
    title: outline(`chapters.${i}.title`),
    desc: outline(`chapters.${i}.desc`),
  }))

  return (
    <section id="pricing" className="py-24 bg-light-surface-dim dark:bg-surface-dim">
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-[28px] sm:text-[32px] font-semibold text-light-onsurface dark:text-on-surface text-center mb-16">
          {t('title')}
        </h2>
        <div className="bg-light-surface dark:bg-surface rounded-m3-xl p-8 border border-light-outline-variant/50 dark:border-outline-variant/50 shadow-m3-2">
          <div className="text-center mb-8">
            {/* M3 Display Medium for price */}
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-[36px] font-semibold text-light-onsurface dark:text-on-surface">{t('price')}</span>
              <span className="text-[16px] text-light-outline dark:text-outline line-through">{t('originalPrice')}</span>
            </div>
            <p className="text-[14px] text-light-onsurface-variant dark:text-onsurface-variant mt-2">{t('lifetime')}</p>
          </div>
          <ul className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <span className="text-light-success dark:text-success text-[16px]">✅</span>
                <span className="text-[16px] text-light-onsurface dark:text-on-surface">{feature}</span>
              </li>
            ))}
          </ul>
          <button
            onClick={() => setShowOutline(!showOutline)}
            className="w-full text-center text-[14px] text-light-primary dark:text-primary hover:text-light-primary/80 dark:hover:text-primary/80 transition-colors py-2 cursor-pointer"
          >
            {showOutline ? t('hideOutline') : t('seeOutline')}
          </button>
          {showOutline && (
            <div className="mt-4 space-y-2 max-h-64 overflow-y-auto pr-2">
              {chapters.map((ch) => (
                <div key={ch.num} className="flex items-start gap-3 text-[14px]">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-light-primary-container/20 dark:bg-primary-container/20 text-light-primary dark:text-primary text-[11px] font-semibold flex items-center justify-center">{ch.num}</span>
                  <div>
                    <span className="text-light-onsurface dark:text-on-surface font-medium">{ch.title}</span>
                    <span className="text-light-onsurface-variant dark:text-onsurface-variant ml-2">{ch.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
          <button className="w-full bg-light-primary-container dark:bg-primary-container hover:bg-light-primary-container/80 dark:hover:bg-primary-container-high text-light-primary-on dark:text-on-surface py-4 rounded-m3-md font-medium text-[14px] tracking-wide transition-all transform hover:scale-[1.02] shadow-m3-1 mt-4">
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
    <section className="py-24 bg-light-surface dark:bg-surface">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-[28px] sm:text-[32px] font-semibold text-light-onsurface dark:text-on-surface text-center mb-16">
          {t('title')}
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-light-surface-dim dark:bg-surface-dim rounded-m3-md border border-light-outline-variant/50 dark:border-outline-variant/50 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-light-onsurface/5 dark:hover:bg-onsurface/5 transition-colors"
              >
                <span className="text-[16px] font-medium text-light-onsurface dark:text-on-surface">{faq.q}</span>
                <span className={`text-light-primary dark:text-primary transition-transform text-[14px] ${openIndex === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-[16px] text-light-onsurface-variant dark:text-onsurface-variant">{faq.a}</p>
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
    <footer className="py-12 bg-light-surface-dim dark:bg-surface-dim border-t border-light-outline-variant/30 dark:border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-[14px] text-light-onsurface-variant dark:text-onsurface-variant">
            {t('copyright')}
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/AIwork4me/ceo-of-one"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] text-light-onsurface-variant dark:text-onsurface-variant hover:text-light-onsurface dark:hover:text-on-surface transition-colors"
            >
              GitHub
            </a>
          </div>
          <div className="text-[14px] text-light-onsurface-variant dark:text-onsurface-variant">
            {t('madeWith')}
          </div>
          <div className="text-[14px] text-light-onsurface-variant dark:text-onsurface-variant">
            {t('lastUpdated')}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-light-surface-dim dark:bg-surface-dim">
      <Navigation />
      <Hero />
      <Narrative />
      <Solution />
      <CourseOutline />
      <SocialProof />
      <Pricing />
      <FAQ />
      <Footer />
    </main>
  )
}
