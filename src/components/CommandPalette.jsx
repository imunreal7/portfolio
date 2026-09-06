// ─── Command palette ─────────────────────────────────────────────────
// Cmd/Ctrl+K. Jump to sections, open links, copy the email, switch themes.
// Built for the kind of visitor who reaches for the keyboard before the mouse.
// You know who you are. Hello.

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    FiSearch,
    FiCornerDownLeft,
    FiExternalLink,
    FiHash,
    FiCopy,
    FiDroplet,
} from "react-icons/fi";
import { navLinks } from "../constants";
import { links, profile } from "../data/profile";
import { EASE } from "../utils/motion";
import { THEMES, THEME_KEYS } from "../theme/themes";
import { useTheme } from "./Theme";

const PaletteContext = createContext({ open: () => {}, close: () => {} });
export const usePalette = () => useContext(PaletteContext);

const buildActions = (close, setTheme) => [
    ...navLinks.map((n) => ({
        id: `go-${n.id}`,
        group: "Jump to",
        label: n.title,
        hint: `#${n.id}`,
        icon: FiHash,
        run: () => {
            document.getElementById(n.id)?.scrollIntoView({ behavior: "smooth" });
            close();
        },
    })),
    {
        id: "resume",
        group: "Open",
        label: "Resume",
        hint: "Google Drive",
        icon: FiExternalLink,
        href: links.resume,
    },
    {
        id: "linkedin",
        group: "Open",
        label: "LinkedIn",
        hint: "/in/amandubey7",
        icon: FiExternalLink,
        href: links.linkedin,
    },
    {
        id: "github",
        group: "Open",
        label: "GitHub",
        hint: "@imunreal7",
        icon: FiExternalLink,
        href: links.github,
    },
    {
        id: "email",
        group: "Open",
        label: "Send an email",
        hint: profile.email,
        icon: FiExternalLink,
        href: links.email,
    },
    {
        id: "whatsapp",
        group: "Open",
        label: "WhatsApp",
        hint: "wa.link",
        icon: FiExternalLink,
        href: links.whatsapp,
    },
    {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: profile.email,
        icon: FiCopy,
        run: async () => {
            try {
                await navigator.clipboard.writeText(profile.email);
            } catch (_) {
                /* clipboard unavailable: nothing else to do */
            }
            close();
        },
    },
    ...THEME_KEYS.map((key) => ({
        id: `theme-${key}`,
        group: "Theme",
        label: THEMES[key].label,
        hint: THEMES[key].scheme,
        icon: FiDroplet,
        run: () => {
            setTheme(key);
            close();
        },
    })),
];

export const PaletteProvider = ({ children }) => {
    const [isOpen, setOpen] = useState(false);
    const open = useCallback(() => setOpen(true), []);
    const close = useCallback(() => setOpen(false), []);

    useEffect(() => {
        const onKey = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setOpen((v) => !v);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    return (
        <PaletteContext.Provider value={{ open, close, isOpen }}>
            {children}
            <AnimatePresence>{isOpen && <Palette close={close} />}</AnimatePresence>
        </PaletteContext.Provider>
    );
};

const Palette = ({ close }) => {
    const [query, setQuery] = useState("");
    const [cursor, setCursor] = useState(0);
    const inputRef = useRef(null);
    const { setTheme } = useTheme();
    const actions = useMemo(() => buildActions(close, setTheme), [close, setTheme]);

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return actions;
        return actions.filter(
            (a) =>
                a.label.toLowerCase().includes(q) ||
                a.hint.toLowerCase().includes(q) ||
                a.group.toLowerCase().includes(q),
        );
    }, [actions, query]);

    useEffect(() => {
        inputRef.current?.focus();
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, []);

    useEffect(() => setCursor(0), [query]);

    const runAction = (a) => {
        if (a.href) {
            window.open(a.href, "_blank", "noopener,noreferrer");
            close();
        } else {
            a.run();
        }
    };

    const onKey = (e) => {
        if (e.key === "Escape") close();
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setCursor((c) => Math.min(results.length - 1, c + 1));
        }
        if (e.key === "ArrowUp") {
            e.preventDefault();
            setCursor((c) => Math.max(0, c - 1));
        }
        if (e.key === "Enter" && results[cursor]) runAction(results[cursor]);
    };

    let lastGroup = null;

    return (
        <motion.div
            className="glass fixed inset-0 z-[90] flex items-start justify-center bg-bg/70 px-4 pt-[12vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={close}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
        >
            <motion.div
                className="panel w-full max-w-xl overflow-hidden shadow-card"
                initial={{ y: -16, scale: 0.98, opacity: 0 }}
                animate={{ y: 0, scale: 1, opacity: 1 }}
                exit={{ y: -10, scale: 0.98, opacity: 0 }}
                transition={{ duration: 0.2, ease: EASE }}
                onMouseDown={(e) => e.stopPropagation()}
            >
                <div className="flex items-center gap-3 border-b border-line px-4 py-3">
                    <FiSearch className="h-4 w-4 text-muted" />
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={onKey}
                        placeholder="Where to? Try “experience”, “resume”, “github”…"
                        className="w-full bg-transparent font-body text-sm text-ink placeholder:text-dim focus:outline-none"
                    />
                    <kbd className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-dim">
                        esc
                    </kbd>
                </div>
                <ul className="max-h-[50vh] overflow-y-auto py-2" role="listbox">
                    {results.length === 0 && (
                        <li className="px-4 py-6 text-center font-mono text-xs text-dim">
                            no route matched “{query}”
                        </li>
                    )}
                    {results.map((a, i) => {
                        const showGroup = a.group !== lastGroup;
                        lastGroup = a.group;
                        const Icon = a.icon;
                        return (
                            <li key={a.id}>
                                {showGroup && (
                                    <div className="eyebrow px-4 pb-1 pt-3">{a.group}</div>
                                )}
                                <button
                                    type="button"
                                    role="option"
                                    aria-selected={i === cursor}
                                    onMouseEnter={() => setCursor(i)}
                                    onClick={() => runAction(a)}
                                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                                        i === cursor ? "bg-raised text-ink" : "text-muted"
                                    }`}
                                >
                                    <Icon
                                        className={`h-4 w-4 ${i === cursor ? "text-acc" : "text-dim"}`}
                                    />
                                    <span className="flex-1">{a.label}</span>
                                    <span className="font-mono text-[11px] text-dim">{a.hint}</span>
                                    {i === cursor && (
                                        <FiCornerDownLeft className="h-3.5 w-3.5 text-acc" />
                                    )}
                                </button>
                            </li>
                        );
                    })}
                </ul>
                <div className="flex items-center justify-between border-t border-line px-4 py-2 font-mono text-[10px] text-dim">
                    <span>↑↓ navigate · ↵ run</span>
                    <span>⌘K / Ctrl+K toggles</span>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default PaletteProvider;
