/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#0B2E33',
        'brand-blue': '#2563EB',
        'brand-teal': '#4F7C82',
        'brand-footer': '#111319',
        'brand-purple': '#6d00e7',
        'brand-warm': '#f4f3ef',
        'brand-mist': '#F8FAFB',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'Jakarta': ['"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
