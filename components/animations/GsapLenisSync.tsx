"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";
import { ScrollTrigger, registerGsap } from "@/lib/gsap/config";

/** Keeps GSAP ScrollTrigger in sync with Lenis smooth scroll. */
export function GsapLenisSync() {
  const lenis = useLenis();

  useEffect(() => {
    registerGsap();
    if (!lenis) return;

    const onScroll = () => ScrollTrigger.update();
    lenis.on("scroll", onScroll);

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener("refresh", onRefresh);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", onScroll);
      ScrollTrigger.removeEventListener("refresh", onRefresh);
      window.removeEventListener("resize", onResize);
      ScrollTrigger.scrollerProxy(document.documentElement, {});
    };
  }, [lenis]);

  return null;
}

/** Disables heavy GSAP motion when user prefers reduced motion. */
export function GsapReducedMotion() {
  useEffect(() => {
    registerGsap();
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    function apply() {
      if (mq.matches) {
        ScrollTrigger.getAll().forEach((t) => t.disable(true));
      } else {
        ScrollTrigger.getAll().forEach((t) => t.enable());
        ScrollTrigger.refresh();
      }
    }

    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return null;
}
