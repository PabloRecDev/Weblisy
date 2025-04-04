import React, { useState } from 'react';
import { Button } from "./ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="text-white font-bold text-xl md:text-2xl">Websy</div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
          <div className={`flex-col md:flex md:flex-row md:space-x-8 ${isOpen ? 'flex' : 'hidden md:flex'} transition-all duration-700 ease-in-out transform ${isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 md:translate-y-0 md:opacity-100'} bg-black md:bg-transparent absolute md:static top-16 left-0 w-full md:w-auto p-4 md:p-0`}>
            <a href="#" className="text-white hover:text-white/80 transition-colors py-2 md:py-0">Inicio</a>
            <a href="#caracteristics" className="text-white hover:text-white/80 transition-colors py-2 md:py-0">Características</a>
            <a href="#testimonials" className="text-white hover:text-white/80 transition-colors py-2 md:py-0">Testimonios</a>
            <a href="#pricingSection" className="text-white hover:text-white/80 transition-colors py-2 md:py-0">Planes</a>
            <a href="#contact" className="text-white hover:text-white/80 transition-colors py-2 md:py-0">Contacto</a>
            <Button className="bg-white text-black hover:bg-white/90 transition-all duration-300 mt-4 md:mt-0">
              Agendar reunión
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
