import React from 'react';
import { Check, Eye } from 'lucide-react';
import { templates } from './CVTemplates';

const TemplateSelector = ({ selectedTemplate, onTemplateSelect, onPreview }) => {
  return (
    <div style={{
      background: '#171717',
      borderRadius: 12,
      padding: 24,
      border: '1px solid #333'
    }}>
      <h3 style={{
        color: '#fff',
        fontSize: '1.25rem',
        fontWeight: 600,
        marginBottom: 20,
        textAlign: 'center'
      }}>
        Selecciona una Plantilla
      </h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 20
      }}>
        {Object.entries(templates).map(([key, template]) => (
          <div
            key={key}
            style={{
              background: selectedTemplate === key ? 'rgba(94, 23, 235, 0.1)' : '#2a2a2a',
              border: selectedTemplate === key ? '2px solid #5e17eb' : '1px solid #444',
              borderRadius: 12,
              padding: 20,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
            onClick={() => onTemplateSelect(key)}
            onMouseEnter={(e) => {
              if (selectedTemplate !== key) {
                e.target.style.background = 'rgba(94, 23, 235, 0.05)';
                e.target.style.borderColor = '#5e17eb';
              }
            }}
            onMouseLeave={(e) => {
              if (selectedTemplate !== key) {
                e.target.style.background = '#2a2a2a';
                e.target.style.borderColor = '#444';
              }
            }}
          >
            {/* Preview */}
            <div style={{
              background: '#fff',
              height: 200,
              borderRadius: 8,
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '30%',
                background: key === 'modern' ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' :
                           key === 'classic' ? '#2c3e50' :
                           'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }} />
              <div style={{
                position: 'absolute',
                top: '15%',
                left: '20px',
                right: '20px',
                height: '2px',
                background: '#e5e7eb'
              }} />
              <div style={{
                position: 'absolute',
                top: '25%',
                left: '20px',
                width: '60%',
                height: '8px',
                background: '#374151',
                borderRadius: '4px'
              }} />
              <div style={{
                position: 'absolute',
                top: '40%',
                left: '20px',
                width: '40%',
                height: '6px',
                background: '#6b7280',
                borderRadius: '3px'
              }} />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '20px',
                width: '80%',
                height: '4px',
                background: '#d1d5db',
                borderRadius: '2px'
              }} />
              <div style={{
                position: 'absolute',
                top: '60%',
                left: '20px',
                width: '70%',
                height: '4px',
                background: '#d1d5db',
                borderRadius: '2px'
              }} />
              <div style={{
                position: 'absolute',
                top: '70%',
                left: '20px',
                width: '50%',
                height: '4px',
                background: '#d1d5db',
                borderRadius: '2px'
              }} />
            </div>

            {/* Template Info */}
            <div>
              <h4 style={{
                color: '#fff',
                fontSize: '1.1rem',
                fontWeight: 600,
                marginBottom: 8
              }}>
                {template.name}
              </h4>
              <p style={{
                color: '#b0b0b0',
                fontSize: '0.9rem',
                marginBottom: 16,
                lineHeight: 1.4
              }}>
                {template.description}
              </p>

              {/* Actions */}
              <div style={{
                display: 'flex',
                gap: 12
              }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPreview(key);
                  }}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    background: 'transparent',
                    border: '1px solid #444',
                    color: '#fff',
                    borderRadius: 6,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.borderColor = '#666';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.borderColor = '#444';
                  }}
                >
                  <Eye size={14} />
                  Vista previa
                </button>

                {selectedTemplate === key && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    color: '#5e17eb',
                    fontSize: '0.875rem',
                    fontWeight: 600
                  }}>
                    <Check size={16} />
                    Seleccionado
                  </div>
                )}
              </div>
            </div>

            {/* Selection Indicator */}
            {selectedTemplate === key && (
              <div style={{
                position: 'absolute',
                top: 12,
                right: 12,
                width: 24,
                height: 24,
                background: '#5e17eb',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Check size={16} color="#fff" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Template Features */}
      <div style={{
        marginTop: 24,
        padding: 20,
        background: '#2a2a2a',
        borderRadius: 8,
        border: '1px solid #444'
      }}>
        <h4 style={{
          color: '#fff',
          fontSize: '1rem',
          fontWeight: 600,
          marginBottom: 12
        }}>
          Características de las Plantillas
        </h4>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 12
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: '#b0b0b0',
            fontSize: '0.875rem'
          }}>
            <div style={{
              width: 6,
              height: 6,
              background: '#5e17eb',
              borderRadius: '50%'
            }} />
            Diseño responsive
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: '#b0b0b0',
            fontSize: '0.875rem'
          }}>
            <div style={{
              width: 6,
              height: 6,
              background: '#5e17eb',
              borderRadius: '50%'
            }} />
            Optimizado para PDF
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: '#b0b0b0',
            fontSize: '0.875rem'
          }}>
            <div style={{
              width: 6,
              height: 6,
              background: '#5e17eb',
              borderRadius: '50%'
            }} />
            Tipografía profesional
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: '#b0b0b0',
            fontSize: '0.875rem'
          }}>
            <div style={{
              width: 6,
              height: 6,
              background: '#5e17eb',
              borderRadius: '50%'
            }} />
            Colores modernos
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector; 