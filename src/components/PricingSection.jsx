import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckIcon, StarIcon, ArrowRightIcon, RocketIcon, Component1Icon, GearIcon, CursorArrowIcon, CubeIcon, LightningBoltIcon, LayersIcon, GlobeIcon, ChatBubbleIcon, PersonIcon } from '@radix-ui/react-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

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

export default function PricingSection() {
  const ref = useRef(null);
  const isInView = useInViewCustom(ref);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const [isAnnual, setIsAnnual] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(0, 98, 57, 0.3)",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const featureVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  const priceVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: "backOut"
      }
    }
  };

  const plans = [
    {
      name: "Sitio Web Básico",
      price: "199€",
      period: "pago único",
      description: "Presencia online profesional para pequeños negocios que quieren empezar.",
      features: [
        "Diseño responsive personalizado",
        "Hasta 3 secciones principales",
        "Formulario de contacto",
        "Optimización SEO básica",
        "Carga rápida garantizada",
        "6 meses de hosting incluido",
        "Soporte técnico básico"
      ],
      popular: false,
      buttonText: "Empezar Proyecto",
      isQuote: false,
      oldPrice: "399€",
      offerBadge: true,
      icon: Component1Icon,
      gradient: "from-blue-500/20 to-cyan-500/20",
      category: "básico"
    },
    {
      name: "Sitio Web Profesional",
      price: "399€",
      period: "pago único",
      description: "Sitio web completo con funcionalidades avanzadas para empresas en crecimiento.",
      features: [
        "Diseño 100% personalizado",
        "Hasta 8 secciones dinámicas",
        "Blog integrado",
        "Optimización SEO avanzada",
        "Integración con redes sociales",
        "1 año de hosting y dominio",
        "Soporte técnico prioritario"
      ],
      popular: true,
      buttonText: "Empezar Proyecto",
      isQuote: false,
      oldPrice: "699€",
      offerBadge: true,
      icon: GlobeIcon,
      gradient: "from-purple-500/20 to-pink-500/20",
      category: "profesional"
    },
    {
      name: "Sitio Web con IA",
      price: "599€",
      period: "pago único",
      description: "Sitio web inteligente con chatbot IA para mejorar la experiencia del cliente.",
      features: [
        "Todo del plan Profesional",
        "Chatbot inteligente integrado",
        "Asistente IA personalizado",
        "Integración WhatsApp Business",
        "Análisis de conversaciones",
        "Respuestas automáticas",
        "Optimización continua con IA"
      ],
      popular: false,
      buttonText: "Empezar Proyecto",
      isQuote: false,
      icon: ChatBubbleIcon,
      gradient: "from-emerald-500/20 to-teal-500/20",
      category: "ia"
    },
    {
      name: "Marca Personal Pro",
      price: "249€",
      period: "pago único",
      description: "Solución completa para emprendedores que quieren construir su marca personal y captar clientes.",
      features: [
        "Sitio web de marca personal",
        "CRM integrado para leads",
        "Formularios de captación",
        "Blog para posicionamiento",
        "Integración redes sociales",
        "Panel de gestión de clientes",
        "Formulario de contacto optimizado",
        "1 año hosting + dominio",
        "Formación en uso del CRM"
      ],
      popular: false,
      buttonText: "Construir mi Marca",
      isQuote: false,
      oldPrice: "499€",
      offerBadge: true,
      icon: PersonIcon,
      gradient: "from-amber-500/20 to-yellow-500/20",
      category: "marca-personal"
    },
    {
      name: "CV Master",
      price: "Gratis",
      period: "versión básica",
      description: "Creador de CV profesional con IA. Genera CVs, cartas de presentación y perfiles de LinkedIn.",
      features: [
        "Plantillas de CV profesionales",
        "Generador de carta con IA",
        "Editor visual intuitivo",
        "Exportación a PDF",
        "Perfil de LinkedIn optimizado",
        "Consejos personalizados con IA",
        "Análisis ATS incluido"
      ],
      popular: false,
      buttonText: "Probar Gratis",
      isQuote: false,
      icon: PersonIcon,
      gradient: "from-violet-500/20 to-purple-500/20",
      category: "herramientas",
      isExternal: true,
      externalUrl: "/cv-master"
    },
    {
      name: "E-commerce Básico",
      price: "899€",
      period: "pago único",
      description: "Tienda online completa para empezar a vender online de forma profesional.",
      features: [
        "Diseño de tienda personalizado",
        "Hasta 100 productos",
        "Pasarela de pago segura",
        "Gestión de inventario",
        "Optimización para conversión",
        "Certificado SSL incluido",
        "1 año de hosting premium"
      ],
      popular: false,
      buttonText: "Solicitar Presupuesto",
      isQuote: true,
      oldPrice: "1.299€",
      offerBadge: true,
      icon: CubeIcon,
      gradient: "from-orange-500/20 to-red-500/20",
      category: "ecommerce"
    },
    {
      name: "E-commerce Premium",
      price: "1.299€",
      period: "pago único",
      description: "Tienda online avanzada con funcionalidades premium para negocios establecidos.",
      features: [
        "Todo del E-commerce Básico",
        "Productos ilimitados",
        "Múltiples pasarelas de pago",
        "Sistema de cupones y descuentos",
        "Integración con marketplaces",
        "Panel de administración avanzado",
        "Soporte técnico 24/7"
      ],
      popular: false,
      buttonText: "Solicitar Presupuesto",
      isQuote: true,
      icon: LightningBoltIcon,
      gradient: "from-yellow-500/20 to-orange-500/20",
      category: "ecommerce"
    },
    {
      name: "Aplicación Web",
      price: "Desde 1.999€",
      period: "según proyecto",
      description: "Aplicaciones web a medida para optimizar procesos empresariales específicos.",
      features: [
        "Análisis de requisitos completo",
        "Desarrollo de lógica de negocio",
        "Panel de administración a medida",
        "Base de datos escalable",
        "Integración con APIs externas",
        "Testing y control de calidad",
        "Soporte y formación incluidos"
      ],
      popular: false,
      buttonText: "Solicitar Presupuesto",
      isQuote: true,
      icon: LayersIcon,
      gradient: "from-indigo-500/20 to-purple-500/20",
      category: "aplicacion"
    },
    {
      name: "Sistema Empresarial",
      price: "Desde 3.999€",
      period: "según proyecto",
      description: "Sistemas complejos como CRMs, ERPs o plataformas de gestión empresarial.",
      features: [
        "Consultoría estratégica completa",
        "Arquitectura de sistema compleja",
        "Múltiples módulos integrados",
        "Base de datos empresarial",
        "Integración con sistemas legacy",
        "Implementación y migración",
        "Soporte y mantenimiento continuo"
      ],
      popular: false,
      buttonText: "Solicitar Presupuesto",
      isQuote: true,
      icon: RocketIcon,
      gradient: "from-[#006239]/20 to-emerald-500/20",
      category: "empresarial"
    }
  ];

  // Agrupar planes por categoría
  const planCategories = {
    all: plans,
    basic: plans.filter(plan => plan.category === "básico"),
    professional: plans.filter(plan => plan.category === "profesional"),
    ia: plans.filter(plan => plan.category === "ia"),
    'marca-personal': plans.filter(plan => plan.category === "marca-personal"),
    tools: plans.filter(plan => plan.category === "herramientas"),
    ecommerce: plans.filter(plan => plan.category === "ecommerce"),
    application: plans.filter(plan => plan.category === "aplicacion"),
    enterprise: plans.filter(plan => plan.category === "empresarial")
  };

  // Obtener planes filtrados
  const filteredPlans = planCategories[selectedCategory] || plans;

  return (
    <section
      ref={ref}
      id='pricingSection'
      className="py-20 px-4 md:py-32 md:px-8 bg-gradient-to-b from-[#111111] to-[#0a0a0a] relative overflow-hidden"
    >
      {/* Fondo animado mejorado */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(3,142,66,0.05)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(3,142,66,0.03)_0%,transparent_50%)]"></div>
      
      {/* Partículas flotantes mejoradas */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#006239]/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 6 + 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Planes{' '}
            <span className="bg-gradient-to-r from-[#006239] to-emerald-400 bg-clip-text text-transparent">
              transparentes
            </span>
          </motion.h2>
          <motion.p 
            className="text-white/80 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Elige el plan que mejor se adapte a tus necesidades. Sin sorpresas, sin costes ocultos.
          </motion.p>
        </motion.div>

        {/* Filtros de categorías */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          {Object.keys(planCategories).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                selectedCategory === category
                              ? 'bg-gradient-to-r from-[#006239] to-emerald-500 text-white border-[#006239]/30 shadow-lg shadow-[#006239]/20'
            : 'bg-white/10 border-white/20 text-white/80 hover:bg-white/20 hover:border-[#006239]/30'
              }`}
            >
              {category === 'all' && 'Todos'}
              {category === 'basic' && 'Básicos'}
              {category === 'professional' && 'Profesionales'}
              {category === 'ia' && 'Con IA'}
              {category === 'marca-personal' && 'Marca Personal'}
              {category === 'tools' && 'Herramientas'}
              {category === 'ecommerce' && 'E-commerce'}
              {category === 'application' && 'Aplicaciones'}
              {category === 'enterprise' && 'Empresariales'}
            </button>
          ))}
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredPlans.map((plan, index) => (
            <motion.div 
              key={plan.name}
              variants={cardVariants}
              whileHover="hover"
              className={`relative group ${plan.popular ? 'lg:scale-105' : ''}`}
            >
              {/* Badge de oferta */}
              {plan.offerBadge && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.8, ease: "backOut" }}
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full z-20"
                >
                  ¡50% OFF!
                </motion.div>
              )}

              {/* Badge de popular */}
              {plan.popular && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.8, ease: "backOut" }}
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-[#006239] to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full z-20 flex items-center gap-1"
                >
                  <StarIcon className="w-3 h-3" />
                  Más Popular
                </motion.div>
              )}

              <motion.div
                className={`relative p-6 rounded-3xl border transition-all duration-300 h-full flex flex-col ${
                  plan.popular 
                                    ? 'bg-gradient-to-br from-white/10 to-white/5 border-[#006239]/30 shadow-2xl shadow-[#006239]/20'
                : 'bg-gradient-to-br from-white/5 to-white/10 border-white/10 hover:border-[#006239]/30'
                }`}
                whileHover={{ 
                  boxShadow: plan.popular 
                    ? "0 25px 50px rgba(3, 142, 66, 0.3)" 
                    : "0 20px 40px rgba(0, 0, 0, 0.3)"
                }}
              >
                {/* Icono del plan */}
                <motion.div
                  className={`w-14 h-14 mb-4 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center border border-white/10`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <plan.icon className="w-7 h-7 text-[#006239]" />
                </motion.div>

                {/* Nombre del plan */}
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                
                {/* Descripción */}
                <p className="text-white/70 text-sm mb-4 flex-grow">{plan.description}</p>

                {/* Precio */}
                <div className="mb-6">
                  <motion.div
                    variants={priceVariants}
                    className="flex items-baseline gap-2"
                  >
                    {plan.oldPrice && (
                      <span className="text-white/50 line-through text-lg">{plan.oldPrice}</span>
                    )}
                    <span className="text-3xl font-bold text-white">{plan.price}</span>
                  </motion.div>
                  <p className="text-white/60 text-sm">{plan.period}</p>
                </div>

                {/* Características */}
                <ul className="space-y-2 mb-6 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={feature}
                      variants={featureVariants}
                      className="flex items-start gap-2 text-white/80 text-xs"
                    >
                      <CheckIcon className="w-4 h-4 text-[#006239] mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Botón */}
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full mt-auto"
                >
                  {plan.isExternal ? (
                    <Link
                      to={plan.externalUrl}
                      className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-[#006239] to-emerald-500 text-white hover:from-[#006239]/90 hover:to-emerald-500/90'
                          : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                      }`}
                    >
                      {plan.buttonText}
                      <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                  ) : plan.isQuote ? (
                    <Link
                      to="/presupuesto"
                      className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-[#006239] to-emerald-500 text-white hover:from-[#006239]/90 hover:to-emerald-500/90'
                          : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                      }`}
                    >
                      {plan.buttonText}
                      <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                  ) : (
                    <Link
                      to="/agendar"
                      className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-[#006239] to-emerald-500 text-white hover:from-[#006239]/90 hover:to-emerald-500/90'
                          : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                      }`}
                    >
                      {plan.buttonText}
                      <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Información adicional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-12"
        >
          <p className="text-white/60 text-sm">
            Todos los planes incluyen soporte técnico y garantía de satisfacción. 
            <br />
            ¿Necesitas algo personalizado? <Link to="/contacto" className="text-[#006239] hover:underline">Contáctanos</Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
