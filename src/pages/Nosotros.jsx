import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  RocketIcon, 
  StarIcon, 
  HeartIcon, 
  TargetIcon,
  PersonIcon,
  EnvelopeClosedIcon,
  GlobeIcon,
  CheckIcon,
  ArrowRightIcon,
  CodeIcon,
  ImageIcon,
  ChatBubbleIcon
} from '@radix-ui/react-icons';

export default function Nosotros() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const values = [
    {
      icon: <RocketIcon className="w-8 h-8" />,
      title: "Innovación",
      description: "Siempre buscamos las mejores tecnologías y metodologías para crear soluciones únicas."
    },
    {
      icon: <HeartIcon className="w-8 h-8" />,
      title: "Pasión",
      description: "Amamos lo que hacemos y eso se refleja en cada proyecto que desarrollamos."
    },
    {
      icon: <TargetIcon className="w-8 h-8" />,
      title: "Excelencia",
      description: "Nos esforzamos por la perfección en cada detalle, desde el código hasta la experiencia del usuario."
    },
    {
      icon: <StarIcon className="w-8 h-8" />,
      title: "Calidad",
      description: "Entregamos productos de alta calidad que superan las expectativas de nuestros clientes."
    }
  ];

  const services = [
    {
      icon: <CodeIcon className="w-6 h-6" />,
      title: "Desarrollo Web",
      description: "Sitios web modernos y aplicaciones web escalables"
    },
    {
      icon: <ImageIcon className="w-6 h-6" />,
      title: "Diseño UX/UI",
      description: "Interfaces intuitivas y experiencias de usuario excepcionales"
    },
    {
      icon: <ChatBubbleIcon className="w-6 h-6" />,
      title: "Consultoría",
      description: "Asesoramiento estratégico para transformación digital"
    }
  ];

  const stats = [
    { number: "20+", label: "Proyectos Completados" },
    { number: "15+", label: "Clientes Satisfechos" },
    { number: "100%", label: "Personalizado" },
    { number: "100%", label: "Compromiso con la Calidad" }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Helmet>
        <title>Sobre Nosotros - Weblisy | Desarrollo Web Profesional</title>
        <meta name="description" content="Conoce nuestro equipo, valores y misión. Somos especialistas en desarrollo web y transformación digital con años de experiencia." />
        <meta name="keywords" content="sobre nosotros, equipo weblisy, desarrollo web, transformación digital" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Sobre Nosotros - Weblisy" />
        <meta property="og:description" content="Conoce nuestro equipo y nuestra pasión por el desarrollo web" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://weblisy.es/nosotros" />
        <meta property="og:image" content="https://weblisy.es/assets/Weblisy-logo-fondo.png" />
        <meta property="og:image:alt" content="Sobre Nosotros - Weblisy" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sobre Nosotros - Weblisy" />
        <meta name="twitter:description" content="Conoce nuestro equipo y nuestra pasión por el desarrollo web" />
        <meta name="twitter:image" content="https://weblisy.es/assets/Weblisy-logo-fondo.png" />
        <meta name="twitter:image:alt" content="Sobre Nosotros - Weblisy" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://weblisy.es/nosotros" />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_100%)]"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div 
            className="text-center mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 text-white"
              variants={itemVariants}
            >
              Sobre{' '}
              <span className="bg-gradient-to-r from-[#038e42] to-[#038e42]/70 bg-clip-text text-transparent">
                Nosotros
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-white/80 max-w-3xl mx-auto text-xl leading-relaxed"
              variants={itemVariants}
            >
              Somos un equipo apasionado por la tecnología y la innovación. 
              Nuestra misión es transformar ideas en realidades digitales que impulsen el crecimiento de tu negocio.
            </motion.p>
          </motion.div>

          {/* Estadísticas */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                variants={itemVariants}
              >
                <div className="text-3xl md:text-4xl font-bold text-[#038e42] mb-2">
                  {stat.number}
                </div>
                <div className="text-white/70 text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Nuestra Historia */}
      <section className="py-20 px-4 md:px-8 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Nuestra Historia
              </h2>
              <div className="space-y-4 text-white/80 text-lg leading-relaxed">
                <p>
                  Weblisy nació de la pasión por crear soluciones digitales que realmente marquen la diferencia. 
                  Fundada por desarrolladores y diseñadores con años de experiencia en el sector tecnológico.
                </p>
                <p>
                  Desde nuestros inicios, nos hemos especializado en el desarrollo de aplicaciones web modernas, 
                  sitios web profesionales y soluciones de transformación digital que ayudan a las empresas a 
                  crecer y evolucionar en el mundo digital.
                </p>
                <p>
                  Nuestro compromiso con la excelencia y la innovación nos ha permitido trabajar con clientes 
                  de diversos sectores, desde startups hasta empresas establecidas, siempre entregando resultados 
                  que superan las expectativas.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="w-full h-80 bg-gradient-to-br from-[#038e42]/20 to-[#038e42]/5 rounded-2xl border border-[#038e42]/20 flex items-center justify-center">
                <RocketIcon className="w-24 h-24 text-[#038e42]" aria-hidden="true" />
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full border border-white/20 flex items-center justify-center">
                <StarIcon className="w-8 h-8 text-white" aria-hidden="true" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[#038e42]/20 rounded-full border border-[#038e42]/30 flex items-center justify-center">
                <HeartIcon className="w-6 h-6 text-[#038e42]" aria-hidden="true" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nuestros Valores */}
      <section className="py-20 px-4 md:px-8 relative bg-white/5">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Nuestros Valores
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto text-lg">
              Estos son los principios que guían nuestro trabajo y nos definen como empresa.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[#038e42]/30 transition-all duration-300 group"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="w-16 h-16 bg-[#038e42]/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#038e42]/30 transition-colors duration-300">
                  <div className="text-[#038e42]">
                    {React.cloneElement(value.icon, { 'aria-hidden': true })}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-white/70 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Nuestros Servicios */}
      <section className="py-20 px-4 md:px-8 relative">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Lo que Hacemos
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto text-lg">
              Ofrecemos servicios integrales de desarrollo web y transformación digital.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="p-8 rounded-xl bg-white/5 border border-white/10 hover:border-[#038e42]/30 transition-all duration-300 group"
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="w-14 h-14 bg-[#038e42]/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#038e42]/30 transition-colors duration-300">
                  <div className="text-[#038e42]">
                    {React.cloneElement(service.icon, { 'aria-hidden': true })}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">{service.title}</h3>
                <p className="text-white/70 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 relative bg-gradient-to-r from-[#038e42]/10 to-[#038e42]/5">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ¿Listo para Trabajar Juntos?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Cuéntanos sobre tu proyecto y descubre cómo podemos ayudarte a alcanzar tus objetivos digitales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-[#038e42] text-white font-semibold rounded-lg hover:bg-[#038e42]/80 transition-colors duration-300 flex items-center justify-center gap-2"
              >
                Comenzar Proyecto
                <ArrowRightIcon className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-[#038e42] text-[#038e42] font-semibold rounded-lg hover:bg-[#038e42] hover:text-white transition-colors duration-300"
              >
                Contactar
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 