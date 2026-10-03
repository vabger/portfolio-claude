"use client";

import { useEffect, useRef } from "react";

/**
 * Reeded-glass background, rendered on the GPU with a WebGL fragment shader.
 *
 * Behind the glass: a soft glowing ring and a couple of blobs drift around,
 * coloured with a black → indigo → violet → pink → orange → yellow ramp.
 * The glass: narrow vertical ribs, each acting as a lens that squeezes a wide
 * slice of the scene into the rib, so shapes break into curved slivers.
 */

const VERTEX = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAGMENT = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform float u_rib;     // rib width in device pixels

// colour ramp
vec3 ramp(float v) {
  v = clamp(v, 0.0, 1.0);
  // misty slate → steel → pale icy blue, matching the site theme
  vec3 c0 = vec3(0.025, 0.04, 0.07);
  vec3 c1 = vec3(0.06, 0.09, 0.15);
  vec3 c2 = vec3(0.13, 0.19, 0.29);
  vec3 c3 = vec3(0.25, 0.33, 0.46);
  vec3 c4 = vec3(0.42, 0.51, 0.64);
  vec3 c5 = vec3(0.65, 0.73, 0.84);
  vec3 c6 = vec3(0.86, 0.91, 0.98);
  if (v < 0.22) return mix(c0, c1, v / 0.22);
  if (v < 0.42) return mix(c1, c2, (v - 0.22) / 0.20);
  if (v < 0.58) return mix(c2, c3, (v - 0.42) / 0.16);
  if (v < 0.72) return mix(c3, c4, (v - 0.58) / 0.14);
  if (v < 0.86) return mix(c4, c5, (v - 0.72) / 0.14);
  return mix(c5, c6, (v - 0.86) / 0.14);
}

// the scene behind the glass, p in screen-height units
float scene(vec2 p, float t) {
  float aspect = u_res.x / u_res.y;

  // big glowing ring that wanders and breathes
  vec2 rc = vec2(aspect * (0.5 + 0.32 * sin(t * 0.21)), 0.5 + 0.22 * sin(t * 0.17 + 1.3));
  float rr = 0.42 + 0.08 * sin(t * 0.33);
  float d = length((p - rc) * vec2(0.85, 1.0));
  float ring = exp(-pow((d - rr) / 0.075, 2.0));

  // bright core blob
  vec2 bc = vec2(aspect * (0.5 + 0.38 * sin(t * 0.13 + 2.0)), 0.5 + 0.3 * cos(t * 0.19));
  float blob = exp(-dot(p - bc, p - bc) / 0.035);

  // second, dimmer blob
  vec2 b2 = vec2(aspect * (0.5 + 0.4 * cos(t * 0.11 + 0.7)), 0.5 + 0.35 * sin(t * 0.23 + 2.4));
  float blob2 = exp(-dot(p - b2, p - b2) / 0.05);

  return ring * 0.9 + blob * 0.85 + blob2 * 0.5;
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  float t = u_time;

  // glass slides slowly sideways
  float x = frag.x + t * u_rib * 0.35;
  float ribIndex = floor(x / u_rib);
  float u = fract(x / u_rib);            // 0..1 across the rib

  // lens: each rib squeezes a wide slice of the scene into its width
  float squeeze = 6.0;
  float centre = (ribIndex + 0.5) * u_rib - t * u_rib * 0.35;
  float sx = centre + (u - 0.5) * u_rib * squeeze;

  vec2 p = vec2(sx, frag.y) / u_res.y;
  float v = 0.2 + scene(p, t) * 0.78;
  vec3 col = ramp(v);

  // rib shading: darker towards one side, thin dark seam, faint highlight
  float shade = mix(0.35, 1.0, smoothstep(1.0, 0.2, u));
  float seam = smoothstep(0.0, 0.05, u) * smoothstep(1.0, 0.94, u);
  float highlight = exp(-pow((u - 0.18) / 0.06, 2.0)) * 0.06;
  col = col * shade * mix(0.35, 1.0, seam) + highlight;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(s));
    return null;
  }
  return s;
}

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return; // CSS fallback background stays visible

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vs || !fs) return;
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // one triangle that covers the screen
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uRib = gl.getUniformLocation(program, "u_rib");

    let dpr = 1;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.round(window.innerWidth * dpr);
      const h = Math.round(window.innerHeight * dpr);
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
      // ~30 ribs across a desktop screen, ~16 on a phone
      const ribCss = window.innerWidth < 640 ? 24 : Math.max(36, window.innerWidth / 32);
      gl.uniform1f(uRib, ribCss * dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (ms: number) => {
      gl.uniform1f(uTime, ms / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const start = performance.now();
    const loop = (now: number) => {
      draw(now - start + 12000); // start mid-animation so the first frame isn't empty
      raf = requestAnimationFrame(loop);
    };

    if (reduceMotion) draw(20000);
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div className="bg" aria-hidden="true">
      <canvas ref={canvasRef} className="bg__canvas" />
      <div className="bg__vignette" />
      <div className="bg__grain" />
    </div>
  );
}
