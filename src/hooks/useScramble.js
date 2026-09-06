import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#$%&*<>/\\|=+";
const TICK_MS = 45;

/**
 * Resolves `text` out of scrambling glyphs, one character at a time from the left.
 * Returns the text unchanged until `enabled`, and immediately when motion is reduced.
 * @param {string} text
 * @param {boolean} enabled
 * @param {{ delay?: number, perChar?: number }} [opts] ms before the first character settles, and per character after
 */
const useScramble = (text, enabled, { delay = 200, perChar = 90 } = {}) => {
    const reduce = useReducedMotion();
    const [out, setOut] = useState(text);

    useEffect(() => {
        if (!enabled || reduce) {
            setOut(text);
            return undefined;
        }
        const start = performance.now();
        let id;
        const tick = () => {
            const elapsed = performance.now() - start;
            let done = true;
            const next = Array.from(text, (ch, i) => {
                if (ch === " " || elapsed >= delay + i * perChar) return ch;
                done = false;
                return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            }).join("");
            setOut(next);
            if (!done) id = setTimeout(tick, TICK_MS);
        };
        tick();
        return () => clearTimeout(id);
    }, [text, enabled, reduce, delay, perChar]);

    return out;
};

export default useScramble;
