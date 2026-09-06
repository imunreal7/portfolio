// ─── Skill graph ─────────────────────────────────────────────────────
// A live force-directed graph of every technology on the resume, clustered by
// what it does. Drag nodes, hover for names, and watch physics do the layout so
// nobody has to argue about where Redis goes. (Data. It goes in Data.)

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { DOMAINS, skillNodes } from "../data/skills";
import { fitCanvas, watchResize, watchVisibility } from "../utils/canvas";
import { hexAlpha } from "../theme/palette";
import { useTheme } from "./Theme";

const HUB_PULL = 1.1;
const FOCUS_PULL = 3.2;
const EXILE_PULL = 2.8;
const REPEL = 18;
const DAMPING = 0.86;
const WARM_UP_STEPS = 240;
const INTERACTION_STEPS = 20;
const MOBILE = 640;
const FONT = "'JetBrains Mono', monospace";

const radiusFor = (weight, base) => base * (weight === 3 ? 1.55 : weight === 2 ? 1.25 : 1);
const evenly = (i, count, pad) => (count === 1 ? 0.5 : pad + (1 - 2 * pad) * (i / (count - 1)));

/**
 * Force-directed constellation of every technology and tool from the constants file.
 * Nodes cluster by domain, repel each other, can be dragged, and `filter` pulls one domain to
 * the centre while pushing the rest to the rim. Under prefers-reduced-motion the layout settles
 * once and only redraws on interaction.
 */
