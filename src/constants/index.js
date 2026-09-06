const navLinks = [
    { id: "about", title: "About" },
    { id: "skills", title: "Skills" },
    { id: "experience", title: "Experience" },
    { id: "credentials", title: "Credentials" },
    { id: "impact", title: "Impact" },
    { id: "projects", title: "Projects" },
    { id: "recommendations", title: "Recommendations" },
    { id: "contact", title: "Contact" },
];

// Services you offer – ordered by resume emphasis
const services = [
    {
        title: "Distributed Systems & Cloud Architecture",
        icon: "../assets/microservices.png",
    },
    {
        title: "End-to-End Full Stack Engineering",
        icon: "../assets/full-stack.png",
    },
    {
        title: "AI-Powered Systems & Automation",
        icon: "../assets/cloud.png",
    },
    {
        title: "Team Leadership & Agile Delivery",
        icon: "../assets/team-lead.png",
    },
];

// Technologies you work with – prioritized by resume prominence
const technologies = [
    { name: "JavaScript", icon: "../assets/tech/javascript.png" },
    { name: "TypeScript", icon: "../assets/tech/typescript.png" },
    { name: "React JS", icon: "../assets/tech/reactjs.png" },
    { name: "Node JS", icon: "../assets/tech/nodejs.png" },
    { name: "AWS", icon: "../assets/tech/aws.png" },
    { name: "AWS Lambda", icon: "../assets/tech/lambda.png" },
    { name: "Express JS", icon: "../assets/tech/expressjs.png" },
    { name: "MongoDB", icon: "../assets/tech/mongodb.png" },
    { name: "Redis", icon: "../assets/tech/redis.png" },
    { name: "Redux", icon: "../assets/tech/redux.png" },
    { name: "Python", icon: "../assets/tech/python.png" },
    { name: "FastAPI", icon: "../assets/tech/fastapi.png" },
    { name: "Flask", icon: "../assets/tech/flask.png" },
    { name: "Django", icon: "../assets/tech/django.png" },
    { name: "HTML 5", icon: "../assets/tech/html.png" },
    { name: "CSS 3", icon: "../assets/tech/css.png" },
    { name: "Tailwind CSS", icon: "../assets/tech/tailwind.png" },
    { name: "Angular", icon: "../assets/tech/angular.png" },
    { name: "Java", icon: "../assets/tech/java.png" },
    { name: "C/C++", icon: "../assets/tech/cpp.png" },
    { name: "MySQL", icon: "../assets/tech/mysql.png" },
    { name: "AWS DynamoDB", icon: "../assets/tech/dynamodb.png" },
    { name: "Docker", icon: "../assets/tech/docker.png" },
    { name: "Kubernetes", icon: "../assets/tech/kubernetes.png" },
    { name: "Heroku", icon: "../assets/tech/heroku.png" },
    { name: "Git", icon: "../assets/tech/git.png" },
    { name: "EC2", icon: "../assets/tech/ec2.png" },
    { name: "Vue.js", icon: "../assets/tech/vuejs.png" },
    { name: "GCP Pub/Sub", icon: "../assets/tech/gcp-pubsub.png" },
    { name: "GCP Cloud Tasks", icon: "../assets/tech/gcp-cloudtasks.png" },
    { name: "Pinia", icon: "../assets/tech/pinia.png" },
];

// Tools & platforms you utilize – arranged by their practical impact
const tools = [
    { name: "Ubuntu", icon: "../assets/tools/ubuntu.png" },
    { name: "ChatGPT", icon: "../assets/tools/ChatGPT.png" },
    { name: "Jest", icon: "../assets/tools/jest.png" },
    { name: "Swagger", icon: "../assets/tools/swagger.png" },
    { name: "Doppler", icon: "../assets/tools/doppler.png" },
    { name: "Postman", icon: "../assets/tools/postman.png" },
    { name: "Git CI/CD", icon: "../assets/tools/cicd.png" },
    { name: "MongoDB Compass", icon: "../assets/tools/mongodbCompass.png" },
    { name: "Superset", icon: "../assets/tools/superset.png" },
    { name: "Snowflake", icon: "../assets/tools/snowflake.png" },
];

