import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cross2Icon, ClockIcon, StarIcon } from '@radix-ui/react-icons';

const SubNavbar = ({ setIsVisible }) => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    // Función para obtener la fecha de finalización
    const getTargetDate = () => {
      let target = localStorage.getItem('offerEndDate');
      if (!target) {
        // Si no existe, la creamos: 30 días a partir de ahora
        const newTargetDate = new Date();
        newTargetDate.setDate(newTargetDate.getDate() + 30);
        localStorage.setItem('offerEndDate', newTargetDate.toISOString());
        return newTargetDate;
      }
      return new Date(target);
    };

    const targetDate = getTargetDate();

    // Actualizar el contador cada segundo
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        // Si el tiempo ha terminado, ocultamos la barra
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setIsVisible(false);
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [setIsVisible]);

  if (!timeLeft) return null; // No renderizar hasta que el tiempo esté calculado

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-gradient-to-r from-[#038e42] via-[#038e42]/90 to-[#038e42] text-white relative overflow-hidden"
    >
      {/* Patrón de fondo sutil */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.1) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.1) 75%)
          `,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2.5 relative z-10">
        <div className="flex items-center justify-between w-full">
          
          {/* Lado izquierdo: Oferta */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink min-w-0">
            <StarIcon className="w-5 h-5 text-yellow-300 animate-pulse flex-shrink-0" />
            <p className="text-xs sm:text-sm font-medium truncate">
              <span className="hidden sm:inline">🎉</span>
              <span className="font-semibold">OFERTA:</span> Página web profesional por
              <span className="font-bold text-yellow-300 mx-1.5">299€</span>
              <span className="hidden md:inline line-through opacity-75">599€</span>
            </p>
          </div>

          {/* Lado derecho: Contador y CTA */}
          <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
            {/* Contador regresivo (visible en pantallas grandes) */}
            <div className="hidden lg:flex items-center gap-2">
              <ClockIcon className="w-4 h-4 text-white/80" />
              <span className="text-sm font-mono whitespace-nowrap text-white/80">
                {timeLeft.days > 0 && `${timeLeft.days}d `}
                {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>

            {/* Botón CTA */}
            <Link
              to="/plan-sitio-web"
              className="bg-white text-[#038e42] px-4 py-1.5 rounded-md font-semibold text-xs sm:text-sm hover:bg-yellow-300 hover:text-black transition-all duration-200 flex items-center gap-1.5 hover:scale-105 whitespace-nowrap"
            >
              ¡Aprovechar!
              <motion.div
                className="hidden sm:block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.div>
            </Link>
          </div>
          
          {/* Botón de cierre (fuera de los grupos principales para evitar que se contraiga) */}
          <button
            onClick={() => setIsVisible(false)}
            className="text-white/80 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10 ml-3"
            aria-label="Cerrar oferta"
          >
            <Cross2Icon className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Efecto de brillo que se mueve */}
      <div 
        className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-80"
        style={{ pointerEvents: 'none' }}
      >
        <motion.div
          className="w-full h-full"
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </motion.div>
  );
};

export default SubNavbar; 