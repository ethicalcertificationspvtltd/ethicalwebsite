"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { saudiBenefits } from "@/data/homepage";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { SectionHeadingScroll } from "@/components/animations/SectionHeadingScroll";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { StaggerReveal, StaggerItem } from "@/components/animations/StaggerReveal";
import { ParallaxLayer } from "@/components/animations/ParallaxLayer";
import { gsap, registerGsap } from "@/lib/gsap/config";
import { EASE } from "@/lib/animations/constants";

export function SaudiArabiaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !sectionRef.current) return;
    registerGsap();

    const ctx = gsap.context(() => {
      const benefits = sectionRef.current!.querySelectorAll("[data-benefit]");
      gsap.fromTo(
        benefits,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: EASE.out,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 md:py-28">
      <ParallaxLayer speed={-10} className="pointer-events-none absolute -right-24 top-0 h-80 w-80 rounded-full bg-primary/8 blur-3xl" />
      <div className="container-premium relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <SectionHeadingScroll
              eyebrow="Saudi Arabia"
              title="Certification support for businesses across Saudi Arabia"
              description="Ethical Certifications supports organizations operating in the Kingdom with accredited certification, inspection, calibration, and training services designed for local market requirements and international recognition."
              light={false}
            />
            <ul className="mt-8 space-y-3">
              {saudiBenefits.map((benefit) => (
                <li
                  key={benefit}
                  data-benefit
                  className="flex items-start gap-3 text-sm leading-relaxed text-muted"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#005953]" strokeWidth={2} />
                  {benefit}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact#quote" size="lg">
                Get Free Quote
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/accreditation" variant="outline" size="lg" className="!text-[#005953] !border-primary/20 !bg-white hover:!bg-[#f8fcfb]">
                View Accreditation
              </Button>
            </div>
          </div>

          <ScrollReveal variant="slideRight" delay={0.08}>
            <div className="surface-light overflow-hidden rounded-3xl border border-border bg-white shadow-[0_20px_60px_rgba(0,89,83,0.08)]">
              <ImageReveal className="relative aspect-[4/3]">
                <Image
                  src="/assets/hero/hero-office-2.jpg"
                  alt="Ethical Certifications professional certification support"
                  fill
                  sizes="(max-width: 1024px) 100vw, 520px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#005953]/70 via-transparent to-transparent" />
              </ImageReveal>
              <StaggerReveal className="space-y-2 p-6 md:p-7" stagger={0.08} variant="fadeUp">
                <StaggerItem>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#005953]">
                    Jeddah Office
                  </p>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-sm leading-relaxed text-muted">{siteConfig.addresses.saudi}</p>
                </StaggerItem>
                <StaggerItem>
                  <p className="text-sm text-muted">
                    <a href={`tel:${siteConfig.phones.ksaSalesTel}`} className="font-semibold text-[#005953] hover:underline">
                      {siteConfig.phones.ksaSales}
                    </a>
                    {" · "}
                    <a href={`mailto:${siteConfig.emailKsa}`} className="font-semibold text-[#005953] hover:underline">
                      {siteConfig.emailKsa}
                    </a>
                  </p>
                </StaggerItem>
              </StaggerReveal>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
