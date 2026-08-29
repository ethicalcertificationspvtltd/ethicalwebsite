"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { AccreditationCard } from "@/components/ui/Cards";
import { SectionHeadingScroll } from "@/components/animations/SectionHeadingScroll";
import { StaggerReveal, StaggerItem } from "@/components/animations/StaggerReveal";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ParallaxLayer } from "@/components/animations/ParallaxLayer";
import { Button } from "@/components/ui/Button";
import { accreditations } from "@/data/accreditations";
import { gsap, registerGsap } from "@/lib/gsap/config";

export function AccreditationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !sectionRef.current) return;
    registerGsap();

    const ctx = gsap.context(() => {
      const rings = sectionRef.current!.querySelectorAll("[data-accr-ring]");
      rings.forEach((ring, i) => {
        gsap.to(ring, { rotation: 360, duration: 28 + i * 6, repeat: -1, ease: "none" });
      });

      if (hubRef.current) {
        gsap.fromTo(
          hubRef.current,
          { scale: 0.7, opacity: 0, rotateY: -20 },
          {
            scale: 1,
            opacity: 1,
            rotateY: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: hubRef.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  const iaf = accreditations.find((a) => a.id === "iaf");

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-background py-20 md:py-28">
      <ParallaxLayer speed={8} className="pointer-events-none absolute inset-0 tech-grid opacity-30" />
      <div data-accr-ring className="pointer-events-none absolute left-1/2 top-[38%] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10 opacity-40" aria-hidden />
      <div data-accr-ring className="pointer-events-none absolute left-1/2 top-[38%] h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-accent/20 opacity-30" aria-hidden />

      <div className="container-premium relative z-10">
        <SectionHeadingScroll
          eyebrow="IAF Recognition"
          title="Our Accreditations"
          description="Recognized through the International Accreditation Forum (IAF) pathway via SAAC and PNAC — supporting trusted, internationally aligned certification outcomes for organizations in Saudi Arabia and beyond."
          light={false}
        />

        {iaf ? (
          <div ref={hubRef} className="accr-orbit-hub mt-10" style={{ transformStyle: "preserve-3d" }}>
            <div className="accr-orbit-hub-core">
              <Image src={iaf.logo} alt={iaf.name} width={64} height={64} className="h-14 w-auto object-contain" />
            </div>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-[0.2em] text-primary/70">
              {iaf.shortName}
            </span>
          </div>
        ) : null}

        <StaggerReveal className="mt-12 grid gap-5 md:grid-cols-3" stagger={0.14} variant="depth">
          {accreditations.map((a) => (
            <StaggerItem key={a.id}>
              <AccreditationCard {...a} />
            </StaggerItem>
          ))}
        </StaggerReveal>
        <ScrollReveal delay={0.15} variant="fadeUp">
          <div className="mt-10">
            <Button href="/accreditation" variant="outline">
              View accreditation details
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
