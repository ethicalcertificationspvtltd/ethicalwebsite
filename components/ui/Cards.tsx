"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/data/services";
import { CardFlyText } from "@/components/ui/AnimatedText";
import { TiltCard } from "@/components/ui/TiltCard";
import { ServiceIconAnimated } from "@/components/ui/ServiceIconAnimated";
import { CardInnerReveal, RevealPart } from "@/components/animations/CardInnerReveal";

export function ServiceCard({ service, index = 0 }: { service: Service; index?: number }) {
  return (
    <TiltCard className="group h-full -translate-y-0 transition-transform duration-500 hover:-translate-y-2" intensity={8} scaleOnHover={1.015}>
      <Link
        href={service.href}
        data-cursor="view"
        className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card surface-light p-7 shadow-[8px_8px_24px_rgba(0,89,83,0.06),-6px_-6px_18px_rgba(255,255,255,0.9)] transition-[box-shadow,border-color] duration-500 hover:border-primary/25 hover:shadow-[0_24px_50px_rgba(0,89,83,0.12),0_0_40px_rgba(0,89,83,0.06)]"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(520px_circle_at_var(--x,50%)_var(--y,0%),rgba(0,89,83,0.08),transparent_45%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-primary/5 blur-2xl transition-transform duration-700 group-hover:scale-150" />

        <CardInnerReveal className="relative z-10 flex h-full flex-col">
          <RevealPart part="icon" className="mb-8 flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/8 text-primary transition-colors duration-500 group-hover:bg-primary/14">
              <ServiceIconAnimated name={service.icon} />
            </div>
            <span className="font-display text-2xl text-primary/15 transition-all duration-500 group-hover:translate-x-1 group-hover:text-primary/30">
              {String(index + 1).padStart(2, "0")}
            </span>
          </RevealPart>

          <RevealPart part="title">
            <h3 className="font-display text-2xl tracking-tight text-foreground transition-transform duration-500 group-hover:-translate-y-0.5">
              <CardFlyText text={service.title} />
            </h3>
          </RevealPart>

          <RevealPart part="body">
            <p className="mt-3 flex-1 text-sm leading-relaxed text-muted transition-colors duration-300 group-hover:text-foreground/75">
              {service.summary}
            </p>
          </RevealPart>

          <RevealPart part="cta" className="mt-6">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
              <span className="relative">
                Explore
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-400 group-hover:scale-x-100" />
              </span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </RevealPart>
        </CardInnerReveal>

        <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-primary/50 via-accent/40 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
      </Link>
    </TiltCard>
  );
}

export function CertificationCard({
  code,
  year,
  title,
  summary,
  href,
}: {
  code: string;
  year?: string;
  title: string;
  summary: string;
  href: string;
}) {
  return (
    <TiltCard intensity={5} className="cert-flip-card group min-w-[min(100%,17.5rem)] snap-center sm:min-w-[280px] md:min-w-[320px]" scaleOnHover={1.02}>
      <div className="cert-flip-inner h-full">
        <Link
          href={href}
          data-cursor="view"
          className="cert-flip-front surface-light relative block h-full overflow-hidden rounded-2xl border border-primary/25 bg-card p-6 shadow-[0_20px_50px_rgba(0,89,83,0.06),inset_0_1px_0_rgba(255,255,255,0.9)] transition-shadow duration-500 group-hover:shadow-[0_28px_60px_rgba(0,89,83,0.1)]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,#ffffff_0%,#f4f9f8_55%,#eaf6f4_100%)]" />
          <div className="pointer-events-none absolute inset-[5px] rounded-xl border border-primary/20" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(36,168,124,0.12),transparent_40%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <CardInnerReveal className="relative z-10 pr-2 pt-1">
            <RevealPart part="icon" className="absolute right-0 top-0 z-10">
              <div className="relative h-14 w-14">
                <div aria-hidden className="absolute inset-0 rounded-full border border-primary/15 hero-orbit--outer" />
                <div aria-hidden className="absolute inset-2 rounded-full border border-dashed border-accent/45 hero-orbit--inner" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-5 w-5 rounded-full bg-gradient-to-br from-accent to-primary/70 shadow-[0_0_18px_rgba(192,156,84,0.35)]" />
                </div>
              </div>
            </RevealPart>

            <RevealPart part="number">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {code}
                {year ? `:${year}` : ""}
              </p>
            </RevealPart>

            <RevealPart part="title">
              <h3 className="mt-4 max-w-[80%] font-display text-2xl text-foreground">
                <CardFlyText text={title} />
              </h3>
            </RevealPart>

            <RevealPart part="body">
              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{summary}</p>
            </RevealPart>

            <RevealPart part="cta">
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Learn more
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </RevealPart>
          </CardInnerReveal>
        </Link>

        <Link
          href={href}
          tabIndex={-1}
          aria-hidden
          className="cert-flip-back surface-dark flex h-full flex-col justify-between rounded-2xl border border-primary/25 bg-gradient-to-br from-[#005953] to-[#007a6e] p-6 text-white shadow-[0_20px_50px_rgba(0,89,83,0.2)]"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">{code}</p>
            <h3 className="mt-3 font-display text-xl">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/85">{summary}</p>
          </div>
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-white">
            Learn more
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </Link>
      </div>
    </TiltCard>
  );
}

export function AccreditationCard({
  name,
  shortName,
  description,
  logo,
}: {
  name: string;
  shortName: string;
  description: string;
  logo: string;
}) {
  return (
    <TiltCard className="group h-full" intensity={5}>
      <div className="surface-light relative h-full overflow-hidden rounded-3xl border border-border bg-white p-7 shadow-[8px_8px_24px_rgba(0,89,83,0.06),-6px_-6px_18px_rgba(255,255,255,0.95)] transition-shadow duration-500 group-hover:shadow-[0_28px_60px_rgba(0,89,83,0.1)]">
        <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100">
          <div className="absolute inset-[-1px] animate-[seal-spin_14s_linear_infinite] rounded-3xl bg-[conic-gradient(from_120deg,transparent_40%,rgba(0,89,83,0.3),transparent_70%)]" />
          <div className="absolute inset-[1px] rounded-3xl bg-white" />
        </div>

        <CardInnerReveal className="relative z-10">
          <RevealPart part="icon" className="mb-6 flex h-20 items-center">
            <Image
              src={logo}
              alt={name}
              width={160}
              height={80}
              style={{ width: "auto", height: "auto" }}
              className="max-h-16 w-auto object-contain transition-transform duration-500 group-hover:scale-[1.06]"
            />
          </RevealPart>
          <RevealPart part="eyebrow">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{shortName}</p>
          </RevealPart>
          <RevealPart part="title">
            <h3 className="mt-2 font-display text-2xl font-semibold text-foreground">
              <CardFlyText text={name} />
            </h3>
          </RevealPart>
          <RevealPart part="body">
            <p className="mt-3 text-sm leading-relaxed text-muted">{description}</p>
          </RevealPart>
        </CardInnerReveal>
      </div>
    </TiltCard>
  );
}
