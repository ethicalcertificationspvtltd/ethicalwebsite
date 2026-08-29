"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { registerGsap } from "@/lib/gsap/config";
import { imageReveal } from "@/lib/animations/presets";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function ImageReveal({ children, className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;
    registerGsap();

    const tl = imageReveal(ref.current, null, {
      trigger: ref.current,
      delay,
    });

    return () => tl?.scrollTrigger?.kill();
  }, [reduce, delay]);

  return (
    <div ref={ref} className={cn("overflow-hidden will-change-[clip-path]", className)}>
      {children}
    </div>
  );
}
