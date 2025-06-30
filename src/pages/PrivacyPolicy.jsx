import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PrivacyPolicy = () => {
  const [activeTab, setActiveTab] = useState("privacy");

  const tabs = [
    { id: "privacy", label: "Política de Privacidad", icon: "🔒" },
    { id: "terms", label: "Términos de Servicio", icon: "📋" },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Política de Privacidad y Términos
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Protegemos tu privacidad y establecemos las condiciones claras para el uso de nuestros servicios
            </p>
          </motion.div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-lg shadow-lg p-1"
        >
          <div className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 rounded-md font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-green-600 text-white shadow-md"
                    : "text-gray-600 hover:text-green-600 hover:bg-green-50"
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white rounded-xl shadow-lg p-8 md:p-12"
          >
            {activeTab === "privacy" && (
              <div className="space-y-8">
                <motion.div variants={itemVariants}>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="mr-3">🔒</span>
                    Política de Privacidad
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    En <strong>Weblisy</strong>, valoramos y respetamos tu privacidad. Esta política describe cómo recopilamos, 
                    utilizamos, almacenamos y protegemos tu información personal cuando utilizas nuestros servicios.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">1. Información que Recopilamos</h3>
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-700 mb-2">Información Personal</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                        <li>Nombre completo y apellidos</li>
                        <li>Dirección de correo electrónico</li>
                        <li>Número de teléfono</li>
                        <li>Información de la empresa (cuando aplique)</li>
                        <li>Dirección física (para facturación)</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-700 mb-2">Información Técnica</h4>
                      <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                        <li>Dirección IP y datos de ubicación</li>
                        <li>Información del navegador y dispositivo</li>
                        <li>Cookies y tecnologías de seguimiento</li>
                        <li>Datos de uso y navegación</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">2. Cómo Utilizamos tu Información</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 rounded-lg p-6">
                      <h4 className="font-semibold text-green-800 mb-3">Servicios y Comunicación</h4>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Proporcionar y mantener nuestros servicios</li>
                        <li>• Responder a consultas y solicitudes</li>
                        <li>• Enviar actualizaciones importantes</li>
                        <li>• Gestionar tu cuenta y proyectos</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h4 className="font-semibold text-blue-800 mb-3">Mejora y Análisis</h4>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Mejorar la experiencia del usuario</li>
                        <li>• Analizar el uso de nuestros servicios</li>
                        <li>• Desarrollar nuevas funcionalidades</li>
                        <li>• Prevenir fraudes y abusos</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">3. Protección de Datos</h3>
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                      <div>
                        <div className="text-3xl mb-2">🔐</div>
                        <h4 className="font-semibold text-gray-900 mb-2">Encriptación SSL</h4>
                        <p className="text-gray-600 text-sm">Todos los datos se transmiten de forma segura</p>
                      </div>
                      <div>
                        <div className="text-3xl mb-2">🛡️</div>
                        <h4 className="font-semibold text-gray-900 mb-2">Acceso Restringido</h4>
                        <p className="text-gray-600 text-sm">Solo personal autorizado accede a tu información</p>
                      </div>
                      <div>
                        <div className="text-3xl mb-2">📊</div>
                        <h4 className="font-semibold text-gray-900 mb-2">Monitoreo Continuo</h4>
                        <p className="text-gray-600 text-sm">Sistemas de seguridad 24/7</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">4. Cookies y Tecnologías de Seguimiento</h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-gray-700 mb-4">
                      Utilizamos cookies y tecnologías similares para mejorar tu experiencia, analizar el tráfico 
                      y personalizar el contenido.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Cookies Esenciales</h4>
                        <p className="text-gray-600 text-sm">Necesarias para el funcionamiento básico del sitio</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Cookies Analíticas</h4>
                        <p className="text-gray-600 text-sm">Nos ayudan a entender cómo usas nuestro sitio</p>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                      <p className="text-yellow-800 text-sm">
                        <strong>Nota:</strong> Puedes configurar tu navegador para rechazar cookies, 
                        aunque esto puede afectar la funcionalidad del sitio.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">5. Tus Derechos</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="text-green-600 text-xl">✓</div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Acceso</h4>
                          <p className="text-gray-600 text-sm">Solicitar copia de tus datos personales</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="text-green-600 text-xl">✓</div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Rectificación</h4>
                          <p className="text-gray-600 text-sm">Corregir datos inexactos o incompletos</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="text-green-600 text-xl">✓</div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Cancelación</h4>
                          <p className="text-gray-600 text-sm">Eliminar tus datos personales</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="text-green-600 text-xl">✓</div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Oposición</h4>
                          <p className="text-gray-600 text-sm">Oponerte al procesamiento de datos</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">6. Compartir Información</h3>
                  <div className="bg-red-50 rounded-lg p-6">
                    <p className="text-gray-700 mb-4">
                      <strong>No vendemos, alquilamos ni compartimos tu información personal</strong> con terceros, 
                      excepto en las siguientes circunstancias:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      <li>Con tu consentimiento explícito</li>
                      <li>Para cumplir con obligaciones legales</li>
                      <li>Con proveedores de servicios que nos ayudan a operar (bajo estrictos acuerdos de confidencialidad)</li>
                      <li>Para proteger nuestros derechos y seguridad</li>
                    </ul>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">7. Retención de Datos</h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-gray-700 mb-4">
                      Conservamos tu información personal solo durante el tiempo necesario para cumplir con los 
                      propósitos descritos en esta política, a menos que la ley requiera un período de retención más largo.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4 text-center">
                      <div className="bg-white rounded-lg p-4">
                        <div className="text-2xl font-bold text-green-600">3 años</div>
                        <p className="text-gray-600 text-sm">Datos de cuenta activa</p>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <div className="text-2xl font-bold text-blue-600">7 años</div>
                        <p className="text-gray-600 text-sm">Información fiscal</p>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <div className="text-2xl font-bold text-orange-600">1 año</div>
                        <p className="text-gray-600 text-sm">Datos de navegación</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">8. Cambios en la Política</h3>
                  <div className="bg-yellow-50 rounded-lg p-6">
                    <p className="text-gray-700 mb-4">
                      Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. 
                      Los cambios significativos serán notificados a través de:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      <li>Notificación por correo electrónico</li>
                      <li>Aviso prominente en nuestro sitio web</li>
                      <li>Actualización de la fecha de "Última modificación"</li>
                    </ul>
                    <div className="mt-4 p-4 bg-white rounded-lg">
                      <p className="text-gray-600 text-sm">
                        <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">9. Contacto</h3>
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                    <p className="text-gray-700 mb-4">
                      Si tienes preguntas sobre esta política de privacidad o quieres ejercer tus derechos, 
                      contáctanos a través de:
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">📧 Correo Electrónico</h4>
                        <p className="text-green-600">contacto@weblisy.es</p>
                        <p className="text-gray-600 text-sm">Respuesta en 24-48 horas</p>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">📞 Teléfono</h4>
                        <p className="text-green-600">656 646 601</p>
                        <p className="text-gray-600 text-sm">Lunes a Viernes 9:00-18:00</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {activeTab === "terms" && (
              <div className="space-y-8">
                <motion.div variants={itemVariants}>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="mr-3">📋</span>
                    Términos de Servicio
                  </h2>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Estos términos establecen las condiciones bajo las cuales <strong>Weblisy</strong> proporciona 
                    sus servicios de desarrollo web y consultoría digital. Al utilizar nuestros servicios, 
                    aceptas estos términos en su totalidad.
                  </p>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">1. Definiciones</h3>
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <div>
                      <h4 className="font-semibold text-green-700 mb-2">Servicios</h4>
                      <p className="text-gray-700">Incluye desarrollo web, diseño, consultoría, mantenimiento y cualquier servicio relacionado ofrecido por Weblisy.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-700 mb-2">Cliente</h4>
                      <p className="text-gray-700">La persona o entidad que contrata nuestros servicios.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-green-700 mb-2">Proyecto</h4>
                      <p className="text-gray-700">El trabajo específico acordado entre Weblisy y el cliente.</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">2. Servicios Ofrecidos</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-green-50 rounded-lg p-6">
                      <h4 className="font-semibold text-green-800 mb-3">Desarrollo Web</h4>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Sitios web corporativos</li>
                        <li>• Aplicaciones web personalizadas</li>
                        <li>• E-commerce y tiendas online</li>
                        <li>• Sistemas de gestión</li>
                      </ul>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-6">
                      <h4 className="font-semibold text-blue-800 mb-3">Consultoría Digital</h4>
                      <ul className="text-gray-700 space-y-2">
                        <li>• Estrategia digital</li>
                        <li>• Optimización SEO</li>
                        <li>• Marketing digital</li>
                        <li>• Análisis de datos</li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">3. Proceso de Trabajo</h3>
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                    <div className="grid md:grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-3xl mb-2">📋</div>
                        <h4 className="font-semibold text-gray-900 mb-2">1. Consulta</h4>
                        <p className="text-gray-600 text-sm">Análisis de necesidades y presupuesto</p>
                      </div>
                      <div>
                        <div className="text-3xl mb-2">✏️</div>
                        <h4 className="font-semibold text-gray-900 mb-2">2. Diseño</h4>
                        <p className="text-gray-600 text-sm">Creación de mockups y prototipos</p>
                      </div>
                      <div>
                        <div className="text-3xl mb-2">💻</div>
                        <h4 className="font-semibold text-gray-900 mb-2">3. Desarrollo</h4>
                        <p className="text-gray-600 text-sm">Programación y implementación</p>
                      </div>
                      <div>
                        <div className="text-3xl mb-2">🚀</div>
                        <h4 className="font-semibold text-gray-900 mb-2">4. Entrega</h4>
                        <p className="text-gray-600 text-sm">Lanzamiento y soporte post-venta</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">4. Obligaciones del Cliente</h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="text-green-600 text-xl">✓</div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Proporcionar Información</h4>
                          <p className="text-gray-600 text-sm">Suministrar toda la información necesaria para el proyecto</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="text-green-600 text-xl">✓</div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Pagos Oportunos</h4>
                          <p className="text-gray-600 text-sm">Realizar los pagos según el cronograma acordado</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="text-green-600 text-xl">✓</div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Feedback Constructivo</h4>
                          <p className="text-gray-600 text-sm">Proporcionar retroalimentación clara y oportuna</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="text-green-600 text-xl">✓</div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Respetar Plazos</h4>
                          <p className="text-gray-600 text-sm">Cumplir con las revisiones y aprobaciones en tiempo</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">5. Obligaciones de Weblisy</h3>
                  <div className="bg-blue-50 rounded-lg p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="text-blue-600 text-xl">✓</div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Calidad Profesional</h4>
                            <p className="text-gray-600 text-sm">Entregar trabajo de alta calidad y estándares profesionales</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="text-blue-600 text-xl">✓</div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Cumplimiento de Plazos</h4>
                            <p className="text-gray-600 text-sm">Respetar los cronogramas acordados</p>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="text-blue-600 text-xl">✓</div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Comunicación Clara</h4>
                            <p className="text-gray-600 text-sm">Mantener comunicación regular y transparente</p>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="text-blue-600 text-xl">✓</div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Soporte Post-Venta</h4>
                            <p className="text-gray-600 text-sm">Proporcionar soporte técnico después de la entrega</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">6. Pagos y Facturación</h3>
                  <div className="bg-green-50 rounded-lg p-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">50%</div>
                        <p className="text-gray-600 text-sm">Anticipo al iniciar</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">40%</div>
                        <p className="text-gray-600 text-sm">Al 50% del progreso</p>
                      </div>
                      <div className="bg-white rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-orange-600">10%</div>
                        <p className="text-gray-600 text-sm">Al finalizar</p>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-semibold text-yellow-800 mb-2">Métodos de Pago Aceptados</h4>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-white rounded-full text-sm">Transferencia bancaria</span>
                        <span className="px-3 py-1 bg-white rounded-full text-sm">PayPal</span>
                        <span className="px-3 py-1 bg-white rounded-full text-sm">Tarjeta de crédito</span>
                        <span className="px-3 py-1 bg-white rounded-full text-sm">Stripe</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">7. Propiedad Intelectual</h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-green-700 mb-2">Derechos del Cliente</h4>
                        <p className="text-gray-700">Una vez pagado el proyecto completo, el cliente adquiere los derechos de uso del código y diseño desarrollado.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-700 mb-2">Derechos de Weblisy</h4>
                        <p className="text-gray-700">Nos reservamos el derecho de mostrar el proyecto en nuestro portafolio y usar el código como referencia para futuros proyectos.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-orange-700 mb-2">Terceros</h4>
                        <p className="text-gray-700">El cliente es responsable de obtener los derechos de uso de cualquier contenido de terceros (imágenes, fuentes, etc.) incluido en el proyecto.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">8. Confidencialidad</h3>
                  <div className="bg-purple-50 rounded-lg p-6">
                    <p className="text-gray-700 mb-4">
                      Ambas partes se comprometen a mantener la confidencialidad de toda la información 
                      compartida durante el desarrollo del proyecto.
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Información Protegida</h4>
                        <ul className="text-gray-600 text-sm space-y-1">
                          <li>• Datos comerciales</li>
                          <li>• Estrategias de negocio</li>
                          <li>• Información técnica</li>
                          <li>• Datos de clientes</li>
                        </ul>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Duración</h4>
                        <p className="text-gray-600 text-sm">La obligación de confidencialidad permanece vigente durante 5 años después de la finalización del proyecto.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitación de Responsabilidad</h3>
                  <div className="bg-red-50 rounded-lg p-6">
                    <p className="text-gray-700 mb-4">
                      Weblisy no será responsable por:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                      <li>Daños indirectos o consecuenciales</li>
                      <li>Pérdida de beneficios o ingresos</li>
                      <li>Interrupciones del servicio por causas ajenas a nuestro control</li>
                      <li>Problemas derivados del uso incorrecto del software desarrollado</li>
                    </ul>
                    <div className="mt-4 p-4 bg-white rounded-lg">
                      <p className="text-gray-600 text-sm">
                        <strong>Nota:</strong> La responsabilidad total de Weblisy está limitada al monto total 
                        pagado por el cliente por el proyecto específico.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">10. Terminación del Contrato</h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-red-700 mb-3">Terminación por el Cliente</h4>
                        <ul className="text-gray-700 space-y-2">
                          <li>• Incumplimiento grave de Weblisy</li>
                          <li>• Retrasos injustificados</li>
                          <li>• Calidad inaceptable del trabajo</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-red-700 mb-3">Terminación por Weblisy</h4>
                        <ul className="text-gray-700 space-y-2">
                          <li>• Impago de facturas</li>
                          <li>• Incumplimiento de obligaciones</li>
                          <li>• Comportamiento abusivo</li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                      <p className="text-yellow-800 text-sm">
                        <strong>Proceso de Terminación:</strong> Cualquier terminación debe notificarse por escrito 
                        con 30 días de anticipación, excepto en casos de incumplimiento grave.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">11. Ley Aplicable y Jurisdicción</h3>
                  <div className="bg-blue-50 rounded-lg p-6">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-2">Ley Aplicable</h4>
                        <p className="text-gray-700">Estos términos se rigen por las leyes de España y la Unión Europea.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-2">Jurisdicción</h4>
                        <p className="text-gray-700">Cualquier disputa será resuelta en los tribunales de la ciudad donde Weblisy tiene su sede principal.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-800 mb-2">Resolución de Disputas</h4>
                        <p className="text-gray-700">Antes de acudir a los tribunales, las partes se comprometen a intentar resolver las disputas mediante mediación.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">12. Modificaciones</h3>
                  <div className="bg-yellow-50 rounded-lg p-6">
                    <p className="text-gray-700 mb-4">
                      Weblisy se reserva el derecho de modificar estos términos en cualquier momento. 
                      Los cambios serán notificados a los clientes activos con 30 días de anticipación.
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Notificación</h4>
                        <p className="text-gray-600 text-sm">Los cambios se comunicarán por correo electrónico y se publicarán en nuestro sitio web.</p>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Aceptación</h4>
                        <p className="text-gray-600 text-sm">El uso continuado de nuestros servicios después de los cambios implica la aceptación de los nuevos términos.</p>
                      </div>
                    </div>
                    <div className="mt-4 p-4 bg-white rounded-lg">
                      <p className="text-gray-600 text-sm">
                        <strong>Última actualización:</strong> {new Date().toLocaleDateString('es-ES', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">13. Contacto</h3>
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                    <p className="text-gray-700 mb-4">
                      Para cualquier consulta sobre estos términos de servicio, contáctanos:
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">📧 Correo Electrónico</h4>
                        <p className="text-green-600">contacto@weblisy.es</p>
                        <p className="text-gray-600 text-sm">Consultas legales y términos</p>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">📞 Teléfono</h4>
                        <p className="text-green-600">656 646 601</p>
                        <p className="text-gray-600 text-sm">Horario de atención legal</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
