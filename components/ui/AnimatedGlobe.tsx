"use client";

import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function AnimatedGlobe({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      aria-hidden
    >
      {/* Soft glow behind globe */}
      <div className="absolute inset-0 rounded-full bg-primary/8 blur-2xl" />

      <div
        className={cn(
          "relative h-full w-full",
          !reduce && "animate-globe-spin",
        )}
      >
        <svg
          viewBox="0 0 200 200"
          className="h-full w-full drop-shadow-[0_8px_32px_rgba(0,89,83,0.15)]"
          fill="none"
        >
          {/* Outer sphere */}
          <circle
            cx="100"
            cy="100"
            r="88"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-primary/30"
          />

          {/* Latitude lines */}
          {[30, 50, 70, 90, 110, 130, 150, 170].map((y) => {
            const dy = Math.abs(y - 100);
            const rx = Math.sqrt(Math.max(0, 88 * 88 - dy * dy));
            return (
              <ellipse
                key={`lat-${y}`}
                cx="100"
                cy={y}
                rx={rx}
                ry={rx * 0.28}
                stroke="currentColor"
                strokeWidth="0.75"
                className="text-primary/25"
              />
            );
          })}

          {/* Longitude arcs — front hemisphere */}
          {[0, 30, 60, 90, 120, 150].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const path = describeMeridian(rad);
            return (
              <path
                key={`mer-${deg}`}
                d={path}
                stroke="currentColor"
                strokeWidth="0.75"
                className="text-primary/30"
              />
            );
          })}

          {/* Dotted land masses (stylized) */}
          <g className="text-primary/50" fill="currentColor">
            <circle cx="72" cy="78" r="2.5" />
            <circle cx="80" cy="72" r="2" />
            <circle cx="88" cy="76" r="2.5" />
            <circle cx="95" cy="82" r="2" />
            <circle cx="68" cy="88" r="2" />
            <circle cx="76" cy="92" r="2.5" />
            <circle cx="118" cy="70" r="2" />
            <circle cx="126" cy="74" r="2.5" />
            <circle cx="134" cy="80" r="2" />
            <circle cx="140" cy="88" r="2.5" />
            <circle cx="128" cy="92" r="2" />
            <circle cx="108" cy="108" r="2.5" />
            <circle cx="116" cy="112" r="2" />
            <circle cx="124" cy="118" r="2.5" />
            <circle cx="88" cy="110" r="2" />
            <circle cx="82" cy="118" r="2.5" />
            <circle cx="76" cy="124" r="2" />
            <circle cx="100" cy="130" r="2.5" />
            <circle cx="110" cy="136" r="2" />
          </g>

          {/* Orbital ring */}
          <ellipse
            cx="100"
            cy="100"
            rx="100"
            ry="28"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 6"
            className={cn("text-primary/20", !reduce && "animate-globe-orbit")}
          />

          {/* Highlight */}
          <circle
            cx="100"
            cy="100"
            r="88"
            fill="url(#globe-shine)"
          />

          <defs>
            <radialGradient id="globe-shine" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
              <stop offset="50%" stopColor="rgba(69,209,179,0.08)" />
              <stop offset="100%" stopColor="rgba(0,89,83,0.04)" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

/** SVG path for a meridian ellipse rotated by angle */
function describeMeridian(angle: number): string {
  const cx = 100;
  const cy = 100;
  const rx = 88 * Math.abs(Math.cos(angle));
  const ry = 88;
  if (rx < 2) {
    return `M ${cx} ${cy - ry} L ${cx} ${cy + ry}`;
  }
  return `M ${cx - rx} ${cy} A ${rx} ${ry} 0 0 1 ${cx + rx} ${cy} A ${rx} ${ry} 0 0 1 ${cx - rx} ${cy}`;
}
