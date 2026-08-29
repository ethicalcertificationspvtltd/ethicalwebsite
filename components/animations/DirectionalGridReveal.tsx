"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap, registerGsap } from "@/lib/gsap/config";
import { cn } from "@/lib/utils";

const DIRECTIONS = [
  { x: -80, y: 40, rotateY: -12 },
  { x: 0, y: 100, rotateX: 14 },
  { x: 80, y: 40, rotateY: 12 },
  { x: 0, y: -80, rotateX: -10 },
  { x: -60, y: 60, rotateY: -8 },
  { x: 60, y: 60, rotateY: 8 },
] as const;

type Props = {
  children: React.ReactNode;
  className?: string;
  scrub?: number;
};

/** Cinematic grid — each card enters from a unique depth direction, scrubbed to scroll */
export function DirectionalGridReveal({ children, className, scrub = 1.2 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;
    registerGsap();

    const items = ref.current.querySelectorAll(":scope > [data-stagger-item]");
    if (!items.length) return;

    const ctx = gsap.context(() => {
      items.forEach((item, i) => {
        const dir = DIRECTIONS[i % DIRECTIONS.length];
        gsap.fromTo(
          item,
          {
            opacity: 0,
            x: dir.x,
            y: dir.y,
            rotateX: "rotateX" in dir ? dir.rotateX : 0,
            rotateY: "rotateY" in dir ? dir.rotateY : 0,
            scale: 0.88,
            transformPerspective: 900,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              end: "top 35%",
              scrub,
            },
          },
        );
      });
    }, ref);

    return () => ctx.revert();
  }, [reduce, scrub]);

  return (
    <div ref={ref} className={cn(className)} style={{ perspective: "1200px" }}>
      {children}
    </div>
  );
}
