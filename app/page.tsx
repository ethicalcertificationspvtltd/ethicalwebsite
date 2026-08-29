import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { SaudiArabiaSection } from "@/components/sections/SaudiArabiaSection";
import { IndustriesSection } from "@/components/sections/IndustriesSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TrustScrollSection } from "@/components/sections/TrustScrollSection";
import { AccreditationSection } from "@/components/sections/AccreditationSection";
import { InspectionScrollSection } from "@/components/sections/InspectionScrollSection";
import { CertificateVerifySection } from "@/components/sections/CertificateVerifySection";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ClientMarquee } from "@/components/sections/ClientMarquee";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { faqItems } from "@/data/homepage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "ISO Certification in Saudi Arabia | Ethical Certifications",
  description:
    "Independent ISO certification body in Saudi Arabia offering SAAC-accredited certification, inspection, calibration and training. ISO 9001, ISO 14001, ISO 45001, ISO 22000 and more.",
  alternates: { canonical: "/" },
  keywords: [
    "ISO certification Saudi Arabia",
    "ISO certification body",
    "SAAC accredited certification",
    "ISO 9001",
    "ISO 14001",
    "ISO 45001",
    "ISO 22000",
    "Ethical Certifications",
  ],
  openGraph: {
    title: "ISO Certification in Saudi Arabia | Ethical Certifications",
    description:
      "Accredited ISO certification, inspection, calibration and training for organizations across Saudi Arabia and beyond.",
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

      <HeroSection />
      <WhyChooseUsSection />
      <ServicesSection />
      <CertificationsSection />
      <HowItWorksSection />
      <SaudiArabiaSection />
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
