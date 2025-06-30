import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  EnvelopeClosedIcon, 
  MobileIcon, 
  LinkedInLogoIcon, 
  InstagramLogoIcon,
  ArrowUpIcon,
  GlobeIcon,
  ClockIcon,
  PaperPlaneIcon
} from '@radix-ui/react-icons';

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

export default function Footer() {
  const ref = useRef(null);
  const isInView = useInViewCustom(ref);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Aquí puedes agregar la lógica para enviar el email
      console.log('Email suscrito:', email);
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <footer 
      ref={ref}
      className="bg-[#0a0a0a] text-white relative overflow-hidden"
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

      {/* Contenido principal */}
      <div className="container mx-auto px-6 lg:px-8 py-20 relative z-10">
        {/* Grid principal */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          {/* Columna 1 - Logo y descripción */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            <div className="flex items-center mb-6">
              <motion.img 
                src="/assets/weblisy-logo.png" 
                alt="Weblisy Logo" 
                className="h-16 w-auto mr-4"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <motion.p 
              className="text-white/70 leading-relaxed mb-8 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              Transformamos ideas en experiencias digitales excepcionales. 
              Especialistas en desarrollo web, aplicaciones móviles y soluciones digitales innovadoras.
            </motion.p>
            
            {/* Newsletter */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <h4 className="text-lg font-semibold mb-4 text-white">Suscríbete a nuestro newsletter</h4>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu email"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-[#038e42] transition-colors"
                  required
                />
                <motion.button
                  type="submit"
                  className="px-6 py-3 bg-[#038e42] hover:bg-[#038e42]/80 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <PaperPlaneIcon className="w-4 h-4" />
                  Suscribir
                </motion.button>
              </form>
              {isSubscribed && (
                <motion.p 
                  className="text-[#038e42] text-sm mt-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  ¡Gracias por suscribirte!
                </motion.p>
              )}
            </motion.div>
            
            {/* Redes sociales */}
            <motion.div 
              className="flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              <motion.a 
                href="https://www.linkedin.com/company/weblisy" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 hover:bg-[#038e42]/20 rounded-full flex items-center justify-center text-white hover:text-[#038e42] transition-all duration-300 border border-white/20 hover:border-[#038e42]/30"
                whileHover={{ scale: 1.1, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
              >
                <LinkedInLogoIcon className="w-6 h-6" />
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/weblisy.es?igsh=MXV1Y2I4M3cycng0ag==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 bg-white/10 hover:bg-[#038e42]/20 rounded-full flex items-center justify-center text-white hover:text-[#038e42] transition-all duration-300 border border-white/20 hover:border-[#038e42]/30"
                whileHover={{ scale: 1.1, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
              >
                <InstagramLogoIcon className="w-6 h-6" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Columna 2 - Enlaces rápidos */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          >
            <motion.h3 
              className="text-2xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              Enlaces rápidos
            </motion.h3>
            <motion.ul 
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              {[
                { to: "/", label: "Inicio" },
                { to: "/servicios", label: "Servicios" },
                { to: "/proyectos", label: "Proyectos" },
                { to: "/blog", label: "Blog" },
                { to: "/nosotros", label: "Nosotros" },
                { to: "/contacto", label: "Contacto" }
              ].map((link, index) => (
                <motion.li 
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: 1.0 + index * 0.1, ease: "easeOut" }}
                >
                  <Link 
                    to={link.to} 
                    className="text-white/70 hover:text-[#038e42] transition-all duration-300 flex items-center group"
                  >
                    <motion.div
                      className="w-2 h-2 bg-[#038e42] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      whileHover={{ scale: 1.2 }}
                    />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Columna 3 - Servicios */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            <motion.h3 
              className="text-2xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              Servicios
            </motion.h3>
            <motion.ul 
              className="space-y-3"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
            >
              {[
                { to: "/servicios#desarrollo-web", label: "Desarrollo Web" },
                { to: "/servicios#aplicaciones-moviles", label: "Aplicaciones Móviles" },
                { to: "/servicios#ecommerce", label: "E-commerce" },
                { to: "/servicios#seo", label: "SEO y Marketing" },
                { to: "/servicios#mantenimiento", label: "Mantenimiento Web" },
                { to: "/servicios#consultoria", label: "Consultoría Digital" }
              ].map((service, index) => (
                <motion.li 
                  key={service.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1, ease: "easeOut" }}
                >
                  <Link 
                    to={service.to}
                    className="text-white/70 hover:text-[#038e42] transition-all duration-300 flex items-center group"
                  >
                    <motion.div
                      className="w-2 h-2 bg-[#038e42] rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300"
                      whileHover={{ scale: 1.2 }}
                    />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {service.label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Columna 4 - Contacto */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          >
            <motion.h3 
              className="text-2xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
            >
              Contacto
            </motion.h3>
            <motion.ul 
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
            >
              <motion.li 
                className="flex items-start"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.4, ease: "easeOut" }}
              >
                <EnvelopeClosedIcon className="w-5 h-5 mr-3 text-[#038e42] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white/70 text-sm">Email</p>
                  <a 
                    href="mailto:contacto@weblisy.es" 
                    className="text-white hover:text-[#038e42] transition-colors duration-300"
                  >
                    contacto@weblisy.es
                  </a>
                </div>
              </motion.li>
              
              <motion.li 
                className="flex items-start"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.6, ease: "easeOut" }}
              >
                <MobileIcon className="w-5 h-5 mr-3 text-[#038e42] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white/70 text-sm">Teléfono</p>
                  <a 
                    href="tel:+34656646601" 
                    className="text-white hover:text-[#038e42] transition-colors duration-300"
                  >
                    +34 656 646 601
                  </a>
                </div>
              </motion.li>
              
              <motion.li 
                className="flex items-start"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.8, ease: "easeOut" }}
              >
                <GlobeIcon className="w-5 h-5 mr-3 text-[#038e42] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white/70 text-sm">Web</p>
                  <a 
                    href="https://weblisy.es" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-[#038e42] transition-colors duration-300"
                  >
                    weblisy.es
                  </a>
                </div>
              </motion.li>
              
              <motion.li 
                className="flex items-start"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 2.0, ease: "easeOut" }}
              >
                <ClockIcon className="w-5 h-5 mr-3 text-[#038e42] mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white/70 text-sm">Horario</p>
                  <p className="text-white">Lun - Vie: 9:00 - 18:00</p>
                </div>
              </motion.li>
            </motion.ul>
          </motion.div>
        </motion.div>

        {/* Línea divisoria */}
        <motion.div 
          className="border-t border-white/10 mb-8"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, delay: 2.2, ease: "easeOut" }}
        />

        {/* Footer inferior */}
        <motion.div 
          className="flex flex-col lg:flex-row justify-between items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 2.4, ease: "easeOut" }}
        >
          <div className="flex flex-col lg:flex-row items-center gap-4 mb-4 lg:mb-0">
            <p className="text-white/60 text-sm">
              &copy; 2025 Weblisy. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link to="/privacidad" className="text-white/60 hover:text-[#038e42] transition-colors duration-300">
                Política de Privacidad
              </Link>
              <Link to="/terminos" className="text-white/60 hover:text-[#038e42] transition-colors duration-300">
                Términos de Servicio
              </Link>
            </div>
          </div>
          
          {/* Botón de scroll to top */}
          <motion.button
            onClick={scrollToTop}
            className="w-12 h-12 bg-gradient-to-r from-[#038e42] to-[#038e42]/80 hover:from-[#038e42]/90 hover:to-[#038e42]/70 text-white rounded-lg flex items-center justify-center transition-all duration-300 shadow-lg shadow-[#038e42]/20"
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 10px 30px rgba(3, 142, 66, 0.4)"
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