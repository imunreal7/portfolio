import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FiLinkedin } from "react-icons/fi";
import SectionHead from "./ui/SectionHead";
import { EASE } from "../utils/motion";
import { recommendations } from "../constants";

const INTERVAL = 7000;

const initials = (name) =>
    name
        .split(/\s+/)
        .filter((w) => /^[A-Za-z]/.test(w))
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join("");

// LinkedIn photos are not stored for every recommender; fall back to a monogram.
const Avatar = ({ person, className }) =>
    person.image ? (
        <img src={person.image} alt="" className={`${className} object-cover`} loading="lazy" />
    ) : (
        <span
            className={`${className} grid place-items-center bg-raised font-mono text-[11px] font-semibold text-acc`}
            aria-hidden="true"
        >
            {initials(person.name)}
        </span>
    );

const Recommendations = () => {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const reduce = useReducedMotion();
    const rec = recommendations[index];

    useEffect(() => {
        if (paused || reduce) return undefined;
        const id = setTimeout(() => setIndex((i) => (i + 1) % recommendations.length), INTERVAL);
        return () => clearTimeout(id);
    }, [index, paused, reduce]);

    return (
        <section id="recommendations" className="relative mx-auto max-w-7xl px-6 py-28 sm:px-10">
            <SectionHead
                index={7}
                service="recommendations"
                title="What people I have worked with say."
            />

            <div
                className="panel overflow-hidden"
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onFocusCapture={() => setPaused(true)}
                onBlurCapture={(e) =>
                    !e.currentTarget.contains(e.relatedTarget) && setPaused(false)
                }
            >
                <div className="grid lg:grid-cols-[1fr_320px]">
                    <div className="relative min-h-[300px] p-8 sm:p-12">
                        <span className="display absolute left-6 top-4 text-[120px] leading-none text-acc/10 sm:left-10">
                            “
                        </span>
                        <div className="relative">
                            <AnimatePresence initial={false}>
                                <motion.blockquote
                                    key={rec.name}
                                    initial={{ opacity: 0, y: 14 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{
                                        opacity: 0,
                                        y: -14,
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                    }}
                                    transition={{ duration: 0.45, ease: EASE }}
                                    className="relative"
                                >
                                    <p className="display text-2xl font-semibold leading-snug text-ink sm:text-3xl lg:text-4xl">
                                        {rec.quote}
                                    </p>
                                    <footer className="mt-8 flex items-center gap-4">
                                        <Avatar
                                            person={rec}
                                            className="h-12 w-12 rounded-full object-cover ring-1 ring-ink/10"
                                        />
                                        <div>
                                            <a
                                                href={rec.linkedIn}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 font-medium text-ink hover:text-acc"
                                            >
                                                {rec.name} <FiLinkedin className="h-3.5 w-3.5" />
                                            </a>
                                            <div className="font-mono text-[11px] text-muted">
                                                {rec.designation} · {rec.company}
                                            </div>
                                        </div>
                                    </footer>
                                </motion.blockquote>
                            </AnimatePresence>
                        </div>
                    </div>

                    <ul className="flex border-t border-line lg:flex-col lg:border-l lg:border-t-0">
                        {recommendations.map((r, i) => {
                            const on = i === index;
                            return (
                                <li
                                    key={r.name}
                                    className="relative flex-1 border-r border-line last:border-r-0 lg:border-b lg:border-r-0 lg:last:border-b-0"
                                >
                                    <button
                                        type="button"
                                        onClick={() => setIndex(i)}
                                        aria-label={r.name}
                                        aria-pressed={on}
                                        className={`flex h-full w-full items-center gap-3 px-4 py-4 text-left transition-colors sm:px-6 ${
                                            on
                                                ? "bg-raised/60 text-ink"
                                                : "text-muted hover:text-ink"
                                        }`}
                                    >
                                        <Avatar
                                            person={r}
                                            className={`h-9 w-9 rounded-full object-cover transition-opacity ${on ? "" : "opacity-60"}`}
                                        />
                                        <span className="hidden sm:block">
                                            <span className="block text-sm font-medium">
                                                {r.name}
                                            </span>
                                            <span className="block font-mono text-[10px] text-dim">
                                                {r.designation}
                                            </span>
                                        </span>
                                    </button>
                                    {on && !reduce && (
                                        <motion.span
                                            key={`bar-${index}-${paused}`}
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: paused ? 0 : 1 }}
                                            transition={{
                                                duration: INTERVAL / 1000,
                                                ease: "linear",
                                            }}
                                            className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-acc"
                                        />
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Recommendations;
