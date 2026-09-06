import { useCallback, useEffect, useRef, useState } from "react";
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    useReducedMotion,
} from "framer-motion";
import { FiArrowUpRight, FiGithub } from "react-icons/fi";
import SectionHead from "./ui/SectionHead";
import { projects } from "../constants";
import { useTheme } from "./Theme";
import { EASE } from "../utils/motion";

const isRepo = (url) => /github\.com/.test(url || "");

// Tag colour names from the constants file map to palette keys, so every theme recolours them.
const TAG_TONE = {
    "blue-text-gradient": "sky",
    "green-text-gradient": "acc",
    "pink-text-gradient": "danger",
    "orange-text-gradient": "acc3",
    "purple-text-gradient": "acc2",
};
const toneOf = (palette, tag) => palette[TAG_TONE[tag.color]];

const TagList = ({ tags }) => {
    const { palette } = useTheme();
    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((t) => (
                <span
                    key={t.name}
                    className="rounded-full border px-2.5 py-0.5 font-mono text-[11px]"
                    style={{ color: toneOf(palette, t), borderColor: `${toneOf(palette, t)}55` }}
                >
                    {t.name}
                </span>
            ))}
        </div>
    );
};

// Live and source links, or an honest note when a project has neither.
const ProjectLinks = ({ project, children }) => {
    const { live_link: live, source_code_link: source } = project;
    return (
        <div className="flex flex-wrap items-center gap-4 text-sm">
            {live && (
                <a
                    href={live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-ink transition-colors hover:text-acc"
                >
                    open <FiArrowUpRight />
                </a>
            )}
            {source && source !== live && (
                <a
                    href={source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-acc"
                >
                    {isRepo(source) ? <FiGithub /> : <FiArrowUpRight />}
                    {isRepo(source) ? "source" : "details"}
                </a>
            )}
            {!live && !source && (
                <span className="font-mono text-[11px] text-dim">
                    internal product · no public link
                </span>
            )}
            {children}
        </div>
    );
};

// Projects without a screenshot get a generated cover built from their tag colours.
const Cover = ({ project, className }) => {
    const { palette } = useTheme();
    const [a, b] = [
        toneOf(palette, project.tags[0]),
        toneOf(palette, project.tags[1] || project.tags[0]),
    ];
    return (
        <div
            className={`${className} relative flex items-end overflow-hidden p-6`}
            style={{
                background: `linear-gradient(135deg, ${a}22, ${palette.surface} 45%, ${b}22)`,
            }}
            aria-hidden="true"
        >
            <div
                className="absolute -right-10 -top-10 h-48 w-48 rounded-full opacity-40 blur-3xl"
                style={{ background: a }}
            />
            <span className="display text-5xl font-extrabold text-ink/90 sm:text-6xl">
                {project.name
                    .split(/\s+/)
                    .slice(0, 2)
                    .map((w) => w[0])
                    .join("")}
            </span>
            <span className="absolute left-6 top-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                {project.date || "project"}
            </span>
        </div>
    );
};

const Media = ({ project, className }) =>
    project.image ? (
        <img
            src={project.image}
            alt={project.alt}
            className={`${className} object-cover object-top`}
            loading="lazy"
            decoding="async"
        />
    ) : (
        <Cover project={project} className={className} />
    );

// Wraps children in an external link only when the project has one.
const MaybeLink = ({ href, className, children }) =>
    href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
            {children}
        </a>
    ) : (
        <div className={className}>{children}</div>
    );

const Preview = ({ project }) => {
    const ref = useRef(null);
    const reduce = useReducedMotion();
    const { palette } = useTheme();
    const mx = useMotionValue(0.5);
    const my = useMotionValue(0.5);
    const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 150, damping: 20 });
    const ry = useSpring(useTransform(mx, [0, 1], [-9, 9]), { stiffness: 150, damping: 20 });

    const onMove = (e) => {
        if (reduce) return;
        const r = ref.current.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width);
        my.set((e.clientY - r.top) / r.height);
    };
    const reset = () => {
        mx.set(0.5);
        my.set(0.5);
    };

    return (
        <div ref={ref} onMouseMove={onMove} onMouseLeave={reset} className="[perspective:1400px]">
            <motion.div
                style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
                className="relative"
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={project.name}
                        initial={{ opacity: 0, scale: 0.97, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98, y: -10 }}
                        transition={{ duration: 0.35, ease: EASE }}
                    >
                        <MaybeLink
                            href={project.live_link}
                            className="panel block overflow-hidden shadow-card"
                        >
                            <div className="flex items-center gap-2 border-b border-line px-4 py-2 font-mono text-[10px] text-dim">
                                <span className="h-2 w-2 rounded-full bg-danger/70" />
                                <span className="h-2 w-2 rounded-full bg-acc3/70" />
                                <span className="h-2 w-2 rounded-full bg-acc/70" />
                                <span className="ml-2 truncate">
                                    {project.live_link
                                        ? project.live_link.replace(/^https?:\/\//, "")
                                        : `${project.name.toLowerCase().replace(/\s+/g, "-")} · ${project.date}`}
                                </span>
                            </div>
                            <Media project={project} className="aspect-[16/9] w-full" />
                        </MaybeLink>
                    </motion.div>
                </AnimatePresence>
                <div
                    className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl opacity-60 blur-3xl"
                    style={{
                        background: `radial-gradient(circle at 30% 30%, ${toneOf(palette, project.tags[0])}33, transparent 60%)`,
                    }}
                />
            </motion.div>
        </div>
    );
};

