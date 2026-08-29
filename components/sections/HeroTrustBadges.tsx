"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { heroTrustBadges } from "@/data/homepage";
import { CardInnerReveal, RevealPart } from "@/components/animations/CardInnerReveal";
import { StaggerReveal, StaggerItem } from "@/components/animations/StaggerReveal";
import { gsap, registerGsap } from "@/lib/gsap/config";

export function HeroTrustBadges() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !ref.current) return;
    registerGsap();

    const ctx = gsap.context(() => {
      const items = ref.current!.querySelectorAll("[data-trust-badge]");
      items.forEach((item, i) => {
        gsap.to(item, {
          y: -4,
          duration: 2.5 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });
    }, ref);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <div className="relative z-10 -mt-2 pb-2 pt-4 md:pb-4">
      <div ref={ref} className="container-premium">
        <StaggerReveal className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6" stagger={0.1} variant="trust">
          {heroTrustBadges.map((badge) => (
            <StaggerItem key={badge.label}>
              <CardInnerReveal className="trust-badge-settle" delay={0.05}>
                <div
                  data-trust-badge
                  className="surface-light flex items-center gap-2.5 rounded-xl border border-primary/10 bg-white/95 px-3 py-3 shadow-[0_6px_20px_rgba(0,89,83,0.06)] backdrop-blur-sm sm:px-4"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <RevealPart part="icon">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#e8f6f1] text-[#005953]">
                      <badge.icon className="h-4 w-4" strokeWidth={1.75} />
                    </span>
                  </RevealPart>
                  <RevealPart part="title">
                    <span className="text-[0.68rem] font-semibold leading-tight text-[#005953] sm:text-[0.72rem]">
                      {badge.label}
                    </span>
                  </RevealPart>
                </div>
              </CardInnerReveal>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </div>
  );
}