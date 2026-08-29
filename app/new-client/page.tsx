import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { NewClientForm } from "@/components/ui/NewClientForm";
export const metadata: Metadata = {
  title: "New Client Application",
  description:
    "Apply for ISO certification with Ethical Certifications. Submit your new client application form for quotation and certification planning.",
  alternates: { canonical: "/new-client" },
};

export default function NewClientPage() {
  return (
    <>
      <PageHero
        eyebrow="Cost of Certification?"
        title="New Client Application Form"
        description="Complete this application so our team can assess your certification needs and prepare an accurate quotation."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "New Client Application" },
        ]}
      />

      <section className="relative overflow-hidden py-16 md:py-24">
        <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="container-premium relative z-10 max-w-4xl">
          <NewClientForm />
        </div>
      </section>

    </>
  );
}
