import React from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getArticle } from "../components/BlogArticles";

export default function BlogArticlePage() {
  const { slug } = useParams();
  const article = getArticle(slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-customBlack text-white flex flex-col">
        <Navbar />
        <main className="flex-1 pt-24 pb-12 px-4 md:px-0 flex flex-col items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Artículo no encontrado</h1>
            <Link to="/blog" className="text-green-400 underline">Volver al blog</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-customBlack text-white flex flex-col">
      <Navbar />
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
      <Footer />
    </div>
  );
}
