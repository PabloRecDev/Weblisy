import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  RocketIcon, 
  Pencil1Icon, 
  CodeIcon, 
  CheckCircledIcon, 
  HeartIcon, 
  StarIcon 
} from '@radix-ui/react-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from 'react-helmet-async';

export default function ProcessSection() {
  const steps = [
    {
      title: "1. Contacto inicial",
      description: "Nos ponemos en contacto para entender tus necesidades y objetivos.",
      icon: <RocketIcon className="w-8 h-8 text-emerald-500" aria-hidden="true" />,
      color: "from-emerald-500/20 to-emerald-500/5"
    },
    {
      title: "2. Boceto y propuesta",
      description: "Creamos un boceto y una propuesta para tu proyecto.",
      icon: <Pencil1Icon className="w-8 h-8 text-orange-500" aria-hidden="true" />,
      color: "from-orange-500/20 to-orange-500/5"
    },
    {
      title: "3. Desarrollo",
      description: "Desarrollamos el proyecto con las mejores prácticas.",
      icon: <CodeIcon className="w-8 h-8 text-blue-500" aria-hidden="true" />,
      color: "from-blue-500/20 to-blue-500/5"
    },
    {
      title: "4. Revisión",
      description: "Revisamos el proyecto para asegurar la calidad.",
      icon: <CheckCircledIcon className="w-8 h-8 text-purple-500" aria-hidden="true" />,
      color: "from-purple-500/20 to-purple-500/5"
    },
    {
      title: "5. Entrega y soporte",
      description: "Entregamos el proyecto y ofrecemos soporte continuo.",
      icon: <HeartIcon className="w-8 h-8 text-red-500" aria-hidden="true" />,
      color: "from-red-500/20 to-red-500/5"
    },
    {
      title: "6. Evaluación",
      description: "Evaluamos el proyecto para futuras mejoras.",
      icon: <StarIcon className="w-8 h-8 text-yellow-500" aria-hidden="true" />,
      color: "from-yellow-500/20 to-yellow-500/5"
    }
  ];

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id='proceso' className="py-20 px-4 md:py-32 md:px-8 bg-gradient-to-b from-black to-slate-900 relative overflow-hidden">
      <Helmet>
        <meta name="description" content="Nuestro proceso de trabajo en desarrollo web. Desde el contacto inicial hasta la entrega y soporte continuo." />
        <meta name="keywords" content="proceso de desarrollo web, metodología de trabajo, desarrollo de software, ciclo de vida del proyecto" />
        <meta property="og:title" content="Nuestro Proceso de Trabajo en Desarrollo Web" />
        <meta property="og:description" content="Descubre cómo llevamos tu idea a la realidad digital con nuestro proceso probado y eficiente." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://weblisy.com/#proceso" />
        <meta name="twitter:title" content="Nuestro Proceso de Trabajo en Desarrollo Web" />
        <meta name="twitter:description" content="Descubre cómo llevamos tu idea a la realidad digital con nuestro proceso probado y eficiente." />
      </Helmet>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)]"></div>
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Nuestro Proceso de Trabajo</h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Así es como llevamos tu idea a la realidad digital.
          </p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {steps.map((step) => (
            <motion.div 
              key={step.title}
              variants={itemVariants}
              className={`p-6 rounded-xl bg-gradient-to-br ${step.color} backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-${step.color.split('-')[1]}/20`}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-white/10 p-3 rounded-full mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
              <p className="text-white/80">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
