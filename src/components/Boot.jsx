// ─── Boot sequence ───────────────────────────────────────────────────
// The terminal-style intro that plays on the first load of a session. Reloads and
// return visits in the same tab skip it: a system that re-runs its boot checks on
// every request is a system you should worry about.
// Every line it prints is computed from real data in src/constants, so the
// numbers on screen are the numbers on the resume. Click anywhere to skip.

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { experiences, projects, recommendations } from "../constants";
import { skillNodes } from "../data/skills";

const LINE_DELAY = 140;
const LINE_START = 120;
const HOLD = 300;
const SESSION_KEY = "booted";

// Session-scoped so the intro plays once per tab, not on every reload.
const alreadyBooted = () => {
    try {
        return sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
        return false;
    }
};
const rememberBoot = () => {
    try {
        sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
        /* storage unavailable: the intro simply plays again next time */
    }
};

const LINES = [
    `resolving profile ........ Aman Dubey`,
    `loading experience ....... ${experiences.length} roles`,
    `indexing skills .......... ${skillNodes.length} nodes`,
    `mounting projects ........ ${projects.length} deployments`,
    `verifying references ..... ${recommendations.length} signed`,
    `system online`,
];

const BootContext = createContext(true);

/** True once the boot overlay has lifted; entrance animations should wait for it. */
export const useBooted = () => useContext(BootContext);

// Boot sequence played on every load and refresh. Children render underneath but key
// animations are gated on `useBooted()` so the hero always comes in after the overlay lifts.
export const BootProvider = ({ children }) => {
    const reduce = useReducedMotion();
    const [booted, setBooted] = useState(alreadyBooted);
    const [count, setCount] = useState(0);

    const finish = useCallback(() => {
        rememberBoot();
        setBooted(true);
    }, []);

    useEffect(() => {
        if (booted) return undefined;
        if (reduce) {
            finish();
            return undefined;
        }
        const timers = LINES.map((_, i) =>
            setTimeout(() => setCount(i + 1), LINE_START + i * LINE_DELAY),
        );
        timers.push(setTimeout(finish, LINE_START + LINES.length * LINE_DELAY + HOLD));
        return () => timers.forEach(clearTimeout);
    }, [booted, reduce, finish]);

    const value = useMemo(() => booted, [booted]);

    return (
        <BootContext.Provider value={value}>
            {children}
            <AnimatePresence>
                {!booted && (
                    <motion.div
                        className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center bg-bg"
                        exit={{ opacity: 0, transition: { duration: 0.5 } }}
                        onClick={finish}
                        role="status"
                        aria-live="polite"
                    >
                        <div className="w-[min(90vw,420px)] font-mono text-[12px] leading-7 text-muted">
                            {LINES.slice(0, count).map((l, i) => (
                                <motion.div
                                    key={l}
                                    initial={{ opacity: 0, x: -6 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={i === LINES.length - 1 ? "text-acc" : ""}
                                >
                                    <span className="text-acc">▸ </span>
                                    {l}
                                </motion.div>
                            ))}
                            {count < LINES.length && <div className="caret" />}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </BootContext.Provider>
    );
};

export default BootProvider;
