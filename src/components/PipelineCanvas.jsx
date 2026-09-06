import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { pipeline } from "../data/profile";
import { fitCanvas, watchResize, watchVisibility } from "../utils/canvas";
import { hexAlpha } from "../theme/palette";
import { useTheme } from "./Theme";

export const STAGE_X = [0.12, 0.38, 0.62, 0.88];
const LANES = 5;
const TARGET_PARTICLES = 100;
const SPAWN_PER_SEC = 22;
const SPEED = { min: 45, max: 85 };
const CURSOR_RADIUS = 150;
const CURSOR_FORCE = 420;
const TRAIL_FADE = 0.22; // how much of the previous frame survives each step
const tones = (p) => [p.acc, p.acc2, p.sky, p.acc3, p.danger, p.haze];

const EDGE_FADE = "linear-gradient(to bottom, transparent, black 35%)";

const rand = (min, max) => min + Math.random() * (max - min);

// A canvas simulation of posts moving through the Social Planner publishing path.
// Particles travel left → right, pulse at each stage, and route around the cursor.
const PipelineCanvas = () => {
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
        let spawnAcc = 0;
        const mouse = { x: -9999, y: -9999 };
        const particles = [];
        const flashes = [];

        // Narrow screens get proportionally fewer particles and smaller flashes.
        const density = () => Math.min(1, w / 1100);
        const laneY = (i) => h * 0.42 + (h * 0.5 * i) / (LANES - 1);

        const resize = () => {
            ({ w, h } = fitCanvas(canvas, ctx));
            ctx.fillStyle = palette.bg;
            ctx.fillRect(0, 0, w, h);
        };

        const spawn = (x = -6) => {
            const lane = Math.floor(Math.random() * LANES);
            particles.push({
                x,
                y: laneY(lane) + rand(-6, 6),
                lane,
                vx: rand(SPEED.min, SPEED.max),
                targetVx: rand(SPEED.min, SPEED.max),
                vy: 0,
                phase: rand(0, Math.PI * 2),
                color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
                // Particles seeded mid-canvas have already passed the stages to their left.
                stage: STAGE_X.filter((fx) => fx * w <= x).length,
                size: rand(1.2, 2.4),
            });
        };

        const drawStages = (t) => {
            STAGE_X.forEach((fx, i) => {
                const x = fx * w;
                ctx.save();
                ctx.strokeStyle = hexAlpha(palette.ink, 0.05);
                ctx.setLineDash([2, 10]);
                ctx.beginPath();
                ctx.moveTo(x, h * 0.3);
                ctx.lineTo(x, h);
                ctx.stroke();
                ctx.restore();

                const pulse = 0.5 + 0.5 * Math.sin(t / 700 + i);
                ctx.beginPath();
                ctx.arc(x, h * 0.67, 3 + pulse * 2, 0, Math.PI * 2);
                ctx.fillStyle = hexAlpha(palette.acc, 0.55);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(x, h * 0.67, 14 + pulse * 10, 0, Math.PI * 2);
                ctx.strokeStyle = hexAlpha(palette.acc, 0.18 - pulse * 0.12);
                ctx.lineWidth = 1;
                ctx.stroke();
            });
        };

        const updateParticle = (p, dt, now) => {
            const targetY = laneY(p.lane) + Math.sin(now / 900 + p.phase) * 5;
            // The cursor acts like a load balancer: particles route around it.
            const dx = p.x - mouse.x;
            const dy = p.y - mouse.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < CURSOR_RADIUS * CURSOR_RADIUS) {
                const d = Math.sqrt(d2) || 1;
                const f = (1 - d / CURSOR_RADIUS) * CURSOR_FORCE;
                p.vy += (dy / d) * f * dt;
                p.vx += (dx / d) * f * dt * 0.4;
            }
            p.vy += (targetY - p.y) * 3.2 * dt;
            p.vy *= 0.92;
            p.vx += (p.targetVx - p.vx) * 0.6 * dt;

            const prevX = p.x;
            p.x += p.vx * dt;
            p.y += p.vy * dt;

            // Crossing a stage column leaves a ring; the final stage fans particles out.
            const stageX = STAGE_X[p.stage];
            if (stageX !== undefined && prevX < stageX * w && p.x >= stageX * w) {
                flashes.push({ x: stageX * w, y: p.y, r: 2, a: 0.9, color: p.color });
                p.stage += 1;
                if (p.stage === STAGE_X.length) p.vy += rand(-40, 40);
            }
        };

        const drawParticle = (p) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.stage === 0 ? 0.6 : 0.95;
            ctx.fill();
            ctx.globalAlpha = 1;
        };

        const drawFlashes = (dt) => {
            for (let i = flashes.length - 1; i >= 0; i -= 1) {
                const f = flashes[i];
                f.r += 60 * dt * density();
                f.a -= 2.2 * dt;
                if (f.a <= 0) {
                    flashes.splice(i, 1);
                    continue;
                }
                ctx.beginPath();
                ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
                ctx.strokeStyle = f.color;
                ctx.globalAlpha = f.a * 0.6;
                ctx.lineWidth = 1;
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
        };

        const step = (now) => {
            if (!running) return;
            frame = requestAnimationFrame(step);
            if (!visible) return;
            const dt = Math.min(0.05, (now - last) / 1000);
            last = now;

            ctx.fillStyle = hexAlpha(palette.bg, TRAIL_FADE);
            ctx.fillRect(0, 0, w, h);
            drawStages(now);

            spawnAcc += dt * SPAWN_PER_SEC * density();
            while (spawnAcc > 1 && particles.length < TARGET_PARTICLES * density()) {
                spawn();
                spawnAcc -= 1;
            }
            for (let i = particles.length - 1; i >= 0; i -= 1) {
                const p = particles[i];
                updateParticle(p, dt, now);
                drawParticle(p);
                if (p.x > w + 10) particles.splice(i, 1);
            }
            drawFlashes(dt);
        };

        // Fill the pipeline up front so it never starts as an empty strip.
        const seed = () => {
            for (let i = 0; i < 70 * density(); i += 1) spawn(rand(0, w));
        };

        const drawStatic = () => {
            ctx.fillStyle = palette.bg;
            ctx.fillRect(0, 0, w, h);
            drawStages(0);
            seed();
            particles.forEach(drawParticle);
        };

        const onMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };
        const onLeave = () => {
            mouse.x = -9999;
            mouse.y = -9999;
        };

        const host = canvas.parentElement;
        resize();
        const stopResize = watchResize(host, resize);
        const stopVisibility = watchVisibility(canvas, (v) => {
            visible = v;
            last = performance.now();
        });
        host.addEventListener("pointermove", onMove);
        host.addEventListener("pointerleave", onLeave);

        if (reduce) {
            drawStatic();
        } else {
            seed();
            frame = requestAnimationFrame(step);
        }

        return () => {
            running = false;
            cancelAnimationFrame(frame);
            stopResize();
            stopVisibility();
            host.removeEventListener("pointermove", onMove);
            host.removeEventListener("pointerleave", onLeave);
        };
    }, [reduce, palette]);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="absolute inset-0"
                style={{ WebkitMaskImage: EDGE_FADE, maskImage: EDGE_FADE }}
                aria-hidden="true"
            />
            {/* Stage labels aligned to the canvas stage columns */}
            <div className="pointer-events-none absolute inset-x-0 top-2 hidden sm:block">
                {pipeline.map((stage, i) => (
                    <div
                        key={stage.id}
                        className="absolute flex -translate-x-1/2 flex-col items-center gap-1"
                        style={{ left: `${STAGE_X[i] * 100}%` }}
                    >
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-acc/80">
                            {stage.label}
                        </span>
                        <span className="font-mono text-[10px] text-dim">{stage.detail}</span>
                    </div>
                ))}
            </div>
        </>
    );
};

export default PipelineCanvas;
