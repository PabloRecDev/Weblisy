import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Briefcase, CalendarClock, ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'Sitio Web Corporativo',
    description: 'Un sitio web profesional desarrollado para una empresa tecnológica moderna.',
    image: '/assets/Boketto.png',
    tech: ['React', 'Tailwind', 'Vite', 'SEO Básico'],
    objective: 'Transmitir confianza y profesionalismo con un diseño limpio y responsivo.',
    icon: <Briefcase className="w-5 h-5 inline mr-2 text-green-400" />,
    link: 'bokettorestaurante.com',
  },
  {
    title: 'Sistema de Reservas Online',
    description: 'Plataforma web personalizada para gestionar reservas y clientes.',
    image: '/assets/BokettoAdmin.png',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    objective: 'Automatizar el flujo de reservas y facilitar la gestión de citas y pagos.',
    result: 'Reducción del 80% en tareas manuales de atención y mejora en la experiencia del cliente.',
    icon: <CalendarClock className="w-5 h-5 inline mr-2 text-green-400" />,
  },
];

export default function ProjectsPage() {
  return (
    <div id='proyectos' className="min-h-screen text-white bg-gradient-to-br from-zinc-900 via-neutral-900 to-zinc-800">
      <Navbar />

      <div className="pt-32 px-4 md:px-8 max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Proyectos</h1>
        <p className="text-white/70 text-lg mb-16">
          Casos reales de soluciones digitales desarrolladas a medida. Cada proyecto nace de una necesidad concreta y se ejecuta con precisión.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-zinc-900/60 border border-white/10 rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:border-white/20 transition duration-300 text-left"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-56 object-top"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2 flex items-center">
                  {project.icon}
                  {project.title}
                </h3>
                <p className="text-white/80 text-sm mb-4">{project.description}</p>

                <div className="mb-3">
                  <p className="text-xs font-semibold uppercase text-white/50">Objetivo</p>
                  <p className="text-white/70 text-sm">{project.objective}</p>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase text-white/50">Resultado</p>
                  <p className="text-white/70 text-sm">{project.result}</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs text-white/60 mb-5">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="bg-white/10 px-2 py-1 rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>

                {project.link && (
  <a
    href={project.link}
    className="inline-flex items-center text-green-400 hover:text-green-300 text-sm font-medium transition"
  >
    Ver proyecto
    <ExternalLink className="w-4 h-4 ml-1" />
  </a>
)}

              </div>
            </div>
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
