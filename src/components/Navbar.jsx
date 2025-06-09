import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "./ui/button";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HamburgerMenuIcon, 
  Cross1Icon
} from '@radix-ui/react-icons';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      setIsBlurred(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { to: '/#hero', label: 'Inicio' },
    { to: '/#proceso', label: 'Cómo Trabajamos' },
    { to: '/#testimonios', label: 'Testimonios' },
    { to: '/#proyectos', label: 'Proyectos' },
    { to: '/#pricingSection', label: 'Planes' },
    { to: '/blog', label: 'Blog' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isBlurred
          ? 'bg-black/60 backdrop-blur-md border-b border-white/10'
          : 'bg-black border-b border-transparent'}
      `}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-16">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white font-bold text-xl md:text-2xl ml-0 md:ml-20"
          >
            <Link to="/" onClick={() => setIsOpen(false)}>
              <img src="/assets/weblisy-logo.png" alt="Logo" className="h-20 md:h-32" />
            </Link>
          </motion.div>

          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="text-white hover:bg-white/10"
            >
              {isOpen ? (
                <Cross1Icon className="w-6 h-6" />
              ) : (
                <HamburgerMenuIcon className="w-6 h-6" />
              )}
            </Button>
          </div>

          {/* Menú de escritorio */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-white hover:text-white/80 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link to="/#contacto">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 py-2 text-sm transform flex items-center justify-center w-auto h-auto rounded-full">
                Contáctanos
              </Button>
            </Link>
          </div>

          {/* Menú móvil */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="absolute top-16 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 md:hidden"
              >
                <div className="flex flex-col p-4 space-y-4">
                  {menuItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className="text-white hover:text-white/80 transition-colors py-2"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <Link to="/#contacto" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 transition-all duration-300 py-2 text-sm transform flex items-center justify-center h-auto rounded-full">
                      Contáctanos
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.nav>
  );
}
