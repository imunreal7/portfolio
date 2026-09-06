const colors = require("./src/theme/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            fontFamily: {
                display: ["Syne", "Inter", "system-ui", "sans-serif"],
                body: ["Inter", "system-ui", "sans-serif"],
                mono: ["'JetBrains Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
            },
            colors,
            screens: { xs: "450px" },
            boxShadow: {
                glow: `0 0 0 1px ${colors.acc}40, 0 0 40px -10px ${colors.acc}73`,
                card: "0 30px 80px -30px rgba(0,0,0,0.8)",
            },
        },
    },
    plugins: [],
};
