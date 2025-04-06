import { BrowserRouter } from "react-router-dom";

import {
    About,
    Contact,
    Experience,
    Feedbacks,
    Profile,
    Navbar,
    SkillsSection,
    Works,
} from "./components";

const App = () => {
    return (
        <BrowserRouter>
            <div className="relative z-0 bg-primary">
                <div className="bg-hero-pattern  bg-cover bg-center bg-no-repeat">
                    <Navbar />
                    <Profile />
                </div>
                <About />
                <SkillsSection />
                <Experience />
                <Works />
                <Feedbacks />
                <Contact />
            </div>
        </BrowserRouter>
    );
};

export default App;