const SkillGraph = ({ filter }) => {
    const canvasRef = useRef(null);
    const filterRef = useRef(filter);
    const reduce = useReducedMotion();
    const { palette } = useTheme();

    useEffect(() => {
        filterRef.current = filter;
    }, [filter]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        let w = 0;
        let h = 0;
        let running = true;
        let visible = true;
        let iconsRequested = false;
        let frame = 0;
        let hovered = null;
        let dragging = null;
        const pointer = { x: -9999, y: -9999 };

        const nodes = skillNodes.map((n) => ({ ...n, x: 0, y: 0, vx: 0, vy: 0, r: 0, img: null }));
        const hubs = Object.fromEntries(
            DOMAINS.map((d) => [
                d.id,
                {
                    x: 0,
                    y: 0,
                    color: palette[d.tone],
                    label: d.id,
                    members: nodes.filter((n) => n.domain === d.id),
                },
            ]),
        );
        const isMobile = () => w < MOBILE;

        // Icons are ~3 MB in total, so they only start loading once the graph scrolls into view.
        const loadIcons = () => {
            if (iconsRequested) return;
            iconsRequested = true;
            nodes.forEach((n) => {
                if (!n.icon) return;
                const img = new Image();
                img.decoding = "async";
                img.onload = () => {
                    n.img = img;
                };
                img.src = n.icon;
            });
        };

        const layoutHubs = () => {
            const count = DOMAINS.length;
            const cols = isMobile() ? 2 : Math.ceil(count / 2);
            const rows = Math.ceil(count / cols);
            DOMAINS.forEach((d, i) => {
                hubs[d.id].x = evenly(i % cols, cols, isMobile() ? 0.27 : 0.12) * w;
                hubs[d.id].y = evenly(Math.floor(i / cols), rows, isMobile() ? 0.11 : 0.3) * h;
            });
        };

        const resize = () => {
            const first = w === 0;
            ({ w, h } = fitCanvas(canvas, ctx));
            const base = Math.max(12, Math.min(w, h) / 34);
            nodes.forEach((n) => {
                n.r = radiusFor(n.weight, base);
            });
            layoutHubs();
            if (first) {
                nodes.forEach((n) => {
                    const hub = hubs[n.domain];
                    n.x = hub.x + (Math.random() - 0.5) * 80;
                    n.y = hub.y + (Math.random() - 0.5) * 80;
                });
            }
        };

        const nodeAt = (x, y) => {
            for (let i = nodes.length - 1; i >= 0; i -= 1) {
                const n = nodes[i];
                if ((n.x - x) ** 2 + (n.y - y) ** 2 < (n.r + 4) ** 2) return n;
            }
            return null;
        };

        // Where a node wants to be: its hub, the centre when its domain is selected,
        // or the rim when another domain is.
        const targetFor = (n, active) => {
            const hub = hubs[n.domain];
            if (!active) return { x: hub.x, y: hub.y, k: HUB_PULL };
            if (n.domain === active) return { x: w / 2, y: h / 2, k: FOCUS_PULL };
            const ang = Math.atan2(hub.y - h / 2, hub.x - w / 2);
            const rim = Math.min(w, h) * 0.46;
            const stretch = w / h > 1.4 ? 1.6 : 1;
            return {
                x: w / 2 + Math.cos(ang) * rim * stretch,
                y: h / 2 + Math.sin(ang) * rim,
                k: EXILE_PULL,
            };
        };

        const simulate = (dt) => {
            const active = filterRef.current;
            const gap = isMobile() ? 14 : 26;
            nodes.forEach((n) => {
                if (n === dragging) return;
                const t = targetFor(n, active);
                n.vx += (t.x - n.x) * t.k * dt;
                n.vy += (t.y - n.y) * t.k * dt;
            });
            for (let i = 0; i < nodes.length; i += 1) {
                for (let j = i + 1; j < nodes.length; j += 1) {
                    const a = nodes[i];
                    const b = nodes[j];
                    const dx = b.x - a.x;
                    const dy = b.y - a.y;
                    const d2 = dx * dx + dy * dy || 0.01;
                    const min = a.r + b.r + gap;
                    if (d2 < min * min) {
                        const d = Math.sqrt(d2);
                        const push = ((min - d) / d) * REPEL * dt;
                        a.vx -= dx * push;
                        a.vy -= dy * push;
                        b.vx += dx * push;
                        b.vy += dy * push;
                    }
                }
            }
            nodes.forEach((n) => {
                if (n === dragging) {
                    n.x = pointer.x;
                    n.y = pointer.y;
                    n.vx = 0;
                    n.vy = 0;
                    return;
                }
                n.vx *= DAMPING;
                n.vy *= DAMPING;
                n.x = Math.max(n.r, Math.min(w - n.r, n.x + n.vx * dt * 10));
                n.y = Math.max(n.r, Math.min(h - n.r, n.y + n.vy * dt * 10));
            });
        };

        const drawNode = (n, alpha) => {
            const color = hubs[n.domain].color;
            const isHovered = n === hovered;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
            ctx.fillStyle = palette.raised;
            ctx.fill();
            ctx.lineWidth = isHovered ? 2 : 1;
            ctx.strokeStyle = isHovered ? palette.ink : color;
            ctx.stroke();
            if (n.img) {
                ctx.save();
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r - 3, 0, Math.PI * 2);
                ctx.clip();
                const s = (n.r - 3) * 1.5;
                ctx.drawImage(n.img, n.x - s / 2, n.y - s / 2, s, s);
                ctx.restore();
            } else {
                ctx.fillStyle = color;
                ctx.font = `600 ${Math.max(10, n.r * 0.8)}px ${FONT}`;
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(n.name.slice(0, 2), n.x, n.y + 1);
            }
            if (isHovered || (filterRef.current === n.domain && n.weight === 3)) {
                ctx.fillStyle = isHovered ? palette.ink : hexAlpha(palette.ink, 0.75);
                ctx.font = `500 11px ${FONT}`;
                ctx.textAlign = "center";
                ctx.textBaseline = "top";
                ctx.fillText(isHovered ? `${n.name} · ${n.domain}` : n.name, n.x, n.y + n.r + 6);
            }
            ctx.globalAlpha = 1;
        };

        const drawHubLabels = () => {
            Object.values(hubs).forEach((hub) => {
                const top = Math.min(...hub.members.map((n) => n.y - n.r));
                const cx = hub.members.reduce((sum, n) => sum + n.x, 0) / hub.members.length;
                ctx.globalAlpha = 0.8;
                ctx.fillStyle = hub.color;
                ctx.font = `500 10px ${FONT}`;
                ctx.textAlign = "center";
                ctx.textBaseline = "bottom";
                ctx.fillText(hub.label.toUpperCase(), cx, Math.max(12, top - 10));
            });
            ctx.globalAlpha = 1;
        };

        const draw = () => {
            const active = filterRef.current;
            ctx.fillStyle = palette.bg;
            ctx.fillRect(0, 0, w, h);
            if (!active) drawHubLabels();
            nodes.forEach((n) => {
                const dimmed = active && active !== n.domain;
                const anchor = active && !dimmed ? { x: w / 2, y: h / 2 } : hubs[n.domain];
                ctx.beginPath();
                ctx.moveTo(anchor.x, anchor.y);
                ctx.lineTo(n.x, n.y);
                ctx.strokeStyle = hubs[n.domain].color;
                ctx.globalAlpha = dimmed ? 0.04 : 0.14;
                ctx.lineWidth = 1;
                ctx.stroke();
            });
            ctx.globalAlpha = 1;
            nodes.forEach((n) => drawNode(n, active && active !== n.domain ? 0.18 : 1));
            if (hovered) drawNode(hovered, 1);
        };

        let last = performance.now();
        const loop = (now) => {
            if (!running) return;
            frame = requestAnimationFrame(loop);
            if (!visible) return;
            const dt = Math.min(0.05, (now - last) / 1000);
            last = now;
            simulate(dt);
            draw();
        };

        // Reduced motion: a bounded burst of physics, then a single repaint.
        const settle = (steps) => {
            for (let i = 0; i < steps; i += 1) simulate(1 / 60);
            draw();
        };
        const afterInteraction = () => {
            if (reduce) settle(INTERACTION_STEPS);
        };

        const toLocal = (e) => {
            const rect = canvas.getBoundingClientRect();
            return { x: e.clientX - rect.left, y: e.clientY - rect.top };
        };
        const onMove = (e) => {
            const p = toLocal(e);
            pointer.x = p.x;
            pointer.y = p.y;
            if (dragging) {
                afterInteraction();
                return;
            }
            const n = nodeAt(p.x, p.y);
            if (n !== hovered) {
                hovered = n;
                canvas.style.cursor = n ? "grab" : "default";
                afterInteraction();
            }
        };
        const onDown = (e) => {
            const p = toLocal(e);
            dragging = nodeAt(p.x, p.y);
            if (!dragging) return;
            hovered = dragging;
            canvas.setPointerCapture(e.pointerId);
            canvas.style.cursor = "grabbing";
            pointer.x = p.x;
            pointer.y = p.y;
            afterInteraction();
        };
        const onUp = () => {
            if (!dragging) return;
            dragging.vx = (Math.random() - 0.5) * 4;
            dragging = null;
            canvas.style.cursor = hovered ? "grab" : "default";
            afterInteraction();
        };
        const onLeave = () => {
            hovered = null;
            afterInteraction();
        };

        resize();
        const stopResize = watchResize(canvas.parentElement, () => {
            resize();
            afterInteraction();
        });
        const stopVisibility = watchVisibility(canvas, (v) => {
            visible = v;
            last = performance.now();
            if (v) loadIcons();
        });
        canvas.addEventListener("pointermove", onMove);
        canvas.addEventListener("pointerdown", onDown);
        canvas.addEventListener("pointerup", onUp);
        canvas.addEventListener("pointercancel", onUp);
        canvas.addEventListener("pointerleave", onLeave);

        if (reduce) settle(WARM_UP_STEPS);
        else frame = requestAnimationFrame(loop);

        return () => {
            running = false;
            cancelAnimationFrame(frame);
            stopResize();
            stopVisibility();
            canvas.removeEventListener("pointermove", onMove);
            canvas.removeEventListener("pointerdown", onDown);
            canvas.removeEventListener("pointerup", onUp);
            canvas.removeEventListener("pointercancel", onUp);
            canvas.removeEventListener("pointerleave", onLeave);
        };
    }, [reduce, palette]);

    // Under reduced motion the filter change needs an explicit repaint since no loop is running.
    useEffect(() => {
        if (!reduce) return;
        const canvas = canvasRef.current;
        canvas?.dispatchEvent(new PointerEvent("pointerleave"));
    }, [filter, reduce]);

    return (
        <div className="relative h-[760px] w-full sm:h-[560px]" style={{ touchAction: "pan-y" }}>
            <canvas ref={canvasRef} className="absolute inset-0 rounded-2xl" aria-hidden="true" />
            <ul className="sr-only">
                {skillNodes.map((n) => (
                    <li key={n.name}>
                        {n.name} ({n.domain})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SkillGraph;
