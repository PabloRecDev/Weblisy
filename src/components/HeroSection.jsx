import React, { useEffect } from 'react';
import { Button } from "./ui/button";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { RocketIcon, CodeIcon, StarIcon } from '@radix-ui/react-icons';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

export default function HeroSection() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center py-0 px-4 md:py-32 md:px-8 bg-gradient-to-b from-black/30 to-black/5 relative overflow-hidden mt-0">
      <Helmet>
        <meta name="description" content="Impulsa tu negocio con nuestras soluciones web profesionales. Desarrollo de aplicaciones web modernas y eficientes." />
        <meta name="keywords" content="desarrollo web, aplicaciones web, soluciones digitales, transformación digital" />
        <meta property="og:title" content="Impulsa tu Negocio con Soluciones Web Profesionales" />
        <meta property="og:description" content="Descubre cómo nuestras soluciones de desarrollo web pueden transformar tu negocio y llevarlo al siguiente nivel." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://weblisy.com/#hero" />
        <meta name="twitter:title" content="Impulsa tu Negocio con Soluciones Web Profesionales" />
        <meta name="twitter:description" content="Descubre cómo nuestras soluciones de desarrollo web pueden transformar tu negocio y llevarlo al siguiente nivel." />
      </Helmet>

      <div className="absolute -z-10 inset-0 h-full w-full bg-gradient-to-br from-black to-slate-900">
        <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,#3b82f680_0deg,#10b98180_72deg,#6366f180_144deg,#8b5cf680_216deg,#ec489980_288deg,#3b82f680_360deg)] animate-[spin_10s_linear_infinite] blur-[75px]"></div>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.07)_2px,transparent_2px),linear-gradient(90deg,rgba(255,255,255,0.07)_2px,transparent_2px)] bg-[size:40px_40px]"></div>
      </div>
      
      <div className="container mx-auto max-w-6xl relative z-10 flex flex-col items-center justify-center text-center">
        <div className="grid grid-cols-1 gap-12 items-center justify-items-center" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="200">
          <div className="animate-fade-in">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white flex items-center justify-center gap-3">
                <RocketIcon className="w-12 h-12 text-blue-500" aria-hidden="true" />
                Impulsa tu Negocio
                <StarIcon className="w-12 h-12 text-yellow-500" aria-hidden="true" />
              </h1>
              <span className="block text-white opacity-80 text-2xl md:text-3xl mt-2 font-light">
                Innovación y Eficiencia a tu Alcance
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-white opacity-80 mb-8"
            >
              Descubre cómo nuestras soluciones de desarrollo web pueden transformar tu negocio y llevarlo al siguiente nivel.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full"
            >
              <a href="#pricingSection" className="w-full sm:w-auto flex" aria-label="Explorar soluciones de desarrollo web">
                <Button className="w-full md:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all ease-in-out duration-300 transform hover:shadow-lg py-3 text-sm h-auto rounded-full flex items-center gap-2">
                  <CodeIcon className="w-5 h-5" aria-hidden="true" />
                  Explorar Soluciones
                </Button>
              </a>
              <a href="#contacto" className="w-full sm:w-auto flex" aria-label="Contactar con WebLisy">
                <Button
                  variant="outline"
                  className="w-full md:w-auto border-2 border-white/20 text-white hover:bg-white/10 transition-all ease-in-out duration-300 transform hover:shadow-lg py-3 text-sm h-auto rounded-full"
                >
                  Contáctanos
                </Button>
              </a>
            </motion.div>
          </div>
          <div className="relative animate-float">
         
          </div>
        </div>
      </div>
    </section>
  );
} 