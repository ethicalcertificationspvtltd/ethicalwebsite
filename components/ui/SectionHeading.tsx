"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
  gradientTitle?: boolean;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  light,
  gradientTitle,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease }}
    >
      {eyebrow ? (
        <p className={cn("brand-pill mb-4", light && "opacity-95")}>{eyebrow}</p>
      ) : null}

      <h2
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
          className={cn(
            "mt-4 text-base leading-relaxed md:text-lg",
            light === false ? "text-muted" : "text-white/75",
          )}
        >
          {description}
        </p>
      ) : null}
    </motion.div>
  );
}
