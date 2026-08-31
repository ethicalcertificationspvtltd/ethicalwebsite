import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { NewsCard } from "@/components/news/NewsCard";
import { newsItems as fallbackNews } from "@/data/news";
import { fetchEthicalWebNews } from "@/lib/ethical-api";

export const metadata: Metadata = {
  title: "News",
  description:
    "Awareness and updates from Ethical Certifications spanning food safety, occupational health & safety, environment and quality management.",
  alternates: { canonical: "/news" },
};

export default async function NewsPage() {
  const apiNews = await fetchEthicalWebNews();
  const newsItems =
    apiNews.length > 0
      ? apiNews.map((item) => ({
          slug: item.slug,
          title: item.title,
          excerpt: item.excerpt,
          image: item.image,
          dateLabel: item.dateLabel || "News",
        }))
      : fallbackNews;

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
