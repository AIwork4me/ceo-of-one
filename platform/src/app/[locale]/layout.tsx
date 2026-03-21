import type { Metadata } from 'next'
import { Noto_Sans_SC } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import '../globals.css'
import { routing } from '@/i18n/routing'
import BackToTop from '@/components/BackToTop'

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
})

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  const titles = {
    en: 'CEO of One — Build Real Products Without Writing Code',
    zh: 'CEO of One — 不写代码也能做出真正的产品',
  }

  const descriptions = {
    en: 'In 2026, one person is a company. No coding required, no team needed. OpenClaw is your COO, Claude Code is your engineer. You speak, they build.',
    zh: '2026 年，一个人就是一家公司。不需要学编程，不需要组建团队。OpenClaw 当 COO，Claude Code 当工程师，你说一句话，他们把产品做出来。',
  }

  const ogDescriptions = {
    en: 'One person, one company. AI builds it; you own 100%. 11 chapters, 111 tests, battle-tested methodology.',
    zh: '一个人就是一家公司。AI 帮你做，你拥有 100% 股权。11 章课程，111 个测试，实战验证的方法论。',
  }

  return {
    title: {
      default: titles[locale as 'en' | 'zh'] || titles.en,
      template: '%s | CEO of One',
    },
    description: descriptions[locale as 'en' | 'zh'] || descriptions.en,
    keywords: ['AI', 'no-code', 'one-person company', 'OpenClaw', 'Claude Code', 'solo founder', 'indie hacker', 'knowledge platform', 'tutorial', 'Next.js'],
    authors: [{ name: 'AIwork4me', url: 'https://github.com/AIwork4me' }],
    openGraph: {
      type: 'website',
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      alternateLocale: locale === 'zh' ? 'en_US' : 'zh_CN',
      url: 'https://ceo.tinkerclaw.io',
      siteName: 'CEO of One',
      title: titles[locale as 'en' | 'zh'] || titles.en,
      description: ogDescriptions[locale as 'en' | 'zh'] || ogDescriptions.en,
      images: [{
        url: 'https://ceo.tinkerclaw.io/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CEO of One — Build Real Products Without Writing Code',
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale as 'en' | 'zh'] || titles.en,
      description: ogDescriptions[locale as 'en' | 'zh'] || ogDescriptions.en,
      images: ['https://ceo.tinkerclaw.io/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Validate locale
  if (!routing.locales.includes(locale as 'en' | 'zh')) {
    notFound()
  }

  // Get messages for the locale
  const messages = await getMessages()

  return (
    <html lang={locale} className={notoSansSC.variable}>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
          <BackToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
