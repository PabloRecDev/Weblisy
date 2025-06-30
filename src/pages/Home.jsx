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
  GearIcon
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
          
          {/* Nueva sección: Estadísticas animadas */}
          <StatsSection />
          
          {/* Features Section (Proceso de trabajo) */}
          <FeaturesSection />
          
          {/* Nueva sección: Por qué elegirnos */}
          <WhyChooseUsSection />
          
          {/* Nueva sección: Tecnologías */}
          <TechnologiesSection />
          
          {/* Testimonials Section */}
          <TestimonialsSection />
          
          {/* Latest Blog Posts */}
          <LatestBlogPosts />
          
          {/* Pricing Section */}
          <PricingSection />
          
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
                className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#038e42]/20 to-[#038e42]/10 rounded-2xl flex items-center justify-center border border-[#038e42]/20"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <stat.icon className="w-8 h-8 text-[#038e42]" />
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
            ¿Por qué elegir <span className="text-[#038e42]">Weblisy</span>?
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
                className="p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border border-white/10 hover:border-[#038e42]/30 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-[#038e42]/20 to-[#038e42]/10 rounded-xl flex items-center justify-center flex-shrink-0"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <reason.icon className="w-6 h-6 text-[#038e42]" />
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

// Nueva sección: Tecnologías
const TechnologiesSection = () => {
  const ref = useRef(null);
  const inView = useInViewCustom(ref);
  
  const technologies = [
    { 
      name: "React", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      description: "Biblioteca de JavaScript para interfaces de usuario",
      color: "#61DAFB"
    },
    { 
      name: "Node.js", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      description: "Runtime de JavaScript para desarrollo backend",
      color: "#339933"
    },
    { 
      name: "TypeScript", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      description: "Superset de JavaScript con tipado estático",
      color: "#3178C6"
    },
    { 
      name: "Next.js", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      description: "Framework de React para aplicaciones web",
      color: "#000000"
    },
    { 
      name: "Tailwind CSS", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      description: "Framework CSS utility-first",
      color: "#06B6D4"
    },
    { 
      name: "PostgreSQL", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      description: "Sistema de gestión de bases de datos",
      color: "#336791"
    },
    { 
      name: "AWS", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
      description: "Servicios en la nube de Amazon",
      color: "#FF9900"
    },
    { 
      name: "Docker", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      description: "Plataforma de contenedores",
      color: "#2496ED"
    },
    { 
      name: "MongoDB", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      description: "Base de datos NoSQL",
      color: "#47A248"
    },
    { 
      name: "Vue.js", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
      description: "Framework progresivo de JavaScript",
      color: "#4FC08D"
    },
    { 
      name: "Laravel", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg",
      description: "Framework PHP elegante",
      color: "#FF2D20"
    },
    { 
      name: "Git", 
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
      description: "Sistema de control de versiones",
      color: "#F05032"
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
            Tecnologías <span className="text-[#038e42]">Modernas</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Utilizamos las últimas tecnologías para crear aplicaciones robustas, escalables y de alto rendimiento.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <motion.div
                className="p-6 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border border-white/10 text-center hover:border-[#038e42]/30 transition-all duration-300 relative overflow-hidden"
                whileHover={{ y: -5, scale: 1.05 }}
              >
                {/* Efecto de brillo en hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                
                {/* Logo de la tecnología */}
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <img 
                      src={tech.logo} 
                      alt={`Logo de ${tech.name}`}
                      className="w-12 h-12 object-contain transition-all duration-300 group-hover:scale-110"
                    />
                  </div>
                  
                  <h3 className="text-white font-semibold text-lg mb-2">{tech.name}</h3>
                  <p className="text-white/60 text-xs leading-relaxed">{tech.description}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Información adicional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-white/60 text-sm">
            Y muchas más tecnologías modernas para adaptarnos a las necesidades específicas de tu proyecto.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// Nueva sección: CTA mejorado
const EnhancedCTASection = () => {
  const ref = useRef(null);
  const inView = useInViewCustom(ref);

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto max-w-4xl text-center"
      >
        <motion.div
          className="relative p-12 bg-gradient-to-br from-[#038e42]/10 to-[#038e42]/5 rounded-3xl border border-[#038e42]/20 overflow-hidden"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Elementos decorativos de fondo */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#038e42]/5 to-transparent"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(3, 142, 66, 0.05), transparent)",
                "linear-gradient(135deg, rgba(3, 142, 66, 0.1), transparent)",
                "linear-gradient(45deg, rgba(3, 142, 66, 0.05), transparent)",
              ]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
          
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            ¿Listo para transformar tu <span className="text-[#038e42]">presencia digital</span>?
          </motion.h2>
          
          <motion.p
            className="text-white/80 text-lg mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Únete a más de 50 empresas que ya confían en Weblisy para su desarrollo digital.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <motion.Link
              to="/agendar"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#038e42] text-white font-bold rounded-xl text-lg shadow-xl hover:bg-[#038e42]/90 transition-all duration-300 flex items-center gap-2 group"
            >
              <CalendarIcon className="w-5 h-5" />
              Agendar Consulta Gratuita
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.Link>
            <motion.Link
              to="/contacto"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 text-white font-bold rounded-xl text-lg border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center gap-2 group"
            >
              <EnvelopeClosedIcon className="w-5 h-5" />
              Contactar Ahora
            </motion.Link>
          </motion.div>
          
          <motion.div
            className="mt-8 flex justify-center items-center gap-6 text-white/60 text-sm"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <CheckIcon className="w-4 h-4 text-[#038e42]" />
              <span>Respuesta en 24h</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="w-4 h-4 text-[#038e42]" />
              <span>Consulta gratuita</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckIcon className="w-4 h-4 text-[#038e42]" />
              <span>Sin compromiso</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HomePage; 