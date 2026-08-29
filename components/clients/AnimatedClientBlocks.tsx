"use client";

import { Check } from "lucide-react";
import { FlyText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";

export function WhyChooseCard({ points }: { points: readonly string[] }) {
  return (
    <Reveal>
      <div className="rounded-3xl border border-border bg-card p-7 md:p-8">
        <h3 className="font-display text-2xl tracking-tight">
          <FlyText text="Why organizations choose us" maxWords={6} block />
        </h3>
        <ul className="mt-6 space-y-4">
          {points.map((point) => (
            <li key={point} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
                <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export function PrestigiousClientList({ names }: { names: readonly string[] }) {
  return (
    <ul className="mt-8 columns-1 gap-x-10 space-y-2.5 sm:columns-2">
      {names.map((name) => (
        <li
          key={name}
          className="break-inside-avoid text-sm font-medium leading-snug text-foreground/90"
        >
          <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary align-middle" />
          {name}
        </li>
      ))}
    </ul>
  );
}
