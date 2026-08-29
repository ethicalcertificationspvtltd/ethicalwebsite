"use client";

import { QuoteForm } from "@/components/ui/QuoteForm";
import { SectionHeadingScroll } from "@/components/animations/SectionHeadingScroll";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { ParallaxLayer } from "@/components/animations/ParallaxLayer";

export function QuoteSection() {
  return (
    <section id="quote" className="relative scroll-mt-28 overflow-hidden bg-muted-bg/40 py-20 md:py-28">
      <ParallaxLayer speed={-8} className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl" />
      <ParallaxLayer speed={6} className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-primary-light/8 blur-3xl" />

      <div className="container-premium relative z-10 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeadingScroll
          eyebrow="Get Free Quote"
          title="Let's talk?"
          description="What is the targeted certification you have in mind? Get certified, get recognized — submit your inquiry today."
        />
        <ScrollReveal variant="depth" delay={0.1}>
          <div className="rounded-2xl border border-border bg-white p-6 shadow-[0_16px_48px_rgba(0,89,83,0.06)] md:p-8">
            <QuoteForm />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