const ProjectCard = ({ project, index }) => (
    <article className="panel flex h-full flex-col overflow-hidden">
        <MaybeLink href={project.live_link} className="block">
            <Media project={project} className="aspect-[16/10] w-full" />
        </MaybeLink>
        <div className="flex flex-1 flex-col gap-3 p-5">
            <div className="flex items-baseline justify-between gap-3">
                <h3 className="display text-2xl font-bold text-ink">{project.name}</h3>
                <span className="font-mono text-[11px] text-dim">
                    {String(index + 1).padStart(2, "0")}
                </span>
            </div>
            {project.date && <p className="-mt-2 font-mono text-[11px] text-dim">{project.date}</p>}
            <p className="text-sm leading-relaxed text-muted">{project.description}</p>
            <TagList tags={project.tags} />
            <div className="mt-auto pt-2">
                <ProjectLinks project={project} />
            </div>
        </div>
    </article>
);

const Projects = () => {
    const [index, setIndex] = useState(0);
    const project = projects[index];
    const sectionRef = useRef(null);

    const go = useCallback(
        (delta) => setIndex((i) => (i + delta + projects.length) % projects.length),
        [],
    );

    useEffect(() => {
        const onKey = (e) => {
            // Only steer the list while focus is inside it, so page scrolling keys stay untouched.
            if (!sectionRef.current?.contains(document.activeElement)) return;
            if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                e.preventDefault();
                go(1);
            }
            if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                e.preventDefault();
                go(-1);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [go]);

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative mx-auto max-w-7xl px-6 py-28 sm:px-10"
        >
            <SectionHead index={6} service="projects" title="Things I have built and shipped.">
                Hover a name to preview it. Arrow keys work too. Each one links to the live app and
                the source.
            </SectionHead>

            {/* Phones: a swipeable, snap-aligned deck instead of hover-driven spotlight. */}
            <ul
                className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 lg:hidden"
                aria-label="Projects"
            >
                {projects.map((p, i) => (
                    <li key={p.name} className="w-[85vw] max-w-[420px] shrink-0 snap-center">
                        <ProjectCard project={p} index={i} />
                    </li>
                ))}
            </ul>
            <p className="mt-2 font-mono text-[11px] text-dim lg:hidden">
                swipe to browse · {projects.length} projects
            </p>

            <div className="hidden gap-10 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
                {/* list */}
                <ol className="flex flex-col">
                    {projects.map((p, i) => {
                        const on = i === index;
                        return (
                            <li key={p.name}>
                                <button
                                    type="button"
                                    onMouseEnter={() => setIndex(i)}
                                    onFocus={() => setIndex(i)}
                                    onClick={() => setIndex(i)}
                                    className={`group flex w-full items-baseline gap-4 border-b border-line py-4 text-left transition-colors ${
                                        on ? "text-ink" : "text-muted hover:text-ink"
                                    }`}
                                >
                                    <span
                                        className={`font-mono text-[11px] ${on ? "text-acc" : "text-dim"}`}
                                    >
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <span className="display flex-1 text-2xl font-bold sm:text-3xl">
                                        {p.name}
                                    </span>
                                    <span
                                        className={`hidden font-mono text-[11px] sm:block ${on ? "text-muted" : "text-dim"}`}
                                    >
                                        {p.tags[0].name}
                                    </span>
                                    <motion.span
                                        animate={{ x: on ? 0 : -6, opacity: on ? 1 : 0 }}
                                        className="text-acc"
                                    >
                                        <FiArrowUpRight />
                                    </motion.span>
                                </button>
                            </li>
                        );
                    })}
                </ol>

                {/* preview */}
                <div className="lg:sticky lg:top-28">
                    <Preview project={project} />
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={project.name}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3 }}
                            className="mt-6"
                        >
                            {project.date && (
                                <p className="mb-2 font-mono text-[11px] text-dim">
                                    {project.date}
                                </p>
                            )}
                            <p className="text-[15px] leading-relaxed text-muted">
                                {project.description}
                            </p>
                            <div className="mt-4">
                                <TagList tags={project.tags} />
                            </div>
                            <div className="mt-5">
                                <ProjectLinks project={project}>
                                    <span className="ml-auto font-mono text-[11px] text-dim">
                                        {index + 1} / {projects.length}
                                    </span>
                                </ProjectLinks>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default Projects;
