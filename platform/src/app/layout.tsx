import type { Metadata } from 'next'
import { Noto_Sans_SC } from 'next/font/google'
import './globals.css'

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    default: 'CEO of One — Build Real Products Without Writing Code',
    template: '%s | CEO of One',
  },
  description: '2026 年，一个人就是一家公司。不需要学编程，不需要组建团队。OpenClaw 当 COO，Claude Code 当工程师，你说一句话，他们把产品做出来。',
  keywords: ['AI', 'no-code', 'one-person company', 'OpenClaw', 'Claude Code', 'solo founder', 'indie hacker', 'knowledge platform', 'tutorial', 'Next.js'],
  authors: [{ name: 'AIwork4me', url: 'https://github.com/AIwork4me' }],
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    alternateLocale: 'en_US',
    url: 'https://ceo.tinkerclaw.io',
    siteName: 'CEO of One',
    title: 'CEO of One — Build Real Products Without Writing Code',
    description: 'One person, one company. AI builds it; you own 100%. 11 chapters, 111 tests, battle-tested methodology.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CEO of One — Build Real Products Without Writing Code',
    description: 'One person, one company. AI builds it; you own 100%.',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={notoSansSC.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
