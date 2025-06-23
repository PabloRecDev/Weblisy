import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  RocketIcon,
  GearIcon,
  UpdateIcon,
  HeartFilledIcon,
  CheckCircledIcon,
} from '@radix-ui/react-icons';

const maintenancePlans = [
  {
    name: 'Plan Esencial',
    price: 'Desde 49€',
    description: 'Para sitios web que necesitan estar siempre seguros y actualizados.',
    features: [
      'Actualizaciones de core y plugins',
      'Copias de seguridad semanales',
      'Monitorización de seguridad 24/7',
      'Reporte mensual de estado',
    ],
    cta: 'Contratar Plan Esencial',
  },
  {
    name: 'Plan Crecimiento',
    price: 'Desde 99€',
    description: 'Ideal para negocios que buscan optimización y soporte continuo.',
    features: [
      'Todo lo del Plan Esencial',
      'Optimización de rendimiento (WPO)',
      'Soporte técnico prioritario (2h/mes)',
      'Monitorización de uptime',
    ],
    cta: 'Contratar Plan Crecimiento',
  },
  {
    name: 'Plan Premium',
    price: 'A medida',
    description: 'Solución integral para e-commerce y aplicaciones críticas.',
    features: [
      'Todo lo del Plan Crecimiento',
      'Soporte técnico extendido',
      'Consultoría SEO y de contenido',
      'Atención de emergencia 24/7',
    ],
    cta: 'Solicitar Presupuesto',
  },
];

const MantenimientoPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Mantenimiento Web y Soporte Técnico | Weblisy</title>
        <meta name="description" content="Ofrecemos planes de mantenimiento web para mantener tu sitio seguro, rápido y actualizado. Nos encargamos de la tecnología para que tú te centres en tu negocio." />
        <link rel="canonical" href="https://weblisy.com/servicios/mantenimiento" />
      </Helmet>

      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 md:px-8 relative overflow-hidden bg-black">
          <div className="container mx-auto max-w-5xl">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block bg-yellow-500/10 p-3 rounded-xl border border-yellow-400/20 mb-6">
                <RocketIcon className="w-8 h-8 text-yellow-400" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Mantenimiento y Soporte Web
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Tu tranquilidad es nuestra prioridad. Mantenemos tu web segura, rápida y funcionando sin interrupciones.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Why Maintenance Section */}
        <section className="py-20 px-4 md:px-8 bg-white/5">
            <div className="container mx-auto max-w-6xl">
                 <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">¿Por qué es crucial el mantenimiento?</h2>
                    <p className="text-lg text-gray-400 mt-4">
                        Un sitio web es un activo vivo que necesita cuidados constantes.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-black/50 p-8 rounded-xl border border-white/10 text-center">
                        <GearIcon className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">Seguridad</h3>
                        <p className="text-gray-400">Protegemos tu web contra hackers, malware y vulnerabilidades con monitorización y actualizaciones constantes.</p>
                    </div>
                     <div className="bg-black/50 p-8 rounded-xl border border-white/10 text-center">
                        <UpdateIcon className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">Rendimiento</h3>
                        <p className="text-gray-400">Optimizamos la velocidad de carga y el rendimiento para mejorar la experiencia del usuario y el SEO.</p>
                    </div>
                     <div className="bg-black/50 p-8 rounded-xl border border-white/10 text-center">
                        <HeartFilledIcon className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">Tranquilidad</h3>
                        <p className="text-gray-400">Nos encargamos de todo lo técnico para que puedas centrarte en hacer crecer tu negocio sin preocupaciones.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Pricing Section */}
        <section className="py-20 px-4 md:px-8">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Planes para cada necesidad</h2>
                <p className="text-lg text-gray-400 mt-4">
                    Elige el plan que mejor se adapte a tu proyecto y presupuesto.
                </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {maintenancePlans.map((plan, index) => (
                <div key={plan.name} className={`rounded-xl p-8 flex flex-col border transition-all duration-300 ${index === 1 ? 'bg-white/5 border-[#038e42]/50 scale-105' : 'bg-black border-white/10'}`}>
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  <p className="text-gray-400 mt-2">{plan.description}</p>
                  <div className="my-8">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400">/mes</span>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <CheckCircledIcon className="w-5 h-5 text-[#038e42] mr-3" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto">
                    <Link to="/contacto">
                      <motion.button className={`w-full py-3 rounded-lg font-semibold transition-colors ${index === 1 ? 'bg-[#038e42] text-white hover:bg-[#038e42]/80' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                        {plan.cta}
                      </motion.button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

    </div>
  );
};

export default MantenimientoPage; 