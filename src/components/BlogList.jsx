import React from "react";
import { Link } from "react-router-dom";
import articlesObject from "./BlogArticles";

const articles = Object.entries(articlesObject).map(([slug, art]) => ({
  slug,
  ...art,
  summary: art.summary || "",
  keywords: art.keywords || [],
}));

export default function BlogList() {
  return (
    <div className="space-y-8">
      {articles.map((art) => (
        <article key={art.slug} className="bg-black/60 p-6 rounded-xl border border-white/10 shadow-md hover:shadow-lg transition-shadow">
          <img
            src={art.image?.src || "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"}
            alt={art.image?.alt || "Artículo de blog sobre desarrollo web"}
            className="mb-4 rounded-lg shadow w-full object-cover max-h-48"
            loading="lazy"
          />
          <h2 className="text-2xl font-bold mb-2">
            <Link to={`/blog/${art.slug}`} className="hover:text-green-400 transition-colors">{art.title}</Link>
          </h2>
          <div className="text-sm text-gray-400 mb-2">{art.date}</div>
          <p className="mb-2 text-gray-200">{art.summary}</p>
          <div className="flex flex-wrap items-center gap-2 mt-2 mb-4">
            {art.keywords.map((kw) => (
              <span key={kw} className="bg-green-800/20 text-green-300 px-2 py-1 rounded text-xs">#{kw}</span>
            ))}
            <Link
              to={`/blog/${art.slug}`}
              className="group inline-flex items-center gap-2 px-5 py-2 bg-white text-black rounded-full font-semibold shadow hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 ml-auto"
              style={{ minWidth: 0 }}
            >
              Leer más
              <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

