/** @type {import('tailwindcss').Config} */

// 🔥 Cores adicionais que você quer liberar dinamicamente
const extraColors = [
  "rose",
  "pink",
  "fuchsia",
  "purple",
  "violet",
];

// Tons que você usa no slider do Parametro.jsx
const extraShades = [100, 200, 300, 400, 500, 600, 700, 800, 900];

// Gera automaticamente TODAS as combinações:
// text-pink-700, hover:text-rose-900, bg-fuchsia-600, hover:bg-violet-800…
const dynamicSafelist = extraColors.flatMap(color =>
  extraShades.flatMap(shade => [
    `text-${color}-${shade}`,
    `hover:text-${color}-${shade}`,
    `bg-${color}-${shade}`,
    `hover:bg-${color}-${shade}`,
  ])
);

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  safelist: [
    // ============================================================
    // 🔥 SAFELIST ORIGINAL — Mantido para 100% de compatibilidade
    // ============================================================

    // Texto dos ícones
    "text-red-700",
    "text-blue-600",
    "text-emerald-600",
    "text-amber-600",
    "text-slate-700",

    // Tons extras (100–900) — Vermelho
    ...["100", "200", "300", "400", "500", "600", "700", "800", "900"]
      .map(n => `text-red-${n}`),

    // Azul
    ...["100", "200", "300", "400", "500", "600", "700", "800", "900"]
      .map(n => `text-blue-${n}`),

    // Verde (emerald)
    ...["100", "200", "300", "400", "500", "600", "700", "800", "900"]
      .map(n => `text-emerald-${n}`),

    // Laranja (amber)
    ...["100", "200", "300", "400", "500", "600", "700", "800", "900"]
      .map(n => `text-amber-${n}`),

    // Cinza (slate)
    ...["100", "200", "300", "400", "500", "600", "700", "800", "900"]
      .map(n => `text-slate-${n}`),

    // Preview
    "bg-red-700",
    "bg-blue-600",
    "bg-emerald-600",
    "bg-amber-600",
    "bg-slate-700",

    // ============================================================
    // 🔥 CORES NOVAS — ROSA, PINK, ROSE, PURPLE, VIOLET, FUCHSIA
    // 🔥 COM HOVER + BG + HOVER:BG
    // ============================================================
    ...dynamicSafelist,
  ],

  theme: {
    extend: {},
  },

  plugins: [],
};
