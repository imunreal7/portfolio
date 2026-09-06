// Identity and contact facts. Everything here is copied from the previous site verbatim.
export const profile = {
    name: "Aman Dubey",
    firstName: "Aman",
    role: "Lead Software Engineer",
    company: "HighLevel",
    product: "Social Planner",
    location: "Delhi, India",
    shortLocation: "Delhi, India",
    pronouns: "he/him",
    headline:
        "Distributed Systems, Microservices & Cloud Architecture | Node.js, NestJS, MERN, AWS, GCP | AI Agentic Systems",
    connections: "500+",
    timeZone: "Asia/Kolkata",
    yearsLabel: "6+",
    avatar: "./myImage.png",
    logo: "./logo.png",
    tagline:
        "I build scalable, cloud-native platforms processing millions using NestJS, Python, TypeScript, GCP & AWS.",
    about: "I am a Lead Software Engineer with over 6 years of experience designing, building, and scaling distributed, cloud-native platforms. Currently, I lead engineering for Social Planner at HighLevel — a platform processing 25M+ posts/month with 99.2% uptime across major social channels. My expertise spans Node.js, NestJS, TypeScript, Python, Vue.js, and AWS & GCP architectures, with a focus on distributed systems, microservices, AI-powered systems, and driving reliability through technical mentorship & cross-functional collaboration.",
    email: "amandubey1681999@gmail.com",
    phone: "+91 9039163669",
    phoneHref: "tel:+919039163669",
};

export const links = {
    email: "https://mail.google.com/mail/?view=cm&fs=1&to=amandubey1681999@gmail.com",
    linkedin: "https://www.linkedin.com/in/amandubey7/",
    github: "https://github.com/imunreal7",
    resume: "https://drive.google.com/file/d/1MOX838bcl875ctisdutZFkUa1N2GwOP6/view?usp=drive_link",
    instagram: "https://www.instagram.com/imunreal7/",
    whatsapp: "https://wa.link/qc2l7l",
    facebook: "https://www.facebook.com/share/1A8PAnBib6/",
};

// Headline figures from the resume. `perMonth` values drive the live hero counters.
export const platform = {
    postsPerMonth: 25_000_000,
    mediaPerMonth: 75_000_000,
    uptime: 99.2,
    connectedAccounts: 6_000_000,
    services: 10,
};

// Stages of the Social Planner publishing path, each one named in the resume bullets.
export const pipeline = [
    { id: "schedule", label: "schedule", detail: "25M+ posts / month" },
    { id: "optimize", label: "optimize media", detail: "75M+ assets / month" },
    { id: "refresh", label: "refresh tokens", detail: "6M+ connected accounts" },
    { id: "publish", label: "publish", detail: "99.2% uptime" },
];
