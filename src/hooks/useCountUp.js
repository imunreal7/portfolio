// ─── useCountUp ──────────────────────────────────────────────────────
// Counts a number up from zero once it scrolls into view. Once. It is not a
// slot machine.

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

const easeOut = (t) => 1 - Math.pow(1 - t, 4);

// Counts from 0 to `target` once the element scrolls into view.
export const useCountUp = (target, { duration = 1600, decimals = 0 } = {}) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-10% 0px" });
    const reduce = useReducedMotion();
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!inView) return undefined;
        if (reduce) {
            setValue(target);
            return undefined;
        }
        let frame;
        const start = performance.now();
        const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            setValue(target * easeOut(t));
            if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [inView, target, duration, reduce]);

    const text = value.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    });
    return { ref, text, done: value === target };
};
