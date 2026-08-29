"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap, registerGsap } from "@/lib/gsap/config";

const TONES = ["hero", "surface", "deep", "mint"] as const;

/**
 * Scroll-scrubbed ambient background crossfade across homepage sections.
 * Sections declare tone via data-section-tone="hero|surface|deep|mint".
 */
export function SectionBackgroundTransition() {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !rootRef.current) return;
    registerGsap();

    const sections = document.querySelectorAll<HTMLElement>("[data-section-tone]");
    if (!sections.length) return;

    const layers = TONES.map((tone) =>
      rootRef.current!.querySelector<HTMLElement>(`[data-atmo="${tone}"]`),
    );

    const ctx = gsap.context(() => {
      sections.forEach((section) => {
        const tone = section.dataset.sectionTone as (typeof TONES)[number] | undefined;
        if (!tone) return;
        const activeIndex = TONES.indexOf(tone);
        if (activeIndex < 0) return;

        layers.forEach((layer, i) => {
          if (!layer) return;
          gsap.to(layer, {
            opacity: i === activeIndex ? 1 : 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 72%",
              end: "bottom 28%",
              scrub: 1.6,
            },
          });
        });
      });

      const shift = rootRef.current!.querySelector<HTMLElement>("[data-atmo-shift]");
      if (shift) {
        gsap.to(shift, {
          backgroundPosition: "0% 100%",
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 2.5,
          },
        });
      }
    });

    return () => ctx.revert();
  }, [reduce]);

  if (reduce) return null;

  return (
    <div ref={rootRef} className="atmo-canvas pointer-events-none fixed inset-0 z-0" aria-hidden>
      <div data-atmo-shift className="atmo-shift" />
      {TONES.map((tone) => (
        <div
          key={tone}
          data-atmo={tone}
          className={`atmo-layer atmo-layer--${tone}`}
          style={{ opacity: tone === "hero" ? 1 : 0 }}
        />
      ))}
    </div>
  );
}
