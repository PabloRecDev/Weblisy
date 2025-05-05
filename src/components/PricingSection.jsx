import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function PricingSection() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const plan = {
    name: "Sitio web profesional",
    originalPrice: "€500",
    price: "Desde 500€",
    description: "La solución perfecta para empresas que necesitan una presencia web profesional con un diseño atractivo y funcionalidades clave.",
    features: [
      "Diseño web personalizado",
      "Optimización SEO básica",
      "Soporte técnico durante 30 días",
      "Hosting incluido por 1 año",
      "Entrega rápida (7 días)"
    ]
  };

  const customAppPlan = {
    name: "Aplicación web a medida",
    price: "A consultar",
    description: "Desarrollo de aplicaciones web personalizadas según tus necesidades empresariales.",
    features: [
      "Análisis y consultoría personalizada",
      "Arquitectura y desarrollo a medida",
      "Integraciones con APIs y sistemas",
      "Escalabilidad y seguridad",
      "Soporte y mantenimiento extendido"
    ]
  };


  return (
    <section
      id='pricingSection'
      className="py-20 px-4 md:py-32 md:px-8 bg-black/90 relative overflow-hidden"
    >
      <div className="container mx-auto max-w-4xl relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Elige el plan que mejor se adapta a tu proyecto
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            Soluciones para empresas que quieren destacar online con un sitio profesional o una aplicación web a medida.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tarjeta Sitio web profesional DESTACADA */}
          <div 
            className="p-8 rounded-xl bg-gradient-to-br from-white to-gray-100 border border-gray-200 hover:border-black/20 transition-all duration-300 transform shadow-2xl"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <div className="mb-2">
              <span className="inline-block px-3 py-1 bg-black text-white text-xs font-bold rounded-full mb-2">¡Más elegido!</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
            <p className="text-gray-700 mb-8 text-lg">{plan.description}</p>

            <div className="flex flex-col mb-6">
              <span className="text-2xl font-bold text-gray-900">
                {plan.price}
              </span>
            </div>
            <Link to="/presupuesto">
              <button className="w-full py-4 px-6 mb-4 border border-opacity-10 border-white bg-black text-white rounded-md hover:from-white/5 hover:to-white/10 transform transition-all duration-300 font-semibold text-lg shadow-lg">
                Solicitar Presupuesto
              </button>
            </Link>
            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-800">
                  <span className="mr-3 text-green-500 text-xl">✓</span>
                  <span className="text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tarjeta Aplicación web a medida */}
          <div 
            className="p-8 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 transform shadow-2xl"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <div className="mb-2">
              <span className="inline-block px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full mb-2">Para empresas</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">{customAppPlan.name}</h3>
            <p className="text-white/80 mb-8 text-lg">{customAppPlan.description}</p>

            <div className="flex flex-col mb-6">
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r text-white">
                {customAppPlan.price}
              </span>
            </div>
            <Link to="/presupuesto">
              <button className="w-full py-4 px-6 mb-4 border border-opacity-10 border-white bg-white text-black rounded-md hover:from-white/5 hover:to-white/10 transform transition-all duration-300 font-semibold text-lg shadow-lg">
                Solicitar Presupuesto
              </button>
            </Link>
            <ul className="space-y-4 mb-8">
              {customAppPlan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-white/90">
                  <span className="mr-3 text-green-400 text-xl">✓</span>
                  <span className="text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
      </div>
    </section>
  );
}
