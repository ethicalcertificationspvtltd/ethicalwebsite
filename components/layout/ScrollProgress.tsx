"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useMediaQuery } from "@/lib/useMediaQuery";

/** Thin top progress bar — desktop only (avoids spring work on mobile scroll). */
export function ScrollProgress() {
  const enabled = useMediaQuery("(min-width: 1024px)");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2.5px] origin-left bg-gradient-to-r from-primary via-primary-light to-accent"
      style={{ scaleX }}
    />
  );
}
