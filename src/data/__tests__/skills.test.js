import { DOMAINS, skillNodes } from "../skills";
import { technologies, tools } from "../../constants";

describe("skill graph data", () => {
    it("includes every technology and tool from the constants", () => {
        const names = skillNodes.map((n) => n.name);
        [...technologies, ...tools].forEach((t) => expect(names).toContain(t.name));
    });

    it("assigns each node to a known domain", () => {
        const ids = DOMAINS.map((d) => d.id);
        skillNodes.forEach((n) => expect(ids).toContain(n.domain));
    });

    it("has no duplicate node names", () => {
        const names = skillNodes.map((n) => n.name);
        expect(new Set(names).size).toBe(names.length);
    });

    it("weights the most prominent technologies highest", () => {
        expect(skillNodes.find((n) => n.name === "TypeScript").weight).toBe(3);
        expect(skillNodes.find((n) => n.name === "Pinia").weight).toBe(1);
    });
});
