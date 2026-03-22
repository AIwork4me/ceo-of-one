import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          dim: 'var(--surface-dim)',
          DEFAULT: 'var(--surface)',
          container: 'var(--surface-container)',
          high: 'var(--surface-container-high)',
          highest: 'var(--surface-container-highest)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          container: 'var(--primary-container)',
          'container-high': 'var(--primary-container-high)',
          on: 'var(--on-primary)',
        },
        onsurface: {
          DEFAULT: 'var(--on-surface)',
          variant: 'var(--on-surface-variant)',
        },
        outline: {
          DEFAULT: 'var(--outline)',
          variant: 'var(--outline-variant)',
        },
        success: 'var(--success)',
        danger: 'var(--danger)',
        warning: 'var(--warning)',
        dark: {
          bg: 'var(--surface-dim)',
          card: 'var(--surface-container)',
        },
        accent: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-container)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'm3-1': '0 1px 3px rgba(0,0,0,0.12)',
        'm3-2': '0 4px 8px rgba(0,0,0,0.12)',
        'm3-3': '0 8px 24px rgba(0,0,0,0.16)',
      },
      borderRadius: {
        'm3-sm': '8px',
        'm3-md': '12px',
        'm3-lg': '16px',
        'm3-xl': '28px',
      },
    },
  },
  plugins: [],
}
export default config
