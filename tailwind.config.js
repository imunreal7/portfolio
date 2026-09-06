const plugin = require("tailwindcss/plugin");
const { THEMES, DEFAULT_THEME, SOLID_KEYS, channels } = require("./src/theme/themes");

// Every colour utility reads a CSS variable, so switching `data-theme` on <html> restyles
// the whole site without a rebuild. Solid colours expose "r g b" channels for opacity
// modifiers; `line` and `shadow` are used verbatim.
const colors = Object.fromEntries(
    SOLID_KEYS.map((key) => [key, `rgb(var(--c-${key}) / <alpha-value>)`]),
);
colors.line = "var(--line)";

const themeVars = (theme) => ({
    ...Object.fromEntries(
        SOLID_KEYS.flatMap((key) => [
            [`--c-${key}`, channels(theme.colors[key])],
            [`--${key}`, theme.colors[key]],
        ]),
    ),
    "--line": theme.colors.line,
    "--shadow": theme.colors.shadow,
    "color-scheme": theme.scheme,
});

const themes = plugin(({ addBase }) => {
    addBase({
        ":root": themeVars(THEMES[DEFAULT_THEME]),
        ...Object.fromEntries(
            Object.entries(THEMES).map(([key, theme]) => [
                `[data-theme="${key}"]`,
                themeVars(theme),
            ]),
        ),
    });
});

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
                glow: "0 0 0 1px rgb(var(--c-acc) / 0.25), 0 0 40px -10px rgb(var(--c-acc) / 0.45)",
                card: "0 30px 80px -30px var(--shadow)",
            },
        },
    },
    plugins: [themes],
};
