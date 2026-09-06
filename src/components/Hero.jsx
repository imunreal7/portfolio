import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiArrowDown, FiCommand, FiFileText, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import PipelineCanvas from "./PipelineCanvas";
import ErrorBoundary from "./ErrorBoundary";
import Button from "./ui/Button";
import { usePalette } from "./CommandPalette";
import { useBooted } from "./Boot";
import { links, platform, profile } from "../data/profile";
import { EASE } from "../utils/motion";

const SECONDS_PER_MONTH = 30 * 24 * 3600;
const POSTS_PER_SEC = platform.postsPerMonth / SECONDS_PER_MONTH;
const MEDIA_PER_SEC = platform.mediaPerMonth / SECONDS_PER_MONTH;
const TICK_MS = 120;

// Counts what the platform would have processed at its published monthly rate since the
// visitor arrived. The rate is derived from the resume figures, not measured live.
const useLiveRate = (perSecond, enabled) => {
    const [value, setValue] = useState(0);
    useEffect(() => {
        if (!enabled) return undefined;
        const start = performance.now();
        const id = setInterval(
            () => setValue(((performance.now() - start) / 1000) * perSecond),
            TICK_MS,
        );
        return () => clearInterval(id);
    }, [perSecond, enabled]);
    return value;
};

// Own component so the once-a-second tick re-renders a single span, not the hero.
const Clock = ({ timeZone }) => {
    const [time, setTime] = useState("");
    useEffect(() => {
        const fmt = new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZone,
        });
        const tick = () => setTime(fmt.format(new Date()));
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [timeZone]);
    return <span className="tabular-nums">IST {time}</span>;
};

const wordVariants = {
    hidden: { y: "110%", rotate: 4 },
    show: (i) => ({
        y: 0,
        rotate: 0,
        transition: { delay: 0.15 + i * 0.09, duration: 0.9, ease: EASE },
    }),
};

const Word = ({ children, i, className = "" }) => (
    <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
        <motion.span
            custom={i}
            variants={wordVariants}
            className={`inline-block will-change-transform ${className}`}
        >
            {children}
        </motion.span>
    </span>
);

const fadeUp = (delay) => ({
    variants: {
        hidden: { opacity: 0, y: 12 },
        show: { opacity: 1, y: 0, transition: { delay, duration: 0.7 } },
    },
});

const Counter = ({ value, perSecond, source, tone, label }) => (
    <div>
        <div className={`font-mono text-2xl tabular-nums sm:text-3xl ${tone}`}>
            {Math.floor(value).toLocaleString("en-US")}
        </div>
        <div className="mt-1 text-xs text-muted">{label}</div>
        <div className="mt-1 font-mono text-[10px] text-dim">
            ≈ {perSecond.toFixed(1)}/s · from {source} per month
        </div>
    </div>
);

// Isolated so its ticking state re-renders only this block, not the whole hero.
const LiveThroughput = ({ enabled }) => {
    const posts = useLiveRate(POSTS_PER_SEC, enabled);
    const media = useLiveRate(MEDIA_PER_SEC, enabled);
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { delay: 1.1, duration: 0.8 } },
            }}
            className="mt-12 grid max-w-xl grid-cols-2 gap-6 border-t border-line pt-6"
            aria-live="off"
        >
            <Counter
                value={posts}
                perSecond={POSTS_PER_SEC}
                source="25M+"
                tone="text-acc"
                label="posts Social Planner publishes in the time you have been here"
            />
            <Counter
                value={media}
                perSecond={MEDIA_PER_SEC}
                source="75M+"
                tone="text-acc2"
                label="media assets optimized in the same window"
            />
        </motion.div>
    );
};

const badges = [
    { text: "25M+ posts / mo", pos: "-left-6 top-6 lg:-left-16", delay: 0 },
    { text: "99.2% uptime", pos: "-right-4 top-1/3 lg:-right-14", delay: 1.2 },
    { text: "6M+ accounts", pos: "-left-2 bottom-8 lg:-left-10", delay: 2.1 },
];

