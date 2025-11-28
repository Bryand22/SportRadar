/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'open-sans': ['Open Sans', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'], // Ajout d'une nouvelle police
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe', // Ajout d'une teinte supplémentaire
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1', // Ajout d'une teinte supplémentaire
        },
        secondary: {
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9', // Ajout d'une teinte supplémentaire
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          500: '#f97316',
          600: '#ea580c',
          800: '#9a3412',
        },
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
        },
        highlight: {
          DEFAULT: '#80CBC4',
        },
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'button': '0 2px 4px rgba(0, 0, 0, 0.1)', // Ajout d'une ombre pour les boutons
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out', // Ajout d'une nouvelle animation
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
