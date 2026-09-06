import { motion } from "framer-motion";
import SectionHead from "./ui/SectionHead";
import { useSpotlight } from "../hooks/useSpotlight";
import { services } from "../constants";
import { profile } from "../data/profile";
import { EASE } from "../utils/motion";

// One resume bullet per service card; wording is lifted from the experience section.
const SERVICE_NOTES = {
    "Distributed Systems & Cloud Architecture":
        "GCP Pub/Sub, Cloud Tasks and batch processing that cut worker CPU / memory spikes by 95%.",
    "End-to-End Full Stack Engineering":
        "Pinterest Multi-Board Pins and LinkedIn Polls shipped end-to-end, from product analysis to adoption tracking.",
    "AI-Powered Systems & Automation":
        "A FastAPI evaluation service with NLP match explanations that helped 90% of users make job decisions.",
    "Team Leadership & Agile Delivery":
        "Led a team of 12 with 100% on-time deliveries; onboarded 3 senior engineers with architecture docs.",
};

const manifest = [
    ["kind", "Engineer"],
    ["name", profile.name],
    ["role", profile.role],
    ["org", profile.company],
    ["team", profile.product],
    ["location", profile.shortLocation],
    ["experience", `${profile.yearsLabel} years`],
    ["education", "B.E. Computer Science, RGPV (2016 - 2020)"],
    ["stack", "[TypeScript, Python, NestJS, Node.js, Vue.js]"],
    ["infra", "[GCP Pub/Sub, Cloud Tasks, Kubernetes, MongoDB, Redis]"],
    ["focus", "distributed systems · microservices · AI-powered systems"],
    ["status", "online"],
];

const HIGHLIGHTS = ["25M+ posts/month", "99.2%", "Social Planner", "HighLevel", "6 years"];

// Wraps the resume phrases in a highlight so the paragraph has rhythm without rewording it.
const Highlighted = ({ text }) => {
    const pattern = new RegExp(
        `(${HIGHLIGHTS.map((h) => h.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&")).join("|")})`,
        "g",
    );
    return text.split(pattern).map((part, i) =>
        HIGHLIGHTS.includes(part) ? (
            <span key={`${i}-${part}`} className="text-ink">
                {part}
            </span>
        ) : (
            <span key={`${i}-${part}`}>{part}</span>
        ),
    );
};

const ServiceCard = ({ title, icon, index }) => {
    const onMove = useSpotlight();
    return (
        <motion.article
            onMouseMove={onMove}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ delay: index * 0.08, duration: 0.6, ease: EASE }}
            className="panel spot flex flex-col gap-4 p-6"
        >
            <div className="flex items-center justify-between">
                <img src={icon} alt="" className="h-10 w-10 object-contain opacity-90" />
                <span className="font-mono text-[10px] text-dim">
                    svc-{String(index + 1).padStart(2, "0")}
                </span>
            </div>
            <h3 className="font-display text-lg font-semibold leading-tight text-ink">{title}</h3>
            <p className="text-sm leading-relaxed text-muted">{SERVICE_NOTES[title]}</p>
        </motion.article>
    );
};

const About = () => (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-28 sm:px-10">
        <SectionHead
            index={1}
            service="about"
            title="An engineer who treats reliability as a feature."
        >
            Six years across startups and platform teams, from a serverless MobilityOS to a
            publishing system that moves tens of millions of posts a month.
        </SectionHead>

        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-lg leading-[1.8] text-muted sm:text-xl"
            >
                <Highlighted text={profile.about} />
            </motion.p>

            <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.8, ease: EASE }}
                className="panel overflow-hidden font-mono text-[12.5px] leading-7"
            >
                <div className="flex items-center gap-2 border-b border-line px-4 py-2 text-[10px] text-dim">
                    <span className="h-2 w-2 rounded-full bg-danger/70" />
                    <span className="h-2 w-2 rounded-full bg-acc3/70" />
                    <span className="h-2 w-2 rounded-full bg-acc/70" />
                    <span className="ml-2">engineer.manifest.yaml</span>
                </div>
                <div className="px-5 py-4">
                    {manifest.map(([k, v], i) => (
                        <motion.div
                            key={k}
                            initial={{ opacity: 0, x: -6 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + i * 0.06 }}
                            className="flex gap-3"
                        >
                            <span className="w-24 shrink-0 text-acc2">{k}:</span>
                            <span className={k === "status" ? "text-acc" : "text-ink"}>{v}</span>
                        </motion.div>
                    ))}
                    <div className="caret mt-1 text-dim" />
                </div>
            </motion.div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
                <ServiceCard key={s.title} index={i} {...s} />
            ))}
        </div>
    </section>
);

export default About;
