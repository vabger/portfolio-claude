import type { CSSProperties } from "react";
import { profile } from "@/data/site";

export default function Hero() {
  const words = profile.headline.split(/\s+/);

  return (
    <section className="hero">
      <h1 className="hero__title" aria-label={profile.headline}>
        {words.map((w, i) => (
          <span key={i}>
            <span className="word" aria-hidden="true">
              <span style={{ "--w": i } as CSSProperties}>{w}</span>
            </span>
            {i < words.length - 1 && " "}
          </span>
        ))}
      </h1>
      <p className="hero__subtitle anim-up" style={{ "--d": ".55s" } as CSSProperties}>
        {profile.tagline}
      </p>
      <div className="hero__actions anim-up" style={{ "--d": ".75s" } as CSSProperties}>
        <a href="#contact" className="btn btn--dark">
          Get in Touch
        </a>
        <a href="#projects" className="btn btn--light">
          Projects
        </a>
      </div>
      <a href="#projects" className="scroll-hint anim-up" style={{ "--d": "1.1s" } as CSSProperties} aria-label="Scroll to projects">
        <span />
      </a>
    </section>
  );
}
