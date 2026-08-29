"use client";

import { Children, useRef, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Paymark-style pinned scroll:
 * viewport feels stuck; each panel holds while the next slides up from below
 * (scale / fade on the covered panel = soft 3D depth).
 */
export function StickyStack({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const items = Children.toArray(children);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={cn("relative isolate", className)}>
      {items.map((child, index) => (
        <StickyPanel key={index} index={index} isLast={index === items.length - 1}>
          {child}
        </StickyPanel>
      ))}
    </div>
  );
}

function StickyPanel({
  children,
  index,
  isLast,
}: {
  children: ReactNode;
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.55]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", isLast ? "0%" : "-4%"]);
  const blur = useTransform(
    scrollYProgress,
    [0, 1],
    ["blur(0px)", isLast ? "blur(0px)" : "blur(10px)"],
  );
  const backdropBlurPx = useTransform(scrollYProgress, [0, 0.35, 1], [10, 18, 26]);
  const backdropFilter = useMotionTemplate`blur(${backdropBlurPx}px)`;
  const veil = useTransform(scrollYProgress, [0, 0.35, 1], [0, 0, isLast ? 0 : 0.45]);

  return (
    <div
      ref={ref}
      className="sticky top-0 flex min-h-[100svh] w-full items-stretch"
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-x-clip bg-background/40 shadow-[0_-28px_90px_rgba(0,0,0,0.08)]"
        style={{
          scale,
          opacity,
          y,
          filter: blur,
          backdropFilter,
          WebkitBackdropFilter: backdropFilter,
          transformOrigin: "center top",
        }}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-b from-transparent via-transparent to-primary/8"
          style={{ opacity: veil }}
        />
        <div className="relative z-10 flex min-h-[100svh] w-full flex-col justify-center">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
