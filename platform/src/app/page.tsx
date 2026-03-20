'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'

function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 bg-gradient-to-br from-dark-bg to-[#1a1a2e]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
          一个人就是一家公司
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          2026 年，你不需要学编程，不需要组建团队。你说一句话，AI 帮你把产品做出来。
        </p>
        <a
          href="#pricing"
          className="inline-block bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-accent/30"
        >
          免费试听第一章
        </a>
      </div>
    </section>
  )
}

function PainPoints() {
  const pains = [
    {
      icon: '💡',
      title: '想做个产品，但不会编程',
    },
    {
      icon: '😤',
      title: '请了外包，沟通成本比开发还高',
    },
    {
      icon: '😰',
      title: '学了编程，但永远做不出完整产品',
    },
  ]

  return (
    <section className="py-20 bg-dark-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pains.map((pain, index) => (
            <div
              key={index}
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
  const steps = [
    { icon: '🎯', title: '你说一句话', role: 'CEO' },
    { icon: '⚙️', title: 'OpenClaw 拆解执行', role: 'COO' },
    { icon: '👷', title: 'Claude Code 写代码', role: 'Engineer' },
  ]

  return (
    <section className="py-24 bg-dark-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          CEO of One 方法论
        </h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
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
            <span className="text-2xl">🚀</span>
            <span className="text-white font-medium">产品上线，你拥有 100% 股权</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function CourseOutline() {
  const chapters = [
    { num: 1, title: '环境搭建', desc: '5 分钟，你的 AI 团队就位' },
    { num: 2, title: 'COO 的灵魂', desc: '为什么"说对一句话"比学编程重要 100 倍' },
    { num: 3, title: '贪吃蛇实战', desc: '你的第一个产品' },
    { num: 4, title: '验收清单', desc: '让 AI 一次性做对' },
    { num: 5, title: '训练营首页', desc: '你正在看的这个网站' },
    { num: 6, title: '注册登录', desc: '让用户留下来' },
    { num: 7, title: '支付功能', desc: '开始赚钱' },
    { num: 8, title: 'Bug 修复实战', desc: '真实产品必有 bug' },
    { num: 9, title: '部署上线', desc: '让全世界看到' },
    { num: 10, title: '数据看板', desc: '你的业务仪表盘' },
    { num: 11, title: '毕业项目', desc: '从想法到收入' },
  ]

  return (
    <section id="outline" className="py-24 bg-dark-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          11 章，从零到产品上线
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
  const testimonials = [
    {
      quote: '我是产品经理，完全不会代码。用这套方法 2 周做出了我的第一个 SaaS。',
      author: '张明',
      role: '产品经理',
    },
    {
      quote: '以前请外包做一个功能要等 2 周，现在我自己 2 小时就搞定了。',
      author: '李华',
      role: '独立创业者',
    },
    {
      quote: '这本书改变了我的职业生涯。现在我一个人就是一个技术团队。',
      author: '王芳',
      role: '市场营销',
    },
  ]

  return (
    <section id="about" className="py-24 bg-dark-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          他们说
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
  const features = [
    '11 章实战教程',
    '所有源代码',
    'COO 配置包（复制即用）',
    '毕业项目部署上线',
    '终身免费更新',
  ]

  return (
    <section id="pricing" className="py-24 bg-dark-bg">
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          投资自己
        </h2>
        <div className="bg-dark-card rounded-3xl p-8 border border-white/10 shadow-2xl shadow-accent/10">
          <div className="text-center mb-8">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-5xl font-bold text-white">¥299</span>
              <span className="text-xl text-gray-500 line-through">¥599</span>
            </div>
            <p className="text-gray-400 mt-2">终身访问，包括所有未来更新</p>
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
            立即报名
          </button>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      q: '我完全不懂技术，真的能学会吗？',
      a: '是的。整本书只教你"怎么说"，不教编程。',
    },
    {
      q: '需要什么基础？',
      a: '会用电脑、能打字就行。',
    },
    {
      q: '学完能做出什么？',
      a: '一个能赚钱的在线产品，你拥有 100% 的代码和股权。',
    },
    {
      q: 'AI 工具要花钱吗？',
      a: 'Claude Code 有免费额度，够完成所有章节。',
    },
  ]

  return (
    <section className="py-24 bg-dark-card">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
          常见问题
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
  return (
    <footer className="py-12 bg-dark-bg border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-gray-400">
            CEO of One © 2026
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
            Made with ❤️ and AI
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
