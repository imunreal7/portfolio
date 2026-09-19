// ─── Theme switcher ──────────────────────────────────────────────────
// Two themes, one button. Sun left, moon right, click flips Midnight to Daylight
// and back; the knob slides toward the active one. Inline in the mobile menu.

import { motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";
import { THEMES } from "../theme/themes";
import { useTheme } from "./Theme";

const NEXT = { midnight: "daylight", daylight: "midnight" };

// Sun on the left, moon on the right; the knob sits beside whichever is active.
const Knob = ({ dark }) => (
    <span
        className={`relative inline-flex h-4 w-8 shrink-0 items-center rounded-full border border-line transition-colors ${
            dark ? "bg-raised" : "bg-acc/30"
        }`}
        aria-hidden="true"
    >
        <motion.span
            layout
            transition={{ type: "spring", stiffness: 500, damping: 32 }}
            className={`absolute top-[2px] h-[10px] w-[10px] rounded-full ${dark ? "left-[16px] bg-acc2" : "left-[2px] bg-acc"}`}
        />
    </span>
);

// Inline: a flat row for the mobile menu. Default: a compact pill in the nav.
const ThemeSwitcher = ({ inline = false, onPick }) => {
    const { theme, setTheme } = useTheme();
    const dark = THEMES[theme].scheme === "dark";
    const next = NEXT[theme] ?? "midnight";
    const flip = () => {
        setTheme(next);
        onPick?.();
    };

    return (
        <button
            type="button"
            role="switch"
            aria-checked={!dark}
            aria-label={`Switch to ${THEMES[next].label} theme`}
            onClick={flip}
            className={
                inline
                    ? "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-muted transition-colors hover:bg-raised/60 hover:text-ink"
                    : "flex items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-acc/50 hover:text-acc"
            }
        >
            <FiSun className={`h-3.5 w-3.5 ${dark ? "opacity-50" : "text-acc"}`} />
            <Knob dark={dark} />
            <FiMoon className={`h-3.5 w-3.5 ${dark ? "text-acc2" : "opacity-50"}`} />
            {inline && <span className="flex-1">{dark ? "Light mode" : "Dark mode"}</span>}
        </button>
    );
};

export default ThemeSwitcher;
