// ─── Impact ──────────────────────────────────────────────────────────
// The numbers, counting up when they scroll into view. Each one is quoted
// verbatim from an experience bullet and a test makes sure that stays true,
// so nothing here can quietly inflate over time. Unlike most metrics decks.

import { motion } from "framer-motion";
import SectionHead from "./ui/SectionHead";
import { useCountUp } from "../hooks/useCountUp";
import { useSpotlight } from "../hooks/useSpotlight";
import { metrics } from "../data/metrics";
import { pipeline } from "../data/profile";
import { EASE } from "../utils/motion";

const TONE = {
    acc: { text: "text-acc", bar: "bg-acc" },
    acc2: { text: "text-acc2", bar: "bg-acc2" },
    acc3: { text: "text-acc3", bar: "bg-acc3" },
};

const SPAN = {
    lg: "sm:col-span-2 sm:row-span-2",
    md: "sm:col-span-2 lg:col-span-1",
    sm: "",
};

const Tile = ({ m, index }) => {
    const { ref, text } = useCountUp(m.value, {
        decimals: m.decimals || 0,
        duration: 1400 + index * 60,
    });
    const onMove = useSpotlight();
    const tone = TONE[m.tone];
    return (
        <motion.div
            ref={ref}
            onMouseMove={onMove}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5% 0px" }}
            transition={{ delay: (index % 4) * 0.06, duration: 0.6 }}
            className={`panel spot flex flex-col justify-between p-5 ${SPAN[m.size]}`}
        >
            <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-[10px] text-dim">{m.id}</span>
                <span className={`h-1.5 w-1.5 rounded-full ${tone.bar}`} />
            </div>
            {m.size === "lg" && (
                <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {pipeline.map((stage, i) => (
                        <li
                            key={stage.id}
                            className="rounded-lg border border-line bg-raised/40 p-3"
                        >
                            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-acc/80">
                                {String(i + 1).padStart(2, "0")} {stage.label}
                            </div>
                            <div className="mt-1 font-mono text-[11px] text-muted">
                                {stage.detail}
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <div className="mt-6">
                <div
                    className={`display font-extrabold tabular-nums ${tone.text} ${
                        m.size === "lg"
                            ? "text-7xl sm:text-8xl"
                            : m.size === "md"
                              ? "text-5xl"
                              : "text-4xl"
                    }`}
                >
                    {text}
                    <span className="text-[0.5em] text-ink/80">{m.suffix}</span>
                </div>
                <div className="mt-2 text-sm text-ink">{m.label}</div>
                <div className="mt-1 font-mono text-[11px] text-muted">{m.context}</div>
            </div>
            {m.bar !== undefined && (
                <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-raised">
                    <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${m.bar}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
                        className={`h-full rounded-full ${tone.bar}`}
                    />
                </div>
            )}
        </motion.div>
    );
};

const Impact = () => (
    <section id="impact" className="relative mx-auto max-w-7xl px-6 py-28 sm:px-10">
        <SectionHead index={5} service="impact" title="Numbers that shipped.">
            Every figure below is taken directly from the work described above.
        </SectionHead>
        <div className="grid auto-rows-[minmax(150px,auto)] gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((m, i) => (
                <Tile key={m.id} m={m} index={i} />
            ))}
        </div>
    </section>
);

export default Impact;
