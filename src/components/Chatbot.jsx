import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  Loader2,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "¡Hola! Soy el asistente virtual de Weblisy. ¿En qué puedo ayudarte hoy?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  // Scroll optimizado para móviles
  const scrollToBottomMobile = () => {
    if (isMobile()) {
      // En móviles, usar un scroll más suave
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ 
          behavior: "smooth", 
          block: "end",
          inline: "nearest"
        });
      }, 100);
    } else {
      scrollToBottom();
    }
  };

  useEffect(() => {
    scrollToBottomMobile();
  }, [messages]);

  // Respuestas predefinidas para casos comunes
  const predefinedResponses = {
    // Información básica
    'precio': 'Nuestros precios son muy competitivos: Sitio Web Esencial desde 299€, Sitio Web con IA desde 499€, E-commerce Básico desde 799€, E-commerce Premium desde 1.499€, y Aplicaciones a Medida desde 1.499€. ¿Te gustaría conocer más detalles?',
    'servicios': 'Ofrecemos desarrollo web, aplicaciones web, ecommerce, mantenimiento de sitios web y más. ¿Te gustaría conocer más detalles?',
    'contacto': 'Puedes contactarnos a través de nuestro formulario de contacto o agendar una reunión directamente desde nuestra web.',
    'tiempo': 'Los tiempos de desarrollo dependen de la complejidad del proyecto. Un sitio web básico puede tomar 2-4 semanas.',
    
    // Tecnologías
    'tecnologías': 'Utilizamos las últimas tecnologías como React, Node.js, PHP, WordPress y más, según las necesidades del proyecto.',
    'wordpress': 'Sí, desarrollamos sitios web con WordPress. Es una excelente opción para sitios web dinámicos y fáciles de gestionar.',
    'react': 'Utilizamos React para crear aplicaciones web modernas y dinámicas. Es perfecto para sitios web interactivos.',
    'php': 'PHP es una de nuestras tecnologías principales para desarrollo web backend.',
    'javascript': 'JavaScript es fundamental en nuestros desarrollos, especialmente para crear experiencias interactivas.',
    'html': 'HTML es la base de todos nuestros desarrollos web.',
    'css': 'Utilizamos CSS moderno y frameworks como Tailwind para crear diseños atractivos.',
    
    // Servicios específicos
    'ecommerce': 'Desarrollamos tiendas online completas. Tenemos dos planes: E-commerce Básico desde 799€ (hasta 50 productos) y E-commerce Premium desde 1.499€ (productos ilimitados). Ambos incluyen pasarelas de pago y gestión de inventario.',
    'landing': 'Creamos landing pages optimizadas para conversión que ayudan a capturar leads y aumentar ventas.',
    'app': 'Desarrollamos aplicaciones web progresivas (PWAs) que funcionan como apps nativas.',
    'ia': 'Ofrecemos sitios web con asistente IA integrado desde 499€. Incluye chatbot inteligente, respuestas automáticas personalizadas e integración con WhatsApp Business. Puedes ver más detalles en nuestra página especial: /plan-sitio-web-ia',
    'chatbot': 'Nuestro plan de Sitio Web con IA incluye un chatbot inteligente que mejora la atención al cliente y aumenta las conversiones.',
    'blog': 'Creamos blogs personalizados con sistemas de gestión de contenido.',
    'cms': 'Implementamos sistemas de gestión de contenido para facilitar la administración.',
    
    // Diseño y UX
    'diseño': 'Nuestro equipo de diseño crea interfaces modernas y atractivas que mejoran la experiencia del usuario.',
    'ux': 'La experiencia de usuario es fundamental en todos nuestros proyectos.',
    'ui': 'Creamos interfaces de usuario intuitivas y atractivas.',
    'responsive': 'Todos nuestros sitios web son completamente responsivos y se adaptan a todos los dispositivos.',
    'móvil': 'Todos nuestros sitios web están optimizados para dispositivos móviles.',
    'tablet': 'Nuestros diseños se adaptan perfectamente a tablets y dispositivos medianos.',
    
    // Optimización y SEO
    'optimización': 'Optimizamos todos nuestros sitios web para velocidad, SEO y experiencia de usuario.',
    'seo': 'Incluimos optimización SEO básica en todos nuestros proyectos. También ofrecemos servicios de SEO avanzado.',
    'velocidad': 'La velocidad de carga es una prioridad en todos nuestros desarrollos.',
    'rendimiento': 'Optimizamos el rendimiento de todos nuestros sitios web.',
    
    // Hosting y Dominios
    'hosting': 'Sí, también ofrecemos servicios de hosting y dominios para nuestros clientes.',
    'dominio': 'Te ayudamos con la compra y configuración de dominios para tu proyecto.',
    'ssl': 'Todos nuestros sitios web incluyen certificados SSL para máxima seguridad.',
    'certificado': 'Implementamos certificados SSL en todos nuestros proyectos.',
    
    // Mantenimiento y Soporte
    'mantenimiento': 'Ofrecemos servicios de mantenimiento continuo para asegurar que tu sitio web funcione perfectamente.',
    'soporte': 'Ofrecemos soporte técnico continuo para todos nuestros proyectos.',
    'actualización': 'Mantenemos tus sitios web actualizados con las últimas tecnologías.',
    'backup': 'Realizamos backups regulares para proteger tu información.',
    
    // Garantías y Calidad
    'garantía': 'Ofrecemos garantía de 30 días en todos nuestros proyectos y soporte técnico post-lanzamiento.',
    'calidad': 'La calidad es nuestra prioridad en todos los proyectos.',
    'testeo': 'Realizamos pruebas exhaustivas antes del lanzamiento.',
    'revisión': 'Incluimos revisiones y ajustes en todos nuestros proyectos.',
    
    // Proceso de Trabajo
    'proceso': 'Nuestro proceso incluye consulta inicial, diseño, desarrollo, pruebas y lanzamiento.',
    'metodología': 'Utilizamos metodologías ágiles para garantizar la calidad y cumplimiento de plazos.',
    'comunicación': 'Mantenemos comunicación constante durante todo el proceso de desarrollo.',
    'reuniones': 'Agendamos reuniones regulares para mantenerte informado del progreso.',
    
    // Presupuesto y Pagos
    'presupuesto': 'Cada proyecto es único, por eso creamos presupuestos personalizados según tus necesidades.',
    'pago': 'Ofrecemos diferentes opciones de pago para adaptarnos a tu presupuesto.',
    'facturación': 'Emitimos facturas profesionales para todos nuestros servicios.',
    'contrato': 'Trabajamos con contratos claros que protegen tanto al cliente como a nosotros.',
    
    // Casos de Uso
    'empresa': 'Desarrollamos sitios web para empresas de todos los tamaños.',
    'startup': 'Ayudamos a startups a crear su presencia digital desde cero.',
    'freelancer': 'Creamos portafolios profesionales para freelancers.',
    'restaurante': 'Desarrollamos sitios web especializados para restaurantes y gastronomía.',
    'tienda': 'Creamos tiendas online completas para vender productos.',
    'servicios-especializados': 'Desarrollamos sitios web para empresas de servicios.',
    
    // Funcionalidades Específicas
    'formulario': 'Implementamos formularios de contacto y captura de leads.',
    'chat': 'Integramos sistemas de chat en vivo para atención al cliente.',
    'pago online': 'Implementamos pasarelas de pago seguras.',
    'carrito': 'Desarrollamos carritos de compra completos.',
    'inventario': 'Creamos sistemas de gestión de inventario.',
    'reserva': 'Implementamos sistemas de reservas online.',
    'calendario': 'Integramos calendarios interactivos.',
    'mapa': 'Incluimos mapas interactivos en los sitios web.',
    
    // Integraciones
    'google': 'Integramos servicios de Google como Analytics, Maps y más.',
    'facebook': 'Conectamos con redes sociales para mayor visibilidad.',
    'instagram': 'Integramos Instagram feeds en los sitios web.',
    'whatsapp': 'Conectamos WhatsApp Business para atención directa.',
    'email': 'Configuramos emails profesionales para tu dominio.',
    
    // Seguridad
    'seguridad': 'Implementamos las mejores prácticas de seguridad en todos nuestros proyectos.',
    'protección': 'Protegemos tus datos y los de tus clientes.',
    'gdpr': 'Cumplimos con las regulaciones de protección de datos.',
    'cookies': 'Implementamos políticas de cookies transparentes.',
    
    // Post-lanzamiento
    'capacitación': 'Ofrecemos capacitación para que puedas gestionar tu sitio web.',
    'documentación': 'Proporcionamos documentación completa de tu proyecto.',
    'tutorial': 'Creamos tutoriales personalizados para tu sitio web.',
    'manual': 'Entregamos manuales de usuario completos.',
    
    // Soporte Técnico
    'problema': 'Ofrecemos soporte técnico rápido para resolver cualquier problema.',
    'error': 'Tenemos un equipo técnico disponible para solucionar errores.',
    'ayuda': 'Estamos aquí para ayudarte con cualquier consulta técnica.',
    'emergencia': 'Ofrecemos soporte de emergencia para problemas críticos.',
    
    // Información de la Empresa
    'weblisy': 'Weblisy es una agencia de desarrollo web especializada en crear experiencias digitales únicas.',
    'equipo': 'Nuestro equipo está formado por desarrolladores, diseñadores y especialistas en marketing digital.',
    'experiencia': 'Tenemos años de experiencia en desarrollo web y hemos trabajado con clientes de diversos sectores.',
    'portafolio': 'Puedes ver nuestros trabajos anteriores en la sección de proyectos.',
    'referencias': 'Tenemos clientes satisfechos que pueden dar fe de nuestro trabajo.',
    'recomendación': 'Muchos de nuestros clientes nos recomiendan por la calidad de nuestro trabajo.',
    
    // Ubicación y Horarios
    'ubicación': 'Trabajamos de forma remota, lo que nos permite atender clientes de cualquier lugar.',
    'horario': 'Estamos disponibles en horario de oficina y también ofrecemos soporte fuera de horario.',
    'zona horaria': 'Adaptamos nuestros horarios a tu zona horaria para mejor comunicación.',
    
    // Idiomas
    'español': 'Trabajamos principalmente en español, pero también podemos desarrollar sitios en otros idiomas.',
    'inglés': 'Podemos desarrollar sitios web en inglés y otros idiomas.',
    'multilingüe': 'Desarrollamos sitios web multilingües para llegar a audiencias globales.',
    
    // Tecnologías Específicas
    'api': 'Desarrollamos APIs personalizadas para conectar diferentes sistemas.',
    'webhook': 'Implementamos webhooks para automatizar procesos.',
    'cms-avanzado': 'Utilizamos sistemas de gestión de contenido como WordPress, Drupal y otros.',
    'framework': 'Trabajamos con frameworks modernos como React, Vue, Angular y más.',
    'base de datos': 'Implementamos bases de datos optimizadas para cada proyecto.',
    'servidor': 'Configuramos servidores optimizados para el mejor rendimiento.',
    
    // Marketing Digital
    'marketing': 'Ofrecemos servicios de marketing digital para promocionar tu sitio web.',
    'publicidad': 'Implementamos campañas de publicidad digital.',
    'analytics': 'Configuramos Google Analytics y otras herramientas de análisis.',
    'conversión': 'Optimizamos los sitios web para maximizar las conversiones.',
    'lead': 'Implementamos estrategias para capturar y gestionar leads.',
    'email marketing': 'Desarrollamos campañas de email marketing efectivas.',
    
    // Mantenimiento Continuo
    'actualización-continua': 'Mantenemos tus sitios web actualizados con las últimas tecnologías.',
    'monitoreo': 'Monitoreamos el rendimiento de tus sitios web 24/7.',
    'backup-automático': 'Realizamos backups automáticos para proteger tu información.',
    'seguridad-continua': 'Implementamos medidas de seguridad continuas.',
    'optimización-continua': 'Optimizamos constantemente el rendimiento de tus sitios web.',
    
    // Soporte y Mantenimiento
    'soporte 24/7': 'Ofrecemos soporte técnico disponible las 24 horas.',
    'emergencia-soporte': 'Tenemos un equipo de emergencia para problemas críticos.',
    'mantenimiento preventivo': 'Realizamos mantenimiento preventivo regular.',
    'monitoreo continuo': 'Monitoreamos tus sitios web de forma continua.',
    
    // Garantías y Calidad
    'garantía de calidad': 'Garantizamos la calidad de todos nuestros trabajos.',
    'satisfacción': 'Tu satisfacción es nuestra prioridad.',
    'revisión gratuita': 'Incluimos revisiones gratuitas en todos nuestros proyectos.',
    'ajustes': 'Realizamos ajustes sin costo adicional durante el desarrollo.',
    
    // Proceso de Trabajo Detallado
    'consulta-gratuita': 'Comenzamos con una consulta gratuita para entender tus necesidades.',
    'diseño-personalizado': 'Creamos diseños personalizados según tu marca.',
    'desarrollo': 'Desarrollamos tu proyecto con las mejores tecnologías.',
    'pruebas': 'Realizamos pruebas exhaustivas antes del lanzamiento.',
    'lanzamiento': 'Lanzamos tu proyecto con todas las optimizaciones necesarias.',
    'seguimiento': 'Hacemos seguimiento post-lanzamiento para asegurar el éxito.',
    
    // Comunicación y Colaboración
    'comunicación-constante': 'Mantenemos comunicación constante durante todo el proceso.',
    'colaboración': 'Trabajamos en estrecha colaboración contigo.',
    'feedback': 'Valoramos tu feedback en cada etapa del proyecto.',
    'reuniones-regulares': 'Agendamos reuniones regulares para mantenerte informado.',
    
    // Presupuesto y Financiamiento
    'presupuesto flexible': 'Ofrecemos opciones de pago flexibles.',
    'pago en cuotas': 'Permitimos pagos en cuotas sin intereses.',
    'presupuesto personalizado': 'Creamos presupuestos adaptados a tu proyecto.',
    'inversión': 'Cada proyecto es una inversión en el futuro de tu negocio.',
    
    // Resultados y ROI
    'resultados': 'Nos enfocamos en generar resultados medibles para tu negocio.',
    'roi': 'Ayudamos a maximizar el retorno de inversión de tu sitio web.',
    'crecimiento': 'Nuestros proyectos contribuyen al crecimiento de tu negocio.',
    'ventas': 'Optimizamos los sitios web para aumentar las ventas.',
    
    // Innovación y Tecnología
    'innovación': 'Utilizamos las tecnologías más innovadoras del mercado.',
    'tendencias': 'Seguimos las últimas tendencias en desarrollo web.',
    'futuro': 'Desarrollamos soluciones pensando en el futuro.',
    'escalabilidad': 'Creamos soluciones escalables que crecen con tu negocio.',
    
    // Experiencia del Cliente
    'atención': 'Ofrecemos atención personalizada a cada cliente.',
    'dedicación': 'Nos dedicamos completamente a cada proyecto.',
    'compromiso': 'Estamos comprometidos con el éxito de tu proyecto.',
    'confianza': 'Construimos relaciones de confianza a largo plazo.',
    
    // Certificaciones y Estándares
    'certificaciones': 'Nuestro equipo cuenta con certificaciones en las mejores tecnologías.',
    'estándares': 'Seguimos los estándares más altos de la industria.',
    'mejores prácticas': 'Implementamos las mejores prácticas en todos nuestros proyectos.',
    'calidad-premium': 'La calidad es nuestra marca registrada.',
    
    // Soporte Post-venta
    'post-venta': 'Ofrecemos soporte completo después del lanzamiento.',
    'acompañamiento': 'Te acompañamos en todo el proceso de crecimiento.',
    'evolución': 'Ayudamos a que tu sitio web evolucione con tu negocio.',
    'mejoras': 'Sugerimos mejoras continuas para optimizar resultados.',
    
    // Tecnologías Emergentes
    'ai': 'Integramos inteligencia artificial en nuestros desarrollos.',
    'machine learning': 'Implementamos machine learning para personalización.',
    'chatbot-inteligente': 'Desarrollamos chatbots inteligentes para atención al cliente.',
    'automatización': 'Automatizamos procesos para mayor eficiencia.',
    
    // Accesibilidad
    'accesibilidad': 'Desarrollamos sitios web accesibles para todos los usuarios.',
    'inclusión': 'Creamos experiencias digitales inclusivas.',
    'wcag': 'Cumplimos con los estándares WCAG de accesibilidad.',
    'discapacidad': 'Consideramos las necesidades de usuarios con discapacidades.',
    
    // Sostenibilidad
    'sostenibilidad': 'Desarrollamos soluciones digitales sostenibles.',
    'energía': 'Optimizamos el consumo de energía en nuestros servidores.',
    'verde': 'Utilizamos hosting verde para reducir la huella de carbono.',
    'ecológico': 'Contribuimos a un futuro digital más ecológico.'
  };

  const getBotResponse = async (userMessage) => {
    // Simular respuesta del bot con delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const lowerMessage = userMessage.toLowerCase();
    
    // Buscar palabras clave en respuestas predefinidas
    for (const [keyword, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }

    // Respuestas por defecto según el contexto
    if (lowerMessage.includes('hola') || lowerMessage.includes('buenos días') || lowerMessage.includes('buenas')) {
      return '¡Hola! ¿En qué puedo ayudarte hoy?';
    }
    
    if (lowerMessage.includes('gracias')) {
      return '¡De nada! Estoy aquí para ayudarte. ¿Hay algo más en lo que pueda asistirte?';
    }
    
    if (lowerMessage.includes('adiós') || lowerMessage.includes('chao') || lowerMessage.includes('hasta luego')) {
      return '¡Hasta luego! Ha sido un placer ayudarte. ¡Que tengas un excelente día!';
    }

    // Respuesta genérica
    return 'Gracias por tu consulta. Te recomiendo contactar directamente con nuestro equipo para obtener información más específica sobre tu proyecto. ¿Te gustaría que te ayude a agendar una reunión?';
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    
    // Agregar mensaje del usuario
    const userMsg = {
      id: Date.now(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const botResponse = await getBotResponse(userMessage);
      
      const botMsg = {
        id: Date.now() + 1,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error('Error al procesar mensaje:', error);
      const errorMsg = {
        id: Date.now() + 1,
        text: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.',
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Detectar si es dispositivo móvil
  const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  // Manejar el foco del input en móviles
  const handleInputFocus = () => {
    if (isMobile()) {
      // Scroll suave hacia el input en móviles
      setTimeout(() => {
        inputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  // Acciones rápidas para móviles
  const quickActions = [
    { text: "¿Cuánto vale?", action: "precio" },
    { text: "¿Qué hacéis?", action: "servicios" },
    { text: "¿Cuánto tarda?", action: "tiempo" },
    { text: "¿Tenéis garantía?", action: "garantía" },
    { text: "¿Hacéis tiendas online?", action: "ecommerce" },
    { text: "¿Sitio web con IA?", action: "ia" },
    { text: "¿Tenéis hosting?", action: "hosting" }
  ];

  const handleQuickAction = (action) => {
    setInputValue(action);
    handleSendMessage();
    setShowQuickActions(false);
  };

  return (
    <>
      {/* Botón flotante del chatbot */}
      <motion.div
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <button
          onClick={toggleChat}
          className="bg-black/20 backdrop-blur-md border border-white/20 text-white p-3 md:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:bg-black/30 touch-manipulation"
          aria-label="Abrir chat"
        >
          <MessageCircle size={20} className="md:w-6 md:h-6" />
        </button>
      </motion.div>

      {/* Ventana del chatbot */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 right-4 left-4 md:bottom-24 md:right-6 md:left-auto z-50 w-auto md:w-96 max-h-[80vh] md:max-h-[600px] bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-black/40 backdrop-blur-md border-b border-white/20 text-white p-3 md:p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={14} className="md:w-4 md:h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm md:text-base">Asistente Weblisy</h3>
                  <p className="text-xs opacity-90">En línea</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 md:space-x-2">
                <button
                  onClick={toggleMinimize}
                  className="p-1 hover:bg-white/20 rounded transition-colors touch-manipulation"
                  aria-label="Minimizar"
                >
                  {isMinimized ? <ChevronUp size={14} className="md:w-4 md:h-4" /> : <ChevronDown size={14} className="md:w-4 md:h-4" />}
                </button>
                <button
                  onClick={toggleChat}
                  className="p-1 hover:bg-white/20 rounded transition-colors touch-manipulation"
                  aria-label="Cerrar chat"
                >
                  <X size={14} className="md:w-4 md:h-4" />
                </button>
              </div>
            </div>

            {/* Contenido del chat */}
            {!isMinimized && (
              <>
                {/* Mensajes */}
                <div className="h-80 md:h-96 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                                                                    <div
                         className={`max-w-[85%] md:max-w-[80%] p-2.5 md:p-3 rounded-2xl ${
                           message.sender === 'user'
                             ? 'bg-white/20 backdrop-blur-md border border-white/20 text-white'
                             : 'bg-black/40 backdrop-blur-md border border-white/20 text-white'
                         }`}
                       >
                         <p className="text-xs md:text-sm leading-relaxed">{message.text}</p>
                         <p className="text-xs opacity-70 mt-1">
                           {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                         </p>
                       </div>
                    </motion.div>
                  ))}
                  
                  {isLoading && (
                    <motion.div
                      className="flex justify-start"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                                           <div className="bg-black/40 backdrop-blur-md border border-white/20 text-white p-2.5 md:p-3 rounded-2xl">
                       <div className="flex items-center space-x-2">
                         <div className="flex space-x-1">
                           <motion.div
                             className="w-2 h-2 bg-white/60 rounded-full"
                             animate={{ scale: [1, 1.2, 1] }}
                             transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                           />
                           <motion.div
                             className="w-2 h-2 bg-white/60 rounded-full"
                             animate={{ scale: [1, 1.2, 1] }}
                             transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                           />
                           <motion.div
                             className="w-2 h-2 bg-white/60 rounded-full"
                             animate={{ scale: [1, 1.2, 1] }}
                             transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                           />
                         </div>
                         <span className="text-xs md:text-sm">Escribiendo...</span>
                       </div>
                     </div>
                    </motion.div>
                  )}
                  
                                    <div ref={messagesEndRef} />
                </div>

                {/* Acciones rápidas para móviles */}
                {isMobile() && messages.length === 1 && (
                  <motion.div
                    className="px-3 md:px-4 pb-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <p className="text-xs text-white/60 mb-2">Preguntas rápidas:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickActions.map((action, index) => (
                        <motion.button
                          key={action.action}
                          onClick={() => handleQuickAction(action.action)}
                          className="px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs text-white hover:bg-white/20 transition-all duration-200 touch-manipulation"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {action.text}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Input */}
                <div className="p-3 md:p-4 border-t border-white/20">
                  <div className="flex space-x-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Escribe tu mensaje..."
                      className="flex-1 px-3 md:px-4 py-2 bg-black/20 backdrop-blur-md border border-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/60 text-sm md:text-base"
                      disabled={isLoading}
                      onFocus={handleInputFocus}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isLoading}
                      className="bg-white/20 backdrop-blur-md border border-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white p-1.5 md:p-2 rounded-full transition-all duration-200 touch-manipulation"
                    >
                      <Send size={14} className="md:w-4 md:h-4" />
                    </button>
                    {isMobile() && (
                      <button
                        onClick={() => inputRef.current?.blur()}
                        className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white p-1.5 md:p-2 rounded-full transition-all duration-200 touch-manipulation"
                        title="Ocultar teclado"
                      >
                        <ChevronDown size={14} className="md:w-4 md:h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot; 