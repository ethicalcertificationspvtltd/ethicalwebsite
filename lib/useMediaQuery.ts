"use client";

import { useSyncExternalStore } from "react";

function subscribeMediaQuery(query: string, onStoreChange: () => void) {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onStoreChange) => subscribeMediaQuery(query, onStoreChange),
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Viewports below lg (1024px) — tablets and phones */
export function useIsMobile() {
  return useMediaQuery("(max-width: 1023px)");
}

/** Desktop fine-pointer experience (Lenis, floating world, etc.) */
export function useIsDesktopFine() {
  const wide = useMediaQuery("(min-width: 1024px)");
  const fine = useMediaQuery("(pointer: fine)");
  return wide && fine;
}

/** True when motion/effects should stay light (mobile, coarse pointer, or reduced motion). */
export function usePreferLightEffects() {
  const mobile = useMediaQuery("(max-width: 1023px)");
  const coarse = useMediaQuery("(pointer: coarse)");
  const reduce = useMediaQuery("(prefers-reduced-motion: reduce)");
  return mobile || coarse || reduce;
}
