"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type CertCardProps = {
  code: string;
  year: string;
  subtitle: string;
  featured?: boolean;
  className?: string;
};

function CornerRivet({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "absolute z-10 h-3 w-3 rounded-full bg-gradient-to-br from-[#e8d49a] via-[#c9a24e] to-[#7a6030] shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_2px_4px_rgba(0,0,0,0.18)]",
        className,
      )}
    />
  );
}

export function HeroCertificateCard({
  code,
  year,
  subtitle,
  featured = false,
  className,
}: CertCardProps) {
  return (
    <div
      className={cn(
        "relative select-none",
        featured ? "w-[162px] sm:w-[186px]" : "w-[132px] sm:w-[148px]",
        className,
      )}
    >
      <div className="absolute inset-x-2 bottom-0 h-3 translate-y-3 rounded-[100%] bg-primary/[0.08] blur-md" />

      {/* Thick white 3D frame */}
      <div
        className="hero-cert-card-frame relative rounded-[3px] bg-white p-2.5 shadow-[0_24px_60px_rgba(0,89,83,0.14),0_8px_20px_rgba(0,0,0,0.06),inset_0_-2px_0_rgba(0,0,0,0.04)] transition-shadow duration-500 sm:p-3"
        style={
          featured
            ? {
                backgroundImage: `radial-gradient(280px circle at var(--glare-x, 70%) var(--glare-y, 20%), rgba(255,255,255,0.55), transparent 50%)`,
              }
            : undefined
        }
      >
        <CornerRivet className="left-1.5 top-1.5" />
        <CornerRivet className="right-1.5 top-1.5" />
        <CornerRivet className="bottom-1.5 left-1.5" />
        <CornerRivet className="bottom-1.5 right-1.5" />

        <div className="relative overflow-hidden rounded-[1px] border-2 border-primary/20 bg-white px-2.5 py-3 sm:px-3 sm:py-3.5">
          <div className="pointer-events-none absolute inset-1.5 rounded-sm border border-primary/10" />

          <div className="relative flex min-h-[168px] flex-col items-center text-center sm:min-h-[188px]">
            <div
              className={cn(
                "relative",
                featured ? "h-6 w-[76px] sm:h-7 sm:w-[84px]" : "h-5 w-16 sm:h-6 sm:w-[72px]",
              )}
            >
              <Image
                src="/assets/logo/etcert-logo-official.png"
                alt=""
                fill
                sizes="84px"
                className="object-contain"
              />
            </div>

            <p className="mt-2 text-[6px] font-bold uppercase tracking-[0.22em] text-muted sm:text-[7px]">
              Certificate of Registration
            </p>

            <p
              className={cn(
                "mt-2 font-display font-bold leading-none text-primary",
                featured ? "text-[14px] sm:text-[16px]" : "text-[11px] sm:text-[12px]",
              )}
            >
              {code}:{year}
            </p>

            <p className="mt-1.5 text-[6px] font-semibold uppercase leading-tight tracking-wide text-primary/80 sm:text-[7px]">
              {subtitle}
            </p>

            <div className="mt-3 w-full flex-1 border-t border-dashed border-primary/15 pt-2">
              <p className="text-[5px] uppercase tracking-wider text-muted sm:text-[6px]">
                This is to certify that
              </p>
              <p className="mt-1 text-[7px] font-semibold text-foreground sm:text-[8px]">
                Your Organization Name
              </p>
            </div>

            {/* Green ISO seal — reference style */}
            <div
              className={cn(
                "relative mt-2 flex items-center justify-center rounded-full bg-gradient-to-br from-primary-light to-primary shadow-[0_4px_14px_rgba(0,89,83,0.35)] ring-2 ring-primary/20",
                featured ? "h-8 w-8 sm:h-9 sm:w-9" : "h-6 w-6 sm:h-7 sm:w-7",
              )}
            >
              <span className="font-display text-[6px] font-bold text-white sm:text-[7px]">ISO</span>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-transparent" />
        </div>
      </div>
    </div>
  );
}
