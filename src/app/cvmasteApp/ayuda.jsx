import React, { useState } from 'react';
import { 
  Search, 
  HelpCircle, 
  FileText, 
  Video, 
  MessageCircle, 
  Mail, 
  Phone, 
  ChevronDown, 
  ChevronRight,
  Book,
  Zap,
  Shield,
  Download,
  Settings,
  Users
} from 'lucide-react';
import CvmasteAppLayout from './layout';

export default function Ayuda() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('todos');
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      id: 1,
      category: 'general',
      question: '¿Cómo puedo crear mi primer CV?',
      answer: 'Para crear tu primer CV, ve a la sección "Crear CV" desde el menú principal. Completa la información personal, experiencia laboral, educación y habilidades. Luego podrás elegir una plantilla y descargar tu CV en formato PDF.'
    },
    {
      id: 2,
      category: 'general',
      question: '¿Cuántos CVs puedo crear?',
      answer: 'Con el plan gratuito puedes crear hasta 10 CVs. Si necesitas crear más, puedes actualizar a un plan premium que te permite crear CVs ilimitados.'
    },
    {
      id: 3,
      category: 'plantillas',
      question: '¿Puedo personalizar las plantillas?',
      answer: 'Sí, todas nuestras plantillas son completamente personalizables. Puedes cambiar colores, fuentes, layout y agregar o quitar secciones según tus necesidades.'
    },
    {
      id: 4,
      category: 'plantillas',
      question: '¿Qué plantillas están disponibles?',
      answer: 'Ofrecemos más de 20 plantillas profesionales divididas en categorías: Modernas, Clásicas, Creativas, Técnicas y Ejecutivas. Cada plantilla está optimizada para diferentes industrias.'
    },
    {
      id: 5,
      category: 'exportar',
      question: '¿En qué formatos puedo descargar mi CV?',
      answer: 'Actualmente puedes descargar tu CV en formato PDF de alta calidad. Próximamente añadiremos soporte para Word (.docx) y otros formatos.'
    },
    {
      id: 6,
      category: 'exportar',
      question: '¿Puedo compartir mi CV online?',
      answer: 'Sí, puedes generar un enlace único para compartir tu CV online. También puedes controlar la privacidad y decidir quién puede ver tu CV.'
    },
    {
      id: 7,
      category: 'ia',
      question: '¿Cómo funciona la asistencia con IA?',
      answer: 'Nuestra IA analiza tu información y te sugiere mejoras en el contenido, estructura y formato. También puede generar descripciones profesionales para tus experiencias laborales.'
    },
    {
      id: 8,
      category: 'ia',
      question: '¿Es segura la IA con mis datos?',
      answer: 'Absolutamente. Tu información personal nunca se almacena en los servidores de IA. Solo se procesan temporalmente para generar sugerencias y luego se eliminan.'
    },
    {
      id: 9,
      category: 'cuenta',
      question: '¿Cómo puedo cambiar mi contraseña?',
      answer: 'Ve a Configuración > Privacidad y encontrarás la opción "Cambiar Contraseña". Necesitarás tu contraseña actual para establecer una nueva.'
    },
    {
      id: 10,
      category: 'cuenta',
      question: '¿Puedo eliminar mi cuenta?',
      answer: 'Sí, puedes eliminar tu cuenta desde Configuración > Cuenta > Zona de Peligro. Ten en cuenta que esta acción es irreversible y eliminará todos tus datos.'
    }
  ];

  const categories = [
    { id: 'todos', label: 'Todos', icon: <HelpCircle size={20} /> },
    { id: 'general', label: 'General', icon: <FileText size={20} /> },
    { id: 'plantillas', label: 'Plantillas', icon: <Settings size={20} /> },
    { id: 'exportar', label: 'Exportar', icon: <Download size={20} /> },
    { id: 'ia', label: 'IA', icon: <Zap size={20} /> },
    { id: 'cuenta', label: 'Cuenta', icon: <Users size={20} /> }
  ];

  const resources = [
    {
      title: 'Guía de Inicio Rápido',
      description: 'Aprende a crear tu primer CV en 5 minutos',
      icon: <Book size={24} />,
      type: 'Guía',
      color: '#5e17eb'
    },
    {
      title: 'Video Tutoriales',
      description: 'Tutoriales paso a paso para todas las funciones',
      icon: <Video size={24} />,
      type: 'Video',
      color: '#2e7d32'
    },
    {
      title: 'Mejores Prácticas',
      description: 'Consejos para crear CVs que destacuen',
      icon: <Shield size={24} />,
      type: 'Artículo',
      color: '#ed6c02'
    },
    {
      title: 'Plantillas Recomendadas',
      description: 'Qué plantilla usar según tu industria',
      icon: <FileText size={24} />,
      type: 'Guía',
      color: '#9c27b0'
    }
  ];

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'todos' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    background: '#2a2a2a',
    border: '1px solid #444',
    borderRadius: 8,
    color: '#fff',
    fontSize: 14
  };

  const buttonStyle = {
    padding: '12px 24px',
    borderRadius: 8,
    border: 'none',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    transition: 'all 0.3s ease'
  };

  return (
    <CvmasteAppLayout>
      <div style={{ width: '100%' }}>
        {/* Header */}
        <div style={{ marginBottom: 32, textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 700, color: '#fff', marginBottom: 8 }}>
            Centro de Ayuda
          </h1>
          <p style={{ color: '#b0b0b0', fontSize: 'clamp(14px, 2vw, 16px)' }}>
            Encuentra respuestas a tus preguntas y aprende a usar CV Master
          </p>
        </div>

        {/* Search */}
        <div style={{ 
          background: '#171717', 
          borderRadius: 12, 
          padding: 24, 
          border: '1px solid #333',
          marginBottom: 24
        }}>
          <div style={{ position: 'relative', maxWidth: 600, margin: '0 auto' }}>
            <Search size={20} style={{ 
              position: 'absolute', 
              left: 16, 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: '#b0b0b0' 
            }} />
            <input
              type="text"
              style={{ ...inputStyle, paddingLeft: 48, fontSize: 16 }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar en la ayuda..."
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ 
          background: '#171717', 
          borderRadius: 12, 
          padding: 24, 
          border: '1px solid #333',
          marginBottom: 24
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#fff', marginBottom: 20, textAlign: 'center' }}>
            ¿Necesitas ayuda inmediata?
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: 16 
          }}>
            <button style={{ 
              ...buttonStyle, 
              background: '#5e17eb', 
              color: '#fff',
              justifyContent: 'center'
            }}>
              <MessageCircle size={20} />
              Chat en Vivo
            </button>
            <button style={{ 
              ...buttonStyle, 
              background: '#2e7d32', 
              color: '#fff',
              justifyContent: 'center'
            }}>
              <Mail size={20} />
              Enviar Email
            </button>
            <button style={{ 
              ...buttonStyle, 
              background: '#ed6c02', 
              color: '#fff',
              justifyContent: 'center'
            }}>
              <Phone size={20} />
              Llamar Soporte
            </button>
          </div>
        </div>

        {/* Resources */}
        <div style={{ 
          background: '#171717', 
          borderRadius: 12, 
          padding: 24, 
          border: '1px solid #333',
          marginBottom: 24
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#fff', marginBottom: 20 }}>
            Recursos Útiles
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: 16 
          }}>
            {resources.map((resource, index) => (
              <div key={index} style={{ 
                background: '#2a2a2a', 
                borderRadius: 8, 
                padding: 20, 
                border: '1px solid #444',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{ color: resource.color }}>
                    {resource.icon}
                  </div>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>
                      {resource.title}
                    </div>
                    <div style={{ 
                      color: resource.color, 
                      fontSize: 12, 
                      fontWeight: 500,
                      marginTop: 2
                    }}>
                      {resource.type}
                    </div>
                  </div>
                </div>
                <p style={{ color: '#b0b0b0', fontSize: 14, margin: 0 }}>
                  {resource.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Categories */}
        <div style={{ 
          background: '#171717', 
          borderRadius: 12, 
          padding: 4, 
          border: '1px solid #333',
          marginBottom: 24
        }}>
          <div style={{ 
            display: 'flex', 
            gap: 4,
            overflowX: 'auto',
            paddingBottom: 4
          }}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                style={{
                  background: activeCategory === category.id ? '#5e17eb' : 'transparent',
                  color: activeCategory === category.id ? '#fff' : '#b0b0b0',
                  border: 'none',
                  padding: '12px 16px',
                  borderRadius: 8,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: 14,
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                {category.icon}
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div style={{ 
          background: '#171717', 
          borderRadius: 12, 
          padding: 24, 
          border: '1px solid #333'
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#fff', marginBottom: 20 }}>
            Preguntas Frecuentes
          </h2>
          {filteredFaqs.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {filteredFaqs.map((faq) => (
                <div key={faq.id} style={{ 
                  background: '#2a2a2a', 
                  borderRadius: 8, 
                  border: '1px solid #444',
                  overflow: 'hidden'
                }}>
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      padding: 20,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      color: '#fff',
                      fontSize: 16,
                      fontWeight: 500,
                      textAlign: 'left'
                    }}
                  >
                    <span>{faq.question}</span>
                    {expandedFaq === faq.id ? 
                      <ChevronDown size={20} color="#5e17eb" /> : 
                      <ChevronRight size={20} color="#b0b0b0" />
                    }
                  </button>
                  {expandedFaq === faq.id && (
                    <div style={{ 
                      padding: '0 20px 20px 20px',
                      color: '#b0b0b0',
                      fontSize: 14,
                      lineHeight: 1.6
                    }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: 40 }}>
              <HelpCircle size={48} color="#444" style={{ marginBottom: 16 }} />
              <h3 style={{ color: '#fff', fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
                No se encontraron resultados
              </h3>
              <p style={{ color: '#b0b0b0', fontSize: 14 }}>
                Intenta con otros términos de búsqueda o selecciona una categoría diferente
              </p>
            </div>
          )}
        </div>

        {/* Contact Footer */}
        <div style={{ 
          background: '#171717', 
          borderRadius: 12, 
          padding: 24, 
          border: '1px solid #333',
          marginTop: 24,
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: '#fff', marginBottom: 8 }}>
            ¿No encontraste lo que buscabas?
          </h3>
          <p style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 20 }}>
            Nuestro equipo de soporte está aquí para ayudarte
          </p>
          <div style={{ 
            display: 'flex', 
            gap: 12, 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button style={{ 
              ...buttonStyle, 
              background: '#5e17eb', 
              color: '#fff' 
            }}>
              <MessageCircle size={20} />
              Contactar Soporte
            </button>
            <button style={{ 
              ...buttonStyle, 
              background: '#2a2a2a', 
              color: '#fff',
              border: '1px solid #444'
            }}>
              <Mail size={20} />
              Enviar Feedback
            </button>
          </div>
        </div>
      </div>
    </CvmasteAppLayout>
  );
} 
