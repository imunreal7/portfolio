// ─── Footer ──────────────────────────────────────────────────────────
// The bottom of the page. If you read this far, you scrolled past four canvases,
// a shader and a force graph without a single dropped frame. Thank you for noticing.

import { profile } from "../data/profile";

const Footer = () => (
    <footer className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 font-mono text-[11px] text-dim sm:flex-row sm:items-center sm:justify-between sm:px-10">
            <span>
                © {new Date().getFullYear()} {profile.name}. Thanks for scrolling.
            </span>
            <span className="flex items-center gap-4">
                <span>React · Tailwind · Framer Motion · Canvas</span>
                <span className="hidden sm:inline">·</span>
                <a href="#top" className="transition-colors hover:text-acc">
                    back to top ↑
                </a>
            </span>
        </div>
    </footer>
);

export default Footer;
