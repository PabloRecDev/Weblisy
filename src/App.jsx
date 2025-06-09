import React, { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import TestimonialsSection from './components/TestimonialsSection'
import PricingSection from './components/PricingSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import AdminDashboard from './components/AdminDashboard'
import { AuthProvider } from './components/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import PrivacyPolicy from './pages/PrivacyPolicy';
import PresupuestoPage from './pages/Presupuesto';
import BlogPage from './pages/Blog';
import BlogArticlePage from './pages/BlogArticle';
import ProjectsPage from './components/projects'; // tu componente de proyectos
import { useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import LoadingScreen from './components/LoadingScreen';
import { AnimatePresence } from 'framer-motion';

function ScrollToHash() {
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
  return null;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular tiempo de carga
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <AuthProvider>
          <ScrollToHash />
          <ScrollToTop />
          <AnimatePresence mode="wait">
            {isLoading && <LoadingScreen />}
          </AnimatePresence>
          <Helmet>
            <html lang="es" />
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#000000" />
            <meta name="description" content="WebLisy - Desarrollo web profesional y soluciones digitales. Creamos aplicaciones web modernas y eficientes para impulsar tu negocio." />
            <meta name="keywords" content="desarrollo web, aplicaciones web, diseño web, programación, soluciones digitales, páginas web, desarrollo de software" />
            <meta name="author" content="WebLisy" />
            <meta name="robots" content="index, follow" />
            
            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://weblisy.com/" />
            <meta property="og:title" content="WebLisy - Desarrollo Web Profesional" />
            <meta property="og:description" content="Creamos aplicaciones web modernas y eficientes para impulsar tu negocio." />
            <meta property="og:image" content="https://weblisy.com/assets/og-image.jpg" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content="https://weblisy.com/" />
            <meta property="twitter:title" content="WebLisy - Desarrollo Web Profesional" />
            <meta property="twitter:description" content="Creamos aplicaciones web modernas y eficientes para impulsar tu negocio." />
            <meta property="twitter:image" content="https://weblisy.com/assets/twitter-image.jpg" />

            {/* Canonical URL */}
            <link rel="canonical" href="https://weblisy.com/" />

            {/* Favicon */}
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

            <title>WebLisy - Desarrollo Web Profesional</title>
          </Helmet>
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={
              <div className="min-h-screen absolute -z-10 inset-0 h-full w-full absolute bottom-0 h-1/2 w-full bg-gradient-to-t from-[#ffffff] to-[#000000]">
                <Navbar brandName="WebLisy" />
                <main className="pt-16">
                  <HeroSection />
                  <FeaturesSection />
                  <ProjectsPage /> 
                  <TestimonialsSection />
                  <PricingSection />
                  <ContactSection/>
                </main>
                <Footer/>
              </div>
            } />
            <Route path="/presupuesto" element={<PresupuestoPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/proyectos" element={<ProjectsPage />} />
            <Route path="/blog/:slug" element={<BlogArticlePage />} />
            <Route path="/privacidad" element={<PrivacyPolicy />} />

            {/* Rutas de administración */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </AuthProvider>
      </Router>
    </HelmetProvider>
  )
}

export default App
