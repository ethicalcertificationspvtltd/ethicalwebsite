import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { PageLoader } from "@/components/layout/PageLoader";
import { FloatingContact } from "@/components/layout/FloatingContact";
import { BackgroundTriangles } from "@/components/layout/BackgroundTriangles";
import { Providers, PageTransition } from "@/components/layout/Providers";
import { GlobalFloatingWorld } from "@/components/animations/GlobalFloatingWorld";

/* Corporate typography — DM Sans */
const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSansDisplay = DM_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Trusted ISO Certification`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [
    "ISO certification",
    "Ethical Certifications",
    "ET Cert",
    "PNAC",
    "SAAC",
    "third party inspection",
    "calibration",
    "lead auditor training",
    "pre-shipment inspection",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: "/assets/logo/etcert-logo-official.png",
        width: 512,
        height: 512,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteConfig.url,
  },
  icons: {
    icon: "/assets/logo/favicon-300.png",
    apple: "/assets/logo/favicon-300.png",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  url: siteConfig.url,
  logo: `${siteConfig.url}/assets/logo/etcert-logo-official.png`,
  email: siteConfig.email,
  telephone: siteConfig.phones.pakistanSales,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Plot # 169, Block-B, Muhafiz Town, Phase-II",
    addressLocality: "Lahore",
    addressCountry: "PK",
  },
  sameAs: [
    siteConfig.social.linkedin,
    siteConfig.social.youtube,
    siteConfig.social.facebook,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSansDisplay.variable} ${dmSans.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Providers>
          <GlobalFloatingWorld />
          <BackgroundTriangles />
          <PageLoader />
          <ScrollProgress />
          <CustomCursor />
          <Navbar />
          <FloatingContact />
          <PageTransition>
            <main id="content" className="relative z-[2] flex-1">
              {children}
            </main>
            <Footer />
          </PageTransition>
        </Providers>
      </body>
    </html>
  );
}
