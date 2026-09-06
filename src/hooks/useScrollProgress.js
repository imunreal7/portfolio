// ─── useScrollProgress ───────────────────────────────────────────────

import { useScroll, useSpring } from "framer-motion";

// Page scroll progress (0..1) smoothed with a spring, shared by the nav bar and the trace rail.
export const useScrollProgress = () => {
    const { scrollYProgress } = useScroll();
    return useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
};
