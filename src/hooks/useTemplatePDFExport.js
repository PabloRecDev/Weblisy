import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { supabase } from '../lib/supabase';

export const useTemplatePDFExport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Actualizar contador de descargas
  const updateDownloadCount = async (cvId) => {
    try {
      const { error } = await supabase.rpc('increment_download_count', { cv_id: cvId });
      if (error) {
        console.error('Error updating download count:', error);
      }
    } catch (error) {
      console.error('Error updating download count:', error);
    }
  };

  // Generar PDF usando plantillas
  const generatePDFWithTemplate = async (cvData, templateKey = 'modern', fileName = 'cv') => {
    try {
      setLoading(true);
      setError(null);

      console.log('=== GENERATING PDF WITH TEMPLATE ===');
      console.log('Template Key:', templateKey);
      console.log('CV Data:', cvData);
      console.log('File Name:', fileName);

      // Transformar los datos del CV al formato esperado por las plantillas
      const transformedData = transformCVDataForTemplate(cvData);
      console.log('Transformed Data:', transformedData);
      
      // Crear un elemento temporal para renderizar la plantilla
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '0';
      tempDiv.style.width = '800px';
      tempDiv.style.background = '#ffffff';
      tempDiv.style.padding = '0';
      tempDiv.style.margin = '0';
      tempDiv.style.fontFamily = 'Arial, sans-serif';
      tempDiv.style.fontSize = '14px';
      tempDiv.style.lineHeight = '1.6';
      tempDiv.style.color = '#000000';
      tempDiv.style.overflow = 'hidden';
      
      document.body.appendChild(tempDiv);

      // Renderizar la plantilla usando HTML directo
      const templateHTML = generateTemplateHTML(templateKey, transformedData);
      console.log('Generated HTML length:', templateHTML.length);
      console.log('HTML Preview:', templateHTML.substring(0, 500) + '...');
      
      tempDiv.innerHTML = templateHTML;

      // Esperar a que se renderice completamente
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log('Temp div height:', tempDiv.scrollHeight);
      console.log('Temp div content:', tempDiv.innerHTML.substring(0, 200) + '...');

      // Capturar el elemento con html2canvas
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 800,
        height: tempDiv.scrollHeight,
        logging: true,
        allowTaint: true
      });

      console.log('Canvas created:', canvas.width, 'x', canvas.height);

      // Crear PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      console.log('PDF dimensions:', pdfWidth, 'x', pdfHeight);
      console.log('Image dimensions:', imgWidth, 'x', imgHeight);
      
      // Calcular dimensiones para ajustar al PDF
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      console.log('Calculated ratio:', ratio);
      console.log('Image position:', imgX, imgY);

      // Añadir imagen al PDF
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);

      // Descargar PDF
      pdf.save(`${fileName}.pdf`);

      // Limpiar elementos temporales
      document.body.removeChild(tempDiv);

      // Actualizar contador si se proporciona cvId
      if (cvData.cv?.id) {
        await updateDownloadCount(cvData.cv.id);
      }

      console.log('PDF generated successfully!');
      return { success: true };
    } catch (error) {
      console.error('Error generating PDF with template:', error);
      setError(error.message);
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Generar HTML para las plantillas
  const generateTemplateHTML = (templateKey, data) => {
    switch (templateKey) {
      case 'modern':
        return generateModernTemplateHTML(data);
      case 'classic':
        return generateClassicTemplateHTML(data);
      case 'creative':
        return generateCreativeTemplateHTML(data);
      default:
        return generateModernTemplateHTML(data);
    }
  };

  // Plantilla Moderna HTML
  const generateModernTemplateHTML = (data) => {
    return `
      <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; max-width: 800px; margin: 0 auto; background: #ffffff; color: #1f2937; line-height: 1.6;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px; text-align: center;">
          ${data.personalInfo.photo ? `
            <div style="margin-bottom: 20px;">
              <img 
                src="${data.personalInfo.photo}" 
                alt="Foto de perfil"
                style="
                  width: 120px;
                  height: 120px;
                  border-radius: 50%;
                  object-fit: cover;
                  border: 4px solid rgba(255, 255, 255, 0.3);
                  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                "
              />
            </div>
          ` : ''}
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

          ${data.education.length > 0 ? `
            <section style="margin-bottom: 32px;">
              <h3 style="font-size: 1.25rem; font-weight: 600; margin: 0 0 16px 0; color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">
                Educación
              </h3>
              <div style="display: flex; flex-direction: column; gap: 16px;">
                ${data.education.map(edu => `
                  <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div>
                      <h4 style="font-size: 1rem; font-weight: 600; margin: 0 0 4px 0; color: #1f2937;">
                        ${edu.degree}
                      </h4>
                      <p style="margin: 0; font-size: 0.875rem; color: #6b7280;">
                        ${edu.institution}
                      </p>
                    </div>
                    <span style="font-size: 0.875rem; color: #6b7280; font-weight: 500;">
                      ${edu.startDate} - ${edu.endDate}
                    </span>
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

          ${data.languages.length > 0 ? `
            <section style="margin-bottom: 32px;">
              <h3 style="font-size: 1.25rem; font-weight: 600; margin: 0 0 16px 0; color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">
                Idiomas
              </h3>
              <div style="display: flex; flex-wrap: wrap; gap: 16px;">
                ${data.languages.map(lang => `
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 0.875rem; font-weight: 500; color: #1f2937;">
                      ${lang.language}
                    </span>
                    <span style="font-size: 0.75rem; color: #6b7280;">
                      (${lang.level})
                    </span>
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}

          ${data.certifications.length > 0 ? `
            <section>
              <h3 style="font-size: 1.25rem; font-weight: 600; margin: 0 0 16px 0; color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px;">
                Certificaciones
              </h3>
              <div style="display: flex; flex-direction: column; gap: 12px;">
                ${data.certifications.map(cert => `
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <h4 style="font-size: 1rem; font-weight: 600; margin: 0 0 4px 0; color: #1f2937;">
                        ${cert.name}
                      </h4>
                      <p style="margin: 0; font-size: 0.875rem; color: #6b7280;">
                        ${cert.issuer}
                      </p>
                    </div>
                    <span style="font-size: 0.875rem; color: #6b7280; font-weight: 500;">
                      ${cert.date}
                    </span>
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}
        </div>
      </div>
    `;
  };

  // Plantilla Clásica HTML
  const generateClassicTemplateHTML = (data) => {
    return `
      <div style="font-family: Georgia, serif; max-width: 800px; margin: 0 auto; background: #ffffff; color: #2c3e50; line-height: 1.7; border: 1px solid #e0e0e0;">
        <!-- Header -->
        <div style="background: #2c3e50; color: white; padding: 40px; text-align: center; border-bottom: 4px solid #3498db;">
          ${data.personalInfo.photo ? `
            <div style="margin-bottom: 20px;">
              <img 
                src="${data.personalInfo.photo}" 
                alt="Foto de perfil"
                style="
                  width: 100px;
                  height: 100px;
                  border-radius: 50%;
                  object-fit: cover;
                  border: 3px solid #3498db;
                  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
                "
              />
            </div>
          ` : ''}
          <h1 style="font-size: 2.75rem; font-weight: 400; margin: 0 0 12px 0; font-family: Georgia, serif; letter-spacing: 0.05em;">
            ${data.personalInfo.name || 'Tu Nombre'}
          </h1>
          <h2 style="font-size: 1.5rem; font-weight: 300; margin: 0 0 20px 0; opacity: 0.9; font-style: italic;">
            ${data.personalInfo.title || 'Tu Título Profesional'}
          </h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; max-width: 600px; margin: 0 auto;">
            ${data.personalInfo.email ? `<div style="text-align: center;"><div style="font-size: 0.875rem; opacity: 0.8;">Email</div><div style="font-weight: 500;">${data.personalInfo.email}</div></div>` : ''}
            ${data.personalInfo.phone ? `<div style="text-align: center;"><div style="font-size: 0.875rem; opacity: 0.8;">Teléfono</div><div style="font-weight: 500;">${data.personalInfo.phone}</div></div>` : ''}
            ${data.personalInfo.location ? `<div style="text-align: center;"><div style="font-size: 0.875rem; opacity: 0.8;">Ubicación</div><div style="font-weight: 500;">${data.personalInfo.location}</div></div>` : ''}
          </div>
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

          ${data.education.length > 0 ? `
            <section style="margin-bottom: 40px;">
              <h3 style="font-size: 1.5rem; font-weight: 400; margin: 0 0 20px 0; color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 8px; font-family: Georgia, serif;">
                Educación
              </h3>
              <div style="display: flex; flex-direction: column; gap: 20px;">
                ${data.education.map(edu => `
                  <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                    <div>
                      <h4 style="font-size: 1.1rem; font-weight: 600; margin: 0 0 6px 0; color: #2c3e50;">
                        ${edu.degree}
                      </h4>
                      <p style="margin: 0; font-size: 1rem; color: #7f8c8d; font-style: italic;">
                        ${edu.institution}
                      </p>
                    </div>
                    <span style="font-size: 0.9rem; color: #7f8c8d; font-weight: 500; font-style: italic;">
                      ${edu.startDate} - ${edu.endDate}
                    </span>
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}

          ${data.skills.length > 0 ? `
            <section style="margin-bottom: 40px;">
              <h3 style="font-size: 1.5rem; font-weight: 400; margin: 0 0 20px 0; color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 8px; font-family: Georgia, serif;">
                Habilidades
              </h3>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px;">
                ${data.skills.map(skill => `
                  <div style="background: #ecf0f1; padding: 10px 16px; border-radius: 4px; text-align: center; border: 1px solid #bdc3c7;">
                    <span style="font-size: 0.95rem; font-weight: 500; color: #2c3e50;">
                      ${skill}
                    </span>
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}

          ${data.languages.length > 0 ? `
            <section style="margin-bottom: 40px;">
              <h3 style="font-size: 1.5rem; font-weight: 400; margin: 0 0 20px 0; color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 8px; font-family: Georgia, serif;">
                Idiomas
              </h3>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
                ${data.languages.map(lang => `
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 1px solid #ecf0f1;">
                    <span style="font-size: 1rem; font-weight: 500; color: #2c3e50;">
                      ${lang.language}
                    </span>
                    <span style="font-size: 0.9rem; color: #7f8c8d; font-style: italic;">
                      ${lang.level}
                    </span>
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}

          ${data.certifications.length > 0 ? `
            <section>
              <h3 style="font-size: 1.5rem; font-weight: 400; margin: 0 0 20px 0; color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 8px; font-family: Georgia, serif;">
                Certificaciones
              </h3>
              <div style="display: flex; flex-direction: column; gap: 16px;">
                ${data.certifications.map(cert => `
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #ecf0f1;">
                    <div>
                      <h4 style="font-size: 1.1rem; font-weight: 600; margin: 0 0 4px 0; color: #2c3e50;">
                        ${cert.name}
                      </h4>
                      <p style="margin: 0; font-size: 0.95rem; color: #7f8c8d; font-style: italic;">
                        ${cert.issuer}
                      </p>
                    </div>
                    <span style="font-size: 0.9rem; color: #7f8c8d; font-weight: 500; font-style: italic;">
                      ${cert.date}
                    </span>
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}
        </div>
      </div>
    `;
  };

  // Plantilla Creativa HTML
  const generateCreativeTemplateHTML = (data) => {
    return `
      <div style="font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif; max-width: 800px; margin: 0 auto; background: #ffffff; color: #2d3748; line-height: 1.6;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 50px 40px; position: relative; overflow: hidden;">
          <div style="position: absolute; top: -50%; right: -20%; width: 200px; height: 200px; background: rgba(255, 255, 255, 0.1); border-radius: 50%;"></div>
          <div style="position: absolute; bottom: -30%; left: -10%; width: 150px; height: 150px; background: rgba(255, 255, 255, 0.1); border-radius: 50%;"></div>
          
          <div style="position: relative; z-index: 1;">
            ${data.personalInfo.photo ? `
              <div style="margin-bottom: 24px; text-align: center;">
                <img 
                  src="${data.personalInfo.photo}" 
                  alt="Foto de perfil"
                  style="
                    width: 140px;
                    height: 140px;
                    border-radius: 50%;
                    object-fit: cover;
                    border: 5px solid rgba(255, 255, 255, 0.3);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
                    backdrop-filter: blur(10px);
                  "
                />
              </div>
            ` : ''}
            <h1 style="font-size: 3rem; font-weight: 800; margin: 0 0 12px 0; letter-spacing: -0.025em;">
              ${data.personalInfo.name || 'Tu Nombre'}
            </h1>
            <h2 style="font-size: 1.5rem; font-weight: 400; margin: 0 0 24px 0; opacity: 0.9;">
              ${data.personalInfo.title || 'Tu Título Profesional'}
            </h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px;">
              ${data.personalInfo.email ? `<div style="display: flex; align-items: center; gap: 12px; background: rgba(255, 255, 255, 0.1); padding: 12px 16px; border-radius: 8px; backdrop-filter: blur(10px);"><span style="font-size: 1.2rem;">📧</span><span style="font-size: 0.9rem;">${data.personalInfo.email}</span></div>` : ''}
              ${data.personalInfo.phone ? `<div style="display: flex; align-items: center; gap: 12px; background: rgba(255, 255, 255, 0.1); padding: 12px 16px; border-radius: 8px; backdrop-filter: blur(10px);"><span style="font-size: 1.2rem;">📱</span><span style="font-size: 0.9rem;">${data.personalInfo.phone}</span></div>` : ''}
              ${data.personalInfo.location ? `<div style="display: flex; align-items: center; gap: 12px; background: rgba(255, 255, 255, 0.1); padding: 12px 16px; border-radius: 8px; backdrop-filter: blur(10px);"><span style="font-size: 1.2rem;">📍</span><span style="font-size: 0.9rem;">${data.personalInfo.location}</span></div>` : ''}
            </div>
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

          ${data.education.length > 0 ? `
            <section style="margin-bottom: 40px;">
              <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
                <div style="width: 4px; height: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 2px;"></div>
                <h3 style="font-size: 1.5rem; font-weight: 700; margin: 0; color: #2d3748;">
                  Educación
                </h3>
              </div>
              <div style="display: flex; flex-direction: column; gap: 20px;">
                ${data.education.map(edu => `
                  <div style="display: flex; justify-content: space-between; align-items: flex-start; background: #f7fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
                    <div>
                      <h4 style="font-size: 1.1rem; font-weight: 700; margin: 0 0 6px 0; color: #2d3748;">
                        ${edu.degree}
                      </h4>
                      <p style="margin: 0; font-size: 1rem; color: #718096;">
                        ${edu.institution}
                      </p>
                    </div>
                    <span style="font-size: 0.875rem; color: #718096; font-weight: 600; background: #edf2f7; padding: 4px 12px; border-radius: 20px;">
                      ${edu.startDate} - ${edu.endDate}
                    </span>
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

          ${data.languages.length > 0 ? `
            <section style="margin-bottom: 40px;">
              <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
                <div style="width: 4px; height: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 2px;"></div>
                <h3 style="font-size: 1.5rem; font-weight: 700; margin: 0; color: #2d3748;">
                  Idiomas
                </h3>
              </div>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px;">
                ${data.languages.map(lang => `
                  <div style="display: flex; justify-content: space-between; align-items: center; background: #f7fafc; padding: 16px 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
                    <span style="font-size: 1rem; font-weight: 600; color: #2d3748;">
                      ${lang.language}
                    </span>
                    <span style="font-size: 0.875rem; color: #718096; font-weight: 600; background: #edf2f7; padding: 4px 12px; border-radius: 20px;">
                      ${lang.level}
                    </span>
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}

          ${data.certifications.length > 0 ? `
            <section>
              <div style="display: flex; align-items: center; gap: 16px; margin-bottom: 24px;">
                <div style="width: 4px; height: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 2px;"></div>
                <h3 style="font-size: 1.5rem; font-weight: 700; margin: 0; color: #2d3748;">
                  Certificaciones
                </h3>
              </div>
              <div style="display: flex; flex-direction: column; gap: 16px;">
                ${data.certifications.map(cert => `
                  <div style="display: flex; justify-content: space-between; align-items: center; background: #f7fafc; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
                    <div>
                      <h4 style="font-size: 1.1rem; font-weight: 700; margin: 0 0 6px 0; color: #2d3748;">
                        ${cert.name}
                      </h4>
                      <p style="margin: 0; font-size: 1rem; color: #718096;">
                        ${cert.issuer}
                      </p>
                    </div>
                    <span style="font-size: 0.875rem; color: #718096; font-weight: 600; background: #edf2f7; padding: 4px 12px; border-radius: 20px;">
                      ${cert.date}
                    </span>
                  </div>
                `).join('')}
              </div>
            </section>
          ` : ''}
        </div>
      </div>
    `;
  };

  // Transformar datos del CV al formato esperado por las plantillas
  const transformCVDataForTemplate = (cvData) => {
    console.log('=== TRANSFORMING CV DATA ===');
    console.log('Original CV Data:', cvData);
    
    const transformed = {
      personalInfo: {},
      experience: [],
      education: [],
      skills: [],
      languages: [],
      certifications: []
    };

    // Información personal
    if (cvData.personal_info) {
      transformed.personalInfo = {
        name: `${cvData.personal_info.first_name || ''} ${cvData.personal_info.last_name || ''}`.trim(),
        title: cvData.personal_info.professional_title || 'Profesional',
        email: cvData.personal_info.email || '',
        phone: cvData.personal_info.phone || '',
        location: cvData.personal_info.address || '',
        summary: cvData.personal_info.professional_summary || '',
        photo: cvData.personal_info.photo_url || null
      };
    }

    // Experiencia laboral
    if (cvData.work_experience && cvData.work_experience.length > 0) {
      transformed.experience = cvData.work_experience.map(exp => ({
        title: exp.position || '',
        company: exp.company_name || '',
        startDate: exp.start_date ? new Date(exp.start_date).getFullYear().toString() : '',
        endDate: exp.end_date ? new Date(exp.end_date).getFullYear().toString() : 'Presente',
        description: exp.description || ''
      }));
    }

    // Educación
    if (cvData.education && cvData.education.length > 0) {
      transformed.education = cvData.education.map(edu => ({
        degree: edu.degree || '',
        institution: edu.institution || '',
        startDate: edu.start_date ? new Date(edu.start_date).getFullYear().toString() : '',
        endDate: edu.end_date ? new Date(edu.end_date).getFullYear().toString() : 'Presente',
        description: edu.description || ''
      }));
    }

    // Habilidades
    if (cvData.skills && cvData.skills.length > 0) {
      transformed.skills = cvData.skills.map(skill => skill.skill_name || skill.name || '');
    }

    // Idiomas
    if (cvData.languages && cvData.languages.length > 0) {
      transformed.languages = cvData.languages.map(lang => ({
        language: lang.language || '',
        level: lang.level || ''
      }));
    }

    // Certificaciones
    if (cvData.certifications && cvData.certifications.length > 0) {
      transformed.certifications = cvData.certifications.map(cert => ({
        name: cert.name || '',
        issuer: cert.issuer || '',
        date: cert.date || ''
      }));
    }

    console.log('Transformed Data:', transformed);
    return transformed;
  };

  return {
    loading,
    error,
    generatePDFWithTemplate,
    updateDownloadCount
  };
}; 