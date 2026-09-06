import { useCallback } from "react";

// Writes the pointer position into --mx / --my so `.spot` surfaces can light up under the cursor.
export const useSpotlight = () =>
    useCallback((e) => {
        const el = e.currentTarget;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
        el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    }, []);
