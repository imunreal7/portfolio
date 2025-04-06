const navLinks = [
    {
        id: "about",
        title: "About",
    },
    {
        id: "skills",
        title: "Skills",
    },
    {
        id: "experience",
        title: "Experience",
    },
    {
        id: "projects",
        title: "Projects",
    },
    {
        id: "feedbacks",
        title: "Recommendations",
    },
    {
        id: "contact",
        title: "Contact",
    },
];

// Services you offer – ordered by resume emphasis
const services = [
    {
        title: "End-to-End Full Stack Developer",
        icon: "../assets/full-stack.png",
    },
    {
        title: "Cloud & DevOps Specialist",
        icon: "../assets/cloud.png",
    },
    {
        title: "Microservices & System Designs",
        icon: "../assets/microservices.png",
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
];

const experiences = [
    {
        title: "Software Engineer",
        company_name: "ATMECS Global Inc",
        icon: "../assets/team-lead.png",
        iconBg: "#383E56",
        date: "Apr 2023 - Present",
        points: [
            "Engineered the Lucy 2.0 MVP by architecting a scalable, multi-tenant web application featuring RESTful APIs, robust database design, comprehensive Jest testing, Dockerized deployments, and React-driven frontend.",
            "Led cross-functional teams of 12 engineers to enhance client communications and boost feature delivery speed by 50%.",
            "Contributed to 5 projects under Lucy HyperloopTT, built two from ideation to production, and enhanced three with new features.",
            "Built an AI evaluation service via FastAPI, helping 90% of users make job decisions with NLP-based match explanations.",
            " Optimized backend performance of Lucy 2.0 by 50% through API redesign, data model refactoring, and query optimizations.",
        ],
    },
    {
        title: "Associate Software Engineer",
        company_name: "ATMECS Global Inc",
        icon: "../assets/microservices.png",
        iconBg: "#383E56",
        date: "Apr 2021 - Mar 2023",
        points: [
            "Enhanced LinkedIn’s contact management service backend performance by 30% via optimized APIs and queries using Java 8",
            "Delivered MobilityOS by developing production-grade, serverless Lambda APIs with API Gateway, AWS CDN, and DynamoDB integration.",
            "Developed Lucy 1.0, a comprehensive contract management tool streamlining legal compliance, work-hour tracking, approval workflows, and compensation processing.",
        ],
    },
    {
        title: "Trainee Software Engineer",
        company_name: "ATMECS Global Inc",
        icon: "../assets/full-stack.png",
        iconBg: "#383E56",
        date: "Feb 2021 - Apr 2021",
        points: [
            "Completed a certified full-stack training program covering Backend (Core Java, J2EE, Node.js, RESTful APIs, MongoDB, MySQL), and DevOps tools (Docker, Kubernetes, Git, CI/CD),Frontend (HTML5, CSS3, React, JavaScript, Angular).",
            "Enhanced the Hyperloop MobilityOS project by promptly resolving bugs and efficiently managing dependencies.",
        ],
    },
    {
        title: "Software Intern",
        company_name: "Department of Information Technology-AITR",
        icon: "../assets/cloud.png",
        iconBg: "black",
        date: "May 2019 - Jul 2019",
        points: [
            "Gained hands-on experience with core AWS services, building a strong foundation in cloud computing.",
        ],
    },
];

const recommedations = [
    {
        recommedation:
            "Aman consistently delivers exceptional solutions with a deep technical insight. As a client, I appreciate his clear communication and commitment to excellence.",
        name: "Cristian Santibanez",
        designation: "Client",
        company: "ATMECS Global Inc",
        image: "../assets/pictures/Cristian.jpeg",
        linkedIn: "https://www.linkedin.com/in/csantibanez/",
    },
    {
        recommedation:
            "Aman's leadership and technical prowess make him an invaluable asset. His strategic vision and collaborative approach have driven outstanding team performance.",
        name: "Mauro Romano",
        designation: "CFO",
        company: "Lucy HyperloopTT",
        image: "../assets/pictures/Mauro.jpeg",
        linkedIn: "https://www.linkedin.com/in/mauro-romano-9098469/",
    },
    {
        recommedation:
            "Working under Aman's leadership has been a pleasure. His innovative problem-solving and expertise in backend and cloud technologies consistently elevate our projects.",
        name: "Venugopal Chavate",
        designation: "Senior Software Engineer",
        company: "ATMECS Global Inc",
        image: "../assets/pictures/venu.jpeg",
        linkedIn: "https://www.linkedin.com/in/venugopalvc/",
    },
];

export default recommedations;

const projects = [
    {
        name: "Lucy HyperloopTT",
        description:
            "Interface for job seekers & employers to manage recruiting processes efficiently. AI-powered evaluation system for user-job assessments, contract management tool, work-hour tracking, organization management tools, and compensations.",
        tags: [
            {
                name: "MERN Stack",
                color: "blue-text-gradient",
            },
            {
                name: "AWS",
                color: "green-text-gradient",
            },
            {
                name: "Python",
                color: "pink-text-gradient",
            },
            {
                name: "FastAPI",
                color: "orange-text-gradient",
            },
        ],
        image: "../assets/lucy.png",
        alt: "Portfolio",
        source_code_link: "https://app.lucydigital.io/",
        live_link: "https://app.lucydigital.io/",
    },
    {
        name: "LetsChat",
        description:
            "A real-time chat application designed to deliver secure chat communication with features like user authentication, responsive UI, and message persistence. LetsChat supports private conversations, group chats, and real-time updates.",
        tags: [
            {
                name: "MERN Stack",
                color: "blue-text-gradient",
            },
            {
                name: "WebSocket",
                color: "green-text-gradient",
            },
            {
                name: "JWT",
                color: "pink-text-gradient",
            },
        ],
        image: "../assets/LetsChat.png",
        alt: "LetsChat",
        source_code_link: "https://github.com/imunreal7/LetsChat",
        live_link: "https://resonant-creponne-468d86.netlify.app/",
    },
    {
        name: "FoodPort",
        description:
            "FoodPort is an AI-driven online food delivery platform that offers personalized restaurant and dish recommendations based on user preferences. User can browse restaurants, select dishes and place orders with  account management and order history features.",
        tags: [
            {
                name: "MERN Stack",
                color: "blue-text-gradient",
            },
            {
                name: "Redux",
                color: "green-text-gradient",
            },
            {
                name: "AWS",
                color: "pink-text-gradient",
            },
            {
                name: "Python",
                color: "orange-text-gradient",
            },
        ],
        image: "../assets/foodport.png",
        alt: "FoodPort",
        source_code_link: "https://github.com/imunreal7/FoodPort",
        live_link: "https://food-port-khaki.vercel.app/",
    },
    {
        name: "Smart Therapist",
        description:
            "Developed a web app where users can input details about their day, and the app analyzes their emotions, provide their mood as output and sends alerts to family and doctor if user is in a bad mood for back-to-back days.",
        tags: [
            {
                name: "Python",
                color: "blue-text-gradient",
            },
            {
                name: "Django",
                color: "green-text-gradient",
            },
            {
                name: "TensorFlow",
                color: "pink-text-gradient",
            },
        ],
        image: "../assets/smart-therapist.png",
        alt: "Smart Therapist",
        source_code_link: "https://github.com/imunreal7/smart_therapist",
        live_link: "https://smart-therapist.onrender.com/",
    },
    {
        name: "My Recipes in Django",
        description:
            "A full-stack recipe management web application built with Django. Features include user registration, recipe creation, editing, and categories with a responsive UI, newsletters and chef connect features.",
        tags: [
            {
                name: "Python",
                color: "blue-text-gradient",
            },
            {
                name: "Django",
                color: "green-text-gradient",
            },
            {
                name: "SQLite",
                color: "orange-text-gradient",
            },
            {
                name: "HTML",
                color: "pink-text-gradient",
            },
            {
                name: "CSS",
                color: "purple-text-gradient",
            },
        ],
        image: "../assets/explore_recipes.png",
        alt: "My Recipes in Django",
        source_code_link: "https://github.com/imunreal7/my-recipes-in-django",
        live_link: "https://my-recipes-in-django.onrender.com/",
    },
    {
        name: "Snake Game",
        description:
            "A fun, modern take on the classic Snake Game built with ReactJS. Features include multiple difficulty levels, touch support for mobile devices, and a clean, minimalist UI. You must try it out!",
        tags: [
            {
                name: "React",
                color: "blue-text-gradient",
            },
            {
                name: "Tailwind CSS",
                color: "green-text-gradient",
            },
            {
                name: "Firebase",
                color: "orange-text-gradient",
            },
        ],
        image: "../assets/snake-game.png",
        alt: "Snake Game",
        source_code_link: "https://github.com/imunreal7/snake-game-react",
        live_link: "https://snake-game-a008f.web.app/",
    },
];

export { navLinks, services, technologies, tools, recommedations, projects, experiences };

