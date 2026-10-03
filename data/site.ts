/**
 * All editable site content lives here.
 * Change names, links, projects and tools without touching the components.
 */

export const profile = {
  name: "Your Name",
  email: "hello@example.com",
  headline: "Ideas in Motion",
  tagline:
    "I turn complex AI/Web3 products into videos that make investors lean in and users actually get it.",
};

export type PosterKind = "sky" | "omni" | "intro" | "phone" | "tags";

export type Project = {
  title: string;
  type: string;
  year: string;
  /** Animated placeholder shown when no video is set. */
  poster: PosterKind;
  /** Optional video, e.g. "/videos/launch.mp4" (put the file in /public/videos). */
  video?: string;
  /** Optional link opened when the card is clicked. */
  href?: string;
};

export const projects: Project[] = [
  { title: "Tenki Product Teaser", type: "Client Work", year: "2025", poster: "sky" },
  { title: "Omni's Launch Video", type: "Spec Work", year: "2025", poster: "omni" },
  { title: "Nova Reveal", type: "Brand Launch", year: "2025", poster: "intro" },
  { title: "Chat Explainer", type: "App Promo", year: "2024", poster: "phone" },
  { title: "Code Review Story", type: "Motion Design", year: "2024", poster: "tags" },
];

export type ToolId = "claude" | "elevenlabs" | "figma" | "higgsfield" | "aftereffects" | "premiere";

export type Tool = {
  id: ToolId;
  name: string;
  category: string;
  description: string;
  /** Hover glow colour for the card. */
  glow: string;
  /** Where the chip lands when the folder opens (em units, relative to the folder). */
  chip: { x: number; y: number; r: number };
};

export const tools: Tool[] = [
  {
    id: "claude",
    name: "Claude",
    category: "Scripting",
    description: "I use Claude to develop scripts, expressions, and custom tools that speed up repetitive work.",
    glow: "#e8794f",
    chip: { x: 0.4, y: -2.6, r: -5 },
  },
  {
    id: "elevenlabs",
    name: "ElevenLabs",
    category: "Voiceover",
    description: "I turn written scripts into natural voice-over narration for my video projects.",
    glow: "#d9d9d9",
    chip: { x: 7.4, y: -2.9, r: 5 },
  },
  {
    id: "figma",
    name: "Figma",
    category: "Storyboarding",
    description: "I storyboard scenes and plan layouts, composition, and visual flow before animation.",
    glow: "#a259ff",
    chip: { x: 15.6, y: -2.5, r: -4 },
  },
  {
    id: "higgsfield",
    name: "Higgsfield",
    category: "AI Video",
    description: "I explore cinematic AI shots and visual directions during early concept development.",
    glow: "#c8f135",
    chip: { x: 5.6, y: -6.2, r: 4 },
  },
  {
    id: "aftereffects",
    name: "After Effects",
    category: "Animation",
    description: "I animate, composite, and create transitions and visual effects from storyboard to final shot.",
    glow: "#9999ff",
    chip: { x: 13.6, y: -6.4, r: 3 },
  },
  {
    id: "premiere",
    name: "Premiere Pro",
    category: "Editing & Sound",
    description: "I edit sequences, refine timing, and finish with sound design and audio polish.",
    glow: "#7b3cff",
    chip: { x: 7.5, y: -9.6, r: 6 },
  },
];

export type SocialId = "discord" | "x" | "instagram";

export const socials: { id: SocialId; label: string; href: string }[] = [
  { id: "discord", label: "Discord", href: "https://discord.com/" },
  { id: "x", label: "Twitter/X", href: "https://x.com/" },
  { id: "instagram", label: "Instagram", href: "https://instagram.com/" },
];
