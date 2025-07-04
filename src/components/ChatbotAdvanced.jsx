import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  Loader2,
  ChevronUp,
  ChevronDown,
  Settings,
  Zap
} from 'lucide-react';

const ChatbotAdvanced = () => {
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
  const [useAI, setUseAI] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Configuración de APIs (puedes agregar tus propias claves)
  const API_CONFIG = {
    openai: {
      url: 'https://api.openai.com/v1/chat/completions',
      key: import.meta.env.VITE_OPENAI_API_KEY || '',
    },
    // Puedes agregar más APIs aquí
  };

  // Respuestas predefinidas para casos comunes
  const predefinedResponses = {
    'precio': 'Nuestros precios varían según el proyecto. Te recomiendo solicitar un presupuesto personalizado en nuestra página de presupuesto.',
    'servicios': 'Ofrecemos desarrollo web, aplicaciones web, ecommerce, mantenimiento de sitios web y más. ¿Te gustaría conocer más detalles?',
    'contacto': 'Puedes contactarnos a través de nuestro formulario de contacto o agendar una reunión directamente desde nuestra web.',
    'tiempo': 'Los tiempos de desarrollo dependen de la complejidad del proyecto. Un sitio web básico puede tomar 2-4 semanas.',
    'tecnologías': 'Utilizamos las últimas tecnologías como React, Node.js, PHP, WordPress y más, según las necesidades del proyecto.',
    'mantenimiento': 'Ofrecemos servicios de mantenimiento continuo para asegurar que tu sitio web funcione perfectamente.',
    'hosting': 'Sí, también ofrecemos servicios de hosting y dominios para nuestros clientes.',
    'seo': 'Incluimos optimización SEO básica en todos nuestros proyectos. También ofrecemos servicios de SEO avanzado.',
    'responsive': 'Todos nuestros sitios web son completamente responsivos y se adaptan a todos los dispositivos.',
    'garantía': 'Ofrecemos garantía de 30 días en todos nuestros proyectos y soporte técnico post-lanzamiento.',
    'wordpress': 'Sí, desarrollamos sitios web con WordPress. Es una excelente opción para sitios web dinámicos y fáciles de gestionar.',
    'react': 'Utilizamos React para crear aplicaciones web modernas y dinámicas. Es perfecto para sitios web interactivos.',
    'ecommerce': 'Desarrollamos tiendas online completas con todas las funcionalidades necesarias para vender online.',
    'landing': 'Creamos landing pages optimizadas para conversión que ayudan a capturar leads y aumentar ventas.',
    'app': 'Desarrollamos aplicaciones web progresivas (PWAs) que funcionan como apps nativas.',
    'diseño': 'Nuestro equipo de diseño crea interfaces modernas y atractivas que mejoran la experiencia del usuario.',
    'optimización': 'Optimizamos todos nuestros sitios web para velocidad, SEO y experiencia de usuario.',
    'soporte': 'Ofrecemos soporte técnico continuo para todos nuestros proyectos.',
    'dominio': 'Te ayudamos con la compra y configuración de dominios para tu proyecto.',
    'ssl': 'Todos nuestros sitios web incluyen certificados SSL para máxima seguridad.'
  };

  // Función para llamar a OpenAI API
  const callOpenAI = async (message) => {
    if (!API_CONFIG.openai.key) {
      throw new Error('API key no configurada');
    }

    const response = await fetch(API_CONFIG.openai.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_CONFIG.openai.key}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Eres un asistente virtual de Weblisy, una agencia de desarrollo web. Responde de manera amigable y profesional. Mantén las respuestas concisas y útiles.'
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 150,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error('Error en la API');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  };

  const getBotResponse = async (userMessage) => {
    // Simular respuesta del bot con delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const lowerMessage = userMessage.toLowerCase();
    
    // Si AI está habilitado y hay API key, usar OpenAI
    if (useAI && API_CONFIG.openai.key) {
      try {
        return await callOpenAI(userMessage);
      } catch (error) {
        console.error('Error con OpenAI:', error);
        // Fallback a respuestas predefinidas
      }
    }
    
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

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        text: "¡Hola! Soy el asistente virtual de Weblisy. ¿En qué puedo ayudarte hoy?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  };

  return (
    <>
      {/* Botón flotante del chatbot */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <button
          onClick={toggleChat}
          className="bg-black/20 backdrop-blur-md border border-white/20 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:bg-black/30"
          aria-label="Abrir chat"
        >
          <MessageCircle size={24} />
        </button>
      </motion.div>

      {/* Ventana del chatbot */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-50 w-96 max-h-[600px] bg-black/20 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header */}
            <div className="bg-black/40 backdrop-blur-md border-b border-white/20 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot size={16} />
                </div>
                <div>
                  <h3 className="font-semibold">Asistente Weblisy</h3>
                  <p className="text-xs opacity-90">
                    {useAI ? 'IA Activada' : 'Modo Básico'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                  aria-label="Configuración"
                >
                  <Settings size={16} />
                </button>
                <button
                  onClick={toggleMinimize}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                  aria-label="Minimizar"
                >
                  {isMinimized ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                <button
                  onClick={toggleChat}
                  className="p-1 hover:bg-white/20 rounded transition-colors"
                  aria-label="Cerrar chat"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

                         {/* Configuración */}
             {showSettings && (
               <motion.div
                 className="bg-black/30 backdrop-blur-md p-4 border-b border-white/20"
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
                 exit={{ opacity: 0, height: 0 }}
               >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Modo IA</span>
                                         <button
                       onClick={() => setUseAI(!useAI)}
                       className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                         useAI ? 'bg-white/30' : 'bg-black/30'
                       }`}
                     >
                       <span
                         className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                           useAI ? 'translate-x-6' : 'translate-x-1'
                         }`}
                       />
                     </button>
                  </div>
                  <div className="flex space-x-2">
                                         <button
                       onClick={clearChat}
                       className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors text-white"
                     >
                       Limpiar chat
                     </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Contenido del chat */}
            {!isMinimized && (
              <>
                {/* Mensajes */}
                <div className="h-96 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                                             <div
                         className={`max-w-[80%] p-3 rounded-2xl ${
                           message.sender === 'user'
                             ? 'bg-white/20 backdrop-blur-md border border-white/20 text-white'
                             : 'bg-black/40 backdrop-blur-md border border-white/20 text-white'
                         }`}
                       >
                        <p className="text-sm">{message.text}</p>
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
                                           <div className="bg-black/40 backdrop-blur-md border border-white/20 text-white p-3 rounded-2xl">
                       <div className="flex items-center space-x-2">
                         <Loader2 size={16} className="animate-spin" />
                         <span className="text-sm">
                           {useAI ? 'IA procesando...' : 'Escribiendo...'}
                         </span>
                       </div>
                     </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                                 {/* Input */}
                 <div className="p-4 border-t border-white/20">
                   <div className="flex space-x-2">
                     <input
                       ref={inputRef}
                       type="text"
                       value={inputValue}
                       onChange={(e) => setInputValue(e.target.value)}
                       onKeyPress={handleKeyPress}
                       placeholder="Escribe tu mensaje..."
                       className="flex-1 px-4 py-2 bg-black/20 backdrop-blur-md border border-white/20 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent text-white placeholder-white/60"
                       disabled={isLoading}
                     />
                     <button
                       onClick={handleSendMessage}
                       disabled={!inputValue.trim() || isLoading}
                       className="bg-white/20 backdrop-blur-md border border-white/20 hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed text-white p-2 rounded-full transition-all duration-200"
                     >
                       <Send size={16} />
                     </button>
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

export default ChatbotAdvanced; 