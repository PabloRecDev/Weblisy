import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { StarIcon, RocketIcon, ArrowRightIcon, CheckIcon, Component1Icon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';

// Hook personalizado para detectar elementos en vista
const useInViewCustom = (ref, threshold = 0.3) => {
  const [isInView, setIsInView] = React.useState(false);

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

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInViewCustom(ref);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const floatingElements = [
    { icon: Component1Icon, delay: 0, duration: 3 },
    { icon: RocketIcon, delay: 1, duration: 4 },
    { icon: StarIcon, delay: 2, duration: 3.5 },
    { icon: CheckIcon, delay: 0.5, duration: 4.5 },
  ];

  return (
    <section 
      ref={ref}
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] px-4 sm:px-6 py-8 sm:py-10 md:py-24"
    >
      {/* Fondo animado mejorado */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#006239]/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-10 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#006239]/3 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
      </div>

      {/* Elementos flotantes animados - ocultos en móviles */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute pointer-events-none hidden sm:block"
          style={{
            left: `${20 + index * 20}%`,
            top: `${30 + (index % 2) * 40}%`,
          }}
          animate={{
            y: [0, -30, 0],
            rotate: [0, 360],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            delay: element.delay,
            ease: "easeInOut"
          }}
        >
          <element.icon className="w-8 h-8 text-[#006239]/30" />
        </motion.div>
      ))}

      {/* Línea de progreso animada */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#006239] to-emerald-400 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 relative z-10">
        {/* Columna única: contenido principal centrado */}
        <motion.div 
          className="flex flex-col items-center text-center w-full px-2 sm:px-0"
          style={{ y, opacity }}
        >
          {/* Badge de confianza */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-[#006239]/10 border border-[#006239]/20 text-[#006239] text-xs sm:text-sm font-medium mb-4 sm:mb-6"
          >
            <StarIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Desarrollo web profesional desde 2022</span>
            <span className="sm:hidden">Web profesional desde 2022</span>
          </motion.div>

          {/* Título principal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-[72px] font-normal mb-4 sm:mb-6 text-[#fafafa] leading-tight sm:leading-tight md:leading-tight lg:leading-[72px] font-['Circular',custom-font,'Helvetica_Neue',Helvetica,Arial,sans-serif]"
          >
            Lleva tu negocio al{' '}
            <span className="bg-gradient-to-r from-[#006239] to-emerald-400 bg-clip-text text-transparent">
              siguiente nivel
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mb-6 sm:mb-8 max-w-2xl px-2 sm:px-0"
          >
            Creamos <span className="text-[#006239] font-semibold">webs profesionales</span> que no solo se ven bien, 
            sino que <span className="text-[#006239] font-semibold">convierten visitantes en clientes</span>.
          </motion.p>

          {/* Botones de acción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8 justify-center w-full max-w-sm sm:max-w-none"
          >
            <Link to="/agendar" className="w-full sm:w-auto">
              <motion.button
                whileHover={{}}
                whileTap={{}}
                className="w-full sm:w-auto px-6 py-4 sm:py-3 bg-[#006239]/60 text-white font-semibold rounded-md text-base shadow-none border border-[#006239]/40 backdrop-blur-md glass-bg glass-border hover:bg-[#006239]/80 transition-all duration-200"
              >
                ¡Quiero mi web profesional!
              </motion.button>
            </Link>
            <Link to="/servicios/desarrollo-web" className="w-full sm:w-auto">
              <motion.button
                whileHover={{}}
                whileTap={{}}
                className="w-full sm:w-auto px-6 py-4 sm:py-3 bg-[#181818] text-white font-semibold rounded-md text-base border border-[#222] hover:bg-[#222] focus:outline-none focus:ring-2 focus:ring-[#222] focus:ring-offset-2 focus:ring-offset-black transition-all duration-200"
              >
                Ver proyectos
              </motion.button>
            </Link>
          </motion.div>

          {/* Estadísticas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-sm sm:max-w-md mx-auto"
          >
            {[
              { icon: StarIcon, text: "100%", subtext: "Personalizado" },
              { icon: RocketIcon, text: "20+", subtext: "Proyectos" },
              { icon: CheckIcon, text: "24/7", subtext: "Soporte" },
              { icon: Component1Icon, text: "100%", subtext: "Garantía" }
            ].map((stat, index) => (
              <motion.div
                key={`${stat.text}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className="text-center p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#006239]/30 transition-all duration-300"
              >
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 text-white/80" />
                <div className="text-lg sm:text-xl font-bold text-white">{stat.text}</div>
                <div className="text-xs text-white/60">{stat.subtext}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator - oculto en móviles */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-white/60 rounded-full mt-2"
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </section>
  );
} 