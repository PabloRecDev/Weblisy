import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  MobileIcon,
  IdCardIcon,
  CubeIcon,
  BarChartIcon,
  CheckCircledIcon,
  RocketIcon,
} from '@radix-ui/react-icons';

const includedFeatures = [
  'Diseño de tienda 100% personalizado',
  'Pasarelas de pago seguras (Stripe, PayPal, etc.)',
  'Gestión de productos, categorías e inventario',
  'Optimización para la conversión (CRO)',
  'Sistema de cupones y descuentos',
  'Cálculo de impuestos y gastos de envío',
  'Fichas de producto optimizadas para SEO',
  'Proceso de checkout fácil y seguro',
];

const EcommercePage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Desarrollo de Tiendas Online (E-commerce) | Weblisy</title>
        <meta name="description" content="Creamos tiendas online a medida, robustas y optimizadas para vender. Expertos en WooCommerce, Shopify y soluciones personalizadas para tu e-commerce." />
        <link rel="canonical" href="https://weblisy.com/servicios/ecommerce" />
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
              <div className="inline-block bg-purple-500/10 p-3 rounded-xl border border-purple-400/20 mb-6">
                <MobileIcon className="w-8 h-8 text-purple-400" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Tiendas Online que Venden
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Transformamos tu idea de negocio en una plataforma de e-commerce potente, segura y diseñada para maximizar tus ventas.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 md:px-8 bg-white/5">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Una solución E-commerce completa
              </h2>
              <p className="text-lg text-gray-400 mt-4">
                Todo lo que tu tienda online necesita para triunfar, incluido de serie.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {includedFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black/50 p-6 rounded-lg border border-white/10 flex items-start space-x-4"
                >
                  <CheckCircledIcon className="w-6 h-6 text-[#038e42] mt-1 flex-shrink-0" />
                  <p className="text-gray-300">{feature}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Platforms Section */}
        <section className="py-20 px-4 md:px-8">
            <div className="container mx-auto max-w-6xl">
                 <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">La plataforma adecuada para tu negocio</h2>
                    <p className="text-lg text-gray-400 mt-4">
                        Trabajamos con las mejores tecnologías para garantizar flexibilidad y escalabilidad.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white/5 p-8 rounded-xl border border-white/10 text-center">
                        <CubeIcon className="w-10 h-10 text-purple-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">WooCommerce</h3>
                        <p className="text-gray-400">La solución más flexible y personalizable, integrada en WordPress. Ideal para un control total sobre tu tienda.</p>
                    </div>
                     <div className="bg-white/5 p-8 rounded-xl border border-white/10 text-center">
                        <RocketIcon className="w-10 h-10 text-purple-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">Shopify</h3>
                        <p className="text-gray-400">Perfecto para un lanzamiento rápido y una gestión sencilla. Ideal para emprendedores y marcas en crecimiento.</p>
                    </div>
                     <div className="bg-white/5 p-8 rounded-xl border border-white/10 text-center">
                        <IdCardIcon className="w-10 h-10 text-purple-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">Desarrollo a Medida</h3>
                        <p className="text-gray-400">Para proyectos únicos con necesidades específicas. Creamos una solución desde cero totalmente adaptada a ti.</p>
                    </div>
                </div>
            </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 md:py-32 md:px-8 bg-black">
          <div className="container mx-auto max-w-4xl text-center bg-purple-500/10 p-12 rounded-2xl border border-purple-400/20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                ¿Listo para empezar a vender online?
              </h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Hablemos sobre tu proyecto de e-commerce. Te daremos una hoja de ruta clara para el éxito.
              </p>
              <Link to="/presupuesto">
                  <motion.button
                  className="bg-[#038e42] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#038e42]/80 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  >
                  Impulsa tu negocio
                  </motion.button>
              </Link>
            </motion.div>
          </div>
        </section>

      </main>

    </div>
  );
};

export default EcommercePage; 