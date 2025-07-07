import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CalendarIcon, ClockIcon } from '@radix-ui/react-icons';
import articlesObject from './BlogArticles';

const articles = Object.entries(articlesObject).map(([slug, art]) => ({
  slug,
  ...art,
  summary: art.summary || "",
  keywords: art.keywords || [],
}));

// Ordenar por fecha (más recientes primero) y tomar los últimos 3
const latestArticles = articles
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 3);

// Hook personalizado para detectar elementos en vista
const useInViewCustom = (ref, threshold = 0.3) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, threshold]);

  return isInView;
};

export default function LatestBlogPosts() {
  const ref = useRef(null);
  const isInView = useInViewCustom(ref);

  return (
    <section 
      ref={ref}
      className="py-24 px-4 md:py-40 md:px-8 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Elementos decorativos animados */}
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 bg-[#006239]/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-40 h-40 bg-[#006239]/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1.1, 1, 1.1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header con animación */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.div
            className="inline-block mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-[#006239] to-[#006239]/80 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-8 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            Últimos <span className="text-[#006239]">artículos</span> del blog
          </motion.h2>
          
          <motion.p 
            className="text-white/70 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          >
            Mantente al día con las últimas tendencias en desarrollo web, SEO y marketing digital. 
            Descubre consejos, tutoriales y mejores prácticas para hacer crecer tu negocio online.
          </motion.p>
        </motion.div>
        
        {/* Grid de artículos mejorado */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9, ease: "easeOut" }}
        >
          {latestArticles.map((article, index) => (
            <motion.article
              key={article.slug}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 + index * 0.2, ease: "easeOut" }}
              whileHover={{ y: -8 }}
            >
              {/* Tarjeta principal */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-3xl overflow-hidden h-full relative">
                {/* Efecto de brillo */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 0.5
                  }}
                />
                
                {/* Imagen del artículo */}
                <div className="relative overflow-hidden h-64">
                  <motion.img
                    src={article.image?.src || "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"}
                    alt={article.image?.alt || "Artículo de blog"}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Overlay con información */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-4 text-white/80 text-sm mb-2">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-4 h-4" />
                        <span>
                          {new Date(article.date).toLocaleDateString('es-ES', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>5 min lectura</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contenido del artículo */}
                <div className="p-8 relative z-10">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {article.keywords.slice(0, 3).map((keyword) => (
                      <motion.span
                        key={keyword}
                        className="bg-[#006239]/20 text-[#006239] px-3 py-1 rounded-full text-xs font-medium border border-[#006239]/30"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        #{keyword}
                      </motion.span>
                    ))}
                  </div>

                  {/* Título */}
                  <motion.h3 
                                            className="text-2xl font-bold mb-4 text-white group-hover:text-[#006239] transition-colors duration-300 line-clamp-2"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link to={`/blog/${article.slug}`}>
                      {article.title}
                    </Link>
                  </motion.h3>

                  {/* Resumen */}
                  <p className="text-white/70 mb-6 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>

                  {/* Botón leer más */}
                  <motion.div
                    className="flex items-center justify-between"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Link
                      to={`/blog/${article.slug}`}
                                              className="inline-flex items-center gap-2 text-[#006239] font-semibold hover:text-[#006239]/80 transition-colors group-hover:gap-3"
                    >
                      Leer artículo completo
                      <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                    
                    <div className="flex items-center gap-1 text-white/50 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>1.2k</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Botón ver todos los artículos */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
        >
          <Link to="/blog">
            <motion.button
                              className="bg-gradient-to-r from-[#006239] to-[#006239]/80 text-white px-10 py-4 rounded-2xl font-semibold text-lg hover:from-[#006239]/90 hover:to-[#006239]/70 transition-all duration-300 shadow-lg shadow-[#006239]/20"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(3, 142, 66, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              Ver todos los artículos
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 