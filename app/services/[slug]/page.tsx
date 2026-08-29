import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { getService, services } from "@/data/services";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { certifications } from "@/data/certifications";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

const serviceMeta: Record<string, { title: string; description: string }> = {
  certification: {
    title: "ISO Certification Services",
    description:
      "Internationally accredited ISO certification services from Ethical Certifications via SAAC and PNAC accreditation pathways.",
  },
  inspection: {
    title: "Third Party Inspection",
    description:
      "Independent third-party lifting equipment and earthmoving machinery inspection services.",
  },
  calibration: {
    title: "Calibration Services",
    description:
      "On-site and in-house calibration with master equipment traceable to international standards.",
  },
  training: {
    title: "ISO Lead Auditor Training",
    description:
      "CQI/IRCA approved auditor training with Managing For Quality (MFQ).",
  },
  "pre-shipment-inspection": {
    title: "Pre-Shipment Inspection",
    description:
      "Independent PSI / product inspection services before goods leave the supplier.",
  },
  auditing: {
    title: "ISO Auditing Support",
    description:
      "Professional ISO audit delivery with multi-industry experience.",
  },
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = serviceMeta[slug];
  if (!meta) return {};
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={service.title}
        description={service.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: service.shortTitle },
        ]}
      />

      <section className="py-16 md:py-24">
        <div className="container-premium grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/8 text-primary">
              <ServiceIcon name={service.icon} className="h-6 w-6" />
            </div>
            <p className="text-lg leading-relaxed text-muted">{service.description}</p>
            <ul className="mt-8 space-y-3">
              {service.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm"
                >
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/contact#quote">Request a Quote</Button>
            </div>
          </div>

          <aside className="rounded-3xl border border-border bg-muted-bg/60 p-7">
            <h2 className="font-display text-2xl">Related certifications</h2>
            <ul className="mt-5 space-y-3">
              {certifications.slice(0, 8).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={c.href}
                    className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm transition hover:border-primary/30"
                  >
                    <span>
                      {c.code}
                      {c.year ? `:${c.year}` : ""}
                    </span>
                    <span className="text-muted">{c.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <QuoteSection />
    </>
  );
}
