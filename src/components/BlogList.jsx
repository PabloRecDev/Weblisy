import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import articlesObject from "./BlogArticles";

const articles = Object.entries(articlesObject).map(([slug, art]) => ({
  slug,
  ...art,
  summary: art.summary || "",
  keywords: art.keywords || [],
}));

// Ordenar por fecha (más recientes primero)
const sortedArticles = articles.sort((a, b) => new Date(b.date) - new Date(a.date));

export default function BlogList() {
  return (
    <div className="space-y-8">
      {sortedArticles.map((art, index) => (
        <motion.article 
          key={art.slug} 
          className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300 group"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
        >
          <div className="md:flex">
            {/* Imagen del artículo */}
            <div className="md:w-1/3 relative overflow-hidden">
              <img
                src={art.image?.src || "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"}
                alt={art.image?.alt || "Artículo de blog sobre desarrollo web"}
                className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Contenido del artículo */}
            <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
              <div>
                {/* Fecha y categoría */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-sm text-[#038e42] font-medium">
                    {new Date(art.date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  <div className="text-sm text-gray-400">
                    • {art.keywords[0] || 'Desarrollo Web'}
                  </div>
                </div>

                {/* Título */}
                <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-[#038e42] transition-colors">
                  <Link to={`/blog/${art.slug}`}>
                    {art.title}
                  </Link>
                </h2>

                {/* Resumen */}
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {art.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {art.keywords.map((kw) => (
                    <span 
                      key={kw} 
                      className="bg-[#038e42]/20 text-[#038e42] px-3 py-1 rounded-full text-sm font-medium"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Botón leer más */}
              <div className="flex items-center justify-between">
                <Link
                  to={`/blog/${art.slug}`}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-[#038e42] text-white rounded-lg font-semibold hover:bg-[#038e42]/80 transition-all duration-300"
                >
                  Leer artículo completo
                  <svg 
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>

                {/* Tiempo estimado de lectura */}
                <div className="text-sm text-gray-400">
                  ⏱️ 5 min de lectura
                </div>
              </div>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

