import { useState } from "react";
import SectionHead from "./ui/SectionHead";
import SkillGraph from "./SkillGraph";
import ErrorBoundary from "./ErrorBoundary";
import { DOMAINS, skillNodes } from "../data/skills";
import { useTheme } from "./Theme";

const Skills = () => {
    const [filter, setFilter] = useState(null);
    const { palette } = useTheme();
    const counts = skillNodes.reduce(
        (acc, n) => ({ ...acc, [n.domain]: (acc[n.domain] || 0) + 1 }),
        {},
    );

    return (
        <section id="skills" className="relative mx-auto max-w-7xl px-6 py-28 sm:px-10">
            <SectionHead
                index={2}
                service="skills"
                title={`${skillNodes.length} technologies, clustered by what they do.`}
            >
                A live force graph. Drag any node, hover for its name, or isolate a domain to pull
                it to the centre. Larger nodes are the tools that show up most in the work.
            </SectionHead>

            <div className="mb-4 flex flex-wrap items-center gap-2">
                <button
                    type="button"
                    onClick={() => setFilter(null)}
                    className={`rounded-full border px-3 py-1 font-mono text-[11px] transition-colors ${
                        filter === null
                            ? "border-ink bg-ink text-bg"
                            : "border-line text-muted hover:text-ink"
                    }`}
                >
                    all · {skillNodes.length}
                </button>
                {DOMAINS.map((d) => {
                    const on = filter === d.id;
                    return (
                        <button
                            key={d.id}
                            type="button"
                            onClick={() => setFilter(on ? null : d.id)}
                            className={`flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] transition-colors ${
                                on
                                    ? "border-transparent text-bg"
                                    : "border-line text-muted hover:text-ink"
                            }`}
                            style={on ? { background: palette[d.tone] } : undefined}
                        >
                            <span
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ background: on ? palette.bg : palette[d.tone] }}
                            />
                            {d.id.toLowerCase()} · {counts[d.id] || 0}
                        </button>
                    );
                })}
            </div>

            <div className="panel overflow-hidden p-1">
                <ErrorBoundary
                    fallback={
                        <ul className="flex flex-wrap gap-2 p-5">
                            {skillNodes.map((n) => (
                                <li
                                    key={n.name}
                                    className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted"
                                >
                                    {n.name}
                                </li>
                            ))}
                        </ul>
                    }
                >
                    <SkillGraph filter={filter} />
                </ErrorBoundary>
            </div>
        </section>
    );
};

export default Skills;
