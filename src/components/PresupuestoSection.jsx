import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from '../lib/supabase';
import { 
  CheckIcon, 
  DesktopIcon, 
  Component1Icon, 
  MobileIcon,
  ArrowRightIcon,
  ArrowLeftIcon
} from '@radix-ui/react-icons';

const steps = [
  { id: 1, name: 'Servicio' },
  { id: 2, name: 'Detalles' },
  { id: 3, name: 'Presupuesto' },
  { id: 4, name: 'Contacto' }
];

const serviceOptions = [
  { 
    name: "Sitio Web Esencial", 
    description: "Presencia online profesional y moderna.",
    icon: <DesktopIcon className="w-8 h-8" /> 
  },
  { 
    name: "E-commerce", 
    description: "Tienda online optimizada para vender.",
    icon: <Component1Icon className="w-8 h-8" /> 
  },
  { 
    name: "Aplicación a Medida", 
    description: "Soluciones complejas (CRM, ERP, etc).",
    icon: <MobileIcon className="w-8 h-8" /> 
  },
];

const Step1_Service = ({ formData, setFormData, nextStep }) => (
  <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}>
    <h3 className="text-2xl font-bold text-white mb-2">¿Qué tipo de proyecto tienes en mente?</h3>
    <p className="text-gray-400 mb-8">Selecciona el servicio que mejor se adapte a tus necesidades.</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {serviceOptions.map(opt => (
        <button
          key={opt.name}
          onClick={() => {
            setFormData({ ...formData, project_type: opt.name });
            nextStep();
          }}
          className={`p-6 rounded-lg border-2 text-left transition-all duration-300 ${
            formData.project_type === opt.name
              ? 'border-[#038e42] bg-[#038e42]/10'
              : 'border-white/20 bg-black/30 hover:border-white/40'
          }`}
        >
          <div className="text-[#038e42] mb-3">{opt.icon}</div>
          <h4 className="font-bold text-white text-lg mb-1">{opt.name}</h4>
          <p className="text-gray-400 text-sm">{opt.description}</p>
        </button>
      ))}
    </div>
  </motion.div>
);

const Step2_Details = ({ formData, setFormData }) => (
  <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="space-y-6">
    <div>
      <h3 className="text-2xl font-bold text-white mb-2">Cuéntanos más sobre tu proyecto</h3>
      <p className="text-gray-400">Estos detalles nos ayudarán a darte un presupuesto más acertado.</p>
    </div>
    <div className="space-y-2">
      <Label htmlFor="features" className="text-white">Funcionalidades clave que necesitas</Label>
      <Textarea
        id="features"
        name="features"
        value={formData.features || ''}
        onChange={(e) => setFormData({ ...formData, features: e.target.value })}
        placeholder="Ej: Login de usuarios, panel de administración, integración con pasarelas de pago, blog, etc."
        className="bg-black/30 border-white/20 text-white placeholder-gray-500 min-h-[120px]"
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="inspiration" className="text-white">¿Alguna web o app que te inspire? (Opcional)</Label>
      <Input
        id="inspiration"
        name="inspiration"
        value={formData.inspiration || ''}
        onChange={(e) => setFormData({ ...formData, inspiration: e.target.value })}
        placeholder="Pega aquí algunos enlaces de referencia"
        className="bg-black/30 border-white/20 text-white placeholder-gray-500"
      />
    </div>
  </motion.div>
);

