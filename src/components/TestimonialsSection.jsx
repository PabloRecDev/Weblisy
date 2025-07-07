import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarIcon, QuoteIcon, ArrowLeftIcon, ArrowRightIcon, CheckIcon } from '@radix-ui/react-icons';

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
      project: "E-commerce de tecnología",
      results: ["+150% conversiones", "-75% tiempo de carga", "100% satisfacción"]
    },
    {
      name: "Carlos Rodríguez",
      position: "Director de Marketing",
      company: "Restaurante El Gourmet",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: "La aplicación web que desarrollaron para nuestro restaurante ha revolucionado nuestro negocio. Las reservas online han aumentado un 300% y nuestros clientes adoran la experiencia. El soporte post-lanzamiento es increíble.",
      rating: 5,
      project: "Sistema de reservas online",
      results: ["+300% reservas online", "Mejor experiencia cliente", "Soporte 24/7"]
    },
    {
      name: "Ana Martínez",
      position: "Fundadora",
      company: "Boutique Moda Elegante",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "Como emprendedora, necesitaba una web que reflejara la calidad de mis productos. Weblisy no solo cumplió mis expectativas, las superó. Nuestra tienda online es hermosa, funcional y ha triplicado nuestras ventas.",
      rating: 5,
      project: "Tienda online de moda",
      results: ["+200% ventas", "Diseño premium", "Funcionalidad completa"]
    },
    {
      name: "David López",
      position: "Director Técnico",
      company: "Consultora Digital Pro",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "Contratamos a Weblisy para nuestro CRM personalizado y el resultado fue espectacular. La aplicación es intuitiva, escalable y ha mejorado nuestra productividad en un 200%. Definitivamente volveremos a trabajar con ellos.",
      rating: 5,
      project: "CRM personalizado",
      results: ["+200% productividad", "Escalabilidad total", "Intuitivo"]
    },
    {
      name: "Laura Fernández",
      position: "Gerente de Ventas",
      company: "Inmobiliaria Premium",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      content: "Nuestra web corporativa necesitaba una renovación completa. Weblisy creó una plataforma moderna que no solo se ve profesional, sino que también genera leads de calidad. Las visitas han aumentado un 400%.",
      rating: 5,
      project: "Web corporativa inmobiliaria",
      results: ["+400% visitas", "Leads de calidad", "Diseño profesional"]
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
      className="py-16 px-4 md:py-32 md:px-8 bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#0a0a0a] relative overflow-hidden"
    >
      {/* Elementos decorativos animados mejorados - ocultos en móviles */}
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 bg-[#00c573]/10 rounded-full blur-3xl hidden md:block"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2],
          rotate: [0, 180, 360]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-40 h-40 bg-[#00c573]/5 rounded-full blur-3xl hidden md:block"
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.4, 0.1],
          rotate: [360, 180, 0]
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      {/* Partículas flotantes - ocultas en móviles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#00c573]/30 rounded-full hidden md:block"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 2) * 40}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        />
      ))}
      
      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header con animación mejorada */}
        <motion.div 
          className="text-center mb-12 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.div
            className="inline-block mb-6 md:mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#006239] to-[#006239]/80 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg shadow-[#006239]/20">
              <QuoteIcon className="text-white w-8 h-8 md:w-10 md:h-10" />
            </div>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            Lo que dicen nuestros <span className="text-[#00c573]">clientes</span>
          </motion.h2>
          
          <motion.p 
            className="text-white/70 text-base md:text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed px-2 md:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          >
            Descubre cómo nuestras soluciones de desarrollo web han transformado negocios reales y generado resultados extraordinarios.
          </motion.p>
        </motion.div>
        
        {/* Layout móvil optimizado */}
        <div className="block lg:hidden">
          {/* Información del cliente móvil */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center">
              <motion.div 
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <motion.div 
                  className="w-20 h-20 rounded-full overflow-hidden border-4 border-[#006239]/30 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-[#006239]/20 to-[#006239]/20 text-[#006239] text-2xl font-bold select-none shadow-lg"
                  initial={{ scale: 0.8, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  {testimonials[currentIndex].name.charAt(0)}
                </motion.div>
                
                <motion.h3 
                  className="text-white font-bold text-xl mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                >
                  {testimonials[currentIndex].name}
                </motion.h3>
                
                <motion.p 
                  className="text-[#00c573] font-semibold text-base mb-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                >
                  {testimonials[currentIndex].position}
                </motion.p>
                
                <motion.p 
                  className="text-white/60 text-sm mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                >
                  {testimonials[currentIndex].project}
                </motion.p>
                
                <motion.div 
                  className="flex justify-center gap-1 mb-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                >
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <motion.span 
                      key={i} 
                      className="text-yellow-400 text-lg"
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                    >
                      ★
                    </motion.span>
                  ))}
                </motion.div>

                {/* Resultados destacados móvil */}
                <motion.div 
                  className="space-y-1"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
                >
                  {testimonials[currentIndex].results.map((result, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-center gap-2 text-xs text-white/80"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 + index * 0.1, ease: "easeOut" }}
                    >
                      <CheckIcon className="w-3 h-3 text-[#00c573] flex-shrink-0" />
                      <span>{result}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Testimonio principal móvil */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
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
                    opacity: { duration: 0.6, ease: "easeInOut" },
                    scale: { duration: 0.6, ease: "easeInOut" },
                    rotateY: { duration: 0.6, ease: "easeInOut" }
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
                  <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6 relative overflow-hidden min-h-[280px] flex items-center shadow-xl">
                    {/* Efecto de brillo animado mejorado */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      animate={{ x: ["-100%", "200%"] }}
                      transition={{ 
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    
                    <div className="relative z-10 w-full">
                      <motion.div
                        className="text-center mb-4"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                      >
                        <QuoteIcon className="w-6 h-6 text-[#00c573]/60 mx-auto mb-3" />
                      </motion.div>
                      
                      <motion.p 
                        className="text-white text-lg leading-relaxed text-center font-medium"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                      >
                        "{testimonials[currentIndex].content}"
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Botones de navegación móvil */}
              <motion.button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-[#00c573]/20 rounded-full flex items-center justify-center transition-all duration-300 group z-10 backdrop-blur-sm border border-white/20 shadow-lg"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 197, 115, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <ArrowLeftIcon className="text-white group-hover:text-[#00c573] transition-colors duration-300 w-4 h-4" />
              </motion.button>

              <motion.button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/10 hover:bg-[#00c573]/20 rounded-full flex items-center justify-center transition-all duration-300 group z-10 backdrop-blur-sm border border-white/20 shadow-lg"
                whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 197, 115, 0.2)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <ArrowRightIcon className="text-white group-hover:text-[#00c573] transition-colors duration-300 w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>

          {/* Indicadores móviles */}
          <motion.div 
            className="flex justify-center gap-2 mb-6"
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.6, delay: 1.3, ease: "easeOut" }}
          >
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2.5 h-2.5 rounded-full border-2 border-white/30 shadow-lg transition-all duration-300 focus:outline-none ${
                  index === currentIndex 
                    ? 'bg-[#00c573] scale-125 border-[#00c573] shadow-[#00c573]/50' 
                    : 'bg-white/20 hover:bg-white/40'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            ))}
          </motion.div>

          {/* Contador móvil */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
          >
            <span className="text-white/60 text-xs">
              {currentIndex + 1} de {testimonials.length} testimonios
            </span>
          </motion.div>
        </div>

        {/* Layout desktop */}
        <div className="hidden lg:block">
          {/* Contenedor principal con mejor distribución */}
          <motion.div 
            className="grid grid-cols-12 gap-8 lg:gap-12 items-start"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 1.2, delay: 0.9, ease: "easeOut" }}
          >
            {/* Columna izquierda - Información del cliente */}
            <motion.div 
              className="col-span-4 order-2 lg:order-1"
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 1, delay: 1.1, ease: "easeOut" }}
            >
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-8 lg:p-10 h-full sticky top-8 shadow-xl">
                <motion.div 
                  className="text-center"
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <motion.div 
                    className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-[#006239]/30 mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-[#006239]/20 to-[#006239]/20 text-[#006239] text-3xl lg:text-4xl font-bold select-none shadow-lg"
                    initial={{ scale: 0.8, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    {testimonials[currentIndex].name.charAt(0)}
                  </motion.div>
                  
                  <motion.h3 
                    className="text-white font-bold text-2xl lg:text-3xl mb-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                  >
                    {testimonials[currentIndex].name}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-[#00c573] font-semibold text-lg mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                  >
                    {testimonials[currentIndex].position}
                  </motion.p>
                  
                  <motion.p 
                    className="text-white/60 text-sm mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  >
                    {testimonials[currentIndex].project}
                  </motion.p>
                  
                  <motion.div 
                    className="flex justify-center gap-1 mb-6"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                  >
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <motion.span 
                        key={i} 
                        className="text-yellow-400 text-xl"
                        initial={{ scale: 0, rotate: -90 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 + i * 0.1, ease: "easeOut" }}
                      >
                        ★
                      </motion.span>
                    ))}
                  </motion.div>

                  {/* Resultados destacados */}
                  <motion.div 
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                  >
                    {testimonials[currentIndex].results.map((result, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-2 text-sm text-white/80"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 1 + index * 0.1, ease: "easeOut" }}
                      >
                        <CheckIcon className="w-4 h-4 text-[#00c573] flex-shrink-0" />
                        <span>{result}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>

            {/* Columna central - Testimonio principal */}
            <motion.div 
              className="col-span-8 order-1 lg:order-2"
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
                    <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12 lg:p-16 relative overflow-hidden min-h-[350px] lg:min-h-[400px] flex items-center shadow-2xl">
                      {/* Efecto de brillo animado mejorado */}
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ 
                          duration: 6,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      />
                      
                      {/* Patrón de fondo sutil */}
                      <div className="absolute inset-0 opacity-5">
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
                      </div>
                      
                      <div className="relative z-10 w-full">
                        <motion.div
                          className="text-center mb-6"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        >
                          <QuoteIcon className="w-8 h-8 text-[#00c573]/60 mx-auto mb-4" />
                        </motion.div>
                        
                        <motion.p 
                          className="text-white text-xl md:text-2xl lg:text-3xl leading-relaxed text-center font-medium"
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

                {/* Botones de navegación mejorados */}
                <motion.button
                  onClick={prevSlide}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-white/10 hover:bg-[#00c573]/20 rounded-full flex items-center justify-center transition-all duration-500 group z-10 backdrop-blur-sm border border-white/20 shadow-lg"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 197, 115, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <ArrowLeftIcon className="text-white group-hover:text-[#00c573] transition-colors duration-300 w-7 h-7" />
                </motion.button>

                <motion.button
                  onClick={nextSlide}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-white/10 hover:bg-[#00c573]/20 rounded-full flex items-center justify-center transition-all duration-500 group z-10 backdrop-blur-sm border border-white/20 shadow-lg"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(0, 197, 115, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <ArrowRightIcon className="text-white group-hover:text-[#00c573] transition-colors duration-300 w-7 h-7" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Indicadores de puntos mejorados */}
          <motion.div 
            className="flex justify-center gap-3 mt-16 z-20 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
          >
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full border-2 border-white/30 shadow-lg transition-all duration-500 focus:outline-none ${
                  index === currentIndex 
                    ? 'bg-[#00c573] scale-125 border-[#00c573] shadow-[#00c573]/50' 
                    : 'bg-white/20 hover:bg-white/40'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            ))}
          </motion.div>

          {/* Contador de testimonios */}
          <motion.div 
            className="text-center mt-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.7, ease: "easeOut" }}
          >
            <span className="text-white/60 text-sm">
              {currentIndex + 1} de {testimonials.length} testimonios
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
