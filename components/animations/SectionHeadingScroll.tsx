"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { registerGsap } from "@/lib/gsap/config";
import { sectionHeadingReveal } from "@/lib/animations/presets";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
  gradientTitle?: boolean;
  delay?: number;
};

export function SectionHeadingScroll({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  light,
  gradientTitle,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;
    registerGsap();

    const tl = sectionHeadingReveal(ref.current, { delay, trigger: ref.current });
    return () => tl?.scrollTrigger?.kill();
  }, [reduce, delay, title]);

  return (
    <div
      ref={ref}
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p
          data-heading-eyebrow
          className={cn("brand-pill mb-4", light && "opacity-95")}
        >
          {eyebrow}
        </p>
      ) : null}

      <h2
        data-heading-title
        className={cn(
          "font-display text-4xl font-bold leading-[1.06] tracking-tight text-balance md:text-5xl",
          light === false ? "text-foreground" : "text-white",
          gradientTitle && light !== false && "text-gradient-ignite",
        )}
      >
        {title}
      </h2>

      {description ? (
        <p
          data-heading-desc
          className={cn(
            "mt-4 text-base leading-relaxed md:text-lg",
            light === false ? "text-muted" : "text-white/75",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
