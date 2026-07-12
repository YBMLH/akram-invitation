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
        noir: '#171310',
        gold: '#C2A87E',
        champagne: '#E9DABB',
      },
      fontFamily: {
        display: ['Amiri', '"Cormorant Garamond"', 'serif'],
        body: ['Tajawal', 'Jost', 'system-ui', 'sans-serif'],
        script: ['"Great Vibes"', '"Aref Ruqaa"', 'cursive'],
        ruqaa: ['"Aref Ruqaa"', 'Amiri', 'serif'],
        latin: ['"Cormorant Garamond"', 'serif'],
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
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        spinSlow: 'spinSlow 70s linear infinite',
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
}
