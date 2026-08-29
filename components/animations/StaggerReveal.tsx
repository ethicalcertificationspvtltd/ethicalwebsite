"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap, registerGsap } from "@/lib/gsap/config";
import { CARD_STAGGER, EASE, SCROLL_START } from "@/lib/animations/constants";
import { cn } from "@/lib/utils";

type Variant = "fadeUp" | "depth" | "scale" | "trust";

const initial: Record<Variant, gsap.TweenVars> = {
  fadeUp: { opacity: 0, y: 40 },
  depth: {
    opacity: 0,
    y: 72,
    rotateX: 12,
    transformPerspective: 900,
    transformOrigin: "center bottom",
  },
  scale: { opacity: 0, scale: 0.94, y: 24 },
  trust: {
    opacity: 0,
    y: 100,
    scale: 0.8,
    rotateX: 15,
    transformPerspective: 900,
    transformOrigin: "center bottom",
  },
};

type StaggerProps = {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  variant?: Variant;
  start?: string;
};

export function StaggerReveal({
  children,
  className,
  stagger = CARD_STAGGER,
  delay = 0,
  variant = "depth",
  start = SCROLL_START,
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;
    registerGsap();

    const container = ref.current;
    const items = container.querySelectorAll(":scope > [data-stagger-item]");
    if (!items.length) return;

    const ctx = gsap.context(() => {
      gsap.set(items, initial[variant]);
      gsap.to(items, {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotateX: 0,
        duration: 0.75,
        stagger,
        delay,
        ease: EASE.cinematic,
        scrollTrigger: {
          trigger: container,
          start,
          toggleActions: "play none none none",
        },
      });
    }, container);

    return () => ctx.revert();
  }, [reduce, stagger, delay, variant, start]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div data-stagger-item className={cn(className)}>
      {children}
    </div>
  );
}
