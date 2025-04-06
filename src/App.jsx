import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import TestimonialsSection from './components/TestimonialsSection'
import PricingSection from './components/PricingSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen absolute -z-10 inset-0 h-full w-full absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-[#ffffff] to-[#000000]" >
      <Navbar brandName="WebApps Pro" />
      <main className="pt-16">
        <HeroSection title="Impulsa tu Negocio con Nuestras Aplicaciones Web" subtitle="Soluciones minimalistas y efectivas" cta="Explora Ahora" />
        <FeaturesSection title="Funcionalidades Clave" description="Descubre cómo nuestras aplicaciones pueden transformar tu negocio." />
        <TestimonialsSection title="Opiniones de Nuestros Clientes" />
        <PricingSection title="Opciones de Precios" description="Encuentra el plan perfecto para ti." />
        <ContactSection/>
      </main>
      <Footer/>
    </div>
  )
}

export default App
