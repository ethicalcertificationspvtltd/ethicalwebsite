"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { cn } from "@/lib/utils";

export function BrandLogoInteractive({
  className,
  priority,
  href = "/",
}: {
  className?: string;
  priority?: boolean;
  href?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <Link href={href} className={cn("group inline-flex", className)} data-cursor="button">
      <motion.span
        whileHover={reduce ? undefined : { scale: 1.03 }}
        whileTap={reduce ? undefined : { scale: 0.98 }}
        transition={{ type: "spring", stiffness: 420, damping: 24 }}
        className="relative inline-block rounded-lg transition-shadow duration-300 group-hover:shadow-[0_8px_24px_rgba(0,89,83,0.12)]"
      >
        <BrandLogo priority={priority} />
      </motion.span>
    </Link>
  );
}
