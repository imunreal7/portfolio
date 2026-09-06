import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck, FiDroplet } from "react-icons/fi";
import { THEMES, THEME_KEYS } from "../theme/themes";
import { useTheme } from "./Theme";

// Three-dot preview of a theme: background, primary and secondary accents.
const Swatch = ({ colors }) => (
    <span className="flex items-center -space-x-1" aria-hidden="true">
        {[colors.bg, colors.acc, colors.acc2].map((c, i) => (
            <span
                key={i}
                className="h-3 w-3 rounded-full ring-1 ring-line"
                style={{ background: c }}
            />
        ))}
    </span>
);

const ThemeList = ({ onPick }) => {
    const { theme, setTheme } = useTheme();
    return (
        <ul role="listbox" aria-label="Theme" className="flex flex-col gap-1">
            {THEME_KEYS.map((key) => {
                const on = key === theme;
                return (
                    <li key={key}>
                        <button
                            type="button"
                            role="option"
                            aria-selected={on}
                            onClick={() => {
                                setTheme(key);
                                onPick?.();
                            }}
                            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                                on
                                    ? "bg-raised text-ink"
                                    : "text-muted hover:bg-raised/60 hover:text-ink"
                            }`}
                        >
                            <Swatch colors={THEMES[key].colors} />
                            <span className="flex-1">{THEMES[key].label}</span>
                            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-dim">
                                {THEMES[key].scheme}
                            </span>
                            {on && <FiCheck className="text-acc" aria-hidden="true" />}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

// Inline: a flat list for the mobile menu. Default: a nav button with a popover.
const ThemeSwitcher = ({ inline = false, onPick }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    const { theme } = useTheme();

    useEffect(() => {
        if (!open) return undefined;
        const onKey = (e) => e.key === "Escape" && setOpen(false);
        const onDown = (e) => !ref.current?.contains(e.target) && setOpen(false);
        window.addEventListener("keydown", onKey);
        window.addEventListener("pointerdown", onDown);
        return () => {
            window.removeEventListener("keydown", onKey);
            window.removeEventListener("pointerdown", onDown);
        };
    }, [open]);

    if (inline) return <ThemeList onPick={onPick} />;

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-label={`Theme: ${THEMES[theme].label}`}
                className="flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-acc/50 hover:text-acc"
            >
                <FiDroplet className="h-3.5 w-3.5" />
                <Swatch colors={THEMES[theme].colors} />
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.18 }}
                        className="panel glass absolute right-0 top-[calc(100%+10px)] w-56 p-2 shadow-card"
                    >
                        <ThemeList onPick={() => setOpen(false)} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ThemeSwitcher;
