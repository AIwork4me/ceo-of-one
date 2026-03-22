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
        // M3 Surface & Container
        surface: {
          DEFAULT: '#1C1B1F',
          container: '#211F26',
          'container-high': '#2B2930',
          'container-highest': '#36343B',
        },
        // M3 Primary
        primary: {
          DEFAULT: '#D0BCFF',
          container: '#4F378B',
          'container-high': '#5A4694',
        },
        // M3 On-Surface
        'on-surface': '#E6E1E5',
        'on-surface-variant': '#CAC4D0',
        // M3 Outline
        'outline': '#938F99',
        'outline-variant': '#49454F',
        // M3 Semantic
        success: '#6DD58C',
        danger: '#F2B8B5',
        warning: '#F9DEB1',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
