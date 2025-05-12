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
    price: "€399",
    description: "Oferta especial disponible por tiempo limitado. Ideal para empresas que buscan una presencia profesional en línea con diseño a medida y funcionalidades clave.",
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
          {/* Tarjeta Sitio web profesional DESTACADA CON OFERTA */}
          <div 
            className="p-8 rounded-xl bg-white border border-gray-200 hover:border-black/20 transition-all duration-300 shadow-xl"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <div className="mb-4 space-x-2">
              <span className="inline-block px-3 py-1 bg-black  text-white text-xs font-bold rounded-full">Más elegido</span>
              <span className="bg-green-200 text-green-700 border border-green-700 px-3 py-1 rounded-full text-xs font-bold">
  Oferta limitada -20%
</span>




            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
            <p className="text-gray-700 mb-6 text-base">{plan.description}</p>

            <div className="flex items-baseline space-x-2 mb-6">
              <span className="text-lg text-gray-400 line-through">{plan.originalPrice}</span>
              <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
            </div>

            <Link to="/presupuesto">
              <button className="w-full py-3 px-6 mb-6 bg-black text-white rounded-lg transition duration-300 font-medium text-base shadow">
                Solicitar Presupuesto
              </button>
            </Link>

            <ul className="space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-800">
                  <span className="mr-3 text-green-600 text-xl">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tarjeta Aplicación web a medida */}
          <div 
            className="p-8 rounded-xl bg-white/5 backdrop-blur border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <div className="mb-4">
  <span className="inline-flex items-center bg-black    text-white text-xs font-bold px-3 py-1 rounded-full">
    Para empresas
  </span>
</div>

            <h3 className="text-2xl font-semibold text-white mb-2">{customAppPlan.name}</h3>
            <p className="text-white/80 mb-6 text-base">{customAppPlan.description}</p>

            <div className="mb-6">
              <span className="text-3xl font-bold text-white">{customAppPlan.price}</span>
            </div>

            <Link to="/presupuesto">
              <button className="w-full py-3 px-6 mb-6 bg-white text-black rounded-lg hover:bg-gray-100 transition duration-300 font-medium text-base shadow">
                Solicitar Presupuesto
              </button>
            </Link>

            <ul className="space-y-3">
              {customAppPlan.features.map((feature, index) => (
                <li key={index} className="flex items-center text-white/90">
                  <span className="mr-3 text-green-400 text-xl">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
