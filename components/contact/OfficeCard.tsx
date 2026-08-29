"use client";

import type { LucideIcon } from "lucide-react";
import { FlyText } from "@/components/ui/AnimatedText";
import { Reveal } from "@/components/ui/Reveal";

export function OfficeCard({
  title,
  lines,
}: {
  title: string;
  lines: { icon: LucideIcon; text: string; href?: string }[];
}) {
  return (
    <Reveal>
      <div className="rounded-3xl border border-border bg-card p-6">
        <h2 className="font-display text-2xl">
          <FlyText text={title} maxWords={6} block />
        </h2>
        <ul className="mt-5 space-y-4">
          {lines.map((line) => {
            const Icon = line.icon;
            const content = (
              <span className="flex gap-3 text-sm leading-relaxed text-muted">
                <Icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                {line.text}
              </span>
            );
            return (
              <li key={line.text}>
                {line.href ? (
                  <a href={line.href} className="transition hover:text-primary">
                    {content}
                  </a>
                ) : (
                  content
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </Reveal>
  );
}
