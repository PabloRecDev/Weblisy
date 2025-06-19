import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PageTransition = ({ children, className = "" }) => {
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    out: {
      opacity: 0,
      y: -20,
      scale: 0.98,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={className}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition; 