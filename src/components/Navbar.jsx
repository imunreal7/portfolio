import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles";
import { navLinks } from "../constants";

const Navbar = () => {
    const [active, setActive] = useState("");
    const [toggle, setToggle] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Toggle background on navbar after certain scroll
            setScrolled(window.scrollY > 100);

            // We’ll store whichever section is currently “most in view”
            let currentSection = "";

            // Loop through each nav link’s target section
            for (let i = 0; i < navLinks.length; i++) {
                const section = document.getElementById(navLinks[i].id);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    /*
            rect.top: distance of the section’s top to the top of the visible viewport
            A common approach: if rect.top is less than some offset (e.g., 150),
            we consider the user is “in” that section.
          */
                    if (rect.top <= 150) {
                        currentSection = navLinks[i].title;
                    }
                }
            }

            // After the loop, currentSection should be the last section whose top is above 150px
            setActive(currentSection);
        };

        window.addEventListener("scroll", handleScroll);
        // Run once on mount to set the correct highlight if the user reloads in the middle of the page
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`
        ${styles.paddingX}
        fixed top-0 z-20 flex w-full items-center py-5
        ${scrolled ? "bg-primary shadow-lg" : "bg-transparent"}
      `}
        >
            <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
                {/* Logo / Home Link */}
                <Link
                    to="/"
                    className="flex items-center gap-2"
                    onClick={() => {
                        setActive("");
                        window.scrollTo(0, 0);
                    }}
                >
                    <img
                        src="./logo.png"
                        alt="logo"
                        className="h-9 w-9 rounded-full object-contain"
                    />
                    <p className="cursor-pointer text-[18px] font-bold text-white">
                        Aman Dubey <span className="hidden sm:inline">| SOFTWARE ENGINEER</span>
                    </p>
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden list-none flex-row gap-7 sm:flex">
                    {navLinks.map((nav) => (
                        <li
                            key={nav.id}
                            className={`
                ${
                    active === nav.title ? "text-white" : "text-secondary"
                } cursor-pointer text-[18px] font-medium hover:text-white
              `}
                            onClick={() => setActive(nav.title)}
                        >
                            <a href={`#${nav.id}`}>{nav.title}</a>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Button */}
                <div className="flex sm:hidden">
                    <button
                        onClick={() => setToggle(!toggle)}
                        className="text-white focus:outline-none"
                    >
                        {toggle ? "Close" : "Menu"}
                    </button>
                </div>

                {/* Mobile Navigation Menu */}
                <div
                    className={`
            ${toggle ? "flex" : "hidden"}
            absolute right-0 top-20 z-10 mx-4 my-2 min-w-[140px]
            rounded-xl p-6 black-gradient
          `}
                >
                    <ul className="flex flex-1 list-none flex-col items-start justify-end">
                        {navLinks.map((nav) => (
                            <li
                                key={nav.id}
                                className={`
                  font-poppins cursor-pointer text-[18px] font-medium
                  ${active === nav.title ? "text-white" : "text-secondary"}
                `}
                                onClick={() => {
                                    setToggle(false);
                                    setActive(nav.title);
                                }}
                            >
                                <a href={`#${nav.id}`}>{nav.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

