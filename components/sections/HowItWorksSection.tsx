"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap, registerGsap } from "@/lib/gsap/config";
import { certificationSteps } from "@/data/homepage";
import { SectionHeadingScroll } from "@/components/animations/SectionHeadingScroll";
import { ParallaxLayer } from "@/components/animations/ParallaxLayer";
import { ProcessStepVisual } from "@/components/sections/ProcessStepVisual";
import { EASE } from "@/lib/animations/constants";

export function HowItWorksSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const visualsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (reduce || !sectionRef.current || !pinRef.current) return;
    registerGsap();

    const ctx = gsap.context(() => {
      const steps = stepsRef.current.filter(Boolean) as HTMLDivElement[];
      const visuals = visualsRef.current.filter(Boolean) as HTMLDivElement[];
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

      if (!isDesktop) {
        gsap.fromTo(
          steps,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.12,
            ease: EASE.out,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
        return;
      }

      steps.forEach((step, i) => {
        if (i === 0) {
          gsap.set(step, { opacity: 1, scale: 1, y: 0 });
          return;
        }
        gsap.set(step, { opacity: 0.35, scale: 0.92, y: 16 });
      });

      visuals.forEach((v, i) => {
        gsap.set(v, { opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 0.85, zIndex: i === 0 ? 10 : 0 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          pin: pinRef.current,
          scrub: 1,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(4, Math.floor(self.progress * 5));
            setActiveStep(idx);
          },
        },
      });

      if (lineRef.current) {
        tl.fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 5, ease: "none" }, 0);
      }

      steps.forEach((step, i) => {
        const num = step.querySelector("[data-step-num]");
        const title = step.querySelector("[data-step-title]");
        const desc = step.querySelector("[data-step-desc]");
        const visual = visuals[i];

        if (i > 0) {
          tl.to(steps[i - 1], { opacity: 0.35, scale: 0.92, y: -8, duration: 0.6, ease: EASE.out }, i * 0.9);
          if (visuals[i - 1]) {
            tl.to(visuals[i - 1], { opacity: 0, scale: 0.8, duration: 0.5 }, i * 0.9);
          }
        }

        tl.to(step, { opacity: 1, scale: 1.04, y: 0, duration: 0.7, ease: EASE.out }, i * 0.9 + 0.05);
        if (visual) {
          tl.to(visual, { opacity: 1, scale: 1, duration: 0.6, ease: EASE.out }, i * 0.9 + 0.08);
        }
        tl.fromTo(num, { scale: 0.85, opacity: 0.6 }, { scale: 1.08, opacity: 1, duration: 0.5, ease: EASE.snap }, i * 0.9 + 0.1);
        tl.fromTo([title, desc], { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.08, ease: EASE.out }, i * 0.9 + 0.2);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={sectionRef} data-section-tone="mint" className="relative overflow-hidden bg-muted-bg/30">
      <div ref={pinRef} className="relative min-h-0 py-16 md:py-28 lg:min-h-[100svh]">
        <ParallaxLayer speed={-8} className="pointer-events-none absolute inset-0 tech-grid opacity-25" />
        <div className="container-premium relative z-10">
          <SectionHeadingScroll
            align="center"
            eyebrow="How It Works"
            title="Your certification journey in five clear steps"
            description="A structured, transparent pathway from first inquiry to certification and ongoing improvement."
            light={false}
          />

          <div className="relative mt-8 hidden lg:block">
            <div className="relative mx-auto mb-6 h-48 w-48">
              {certificationSteps.map((step, i) => (
                <div
                  key={step.step}
                  ref={(el) => {
                    visualsRef.current[i] = el;
                  }}
                  className="absolute inset-0 flex items-center justify-center transition-opacity"
                  style={{ opacity: i === activeStep ? 1 : 0 }}
                >
                  <ProcessStepVisual activeIndex={i} />
                </div>
              ))}
            </div>

            <div className="pointer-events-none absolute left-[10%] right-[10%] top-[11.5rem] z-0 h-px overflow-hidden bg-primary/10">
              <div ref={lineRef} className="h-full origin-left scale-x-0 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />
            </div>

            <div className="relative z-10 mt-14 grid grid-cols-5 gap-4">
              {certificationSteps.map((step, i) => (
                <div
                  key={step.step}
                  ref={(el) => {
                    stepsRef.current[i] = el;
                  }}
                  className="group relative text-center will-change-transform"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    data-step-num
                    className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-primary/15 bg-white font-display text-lg font-bold text-[#005953] shadow-[0_8px_24px_rgba(0,89,83,0.08)]"
                  >
                    {step.step}
                  </div>
                  <h3 data-step-title className="mt-5 font-display text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p data-step-desc className="mt-2 text-sm leading-relaxed text-muted">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-10 space-y-0 lg:hidden">
            {certificationSteps.map((step, index) => (
              <div key={step.step} ref={(el) => { stepsRef.current[index] = el; }} className="relative flex gap-5 pb-8 last:pb-0">
                {index < certificationSteps.length - 1 ? (
                  <div className="absolute left-6 top-16 h-[calc(100%-2rem)] w-px bg-primary/15" aria-hidden />
                ) : null}
                <div data-step-num className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/15 bg-white font-display text-sm font-bold text-[#005953] shadow-sm">
                  {step.step}
                </div>
                <div className="pt-1">
                  <h3 data-step-title className="font-display text-lg font-semibold text-foreground">{step.title}</h3>
                  <p data-step-desc className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
