import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { fitCanvas, watchResize, watchVisibility } from "../utils/canvas";
import colors from "../theme/colors";

const POINTS = 520;
const SPIN = 0.16; // rad/s
const TILT = 0.55; // max rad the pointer tilts the sphere
const ARC_EVERY = 0.4; // seconds between launches
const ARC_LIFE = 1.6; // seconds an arc takes to land
const ARC_LIFT = 0.35; // how far an arc bows outside the sphere, as a fraction of radius
const CAMERA = 3.2; // camera distance in radii
const PALETTE = [colors.acc, colors.acc2, colors.sky, colors.cyan];

const hexAlpha = (hex, a) => {
    const n = parseInt(hex.slice(1), 16);
    return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`;
};

// Evenly spread unit vectors (Fibonacci sphere).
const spherePoints = (n) =>
    Array.from({ length: n }, (_, i) => {
        const y = 1 - (2 * (i + 0.5)) / n;
        const r = Math.sqrt(1 - y * y);
        const phi = i * Math.PI * (3 - Math.sqrt(5));
        return { x: Math.cos(phi) * r, y, z: Math.sin(phi) * r };
    });

const rotate = (p, yaw, pitch) => {
    const cy = Math.cos(yaw);
    const sy = Math.sin(yaw);
    const x1 = p.x * cy + p.z * sy;
    const z1 = -p.x * sy + p.z * cy;
    const cp = Math.cos(pitch);
    const sp = Math.sin(pitch);
    return { x: x1, y: p.y * cp - z1 * sp, z: p.y * sp + z1 * cp };
};

// Spherical interpolation between two unit vectors, then lifted off the surface mid-flight.
const slerp = (a, b, t) => {
    const dot = Math.max(-1, Math.min(1, a.x * b.x + a.y * b.y + a.z * b.z));
    const omega = Math.acos(dot);
    const so = Math.sin(omega) || 1e-6;
    const wa = Math.sin((1 - t) * omega) / so;
    const wb = Math.sin(t * omega) / so;
    const lift = 1 + ARC_LIFT * Math.sin(Math.PI * t);
    return {
        x: (a.x * wa + b.x * wb) * lift,
        y: (a.y * wa + b.y * wb) * lift,
        z: (a.z * wa + b.z * wb) * lift,
    };
};

// A rotating 3D sphere of points drawn around the portrait, with glowing arcs firing between
// points: posts leaving one account and landing on another, all over the world.
// `coreRadius` is the portrait's radius as a fraction of the sphere radius; back-facing points
// inside it stay hidden behind the photo so the sphere reads as truly enclosing it.
const Globe = ({ coreRadius = 0.72 }) => {
    const canvasRef = useRef(null);
    const reduce = useReducedMotion();

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const base = spherePoints(POINTS);
        const arcs = [];
        const rings = [];
        let w = 0;
        let h = 0;
        let R = 0;
        let running = true;
        let visible = true;
        let frame = 0;
        let last = performance.now();
        let yaw = 0;
        let pitch = 0.25;
        let arcAcc = 0;
        const tiltTarget = { yaw: 0, pitch: 0 };
        const tilt = { yaw: 0, pitch: 0 };

        const resize = () => {
            ({ w, h } = fitCanvas(canvas, ctx));
            R = Math.min(w, h) * 0.33; // leaves room for arcs to bow outside
            if (reduce) drawFrame(0);
        };

        const project = (p) => {
            const scale = CAMERA / (CAMERA - p.z);
            return { x: w / 2 + p.x * R * scale, y: h / 2 - p.y * R * scale, z: p.z, scale };
        };

        const overPortrait = (s) => Math.hypot(s.x - w / 2, s.y - h / 2) < R * coreRadius;

        const launchArc = () => {
            const from = base[Math.floor(Math.random() * base.length)];
            let to = base[Math.floor(Math.random() * base.length)];
            if (to === from) to = base[(base.indexOf(from) + 97) % base.length];
            arcs.push({
                from,
                to,
                t: 0,
                color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
            });
        };

        const drawPoints = (ry, rp) => {
            base.forEach((p) => {
                const s = project(rotate(p, ry, rp));
                const onFace = overPortrait(s);
                if (onFace && s.z < 0) return; // behind the photo
                const depth = (s.z + 1) / 2; // 0 back → 1 front
                ctx.beginPath();
                ctx.arc(s.x, s.y, 0.6 + depth * 1.3, 0, Math.PI * 2);
                // Points passing in front of the photo stay faint so the face reads clearly.
                ctx.fillStyle = hexAlpha(colors.haze, onFace ? 0.22 : 0.15 + depth * 0.65);
                ctx.fill();
            });
        };

        const drawArcs = (ry, rp, dt) => {
            ctx.lineCap = "round";
            for (let i = arcs.length - 1; i >= 0; i -= 1) {
                const a = arcs[i];
                a.t += dt / ARC_LIFE;
                if (a.t >= 1) {
                    const end = project(rotate(a.to, ry, rp));
                    rings.push({ x: end.x, y: end.y, r: 2, alpha: 0.9, color: a.color });
                    arcs.splice(i, 1);
                    continue;
                }
                // Draw the trailing quarter of the path as a fading, thinning ribbon.
                const steps = 14;
                const tail = Math.max(0, a.t - 0.28);
                let prev = project(rotate(slerp(a.from, a.to, tail), ry, rp));
                for (let k = 1; k <= steps; k += 1) {
                    const tk = tail + ((a.t - tail) * k) / steps;
                    const cur = project(rotate(slerp(a.from, a.to, tk), ry, rp));
                    const frontness = (cur.z + 1) / 2;
                    const fade = k / steps;
                    ctx.strokeStyle = hexAlpha(a.color, fade * (0.35 + frontness * 0.65));
                    ctx.lineWidth = 0.6 + fade * 2.4 * cur.scale;
                    ctx.beginPath();
                    ctx.moveTo(prev.x, prev.y);
                    ctx.lineTo(cur.x, cur.y);
                    ctx.stroke();
                    prev = cur;
                }
                // Glowing head.
                ctx.beginPath();
                ctx.arc(prev.x, prev.y, 3 * prev.scale, 0, Math.PI * 2);
                ctx.fillStyle = a.color;
                ctx.shadowColor = a.color;
                ctx.shadowBlur = 16;
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        };

        const drawRings = (dt) => {
            for (let i = rings.length - 1; i >= 0; i -= 1) {
                const r = rings[i];
                r.r += 40 * dt;
                r.alpha -= 1.6 * dt;
                if (r.alpha <= 0) {
                    rings.splice(i, 1);
                    continue;
                }
                ctx.beginPath();
                ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
                ctx.strokeStyle = hexAlpha(r.color, r.alpha * 0.8);
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        };

        const drawFrame = (dt) => {
            ctx.clearRect(0, 0, w, h);
            const ry = yaw + tilt.yaw;
            const rp = pitch + tilt.pitch;
            drawPoints(ry, rp);
            drawArcs(ry, rp, dt);
            drawRings(dt);
        };

        const step = (now) => {
            if (!running) return;
            frame = requestAnimationFrame(step);
            if (!visible) return;
            const dt = Math.min(0.05, (now - last) / 1000);
            last = now;
            yaw += SPIN * dt;
            tilt.yaw += (tiltTarget.yaw - tilt.yaw) * 2.5 * dt;
            tilt.pitch += (tiltTarget.pitch - tilt.pitch) * 2.5 * dt;
            arcAcc += dt;
            while (arcAcc > ARC_EVERY) {
                launchArc();
                arcAcc -= ARC_EVERY;
            }
            drawFrame(dt);
        };

        // The sphere leans toward the pointer wherever it is on the page.
        const onMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
            tiltTarget.yaw = Math.max(-1, Math.min(1, nx)) * TILT;
            tiltTarget.pitch = Math.max(-1, Math.min(1, ny)) * TILT * 0.6;
        };

        const host = canvas.parentElement;
        resize();
        const stopResize = watchResize(host, resize);
        const stopVisibility = watchVisibility(canvas, (v) => {
            visible = v;
            last = performance.now();
        });
        window.addEventListener("pointermove", onMove, { passive: true });
        if (!reduce) {
            for (let i = 0; i < 3; i += 1) launchArc();
            frame = requestAnimationFrame(step);
        }

        return () => {
            running = false;
            cancelAnimationFrame(frame);
            stopResize();
            stopVisibility();
            window.removeEventListener("pointermove", onMove);
        };
    }, [reduce, coreRadius]);

    return <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />;
};

export default Globe;
