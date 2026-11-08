
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['DM Sans', 'sans-serif'],
      },

      colors: {
        primary: {
          50: '#F5F0FA',
          100: '#E9DDF5',
          200: '#D3BCEB',
          300: '#B794DB',
          400: '#9669C5',
          500: '#7543A8',
          600: '#60358E',
          700: '#4B2873',
          800: '#371D57',
          900: '#26143F',
          950: '#170B29',
        },

        gold: {
          50: '#FBF8EB',
          100: '#F5EDC9',
          200: '#EBDD98',
          300: '#DFC765',
          400: '#D4AF37',
          500: '#C19A27',
          600: '#A47B1E',
          700: '#805C1B',
          800: '#624619',
          900: '#493416',
        },

        royal: {
          navy: '#111827',
          purple: '#371D57',
          ivory: '#FAF8F3',
          cream: '#F3EEE3',
          charcoal: '#24212A',
        },
      },

      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },

        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },

        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },

        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },

        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },

  plugins: [],
};
