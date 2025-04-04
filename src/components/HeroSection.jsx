import React from 'react';
import { Button } from "./ui/button";

export default function HeroSection() {
  return (
    <section className="min-h-screen py-20 px-4 md:py-32 md:px-8 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-30"></div>
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Impulsa tu Negocio con Nuestras Aplicaciones Web
              <span className="block text-white opacity-80 text-2xl md:text-3xl mt-2 font-light">Innovación y Eficiencia a tu Alcance</span>
            </h1>
            <p className="text-lg text-white opacity-80 mb-8">
              Descubre cómo nuestras soluciones de desarrollo web pueden transformar tu negocio y llevarlo al siguiente nivel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-black hover:bg-white/90 transition-all duration-300 transform hover:scale-105">
                Explorar Soluciones
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
                Contáctanos
              </Button>
            </div>
          </div>
          <div className="relative animate-float">
         
          </div>
        </div>
      </div>
    </section>
  );
} 