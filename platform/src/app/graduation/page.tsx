'use client'

import Link from 'next/link'

const journey = [
  { chapter: 0, title: 'Environment Setup', achievement: '1 tool installed' },
  { chapter: 1, title: 'The COO Soul', achievement: '1 configuration file' },
  { chapter: 2, title: 'Precision Matters', achievement: '3 versions compared' },
  { chapter: 3, title: 'Quality Checklist', achievement: 'acceptance criteria that works' },
  { chapter: 4, title: 'Landing Page', achievement: 'your brand, live' },
  { chapter: 5, title: 'Authentication', achievement: 'users can register' },
  { chapter: 6, title: 'Payments', achievement: 'your product earns money' },
  { chapter: 7, title: 'Bug Fixes', achievement: 'saying "fix it" and it gets fixed' },
  { chapter: 8, title: 'Deployment', achievement: 'the world can see you' },
  { chapter: 9, title: 'Dashboard', achievement: 'know your numbers' },
]

const stats = [
  { label: 'Chapters Completed', value: '10' },
  { label: 'Tests Passing', value: '111' },
  { label: 'Feature Modules', value: '4' },
  { label: 'Deployed Product', value: '1' },
]

export default function GraduationPage() {
  return (
    <main className="min-h-screen bg-dark-bg">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="font-bold text-xl text-white">
              CEO of One
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm">
                Home
              </Link>
              <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors text-sm">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center justify-center relative overflow-hidden pt-16 bg-gradient-to-br from-dark-bg to-[#1a1a2e]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/20 via-transparent to-transparent" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="text-6xl sm:text-7xl md:text-8xl mb-6">🎓</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Congratulations, CEO
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            You&apos;ve completed the CEO of One training. From zero to deployed product,
            you&apos;ve proven that one person with AI can build what once required a team.
          </p>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="py-24 bg-dark-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
            Your Journey
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-accent/30" />

            <div className="space-y-6">
              {journey.map((item, index) => (
                <div key={item.chapter} className="relative flex items-start gap-6">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-accent/20 border-2 border-accent flex items-center justify-center z-10">
                    <span className="text-accent font-bold text-sm sm:text-base">{item.chapter}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-dark-bg rounded-xl p-6 border border-white/5 hover:border-accent/30 transition-colors">
                    <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-gray-400">{item.achievement}</p>
                  </div>

                  {/* Current chapter indicator */}
                  {index === journey.length - 1 && (
                    <div className="absolute -right-2 top-6 bg-accent text-white text-xs px-2 py-1 rounded-full">
                      YOU ARE HERE
                    </div>
                  )}
                </div>
              ))}

              {/* Final chapter - Graduation */}
              <div className="relative flex items-start gap-6">
                <div className="flex-shrink-0 w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-accent flex items-center justify-center z-10">
                  <span className="text-white font-bold text-lg">🎓</span>
                </div>
                <div className="flex-1 bg-accent/20 rounded-xl p-6 border-2 border-accent">
                  <h3 className="text-white font-semibold text-lg mb-1">Graduation</h3>
                  <p className="text-gray-300">You&apos;re here! Ready to build your own product.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-16">
            By The Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-dark-card rounded-2xl p-6 text-center border border-white/5"
              >
                <div className="text-4xl sm:text-5xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm sm:text-base">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Live URL */}
          <div className="mt-12 text-center">
            <p className="text-gray-400 mb-4">Your product is live at:</p>
            <a
              href="https://ceo-of-one-seven.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-dark-card rounded-xl px-6 py-4 border border-accent/30 hover:border-accent transition-colors"
            >
              <span className="text-accent font-mono text-lg">ceo-of-one-seven.vercel.app</span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-dark-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Now Build YOUR Product
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            You have the tools. You have the knowledge. The only limit is your imagination.
            Go forth and create something amazing.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://github.com/AIwork4me/ceo-of-one"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-accent/30"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              View Source on GitHub
            </a>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-dark-bg hover:bg-dark-card text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all border border-white/10"
            >
              View Your Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-dark-bg border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-gray-400">CEO of One © 2026</div>
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
            <div className="text-gray-400 text-sm">Made with ❤️ and AI</div>
          </div>
        </div>
      </footer>
    </main>
  )
}
