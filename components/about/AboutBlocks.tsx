"use client";

import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { Reveal } from "@/components/ui/Reveal";

export function AboutCopy() {
  return (
    <div>
      <p className="text-muted leading-relaxed">
        We offer independent, third-party Certification and Inspection services across a wide range of industrial sectors. As an Accredited Certification and Inspection Body, we hold recognition from the Saudi Accreditation Center (SAAC) and Pakistan National Accreditation Council (PNAC), allowing us to issue internationally recognized certifications.
      </p>
      <p className="mt-4 text-muted leading-relaxed">
        Organizations prefer certification from PNAC and SAC accredited Certification Bodies because of their proven credibility and global acceptance. At Ethical Certifications, our experienced professionals bring knowledge across diverse industries and focus on understanding your business needs during the audit process.
      </p>
      <p className="mt-4 text-muted leading-relaxed">
        Driven by passion and trusted for excellence — we started with a commitment to help businesses meet international standards, and today we help organizations unlock potential through reliable certification services.
      </p>
    </div>
  );
}

export function AboutRatingCard({ rating }: { rating: string }) {
  return (
    <Reveal>
      <div className="rounded-2xl border border-border bg-card p-5">
        <p className="font-display text-4xl text-primary">
          {rating}
          <span className="text-lg text-muted">/5</span>
        </p>
        <p className="mt-1 text-sm text-muted">
          Client rating highlighted on the Ethical Certifications website
        </p>
      </div>
    </Reveal>
  );
}

export function AboutStatCard({ value, label }: { value: number; label: string }) {
  return (
    <Reveal>
      <div className="rounded-2xl border border-border bg-card p-6">
        <p className="font-display text-4xl text-primary">
          <AnimatedCounter value={value} />+
        </p>
        <p className="mt-2 text-sm text-muted">{label}</p>
      </div>
    </Reveal>
  );
}
