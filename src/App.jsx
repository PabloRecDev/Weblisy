import React, { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import FeaturesSection from './components/FeaturesSection'
import TestimonialsSection from './components/TestimonialsSection'
import PricingSection from './components/PricingSection'
import ContactSection from './components/ContactSection'
import MeetingScheduler from './components/MeetingScheduler'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SimpleLogin from './components/SimpleLogin'
import AdminDashboard from './components/AdminDashboard'
import { AuthProvider } from './components/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import PrivacyPolicy from './pages/PrivacyPolicy';
import PresupuestoPage from './pages/Presupuesto';
import BlogPage from './pages/Blog';
import BlogArticlePage from './pages/BlogArticle';
import ProjectsPage from './components/projects';
import AplicacionesWebPage from './pages/AplicacionesWeb';
import ContactPage from './pages/Contact';
import AgendarPage from './pages/Agendar';
import NosotrosPage from './pages/Nosotros';
import ProyectoDetallePage from './pages/ProyectoDetalle';
import AdminDashboardPage from './pages/admin/Dashboard';
import { useLocation } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import LoadingScreen from './components/LoadingScreen';
import { AnimatePresence, motion } from 'framer-motion';
import SmoothScroll from './components/SmoothScroll';
import ParticleBackground from './components/ParticleBackground';
import { ThemeProvider } from './components/ThemeProvider';
import ThemeToggle from './components/ThemeToggle';
import AdminMeetingsPage from './pages/admin/Meetings';
import AdminClientesPage from './pages/admin/Clientes';
import AdminFacturasPage from './pages/admin/Facturas';
import AdminPresupuestosPage from './pages/admin/Presupuestos';
import AdminProyectosPage from './pages/admin/Proyectos';
import AdminTareasPage from './pages/admin/Tareas';

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

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    in: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    out: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  return (
    <HelmetProvider>
      <Router>
        <AuthProvider>
          <ThemeProvider>
            <SmoothScroll>
              <ScrollToHash />
              <ScrollToTop />
              <ThemeToggle />
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
                  <motion.div 
                    className="min-h-screen relative overflow-hidden"
                    variants={pageVariants}
                    initial="initial"
                    animate="in"
                    exit="out"
                  >
                    {/* Fondo principal con gradiente */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900 to-black"></div>
                    
                    {/* Partículas de fondo */}
                    <ParticleBackground 
                      particleCount={30}
                      colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)', 'rgba(255,255,255,0.1)']}
                      className="opacity-30"
                    />
                    
                    {/* Contenido principal */}
                    <div className="relative z-10">
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
                  </motion.div>
                } />
                
                <Route path="/presupuesto" element={
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="in"
                    exit="out"
                  >
                    <PresupuestoPage />
                  </motion.div>
                } />
                
                <Route path="/blog" element={
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="in"
                    exit="out"
                  >
                    <BlogPage />
                  </motion.div>
                } />
                
                <Route path="/proyectos" element={
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="in"
                    exit="out"
                  >
                    <ProjectsPage />
                  </motion.div>
                } />
                
                <Route path="/blog/:slug" element={
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="in"
                    exit="out"
                  >
                    <BlogArticlePage />
                  </motion.div>
                } />
                
                <Route path="/aplicaciones-web" element={
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="in"
                    exit="out"
                  >
                    <AplicacionesWebPage />
                  </motion.div>
                } />
                
                <Route path="/privacidad" element={
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="in"
                    exit="out"
                  >
                    <PrivacyPolicy />
                  </motion.div>
                } />

                <Route path="/contacto" element={
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="in"
                    exit="out"
                  >
                    <ContactPage />
                  </motion.div>
                } />

                <Route path="/nosotros" element={
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="in"
                    exit="out"
                  >
                    <NosotrosPage />
                  </motion.div>
                } />

                <Route path="/agendar" element={
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="in"
                    exit="out"
                  >
                    <AgendarPage />
                  </motion.div>
                } />

                <Route path="/proyecto/:id" element={
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="in"
                    exit="out"
                  >
                    <ProyectoDetallePage />
                  </motion.div>
                } />

                {/* Rutas de administración */}
                <Route path="/login" element={
                  <motion.div
                    variants={pageVariants}
                    initial="initial"
                    animate="in"
                    exit="out"
                  >
                    <SimpleLogin />
                  </motion.div>
                } />
                
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute>
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="in"
                      exit="out"
                    >
                      <AdminDashboardPage />
                    </motion.div>
                  </ProtectedRoute>
                } />
                <Route path="/admin/reuniones" element={
                  <ProtectedRoute>
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="in"
                      exit="out"
                    >
                      <AdminMeetingsPage />
                    </motion.div>
                  </ProtectedRoute>
                } />
                <Route path="/admin/clientes" element={
                  <ProtectedRoute>
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="in"
                      exit="out"
                    >
                      <AdminClientesPage />
                    </motion.div>
                  </ProtectedRoute>
                } />
                <Route path="/admin/facturas" element={
                  <ProtectedRoute>
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="in"
                      exit="out"
                    >
                      <AdminFacturasPage />
                    </motion.div>
                  </ProtectedRoute>
                } />
                <Route path="/admin/presupuestos" element={
                  <ProtectedRoute>
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="in"
                      exit="out"
                    >
                      <AdminPresupuestosPage />
                    </motion.div>
                  </ProtectedRoute>
                } />
                <Route path="/admin/proyectos" element={
                  <ProtectedRoute>
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="in"
                      exit="out"
                    >
                      <AdminProyectosPage />
                    </motion.div>
                  </ProtectedRoute>
                } />
                <Route path="/admin/tareas" element={
                  <ProtectedRoute>
                    <motion.div
                      variants={pageVariants}
                      initial="initial"
                      animate="in"
                      exit="out"
                    >
                      <AdminTareasPage />
                    </motion.div>
                  </ProtectedRoute>
                } />
                
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </SmoothScroll>
          </ThemeProvider>
        </AuthProvider>
      </Router>
    </HelmetProvider>
  )
}

export default App
