import { motion } from 'framer-motion';

export default function Card3D({ children }) {
  return (
    <motion.div
      className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-lg transition-transform"
      whileHover={{
        rotateY: 10,
        rotateX: 5,
        boxShadow: '0 8px 32px 0 rgba(59,130,246,0.25)'
      }}
      style={{ perspective: 1000 }}
    >
      {children}
    </motion.div>
  );
} 