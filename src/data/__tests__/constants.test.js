import {
    certifications,
    education,
    languages,
    navLinks,
    projects,
    publications,
    recommendations,
} from "../../constants";

describe("profile constants", () => {
    it("has a nav entry for every section rendered on the page", () => {
        expect(navLinks.map((n) => n.id)).toEqual([
            "about",
            "skills",
            "experience",
            "credentials",
            "impact",
            "projects",
            "recommendations",
            "contact",
        ]);
    });

    it("dates every certification with a month and year", () => {
        certifications.forEach((c) => {
            expect(c.issuer).toBeTruthy();
            expect(c.date).toMatch(/^[A-Z][a-z]{2} \d{4}$/);
        });
    });

    it("describes the degree, publication and languages", () => {
        expect(education[0].degree).toMatch(/Computer Science/);
        expect(publications[0].link).toMatch(/^https:\/\//);
        expect(languages.map((l) => l.name)).toEqual(["English", "Hindi"]);
    });

    it("links every recommender to LinkedIn and quotes them", () => {
        recommendations.forEach((r) => {
            expect(r.linkedIn).toMatch(/^https:\/\/www\.linkedin\.com\/in\//);
            expect(r.quote.length).toBeGreaterThan(40);
        });
    });

    it("gives every project a name, tags and either a link or an explicit null", () => {
        projects.forEach((p) => {
            expect(p.name).toBeTruthy();
            expect(p.tags.length).toBeGreaterThan(0);
            expect(p).toHaveProperty("live_link");
            expect(p).toHaveProperty("source_code_link");
        });
    });
});
