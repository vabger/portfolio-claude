"use client";

import { useRef, useState, type CSSProperties } from "react";
import { tools } from "@/data/site";
import { ToolIcon } from "./Icons";

export default function Tools() {
  const [open, setOpen] = useState(false);
  const folder = useRef<HTMLButtonElement>(null);
  const cards = useRef<HTMLDivElement>(null);

  const toggle = () => {
    const el = folder.current;
    if (!el) return;
    const first = el.getBoundingClientRect();
    const next = !open;
    setOpen(next);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // FLIP: after React commits the new layout, animate the folder from where it was
    requestAnimationFrame(() => {
      const last = el.getBoundingClientRect();
      const dx = first.left - last.left;
      const dy = first.top - last.top;
      if (dx || dy) {
        el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "translate(0, 0)" }], {
          duration: 750,
          easing: "cubic-bezier(0.16, 1, 0.3, 1)",
        });
      }
    });

    if (next && window.matchMedia("(max-width: 1024px)").matches) {
      // stacked layout: gently bring the cards into view
      setTimeout(() => {
        if (!cards.current) return;
        const top = cards.current.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.35;
        if (top > window.scrollY) window.scrollTo({ top, behavior: "smooth" });
      }, 650);
    }
  };

  return (
    <section className="section" id="tools">
      <h2 className="section__title reveal">Tools I Use</h2>
      <p className="click-hint reveal">
        Click It <span aria-hidden="true">↓</span>
      </p>

      <div className={`tools${open ? " is-open" : ""}`}>
        <div className="tools__folder-col">
          <button ref={folder} className="folder" onClick={toggle} aria-expanded={open} aria-controls="tool-cards">
            <span className="chips" aria-hidden="true">
              {tools.map((t, i) => (
                <span
                  key={t.id}
                  className={`chip chip--${t.id}`}
                  style={{ "--x": `${t.chip.x}em`, "--y": `${t.chip.y}em`, "--r": `${t.chip.r}deg`, "--i": i } as CSSProperties}
                >
                  <span className="chip__in">
                    <ToolIcon id={t.id} />
                    {t.name}
                  </span>
                </span>
              ))}
            </span>
            <span className="folder__back" />
            <span className="folder__paper" />
            <span className="folder__front">
              <span className="folder__label">Tools I Use</span>
              <span className="folder__count">{tools.length} tools</span>
            </span>
            <span className="sr-only">{open ? "Close" : "Open"} the tools folder</span>
          </button>
        </div>

        <div className="tool-cards" id="tool-cards" ref={cards}>
          {open &&
            tools.map((t, i) => (
              <article key={t.id} className="tool-card" style={{ "--i": i, "--glow": t.glow } as CSSProperties}>
                <ToolIcon id={t.id} large />
                <h3>{t.name}</h3>
                <p className="tool-card__cat">{t.category}</p>
                <p>{t.description}</p>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
