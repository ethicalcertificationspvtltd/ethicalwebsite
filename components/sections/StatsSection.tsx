"use client";

import { siteConfig } from "@/lib/site";
import { SectionHeadingScroll } from "@/components/animations/SectionHeadingScroll";
import { StaggerReveal, StaggerItem } from "@/components/animations/StaggerReveal";
import { ParallaxLayer } from "@/components/animations/ParallaxLayer";
import { StatDataRing } from "@/components/ui/StatDataRing";
import { TiltCard } from "@/components/ui/TiltCard";

export function StatsSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <ParallaxLayer speed={8} className="pointer-events-none absolute inset-0 tech-grid opacity-35" />
      <div className="container-premium relative z-10">
        <SectionHeadingScroll
          eyebrow="Experience"
          title="Precision earned over years of practice"
          description="Experience communicated on the Ethical Certifications website across certification, inspection, calibration and auditor training."
        />
        <StaggerReveal className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4" stagger={0.12} variant="depth">
          {siteConfig.stats.map((stat) => (
            <StaggerItem key={stat.label}>
              <TiltCard intensity={4} className="group h-full" scaleOnHover={1.02}>
                <div className="relative h-full overflow-hidden rounded-3xl border border-border surface-light bg-white p-6 shadow-[8px_8px_22px_rgba(0,89,83,0.06)] transition-shadow duration-500 group-hover:shadow-[0_24px_50px_rgba(0,89,83,0.1)]">
                  <StatDataRing value={stat.value} label={stat.label} max={20} />
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
