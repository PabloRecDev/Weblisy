import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faTools, faTrophy, faPhone } from '@fortawesome/free-solid-svg-icons';

export default function FeaturesSection() {
  const features = [
    {
      title: "Innovación Continua",
      description: "Ofrecemos soluciones de desarrollo web que integran las últimas tecnologías para impulsar tu negocio.",
      icon: <FontAwesomeIcon icon={faLightbulb} style={{ color: 'white' }} />
    },
    {
      title: "Soluciones Personalizadas",
      description: "Cada proyecto es único. Creamos aplicaciones web a medida que se adaptan a tus necesidades específicas.",
      icon: <FontAwesomeIcon icon={faTools} style={{ color: 'white' }} />
    },
    {
      title: "Proyectos Exitosos",
      description: "Explora nuestra galería de proyectos y descubre cómo hemos ayudado a otros a alcanzar sus objetivos.",
      icon: <FontAwesomeIcon icon={faTrophy} style={{ color: 'white' }} />
    },
    {
      title: "Conéctate con Nosotros",
      description: "Estamos aquí para ayudarte. Contáctanos para discutir cómo podemos colaborar.",
      icon: <FontAwesomeIcon icon={faPhone} style={{ color: 'white' }} />
    }
  ];

  return (
    <section id='caracteristics' className="py-20 px-4 md:py-32 md:px-8 bg-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552566626-52f371b0f9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Características Destacadas</h2>
          <p className="text-white opacity-80 max-w-2xl mx-auto">
            Descubre cómo nuestras soluciones de desarrollo web pueden transformar tu negocio.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 rounded-lg bg-black border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
              <p className="text-white opacity-80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 