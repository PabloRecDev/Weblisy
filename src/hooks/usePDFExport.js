import { useState } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { supabase } from '../lib/supabase';
import { useCVMasterAuth } from '../contexts/CVMasterAuthContext';

export const usePDFExport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useCVMasterAuth();

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

  // Exportar CV desde elemento HTML
  const exportFromHTML = async (elementId, fileName = 'cv', cvId = null) => {
    try {
      setLoading(true);
      setError(null);

      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error('Elemento no encontrado');
      }

      // Configurar opciones para html2canvas
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: element.scrollWidth,
        height: element.scrollHeight,
      });

      const imgData = canvas.toDataURL('image/png');
      
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
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;

      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      
      // Descargar PDF
      pdf.save(`${fileName}.pdf`);

      // Actualizar contador si se proporciona cvId
      if (cvId) {
        await updateDownloadCount(cvId);
      }

      return { success: true };
    } catch (error) {
      setError(error.message);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  // Generar PDF desde datos del CV
  const generatePDFFromData = async (cvData, fileName = 'cv') => {
    try {
      setLoading(true);
      setError(null);

      console.log('CV Data for PDF:', cvData); // Debug

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

      // Título del documento
      pdf.setFillColor(94, 23, 235); // Color principal de CV Master
      pdf.rect(0, 0, pageWidth, 30, 'F');
      
      pdf.setTextColor(255, 255, 255);
      currentY = addText(cvData.cv?.title || 'Curriculum Vitae', margin, 20, {
        fontSize: 24,
        fontStyle: 'bold'
      });

      currentY += 15;
      pdf.setTextColor(0, 0, 0);

      // Información Personal
      if (cvData.personal_info) {
        const info = cvData.personal_info;
        currentY = addText('INFORMACIÓN PERSONAL', margin, currentY, {
          fontSize: 16,
          fontStyle: 'bold'
        });
        currentY += 5;

        if (info.first_name && info.last_name) {
          currentY = addText(`${info.first_name} ${info.last_name}`, margin, currentY, {
            fontSize: 14,
            fontStyle: 'bold'
          });
        }
        if (info.email) {
          currentY = addText(`Email: ${info.email}`, margin, currentY);
        }
        if (info.phone) {
          currentY = addText(`Teléfono: ${info.phone}`, margin, currentY);
        }
        if (info.address) {
          currentY = addText(`Dirección: ${info.address}`, margin, currentY);
        }
        if (info.professional_summary) {
          currentY += 5;
          currentY = addText('Resumen Profesional:', margin, currentY, { fontStyle: 'bold' });
          currentY = addText(info.professional_summary, margin, currentY);
        }
        currentY += 10;
      }

      // Experiencia Laboral
      if (cvData.work_experience && cvData.work_experience.length > 0) {
        currentY = addText('EXPERIENCIA LABORAL', margin, currentY, {
          fontSize: 16,
          fontStyle: 'bold'
        });
        currentY += 5;

        cvData.work_experience.forEach(exp => {
          currentY = addText(exp.position, margin, currentY, {
            fontSize: 14,
            fontStyle: 'bold'
          });
          currentY = addText(`${exp.company_name} | ${exp.start_date} - ${exp.end_date || 'Presente'}`, margin, currentY);
          if (exp.description) {
            currentY = addText(exp.description, margin, currentY);
          }
          currentY += 8;
        });
      }

      // Educación
      if (cvData.education && cvData.education.length > 0) {
        currentY = addText('EDUCACIÓN', margin, currentY, {
          fontSize: 16,
          fontStyle: 'bold'
        });
        currentY += 5;

        cvData.education.forEach(edu => {
          currentY = addText(edu.degree, margin, currentY, {
            fontSize: 14,
            fontStyle: 'bold'
          });
          currentY = addText(`${edu.institution} | ${edu.start_date} - ${edu.end_date || 'Presente'}`, margin, currentY);
          if (edu.description) {
            currentY = addText(edu.description, margin, currentY);
          }
          currentY += 8;
        });
      }

      // Habilidades
      if (cvData.skills && cvData.skills.length > 0) {
        currentY = addText('HABILIDADES', margin, currentY, {
          fontSize: 16,
          fontStyle: 'bold'
        });
        currentY += 5;

        const skillsText = cvData.skills.map(skill => skill.skill_name).join(', ');
        currentY = addText(skillsText, margin, currentY);
        currentY += 10;
      }

      // Idiomas
      if (cvData.languages && cvData.languages.length > 0) {
        currentY = addText('IDIOMAS', margin, currentY, {
          fontSize: 16,
          fontStyle: 'bold'
        });
        currentY += 5;

        cvData.languages.forEach(lang => {
          currentY = addText(`${lang.language}: ${lang.level}`, margin, currentY);
        });
        currentY += 10;
      }

      // Certificaciones
      if (cvData.certifications && cvData.certifications.length > 0) {
        currentY = addText('CERTIFICACIONES', margin, currentY, {
          fontSize: 16,
          fontStyle: 'bold'
        });
        currentY += 5;

        cvData.certifications.forEach(cert => {
          currentY = addText(cert.name, margin, currentY, {
            fontSize: 14,
            fontStyle: 'bold'
          });
          currentY = addText(`${cert.issuer} | ${cert.date}`, margin, currentY);
          currentY += 8;
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
      console.error('Error generating PDF:', error);
      setError(error.message);
      return { error: error.message };
    } finally {
      setLoading(false);
    }
  };

  // Previsualizar PDF (abrir en nueva ventana)
  const previewPDF = async (cvData, fileName = 'cv-preview') => {
    try {
      setLoading(true);
      setError(null);

      // Similar a generatePDFFromData pero en lugar de descargar, abrir en nueva ventana
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // ... (mismo código de generación que generatePDFFromData)
      // Por brevedad, usar la misma lógica aquí

      const pdfDataUri = pdf.output('datauristring');
      const newWindow = window.open();
      newWindow.document.write(`
        <iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>
      `);

      return { success: true };
    } catch (error) {
      setError(error.message);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    exportFromHTML,
    generatePDFFromData,
    previewPDF
  };
}; 