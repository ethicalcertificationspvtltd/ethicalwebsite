"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, type LenisRef } from "lenis/react";
import { cancelFrame, frame, useReducedMotion } from "framer-motion";
import "lenis/dist/lenis.css";
import { GsapLenisSync, GsapReducedMotion } from "@/components/animations/GsapLenisSync";

/**
 * Paymark-style inertia scrolling — Lenis synced to Framer Motion's frame loop
 * so useScroll / whileInView stay in lockstep with the smooth scroll.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const lenisRef = useRef<LenisRef>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (reduce) return;

    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }

    frame.update(update, true);
    return () => cancelFrame(update);
  }, [reduce]);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis || reduce) return;

    const hash = window.location.hash;
    if (hash) {
      requestAnimationFrame(() => {
        lenis.scrollTo(hash, { offset: -112, duration: 1.2 });
      });
    } else {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, reduce]);

  if (reduce) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.6,
        wheelMultiplier: 0.95,
        anchors: {
          offset: -112,
          duration: 1.25,
        },
      }}
    >
      <GsapLenisSync />
      <GsapReducedMotion />
      {children}
    </ReactLenis>
  );
}
