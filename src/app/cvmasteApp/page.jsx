import React, { useEffect, useState } from 'react';
import { 
  FileText, 
  Download, 
  Palette, 
  Eye, 
  Plus, 
  Upload, 
  Bot, 
  FileDown,
  CheckCircle,
  Clock,
  ExternalLink,
  Loader2
} from 'lucide-react';
import CvmasteAppLayout from './layout';
import { useCVMasterAuth } from '../../contexts/CVMasterAuthContext';
import { useCVs } from '../../hooks/useCVs';
import { usePDFExport } from '../../hooks/usePDFExport';
import { useCVData } from '../../hooks/useCVData';
import { Link } from 'react-router-dom';

export default function CvmasteAppHome() {
  const { user, profile, getUserStats } = useCVMasterAuth();
  const { cvs, loading: cvsLoading } = useCVs();
  const { generatePDFFromData, loading: pdfLoading } = usePDFExport();
  const { getCompleteCV } = useCVData();
  const [userStats, setUserStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exportingCVId, setExportingCVId] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      if (user) {
        const stats = await getUserStats();
        setUserStats(stats);
      }
      setLoading(false);
    };

    loadStats();
  }, [user, getUserStats]);

  // Función para exportar CV a PDF
  const handleExportPDF = async (cvId, cvTitle) => {
    try {
      setExportingCVId(cvId);
      
      // Obtener datos completos del CV
      const completeCV = await getCompleteCV(cvId);
      if (!completeCV) {
        alert('Error al obtener los datos del CV');
        return;
      }

      // Generar PDF
      const fileName = `${cvTitle.toLowerCase().replace(/\s+/g, '-')}`;
      const result = await generatePDFFromData(completeCV, fileName);
      
      if (result.error) {
        alert('Error al generar el PDF: ' + result.error);
      }
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Error al exportar el PDF');
    } finally {
      setExportingCVId(null);
    }
  };

  const stats = [
    { 
      title: 'CVs Creados', 
      value: userStats?.totalCvs?.toString() || '0', 
      icon: <FileText size={24} />, 
      color: '#5e17eb' 
    },
    { 
      title: 'Descargas', 
      value: userStats?.totalDownloads?.toString() || '0', 
      icon: <Download size={24} />, 
      color: '#2e7d32' 
    },
    { 
      title: 'Borradores', 
      value: userStats?.draftCvs?.toString() || '0', 
      icon: <Palette size={24} />, 
      color: '#ed6c02' 
    },
    { 
      title: 'Vistas', 
      value: userStats?.totalViews?.toString() || '0', 
      icon: <Eye size={24} />, 
      color: '#9c27b0' 
    }
  ];

  const recentCVs = cvs.slice(0, 5).map(cv => ({
    id: cv.id,
    name: cv.title,
    date: new Date(cv.updated_at).toLocaleDateString('es-ES'),
    status: cv.status === 'completed' ? 'Completado' : 
            cv.status === 'in_progress' ? 'En progreso' : 
            cv.status === 'draft' ? 'Borrador' : 'Archivado'
  }));

  if (loading || cvsLoading) {
    return (
      <CvmasteAppLayout>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '40px', height: '40px', border: '3px solid #5e17eb', borderTop: '3px solid transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }}></div>
            <p style={{ color: '#b0b0b0' }}>Cargando dashboard...</p>
          </div>
        </div>
      </CvmasteAppLayout>
    );
  }

  return (
    <CvmasteAppLayout>
      <div style={{ width: '100%' }}>
        {/* Header */}
        <div style={{ marginBottom: 40, textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 700, color: '#fff', marginBottom: 8 }}>
            ¡Bienvenido{profile?.first_name ? ` ${profile.first_name}` : ''}! 👋
          </h1>
          <p style={{ color: '#b0b0b0', fontSize: 'clamp(14px, 2vw, 16px)' }}>
            Gestiona tus currículums profesionales de forma eficiente
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: 20, 
          marginBottom: 40 
        }}>
          {stats.map((stat, index) => (
            <div key={index} style={{ 
              background: '#171717', 
              borderRadius: 12, 
              padding: 20, 
              border: `1px solid #333`,
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              textAlign: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                <div style={{ color: stat.color }}>
                  {stat.icon}
                </div>
              </div>
              <div style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, color: '#fff', marginBottom: 4 }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 14, color: '#b0b0b0' }}>{stat.title}</div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: 24,
          marginBottom: 40
        }}>
          {/* Quick Actions */}
          <div style={{ 
            background: '#171717', 
            borderRadius: 12, 
            padding: 24, 
            border: '1px solid #333' 
          }}>
            <h2 style={{ fontSize: 20, fontWeight: 600, color: '#fff', marginBottom: 20 }}>
              Acciones Rápidas
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href="/cvmasterApp/crear" style={{ 
                background: 'linear-gradient(135deg, #5e17eb 0%, #4c14c7 100%)', 
                color: '#fff', 
                padding: '14px 20px', 
                borderRadius: 8, 
                textDecoration: 'none', 
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease'
              }}>
                <span>Crear nuevo CV</span>
                <Plus size={20} />
              </a>
              <div style={{ 
                background: '#2a2a2a', 
                color: '#b0b0b0', 
                padding: '14px 20px', 
                borderRadius: 8, 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid #444'
              }}>
                <span>Importar CV existente</span>
                <Upload size={20} />
              </div>
              <div style={{ 
                background: '#2a2a2a', 
                color: '#b0b0b0', 
                padding: '14px 20px', 
                borderRadius: 8, 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid #444'
              }}>
                <span>Generar con IA</span>
                <Bot size={20} />
              </div>
            </div>
          </div>

          {/* Recent CVs */}
          <div style={{ 
            background: '#171717', 
            borderRadius: 12, 
            padding: 24, 
            border: '1px solid #333' 
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontSize: 20, fontWeight: 600, color: '#fff', margin: 0 }}>
                CVs Recientes
              </h2>
              {recentCVs.length > 0 && (
                <Link 
                  to="/cvmasterApp/mis-cvs"
                  style={{ 
                    color: '#5e17eb', 
                    fontSize: 14, 
                    textDecoration: 'none',
                    fontWeight: 500
                  }}
                >
                  Ver todos
                </Link>
              )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {recentCVs.length > 0 ? (
                recentCVs.map((cv, index) => (
                  <div 
                    key={index} 
                    style={{ 
                      padding: 16, 
                      background: '#2a2a2a', 
                      borderRadius: 8, 
                      border: '1px solid #444',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <div style={{ fontWeight: 600, color: '#fff' }}>{cv.name}</div>
                      <span style={{ 
                        fontSize: 12, 
                        padding: '4px 8px', 
                        borderRadius: 4, 
                        background: cv.status === 'Completado' ? '#2e7d32' : 
                                   cv.status === 'En progreso' ? '#ed6c02' : '#666',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 4
                      }}>
                        {cv.status === 'Completado' ? <CheckCircle size={12} /> : <Clock size={12} />}
                        {cv.status}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: '#b0b0b0', marginBottom: 12 }}>{cv.date}</div>
                    
                    {/* Botones de acción */}
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      <Link 
                        to={`/cvmasterApp/crear/${cv.id}`}
                        style={{
                          padding: '8px 16px',
                          background: '#5e17eb',
                          color: '#fff',
                          borderRadius: 6,
                          textDecoration: 'none',
                          fontSize: 12,
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          transition: 'background 0.2s ease'
                        }}
                      >
                        <Eye size={14} />
                        Editar
                      </Link>
                      
                      <Link
                        to={`/cvmasterApp/preview/${cv.id}`}
                        style={{
                          padding: '8px 16px',
                          background: '#2a2a2a',
                          color: '#fff',
                          border: '1px solid #444',
                          borderRadius: 6,
                          fontSize: 12,
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          textDecoration: 'none',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Eye size={14} />
                        Vista previa
                      </Link>
                      
                      <button
                        onClick={() => handleExportPDF(cv.id, cv.name)}
                        disabled={exportingCVId === cv.id}
                        style={{
                          padding: '8px 16px',
                          background: exportingCVId === cv.id ? '#16a34a80' : '#16a34a',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 6,
                          fontSize: 12,
                          fontWeight: 500,
                          cursor: exportingCVId === cv.id ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                          opacity: exportingCVId === cv.id ? 0.7 : 1,
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {exportingCVId === cv.id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Download size={14} />
                        )}
                        {exportingCVId === cv.id ? 'Generando...' : 'PDF'}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div style={{ 
                  padding: 32, 
                  textAlign: 'center',
                  background: '#2a2a2a',
                  borderRadius: 8,
                  border: '1px solid #444'
                }}>
                  <FileText size={48} style={{ color: '#666', margin: '0 auto 16px' }} />
                  <div style={{ color: '#b0b0b0', marginBottom: 16 }}>
                    Aún no has creado ningún CV
                  </div>
                  <Link 
                    to="/cvmasterApp/crear"
                    style={{ 
                      background: '#5e17eb', 
                      color: '#fff', 
                      padding: '10px 20px', 
                      borderRadius: 6, 
                      textDecoration: 'none',
                      fontWeight: 500,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8
                    }}
                  >
                    <Plus size={16} />
                    Crear mi primer CV
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div style={{ 
          background: '#171717', 
          borderRadius: 12, 
          padding: 24, 
          border: '1px solid #333' 
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 600, color: '#fff', marginBottom: 20, textAlign: 'center' }}>
            Características Destacadas
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: 20 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16 }}>
              <div style={{ color: '#5e17eb' }}><Bot size={24} /></div>
              <div>
                <div style={{ fontWeight: 600, color: '#fff', marginBottom: 4 }}>IA Integrada</div>
                <div style={{ fontSize: 14, color: '#b0b0b0' }}>Sugerencias inteligentes para mejorar tu CV</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16 }}>
              <div style={{ color: '#5e17eb' }}><FileDown size={24} /></div>
              <div>
                <div style={{ fontWeight: 600, color: '#fff', marginBottom: 4 }}>Exportación PDF</div>
                <div style={{ fontSize: 14, color: '#b0b0b0' }}>Genera CVs profesionales en formato PDF</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16 }}>
              <div style={{ color: '#5e17eb' }}><Palette size={24} /></div>
              <div>
                <div style={{ fontWeight: 600, color: '#fff', marginBottom: 4 }}>Plantillas Profesionales</div>
                <div style={{ fontSize: 14, color: '#b0b0b0' }}>Múltiples diseños para diferentes industrias</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CvmasteAppLayout>
  );
} 