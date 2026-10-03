"use client";

import { useEffect, useRef } from "react";

type Stem = [d: string, width: number];

const TOP_LEFT: Stem[] = [
  ["M-10 20 C 120 10, 260 0, 420 40 S 520 70, 560 110", 3],
  ["M-10 30 C 40 90, 70 160, 60 230 S 90 300, 140 330", 2.6],
  ["M150 15 C 190 60, 230 80, 300 95", 1.8],
  ["M40 120 C 90 140, 120 170, 150 180", 1.6],
  ["M330 30 C 370 70, 380 100, 400 140", 1.6],
];

const BOTTOM_RIGHT: Stem[] = [
  ["M530 470 C 470 380, 480 300, 470 200 S 500 120, 510 60", 3],
  ["M530 470 C 420 440, 330 420, 230 430 S 120 450, 60 440", 2.6],
  ["M480 300 C 430 280, 400 250, 380 220", 1.8],
  ["M330 425 C 320 380, 300 360, 280 340", 1.6],
  ["M490 160 C 450 150, 430 130, 420 100", 1.4],
];

const NS = "http://www.w3.org/2000/svg";

/** Grows leaves and white blossoms along each stem path (seeded, so it's the same every load). */
function growVine(svg: SVGSVGElement, stems: Stem[], seedStart: number) {
  let seed = seedStart;
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const el = (tag: string, attrs: Record<string, string | number>, parent: Element) => {
    const node = document.createElementNS(NS, tag);
    for (const k in attrs) node.setAttribute(k, String(attrs[k]));
    parent.appendChild(node);
    return node;
  };

  svg.querySelectorAll("g[data-vine]").forEach((g) => g.remove());
  const stemLayer = el("g", { "data-vine": "" }, svg);
  const leafLayer = el("g", { "data-vine": "" }, svg);
  const flowerLayer = el("g", { "data-vine": "" }, svg);

  stems.forEach(([d, width]) => {
    const path = el("path", { d, class: "stem", "stroke-width": width }, stemLayer) as SVGPathElement;
    const len = path.getTotalLength();
    let side = 1;
    for (let at = 12; at < len; at += 9 + rand() * 10) {
      const p = path.getPointAtLength(at);
      const q = path.getPointAtLength(Math.min(len, at + 1));
      const angle = (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI;
      const size = (1 - (at / len) * 0.5) * (7 + rand() * 7);
      side *= -1;
      el(
        "ellipse",
        {
          cx: 0,
          cy: 0,
          rx: size,
          ry: size * 0.48,
          class: rand() > 0.6 ? "leaf leaf--lit" : "leaf",
          transform: `translate(${p.x} ${p.y}) rotate(${angle + side * (40 + rand() * 30)}) translate(${size * 0.9} 0)`,
        },
        leafLayer
      );

      if (rand() > 0.72) {
        const n = 3 + Math.floor(rand() * 5);
        for (let i = 0; i < n; i++) {
          el(
            "circle",
            {
              cx: p.x + (rand() - 0.5) * 22,
              cy: p.y + (rand() - 0.5) * 22,
              r: 1.4 + rand() * 2.2,
              class: "flower",
              style: `animation-delay:${(-rand() * 4).toFixed(2)}s`,
            },
            flowerLayer
          );
        }
      }
    }
  });
}

export default function Background() {
  const tl = useRef<SVGSVGElement>(null);
  const br = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (tl.current) growVine(tl.current, TOP_LEFT, 7);
    if (br.current) growVine(br.current, BOTTOM_RIGHT, 11);
  }, []);

  return (
    <div className="bg" aria-hidden="true">
      <div className="bg__base" />
      <div className="bg__flutes" />
      <div className="bg__light" />
      <div className="bg__fog" />
      <div className="bg__vignette" />
      <svg className="vine vine--tl" ref={tl} viewBox="0 0 600 420">
        <defs>
          <filter id="bloom" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="1.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
      <svg className="vine vine--br" ref={br} viewBox="0 0 520 460" />
      <div className="bg__grain" />
    </div>
  );
}
