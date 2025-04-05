import React from "react";
import { motion } from "framer-motion";
import { useMediaQuery } from "@mui/material";

import { styles } from "../styles";
import { services, technologies, tools } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

// ServiceCard remains the same for rendering service items
const ServiceCard = ({ index, title, icon }) => (
  <div className="w-full xs:w-[250px]">
    <motion.div
      variants={fadeIn("right", "spring", index * 0.1 + 0.2, 0.6)}
      className="green-pink-gradient w-full rounded-[20px] p-[1px] shadow-card"
    >
      <div
        options={{ max: 45, scale: 1, speed: 450 }}
        className="flex min-h-[280px] flex-col items-center justify-evenly rounded-[20px] bg-tertiary px-12 py-5"
      >
        <img src={icon} alt={title} className="h-16 w-16 object-contain" />
        <h3 className="text-center text-[20px] font-bold text-white">
          {title}
        </h3>
      </div>
    </motion.div>
  </div>
);

// About Component
const About = () => {
  const isSmallScreen = useMediaQuery("(max-width:587px)");
  const isLargeScreen = useMediaQuery("(min-width:1248px)");

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>About me</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 max-w-3xl text-[17px] leading-[30px] text-secondary"
      >
        I am a result-driven Software Engineer with over 4 years of full-stack
        experience in architecting and scaling enterprise-level applications.
        Specializing in the MERN stack, AWS cloud services, and modern
        JavaScript frameworks, I excel in designing robust, scalable solutions
        that drive business success. My leadership in agile environments and
        commitment to continuous improvement ensures on-time delivery and
        superior performance.
      </motion.p>

      <div
        className={`flex-center-center ${
          isSmallScreen ? "linearToL" : isLargeScreen ? "linearToB" : "circle"
        } mt-20 flex-wrap gap-10`}
      >
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

// Skills Component
const Skills = () => {
  return (
    <>
      <div className="flex-center-center mt-20 flex-col">
        <h3 className={`${styles.sectionHeadText} marker`}>Skills</h3>
        <div className="mt-2 flex flex-wrap justify-center gap-10">
          {technologies.map((item, i) => (
            <div key={i} className="flex-around-center w-[80px] flex-col">
              <img src={item.icon} width="100%" alt={item.name} />
              <p className="text-center">{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-center-center mt-20 flex-col">
        <h3 className={styles.sectionSubText}>Tools and Software</h3>
        <div className="mt-2 flex flex-wrap justify-center gap-10">
          {tools.map((item, i) => (
            <div key={i} className="flex-around-center w-[80px] flex-col">
              <img src={item.icon} width="100%" alt={item.name} />
              <p className="text-center">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// Wrap each component with SectionWrapper for consistent styling and layout
export const AboutSection = SectionWrapper(About, "about");
export const SkillsSection = SectionWrapper(Skills, "skills");
