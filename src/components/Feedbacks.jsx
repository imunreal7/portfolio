import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { recommedations } from "../constants";

const FeedbackCard = ({ index, recommedation, name, designation, company, image, linkedIn }) => (
    <motion.div
        variants={fadeIn("", "spring", index * 0.1 + 0.3, 0.7)}
        className="w-full rounded-3xl bg-black-200 p-10 xs:w-[320px]"
    >
        <p className="text-[48px] font-black text-white">"</p>

        <div className="mt-1">
            <p className="text-[18px] tracking-wider text-white">{recommedation}</p>

            <div className="mt-7 flex items-center justify-between gap-1">
                <div className="flex flex-1 flex-col">
                    <a
                        href={linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        <p className="text-[16px] font-medium text-white">
                            <span className="blue-text-gradient">@</span> {name}
                        </p>
                    </a>
                    <p className="mt-1 text-[12px] text-secondary">
                        {designation} {company && `at ${company}`}
                    </p>
                </div>

                <a href={linkedIn} target="_blank" rel="noopener noreferrer">
                    <img
                        src={image}
                        alt={`feedback_by-${name}`}
                        className="h-10 w-10 rounded-full object-cover transition-opacity hover:opacity-80"
                    />
                </a>
            </div>
        </div>
    </motion.div>
);

const Feedbacks = () => {
    return (
        <div className={`mt-12 rounded-[20px] bg-black-100`}>
            <div className={`rounded-2xl bg-tertiary ${styles.padding} min-h-[300px]`}>
                <motion.div variants={textVariant()}>
                    <p className={styles.sectionSubText}>What others say about me</p>
                    <h2 className={styles.sectionHeadText}>Recommendations</h2>
                </motion.div>
            </div>
            <div className={`-mt-20 pb-14 ${styles.paddingX} flex-center-center flex-wrap gap-7`}>
                {recommedations.map((rec, index) => (
                    <FeedbackCard key={rec.name} index={index} {...rec} />
                ))}
            </div>
        </div>
    );
};

export default SectionWrapper(Feedbacks, "feedbacks");

