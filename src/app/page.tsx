import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
// ...importa aquí el resto de secciones de la Home si las tienes

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        {/* ...aquí el resto de secciones de la Home */}
      </main>
      <Footer />
    </>
  );
} 