import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { certifications, getCertification } from "@/data/certifications";
import { QuoteSection } from "@/components/sections/QuoteSection";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return certifications.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cert = getCertification(slug);
  if (!cert) return {};
  return {
    title: `${cert.code}${cert.year ? `:${cert.year}` : ""} — ${cert.title}`,
    description: cert.summary,
    alternates: { canonical: cert.href },
  };
}

export default async function CertificationPage({ params }: Props) {
  const { slug } = await params;
  const cert = getCertification(slug);
  if (!cert) notFound();

  const related = certifications.filter((c) => c.slug !== cert.slug).slice(0, 4);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://etcert.com/" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://etcert.com/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${cert.code}${cert.year ? `:${cert.year}` : ""}`,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${cert.code}${cert.year ? `:${cert.year}` : ""} ${cert.title}`,
    description: cert.summary,
    provider: {
      "@type": "Organization",
      name: "Ethical Certifications",
      url: "https://etcert.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <PageHero
        eyebrow={cert.category}
        title={`${cert.code}${cert.year ? `:${cert.year}` : ""} — ${cert.title}`}
        description={cert.summary}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: cert.code },
        ]}
      />

      <section className="py-16 md:py-24">
        <div className="container-premium grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-lg leading-relaxed text-muted">{cert.description}</p>
            <p className="mt-4 text-muted leading-relaxed">
              Ethical Certifications supports organizations seeking accredited certification
              pathways. Contact our team for applicability, audit planning and quotation guidance
              specific to your operations.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/contact#quote">Get Free Quote</Button>
              <Button href="/services/certification" variant="outline">
                All certification services
              </Button>
            </div>
          </div>
          <aside className="rounded-3xl border border-border bg-card p-6">
            <h2 className="font-display text-2xl">Related standards</h2>
            <ul className="mt-5 space-y-3">
              {related.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={c.href}
                    className="block rounded-xl border border-border px-4 py-3 text-sm transition hover:border-primary/30"
                  >
                    <span className="font-semibold text-primary">
                      {c.code}
                      {c.year ? `:${c.year}` : ""}
                    </span>
                    <span className="mt-1 block text-muted">{c.title}</span>
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
