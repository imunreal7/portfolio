import { formatSpan, positionOnTrack, roles, trackEnd, trackStart } from "../timeline";
import { experiences } from "../../constants";

describe("timeline", () => {
    it("keeps one role per experience entry, oldest first", () => {
        expect(roles).toHaveLength(experiences.length);
        for (let i = 1; i < roles.length; i += 1) {
            expect(roles[i].startIdx).toBeGreaterThanOrEqual(roles[i - 1].startIdx);
        }
    });

    it("parses month/year tokens into ordinal month indexes", () => {
        const intern = roles.find((r) => r.company.includes("AITR"));
        expect(intern.start).toEqual({ y: 2019, m: 4, present: false });
        expect(intern.end).toEqual({ y: 2019, m: 6, present: false });
        expect(intern.months).toBe(3);
    });

    it("marks the current role as present and open-ended", () => {
        const current = roles.find((r) => r.present);
        expect(current.company).toBe("HighLevel");
        expect(current.title).toBe("Lead Software Engineer");
        expect(current.endIdx).toBe(trackEnd);
    });

    it("keeps the two HighLevel roles contiguous", () => {
        const [senior, lead] = roles.filter((r) => r.company === "HighLevel");
        expect(senior.endIdx).toBe(lead.startIdx - 1);
    });

    it("maps the track boundaries to 0 and 1", () => {
        expect(positionOnTrack(trackStart)).toBe(0);
        expect(positionOnTrack(trackEnd)).toBe(1);
    });

    it("formats durations in years and months", () => {
        expect(formatSpan(0)).toBe("< 1 mo");
        expect(formatSpan(1)).toBe("1 mo");
        expect(formatSpan(14)).toBe("1 yr 2 mos");
        expect(formatSpan(24)).toBe("2 yrs");
    });
});
