import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatArticleDate, getAllArticles } from "@/lib/news";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Carnet de vol",
  description:
    "Les notes publiques de Sky & Beyond : le monde, les appareils, les factions et la vie du serveur Minecraft.",
  alternates: { canonical: "/actualites" },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: "/actualites",
    siteName: siteConfig.name,
    title: "Carnet de vol · Sky & Beyond",
    description:
      "Les notes publiques de Sky & Beyond : le monde, les appareils, les factions et la vie du serveur Minecraft.",
  },
};

export default function NewsIndexPage() {
  const articles = getAllArticles();
  const [featured, ...rest] = articles;

  return (
    <main id="contenu" className="page-main">
      <header className="news-index-head">
        <div className="wrap news-index-head-grid">
          <h1>Carnet de vol.</h1>
          <p>
            Les notes publiques de Sky &amp; Beyond. Le monde, les appareils, les factions et ce qui
            se prépare derrière l’horizon.
          </p>
        </div>
      </header>

      <div className="news-index-body">
        <div className="wrap">
          {featured ? (
            <article className="news-index-feature">
              <Link
                href={`/actualites/${featured.slug}`}
                className="news-index-feature-media"
                aria-label={`Lire : ${featured.title}`}
              >
                <Image
                  src={featured.cover}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 60vw"
                />
              </Link>
              <div>
                <div className="news-meta">
                  <time dateTime={featured.date}>{formatArticleDate(featured.date)}</time>
                  <span className="dot" aria-hidden="true" />
                  <span>{featured.category}</span>
                  <span className="dot" aria-hidden="true" />
                  <span>{featured.readingMinutes} min</span>
                </div>
                <h2>
                  <Link href={`/actualites/${featured.slug}`}>{featured.title}</Link>
                </h2>
                <p>{featured.excerpt}</p>
                <Link href={`/actualites/${featured.slug}`} className="arrow-link">
                  Lire la note
                  <ArrowUpRight aria-hidden="true" />
                </Link>
              </div>
            </article>
          ) : (
            <p className="lead">Les premières notes de vol seront publiées ici.</p>
          )}

          {rest.length ? (
            <div className="news-index-list">
              {rest.map((article) => (
                <article className="news-index-row" key={article.slug}>
                  <div className="news-meta">
                    <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
                    <span>{article.category}</span>
                  </div>
                  <h2>
                    <Link href={`/actualites/${article.slug}`}>{article.title}</Link>
                  </h2>
                  <Link
                    href={`/actualites/${article.slug}`}
                    className="news-row-arrow"
                    aria-label={`Lire : ${article.title}`}
                  >
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