const experiences = [
    {
        title: "Lead Software Engineer",
        company_name: "HighLevel",
        location: "Dallas, Texas, United States · Remote",
        date: "Jun 2026 - Present",
        points: [
            "Leading tech initiatives at HighLevel: engineering for Social Planner, a distributed social media publishing platform processing 25M+ posts/month across major platforms with 99.2% uptime.",
            "Designed observability dashboards (Superset + Snowflake + Grafana) improving visibility across 10+ distributed services.",
            "Authored distributed system architecture documentation and onboarded 3 senior engineers, improving ramp-up efficiency.",
            "Tech Stack: TypeScript, Python, NestJS, Node.js, Vue.js, MongoDB, Redis, GCP Pub/Sub, Cloud Tasks, Kubernetes, Grafana.",
        ],
    },
    {
        title: "Senior Software Engineer (SDE III)",
        company_name: "HighLevel",
        location: "Dallas, Texas, United States · Remote",
        date: "Jun 2025 - May 2026",
        points: [
            "Owned core Social Planner systems end-to-end: publishing workflows, async workers, media pipelines, token lifecycle management, platform integrations, and production reliability.",
            "Delivered Pinterest Multi-Board Pin and LinkedIn Poll Post features end-to-end under Full Stack Builder (FSB), owning product analysis, system design, development, QA, deployment, and adoption tracking.",
            "Shipped features across Social Planner including Approval Flow, Integrations, Mobile UI, Alt Text Support, and Facebook Text Background Posts.",
            "Designed a CRON-based proactive token refresh system, reducing auth/token failures by 98%+ across 6M+ connected accounts.",
            "Built scalable media optimization pipelines processing 75M+ media assets/month, reducing posting support tickets by 85%.",
            "Reduced worker CPU/memory spikes by 95% through concurrency safeguards, distributed async worker systems, and infrastructure optimization using GCP Pub/Sub, Cloud Tasks, and batch processing.",
            "Improved release safety and regression detection by adding 5,200+ unit test cases with 97%+ coverage across critical modules.",
            "Created Engram, an AI-powered codebase intelligence system for impact analysis, dependency tracing and dead code detection, with Ayush Chaurasia at HighLevel's Dev Nitro Hackathon.",
            "Tech Stack: TypeScript, NestJS, Node.js, Vue.js, Pinia, MongoDB, Redis, GCP Pub/Sub, Cloud Tasks, Kubernetes, Jenkins, Grafana, Superset, Snowflake, Docker, Neo4j, Qdrant.",
        ],
    },
    {
        title: "Software Engineer",
        company_name: "ATMECS Global Inc",
        location: "Hyderabad, Telangana, India · On-site",
        date: "Apr 2023 - Jun 2025",
        points: [
            "Contributed to 5 projects under HyperloopTT, built 2 from ideation to production, and enhanced 3 with new features.",
            "Architected and scaled Lucy 2.0, a multi-tenant SaaS platform, from scratch using MERN Stack + AWS, delivering it to full production.",
            "Built an AI evaluation service via FastAPI, helping 90% of users make job decisions with NLP-based match explanations.",
            "Led a team of 12 engineers, accelerating feature releases by 50% in Agile methodology with 100% on-time deliveries.",
            "Optimized backend system by 50% via API redesign and query tuning; reduced bugs by 50% by implementing Jest unit tests.",
        ],
    },
    {
        title: "Associate Software Engineer",
        company_name: "ATMECS Global Inc",
        location: "Hyderabad, Telangana, India · On-site",
        date: "Apr 2021 - Mar 2023",
        points: [
            "Enhanced LinkedIn's contact management service backend performance by 30% via optimized APIs and queries using Java 8.",
            "Delivered MobilityOS by developing production-grade, serverless Lambda APIs with API Gateway, AWS CDN, and DynamoDB integration.",
            "Developed Lucy 1.0, a comprehensive contract management tool streamlining legal compliance, work-hour tracking, approval workflows, and compensation processing.",
        ],
    },
    {
        title: "Trainee Software Engineer",
        company_name: "ATMECS Global Inc",
        location: "Remote",
        date: "Feb 2021 - Apr 2021",
        points: [
            "Completed a certified Java Full-Stack Engineer training program covering Backend (Core Java, J2EE, Node.js, RESTful APIs, MongoDB, MySQL), DevOps tools (Docker, Kubernetes, Git, CI/CD) and Frontend (HTML5, CSS3, React, JavaScript, Angular).",
            "Enhanced the Hyperloop MobilityOS project by promptly resolving bugs and efficiently managing dependencies.",
        ],
    },
    {
        title: "Software Intern",
        company_name: "Department of Information Technology-AITR",
        location: "Indore, Madhya Pradesh, India · On-site",
        date: "May 2019 - Jul 2019",
        points: [
            "Gained hands-on experience with core AWS services, building a strong foundation in cloud computing.",
        ],
    },
];

