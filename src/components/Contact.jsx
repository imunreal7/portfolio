import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { Button } from "@mui/material";
import {
  Email,
  LinkedIn,
  GitHub,
  Phone,
  ArrowOutward,
  Instagram,
  WhatsApp,
  Facebook,
} from "@mui/icons-material";

const buttonSx = {
  borderColor: "rgba(255,255,255,0.3)",
  color: "rgba(255,255,255,0.9)",
  textTransform: "none",
  borderRadius: "8px",
  transition: "all 0.3s ease",
  "&:hover": {
    borderColor: "rgba(255,255,255,0.6)",
    backgroundColor: "rgba(255,255,255,0.1)",
  },
};

const Contact = () => {
  const handleCallClick = (e) => {
    if (!/Mobi|Android/i.test(navigator.userAgent)) {
      e.preventDefault();
      alert("Call me at: +91 9039163669");
    }
  };

  return (
    <>
      <div className="flex flex-col-reverse gap-10 overflow-hidden md:mt-12 md:flex-row">
        {/* Left Side: Contact Details */}
        <motion.div
          variants={slideIn("left", "tween", 0.1, 0.6)}
          className="flex-[0.75] rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-8 shadow-xl"
        >
          <p className={styles.sectionSubText}>Get in touch</p>
          <h3 className={styles.sectionHeadText}>Contact</h3>
          <p className="mt-4 text-secondary">
            I'm always excited to connect and collaborate. Whether you have a
            project in mind or just want to say hello, feel free to reach out!
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <div>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=amandubey1681999@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outlined" endIcon={<Email />} sx={buttonSx}>
                  Email
                </Button>
              </a>
            </div>
            <div>
              <a
                href="https://www.linkedin.com/in/amandubey7/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outlined" endIcon={<LinkedIn />} sx={buttonSx}>
                  LinkedIn
                </Button>
              </a>
            </div>
            <div>
              <a
                href="https://github.com/Amanesh"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outlined" endIcon={<GitHub />} sx={buttonSx}>
                  GitHub
                </Button>
              </a>
            </div>
            <div>
              <a href="tel:+919039163669" onClick={handleCallClick}>
                <Button variant="outlined" endIcon={<Phone />} sx={buttonSx}>
                  Call
                </Button>
              </a>
            </div>
            <div>
              <a
                href="https://www.instagram.com/imunreal7/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outlined"
                  endIcon={<Instagram />}
                  sx={buttonSx}
                >
                  Instagram
                </Button>
              </a>
            </div>
            <div>
              <a
                href="https://wa.link/qc2l7l"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outlined" endIcon={<WhatsApp />} sx={buttonSx}>
                  WhatsApp
                </Button>
              </a>
            </div>
            <div>
              <a
                href="https://www.facebook.com/share/1A8PAnBib6/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outlined" endIcon={<Facebook />} sx={buttonSx}>
                  Facebook
                </Button>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Contact Image */}
        <motion.div
          variants={slideIn("right", "tween", 0.1, 0.6)}
          className="md:h-auto md:flex-1"
        >
          <img
            src="../assets/contact.jpg"
            alt="contact-us"
            className="h-full w-full rounded-xl object-cover shadow-lg"
          />
        </motion.div>
      </div>

      {/* Resume Section */}
      <div className="mt-10 flex flex-col items-start gap-4 px-4">
        <h1 className="text-xl font-semibold text-slate-50">
          Thanks for scrolling.
        </h1>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://drive.google.com/file/d/1C89p7SR5inN8JIoByvXZOTDzC8nagHcz/view?usp=drive_link"
        >
          <Button variant="outlined" endIcon={<ArrowOutward />} sx={buttonSx}>
            Resume
          </Button>
        </a>
      </div>
      <hr className="mt-8 border-gray-700" />
    </>
  );
};

export default SectionWrapper(Contact, "contact");
