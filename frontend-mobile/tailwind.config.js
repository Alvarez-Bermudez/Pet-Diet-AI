/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#ff6f61" /* Coral suave – amor y calidez */,
        secondary: "#ffd166" /* Amarillo pastel – energía y apetito */,
        accent: "#6c63ff" /* Azul violeta – tecnología/IA */,
        background: "#fff8f1" /* Fondo cálido, crema claro */,
        surface: "#ffffff" /* Tarjetas, contenedores */,
        textPrimary: "#333333" /* Texto fuerte */,
        textSecondary: "#7d7d7d" /* Texto suave */,
        textTertiary: "#C5C5C5",
        success: "#00c49a" /* Éxito o progreso (sin usar verde clásico) */,
        error: "#ef5350" /* Rojo coral – errores */,
      },
      fontFamily: {
        bodyBase: ["Nunito_400Regular"],
        buttonText: ["Nunito_500Medium"],
        caption: ["Nunito_400Regular"],
        h1: ["Nunito_400Regular"],
        h2: ["Nunito_400Regular"],
        h3: ["Nunito_400Regular"],
        small: ["Nunito_400Regular"],
      },
      fontSize: {
        bodyBase: 16,
        buttonText: 16,
        caption: 12,
        h1: 32,
        h2: 24,
        h3: 20,
        small: 14,
      },
    },
  },
  plugins: [],
};
