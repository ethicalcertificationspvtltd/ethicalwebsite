"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap, registerGsap } from "@/lib/gsap/config";

const DECOR = [
  { cls: "world-ring world-ring--1", speed: -18 },
  { cls: "world-ring world-ring--2", speed: 12 },
  { cls: "world-dot world-dot--1", speed: -8 },
  { cls: "world-dot world-dot--2", speed: 14 },
  { cls: "world-dot world-dot--3", speed: -10 },
  { cls: "world-line world-line--1", speed: 6 },
  { cls: "world-line world-line--2", speed: -5 },
  { cls: "world-verify world-verify--1", speed: 9 },
] as const;

/** Site-wide subtle 3D depth layer — rings, dots, lines that parallax on scroll */
export function GlobalFloatingWorld() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;
    registerGsap();

    const ctx = gsap.context(() => {
      DECOR.forEach(({ cls, speed }) => {
        const selector = `.${cls.split(" ").join(".")}`;
        const el = ref.current!.querySelector(selector);
        if (!el) return;
        gsap.to(el, {
          yPercent: speed,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          },
        });
      });
    }, ref);

    return () => ctx.revert();
  }, [reduce]);

  if (reduce) return null;

  return (
    <div ref={ref} className="world-canvas pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      <div className="world-ring world-ring--1" />
      <div className="world-ring world-ring--2" />
      <div className="world-dot world-dot--1" />
      <div className="world-dot world-dot--2" />
      <div className="world-dot world-dot--3" />
      <div className="world-line world-line--1" />
      <div className="world-line world-line--2" />
      <div className="world-verify world-verify--1" />
    </div>
  );
}
