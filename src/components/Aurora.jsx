import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { watchResize, watchVisibility } from "../utils/canvas";
import colors from "../theme/colors";

// Rendered at a fraction of the screen resolution: aurora is soft by nature, and the
// browser's upscale adds a free blur while cutting the fragment work to a quarter.
const RENDER_SCALE = 0.5;
const MAX_DPR = 1;

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

// Domain-warped fractal noise shaped into two slow curtains, one high and one low, so the
// centre-left band where the copy sits stays quiet. The pointer pulls the field toward it.
const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;
uniform vec3 u_c1;
uniform vec3 u_c2;
uniform vec3 u_c3;

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}
float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 5; i++) {
        v += a * noise(p);
        p = rot * p * 2.0 + 10.0;
        a *= 0.5;
    }
    return v;
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_res;
    float aspect = u_res.x / u_res.y;
    vec2 p = vec2(uv.x * aspect, uv.y) * 1.6;
    float t = u_time * 0.045;

    // Pointer influence: the field leans toward the cursor.
    vec2 m = vec2(u_mouse.x * aspect, u_mouse.y) * 1.6;
    float md = length(p - m);
    p += (m - p) * 0.35 * exp(-md * md * 2.2);

    vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t * 0.8));
    vec2 r = vec2(fbm(p + 3.0 * q + vec2(1.7, 9.2) + 0.2 * t),
                  fbm(p + 3.0 * q + vec2(8.3, 2.8) - 0.15 * t));
    float f = fbm(p + 3.0 * r);

    vec3 col = mix(u_c1, u_c2, clamp(f * f * 3.5, 0.0, 1.0));
    col = mix(col, u_c3, clamp(length(q) * 0.5, 0.0, 1.0));

    // Two curtains: one arching across the top, one low along the bottom.
    float wave = 0.08 * sin(uv.x * 4.0 + t * 3.0) + 0.05 * sin(uv.x * 9.0 - t * 5.0);
    float upper = exp(-pow((uv.y - (0.84 + wave)) * 4.5, 2.0));
    float lower = exp(-pow((uv.y - (0.06 - wave)) * 6.0, 2.0)) * 0.45;
    // Strongest on the right, where there is no copy to compete with.
    float side = 0.25 + 0.75 * smoothstep(0.3, 0.95, uv.x);
    float glow = exp(-md * md * 2.0) * 0.3;

    float shape = (upper + lower) * side + glow;
    // Cubic emphasis keeps the filaments and drops the haze, so the background stays dark.
    float I = (f * f * f * 1.6 + 0.3 * f * f) * shape * 0.6;
    I = clamp(I, 0.0, 0.75);
    gl_FragColor = vec4(col * I, I);
}
`;

const hexToVec = (hex) => {
    const n = parseInt(hex.slice(1), 16);
    return [(n >> 16) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

const compile = (gl, type, src) => {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(sh) || "shader compile failed");
    }
    return sh;
};

// GPU aurora behind the hero. Quietly renders nothing when WebGL is unavailable.
const Aurora = () => {
    const canvasRef = useRef(null);
    const reduce = useReducedMotion();

    useEffect(() => {
        const canvas = canvasRef.current;
        const gl = canvas.getContext("webgl", { premultipliedAlpha: true, antialias: false });
        if (!gl || gl.isContextLost()) return undefined;

        let program;
        try {
            program = gl.createProgram();
            gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
            gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                throw new Error(gl.getProgramInfoLog(program) || "program link failed");
            }
        } catch (err) {
            // A driver that rejects the shader gets a plain background, not a broken hero.
            return undefined;
        }
        gl.useProgram(program);

        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
            gl.STATIC_DRAW,
        );
        const aPos = gl.getAttribLocation(program, "a_pos");
        gl.enableVertexAttribArray(aPos);
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

        const u = (name) => gl.getUniformLocation(program, name);
        gl.uniform3fv(u("u_c1"), hexToVec(colors.acc));
        gl.uniform3fv(u("u_c2"), hexToVec(colors.acc2));
        gl.uniform3fv(u("u_c3"), hexToVec(colors.sky));
        const uRes = u("u_res");
        const uTime = u("u_time");
        const uMouse = u("u_mouse");

        let running = true;
        let visible = true;
        let frame = 0;
        const start = performance.now();
        const mouse = { x: 0.75, y: 0.7 }; // rests on the quiet upper-right until the pointer arrives
        const target = { x: 0.75, y: 0.7 };

        const draw = (now) => {
            mouse.x += (target.x - mouse.x) * 0.06;
            mouse.y += (target.y - mouse.y) * 0.06;
            gl.uniform1f(uTime, (now - start) / 1000);
            gl.uniform2f(uMouse, mouse.x, mouse.y);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        };

        const resize = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            const dpr = Math.min(MAX_DPR, window.devicePixelRatio || 1) * RENDER_SCALE;
            canvas.width = Math.max(1, Math.floor(rect.width * dpr));
            canvas.height = Math.max(1, Math.floor(rect.height * dpr));
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.uniform2f(uRes, canvas.width, canvas.height);
            if (reduce) draw(start + 20000);
        };

        const step = (now) => {
            if (!running) return;
            frame = requestAnimationFrame(step);
            if (visible) draw(now);
        };

        const onMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            target.x = (e.clientX - rect.left) / rect.width;
            target.y = 1 - (e.clientY - rect.top) / rect.height;
        };

        const host = canvas.parentElement;
        resize();
        const stopResize = watchResize(host, resize);
        const stopVisibility = watchVisibility(canvas, (v) => {
            visible = v;
        });
        window.addEventListener("pointermove", onMove, { passive: true });
        if (!reduce) frame = requestAnimationFrame(step);

        return () => {
            running = false;
            cancelAnimationFrame(frame);
            stopResize();
            stopVisibility();
            window.removeEventListener("pointermove", onMove);
            // Release GPU objects but keep the context alive: a canvas hands back the same
            // context on remount (StrictMode mounts twice), and a lost one paints opaque white.
            gl.deleteBuffer(buf);
            gl.deleteProgram(program);
        };
    }, [reduce]);

    return <canvas ref={canvasRef} className="absolute inset-0" aria-hidden="true" />;
};

export default Aurora;
