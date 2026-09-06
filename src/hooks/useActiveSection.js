import { useEffect, useState } from "react";

/**
 * Reports which of the given section ids currently crosses the middle band of the viewport,
 * or null when none does (for example while the hero is on screen).
 */
export const useActiveSection = (ids) => {
    const [active, setActive] = useState(null);
    useEffect(() => {
        const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
        if (!sections.length) return undefined;
        const inView = new Set();
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) inView.add(entry.target.id);
                    else inView.delete(entry.target.id);
                });
                // Prefer document order so the earliest visible section wins on boundaries.
                setActive(ids.find((id) => inView.has(id)) ?? null);
            },
            { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
        );
        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, [ids]);
    return active;
};
