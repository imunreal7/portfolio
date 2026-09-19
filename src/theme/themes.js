// ─── Themes ──────────────────────────────────────────────────────────

// Single source of truth for every palette. CommonJS so tailwind.config.js can read it at
// build time while the app reads it at runtime; the two must never drift apart.
//
// Every theme defines the same keys. Solid colours are hex so Tailwind can apply opacity
// modifiers to them; `line` and `shadow` are full rgba values used as-is.

// The original. Dark, mint and violet. On-call at 2 a.m. energy.
const midnight = {
    label: "Midnight",
    scheme: "dark",
    colors: {
        bg: "#05070c",
        surface: "#0b0f17",
        raised: "#111725",
        ink: "#e6ebf2",
        muted: "#8a94a6",
        dim: "#788295",
        acc: "#7df9d0",
        acc2: "#a78bfa",
        acc3: "#f5b544",
        danger: "#fb7185",
        sky: "#60a5fa",
        cyan: "#22d3ee",
        slate: "#94a3b8",
        haze: "#b8f5ff",
        line: "rgba(255,255,255,0.08)",
        shadow: "rgba(0,0,0,0.8)",
    },
};

// Midnight in daylight: the same mint and violet on a cool, soft grey-blue base,
// kept a step below white so it is easy on the eyes without going dull.
const daylight = {
    label: "Daylight",
    scheme: "light",
    colors: {
        bg: "#e0e4ec",
        surface: "#e9ecf2",
        raised: "#d3d8e3",
        ink: "#151b2b",
        muted: "#4b5567",
        dim: "#535d71",
        acc: "#0f8a6c",
        acc2: "#6a51d6",
        acc3: "#a86800",
        danger: "#c9345a",
        sky: "#2a5fd6",
        cyan: "#14889e",
        slate: "#5a6a80",
        haze: "#2f9fb4",
        line: "rgba(21,27,43,0.11)",
        shadow: "rgba(21,27,43,0.16)",
    },
};

const THEMES = { midnight, daylight };
const THEME_KEYS = Object.keys(THEMES);
const DEFAULT_THEME = "midnight";

/** Keys whose values are solid hex colours and therefore get "r g b" channel variables. */
const SOLID_KEYS = Object.keys(midnight.colors).filter((k) => k !== "line" && k !== "shadow");

/** "#rrggbb" → "r g b", the form Tailwind needs for opacity modifiers. */
const channels = (hex) => {
    const n = parseInt(hex.slice(1), 16);
    return `${n >> 16} ${(n >> 8) & 255} ${n & 255}`;
};

module.exports = { THEMES, THEME_KEYS, DEFAULT_THEME, SOLID_KEYS, channels };
