import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { cache } from "react";

const ARTICLES_DIRECTORY = path.join(process.cwd(), "content", "actualites");

export type ArticleMeta = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  cover: string;
  coverAlt: string;
  featured: boolean;
  readingMinutes: number;
};

export type Article = ArticleMeta & {
  content: string;
};

type Frontmatter = Record<string, unknown>;

function requireText(data: Frontmatter, key: string, fileName: string): string {
  const value = data[key];
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`[actualités] Le champ "${key}" est requis dans ${fileName}.`);
  }
  return value.trim();
}

function normalizeDate(value: unknown, fileName: string): string {
  const parsed = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(parsed.getTime())) {
    throw new Error(`[actualités] La date de ${fileName} est invalide.`);
  }
  return parsed.toISOString().slice(0, 10);
}

function readingTime(content: string): number {
  const words = content
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function readArticleFile(fileName: string): Article {
  const slug = fileName.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(ARTICLES_DIRECTORY, fileName), "utf8");
  const { data, content } = matter(raw);

  const cover = requireText(data, "cover", fileName);
  if (!cover.startsWith("/")) {
    throw new Error(`[actualités] La couverture de ${fileName} doit être un chemin local.`);
  }

  return {
    slug,
    title: requireText(data, "title", fileName),
    date: normalizeDate(data.date, fileName),
    category: requireText(data, "category", fileName),
    excerpt: requireText(data, "excerpt", fileName),
    cover,
    coverAlt: requireText(data, "coverAlt", fileName),
    featured: data.featured === true,
    readingMinutes: readingTime(content),
    content,
  };
}

export const getAllArticles = cache((): Article[] => {
  if (!fs.existsSync(ARTICLES_DIRECTORY)) return [];

  return fs
    .readdirSync(ARTICLES_DIRECTORY)
    .filter(
      (fileName) =>
        fileName.endsWith(".md") && fileName !== "README.md" && !fileName.startsWith("_"),
    )
    .map(readArticleFile)
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));
});

export const getArticle = cache((slug: string): Article | undefined => {
  return getAllArticles().find((article) => article.slug === slug);
});

export function getArticleSummaries(): ArticleMeta[] {
  return getAllArticles().map((article) => ({
    slug: article.slug,
    title: article.title,
    date: article.date,
    category: article.category,
    excerpt: article.excerpt,
    cover: article.cover,
    coverAlt: article.coverAlt,
    featured: article.featured,
    readingMinutes: article.readingMinutes,
  }));
}

export function getNextArticle(slug: string): ArticleMeta | undefined {
  const articles = getArticleSummaries();
  const index = articles.findIndex((article) => article.slug === slug);
  if (index === -1) return undefined;
  return articles[(index + 1) % articles.length];
}

export function formatArticleDate(date: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T12:00:00Z`));
}
