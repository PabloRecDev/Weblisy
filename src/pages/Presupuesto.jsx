import React from "react";
import { Helmet } from 'react-helmet-async';
import PresupuestoSection from "@/components/PresupuestoSection";

export default function PresupuestoPage() {
  return (
    <>
      <Helmet>
        <title>Solicitar Presupuesto Web | Weblisy - Desarrollo a Medida</title>
        <meta name="description" content="Solicita tu presupuesto personalizado para desarrollo web, aplicaciones o tiendas online. Análisis gratuito de tu proyecto y propuesta detallada sin compromiso." />
        <meta name="keywords" content="presupuesto web, cotización desarrollo web, presupuesto aplicación web, presupuesto tienda online, desarrollo a medida, consultoría web gratuita" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Solicitar Presupuesto Web | Weblisy" />
        <meta property="og:description" content="Solicita tu presupuesto personalizado para desarrollo web, aplicaciones o tiendas online. Análisis gratuito sin compromiso." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://weblisy.es/presupuesto" />
        <meta property="og:image" content="https://weblisy.es/assets/Weblisy-logo-fondo.png" />
        <meta property="og:image:alt" content="Logo Weblisy - Solicitar presupuesto" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Solicitar Presupuesto Web | Weblisy" />
        <meta name="twitter:description" content="Presupuesto personalizado para desarrollo web, aplicaciones o tiendas online." />
        <meta name="twitter:image" content="https://weblisy.es/assets/Weblisy-logo-fondo.png" />
        <meta name="twitter:image:alt" content="Logo Weblisy - Solicitar presupuesto" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://weblisy.es/presupuesto" />
      </Helmet>
      
      <div className="min-h-screen bg-black">
        <main className="pt-24">
          <PresupuestoSection />
        </main>
      </div>
    </>
  );
}
