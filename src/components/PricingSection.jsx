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
      name: "Sitio Web Básico",
      price: 499,
      originalPrice: 699,
      period: "pago único",
      description: "Perfecto para pequeñas empresas y emprendedores",
      features: [
        "Diseño web responsivo personalizado",
        "Hasta 5 páginas",
        "Formulario de contacto",
        "Optimización SEO básica",
        "Hosting incluido por 1 año",
        "Dominio incluido por 1 año",
        "Soporte técnico por 30 días",
        "Entrega en 2 semanas",
        "Garantía de satisfacción"
      ],
      popular: false,
      color: "from-[#038e42] to-[#038e42]",
      oneTimePayment: true
    },
    {
      name: "Plan Profesional",
      price: isAnnual ? 99 : 149,
      period: isAnnual ? "mes (facturación anual)" : "mes",
      description: "Ideal para empresas en crecimiento",
      features: [
        "Sitio web responsivo completo",
        "Hasta 15 páginas",
        "Blog integrado",
        "Panel de administración",
        "SEO avanzado",
        "Analytics y reportes",
        "Soporte prioritario",
        "Mantenimiento continuo",
        "Actualizaciones de seguridad",
        "Backups automáticos",
        "Optimización de velocidad"
      ],
      popular: true,
      color: "from-[#038e42] to-[#038e42]",
      oneTimePayment: false
    },
    {
      name: "Plan Empresarial",
      price: isAnnual ? 199 : 299,
      period: isAnnual ? "mes (facturación anual)" : "mes",
      description: "Para grandes empresas y aplicaciones complejas",
      features: [
        "Todo del plan Profesional",
        "Páginas ilimitadas",
        "Aplicación web completa",
        "Integración con APIs",
        "Base de datos personalizada",
        "Soporte 24/7",
        "Mantenimiento premium",
        "Capacitación del equipo",
        "Consultoría técnica",
        "Escalabilidad garantizada",
        "Monitoreo avanzado"
      ],
      popular: false,
      color: "from-[#038e42] to-[#038e42]",
      oneTimePayment: false
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

          {/* Toggle de facturación solo para planes de suscripción */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className={`text-sm ${!isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Mensual
            </span>
            <motion.button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-16 h-8 rounded-full p-1 transition-colors duration-300 ${
                isAnnual ? 'bg-[#038e42]' : 'bg-gray-600'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="w-6 h-6 bg-white rounded-full shadow-md"
                animate={{ x: isAnnual ? 32 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </motion.button>
            <span className={`text-sm ${isAnnual ? 'text-white' : 'text-gray-400'}`}>
              Anual
              <span className="ml-2 px-2 py-1 bg-[#038e42]/20 text-[#038e42] text-xs rounded-full">
                -33%
              </span>
            </span>
          </div>
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
              {/* Badge popular */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-[#038e42] to-[#038e42] text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-md">
                    <StarIcon className="w-4 h-4" />
                    Más Popular
                  </div>
                </div>
              )}

              {/* Badge de descuento para pago único */}
              {plan.oneTimePayment && plan.originalPrice && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-md">
                    <span className="line-through">€{plan.originalPrice}</span>
                    -29%
                  </div>
                </div>
              )}

              {/* Header del plan */}
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-gray-400 mb-4 text-sm">{plan.description}</p>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-white">€{plan.price}</span>
                  <span className="text-gray-400 text-base">/{plan.period}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(3, 142, 66, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-2 px-4 rounded-md font-semibold text-sm transition-all duration-300 ${
                    plan.popular
                      ? 'bg-[#038e42] text-white hover:bg-[#038e42]/80'
                      : 'bg-[#038e42]/10 text-[#038e42] border border-[#038e42] hover:bg-[#038e42] hover:text-white'
                  }`}
                >
                  {plan.oneTimePayment ? 'Contratar Ahora' : 'Comenzar Plan'}
                </motion.button>
              </div>

              {/* Lista de características */}
              <div className="space-y-3">
                <h4 className="font-semibold text-white mb-2 text-sm">Incluye:</h4>
                {plan.features.map((feature, featureIndex) => (
                  <motion.div
                    key={featureIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: featureIndex * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-2"
                  >
                    <div className="w-4 h-4 rounded-full bg-[#038e42] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckIcon className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-300 text-xs">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#038e42]/0 via-[#038e42]/5 to-[#038e42]/0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
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
