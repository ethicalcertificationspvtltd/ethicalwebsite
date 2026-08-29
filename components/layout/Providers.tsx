"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { patchThreeConsoleWarnings } from "@/lib/three-console";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  // Opacity-only — transform/filter on this wrapper would break position:sticky stacks
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={reduce ? undefined : { opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

/** Shell wrappers — smooth scroll + chrome stay outside page transitions. */
export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    patchThreeConsoleWarnings();
  }, []);

  return <SmoothScroll>{children}</SmoothScroll>;
}
