/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(42, 255, 142, 0.18)',
        mint: '0 0 80px rgba(0, 255, 178, 0.16)',
      },
      colors: {
        pulse: '#2AFF8E',
        mint: '#6DFFD2',
        hot: '#FF3FB4',
        vault: '#07110D',
        ink: '#05070A',
      },
      backgroundImage: {
        'grid-fade': 'linear-gradient(rgba(109,255,210,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(109,255,210,0.06) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
