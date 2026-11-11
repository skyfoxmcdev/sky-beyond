import type { MetadataRoute } from "next";
import { getAllArticles } from "@/lib/news";
import { siteConfig } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const latestArticleDate = articles[0]?.date
    ? new Date(`${articles[0].date}T12:00:00Z`)
    : new Date("2026-11-11T12:00:00Z");

  return [
    {
      url: `${siteConfig.url}/`,
      lastModified: latestArticleDate,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/actualites`,
      lastModified: latestArticleDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...articles.map((article) => ({
      url: `${siteConfig.url}/actualites/${article.slug}`,
      lastModified: new Date(`${article.date}T12:00:00Z`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    {
      url: `${siteConfig.url}/mentions-legales`,
      lastModified: new Date("2026-11-11T12:00:00Z"),
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
