import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import ParticlesContainer from "./ParticlesContainer";
import { Avatar, useMediaQuery } from "@mui/material";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";

const Profile = () => {
    const isSmallScreen = useMediaQuery("(max-width:640px)");

    return (
        <section className="relative mx-auto flex h-screen w-full flex-col items-center justify-center mt-5">
            <ParticlesContainer />

            {/* Outer container: flex-col on mobile and flex-row on desktop */}
            <div className="max-w-10xl flex w-full flex-col items-center justify-between px-1 pt-2 lg:flex-row">
                {/* Left side: Vertical line & text */}
                <div className="flex flex-row items-start gap-5">
                    <div className="flex flex-col items-center justify-center">
                        <div className="h-5 w-5 rounded-full bg-[#915EFF]" />
                        <div className="violet-gradient h-40 w-1 lg:h-80" />
                    </div>

                    <motion.div variants={textVariant()} className="z-10">
                        <h1 className={`${styles.heroHeadText} text-white`}>
                            Hi, I'm <span className="text-[#915EFF]">Aman</span>
                        </h1>
                        <p className={`${styles.heroSubText} mt-2 text-white-100`}>
                            Full-Stack Engineer
                            <br />
                            <span className="gradient-text">
                                I build scalable, enterprise-level applications using MERN Stack,
                                Python & AWS
                            </span>
                        </p>

                        <div className="mt-5 flex gap-5">
                            <a
                                href="https://www.linkedin.com/in/amandubey7/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaLinkedin className="h-8 w-8 text-[#0077b5]" />
                            </a>
                            <a
                                href="https://github.com/imunreal7"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaGithub className="h-8 w-8 text-white" />
                            </a>
                            <a
                                href="https://mail.google.com/mail/?view=cm&fs=1&to=amandubey1681999@gmail.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaEnvelope className="h-8 w-8 text-white" />
                            </a>
                            <a
                                href="https://drive.google.com/file/d/1C89p7SR5inN8JIoByvXZOTDzC8nagHcz/view?usp=drive_link"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <IoDocumentTextOutline className="h-8 w-8 text-white" />
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Right side: Avatar */}
                <motion.div
                    variants={textVariant()}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="z-[1] mt-8 lg:mt-0"
                >
                    <Avatar
                        alt="Aman Dubey"
                        src="./myImage.png"
                        sx={
                            !isSmallScreen
                                ? { width: 300, height: 300 }
                                : { width: 200, height: 200 }
                        }
                    />
                </motion.div>
            </div>

            {/* Scroll down arrow */}
            <div className="mb-10 mt-12 flex w-full items-center justify-center">
                <a href="#about">
                    <div className="flex h-[64px] w-[35px] items-start justify-center rounded-3xl border-4 border-secondary p-2">
                        <motion.div
                            animate={{ y: [0, 24, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: "loop",
                            }}
                            className="h-3 w-3 rounded-full bg-secondary"
                        />
                    </div>
                </a>
            </div>
        </section>
    );
};

export default SectionWrapper(Profile, "profile");

