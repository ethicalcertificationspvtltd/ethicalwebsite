import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { NewsCard } from "@/components/news/NewsCard";
import { newsItems } from "@/data/news";
export const metadata: Metadata = {
  title: "News",
  description:
    "Awareness and updates from Ethical Certifications spanning food safety, occupational health & safety, environment and quality management.",
  alternates: { canonical: "/news" },
};

export default function NewsPage() {
  return (
    <>
      <PageHero
        eyebrow="News"
        title="Insights & awareness"
        description="Selected awareness materials published on the Ethical Certifications website."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "News" },
        ]}
      />

      <section className="py-16 md:py-24">
        <div className="container-premium grid gap-6 md:grid-cols-2">
          {newsItems.map((item) => (
            <NewsCard key={item.slug} item={item} />
          ))}
        </div>
      </section>

    </>
  );
}
