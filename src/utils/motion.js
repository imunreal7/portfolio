// Shared motion vocabulary so every section reveals with the same curve and rhythm.
export const EASE = [0.22, 1, 0.36, 1];

export const revealVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/**
 * Props for a framer-motion element that fades and rises once as it scrolls into view.
 * @param {number} [index=0] staggers siblings by 50ms each
 */
export const revealOnScroll = (index = 0) => ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-5% 0px" },
    transition: { delay: index * 0.05, duration: 0.55, ease: EASE },
});
