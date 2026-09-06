/**
 * "#rrggbb" plus an alpha → "rgba(r,g,b,a)". Canvas code paints with literal values, so it
 * needs this instead of Tailwind's opacity modifiers.
 * @param {string} hex
 * @param {number} alpha 0..1
 * @returns {string}
 */
export const hexAlpha = (hex, alpha) => {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${alpha})`;
};

/**
 * "#rrggbb" → [r, g, b] scaled to 0..1, the form a WebGL uniform expects.
 * @param {string} hex
 * @returns {[number, number, number]}
 */
export const hexToVec = (hex) => {
    const n = parseInt(hex.slice(1), 16);
    return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};
