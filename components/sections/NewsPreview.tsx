import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getAllArticles, formatArticleDate } from "@/lib/news";

export function NewsPreview() {
  const articles = getAllArticles();
  if (!articles.length) return null;

  const [featured, ...rest] = articles;

  return (
    <section id="actualites" className="section news-preview" aria-labelledby="news-title">
      <div className="wrap">
        <div className="section-head">
          <h2 id="news-title" className="h2">
            Carnet de vol.
          </h2>
          <Link href="/actualites" className="arrow-link section-head-link">
            Toutes les notes
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>

        <article className="news-feature">
          <Link
            href={`/actualites/${featured.slug}`}
            className="news-feature-media"
            aria-label={`Lire : ${featured.title}`}
          >
            <Image
              src={featured.cover}
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 58vw"
            />
          </Link>
          <div className="news-feature-body">
            <div className="news-meta">
              <time dateTime={featured.date}>{formatArticleDate(featured.date)}</time>
              <span className="dot" aria-hidden="true" />
              <span>{featured.category}</span>
              <span className="dot" aria-hidden="true" />
              <span>{featured.readingMinutes} min</span>
            </div>
            <h3>
              <Link href={`/actualites/${featured.slug}`}>{featured.title}</Link>
            </h3>
            <p>{featured.excerpt}</p>
            <Link href={`/actualites/${featured.slug}`} className="arrow-link">
              Lire la note
              <ArrowRight aria-hidden="true" />
            </Link>
          </div>
        </article>

        {rest.length ? (
          <ul className="news-rows">
            {rest.map((article) => (
              <li key={article.slug}>
                <div className="news-row">
                  <div className="news-meta">
                    <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
                    <span className="dot" aria-hidden="true" />
                    <span>{article.category}</span>
                  </div>
                  <div className="news-row-title">
                    <Link href={`/actualites/${article.slug}`}>{article.title}</Link>
                  </div>
                  <Link
                    href={`/actualites/${article.slug}`}
                    className="news-row-arrow"
                    aria-label={`Lire : ${article.title}`}
                  >
                    <ArrowUpRight aria-hidden="true" />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
