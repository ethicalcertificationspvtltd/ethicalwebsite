"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<"default" | "button" | "view">("default");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 520, damping: 38, mass: 0.25 });
  const sy = useSpring(y, { stiffness: 520, damping: 38, mass: 0.25 });
  const ringX = useSpring(x, { stiffness: 160, damping: 24, mass: 0.45 });
  const ringY = useSpring(y, { stiffness: 160, damping: 24, mass: 0.45 });
  const trailX = useSpring(x, { stiffness: 70, damping: 20, mass: 0.6 });
  const trailY = useSpring(y, { stiffness: 70, damping: 20, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const enable = () => {
      setEnabled(true);
      document.body.classList.add("has-custom-cursor");
    };
    const id = window.setTimeout(enable, 0);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const leave = () => setVisible(false);
    const over = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest(
        "[data-cursor]",
      ) as HTMLElement | null;
      const value = target?.dataset.cursor;
      if (value === "button" || value === "view") setMode(value);
      else if (
        (e.target as HTMLElement)?.closest("a,button,input,textarea,select,[role='button']")
      )
        setMode("button");
      else setMode("default");
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      window.clearTimeout(id);
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  const ringSize = mode === "view" ? 52 : mode === "button" ? 40 : 28;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[98] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/15"
        style={{ x: trailX, y: trailY, opacity: visible ? 0.45 : 0 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
        style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[99] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/45 bg-primary/[0.03] backdrop-blur-[1px] transition-[width,height] duration-200"
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          opacity: visible ? 1 : 0,
        }}
      >
        {mode === "view" ? (
          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-semibold uppercase tracking-[0.16em] text-primary">
            View
          </span>
        ) : null}
      </motion.div>
    </>
  );
}
