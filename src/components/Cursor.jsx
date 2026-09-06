// ─── Cursor ring ─────────────────────────────────────────────────────
// A soft ring that trails the pointer and swells over anything clickable.
// Pointer devices only. Your thumb does not need a spring-loaded halo.

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

const SIZE = 34;

// A soft ring that trails the pointer and swells over links and buttons.
// Pointer-only: hidden on touch devices and under reduced motion, and the native cursor stays.
const Cursor = () => {
    const reduce = useReducedMotion();
    const [enabled, setEnabled] = useState(false);
    const [hot, setHot] = useState(false);
    const x = useMotionValue(-100);
    const y = useMotionValue(-100);
    const sx = useSpring(x, { stiffness: 400, damping: 32, mass: 0.6 });
    const sy = useSpring(y, { stiffness: 400, damping: 32, mass: 0.6 });

    useEffect(() => {
        const fine = window.matchMedia("(pointer: fine)");
        const update = () => setEnabled(fine.matches && !reduce);
        update();
        fine.addEventListener("change", update);
        return () => fine.removeEventListener("change", update);
    }, [reduce]);

    useEffect(() => {
        if (!enabled) return undefined;
        const onMove = (e) => {
            x.set(e.clientX - SIZE / 2);
            y.set(e.clientY - SIZE / 2);
            // Anything clickable makes the ring swell. Anticipation is a feature.
            setHot(Boolean(e.target.closest?.("a, button, [role='button'], input, textarea")));
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => window.removeEventListener("pointermove", onMove);
    }, [enabled, x, y]);

    if (!enabled) return null;
    return (
        <motion.div
            aria-hidden="true"
            style={{ x: sx, y: sy, width: SIZE, height: SIZE }}
            animate={{ scale: hot ? 1.8 : 1, opacity: hot ? 0.9 : 0.55 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="pointer-events-none fixed left-0 top-0 z-[90] rounded-full border border-acc/70 mix-blend-difference"
        />
    );
};

export default Cursor;
