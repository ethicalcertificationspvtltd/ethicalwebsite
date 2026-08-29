"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { SectionHeadingScroll } from "@/components/animations/SectionHeadingScroll";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { ParallaxLayer } from "@/components/animations/ParallaxLayer";
import { siteConfig } from "@/lib/site";
import { gsap, registerGsap } from "@/lib/gsap/config";

export function AboutPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !sectionRef.current) return;
    registerGsap();

    const ctx = gsap.context(() => {
      const badge = sectionRef.current!.querySelector("[data-about-badge]");
      if (badge) {
        gsap.fromTo(
          badge,
          { opacity: 0, y: 24, scale: 0.92 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            ease: "back.out(1.4)",
            scrollTrigger: {
              trigger: badge,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 md:py-28">
      <ParallaxLayer speed={6} className="pointer-events-none absolute -left-16 top-1/4 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
      <div className="container-premium grid items-center gap-12 lg:grid-cols-2">
        <ScrollReveal variant="slideLeft">
          <div className="relative grid grid-cols-2 gap-4">
            <ParallaxLayer speed={-14}>
              <ImageReveal className="rounded-2xl">
                <Image
                  src="/assets/hero/team-office.jpeg"
                  alt="ET Cert professional"
                  width={480}
                  height={560}
                  className="h-72 w-full object-cover md:h-[420px]"
                />
              </ImageReveal>
            </ParallaxLayer>
            <ParallaxLayer speed={10} className="flex flex-col gap-4 pt-10">
              <ImageReveal className="overflow-hidden rounded-2xl">
                <Image
                  src="/assets/hero/hero-office-2.jpg"
                  alt="Certification expertise"
                  width={420}
                  height={280}
                  className="h-40 w-full object-cover md:h-48"
                />
              </ImageReveal>
              <ImageReveal className="overflow-hidden rounded-2xl">
                <Image
                  src="/assets/hero/about-img.png"
                  alt="ISO certification context"
                  width={420}
                  height={320}
                  className="h-48 w-full object-cover md:h-56"
                />
              </ImageReveal>
            </ParallaxLayer>
            <div
              data-about-badge
              className="absolute -bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-2xl border border-border bg-card/95 px-5 py-4 shadow-xl backdrop-blur-sm"
            >
              <p className="text-xs uppercase tracking-[0.18em] text-muted">Accredited by</p>
              <p className="mt-1 font-display text-2xl text-primary">SAAC & PNAC</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="slideRight" delay={0.1}>
          <SectionHeadingScroll
            eyebrow="Who we are"
            title={siteConfig.name}
            description={`At ${siteConfig.name}, we specialize in providing independent third-party ISO Certification and Inspection services across a wide range of industrial sectors. We are accredited by two IAF-recognized international accreditation boards — SAAC and Pakistan National Accreditation Council (PNAC) — on ${siteConfig.accreditationStandards.join(" & ")} standards.`}
          />
          <p className="mt-4 leading-relaxed text-muted">
            Accredited certification holds global recognition, making it a crucial factor for many
            companies that require certification from an accredited body. Our team consists of
            experienced professionals with extensive backgrounds across multiple industries.
          </p>
          <div className="mt-8">
            <Button href="/about">Read More</Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
