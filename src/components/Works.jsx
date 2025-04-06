import React, { useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
    index,
    name,
    description,
    tags,
    image,
    alt,
    source_code_link,
    live_link,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (e) => {
        e.stopPropagation();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <motion.div variants={fadeIn("up", "spring", index * 0.1 + 0.3, 0.7)}>
            <div className="w-full rounded-2xl bg-tertiary p-5 sm:w-[360px]">
                <div className="relative h-[230px] w-full">
                    <img
                        src={image}
                        alt={alt}
                        className="h-full w-full cursor-pointer rounded-2xl object-cover"
                        onClick={openModal}
                    />

                    {/* Overlay for live and source code buttons */}
                    <div className="card-img_hover pointer-events-none absolute inset-0 m-3 flex justify-end">
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(live_link, "_blank");
                            }}
                            className="black-gradient pointer-events-auto mr-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
                        >
                            <img
                                src="../assets/web.png"
                                alt="live link"
                                className="h-full w-full rounded-full object-contain"
                            />
                        </div>
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(source_code_link, "_blank");
                            }}
                            className="black-gradient pointer-events-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
                        >
                            <img
                                src="../assets/github-link.png"
                                alt="source code"
                                className="h-3/4 w-3/4 object-contain"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <h3 className="text-[24px] font-bold text-white">{name}</h3>
                    <p className="mt-2 text-[14px] text-secondary">{description}</p>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag, i) => (
                        <p key={i} className={`text-[14px] ${tag.color}`}>
                            #{tag.name}
                        </p>
                    ))}
                </div>
            </div>

            {isModalOpen && (
                // Modal overlay
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
                    onClick={closeModal}
                >
                    {/* Modal content */}
                    <div
                        className="relative w-auto max-w-[100%] rounded border border-gray-300 bg-white p-4 shadow-lg md:max-w-[800px]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            onClick={closeModal}
                            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black text-white hover:bg-gray-800"
                        >
                            &times;
                        </button>
                        <img
                            src={image}
                            alt={alt}
                            className="max-h-[160vh] w-auto max-w-full object-contain"
                        />
                    </div>
                </div>
            )}
        </motion.div>
    );
};

const Works = () => {
    return (
        <>
            <motion.div variants={textVariant()}>
                <p className={`${styles.sectionSubText}`}>My work</p>
                <h2 className={`${styles.sectionHeadText}`}>Projects</h2>
            </motion.div>

            <div className="flex w-full">
                <motion.p
                    variants={fadeIn("", "", 0.1, 1)}
                    className="mt-3 text-[17px] leading-[30px] text-secondary"
                >
                    Following projects showcase my skills and experience through real-world examples
                    of my work. Each project is briefly described with links to code repositories
                    and live demos. They reflect my ability to solve complex problems, work with
                    different technologies, and manage projects effectively.
                </motion.p>
            </div>

            <div className="flex-around-center mt-20 flex-wrap gap-7">
                {projects.map((project, index) => (
                    <ProjectCard key={index} index={index} {...project} />
                ))}
            </div>
        </>
    );
};

export default SectionWrapper(Works, "projects");

