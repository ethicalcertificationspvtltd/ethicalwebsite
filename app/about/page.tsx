import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/PageHero";
import { Button } from "@/components/ui/Button";
import { AboutCopy, AboutRatingCard, AboutStatCard } from "@/components/about/AboutBlocks";
import { siteConfig } from "@/lib/site";
export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${siteConfig.name} — an independent third-party ISO certification and inspection organization accredited by SAAC and PNAC.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title={siteConfig.name}
        description="Independent third-party Certification and Inspection services across a wide range of industrial sectors."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About" },
        ]}
      />

      <section className="py-16 md:py-24">
        <div className="container-premium grid gap-12 lg:grid-cols-2">
          <div>
            <AboutCopy />
            <div className="mt-8">
              <Button href="/contact#quote">Get Free Quote</Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/assets/hero/team-office.jpeg"
              alt="ET Cert team"
              width={480}
              height={520}
              className="h-full min-h-64 rounded-2xl object-cover"
            />
            <div className="space-y-4">
              <Image
                src="/assets/hero/hero-office-1.jpg"
                alt="Audit expertise"
                width={360}
                height={240}
                className="h-40 w-full rounded-2xl object-cover"
              />
              <Image
                src="/assets/hero/hero-office-2.jpg"
                alt="Certification professionals"
                width={360}
                height={240}
                className="h-40 w-full rounded-2xl object-cover"
              />
              <AboutRatingCard rating={String(siteConfig.rating.value)} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted-bg/50 py-16">
        <div className="container-premium grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {siteConfig.stats.map((s) => (
            <AboutStatCard key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </section>

    </>
  );
}
