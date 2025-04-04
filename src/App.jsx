import React from 'react'
import './App.css'
import Button from './components/Button'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import TestimonialsSection from './components/TestimonialsSection'
import PricingSection from './components/PricingSection'

function App() {
  return (
    <div className="min-h-screen absolute -z-10 inset-0 h-full w-full absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-[#ffffff] to-[#000000]" >
      <Navbar brandName="WebApps Pro" />
      <main className="pt-16">
        <HeroSection title="Impulsa tu Negocio con Nuestras Aplicaciones Web" subtitle="Soluciones minimalistas y efectivas" cta="Explora Ahora" />
        <FeaturesSection title="Funcionalidades Clave" description="Descubre cómo nuestras aplicaciones pueden transformar tu negocio." />
        <TestimonialsSection title="Opiniones de Nuestros Clientes" />
        <PricingSection title="Opciones de Precios" description="Encuentra el plan perfecto para ti." />
      </main>
      <footer className="py-8 px-4 bg-black border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-white">StartSy</h3>
              <p className="text-white opacity-80">Innovación y simplicidad en cada aplicación</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-white hover:text-white/80 transition-colors">LinkedIn</a>
              <a href="#" className="text-white hover:text-white/80 transition-colors">GitHub</a>
              <a href="#" className="text-white hover:text-white/80 transition-colors">Contacto</a>
            </div>
          </div>
          <div className="mt-8 text-center text-white opacity-60 text-sm">
            © 2023 WebApps Pro. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
