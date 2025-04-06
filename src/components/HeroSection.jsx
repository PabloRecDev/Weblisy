import React, { useEffect } from 'react';
import { Button } from "./ui/button";
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function HeroSection() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center py-0 px-4 md:py-32 md:px-8 bg-gradient-to-b from-black/30 to-black/5 relative overflow-hidden mt-0">
      <div className="absolute -z-10 inset-0 h-full w-full bg-[#0a0a0a]"><div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.20)_1px,transparent_1px)] bg-[size:16px_16px]"></div></div>
      <div className="container mx-auto max-w-6xl relative z-10 flex flex-col items-center justify-center text-center">
        <div className="grid grid-cols-1 gap-12 items-center justify-items-center" data-aos="fade-up" data-aos-duration="1500" data-aos-delay="200">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Impulsa tu Negocio con Nuestras Aplicaciones Web
              <span className="block text-white opacity-80 text-2xl md:text-3xl mt-2 font-light">Innovación y Eficiencia a tu Alcance</span>
            </h1>
            <p className="text-lg text-white opacity-80 mb-8">
              Descubre cómo nuestras soluciones de desarrollo web pueden transformar tu negocio y llevarlo al siguiente nivel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#pricingSection" className="flex">
                <Button className=" border bg-white text-black hover:text-white hover:bg-black/90 transition-all duration-300 transform hover:scale-105">
                  Explorar Soluciones
                </Button>
              </a>
              <a href="#contacto" className="flex">
                <Button variant="outline" className=" border text-white hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
                  Contáctanos
                </Button>
              </a>
            </div>
          </div>
          <div className="relative animate-float">
         
          </div>
        </div>
      </div>
    </section>
  );
} 