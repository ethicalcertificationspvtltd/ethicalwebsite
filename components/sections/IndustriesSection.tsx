"use client";

import { industries } from "@/data/homepage";
import { SectionHeadingScroll } from "@/components/animations/SectionHeadingScroll";
import { StaggerReveal, StaggerItem } from "@/components/animations/StaggerReveal";
import { CardInnerReveal, RevealPart } from "@/components/animations/CardInnerReveal";
import { TiltCard } from "@/components/ui/TiltCard";

export function IndustriesSection() {
  return (
    <section className="relative overflow-hidden bg-muted-bg/25 py-20 md:py-28">
      <div className="container-premium relative z-10">
        <SectionHeadingScroll
          align="center"
          eyebrow="Industries"
          title="Industries we serve"
          description="Certification and conformity services for organizations across sectors where quality, safety, environment, and compliance matter."
          light={false}
        />

        <StaggerReveal
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3"
          stagger={0.08}
          variant="scale"
        >
          {industries.map((industry, i) => (
            <StaggerItem key={industry.name}>
              <TiltCard intensity={4} className="h-full" scaleOnHover={1.02}>
                <CardInnerReveal
                  className="surface-light group flex h-full flex-col items-center rounded-2xl border border-border bg-white px-4 py-7 text-center shadow-[0_8px_28px_rgba(0,89,83,0.05)] transition duration-500 hover:border-primary/20 hover:shadow-[0_16px_40px_rgba(0,89,83,0.1)]"
                  delay={i * 0.02}
                >
                  <RevealPart part="icon">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f6f1] text-[#005953] transition duration-500 group-hover:bg-[#005953] group-hover:text-white">
                      <industry.icon className="h-5 w-5" strokeWidth={1.75} />
                    </div>
                  </RevealPart>
                  <RevealPart part="title">
                    <h3 className="font-display text-base font-semibold text-foreground sm:text-lg">
                      {industry.name}
                    </h3>
                  </RevealPart>
                </CardInnerReveal>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
