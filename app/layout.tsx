import type { Metadata, Viewport } from "next";
import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";
import { profile } from "@/data/site";

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.headline}`,
  description: profile.tagline,
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%230b1220'/%3E%3Cpath d='M9 7h14l-5.5 9L23 25H9l5.5-9z' fill='%23eef5ff'/%3E%3C/svg%3E",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b1220",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
