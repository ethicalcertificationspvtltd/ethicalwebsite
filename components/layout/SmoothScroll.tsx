"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, type LenisRef } from "lenis/react";
import { cancelFrame, frame, useReducedMotion } from "framer-motion";
import "lenis/dist/lenis.css";
import { GsapLenisSync, GsapReducedMotion } from "@/components/animations/GsapLenisSync";
import { useIsDesktopFine } from "@/lib/useMediaQuery";

/**
 * Desktop-only inertia scrolling. Disabled on mobile / coarse pointers /
 * reduced-motion to keep scroll cheap and native.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  const desktopFine = useIsDesktopFine();
  const enabled = desktopFine && !reduce;
  const lenisRef = useRef<LenisRef>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (!enabled) return;

    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }

    frame.update(update, true);
    return () => cancelFrame(update);
  }, [enabled]);

  useEffect(() => {
    const lenis = lenisRef.current?.lenis;
    if (!lenis || !enabled) return;

    const hash = window.location.hash;
    if (hash) {
      requestAnimationFrame(() => {
        lenis.scrollTo(hash, { offset: -112, duration: 1.0 });
      });
    } else {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [pathname, enabled]);

  if (!enabled) {
    return (
      <>
        <GsapReducedMotion />
        {children}
      </>
    );
  }

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.6,
        wheelMultiplier: 0.9,
        anchors: {
          offset: -112,
          duration: 1.0,
        },
      }}
    >
      <GsapLenisSync />
      <GsapReducedMotion />
      {children}
    </ReactLenis>
  );
}
