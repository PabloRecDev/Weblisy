import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake, faDraftingCompass, faLaptopCode, faCheckCircle, faLifeRing } from '@fortawesome/free-solid-svg-icons';
import { Radius } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function ProcessSection() {
  const steps = [
    {
      title: "1. Contacto inicial",
      description: "Nos ponemos en contacto para entender tus necesidades y objetivos.",
      icon: <FontAwesomeIcon icon={faHandshake} style={{ color: '#4CAF50'}} />
    },
    {
      title: "2. Boceto y propuesta",
      description: "Creamos un boceto y una propuesta para tu proyecto.",
      icon: <FontAwesomeIcon icon={faDraftingCompass} style={{ color: '#FF9800' }} />
    },
    {
      title: "3. Desarrollo",
      description: "Desarrollamos el proyecto con las mejores prácticas.",
      icon: <FontAwesomeIcon icon={faLaptopCode} style={{ color: '#2196F3' }} />
    },
    {
      title: "4. Revisión",
      description: "Revisamos el proyecto para asegurar la calidad.",
      icon: <FontAwesomeIcon icon={faCheckCircle} style={{ color: '#9C27B0' }} />
    },
    {
      title: "5. Entrega y soporte",
      description: "Entregamos el proyecto y ofrecemos soporte continuo.",
      icon: <FontAwesomeIcon icon={faLifeRing} style={{ color: '#F44336' }} />
    },
    {
      title: "6. Evaluación",
      description: "Evaluamos el proyecto para futuras mejoras.",
      icon: <FontAwesomeIcon icon={faLifeRing} style={{ color: '#FFC107' }} />
    }
  ];

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section id='proceso' className="py-20 px-4 md:py-32 md:px-8 bg-gradient-to bg-black/90  relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552566626-52f371b0f9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-20"></div>
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Nuestro Proceso de Trabajo</h2>
          <p className="text-white opacity-80 max-w-2xl mx-auto">
            Así es como llevamos tu idea a la realidad digital.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="p-6 rounded-lg bg-white/10 border border-opacity-10 border-white hover:border-white/40 transition-all duration-300 transform hover:scale-105"
              data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
              data-aos-duration="1200"
              data-aos-delay={`${index * 200}`}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-white/10 p-3 rounded-full">{step.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
              <p className="text-white opacity-80">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
