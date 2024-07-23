/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'primary': '#0f172a',
      'secondary': '#6d28d9',
      'tertiary': '#1e293b',
      'dipricate': '#475569',
      'white': '#ffffff'
    },
    fontFamily: {
      sans: ['Segoe UI', 'sans-serif'],
      serif: ['Segoe UI', 'serif'],
    },
    extend: {
    }
  },
  plugins: ["tailwindcss ,autoprefixer"],
}

