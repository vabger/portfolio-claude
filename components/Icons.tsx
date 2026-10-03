import type { SocialId, ToolId } from "@/data/site";

const Spark = ({ dense = false }: { dense?: boolean }) => (
  <svg viewBox="0 0 24 24">
    <g stroke="currentColor" strokeWidth={dense ? 2.2 : 2.4} strokeLinecap="round">
      <path d="M12 3v18M3 12h18M5.6 5.6l12.8 12.8M18.4 5.6 5.6 18.4" />
      {dense && <path d="M7.5 3.8l9 16.4M16.5 3.8l-9 16.4M3.8 7.5l16.4 9M3.8 16.5l16.4-9" />}
    </g>
  </svg>
);

const Bars = () => (
  <svg viewBox="0 0 24 24">
    <path d="M9 6v12M15 6v12" stroke="currentColor" strokeWidth={3} />
  </svg>
);

const Dots = () => (
  <svg viewBox="0 0 24 24">
    <circle cx="9" cy="5.5" r="3.2" fill="#f24e1e" />
    <circle cx="15" cy="5.5" r="3.2" fill="#ff7262" />
    <circle cx="9" cy="12" r="3.2" fill="#a259ff" />
    <circle cx="15" cy="12" r="3.2" fill="#1abcfe" />
    <circle cx="9" cy="18.5" r="3.2" fill="#0acf83" />
  </svg>
);

const Squiggle = () => (
  <svg viewBox="0 0 24 24">
    <path d="M6 15c2-6 4 2 6-3s4 3 6-3" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" />
  </svg>
);

const toolClass: Record<ToolId, string> = {
  claude: "ico--cl",
  elevenlabs: "ico--el",
  figma: "ico--fg",
  higgsfield: "ico--hf",
  aftereffects: "ico--ae",
  premiere: "ico--pr",
};

export function ToolIcon({ id, large = false }: { id: ToolId; large?: boolean }) {
  const content = {
    claude: <Spark dense={large} />,
    elevenlabs: <Bars />,
    figma: <Dots />,
    higgsfield: <Squiggle />,
    aftereffects: "Ae",
    premiere: "Pr",
  }[id];

  const cls = `ico ${toolClass[id]}${large ? " ico--lg" : ""}`;
  return large ? <span className={cls}>{content}</span> : <b className={cls}>{content}</b>;
}

export function SocialIcon({ id }: { id: SocialId }) {
  if (id === "discord")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M20.32 4.37a19.8 19.8 0 0 0-4.89-1.52.07.07 0 0 0-.08.04c-.21.38-.44.87-.61 1.25a18.3 18.3 0 0 0-5.49 0 12.6 12.6 0 0 0-.62-1.25.08.08 0 0 0-.08-.04 19.7 19.7 0 0 0-4.88 1.52.07.07 0 0 0-.03.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 0 0 .03.05 19.9 19.9 0 0 0 5.99 3.03.08.08 0 0 0 .09-.03c.46-.63.87-1.3 1.22-2a.08.08 0 0 0-.04-.1 13.1 13.1 0 0 1-1.87-.9.08.08 0 0 1 0-.12l.37-.3a.07.07 0 0 1 .08-.01c3.93 1.8 8.18 1.8 12.06 0a.07.07 0 0 1 .08.01l.37.3a.08.08 0 0 1 0 .12c-.6.35-1.22.65-1.87.9a.08.08 0 0 0-.04.1c.36.7.77 1.37 1.22 2a.08.08 0 0 0 .09.03 19.8 19.8 0 0 0 6-3.03.08.08 0 0 0 .03-.05c.5-5.18-.84-9.68-3.55-13.66a.06.06 0 0 0-.03-.03zM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42 0-1.33.96-2.42 2.16-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.96 2.42-2.16 2.42zm7.97 0c-1.18 0-2.15-1.08-2.15-2.42 0-1.33.95-2.42 2.15-2.42 1.21 0 2.18 1.1 2.16 2.42 0 1.34-.95 2.42-2.16 2.42z"
        />
      </svg>
    );
  if (id === "x")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.97 6.82H1.68l7.73-8.84L1.25 2.25h6.83l4.71 6.23zm-1.16 17.52h1.83L7.08 4.13H5.12z"
        />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth={2} />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth={2} />
      <circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" />
    </svg>
  );
}
