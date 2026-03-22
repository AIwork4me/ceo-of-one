import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Dark mode colors (default)
        surface: {
          dim: '#0f0f0f',
          DEFAULT: '#1C1B1F',
          container: '#211F26',
          high: '#2B2930',
          highest: '#36343B',
        },
        primary: {
          DEFAULT: '#d0bcff',
          container: '#4F378B',
        },
        onsurface: {
          DEFAULT: '#E6E1E5',
          variant: '#CAC4D0',
        },
        outline: {
          DEFAULT: '#938F99',
          variant: '#49454F',
        },
        success: '#8BD3A8',
        danger: '#F2B8B5',
        warning: '#F9CB9C',
        // Legacy tokens for other pages
        dark: {
          bg: '#0f0f0f',
          card: '#211F26',
        },
        accent: {
          DEFAULT: '#d0bcff',
          hover: '#b69df8',
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
