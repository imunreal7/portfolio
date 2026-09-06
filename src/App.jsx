import { MotionConfig } from "framer-motion";
import { PaletteProvider } from "./components/CommandPalette";
import { BootProvider } from "./components/Boot";
import Nav from "./components/Nav";
import TraceRail from "./components/TraceRail";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Credentials from "./components/Credentials";
import Impact from "./components/Impact";
import Projects from "./components/Projects";
import Recommendations from "./components/Recommendations";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const App = () => (
    // reducedMotion="user" makes every framer-motion transform respect the OS setting.
    <MotionConfig reducedMotion="user">
        <PaletteProvider>
            <BootProvider>
                <div className="noise relative isolate min-h-screen bg-bg text-ink">
                    <a href="#main" className="skip-link">
                        Skip to content
                    </a>
                    <Nav />
                    <TraceRail />
                    <main id="main">
                        <Hero />
                        <div className="grid-bg pointer-events-none absolute inset-x-0 top-[100svh] -z-10 h-[1400px]" />
                        <About />
                        <Skills />
                        <Experience />
                        <Credentials />
                        <Impact />
                        <Projects />
                        <Recommendations />
                        <Contact />
                    </main>
                    <Footer />
                </div>
            </BootProvider>
        </PaletteProvider>
    </MotionConfig>
);

export default App;
