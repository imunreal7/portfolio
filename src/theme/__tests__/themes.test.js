const { THEMES, THEME_KEYS, DEFAULT_THEME, SOLID_KEYS, channels } = require("../themes");

const HEX = /^#[0-9a-f]{6}$/;
const RGBA = /^rgba\(\d+,\d+,\d+,(0|1|0?\.\d+)\)$/;

const luminance = (hex) => {
    const [r, g, b] = channels(hex)
        .split(" ")
        .map((c) => {
            const v = Number(c) / 255;
            return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
        });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const contrast = (a, b) => {
    const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
    return (hi + 0.05) / (lo + 0.05);
};

describe("themes", () => {
    const reference = Object.keys(THEMES[DEFAULT_THEME].colors).sort();

    test("the default theme exists and has a label and scheme", () => {
        expect(THEME_KEYS).toContain(DEFAULT_THEME);
        THEME_KEYS.forEach((key) => {
            expect(THEMES[key].label).toBeTruthy();
            expect(["dark", "light"]).toContain(THEMES[key].scheme);
        });
    });

    test("every theme defines exactly the same colour keys", () => {
        THEME_KEYS.forEach((key) => {
            expect(Object.keys(THEMES[key].colors).sort()).toEqual(reference);
        });
    });

    test("solid colours are 6-digit hex and line/shadow are rgba", () => {
        THEME_KEYS.forEach((key) => {
            const { colors } = THEMES[key];
            SOLID_KEYS.forEach((k) => expect(colors[k]).toMatch(HEX));
            expect(colors.line).toMatch(RGBA);
            expect(colors.shadow).toMatch(RGBA);
        });
    });

    test("body text and accents stay readable on the background", () => {
        THEME_KEYS.forEach((key) => {
            const { colors } = THEMES[key];
            expect(contrast(colors.ink, colors.bg)).toBeGreaterThanOrEqual(7); // WCAG AAA
            expect(contrast(colors.muted, colors.bg)).toBeGreaterThanOrEqual(4.5); // AA
            ["acc", "acc2", "acc3"].forEach((k) =>
                expect(contrast(colors[k], colors.bg)).toBeGreaterThanOrEqual(3),
            );
        });
    });

    test("channels() turns hex into Tailwind's space-separated form", () => {
        expect(channels("#7df9d0")).toBe("125 249 208");
        expect(channels("#000000")).toBe("0 0 0");
    });
});
