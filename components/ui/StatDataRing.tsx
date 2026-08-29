"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { gsap, registerGsap } from "@/lib/gsap/config";
import { GsapCounter } from "@/components/animations/GsapCounter";
import { cn } from "@/lib/utils";

type Props = {
  value: number;
  label: string;
  max?: number;
  className?: string;
};

export function StatDataRing({ value, label, max = 20, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const checkRef = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference * (1 - value / max);

  useEffect(() => {
    if (reduce || !ref.current || !ringRef.current) return;
    registerGsap();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ringRef.current,
        { strokeDashoffset: circumference },
        {
          strokeDashoffset: targetOffset,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 82%",
            toggleActions: "play none none none",
          },
        },
      );

      if (checkRef.current) {
        gsap.fromTo(
          checkRef.current,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(2)",
            delay: 1.6,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    }, ref);

    return () => ctx.revert();
  }, [reduce, circumference, targetOffset]);

  return (
    <div ref={ref} className={cn("relative flex flex-col items-center", className)}>
      <div className="relative h-28 w-28">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden>
          <circle cx="50" cy="50" r={radius} fill="none" stroke="rgba(0,89,83,0.08)" strokeWidth="4" />
          <circle
            ref={ringRef}
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="url(#stat-ring-gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={reduce ? targetOffset : circumference}
          />
          <defs>
            <linearGradient id="stat-ring-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#005953" />
              <stop offset="100%" stopColor="#24a87c" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="font-display text-3xl font-semibold tabular-nums text-primary">
            <GsapCounter value={value} />
          </p>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">Years</span>
        </div>
        <span
          ref={checkRef}
          className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#24a87c] text-white shadow-md"
          style={reduce ? { opacity: 1, transform: "scale(1)" } : { opacity: 0, transform: "scale(0)" }}
        >
          <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
        </span>
      </div>
      <p className="mt-4 text-center text-sm font-medium text-foreground">{label}</p>
      <span className="stat-data-pulse mt-2 h-px w-12 bg-gradient-to-r from-transparent via-primary/40 to-transparent" aria-hidden />
    </div>
  );
}
