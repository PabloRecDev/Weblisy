import React from 'react';

export default function PricingSection() {
  const plan = {
    name: "Plan Básico",
    originalPrice: "€500",
    price: "500€",
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
    <section id='pricingSection' className="py-20 px-4 md:py-32 md:px-8 bg-black/90 relative overflow-hidden">
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Un solo plan. Todo lo que necesitas.
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Ideal para emprendedores, pequeños negocios y proyectos personales que quieren comenzar con el pie derecho.
          </p>
        </div>

        <div className="max-w-xl mx-auto">
          <div 
            className="p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 transform hover:scale-105 animate-fade-in-up shadow-2xl"
            style={{ animationDelay: `100ms` }}
          >
            <h3 className="text-2xl font-bold text-white mb-2 text-center">{plan.name}</h3>
            <div className="flex flex-col items-center mb-6">
              <span className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                {plan.price}
              </span>
            </div>
            <p className="text-white/80 mb-8 text-center text-lg">{plan.description}</p>
            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-white/90">
                  <span className="mr-3 text-green-400 text-xl">✓</span>
                  <span className="text-lg">{feature}</span>
                </li>
              ))}
            </ul>
            <a href="#contacto">
              <button className="w-full py-4 px-6 border border-opacity-10 border-white bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-white/5 hover:to-white/10 transform hover:scale-105 transition-all duration-300 font-semibold text-lg shadow-lg">
                Reservar Ahora
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