const education = [
    {
        school: "Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV)",
        degree: "Bachelor of Engineering, Computer Science",
        date: "Aug 2016 - Aug 2020",
        location: "Madhya Pradesh, India",
        coursework: [
            "Data structures and algorithms",
            "Object-oriented technologies",
            "Analysis and design of algorithms",
            "Operating systems",
            "Database management systems",
            "Software engineering & project management",
            "Computer networking",
            "Cloud computing",
            "Compiler design",
            "Cybersecurity",
        ],
    },
];

const certifications = [
    {
        name: "The AI Engineer 2026: Complete AI Engineer Bootcamp",
        issuer: "Udemy",
        date: "Jan 2026",
    },
    {
        name: "Design Patterns And SOLID Principles with TypeScript",
        issuer: "Udemy",
        date: "May 2025",
    },
    { name: "Advanced TypeScript", issuer: "Udemy", date: "May 2025" },
    { name: "Docker and Kubernetes: The Complete Guide", issuer: "Udemy", date: "Apr 2025" },
    { name: "Java Full Stack Certification", issuer: "ATMECS Global Inc", date: "Aug 2021" },
    { name: "AI For Everyone", issuer: "DeepLearning.AI", date: "Apr 2020" },
    { name: "Cybersecurity Awareness and Innovation", issuer: "28DIGITAL", date: "Apr 2020" },
    {
        name: "MTA: HTML5 Application Development Fundamentals",
        issuer: "Microsoft",
        date: "Apr 2019",
    },
    { name: "MTA: Database Administration Fundamentals", issuer: "Microsoft", date: "Sep 2018" },
    { name: "MTA: Introduction to Programming Using Java", issuer: "Microsoft", date: "Feb 2018" },
];

const publications = [
    {
        title: "Fast and Efficient Decision-Based Tool for Hand Gesture Recognition",
        publisher: "IJSRD",
        date: "May 2020",
        link: "https://ijsrd.com/Article.php?manuscript=IJSRDV8I20695",
        summary:
            "A hand gesture recognition approach using a Convolutional Neural Network and OpenCV, built to help mute people communicate and express themselves.",
    },
];

const languages = [
    { name: "English", level: "Native or bilingual" },
    { name: "Hindi", level: "Native or bilingual" },
];

