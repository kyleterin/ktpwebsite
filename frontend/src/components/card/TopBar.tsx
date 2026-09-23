import { useEffect, useState } from "react";
import LogoMark from "./LogoMark";
import { CARD } from "@/lib/cardData";

export default function TopBar() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const laTime = now.toLocaleTimeString("en-US", {
    timeZone: "America/Los_Angeles",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  return (
    <header
      data-testid="topbar"
      className="flex items-center justify-between border-b border-white/8 pb-4"
    >
      <div className="flex items-center gap-3">
        <LogoMark className="w-9 h-9" />
        <div className="leading-tight">
          <p className="font-heading text-sm font-bold tracking-wide">KTP</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
            Prod. &amp; Assistance
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span
          data-testid="la-clock"
          className="hidden font-mono text-xs tracking-widest text-zinc-400 sm:block"
        >
          LA {laTime}
        </span>
        <span
          data-testid="availability-badge"
          className="flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1.5"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-amber-300">
            {CARD.availability}
          </span>
        </span>
      </div>
    </header>
  );
}
