'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="w-6 h-6" /> // 占位，避免布局抖动
  }

  const currentTheme = resolvedTheme || theme

  return (
    <button
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
      className="text-on-surface-variant hover:text-on-surface transition-colors text-[20px] cursor-pointer px-2 py-1 rounded-lg hover:bg-surface-container-high"
      aria-label={currentTheme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'}
      title={currentTheme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'}
    >
      {currentTheme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
