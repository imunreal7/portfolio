import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCommand, FiMenu, FiX } from "react-icons/fi";
import { navLinks } from "../constants";
import { profile } from "../data/profile";
import { usePalette } from "./CommandPalette";
import { useActiveSection } from "../hooks/useActiveSection";
import { useScrollProgress } from "../hooks/useScrollProgress";

const IDS = navLinks.map((n) => n.id);

const Nav = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menu, setMenu] = useState(false);
    const active = useActiveSection(IDS);
    const { open } = usePalette();
    const progress = useScrollProgress();

    useEffect(() => {
        if (!menu) return undefined;
        const onKey = (e) => e.key === "Escape" && setMenu(false);
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [menu]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <motion.div
                className="fixed inset-x-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-acc via-acc2 to-acc3"
                style={{ scaleX: progress }}
            />
            <header
                className={`fixed inset-x-0 top-0 z-[65] transition-all duration-500 ${
                    scrolled || menu ? "glass bg-bg/75" : "bg-transparent"
                }`}
            >
                <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-6 sm:px-10">
                    <a href="#top" className="flex items-center gap-3" aria-label="Back to top">
                        <img
                            src={profile.logo}
                            alt=""
                            className="h-7 w-auto"
                            width={580}
                            height={405}
                        />
                        <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-muted md:inline">
                            {profile.name}
                        </span>
                    </a>

                    <ul className="hidden items-center gap-1 lg:flex">
                        {navLinks.map((n) => {
                            const isActive = active === n.id;
                            return (
                                <li key={n.id}>
                                    <a
                                        href={`#${n.id}`}
                                        className={`relative rounded-full px-3 py-1.5 text-sm transition-colors ${
                                            isActive ? "text-ink" : "text-muted hover:text-ink"
                                        }`}
                                    >
                                        {isActive && (
                                            <motion.span
                                                layoutId="nav-pill"
                                                className="absolute inset-0 rounded-full bg-raised"
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 380,
                                                    damping: 32,
                                                }}
                                            />
                                        )}
                                        <span className="relative">{n.title}</span>
                                    </a>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={open}
                            className="hidden items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-acc/50 hover:text-acc sm:flex"
                        >
                            <FiCommand className="h-3.5 w-3.5" /> K
                        </button>
                        <button
                            type="button"
                            onClick={() => setMenu((v) => !v)}
                            className="rounded-full border border-line p-2 text-ink lg:hidden"
                            aria-label={menu ? "Close menu" : "Open menu"}
                            aria-expanded={menu}
                            aria-controls="mobile-menu"
                        >
                            {menu ? <FiX /> : <FiMenu />}
                        </button>
                    </div>
                </nav>

                <AnimatePresence>
                    {menu && (
                        <motion.div
                            id="mobile-menu"
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="border-t border-line bg-bg/95 px-6 py-4 lg:hidden"
                        >
                            <ul className="flex flex-col">
                                {navLinks.map((n, i) => (
                                    <li key={n.id}>
                                        <a
                                            href={`#${n.id}`}
                                            onClick={() => setMenu(false)}
                                            className="flex items-center justify-between border-b border-line py-3 text-base text-ink"
                                        >
                                            <span>{n.title}</span>
                                            <span className="font-mono text-[10px] text-dim">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                        </a>
                                    </li>
                                ))}
                                <li className="pt-3">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setMenu(false);
                                            open();
                                        }}
                                        className="flex items-center gap-2 font-mono text-xs text-muted"
                                    >
                                        <FiCommand /> command palette
                                    </button>
                                </li>
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    );
};

export default Nav;
