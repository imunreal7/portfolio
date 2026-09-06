import { motion } from "framer-motion";

import { revealVariants } from "../../utils/motion";

// Section header: numbered service label, headline, optional description.
const SectionHead = ({ index, service, title, children, align = "left" }) => (
    <motion.header
        variants={revealVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-10% 0px" }}
        className={`mb-12 flex flex-col gap-4 ${align === "center" ? "items-center text-center" : ""}`}
    >
        <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-acc">{String(index).padStart(2, "0")}</span>
            <span className="h-px w-8 bg-line" />
            <span className="eyebrow">{service}</span>
        </div>
        <h2 className="headline max-w-3xl">{title}</h2>
        {children && (
            <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">{children}</p>
        )}
    </motion.header>
);

export default SectionHead;
