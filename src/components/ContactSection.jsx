import React, { useState, useRef } from 'react';
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  EnvelopeClosedIcon, 
  CheckIcon, 
  Cross2Icon, 
  ArrowRightIcon,
  MobileIcon,
  GlobeIcon
} from '@radix-ui/react-icons';

export default function ContactSection() {
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
    budget: '',
    timeline: ''
  });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const form = e.target;
    const data = new FormData(form);

    const response = await fetch("https://formspree.io/f/xkgjpokg", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      setStatus("success");
      form.reset();
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: '',
        budget: '',
        timeline: ''
      });

      setTimeout(() => {
        setStatus("idle");
      }, 4000);
    } else {
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

  const formVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(255, 255, 255, 0.1)",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    tap: {
      scale: 0.95
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: "backOut"
      }
    },
    hover: {
      scale: 1.1,
      rotate: 360,
      transition: {
        duration: 0.3
      }
    }
  };

  const statusVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.9,
      transition: {
        duration: 0.3
      }
    }
  };

  const contactInfo = [
    {
      icon: <EnvelopeClosedIcon className="w-6 h-6" />,
      title: "Email",
      value: "contacto@weblisy.com",
      description: "Envíanos un mensaje"
    },
    {
      icon: <MobileIcon className="w-6 h-6" />,
      title: "Teléfono",
      value: "+34 656 646 601",
      description: "Llámanos directamente"
    },
    {
      icon: <GlobeIcon className="w-6 h-6" />,
      title: "Ubicación",
      value: "España",
      description: "Trabajamos remotamente"
    }
  ];

  return (
    <section 
      ref={ref}
      id="contacto" 
      className="py-20 px-4 md:py-32 md:px-8 bg-black relative overflow-hidden"
    >
      {/* Fondo sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_100%)]"></div>
      
      {/* Partículas flotantes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div 
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div 
            className="flex justify-center mb-4"
            variants={itemVariants}
          >
            <motion.span 
              className="text-white text-4xl md:text-5xl"
              variants={iconVariants}
              whileHover="hover"
            >
              <EnvelopeClosedIcon className="w-12 h-12" />
            </motion.span>
          </motion.div>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
            variants={itemVariants}
          >
            ¡Contáctanos!
          </motion.h2>
          
          <motion.p 
            className="text-white/80 max-w-md mx-auto text-lg"
            variants={itemVariants}
          >
            ¿Tienes una duda rápida o quieres saludar? Completa el formulario y te responderemos pronto.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Formulario */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-5 bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl shadow-xl relative overflow-hidden group"
            variants={formVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Efecto de brillo en hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />

            <motion.div 
              className="space-y-2 relative z-10"
              variants={itemVariants}
            >
              <Label htmlFor="name" className="text-white font-medium">Nombre</Label>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Tu nombre"
                  required
                  className="bg-black/50 border-white/10 text-white placeholder-white/50 focus:border-white/20 focus:ring-white/20 transition-all duration-300"
                />
              </motion.div>
            </motion.div>

            <motion.div 
              className="space-y-2 relative z-10"
              variants={itemVariants}
            >
              <Label htmlFor="email" className="text-white font-medium">Correo electrónico</Label>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="tunombre@email.com"
                  required
                  className="bg-black/50 border-white/10 text-white placeholder-white/50 focus:border-white/20 focus:ring-white/20 transition-all duration-300"
                />
              </motion.div>
            </motion.div>

            <motion.div 
              className="space-y-2 relative z-10"
              variants={itemVariants}
            >
              <Label htmlFor="message" className="text-white font-medium">Mensaje</Label>
              <motion.div
                whileFocus={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="¿En qué podemos ayudarte?"
                  required
                  className="bg-black/50 border-white/10 text-white placeholder-white/50 min-h-[100px] focus:border-white/20 focus:ring-white/20 transition-all duration-300 resize-none"
                />
              </motion.div>
            </motion.div>

            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="relative z-10"
            >
              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(255, 255, 255, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed border border-white/10"
              >
                {status === "loading" ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Enviando...
                  </div>
                ) : (
                  'Enviar Mensaje'
                )}
              </motion.button>
            </motion.div>

            {/* Mensajes de estado */}
            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.div
                  variants={statusVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-center mt-4 p-4 bg-white/10 border border-white/20 rounded-lg"
                >
                  <div className="flex items-center justify-center text-white">
                    <CheckIcon className="w-5 h-5 mr-2" />
                    ¡Mensaje enviado correctamente!
                  </div>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  variants={statusVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-center mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
                >
                  <div className="flex items-center justify-center text-red-400">
                    <Cross2Icon className="w-5 h-5 mr-2" />
                    Hubo un error al enviar el mensaje. Intenta nuevamente.
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>

          {/* Información de contacto */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Información de contacto
              </h3>
              <p className="text-white/70 mb-6">
                Estamos aquí para ayudarte. Contáctanos a través de cualquiera de estos medios 
                y te responderemos en menos de 24 horas.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300"
                >
                  <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="text-white">
                      {info.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">{info.title}</h4>
                    <p className="text-white font-medium mb-1">{info.value}</p>
                    <p className="text-white/70 text-sm">{info.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA para página completa */}
            <motion.div
              variants={itemVariants}
              className="p-6 rounded-xl bg-white/5 border border-white/10"
            >
              <h4 className="text-lg font-semibold text-white mb-3">¿Necesitas más información?</h4>
              <p className="text-white/70 text-sm mb-4">
                Visita nuestra página de contacto completa para obtener un presupuesto detallado 
                y más opciones de contacto.
              </p>
              <Link to="/contacto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/10 flex items-center justify-center gap-2"
                >
                  Ver página completa
                  <ArrowRightIcon className="w-4 h-4" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
