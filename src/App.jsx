import React, { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './components/AuthContext'
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

// Layouts
import MainLayout from './components/MainLayout';
import AdminLayout from './components/AdminLayout';

// Componentes y Páginas
import ScrollToTop from './components/ScrollToTop';

import SmoothScroll from './components/SmoothScroll';
import { ThemeProvider } from './components/ThemeProvider';
import Chatbot from './components/Chatbot';

// Páginas Públicas
import HomePage from './pages/Home';
import PresupuestoPage from './pages/Presupuesto';
import BlogPage from './pages/Blog';
import BlogArticlePage from './pages/BlogArticle';
import ProjectsPage from './components/projects';
import AplicacionesWebPage from './pages/AplicacionesWeb';
import ContactPage from './pages/Contact';
import AgendarPage from './pages/Agendar';
import NosotrosPage from './pages/Nosotros';
import ProcesoPage from './pages/Proceso';
import ServiciosPage from './pages/Servicios';
import DesarrolloWebPage from './pages/DesarrolloWeb';
import EcommercePage from './pages/Ecommerce';
import MantenimientoPage from './pages/Mantenimiento';
import ProyectoDetallePage from './pages/ProyectoDetalle';
import FAQPage from './pages/FAQ';
import PrivacyPolicy from './pages/PrivacyPolicy';
import PlanSitioWeb from './pages/PlanSitioWeb';
import PlanSitioWebIA from './pages/PlanSitioWebIA';
import CvMasterPage from './pages/CvMaster';
import CvMasterLanding from './pages/CvMasterLanding';
import CvMasterAppPage from './pages/CvMasterApp';
import CvMasterTestPage from './pages/CvMasterTest';
import CVMasterLogin from './pages/CVMasterLogin';
import CVMasterRegister from './pages/CVMasterRegister';
import CVMasterProtectedRoute from './components/CVMasterProtectedRoute';
import { CVMasterAuthProvider } from './contexts/CVMasterAuthContext';

// CvmasteApp Components
import CvmasteAppHome from './app/cvmasteApp/page';
import CvmasteAppCrear from './app/cvmasteApp/crear';
import CvmasteAppMisCVs from './app/cvmasteApp/mis-cvs';
import CvmasteAppAjustes from './app/cvmasteApp/ajustes';
import CvmasteAppAyuda from './app/cvmasteApp/ayuda';
import CVPreviewPage from './app/cvmasteApp/preview';

// Páginas de Admin
import AdminDashboardPage from './pages/admin/Dashboard';
import AdminMeetingsPage from './pages/admin/Meetings';
import AdminClientesPage from './pages/admin/Clientes';
import AdminFacturasPage from './pages/admin/Facturas';
import AdminPresupuestosPage from './pages/admin/Presupuestos';
import AdminSolicitudesPresupuestoPage from './pages/admin/SolicitudesPresupuesto';
import AdminProyectosPage from './pages/admin/Proyectos';
import AdminTareasPage from './pages/admin/Tareas';
import AdminLeadsPage from './pages/admin/Leads';
import PromocionesPage from './pages/admin/Promociones';
import SimpleLogin from './components/SimpleLogin'
import ProtectedRoute from './components/ProtectedRoute'
import NotificacionesPage from './pages/admin/Notificaciones';

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

const PageWrapper = ({ children }) => {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    out: { opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeIn" } }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
    >
      {children}
    </motion.div>
  );
};


function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <AuthProvider>
            <SmoothScroll>
              <ScrollToHash />
              <ScrollToTop />
              <Chatbot />
              
              {/* Global SEO and Accessibility */}
              <div className="App" role="application" aria-label="Weblisy - Agencia de Desarrollo Web">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<MainLayout><PageWrapper><HomePage /></PageWrapper></MainLayout>} />
                  <Route path="/presupuesto" element={<MainLayout><PageWrapper><PresupuestoPage /></PageWrapper></MainLayout>} />
                  <Route path="/plan-sitio-web" element={<MainLayout><PageWrapper><PlanSitioWeb /></PageWrapper></MainLayout>} />
                  <Route path="/plan-sitio-web-ia" element={<MainLayout><PageWrapper><PlanSitioWebIA /></PageWrapper></MainLayout>} />
                  <Route path="/blog" element={<MainLayout><PageWrapper><BlogPage /></PageWrapper></MainLayout>} />
                  <Route path="/blog/:slug" element={<MainLayout><PageWrapper><BlogArticlePage /></PageWrapper></MainLayout>} />
                  <Route path="/proyectos" element={<MainLayout><PageWrapper><ProjectsPage /></PageWrapper></MainLayout>} />
                  <Route path="/aplicaciones-web" element={<MainLayout><PageWrapper><AplicacionesWebPage /></PageWrapper></MainLayout>} />
                  <Route path="/contacto" element={<MainLayout><PageWrapper><ContactPage /></PageWrapper></MainLayout>} />
                  <Route path="/agendar" element={<MainLayout><PageWrapper><AgendarPage /></PageWrapper></MainLayout>} />
                  <Route path="/nosotros" element={<MainLayout><PageWrapper><NosotrosPage /></PageWrapper></MainLayout>} />
                  <Route path="/proceso" element={<MainLayout><PageWrapper><ProcesoPage /></PageWrapper></MainLayout>} />
                  <Route path="/servicios" element={<MainLayout><PageWrapper><ServiciosPage /></PageWrapper></MainLayout>} />
                  <Route path="/servicios/desarrollo-web" element={<MainLayout><PageWrapper><DesarrolloWebPage /></PageWrapper></MainLayout>} />
                  <Route path="/servicios/ecommerce" element={<MainLayout><PageWrapper><EcommercePage /></PageWrapper></MainLayout>} />
                  <Route path="/servicios/mantenimiento" element={<MainLayout><PageWrapper><MantenimientoPage /></PageWrapper></MainLayout>} />
                  <Route path="/proyectos/:slug" element={<MainLayout><PageWrapper><ProyectoDetallePage /></PageWrapper></MainLayout>} />
                  <Route path="/faq" element={<MainLayout><PageWrapper><FAQPage /></PageWrapper></MainLayout>} />
                  <Route path="/privacidad" element={<MainLayout><PageWrapper><PrivacyPolicy /></PageWrapper></MainLayout>} />
                  {/* CV Master Routes */}
                  <Route path="/cv-master" element={<CvMasterPage />} />
                  <Route path="/cv-master-landing" element={<CvMasterLanding />} />
                  <Route path="/cv-master/app/*" element={<CvMasterAppPage />} />
                  <Route path="/cv-master-test" element={<CvMasterTestPage />} />
                  
                  {/* CV Master Auth Routes */}
                  <Route path="/cvmaster-login" element={
                    <CVMasterAuthProvider>
                      <CVMasterLogin />
                    </CVMasterAuthProvider>
                  } />
                  <Route path="/cvmaster-register" element={
                    <CVMasterAuthProvider>
                      <CVMasterRegister />
                    </CVMasterAuthProvider>
                  } />
                  
                  {/* CvmasteApp Routes */}
                  <Route path="/cvmasterApp" element={
                    <CVMasterAuthProvider>
                      <CVMasterProtectedRoute>
                        <CvmasteAppHome />
                      </CVMasterProtectedRoute>
                    </CVMasterAuthProvider>
                  } />
                  <Route path="/cvmasterApp/crear" element={
                    <CVMasterAuthProvider>
                      <CVMasterProtectedRoute>
                        <CvmasteAppCrear />
                      </CVMasterProtectedRoute>
                    </CVMasterAuthProvider>
                  } />
                  <Route path="/cvmasterApp/crear/:id" element={
                    <CVMasterAuthProvider>
                      <CVMasterProtectedRoute>
                        <CvmasteAppCrear />
                      </CVMasterProtectedRoute>
                    </CVMasterAuthProvider>
                  } />
                  <Route path="/cvmasterApp/mis-cvs" element={
                    <CVMasterAuthProvider>
                      <CVMasterProtectedRoute>
                        <CvmasteAppMisCVs />
                      </CVMasterProtectedRoute>
                    </CVMasterAuthProvider>
                  } />
                  <Route path="/cvmasterApp/ajustes" element={
                    <CVMasterAuthProvider>
                      <CVMasterProtectedRoute>
                        <CvmasteAppAjustes />
                      </CVMasterProtectedRoute>
                    </CVMasterAuthProvider>
                  } />
                  <Route path="/cvmasterApp/ayuda" element={
                    <CVMasterAuthProvider>
                      <CVMasterProtectedRoute>
                        <CvmasteAppAyuda />
                      </CVMasterProtectedRoute>
                    </CVMasterAuthProvider>
                  } />
                  <Route path="/cvmasterApp/preview/:cvId" element={
                    <CVMasterAuthProvider>
                      <CVMasterProtectedRoute>
                        <CVPreviewPage />
                      </CVMasterProtectedRoute>
                    </CVMasterAuthProvider>
                  } />

                  {/* Admin Routes */}
                  <Route path="/login" element={<SimpleLogin />} />
                  <Route path="/admin" element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<AdminDashboardPage />} />
                    <Route path="reuniones" element={<AdminMeetingsPage />} />
                    <Route path="leads" element={<AdminLeadsPage />} />
                    <Route path="solicitudes-presupuesto" element={<AdminSolicitudesPresupuestoPage />} />
                    <Route path="promociones" element={<PromocionesPage />} />
                    <Route path="clientes" element={<AdminClientesPage />} />
                    <Route path="facturas" element={<AdminFacturasPage />} />
                    <Route path="presupuestos" element={<AdminPresupuestosPage />} />
                    <Route path="proyectos" element={<AdminProyectosPage />} />
                    <Route path="tareas" element={<AdminTareasPage />} />
                    <Route path="notificaciones" element={<NotificacionesPage />} />
                  </Route>
                </Routes>
              </div>
            </SmoothScroll>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
