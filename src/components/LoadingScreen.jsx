import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#038e42]"
    >
      <div className="relative flex flex-col items-center justify-center">
        {/* Logo animado */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0, rotate: 0 }}
          animate={{ scale: [1, 1.08, 1], opacity: 1, rotate: [0, 8, -8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut'
          }}
          className="mb-8 flex items-center justify-center"
        >
          <img 
            src="/assets/weblisy-logo.png" 
            alt="WebLisy Logo" 
            className="w-36 h-36 md:w-56 md:h-56 object-contain drop-shadow-lg"
          />
        </motion.div>

        {/* Spinner circular animado */}
        <motion.div
          className="relative flex items-center justify-center mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.span
            className="block w-12 h-12 border-4 border-[#038e42]/30 border-t-[#038e42] rounded-full animate-spin"
            style={{ borderTopColor: '#038e42' }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
          />
        </motion.div>

        {/* Texto de carga */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-white/90 text-center mt-2 text-base md:text-lg tracking-wide font-medium"
        >
          Cargando tu experiencia...
        </motion.p>

        {/* Efecto de partículas sutiles */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          {[...Array(16)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 bg-[#038e42]/30 rounded-full blur-sm"
              initial={{
                x: Math.random() * 400 - 200,
                y: Math.random() * 400 - 200,
                scale: 0
              }}
              animate={{
                x: Math.random() * 400 - 200,
                y: Math.random() * 400 - 200,
                scale: [0, 1, 0],
                opacity: [0, 0.3, 0]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.13
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
} 