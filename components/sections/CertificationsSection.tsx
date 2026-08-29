"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { certifications } from "@/data/certifications";
import { CertificationCard } from "@/components/ui/Cards";
import { SectionHeadingScroll } from "@/components/animations/SectionHeadingScroll";

/**
 * Vertical scroll → horizontal cards while the section is pinned.
 * After the last card, vertical scroll continues to the next section.
 */
export function CertificationsSection() {
  const featured = certifications.filter((c) => c.featured);
  const more = certifications.filter((c) => !c.featured).slice(0, 4);
  const cards = [...featured, ...more];

  const reduce = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const padding = Math.max(16, (window.innerWidth - Math.min(window.innerWidth - 32, 72 * 16)) / 2);
      const max = Math.max(0, track.scrollWidth - window.innerWidth + padding);
      setTravel(max);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [cards.length]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -travel]);
  const x = useSpring(rawX, { stiffness: 90, damping: 28, restDelta: 0.001 });
  const progressWidth = useSpring(
    useTransform(scrollYProgress, [0, 1], ["0%", "100%"]),
    { stiffness: 90, damping: 28 },
  );

  // Reduced motion / no travel: normal swipe carousel
  if (reduce) {
    return (
      <section className="overflow-hidden bg-background py-20 md:py-28">
        <div className="container-premium">
          <SectionHeadingScroll
            eyebrow="ISO Standards"
            title="Certification experience across major standards"
            description="Interactive overview of standards listed by Ethical Certifications — from quality and environment to food safety and information security."
          />
        </div>
        <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-[max(1rem,calc((100vw-72rem)/2))] pb-4 no-scrollbar">
          {cards.map((c) => (
            <CertificationCard
              key={c.slug}
              code={c.code}
              year={c.year}
              title={c.title}
              summary={c.summary}
              href={c.href}
            />
          ))}
        </div>
      </section>
    );
  }

  // ~1 viewport of pin + extra viewport-distance per ~2 cards for a controlled scrub
  const trackVh = Math.max(220, 100 + cards.length * 28);

  return (
    <section
      ref={containerRef}
      className="relative bg-background"
      style={{ height: `${trackVh}vh` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0 tech-grid opacity-30" />
        <div className="pointer-events-none absolute -right-24 top-16 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />

        <div className="container-premium relative z-10 shrink-0">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeadingScroll
              eyebrow="ISO Standards"
              title="Certification experience across major standards"
              description="Interactive overview of standards listed by Ethical Certifications — from quality and environment to food safety and information security."
            />
            <div className="mb-1 hidden w-40 shrink-0 md:block">
              <p className="brand-pill mb-2">Scroll</p>
              <div className="h-1 overflow-hidden rounded-full bg-primary/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light"
                  style={{ width: progressWidth }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 mt-10">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex w-max gap-5 px-[max(1rem,calc((100vw-72rem)/2))] will-change-transform"
          >
            {cards.map((c) => (
              <CertificationCard
                key={c.slug}
                code={c.code}
                year={c.year}
                title={c.title}
                summary={c.summary}
                href={c.href}
              />
            ))}
          </motion.div>
        </div>

        <div className="container-premium relative z-10 mt-8 md:hidden">
          <div className="h-1 overflow-hidden rounded-full bg-primary/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light"
              style={{ width: progressWidth }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
