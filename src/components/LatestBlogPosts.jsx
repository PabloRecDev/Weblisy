import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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

export default function LatestBlogPosts() {
  return (
    <section className="py-20 px-4 md:py-32 md:px-8 bg-black relative overflow-hidden">
      {/* Patrón de cuadros invisibles por defecto */}
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(3, 142, 66, 0) 1px, transparent 1px),
            linear-gradient(90deg, rgba(3, 142, 66, 0) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          filter: 'drop-shadow(0 0 2px rgba(3, 142, 66, 0.3))'
        }} />
      </div>

      {/* Luz verde dinámica que ilumina los cuadros */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-96 h-96 rounded-full opacity-60 blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(3, 142, 66, 0.8) 0%, rgba(3, 142, 66, 0.4) 30%, rgba(3, 142, 66, 0.1) 60%, transparent 80%)',
            animation: 'moveLight 8s ease-in-out infinite',
            top: '20%',
            left: '10%',
            mixBlendMode: 'screen'
          }}
        />
        <div 
          className="absolute w-64 h-64 rounded-full opacity-70 blur-2xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(3, 142, 66, 0.9) 0%, rgba(3, 142, 66, 0.5) 40%, rgba(3, 142, 66, 0.2) 70%, transparent 90%)',
            animation: 'moveLight2 12s ease-in-out infinite reverse',
            top: '60%',
            right: '15%',
            mixBlendMode: 'screen'
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full opacity-50 blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(3, 142, 66, 0.7) 0%, rgba(3, 142, 66, 0.3) 50%, rgba(3, 142, 66, 0.1) 80%, transparent 100%)',
            animation: 'moveLight3 15s ease-in-out infinite',
            top: '40%',
            left: '50%',
            mixBlendMode: 'screen'
          }}
        />
      </div>

      {/* Estilos CSS para las animaciones */}
      <style jsx>{`
        @keyframes moveLight {
          0%, 100% { 
            transform: translate(0, 0) scale(1);
            box-shadow: 0 0 50px rgba(3, 142, 66, 0.3);
          }
          25% { 
            transform: translate(100px, -50px) scale(1.2);
            box-shadow: 0 0 80px rgba(3, 142, 66, 0.5);
          }
          50% { 
            transform: translate(200px, 100px) scale(0.8);
            box-shadow: 0 0 30px rgba(3, 142, 66, 0.2);
          }
          75% { 
            transform: translate(-50px, 150px) scale(1.1);
            box-shadow: 0 0 60px rgba(3, 142, 66, 0.4);
          }
        }
        
        @keyframes moveLight2 {
          0%, 100% { 
            transform: translate(0, 0) scale(1);
            box-shadow: 0 0 40px rgba(3, 142, 66, 0.4);
          }
          33% { 
            transform: translate(-150px, -100px) scale(1.3);
            box-shadow: 0 0 70px rgba(3, 142, 66, 0.6);
          }
          66% { 
            transform: translate(100px, -200px) scale(0.9);
            box-shadow: 0 0 25px rgba(3, 142, 66, 0.3);
          }
        }
        
        @keyframes moveLight3 {
          0%, 100% { 
            transform: translate(0, 0) scale(1);
            box-shadow: 0 0 45px rgba(3, 142, 66, 0.3);
          }
          20% { 
            transform: translate(120px, 80px) scale(1.1);
            box-shadow: 0 0 65px rgba(3, 142, 66, 0.5);
          }
          40% { 
            transform: translate(-80px, -120px) scale(0.9);
            box-shadow: 0 0 35px rgba(3, 142, 66, 0.4);
          }
          60% { 
            transform: translate(200px, -50px) scale(1.2);
            box-shadow: 0 0 75px rgba(3, 142, 66, 0.6);
          }
          80% { 
            transform: translate(-150px, 100px) scale(0.8);
            box-shadow: 0 0 20px rgba(3, 142, 66, 0.2);
          }
        }
      `}</style>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Últimos artículos del blog
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Mantente al día con las últimas tendencias en desarrollo web, SEO y marketing digital.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestArticles.map((article, index) => (
            <motion.article
              key={article.slug}
              className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Imagen del artículo */}
              <div className="relative overflow-hidden">
                <img
                  src={article.image?.src || "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"}
                  alt={article.image?.alt || "Artículo de blog"}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Contenido del artículo */}
              <div className="p-6">
                {/* Fecha */}
                <div className="text-sm text-[#038e42] mb-3">
                  {new Date(article.date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>

                {/* Título */}
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-[#038e42] transition-colors">
                  <Link to={`/blog/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>

                {/* Resumen */}
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {article.summary}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.keywords.slice(0, 2).map((keyword) => (
                    <span
                      key={keyword}
                      className="bg-[#038e42]/20 text-[#038e42] px-2 py-1 rounded-full text-xs font-medium"
                    >
                      #{keyword}
                    </span>
                  ))}
                </div>

                {/* Botón leer más */}
                <Link
                  to={`/blog/${article.slug}`}
                  className="inline-flex items-center gap-2 text-[#038e42] font-semibold hover:text-[#038e42]/80 transition-colors group-hover:gap-3"
                >
                  Leer más
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
              </div>
            </motion.article>
          ))}
        </div>

        {/* Botón ver todos los artículos */}
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Link to="/blog">
            <motion.button
              className="bg-[#038e42] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#038e42]/80 transition-colors"
              whileHover={{ scale: 1.05 }}
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