import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ContactOffices } from "@/components/contact/ContactOffices";
import { ContactQuoteBlock } from "@/components/contact/ContactQuoteBlock";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Ethical Certifications in Pakistan for ISO certification, inspection, calibration and training inquiries.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's get in touch"
        description="Reach our Pakistan team for quotations, verification and service inquiries."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      <section className="py-16 md:py-24">
        <div className="container-premium grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <ContactOffices />
          <ContactQuoteBlock />
        </div>
      </section>
    </>
  );
}