const Portrait = () => (
    <motion.div
        variants={{
            hidden: { opacity: 0, scale: 0.9 },
            show: { opacity: 1, scale: 1, transition: { delay: 0.4, duration: 1, ease: EASE } },
        }}
        className="relative mx-auto hidden h-[300px] w-[300px] sm:block lg:h-[380px] lg:w-[380px]"
    >
        <div className="spin-slow absolute inset-0 rounded-full border border-dashed border-acc/30" />
        <div className="spin-slow-rev absolute inset-6 rounded-full border border-line" />
        <div className="absolute inset-6 rounded-full bg-[conic-gradient(from_180deg,rgba(125,249,208,0.25),transparent_30%,rgba(167,139,250,0.25)_60%,transparent_80%)] blur-2xl" />
        <img
            src={profile.avatar}
            alt={profile.name}
            className="absolute inset-10 h-[calc(100%-5rem)] w-[calc(100%-5rem)] rounded-full object-cover ring-1 ring-white/10"
            width={500}
            height={500}
        />
        {badges.map((b) => (
            <motion.div
                key={b.text}
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: b.delay, ease: "easeInOut" }}
                className={`panel glass absolute ${b.pos} px-3 py-1.5 font-mono text-[11px] text-ink shadow-card`}
            >
                {b.text}
            </motion.div>
        ))}
    </motion.div>
);

const Hero = () => {
    const { open } = usePalette();
    const booted = useBooted();

    return (
        <section id="top" className="relative min-h-[100svh] overflow-hidden">
            <ErrorBoundary>
                <PipelineCanvas />
            </ErrorBoundary>
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(5,7,12,0.55)_0%,rgba(5,7,12,0.2)_35%,#05070c_85%)] sm:bg-[radial-gradient(ellipse_at_center,transparent_30%,#05070c_85%)]" />

            {/* Every entrance below waits for the boot overlay to lift. */}
            <motion.div
                initial="hidden"
                animate={booted ? "show" : "hidden"}
                className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-6 pb-28 pt-28 sm:px-10"
            >
                <motion.div
                    variants={{
                        hidden: { opacity: 0, y: -8 },
                        show: { opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.6 } },
                    }}
                    className="mb-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted"
                >
                    <span className="flex items-center gap-2">
                        <span className="pulse-dot" /> system online
                    </span>
                    <span className="hidden sm:inline">
                        {profile.role} · {profile.company}
                    </span>
                    <span className="hidden md:inline">{profile.shortLocation}</span>
                    <span>{profile.pronouns}</span>
                    <Clock timeZone={profile.timeZone} />
                </motion.div>

                <motion.img
                    variants={{
                        hidden: { opacity: 0, scale: 0.9 },
                        show: { opacity: 1, scale: 1, transition: { delay: 0.2, duration: 0.7 } },
                    }}
                    src={profile.avatar}
                    alt={profile.name}
                    width={500}
                    height={500}
                    className="mb-6 h-20 w-20 rounded-full object-cover ring-1 ring-acc/40 sm:hidden"
                />

                <div className="grid items-center gap-14 lg:grid-cols-[1.35fr_1fr]">
                    <div>
                        <h1 className="display text-[clamp(3.2rem,11vw,9rem)] font-extrabold leading-[0.9] text-ink">
                            <Word i={0}>Aman</Word>{" "}
                            <Word i={1} className="text-gradient">
                                Dubey
                            </Word>
                        </h1>
                        <motion.p
                            {...fadeUp(0.5)}
                            className="mt-6 max-w-xl text-lg text-ink sm:text-xl"
                        >
                            <span className="font-display font-semibold">
                                Lead Software Engineer
                            </span>
                            <span className="text-dim"> | </span>
                            <span className="font-display font-semibold">Technical Lead</span>
                            <span className="mt-1 block text-sm text-muted md:text-base">
                                Distributed Systems · Cloud Architecture · AI Agentic Systems
                            </span>
                        </motion.p>
                        <motion.p
                            {...fadeUp(0.62)}
                            className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
                        >
                            {profile.tagline}
                        </motion.p>

                        <motion.div
                            {...fadeUp(0.75)}
                            className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-4"
                        >
                            <Button href={links.resume} variant="primary" icon={FiFileText}>
                                Resume
                            </Button>
                            <Button href="#contact" external={false} icon={FiMail}>
                                Get in touch
                            </Button>
                            <span className="hidden sm:inline-block">
                                <Button onClick={open} variant="quiet" icon={FiCommand}>
                                    <span className="font-mono text-xs">⌘K</span>
                                </Button>
                            </span>
                            <span className="mx-1 hidden h-5 w-px bg-line sm:block" />
                            <a
                                href={links.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="p-2 text-muted transition-colors hover:text-acc"
                            >
                                <FiLinkedin className="h-5 w-5" />
                            </a>
                            <a
                                href={links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                                className="p-2 text-muted transition-colors hover:text-acc"
                            >
                                <FiGithub className="h-5 w-5" />
                            </a>
                        </motion.div>

                        <LiveThroughput enabled={booted} />
                    </div>

                    <Portrait />
                </div>
            </motion.div>

            <a
                href="#about"
                className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-dim transition-colors hover:text-acc"
            >
                <motion.span
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                >
                    <FiArrowDown />
                </motion.span>
                scroll
            </a>
        </section>
    );
};

export default Hero;
