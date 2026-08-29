"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { faqItems } from "@/data/homepage";
import { SectionHeadingScroll } from "@/components/animations/SectionHeadingScroll";
import { StaggerReveal, StaggerItem } from "@/components/animations/StaggerReveal";
import { cn } from "@/lib/utils";
import { gsap, registerGsap } from "@/lib/gsap/config";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 tech-grid opacity-20" />
      <div className="container-premium relative z-10">
        <SectionHeadingScroll
          align="center"
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Clear answers to common questions about ISO certification, timelines, recognition, and verification."
          light={false}
        />

        <StaggerReveal className="mx-auto mt-12 max-w-3xl space-y-3" stagger={0.08} variant="fadeUp">
          {faqItems.map((item, index) => (
            <StaggerItem key={item.question}>
              <FaqItem
                question={item.question}
                answer={item.answer}
                open={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            </StaggerItem>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}

function FaqItem({
  question,
  answer,
  open,
  onToggle,
}: {
  question: string;
  answer: string;
  open: boolean;
  onToggle: () => void;
}) {
  const reduce = useReducedMotion();
  const answerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (reduce || !answerRef.current || !innerRef.current) return;
    registerGsap();

    if (open) {
      gsap.set(answerRef.current, { height: "auto", opacity: 1 });
      const h = answerRef.current.offsetHeight;
      gsap.fromTo(
        answerRef.current,
        { height: 0, opacity: 0 },
        { height: h, opacity: 1, duration: 0.35, ease: "power3.out" },
      );
      gsap.fromTo(
        innerRef.current,
        { y: 8, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, delay: 0.08, ease: "power2.out" },
      );
    } else {
      gsap.to(answerRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.28,
        ease: "power2.inOut",
      });
    }
  }, [open, reduce]);

  return (
    <div className="faq-card-3d surface-light group overflow-hidden rounded-2xl border border-border bg-white shadow-[0_6px_24px_rgba(0,89,83,0.05)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
      >
        <span className="font-display text-base font-semibold text-foreground sm:text-lg">
          {question}
        </span>
        <ChevronDown
          className={cn(
            "h-5 w-5 shrink-0 text-[#005953] transition-transform duration-300",
            open && "rotate-180",
          )}
        />
      </button>
      <div
        ref={answerRef}
        className="overflow-hidden"
        style={reduce ? undefined : { height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
      >
        <p
          ref={innerRef}
          className="border-t border-border px-5 pb-5 pt-4 text-sm leading-relaxed text-muted sm:px-6 sm:pb-6"
        >
          {answer}
        </p>
      </div>
    </div>
  );
}
