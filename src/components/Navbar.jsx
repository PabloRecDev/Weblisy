import React, { useState, useEffect } from 'react';
import { Button } from "./ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsBlurred(true);
      } else {
        setIsBlurred(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-white/10 transition-all duration-300 ${isBlurred ? 'backdrop-blur-md' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-16">
          <div className="text-white font-bold text-xl md:text-2xl">
            <a href="#">
              <img src="/src/assets/logo-weblisy.png" alt="Logo" className="h-20 md:h-32" />
            </a>
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              )}
            </button>
          </div>
          <div className={`flex-col md:flex md:flex-row md:justify-center md:space-x-8 ${isOpen ? 'flex' : 'hidden md:flex'} transition-all duration-700 ease-in-out transform ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 md:translate-y-0 md:opacity-100'} bg-black/80 backdrop-blur-xl md:bg-transparent absolute md:static top-16 left-0 w-full md:w-auto p-4 md:p-0 md:py-2`}>
            <a href="#hero" className="text-white hover:text-white/80 transition-colors py-4 md:py-2" onClick={() => setIsOpen(false)}>Inicio</a>
            <a href="#proceso" className="text-white hover:text-white/80 transition-colors py-4 md:py-2" onClick={() => setIsOpen(false)}>Cómo Trabajamos</a>
            <a href="#testimonios" className="text-white hover:text-white/80 transition-colors py-4 md:py-2" onClick={() => setIsOpen(false)}>Testimonios</a>
            <a href="#pricingSection" className="text-white hover:text-white/80 transition-colors py-4 md:py-2" onClick={() => setIsOpen(false)}>Planes</a>
            <a href="#contacto" onClick={() => setIsOpen(false)}><Button className="bg-white text-black hover:bg-black hover:text-white border border-white transition-all duration-300 mt-0 md:mt-0 py-4 md:py-2 text-sm transform hover:scale-105 flex items-center justify-center w-full md:w-auto">Contáctanos</Button></a>
          </div>
        </div>
      </div>
    </nav>
  );
}
