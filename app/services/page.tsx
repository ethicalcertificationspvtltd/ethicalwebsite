import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ServiceCard } from "@/components/ui/Cards";
import { services } from "@/data/services";
export const metadata: Metadata = {
  title: "Services",
  description:
    "ISO certification, third-party inspection, calibration, lead auditor training, pre-shipment inspection and auditing services from Ethical Certifications.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Our services"
        description="Explore Ethical Certifications’ suite of certification, inspection, calibration, training and pre-shipment inspection services."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
      />
      <section className="py-16 md:py-24">
        <div className="container-premium grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.slug} service={service} index={i} />
          ))}
        </div>
      </section>
    </>
  );
}
