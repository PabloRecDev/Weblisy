import React from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@radix-ui/react-icons';
import { useTheme } from './ThemeProvider';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#111111] border border-[#038e42]/20 flex items-center justify-center text-gray-300 hover:text-[#038e42] hover:border-[#038e42]/40 transition-all duration-300 shadow-lg"
      aria-label={`Cambiar a modo ${theme === 'dark' ? 'claro' : 'oscuro'}`}
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? (
          <SunIcon className="w-5 h-5" />
        ) : (
          <MoonIcon className="w-5 h-5" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle; 