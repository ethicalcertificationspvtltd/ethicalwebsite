"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { gsap, registerGsap } from "@/lib/gsap/config";
import { EASE } from "@/lib/animations/constants";

export function FinalCtaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !sectionRef.current) return;
    registerGsap();

    const ctx = gsap.context(() => {
      const parts = sectionRef.current!.querySelectorAll("[data-cta-part]");
      const panel = sectionRef.current!.querySelector("[data-cta-panel]");
      const cert = sectionRef.current!.querySelector(".cta-floating-cert");

      gsap.fromTo(
        parts,
        { opacity: 0, y: 48, z: -40, rotateX: 10, transformPerspective: 1200 },
        {
          opacity: 1,
          y: 0,
          z: 0,
          rotateX: 0,
          duration: 1,
          stagger: 0.14,
          ease: EASE.cinematic,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "top 35%",
            scrub: 1.4,
          },
        },
      );

      if (panel) {
        gsap.fromTo(
          panel,
          { scale: 0.94, opacity: 0.85 },
          {
            scale: 1,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 90%",
              end: "top 40%",
              scrub: 1.6,
            },
          },
        );
      }

      if (cert) {
        gsap.fromTo(
          cert,
          { y: 40, opacity: 0, rotateY: -12 },
          {
            y: 0,
            opacity: 1,
            rotateY: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 88%",
              end: "top 42%",
              scrub: 1.8,
            },
          },
        );
      }

      const ring1 = sectionRef.current!.querySelector(".cta-orbit-ring--1");
      const ring2 = sectionRef.current!.querySelector(".cta-orbit-ring--2");
      if (ring1) {
        gsap.to(ring1, { rotation: 360, duration: 40, repeat: -1, ease: "none" });
      }
      if (ring2) {
        gsap.to(ring2, { rotation: -360, duration: 55, repeat: -1, ease: "none" });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={sectionRef} data-section-tone="deep" className="relative overflow-hidden py-20 md:py-24">
      <div className="container-premium relative z-10">
        <div
          data-cta-panel
          className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-[#005953] via-[#007a6e] to-[#24a87c] px-8 py-12 shadow-[0_24px_60px_rgba(0,89,83,0.25)] md:px-14 md:py-16"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="cta-floating-cert" aria-hidden />
          <div className="cta-orbit-ring cta-orbit-ring--1" aria-hidden />
          <div className="cta-orbit-ring cta-orbit-ring--2" aria-hidden />
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 left-1/3 h-56 w-56 rounded-full bg-[#c09c54]/15 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-3xl text-center">
            <p data-cta-part className="text-xs font-bold uppercase tracking-[0.2em] text-white/80">
              Ready to begin
            </p>
            <h2 data-cta-part className="mt-3 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
              Ready to Get Certified?
            </h2>
            <p data-cta-part className="mt-4 text-base leading-relaxed text-white/85 md:text-lg">
              Speak with our certification experts and find the right path for your organization.
            </p>
            <div data-cta-part className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <MagneticButton href="/contact#quote" size="lg" variant="white">
                Get Free Quote
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton href="/contact" size="lg" variant="ghost">
                Contact Us
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
