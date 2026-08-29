"use client";

import { cn } from "@/lib/utils";

type Props = {
  code: string;
  title: string;
  className?: string;
  depth?: number;
  delay?: number;
  duration?: number;
  orbit?: boolean;
  orbitStart?: number;
  orbitRadius?: string;
  orbitDuration?: number;
};

export function HeroFloatingBadge({
  code,
  title,
  className,
  depth = 1,
  delay = 0,
  duration = 7,
  orbit = false,
  orbitStart = 0,
  orbitRadius = "9rem",
  orbitDuration = 22,
}: Props) {
  const parts = code.split(" ");

  return (
    <div
      className={cn(
        "hero-float-badge pointer-events-none absolute left-1/2 top-1/2",
        orbit && "hero-float-badge--orbit",
        className,
      )}
      style={
        {
          "--badge-depth": depth,
          "--badge-delay": `${delay}s`,
          "--badge-duration": `${duration}s`,
          "--orbit-start": `${orbitStart}deg`,
          "--orbit-radius": orbitRadius,
          "--orbit-duration": `${orbitDuration}s`,
          "--orbit-delay": `${delay}s`,
          transform: orbit
            ? undefined
            : `translate3d(calc(var(--px, 0px) * ${depth}), calc(var(--py, 0px) * ${depth}), 0)`,
        } as React.CSSProperties
      }
    >
      <div className="hero-float-badge-inner hero-float-badge-scrub">
        <p className="font-display text-[11px] font-bold leading-none text-[#005953] sm:text-xs">
          {parts[0]}
        </p>
        <p className="font-display text-lg font-bold leading-none text-[#005953] sm:text-xl">
          {parts[1]}
        </p>
        <p className="mt-1 max-w-[7rem] text-[8px] font-semibold uppercase leading-tight tracking-wide text-[#005953]/75 sm:text-[9px]">
          {title}
        </p>
      </div>
    </div>
  );
}
