import React from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { PlusIcon, MinusIcon } from '@radix-ui/react-icons';

const faqData = [
    {
        question: '¿Cuánto cuesta hacer una página web?',
        answer: 'El precio de una web depende de muchos factores, como la complejidad del diseño, el número de páginas, y las funcionalidades específicas que necesites (tienda online, sistema de reservas, etc.). Ofrecemos presupuestos a medida sin compromiso. Puedes empezar solicitando uno en nuestra sección de contacto.',
    },
    {
        question: '¿Cuánto tiempo se tarda en crear un sitio web?',
        answer: 'Un sitio web corporativo simple puede tardar entre 4 y 6 semanas. Proyectos más complejos como aplicaciones web o tiendas online pueden llevar de 2 a 4 meses. En nuestra propuesta detallada siempre incluimos un cronograma estimado.',
    },
    {
        question: '¿Podré actualizar el contenido yo mismo?',
        answer: 'Depende del tipo de proyecto. Para sitios web que requieren actualizaciones frecuentes, solemos usar WordPress, que incluye un panel de gestión de contenidos (CMS) muy intuitivo que te permite editar textos, imágenes y añadir entradas de blog fácilmente. Para proyectos más específicos o aplicaciones web, la gestión de contenidos se puede personalizar según tus necesidades. En cualquier caso, te ofrecemos formación para que aprendas a usar el sistema que elijamos para tu proyecto.',
    },
    {
        question: '¿El hosting y el dominio están incluidos?',
        answer: 'El hosting (alojamiento web) y el dominio no están incluidos en el precio del desarrollo, pero podemos asesorarte sobre las mejores opciones y ayudarte en todo el proceso de contratación y configuración para que no tengas que preocuparte por nada técnico.',
    },
    {
        question: '¿Ofrecéis servicios de mantenimiento después del lanzamiento?',
        answer: 'Sí. De hecho, lo recomendamos encarecidamente. Ofrecemos varios planes de mantenimiento para asegurar que tu web se mantenga segura, actualizada y funcionando a la perfección. Puedes consultar nuestros planes en la sección de Mantenimiento y Soporte.',
    },
    {
        question: '¿Hacéis optimización SEO?',
        answer: 'Todos nuestros desarrollos incluyen una optimización SEO inicial. Esto significa que la web se construye con una base técnica sólida (velocidad de carga, estructura de URLs, meta etiquetas, etc.) para que Google pueda rastrearla e indexarla correctamente desde el primer día.',
    },
];

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <motion.div
            className="border-b border-white/10"
            layout
        >
            <motion.button
                className="flex justify-between items-center w-full py-6 text-left"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-lg md:text-xl font-medium text-white">{question}</h3>
                <div className="text-[#038e42]">
                    {isOpen ? <MinusIcon className="w-6 h-6" /> : <PlusIcon className="w-6 h-6" />}
                </div>
            </motion.button>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
            >
                <p className="pb-6 text-gray-300 leading-relaxed">{answer}</p>
            </motion.div>
        </motion.div>
    );
};

const FAQPage = () => {
  return (
    <>
      <Helmet>
        <title>Preguntas Frecuentes (FAQ) | Weblisy</title>
        <meta name="description" content="Encuentra respuestas a las preguntas más comunes sobre nuestros servicios de diseño web, precios, plazos y soporte. Resolvemos todas tus dudas." />
        <link rel="canonical" href="https://weblisy.com/faq" />
      </Helmet>

      {/* Hero Section */}
      <section className="py-20 px-4 md:py-32 md:px-8 text-center relative overflow-hidden bg-black">
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Preguntas Frecuentes
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Resolvemos tus dudas. Aquí encontrarás las respuestas a las preguntas más comunes sobre nuestro trabajo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ List Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="container mx-auto max-w-3xl">
          {faqData.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:py-32 md:px-8 bg-white/5">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              ¿Tienes alguna otra pregunta?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Si no has encontrado la respuesta que buscabas, no dudes en contactarnos. Estaremos encantados de ayudarte.
            </p>
            <Link to="/contacto">
              <motion.button
                className="bg-[#038e42] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#038e42]/80 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Contactar ahora
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default FAQPage; 