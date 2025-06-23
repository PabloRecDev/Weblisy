import React from "react";
import { motion } from "framer-motion";
import BlogList from "../components/BlogList";
import { Helmet } from 'react-helmet-async';
import articlesObject from "../components/BlogArticles";

const articles = Object.entries(articlesObject).map(([slug, art]) => ({
  slug,
  ...art,
  summary: art.summary || "",
  keywords: art.keywords || [],
}));

export default function BlogPage() {
  const totalArticles = articles.length;
  const totalKeywords = [...new Set(articles.flatMap(art => art.keywords))].length;

  return (
    <>
      <Helmet>
        <title>Blog | Weblisy - Artículos de Desarrollo Web y SEO</title>
        <meta name="description" content="Lee los mejores artículos sobre desarrollo web, SEO, diseño y tendencias digitales en el blog de Weblisy. Mantente al día con las últimas tecnologías." />
        <link rel="canonical" href="https://weblisy.com/blog" />
      </Helmet>
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16 sm:py-24">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Blog de Desarrollo Web
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Descubre las últimas tendencias en desarrollo web, SEO, marketing digital y tecnología. 
            Nuestros expertos comparten conocimientos y experiencias para ayudarte a crecer en el mundo digital.
          </p>
          
          {/* Estadísticas del blog */}
          <div className="flex justify-center gap-8 md:gap-16 mb-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#038e42] mb-2">
                {totalArticles}
              </div>
              <div className="text-gray-400 text-sm">Artículos publicados</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#038e42] mb-2">
                {totalKeywords}
              </div>
              <div className="text-gray-400 text-sm">Temas cubiertos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#038e42] mb-2">
                2025
              </div>
              <div className="text-gray-400 text-sm">Contenido actualizado</div>
            </div>
          </div>

          {/* Categorías principales */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {['Desarrollo Web', 'SEO', 'Marketing Digital', 'E-commerce', 'Tecnología'].map((category) => (
              <span 
                key={category}
                className="bg-[#038e42]/20 text-[#038e42] px-4 py-2 rounded-full text-sm font-medium"
              >
                {category}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Lista de artículos */}
        <BlogList />
      </div>
    </>
  );
}
