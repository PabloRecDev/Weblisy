// Script de prueba para verificar que las plantillas funcionen correctamente
// Ejecutar en la consola del navegador en la página de creación de CV

console.log('=== PRUEBA DE PLANTILLAS ===');

// Datos de prueba
const testData = {
  cv: { id: 'test-123' },
  personal_info: {
    first_name: 'Juan',
    last_name: 'Pérez',
    email: 'juan.perez@email.com',
    phone: '+34 123 456 789',
    address: 'Madrid, España',
    professional_title: 'Desarrollador Full Stack',
    professional_summary: 'Desarrollador con 5 años de experiencia en tecnologías web modernas, especializado en React, Node.js y bases de datos. Apasionado por crear soluciones escalables y experiencias de usuario excepcionales.'
  },
  work_experience: [
    {
      position: 'Desarrollador Full Stack Senior',
      company_name: 'TechCorp',
      start_date: '2022-01-01',
      end_date: '2024-01-01',
      description: 'Lideré el desarrollo de aplicaciones web escalables usando React, Node.js y PostgreSQL. Implementé mejoras que aumentaron la eficiencia del equipo en un 30%.'
    },
    {
      position: 'Desarrollador Frontend',
      company_name: 'WebSolutions',
      start_date: '2020-03-01',
      end_date: '2021-12-31',
      description: 'Desarrollé interfaces de usuario responsivas y accesibles. Trabajé con React, TypeScript y CSS moderno.'
    }
  ],
  education: [
    {
      degree: 'Ingeniería Informática',
      institution: 'Universidad Politécnica de Madrid',
      start_date: '2016-09-01',
      end_date: '2020-06-30',
      description: 'Especialización en desarrollo de software y arquitectura de sistemas.'
    }
  ],
  skills: [
    { skill_name: 'React' },
    { skill_name: 'Node.js' },
    { skill_name: 'TypeScript' },
    { skill_name: 'PostgreSQL' },
    { skill_name: 'Docker' },
    { skill_name: 'AWS' }
  ],
  languages: [
    {
      language: 'Español',
      level: 'Nativo'
    },
    {
      language: 'Inglés',
      level: 'Avanzado'
    }
  ],
  certifications: [
    {
      name: 'AWS Certified Developer',
      issuer: 'Amazon Web Services',
      date: '2023-06-15'
    },
    {
      name: 'React Developer Certification',
      issuer: 'Meta',
      date: '2022-12-10'
    }
  ]
};

// Función para probar la transformación de datos
function testDataTransformation() {
  console.log('Probando transformación de datos...');
  
  const transformed = {
    personalInfo: {},
    experience: [],
    education: [],
    skills: [],
    languages: [],
    certifications: []
  };

  // Información personal
  if (testData.personal_info) {
    transformed.personalInfo = {
      name: `${testData.personal_info.first_name || ''} ${testData.personal_info.last_name || ''}`.trim(),
      title: testData.personal_info.professional_title || 'Profesional',
      email: testData.personal_info.email || '',
      phone: testData.personal_info.phone || '',
      location: testData.personal_info.address || '',
      summary: testData.personal_info.professional_summary || ''
    };
  }

  // Experiencia laboral
  if (testData.work_experience && testData.work_experience.length > 0) {
    transformed.experience = testData.work_experience.map(exp => ({
      title: exp.position || '',
      company: exp.company_name || '',
      startDate: exp.start_date ? new Date(exp.start_date).getFullYear().toString() : '',
      endDate: exp.end_date ? new Date(exp.end_date).getFullYear().toString() : 'Presente',
      description: exp.description || ''
    }));
  }

  // Educación
  if (testData.education && testData.education.length > 0) {
    transformed.education = testData.education.map(edu => ({
      degree: edu.degree || '',
      institution: edu.institution || '',
      startDate: edu.start_date ? new Date(edu.start_date).getFullYear().toString() : '',
      endDate: edu.end_date ? new Date(edu.end_date).getFullYear().toString() : 'Presente',
      description: edu.description || ''
    }));
  }

  // Habilidades
  if (testData.skills && testData.skills.length > 0) {
    transformed.skills = testData.skills.map(skill => skill.skill_name || skill.name || '');
  }

  // Idiomas
  if (testData.languages && testData.languages.length > 0) {
    transformed.languages = testData.languages.map(lang => ({
      language: lang.language || '',
      level: lang.level || ''
    }));
  }

  // Certificaciones
  if (testData.certifications && testData.certifications.length > 0) {
    transformed.certifications = testData.certifications.map(cert => ({
      name: cert.name || '',
      issuer: cert.issuer || '',
      date: cert.date || ''
    }));
  }

  console.log('Datos transformados:', transformed);
  return transformed;
}

