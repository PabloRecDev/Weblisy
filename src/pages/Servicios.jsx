import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  DesktopIcon,
  MobileIcon,
  RocketIcon,
  Pencil2Icon,
  GlobeIcon,
  Component1Icon,
  ArrowRightIcon,
} from '@radix-ui/react-icons';

const services = [
  {
    title: 'Diseño y Desarrollo Web',
    description: 'Creamos sitios web corporativos, landing pages y portfolios a medida. Un diseño único que refleja tu marca y comunica tu mensaje de forma efectiva.',
    icon: DesktopIcon,
    href: '/servicios/desarrollo-web',
    bgColor: 'from-blue-500/10 to-blue-600/10',
    borderColor: 'border-blue-400/20',
    textColor: 'text-blue-400',
  },
  {
    title: 'Aplicaciones Web a Medida',
    description: 'Transformamos tus ideas en aplicaciones web potentes y escalables. Desarrollamos CRMs, ERPs, y sistemas de gestión complejos que optimizan tus procesos.',
    icon: Component1Icon,
    href: '/aplicaciones-web',
    bgColor: 'from-green-500/10 to-green-600/10',
    borderColor: 'border-green-400/20',
    textColor: 'text-green-400',
  },
  {
    title: 'Tiendas Online (E-commerce)',
    description: 'Lanzamos tu negocio al mundo digital con tiendas online robustas, seguras y optimizadas para la conversión. Integradas con las principales pasarelas de pago.',
    icon: MobileIcon,
    href: '/servicios/ecommerce',
    bgColor: 'from-purple-500/10 to-purple-600/10',
    borderColor: 'border-purple-400/20',
    textColor: 'text-purple-400',
  },
  {
    title: 'Mantenimiento y Soporte',
    description: 'Aseguramos que tu sitio web funcione siempre a la perfección. Ofrecemos planes de mantenimiento que incluyen actualizaciones, seguridad y soporte técnico.',
    icon: RocketIcon,
    href: '/servicios/mantenimiento',
    bgColor: 'from-yellow-500/10 to-yellow-600/10',
    borderColor: 'border-yellow-400/20',
    textColor: 'text-yellow-400',
  },
];

const ServiciosPage = () => {
  return (
    <div className="min-h-screen bg-black">
      <Helmet>
        <title>Servicios de Desarrollo Web y Aplicaciones | Weblisy</title>
        <meta name="description" content="Ofrecemos servicios de diseño web, desarrollo de aplicaciones a medida, e-commerce y mantenimiento. Soluciones tecnológicas para impulsar tu negocio." />
        <meta name="keywords" content="servicios desarrollo web, diseño web, aplicaciones a medida, e-commerce, tiendas online, mantenimiento web, soporte técnico, agencia digital" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Servicios de Desarrollo Web y Aplicaciones | Weblisy" />
        <meta property="og:description" content="Ofrecemos servicios de diseño web, desarrollo de aplicaciones a medida, e-commerce y mantenimiento. Soluciones tecnológicas para impulsar tu negocio." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://weblisy.es/servicios" />
        <meta property="og:image" content="https://weblisy.es/assets/Weblisy-logo-fondo.png" />
        <meta property="og:image:alt" content="Servicios de Desarrollo Web - Weblisy" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Servicios de Desarrollo Web | Weblisy" />
        <meta name="twitter:description" content="Diseño web, aplicaciones a medida, e-commerce y mantenimiento. Soluciones tecnológicas para tu negocio." />
        <meta name="twitter:image" content="https://weblisy.es/assets/Weblisy-logo-fondo.png" />
        <meta name="twitter:image:alt" content="Servicios de Desarrollo Web - Weblisy" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://weblisy.es/servicios" />
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
              Nuestros{' '}
              <span className="bg-gradient-to-r from-[#038e42] to-[#038e42] bg-clip-text text-transparent">
                Servicios
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Soluciones digitales diseñadas para llevar tu negocio al siguiente nivel.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 md:px-8">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Link to={service.href} className={`block h-full p-8 rounded-2xl border ${service.borderColor} bg-gradient-to-br ${service.bgColor} hover:border-white/30 transition-all duration-300 transform hover:-translate-y-2`}>
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-black border border-white/10 mb-6">
                    <service.icon className={`w-8 h-8 ${service.textColor}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-300 mb-6">{service.description}</p>
                  <div className="flex items-center text-[#038e42] font-medium">
                    <span>Más información</span>
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:py-32 md:px-8">
          <div className="container mx-auto max-w-4xl text-center">
          <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
          >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ¿No estás seguro de qué servicio necesitas?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              No te preocupes. Hablemos de tu proyecto y te asesoraremos para encontrar la solución perfecta que se adapte a tus objetivos y presupuesto.
              </p>
              <Link to="/contacto">
              <motion.button
                  className="bg-[#038e42] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#038e42]/80 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
              >
                  Solicitar Asesoría Gratuita
              </motion.button>
              </Link>
          </motion.div>
          </div>
      </section>
    </div>
  );
};

export default ServiciosPage; 