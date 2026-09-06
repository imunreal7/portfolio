// ─── Magnetic ────────────────────────────────────────────────────────
// Leans an element toward the pointer with a spring, then lets it go.
// Tiny effect, disproportionate joy. Disabled under reduced motion.

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

// Wraps a child so it leans toward the cursor while hovered.
const Magnetic = ({ children, strength = 0.35, className = "" }) => {
    const ref = useRef(null);
    const reduce = useReducedMotion();
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
    const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

    const onMove = (e) => {
        if (reduce) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const onLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ x: sx, y: sy }}
            className={`inline-block ${className}`}
        >
            {children}
        </motion.div>
    );
};

export default Magnetic;
