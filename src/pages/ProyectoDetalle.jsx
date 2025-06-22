import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  ArrowLeftIcon,
  ExternalLinkIcon,
  CheckIcon,
  StarIcon,
  CalendarIcon,
  PersonIcon,
  GlobeIcon,
  MobileIcon,
  DesktopIcon,
  CodeIcon,
  RocketIcon
} from '@radix-ui/react-icons';

// Datos completos de los proyectos con más imágenes
const projects = [
  {
    id: 1,
    title: "Sistema de Gestión de Inventarios",
    description: "Aplicación web completa para control de stock, ventas y reportes en tiempo real.",
    longDescription: "Sistema integral de gestión empresarial diseñado para optimizar el control de inventarios, ventas y reportes. La aplicación incluye un dashboard interactivo con métricas en tiempo real, gestión completa de productos y categorías, sistema de usuarios con diferentes niveles de permisos, y generación automática de reportes detallados.",
    category: "E-commerce",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Socket.io", "Chart.js"],
    features: [
      "Dashboard interactivo con gráficos en tiempo real",
      "Gestión completa de productos y categorías",
      "Sistema de usuarios y permisos avanzado",
      "Reportes automáticos y exportables",
      "Integración con múltiples pasarelas de pago",
      "Notificaciones automáticas por email",
      "API REST completa con documentación",
      "Sistema de respaldos automáticos"
    ],
    images: [
      "/assets/Sistema-Inventario1.png",
      "/assets/Sistema-Inventario2.png",
      "/assets/Sistema-Inventario3.png",
      "/assets/Sistema-Inventario4.png",
      "/assets/Sistema-Inventario5.png"
    ],
    demo: "#",
    github: "#",
    status: "Completado",
    duration: "3 meses",
    team: "4 desarrolladores",
    client: "Empresa de retail",
    challenges: [
      "Integración con múltiples sistemas de pago",
      "Optimización de consultas para grandes volúmenes de datos",
      "Implementación de notificaciones en tiempo real"
    ],
    solutions: [
      "Desarrollo de API unificada para pasarelas de pago",
      "Implementación de índices optimizados en MongoDB",
      "Uso de Socket.io para comunicación bidireccional"
    ]
  },
  {
    id: 2,
    title: "Plataforma de Reservas Online",
    description: "Sistema completo para restaurantes y servicios con gestión de citas y pagos.",
    longDescription: "Plataforma integral de reservas diseñada específicamente para restaurantes y servicios profesionales. El sistema incluye un calendario inteligente que se adapta a la disponibilidad real, integración completa con sistemas de pago, notificaciones automáticas para confirmaciones y recordatorios, y un panel de administración completo para gestionar todas las operaciones.",
    category: "Servicios",
    technologies: ["Next.js", "PostgreSQL", "Stripe", "SendGrid", "Prisma", "Tailwind CSS"],
    features: [
      "Calendario de reservas inteligente y dinámico",
      "Sistema de pagos integrado con Stripe",
      "Notificaciones automáticas por email y SMS",
      "Panel de administración completo",
      "App móvil responsive y PWA",
      "Sistema de reviews y calificaciones",
      "Integración con Google Calendar",
      "Reportes de ocupación y rentabilidad"
    ],
    images: [
      "/assets/Sistema-Reservas.png",
      "/assets/BokettoAdmin.png",
    ],
    demo: "#",
    github: "#",
    status: "En desarrollo",
    duration: "2 meses",
    team: "3 desarrolladores",
    client: "Cadena de restaurantes",
    challenges: [
      "Sincronización en tiempo real de disponibilidad",
      "Integración con múltiples calendarios",
      "Optimización para dispositivos móviles"
    ],
    solutions: [
      "Implementación de WebSockets para actualizaciones en tiempo real",
      "API unificada para integración con calendarios externos",
      "Diseño mobile-first con PWA capabilities"
    ]
  },
  {
    id: 3,
    title: "CRM Empresarial",
    description: "Sistema de gestión de relaciones con clientes para empresas medianas.",
    longDescription: "CRM empresarial completo diseñado para empresas medianas que necesitan gestionar eficientemente sus relaciones con clientes. El sistema incluye un pipeline de ventas visual e intuitivo, automatización de emails y seguimientos, analytics avanzados para toma de decisiones, y integración con herramientas externas populares del mercado.",
    category: "Business",
    technologies: ["Vue.js", "Laravel", "MySQL", "Redis", "Vuex", "Laravel Sanctum"],
    features: [
      "Gestión completa de leads y oportunidades",
      "Pipeline de ventas visual e interactivo",
      "Automatización de emails y seguimientos",
      "Analytics avanzados y reportes",
      "Integración con herramientas externas",
      "Sistema de tareas y recordatorios",
      "Dashboard personalizable",
      "API para integraciones de terceros"
    ],
    images: [
      "/assets/app-crm.png",
      "/assets/app-crm-clientes.png",
      "/assets/app-crm-3.png",
      "/assets/app-crm-4.png",
      "/assets/app-crm-5.png",
      "/assets/app-crm-6.png"
    ],
    demo: "#",
    github: "#",
    status: "Completado",
    duration: "4 meses",
    team: "5 desarrolladores",
    client: "Empresa de consultoría",
    challenges: [
      "Procesamiento de grandes volúmenes de datos",
      "Integración con múltiples APIs externas",
      "Implementación de automatizaciones complejas"
    ],
    solutions: [
      "Optimización de consultas y uso de Redis para caché",
      "Arquitectura modular para integraciones",
      "Sistema de workflows configurables"
    ]
  },
  {
    id: 4,
    title: "Red Social Corporativa",
    description: "Plataforma de comunicación interna para equipos de trabajo.",
    longDescription: "Red social corporativa diseñada para mejorar la comunicación interna de equipos de trabajo. La plataforma incluye chat en tiempo real, compartir archivos y documentos de forma segura, creación de grupos y canales temáticos, notificaciones push personalizables, y una API REST completa para integraciones.",
    category: "Social",
    technologies: ["React", "Socket.io", "MongoDB", "AWS", "Redux", "AWS S3"],
    features: [
      "Chat en tiempo real con Socket.io",
      "Compartir archivos y documentos seguros",
      "Grupos y canales temáticos",
      "Notificaciones push personalizables",
      "API REST completa",
      "Sistema de permisos granular",
      "Búsqueda avanzada de contenido",
      "Integración con herramientas de productividad"
    ],
    images: [
      "/assets/Sistema-GestiónIncidencias.png",
      "/assets/Sistema-GestiónIncidenciasHome.png",
      "/assets/Sistema-GestionIncidenciasMy.png",
      "/assets/Sistema-GestionIncidenciasNoti.png"
    ],
    demo: "#",
    github: "#",
    status: "Completado",
    duration: "5 meses",
    team: "6 desarrolladores",
    client: "Empresa tecnológica",
    challenges: [
      "Escalabilidad para miles de usuarios concurrentes",
      "Seguridad en el manejo de archivos",
      "Optimización de la experiencia en tiempo real"
    ],
    solutions: [
      "Arquitectura distribuida con microservicios",
      "Encriptación end-to-end para archivos",
      "Optimización de WebSockets y lazy loading"
    ]
  },
  {
    id: 5,
    title: "App de Delivery",
    description: "Plataforma completa de delivery con tracking en tiempo real.",
    longDescription: "Aplicación completa de delivery que conecta restaurantes, repartidores y clientes en una plataforma unificada. El sistema incluye tracking GPS en tiempo real, múltiples opciones de pago, gestión completa de repartidores, notificaciones push para actualizaciones de estado, y analytics avanzados para optimización de rutas.",
    category: "Delivery",
    technologies: ["React Native", "Node.js", "PostgreSQL", "MapBox", "Expo", "Socket.io"],
    features: [
      "Tracking GPS en tiempo real",
      "Sistema de pagos múltiples",
      "Gestión completa de repartidores",
      "Notificaciones push",
      "Analytics de rutas optimizadas",
      "Sistema de calificaciones",
      "Integración con mapas",
      "Panel de administración"
    ],
    images: [
      "/assets/Sistema-Skyvibes.png",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
    ],
    demo: "#",
    github: "#",
    status: "En desarrollo",
    duration: "6 meses",
    team: "7 desarrolladores",
    client: "Startup de delivery",
    challenges: [
      "Optimización de rutas en tiempo real",
      "Gestión de múltiples repartidores",
      "Integración con sistemas de pago móviles"
    ],
    solutions: [
      "Algoritmos de optimización de rutas",
      "Sistema de asignación inteligente",
      "Integración con APIs de pagos móviles"
    ]
  },
  {
    id: 6,
    title: "Marketplace Educativo",
    description: "Plataforma para compra y venta de cursos online.",
    longDescription: "Marketplace educativo completo que permite a instructores crear y vender cursos online, mientras que los estudiantes pueden acceder a contenido de calidad con certificados automáticos. La plataforma incluye un reproductor de video avanzado, sistema de reviews y calificaciones, y un sistema de certificados automáticos.",
    category: "Educación",
    technologies: ["Next.js", "Stripe", "AWS S3", "PostgreSQL", "FFmpeg", "JWT"],
    features: [
      "Sistema completo de cursos online",
      "Pasarela de pagos integrada",
      "Reproductor de video avanzado",
      "Certificados automáticos",
      "Sistema de reviews y calificaciones",
      "Dashboard para instructores",
      "Sistema de suscripciones",
      "Analytics de aprendizaje"
    ],
    images: [
      "/assets/Boketto.png",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80"
    ],
    demo: "#",
    github: "#",
    status: "Completado",
    duration: "4 meses",
    team: "5 desarrolladores",
    client: "Plataforma educativa",
    challenges: [
      "Optimización de streaming de video",
      "Gestión de contenido multimedia",
      "Implementación de certificados seguros"
    ],
    solutions: [
      "Plataforma de video streaming optimizada",
      "Sistema de pagos seguro con Stripe",
      "Generación de certificados PDF en tiempo real"
    ]
  }
];

