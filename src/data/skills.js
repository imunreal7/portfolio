import { technologies, tools } from "../constants";
import colors from "../theme/colors";

// Domain grouping is presentational. Names and icons come from the constants file.
const DOMAIN_OF = {
    JavaScript: "Languages",
    TypeScript: "Languages",
    Python: "Languages",
    Java: "Languages",
    "C/C++": "Languages",
    "Node JS": "Backend",
    "Express JS": "Backend",
    FastAPI: "Backend",
    Flask: "Backend",
    Django: "Backend",
    "React JS": "Frontend",
    Redux: "Frontend",
    Angular: "Frontend",
    "Vue.js": "Frontend",
    Pinia: "Frontend",
    "HTML 5": "Frontend",
    "CSS 3": "Frontend",
    "Tailwind CSS": "Frontend",
    AWS: "Cloud",
    "AWS Lambda": "Cloud",
    EC2: "Cloud",
    "AWS DynamoDB": "Data",
    "GCP Pub/Sub": "Cloud",
    "GCP Cloud Tasks": "Cloud",
    Docker: "Cloud",
    Kubernetes: "Cloud",
    Heroku: "Cloud",
    MongoDB: "Data",
    Redis: "Data",
    MySQL: "Data",
    Git: "Tooling",
};

export const DOMAINS = [
    { id: "Languages", color: colors.acc3 },
    { id: "Backend", color: colors.acc },
    { id: "Frontend", color: colors.sky },
    { id: "Cloud", color: colors.acc2 },
    { id: "Data", color: colors.danger },
    { id: "AI", color: colors.cyan },
    { id: "Tooling", color: colors.slate },
];

// Named on the resume or LinkedIn profile but without a logo asset: rendered as monogram nodes.
const extraNodes = [
    { name: "NestJS", domain: "Backend", weight: 3 },
    { name: "Next.js", domain: "Frontend", weight: 2 },
    { name: "Grafana", domain: "Tooling", weight: 1 },
    { name: "Jenkins", domain: "Tooling", weight: 1 },
    { name: "Neo4j", domain: "Data", weight: 1 },
    { name: "Qdrant", domain: "AI", weight: 1 },
    { name: "LangChain", domain: "AI", weight: 2 },
    { name: "TensorFlow", domain: "AI", weight: 1 },
    { name: "OpenCV", domain: "AI", weight: 1 },
    { name: "FAISS", domain: "AI", weight: 1 },
];

const weightFor = (index) => (index < 8 ? 3 : index < 18 ? 2 : 1);

export const skillNodes = [
    ...technologies.map((t, i) => ({
        name: t.name,
        icon: t.icon,
        domain: DOMAIN_OF[t.name] || "Tooling",
        weight: weightFor(i),
    })),
    ...tools.map((t) => ({ name: t.name, icon: t.icon, domain: "Tooling", weight: 1 })),
    ...extraNodes,
];
