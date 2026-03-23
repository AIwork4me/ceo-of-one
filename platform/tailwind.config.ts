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
      // ===== 色彩系统：支持亮暗色切换 =====
      colors: {
        // 使用 CSS 变量实现亮暗色切换
        surface: {
          DEFAULT: 'var(--bg-surface)',
          dim: 'var(--bg-primary)',
          bright: 'var(--bg-container)',
          container: 'var(--bg-container)',
          'container-low': 'var(--bg-container)',
          'container-high': 'var(--bg-container)',
          'container-highest': 'var(--bg-container)',
        },

        'on-surface': 'var(--text-primary)',
        'on-surface-variant': 'var(--text-secondary)',

        outline: {
          DEFAULT: 'var(--border-color)',
          variant: 'var(--border-color)',
        },

        primary: {
          DEFAULT: '#D0BCFF',
          light: '#E8DEF8',
          dark: '#B69DF8',
          container: '#4F378B',
          'container-light': '#6750A4',
          'container-dark': '#381E72',
        },

        // M3 Semantic
        success: '#4ADE80',
        danger: '#F87171',
        warning: '#FBBF24',

        // Ant Design 灰度系统（更丰富）
        gray: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#f0f0f0',
          300: '#d9d9d9',
          400: '#bfbfbf',
          500: '#8c8c8c',
          600: '#595959',
          700: '#434343',
          800: '#262626',
          900: '#1f1f1f',
        },
      },

      // ===== 字体系统：Ant Design 中文优化 =====
      fontFamily: {
        sans: [
          'var(--font-inter)',
          'var(--font-sans)',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans SC',
          'PingFang SC',
          'Microsoft YaHei',
          'sans-serif',
        ],
      },

      // 字号系统（Ant Design 优化 + M3 层级）
      fontSize: {
        'xs': ['12px', { lineHeight: '20px', letterSpacing: '0' }],
        'sm': ['14px', { lineHeight: '22px', letterSpacing: '0' }],
        'base': ['16px', { lineHeight: '24px', letterSpacing: '0' }],
        'lg': ['18px', { lineHeight: '28px', letterSpacing: '-0.01em' }],
        'xl': ['20px', { lineHeight: '28px', letterSpacing: '-0.01em' }],
        '2xl': ['24px', { lineHeight: '32px', letterSpacing: '-0.02em' }],
        '3xl': ['30px', { lineHeight: '38px', letterSpacing: '-0.02em' }],
        '4xl': ['36px', { lineHeight: '44px', letterSpacing: '-0.03em' }],
        '5xl': ['48px', { lineHeight: '56px', letterSpacing: '-0.03em' }],
        '6xl': ['60px', { lineHeight: '72px', letterSpacing: '-0.04em' }],
        '7xl': ['72px', { lineHeight: '80px', letterSpacing: '-0.04em' }],
      },

      // ===== 间距系统：Ant Design 8px 基准 =====
      spacing: {
        '0.5': '2px',
        '1.5': '6px',
        '2.5': '10px',
        '3.5': '14px',
        '4.5': '18px',
        '18': '72px',
        '22': '88px',
        '26': '104px',
        '30': '120px',
      },

      // ===== 圆角系统：混合（M3 + Ant Design）=====
      borderRadius: {
        'none': '0',
        'sm': '4px',
        'DEFAULT': '6px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        '3xl': '24px',
        'full': '9999px',
      },

      // ===== 阴影系统：Material Design 3 =====
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'm3-card': '0 1px 3px 1px rgba(0, 0, 0, 0.15), 0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        'm3-button': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        'm3-fab': '0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12)',
        'primary-glow': '0 0 40px 0 rgba(208, 188, 255, 0.15)',
      },

      // ===== 动效系统：Material Design 3 =====
      transitionDuration: {
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },

      transitionTimingFunction: {
        'm3-standard': 'cubic-bezier(0.2, 0, 0, 1)',
        'm3-emphasized': 'cubic-bezier(0.2, 0, 0, 1)',
        'm3-decelerated': 'cubic-bezier(0, 0, 0, 1)',
        'm3-accelerated': 'cubic-bezier(0.3, 0, 1, 1)',
      },

      // ===== 响应式字体（按比例缩放）=====
      // 使用 clamp(min, preferred, max) 实现动态缩放
      // preferred 使用 vw 单位，让字体随视口宽度缩放

      // ===== 动画关键帧 =====
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 200ms m3-standard',
        'fade-in-up': 'fade-in-up 400ms m3-emphasized',
        'scale-in': 'scale-in 200ms m3-standard',
      },

      // ===== 背景渐变 =====
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}

export default config
