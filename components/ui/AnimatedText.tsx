"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  text: string;
  className?: string;
  delay?: number;
  mode?: "letter" | "word";
  variant?: "default" | "fly";
  once?: boolean;
  block?: boolean;
  /** Max words to split-animate; rest appear with the block (perf) */
  maxWords?: number;
};

const wordShow: Variants = {
  hidden: { opacity: 0, y: -14, x: 0 },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.32, ease },
  },
};

const flyShow = (i: number): Variants => ({
  hidden: {
    opacity: 0,
    y: -18 - (i % 3) * 4,
    x: ((i * 3) % 5 - 2) * 3,
  },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.28, ease },
  },
});

export function AnimatedText({
  text,
  className,
  delay = 0,
  mode = "word",
  variant = "fly",
  once = true,
  block = false,
  maxWords = 8,
}: Props) {
  const reduce = useReducedMotion();

  const { units, tail } = useMemo(() => {
    if (mode === "word") {
      const parts = text.split(/(\s+)/).filter(Boolean);
      if (parts.length <= maxWords * 2) return { units: parts, tail: "" };
      const animated = parts.slice(0, maxWords * 2);
      const rest = parts.slice(maxWords * 2).join("");
      return { units: animated, tail: rest };
    }
    return { units: text.split(""), tail: "" };
  }, [text, mode, maxWords]);

  if (reduce) {
    return <span className={cn(block && "block", className)}>{text}</span>;
  }

  const stagger = mode === "letter" ? 0.018 : 0.032;

  return (
    <motion.span
      className={cn(block && "block", className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.12, margin: "0px 0px 10% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {units.map((unit, i) => {
        const isSpace = unit.trim() === "" && mode === "word";
        return (
          <motion.span
            key={`${unit}-${i}`}
            className={cn("inline-block", isSpace && "w-[0.28em]")}
            variants={
              variant === "fly" && mode === "word" && !isSpace
                ? flyShow(i)
                : wordShow
            }
          >
            {mode === "word" ? unit : unit === " " ? "\u00A0" : unit}
          </motion.span>
        );
      })}
      {tail ? <span>{tail}</span> : null}
    </motion.span>
  );
}

/** Titles & short labels — word fly-in on scroll */
export function FlyText({
  text,
  className,
  delay = 0,
  block = false,
  maxWords,
}: {
  text: string;
  className?: string;
  delay?: number;
  block?: boolean;
  maxWords?: number;
}) {
  return (
    <AnimatedText
      text={text}
      className={className}
      delay={delay}
      mode="word"
      variant="fly"
      block={block}
      maxWords={maxWords}
    />
  );
}

/**
 * Word fly-in driven by parent card stagger (no extra whileInView).
 * Use inside CardMotion.
 */
export function CardFlyText({
  text,
  className,
  maxWords = 10,
}: {
  text: string;
  className?: string;
  maxWords?: number;
}) {
  const reduce = useReducedMotion();
  const words = useMemo(() => {
    const parts = text.split(/(\s+)/).filter(Boolean);
    if (parts.length <= maxWords * 2) return parts;
    return [...parts.slice(0, maxWords * 2), parts.slice(maxWords * 2).join("")];
  }, [text, maxWords]);

  if (reduce) return <span className={className}>{text}</span>;

  return (
    <motion.span
      className={className}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.03 } },
      }}
    >
      {words.map((unit, i) => {
        const isSpace = unit.trim() === "" && i < words.length - 1;
        if (!isSpace && i === words.length - 1 && unit.includes(" ")) {
          return <span key={i}>{unit}</span>;
        }
        return (
          <motion.span
            key={`${unit}-${i}`}
            className={cn("inline-block", isSpace && "w-[0.28em]")}
            variants={flyShow(i)}
          >
            {unit}
          </motion.span>
        );
      })}
    </motion.span>
  );
}

/** Fade-up block for card body copy — parent CardMotion controls timing */
export const cardTextReveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
};
