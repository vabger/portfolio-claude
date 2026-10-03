import type { CSSProperties } from "react";
import type { PosterKind } from "@/data/site";

/** Animated stand-ins shown until a real video is added for a project. */
export default function Poster({ kind }: { kind: PosterKind }) {
  switch (kind) {
    case "sky":
      return (
        <div className="poster poster--sky">
          <span className="poster__marquee">Ship smarter · review every push · ship smarter · review every push ·</span>
          <div className="poster__orb">
            <svg viewBox="0 0 64 64" aria-hidden="true">
              <path
                d="M24 12c4 0 6 6 6 14 2-1 4-1 6 0 0-8 2-14 6-14s3 10-1 17c6 3 9 9 9 14 0 7-7 11-18 11S14 50 14 43c0-5 3-11 9-14-4-7-3-17 1-17z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      );
    case "omni":
      return (
        <div className="poster poster--omni">
          <span className="poster__ring" />
          <div className="poster__stack">
            <span>Build</span>
            <span>Scale</span>
          </div>
        </div>
      );
    case "intro":
      return (
        <div className="poster poster--intro">
          <span className="poster__shine">Introducing</span>
        </div>
      );
    case "phone":
      return (
        <div className="poster poster--phone">
          <span className="poster__bigword">Automatic</span>
          <div className="phone">
            <div className="phone__notch" />
            <div className="phone__msg phone__msg--in">What does it even do?</div>
            <div className="phone__msg">Reviews every push.</div>
            <div className="phone__msg">Catches real bugs.</div>
            <div className="phone__msg">Collapses stale comments.</div>
          </div>
        </div>
      );
    case "tags": {
      const tags = [
        { text: "Needs test", x: "30%", y: "10%", t: "0s" },
        { text: "Add error handling", x: "-10%", y: "28%", t: "-2s" },
        { text: "Just got 47 comments", x: "2%", y: "47%", t: "-4s", big: true },
        { text: "Performance issue", x: "45%", y: "66%", t: "-1s" },
        { text: "Null reference risk", x: "4%", y: "84%", t: "-3s" },
      ];
      return (
        <div className="poster poster--tags">
          {tags.map((tag) => (
            <span
              key={tag.text}
              className={`tag${tag.big ? " tag--big" : ""}`}
              style={{ "--x": tag.x, "--y": tag.y, "--t": tag.t } as CSSProperties}
            >
              {tag.text}
            </span>
          ))}
        </div>
      );
    }
  }
}
