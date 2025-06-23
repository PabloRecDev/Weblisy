import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import LatestBlogPosts from '../components/LatestBlogPosts';
import PricingSection from '../components/PricingSection';
import ContactSection from '../components/ContactSection';
import ParticleBackground from '../components/ParticleBackground';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  out: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: "easeIn"
    }
  }
};

const HomePage = () => {
  return (
    <motion.div
      className="min-h-screen relative overflow-hidden"
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-900 to-black"></div>
      
      <ParticleBackground 
        particleCount={30}
        colors={['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.2)', 'rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)', 'rgba(255,255,255,0.1)']}
        className="opacity-30"
      />
      
      <div className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <LatestBlogPosts />
        <PricingSection />
        <ContactSection/>
      </div>
    </motion.div>
  );
};

export default HomePage; 