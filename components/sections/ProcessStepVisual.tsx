"use client";

import {
  Award,
  ClipboardList,
  FileText,
  Search,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { icon: FileText, label: "Inquiry" },
  { icon: Search, label: "Assessment" },
  { icon: ClipboardList, label: "Audit" },
  { icon: Award, label: "Certification" },
  { icon: TrendingUp, label: "Improvement" },
] as const;

export function ProcessStepVisual({ activeIndex = 0 }: { activeIndex?: number }) {
  const Step = STEPS[activeIndex]?.icon ?? FileText;

  return (
    <div className="process-step-visual pointer-events-none relative mx-auto hidden h-48 w-48 lg:block" aria-hidden>
      <div className="process-step-visual-ring process-step-visual-ring--1" />
      <div className="process-step-visual-ring process-step-visual-ring--2" />
      <div className="process-step-visual-core">
        <Step className="h-10 w-10 text-[#005953]" strokeWidth={1.5} />
        <span className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#005953]/70">
          {STEPS[activeIndex]?.label}
        </span>
      </div>
      {STEPS.map((s, i) => (
        <div
          key={s.label}
          className={cn(
            "process-step-visual-orbit-dot",
            i === activeIndex && "process-step-visual-orbit-dot--active",
          )}
          style={{ "--orbit-i": i } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
