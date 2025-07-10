import React from 'react';
import { X, Download, ArrowLeft } from 'lucide-react';
import { templates } from './CVTemplates';

const TemplatePreview = ({ isOpen, templateKey, onClose, onSelect }) => {
  if (!isOpen || !templateKey) return null;

  const template = templates[templateKey];
  const TemplateComponent = template.component;

  // Datos de ejemplo para la previsualización
  const sampleData = {
    personalInfo: {
      name: 'Ana García López',
      title: 'Desarrolladora Full Stack Senior',
      email: 'ana.garcia@email.com',
      phone: '+34 612 345 678',
      location: 'Madrid, España',
      summary: 'Desarrolladora Full Stack con 5+ años de experiencia en tecnologías modernas como React, Node.js y Python. Especializada en aplicaciones web escalables y arquitecturas cloud. Apasionada por crear soluciones innovadoras y mentoría técnica.'
    },
    experience: [
      {
        title: 'Senior Full Stack Developer',
        company: 'TechCorp Solutions',
        startDate: '2022',
        endDate: 'Presente',
        description: 'Lidero el desarrollo de aplicaciones web empresariales utilizando React, Node.js y AWS. Gestiono un equipo de 4 desarrolladores y implemento mejores prácticas de desarrollo ágil.'
      },
      {
        title: 'Full Stack Developer',
        company: 'Digital Innovations',
        startDate: '2020',
        endDate: '2022',
        description: 'Desarrollé aplicaciones web completas usando React, Express.js y MongoDB. Colaboré en proyectos de e-commerce y sistemas de gestión interna.'
      },
      {
        title: 'Frontend Developer',
        company: 'WebStudio',
        startDate: '2019',
        endDate: '2020',
        description: 'Creé interfaces de usuario responsivas y accesibles usando HTML5, CSS3 y JavaScript. Trabajé en proyectos para clientes de diversos sectores.'
      }
    ],
    education: [
      {
        degree: 'Ingeniería Informática',
        institution: 'Universidad Politécnica de Madrid',
        startDate: '2015',
        endDate: '2019'
      },
      {
        degree: 'Máster en Desarrollo Web',
        institution: 'Escuela de Ingeniería Digital',
        startDate: '2019',
        endDate: '2020'
      }
    ],
    skills: [
      'React', 'Node.js', 'Python', 'JavaScript', 'TypeScript',
      'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Git',
      'REST APIs', 'GraphQL', 'Redux', 'Express.js', 'Django'
    ],
    languages: [
      { language: 'Español', level: 'Nativo' },
      { language: 'Inglés', level: 'Avanzado (C1)' },
      { language: 'Francés', level: 'Intermedio (B1)' }
    ],
    certifications: [
      {
        name: 'AWS Certified Developer',
        issuer: 'Amazon Web Services',
        date: '2023'
      },
      {
        name: 'React Developer Certification',
        issuer: 'Meta',
        date: '2022'
      },
      {
        name: 'Scrum Master Certified',
        issuer: 'Scrum Alliance',
        date: '2021'
      }
    ]
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '20px'
    }}>
      <div style={{
        background: '#171717',
        borderRadius: 16,
        maxWidth: '90vw',
        maxHeight: '90vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px',
          borderBottom: '1px solid #333',
          background: '#1a1a1a'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#b0b0b0',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '6px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#fff'}
              onMouseLeave={(e) => e.target.style.color = '#b0b0b0'}
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h3 style={{
                color: '#fff',
                fontSize: '1.25rem',
                fontWeight: '600',
                margin: 0
              }}>
                Vista Previa: {template.name}
              </h3>
              <p style={{
                color: '#b0b0b0',
                fontSize: '0.875rem',
                margin: '4px 0 0 0'
              }}>
                {template.description}
              </p>
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            gap: '12px'
          }}>
            <button
              onClick={() => onSelect(templateKey)}
              style={{
                background: 'linear-gradient(135deg, #5e17eb 0%, #4c14c7 100%)',
                border: 'none',
                color: '#fff',
                padding: '10px 20px',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'translateY(-1px)'}
              onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <Download size={16} />
              Usar esta plantilla
            </button>
            
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: '1px solid #444',
                color: '#b0b0b0',
                padding: '10px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                e.target.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#b0b0b0';
              }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Preview Content */}
        <div style={{
          flex: 1,
          overflow: 'auto',
          padding: '20px',
          background: '#f5f5f5'
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden'
          }}>
            <TemplateComponent data={sampleData} />
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: '20px 24px',
          background: '#1a1a1a',
          borderTop: '1px solid #333'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            color: '#b0b0b0',
            fontSize: '0.875rem'
          }}>
            <div>
              <strong style={{ color: '#fff' }}>Características:</strong>
              <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                <li>Diseño responsive</li>
                <li>Optimizado para PDF</li>
                <li>Tipografía profesional</li>
              </ul>
            </div>
            <div>
              <strong style={{ color: '#fff' }}>Secciones incluidas:</strong>
              <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                <li>Información personal</li>
                <li>Experiencia laboral</li>
                <li>Educación</li>
                <li>Habilidades e idiomas</li>
              </ul>
            </div>
            <div>
              <strong style={{ color: '#fff' }}>Compatible con:</strong>
              <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px' }}>
                <li>Navegadores modernos</li>
                <li>Impresión profesional</li>
                <li>Exportación a PDF</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview; 