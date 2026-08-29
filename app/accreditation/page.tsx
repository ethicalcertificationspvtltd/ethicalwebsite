import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { AccreditationCard } from "@/components/ui/Cards";
import { accreditations, accreditationDocs } from "@/data/accreditations";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accreditation",
  description:
    "Ethical Certifications is accredited by SAAC and Pakistan National Accreditation Council (PNAC), supporting IAF-recognized certification outcomes.",
  alternates: { canonical: "/accreditation" },
};

export default function AccreditationPage() {
  return (
    <>
      <PageHero
        eyebrow="World Wide Acceptability"
        title="Accreditations"
        description="Proudly accredited by SAAC (SAC) and Pakistan National Accreditation Council (PNAC)."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Accreditation" },
        ]}
      />

      <section className="py-16 md:py-24">
        <div className="container-premium">
          <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-muted">
            These recognitions affirm our commitment to internationally recognized standards in
            certification and inspection services. Being associated with an IAF-recognized
            accreditation pathway means ISO certifications are not only nationally valid but also
            trusted and accepted globally.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-center text-sm text-muted">
            Accreditation standards referenced by Ethical Certifications:{" "}
            {siteConfig.accreditationStandards.join(" & ")}.
          </p>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {accreditations.map((a) => (
              <AccreditationCard key={a.id} {...a} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted-bg/50 py-16">
        <div className="container-premium">
          <h2 className="font-display text-3xl tracking-tight">Accreditation marks & documents</h2>
          <p className="mt-3 max-w-2xl text-muted">
            Assets discovered on the Ethical Certifications website. Always verify current
            accreditation scope directly with the relevant accreditation body.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {accreditationDocs.map((doc) => (
              <figure
                key={doc.src}
                className="overflow-hidden rounded-2xl border border-border bg-card p-4"
              >
                <Image
                  src={doc.src}
                  alt={doc.title}
                  width={640}
                  height={480}
                  className="h-56 w-full object-contain"
                />
                <figcaption className="mt-3 text-sm text-muted">{doc.title}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

    </>
  );
}
