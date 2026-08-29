"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BrandLogoInteractive } from "@/components/ui/BrandLogoInteractive";

export function PageLoader() {
  const [show, setShow] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    const delay = reduce ? 180 : 1200;
    const t = window.setTimeout(() => {
      setShow(false);
      document.documentElement.classList.add("app-ready");
    }, delay);
    return () => window.clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-gradient-to-b from-[#24a87c] via-[#2eb583] to-[#24a87c]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative flex flex-col items-center gap-6">
            <div className="absolute -inset-16 rounded-full border border-white/15" />
            <div className="absolute -inset-10 animate-[seal-spin_6s_linear_infinite] rounded-full border border-dashed border-white/30" />
            <BrandLogoInteractive priority className="relative z-10 h-12 w-[140px] [&_img]:brightness-0 [&_img]:invert" />
            <div className="h-[2px] w-40 overflow-hidden rounded-full bg-white/20">
              <motion.div
                className="h-full bg-gradient-to-r from-white/70 to-white"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: reduce ? 0.15 : 0.95, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
