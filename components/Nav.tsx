"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { profile } from "@/data/site";

const SECTIONS = [
  { id: "projects", label: "Projects" },
  { id: "tools", label: "Tools" },
  { id: "contact", label: "Contact" },
];

export default function Nav() {
  const [active, setActive] = useState(SECTIONS[0].id);
  const links = useRef<Record<string, HTMLAnchorElement | null>>({});
  const indicator = useRef<HTMLSpanElement>(null);

  const moveIndicator = useCallback(() => {
    const link = links.current[active];
    if (!link || !indicator.current) return;
    indicator.current.style.left = `${link.offsetLeft}px`;
    indicator.current.style.width = `${link.offsetWidth}px`;
  }, [active]);

  // keep the pill under the active link, including while its font-size animates
  useLayoutEffect(() => {
    moveIndicator();
    const ro = new ResizeObserver(moveIndicator);
    Object.values(links.current).forEach((l) => l && ro.observe(l));
    window.addEventListener("resize", moveIndicator);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", moveIndicator);
    };
  }, [moveIndicator]);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const marker = window.innerHeight * 0.4;
      let current = SECTIONS[0].id;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= marker) current = s.id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = SECTIONS[SECTIONS.length - 1].id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="nav" aria-label="Primary">
      <span className="nav__indicator" ref={indicator} aria-hidden="true" />
      {SECTIONS.map((s) => (
        <a
          key={s.id}
          href={`#${s.id}`}
          ref={(el) => {
            links.current[s.id] = el;
          }}
          className={`nav__link${active === s.id ? " is-active" : ""}`}
          aria-current={active === s.id ? "true" : undefined}
        >
          {s.label}
        </a>
      ))}
      <a href={`mailto:${profile.email}`} className="nav__link">
        Get in Touch
      </a>
    </nav>
  );
}
