import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { formatArticleDate, getArticle, getAllArticles, getNextArticle } from "@/lib/news";
import { siteConfig } from "@/lib/config";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/actualites/${article.slug}` },
    openGraph: {
      type: "article",
      locale: siteConfig.locale,
      url: `/actualites/${article.slug}`,
      siteName: siteConfig.name,
      title: article.title,
      description: article.excerpt,
      publishedTime: article.date,
      images: [
        {
          url: article.cover,
          width: 1600,
          height: 1000,
          alt: article.coverAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.cover],
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) notFound();

  const nextArticle = getNextArticle(article.slug);
  const showNext = nextArticle && nextArticle.slug !== article.slug;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: `${siteConfig.url}${article.cover}`,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: "fr-FR",
    articleSection: article.category,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    mainEntityOfPage: `${siteConfig.url}/actualites/${article.slug}`,
  };

  return (
    <main id="contenu" className="article-page">
      <article>
        <header className="article-head">
          <div className="wrap">
            <nav className="breadcrumb" aria-label="Fil d’Ariane">
              <Link href="/actualites">Carnet de vol</Link>
              <span aria-hidden="true">/</span>
              <span>{article.category}</span>
            </nav>
            <h1>{article.title}</h1>
            <div className="article-meta">
              <time dateTime={article.date}>{formatArticleDate(article.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{article.category}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readingMinutes} min de lecture</span>
            </div>
          </div>
        </header>

        <div className="wrap">
          <figure>
            <div className="article-cover">
              <Image
                src={article.cover}
                alt={article.coverAlt}
                fill
                priority
                sizes="(max-width: 1440px) 100vw, 1440px"
              />
            </div>
            <figcaption className="article-cover-credit">Illustration originale</figcaption>
          </figure>

          <div className="article-body">
            <div className="prose">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ href, children }) => {
                    if (href?.startsWith("/")) {
                      return <Link href={href}>{children}</Link>;
                    }
                    return (
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        {children}
                      </a>
                    );
                  },
                }}
              >
                {article.content}
              </ReactMarkdown>
            </div>

            <div className="article-end">
              <Link href="/actualites" className="arrow-link">
                <ArrowLeft aria-hidden="true" />
                Toutes les notes
              </Link>
              <span className="mono">{article.category}</span>
            </div>
          </div>
        </div>
      </article>

      {showNext ? (
        <aside className="article-next" aria-labelledby="next-article-title">
          <div className="wrap">
            <p className="mono">Note suivante</p>
            <Link href={`/actualites/${nextArticle.slug}`}>
              <h2 id="next-article-title">{nextArticle.title}</h2>
            </Link>
            <Link href={`/actualites/${nextArticle.slug}`} className="arrow-link">
              Lire la note
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </aside>
      ) : null}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </main>
  );
}
