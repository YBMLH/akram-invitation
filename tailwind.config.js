/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F8F4EC',
        beige: '#D8C3A5',
        ivory: '#FFFDF8',
        ink: '#111111',
        taupe: '#8C8072',
        'beige-deep': '#B9A17E',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['Jost', 'system-ui', 'sans-serif'],
        script: ['"Dancing Script"', 'cursive'],
      },
      letterSpacing: {
        luxe: '0.35em',
        wide2: '0.22em',
      },
      keyframes: {
        spinSlow: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        spinSlow: 'spinSlow 60s linear infinite',
        shimmer: 'shimmer 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
