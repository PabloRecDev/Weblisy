import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  FileTextIcon,
  Pencil2Icon,
  CodeIcon,
  RocketIcon,
  GearIcon,
} from '@radix-ui/react-icons';

const ProcesoPage = () => {
  const processSteps = [
    {
      id: 1,
      title: '1. Descubrimiento y Estrategia',
      description: 'Todo gran proyecto comienza con una buena conversación. En esta fase inicial, nos reunimos contigo para entender a fondo tus objetivos, tu público y tus necesidades. No solo escuchamos, sino que investigamos tu mercado y competencia para definir juntos la mejor estrategia digital.',
      icon: MagnifyingGlassIcon,
    },
    {
      id: 2,
      title: '2. Propuesta y Planificación',
      description: 'Con una estrategia clara, te presentamos una propuesta detallada. Este documento no es solo un presupuesto; es un plan de acción que incluye el alcance del proyecto, las tecnologías que usaremos, los plazos de entrega y una inversión transparente. Cero sorpresas.',
      icon: FileTextIcon,
    },
    {
      id: 3,
      title: '3. Diseño UI/UX',
      description: 'Aquí es donde tu idea empieza a tomar forma visual. Nuestro equipo de diseño crea wireframes y prototipos interactivos centrados en la experiencia de usuario (UX). Perfeccionamos cada detalle hasta que la interfaz (UI) sea intuitiva, atractiva y represente a la perfección tu marca.',
      icon: Pencil2Icon,
    },
    {
      id: 4,
      title: '4. Desarrollo y Programación',
      description: 'Con el diseño aprobado, nuestros desarrolladores entran en acción. Escribimos código limpio, eficiente y escalable utilizando las tecnologías más modernas. Te mantendremos informado del progreso con acceso a un entorno de pruebas para que veas la magia suceder.',
      icon: CodeIcon,
    },
    {
      id: 5,
      title: '5. Pruebas, Revisión y Lanzamiento',
      description: 'Antes del gran día, sometemos el proyecto a una fase de pruebas exhaustiva. Revisamos cada función, cada enlace y cada dispositivo para asegurar un funcionamiento impecable. Una vez que nos das tu visto bueno, coordinamos el lanzamiento y ponemos tu proyecto en línea.',
      icon: RocketIcon,
    },
    {
      id: 6,
      title: '6. Formación y Soporte Continuo',
      description: 'Nuestro trabajo no termina con el lanzamiento. Te proporcionamos la formación necesaria para que puedas gestionar tu nueva web o aplicación con autonomía. Además, ofrecemos planes de soporte y mantenimiento para asegurar que tu proyecto se mantenga seguro, actualizado y rindiendo al máximo.',
      icon: GearIcon,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Nuestro Proceso de Desarrollo | Weblisy</title>
        <meta name="description" content="Descubre nuestro proceso de trabajo transparente y colaborativo, desde la estrategia inicial hasta el lanzamiento y soporte. Así construimos soluciones web exitosas." />
        <meta name="keywords" content="proceso desarrollo web, metodología desarrollo, estrategia digital, diseño UX, programación web, lanzamiento web, soporte técnico" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Nuestro Proceso de Desarrollo | Weblisy" />
        <meta property="og:description" content="Descubre nuestro proceso de trabajo transparente y colaborativo para crear soluciones web exitosas." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://weblisy.es/proceso" />
        <meta property="og:image" content="https://weblisy.es/assets/Weblisy-logo-fondo.png" />
        <meta property="og:image:alt" content="Proceso de Desarrollo - Weblisy" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Proceso de Desarrollo | Weblisy" />
        <meta name="twitter:description" content="Proceso transparente y colaborativo para crear soluciones web exitosas." />
        <meta name="twitter:image" content="https://weblisy.es/assets/Weblisy-logo-fondo.png" />
        <meta name="twitter:image:alt" content="Proceso de Desarrollo - Weblisy" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://weblisy.es/proceso" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 px-4 md:py-32 md:px-8 text-center relative overflow-hidden bg-black">
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Nuestro{' '}
              <span className="bg-gradient-to-r from-[#038e42] to-[#038e42] bg-clip-text text-transparent">
                Proceso
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Creemos en la transparencia y la colaboración. Aquí te mostramos nuestro método de trabajo probado para llevar tu idea del concepto a la realidad.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="container mx-auto max-w-4xl">
          <h2 className="sr-only">Pasos del proceso de desarrollo</h2>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-white/10" aria-hidden="true"></div>
            
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                className={`flex items-center mb-16 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Content */}
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{step.description}</p>
                </div>
                
                {/* Icon */}
                <div className="relative z-10 w-16 h-16 bg-[#038e42] rounded-full flex items-center justify-center border-4 border-black">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Spacer */}
                <div className="w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:py-32 md:px-8 bg-gradient-to-r from-black to-black">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ¿Listo para empezar tu proyecto?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Ahora que conoces nuestro proceso, demos el primer paso juntos.
            </p>
            <Link to="/contacto">
              <motion.button
                className="bg-white text-[#038e42] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contacta con nosotros
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ProcesoPage; 