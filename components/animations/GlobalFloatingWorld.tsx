"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap, registerGsap } from "@/lib/gsap/config";

const DECOR = [
  { cls: "world-ring world-ring--1", speed: -18 },
  { cls: "world-ring world-ring--2", speed: 12 },
  { cls: "world-ring world-ring--3", speed: -9 },
  { cls: "world-dot world-dot--1", speed: -8 },
  { cls: "world-dot world-dot--2", speed: 14 },
  { cls: "world-dot world-dot--3", speed: -10 },
  { cls: "world-dot world-dot--4", speed: 11 },
  { cls: "world-line world-line--1", speed: 6 },
  { cls: "world-line world-line--2", speed: -5 },
  { cls: "world-verify world-verify--1", speed: 9 },
  { cls: "world-grid world-grid--1", speed: 4 },
] as const;

/** Site-wide subtle 3D depth layer — rings, dots, lines that parallax on scroll + mouse */
export function GlobalFloatingWorld() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;
    registerGsap();

    const el = ref.current;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let raf = 0;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const onMove = (e: MouseEvent) => {
      if (!fine) return;
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      target.x = nx * 18;
      target.y = ny * 14;
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
    };

    const tick = () => {
      current.x += (target.x - current.x) * 0.06;
      current.y += (target.y - current.y) * 0.06;
      el.style.setProperty("--world-px", `${current.x.toFixed(2)}px`);
      el.style.setProperty("--world-py", `${current.y.toFixed(2)}px`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    const ctx = gsap.context(() => {
      DECOR.forEach(({ cls, speed }) => {
        const selector = `.${cls.split(" ").join(".")}`;
        const node = el.querySelector(selector);
        if (!node) return;
        gsap.to(node, {
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
    }, el);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      ctx.revert();
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <div ref={ref} className="world-canvas pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      <div className="world-ring world-ring--1" />
      <div className="world-ring world-ring--2" />
      <div className="world-ring world-ring--3" />
      <div className="world-dot world-dot--1" />
      <div className="world-dot world-dot--2" />
      <div className="world-dot world-dot--3" />
      <div className="world-dot world-dot--4" />
      <div className="world-line world-line--1" />
      <div className="world-line world-line--2" />
      <div className="world-verify world-verify--1" />
      <div className="world-grid world-grid--1" />
    </div>
  );
}
