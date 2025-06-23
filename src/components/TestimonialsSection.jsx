import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faQuoteLeft, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const testimonials = [
    {
      name: "María García",
      content: "Las soluciones web de Weblisy han transformado mi negocio, haciéndolo más eficiente y accesible para mis clientes. El equipo es profesional y entregó exactamente lo que necesitábamos.",
      rating: 5
    },
    {
      name: "Carlos Rodríguez",
      content: "La calidad y eficiencia de sus servicios de desarrollo web son insuperables. Nuestra nueva web ha aumentado las conversiones en un 40%. Altamente recomendados.",
      rating: 5
    },
    {
      name: "Ana Martínez",
      content: "Como profesional del sector, puedo afirmar que Weblisy es un referente en innovación y calidad. Su atención al detalle y soporte post-lanzamiento son excepcionales.",
      rating: 5
    },
    {
      name: "David López",
      content: "Contratamos a Weblisy para nuestro proyecto más importante y superaron todas nuestras expectativas. El resultado fue una web moderna, rápida y que convierte.",
      rating: 5
    },
    {
      name: "Laura Fernández",
      content: "Excelente trabajo en nuestro e-commerce. La tienda online que desarrollaron nos ha permitido expandir nuestro negocio a nivel nacional. Muy satisfecha con el resultado.",
      rating: 5
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
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
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
    <section id='testimonios' className="py-20 px-4 md:py-32 md:px-8 bg-customBlack relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Lo que dicen nuestros clientes
          </motion.h2>
          <motion.p 
            className="text-white opacity-80 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Descubre cómo nuestras soluciones de desarrollo web pueden transformar tu negocio.
          </motion.p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Carrusel */}
          <div className="relative h-96 md:h-80 mb-0">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute w-full"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 text-center h-full flex flex-col justify-center">
                  {/* Icono de comillas */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-[#038e42]/20 rounded-full flex items-center justify-center">
                      <FontAwesomeIcon 
                        icon={faQuoteLeft} 
                        className="text-[#038e42] text-2xl" 
                      />
                    </div>
                  </div>

                  {/* Contenido del testimonio */}
                  <p className="text-white text-lg md:text-xl leading-relaxed mb-8 italic">
                    "{testimonials[currentIndex].content}"
                  </p>

                  {/* Información del cliente */}
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                      <FontAwesomeIcon icon={faUserCircle} className="text-white text-xl" />
                    </div>
                    <div className="text-left">
                      <h4 className="text-white font-semibold text-lg">
                        {testimonials[currentIndex].name}
                      </h4>
                    </div>
                  </div>

                  {/* Estrellas de valoración */}
                  <div className="flex justify-center gap-1 mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">★</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Botones de navegación */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 group z-10"
            >
              <FontAwesomeIcon 
                icon={faChevronLeft} 
                className="text-white group-hover:text-[#038e42] transition-colors" 
              />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 group z-10"
            >
              <FontAwesomeIcon 
                icon={faChevronRight} 
                className="text-white group-hover:text-[#038e42] transition-colors" 
              />
            </button>
          </div>

          {/* Indicadores de puntos debajo de la tarjeta */}
          <div className="flex justify-center gap-3 mt-8 z-20 relative">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all duration-300 focus:outline-none ${
                  index === currentIndex 
                    ? 'bg-[#038e42] scale-125 border-[#038e42]' 
                    : 'bg-white/60 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
