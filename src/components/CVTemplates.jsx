import React from 'react';

// Plantilla Moderna - Minimalista
export const ModernTemplate = ({ data }) => {
  const {
    personalInfo = {},
    experience = [],
    education = [],
    skills = [],
    languages = [],
    certifications = []
  } = data;

  return (
    <div style={{
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      background: '#ffffff',
      color: '#1f2937',
      lineHeight: 1.6
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '40px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          margin: '0 0 8px 0',
          letterSpacing: '-0.025em'
        }}>
          {personalInfo.name || 'Tu Nombre'}
        </h1>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: '400',
          margin: '0 0 16px 0',
          opacity: 0.9
        }}>
          {personalInfo.title || 'Tu Título Profesional'}
        </h2>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          flexWrap: 'wrap'
        }}>
          {personalInfo.email && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📧</span>
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📱</span>
              <span>{personalInfo.phone}</span>
            </div>
          )}
          {personalInfo.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📍</span>
              <span>{personalInfo.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '40px' }}>
        {/* Summary */}
        {personalInfo.summary && (
          <section style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              margin: '0 0 16px 0',
              color: '#374151',
              borderBottom: '2px solid #e5e7eb',
              paddingBottom: '8px'
            }}>
              Resumen Profesional
            </h3>
            <p style={{ margin: 0, fontSize: '1rem', color: '#6b7280' }}>
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              margin: '0 0 16px 0',
              color: '#374151',
              borderBottom: '2px solid #e5e7eb',
              paddingBottom: '8px'
            }}>
              Experiencia Profesional
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {experience.map((exp, index) => (
                <div key={index} style={{
                  borderLeft: '4px solid #667eea',
                  paddingLeft: '20px',
                  position: 'relative'
                }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '8px'
                  }}>
                    <h4 style={{
                      fontSize: '1.125rem',
                      fontWeight: '600',
                      margin: 0,
                      color: '#1f2937'
                    }}>
                      {exp.title}
                    </h4>
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#6b7280',
                      fontWeight: '500'
                    }}>
                      {exp.startDate} - {exp.endDate || 'Presente'}
                    </span>
                  </div>
                  <h5 style={{
                    fontSize: '1rem',
                    fontWeight: '500',
                    margin: '0 0 8px 0',
                    color: '#374151'
                  }}>
                    {exp.company}
                  </h5>
                  <p style={{
                    margin: 0,
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    lineHeight: 1.5
                  }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              margin: '0 0 16px 0',
              color: '#374151',
              borderBottom: '2px solid #e5e7eb',
              paddingBottom: '8px'
            }}>
              Educación
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {education.map((edu, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}>
                  <div>
                    <h4 style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      margin: '0 0 4px 0',
                      color: '#1f2937'
                    }}>
                      {edu.degree}
                    </h4>
                    <p style={{
                      margin: 0,
                      fontSize: '0.875rem',
                      color: '#6b7280'
                    }}>
                      {edu.institution}
                    </p>
                  </div>
                  <span style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    fontWeight: '500'
                  }}>
                    {edu.startDate} - {edu.endDate || 'Presente'}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              margin: '0 0 16px 0',
              color: '#374151',
              borderBottom: '2px solid #e5e7eb',
              paddingBottom: '8px'
            }}>
              Habilidades
            </h3>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              {skills.map((skill, index) => (
                <span key={index} style={{
                  background: '#f3f4f6',
                  color: '#374151',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '0.875rem',
                  fontWeight: '500'
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <section style={{ marginBottom: '32px' }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              margin: '0 0 16px 0',
              color: '#374151',
              borderBottom: '2px solid #e5e7eb',
              paddingBottom: '8px'
            }}>
              Idiomas
            </h3>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              {languages.map((lang, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#1f2937'
                  }}>
                    {lang.language}
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    color: '#6b7280'
                  }}>
                    ({lang.level})
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              margin: '0 0 16px 0',
              color: '#374151',
              borderBottom: '2px solid #e5e7eb',
              paddingBottom: '8px'
            }}>
              Certificaciones
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {certifications.map((cert, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h4 style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      margin: '0 0 4px 0',
                      color: '#1f2937'
                    }}>
                      {cert.name}
                    </h4>
                    <p style={{
                      margin: 0,
                      fontSize: '0.875rem',
                      color: '#6b7280'
                    }}>
                      {cert.issuer}
                    </p>
                  </div>
                  <span style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    fontWeight: '500'
                  }}>
                    {cert.date}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

