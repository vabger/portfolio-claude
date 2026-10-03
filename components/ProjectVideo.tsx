"use client";

import { useEffect, useRef } from "react";

/** Plays on hover on desktop, and while in view on touch / small screens. */
export default function ProjectVideo({ src, poster }: { src: string; poster?: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    const card = video?.closest(".project");
    if (!video || !card) return;

    const canHover = window.matchMedia("(hover: hover) and (min-width: 1025px)");
    const play = () => video.play().catch(() => {});
    const enter = () => canHover.matches && play();
    const leave = () => canHover.matches && video.pause();

    card.addEventListener("mouseenter", enter);
    card.addEventListener("mouseleave", leave);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (canHover.matches) return;
        if (entry.isIntersecting) play();
        else video.pause();
      },
      { threshold: 0.6 }
    );
    io.observe(video);

    return () => {
      card.removeEventListener("mouseenter", enter);
      card.removeEventListener("mouseleave", leave);
      io.disconnect();
    };
  }, []);

  // MP4 (H.264) plays everywhere; a .webm next to it is used by browsers without H.264
  const webm = src.replace(/\.mp4$/i, ".webm");
  return (
    <video ref={ref} poster={poster} muted loop playsInline preload="metadata">
      <source src={src} type="video/mp4" />
      {webm !== src && <source src={webm} type="video/webm" />}
    </video>
  );
}
