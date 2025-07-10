import { useState } from 'react';
import jsPDF from 'jspdf';
import { supabase } from '../lib/supabase';

export const useSimplePDFExport = () => {
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

  // Generar PDF profesional
  const generateProfessionalPDF = async (cvData, fileName = 'cv') => {
    try {
      setLoading(true);
      setError(null);

      console.log('Generating professional PDF with data:', cvData);

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      let currentY = margin;

      // Función auxiliar para añadir texto con salto de línea automático
      const addText = (text, x, y, options = {}) => {
        const fontSize = options.fontSize || 12;
        const fontStyle = options.fontStyle || 'normal';
        const maxWidth = options.maxWidth || pageWidth - 2 * margin;
        
        pdf.setFontSize(fontSize);
        pdf.setFont('helvetica', fontStyle);
        
        const lines = pdf.splitTextToSize(text, maxWidth);
        pdf.text(lines, x, y);
        
        return y + (lines.length * fontSize * 0.35);
      };

      // Función para añadir sección
      const addSection = (title, y) => {
        pdf.setFillColor(94, 23, 235);
        pdf.rect(margin - 5, y - 5, pageWidth - 2 * margin + 10, 8, 'F');
        
        pdf.setTextColor(255, 255, 255);
        currentY = addText(title, margin, y + 2, {
          fontSize: 14,
          fontStyle: 'bold'
        });
        
        pdf.setTextColor(0, 0, 0);
        return currentY + 8;
      };

      // Header con gradiente simulado
      pdf.setFillColor(94, 23, 235);
      pdf.rect(0, 0, pageWidth, 40, 'F');
      
      pdf.setTextColor(255, 255, 255);
      
      // Título principal
      const title = cvData.cv?.title || 'Curriculum Vitae';
      currentY = addText(title, margin, 25, {
        fontSize: 28,
        fontStyle: 'bold'
      });

      currentY += 20;
      pdf.setTextColor(0, 0, 0);

      // Información Personal
      if (cvData.personal_info) {
        const info = cvData.personal_info;
        currentY = addSection('INFORMACIÓN PERSONAL', currentY);

        if (info.first_name && info.last_name) {
          currentY = addText(`${info.first_name} ${info.last_name}`, margin, currentY, {
            fontSize: 18,
            fontStyle: 'bold'
          });
          currentY += 5;
        }

        // Información de contacto en columnas
        const contactInfo = [];
        if (info.email) contactInfo.push(`📧 ${info.email}`);
        if (info.phone) contactInfo.push(`📱 ${info.phone}`);
        if (info.address) contactInfo.push(`📍 ${info.address}`);
        if (info.linkedin_url) contactInfo.push(`💼 ${info.linkedin_url}`);
        if (info.github_url) contactInfo.push(`💻 ${info.github_url}`);

        if (contactInfo.length > 0) {
          const contactText = contactInfo.join('  |  ');
          currentY = addText(contactText, margin, currentY, {
            fontSize: 10
          });
          currentY += 10;
        }

        if (info.professional_summary) {
          currentY += 5;
          currentY = addText('Resumen Profesional:', margin, currentY, { 
            fontSize: 12, 
            fontStyle: 'bold' 
          });
          currentY = addText(info.professional_summary, margin, currentY, {
            fontSize: 11
          });
          currentY += 10;
        }
      }

      // Experiencia Laboral
      if (cvData.work_experience && cvData.work_experience.length > 0) {
        currentY = addSection('EXPERIENCIA LABORAL', currentY);

        cvData.work_experience.forEach((exp, index) => {
          // Puesto y empresa
          currentY = addText(exp.position, margin, currentY, {
            fontSize: 14,
            fontStyle: 'bold'
          });
          
          // Fechas y empresa
          const dateRange = `${exp.start_date} - ${exp.end_date || 'Presente'}`;
          currentY = addText(`${exp.company_name} | ${dateRange}`, margin, currentY, {
            fontSize: 11,
            fontStyle: 'italic'
          });
          
          // Descripción
          if (exp.description) {
            currentY = addText(exp.description, margin, currentY, {
              fontSize: 10
            });
          }
          
          currentY += 8;
          
          // Línea separadora si no es el último
          if (index < cvData.work_experience.length - 1) {
            pdf.setDrawColor(200, 200, 200);
            pdf.line(margin, currentY, pageWidth - margin, currentY);
            currentY += 5;
          }
        });
      }

      // Educación
      if (cvData.education && cvData.education.length > 0) {
        currentY = addSection('EDUCACIÓN', currentY);

        cvData.education.forEach((edu, index) => {
          currentY = addText(edu.degree, margin, currentY, {
            fontSize: 14,
            fontStyle: 'bold'
          });
          
          const dateRange = `${edu.start_date} - ${edu.end_date || 'Presente'}`;
          currentY = addText(`${edu.institution} | ${dateRange}`, margin, currentY, {
            fontSize: 11,
            fontStyle: 'italic'
          });
          
          if (edu.description) {
            currentY = addText(edu.description, margin, currentY, {
              fontSize: 10
            });
          }
          
          currentY += 8;
          
          if (index < cvData.education.length - 1) {
            pdf.setDrawColor(200, 200, 200);
            pdf.line(margin, currentY, pageWidth - margin, currentY);
            currentY += 5;
          }
        });
      }

      // Habilidades
      if (cvData.skills && cvData.skills.length > 0) {
        currentY = addSection('HABILIDADES', currentY);

        const skillsText = cvData.skills.map(skill => skill.skill_name || skill.name).join(' • ');
        currentY = addText(skillsText, margin, currentY, {
          fontSize: 11
        });
        currentY += 10;
      }

      // Idiomas
      if (cvData.languages && cvData.languages.length > 0) {
        currentY = addSection('IDIOMAS', currentY);

        cvData.languages.forEach(lang => {
          currentY = addText(`${lang.language}: ${lang.level}`, margin, currentY, {
            fontSize: 11
          });
        });
        currentY += 10;
      }

      // Certificaciones
      if (cvData.certifications && cvData.certifications.length > 0) {
        currentY = addSection('CERTIFICACIONES', currentY);

        cvData.certifications.forEach(cert => {
          currentY = addText(cert.name, margin, currentY, {
            fontSize: 12,
            fontStyle: 'bold'
          });
          currentY = addText(`${cert.issuer} | ${cert.date}`, margin, currentY, {
            fontSize: 10,
            fontStyle: 'italic'
          });
          currentY += 5;
        });
      }

      // Footer
      pdf.setTextColor(128, 128, 128);
      pdf.setFontSize(8);
      pdf.text('Generado con CV Master', margin, pageHeight - 10);

      // Descargar PDF
      pdf.save(`${fileName}.pdf`);

      // Actualizar contador si se proporciona cvId
      if (cvData.cv?.id) {
        await updateDownloadCount(cvData.cv.id);
      }

      return { success: true };
    } catch (error) {
      console.error('Error generating professional PDF:', error);
      setError(error.message);
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    generateProfessionalPDF,
    updateDownloadCount
  };
}; 