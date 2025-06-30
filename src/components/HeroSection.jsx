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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] px-4 py-10 md:py-24"
    >
      {/* Fondo animado mejorado */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 left-1/3 w-96 h-96 bg-[#038e42]/5 rounded-full blur-3xl"
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
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-[#038e42]/3 rounded-full blur-2xl"
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

      {/* Elementos flotantes animados */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute pointer-events-none"
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
          <element.icon className="w-8 h-8 text-[#038e42]/30" />
        </motion.div>
      ))}

      {/* Línea de progreso animada */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#038e42] to-emerald-400 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-center gap-10 lg:gap-20 relative z-10">
        {/* Columna izquierda: contenido principal */}
        <motion.div 
          className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left"
          style={{ y, opacity }}
        >
          {/* Badge de confianza */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#038e42]/10 border border-[#038e42]/20 text-[#038e42] text-sm font-medium mb-6"
          >
            <StarIcon className="w-4 h-4" />
            <span>Desarrollo web profesional desde 2020</span>
          </motion.div>

          {/* Título principal */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 text-white leading-tight"
          >
            Lleva tu negocio al{' '}
            <span className="bg-gradient-to-r from-[#038e42] to-emerald-400 bg-clip-text text-transparent">
              siguiente nivel
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl lg:text-2xl text-white/80 mb-8 max-w-2xl"
          >
            Creamos <span className="text-[#038e42] font-semibold">webs profesionales</span> que no solo se ven bien, 
            sino que <span className="text-[#038e42] font-semibold">convierten visitantes en clientes</span>.
          </motion.p>

          {/* Botones de acción */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 mb-8"
          >
            <Link to="/agendar">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(3, 142, 66, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-[#038e42] to-emerald-500 text-white font-bold rounded-xl text-lg shadow-xl hover:from-[#038e42]/90 hover:to-emerald-500/90 focus:outline-none focus:ring-2 focus:ring-[#038e42] focus:ring-offset-2 focus:ring-offset-black transition-all duration-300 flex items-center gap-2"
              >
                ¡Quiero mi web profesional!
                <ArrowRightIcon className="w-5 h-5" />
              </motion.button>
            </Link>
            
            <Link to="/servicios/desarrollo-web">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 text-white font-semibold rounded-xl text-lg border border-white/20 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black transition-all duration-300"
              >
                Ver proyectos
              </motion.button>
            </Link>
          </motion.div>

          {/* Estadísticas mejoradas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-md"
          >
            {[
              { icon: StarIcon, text: "100%", subtext: "Personalizado", color: "text-yellow-400" },
              { icon: RocketIcon, text: "20+", subtext: "Proyectos", color: "text-[#038e42]" },
              { icon: CheckIcon, text: "24/7", subtext: "Soporte", color: "text-emerald-400" },
              { icon: Component1Icon, text: "100%", subtext: "Garantía", color: "text-blue-400" }
            ].map((stat, index) => (
              <motion.div
                key={stat.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className="text-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#038e42]/30 transition-all duration-300"
              >
                <stat.icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                <div className="text-xl font-bold text-white">{stat.text}</div>
                <div className="text-xs text-white/60">{stat.subtext}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Columna derecha: mockup visual mejorado */}
        <motion.div 
          className="flex-1 flex items-center justify-center w-full max-w-lg"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <div className="relative w-full">
            {/* Mockup principal */}
            <motion.div 
              className="relative w-full aspect-video bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(3, 142, 66, 0.2)"
              }}
              transition={{ duration: 0.3 }}
            >
              <img 
                src="/assets/navesylocales.png" 
                alt="Mockup de sitio web profesional desarrollado por Weblisy" 
                className="w-full h-full object-cover"
              />
              
              {/* Overlay con gradiente sutil */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>

            {/* Elementos decorativos flotantes */}
            <motion.div
              className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-[#038e42]/20 to-emerald-500/20 rounded-2xl border border-[#038e42]/30 flex items-center justify-center"
              animate={{
                y: [-5, 5, -5],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <RocketIcon className="w-8 h-8 text-[#038e42]" />
            </motion.div>

            <motion.div
              className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 flex items-center justify-center"
              animate={{
                y: [5, -5, 5],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <StarIcon className="w-6 h-6 text-yellow-400" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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