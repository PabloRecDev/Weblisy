import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { 
  EnvelopeClosedIcon, 
  MobileIcon, 
  LinkedInLogoIcon, 
  InstagramLogoIcon,
  ArrowUpIcon
} from '@radix-ui/react-icons';

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
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

  const linkVariants = {
    hover: {
      y: -2,
      color: "#038e42",
      transition: {
        duration: 0.2
      }
    }
  };

  const socialVariants = {
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: {
        duration: 0.3
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer 
      ref={ref}
      className="bg-gradient-to-b from-[#0a0a0a] to-[#000000] text-white py-12 relative overflow-hidden"
    >
      {/* Fondo con partículas */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white/20 rounded-full animate-pulse-glow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-1.5 h-1.5 bg-white/30 rounded-full animate-float"></div>
        <div className="absolute top-3/4 left-1/2 w-1 h-1 bg-white/15 rounded-full animate-pulse-glow"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="lg:ml-20">
            <div className="flex items-center mb-6">
              <img 
                src="/assets/weblisy-logo.png" 
                alt="Weblisy Logo" 
                className="h-12 w-auto mr-3"
              />
            </div>
            <motion.p 
              className="text-gray-400 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Una solución innovadora para todas tus necesidades digitales.
            </motion.p>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.h3 
              className="text-xl font-bold mb-4 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Enlaces
            </motion.h3>
            <motion.ul 
              className="space-y-2"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {[
                { to: "/#hero", label: "Inicio" },
                { to: "/#proceso", label: "Cómo Trabajamos" },
                { to: "/#testimonios", label: "Testimonios" },
                { to: "/#pricingSection", label: "Planes" },
                { to: "/blog", label: "Blog" },
                { to: "/#contacto", label: "Contáctanos" },
                { to: "/privacidad", label: "Política de Privacidad" }
              ].map((link, index) => (
                <motion.li 
                  key={link.to}
                  variants={linkVariants}
                  whileHover="hover"
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <Link 
                    to={link.to} 
                    className="text-gray-400 hover:text-[#038e42] transition-colors duration-300 flex items-center group"
                  >
                    <motion.div
                      className="w-1 h-1 bg-[#038e42] rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                    />
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.h3 
              className="text-xl font-bold mb-4 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Contacto
            </motion.h3>
            <motion.ul 
              className="space-y-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.li 
                className="text-gray-400 flex items-center"
                variants={linkVariants}
                whileHover="hover"
                transition={{ delay: 0.9 }}
              >
                <EnvelopeClosedIcon className="w-4 h-4 mr-2 text-[#038e42]" />
                <a 
                  href="mailto:contacto@weblisy.es" 
                  className="hover:text-[#038e42] transition-colors duration-300"
                >
                  contacto@weblisy.es
                </a>
              </motion.li>
              <motion.li 
                className="text-gray-400 flex items-center"
                variants={linkVariants}
                whileHover="hover"
                transition={{ delay: 1.0 }}
              >
                <MobileIcon className="w-4 h-4 mr-2 text-[#038e42]" />
                <a 
                  href="tel:+34656646601" 
                  className="hover:text-[#038e42] transition-colors duration-300"
                >
                  +34 656 646 601
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:mr-20">
            <motion.h3 
              className="text-xl font-bold mb-4 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              Síguenos
            </motion.h3>
            <motion.div 
              className="flex space-x-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.a 
                href="#" 
                className="text-gray-400 hover:text-[#038e42] transition-colors duration-300 p-2 rounded-full hover:bg-black/10"
                variants={socialVariants}
                whileHover="hover"
                transition={{ delay: 1.2 }}
              >
                <LinkedInLogoIcon className="w-6 h-6" />
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/weblisy.es?igsh=MXV1Y2I4M3cycng0ag==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#038e42] transition-colors duration-300 p-2 rounded-full hover:bg-black/10"
                variants={socialVariants}
                whileHover="hover"
                transition={{ delay: 1.3 }}
              >
                <InstagramLogoIcon className="w-6 h-6" />
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div 
          className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <p>&copy; 2025 Weblisy. Todos los derechos reservados.</p>
          
          {/* Botón de scroll to top */}
          <motion.button
            onClick={scrollToTop}
            className="absolute right-4 top-8 p-2 bg-black/20 hover:bg-black/30 text-[#038e42] rounded-full transition-all duration-300"
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)"
            }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUpIcon className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
} 