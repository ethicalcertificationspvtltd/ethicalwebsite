"use client";

import Image from "next/image";
import { clients } from "@/data/clients";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ClientMarquee() {
  const row = [...clients, ...clients];

  return (
    <section className="relative overflow-hidden py-20 md:py-24">
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-6 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />

      <div className="container-premium relative z-10">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Clients"
            title="Trusted across industries"
            description="Client logos featured on the Ethical Certifications website."
          />
        </Reveal>
      </div>

      <div className="marquee-paused relative z-10 mt-12 space-y-6 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_6%,black_94%,transparent)]">
        <div className="marquee-track gap-6 px-4" style={{ animationDuration: "48s" }}>
          {row.map((c, i) => (
            <Logo key={`${c.name}-a-${i}`} {...c} />
          ))}
        </div>
        <div className="marquee-track reverse gap-6 px-4" style={{ animationDuration: "56s" }}>
          {[...row].reverse().map((c, i) => (
            <Logo key={`${c.name}-b-${i}`} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Logo({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="flex h-28 w-56 shrink-0 items-center justify-center rounded-2xl border border-border/80 bg-card px-6 transition duration-300 hover:border-primary/25 hover:shadow-[0_0_28px_rgba(0,89,83,0.1)] sm:h-32 sm:w-64">
      <Image
        src={logo}
        alt={name}
        width={220}
        height={96}
        style={{ width: "auto", height: "auto" }}
        className="h-16 w-auto max-w-[85%] object-contain opacity-70 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-20"
      />
    </div>
  );
}
