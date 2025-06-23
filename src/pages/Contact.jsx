import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  EnvelopeClosedIcon, 
  CheckIcon, 
  Cross2Icon, 
  MobileIcon,
  GlobeIcon,
  ClockIcon,
  ChatBubbleIcon,
  RocketIcon,
  StarIcon
} from '@radix-ui/react-icons';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    budget: '',
    timeline: '',
    projectType: ''
  });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const { data, error } = await supabase
        .from('leads')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            phone: formData.phone,
            company: formData.company,
            message: formData.message,
            source: 'contact_formal'
          }
        ]);

      if (error) {
        throw error;
      }

      // Una vez que el lead se ha guardado, creamos o actualizamos el cliente
      const { error: clientError } = await supabase
        .from('clients')
        .upsert({ 
          email: formData.email, 
          name: formData.name, 
          phone: formData.phone,
          company: formData.company
        }, {
          onConflict: 'email',
          ignoreDuplicates: false
        });

      if (clientError) {
        // Si hay un error aquí, no lo mostramos al usuario final,
        // pero sí lo registramos en la consola para depuración.
        // Lo principal (recibir el lead) ya funcionó.
        console.error('Error al guardar/actualizar el cliente:', clientError);
      }

      setStatus("success");
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        budget: '',
        timeline: '',
        projectType: ''
      });

      setTimeout(() => {
        setStatus("idle");
      }, 4000);

    } catch (error) {
      console.error('Error al enviar a Supabase:', error);
      setStatus("error");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const contactInfo = [
    {
      icon: <EnvelopeClosedIcon className="w-6 h-6" />,
      title: "Email",
      value: "info@weblisy.com",
      description: "Envíanos un mensaje",
      action: "mailto:info@weblisy.com"
    },
    {
      icon: <MobileIcon className="w-6 h-6" />,
      title: "Teléfono",
      value: "+34 600 000 000",
      description: "Llámanos directamente",
      action: "tel:+34600000000"
    },
    {
      icon: <GlobeIcon className="w-6 h-6" />,
      title: "Ubicación",
      value: "España",
      description: "Trabajamos remotamente"
    }
  ];

  const services = [
    {
      icon: <RocketIcon className="w-5 h-5" />,
      title: "Desarrollo Web",
      description: "Sitios web profesionales y aplicaciones web"
    },
    {
      icon: <StarIcon className="w-5 h-5" />,
      title: "Diseño UX/UI",
      description: "Interfaces modernas y experiencias de usuario"
    },
    {
      icon: <ChatBubbleIcon className="w-5 h-5" />,
      title: "Consultoría",
      description: "Asesoramiento técnico y estratégico"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <Helmet>
        <title>Contacto - Weblisy | Desarrollo Web Profesional</title>
        <meta name="description" content="Contáctanos para desarrollar tu proyecto web. Consultoría gratuita, presupuestos personalizados y soporte técnico especializado." />
        <meta name="keywords" content="contacto desarrollo web, presupuesto web, consultoría web, desarrollo a medida" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Contacto - Weblisy" />
        <meta property="og:description" content="Contáctanos para desarrollar tu proyecto web profesional" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://weblisy.es/contacto" />
        <meta property="og:image" content="https://weblisy.es/assets/Weblisy-logo-fondo.png" />
        <meta property="og:image:alt" content="Contacto Weblisy - Desarrollo web profesional" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contacto - Weblisy" />
        <meta name="twitter:description" content="Contáctanos para desarrollar tu proyecto web profesional" />
        <meta name="twitter:image" content="https://weblisy.es/assets/Weblisy-logo-fondo.png" />
        <meta name="twitter:image:alt" content="Contacto Weblisy - Desarrollo web profesional" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://weblisy.es/contacto" />
      </Helmet>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_100%)]"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Hablemos de tu{' '}
              <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                proyecto
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-white/80 max-w-2xl mx-auto text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Estamos aquí para convertir tu idea en realidad digital. 
              Consultoría gratuita y presupuestos personalizados.
            </motion.p>
          </motion.div>

          {/* Servicios */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
                whileHover={{ y: -5, scale: 1.02 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                  <div className="text-white">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-white/70 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Formulario y Contacto */}
      <section className="py-20 px-4 md:px-8 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Formulario */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl">
                <h2 className="text-2xl font-bold text-white mb-6">Envíanos un mensaje</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6" role="form" aria-label="Formulario de contacto">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:border-[#038e42] focus:outline-none transition-colors"
                        placeholder="Tu nombre completo"
                        aria-required="true"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:border-[#038e42] focus:outline-none transition-colors"
                        placeholder="tu@email.com"
                        aria-required="true"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:border-[#038e42] focus:outline-none transition-colors"
                        placeholder="+34 600 000 000"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-white mb-2">
                        Empresa
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:border-[#038e42] focus:outline-none transition-colors"
                        placeholder="Nombre de tu empresa"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                      Mensaje *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/50 focus:border-[#038e42] focus:outline-none transition-colors resize-none"
                      placeholder="Cuéntanos sobre tu proyecto, objetivos y cualquier detalle que consideres importante..."
                      aria-required="true"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="budget" className="block text-sm font-medium text-white mb-2">
                        Presupuesto aproximado
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({...formData, budget: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#038e42] focus:outline-none transition-colors"
                      >
                        <option value="">Selecciona un rango</option>
                        <option value="1000-3000">1.000€ - 3.000€</option>
                        <option value="3000-5000">3.000€ - 5.000€</option>
                        <option value="5000-10000">5.000€ - 10.000€</option>
                        <option value="10000+">Más de 10.000€</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="timeline" className="block text-sm font-medium text-white mb-2">
                        Plazo de entrega
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        value={formData.timeline}
                        onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#038e42] focus:outline-none transition-colors"
                      >
                        <option value="">Selecciona un plazo</option>
                        <option value="1-2 meses">1-2 meses</option>
                        <option value="2-3 meses">2-3 meses</option>
                        <option value="3-6 meses">3-6 meses</option>
                        <option value="6+ meses">Más de 6 meses</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="projectType" className="block text-sm font-medium text-white mb-2">
                      Tipo de proyecto
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={(e) => setFormData({...formData, projectType: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-[#038e42] focus:outline-none transition-colors"
                    >
                      <option value="">Selecciona el tipo de proyecto</option>
                      <option value="web-corporativa">Web Corporativa</option>
                      <option value="e-commerce">Tienda Online</option>
                      <option value="aplicacion-web">Aplicación Web</option>
                      <option value="landing-page">Landing Page</option>
                      <option value="mantenimiento">Mantenimiento</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-[#038e42] text-white py-4 px-8 rounded-lg font-semibold hover:bg-[#038e42]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: status !== "loading" ? 1.02 : 1 }}
                    whileTap={{ scale: status !== "loading" ? 0.98 : 1 }}
                    aria-describedby="submit-status"
                  >
                    {status === "loading" ? "Enviando..." : "Enviar Mensaje"}
                  </motion.button>
                  
                  <div id="submit-status" className="sr-only" aria-live="polite">
                    {status === "success" && "Mensaje enviado correctamente"}
                    {status === "error" && "Error al enviar el mensaje"}
                  </div>
                </form>
              </div>
            </motion.div>

            {/* Información de contacto */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Información de contacto</h2>
                <p className="text-white/70 mb-8">
                  Estamos aquí para ayudarte. Contáctanos a través de cualquiera de estos medios 
                  y te responderemos en menos de 24 horas.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.02 }}
                    className={`p-6 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 ${info.action ? 'cursor-pointer' : ''}`}
                    onClick={info.action ? () => window.open(info.action) : undefined}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <div className="text-white">
                          {info.icon}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">{info.title}</h4>
                        <p className="text-white font-medium mb-1">{info.value}</p>
                        <p className="text-white/70 text-sm">{info.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Horarios */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <ClockIcon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">Horarios de atención</h4>
                </div>
                <div className="space-y-3 text-white/70">
                  <div className="flex justify-between">
                    <span>Lunes - Viernes</span>
                    <span className="text-white">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábados</span>
                    <span className="text-white">10:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingos</span>
                    <span className="text-white/50">Cerrado</span>
                  </div>
                </div>
              </motion.div>

              {/* Garantía */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                    <StarIcon className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-white">Nuestras garantías</h4>
                </div>
                <div className="space-y-2 text-white/70 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-white" />
                    <span>Consultoría gratuita</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-white" />
                    <span>Presupuesto sin compromiso</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-white" />
                    <span>Respuesta en 24 horas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckIcon className="w-4 h-4 text-white" />
                    <span>Garantía de satisfacción</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
} 