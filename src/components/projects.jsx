import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Briefcase, CalendarClock, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Sitio Web Corporativo',
    description: 'Un sitio web profesional desarrollado para una empresa tecnológica moderna.',
    image: '/assets/Boketto.png',
    tech: ['React', 'Tailwind', 'Vite', 'SEO Básico'],
    objective: 'Transmitir confianza y profesionalismo con un diseño limpio y responsivo.',
    icon: <Briefcase className="w-5 h-5 inline mr-2 text-green-400" />,
    link: 'https://bokettorestaurante.com',
    status: 'Completado',
  },
  {
    title: 'Sistema de Reservas Online',
    description: 'Plataforma web personalizada para gestionar reservas y clientes.',
    image: '/assets/BokettoAdmin.png',
    tech: ['React', 'Node.js', 'MongoDB'],
    objective: 'Automatizar el flujo de reservas y facilitar la gestión de citas y pagos.',
    result: 'Reducción del 80% en tareas manuales de atención y mejora en la experiencia del cliente.',
    icon: <CalendarClock className="w-5 h-5 inline mr-2 text-green-400" />,
    status: 'Completado',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } },
};

export default function ProjectsPage() {
  return (
    <div id='proyectos' className="min-h-screen text-white bg-gradient-to-br from-zinc-900 via-neutral-900 to-zinc-800">
      <Navbar />

      <div className="pt-32 px-4 md:px-8 max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">Proyectos</h1>
        <p className="text-white/70 text-lg mb-16">
          Casos reales de soluciones digitales desarrolladas a medida. Cada proyecto nace de una necesidad concreta y se ejecuta con precisión.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              className="relative rounded-2xl overflow-hidden shadow-xl bg-white/5 backdrop-blur-md border border-white/10 group transition-all duration-300 hover:scale-[1.025] hover:shadow-2xl"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Imagen */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${project.status === 'Completado' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'}`}>
                  {project.status}
                </span>
              </div>

              {/* Contenido */}
              <div className="p-6 flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    {project.icon}
                    <h2 className="text-xl font-bold text-white group-hover:text-green-400 transition-colors duration-300">
                      {project.title}
                    </h2>
                  </div>
                  <p className="text-white/80 text-sm mb-3 min-h-[48px]">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-black/40 text-white/80 text-xs rounded-full border border-white/10">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 rounded-lg bg-green-600/90 hover:bg-green-500 text-white font-semibold flex items-center justify-center gap-2 transition-colors duration-300 shadow-md"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Ver Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20">
          <a
            href="/#contacto"
            className="inline-block bg-green-500 hover:bg-green-400 text-black text-sm font-semibold px-6 py-3 mb-14 rounded-md transition"
          >
            ¿Te interesa algo similar? Contáctanos
          </a>
        </div>
      </div>
    </div>
  );
}
