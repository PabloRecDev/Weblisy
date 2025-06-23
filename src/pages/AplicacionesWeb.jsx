import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  CodeIcon, 
  RocketIcon, 
  StarIcon, 
  CheckIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
  MobileIcon,
  DesktopIcon,
  GlobeIcon
} from '@radix-ui/react-icons';

export default function AplicacionesWeb() {
  const projects = [
    {
      id: 1,
      title: "Sistema de Gestión de Inventarios",
      description: "Aplicación web completa para control de stock, ventas y reportes en tiempo real.",
      category: "E-commerce",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      features: [
        "Dashboard interactivo con gráficos",
        "Gestión de productos y categorías",
        "Sistema de usuarios y permisos",
        "Reportes automáticos",
        "Integración con pasarelas de pago"
      ],
      image: "/assets/Sistema-Inventario1.png",
      demo: "#",
      github: "#",
      status: "Completado"
    },
    {
      id: 2,
      title: "Plataforma de Reservas Online",
      description: "Sistema completo para restaurantes y servicios con gestión de citas y pagos.",
      category: "Servicios",
      technologies: ["Next.js", "PostgreSQL", "Stripe", "SendGrid"],
      features: [
        "Calendario de reservas inteligente",
        "Sistema de pagos integrado",
        "Notificaciones automáticas",
        "Panel de administración",
        "App móvil responsive"
      ],
      image: "/assets/Sistema-Reservas.png",
      demo: "#",
      github: "#",
      status: "En desarrollo"
    },
    {
      id: 3,
      title: "CRM Empresarial",
      description: "Sistema de gestión de relaciones con clientes para empresas medianas.",
      category: "Business",
      technologies: ["Vue.js", "Laravel", "MySQL", "Redis"],
      features: [
        "Gestión de leads y oportunidades",
        "Pipeline de ventas visual",
        "Automatización de emails",
        "Analytics avanzados",
        "Integración con herramientas externas"
      ],
      image: "/assets/app-crm.png",
      demo: "#",
      github: "#",
      status: "Completado"
    },
    {
      id: 4,
      title: "Red Social Corporativa",
      description: "Plataforma de comunicación interna para equipos de trabajo.",
      category: "Social",
      technologies: ["React", "Socket.io", "MongoDB", "AWS"],
      features: [
        "Chat en tiempo real",
        "Compartir archivos y documentos",
        "Grupos y canales",
        "Notificaciones push",
        "API REST completa"
      ],
      image: "/assets/Sistema-GestiónIncidencias.png",
      demo: "#",
      github: "#",
      status: "Completado"
    },
    {
      id: 5,
      title: "App de Delivery",
      description: "Plataforma completa de delivery con tracking en tiempo real.",
      category: "Delivery",
      technologies: ["React Native", "Node.js", "PostgreSQL", "MapBox"],
      features: [
        "Tracking GPS en tiempo real",
        "Sistema de pagos múltiples",
        "Gestión de repartidores",
        "Notificaciones push",
        "Analytics de rutas"
      ],
      image: "/assets/Sistema-Skyvibes.png",
      demo: "#",
      github: "#",
      status: "En desarrollo"
    },
    {
      id: 6,
      title: "Marketplace Educativo",
      description: "Plataforma para compra y venta de cursos online.",
      category: "Educación",
      technologies: ["Next.js", "Stripe", "AWS S3", "PostgreSQL"],
      features: [
        "Sistema de cursos online",
        "Pasarela de pagos",
        "Reproductor de video",
        "Certificados automáticos",
        "Sistema de reviews"
      ],
      image: "/assets/Boketto.png",
      demo: "#",
      github: "#",
      status: "Completado"
    }
  ];

  const categories = ["Todos", "E-commerce", "Servicios", "Business", "Social", "Delivery", "Educación"];
  const [selectedCategory, setSelectedCategory] = React.useState("Todos");

  const filteredProjects = selectedCategory === "Todos" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

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

  const cardVariants = {
    hover: {
      y: -10,
      scale: 1.02,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Helmet>
        <title>Aplicaciones Web a Medida | Weblisy - Desarrollo de Software</title>
        <meta name="description" content="Descubre nuestras aplicaciones web a medida. Desarrollamos soluciones personalizadas para e-commerce, CRM, sistemas de gestión y más. Tecnologías modernas y escalables." />
        <meta name="keywords" content="aplicaciones web, desarrollo a medida, software empresarial, CRM, e-commerce, sistemas de gestión, desarrollo web, React, Node.js, MongoDB" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Aplicaciones Web a Medida | Weblisy" />
        <meta property="og:description" content="Desarrollamos aplicaciones web personalizadas para tu negocio. Soluciones escalables y modernas." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://weblisy.com/aplicaciones-web" />
        <meta property="og:image" content="https://weblisy.com/assets/weblisy-logo.png" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Aplicaciones Web a Medida | Weblisy" />
        <meta name="twitter:description" content="Desarrollamos aplicaciones web personalizadas para tu negocio." />
        <meta name="twitter:image" content="https://weblisy.com/assets/weblisy-logo.png" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://weblisy.com/aplicaciones-web" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 px-4 md:py-32 md:px-8 relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-black/10 to-black/10"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="flex justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <CodeIcon className="w-16 h-16 text-[#038e42]" />
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Aplicaciones{' '}
              <span className="bg-gradient-to-r from-[#038e42] to-[#038e42] bg-clip-text text-transparent">
                Web
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Desarrollamos aplicaciones web personalizadas que se adaptan perfectamente a las necesidades de tu negocio. 
              Tecnologías modernas, escalabilidad y rendimiento excepcional.
            </p>

            <motion.div 
              className="flex flex-wrap justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-2 bg-black p-3 rounded-lg border border-white/10">
                <MobileIcon className="w-5 h-5 text-[#038e42]" />
                <span className="text-white">Responsive</span>
              </div>
              <div className="flex items-center gap-2 bg-black p-3 rounded-lg border border-white/10">
                <RocketIcon className="w-5 h-5 text-[#038e42]" />
                <span className="text-white">Rápido</span>
              </div>
                <div className="flex items-center gap-2 bg-black p-3 rounded-lg border border-white/10">
                <StarIcon className="w-5 h-5 text-[#038e42]" />
                <span className="text-white">Escalable</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Filtros de categorías */}
      <section className="py-8 px-4 md:px-8 bg-black">
        <div className="container mx-auto max-w-6xl">
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-[#038e42] text-white shadow-lg'
                    : 'bg-black text-gray-300 hover:bg-gray-900 border border-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Proyectos */}
      <section className="py-20 px-4 md:py-32 md:px-8 bg-black">
        <div className="container mx-auto max-w-7xl">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="bg-black rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
                variants={itemVariants}
                whileHover="hover"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={`Captura de pantalla de ${project.title}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'Completado' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <span className="text-xs font-medium text-[#038e42] uppercase tracking-wide">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mt-2 mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-white mb-2">Tecnologías:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span 
                          key={tech}
                          className="px-3 py-1 bg-[#038e42]/10 text-[#038e42] text-xs rounded-full border border-[#038e42]/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">  
                    <h4 className="text-sm font-semibold text-white mb-2">Características:</h4>
                    <ul className="space-y-1">
                      
                      {project.features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-300 text-sm">
                          <CheckIcon className="w-3 h-3 text-[#038e42] flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      className="flex-1 bg-[#038e42] text-white py-2 px-4 rounded-lg font-medium hover:bg-[#038e42]/80 transition-colors flex items-center justify-center gap-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ExternalLinkIcon className="w-4 h-4" />
                      Demo
                    </motion.button>
                    <Link to={`/proyecto/${project.id}`}>
                      <motion.button
                        className="flex-1 bg-black text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 border border-white/10"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ArrowRightIcon className="w-4 h-4" />
                        Detalles
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
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
              ¿Necesitas una aplicación web personalizada?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Cuéntanos sobre tu proyecto y te ayudaremos a crear la solución perfecta para tu negocio.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link to="/#contacto">
                <motion.button
                  className="bg-white text-[#038e42] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Solicitar Presupuesto
                </motion.button>
              </Link>
              <Link to="/#proceso">
                <motion.button
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#038e42] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Ver Proceso
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Botón CTA */}
      <section className="py-20 px-4 md:px-8 bg-black">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ¿Tienes una idea para una aplicación web?
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto text-lg mb-8">
              Nos encantaría escucharla. Contáctanos para una consultoría gratuita y sin compromiso.
            </p>
            <Link to="/contacto">
              <motion.button
                className="bg-[#038e42] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#038e42]/80 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contáctanos ahora
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
} 