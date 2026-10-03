"use client";

import { useEffect, useRef } from "react";

/**
 * Reeded-glass background.
 * Soft colour blobs drift around behind a sheet of vertical ribbed glass.
 * Each rib acts like a small lens: it samples the scene behind it flipped and
 * magnified, which gives the characteristic repeated, refracted stripes.
 * Rendered at low resolution into a canvas that CSS stretches to full screen.
 */

type Blob = {
  color: [number, number, number];
  radius: number; // as a fraction of the screen height
  // orbit: centre, amplitude and speed on each axis
  cx: number; cy: number; ax: number; ay: number; sx: number; sy: number; phase: number;
};

const BASE: [number, number, number] = [6, 10, 18];

const BLOBS: Blob[] = [
  { color: [90, 140, 220], radius: 0.26, cx: 0.28, cy: 0.38, ax: 0.22, ay: 0.16, sx: 0.11, sy: 0.08, phase: 0 },
  { color: [50, 70, 170], radius: 0.34, cx: 0.72, cy: 0.62, ax: 0.2, ay: 0.2, sx: 0.07, sy: 0.1, phase: 2 },
  { color: [170, 205, 250], radius: 0.13, cx: 0.5, cy: 0.42, ax: 0.38, ay: 0.16, sx: 0.13, sy: 0.17, phase: 4 },
  { color: [95, 60, 180], radius: 0.24, cx: 0.12, cy: 0.78, ax: 0.14, ay: 0.12, sx: 0.09, sy: 0.06, phase: 1 },
  { color: [30, 120, 170], radius: 0.22, cx: 0.88, cy: 0.18, ax: 0.12, ay: 0.18, sx: 0.08, sy: 0.12, phase: 3 },
];

/** Overall brightness of the glowing shapes (0–1). */
const INTENSITY = 0.75;

/** Soft roll-off: keeps colours rich but stops overlaps from clipping to white. */
const tone = (v: number) => 230 * (1 - Math.exp(-v / 170));

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const SCALE = 4; // canvas px = css px / SCALE
    let w = 0;
    let h = 0;
    let image: ImageData;
    let rib = 16; // rib width in canvas px

    const resize = () => {
      w = Math.max(120, Math.round(window.innerWidth / SCALE));
      h = Math.max(120, Math.round(window.innerHeight / SCALE));
      canvas.width = w;
      canvas.height = h;
      image = ctx.createImageData(w, h);
      rib = window.innerWidth < 640 ? 11 : 16;
    };
    resize();
    window.addEventListener("resize", resize);

    // per-column refraction lookup, rebuilt when the size changes
    const columnSource = (x: number) => {
      const start = Math.floor(x / rib) * rib;
      const u = (x - start) / rib; // 0..1 across the rib
      // each rib flips and magnifies what's behind it
      const src = start + rib / 2 - (u - 0.5) * rib * 2.6;
      return src;
    };
    const ribShade = (x: number) => {
      const u = (x % rib) / rib;
      // bright highlight on one edge, dark seam on the other, gentle curvature
      const curve = 0.82 + 0.18 * Math.sin(Math.PI * u);
      const highlight = Math.exp(-((u - 0.12) ** 2) / 0.004) * 0.35;
      const seam = Math.exp(-((u - 0.98) ** 2) / 0.002) * 0.45;
      return { mul: curve - seam, add: highlight };
    };

    const draw = (time: number) => {
      const t = time / 1000;
      const data = image.data;

      // blob positions for this frame, in canvas px
      const blobs = BLOBS.map((b) => {
        const r = b.radius * h;
        return {
          x: (b.cx + b.ax * Math.sin(t * b.sx * 2 + b.phase)) * w,
          y: (b.cy + b.ay * Math.cos(t * b.sy * 2 + b.phase * 1.3)) * h,
          inv: 1 / (2 * r * r),
          c: b.color,
        };
      });

      // the whole sheet of glass drifts slowly sideways
      const drift = Math.sin(t * 0.15) * rib * 1.5 + t * rib * 0.12;

      for (let x = 0; x < w; x++) {
        const gx = x + drift;
        const gxMod = ((gx % (rib * 1000)) + rib * 1000) % (rib * 1000);
        const sx = columnSource(gxMod) - gxMod + x; // refracted sample x
        const { mul, add } = ribShade(gxMod);

        for (let y = 0; y < h; y++) {
          // slight vertical wobble inside the glass
          const sy = y + Math.sin((x / rib) * 1.7 + t * 0.8) * 1.5;

          let r = BASE[0];
          let g = BASE[1];
          let bl = BASE[2];
          for (const b of blobs) {
            const dx = sx - b.x;
            const dy = sy - b.y;
            const k = Math.exp(-(dx * dx + dy * dy) * b.inv);
            r += b.c[0] * k * INTENSITY;
            g += b.c[1] * k * INTENSITY;
            bl += b.c[2] * k * INTENSITY;
          }

          const i = (y * w + x) * 4;
          data[i] = tone(r * mul) + add * 120;
          data[i + 1] = tone(g * mul) + add * 140;
          data[i + 2] = tone(bl * mul) + add * 170;
          data[i + 3] = 255;
        }
      }
      ctx.putImageData(image, 0, 0);
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = 0;
    const loop = (time: number) => {
      raf = requestAnimationFrame(loop);
      if (time - last < 33) return; // ~30fps is plenty for a background
      last = time;
      draw(time);
    };

    if (reduceMotion) draw(8000);
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
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
