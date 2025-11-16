/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  // 🔥 SAFELIST - Garante que as cores dinâmicas sejam geradas
  safelist: [
    // Texto dos ícones
    "text-red-700",
    "text-blue-600",
    "text-emerald-600",
    "text-amber-600",
    "text-slate-700",

    // Tons extras (pois você usa slider 100–900)
    "text-red-100",
    "text-red-200",
    "text-red-300",
    "text-red-400",
    "text-red-500",
    "text-red-600",
    "text-red-700",
    "text-red-800",
    "text-red-900",

    "text-blue-100",
    "text-blue-200",
    "text-blue-300",
    "text-blue-400",
    "text-blue-500",
    "text-blue-600",
    "text-blue-700",
    "text-blue-800",
    "text-blue-900",

    "text-emerald-100",
    "text-emerald-200",
    "text-emerald-300",
    "text-emerald-400",
    "text-emerald-500",
    "text-emerald-600",
    "text-emerald-700",
    "text-emerald-800",
    "text-emerald-900",

    "text-amber-100",
    "text-amber-200",
    "text-amber-300",
    "text-amber-400",
    "text-amber-500",
    "text-amber-600",
    "text-amber-700",
    "text-amber-800",
    "text-amber-900",

    "text-slate-100",
    "text-slate-200",
    "text-slate-300",
    "text-slate-400",
    "text-slate-500",
    "text-slate-600",
    "text-slate-700",
    "text-slate-800",
    "text-slate-900",

    // Preview (bg)
    "bg-red-700",
    "bg-blue-600",
    "bg-emerald-600",
    "bg-amber-600",
    "bg-slate-700",
  ],

  theme: {
    extend: {},
  },
  plugins: [],
};