// Quotes are verbatim excerpts from LinkedIn recommendations (Ajay's has one duplicated word removed).
const recommendations = [
    {
        quote: "Aman stood out immediately for his hunger for knowledge and sharp intelligence. He consistently took ownership, asked the right questions, and proactively drove solutions when the path forward wasn't obvious. He combines technical depth with strong communication and reliability.",
        name: "Cristian Santibanez",
        designation: "Senior AI Advisor",
        company: "HyperloopTT",
        relation: "Managed Aman directly on Lucy by HyperloopTT",
        date: "Sep 2025",
        image: "../assets/pictures/Cristian.jpeg",
        linkedIn: "https://www.linkedin.com/in/csantibanez/",
    },
    {
        quote: "Aman's leadership and technical prowess make him an invaluable asset. His strategic vision and collaborative approach have driven outstanding team performance.",
        name: "Mauro Romano",
        designation: "CFO",
        company: "Lucy HyperloopTT",
        relation: "Client",
        date: "",
        image: "../assets/pictures/Mauro.jpeg",
        linkedIn: "https://www.linkedin.com/in/mauro-romano-9098469/",
    },
    {
        quote: "He is a great colleague and a team leader. His expertise in backend development, AWS and container technologies helped the project and the team to achieve objectives in record speed.",
        name: "Venugopal Chavate",
        designation: "Lead Software Engineer",
        company: "ATMECS Global Inc",
        relation: "Teammate at ATMECS",
        date: "Mar 2025",
        image: "../assets/pictures/venu.jpeg",
        linkedIn: "https://www.linkedin.com/in/venugopalvc/",
    },
    {
        quote: "Aman combines deep system-level thinking with strong coding skills. He led the Social Planner system, which helped scale the system to 10M+ posts per month without downtime. Beyond his technical expertise in Node.js, NestJS, and GCP, Aman stands out for his calm problem-solving, clear communication, and genuine leadership.",
        name: "Ajay Reddy",
        designation: "Lead Software Engineer",
        company: "HighLevel",
        relation: "Senior colleague at HighLevel",
        date: "Nov 2025",
        image: "../assets/pictures/ajay.jpeg",
        linkedIn: "https://www.linkedin.com/in/ajay-reddy-38835b168/",
    },
    {
        quote: "Aman is incredibly skilled in backend technologies and demonstrates a deep understanding of complex systems and problem-solving techniques. His ability to write clean, efficient, and scalable code has been instrumental in the success of our projects.",
        name: "Abdul Raffay",
        designation: "Lead Software Engineer",
        company: "Backend & Full Stack",
        relation: "Senior colleague on the same team",
        date: "Mar 2025",
        image: "../assets/pictures/raffay.jpeg",
        linkedIn: "https://www.linkedin.com/in/theabdulraffay/",
    },
    {
        quote: "Aman brought deep expertise across the stack, contributing clean, scalable code and innovative solutions to complex problems. As our team lead, Aman effectively coordinated efforts, kept the team aligned with project goals, and created a collaborative environment that encouraged growth and accountability.",
        name: "Mubasher M.",
        designation: "Development Team Lead",
        company: "Turing",
        relation: "Teammate on the Lucy platform",
        date: "Apr 2025",
        image: null,
        linkedIn: "https://www.linkedin.com/in/expert-mernstack-developer/",
    },
];

