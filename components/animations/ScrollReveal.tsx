"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { registerGsap } from "@/lib/gsap/config";
import {
  depthReveal,
  fadeIn,
  fadeUp,
  scaleIn,
  slideIn,
} from "@/lib/animations/presets";
import { cn } from "@/lib/utils";

type Variant = "fadeUp" | "fadeIn" | "scaleIn" | "slideLeft" | "slideRight" | "depth";

type Props = {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  delay?: number;
  duration?: number;
  start?: string;
  as?: keyof HTMLElementTagNameMap;
};

export function ScrollReveal({
  children,
  className,
  variant = "fadeUp",
  delay = 0,
  duration,
  start,
  as: Tag = "div",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;
    registerGsap();

    const el = ref.current;
    const opts = { delay, duration, start, trigger: el };

    switch (variant) {
      case "fadeIn":
        fadeIn(el, opts);
        break;
      case "scaleIn":
        scaleIn(el, opts);
        break;
      case "slideLeft":
        slideIn(el, "left", opts);
        break;
      case "slideRight":
        slideIn(el, "right", opts);
        break;
      case "depth":
        depthReveal(el, opts);
        break;
      default:
        fadeUp(el, opts);
    }
  }, [reduce, variant, delay, duration, start]);

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={cn(className)}>
      {children}
    </Tag>
  );
}
