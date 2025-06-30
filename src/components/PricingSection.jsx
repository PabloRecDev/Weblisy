import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckIcon, StarIcon, ArrowRightIcon, RocketIcon, Component1Icon, GearIcon } from '@radix-ui/react-icons';
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
      boxShadow: "0 20px 40px rgba(3, 142, 66, 0.3)",
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
      name: "Sitio Web Esencial",
      price: "299€",
      period: "pago único",
      description: "La presencia online profesional que tu negocio necesita para empezar a destacar.",
      features: [
        "Diseño 100% personalizado",
        "Hasta 5 secciones (Inicio, Sobre nosotros, etc.)",
        "Adaptado a móviles y tabletas",
        "Formulario de contacto funcional",
        "Optimización SEO básica inicial",
        "Carga rápida y rendimiento optimizado",
        "1 año de Hosting y Dominio gratis"
      ],
      popular: false,
      buttonText: "Empezar Proyecto",
      isQuote: false,
      oldPrice: "599€",
      offerBadge: true,
      icon: Component1Icon,
      gradient: "from-blue-500/20 to-purple-500/20"
    },
    {
      name: "Aplicación a Medida",
      price: "Desde 1.999€",
      period: "según proyecto",
      description: "Soluciones a medida para optimizar tus procesos. Ideal para CRMs, ERPs, o sistemas de gestión.",
      features: [
        "Análisis y consultoría de requisitos",
        "Desarrollo de lógica de negocio compleja",
        "Panel de administración a medida",
        "Base de datos escalable y segura",
        "Integración con APIs y servicios de terceros",
        "Fases de Testing y QA (Control de calidad)",
        "Soporte y formación para el equipo"
      ],
      popular: true,
      buttonText: "Solicitar Presupuesto",
      isQuote: true,
      icon: RocketIcon,
      gradient: "from-[#038e42]/20 to-emerald-500/20"
    },
    {
      name: "E-commerce",
      price: "Desde 999€",
      period: "según funcionalidades",
      description: "Una tienda online robusta y optimizada para convertir visitantes en clientes.",
      features: [
        "Diseño de tienda único y atractivo",
        "Catálogo de productos ilimitado",
        "Integración con pasarelas de pago (Stripe, etc.)",
        "Gestión de inventario y pedidos",
        "Optimización para la conversión (CRO)",
        "Fichas de producto optimizadas para SEO",
        "Proceso de compra (checkout) seguro y fácil"
      ],
      popular: false,
      buttonText: "Solicitar Presupuesto",
      isQuote: true,
      icon: GearIcon,
      gradient: "from-orange-500/20 to-red-500/20"
    }
  ];

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
          className="absolute w-1 h-1 bg-[#038e42]/30 rounded-full"
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
            <span className="bg-gradient-to-r from-[#038e42] to-emerald-400 bg-clip-text text-transparent">
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
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => (
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
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-[#038e42] to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full z-20 flex items-center gap-1"
                >
                  <StarIcon className="w-3 h-3" />
                  Más Popular
                </motion.div>
              )}

              <motion.div
                className={`relative p-8 rounded-3xl border transition-all duration-300 ${
                  plan.popular 
                    ? 'bg-gradient-to-br from-white/10 to-white/5 border-[#038e42]/30 shadow-2xl shadow-[#038e42]/20' 
                    : 'bg-gradient-to-br from-white/5 to-white/10 border-white/10 hover:border-[#038e42]/30'
                }`}
                whileHover={{ 
                  boxShadow: plan.popular 
                    ? "0 25px 50px rgba(3, 142, 66, 0.3)" 
                    : "0 20px 40px rgba(0, 0, 0, 0.3)"
                }}
              >
                {/* Icono del plan */}
                <motion.div
                  className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center border border-white/10`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <plan.icon className="w-8 h-8 text-[#038e42]" />
                </motion.div>

                {/* Nombre del plan */}
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                
                {/* Descripción */}
                <p className="text-white/70 text-sm mb-6">{plan.description}</p>

                {/* Precio */}
                <div className="mb-6">
                  <motion.div
                    variants={priceVariants}
                    className="flex items-baseline gap-2"
                  >
                    {plan.oldPrice && (
                      <span className="text-white/50 line-through text-lg">{plan.oldPrice}</span>
                    )}
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                  </motion.div>
                  <p className="text-white/60 text-sm">{plan.period}</p>
                </div>

                {/* Características */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={feature}
                      variants={featureVariants}
                      className="flex items-start gap-3 text-white/80 text-sm"
                    >
                      <CheckIcon className="w-5 h-5 text-[#038e42] mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Botón */}
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="w-full"
                >
                  {plan.isQuote ? (
                    <Link
                      to="/presupuesto"
                      className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-[#038e42] to-emerald-500 text-white hover:from-[#038e42]/90 hover:to-emerald-500/90'
                          : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                      }`}
                    >
                      {plan.buttonText}
                      <ArrowRightIcon className="w-5 h-5" />
                    </Link>
                  ) : (
                    <Link
                      to="/agendar"
                      className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-[#038e42] to-emerald-500 text-white hover:from-[#038e42]/90 hover:to-emerald-500/90'
                          : 'bg-white/10 text-white border border-white/20 hover:bg-white/20'
                      }`}
                    >
                      {plan.buttonText}
                      <ArrowRightIcon className="w-5 h-5" />
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
            ¿Necesitas algo personalizado? <Link to="/contacto" className="text-[#038e42] hover:underline">Contáctanos</Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