export default function ProyectoDetalle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);

  const project = projects.find(p => p.id.toString() === id);

  useEffect(() => {
    if (!project) {
      navigate('/aplicaciones-web');
    }
  }, [project, navigate]);

  if (!project) {
    return null;
  }

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

  return (
    <div className="min-h-screen bg-black">
      <Helmet>
        <title>{project.title} | Weblisy - Desarrollo de Software</title>
        <meta name="description" content={project.description} />
        <meta property="og:title" content={`${project.title} | Weblisy`} />
        <meta property="og:description" content={project.description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://weblisy.com/proyecto/${project.id}`} />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Breadcrumb */}
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              to="/aplicaciones-web"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-[#038e42] transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              Volver a Aplicaciones Web
            </Link>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Información del proyecto */}
            <motion.div variants={itemVariants}>
              <div className="mb-6">
                <span className="text-sm font-medium text-[#038e42] uppercase tracking-wide">
                  {project.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-4">
                  {project.title}
                </h1>
                <p className="text-xl text-gray-300 leading-relaxed">
                  {project.longDescription}
                </p>
              </div>

              {/* Estado del proyecto */}
              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${
                    project.status === 'Completado' ? 'bg-green-500' : 'bg-yellow-500'
                  }`}></span>
                  <span className="text-gray-300">{project.status}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CalendarIcon className="w-4 h-4" />
                  <span>{project.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <PersonIcon className="w-4 h-4" />
                  <span>{project.team}</span>
                </div>
              </div>

              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  className="bg-[#038e42] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#038e42]/80 transition-colors flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLinkIcon className="w-5 h-5" />
                  Ver Demo
                </motion.button>
                <motion.button
                  className="bg-black text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 border border-white/10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLinkIcon className="w-5 h-5" />
                  Ver Código
                </motion.button>
              </div>
            </motion.div>

            {/* Imagen principal */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative h-96 rounded-xl overflow-hidden">
                <img 
                  src={project.images[activeImage]} 
                  alt={project.title}
                  className="w-full h-full object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              {/* Miniaturas */}
              <div className="flex gap-2 mt-4">
                {project.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === index 
                        ? 'border-[#038e42]' 
                        : 'border-white/20 hover:border-white/40'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${project.title} ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Tecnologías */}
      <section className="py-20 px-4 md:px-8 bg-white/5">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Tecnologías Utilizadas</h2>
            <p className="text-gray-300">Stack tecnológico moderno y escalable</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {project.technologies.map((tech, index) => (
              <motion.div
                key={tech}
                variants={itemVariants}
                className="bg-black/50 border border-white/10 rounded-lg p-4 text-center hover:border-[#038e42]/30 transition-colors"
              >
                <CodeIcon className="w-8 h-8 text-[#038e42] mx-auto mb-2" />
                <span className="text-white text-sm font-medium">{tech}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Características */}
      <section className="py-20 px-4 md:px-8">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Características Principales</h2>
            <p className="text-gray-300">Funcionalidades destacadas del proyecto</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {project.features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start gap-3 p-4 bg-white/5 rounded-lg border border-white/10 hover:border-[#038e42]/30 transition-colors"
              >
                <CheckIcon className="w-5 h-5 text-[#038e42] mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Desafíos y Soluciones */}
      <section className="py-20 px-4 md:px-8 bg-white/5">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Desafíos y Soluciones</h2>
            <p className="text-gray-300">Cómo abordamos los retos técnicos del proyecto</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Desafíos */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <RocketIcon className="w-6 h-6 text-[#038e42]" />
                Desafíos Técnicos
              </h3>
              <div className="space-y-4">
                {project.challenges.map((challenge, index) => (
                  <div key={index} className="p-4 bg-black/30 rounded-lg border border-white/10">
                    <span className="text-gray-300">{challenge}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Soluciones */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <StarIcon className="w-6 h-6 text-[#038e42]" />
                Nuestras Soluciones
              </h3>
              <div className="space-y-4">
                {project.solutions.map((solution, index) => (
                  <div key={index} className="p-4 bg-[#038e42]/10 rounded-lg border border-[#038e42]/20">
                    <span className="text-gray-300">{solution}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-[#038e42]/10 to-[#038e42]/5">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ¿Te gusta este proyecto?
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Podemos crear algo similar para tu negocio. Contáctanos y cuéntanos sobre tu idea.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contacto">
                <motion.button
                  className="bg-[#038e42] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#038e42]/80 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Solicitar Presupuesto
                </motion.button>
              </Link>
              <Link to="/aplicaciones-web">
                <motion.button
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#038e42] transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Ver Más Proyectos
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 