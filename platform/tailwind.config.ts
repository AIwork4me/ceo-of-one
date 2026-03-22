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
        // Light mode tokens
        'light-surface-dim': '#DED8E1',
        'light-surface': '#FFFBFE',
        'light-surface-container': '#F3EDF7',
        'light-surface-high': '#ECE6F0',
        'light-surface-highest': '#E6E0E9',
        'light-primary': '#6750A4',
        'light-primary-container': '#EADDFF',
        'light-primary-on': '#21005D',
        'light-onsurface': '#1C1B1F',
        'light-onsurface-variant': '#49454F',
        'light-outline': '#79747E',
        'light-outline-variant': '#CAC4D0',
        'light-success': '#006C4E',
        'light-danger': '#BA1A1A',
        'light-warning': '#8B5000',
        // Legacy tokens — keep for other pages (auth, courses, dashboard, etc.)
        dark: {
          bg: '#0f0f0f',
          card: '#1a1a1e',
        },
        accent: {
          DEFAULT: '#d0bcff',
          hover: '#b69df8',
        },
        // M3 Design Tokens
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
          'container-high': '#5A4694',
          on: '#381E72',
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
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'm3-1': '0 1px 3px rgba(0,0,0,0.3)',
        'm3-2': '0 4px 8px rgba(0,0,0,0.3)',
        'm3-3': '0 8px 24px rgba(0,0,0,0.4)',
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
