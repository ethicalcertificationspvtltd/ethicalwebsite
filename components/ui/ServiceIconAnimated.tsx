"use client";

import {
  Award,
  ClipboardCheck,
  Gauge,
  GraduationCap,
  PackageSearch,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const icons = {
  certification: Award,
  inspection: ClipboardCheck,
  calibration: Gauge,
  training: GraduationCap,
  psi: PackageSearch,
  auditing: ShieldCheck,
} as const;

const animClass: Record<keyof typeof icons, string> = {
  certification: "service-icon-anim--cert",
  inspection: "service-icon-anim--inspect",
  calibration: "service-icon-anim--calibrate",
  training: "service-icon-anim--train",
  psi: "service-icon-anim--psi",
  auditing: "service-icon-anim--audit",
};

export function ServiceIconAnimated({
  name,
  className = "h-5 w-5",
}: {
  name: keyof typeof icons;
  className?: string;
}) {
  const Icon = icons[name];
  return (
    <span className={cn("service-icon-anim inline-flex", animClass[name])}>
      <Icon className={className} aria-hidden />
    </span>
  );
}
