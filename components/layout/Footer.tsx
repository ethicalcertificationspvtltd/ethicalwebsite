import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { AnimatedGlobe } from "@/components/ui/AnimatedGlobe";
import { Button } from "@/components/ui/Button";
import { FooterScrollReveal } from "@/components/layout/FooterScrollReveal";
import { siteConfig } from "@/lib/site";
import { services } from "@/data/services";
import { certifications } from "@/data/certifications";

export function Footer() {
  return (
    <FooterScrollReveal>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 opacity-[0.12]"
        style={{
          backgroundImage: "url(/assets/bg/bg-footer-ev.png)",
          backgroundSize: "cover",
          backgroundPosition: "center bottom",
        }}
      />
      <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-20 h-64 w-64 rounded-full bg-primary-light/8 blur-3xl" />

      <div className="container-premium relative z-10 py-16 md:py-20">
        <div
          data-footer-banner
          className="relative mb-16 overflow-hidden rounded-3xl border border-border/80 surface-light bg-white/70 px-8 py-10 shadow-[0_16px_48px_rgba(0,89,83,0.06)] backdrop-blur-sm md:px-12 md:py-12"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary-soft/40 via-transparent to-transparent" />
          <div className="relative grid items-center gap-8 md:grid-cols-[auto_1fr_auto]">
            <AnimatedGlobe className="mx-auto h-28 w-28 md:mx-0 md:h-32 md:w-32" />
            <div className="text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Worldwide Recognition
              </p>
              <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Certify Your Business,{" "}
                <span className="text-primary">Go Global</span>
              </h2>
              <p className="mt-3 max-w-lg text-sm text-muted">
                {siteConfig.tagline} — trusted ISO certification across Pakistan, Saudi Arabia
                and beyond.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <Button href="/contact#quote" size="lg">
                Get Free Quote
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div data-footer-col>
            <BrandLogo className="h-12 w-[160px] md:h-12" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              {siteConfig.name} is an independent third-party ISO certification and
              inspection organization accredited by SAAC and PNAC on{" "}
              {siteConfig.accreditationStandards.join(" & ")}.
            </p>
            <div className="mt-6 flex gap-3">
              <Social href={siteConfig.social.linkedin} label="LinkedIn">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                  <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.8v2h.05c.53-1 1.84-2.05 3.8-2.05 4.06 0 4.8 2.67 4.8 6.15V23h-4v-6.6c0-1.57-.03-3.6-2.2-3.6-2.2 0-2.54 1.72-2.54 3.5V23h-4V8.5z" />
                </svg>
              </Social>
              <Social href={siteConfig.social.youtube} label="YouTube">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                  <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.8 15.5v-7l6.2 3.5-6.2 3.5z" />
                </svg>
              </Social>
              <Social href={siteConfig.social.facebook} label="Facebook">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden>
                  <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.5V12h2.7l-.4 2.9h-2.3v7A10 10 0 0 0 22 12z" />
                </svg>
              </Social>
            </div>
          </div>

          <div data-footer-col>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={s.href} className="text-sm text-muted transition hover:text-primary">
                    {s.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div data-footer-col>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Company
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-muted">
              <li>
                <Link href="/about" className="hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link href="/accreditation" className="hover:text-primary">
                  Accreditation
                </Link>
              </li>
              <li>
                <Link href="/clients" className="hover:text-primary">
                  Clients
                </Link>
              </li>
              <li>
                <Link href="/clients#verify" className="hover:text-primary">
                  Certificate Verification
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-primary">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/new-client" className="hover:text-primary">
                  New Client Application
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/clients#feedback" className="hover:text-primary">
                  Complaints & Appeals
                </Link>
              </li>
            </ul>
            <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Certifications
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              {certifications.slice(0, 5).map((c) => (
                <li key={c.slug}>
                  <Link href={c.href} className="hover:text-primary">
                    {c.code}
                    {c.year ? `:${c.year}` : ""}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div data-footer-col>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Contact
            </h3>
            <ul className="mt-5 space-y-4 text-sm text-muted">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  <span className="block font-semibold text-foreground">Saudi Arabia</span>
                  {siteConfig.addresses.saudi}
                </span>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>
                  <span className="block font-semibold text-foreground">Pakistan</span>
                  {siteConfig.addresses.pakistan}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <a href={`mailto:${siteConfig.emailKsa}`} className="hover:text-primary">
                  {siteConfig.emailKsa}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <a href={`tel:${siteConfig.phones.ksaSalesTel}`} className="hover:text-primary">
                  KSA: {siteConfig.phones.ksaSales}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary" />
                <a href={`tel:${siteConfig.phones.pakistanSalesTel}`} className="hover:text-primary">
                  PK: {siteConfig.phones.pakistanSales}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          data-footer-copy
          className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted md:flex-row md:items-center md:justify-between"
        >
          <p>Copyright © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>{siteConfig.tagline}</p>
        </div>
      </div>
    </FooterScrollReveal>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      data-footer-social
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-primary transition hover:border-primary/30 hover:bg-primary-soft"
    >
      {children}
    </a>
  );
}
