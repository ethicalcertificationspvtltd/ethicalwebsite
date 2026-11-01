import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { faqItems } from "@/data/homepage";
import { siteConfig } from "@/lib/site";

const SectionBackgroundTransition = dynamic(() =>
  import("@/components/animations/SectionBackgroundTransition").then(
    (m) => m.SectionBackgroundTransition,
  ),
);

const ServicesSection = dynamic(() =>
  import("@/components/sections/ServicesSection").then((m) => m.ServicesSection),
);
const CertificationsSection = dynamic(() =>
  import("@/components/sections/CertificationsSection").then((m) => m.CertificationsSection),
);
const HowItWorksSection = dynamic(() =>
  import("@/components/sections/HowItWorksSection").then((m) => m.HowItWorksSection),
);
const IndustriesSection = dynamic(() =>
  import("@/components/sections/IndustriesSection").then((m) => m.IndustriesSection),
);
const StatsSection = dynamic(() =>
  import("@/components/sections/StatsSection").then((m) => m.StatsSection),
);
const TrustScrollSection = dynamic(() =>
  import("@/components/sections/TrustScrollSection").then((m) => m.TrustScrollSection),
);
const AccreditationSection = dynamic(() =>
  import("@/components/sections/AccreditationSection").then((m) => m.AccreditationSection),
);
const InspectionScrollSection = dynamic(() =>
  import("@/components/sections/InspectionScrollSection").then((m) => m.InspectionScrollSection),
);
const CertificateVerifySection = dynamic(() =>
  import("@/components/sections/CertificateVerifySection").then((m) => m.CertificateVerifySection),
);
const AboutPreview = dynamic(() =>
  import("@/components/sections/AboutPreview").then((m) => m.AboutPreview),
);
const ClientMarquee = dynamic(() =>
  import("@/components/sections/ClientMarquee").then((m) => m.ClientMarquee),
);
const TestimonialsSection = dynamic(() =>
  import("@/components/sections/TestimonialsSection").then((m) => m.TestimonialsSection),
);
const FaqSection = dynamic(() =>
  import("@/components/sections/FaqSection").then((m) => m.FaqSection),
);
const FinalCtaSection = dynamic(() =>
  import("@/components/sections/FinalCtaSection").then((m) => m.FinalCtaSection),
);
const QuoteSection = dynamic(() =>
  import("@/components/sections/QuoteSection").then((m) => m.QuoteSection),
);

export const metadata: Metadata = {
  title: "ISO Certification | Ethical Certifications",
  description:
    "Independent ISO certification body offering SAAC and PNAC-accredited certification, inspection, calibration and training. ISO 9001, ISO 14001, ISO 45001, ISO 22000 and more.",
  alternates: { canonical: "/" },
  keywords: [
    "ISO certification",
    "ISO certification body",
    "SAAC accredited certification",
    "ISO 9001",
    "ISO 14001",
    "ISO 45001",
    "ISO 22000",
    "Ethical Certifications",
  ],
  openGraph: {
    title: "ISO Certification | Ethical Certifications",
    description:
      "Accredited ISO certification, inspection, calibration and training for organizations worldwide.",
    url: siteConfig.url,
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <SectionBackgroundTransition />

      <HeroSection />
      <WhyChooseUsSection />
      <ServicesSection />
      <CertificationsSection />
      <HowItWorksSection />
      <IndustriesSection />
      <StatsSection />
      <TrustScrollSection />
      <AccreditationSection />
      <InspectionScrollSection />
      <CertificateVerifySection />
      <AboutPreview />
      <ClientMarquee />
      <TestimonialsSection />
      <FaqSection />
      <FinalCtaSection />
      <QuoteSection />
    </>
  );
}
