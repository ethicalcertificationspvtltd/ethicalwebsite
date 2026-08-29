"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { whyChooseUs } from "@/data/homepage";
import { SectionHeadingScroll } from "@/components/animations/SectionHeadingScroll";
import { StaggerReveal, StaggerItem } from "@/components/animations/StaggerReveal";
import { CardInnerReveal, RevealPart } from "@/components/animations/CardInnerReveal";
import { ParallaxLayer } from "@/components/animations/ParallaxLayer";
import { TiltCard } from "@/components/ui/TiltCard";
import { gsap, registerGsap } from "@/lib/gsap/config";
import { cn } from "@/lib/utils";

export function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !sectionRef.current) return;
    registerGsap();

    const ctx = gsap.context(() => {
      const cards = sectionRef.current!.querySelectorAll("[data-why-card]");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 20 + (i % 3) * 8 },
          {
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              end: "top 40%",
              scrub: 1.2,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-20 md:py-28">
      <ParallaxLayer speed={10} className="pointer-events-none absolute inset-0 tech-grid opacity-25" />
      <div className="container-premium relative z-10">
        <SectionHeadingScroll
          align="center"
          eyebrow="Why Choose Us"
          title="Why businesses choose Ethical Certifications"
          description="A trusted independent certification partner combining accreditation credibility, experienced auditors, and practical support for organizations across Saudi Arabia and beyond."
          light={false}
        />

        <StaggerReveal className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3" stagger={0.12} variant="depth">
          {whyChooseUs.map((item, i) => (
            <StaggerItem key={item.title}>
              <div
                data-why-card
                className={cn(`why-card-offset-${i % 6}`, "h-full")}
              >
                <TiltCard intensity={5} className="group h-full" scaleOnHover={1.03}>
                  <CardInnerReveal className="surface-light h-full rounded-2xl border border-border bg-white p-7 shadow-[0_10px_32px_rgba(0,89,83,0.06)] transition-shadow duration-500 group-hover:shadow-[0_20px_48px_rgba(0,89,83,0.1)]">
                    <RevealPart part="icon">
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f6f1] text-[#005953] transition duration-500 group-hover:bg-[#005953] group-hover:text-white">
                        <item.icon className="h-5 w-5" strokeWidth={1.75} />
                      </div>
                    </RevealPart>
                    <RevealPart part="title">
                      <h3 className="font-display text-xl font-semibold text-foreground">{item.title}</h3>
                    </RevealPart>
                    <RevealPart part="body">
                      <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                    </RevealPart>
                  </CardInnerReveal>
                </TiltCard>
              </div>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
