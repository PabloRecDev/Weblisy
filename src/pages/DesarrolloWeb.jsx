import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CheckCircle, Zap, TrendingUp, ShieldCheck, LifeBuoy, Users, X } from "lucide-react";
import { 
  DesktopIcon,
  CheckCircledIcon,
  Pencil2Icon,
  RocketIcon,
  MobileIcon
} from '@radix-ui/react-icons';

const includedFeatures = [
  'Diseño UI/UX 100% personalizado',
  'Desarrollo responsive para móviles y tablets',
  'Optimización SEO inicial para Google',
  'Panel de gestión de contenidos (CMS)',
  'Carga ultra rápida y optimización de rendimiento',
  'Seguridad y protección contra ataques',
  'Formulario de contacto funcional',
  'Integración con redes sociales',
];

const DesarrolloWebPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Array de proyectos web organizados por pares
  const webProjects = [
    {
      id: 1,
      name: "Proyecto Web Corporativo 1",
      images: ["sitioWeb1.1.png", "sitioWeb1.2.png", "sitioWeb1.3.png", "sitioWeb1.4.png", "sitioWeb1.5.png", "sitioWeb1.6.png", "sitioWeb1.7.png", "sitioWeb1.8.png"]
    },
    {
      id: 2,
      name: "Proyecto Web Corporativo 2", 
      images: ["sitioWeb2.1.png", "sitioWeb2.2.png", "sitioWeb2.3.png", "sitioWeb2.4.png", "sitioWeb2.5.png", "sitioWeb2.6.png", "sitioWeb2.7.png", "sitioWeb2.8.png", "sitioWeb2.9.png", "sitioWeb2.10.png", "sitioWeb2.11.png", "sitioWeb2.12.png", "sitioWeb2.13.png", "sitioWeb2.14.png", "sitioWeb2.15.png"]
    },
    {
      id: 3,
      name: "Proyecto Web Corporativo 3",
      images: ["sitioWeb3.1.png", "sitioWeb3.2.png", "sitioWeb3.3.png", "sitioWeb3.4.png", "sitioWeb3.5.png", "sitioWeb3.6.png", "sitioWeb3.7.png", "sitioWeb3.8.png", "sitioWeb3.9.png"]
    },
    {
      id: 4,
      name: "Proyecto Web Corporativo 4",
      images: ["sitioWeb4.1.png"]
    },
    {
      id: 5,
      name: "Proyecto Web Corporativo 5",
      images: ["sitioWeb5.1.png", "sitioWeb5.2.png", "sitioWeb5.3.png", "sitioWeb5.4.png", "sitioWeb5.5.png", "sitioWeb5.6.png", "sitioWeb5.7.png", "sitioWeb5.8.png", "sitioWeb5.9.png", "sitioWeb5.10.png", "sitioWeb5.11.png", "sitioWeb5.12.png", "sitioWeb5.13.png"]
    },
    {
      id: 6,
      name: "Proyecto Web Corporativo 6",
      images: ["sitioWeb6.1.png", "sitioWeb6.2.png"]
    },
    {
      id: 7,
      name: "Proyecto Web Corporativo 7",
      images: ["sitioWeb7.1.png", "sitioWeb7.2.png", "sitioWeb7.3.png", "sitioWeb7.4.png", "sitioWeb7.5.png", "sitioWeb7.6.png", "sitioWeb7.7.png", "sitioWeb7.8.png", "sitioWeb7.9.png", "sitioWeb7.10.png"]
    },
    {
      id: 8,
      name: "Proyecto Web Corporativo 8",
      images: ["sitioWeb8.1.png", "sitioWeb8.2.png"]
    },
    {
      id: 9,
      name: "Proyecto Web Corporativo 9",
      images: ["sitioWeb9.1.JPG"]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Diseño y Desarrollo Web Profesional | Weblisy</title>
        <meta name="description" content="Creamos páginas web corporativas, landing pages y portfolios a medida. Diseño profesional, optimización SEO y rendimiento excepcional para tu presencia online." />
        <meta name="keywords" content="desarrollo web, diseño web, páginas web, landing pages, portfolios, WordPress, React, SEO, responsive, agencia web" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Diseño y Desarrollo Web Profesional | Weblisy" />
        <meta property="og:description" content="Creamos páginas web corporativas, landing pages y portfolios a medida. Diseño profesional y SEO optimizado." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://weblisy.es/servicios/desarrollo-web" />
        <meta property="og:image" content="https://weblisy.es/assets/Weblisy-logo-fondo.png" />
        <meta property="og:image:alt" content="Desarrollo Web Profesional - Weblisy" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Desarrollo Web Profesional | Weblisy" />
        <meta name="twitter:description" content="Páginas web corporativas, landing pages y portfolios a medida con diseño profesional." />
        <meta name="twitter:image" content="https://weblisy.es/assets/Weblisy-logo-fondo.png" />
        <meta name="twitter:image:alt" content="Desarrollo Web Profesional - Weblisy" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://weblisy.es/servicios/desarrollo-web" />
      </Helmet>

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 md:px-8 relative overflow-hidden bg-black">
          <div className="container mx-auto max-w-5xl">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block bg-[#038e42]/10 p-3 rounded-xl border border-[#038e42]/20 mb-6">
                <DesktopIcon className="w-8 h-8 text-[#038e42]" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Diseño y Desarrollo Web
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Tu presencia online, diseñada a la perfección. Creamos sitios web únicos, rápidos y fáciles de gestionar que convierten visitantes en clientes.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 md:px-8 bg-white/5">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Todo lo que necesitas para un sitio web de éxito
              </h2>
              <p className="text-lg text-gray-400 mt-4">
                Cada proyecto web que entregamos viene con un paquete completo de funcionalidades.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {includedFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black/50 p-6 rounded-lg border border-white/10 flex items-start space-x-4"
                >
                  <CheckCircledIcon className="w-6 h-6 text-[#038e42] mt-1 flex-shrink-0" />
                  <p className="text-gray-300">{feature}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Types of Websites Section */}
        <section className="py-20 px-4 md:px-8">
            <div className="container mx-auto max-w-6xl">
                 <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Nos adaptamos a tu necesidad</h2>
                    <p className="text-lg text-gray-400 mt-4">
                        Sea cual sea tu objetivo, tenemos la solución perfecta.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white/5 p-8 rounded-xl border border-white/10 text-center">
                        <Pencil2Icon className="w-10 h-10 text-[#038e42] mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">Webs Corporativas</h3>
                        <p className="text-gray-400">La carta de presentación digital de tu empresa. Profesional, clara y orientada a generar confianza.</p>
                    </div>
                     <div className="bg-white/5 p-8 rounded-xl border border-white/10 text-center">
                        <RocketIcon className="w-10 h-10 text-[#038e42] mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">Landing Pages</h3>
                        <p className="text-gray-400">Páginas de aterrizaje optimizadas para un solo objetivo: convertir. Perfectas para campañas de marketing.</p>
                    </div>
                     <div className="bg-white/5 p-8 rounded-xl border border-white/10 text-center">
                        <MobileIcon className="w-10 h-10 text-[#038e42] mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">Portfolios Digitales</h3>
                        <p className="text-gray-400">Muestra tu trabajo de una forma elegante e impactante. Ideal para creativos, fotógrafos y artistas.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-20 px-4 md:px-8 bg-white/5">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Nuestros Proyectos Web
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
                Descubre algunos de los sitios web que hemos creado para nuestros clientes. Cada proyecto es único y diseñado a medida.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {webProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black/50 rounded-xl border border-white/10 overflow-hidden hover:border-[#038e42]/50 transition-colors"
                >
                  <div className="relative group">
                    <img
                      src={`/assets/${project.images[0]}`}
                      alt={project.name}
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      onClick={() => setSelectedImage({ project, imageIndex: 0 })}
                    />
                    {project.images.length > 1 && (
                      <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm">
                        +{project.images.length - 1} más
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        onClick={() => setSelectedImage({ project, imageIndex: 0 })}
                        className="bg-[#038e42] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#038e42]/80 transition-colors"
                      >
                        Ver Proyecto
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{project.name}</h3>
                    <p className="text-gray-400 text-sm">
                      {project.images.length} vista{project.images.length > 1 ? 's' : ''} del proyecto
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-8 h-8" />
              </button>
              
              <div className="relative">
                <img
                  src={`/assets/${selectedImage.project.images[selectedImage.imageIndex]}`}
                  alt={`${selectedImage.project.name} - Vista ${selectedImage.imageIndex + 1}`}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
                
                {selectedImage.project.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {selectedImage.project.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage({ ...selectedImage, imageIndex: index })}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === selectedImage.imageIndex ? 'bg-[#038e42]' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
                
                {selectedImage.project.images.length > 1 && (
                  <>
                    <button
                      onClick={() => {
                        const newIndex = selectedImage.imageIndex === 0 
                          ? selectedImage.project.images.length - 1 
                          : selectedImage.imageIndex - 1;
                        setSelectedImage({ ...selectedImage, imageIndex: newIndex });
                      }}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      ‹
                    </button>
                    <button
                      onClick={() => {
                        const newIndex = selectedImage.imageIndex === selectedImage.project.images.length - 1 
                          ? 0 
                          : selectedImage.imageIndex + 1;
                        setSelectedImage({ ...selectedImage, imageIndex: newIndex });
                      }}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      ›
                    </button>
                  </>
                )}
              </div>
              
              <div className="text-center mt-4">
                <h3 className="text-white text-xl font-bold">{selectedImage.project.name}</h3>
                <p className="text-gray-400">
                  Vista {selectedImage.imageIndex + 1} de {selectedImage.project.images.length}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <section className="py-20 px-4 md:py-32 md:px-8 bg-black">
          <div className="container mx-auto max-w-4xl text-center bg-white/5 p-12 rounded-2xl border border-white/10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                ¿Hacemos realidad tu proyecto web?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Cuéntanos tu idea y te ofreceremos un presupuesto a medida sin compromiso.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/presupuesto">
                    <motion.button
                    className="bg-[#038e42] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#038e42]/80 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    >
                    Pedir Presupuesto
                    </motion.button>
                </Link>
                <Link to="/proyectos">
                    <motion.button
                    className="border border-white/20 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-black transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    >
                    Ver Proyectos Anteriores
                    </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default DesarrolloWebPage; 