import React from 'react';

export default function PricingSection() {
  const menus = [
    {
      name: "Plan Básico",
      price: "€500",
      description: "Servicios esenciales de desarrollo web para pequeñas empresas y emprendedores.",
      features: [
        "Diseño web personalizado",
        "Optimización SEO básica",
        "Soporte técnico",
        "Hosting incluido"
      ]
    },
    {
      name: "Plan Profesional",
      price: "€1500",
      description: "Características avanzadas para empresas que buscan expandir su presencia en línea.",
      features: [
        "Integración de comercio electrónico",
        "Optimización SEO avanzada",
        "Análisis de tráfico web",
        "Soporte prioritario"
      ]
    },
    {
      name: "Plan Empresarial",
      price: "€3000",
      description: "Soluciones completas de desarrollo web para grandes organizaciones.",
      features: [
        "Desarrollo a medida",
        "Integración de sistemas",
        "Consultoría estratégica",
        "Soporte dedicado 24/7"
      ]
    }
  ];

  return (
    <section id='pricingSection' className="py-20 px-4 md:py-32 md:px-8 bg-black relative overflow-hidden">
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Nuestros Planes</h2>
          <p className="text-white opacity-80 max-w-2xl mx-auto">
            Elige el plan que mejor se adapte a las necesidades de tu negocio y lleva tu presencia en línea al siguiente nivel.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {menus.map((menu, index) => (
            <div 
              key={index} 
              className="p-8 rounded-lg bg-black border border-white/20 hover:border-white/40 transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-2xl font-bold text-white mb-2">{menu.name}</h3>
              <div className="text-4xl font-bold text-white mb-4">{menu.price}</div>
              <p className="text-white opacity-80 mb-6">{menu.description}</p>
              <ul className="space-y-3 mb-8">
                {menu.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-white">
                    <span className="mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-3 px-6 bg-white text-black rounded-lg hover:bg-black hover:text-white border border-white transition-colors duration-300">
                Reservar Ahora
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 