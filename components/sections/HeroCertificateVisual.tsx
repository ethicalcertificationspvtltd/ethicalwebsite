"use client";

import Image from "next/image";
import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { usePointerParallax } from "@/lib/usePointerParallax";
import { HeroCertificateCard } from "@/components/sections/HeroCertificateCard";
import { HeroFloatingBadge } from "@/components/sections/HeroFloatingBadge";

const certificates = [
  {
    code: "ISO 45001",
    year: "2018",
    subtitle: "Occupational Health & Safety Management System",
    rotateY: 34,
    translateZ: -85,
    translateY: 10,
    scale: 0.78,
    z: 10,
  },
  {
    code: "ISO 14001",
    year: "2015",
    subtitle: "Environmental Management System",
    rotateY: 18,
    translateZ: -38,
    translateY: 5,
    scale: 0.9,
    z: 20,
  },
  {
    code: "ISO 9001",
    year: "2015",
    subtitle: "Quality Management System",
    rotateY: 0,
    translateZ: 65,
    translateY: 0,
    scale: 1.08,
    z: 50,
    featured: true,
  },
  {
    code: "ISO 22000",
    year: "2018",
    subtitle: "Food Safety Management System",
    rotateY: -18,
    translateZ: -38,
    translateY: 5,
    scale: 0.9,
    z: 20,
  },
  {
    code: "ISO 27001",
    year: "2022",
    subtitle: "Information Security Management System",
    rotateY: -34,
    translateZ: -85,
    translateY: 10,
    scale: 0.78,
    z: 10,
  },
] as const;

const particles = [
  { t: 18, l: 22, s: 3, d: 0 },
  { t: 62, l: 14, s: 2, d: 1.2 },
  { t: 72, l: 88, s: 2.5, d: 0.6 },
  { t: 42, l: 8, s: 2, d: 2 },
  { t: 24, l: 58, s: 2, d: 1.8 },
];

export function HeroCertificateVisual({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const parallaxRef = usePointerParallax<HTMLDivElement>({
    maxShift: 14,
    maxTilt: 5,
    enabled: !reduce,
  });

  return (
    <div
      ref={parallaxRef}
      className={cn("hero-studio-scene hero-parallax-root", className)}
    >
      {/* Depth layers */}
      <div className="hero-parallax-bg hero-studio-bg" />

      {!reduce &&
        particles.map((p, i) => (
          <span
            key={`p-${i}`}
            className="hero-particle"
            style={{
              top: `${p.t}%`,
              left: `${p.l}%`,
              width: p.s,
              height: p.s,
              animationDelay: `${p.d}s`,
            }}
          />
        ))}

      {!reduce && (
        <div className="hero-orbit-badge-track hero-parallax-mid" aria-hidden>
          <HeroFloatingBadge
            code="ISO 9001"
            title="Quality Management"
            orbit
            orbitStart={0}
            orbitRadius="9rem"
            orbitDuration={24}
            depth={0.35}
            delay={0}
            duration={8}
          />
          <HeroFloatingBadge
            code="ISO 14001"
            title="Environmental Management"
            orbit
            orbitStart={72}
            orbitRadius="10.5rem"
            orbitDuration={28}
            depth={0.55}
            delay={1.2}
            duration={9.5}
          />
          <HeroFloatingBadge
            code="ISO 27001"
            title="Information Security"
            orbit
            orbitStart={144}
            orbitRadius="11.5rem"
            orbitDuration={32}
            depth={0.42}
            delay={0.8}
            duration={10.5}
          />
          <HeroFloatingBadge
            code="ISO 45001"
            title="Health & Safety"
            orbit
            orbitStart={216}
            orbitRadius="8.5rem"
            orbitDuration={26}
            depth={0.68}
            delay={2}
            duration={9}
          />
        </div>
      )}

      {!reduce && (
        <>
          <HeroFloatingBadge
            code="ISO 45001"
            title="Occupational Health & Safety"
            className="left-[2%] top-[18%] sm:left-[4%]"
            depth={0.45}
            delay={0.6}
            duration={10}
          />
          <HeroFloatingBadge
            code="ISO 22000"
            title="Food Safety Management"
            className="right-[0%] bottom-[24%] sm:right-[2%]"
            depth={0.65}
            delay={1.8}
            duration={11}
          />
        </>
      )}

      {/* SAAC accreditation seal */}
      <div
        className="hero-accreditation-seal hero-parallax-mid"
        aria-hidden
      >
        <Image
          src="/assets/accreditations/saac.png"
          alt=""
          width={72}
          height={72}
          className="relative z-10 h-12 w-12 object-contain opacity-90 sm:h-14 sm:w-14"
        />
      </div>

      <div className="hero-cert-stage hero-parallax-stage">
        <div
          className="hero-cert-glare"
          style={{
            background: `radial-gradient(420px circle at var(--glare-x, 50%) var(--glare-y, 40%), rgba(255,255,255,0.22), transparent 48%)`,
          }}
          aria-hidden
        />

        <div className="hero-cert-arc-wrap">
          <div className={cn("hero-cert-arc", !reduce && "hero-cert-arc--drift")}>
            {certificates.map((cert, i) => {
              const isHovered = hoveredIndex === i;
              const isDimmed = hoveredIndex !== null && !isHovered;

              const transform = isHovered
                ? "rotateY(0deg) translateZ(130px) translateY(-14px) scale(1.2)"
                : `rotateY(${cert.rotateY}deg) translateZ(${cert.translateZ}px) translateY(${cert.translateY}px) scale(${cert.scale})`;

              return (
                <div
                  key={cert.code}
                  className={cn(
                    "hero-cert-slot",
                    i > 0 && "hero-cert-slot--overlap",
                    isHovered && "hero-cert-slot--active",
                    isDimmed && "hero-cert-slot--dimmed",
                  )}
                  style={{
                    zIndex: isHovered ? 100 : cert.z,
                    transform,
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${cert.code}:${cert.year} certificate`}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onFocus={() => setHoveredIndex(i)}
                  onBlur={() => setHoveredIndex(null)}
                >
                  <div
                    className={cn(
                      !reduce &&
                        !isHovered &&
                        "featured" in cert &&
                        cert.featured &&
                        "hero-cert-slot--float relative",
                    )}
                  >
                    {"featured" in cert && cert.featured && !reduce ? (
                      <div className="hero-cert-light-sweep" aria-hidden />
                    ) : null}
                    <HeroCertificateCard
                      code={cert.code}
                      year={cert.year}
                      subtitle={cert.subtitle}
                      featured={"featured" in cert ? cert.featured : false}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
