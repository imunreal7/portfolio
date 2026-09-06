// Single source of truth for the palette. Consumed by tailwind.config.js (CommonJS) and by
// canvas code that has to paint with literal values.
const colors = {
    bg: "#05070c",
    surface: "#0b0f17",
    raised: "#111725",
    line: "rgba(255,255,255,0.08)",
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
};

module.exports = colors;
