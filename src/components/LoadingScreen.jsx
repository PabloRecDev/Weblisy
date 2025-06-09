import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Logo animado */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeOut"
          }}
          className="mb-8 flex items-center justify-center"
        >
          <img 
            src="/assets/weblisy-logo.png" 
            alt="WebLisy Logo" 
            className="w-32 h-32 md:w-48 md:h-48 object-contain"
          />
        </motion.div>

        {/* Barra de progreso */}
        <div className="w-48 md:w-64 h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              ease: "easeInOut"
            }}
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
          />
        </div>

        {/* Texto de carga */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-white/80 text-center mt-4 text-sm md:text-base"
        >
          Cargando tu experiencia...
        </motion.p>

        {/* Efecto de partículas */}
        <div className="absolute inset-0 -z-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              initial={{
                x: Math.random() * 400 - 200,
                y: Math.random() * 400 - 200,
                scale: 0
              }}
              animate={{
                x: Math.random() * 400 - 200,
                y: Math.random() * 400 - 200,
                scale: [0, 1, 0],
                opacity: [0, 0.5, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
} 