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
  /** Tie entrance directly to scroll position (reverses on scroll up) */
  scrub?: boolean | number;
  /** Add subtle idle float after cards enter */
  idleFloat?: boolean;
};

export function StaggerReveal({
  children,
  className,
  stagger = CARD_STAGGER,
  delay = 0,
  variant = "depth",
  start = SCROLL_START,
  scrub = false,
  idleFloat = false,
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

      const tweenVars: gsap.TweenVars = {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotateX: 0,
        ease: EASE.cinematic,
        stagger,
      };

      if (scrub) {
        gsap.to(items, {
          ...tweenVars,
          scrollTrigger: {
            trigger: container,
            start: "top 88%",
            end: "top 45%",
            scrub: typeof scrub === "number" ? scrub : 1.2,
          },
        });
      } else {
        gsap.to(items, {
          ...tweenVars,
          duration: 0.75,
          delay,
          scrollTrigger: {
            trigger: container,
            start,
            toggleActions: "play none none none",
          },
          onComplete: idleFloat
            ? () => {
                items.forEach((item, i) => {
                  item.classList.add("card-idle-float");
                  (item as HTMLElement).style.animationDelay = `${i * 0.35}s`;
                });
              }
            : undefined,
        });
      }
    }, container);

    return () => ctx.revert();
  }, [reduce, stagger, delay, variant, start, scrub, idleFloat]);

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
