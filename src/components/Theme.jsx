// ─── Theme provider ──────────────────────────────────────────────────
// Owns the active theme, writes it to <html data-theme>, localStorage and the
// browser theme-colour, and hands the palette to anything that paints on canvas.
// The inline script in public/index.html applies the stored theme before React
// wakes up, so there is no flash of the wrong universe.

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_THEME, THEMES } from "../theme/themes";

export const THEME_STORAGE_KEY = "theme";

const ThemeContext = createContext({
    theme: DEFAULT_THEME,
    palette: THEMES[DEFAULT_THEME].colors,
    setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

// The inline script in public/index.html applies the stored theme before first paint;
// this reads the same key so React and the document agree from the first render.
const readStored = () => {
    try {
        const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
        return THEMES[stored] ? stored : DEFAULT_THEME;
    } catch (_) {
        return DEFAULT_THEME;
    }
};

export const ThemeProvider = ({ children }) => {
    const [theme, setThemeState] = useState(readStored);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        document
            .querySelector('meta[name="theme-color"]')
            ?.setAttribute("content", THEMES[theme].colors.bg);
        try {
            window.localStorage.setItem(THEME_STORAGE_KEY, theme);
        } catch (_) {
            /* private mode or blocked storage: the choice simply lasts for this visit */
        }
    }, [theme]);

    const setTheme = useCallback((next) => {
        if (THEMES[next]) setThemeState(next);
    }, []);

    const value = useMemo(
        () => ({ theme, palette: THEMES[theme].colors, setTheme }),
        [theme, setTheme],
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
