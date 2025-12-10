/** @type {import('tailwindcss').Config} */

// 🔥 Cores adicionais permitidas dinamicamente
const extraColors = [
  "rose",
  "pink",
  "fuchsia",
  "purple",
  "violet",
];

// Tons usados nos sliders do sistema (100–900)
const extraShades = [100, 200, 300, 400, 500, 600, 700, 800, 900];

// Gera automaticamente TODAS as combinações possíveis:
// text-color-shade, hover:text-color-shade, bg-color-shade, hover:bg-color-shade
const dynamicSafelist = extraColors.flatMap(color =>
  extraShades.flatMap(shade => [
    `text-${color}-${shade}`,
    `hover:text-${color}-${shade}`,
    `bg-${color}-${shade}`,
    `hover:bg-${color}-${shade}`,
  ])
);

// Tons padrão (para red, blue, emerald, amber, slate)
const defaultShades = [100, 200, 300, 400, 500, 600, 700, 800, 900];

// Gera safelist para cores padrão
const defaultColorsSafelist = [
  "red",
  "blue",
  "emerald",
  "amber",
  "slate",
].flatMap(color =>
  defaultShades.flatMap(shade => [
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
    // 🔥 SAFELIST PARA CORES PADRÃO (Operação + Financeiro)
    // ============================================================
    ...defaultColorsSafelist,

    // Preview estático usado no Parametro.jsx
    "text-red-700",
    "text-blue-600",
    "text-emerald-600",
    "text-amber-600",
    "text-slate-700",
    "bg-red-700",
    "bg-blue-600",
    "bg-emerald-600",
    "bg-amber-600",
    "bg-slate-700",

    // ============================================================
    // 🔥 CORES ADICIONAIS (Rosa / Pink / Fuchsia / Purple / Violet)
    // 🔥 COM HOVER + BG + HOVER:BG
    // ============================================================
    ...dynamicSafelist,
  ],

  theme: {
    extend: {},
  },

  plugins: [],
};
