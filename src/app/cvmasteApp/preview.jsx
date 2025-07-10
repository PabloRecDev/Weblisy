import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download, Edit, ArrowLeft, Eye, Share2, Loader2 } from 'lucide-react';
import CvmasteAppLayout from './layout';
import CVPreview from '../../components/CVPreview';
import { useCVData } from '../../hooks/useCVData';
import { usePDFExport } from '../../hooks/usePDFExport';
import { useCVMasterAuth } from '../../contexts/CVMasterAuthContext';

export default function CVPreviewPage() {
  const { cvId } = useParams();
  const navigate = useNavigate();
  const { user } = useCVMasterAuth();
  const { getCompleteCV, incrementViewCount } = useCVData();
  const { generatePDFFromData, exportFromHTML, loading: pdfLoading } = usePDFExport();
  
  const [cvData, setCvData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  useEffect(() => {
    const loadCVData = async () => {
      if (!cvId) return;
      
      try {
        setLoading(true);
        const data = await getCompleteCV(cvId);
        
        if (data) {
          setCvData(data);
          // Incrementar contador de vistas
          await incrementViewCount(cvId);
        } else {
          setError('CV no encontrado');
        }
      } catch (error) {
        console.error('Error loading CV:', error);
        setError('Error al cargar el CV');
      } finally {
        setLoading(false);
      }
    };

    loadCVData();
  }, [cvId, getCompleteCV, incrementViewCount]);

  // Función para exportar como PDF usando datos
  const handleExportPDF = async () => {
    if (!cvData) return;
    
    try {
      const fileName = `${cvData.cv.title.toLowerCase().replace(/\s+/g, '-')}`;
      const result = await generatePDFFromData(cvData, fileName);
      
      if (result.error) {
        alert('Error al generar el PDF: ' + result.error);
      }
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Error al exportar el PDF');
    }
  };

  // Función para exportar como PDF usando HTML
  const handleExportFromHTML = async () => {
    try {
      const fileName = `${cvData.cv.title.toLowerCase().replace(/\s+/g, '-')}`;
      const result = await exportFromHTML('cv-preview-container', fileName, cvId);
      
      if (result.error) {
        alert('Error al generar el PDF: ' + result.error);
      }
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Error al exportar el PDF');
    }
  };

  if (loading) {
    return (
      <CvmasteAppLayout>
        <div style={{ 
          minHeight: '400px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <div style={{ textAlign: 'center' }}>
            <Loader2 size={48} className="animate-spin" style={{ color: '#5e17eb', marginBottom: 16 }} />
            <p style={{ color: '#b0b0b0' }}>Cargando vista previa del CV...</p>
          </div>
        </div>
      </CvmasteAppLayout>
    );
  }

  if (error || !cvData) {
    return (
      <CvmasteAppLayout>
        <div style={{ 
          minHeight: '400px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ color: '#ff4444', marginBottom: 16 }}>{error || 'CV no encontrado'}</p>
            <button 
              onClick={() => navigate('/cvmasterApp')}
              style={{
                padding: '10px 20px',
                background: '#5e17eb',
                color: '#fff',
                border: 'none',
                borderRadius: 6,
                cursor: 'pointer'
              }}
            >
              Volver al Dashboard
            </button>
          </div>
        </div>
      </CvmasteAppLayout>
    );
  }

  return (
    <CvmasteAppLayout>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: 24,
          background: '#171717',
          padding: 20,
          borderRadius: 12,
          border: '1px solid #333'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button
              onClick={() => navigate('/cvmasterApp')}
              style={{
                background: '#2a2a2a',
                border: '1px solid #444',
                color: '#fff',
                padding: '8px 12px',
                borderRadius: 6,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}
            >
              <ArrowLeft size={16} />
              Volver
            </button>
            <div>
              <h1 style={{ color: '#fff', fontSize: 24, fontWeight: 700, margin: 0 }}>
                Vista Previa: {cvData.cv.title}
              </h1>
              <p style={{ color: '#b0b0b0', fontSize: 14, margin: '4px 0 0 0' }}>
                Revisa tu CV antes de exportar o compartir
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            {/* Selector de plantilla */}
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              style={{
                background: '#2a2a2a',
                border: '1px solid #444',
                color: '#fff',
                padding: '8px 12px',
                borderRadius: 6,
                fontSize: 14
              }}
            >
              <option value="modern">Moderna</option>
              <option value="classic">Clásica</option>
            </select>

            <button
              onClick={() => navigate(`/cvmasterApp/crear/${cvId}`)}
              style={{
                background: '#5e17eb',
                color: '#fff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: 6,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 14,
                fontWeight: 500
              }}
            >
              <Edit size={16} />
              Editar
            </button>

            <button
              onClick={handleExportPDF}
              disabled={pdfLoading}
              style={{
                background: pdfLoading ? '#16a34a80' : '#16a34a',
                color: '#fff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: 6,
                cursor: pdfLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 14,
                fontWeight: 500,
                opacity: pdfLoading ? 0.7 : 1
              }}
            >
              {pdfLoading ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Download size={16} />
              )}
              {pdfLoading ? 'Generando...' : 'Exportar PDF'}
            </button>

            <button
              style={{
                background: '#2a2a2a',
                border: '1px solid #444',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: 6,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 14,
                fontWeight: 500
              }}
            >
              <Share2 size={16} />
              Compartir
            </button>
          </div>
        </div>

        {/* Vista previa del CV */}
        <div style={{ 
          background: '#f5f5f5',
          borderRadius: 12,
          padding: 24,
          minHeight: '800px'
        }}>
          <div id="cv-preview-container">
            <CVPreview cvData={cvData} templateStyle={selectedTemplate} />
          </div>
        </div>

        {/* Información adicional */}
        <div style={{
          marginTop: 24,
          background: '#171717',
          padding: 20,
          borderRadius: 12,
          border: '1px solid #333'
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: 20 
          }}>
            <div>
              <p style={{ color: '#b0b0b0', fontSize: 14, margin: '0 0 4px 0' }}>Estado</p>
              <p style={{ 
                color: '#fff', 
                fontSize: 16, 
                fontWeight: 600, 
                margin: 0,
                textTransform: 'capitalize'
              }}>
                {cvData.cv.status === 'completed' ? 'Completado' : 
                 cvData.cv.status === 'in_progress' ? 'En progreso' : 
                 cvData.cv.status === 'draft' ? 'Borrador' : 'Archivado'}
              </p>
            </div>
            <div>
              <p style={{ color: '#b0b0b0', fontSize: 14, margin: '0 0 4px 0' }}>Última actualización</p>
              <p style={{ color: '#fff', fontSize: 16, fontWeight: 600, margin: 0 }}>
                {new Date(cvData.cv.updated_at).toLocaleDateString('es-ES')}
              </p>
            </div>
            <div>
              <p style={{ color: '#b0b0b0', fontSize: 14, margin: '0 0 4px 0' }}>Descargas</p>
              <p style={{ color: '#fff', fontSize: 16, fontWeight: 600, margin: 0 }}>
                {cvData.cv.downloads_count || 0}
              </p>
            </div>
            <div>
              <p style={{ color: '#b0b0b0', fontSize: 14, margin: '0 0 4px 0' }}>Vistas</p>
              <p style={{ color: '#fff', fontSize: 16, fontWeight: 600, margin: 0 }}>
                {cvData.cv.views_count || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </CvmasteAppLayout>
  );
} 