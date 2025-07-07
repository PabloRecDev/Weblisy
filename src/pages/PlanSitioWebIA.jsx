import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { CheckIcon, ArrowRightIcon, ClockIcon, StarIcon, Cross2Icon, CursorArrowIcon, ChatBubbleIcon, RocketIcon } from '@radix-ui/react-icons';
import { supabase } from '../lib/supabase';

export default function PlanSitioWebIA() {
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
    "Garantía de satisfacción del 100%",
    "Chatbot inteligente integrado",
    "Asistente IA para atención al cliente",
    "Respuestas automáticas personalizadas",
    "Integración con WhatsApp Business",
    "Análisis de conversaciones",
    "Optimización continua con IA"
  ];

  const aiBenefits = [
    {
      icon: ChatBubbleIcon,
      title: "Atención 24/7",
      description: "Tu chatbot responde a tus clientes en cualquier momento del día"
    },
    {
      icon: RocketIcon,
      title: "Más Conversiones",
      description: "Los chatbots pueden aumentar las conversiones hasta un 300%"
    },
    {
      icon: CursorArrowIcon,
      title: "Personalización IA",
      description: "Respuestas inteligentes adaptadas a cada cliente"
    }
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
          promotion_name: 'Plan Sitio Web con IA 499€'
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
        <title>Sitio Web con IA - Revoluciona tu Atención al Cliente | Weblisy</title>
        <meta name="description" content="Sitio web inteligente con asistente IA integrado por solo 499€. Chatbot inteligente, atención 24/7, integración WhatsApp y análisis de conversaciones." />
        <meta name="keywords" content="sitio web IA, chatbot inteligente, atención al cliente IA, WhatsApp Business, sitio web inteligente" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Sitio Web con IA - Revoluciona tu Atención al Cliente | Weblisy" />
        <meta property="og:description" content="Sitio web inteligente con asistente IA integrado por solo 499€. Chatbot inteligente y atención 24/7." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://weblisy.es/plan-sitio-web-ia" />
        <meta property="og:image" content="https://weblisy.es/assets/Weblisy-logo-fondo.png" />
        <meta property="og:image:alt" content="Sitio Web con IA - Weblisy" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sitio Web con IA - Revoluciona tu Atención al Cliente | Weblisy" />
        <meta name="twitter:description" content="Sitio web inteligente con asistente IA integrado por solo 499€." />
        <meta name="twitter:image" content="https://weblisy.es/assets/Weblisy-logo-fondo.png" />
        <meta name="twitter:image:alt" content="Sitio Web con IA - Weblisy" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://weblisy.es/plan-sitio-web-ia" />
      </Helmet>

      <main className="pt-0">
        {/* Hero Section */}
        <section className="py-20 px-4 md:py-32 md:px-8 bg-gradient-to-b from-[#111111] to-[#0a0a0a] relative overflow-hidden">
          {/* Fondo animado */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(147,51,234,0.1)_0%,transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.1)_0%,transparent_50%)]"></div>
          
          <div className="container mx-auto max-w-4xl relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Badge de IA */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center px-6 py-3 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-8"
              >
                <CursorArrowIcon className="w-4 h-4 mr-2" />
                REVOLUCIÓN IA - ATENCIÓN INTELIGENTE
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold text-white mb-6"
              >
                Sitio Web con{' '}
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Inteligencia Artificial
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-white/80 mb-8 max-w-2xl mx-auto"
              >
                Revoluciona la atención al cliente con un asistente IA que trabaja 24/7 para aumentar tus ventas
              </motion.p>

              {/* Precios */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex items-center justify-center gap-4 mb-8"
              >
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-bold text-purple-500">499€</div>
                  <div className="text-white/60 text-sm">Precio único</div>
                </div>
              </motion.div>

              {/* Beneficios IA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
              >
                {aiBenefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 text-center"
                  >
                    <benefit.icon className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                    <p className="text-white/70 text-sm">{benefit.description}</p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.button
                onClick={handleContactClick}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Solicitar sitio web con IA ahora"
              >
                ¡Quiero mi Sitio Web con IA!
                <ArrowRightIcon className="w-5 h-5" aria-hidden="true" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Características Detalladas */}
        <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111111]">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Todo lo que incluye tu{' '}
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Sitio Web con IA
                </span>
              </h2>
              <p className="text-white/80 text-lg">
                Un sitio web profesional con inteligencia artificial integrada
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg"
                >
                  <CheckIcon className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white/90 text-sm">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-20 px-4 md:py-32 md:px-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                ¿Listo para revolucionar tu atención al cliente?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                Únete a la revolución de la IA y transforma la forma en que interactúas con tus clientes.
              </p>
              <motion.button
                onClick={handleContactClick}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Solicitar sitio web con IA ahora"
              >
                ¡Empezar Ahora!
                <ArrowRightIcon className="w-5 h-5" aria-hidden="true" />
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Modal de Contacto */}
        <AnimatePresence>
          {isFormVisible && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setIsFormVisible(false)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-black/90 backdrop-blur-md border border-white/20 rounded-2xl p-6 md:p-8 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                {formStatus === 'loading' ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-white">Enviando solicitud...</p>
                  </div>
                ) : formStatus === 'success' ? (
                  <div className="text-center">
                    <CheckIcon className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">¡Solicitud Enviada!</h3>
                    <p className="text-white/80 mb-4">Nos pondremos en contacto contigo en menos de 24 horas.</p>
                    <button
                      onClick={() => setIsFormVisible(false)}
                      className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      Cerrar
                    </button>
                  </div>
                ) : formStatus === 'error' ? (
                  <div className="text-center">
                    <Cross2Icon className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Error</h3>
                    <p className="text-white/80 mb-4">Hubo un problema al enviar la solicitud. Por favor, intenta de nuevo.</p>
                    <button
                      onClick={() => setFormStatus('idle')}
                      className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                    >
                      Intentar de nuevo
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-white mb-6 text-center">
                      Solicitar Sitio Web con IA
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
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-purple-500 focus:outline-none"
                      />
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-purple-500 focus:outline-none"
                      />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Teléfono (Opcional)"
                        value={formData.phone}
                        onChange={handleFormChange}
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-purple-500 focus:outline-none"
                      />
                      <textarea
                        name="message"
                        placeholder="Cuéntanos sobre tu proyecto (Opcional)"
                        value={formData.message}
                        onChange={handleFormChange}
                        rows="3"
                        className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:border-purple-500 focus:outline-none resize-none"
                      />
                      <button
                        type="submit"
                        className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                      >
                        Enviar Solicitud
                      </button>
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