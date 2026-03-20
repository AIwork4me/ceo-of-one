import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      chapters: 10,
      tests: 111,
      modules: 4,
      url: 'https://ceo-of-one-seven.vercel.app',
      journey: [
        { chapter: 0, title: 'Environment Setup', achievement: '1 tool installed' },
        { chapter: 1, title: 'The COO Soul', achievement: '1 configuration file' },
        { chapter: 2, title: 'Precision Matters', achievement: '3 versions compared' },
        { chapter: 3, title: 'Quality Checklist', achievement: 'acceptance criteria that works' },
        { chapter: 4, title: 'Landing Page', achievement: 'your brand, live' },
        { chapter: 5, title: 'Authentication', achievement: 'users can register' },
        { chapter: 6, title: 'Payments', achievement: 'your product earns money' },
        { chapter: 7, title: 'Bug Fixes', achievement: 'saying fix it and it gets fixed' },
        { chapter: 8, title: 'Deployment', achievement: 'the world can see you' },
        { chapter: 9, title: 'Dashboard', achievement: 'know your numbers' },
      ],
    },
  })
}