// Plantilla Clásica - Elegante
export const ClassicTemplate = ({ data }) => {
  const {
    personalInfo = {},
    experience = [],
    education = [],
    skills = [],
    languages = [],
    certifications = []
  } = data;

  return (
    <div style={{
      fontFamily: 'Georgia, serif',
      maxWidth: '800px',
      margin: '0 auto',
      background: '#ffffff',
      color: '#2c3e50',
      lineHeight: 1.7,
      border: '1px solid #e0e0e0'
    }}>
      {/* Header */}
      <div style={{
        background: '#2c3e50',
        color: 'white',
        padding: '40px',
        textAlign: 'center',
        borderBottom: '4px solid #3498db'
      }}>
        <h1 style={{
          fontSize: '2.75rem',
          fontWeight: '400',
          margin: '0 0 12px 0',
          fontFamily: 'Georgia, serif',
          letterSpacing: '0.05em'
        }}>
          {personalInfo.name || 'Tu Nombre'}
        </h1>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '300',
          margin: '0 0 20px 0',
          opacity: 0.9,
          fontStyle: 'italic'
        }}>
          {personalInfo.title || 'Tu Título Profesional'}
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          {personalInfo.email && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Email</div>
              <div style={{ fontWeight: '500' }}>{personalInfo.email}</div>
            </div>
          )}
          {personalInfo.phone && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Teléfono</div>
              <div style={{ fontWeight: '500' }}>{personalInfo.phone}</div>
            </div>
          )}
          {personalInfo.location && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>Ubicación</div>
              <div style={{ fontWeight: '500' }}>{personalInfo.location}</div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '40px' }}>
        {/* Summary */}
        {personalInfo.summary && (
          <section style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '400',
              margin: '0 0 20px 0',
              color: '#2c3e50',
              borderBottom: '2px solid #3498db',
              paddingBottom: '8px',
              fontFamily: 'Georgia, serif'
            }}>
              Resumen Profesional
            </h3>
            <p style={{ 
              margin: 0, 
              fontSize: '1.1rem', 
              color: '#34495e',
              textAlign: 'justify',
              lineHeight: 1.8
            }}>
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '400',
              margin: '0 0 20px 0',
              color: '#2c3e50',
              borderBottom: '2px solid #3498db',
              paddingBottom: '8px',
              fontFamily: 'Georgia, serif'
            }}>
              Experiencia Profesional
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {experience.map((exp, index) => (
                <div key={index}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '8px'
                  }}>
                    <h4 style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      margin: 0,
                      color: '#2c3e50'
                    }}>
                      {exp.title}
                    </h4>
                    <span style={{
                      fontSize: '0.9rem',
                      color: '#7f8c8d',
                      fontWeight: '500',
                      fontStyle: 'italic'
                    }}>
                      {exp.startDate} - {exp.endDate || 'Presente'}
                    </span>
                  </div>
                  <h5 style={{
                    fontSize: '1.1rem',
                    fontWeight: '500',
                    margin: '0 0 12px 0',
                    color: '#3498db'
                  }}>
                    {exp.company}
                  </h5>
                  <p style={{
                    margin: 0,
                    fontSize: '1rem',
                    color: '#34495e',
                    lineHeight: 1.7,
                    textAlign: 'justify'
                  }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '400',
              margin: '0 0 20px 0',
              color: '#2c3e50',
              borderBottom: '2px solid #3498db',
              paddingBottom: '8px',
              fontFamily: 'Georgia, serif'
            }}>
              Educación
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {education.map((edu, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}>
                  <div>
                    <h4 style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      margin: '0 0 6px 0',
                      color: '#2c3e50'
                    }}>
                      {edu.degree}
                    </h4>
                    <p style={{
                      margin: 0,
                      fontSize: '1rem',
                      color: '#7f8c8d',
                      fontStyle: 'italic'
                    }}>
                      {edu.institution}
                    </p>
                  </div>
                  <span style={{
                    fontSize: '0.9rem',
                    color: '#7f8c8d',
                    fontWeight: '500',
                    fontStyle: 'italic'
                  }}>
                    {edu.startDate} - {edu.endDate || 'Presente'}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '400',
              margin: '0 0 20px 0',
              color: '#2c3e50',
              borderBottom: '2px solid #3498db',
              paddingBottom: '8px',
              fontFamily: 'Georgia, serif'
            }}>
              Habilidades
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '12px'
            }}>
              {skills.map((skill, index) => (
                <div key={index} style={{
                  background: '#ecf0f1',
                  padding: '10px 16px',
                  borderRadius: '4px',
                  textAlign: 'center',
                  border: '1px solid #bdc3c7'
                }}>
                  <span style={{
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    color: '#2c3e50'
                  }}>
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <section style={{ marginBottom: '40px' }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '400',
              margin: '0 0 20px 0',
              color: '#2c3e50',
              borderBottom: '2px solid #3498db',
              paddingBottom: '8px',
              fontFamily: 'Georgia, serif'
            }}>
              Idiomas
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              {languages.map((lang, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '8px 0',
                  borderBottom: '1px solid #ecf0f1'
                }}>
                  <span style={{
                    fontSize: '1rem',
                    fontWeight: '500',
                    color: '#2c3e50'
                  }}>
                    {lang.language}
                  </span>
                  <span style={{
                    fontSize: '0.9rem',
                    color: '#7f8c8d',
                    fontStyle: 'italic'
                  }}>
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '400',
              margin: '0 0 20px 0',
              color: '#2c3e50',
              borderBottom: '2px solid #3498db',
              paddingBottom: '8px',
              fontFamily: 'Georgia, serif'
            }}>
              Certificaciones
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {certifications.map((cert, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 0',
                  borderBottom: '1px solid #ecf0f1'
                }}>
                  <div>
                    <h4 style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      margin: '0 0 4px 0',
                      color: '#2c3e50'
                    }}>
                      {cert.name}
                    </h4>
                    <p style={{
                      margin: 0,
                      fontSize: '0.95rem',
                      color: '#7f8c8d',
                      fontStyle: 'italic'
                    }}>
                      {cert.issuer}
                    </p>
                  </div>
                  <span style={{
                    fontSize: '0.9rem',
                    color: '#7f8c8d',
                    fontWeight: '500',
                    fontStyle: 'italic'
                  }}>
                    {cert.date}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

