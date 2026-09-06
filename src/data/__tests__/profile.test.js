import { links, pipeline, platform, profile } from "../profile";

describe("profile data", () => {
    it("exposes only https links", () => {
        Object.values(links).forEach((url) => expect(url).toMatch(/^https:\/\//));
    });

    it("derives a sensible per-second publish rate", () => {
        const perSecond = platform.postsPerMonth / (30 * 24 * 3600);
        expect(perSecond).toBeCloseTo(9.65, 1);
    });

    it("describes the four pipeline stages in order", () => {
        expect(pipeline.map((s) => s.id)).toEqual(["schedule", "optimize", "refresh", "publish"]);
    });

    it("has a valid contact email", () => {
        expect(profile.email).toMatch(/^[^@]+@[^@]+\.[a-z]+$/);
    });
});
