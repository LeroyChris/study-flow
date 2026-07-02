/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // NEW clean hierarchy (use these going forward)
        brand: {
          primary:        '#2563EB',
          'primary-hover': '#1d4ed8',
          'primary-light': '#eff6ff',
          teal:           '#4F7C82',
          warm:           '#f4f3ef',
          dark:           '#0B2E33',
          footer:         '#111319',
        },
        // OLD names — kept so existing code still works
        'brand-blue':   '#2563EB',
        'brand-purple': '#6d00e7',
        'brand-teal':   '#4F7C82',
        'brand-warm':   '#f4f3ef',
        'brand-dark':   '#0B2E33',
        'brand-footer': '#111319',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          'from': { transform: 'translateX(0%)' },
          'to': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
}
