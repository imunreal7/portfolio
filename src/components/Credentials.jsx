// ─── Credentials ─────────────────────────────────────────────────────
// Degree, certifications, publications and languages. The receipts section.

import { motion } from "framer-motion";
import { FiAward, FiBookOpen, FiExternalLink, FiGlobe } from "react-icons/fi";
import SectionHead from "./ui/SectionHead";
import { useSpotlight } from "../hooks/useSpotlight";
import { certifications, education, languages, publications } from "../constants";

import { revealOnScroll as reveal } from "../utils/motion";

const Card = ({ children, className = "" }) => {
    const onMove = useSpotlight();
    return (
        <div onMouseMove={onMove} className={`panel spot p-6 ${className}`}>
            {children}
        </div>
    );
};

const Credentials = () => (
    <section id="credentials" className="relative mx-auto max-w-7xl px-6 py-28 sm:px-10">
        <SectionHead
            index={4}
            service="credentials"
            title="Degree, certifications, and a published paper."
        >
            The formal record behind the work: one engineering degree, {certifications.length}{" "}
            certifications and {publications.length} peer-reviewed publication.
        </SectionHead>

        <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
            <div className="flex flex-col gap-4">
                {education.map((e, i) => (
                    <motion.div key={e.school} {...reveal(i)}>
                        <Card>
                            <div className="flex items-center gap-2 text-acc">
                                <FiBookOpen className="h-4 w-4" />
                                <span className="eyebrow text-acc">education</span>
                            </div>
                            <h3 className="mt-4 font-display text-xl font-bold text-ink">
                                {e.degree}
                            </h3>
                            <p className="mt-1 text-sm text-muted">{e.school}</p>
                            <p className="mt-1 font-mono text-[11px] text-dim">
                                {e.date} · {e.location}
                            </p>
                            <ul className="mt-5 flex flex-wrap gap-1.5">
                                {e.coursework.map((c) => (
                                    <li
                                        key={c}
                                        className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted"
                                    >
                                        {c}
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </motion.div>
                ))}

                {publications.map((p, i) => (
                    <motion.div key={p.title} {...reveal(i + 1)}>
                        <Card>
                            <div className="flex items-center gap-2 text-acc2">
                                <FiExternalLink className="h-4 w-4" />
                                <span className="eyebrow text-acc2">publication</span>
                            </div>
                            <a
                                href={p.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-4 block font-display text-lg font-bold leading-snug text-ink transition-colors hover:text-acc"
                            >
                                {p.title}
                            </a>
                            <p className="mt-1 font-mono text-[11px] text-dim">
                                {p.publisher} · {p.date}
                            </p>
                            <p className="mt-3 text-sm leading-relaxed text-muted">{p.summary}</p>
                        </Card>
                    </motion.div>
                ))}

                <motion.div {...reveal(2)}>
                    <Card>
                        <div className="flex items-center gap-2 text-acc3">
                            <FiGlobe className="h-4 w-4" />
                            <span className="eyebrow text-acc3">languages</span>
                        </div>
                        <ul className="mt-4 flex flex-wrap gap-6">
                            {languages.map((l) => (
                                <li key={l.name}>
                                    <div className="font-display text-lg font-bold text-ink">
                                        {l.name}
                                    </div>
                                    <div className="font-mono text-[11px] text-dim">{l.level}</div>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </motion.div>
            </div>

            <motion.div {...reveal(1)}>
                <Card className="h-full">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-acc">
                            <FiAward className="h-4 w-4" />
                            <span className="eyebrow text-acc">certifications</span>
                        </div>
                        <span className="font-mono text-[11px] text-dim">
                            {certifications.length} issued
                        </span>
                    </div>
                    <ol className="mt-4 divide-y divide-line">
                        {certifications.map((c, i) => (
                            <motion.li
                                key={c.name}
                                initial={{ opacity: 0, x: -8 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.04 }}
                                className="grid grid-cols-[auto_1fr_auto] items-baseline gap-4 py-3"
                            >
                                <span className="font-mono text-[11px] text-dim">
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span>
                                    <span className="block text-sm font-medium text-ink">
                                        {c.name}
                                    </span>
                                    <span className="block font-mono text-[11px] text-muted">
                                        {c.issuer}
                                    </span>
                                </span>
                                <span className="whitespace-nowrap font-mono text-[11px] text-dim">
                                    {c.date}
                                </span>
                            </motion.li>
                        ))}
                    </ol>
                </Card>
            </motion.div>
        </div>
    </section>
);

export default Credentials;
