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
  EnvelopeClosedIcon
} from '@radix-ui/react-icons';
import { useTheme } from './ThemeProvider';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
    { name: 'Aplicaciones Web', href: '/aplicaciones-web' },
    { name: 'Blog', href: '/blog' },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-[0.1px] border-white/10
        ${scrolled
          ? 'bg-[#0a0a0a] lg:bg-[#0a0a0a]/90 lg:backdrop-blur-md'
          : 'bg-[#0a0a0a]'}
      `}
    >
      {/* Altura responsive del navbar */}
      <div className={`transition-all duration-300 ${
        scrolled ? 'h-16' : 'h-20'
      }`}>
        <div className="container mx-auto px-4 h-full">
          <div className="flex items-center justify-between h-full">
            {/* Logo */}
            <motion.div className="flex items-center relative z-10 lg:ml-8">
              <Link to="/" className="flex items-center h-full">
                <img 
                  src="/assets/weblisy-logo.png" 
                  alt="Weblisy Logo" 
                  className="h-16 md:h-20 w-auto transition-all duration-300"
                  style={{ display: 'block' }}
                />
              </Link>
            </motion.div>

            {/* Menú y botones a la derecha (desktop) */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8 lg:mr-8">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative text-sm font-medium transition-colors duration-200 px-3 py-2 rounded-lg hover:text-[#038e42] hover:bg-white/5 focus:text-[#038e42] focus:outline-none focus:ring-2 focus:ring-[#038e42]/50 ${
                    isActive(item.href)
                      ? 'text-[#038e42] bg-[#038e42]/10'
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
                  className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-[#038e42] hover:bg-white/5 focus:text-[#038e42] focus:outline-none focus:ring-2 focus:ring-[#038e42]/50 transition-colors duration-200 px-3 py-2 rounded-lg"
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
                      className="absolute right-0 mt-2 w-72 bg-[#181818]/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl z-50 py-3"
                    >
                      <Link
                        to="/nosotros"
                        className="block px-4 py-3 text-sm group hover:bg-white/5 rounded-lg mx-2 transition-colors"
                        onClick={() => setAgencyOpen(false)}
                      >
                        <div className="flex items-start gap-3">
                          <PersonIcon className="w-5 h-5 text-[#038e42] mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-gray-200 group-hover:text-[#038e42] transition-colors font-medium">
                              Sobre nosotros
                            </div>
                            <div className="text-gray-400 text-xs mt-1">
                              Conoce nuestro equipo y filosofía
                            </div>
                          </div>
                        </div>
                      </Link>
                      <Link
                        to="/contacto"
                        className="block px-4 py-3 text-sm group hover:bg-white/5 rounded-lg mx-2 transition-colors"
                        onClick={() => setAgencyOpen(false)}
                      >
                        <div className="flex items-start gap-3">
                          <EnvelopeClosedIcon className="w-5 h-5 text-[#038e42] mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="text-gray-200 group-hover:text-[#038e42] transition-colors font-medium">
                              Contacto
                            </div>
                            <div className="text-gray-400 text-xs mt-1">
                              Ponte en contacto con nosotros
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Botón Agendar */}
              <Link
                to="/agendar"
                className="px-4 py-2 bg-white/10 border border-white/20 text-white font-medium rounded-lg hover:bg-white/20 hover:border-white/30 transition-all duration-200 flex items-center gap-2 hover:scale-105"
              >
                <CalendarIcon className="w-4 h-4" />
                <span className="hidden xl:inline">Agendar</span>
              </Link>
              
              {/* Botón Tema */}
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-lg bg-[#111111] border border-[#038e42]/20 flex items-center justify-center text-gray-300 hover:text-[#038e42] hover:border-[#038e42]/40 hover:scale-105 transition-all duration-200"
              >
                {theme === 'dark' ? (
                  <SunIcon className="w-5 h-5" />
                ) : (
                  <MoonIcon className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Menú móvil */}
            <div className="flex lg:hidden items-center space-x-2">
              {/* Botón Tema móvil */}
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-lg bg-[#111111] border border-[#038e42]/20 flex items-center justify-center text-gray-300 hover:text-[#038e42] hover:border-[#038e42]/40 transition-all duration-200"
              >
                {theme === 'dark' ? (
                  <SunIcon className="w-4 h-4" />
                ) : (
                  <MoonIcon className="w-4 h-4" />
                )}
              </button>
              
              {/* Botón menú hamburguesa */}
              <button
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-[#038e42] hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#038e42]/50 transition-all duration-200"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Abrir menú"
              >
                {isOpen ? (
                  <Cross2Icon className="w-5 h-5" />
                ) : (
                  <HamburgerMenuIcon className="w-5 h-5" />
                )}
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
            className="fixed top-0 right-0 w-80 h-full bg-[#0a0a0a]/95 backdrop-blur-md shadow-2xl z-[999] flex flex-col lg:hidden"
          >
            {/* Header del menú móvil */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center">
                <img 
                  src="/assets/weblisy-logo.png" 
                  alt="Weblisy Logo" 
                  className="h-8 w-auto"
                />
              </div>
              <button
                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-300 hover:text-[#038e42] hover:bg-white/10 transition-all duration-200"
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar menú"
              >
                <Cross2Icon className="w-4 h-4" />
              </button>
            </div>

            {/* Navegación móvil */}
            <nav className="flex-1 p-6 space-y-4">
              {/* Enlaces principales */}
              <div className="space-y-2">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Navegación
                </h3>
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? 'text-[#038e42] bg-[#038e42]/10 border border-[#038e42]/20'
                        : 'text-gray-300 hover:text-[#038e42] hover:bg-white/5'
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
                    className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-base font-medium text-gray-300 hover:text-[#038e42] hover:bg-white/5 transition-all duration-200"
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
                            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-200 hover:text-[#038e42] hover:bg-white/5 transition-all duration-200"
                            onClick={() => { setAgencyOpen(false); setIsOpen(false); }}
                          >
                            <PersonIcon className="w-4 h-4 text-[#038e42] flex-shrink-0" />
                            <span className="text-sm">Sobre nosotros</span>
                          </Link>
                          <Link
                            to="/contacto"
                            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-200 hover:text-[#038e42] hover:bg-white/5 transition-all duration-200"
                            onClick={() => { setAgencyOpen(false); setIsOpen(false); }}
                          >
                            <EnvelopeClosedIcon className="w-4 h-4 text-[#038e42] flex-shrink-0" />
                            <span className="text-sm">Contacto</span>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Botón Agendar móvil */}
              <div className="pt-4">
                <Link
                  to="/agendar"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#038e42] text-white font-medium rounded-lg hover:bg-[#038e42]/80 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <CalendarIcon className="w-4 h-4" />
                  Agendar Reunión
                </Link>
              </div>
            </nav>

            {/* Footer del menú móvil */}
            <div className="p-6 border-t border-white/10">
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
