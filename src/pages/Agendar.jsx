import React from 'react';
import { Helmet } from 'react-helmet-async';
import MeetingScheduler from '@/components/MeetingScheduler';

export default function AgendarPage() {
  return (
    <>
      <Helmet>
        <title>Agendar Reunión - WebLisy | Consultoría Gratuita</title>
        <meta name="description" content="Agenda una reunión gratuita con nuestros expertos en desarrollo web. Consultoría sin compromiso para evaluar tu proyecto y encontrar la mejor solución digital." />
        <meta name="keywords" content="agendar reunión, consultoría web, desarrollo web, asesoría digital, proyecto web" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Agendar Reunión - WebLisy" />
        <meta property="og:description" content="Agenda una reunión gratuita con nuestros expertos en desarrollo web. Consultoría sin compromiso." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://weblisy.com/agendar" />
        
        {/* Twitter */}
        <meta property="twitter:title" content="Agendar Reunión - WebLisy" />
        <meta property="twitter:description" content="Agenda una reunión gratuita con nuestros expertos en desarrollo web." />
        
        {/* Canonical */}
        <link rel="canonical" href="https://weblisy.com/agendar" />
      </Helmet>

      <main className="pt-24 min-h-screen bg-black">
        <MeetingScheduler />
      </main>
    </>
  );
} 