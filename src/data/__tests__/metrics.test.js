import { metrics } from "../metrics";
import { experiences } from "../../constants";

const allBullets = experiences.flatMap((e) => e.points).join(" ");

describe("impact metrics", () => {
    it("uses unique ids", () => {
        const ids = metrics.map((m) => m.id);
        expect(new Set(ids).size).toBe(ids.length);
    });

    it("only shows numbers that appear in the experience bullets", () => {
        metrics.forEach((m) => {
            const printed = m.value.toLocaleString("en-US", {
                minimumFractionDigits: m.decimals || 0,
                maximumFractionDigits: m.decimals || 0,
            });
            expect(allBullets).toContain(printed);
        });
    });

    it("keeps percentage bars within 0-100", () => {
        metrics
            .filter((m) => m.bar !== undefined)
            .forEach((m) => {
                expect(m.bar).toBeGreaterThan(0);
                expect(m.bar).toBeLessThanOrEqual(100);
            });
    });
});
