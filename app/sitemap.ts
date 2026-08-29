import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { services } from "@/data/services";
import { certifications } from "@/data/certifications";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/accreditation",
    "/clients",
    "/news",
    "/new-client",
    "/contact",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path || "/"}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...services.map((s) => ({
      url: `${base}${s.href}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...certifications.map((c) => ({
      url: `${base}${c.href}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];
}
