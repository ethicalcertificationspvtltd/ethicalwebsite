"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { registerGsap } from "@/lib/gsap/config";
import { parallax } from "@/lib/animations/presets";
import { cn } from "@/lib/utils";

type Props = {
  children?: React.ReactNode;
  className?: string;
  speed?: number;
  scrub?: number;
};

export function ParallaxLayer({ children, className, speed = 12, scrub = 1.2 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;
    registerGsap();

    const el = ref.current;
    const tween = parallax(el, speed, {
      trigger: el.parentElement ?? el,
      scrub,
    });

    return () => {
      tween?.scrollTrigger?.kill();
      tween?.kill();
    };
  }, [reduce, speed, scrub]);

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}
