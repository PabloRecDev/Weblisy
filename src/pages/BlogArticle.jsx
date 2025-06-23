import React from "react";
import { useParams, Link } from "react-router-dom";
import { getArticle } from "../components/BlogArticles";
import { Helmet } from 'react-helmet-async';

export default function BlogArticlePage() {
  const { slug } = useParams();
  const article = getArticle(slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-customBlack text-white flex flex-col">
        <Helmet>
          <title>Artículo no encontrado | Blog Weblisy</title>
          <meta name="description" content="El artículo que buscas no existe o ha sido eliminado." />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <main className="flex-1 pt-24 pb-12 px-4 md:px-0 flex flex-col items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Artículo no encontrado</h1>
            <Link to="/blog" className="text-green-400 underline">Volver al blog</Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-customBlack text-white flex flex-col">
      <Helmet>
        <title>{article.title} | Blog Weblisy</title>
        <meta name="description" content={article.summary || "Lee este artículo de Weblisy sobre desarrollo web, SEO y tendencias digitales."} />
        <meta name="keywords" content={article.keywords ? article.keywords.join(', ') : "desarrollo web, SEO, diseño web, programación"} />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content={`${article.title} | Blog Weblisy`} />
        <meta property="og:description" content={article.summary || "Lee este artículo de Weblisy sobre desarrollo web, SEO y tendencias digitales."} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://weblisy.com/blog/${article.slug}`} />
        <meta property="og:image" content="https://weblisy.com/assets/weblisy-logo.png" />
        <meta property="article:published_time" content={article.date} />
        <meta property="article:author" content="Weblisy" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${article.title} | Blog Weblisy`} />
        <meta name="twitter:description" content={article.summary || "Lee este artículo de Weblisy sobre desarrollo web, SEO y tendencias digitales."} />
        <meta name="twitter:image" content="https://weblisy.com/assets/weblisy-logo.png" />
        
        {/* Canonical */}
        <link rel="canonical" href={`https://weblisy.com/blog/${article.slug}`} />
      </Helmet>
      <main className="flex-1 pt-24 pb-12 px-4 md:px-0">
        <div className="max-w-2xl mx-auto">
          <Link to="/blog" className="text-green-400 underline text-sm mb-6 inline-block">← Volver al blog</Link>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{article.title}</h1>
          <div className="text-sm text-gray-400 mb-6">{article.date}</div>
          <div className="prose prose-invert max-w-none text-white text-lg">
            {article.content}
          </div>
        </div>
      </main>
    </div>
  );
}
