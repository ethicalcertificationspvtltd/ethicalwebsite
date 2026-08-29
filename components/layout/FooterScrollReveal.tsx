"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap, registerGsap } from "@/lib/gsap/config";
import { EASE } from "@/lib/animations/constants";

export function FooterScrollReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;
    registerGsap();

    const ctx = gsap.context(() => {
      const banner = ref.current!.querySelector("[data-footer-banner]");
      const columns = ref.current!.querySelectorAll("[data-footer-col]");
      const copyright = ref.current!.querySelector("[data-footer-copy]");
      const socials = ref.current!.querySelectorAll("[data-footer-social]");

      if (banner) {
        gsap.fromTo(
          banner,
          { opacity: 0, y: 40, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            ease: EASE.out,
            scrollTrigger: { trigger: banner, start: "top 88%", toggleActions: "play none none none" },
          },
        );
      }

      if (columns.length) {
        gsap.fromTo(
          columns,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: EASE.out,
            scrollTrigger: { trigger: ref.current, start: "top 85%", toggleActions: "play none none none" },
          },
        );
      }

      if (socials.length) {
        gsap.fromTo(
          socials,
          { opacity: 0, scale: 0.85 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.08,
            ease: EASE.snap,
            scrollTrigger: { trigger: ref.current, start: "top 82%", toggleActions: "play none none none" },
          },
        );
      }

      if (copyright) {
        gsap.fromTo(
          copyright,
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: EASE.out,
            scrollTrigger: { trigger: copyright, start: "top 95%", toggleActions: "play none none none" },
          },
        );
      }
    }, ref);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <footer ref={ref} className="relative overflow-hidden footer-gradient text-foreground">
      {children}
    </footer>
  );
}
