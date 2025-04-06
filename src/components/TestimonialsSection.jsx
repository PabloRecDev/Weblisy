import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Cliente satisfecho",
      content: "Las soluciones web de esta empresa han transformado mi negocio, haciéndolo más eficiente y accesible para mis clientes."
    },
    {
      name: "Cliente satisfecho",
      content: "La calidad y eficiencia de sus servicios de desarrollo web son insuperables. Altamente recomendados."
    },
    {
      name: "Cliente satisfecho",
      content: "Como profesional del sector, puedo afirmar que sus servicios son un referente en innovación y calidad."
    }
  ];

  return (
    <section id='testimonios' className="py-20 px-4 md:py-32 md:px-8 bg-gradient-to-b from-black/95 to-black relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Lo que dicen nuestros clientes</h2>
          <p className="text-white opacity-80 max-w-2xl mx-auto">
            Descubre cómo nuestras soluciones de desarrollo web pueden transformar tu negocio.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="p-6 rounded-lg bg-white/10 border border-opacity-10 border-white hover:border-white/40 transition-all duration-300 transform hover:scale-105 animate-fade-in-up flex flex-col justify-between"
              style={{ animationDelay: `${index * 100}ms` }}
              data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
              data-aos-duration="1000"
              data-aos-delay={`${index * 200}`}
            >
              {/* Icono de cliente */}
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-white/10 p-3 rounded-full text-white text-2xl">
                  <FontAwesomeIcon icon={faUserCircle} />
                </div>
              </div>

              {/* Contenido del testimonio */}
              <p className="text-white opacity-90 italic mb-6">"{testimonial.content}"</p>
              <p className="text-sm text-white/60 text-right">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
