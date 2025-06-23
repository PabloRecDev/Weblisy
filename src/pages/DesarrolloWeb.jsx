import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CheckCircle, Zap, TrendingUp, ShieldCheck, LifeBuoy, Users } from "lucide-react";
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
  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Diseño y Desarrollo Web Profesional | Weblisy</title>
        <meta name="description" content="Creamos páginas web corporativas, landing pages y portfolios a medida. Diseño profesional, optimización SEO y rendimiento excepcional para tu presencia online." />
        <link rel="canonical" href="https://weblisy.com/servicios/desarrollo-web" />
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