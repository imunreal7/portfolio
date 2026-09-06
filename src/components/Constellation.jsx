import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { fitCanvas, watchResize, watchVisibility } from "../utils/canvas";
import { hexAlpha } from "../theme/palette";
import { useTheme } from "./Theme";

const NODE_SPACING = 130; // one node per ~130px square keeps density even across viewports
const LINK_DIST = 150;
const CURSOR_DIST = 240;
const CURSOR_PULL = 36; // px a node leans toward the pointer at zero distance
const DRIFT = { min: 5, max: 14 }; // px/s: slow enough to sit calmly behind the copy
const tones = (p) => [p.acc, p.acc2, p.sky, p.haze];

// Softens the mesh behind the headline and copy so the words stay easy to read.
const TEXT_MASK =
    "radial-gradient(ellipse 46% 44% at 28% 55%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,1) 100%)";

const rand = (min, max) => min + Math.random() * (max - min);

// A slowly drifting mesh of nodes: connected services in a distributed system.
// Nodes near the cursor light up and link to it, but the drift itself never hurries.
const Constellation = () => {
    const canvasRef = useRef(null);
    const reduce = useReducedMotion();
    const { palette } = useTheme();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const PALETTE = tones(palette);
        let w = 0;
        let h = 0;
        let running = true;
        let visible = true;
        let frame = 0;
        let last = performance.now();
        const mouse = { x: -9999, y: -9999 };
        let nodes = [];

        const makeNode = () => {
            const angle = rand(0, Math.PI * 2);
            const speed = rand(DRIFT.min, DRIFT.max);
            return {
                x: rand(0, w),
                y: rand(0, h),
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                r: rand(1, 2.2),
                hub: Math.random() < 0.12,
                color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
                phase: rand(0, Math.PI * 2),
            };
        };

        const resize = () => {
            ({ w, h } = fitCanvas(canvas, ctx));
            const count = Math.round((w * h) / (NODE_SPACING * NODE_SPACING));
            nodes = Array.from({ length: count }, makeNode);
            if (reduce) draw(0);
        };

        const move = (n, dt) => {
            n.x += n.vx * dt;
            n.y += n.vy * dt;
            if (n.x < -10) n.x = w + 10;
            if (n.x > w + 10) n.x = -10;
            if (n.y < -10) n.y = h + 10;
            if (n.y > h + 10) n.y = -10;
        };

        // Where a node is drawn: its drift position, leaning toward a nearby pointer.
        const place = (n) => {
            const dx = mouse.x - n.x;
            const dy = mouse.y - n.y;
            const d = Math.hypot(dx, dy);
            if (d > CURSOR_DIST || d === 0) return { x: n.x, y: n.y, d: Infinity };
            const k = ((1 - d / CURSOR_DIST) * CURSOR_PULL) / d;
            return { x: n.x + dx * k, y: n.y + dy * k, d };
        };

        const drawLinks = (pts) => {
            ctx.lineWidth = 1;
            for (let i = 0; i < pts.length; i += 1) {
                const a = pts[i];
                for (let j = i + 1; j < pts.length; j += 1) {
                    const b = pts[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const d = Math.hypot(dx, dy);
                    if (d > LINK_DIST) continue;
                    ctx.strokeStyle = hexAlpha(palette.haze, (1 - d / LINK_DIST) * 0.22);
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        };

        // The pointer becomes a hub: a soft glow, a ring, and links to every node in reach.
        const drawCursor = (pts, t) => {
            if (mouse.x < -1000) return;
            const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 180);
            glow.addColorStop(0, hexAlpha(palette.acc, 0.16));
            glow.addColorStop(1, hexAlpha(palette.acc, 0));
            ctx.fillStyle = glow;
            ctx.fillRect(mouse.x - 180, mouse.y - 180, 360, 360);

            pts.forEach((p) => {
                if (p.d > CURSOR_DIST) return;
                ctx.strokeStyle = hexAlpha(palette.acc, (1 - p.d / CURSOR_DIST) * 0.55);
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            });

            const pulse = 0.5 + 0.5 * Math.sin(t / 500);
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 10 + pulse * 6, 0, Math.PI * 2);
            ctx.strokeStyle = hexAlpha(palette.acc, 0.6 - pulse * 0.3);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = palette.acc;
            ctx.fill();
        };

        const drawNodes = (pts, t) => {
            pts.forEach((p, i) => {
                const n = nodes[i];
                const near = p.d < CURSOR_DIST;
                const pulse = 0.5 + 0.5 * Math.sin(t / 1200 + n.phase);
                if (n.hub || near) {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, n.r + 6 + pulse * 4, 0, Math.PI * 2);
                    ctx.fillStyle = hexAlpha(n.color, near ? 0.28 : 0.1);
                    ctx.fill();
                }
                ctx.beginPath();
                ctx.arc(p.x, p.y, n.r + (n.hub || near ? 0.8 : 0), 0, Math.PI * 2);
                ctx.fillStyle = hexAlpha(n.color, n.hub || near ? 0.95 : 0.6 + pulse * 0.2);
                ctx.fill();
            });
        };

        const draw = (t) => {
            ctx.clearRect(0, 0, w, h);
            const pts = nodes.map(place);
            drawLinks(pts);
            drawCursor(pts, t);
            drawNodes(pts, t);
        };

        const step = (now) => {
            if (!running) return;
            frame = requestAnimationFrame(step);
            if (!visible) return;
            const dt = Math.min(0.05, (now - last) / 1000);
            last = now;
            nodes.forEach((n) => move(n, dt));
            draw(now);
        };

        const onLeave = () => {
            mouse.x = -9999;
            mouse.y = -9999;
        };
        // Tracked on the window because the copy layer above the canvas would swallow events.
        const onMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
                onLeave();
                return;
            }
            mouse.x = x;
            mouse.y = y;
        };

        const host = canvas.parentElement;
        resize();
        const stopResize = watchResize(host, resize);
        const stopVisibility = watchVisibility(canvas, (v) => {
            visible = v;
            last = performance.now();
        });
        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("pointerleave", onLeave);
        document.addEventListener("pointerleave", onLeave);
        if (!reduce) frame = requestAnimationFrame(step);

        return () => {
            running = false;
            cancelAnimationFrame(frame);
            stopResize();
            stopVisibility();
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerleave", onLeave);
            document.removeEventListener("pointerleave", onLeave);
        };
    }, [reduce, palette]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0"
            style={{ WebkitMaskImage: TEXT_MASK, maskImage: TEXT_MASK }}
            aria-hidden="true"
        />
    );
};

export default Constellation;
