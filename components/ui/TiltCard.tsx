"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glow?: boolean;
  scaleOnHover?: number;
};

export function TiltCard({
  children,
  className,
  intensity = 8,
  glow = true,
  scaleOnHover = 1.01,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotateX = useSpring(0, { stiffness: 160, damping: 22, mass: 0.4 });
  const rotateY = useSpring(0, { stiffness: 160, damping: 22, mass: 0.4 });
  const scale = useSpring(1, { stiffness: 220, damping: 24 });
  const glareX = useSpring(50, { stiffness: 120, damping: 20 });
  const glareY = useSpring(50, { stiffness: 120, damping: 20 });
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, rgba(196,163,90,0.18), transparent 42%)`;

  function onMove(e: React.MouseEvent) {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px);
    y.set(py);
    rotateX.set(Math.max(-5, Math.min(5, (0.5 - py) * intensity * 0.625)));
    rotateY.set(Math.max(-5, Math.min(5, (px - 0.5) * intensity * 0.625)));
    glareX.set(px * 100);
    glareY.set(py * 100);
    scale.set(scaleOnHover);
  }

  function onLeave() {
    rotateX.set(0);
    rotateY.set(0);
    glareX.set(50);
    glareY.set(50);
    scale.set(1);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: "preserve-3d",
        transformPerspective: 1100,
      }}
      className={cn("relative will-change-transform", className)}
    >
      {glow ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glare, mixBlendMode: "soft-light" }}
        />
      ) : null}
      <div style={{ transform: "translateZ(24px)" }} className="relative h-full">
        {children}
      </div>
    </motion.div>
  );
}
