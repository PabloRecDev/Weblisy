import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  PersonIcon, 
  FileTextIcon, 
  ChatBubbleIcon, 
  LightningBoltIcon,
  CheckIcon,
  StarIcon,
  ArrowRightIcon,
  DownloadIcon,
  GlobeIcon,
  RocketIcon,
  PlusIcon,
  Pencil1Icon,
  TrashIcon,
  EyeOpenIcon,
  EyeClosedIcon,
  Cross2Icon,
  ChevronDownIcon,
  ChevronRightIcon,
  ExitIcon,
  GearIcon,
  PlayIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
  HeartIcon
} from '@radix-ui/react-icons';
import Card3D from '../components/Card3D';

export default function CvMaster() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const features = [
    {
      icon: <LightningBoltIcon className="w-8 h-8" />,
      title: "IA Avanzada",
      description: "Genera CVs y cartas de presentación con inteligencia artificial que se adapta a tu perfil profesional."
    },
    {
      icon: <GlobeIcon className="w-8 h-8" />,
      title: "Plantillas Profesionales",
      description: "Más de 20 plantillas diseñadas por expertos en recursos humanos para diferentes industrias."
    },
    {
      icon: <PlayIcon className="w-8 h-8" />,
      title: "Creación Rápida",
      description: "Crea tu CV profesional en menos de 10 minutos con nuestro editor intuitivo y guiado."
    },
    {
      icon: <PersonIcon className="w-8 h-8" />,
      title: "Optimizado para ATS",
      description: "Nuestras plantillas están optimizadas para pasar los filtros de los sistemas ATS."
    },
    {
      icon: <StarIcon className="w-8 h-8" />,
      title: "Resultados Garantizados",
      description: "Usuarios que usan CV Master tienen 3x más probabilidades de conseguir entrevistas."
    },
    {
      icon: <DownloadIcon className="w-8 h-8" />,
      title: "Exportación Universal",
      description: "Descarga en PDF, Word o comparte directamente en LinkedIn y otras plataformas."
    }
  ];

  const testimonials = [
    {
      name: "María González",
      role: "Desarrolladora Frontend",
      company: "TechCorp",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: "CV Master me ayudó a crear un CV que destacó mis habilidades técnicas. Conseguí mi trabajo soñado en 2 semanas.",
      rating: 5
    },
    {
      name: "Carlos Rodríguez",
      role: "Gerente de Marketing",
      company: "Digital Solutions",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: "La generación de cartas de presentación con IA es increíble. Ahorré horas de trabajo y los resultados fueron excelentes.",
      rating: 5
    },
    {
      name: "Ana Martínez",
      role: "Diseñadora UX/UI",
      company: "Creative Studio",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: "Las plantillas son hermosas y profesionales. Mi CV ahora se ve como si lo hubiera hecho un diseñador profesional.",
      rating: 5
    }
  ];

  const stats = [
    { number: "50,000+", label: "CVs Creados" },
    { number: "95%", label: "Tasa de Éxito" },
    { number: "20+", label: "Plantillas" },
    { number: "24/7", label: "Soporte" }
  ];

  return (
    <>
      <Helmet>
        <title>CV Master - Crea CVs Profesionales con IA | Weblisy</title>
        <meta name="description" content="Crea CVs profesionales con inteligencia artificial. Plantillas optimizadas para ATS, generación de cartas de presentación y más. ¡Consigue tu trabajo soñado!" />
        <meta name="keywords" content="CV, currículum, carta de presentación, IA, inteligencia artificial, trabajo, empleo, plantillas CV" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#111111] to-[#0a0a0a]">
        {/* Header */}
        <header className="relative z-50">
          <nav className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <PersonIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">CV Master</span>
              </div>
              
              <div className="hidden md:flex items-center gap-8">
                <a href="#features" className="text-white/80 hover:text-white transition-colors">Características</a>
                <a href="#pricing" className="text-white/80 hover:text-white transition-colors">Precios</a>
                <a href="#testimonials" className="text-white/80 hover:text-white transition-colors">Testimonios</a>
                <a href="#contact" className="text-white/80 hover:text-white transition-colors">Contacto</a>
              </div>
              
              <div className="flex items-center gap-4">
                <Link
                  to="/cv-master/app"
                  className="px-6 py-3 bg-violet-500 text-white rounded-xl font-semibold hover:bg-violet-600 transition-colors"
                >
                  Iniciar Sesión
                </Link>
              </div>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-indigo-500/10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                  Crea CVs Profesionales con{' '}
                  <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                    IA
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
                  Genera CVs y cartas de presentación optimizadas para ATS con inteligencia artificial. 
                  Consigue más entrevistas y tu trabajo soñado.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                  <Link
                    to="/cv-master/app"
                    className="px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-bold text-lg hover:from-violet-600 hover:to-purple-600 transition-all duration-300 flex items-center gap-2"
                  >
                    <RocketIcon className="w-6 h-6" />
                    Crear mi CV Gratis
                  </Link>
                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
                  >
                    <PlayIcon className="w-6 h-6" />
                    Ver Demo
                  </button>
                </div>

                <div className="flex items-center justify-center gap-8 text-white/60">
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 text-green-400" />
                    <span>Sin registro requerido</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 text-green-400" />
                    <span>Optimizado para ATS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-5 h-5 text-green-400" />
                    <span>Exportación PDF</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-white/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Todo lo que necesitas para destacar
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                CV Master combina la potencia de la IA con herramientas profesionales para crear CVs que realmente funcionan.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card3D key={index}>
                  <div className="w-16 h-16 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mb-6 text-violet-400">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-white/70">{feature.description}</p>
                </Card3D>
              ))}
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl font-bold text-white mb-6">
                  Editor Intuitivo y Profesional
                </h2>
                <p className="text-xl text-white/80 mb-8">
                  Nuestro editor te guía paso a paso para crear un CV profesional. 
                  Con plantillas optimizadas para ATS y herramientas de IA para mejorar tu contenido.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <CheckIcon className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-white">Guía paso a paso</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <CheckIcon className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-white">Vista previa en tiempo real</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <CheckIcon className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-white">Sugerencias de IA</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <CheckIcon className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-white">Exportación en múltiples formatos</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <div className="bg-white rounded-lg p-6 shadow-2xl">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <PersonIcon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">Juan Pérez</h3>
                        <p className="text-gray-600">Desarrollador Full Stack</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="border-l-4 border-violet-500 pl-4">
                        <h4 className="font-semibold text-gray-900">Experiencia</h4>
                        <p className="text-gray-600 text-sm">5+ años desarrollando aplicaciones web</p>
                      </div>
                      <div className="border-l-4 border-purple-500 pl-4">
                        <h4 className="font-semibold text-gray-900">Habilidades</h4>
                        <p className="text-gray-600 text-sm">React, Node.js, Python, AWS</p>
                      </div>
                      <div className="border-l-4 border-indigo-500 pl-4">
                        <h4 className="font-semibold text-gray-900">Educación</h4>
                        <p className="text-gray-600 text-sm">Ingeniería Informática - Universidad XYZ</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                Lo que dicen nuestros usuarios
              </h2>
              <p className="text-xl text-white/80">
                Miles de profesionales han mejorado sus carreras con CV Master
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-8"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h4 className="font-bold text-white">{testimonial.name}</h4>
                      <p className="text-white/60 text-sm">{testimonial.role} en {testimonial.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-white/80 italic">"{testimonial.content}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-violet-500/20 to-purple-500/20 border border-violet-500/30 rounded-3xl p-12 text-center"
            >
              <h2 className="text-4xl font-bold text-white mb-6">
                ¿Listo para crear tu CV profesional?
              </h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Únete a miles de profesionales que ya han mejorado sus carreras con CV Master. 
                Crea tu CV profesional en menos de 10 minutos.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/cv-master/app"
                  className="px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white rounded-xl font-bold text-lg hover:from-violet-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <RocketIcon className="w-6 h-6" />
                  Crear mi CV Gratis
                </Link>
                <button className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2">
                  <PlayIcon className="w-6 h-6" />
                  Ver Demo
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <PersonIcon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white">CV Master</span>
                </div>
                <p className="text-white/60 mb-4">
                  Crea CVs profesionales con IA. Optimizado para ATS y diseñado para conseguir más entrevistas.
                </p>
                <div className="flex items-center gap-4">
                  <a href="#" className="text-white/60 hover:text-white transition-colors">
                    <TwitterLogoIcon className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-white/60 hover:text-white transition-colors">
                    <LinkedInLogoIcon className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-white/60 hover:text-white transition-colors">
                    <GitHubLogoIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-4">Producto</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-white/60 hover:text-white transition-colors">Características</a></li>
                  <li><a href="#" className="text-white/60 hover:text-white transition-colors">Plantillas</a></li>
                  <li><a href="#" className="text-white/60 hover:text-white transition-colors">Precios</a></li>
                  <li><a href="#" className="text-white/60 hover:text-white transition-colors">API</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-4">Soporte</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-white/60 hover:text-white transition-colors">Centro de Ayuda</a></li>
                  <li><a href="#" className="text-white/60 hover:text-white transition-colors">Contacto</a></li>
                  <li><a href="#" className="text-white/60 hover:text-white transition-colors">Estado</a></li>
                  <li><a href="#" className="text-white/60 hover:text-white transition-colors">Comunidad</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-white font-semibold mb-4">Empresa</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-white/60 hover:text-white transition-colors">Acerca de</a></li>
                  <li><a href="#" className="text-white/60 hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="text-white/60 hover:text-white transition-colors">Carreras</a></li>
                  <li><a href="#" className="text-white/60 hover:text-white transition-colors">Prensa</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-white/60 text-sm">
                © 2024 CV Master. Todos los derechos reservados.
              </p>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Privacidad</a>
                <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Términos</a>
                <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
} 