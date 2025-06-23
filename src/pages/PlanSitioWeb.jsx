import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckIcon, ArrowRightIcon, ClockIcon, StarIcon, Cross2Icon } from '@radix-ui/react-icons';
import { supabase } from '../lib/supabase';

export default function PlanSitioWeb() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formStatus, setFormStatus] = useState('idle'); // idle, loading, success, error
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const features = [
    "Diseño 100% personalizado y moderno",
    "Hasta 5 secciones (Inicio, Sobre nosotros, Servicios, etc.)",
    "Completamente adaptado a móviles y tabletas",
    "Formulario de contacto funcional",
    "Optimización SEO básica inicial",
    "Carga rápida y rendimiento optimizado",
    "1 año de Hosting y Dominio gratis",
    "Panel de administración básico",
    "Integración con redes sociales",
    "Certificado SSL incluido",
    "Soporte técnico por 3 meses",
    "Garantía de satisfacción del 100%"
  ];

  const handleContactClick = () => {
    setIsFormVisible(true);
    setFormStatus('idle'); // Reset form status when opening
    setFormData({ name: '', email: '', phone: '', message: '' }); // Reset form data
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('loading');
    
    try {
      const { error } = await supabase.from('promotion_requests').insert([
        { 
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          promotion_name: 'Plan Sitio Web Profesional 299€'
        }
      ]);

      if (error) throw error;

      setFormStatus('success');
    } catch (error) {
      console.error('Error al enviar solicitud de promoción:', error);
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Helmet>
        <title>Sitio Web Profesional - Oferta Especial | Weblisy</title>
        <meta name="description" content="Oferta especial: Sitio web profesional completo por solo 299€. Diseño personalizado, responsive, SEO optimizado, hosting y dominio incluidos. ¡Aprovecha el 50% de descuento!" />
        <meta name="keywords" content="sitio web profesional, oferta web, diseño web barato, hosting gratis, dominio gratis, SEO básico, responsive design" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Sitio Web Profesional - Oferta Especial | Weblisy" />
        <meta property="og:description" content="Oferta especial: Sitio web profesional completo por solo 299€. Diseño personalizado, responsive y SEO optimizado." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://weblisy.com/plan-sitio-web" />
        <meta property="og:image" content="https://weblisy.com/assets/weblisy-logo.png" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sitio Web Profesional - Oferta Especial | Weblisy" />
        <meta name="twitter:description" content="Sitio web profesional completo por solo 299€. ¡50% de descuento!" />
        <meta name="twitter:image" content="https://weblisy.com/assets/weblisy-logo.png" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://weblisy.com/plan-sitio-web" />
      </Helmet>

      <main className="pt-0">
        {/* Hero Section */}
        <section className="py-20 px-4 md:py-32 md:px-8 bg-gradient-to-b from-[#111111] to-[#0a0a0a] relative overflow-hidden">
          {/* Fondo animado */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(3,142,66,0.1)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(3,142,66,0.1)_0%,transparent_50%)]"></div>
          
          <div className="container mx-auto max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Badge de oferta */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center px-6 py-3 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-8"
              >
                <StarIcon className="w-4 h-4 mr-2" />
                OFERTA ESPECIAL - 50% DE DESCUENTO
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold text-white mb-6"
              >
                Sitio Web{' '}
                <span className="bg-gradient-to-r from-[#038e42] to-green-500 bg-clip-text text-transparent">
                  Profesional
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-white/80 mb-8 max-w-2xl mx-auto"
              >
                La presencia online que tu negocio necesita para destacar y atraer más clientes
              </motion.p>

              {/* Precios */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex items-center justify-center gap-4 mb-8"
              >
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-bold text-[#038e42]">299€</div>
                  <div className="text-white/60 text-sm">Precio de oferta</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white/40 line-through">599€</div>
                  <div className="text-white/40 text-sm">Precio original</div>
                </div>
              </motion.div>

              {/* Contador regresivo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex items-center justify-center gap-2 mb-8 text-white/80"
              >
                <ClockIcon className="w-5 h-5" />
                <span className="text-sm">Oferta válida por tiempo limitado</span>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <motion.button
                  onClick={handleContactClick}
                  className="px-8 py-4 bg-[#038e42] text-white font-semibold rounded-lg hover:bg-green-500 transition-all duration-300 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Aprovechar oferta especial de sitio web profesional"
                >
                  ¡Aprovechar Oferta!
                  <ArrowRightIcon className="w-5 h-5" aria-hidden="true" />
                </motion.button>
                <Link to="/proyectos">
                  <motion.button
                    className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-lg hover:bg-white hover:text-black transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Ver ejemplos de proyectos realizados"
                  >
                    Ver Ejemplos
                  </motion.button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Características */}
        <section className="py-20 px-4 md:py-32 md:px-8 bg-[#0a0a0a]">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Todo lo que incluye tu sitio web
              </h2>
              <p className="text-white/80 text-lg">
                Un paquete completo para que tu negocio tenga presencia online profesional
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-[#038e42] rounded-full flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-white/90">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Proceso */}
        <section className="py-20 px-4 md:py-32 md:px-8 bg-[#111111]">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Proceso simple y transparente
              </h2>
              <p className="text-white/80 text-lg">
                En solo 4 pasos tendrás tu sitio web profesional listo
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Consulta", desc: "Cuéntanos sobre tu negocio y objetivos" },
                { step: "2", title: "Diseño", desc: "Creamos un diseño personalizado para ti" },
                { step: "3", title: "Desarrollo", desc: "Desarrollamos tu sitio web profesional" },
                { step: "4", title: "Lanzamiento", desc: "Tu sitio web está listo para el mundo" }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="w-16 h-16 bg-[#038e42] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-white/70">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 px-4 md:py-32 md:px-8 bg-gradient-to-r from-[#038e42]/10 to-[#038e42]/5">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                ¿Listo para transformar tu presencia online?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                No dejes pasar esta oferta especial. Tu sitio web profesional por solo 299€.
              </p>
              <motion.button
                onClick={handleContactClick}
                className="px-8 py-4 bg-[#038e42] text-white font-semibold rounded-lg hover:bg-green-500 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Aprovechar oferta especial de sitio web profesional ahora"
              >
                ¡Aprovechar Oferta Ahora!
                <ArrowRightIcon className="w-5 h-5" aria-hidden="true" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Formulario de contacto flotante */}
        <AnimatePresence>
        {isFormVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setIsFormVisible(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="bg-[#111111] border border-white/20 rounded-2xl p-8 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setIsFormVisible(false)}
                className="absolute top-4 right-4 text-white/60 hover:text-white"
                aria-label="Cerrar formulario"
              >
                <Cross2Icon className="w-6 h-6" />
              </button>

              {formStatus === 'success' ? (
                <div className="text-center py-8">
                   <div className="inline-block bg-green-500/10 p-4 rounded-full border-2 border-green-500/20 mb-6">
                    <CheckIcon className="w-12 h-12 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">¡Solicitud Enviada!</h3>
                  <p className="text-white/80 mb-6">
                    Hemos recibido tu solicitud para la oferta. Nos pondremos en contacto contigo muy pronto.
                  </p>
                  <button
                    onClick={() => setIsFormVisible(false)}
                    className="w-full px-4 py-3 bg-[#038e42] text-white rounded-lg hover:bg-green-500 transition-colors"
                  >
                    Cerrar
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">
                    Solicitar Oferta
                  </h3>
                  <p className="text-white/80 mb-6 text-center">
                    Completa el formulario y nos pondremos en contacto contigo en menos de 24 horas.
                  </p>
              
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <input
                      type="text"
                      name="name"
                      placeholder="Nombre completo"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-[#038e42] focus:outline-none"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-[#038e42] focus:outline-none"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Teléfono (Opcional)"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-[#038e42] focus:outline-none"
                    />
                    <textarea
                      name="message"
                      placeholder="Cuéntanos sobre tu negocio y qué necesitas (Opcional)"
                      rows="4"
                      value={formData.message}
                      onChange={handleFormChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-[#038e42] focus:outline-none resize-none"
                    ></textarea>
                    
                    {formStatus === 'error' && (
                      <p className="text-red-500 text-sm text-center">
                        Hubo un error al enviar tu solicitud. Por favor, inténtalo de nuevo.
                      </p>
                    )}

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={formStatus === 'loading'}
                        className="w-full flex justify-center items-center px-4 py-3 bg-[#038e42] text-white rounded-lg hover:bg-green-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                      >
                        {formStatus === 'loading' ? 'Enviando...' : 'Enviar Solicitud'}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>
      </main>
    </div>
  );
} 