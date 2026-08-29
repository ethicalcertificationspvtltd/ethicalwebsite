"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "up" | "fade" | "blur" | "scale" | "left" | "right";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: Variant;
  once?: boolean;
};

/* Ignite-like scroll reveals — soft blur + lift */
const easeOut = [0.16, 1, 0.3, 1] as const;

const variants: Record<
  Variant,
  { initial: Record<string, number | string>; animate: Record<string, number | string> }
> = {
  up: {
    initial: { opacity: 0, y: 48 },
    animate: { opacity: 1, y: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  blur: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
  },
  left: {
    initial: { opacity: 0, x: -28 },
    animate: { opacity: 1, x: 0 },
  },
  right: {
    initial: { opacity: 0, x: 28 },
    animate: { opacity: 1, x: 0 },
  },
};

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
  once = true,
}: Props) {
  const reduce = useReducedMotion();
  const v = variants[variant];

  if (reduce) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      initial={v.initial}
      whileInView={v.animate}
      viewport={{ once, amount: 0.2, margin: "0px 0px -5% 0px" }}
      transition={{ duration: 0.5, delay, ease: easeOut }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.12, margin: "0px 0px 8% 0px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.05,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
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
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: 24 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.42, ease: easeOut },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