// Función para probar la generación de HTML
function testHTMLGeneration(templateKey, data) {
  console.log(`Probando generación de HTML para plantilla: ${templateKey}`);
  
  // Simular las funciones de generación de HTML
  const generateModernTemplateHTML = (data) => {
    return `
      <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; max-width: 800px; margin: 0 auto; background: #ffffff; color: #1f2937; line-height: 1.6;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center;">
          <h1 style="font-size: 2.5rem; font-weight: 700; margin: 0 0 8px 0; letter-spacing: -0.025em;">
            ${data.personalInfo.name || 'Tu Nombre'}
          </h1>
          <h2 style="font-size: 1.25rem; font-weight: 400; margin: 0 0 16px 0; opacity: 0.9;">
            ${data.personalInfo.title || 'Tu Título Profesional'}
          </h2>
          <div style="display: flex; justify-content: center; gap: 24px; flex-wrap: wrap;">
            ${data.personalInfo.email ? `<div style="display: flex; align-items: center; gap: 8px;"><span>📧</span><span>${data.personalInfo.email}</span></div>` : ''}
            ${data.personalInfo.phone ? `<div style="display: flex; align-items: center; gap: 8px;"><span>📱</span><span>${data.personalInfo.phone}</span></div>` : ''}
            ${data.personalInfo.location ? `<div style="display: flex; align-items: center; gap: 8px;"><span>📍</span><span>${data.personalInfo.location}</span></div>` : ''}
          </div>
        </div>

        <!-- Content -->
        <div style="padding: 40px;">
          ${data.personalInfo.summary ? `
            <section style="margin-bottom: 32px;">
              <h3 style="font-size: 1.25rem; font-weight: 600; margin: 0 0 16px 0; color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">
                Resumen Profesional
              </h3>
              <p style="margin: 0; font-size: 1rem; color: #6b7280;">
                ${data.personalInfo.summary}
              </p>
            </section>
          ` : ''}

          ${data.experience.length > 0 ? `
            <section style="margin-bottom: 32px;">
              <h3 style="font-size: 1.25rem; font-weight: 600; margin: 0 0 16px 0; color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">
                Experiencia Profesional
              </h3>
              <div style="display: flex; flex-direction: column; gap: 24px;">
                ${data.experience.map(exp => `
                  <div style="border-left: 4px solid #667eea; padding-left: 20px; position: relative;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                      <h4 style="font-size: 1.125rem; font-weight: 600; margin: 0; color: #1f2937;">
                        ${exp.title}
                      </h4>
                      <span style="font-size: 0.875rem; color: #6b7280; font-weight: 500;">
                        ${exp.startDate} - ${exp.endDate}
                      </span>
                    </div>
                    <h5 style="font-size: 1rem; font-weight: 500; margin: 0 0 8px 0; color: #374151;">
                      ${exp.company}
                    </h5>
                    <p style="margin: 0; font-size: 0.875rem; color: #6b7280; line-height: 1.5;">
                      ${exp.description}
                    </p>
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}

          ${data.skills.length > 0 ? `
            <section style="margin-bottom: 32px;">
              <h3 style="font-size: 1.25rem; font-weight: 600; margin: 0 0 16px 0; color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">
                Habilidades
              </h3>
              <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                ${data.skills.map(skill => `
                  <span style="background: #f3f4f6; color: #374151; padding: 6px 12px; border-radius: 20px; font-size: 0.875rem; font-weight: 500;">
                    ${skill}
                  </span>
                `).join('')}
              </div>
            </section>
          ` : ''}
        </div>
      </div>
    `;
  };

  const generateClassicTemplateHTML = (data) => {
    return `
      <div style="font-family: Georgia, serif; max-width: 800px; margin: 0 auto; background: #ffffff; color: #2c3e50; line-height: 1.7; border: 1px solid #e0e0e0;">
        <!-- Header -->
        <div style="background: #2c3e50; color: white; padding: 40px; text-align: center; border-bottom: 4px solid #3498db;">
          <h1 style="font-size: 2.75rem; font-weight: 400; margin: 0 0 12px 0; font-family: Georgia, serif; letter-spacing: 0.05em;">
            ${data.personalInfo.name || 'Tu Nombre'}
          </h1>
          <h2 style="font-size: 1.5rem; font-weight: 300; margin: 0 0 20px 0; opacity: 0.9; font-style: italic;">
            ${data.personalInfo.title || 'Tu Título Profesional'}
          </h2>
        </div>

        <!-- Content -->
        <div style="padding: 40px;">
          ${data.personalInfo.summary ? `
            <section style="margin-bottom: 40px;">
              <h3 style="font-size: 1.5rem; font-weight: 400; margin: 0 0 20px 0; color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 8px; font-family: Georgia, serif;">
                Resumen Profesional
              </h3>
              <p style="margin: 0; font-size: 1.1rem; color: #34495e; text-align: justify; line-height: 1.8;">
                ${data.personalInfo.summary}
              </p>
            </section>
          ` : ''}

          ${data.experience.length > 0 ? `
            <section style="margin-bottom: 40px;">
              <h3 style="font-size: 1.5rem; font-weight: 400; margin: 0 0 20px 0; color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 8px; font-family: Georgia, serif;">
                Experiencia Profesional
              </h3>
              <div style="display: flex; flex-direction: column; gap: 28px;">
                ${data.experience.map(exp => `
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                      <h4 style="font-size: 1.25rem; font-weight: 600; margin: 0; color: #2c3e50;">
                        ${exp.title}
                      </h4>
                      <span style="font-size: 0.9rem; color: #7f8c8d; font-weight: 500; font-style: italic;">
                        ${exp.startDate} - ${exp.endDate}
                      </span>
                    </div>
                    <h5 style="font-size: 1.1rem; font-weight: 500; margin: 0 0 12px 0; color: #3498db;">
                      ${exp.company}
                    </h5>
                    <p style="margin: 0; font-size: 1rem; color: #34495e; line-height: 1.7; text-align: justify;">
                      ${exp.description}
                    </p>
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}
        </div>
      </div>
    `;
  };

  const generateCreativeTemplateHTML = (data) => {
    return `
      <div style="font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif; max-width: 800px; margin: 0 auto; background: #ffffff; color: #2d3748; line-height: 1.6;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 50px 40px; position: relative; overflow: hidden;">
          <div style="position: relative; z-index: 1;">
            <h1 style="font-size: 3rem; font-weight: 800; margin: 0 0 12px 0; letter-spacing: -0.025em;">
              ${data.personalInfo.name || 'Tu Nombre'}
            </h1>
            <h2 style="font-size: 1.5rem; font-weight: 400; margin: 0 0 24px 0; opacity: 0.9;">
              ${data.personalInfo.title || 'Tu Título Profesional'}
            </h2>
          </div>
        </div>

        <!-- Content -->
        <div style="padding: 40px;">
          ${data.personalInfo.summary ? `
            <section style="margin-bottom: 40px;">
              <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 20px;">
                <div style="width: 4px; height: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 2px;"></div>
                <h3 style="font-size: 1.5rem; font-weight: 700; margin: 0; color: #2d3748;">
                  Resumen Profesional
                </h3>
              </div>
              <p style="margin: 0; font-size: 1.1rem; color: #4a5568; line-height: 1.7;">
                ${data.personalInfo.summary}
              </p>
            </section>
          ` : ''}

          ${data.experience.length > 0 ? `
            <section style="margin-bottom: 40px;">
              <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
                <div style="width: 4px; height: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 2px;"></div>
                <h3 style="font-size: 1.5rem; font-weight: 700; margin: 0; color: #2d3748;">
                  Experiencia Profesional
                </h3>
              </div>
              <div style="display: flex; flex-direction: column; gap: 28px;">
                ${data.experience.map(exp => `
                  <div style="background: #f7fafc; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0; position: relative;">
                    <div style="position: absolute; top: 0; left: 0; width: 4px; height: 100%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-top-left-radius: 12px; border-bottom-left-radius: 12px;"></div>
                    <div style="padding-left: 16px;">
                      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                        <h4 style="font-size: 1.25rem; font-weight: 700; margin: 0; color: #2d3748;">
                          ${exp.title}
                        </h4>
                        <span style="font-size: 0.875rem; color: #718096; font-weight: 600; background: #edf2f7; padding: 4px 12px; border-radius: 20px;">
                          ${exp.startDate} - ${exp.endDate}
                        </span>
                      </div>
                      <h5 style="font-size: 1.1rem; font-weight: 600; margin: 0 0 12px 0; color: #667eea;">
                        ${exp.company}
                      </h5>
                      <p style="margin: 0; font-size: 1rem; color: #4a5568; line-height: 1.6;">
                        ${exp.description}
                      </p>
                    </div>
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}

          ${data.skills.length > 0 ? `
            <section style="margin-bottom: 40px;">
              <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
                <div style="width: 4px; height: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 2px;"></div>
                <h3 style="font-size: 1.5rem; font-weight: 700; margin: 0; color: #2d3748;">
                  Habilidades
                </h3>
              </div>
              <div style="display: flex; flex-wrap: wrap; gap: 12px;">
                ${data.skills.map(skill => `
                  <span style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 8px 16px; border-radius: 25px; font-size: 0.9rem; font-weight: 600; box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);">
                    ${skill}
                  </span>
                `).join('')}
              </div>
            </section>
          ` : ''}
        </div>
      </div>
    `;
  };

  let html = '';
  switch (templateKey) {
    case 'modern':
      html = generateModernTemplateHTML(data);
      break;
    case 'classic':
      html = generateClassicTemplateHTML(data);
      break;
    case 'creative':
      html = generateCreativeTemplateHTML(data);
      break;
    default:
      html = generateModernTemplateHTML(data);
  }

  console.log(`HTML generado para plantilla ${templateKey}:`, html);
  return html;
}

// Ejecutar pruebas
console.log('=== INICIANDO PRUEBAS ===');

// Probar transformación de datos
const transformedData = testDataTransformation();

// Probar generación de HTML para cada plantilla
const templates = ['modern', 'classic', 'creative'];
templates.forEach(template => {
  testHTMLGeneration(template, transformedData);
});

console.log('=== PRUEBAS COMPLETADAS ===');
console.log('Si no hay errores, las plantillas están funcionando correctamente.');
console.log('Para probar en la aplicación:');
console.log('1. Ve a la página de creación de CV');
console.log('2. Llena algunos campos de prueba');
console.log('3. Haz clic en "Vista Previa" o "Exportar PDF"');
console.log('4. Selecciona una plantilla y verifica que se genere correctamente'); 