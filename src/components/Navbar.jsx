import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "./ui/button";

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isBlurred
          ? 'bg-black/60 backdrop-blur-md border-b border-white/10'
          : 'bg-black border-b border-transparent'}
      `}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-16">
          <div className="text-white font-bold text-xl md:text-2xl ml-0 md:ml-20">
            <Link to="/" onClick={() => setIsOpen(false)}>
              <img src="/assets/weblisy-logo.png" alt="Logo" className="h-20 md:h-32" />
            </Link>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
              )}
            </button>
          </div>
          <div
            className={`
              ${isOpen ? 'flex' : 'hidden'}
              md:flex flex-col md:flex-row md:justify-center md:space-x-8
              transition-all duration-500 ease-in-out transform
              ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
              md:translate-y-0 md:opacity-100 absolute md:static top-16 md:top-0 left-0
              w-full md:w-auto z-50 p-4 md:p-0 md:py-2
              ${isOpen ? 'md:bg-transparent md:backdrop-blur-none bg-black/80 backdrop-blur-xl' : ''}
            `}
          >
            <Link to="/#hero" className="text-white hover:text-white/80 transition-colors py-4 md:py-2" onClick={() => setIsOpen(false)}>Inicio</Link>
            <Link to="/#proceso" className="text-white hover:text-white/80 transition-colors py-4 md:py-2" onClick={() => setIsOpen(false)}>Cómo Trabajamos</Link>
            <Link to="/#testimonios" className="text-white hover:text-white/80 transition-colors py-4 md:py-2" onClick={() => setIsOpen(false)}>Testimonios</Link>
            <Link to="/#pricingSection" className="text-white hover:text-white/80 transition-colors py-4 md:py-2" onClick={() => setIsOpen(false)}>Planes</Link>
            <Link to="/proyectos" className="text-white hover:text-white/80 transition-colors py-4 md:py-2" onClick={() => setIsOpen(false)}>Proyectos</Link>
            <Link to="/blog" className="text-white hover:text-green-400 transition-colors py-4 md:py-2" onClick={() => setIsOpen(false)}>Blog</Link>
            <Link to="/#contacto" onClick={() => setIsOpen(false)}>
              <Button className="bg-white text-black border-white border-opacity-10 hover:bg-transparent hover:text-white border border-white transition-all duration-300 mt-0 md:mt-0 py-1 md:py-2 text-xs md:text-sm transform flex items-center justify-center w-full md:w-auto h-auto rounded-md">
                Contáctanos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
