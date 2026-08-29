export type NewsItem = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  dateLabel: string;
};

/** News / awareness visuals discovered on the source website. */
export const newsItems: NewsItem[] = [
  {
    slug: "world-food-safety-day",
    title: "World Food Safety Day",
    excerpt:
      "Raising awareness around food safety management and ISO 22000 pathways for organizations across the food chain.",
    image: "/assets/news/food-safety-full.png",
    dateLabel: "Awareness",
  },
  {
    slug: "world-day-for-safety-and-health",
    title: "World Day for Safety and Health at Work",
    excerpt:
      "Highlighting occupational health & safety culture and the role of ISO 45001 management systems.",
    image: "/assets/news/ohs-day-full.png",
    dateLabel: "Awareness",
  },
  {
    slug: "world-environment-day",
    title: "World Environment Day",
    excerpt:
      "Supporting environmental responsibility through ISO 14001 Environmental Management Systems.",
    image: "/assets/news/environment-day-full.png",
    dateLabel: "Awareness",
  },
  {
    slug: "quality-management-excellence",
    title: "Quality Management Excellence",
    excerpt:
      "How structured quality management systems help organizations improve performance and market confidence.",
    image: "/assets/news/business-mgmt-full.png",
    dateLabel: "Insights",
  },
];
