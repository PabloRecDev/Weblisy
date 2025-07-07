import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  HamburgerMenuIcon, 
  Cross2Icon,
  SunIcon,
  MoonIcon,
  CalendarIcon,
  ChevronDownIcon,
  PersonIcon,
  EnvelopeClosedIcon,
  QuestionMarkCircledIcon,
  Component1Icon,
  DesktopIcon,
  RocketIcon
} from '@radix-ui/react-icons';
import { useTheme } from './ThemeProvider';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [agencyOpen, setAgencyOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar menú móvil cuando cambia la ruta
  useEffect(() => {
    setIsOpen(false);
    setAgencyOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  // Prevenir scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navItems = [
    { name: 'Blog', href: '/blog' },
  ];

  const servicesDropdown = [
    { name: 'Desarrollo Web', href: '/servicios/desarrollo-web', description: 'Sitios web profesionales y modernos.', icon: DesktopIcon },
    { name: 'E-commerce', href: '/servicios/ecommerce', description: 'Tiendas online que venden.', icon: Component1Icon },
    { name: 'Aplicaciones Web', href: '/aplicaciones-web', description: 'Soluciones complejas y a medida.', icon: RocketIcon },
    { name: 'CV Master', href: '/cv-master', description: 'Creador de CV profesional con IA.', icon: PersonIcon },
    { name: 'Mantenimiento', href: '/servicios/mantenimiento', description: 'Soporte y actualizaciones.', icon: Component1Icon },
    { name: 'Todos los Servicios', href: '/servicios', description: 'Una vista general completa.', icon: Component1Icon },
  ];

  const isActive = (href) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`relative transition-all duration-300 border-b-[0.1px] border-white/10
        ${scrolled
          ? 'bg-[#121212] lg:bg-[#121212]/90 lg:backdrop-blur-md'
          : 'bg-[#121212]'}
        font-['Nunito',custom-font,'Helvetica_Neue',Helvetica,Arial,sans-serif] font-bold text-[#00c573] text-[14px] leading-[19px]`}
      style={{ fontFamily: "'Nunito', custom-font, 'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500, color: '#00c573', fontSize: 14, lineHeight: '19px' }}
    >
      {/* Altura responsive del navbar */}
      <div className={`transition-all duration-300 ${
        scrolled ? 'h-16' : 'h-20'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 h-full">
          <div className="flex items-center justify-between h-full w-full">
            {/* Logo a la izquierda */}
            <div className="flex items-center">
              <motion.div className="flex items-center relative z-10 ml-8 sm:ml-12 md:ml-16 lg:ml-24">
                <Link to="/" className="flex items-center h-full">
                  <img 
                    src="/assets/logo.png" 
                    alt="Weblisy Logo" 
                    className="h-24 sm:h-20 md:h-24 lg:h-28 xl:h-36 w-auto transition-all duration-300"
                    style={{ display: 'block' }}
                  />
                </Link>
              </motion.div>
            </div>

            {/* Enlaces de navegación centrados */}
            <div className="hidden lg:flex items-center gap-2 flex-1 justify-center h-full ml-40">
              {/* Menú Servicios */}
              <div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className="flex items-center gap-1 text-sm font-bold text-gray-300 hover:text-[#006239] hover:bg-white/5 focus:text-[#006239] focus:outline-none focus:ring-2 focus:ring-[#006239]/50 transition-colors duration-200 px-3 py-2 rounded-lg"
                  onClick={() => setServicesOpen((v) => !v)}
                  tabIndex={0}
                >
                  Servicios
                  <motion.span
                    animate={{ rotate: servicesOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="inline-block"
                  >
                    <ChevronDownIcon className="w-4 h-4" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 min-w-[600px] max-w-[90vw] bg-[#181818]/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl z-50 py-3 px-2 flex flex-row flex-wrap gap-2"
                    >
                      {servicesDropdown.map((item, idx) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 * idx, duration: 0.25, type: 'spring' }}
                          className="flex-1 min-w-[220px] max-w-[260px]"
                        >
                          <Link
                            to={item.href}
                            className="block px-4 py-3 text-sm group hover:bg-white/5 rounded-lg transition-colors h-full"
                            onClick={() => setServicesOpen(false)}
                          >
                            <div className="flex items-start gap-3">
                              <item.icon className="w-5 h-5 text-[#006239] mt-0.5 flex-shrink-0" />
                              <div>
                                <div className="font-bold hover:text-[#006239] text-gray-200 group-hover:text-[#006239] transition-colors font-medium">
                                  {item.name}
                                </div>
                                <div className="font-bold hover:text-[#006239] text-gray-400 text-xs mt-1">
                                  {item.description}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Blog */}
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative text-sm font-bold hover:text-[#006239] transition-colors duration-200 px-3 py-2 rounded-lg hover:text-[#006239] hover:bg-white/5 focus:text-[#006239] focus:outline-none focus:ring-2 focus:ring-[#006239]/50 ${
                    isActive(item.href)
                      ? 'text-[#006239] bg-[#006239]/10'
                      : 'text-gray-300'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Menú Agencia */}
              <div
                className="relative"
                onMouseEnter={() => setAgencyOpen(true)}
                onMouseLeave={() => setAgencyOpen(false)}
              >
                <button
                  className="flex items-center gap-1 text-sm font-bold hover:text-[#006239] text-gray-300 hover:text-[#006239] hover:bg-white/5 focus:text-[#006239] focus:outline-none focus:ring-2 focus:ring-[#006239]/50 transition-colors duration-200 px-3 py-2 rounded-lg"
                  onClick={() => setAgencyOpen((v) => !v)}
                  tabIndex={0}
                >
                  Agencia
                  <motion.span
                    animate={{ rotate: agencyOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="inline-block"
                  >
                    <ChevronDownIcon className="w-4 h-4" />
                  </motion.span>
                </button>
                <AnimatePresence>
                  {agencyOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 mt-2 min-w-[600px] max-w-[90vw] bg-[#181818]/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl z-50 py-3 px-2 flex flex-row flex-wrap gap-2"
                    >
                      {[{
                        name: 'Sobre nosotros',
                        href: '/nosotros',
                        icon: PersonIcon,
                        desc: 'Conoce nuestro equipo y filosofía'
                      }, {
                        name: 'Preguntas Frecuentes',
                        href: '/faq',
                        icon: QuestionMarkCircledIcon,
                        desc: 'Resolvemos todas tus dudas'
                      }, {
                        name: 'Contacto',
                        href: '/contacto',
                        icon: EnvelopeClosedIcon,
                        desc: 'Ponte en contacto con nosotros'
                      }].map((item, idx) => (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.05 * idx, duration: 0.25, type: 'spring' }}
                          className="flex-1 min-w-[220px] max-w-[260px]"
                        >
                          <Link
                            to={item.href}
                            className="block px-4 py-3 text-sm group hover:bg-white/5 rounded-lg transition-colors h-full"
                            onClick={() => setAgencyOpen(false)}
                          >
                            <div className="flex items-start gap-3">
                              <item.icon className="w-5 h-5 text-[#006239] mt-0.5 flex-shrink-0" />
                              <div>
                                <div className="text-gray-200 group-hover:text-[#006239] transition-colors font-medium">
                                  {item.name}
                                </div>
                                <div className="text-gray-400 text-xs mt-1">
                                  {item.desc}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Botones de acción a la derecha */}
            <div className="hidden lg:flex items-center gap-2 justify-end" style={{ minWidth: '320px' }}>
              {/* Correo de contacto */}
              <a
                href="mailto:contacto@weblisy.es"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-[#006239] transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-white/5"
              >
                <EnvelopeClosedIcon className="w-4 h-4" />
                <span className="hidden xl:inline">contacto@weblisy.es</span>
              </a>
              
              {/* Botón Agendar */}
              <Link
                to="/agendar"
                className="px-3 py-1.5 bg-[#121212]/80 text-white font-bold rounded-lg border border-white/30 backdrop-blur-md glass-bg glass-border hover:bg-[#181818] hover:border-white/50 transition-all duration-200 flex items-center gap-2 text-sm"
              >
                <CalendarIcon className="w-4 h-4" />
                <span className="hidden xl:inline">Agendar</span>
              </Link>
              
              {/* Botón Contacto */}
              <Link
                to="/contacto"
                className="px-3 py-1.5 bg-[#006239]/60 text-white font-bold rounded-lg border border-[#006239]/40 backdrop-blur-md glass-bg glass-border hover:bg-[#006239]/80 hover:border-[#006239] transition-all duration-200 flex items-center gap-2 text-sm"
              >
                <EnvelopeClosedIcon className="w-4 h-4" />
                <span className="hidden xl:inline">Contacto</span>
              </Link>
            </div>

            {/* Botón hamburguesa para móviles */}
            <div className="lg:hidden flex items-center gap-2">
              {/* Botón Agendar móvil - oculto en pantallas muy pequeñas */}
              <Link
                to="/agendar"
                className="hidden sm:flex px-3 py-2 bg-[#006239]/60 text-white font-bold rounded-lg border border-[#006239]/40 backdrop-blur-md glass-bg glass-border hover:bg-[#006239]/80 transition-all duration-200 items-center gap-1 text-xs"
              >
                <CalendarIcon className="w-3 h-3" />
                <span>Agendar</span>
              </Link>
              
              {/* Botón hamburguesa */}
              <button
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-gray-300 hover:text-[#006239] hover:bg-white/10 transition-all duration-200"
                onClick={() => setIsOpen(true)}
                aria-label="Abrir menú"
              >
                <HamburgerMenuIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay de fondo para móvil */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[998] lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Panel lateral móvil */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-72 sm:w-80 h-full bg-[#0a0a0a]/95 backdrop-blur-md shadow-2xl z-[999] flex flex-col lg:hidden"
          >
            {/* Header del menú móvil */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
              <div className="flex items-center">
                <img 
                  src="/assets/logo.png" 
                  alt="Weblisy Logo" 
                  className="h-16 sm:h-12 w-auto"
                />
              </div>
              <button
                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-300 hover:text-[#006239] hover:bg-white/10 transition-all duration-200"
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar menú"
              >
                <Cross2Icon className="w-4 h-4" />
              </button>
            </div>

            {/* Navegación móvil */}
            <nav className="flex-1 p-4 sm:p-6 space-y-3 sm:space-y-4 overflow-y-auto">
              {/* Menú Servicios móvil */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Servicios
                </h3>
                <div className="space-y-1">
                  <Link
                    to="/servicios/desarrollo-web"
                    className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg text-gray-200 hover:text-[#006239] hover:bg-white/5 transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <DesktopIcon className="w-4 h-4 text-[#006239] flex-shrink-0" />
                    <span className="text-sm">Desarrollo Web</span>
                  </Link>
                  <Link
                    to="/servicios/ecommerce"
                    className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg text-gray-200 hover:text-[#006239] hover:bg-white/5 transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <Component1Icon className="w-4 h-4 text-[#006239] flex-shrink-0" />
                    <span className="text-sm">E-commerce</span>
                  </Link>
                  <Link
                    to="/aplicaciones-web"
                    className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg text-gray-200 hover:text-[#006239] hover:bg-white/5 transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <RocketIcon className="w-4 h-4 text-[#006239] flex-shrink-0" />
                    <span className="text-sm">Aplicaciones Web</span>
                  </Link>
                  <Link
                    to="/servicios/mantenimiento"
                    className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg text-gray-200 hover:text-[#006239] hover:bg-white/5 transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <Component1Icon className="w-4 h-4 text-[#006239] flex-shrink-0" />
                    <span className="text-sm">Mantenimiento</span>
                  </Link>
                  <Link
                    to="/servicios"
                    className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg text-gray-200 hover:text-[#006239] hover:bg-white/5 transition-all duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <Component1Icon className="w-4 h-4 text-[#006239] flex-shrink-0" />
                    <span className="text-sm">Todos los Servicios</span>
                  </Link>
                </div>
              </div>

              {/* Blog móvil */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Contenido
                </h3>
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? 'text-[#006239] bg-[#006239]/10 border border-[#006239]/20'
                        : 'text-gray-300 hover:text-[#006239] hover:bg-white/5'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              {/* Menú Agencia móvil */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Agencia
                </h3>
                <div className="space-y-1">
                  <button
                    className="flex items-center justify-between w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-base font-medium text-gray-300 hover:text-[#006239] hover:bg-white/5 transition-all duration-200"
                    onClick={() => setAgencyOpen((v) => !v)}
                  >
                    <span>Menú Agencia</span>
                    <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${agencyOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {agencyOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 space-y-1">
                          <Link
                            to="/nosotros"
                            className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg text-gray-200 hover:text-[#006239] hover:bg-white/5 transition-all duration-200"
                            onClick={() => { setAgencyOpen(false); setIsOpen(false); }}
                          >
                            <PersonIcon className="w-4 h-4 text-[#006239] flex-shrink-0" />
                            <span className="text-sm">Sobre nosotros</span>
                          </Link>
                          <Link
                            to="/faq"
                            className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg text-gray-200 hover:text-[#006239] hover:bg-white/5 transition-all duration-200"
                            onClick={() => { setAgencyOpen(false); setIsOpen(false); }}
                          >
                            <QuestionMarkCircledIcon className="w-4 h-4 text-[#006239] flex-shrink-0" />
                            <span className="text-sm">Preguntas Frecuentes</span>
                          </Link>
                          <Link
                            to="/contacto"
                            className="flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-2 rounded-lg text-gray-200 hover:text-[#006239] hover:bg-white/5 transition-all duration-200"
                            onClick={() => { setAgencyOpen(false); setIsOpen(false); }}
                          >
                            <EnvelopeClosedIcon className="w-4 h-4 text-[#006239] flex-shrink-0" />
                            <span className="text-sm">Contacto</span>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Correo de contacto móvil */}
              <div className="pt-3 sm:pt-4">
                <a
                  href="mailto:contacto@weblisy.es"
                  className="flex items-center justify-center gap-2 w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 text-white font-medium rounded-lg hover:bg-white/20 hover:border-white/30 transition-all duration-200 text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  <EnvelopeClosedIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">contacto@weblisy.es</span>
                  <span className="sm:hidden">Email</span>
                </a>
              </div>

              {/* Botón Agendar móvil */}
              <div className="pt-3 sm:pt-4">
                <Link
                  to="/agendar"
                  className="flex items-center justify-center gap-2 w-full px-3 py-2.5 sm:py-1.5 bg-[#006239]/60 text-white font-bold rounded-lg border border-[#006239]/40 backdrop-blur-md glass-bg glass-border hover:bg-[#006239]/80 transition-all duration-200 text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  <CalendarIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Agendar Reunión</span>
                  <span className="sm:hidden">Agendar</span>
                </Link>
              </div>
            </nav>

            {/* Footer del menú móvil */}
            <div className="p-4 sm:p-6 border-t border-white/10">
              <div className="text-center">
                <p className="text-xs text-gray-400">
                  © 2024 Weblisy. Todos los derechos reservados.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
