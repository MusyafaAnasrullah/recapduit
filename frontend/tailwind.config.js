/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#b9ddfe',
          300: '#7cc2fd',
          400: '#38a2fa',
          500: '#0ea5e9', // Bright vivid blue/sky matching logo
          600: '#0284c7', // Primary button & active
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          deep: '#034375',
        },
        accent: {
          blue: '#1d4ed8',
          vivid: '#2563eb',
          light: '#e0f2fe',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px -2px rgba(2, 132, 199, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)',
        'card': '0 4px 20px -2px rgba(12, 74, 110, 0.06), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'float': '0 20px 35px -10px rgba(2, 132, 199, 0.2), 0 10px 15px -5px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 25px -5px rgba(14, 165, 233, 0.4)',
      }
    },
  },
  plugins: [],
}
