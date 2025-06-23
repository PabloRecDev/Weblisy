import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { CheckIcon, StarIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
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
      offerBadge: true
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
      isQuote: true
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
      isQuote: true
    }
  ];

  return (
    <section
      ref={ref}
      id='pricingSection'
      className="py-20 px-4 md:py-32 md:px-8 bg-gradient-to-b from-[#111111] to-[#0a0a0a] relative overflow-hidden"
    >
      {/* Fondo animado */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,0,0,0.1)_0%,transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.1)_0%,transparent_50%)]"></div>
      
      {/* Partículas flotantes */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -50, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Planes{' '}
            <span className="bg-gradient-to-r from-[#038e42] to-[#038e42] bg-clip-text text-transparent">
              transparentes
            </span>
          </motion.h2>
          <motion.p 
            className="text-white/80 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Elige el plan que mejor se adapte a tus necesidades. 
            Todos incluyen soporte técnico y garantía de satisfacción.
          </motion.p>
        </motion.div>

        <motion.div 
          className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(3, 142, 66, 0.2)"
              }}
              className={`relative p-5 md:p-6 lg:p-5 xl:p-6 rounded-xl bg-gradient-to-br from-[#111111] to-[#1a1a1a] border transition-all duration-300 min-h-[520px] flex flex-col justify-between ${
                plan.popular 
                  ? 'border-[#038e42] shadow-lg shadow-[#038e42]/20' 
                  : 'border-[#038e42]/20 hover:border-[#038e42]/40'
              }`}
            >
              <div 
                className={`p-8 rounded-t-2xl bg-gradient-to-br ${
                  plan.popular 
                  ? 'from-[#038e42] to-green-500' 
                  : 'from-gray-800 to-gray-700'
                }`}
              >
                {plan.popular && (
                  <motion.div 
                    className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2"
                    initial={{ y: 0 }}
                    animate={{ y: [-5, 5] }}
                    transition={{ 
                      duration: 1, 
                      repeat: Infinity, 
                      repeatType: "reverse", 
                      ease: "easeInOut" 
                    }}
                  >
                    <div className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                      MÁS POPULAR
                    </div>
                  </motion.div>
                )}
                <h3 className="text-2xl font-bold text-white text-center">
                  {plan.name}
                </h3>
              </div>

              <div className="p-8">
                <motion.div 
                  className="text-center mb-6"
                  variants={priceVariants}
                >
                  {plan.oldPrice && (
                    <div className="text-sm text-white/50 mb-1">Antes <span className="line-through">{plan.oldPrice}</span></div>
                  )}
                  <span className="text-4xl font-bold text-[#038e42]">
                    {plan.price}
                  </span>
                  <p className="text-gray-400 text-sm mt-1">
                    {plan.period}
                  </p>
                </motion.div>

                <p className="text-center text-gray-300 mb-8 h-12">
                  {plan.description}
                </p>

                <motion.ul 
                  className="space-y-4 mb-10"
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                  }}
                >
                  {plan.features.map((feature, i) => (
                    <motion.li 
                      key={i}
                      className="flex items-start gap-3"
                      variants={featureVariants}
                    >
                      <CheckIcon className="w-5 h-5 text-[#038e42] mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </motion.li>
                  ))}
                </motion.ul>

                <div className="mt-auto">
                  <Link to={plan.isQuote ? "/presupuesto" : "/contacto"}>
                    <motion.button
                      className={`w-full py-3 rounded-lg font-semibold text-lg transition-all duration-300 ${
                        plan.popular 
                        ? 'bg-[#038e42] text-white hover:bg-green-500 shadow-green-500/20 shadow-lg'
                        : 'bg-black/30 backdrop-blur-sm border border-white/20 text-white hover:bg-white/10'
                      }`}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      {plan.buttonText}
                      <ArrowRightIcon className="inline-block w-4 h-4 ml-2" />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA adicional */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-[#038e42]/10 border border-[#038e42]/20 text-[#038e42] text-sm font-medium mb-8">
            <span className="w-2 h-2 bg-[#038e42] rounded-full mr-2 animate-pulse"></span>
            Garantía de satisfacción del 100%
          </div>
          
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            ¿Necesitas algo personalizado? Contáctanos para obtener un presupuesto 
            a medida para tu proyecto específico.
          </p>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(3, 142, 66, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-[#038e42] text-white font-semibold rounded-lg hover:bg-[#038e42]/80 transition-all duration-300"
          >
            Solicitar Presupuesto Personalizado
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
