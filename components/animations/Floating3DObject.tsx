"use client";

import { cn } from "@/lib/utils";

type Variant = "ring" | "dot" | "line" | "grid" | "verify";

type Props = {
  variant?: Variant;
  className?: string;
  /** Deterministic motion seed — affects duration/delay */
  seed?: number;
  size?: "sm" | "md" | "lg";
};

const SIZE: Record<NonNullable<Props["size"]>, string> = {
  sm: "float-obj--sm",
  md: "float-obj--md",
  lg: "float-obj--lg",
};

/**
 * Subtle decorative 3D float element — deterministic motion via seed.
 */
export function Floating3DObject({
  variant = "ring",
  className,
  seed = 0,
  size = "md",
}: Props) {
  const duration = 11 + (seed % 5) * 1.4;
  const delay = (seed % 7) * 0.35;
  const drift = seed % 2 === 0 ? "float-obj--drift-a" : "float-obj--drift-b";

  return (
    <div
      className={cn(
        "float-obj pointer-events-none absolute",
        `float-obj--${variant}`,
        SIZE[size],
        drift,
        className,
      )}
      style={{
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      }}
      aria-hidden
    />
  );
}
