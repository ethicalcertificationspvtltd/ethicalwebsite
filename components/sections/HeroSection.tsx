"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BarChart3,
  Shield,
  ShieldCheck,
} from "lucide-react";
import { gsap, registerGsap } from "@/lib/gsap/config";
import { Button } from "@/components/ui/Button";
import { HeroCertificateVisual } from "@/components/sections/HeroCertificateVisual";
import { HeroTrustBadges } from "@/components/sections/HeroTrustBadges";
import { clients } from "@/data/clients";
import { StaggerReveal, StaggerItem } from "@/components/animations/StaggerReveal";

const ease = [0.16, 1, 0.3, 1] as const;

const headlineLines = [
  "Globally Recognized ISO Certification.",
  "Built for Business Excellence.",
];

const features = [
  { icon: Shield, label: "Globally Recognized" },
  { icon: Award, label: "Improve Performance" },
  { icon: BarChart3, label: "Enhance Credibility" },
  { icon: ShieldCheck, label: "Ensure Compliance" },
];

const trustLogos = clients.slice(0, 6);

function RevealLine({ text, delay }: { text: string; delay: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <span className="block">{text}</span>;

  return (
    <motion.span
      className="block overflow-hidden"
      initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.75, delay, ease }}
    >
      {text}
    </motion.span>
  );
}

export function HeroSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce || !sectionRef.current) return;
    registerGsap();

    const ctx = gsap.context(() => {
      const scrubCfg = {
        trigger: sectionRef.current,
        start: "top top",
        end: "70% top",
        scrub: 1.2,
      };

      if (contentRef.current) {
        gsap.to(contentRef.current, {
          y: 90,
          scale: 0.94,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: scrubCfg,
        });
      }

      if (visualRef.current) {
        gsap.to(visualRef.current, {
          y: -72,
          scale: 1.06,
          rotateY: -8,
          z: -40,
          transformPerspective: 1400,
          ease: "none",
          scrollTrigger: scrubCfg,
        });

        const stage = visualRef.current.querySelector(".hero-cert-stage");
        const arc = visualRef.current.querySelector(".hero-cert-arc");
        const bg = visualRef.current.querySelector(".hero-parallax-bg");
        const orbits = visualRef.current.querySelectorAll(".hero-orbit-scrub");
        const badges = visualRef.current.querySelectorAll(".hero-float-badge-scrub");

        if (stage) {
          gsap.to(stage, {
            z: -60,
            y: -32,
            scale: 0.92,
            transformPerspective: 1400,
            ease: "none",
            scrollTrigger: scrubCfg,
          });
        }
        if (arc) {
          gsap.to(arc, {
            rotateX: 8,
            rotateY: 12,
            transformPerspective: 1400,
            ease: "none",
            scrollTrigger: scrubCfg,
          });
        }

        if (bg) {
          gsap.to(bg, { scale: 1.12, ease: "none", scrollTrigger: scrubCfg });
        }
        orbits.forEach((ring, i) => {
          gsap.to(ring, {
            scale: 1 + (i + 1) * 0.08,
            opacity: 1 - i * 0.15,
            ease: "none",
            scrollTrigger: scrubCfg,
          });
        });
        badges.forEach((badge, i) => {
          gsap.to(badge, {
            x: (i % 2 === 0 ? -1 : 1) * (24 + i * 12),
            y: -20 - i * 8,
            opacity: 0.6,
            ease: "none",
            scrollTrigger: scrubCfg,
          });
        });
      }

      if (trustRef.current) {
        gsap.fromTo(
          trustRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: trustRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reduce]);

  return (
    <section ref={sectionRef} data-section-tone="hero" className="relative overflow-x-clip bg-transparent">
      <div className="container-premium relative z-10 pb-0 pt-[5.5rem] md:pt-28">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10 xl:gap-14">
          <div ref={contentRef} className="relative z-20 min-w-0 py-4 lg:py-8 will-change-transform">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease }}
              className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white/90"
            >
              SAAC & PNAC Accredited
            </motion.p>

            <h1 className="max-w-[560px] font-display text-[2.35rem] font-bold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-[3.15rem]">
              {headlineLines.map((line, i) => (
                <RevealLine key={line} text={line} delay={0.18 + i * 0.12} />
              ))}
            </h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45, ease }}
              className="mt-5 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base"
            >
              Independent, accredited certification and inspection services helping organizations
              achieve international standards, strengthen credibility, and unlock new business
              opportunities worldwide.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.58, ease }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button href="/contact#quote" size="lg" className="neu-btn px-7">
                Get Free Quote
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/certifications/iso-9001" size="lg" variant="outline">
                Explore Certifications
              </Button>
              <Button href="/clients#verify" size="lg" variant="ghost" className="hidden sm:inline-flex">
                Verify Certificate
              </Button>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.72, ease }}
              className="mt-9 grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-4"
            >
              {features.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  initial={reduce ? false : { opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.45, delay: 0.82 + i * 0.08, ease }}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-white text-[#005953] shadow-[0_4px_14px_rgba(0,89,83,0.12)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(0,89,83,0.18)]">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </span>
                  <span className="max-w-[88px] text-[11px] font-semibold leading-tight text-white/90">
                    {label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            ref={visualRef}
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.85, rotateY: 6 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.95, delay: 0.35, ease }}
            className="relative min-h-[420px] w-full min-w-0 will-change-transform sm:min-h-[480px] lg:min-h-[560px]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <HeroCertificateVisual className="h-full w-full" />
          </motion.div>
        </div>
      </div>

      <HeroTrustBadges />

      <div ref={trustRef} className="relative z-10 mt-2 bg-transparent pb-6 pt-2 md:mt-4 md:pb-8">
        <div className="container-premium">
          <div className="surface-light overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-[0_10px_40px_rgba(0,89,83,0.08)]">
            <div className="border-b border-primary/8 bg-[#f8fcfb] px-5 py-3.5 text-center sm:px-8">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#005953] sm:text-[0.72rem]">
                Trusted by organizations around the world
              </p>
            </div>
            <StaggerReveal className="grid grid-cols-3 divide-x divide-primary/8 sm:grid-cols-6" stagger={0.1} variant="trust" scrub idleFloat>
              {trustLogos.map((client) => (
                <StaggerItem key={client.name}>
                  <div className="flex min-h-[4.5rem] items-center justify-center px-3 py-4 sm:min-h-[5.25rem] sm:px-4 sm:py-5">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={160}
                      height={64}
                      sizes="(max-width: 640px) 90px, 140px"
                      className="h-9 w-auto max-w-full object-contain opacity-85 grayscale-[20%] transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-11 md:h-12"
                    />
                  </div>
                </StaggerItem>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
