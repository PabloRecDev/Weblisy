import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import LatestBlogPosts from '../components/LatestBlogPosts';
import PricingSection from '../components/PricingSection';
import ContactSection from '../components/ContactSection';
import ParticleBackground from '../components/ParticleBackground';
import { 
  RocketIcon, 
  StarIcon, 
  CheckIcon, 
  ArrowRightIcon,
  CalendarIcon,
  EnvelopeClosedIcon,
  GlobeIcon,
  Component1Icon,
  PersonIcon,
  GearIcon,
  CubeIcon,
  LightningBoltIcon
} from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

// Animaciones personalizadas
const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const rotateAnimation = {
  rotate: [0, 360],
  transition: {
    duration: 20,
    repeat: Infinity,
    ease: "linear"
  }
};

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

// Componente Banner Promocional
const PromotionalBanner = () => {
  const ref = useRef(null);
  const isInView = useInViewCustom(ref);

  return (
    <section ref={ref} className="py-12 px-4 md:px-8 bg-dark relative overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0 bg-dark"></div>
      <div className="absolute inset-0 bg-dark"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10 ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-[#038e42]/10 border border-[#038e42]/20 text-[#00c573] text-sm font-medium mb-6"
          >
            <RocketIcon className="w-4 h-4 mr-2" />
            Soluciones digitales Weblisy
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Soluciones para tu negocio
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Descubre cómo Weblisy puede impulsar tu empresa con tecnología, diseño y automatización.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 xl:gap-5 auto-rows-[1fr]"
        >
          {/* Card 1: Desarrollo Web (grande, izquierda) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05, boxShadow: '0 12px 40px #00c57333' }}
            className="bg-[#181818] border border-[#232323] rounded-2xl p-8 flex flex-col justify-between shadow-lg cursor-pointer transition-all duration-300 group relative overflow-hidden
      sm:col-span-2 sm:row-span-1
      lg:col-span-2 lg:row-span-2
      min-h-[240px] sm:min-h-[260px] lg:min-h-[340px] xl:min-h-[400px]"
          >
            <div className="flex items-center gap-3 mb-4">
              <Component1Icon className="w-10 h-10 text-[#00c573]" />
              <span className="text-2xl font-bold text-white">Desarrollo Web</span>
            </div>
            <div className="font-semibold text-white mb-2 text-lg">Sitios web profesionales</div>
            <div className="text-white/70 text-base mb-4">Webs modernas, rápidas y seguras, adaptadas a tu negocio.</div>
            {/* Mini-grid visual animado */}
            <div className="grid grid-cols-4 gap-2 mt-auto mb-2">
              {[1,2,3,4,5,6,7,8].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4, type: 'spring' }}
                  whileHover={{ scale: 1.15 }}
                  className="aspect-square rounded-lg bg-[#232323] flex items-center justify-center"
                >
                  <img src="/assets/weblisy-logo.png" alt="mini" className="w-5 h-5 opacity-60" />
                </motion.div>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity justify-center">
              <span className="text-[#00c573] font-semibold text-base">Ver más</span>
              <ArrowRightIcon className="w-5 h-5 text-[#00c573]" />
            </div>
            {/* Líneas decorativas animadas */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <motion.svg width="100%" height="100%" className="absolute inset-0" animate={{ rotate: [0, 2, -2, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}>
                <rect x="0" y="0" width="100%" height="100%" rx="18" fill="none" stroke="#00c57322" strokeDasharray="6 6" />
              </motion.svg>
            </motion.div>
          </motion.div>

          {/* Card 2: E-commerce (arriba derecha) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px #00c57333' }}
            className="bg-[#181818] border border-[#232323] rounded-2xl p-8 flex flex-col justify-between shadow-lg cursor-pointer transition-all duration-300 group relative overflow-hidden
      col-span-1 row-span-1
      lg:col-start-3 lg:row-start-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <CubeIcon className="w-8 h-8 text-[#00c573]" />
              <span className="text-lg font-bold text-white">E-commerce</span>
            </div>
            <div className="font-semibold text-white mb-2">Tiendas online que venden</div>
            <div className="text-white/70 text-sm mb-4">Tiendas online que convierten visitantes en clientes.</div>
            {/* Lista visual tipo endpoints animada */}
            <div className="flex flex-col gap-1 mt-auto mb-2">
              {["/productos","/carrito","/checkout","/clientes"].map((endpoint, idx) => (
                <motion.div
                  key={endpoint}
                  initial={{ x: -20, opacity: 0 }}
                  animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                  transition={{ delay: 0.2 + idx * 0.08, duration: 0.3 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-5 h-5 bg-[#232323] rounded flex items-center justify-center"><CubeIcon className="w-3 h-3 text-[#00c573]" /></div>
                  <span className="text-xs text-white/70">{endpoint}</span>
                </motion.div>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity justify-center">
              <span className="text-[#00c573] font-semibold text-sm">Ver más</span>
              <ArrowRightIcon className="w-4 h-4 text-[#00c573]" />
            </div>
            {/* Líneas decorativas */}
            <div className="absolute inset-0 pointer-events-none">
              <svg width="100%" height="100%" className="absolute inset-0">
                <rect x="0" y="0" width="100%" height="100%" rx="18" fill="none" stroke="#00c57322" strokeDasharray="6 6" />
              </svg>
            </div>
          </motion.div>

          {/* Card 3: Mantenimiento Web (arriba derecha) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px #00c57333' }}
            className="bg-[#181818] border border-[#232323] rounded-2xl p-8 flex flex-col justify-between shadow-lg cursor-pointer transition-all duration-300 group relative overflow-hidden
      col-span-1 row-span-1
      lg:col-start-4 lg:row-start-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <GearIcon className="w-8 h-8 text-[#006239]" />
              <span className="text-lg font-bold text-white">Mantenimiento Web</span>
            </div>
            <div className="font-semibold text-white mb-2">Soporte y seguridad</div>
            <div className="text-white/70 text-sm mb-4">Actualizaciones, backups y soporte 24/7 para tu web.</div>
            {/* Grid de archivos visual animado */}
            <div className="grid grid-cols-4 gap-1 mt-auto mb-2">
              {[1,2,3,4,5,6,7,8].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
                  transition={{ delay: 0.2 + i * 0.04, duration: 0.3, type: 'spring' }}
                  whileHover={{ scale: 1.15 }}
                  className="aspect-square rounded bg-[#232323] flex items-center justify-center"
                >
                  <GearIcon className="w-3 h-3 text-[#006239] opacity-60" />
                </motion.div>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity justify-center">
              <span className="text-[#00c573] font-semibold text-sm">Ver más</span>
              <ArrowRightIcon className="w-4 h-4 text-[#00c573]" />
            </div>
            {/* Líneas decorativas */}
            <div className="absolute inset-0 pointer-events-none">
              <svg width="100%" height="100%" className="absolute inset-0">
                <rect x="0" y="0" width="100%" height="100%" rx="18" fill="none" stroke="#00c57322" strokeDasharray="6 6" />
              </svg>
            </div>
          </motion.div>

          {/* Card 4: Automatización (abajo derecha) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px #00c57333' }}
            className="bg-[#181818] border border-[#232323] rounded-2xl p-8 flex flex-col justify-between shadow-lg cursor-pointer transition-all duration-300 group relative overflow-hidden
      col-span-1 row-span-1
      lg:col-start-3 lg:row-start-2"
          >
            <div className="flex items-center gap-3 mb-4">
              <LightningBoltIcon className="w-8 h-8 text-[#00c573]" />
              <span className="text-lg font-bold text-white">Automatización</span>
            </div>
            <div className="font-semibold text-white mb-2">Optimización de procesos</div>
            <div className="text-white/70 text-sm mb-4">Automatiza tareas y mejora la eficiencia de tu negocio digital.</div>
            {/* Dots visuales tipo tech animados */}
            <div className="flex flex-wrap gap-1 mt-auto mb-2">
              {[...Array(16)].map((_,i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0.5, scale: 1 }}
                  animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1, repeatType: 'reverse' }}
                  className="w-2 h-2 rounded-full bg-[#00c573]/30 inline-block"
                ></motion.span>
              ))}
            </div>
            <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity justify-center">
              <span className="text-[#00c573] font-semibold text-sm">Ver más</span>
              <ArrowRightIcon className="w-4 h-4 text-[#00c573]" />
            </div>
            {/* Líneas decorativas */}
            <div className="absolute inset-0 pointer-events-none">
              <svg width="100%" height="100%" className="absolute inset-0">
                <rect x="0" y="0" width="100%" height="100%" rx="18" fill="none" stroke="#00c57322" strokeDasharray="6 6" />
              </svg>
            </div>
          </motion.div>

          {/* Card 5: Aplicaciones a Medida (abajo derecha) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.04, boxShadow: '0 8px 32px #00c57333' }}
            className="bg-[#181818] border border-[#232323] rounded-2xl p-8 flex flex-col justify-between shadow-lg cursor-pointer transition-all duration-300 group relative overflow-hidden
      col-span-1 row-span-1
      lg:col-start-4 lg:row-start-2"
          >
            <div className="flex items-center gap-3 mb-4">
              <RocketIcon className="w-10 h-10 text-[#038e42]" />
              <span className="text-2xl font-bold text-white">Aplicaciones a Medida</span>
            </div>
            <div className="font-semibold text-white mb-2 text-lg">Soluciones personalizadas</div>
            <div className="text-white/70 text-base mb-4">Desarrollos únicos para necesidades específicas de tu empresa.</div>
            {/* Diagrama visual animado */}
            <motion.svg width="70" height="50" className="mx-auto mt-auto mb-2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.7 }}
            >
              <motion.rect x="5" y="10" width="15" height="20" rx="3" fill="#00c57322" stroke="#00c573"
                animate={{ y: [10, 5, 10] }} transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', delay: 0.2 }}
              />
              <motion.rect x="25" y="5" width="15" height="30" rx="3" fill="#00c57322" stroke="#00c573"
                animate={{ y: [5, 15, 5] }} transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', delay: 0.4 }}
              />
              <motion.rect x="45" y="15" width="10" height="10" rx="2" fill="#00c57322" stroke="#00c573"
                animate={{ y: [15, 10, 15] }} transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', delay: 0.6 }}
              />
            </motion.svg>
            <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity justify-center">
              <span className="text-[#00c573] font-semibold text-base">Ver más</span>
              <ArrowRightIcon className="w-5 h-5 text-[#00c573]" />
            </div>
            {/* Líneas decorativas */}
            <div className="absolute inset-0 pointer-events-none">
              <svg width="100%" height="100%" className="absolute inset-0">
                <rect x="0" y="0" width="100%" height="100%" rx="18" fill="none" stroke="#00c57322" strokeDasharray="6 6" />
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const HomePage = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

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
      
      <div className="min-h-screen relative overflow-hidden bg-black">
        {/* Fondo dinámico con gradientes animados */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black"
          animate={{
            background: [
              "linear-gradient(45deg, #000000, #1a1a1a, #000000)",
              "linear-gradient(135deg, #000000, #111111, #000000)",
              "linear-gradient(225deg, #000000, #1a1a1a, #000000)",
              "linear-gradient(315deg, #000000, #111111, #000000)",
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Partículas mejoradas */}
        <ParticleBackground 
          particleCount={50}
          colors={[
            'rgba(3, 142, 66, 0.3)', 
            'rgba(255, 255, 255, 0.1)', 
            'rgba(3, 142, 66, 0.2)', 
            'rgba(255, 255, 255, 0.05)'
          ]}
          className="opacity-40"
        />
        

        
        {/* Elementos flotantes decorativos */}
        <motion.div
          className="absolute top-20 left-10 w-4 h-4 bg-[#038e42]/20 rounded-full"
          animate={floatingAnimation}
        />
        <motion.div
          className="absolute top-40 right-20 w-6 h-6 bg-white/10 rounded-full"
          animate={floatingAnimation}
          transition={{ delay: 1 }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-3 h-3 bg-[#038e42]/30 rounded-full"
          animate={floatingAnimation}
          transition={{ delay: 2 }}
        />
        
        {/* Círculo rotatorio decorativo */}
        <motion.div
          className="absolute top-1/2 right-10 w-32 h-32 border border-[#038e42]/20 rounded-full"
          animate={rotateAnimation}
        />
        
        <div className="relative z-10">
          {/* Hero Section mejorado */}
          <HeroSection />
          
          {/* Banner Promocional - Nuevas Ofertas */}
          <PromotionalBanner />
          
          {/* Nueva sección: Estadísticas animadas */}
          <StatsSection />
          
          {/* Features Section (Proceso de trabajo) */}
          <FeaturesSection />
          
          {/* Nueva sección: Por qué elegirnos */}
          <WhyChooseUsSection />
          
          {/* Nueva sección: Tecnologías */}
          {/* <TechnologiesSection /> */}
          
          {/* Pricing Section */}
          <PricingSection />
          
          {/* Testimonials Section */}
          <TestimonialsSection />
          
          {/* Latest Blog Posts */}
          <LatestBlogPosts />
          
          {/* Nueva sección: CTA mejorado */}
          <EnhancedCTASection />
          
          {/* Contact Section */}
          <ContactSection />
        </div>
      </div>
    </>
  );
};

// Nueva sección: Estadísticas animadas
const StatsSection = () => {
  const ref = useRef(null);
  const inView = useInViewCustom(ref);
  
  const stats = [
    { number: 50, suffix: "+", label: "Proyectos Completados", icon: RocketIcon },
    { number: 98, suffix: "%", label: "Clientes Satisfechos", icon: StarIcon },
    { number: 24, suffix: "h", label: "Tiempo de Respuesta", icon: RocketIcon },
    { number: 100, suffix: "%", label: "Código Limpio", icon: CheckIcon },
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto max-w-6xl"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#00c573]/20 to-[#00c573]/10 rounded-2xl flex items-center justify-center border border-[#00c573]/20"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <stat.icon className="w-8 h-8 text-[#00c573]" />
              </motion.div>
              <motion.div
                className="text-3xl md:text-4xl font-bold text-white mb-2"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : { scale: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3, type: "spring" }}
              >
                {stat.number}{stat.suffix}
              </motion.div>
              <p className="text-white/70 text-sm md:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

// Nueva sección: Por qué elegirnos
const WhyChooseUsSection = () => {
  const ref = useRef(null);
  const inView = useInViewCustom(ref);
  
  const reasons = [
    {
      icon: Component1Icon,
      title: "Enfoque en Resultados",
      description: "No solo creamos webs bonitas, creamos soluciones que generan resultados medibles para tu negocio."
    },
    {
      icon: GearIcon,
      title: "Seguridad Garantizada",
      description: "Implementamos las mejores prácticas de seguridad para proteger tu aplicación y datos de usuarios."
    },
    {
      icon: GlobeIcon,
      title: "Soporte 24/7",
      description: "Estamos aquí para ti cuando lo necesites. Soporte técnico disponible en cualquier momento."
    },
    {
      icon: RocketIcon,
      title: "Rendimiento Óptimo",
      description: "Optimizamos cada aspecto para garantizar tiempos de carga ultrarrápidos y experiencia fluida."
    }
  ];

  return (
    <section className="py-20 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Por qué elegir <span className="text-[#00c573]">Weblisy</span>?
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Somos más que una agencia de desarrollo web. Somos tu socio digital para el éxito.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <motion.div
                className="p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border border-white/10 hover:border-[#00c573]/30 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-[#00c573]/20 to-[#00c573]/10 rounded-xl flex items-center justify-center flex-shrink-0"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <reason.icon className="w-6 h-6 text-[#00c573]" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{reason.title}</h3>
                    <p className="text-white/70">{reason.description}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Nueva sección: Tecnologías - COMENTADA TEMPORALMENTE
// const TechnologiesSection = () => {
//   // Componente comentado temporalmente
// };

// Nueva sección: CTA mejorado
const EnhancedCTASection = () => {
  const ref = useRef(null);
  const inView = useInViewCustom(ref);

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Elementos decorativos de fondo más llamativos */}
      <motion.div
        className="absolute top-10 left-5 w-40 h-40 bg-[#00c573]/20 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.7, 0.3],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-10 right-5 w-48 h-48 bg-[#00c573]/15 rounded-full blur-3xl"
        animate={{ 
          scale: [1.3, 1, 1.3],
          opacity: [0.2, 0.6, 0.2],
          rotate: [360, 180, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      {/* Partículas flotantes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#00c573]/40 rounded-full"
          style={{
            left: `${15 + i * 12}%`,
            top: `${20 + (i % 2) * 60}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeInOut"
          }}
        />
      ))}

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto max-w-6xl text-center relative z-10"
      >
        <motion.div
          className="relative p-10 md:p-16 lg:p-20 bg-gradient-to-br from-[#00c573]/10 via-white/5 to-[#00c573]/5 backdrop-blur-xl border-2 border-[#00c573]/30 rounded-3xl overflow-hidden shadow-2xl shadow-[#00c573]/20"
          whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(0, 197, 115, 0.3)" }}
          transition={{ duration: 0.4 }}
        >
          {/* Efecto de brillo mejorado */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00c573]/20 to-transparent"
            animate={{ x: ["-100%", "200%"] }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          
          {/* Líneas decorativas animadas */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.svg width="100%" height="100%" className="absolute inset-0" animate={{ rotate: [0, 2, -2, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}>
              <rect x="0" y="0" width="100%" height="100%" rx="24" fill="none" stroke="#00c57322" strokeDasharray="8 8" strokeWidth="2" />
            </motion.svg>
          </motion.div>
          
          <div className="relative z-10">
            {/* Badge promocional */}
            <motion.div
              className="inline-flex items-center px-6 py-3 rounded-full bg-[#00c573]/20 border border-[#00c573]/30 text-[#00c573] text-sm font-semibold mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <RocketIcon className="w-4 h-4 mr-2" />
              ¡Oferta Especial Disponible!
            </motion.div>
            
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              ¿Listo para <span className="text-[#00c573] bg-gradient-to-r from-[#00c573] to-[#038e42] bg-clip-text text-transparent">transformar</span> tu 
              <br className="hidden md:block" />
              <span className="text-[#00c573]">presencia digital</span>?
            </motion.h2>
            
            <motion.p
              className="text-white/90 text-xl md:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Únete a más de <span className="text-[#00c573] font-bold">50 empresas</span> que ya confían en Weblisy. 
              <br className="hidden md:block" />
              <span className="text-[#00c573] font-semibold">¡Comienza tu proyecto hoy mismo!</span>
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-center items-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.div
                whileHover={{ scale: 1.08, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link
                  to="/agendar"
                  className="inline-flex items-center justify-center gap-4 px-10 py-5 bg-gradient-to-r from-[#00c573] via-[#00c573] to-[#038e42] text-white font-bold rounded-2xl text-xl shadow-2xl hover:shadow-[#00c573]/40 hover:shadow-3xl transition-all duration-300 group w-full sm:w-auto relative overflow-hidden"
                >
                  {/* Efecto de brillo en el botón */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <CalendarIcon className="w-6 h-6 relative z-10" />
                  <span className="relative z-10">¡Agendar Consulta Gratuita!</span>
                  <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto"
              >
                <Link
                  to="/contacto"
                  className="inline-flex items-center justify-center gap-4 px-10 py-5 bg-white/15 text-white font-bold rounded-2xl text-xl border-2 border-white/30 hover:bg-white/25 hover:border-white/50 transition-all duration-300 group w-full sm:w-auto backdrop-blur-sm relative overflow-hidden"
                >
                  <EnvelopeClosedIcon className="w-6 h-6" />
                  <span>Contactar Ahora</span>
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Beneficios destacados */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {[
                { icon: CheckIcon, text: "Respuesta en 24h", color: "#00c573" },
                { icon: StarIcon, text: "Consulta gratuita", color: "#00c573" },
                { icon: RocketIcon, text: "Sin compromiso", color: "#00c573" }
              ].map((benefit, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center justify-center gap-3 p-4 bg-white/10 rounded-xl border border-white/20 hover:border-[#00c573]/40 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <benefit.icon className="w-5 h-5 text-[#00c573] flex-shrink-0" />
                  <span className="text-white/90 font-medium">{benefit.text}</span>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Texto adicional llamativo */}
            <motion.p
              className="text-[#00c573] text-lg font-semibold mt-8"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              ⚡ ¡No pierdas la oportunidad de destacar en el mundo digital!
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HomePage; 