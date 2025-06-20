import React, { useEffect, useState } from 'react';
import { Button } from "./ui/button";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { RocketIcon, CodeIcon, StarIcon, ArrowDownIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 300], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a]">
      <Helmet>
        <meta name="description" content="Impulsa tu negocio con nuestras soluciones web profesionales. Desarrollo de aplicaciones web modernas y eficientes." />
        <meta name="keywords" content="desarrollo web, aplicaciones web, soluciones digitales, transformación digital" />
        <meta property="og:title" content="Impulsa tu Negocio con Soluciones Web Profesionales" />
        <meta property="og:description" content="Descubre cómo nuestras soluciones de desarrollo web pueden transformar tu negocio y llevarlo al siguiente nivel." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://weblisy.com/#hero" />
        <meta name="twitter:title" content="Impulsa tu Negocio con Soluciones Web Profesionales" />
        <meta name="twitter:description" content="Descubre cómo nuestras soluciones de desarrollo web pueden transformar tu negocio y llevarlo al siguiente nivel." />
      </Helmet>

      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-white/20 rounded-full animate-pulse-glow"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-white/30 rounded-full animate-float"></div>
        <div className="absolute bottom-40 left-20 w-1.5 h-1.5 bg-white/15 rounded-full animate-pulse-glow"></div>
        <div className="absolute bottom-20 right-10 w-1 h-1 bg-white/25 rounded-full animate-float"></div>
      </div>

      <motion.div 
        className="container mx-auto max-w-6xl relative z-10 flex flex-col items-center justify-center text-center"
        style={{ y, opacity }}
      >
        <div className="grid grid-cols-1 gap-12 items-center justify-items-center">
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="animate-fade-in"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white flex items-center justify-center gap-3">
                <motion.div
                  animate={floatingAnimation}
                  className="flex items-center"
                >
                  <RocketIcon className="w-12 h-12 text-[#038e42]" aria-hidden="true" />
                </motion.div>
                <motion.span
                  variants={textVariants}
                  className="inline-block"
                >
                  Impulsa tu Negocio
                </motion.span>
                <motion.div
                  animate={floatingAnimation}
                  transition={{ delay: 0.5 }}
                  className="flex items-center"
                >
                  <StarIcon className="w-12 h-12 text-white/80" aria-hidden="true" />
                </motion.div>
              </h1>
              <motion.span 
                className="block text-white opacity-80 text-2xl md:text-3xl mt-2 font-light"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Innovación y Eficiencia a tu Alcance
              </motion.span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-white opacity-80 mb-8 max-w-2xl mx-auto"
            >
              Descubre cómo nuestras soluciones de desarrollo web pueden transformar tu negocio y llevarlo al siguiente nivel.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full px-4 sm:px-0"
            >
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="group relative w-full sm:w-auto px-8 py-4 bg-[#038e42] text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:bg-[#038e42]/80"
              >
                <span className="relative z-10 flex items-center justify-center">
                  Comenzar Proyecto
                  <ArrowRightIcon className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 border-2 border-[#038e42] text-[#038e42] font-semibold rounded-lg hover:bg-[#038e42] hover:text-white transition-all duration-300 transform"
              >
                Ver Portafolio
              </motion.button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative"
            animate={floatingAnimation}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="w-32 h-32 bg-gradient-to-br from-black/20 to-black/20 rounded-full blur-xl"
              animate={pulseAnimation}
            />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-[#038e42] rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-[#038e42] rounded-full mt-2"
          ></motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
} 