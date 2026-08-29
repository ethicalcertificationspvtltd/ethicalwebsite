"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { services } from "@/data/services";
import { ServiceCard } from "@/components/ui/Cards";
import { SectionHeadingScroll } from "@/components/animations/SectionHeadingScroll";
import { DirectionalGridReveal } from "@/components/animations/DirectionalGridReveal";
import { StaggerItem } from "@/components/animations/StaggerReveal";
import { ParallaxLayer } from "@/components/animations/ParallaxLayer";

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !sectionRef.current) return;
    import("@/lib/gsap/config").then(({ gsap, registerGsap }) => {
      registerGsap();
      gsap.to(sectionRef.current, {
        backgroundColor: "rgba(248, 252, 251, 0.6)",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: 1.5,
        },
      });
    });
  }, [reduce]);

  return (
    <section ref={sectionRef} data-section-tone="surface" className="relative overflow-hidden py-20 md:py-28">
      <ParallaxLayer speed={-6} className="pointer-events-none absolute -right-20 top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="container-premium relative z-10">
        <SectionHeadingScroll
          align="center"
          eyebrow="Services"
          title="Our services"
          description="Certification, inspection, calibration, training and pre-shipment inspection — delivered with an ethical, independent third-party approach."
          light={false}
        />
        <DirectionalGridReveal className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, i) => (
            <StaggerItem key={service.slug}>
              <ServiceCard service={service} index={i} />
            </StaggerItem>
          ))}
        </DirectionalGridReveal>
      </div>
    </section>
  );
}
