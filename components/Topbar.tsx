"use client";

import { useEffect, useState } from "react";

function zoneLabel() {
  const offset = -new Date().getTimezoneOffset();
  const sign = offset >= 0 ? "+" : "-";
  const h = Math.floor(Math.abs(offset) / 60);
  const m = Math.abs(offset) % 60;
  return `GMT${sign}${h}${m ? ":" + String(m).padStart(2, "0") : ""}`;
}

function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const hours = now ? now.getHours() : 0;
  const time = now ? `${hours % 12 || 12}:${pad(now.getMinutes())}:${pad(now.getSeconds())}` : "--:--:--";

  return (
    <div className="clock" aria-label="Local time">
      <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M12 7v5l3 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="clock__time">{time}</span>
      <span className="clock__ampm">{now ? (hours >= 12 ? "PM" : "AM") : ""}</span>
      <span className="clock__zone">{now ? zoneLabel() : ""}</span>
      <span className="clock__dot" />
    </div>
  );
}

export default function Topbar() {
  return (
    <header className="topbar">
      <a href="#top" className="logo" aria-label="Home">
        <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
          <path
            d="M8 5h16v2.5c0 3.5-3.2 6.3-5.6 8.5 2.4 2.2 5.6 5 5.6 8.5V27H8v-2.5c0-3.5 3.2-6.3 5.6-8.5C11.2 13.8 8 11 8 7.5z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M11.5 24.5c1.2-2 3-3.2 4.5-4.2 1.5 1 3.3 2.2 4.5 4.2z" fill="currentColor" />
          <path d="M5.5 5h21M5.5 27h21" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      </a>
      <Clock />
    </header>
  );
}
