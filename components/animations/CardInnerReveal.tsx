"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap, registerGsap } from "@/lib/gsap/config";
import { cardInnerTimeline } from "@/lib/animations/presets";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  start?: string;
};

/** Staggered internal card content: icon → title → body → CTA */
export function CardInnerReveal({ children, className, delay = 0, start }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;
    registerGsap();

    const ctx = gsap.context(() => {
      cardInnerTimeline(ref.current!, { delay, start, trigger: ref.current! });
    }, ref);
    return () => ctx.revert();
  }, [reduce, delay, start]);

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  );
}

/** Mark card sub-elements for internal stagger animation */
export function RevealPart({
  part,
  children,
  className,
}: {
  part: "icon" | "eyebrow" | "title" | "body" | "cta" | "number";
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div data-reveal={part} className={className}>
      {children}
    </div>
  );
}
