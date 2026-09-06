import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { experiences, projects, recommendations } from "../constants";
import { skillNodes } from "../data/skills";

const KEY = "ad-booted";
const LINE_DELAY = 190;
const LINE_START = 160;
const HOLD = 420;

const LINES = [
    `resolving profile ........ Aman Dubey`,
    `loading experience ....... ${experiences.length} roles`,
    `indexing skills .......... ${skillNodes.length} nodes`,
    `mounting projects ........ ${projects.length} deployments`,
    `verifying references ..... ${recommendations.length} signed`,
    `system online`,
];

const readBooted = () => {
    try {
        return Boolean(sessionStorage.getItem(KEY));
    } catch (_) {
        return true; // storage blocked: skip the intro rather than trap the visitor
    }
};

const BootContext = createContext(true);

/** True once the boot overlay has lifted; entrance animations should wait for it. */
export const useBooted = () => useContext(BootContext);

// Once-per-session boot sequence. Children render underneath but key animations are gated
// on `useBooted()` so first-time visitors actually see the hero come in.
export const BootProvider = ({ children }) => {
    const reduce = useReducedMotion();
    const [booted, setBooted] = useState(() => readBooted() || false);
    const [count, setCount] = useState(0);

    const finish = useCallback(() => setBooted(true), []);

    useEffect(() => {
        if (booted) {
            try {
                sessionStorage.setItem(KEY, "1");
            } catch (_) {
                /* storage blocked: the intro simply plays again next load */
            }
            return undefined;
        }
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
