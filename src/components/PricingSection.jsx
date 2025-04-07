import React from 'react';

export default function PricingSection() {
  const plan = {
    name: "Plan Básico",
    price: "€500",
    description: "Un único plan con todo lo esencial para empezar con una presencia digital profesional.",
    features: [
      "Diseño web personalizado",
      "Optimización SEO básica",
      "Soporte técnico durante 30 días",
      "Hosting incluido por 1 año",
      "Entrega rápida (7 días)"
    ]
  };

  return (
    <section id='pricingSection' className="py-20 px-4 md:py-32 md:px-8   bg-black/90  relative overflow-hidden">
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Un solo plan. Todo lo que necesitas.</h2>
          <p className="text-white opacity-80 max-w-2xl mx-auto">
            Ideal para emprendedores, pequeños negocios y proyectos personales que quieren comenzar con el pie derecho.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <div 
            className="p-8 rounded-lg bg-white/10 border border-opacity-10 hover:border-white/40 transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
            style={{ animationDelay: `100ms` }}
          >
            <h3 className="text-2xl font-bold text-white mb-2 text-center">{plan.name}</h3>
            <div className="text-4xl font-bold text-white mb-4 text-center">{plan.price}</div>
            <p className="text-white opacity-80 mb-6 text-center">{plan.description}</p>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-white">
                  <span className="mr-2 text-green-400">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
            <a href="#contacto"><button className="w-full py-3 px-6 bg-white text-black rounded-lg hover:bg-transparent hover:text-white border border-white transition-colors duration-300">
              Reservar Ahora
            </button></a>
          </div>
        </div>
      </div>
    </section>
  );
}
