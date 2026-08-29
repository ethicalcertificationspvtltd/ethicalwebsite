"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { registerGsap } from "@/lib/gsap/config";
import { counterAnimation } from "@/lib/animations/presets";
import { cn } from "@/lib/utils";

type Props = {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
};

export function GsapCounter({ value, suffix = "", prefix = "", className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;
    registerGsap();

    const numEl = ref.current.querySelector("[data-count]") as HTMLElement | null;
    if (!numEl) return;

    const tween = counterAnimation(numEl, value, {
      trigger: ref.current,
      suffix,
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduce, value, suffix]);

  if (reduce) {
    return (
      <span className={cn("tabular-nums", className)}>
        {prefix}
        {value}
        {suffix}
      </span>
    );
  }

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}
      <span data-count>0</span>
      {suffix}
    </span>
  );
}
