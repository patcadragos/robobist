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
        orange: '#F36D21',
        gray: '#545554',
        'light-bg': '#F5F5F5',
        surface: '#FAFAFA',
        border: '#E8E8E8',
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      fontSize: {
        'spec-num': ['48px', { letterSpacing: '-0.03em', fontWeight: '700' }],
      },
      backgroundImage: {
        'hero-blob': `
          radial-gradient(ellipse 80% 60% at 75% 45%, rgba(243,109,33,0.15) 0%, transparent 70%),
          radial-gradient(ellipse 50% 50% at 15% 75%, rgba(243,109,33,0.08) 0%, transparent 60%),
          radial-gradient(ellipse 35% 35% at 85% 15%, rgba(0,0,0,0.03) 0%, transparent 50%)
        `,
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
        'float-delay': 'float 3s ease-in-out 0.3s infinite',
        'float-delay2': 'float 3s ease-in-out 0.6s infinite',
        pulse: 'pulse-ring 2s infinite',
        'bounce-slow': 'bounce 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.5' },
          '70%': { transform: 'scale(1.4)', opacity: '0' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
