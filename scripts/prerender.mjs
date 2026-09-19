// Post-build prerender: serves ./build, renders the page in headless Chrome,
// and writes the resulting HTML back into build/index.html so crawlers get
// real content instead of an empty <div id="root">.

import http from "node:http";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const BUILD_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "build");
const INDEX = path.join(BUILD_DIR, "index.html");
const SETTLE_MS = 1500;

const MIME = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".ico": "image/x-icon",
    ".woff2": "font/woff2",
};

const serve = () =>
    new Promise((resolve) => {
        const server = http.createServer(async (req, res) => {
            const url = new URL(req.url, "http://localhost");
            const file = path.join(BUILD_DIR, url.pathname === "/" ? "index.html" : url.pathname);
            try {
                const body = await fs.readFile(file);
                res.writeHead(200, {
                    "Content-Type": MIME[path.extname(file)] || "application/octet-stream",
                });
                res.end(body);
            } catch {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(await fs.readFile(INDEX));
            }
        });
        server.listen(0, "127.0.0.1", () => resolve(server));
    });

const scrollToBottom = () =>
    new Promise((done) => {
        const step = () => {
            const before = window.scrollY;
            window.scrollBy(0, window.innerHeight);
            if (window.scrollY === before) return done();
            setTimeout(step, 100);
        };
        step();
    });

const main = async () => {
    const server = await serve();
    const { port } = server.address();
    const origin = `http://127.0.0.1:${port}`;
    const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 1366, height: 900 });
        // Only talk to the local server. External requests (Google Fonts) are aborted so the
        // render never depends on network access from the build machine.
        await page.setRequestInterception(true);
        page.on("request", (req) => (req.url().startsWith(origin) ? req.continue() : req.abort()));
        await page.goto(`${origin}/`, { waitUntil: "load", timeout: 60_000 });
        await page.waitForSelector("#root h1", { timeout: 60_000 });
        // Scroll through the page so scroll-triggered sections render their content.
        await page.evaluate(scrollToBottom);
        await new Promise((r) => setTimeout(r, SETTLE_MS));
        await page.evaluate(() => window.scrollTo(0, 0));
        await new Promise((r) => setTimeout(r, 300));

        // Strip framer-motion's in-flight inline styles so no text is left at opacity 0
        // in the static HTML. The animations are re-applied on the client once React mounts.
        await page.evaluate(() => {
            document.querySelectorAll("#root [style]").forEach((el) => {
                el.style.removeProperty("opacity");
                el.style.removeProperty("transform");
                if (!el.getAttribute("style")) el.removeAttribute("style");
            });
        });

        const html = await page.evaluate(
            () => "<!doctype html>" + document.documentElement.outerHTML,
        );
        const rootText = await page.evaluate(
            () => document.getElementById("root").innerText.length,
        );
        if (rootText < 1000)
            throw new Error(`Prerender produced too little content (${rootText} chars)`);

        await fs.writeFile(INDEX, html);
        console.log(
            `Prerendered build/index.html (${html.length} bytes, ${rootText} chars of text)`,
        );
    } finally {
        await browser.close();
        server.close();
    }
};

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
