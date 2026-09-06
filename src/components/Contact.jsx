import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    FiArrowUpRight,
    FiFacebook,
    FiFileText,
    FiGithub,
    FiInstagram,
    FiLinkedin,
    FiMail,
    FiPhone,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import SectionHead from "./ui/SectionHead";
import Magnetic from "./ui/Magnetic";
import { links, profile } from "../data/profile";

const channels = [
    { label: "Email", value: profile.email, href: links.email, icon: FiMail, primary: true },
    {
        label: "LinkedIn",
        value: `/in/amandubey7 · ${profile.connections} connections`,
        href: links.linkedin,
        icon: FiLinkedin,
        primary: true,
    },
    { label: "GitHub", value: "@imunreal7", href: links.github, icon: FiGithub, primary: true },
    { label: "Call", value: profile.phone, href: profile.phoneHref, icon: FiPhone, tel: true },
    { label: "WhatsApp", value: "wa.link/qc2l7l", href: links.whatsapp, icon: FaWhatsapp },
    { label: "Instagram", value: "@imunreal7", href: links.instagram, icon: FiInstagram },
    { label: "Facebook", value: "profile", href: links.facebook, icon: FiFacebook },
];

const useIST = () => {
    const [now, setNow] = useState("");
    useEffect(() => {
        const fmt = new Intl.DateTimeFormat("en-GB", {
            weekday: "short",
            hour: "2-digit",
            minute: "2-digit",
            timeZone: profile.timeZone,
        });
        const tick = () => setNow(fmt.format(new Date()));
        tick();
        const id = setInterval(tick, 15000);
        return () => clearInterval(id);
    }, []);
    return now;
};

const Contact = () => {
    const now = useIST();

    return (
        <section id="contact" className="relative mx-auto max-w-7xl px-6 py-28 sm:px-10">
            <SectionHead index={8} service="contact" title="Let's build something that scales." />

            <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
                <div>
                    <p className="max-w-md text-lg leading-relaxed text-muted">
                        I'm always excited to connect and collaborate. Whether you have a project in
                        mind or just want to say hello, feel free to reach out!
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-6 font-mono text-[11px] text-muted">
                        <span className="flex items-center gap-2">
                            <span className="pulse-dot" /> open to conversations
                        </span>
                        <span>
                            {profile.shortLocation} · {now} IST
                        </span>
                    </div>
                    <div className="mt-10">
                        <Magnetic strength={0.2}>
                            <a
                                href={links.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center gap-3 rounded-full bg-acc px-6 py-3 font-medium text-bg transition-colors hover:bg-white"
                            >
                                <FiFileText /> View resume
                                <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </a>
                        </Magnetic>
                    </div>
                </div>

                <ul className="grid gap-2 sm:grid-cols-2">
                    {channels.map((c, i) => {
                        const Icon = c.icon;
                        return (
                            <motion.li
                                key={c.label}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className={c.primary ? "sm:col-span-2" : ""}
                            >
                                <a
                                    href={c.href}
                                    {...(c.tel
                                        ? {}
                                        : { target: "_blank", rel: "noopener noreferrer" })}
                                    className="panel group flex items-center gap-4 px-5 py-4 transition-colors hover:border-acc/50"
                                >
                                    <span className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-colors group-hover:border-acc group-hover:text-acc">
                                        <Icon className="h-4 w-4" />
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="block text-sm font-medium text-ink">
                                            {c.label}
                                        </span>
                                        <span className="block truncate font-mono text-[11px] text-muted">
                                            {c.value}
                                        </span>
                                    </span>
                                    <FiArrowUpRight className="text-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-acc" />
                                </a>
                            </motion.li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default Contact;