const projects = [
    {
        name: "Engram",
        date: "Feb 2026 - Present",
        description:
            "Codebase intelligence for AI coding agents, built with Ayush Chaurasia at HighLevel's Dev Nitro Hackathon. Indexes repositories into a Neo4j knowledge graph and Qdrant semantic search, links them with PRs, Slack, ClickUp, Jenkins deploys and git history, and exposes it all through an MCP server, CLI and web dashboard. On 85K+ symbol monorepos it answers impact, dependency and dead-code questions in a few queries.",
        tags: [
            { name: "Next.js", color: "blue-text-gradient" },
            { name: "Neo4j", color: "green-text-gradient" },
            { name: "Qdrant", color: "purple-text-gradient" },
            { name: "MCP", color: "pink-text-gradient" },
            { name: "AI Agents", color: "orange-text-gradient" },
        ],
        image: "../assets/engram.jpg",
        alt: "Engram",
        source_code_link:
            "https://www.linkedin.com/posts/amandubey7_ai-coding-agents-can-read-files-but-they-activity-7439913495913025536-qwfr",
        live_link:
            "https://www.linkedin.com/posts/amandubey7_ai-coding-agents-can-read-files-but-they-activity-7439913495913025536-qwfr",
    },
    {
        name: "Lucy HyperloopTT",
        date: "2021 - 2025",
        description:
            "Interface for job seekers & employers to manage recruiting processes efficiently. AI-powered evaluation system for user-job assessments, contract management tool, work-hour tracking, organization management tools, and compensations. Lucy 1.0 shipped as a contract management tool; Lucy 2.0 was architected from scratch as a multi-tenant SaaS platform.",
        tags: [
            { name: "MERN Stack", color: "blue-text-gradient" },
            { name: "AWS", color: "green-text-gradient" },
            { name: "Python", color: "pink-text-gradient" },
            { name: "FastAPI", color: "orange-text-gradient" },
        ],
        image: "../assets/lucy.jpg",
        alt: "Lucy HyperloopTT",
        source_code_link: "https://app.lucydigital.io/",
        live_link: "https://app.lucydigital.io/",
    },
    {
        name: "MobilityOS HyperloopTT",
        date: "Jul 2021 - Jan 2022",
        description:
            "An Android app for booking hotels, flights and activities worldwide. Built the serverless REST APIs on AWS Lambda with API Gateway, CloudFront and DynamoDB, managed the database, documented the project with Swagger and implemented a GitLab CI/CD pipeline.",
        tags: [
            { name: "AWS Lambda", color: "orange-text-gradient" },
            { name: "DynamoDB", color: "blue-text-gradient" },
            { name: "Node.js", color: "green-text-gradient" },
            { name: "Swagger", color: "pink-text-gradient" },
        ],
        image: null,
        alt: "MobilityOS HyperloopTT",
        source_code_link: null,
        live_link: null,
    },
    {
        name: "FoodPort",
        date: "Sep 2024 - Aug 2025",
        description:
            "AI-driven food delivery platform with personalized restaurant and dish recommendations based on user preferences and order history. Built with the MERN stack, FastAPI microservices, TensorFlow and FAISS vector search, with Redis caching that cut API response times by 40%. Deployed on AWS.",
        tags: [
            { name: "MERN Stack", color: "blue-text-gradient" },
            { name: "Redis", color: "green-text-gradient" },
            { name: "FastAPI", color: "pink-text-gradient" },
            { name: "TensorFlow", color: "orange-text-gradient" },
        ],
        image: "../assets/foodport.jpg",
        alt: "FoodPort",
        source_code_link: "https://github.com/imunreal7/FoodPort",
        live_link: "https://food-port-khaki.vercel.app/",
    },
    {
        name: "Micro-Spotify",
        date: "Mar 2025 - Jun 2025",
        description:
            "A microservices-based music streaming platform in the MERN stack with TypeScript. Four independently deployable services: JWT-based user auth, an admin service with Cloudinary storage and Redis caching, a song service on Neon PostgreSQL, and a React 19 + Vite + Tailwind frontend with playback controls.",
        tags: [
            { name: "TypeScript", color: "blue-text-gradient" },
            { name: "Microservices", color: "purple-text-gradient" },
            { name: "Redis", color: "green-text-gradient" },
            { name: "PostgreSQL", color: "orange-text-gradient" },
        ],
        image: null,
        alt: "Micro-Spotify",
        source_code_link: "https://github.com/imunreal7/micro-spotify",
        live_link: "https://github.com/imunreal7/micro-spotify",
    },
    {
        name: "Next Property",
        date: "Mar 2025 - May 2025",
        description:
            "A full-stack rental property platform on Next.js 14 with the App Router: dynamic listings, filtering by location, type and price, Cloudinary image upload, secure login and a dashboard for managing listings. Mobile-responsive and SEO-optimized, backed by MongoDB via Mongoose.",
        tags: [
            { name: "Next.js 14", color: "blue-text-gradient" },
            { name: "Tailwind CSS", color: "green-text-gradient" },
            { name: "MongoDB", color: "orange-text-gradient" },
            { name: "Cloudinary", color: "pink-text-gradient" },
        ],
        image: null,
        alt: "Next Property",
        source_code_link: "https://github.com/imunreal7/next-property",
        live_link: "https://next-property-omega.vercel.app",
    },
    {
        name: "LetsChat",
        date: "Nov 2024 - Dec 2024",
        description:
            "A real-time chat application designed to deliver secure chat communication with features like user authentication, responsive UI, and message persistence. LetsChat supports private conversations, group chats, and real-time updates over WebSockets.",
        tags: [
            { name: "MERN Stack", color: "blue-text-gradient" },
            { name: "WebSocket", color: "green-text-gradient" },
            { name: "JWT", color: "pink-text-gradient" },
        ],
        image: "../assets/LetsChat.jpg",
        alt: "LetsChat",
        source_code_link: "https://github.com/imunreal7/LetsChat",
        live_link: "https://resonant-creponne-468d86.netlify.app/",
    },
    {
        name: "My Recipes in Django",
        date: "Dec 2024 - Jan 2025",
        description:
            "A full-stack recipe management web application built with Django. Features include user registration, recipe creation, editing, and categories with a responsive UI, newsletters and chef connect features.",
        tags: [
            { name: "Python", color: "blue-text-gradient" },
            { name: "Django", color: "green-text-gradient" },
            { name: "SQLite", color: "orange-text-gradient" },
            { name: "HTML", color: "pink-text-gradient" },
            { name: "CSS", color: "purple-text-gradient" },
        ],
        image: "../assets/explore_recipes.jpg",
        alt: "My Recipes in Django",
        source_code_link: "https://github.com/imunreal7/my-recipes-in-django",
        live_link: "https://my-recipes-in-django.onrender.com/",
    },
    {
        name: "Snake Game",
        date: "",
        description:
            "A fun, modern take on the classic Snake Game built with ReactJS. Features include multiple difficulty levels, touch support for mobile devices, and a clean, minimalist UI. You must try it out!",
        tags: [
            { name: "React", color: "blue-text-gradient" },
            { name: "Tailwind CSS", color: "green-text-gradient" },
            { name: "Firebase", color: "orange-text-gradient" },
        ],
        image: "../assets/snake-game.jpg",
        alt: "Snake Game",
        source_code_link: "https://github.com/imunreal7/snake-game-react",
        live_link: "https://snake-game-a008f.web.app/",
    },
    {
        name: "Smart Therapist",
        date: "Jan 2019 - Apr 2019",
        description:
            "A web app where users can input details about their day; the app analyzes their emotions, provides their mood as output and sends alerts to family and doctor if the user is in a bad mood for back-to-back days.",
        tags: [
            { name: "Python", color: "blue-text-gradient" },
            { name: "Django", color: "green-text-gradient" },
            { name: "TensorFlow", color: "pink-text-gradient" },
        ],
        image: "../assets/smart-therapist.jpg",
        alt: "Smart Therapist",
        source_code_link: "https://github.com/imunreal7/smart_therapist",
        live_link: "https://smart-therapist.onrender.com/",
    },
    {
        name: "Hand Gesture Recognition",
        date: "Jan 2020 - May 2020",
        description:
            "Published research (IJSRD, May 2020) on an efficient decision-based hand gesture recognition system using background subtraction, a CNN and OpenCV, translating single-hand gestures into commands and audio to help mute people communicate.",
        tags: [
            { name: "CNN", color: "blue-text-gradient" },
            { name: "OpenCV", color: "green-text-gradient" },
            { name: "IJSRD", color: "pink-text-gradient" },
        ],
        image: "../assets/hand-gesture.jpg",
        alt: "Hand Gesture Recognition",
        source_code_link: "https://ijsrd.com/Article.php?manuscript=IJSRDV8I20695",
        live_link: "https://ijsrd.com/Article.php?manuscript=IJSRDV8I20695",
    },
];

export {
    navLinks,
    services,
    technologies,
    tools,
    experiences,
    education,
    certifications,
    publications,
    languages,
    recommendations,
    projects,
};
