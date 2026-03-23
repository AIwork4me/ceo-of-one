'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // [DEBUG] 检查初始状态
    console.log('[ThemeToggle] Mounted - theme:', theme, 'resolvedTheme:', resolvedTheme)
    console.log('[ThemeToggle] localStorage.theme:', localStorage.getItem('theme'))
    console.log('[ThemeToggle] html classes:', document.documentElement.className)
  }, [])

  useEffect(() => {
    // [DEBUG] 监控主题变化
    console.log('[ThemeToggle] Theme changed - theme:', theme, 'resolvedTheme:', resolvedTheme)
    console.log('[ThemeToggle] localStorage.theme:', localStorage.getItem('theme'))
    console.log('[ThemeToggle] html classes:', document.documentElement.className)
  }, [theme, resolvedTheme])

  if (!mounted) {
    return <div className="w-6 h-6" /> // 占位，避免布局抖动
  }

  const currentTheme = resolvedTheme || theme

  const handleToggle = () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
    console.log('[ThemeToggle] Clicking - current:', currentTheme, '-> new:', newTheme)
    setTheme(newTheme)
    
    // [DEBUG] 500ms 后检查状态
    setTimeout(() => {
      console.log('[ThemeToggle] After 500ms:')
      console.log('  - theme:', theme)
      console.log('  - resolvedTheme:', resolvedTheme)
      console.log('  - localStorage.theme:', localStorage.getItem('theme'))
      console.log('  - html.className:', document.documentElement.className)
    }, 500)
  }

  return (
    <button
      onClick={handleToggle}
      className="text-on-surface-variant hover:text-on-surface transition-colors text-[20px] cursor-pointer px-2 py-1 rounded-lg hover:bg-surface-container-high"
      aria-label={currentTheme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'}
      title={currentTheme === 'dark' ? '切换到亮色模式' : '切换到暗色模式'}
    >
      {currentTheme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}
