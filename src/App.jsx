import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import TestimonialsSection from './components/TestimonialsSection'
import PricingSection from './components/PricingSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/admin/Login'
import Dashboard from './pages/admin/Dashboard'
import { AuthProvider } from './components/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={
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
          } />
          <Route path="/privacidad" element={<PrivacyPolicy />} />

          {/* Rutas de administración */}
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />

        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
