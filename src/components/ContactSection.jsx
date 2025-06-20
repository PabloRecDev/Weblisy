import React, { useState, useRef } from 'react';
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  EnvelopeClosedIcon, 
  CheckIcon, 
  Cross2Icon, 
  ArrowRightIcon,
  MobileIcon,
  GlobeIcon
} from '@radix-ui/react-icons';
import { supabase } from '../lib/supabase';

export default function ContactSection() {
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const { error } = await supabase
        .from('quick_inquiries')
        .insert([{ 
          name: formData.name, 
          email: formData.email, 
          message: formData.message
        }]);

      if (error) throw error;

      // Una vez guardada la consulta, creamos o actualizamos el cliente
      const { error: clientError } = await supabase
        .from('clients')
        .upsert({ 
          email: formData.email, 
          name: formData.name
        }, {
          onConflict: 'email',
          ignoreDuplicates: false
        });

      if (clientError) {
        console.error('Error al guardar/actualizar el cliente desde el formulario rápido:', clientError);
      }

      setStatus("success");
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setStatus("error");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };
  
  const statusVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const contactInfo = [
    {
      icon: <EnvelopeClosedIcon className="w-6 h-6" />,
      title: "Email",
      value: "contacto@weblisy.com",
      description: "Envíanos un mensaje para consultas."
    },
    {
      icon: <MobileIcon className="w-6 h-6" />,
      title: "Teléfono",
      value: "+34 656 646 601",
      description: "Llámanos para una atención más directa."
    },
    {
      icon: <GlobeIcon className="w-6 h-6" />,
      title: "Ubicación",
      value: "España",
      description: "Trabajamos de forma remota para todo el mundo."
    }
  ];

  return (
    <section 
      ref={ref}
      id="contacto" 
      className="py-20 px-4 bg-black"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
            variants={itemVariants}
          >
            Hablemos
          </motion.h2>
          <motion.p 
            className="text-white/70 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            ¿Tienes una pregunta rápida o quieres iniciar un proyecto? Rellena el formulario o contáctanos directamente.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulario */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6 bg-white/5 p-8 rounded-xl border border-white/10"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div variants={itemVariants}>
                <Label htmlFor="name" className="block text-white/80 font-medium mb-2">Nombre *</Label>
                <Input id="name" name="name" placeholder="Tu nombre" required value={formData.name} onChange={handleInputChange} className="bg-black/50 border-white/20" />
              </motion.div>
              <motion.div variants={itemVariants}>
                <Label htmlFor="email" className="block text-white/80 font-medium mb-2">Email *</Label>
                <Input id="email" name="email" type="email" placeholder="tu@email.com" required value={formData.email} onChange={handleInputChange} className="bg-black/50 border-white/20" />
              </motion.div>
            </div>
            <motion.div variants={itemVariants}>
              <Label htmlFor="message" className="block text-white/80 font-medium mb-2">Mensaje *</Label>
              <Textarea id="message" name="message" placeholder="¿En qué podemos ayudarte?" required value={formData.message} onChange={handleInputChange} className="bg-black/50 border-white/20 min-h-[120px]" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-3 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <span>Enviar Mensaje</span>
                    <ArrowRightIcon/>
                  </>
                )}
              </button>
            </motion.div>
            <AnimatePresence>
              {status !== "idle" && (
                <motion.div
                  variants={statusVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className={`text-center p-3 rounded-lg ${status === 'success' ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}
                >
                  {status === 'success' ? '¡Mensaje enviado!' : 'Hubo un error.'}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>

          {/* Información de contacto */}
          <motion.div 
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-start gap-4 p-6 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0 text-white">
                  {info.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{info.title}</h3>
                  <p className="text-white font-medium">{info.value}</p>
                  <p className="text-white/70 text-sm mt-1">{info.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
