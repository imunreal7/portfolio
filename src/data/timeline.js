import { experiences } from "../constants";

const MONTHS = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
};

const parse = (token) => {
    if (/present/i.test(token)) {
        const now = new Date();
        return { y: now.getFullYear(), m: now.getMonth(), present: true };
    }
    const [mon, year] = token.trim().split(" ");
    return { y: Number(year), m: MONTHS[mon], present: false };
};

const toIndex = ({ y, m }) => y * 12 + m;

export const formatSpan = (months) => {
    const y = Math.floor(months / 12);
    const m = months % 12;
    const parts = [];
    if (y) parts.push(`${y} yr${y > 1 ? "s" : ""}`);
    if (m) parts.push(`${m} mo${m > 1 ? "s" : ""}`);
    return parts.join(" ") || "< 1 mo";
};

// Oldest first so the track reads left → right / top → bottom in time order.
export const roles = experiences
    .map((e, i) => {
        const [startRaw, endRaw] = e.date.split(" - ");
        const start = parse(startRaw);
        const end = parse(endRaw);
        const startIdx = toIndex(start);
        const endIdx = toIndex(end);
        return {
            id: `role-${i}`,
            title: e.title,
            company: e.company_name,
            location: e.location,
            date: e.date,
            points: e.points,
            start,
            end,
            startIdx,
            endIdx,
            months: endIdx - startIdx + 1, // both endpoint months count
            present: end.present,
            order: experiences.length - i,
        };
    })
    .sort((a, b) => a.startIdx - b.startIdx);

export const trackStart = Math.min(...roles.map((r) => r.startIdx));
export const trackEnd = Math.max(...roles.map((r) => r.endIdx));
export const trackYears = Array.from(
    { length: Math.floor(trackEnd / 12) - Math.floor(trackStart / 12) + 1 },
    (_, i) => Math.floor(trackStart / 12) + i,
);

export const positionOnTrack = (idx) => (idx - trackStart) / (trackEnd - trackStart);
