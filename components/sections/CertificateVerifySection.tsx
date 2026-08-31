"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { VerifyCertificateVisual } from "@/components/sections/VerifyCertificateVisual";
import { gsap, registerGsap } from "@/lib/gsap/config";
import { EASE } from "@/lib/animations/constants";

export function CertificateVerifySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const docRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !sectionRef.current) return;
    registerGsap();

    const ctx = gsap.context(() => {
      const parts = sectionRef.current!.querySelectorAll("[data-verify-part]");

      if (docRef.current) {
        gsap.fromTo(
          docRef.current,
          { opacity: 0, z: -120, rotateY: -25, scale: 0.85 },
          {
            opacity: 1,
            z: 0,
            rotateY: 0,
            scale: 1,
            transformPerspective: 1000,
            duration: 1,
            ease: EASE.cinematic,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              end: "top 35%",
              scrub: 1.2,
            },
          },
        );
      }

      gsap.fromTo(
        parts,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.14,
          ease: EASE.out,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 72%",
            toggleActions: "play none none none",
          },
        },
      );

      const icon = sectionRef.current!.querySelector("[data-verify-icon]");
      if (icon) {
        gsap.fromTo(
          icon,
          { scale: 0.5, opacity: 0, rotate: -20 },
          {
            scale: 1,
            opacity: 1,
            rotate: 0,
            duration: 0.7,
            ease: EASE.snap,
            scrollTrigger: { trigger: sectionRef.current, start: "top 72%", toggleActions: "play none none none" },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 md:py-28">
      <div className="container-premium relative z-10">
        <div className="relative overflow-hidden rounded-3xl border border-[#005953]/20 bg-[#003d39] px-8 py-10 shadow-[0_24px_60px_rgba(0,61,57,0.35)] md:px-12 md:py-14">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#24a87c]/20 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(36,168,124,0.18),transparent_45%)]" />

          <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_1.1fr_auto] lg:gap-10">
            <div ref={docRef} className="order-2 mx-auto w-full max-w-xs lg:order-1 lg:max-w-none">
              <VerifyCertificateVisual />
            </div>

            <div className="order-1 lg:order-2">
              <div
                data-verify-icon
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/90"
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                Certificate Verification
              </div>
              <div data-verify-part>
                <h2 className="max-w-2xl font-display text-3xl font-bold leading-[1.06] tracking-tight text-white sm:text-4xl md:text-5xl">
                  Verify an Ethical Certifications certificate
                </h2>
              </div>
              <p data-verify-part className="mt-4 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
                Confirm the status and validity of an issued certification using our certificate verification service.
              </p>
            </div>

            <div data-verify-part className="order-3 flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-stretch">
              <Button href="/clients#verify" size="lg" variant="white" className="w-full sm:w-auto">
                Verify Certificate
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Link
                href="/clients"
                className="inline-flex h-14 items-center justify-center rounded-full border border-white/25 px-8 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Learn about verification
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
