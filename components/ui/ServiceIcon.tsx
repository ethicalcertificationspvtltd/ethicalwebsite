import {
  Award,
  ClipboardCheck,
  Gauge,
  GraduationCap,
  PackageSearch,
  ShieldCheck,
} from "lucide-react";

const icons = {
  certification: Award,
  inspection: ClipboardCheck,
  calibration: Gauge,
  training: GraduationCap,
  psi: PackageSearch,
  auditing: ShieldCheck,
};

export function ServiceIcon({
  name,
  className = "h-5 w-5",
}: {
  name: keyof typeof icons;
  className?: string;
}) {
  const Icon = icons[name];
  return <Icon className={className} aria-hidden />;
}
