import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarIcon, QuoteIcon, ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';

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

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const ref = useRef(null);
  const isInView = useInViewCustom(ref);

  const testimonials = [
    {
      name: "María García",
      position: "CEO, TechStart Solutions",
      company: "Empresa de tecnología",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: "Weblisy transformó completamente nuestra presencia digital. Nuestra nueva web ha aumentado las conversiones en un 150% y el tiempo de carga se redujo de 8 a 2 segundos. El equipo es excepcionalmente profesional y entregó exactamente lo que prometieron.",
      rating: 5,
      project: "E-commerce de tecnología"
    },
    {
      name: "Carlos Rodríguez",
      position: "Director de Marketing",
      company: "Restaurante El Gourmet",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "La aplicación web que desarrollaron para nuestro restaurante ha revolucionado nuestro negocio. Las reservas online han aumentado un 300% y nuestros clientes adoran la experiencia. El soporte post-lanzamiento es increíble.",
      rating: 5,
      project: "Sistema de reservas online"
    },
    {
      name: "Ana Martínez",
      position: "Fundadora",
      company: "Boutique Moda Elegante",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "Como emprendedora, necesitaba una web que reflejara la calidad de mis productos. Weblisy no solo cumplió mis expectativas, las superó. Nuestra tienda online es hermosa, funcional y ha triplicado nuestras ventas.",
      rating: 5,
      project: "Tienda online de moda"
    },
    {
      name: "David López",
      position: "Director Técnico",
      company: "Consultora Digital Pro",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "Contratamos a Weblisy para nuestro CRM personalizado y el resultado fue espectacular. La aplicación es intuitiva, escalable y ha mejorado nuestra productividad en un 200%. Definitivamente volveremos a trabajar con ellos.",
      rating: 5,
      project: "CRM personalizado"
    },
    {
      name: "Laura Fernández",
      position: "Gerente de Ventas",
      company: "Inmobiliaria Premium",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      content: "Nuestra web corporativa necesitaba una renovación completa. Weblisy creó una plataforma moderna que no solo se ve profesional, sino que también genera leads de calidad. Las visitas han aumentado un 400%.",
      rating: 5,
      project: "Web corporativa inmobiliaria"
    }
  ];

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 8000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 600 : -600,
      opacity: 0,
      scale: 0.95,
      rotateY: direction > 0 ? 15 : -15
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 600 : -600,
      opacity: 0,
      scale: 0.95,
      rotateY: direction < 0 ? 15 : -15
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    if (newDirection > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  };

  return (
    <section 
      ref={ref}
      id='testimonios' 
      className="py-24 px-4 md:py-40 md:px-8 bg-[#0a0a0a] relative overflow-hidden"
    >
      {/* Elementos decorativos animados */}
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 bg-[#038e42]/10 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-40 h-40 bg-[#038e42]/5 rounded-full blur-3xl"
        animate={{ 
          scale: [1.1, 1, 1.1],
          opacity: [0.1, 0.3, 0.1]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header con animación */}
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.div
            className="inline-block mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            <div className="w-24 h-24 bg-gradient-to-br from-[#038e42] to-[#038e42]/80 rounded-full flex items-center justify-center mx-auto mb-6">
              <QuoteIcon className="text-white w-12 h-12" />
            </div>
          </motion.div>
          
          <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-8 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            Lo que dicen nuestros <span className="text-[#038e42]">clientes</span>
          </motion.h2>
          
          <motion.p 
            className="text-white/70 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          >
            Descubre cómo nuestras soluciones de desarrollo web han transformado negocios reales y generado resultados extraordinarios.
          </motion.p>
        </motion.div>
        
        {/* Contenedor principal con mejor distribución */}
        <motion.div 
          className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1.2, delay: 0.9, ease: "easeOut" }}
        >
          {/* Columna izquierda - Información del cliente */}
          <motion.div 
            className="xl:col-span-4 order-2 xl:order-1"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 1, delay: 1.1, ease: "easeOut" }}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-10 h-full sticky top-8">
              <motion.div 
                className="text-center"
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <motion.div 
                  className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#038e42]/30 mx-auto mb-8 flex items-center justify-center bg-[#038e42]/20 text-[#038e42] text-6xl font-bold select-none"
                  initial={{ scale: 0.8, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {testimonials[currentIndex].name.charAt(0)}
                </motion.div>
                
                <motion.h3 
                  className="text-white font-bold text-3xl mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                >
                  {testimonials[currentIndex].name}
                </motion.h3>
                
                <motion.p 
                  className="text-[#038e42] font-semibold text-xl mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                  {testimonials[currentIndex].position}
                </motion.p>
                
                <motion.p 
                  className="text-white/60 text-base mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                >
                  {testimonials[currentIndex].project}
                </motion.p>
                
                <motion.div 
                  className="flex justify-center gap-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                >
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <motion.span 
                      key={i} 
                      className="text-yellow-400 text-2xl"
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 + i * 0.1, ease: "easeOut" }}
                    >
                      ★
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Columna central - Testimonio principal */}
          <motion.div 
            className="xl:col-span-8 order-1 xl:order-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 1, delay: 1.3, ease: "easeOut" }}
          >
            <div className="relative">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 150, damping: 30 },
                    opacity: { duration: 0.8, ease: "easeInOut" },
                    scale: { duration: 0.8, ease: "easeInOut" },
                    rotateY: { duration: 0.8, ease: "easeInOut" }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-12 md:p-16 relative overflow-hidden min-h-[400px] flex items-center">
                    {/* Efecto de brillo animado */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    
                    <div className="relative z-10 w-full">
                      <motion.p 
                        className="text-white text-2xl md:text-3xl leading-relaxed italic text-center"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                      >
                        "{testimonials[currentIndex].content}"
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Botones de navegación */}
              <motion.button
                onClick={prevSlide}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-white/10 hover:bg-[#038e42]/20 rounded-full flex items-center justify-center transition-all duration-500 group z-10 backdrop-blur-sm border border-white/20"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(3, 142, 66, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <ArrowLeftIcon className="text-white group-hover:text-[#038e42] transition-colors duration-300 w-7 h-7" />
              </motion.button>

              <motion.button
                onClick={nextSlide}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-white/10 hover:bg-[#038e42]/20 rounded-full flex items-center justify-center transition-all duration-500 group z-10 backdrop-blur-sm border border-white/20"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(3, 142, 66, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <ArrowRightIcon className="text-white group-hover:text-[#038e42] transition-colors duration-300 w-7 h-7" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Indicadores de puntos */}
        <motion.div 
          className="flex justify-center gap-4 mt-16 z-20 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
        >
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-5 h-5 rounded-full border-2 border-white/30 shadow-lg transition-all duration-500 focus:outline-none ${
                index === currentIndex 
                  ? 'bg-[#038e42] scale-125 border-[#038e42]' 
                  : 'bg-white/20 hover:bg-white/40'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
