import React from 'react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "María García",
      role: "Empresaria",
      content: "Las soluciones web de esta empresa han transformado mi negocio, haciéndolo más eficiente y accesible para mis clientes.",
      avatar: ""
    },
    {
      name: "Carlos Rodríguez",
      role: "Analista de Sistemas",
      content: "La calidad y eficiencia de sus servicios de desarrollo web son insuperables. Altamente recomendados.",
      avatar: ""
    },
    {
      name: "Laura Martínez",
      role: "Desarrolladora Web",
      content: "Como profesional del sector, puedo afirmar que sus servicios son un referente en innovación y calidad.",
      avatar: ""
    }
  ];

  return (
    <section className="py-20 px-4 md:py-32 md:px-8 bg-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552566626-52f371b0f9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">Lo que dicen nuestros clientes</h2>
          <p className="text-black opacity-80 max-w-2xl mx-auto">
            Descubre cómo nuestras soluciones de desarrollo web han impactado positivamente a nuestros clientes.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="p-6 rounded-lg bg-black border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-4">{testimonial.avatar}</div>
                <div>
                  <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                  <p className="text-white opacity-80">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-white opacity-90 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 