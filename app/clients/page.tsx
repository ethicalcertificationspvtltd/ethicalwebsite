import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  PrestigiousClientList,
  WhyChooseCard,
} from "@/components/clients/AnimatedClientBlocks";
import { CertificateVerifySearch } from "@/components/clients/CertificateVerifySearch";
import { ComplaintForm, FeedbackForm } from "@/components/clients/ClientForms";
import {
  clientGallery,
  clients,
  prestigiousClients,
  whyChoosePoints,
} from "@/data/clients";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Clients",
  description:
    "Certificate verification, prestigious clients, and feedback for Ethical Certifications — Pakistan’s trusted ISO certification body.",
  alternates: { canonical: "/clients" },
};

export default function ClientsPage() {
  return (
    <>
      <PageHero
        eyebrow="Clients"
        title="Clients & certificate verification"
        description="Confirm certificate status, explore organizations that trust Ethical Certifications, and share feedback on our services."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Clients" },
        ]}
      />

      {/* Verification — matches etcert.com clients page search flow */}
      <section id="verify" className="scroll-mt-28 pb-16 md:pb-20">
        <div className="container-premium">
          <SectionHeading
            eyebrow="Transparency"
            title="Certification verification services"
            description="Ethical Certifications provides this verification system so interested parties can confirm the validity and current status of management system and inspection certificates — supporting transparency and helping prevent misuse of certification."
          />
          <p className="mt-5 max-w-3xl text-muted leading-relaxed">
            Every certificate is assigned a unique certificate number. Enter it below to request
            verification details such as organization name, certified standard, scope, status, and
            validity period. You can also email a scanned copy to{" "}
            <a
              className="font-semibold text-primary underline-offset-2 hover:underline"
              href={`mailto:${siteConfig.email}`}
            >
              {siteConfig.email}
            </a>
            .
          </p>
          <div className="mt-8">
            <CertificateVerifySearch />
          </div>
        </div>
      </section>

      {/* Logo grid */}
      <section className="border-y border-border bg-muted-bg/40 py-16 md:py-20">
        <div className="container-premium">
          <SectionHeading
            align="center"
            eyebrow="Trusted partners"
            title="Client logos"
            description="Organizations featured across Ethical Certifications’ client communications."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {clients.map((c) => (
              <div
                key={c.name}
                className="flex h-32 items-center justify-center rounded-2xl border border-border bg-card px-5"
              >
                <Image
                  src={c.logo}
                  alt={c.name}
                  width={200}
                  height={88}
                  className="h-16 w-auto max-w-[90%] object-contain sm:h-20"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate / site gallery from live clients page */}
      <section className="py-16 md:py-20">
        <div className="container-premium">
          <SectionHeading
            eyebrow="Gallery"
            title="Certification moments"
            description="Visuals featured on the Ethical Certifications clients page."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {clientGallery.map((src, i) => (
              <div
                key={src}
                className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_16px_40px_rgba(26,37,22,0.05)]"
              >
                <Image
                  src={src}
                  alt={`Ethical Certifications client showcase ${i + 1}`}
                  width={640}
                  height={400}
                  className="h-56 w-full object-cover transition duration-500 hover:scale-[1.03] sm:h-64"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prestigious clients list */}
      <section className="bg-gradient-to-b from-primary-soft/60 via-white to-background py-16 md:py-20">
        <div className="container-premium grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <SectionHeading
              eyebrow="Pakistan & beyond"
              title="Our prestigious clients"
              description="Ethical Certifications International is proud to be the certification body of choice for leading organizations that strengthen credibility, compliance, and global recognition for their markets."
            />
            <PrestigiousClientList names={prestigiousClients} />
          </div>
          <WhyChooseCard points={whyChoosePoints} />
        </div>
      </section>

      {/* Forms */}
      <section id="feedback" className="scroll-mt-28 py-16 md:py-24">
        <div className="container-premium">
          <SectionHeading
            align="center"
            eyebrow="Engage with us"
            title="Complaints & feedback"
            description="Submit a formal complaint or rate our certification services. Feedback is used for continuous improvement."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <ComplaintForm />
            <FeedbackForm />
          </div>
        </div>
      </section>

    </>
  );
}
