// ─── Experience ──────────────────────────────────────────────────────
// Roles newest first, with a sticky year tracker that follows the card you are
// reading. Tenures are counted in whole months, inclusive, because HR would.

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionHead from "./ui/SectionHead";
import { useSpotlight } from "../hooks/useSpotlight";
import { formatSpan, positionOnTrack, roles, trackYears } from "../data/timeline";
import { EASE } from "../utils/motion";

const totalMonths = roles.reduce((sum, r) => sum + r.months, 0);
const newestFirst = [...roles].reverse();

// Vertical/horizontal track of every role, positioned by its real start and end month.
const Track = ({ active, onPick, vertical }) => (
    <div className={`relative ${vertical ? "h-[420px] w-full" : "h-16 w-full"}`}>
        {/* year ticks */}
        {trackYears.map((y) => {
            const p = Math.max(0, positionOnTrack(y * 12));
            if (p > 1) return null;
            const style = vertical ? { top: `${p * 100}%` } : { left: `${p * 100}%` };
            return (
                <div
                    key={y}
                    className={`absolute flex items-center gap-2 font-mono text-[10px] text-dim ${
                        vertical ? "left-0 -translate-y-1/2" : "top-0 -translate-x-1/2 flex-col"
                    }`}
                    style={style}
                >
                    <span className={vertical ? "h-px w-3 bg-line" : "h-3 w-px bg-line"} />
                    <span>{y}</span>
                </div>
            );
        })}
        {/* baseline */}
        <div
            className={`absolute bg-line ${vertical ? "left-16 top-0 h-full w-px" : "left-0 top-9 h-px w-full"}`}
        />
        {/* role spans */}
        {roles.map((r) => {
            const s = positionOnTrack(r.startIdx);
            const e = positionOnTrack(r.endIdx);
            const on = active === r.id;
            const size = Math.max(1.2, (e - s) * 100);
            const style = vertical
                ? { top: `${s * 100}%`, height: `${size}%`, left: "calc(4rem - 4px)" }
                : { left: `${s * 100}%`, width: `${size}%`, top: "2rem" };
            return (
                <button
                    key={r.id}
                    type="button"
                    onClick={() => onPick(r.id)}
                    aria-label={`${r.title}, ${r.company}, ${r.date}`}
                    className={`absolute rounded-full transition-all duration-500 ${
                        vertical ? "w-[9px]" : "h-[9px]"
                    } ${on ? "bg-acc shadow-glow" : r.present ? "bg-acc/40" : "bg-dim/60 hover:bg-muted"}`}
                    style={style}
                />
            );
        })}
    </div>
);

const RoleCard = ({ role, active, onEnter, index }) => {
    const onMove = useSpotlight();
    return (
        <motion.article
            id={role.id}
            onMouseMove={onMove}
            onMouseEnter={onEnter}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: EASE }}
            className={`panel spot p-6 transition-colors duration-500 sm:p-8 ${active ? "border-acc/40" : ""}`}
        >
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-muted">
                        <span className="text-acc">{String(index + 1).padStart(2, "0")}</span>
                        <span className="whitespace-nowrap">{role.date}</span>
                        <span className="text-dim">·</span>
                        <span className="whitespace-nowrap">{formatSpan(role.months)}</span>
                        {role.present && (
                            <span className="flex items-center gap-1.5 text-acc">
                                <span className="pulse-dot scale-75" /> current
                            </span>
                        )}
                    </div>
                    <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-ink">
                        {role.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                        {role.company}
                        {role.location && <span className="text-dim"> · {role.location}</span>}
                    </p>
                </div>
            </div>
            <ul className="mt-6 space-y-3">
                {role.points.map((p, i) => {
                    const isStack = p.startsWith("Tech Stack:");
                    return (
                        <li key={p} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                            <span
                                className={`mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full ${isStack ? "bg-acc2" : "bg-acc/70"}`}
                            />
                            {isStack ? (
                                <span className="flex flex-wrap gap-1.5">
                                    {p
                                        .replace("Tech Stack:", "")
                                        .split(",")
                                        .map((t) => t.trim().replace(/\.$/, ""))
                                        .filter(Boolean)
                                        .map((t) => (
                                            <span
                                                key={t}
                                                className="rounded border border-line px-1.5 py-0.5 font-mono text-[11px] text-ink"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                </span>
                            ) : (
                                <span>{p}</span>
                            )}
                        </li>
                    );
                })}
            </ul>
        </motion.article>
    );
};

const Experience = () => {
    const [active, setActive] = useState(newestFirst[0].id);
    const listRef = useRef(null);

    // The card nearest the middle of the viewport drives the track highlight.
    useEffect(() => {
        const cards = Array.from(listRef.current?.querySelectorAll("article[id]") || []);
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
            { rootMargin: "-40% 0px -40% 0px" },
        );
        cards.forEach((c) => io.observe(c));
        return () => io.disconnect();
    }, []);

    const pick = (id) => {
        setActive(id);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    const current = roles.find((r) => r.id === active);

    return (
        <section id="experience" className="relative mx-auto max-w-7xl px-6 py-28 sm:px-10">
            <SectionHead
                index={3}
                service="experience"
                title={`${roles.length} roles, one trajectory.`}
            >
                Scroll the roles and the track scrubs through time. Every bar is sized by its real
                tenure.
            </SectionHead>

            {/* compact horizontal track on small screens */}
            <div className="mb-10 lg:hidden">
                <Track active={active} onPick={pick} vertical={false} />
            </div>

            <div className="grid gap-10 lg:grid-cols-[300px_1fr]">
                <aside className="hidden lg:block">
                    <div className="sticky top-28">
                        <div className="panel p-6">
                            <div className="eyebrow">now viewing</div>
                            <div className="display mt-3 text-6xl font-extrabold tabular-nums text-ink">
                                {current?.start.y}
                            </div>
                            <div className="mt-1 font-mono text-sm text-muted">
                                →{" "}
                                {current?.present ? (
                                    <span className="text-acc">now</span>
                                ) : (
                                    current?.end.y
                                )}
                            </div>
                            <div className="mt-2 text-sm text-muted">{current?.company}</div>
                            <div className="mt-6">
                                <Track active={active} onPick={pick} vertical />
                            </div>
                            <div className="mt-6 flex items-center justify-between border-t border-line pt-4 font-mono text-[11px] text-muted">
                                <span>total</span>
                                <span className="text-ink">{formatSpan(totalMonths)} in role</span>
                            </div>
                        </div>
                    </div>
                </aside>

                <div ref={listRef} className="flex flex-col gap-5">
                    {newestFirst.map((r, i) => (
                        <RoleCard
                            key={r.id}
                            role={r}
                            index={i}
                            active={active === r.id}
                            onEnter={() => setActive(r.id)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
