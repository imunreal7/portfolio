// Single source of truth for every palette. CommonJS so tailwind.config.js can read it at
// build time while the app reads it at runtime; the two must never drift apart.
//
// Every theme defines the same keys. Solid colours are hex so Tailwind can apply opacity
// modifiers to them; `line` and `shadow` are full rgba values used as-is.

const midnight = {
    label: "Midnight",
    scheme: "dark",
    colors: {
        bg: "#05070c",
        surface: "#0b0f17",
        raised: "#111725",
        ink: "#e6ebf2",
        muted: "#8a94a6",
        dim: "#6b7485",
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

const ember = {
    label: "Ember",
    scheme: "dark",
    colors: {
        bg: "#0c0806",
        surface: "#150f0b",
        raised: "#211812",
        ink: "#f6ede3",
        muted: "#ab9688",
        dim: "#7f6d60",
        acc: "#ffb45e",
        acc2: "#ff6f6f",
        acc3: "#ffd66a",
        danger: "#ff4d6d",
        sky: "#f0955a",
        cyan: "#ffc98a",
        slate: "#a38d7b",
        haze: "#ffe4c4",
        line: "rgba(255,236,214,0.09)",
        shadow: "rgba(0,0,0,0.8)",
    },
};

const ocean = {
    label: "Ocean",
    scheme: "dark",
    colors: {
        bg: "#03111c",
        surface: "#071a29",
        raised: "#0c2638",
        ink: "#e4f3fc",
        muted: "#90b1c5",
        dim: "#6b899c",
        acc: "#3dd9ff",
        acc2: "#8aa4ff",
        acc3: "#ffd36e",
        danger: "#ff7a9a",
        sky: "#5cc6f8",
        cyan: "#2ee6d2",
        slate: "#8caabe",
        haze: "#caf4ff",
        line: "rgba(200,235,255,0.09)",
        shadow: "rgba(0,0,0,0.8)",
    },
};

const paper = {
    label: "Paper",
    scheme: "light",
    colors: {
        bg: "#f5f2ea",
        surface: "#fbf9f4",
        raised: "#ebe6da",
        ink: "#151a24",
        muted: "#56606f",
        dim: "#7d8592",
        acc: "#0e8f6f",
        acc2: "#6a4fd8",
        acc3: "#b8720a",
        danger: "#cf2f57",
        sky: "#1f5fd0",
        cyan: "#0a8fa3",
        slate: "#5e6b7a",
        haze: "#0b7a86",
        line: "rgba(20,24,32,0.12)",
        shadow: "rgba(20,24,32,0.25)",
    },
};

const THEMES = { midnight, ember, ocean, paper };
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
