/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0F9F4',
          100: '#DCEFE3',
          200: '#BFE1CE',
          300: '#9BD0B4',
          400: '#6FB895',
          500: '#4D9E76',
          600: '#2D6A4F', // Primary
          700: '#295F47',
          800: '#1E4031',
          900: '#152D23',
          950: '#0C1A14',
        },
        secondary: {
          50: '#EFFCF6',
          100: '#D7F5E7',
          200: '#B7EACF',
          300: '#8FDDB3',
          400: '#68CA93',
          500: '#40916C', // Secondary
          600: '#3A7A5F',
          700: '#2C604A',
          800: '#1F473A',
          900: '#162F26',
          950: '#0C1A16',
        },
        accent: {
          50: '#F2FBF7',
          100: '#E8F8F1',
          200: '#D7F3E7',
          300: '#B7E4C7', // Accent
          400: '#95D5B2',
          500: '#74C69D',
          600: '#52B788',
          700: '#40916C',
          800: '#2D6A4F',
          900: '#1B4332',
          950: '#0F2B21',
        },
        success: {
          500: '#10B981',
          600: '#059669',
        },
        warning: {
          500: '#F97316',
          600: '#EA580C',
        },
        error: {
          500: '#EF4444',
          600: '#DC2626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};