// Plantilla Creativa - Colorida
export const CreativeTemplate = ({ data }) => {
  const {
    personalInfo = {},
    experience = [],
    education = [],
    skills = [],
    languages = [],
    certifications = []
  } = data;

  return (
    <div style={{
      fontFamily: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif',
      maxWidth: '800px',
      margin: '0 auto',
      background: '#ffffff',
      color: '#2d3748',
      lineHeight: 1.6
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '50px 40px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '200px',
          height: '200px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-10%',
          width: '150px',
          height: '150px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%'
        }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: '800',
            margin: '0 0 12px 0',
            letterSpacing: '-0.025em'
          }}>
            {personalInfo.name || 'Tu Nombre'}
          </h1>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '400',
            margin: '0 0 24px 0',
            opacity: 0.9
          }}>
            {personalInfo.title || 'Tu Título Profesional'}
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '20px'
          }}>
            {personalInfo.email && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '12px 16px',
                borderRadius: '8px',
                backdropFilter: 'blur(10px)'
              }}>
                <span style={{ fontSize: '1.2rem' }}>📧</span>
                <span style={{ fontSize: '0.9rem' }}>{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '12px 16px',
                borderRadius: '8px',
                backdropFilter: 'blur(10px)'
              }}>
                <span style={{ fontSize: '1.2rem' }}>📱</span>
                <span style={{ fontSize: '0.9rem' }}>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                background: 'rgba(255, 255, 255, 0.1)',
                padding: '12px 16px',
                borderRadius: '8px',
                backdropFilter: 'blur(10px)'
              }}>
                <span style={{ fontSize: '1.2rem' }}>📍</span>
                <span style={{ fontSize: '0.9rem' }}>{personalInfo.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '40px' }}>
        {/* Summary */}
        {personalInfo.summary && (
          <section style={{ marginBottom: '40px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '20px'
            }}>
              <div style={{
                width: '4px',
                height: '30px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '2px'
              }} />
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                margin: 0,
                color: '#2d3748'
              }}>
                Resumen Profesional
              </h3>
            </div>
            <p style={{ 
              margin: 0, 
              fontSize: '1.1rem', 
              color: '#4a5568',
              lineHeight: 1.7
            }}>
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experience.length > 0 && (
          <section style={{ marginBottom: '40px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '4px',
                height: '30px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '2px'
              }} />
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                margin: 0,
                color: '#2d3748'
              }}>
                Experiencia Profesional
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              {experience.map((exp, index) => (
                <div key={index} style={{
                  background: '#f7fafc',
                  padding: '24px',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '4px',
                    height: '100%',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    borderTopLeftRadius: '12px',
                    borderBottomLeftRadius: '12px'
                  }} />
                  <div style={{ paddingLeft: '16px' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '12px'
                    }}>
                      <h4 style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        margin: 0,
                        color: '#2d3748'
                      }}>
                        {exp.title}
                      </h4>
                      <span style={{
                        fontSize: '0.875rem',
                        color: '#718096',
                        fontWeight: '600',
                        background: '#edf2f7',
                        padding: '4px 12px',
                        borderRadius: '20px'
                      }}>
                        {exp.startDate} - {exp.endDate || 'Presente'}
                      </span>
                    </div>
                    <h5 style={{
                      fontSize: '1.1rem',
                      fontWeight: '600',
                      margin: '0 0 12px 0',
                      color: '#667eea'
                    }}>
                      {exp.company}
                    </h5>
                    <p style={{
                      margin: 0,
                      fontSize: '1rem',
                      color: '#4a5568',
                      lineHeight: 1.6
                    }}>
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section style={{ marginBottom: '40px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '4px',
                height: '30px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '2px'
              }} />
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                margin: 0,
                color: '#2d3748'
              }}>
                Educación
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {education.map((edu, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  background: '#f7fafc',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div>
                    <h4 style={{
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      margin: '0 0 6px 0',
                      color: '#2d3748'
                    }}>
                      {edu.degree}
                    </h4>
                    <p style={{
                      margin: 0,
                      fontSize: '1rem',
                      color: '#718096'
                    }}>
                      {edu.institution}
                    </p>
                  </div>
                  <span style={{
                    fontSize: '0.875rem',
                    color: '#718096',
                    fontWeight: '600',
                    background: '#edf2f7',
                    padding: '4px 12px',
                    borderRadius: '20px'
                  }}>
                    {edu.startDate} - {edu.endDate || 'Presente'}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section style={{ marginBottom: '40px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '4px',
                height: '30px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '2px'
              }} />
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                margin: 0,
                color: '#2d3748'
              }}>
                Habilidades
              </h3>
            </div>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              {skills.map((skill, index) => (
                <span key={index} style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  padding: '8px 16px',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)'
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <section style={{ marginBottom: '40px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '4px',
                height: '30px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '2px'
              }} />
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                margin: 0,
                color: '#2d3748'
              }}>
                Idiomas
              </h3>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              {languages.map((lang, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#f7fafc',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0'
                }}>
                  <span style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#2d3748'
                  }}>
                    {lang.language}
                  </span>
                  <span style={{
                    fontSize: '0.875rem',
                    color: '#718096',
                    fontWeight: '600',
                    background: '#edf2f7',
                    padding: '4px 12px',
                    borderRadius: '20px'
                  }}>
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '24px'
            }}>
              <div style={{
                width: '4px',
                height: '30px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '2px'
              }} />
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                margin: 0,
                color: '#2d3748'
              }}>
                Certificaciones
              </h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {certifications.map((cert, index) => (
                <div key={index} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: '#f7fafc',
                  padding: '20px',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div>
                    <h4 style={{
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      margin: '0 0 6px 0',
                      color: '#2d3748'
                    }}>
                      {cert.name}
                    </h4>
                    <p style={{
                      margin: 0,
                      fontSize: '1rem',
                      color: '#718096'
                    }}>
                      {cert.issuer}
                    </p>
                  </div>
                  <span style={{
                    fontSize: '0.875rem',
                    color: '#718096',
                    fontWeight: '600',
                    background: '#edf2f7',
                    padding: '4px 12px',
                    borderRadius: '20px'
                  }}>
                    {cert.date}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

// Exportar todas las plantillas
export const templates = {
  modern: {
    name: 'Moderno',
    description: 'Diseño minimalista y profesional',
    component: ModernTemplate,
    preview: 'modern-preview.png'
  },
  classic: {
    name: 'Clásico',
    description: 'Estilo elegante y tradicional',
    component: ClassicTemplate,
    preview: 'classic-preview.png'
  },
  creative: {
    name: 'Creativo',
    description: 'Diseño colorido y moderno',
    component: CreativeTemplate,
    preview: 'creative-preview.png'
  }
}; 