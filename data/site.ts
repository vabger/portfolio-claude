/**
 * All editable site content lives here.
 * Change names, links, projects and tools without touching the components.
 */

export const profile = {
  name: "Hatty",
  siteTitle: "Hatty Portfolio",
  email: "hattybusiness11@gmail.com",
  headline: "Ideas in Motion",
  tagline: "Bringing complex AI/Web3 products to life through motion.",
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
  /** Still image shown while the video loads, e.g. "/videos/launch.jpg". */
  image?: string;
  /** Optional link opened when the card is clicked. */
  href?: string;
};

export const projects: Project[] = [
  {
    title: "Syping Launch Promo",
    type: "Product Explainer",
    year: "2025",
    poster: "sky",
    video: "/videos/spklingo.mp4",
    image: "/videos/spklingo.jpg",
  },
  {
    title: "PhonePe Payment Flow",
    type: "UI Animation",
    year: "2025",
    poster: "phone",
    video: "/videos/phonepe.mp4",
    image: "/videos/phonepe.jpg",
  },
  {
    title: "Domino's Logo Reveal",
    type: "Logo Animation",
    year: "2025",
    poster: "omni",
    video: "/videos/dominos.mp4",
    image: "/videos/dominos.jpg",
  },
  // placeholders until the remaining videos are added
  { title: "Nova Reveal", type: "Brand Launch", year: "2025", poster: "intro" },
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
  { id: "discord", label: "Discord", href: "https://discord.com/users/432092853158805505" },
  { id: "x", label: "Twitter/X", href: "https://x.com/hatty91625" },
  { id: "instagram", label: "Instagram", href: "https://www.instagram.com/hatty.ssj" },
];