const Step3_Budget = ({ formData, setFormData }) => {
  const budgetOptions = ["< 1.000€", "1.000€ - 3.000€", "3.000€ - 7.000€", "7.000€ - 15.000€", "> 15.000€"];
  const timelineOptions = ["Urgente (1-2 semanas)", "Flexible (1-2 meses)", "Sin prisa (3+ meses)"];

  return (
    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-white mb-2">Presupuesto y Plazos</h3>
        <p className="text-gray-400">Danos una idea de tu presupuesto y plazos para ajustar la propuesta.</p>
      </div>
      <div>
        <Label className="text-white font-semibold mb-4 block">Presupuesto estimado</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {budgetOptions.map(opt => (
            <button
              key={opt}
              onClick={() => setFormData({ ...formData, budget: opt })}
              className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                formData.budget === opt ? 'border-[#038e42] bg-[#038e42]/10' : 'border-white/20 bg-black/30 hover:border-white/40'
              }`}
            >
              <span className="text-white font-medium">{opt}</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <Label className="text-white font-semibold mb-4 block">Plazo de entrega deseado</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {timelineOptions.map(opt => (
             <button
              key={opt}
              onClick={() => setFormData({ ...formData, timeline: opt })}
              className={`p-4 rounded-lg border-2 text-center transition-all duration-200 ${
                formData.timeline === opt ? 'border-[#038e42] bg-[#038e42]/10' : 'border-white/20 bg-black/30 hover:border-white/40'
              }`}
            >
              <span className="text-white font-medium">{opt}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Step4_Contact = ({ formData, setFormData }) => (
  <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} className="space-y-6">
    <div>
      <h3 className="text-2xl font-bold text-white mb-2">¡Ya casi estamos!</h3>
      <p className="text-gray-400">Déjanos tus datos para enviarte la propuesta.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-white">Nombre</Label>
        <Input id="name" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Tu nombre completo" required className="bg-black/30 border-white/20"/>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email" className="text-white">Correo electrónico</Label>
        <Input id="email" name="email" type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="tu@email.com" required className="bg-black/30 border-white/20"/>
      </div>
    </div>
     <div className="space-y-2">
        <Label htmlFor="company" className="text-white">Empresa (Opcional)</Label>
        <Input id="company" name="company" value={formData.company || ''} onChange={(e) => setFormData({ ...formData, company: e.target.value })} placeholder="El nombre de tu empresa" className="bg-black/30 border-white/20"/>
      </div>
  </motion.div>
);

export default function PresupuestoSection() {
  const [currentStep, setCurrentStep] = useState(1);
  const [status, setStatus] = useState("idle");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project_type: '',
    features: '',
    inspiration: '',
    budget: '',
    timeline: '',
  });

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentStep !== steps.length) {
      nextStep();
      return;
    }
    setStatus("loading");
    
    try {
      const requestData = {
        name: formData.name,
        email: formData.email,
        company: formData.company,
        project_type: formData.project_type,
        features: formData.features,
        inspiration: formData.inspiration || null,
        budget: formData.budget,
        timeline: formData.timeline,
        status: 'new',
        priority: 'medium',
        source: 'web'
      };

      const { error } = await supabase.from('presupuesto_requests').insert([requestData]);

      if (error) throw error;

      setStatus("success");
    } catch (error) {
      console.error('Error al enviar la solicitud de presupuesto:', error);
      setStatus("error");
    }
  };

  if (status === 'success') {
    return (
      <section id="presupuesto" className="py-20 px-4 md:py-32 md:px-8 bg-black">
        <div className="container mx-auto max-w-3xl text-center">
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: "easeOut" }}>
              <div className="inline-block bg-green-500/10 p-4 rounded-full border-2 border-green-500/20 mb-6">
                <CheckIcon className="w-16 h-16 text-green-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">¡Solicitud recibida!</h2>
              <p className="text-gray-300 text-lg max-w-xl mx-auto mb-8">
                Gracias por tu interés. Hemos recibido tus datos y nuestro equipo se pondrá en contacto contigo en menos de 24 horas con una propuesta detallada.
              </p>
              <Button onClick={() => window.location.reload()} className="bg-[#038e42] hover:bg-green-500">
                Enviar otra solicitud
              </Button>
            </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="presupuesto" className="py-20 px-4 md:py-32 md:px-8 bg-black relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none bg-grid-pattern"></div>
       <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-black via-transparent to-black"></div>

      <div className="container mx-auto max-w-3xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Solicita tu presupuesto</h2>
          <p className="text-white/80 max-w-xl mx-auto">
            Cuéntanos qué necesitas y te enviaremos una propuesta personalizada lo antes posible.
          </p>
        </div>

        {/* Barra de Progreso */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    currentStep >= step.id ? 'bg-[#038e42]' : 'bg-black/30 border-2 border-white/20'
                  }`}>
                    {currentStep > step.id ? <CheckIcon className="w-6 h-6 text-white"/> : <span className="text-white font-bold">{step.id}</span>}
                  </div>
                  <p className={`mt-2 text-xs text-center transition-all duration-300 ${
                    currentStep >= step.id ? 'text-white' : 'text-gray-400'
                  }`}>{step.name}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-1 h-1 mx-4 transition-all duration-300 ${
                    currentStep > index + 1 ? 'bg-[#038e42]' : 'bg-white/20'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="bg-black/50 backdrop-blur-sm border border-white/10 p-8 rounded-2xl min-h-[300px]">
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <Step1_Service formData={formData} setFormData={setFormData} nextStep={nextStep} />
            )}
            {currentStep === 2 && (
              <Step2_Details formData={formData} setFormData={setFormData} />
            )}
            {currentStep === 3 && (
              <Step3_Budget formData={formData} setFormData={setFormData} />
            )}
            {currentStep === 4 && (
              <Step4_Contact formData={formData} setFormData={setFormData} />
            )}
            {status === "error" && (
              <p className="text-red-500 text-center mt-4">
                ❌ Hubo un error al enviar la solicitud. Por favor, inténtalo de nuevo o contáctanos directamente.
              </p>
            )}
          </AnimatePresence>
        </div>

        {/* Botones de Navegación */}
        <div className="mt-8 flex justify-between">
          {currentStep > 1 ? (
            <Button onClick={prevStep} variant="outline" className="bg-transparent text-white hover:bg-white/10 border-white/20">
              <ArrowLeftIcon className="mr-2 h-4 w-4" /> Anterior
            </Button>
          ) : <div></div>}
          
          <Button 
            onClick={handleSubmit} 
            className="bg-[#038e42] hover:bg-green-500"
            disabled={status === 'loading'}
          >
            {currentStep === steps.length ? (
              status === 'loading' ? 'Enviando...' : 'Finalizar y Enviar'
            ) : (
              <>Siguiente <ArrowRightIcon className="ml-2 h-4 w-4" /></>
            )}
          </Button>
        </div>
      </div>
    </section>
  );
}
