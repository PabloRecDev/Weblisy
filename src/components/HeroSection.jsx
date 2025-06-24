import React from 'react';
import { motion } from 'framer-motion';
import { StarIcon, RocketIcon } from '@radix-ui/react-icons';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] px-4 py-10 md:py-24">
      {/* Fondo animado sutil */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-[#038e42]/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 right-1/4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
      </div>

      <div className="w-full max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-center gap-10 md:gap-20 relative z-10">
        {/* Columna izquierda: texto */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          {/* Logo o badge de confianza (opcional) */}
          {/* <img src="/assets/weblisy-logo.png" alt="Logo Weblisy" className="w-16 h-16 mb-4" /> */}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white leading-tight"
          >
            Lleva tu negocio al siguiente <span className="text-[#038e42]">nivel</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base xs:text-lg sm:text-xl md:text-2xl text-white/80 mb-6 max-w-xl"
          >
            Webs profesionales, rápidas y que convierten visitantes en clientes.
          </motion.p>

          <motion.a
            href="#pricingSection"
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 bg-[#038e42] text-white font-bold rounded-xl text-lg shadow-xl hover:bg-[#038e42]/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#038e42] transition-all duration-300 mb-6"
            aria-label="Quiero mi web o aplicación profesional"
          >
            ¡Quiero mi web o app profesional!
          </motion.a>

          {/* Estadísticas */}
          <div className="flex gap-4 justify-center md:justify-start items-center text-white/90 text-base mt-2">
            <span className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10"><StarIcon className="w-5 h-5 text-yellow-400" aria-hidden="true" /> 100% personalizado</span>
            <span className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10"><RocketIcon className="w-5 h-5 text-[#038e42]" aria-hidden="true" /> 20+ proyectos</span>
          </div>
        </div>
        {/* Columna derecha: mockup visual (solo visible en desktop) */}
        <div className="hidden md:flex flex-1 items-center justify-center w-auto">
          <div className="relative w-full max-w-md aspect-video bg-white/5 rounded-2xl border border-white/10 shadow-lg overflow-hidden flex items-center justify-center">
            <img src="/assets/navesylocales.png" alt="Mockup de sitio web profesional desarrollado por Weblisy" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>
    </section>
  );
} 