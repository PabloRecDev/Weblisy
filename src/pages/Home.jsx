import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import LatestBlogPosts from '../components/LatestBlogPosts';
import PricingSection from '../components/PricingSection';
import ContactSection from '../components/ContactSection';
import ParticleBackground from '../components/ParticleBackground';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  out: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: "easeIn"
    }
  }
};

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Weblisy - Agencia de Desarrollo Web, Apps y SEO en España</title>
        <meta name="description" content="Agencia experta en desarrollo web, aplicaciones a medida y tiendas online. Diseño moderno, SEO avanzado, velocidad y soporte premium. ¡Haz crecer tu negocio digital con Weblisy!" />
        <meta name="keywords" content="desarrollo web profesional, agencia diseño web, aplicaciones web a medida, tiendas online, ecommerce, SEO en España, optimización web, páginas web rápidas, soporte web, desarrollo React, desarrollo Node.js, diseño web moderno, agencia digital, web corporativa, web para empresas, web personalizada" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Weblisy - Agencia de Desarrollo Web, Apps y SEO en España" />
        <meta property="og:description" content="Desarrollo de webs, apps y tiendas online con diseño moderno, SEO y soporte premium. ¡Transforma tu presencia digital!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://weblisy.es" />
        <meta property="og:image" content="https://weblisy.es/assets/Weblisy-logo-fondo.png" />
        <meta property="og:image:alt" content="Logo Weblisy - Agencia de desarrollo web y apps" />
        <meta property="og:site_name" content="Weblisy" />
        <meta property="og:locale" content="es_ES" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Weblisy - Agencia de Desarrollo Web, Apps y SEO en España" />
        <meta name="twitter:description" content="Desarrollo de webs, apps y tiendas online con diseño moderno, SEO y soporte premium." />
        <meta name="twitter:image" content="https://weblisy.es/assets/Weblisy-logo-fondo.png" />
        <meta name="twitter:image:alt" content="Logo Weblisy - Agencia de desarrollo web y apps" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://weblisy.es" />
        
        {/* Additional SEO */}
        <meta name="author" content="Weblisy" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#038e42" />
      </Helmet>
      
      <motion.div
        className="min-h-screen relative overflow-hidden"
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900 to-black"></div>
        
        <ParticleBackground 
          particleCount={30}
          colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)', 'rgba(255,255,255,0.1)']}
          className="opacity-30"
        />
        
        <div className="relative z-10">
          <HeroSection />
          <FeaturesSection />
          <TestimonialsSection />
          <LatestBlogPosts />
          <PricingSection />
          <ContactSection/>
        </div>
      </motion.div>
    </>
  );
};

export default HomePage; 