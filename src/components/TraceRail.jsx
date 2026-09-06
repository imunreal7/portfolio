// ─── Trace rail ──────────────────────────────────────────────────────
// The vertical dot rail on the left: one stop per section, current stop lit,
// like a request trace across services. The whole page is a span, really.

import { motion } from "framer-motion";
import { navLinks } from "../constants";
import { useActiveSection } from "../hooks/useActiveSection";
import { useScrollProgress } from "../hooks/useScrollProgress";

const IDS = navLinks.map((n) => n.id);

// Left-edge rail: each section is a node on a trace, the line fills with scroll progress.
const TraceRail = () => {
    const active = useActiveSection(IDS);
    const progress = useScrollProgress();

    return (
        <aside
            className="fixed left-6 top-1/2 z-[60] hidden -translate-y-1/2 xl:block"
            aria-hidden="true"
        >
            <div className="relative flex flex-col gap-7">
                <div className="absolute bottom-2 left-[3px] top-2 w-px bg-line" />
                <motion.div
                    className="absolute bottom-2 left-[3px] top-2 w-px origin-top bg-acc"
                    style={{ scaleY: progress }}
                />
                {navLinks.map((n) => {
                    const on = active === n.id;
                    return (
                        <a
                            key={n.id}
                            href={`#${n.id}`}
                            tabIndex={-1}
                            className="group pointer-events-auto relative flex items-center gap-4"
                        >
                            <span
                                className={`relative z-10 block h-[7px] w-[7px] rounded-full border transition-all duration-300 ${
                                    on
                                        ? "scale-125 border-acc bg-acc shadow-glow"
                                        : "border-dim bg-bg group-hover:border-muted"
                                }`}
                            />
                            <span
                                className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-all duration-300 ${
                                    on
                                        ? "translate-x-0 text-acc opacity-100"
                                        : "-translate-x-1 text-dim opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                                }`}
                            >
                                {n.title}
                            </span>
                        </a>
                    );
                })}
            </div>
        </aside>
    );
};

export default TraceRail;
