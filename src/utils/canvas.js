/**
 * Sizes a canvas to its parent in CSS pixels and scales the context for the device pixel ratio.
 * @returns {{ w: number, h: number }} the drawing size in CSS pixels
 */
export const fitCanvas = (canvas, ctx, maxDpr = 2) => {
    // Layout size, not the bounding rect: a parent mid-way through a scale animation would
    // otherwise size the canvas to the transformed box and leave it small and off-centre.
    const { offsetWidth: w, offsetHeight: h } = canvas.parentElement;
    const dpr = Math.min(maxDpr, window.devicePixelRatio || 1);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return { w, h };
};

/**
 * Calls `onChange(visible)` whenever the element scrolls in or out of view or the tab is
 * hidden or shown. Both signals are tracked separately so neither can latch the other.
 * @returns {() => void} cleanup
 */
export const watchVisibility = (el, onChange) => {
    let intersecting = true;
    const emit = () => onChange(intersecting && !document.hidden);
    const io = new IntersectionObserver(([entry]) => {
        intersecting = entry.isIntersecting;
        emit();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", emit);
    return () => {
        io.disconnect();
        document.removeEventListener("visibilitychange", emit);
    };
};

/**
 * Runs `onResize` when the element's box changes, falling back to window resize events.
 * @returns {() => void} cleanup
 */
export const watchResize = (el, onResize) => {
    if (typeof ResizeObserver === "undefined") {
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }
    const ro = new ResizeObserver(onResize);
    ro.observe(el);
    return () => ro.disconnect();
};
