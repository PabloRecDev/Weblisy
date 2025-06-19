import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { 
  RocketIcon, 
  CodeIcon, 
  StarIcon, 
  GearIcon, 
  LightningBoltIcon, 
  LockClosedIcon 
} from '@radix-ui/react-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function ProcessSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const features = [
    {
      icon: <RocketIcon className="w-8 h-8" />,
      title: "Desarrollo Rápido",
      description: "Utilizamos las últimas tecnologías para entregar proyectos en tiempo récord sin comprometer la calidad.",
      color: "from-black/50 to-black/30"
    },
    {
      icon: <CodeIcon className="w-8 h-8" />,
      title: "Código Limpio",
      description: "Escribimos código mantenible y escalable siguiendo las mejores prácticas de la industria.",
      color: "from-black/50 to-black/30"
    },
    {
      icon: <StarIcon className="w-8 h-8" />,
      title: "Diseño Premium",
      description: "Creamos interfaces modernas y atractivas que cautivan a los usuarios y mejoran la experiencia.",
      color: "from-black/50 to-black/30"
    },
    {
      icon: <GearIcon className="w-8 h-8" />,
      title: "Mantenimiento",
      description: "Ofrecemos soporte continuo y actualizaciones para mantener tu aplicación funcionando perfectamente.",
      color: "from-black/50 to-black/30"
    },
    {
      icon: <LightningBoltIcon className="w-8 h-8" />,
      title: "Rendimiento",
      description: "Optimizamos cada aspecto para garantizar tiempos de carga rápidos y una experiencia fluida.",
      color: "from-black/50 to-black/30"
    },
    {
      icon: <LockClosedIcon className="w-8 h-8" />,
      title: "Seguridad",
      description: "Implementamos las mejores prácticas de seguridad para proteger tu aplicación y datos.",
      color: "from-black/50 to-black/30"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
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
    },
    hover: {
      y: -5,
      transition: {
        duration: 0.3
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
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

  const progressBarVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section ref={ref} id='proceso' className="py-20 px-4 md:py-32 md:px-8 bg-black relative overflow-hidden">
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

      {/* Fondo sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_100%)]"></div>
      
      {/* Línea de progreso animada */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-white/20 to-white/10 origin-left"
        variants={progressBarVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Nuestro Proceso de Trabajo
          </motion.h2>
          <motion.p 
            className="text-white/80 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Así es como llevamos tu idea a la realidad digital.
          </motion.p>
        </motion.div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={feature.title}
              variants={itemVariants}
              whileHover="hover"
              className="group relative"
            >
              <motion.div
                variants={cardVariants}
                className={`p-8 rounded-2xl bg-gradient-to-br ${feature.color} backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-300 relative overflow-hidden shadow-xl hover:shadow-2xl`}
              >
                {/* Efecto de brillo en hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />

                {/* Icono animado */}
                <motion.div 
                  className="flex items-center justify-center w-16 h-16 bg-white/5 p-3 rounded-xl mb-6 relative"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-xl"
                    animate={{
                      rotate: 360,
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  />
                  <div className="relative z-10 text-white">
                    {feature.icon}
                  </div>
                </motion.div>

                <motion.h3 
                  className="text-xl font-bold mb-4 text-white"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {feature.title}
                </motion.h3>
                
                <motion.p 
                  className="text-white/70 leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  {feature.description}
                </motion.p>

                {/* Número del paso */}
                <motion.div
                  className="absolute top-6 right-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white font-bold text-sm border border-white/10"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                >
                  {index + 1}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Elemento decorativo flotante */}
        <motion.div
          className="absolute top-1/2 right-10 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-3xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255, 255, 255, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/10"
          >
            Comenzar Ahora
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
