import React, { useState, useEffect } from 'react';
import { FileText, Download, Edit, Trash2, Eye, Calendar, Search, Filter, Loader2, ExternalLink, MoreVertical } from 'lucide-react';
import CvmasteAppLayout from './layout';
import { useCVs } from '../../hooks/useCVs';
import { usePDFExport } from '../../hooks/usePDFExport';
import { useSimplePDFExport } from '../../hooks/useSimplePDFExport';
import { useCVData } from '../../hooks/useCVData';
import { useCVMasterAuth } from '../../contexts/CVMasterAuthContext';
import CustomAlert from '../../components/CustomAlert';
import { Link } from 'react-router-dom';

export default function MisCVs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('todos');
  const [exportingCVId, setExportingCVId] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  
  // Estados para alertas personalizadas
  const [alertConfig, setAlertConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
    onConfirm: null,
    confirmText: 'Confirmar',
    cancelText: 'Cancelar',
    showCancel: true
  });
  
  const { user } = useCVMasterAuth();
  const { cvs, loading: cvsLoading, deleteCV } = useCVs();
  const { generatePDFFromData, loading: pdfLoading } = usePDFExport();
  const { generateProfessionalPDF } = useSimplePDFExport();
  const { getCompleteCV } = useCVData();

  // Transformar los datos de CVs al formato esperado
  const transformedCVs = cvs.map(cv => ({
    id: cv.id,
    nombre: cv.title,
    fechaCreacion: new Date(cv.created_at).toLocaleDateString('es-ES'),
    fechaModificacion: new Date(cv.updated_at).toLocaleDateString('es-ES'),
    estado: cv.status === 'completed' ? 'Completado' : 
            cv.status === 'in_progress' ? 'En progreso' : 
            cv.status === 'draft' ? 'Borrador' : 'Archivado',
    descargas: cv.downloads_count || 0,
    plantilla: cv.template_id ? 'Profesional' : 'Sin plantilla',
    originalStatus: cv.status
  }));

  // Función para mostrar alerta personalizada
  const showAlert = (config) => {
    setAlertConfig({
      ...config,
      isOpen: true
    });
  };

  // Función para cerrar alerta
  const closeAlert = () => {
    setAlertConfig(prev => ({ ...prev, isOpen: false }));
  };

  // Función para exportar CV a PDF
  const handleExportPDF = async (cvId, cvTitle) => {
    try {
      setExportingCVId(cvId);
      
      // Obtener datos completos del CV
      const completeCV = await getCompleteCV(cvId);
      if (!completeCV) {
        showAlert({
          title: 'Error',
          message: 'No se pudieron obtener los datos del CV. Inténtalo de nuevo.',
          type: 'error',
          confirmText: 'Entendido',
          showCancel: false
        });
        return;
      }

      // Generar PDF profesional
      const fileName = `${cvTitle.toLowerCase().replace(/\s+/g, '-')}`;
      const result = await generateProfessionalPDF(completeCV, fileName);
      
      if (result.error) {
        showAlert({
          title: 'Error al generar PDF',
          message: `No se pudo generar el PDF: ${result.error}`,
          type: 'error',
          confirmText: 'Entendido',
          showCancel: false
        });
      } else {
        showAlert({
          title: 'PDF generado exitosamente',
          message: 'Tu CV se ha exportado como PDF correctamente.',
          type: 'success',
          confirmText: 'Perfecto',
          showCancel: false
        });
      }
    } catch (error) {
      console.error('Error exporting PDF:', error);
      showAlert({
        title: 'Error al exportar PDF',
        message: 'Ocurrió un error inesperado al exportar el PDF. Inténtalo de nuevo.',
        type: 'error',
        confirmText: 'Entendido',
        showCancel: false
      });
    } finally {
      setExportingCVId(null);
    }
  };

  // Función para eliminar CV
  const handleDeleteCV = async (cvId) => {
    const cvToDelete = transformedCVs.find(cv => cv.id === cvId);
    
    showAlert({
      title: 'Eliminar CV',
      message: `¿Estás seguro de que quieres eliminar el CV "${cvToDelete?.nombre}"? Esta acción no se puede deshacer.`,
      type: 'warning',
      confirmText: 'Sí, eliminar',
      cancelText: 'Cancelar',
      onConfirm: async () => {
        try {
          await deleteCV(cvId);
          setOpenMenuId(null); // Cerrar menú después de eliminar
          showAlert({
            title: 'CV eliminado',
            message: 'El CV se ha eliminado correctamente.',
            type: 'success',
            confirmText: 'Entendido',
            showCancel: false
          });
        } catch (error) {
          showAlert({
            title: 'Error al eliminar',
            message: 'No se pudo eliminar el CV. Inténtalo de nuevo.',
            type: 'error',
            confirmText: 'Entendido',
            showCancel: false
          });
        }
      }
    });
  };

  // Función para manejar el menú
  const handleMenuToggle = (cvId) => {
    setOpenMenuId(openMenuId === cvId ? null : cvId);
  };

  // Función para cerrar menú al hacer clic fuera
  const handleClickOutside = (event) => {
    if (!event.target.closest('.menu-container')) {
      setOpenMenuId(null);
    }
  };

  // Añadir event listener para cerrar menú
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const filteredCVs = transformedCVs.filter(cv => {
    const matchesSearch = cv.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'todos' || cv.originalStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (estado) => {
    switch (estado) {
      case 'Completado': return '#2e7d32';
      case 'En progreso': return '#ed6c02';
      case 'Borrador': return '#757575';
      default: return '#757575';
    }
  };

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
    padding: '8px 12px',
    borderRadius: 6,
    border: 'none',
    fontWeight: 500,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    transition: 'all 0.3s ease',
    fontSize: 14
  };

  return (
    <CvmasteAppLayout>
      <div style={{ width: '100%' }}>
        {/* Header */}
        <div style={{ marginBottom: 32, textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 700, color: '#fff', marginBottom: 8 }}>
            Mis CVs
          </h1>
          <p style={{ color: '#b0b0b0', fontSize: 'clamp(14px, 2vw, 16px)' }}>
            Gestiona y organiza todos tus currículums profesionales
          </p>
        </div>

        {/* Filters and Search */}
        <div style={{ 
          background: '#171717', 
          borderRadius: 12, 
          padding: 24, 
          border: '1px solid #333',
          marginBottom: 24
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: 16,
            alignItems: 'end'
          }}>
            <div>
              <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                Buscar CV
              </label>
              <div style={{ position: 'relative' }}>
                <Search size={20} style={{ 
                  position: 'absolute', 
                  left: 12, 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: '#b0b0b0' 
                }} />
                <input
                  type="text"
                  style={{ ...inputStyle, paddingLeft: 44 }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por nombre..."
                />
              </div>
            </div>
            <div>
              <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                Filtrar por estado
              </label>
              <div style={{ position: 'relative' }}>
                <Filter size={20} style={{ 
                  position: 'absolute', 
                  left: 12, 
                  top: '50%', 
                  transform: 'translateY(-50%)', 
                  color: '#b0b0b0' 
                }} />
                <select
                  style={{ ...inputStyle, paddingLeft: 44 }}
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="todos">Todos</option>
                  <option value="completed">Completado</option>
                  <option value="in_progress">En progreso</option>
                  <option value="draft">Borrador</option>
                  <option value="archived">Archivado</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
          gap: 16, 
          marginBottom: 24 
        }}>
          <div style={{ 
            background: '#171717', 
            borderRadius: 12, 
            padding: 20, 
            border: '1px solid #333',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#5e17eb', marginBottom: 4 }}>
              {transformedCVs.length}
            </div>
            <div style={{ fontSize: 14, color: '#b0b0b0' }}>Total CVs</div>
          </div>
          <div style={{ 
            background: '#171717', 
            borderRadius: 12, 
            padding: 20, 
            border: '1px solid #333',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#2e7d32', marginBottom: 4 }}>
              {transformedCVs.filter(cv => cv.estado === 'Completado').length}
            </div>
            <div style={{ fontSize: 14, color: '#b0b0b0' }}>Completados</div>
          </div>
          <div style={{ 
            background: '#171717', 
            borderRadius: 12, 
            padding: 20, 
            border: '1px solid #333',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#ed6c02', marginBottom: 4 }}>
              {transformedCVs.filter(cv => cv.estado === 'En progreso').length}
            </div>
            <div style={{ fontSize: 14, color: '#b0b0b0' }}>En progreso</div>
          </div>
          <div style={{ 
            background: '#171717', 
            borderRadius: 12, 
            padding: 20, 
            border: '1px solid #333',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: '#9c27b0', marginBottom: 4 }}>
              {transformedCVs.reduce((total, cv) => total + cv.descargas, 0)}
            </div>
            <div style={{ fontSize: 14, color: '#b0b0b0' }}>Descargas</div>
          </div>
        </div>

        {/* CVs List */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: 20 
        }}>
          {filteredCVs.map((cv) => (
            <div key={cv.id} style={{ 
              background: '#171717', 
              borderRadius: 12, 
              padding: 24, 
              border: '1px solid #333',
              transition: 'all 0.3s ease'
            }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}>
                <div style={{ 
                  background: '#5e17eb', 
                  borderRadius: 8, 
                  padding: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FileText size={24} color="#fff" />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    color: '#fff', 
                    fontSize: 16, 
                    fontWeight: 600, 
                    marginBottom: 4,
                    lineHeight: 1.3
                  }}>
                    {cv.nombre}
                  </h3>
                  <div style={{ 
                    display: 'inline-block',
                    padding: '4px 8px', 
                    borderRadius: 4, 
                    background: getStatusColor(cv.estado),
                    color: '#fff',
                    fontSize: 12,
                    fontWeight: 500
                  }}>
                    {cv.estado}
                  </div>
                </div>
              </div>

              {/* Info */}
              <div style={{ marginBottom: 16 }}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
                  gap: 12,
                  fontSize: 14,
                  color: '#b0b0b0'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <Calendar size={14} />
                      <span>Creado</span>
                    </div>
                    <div style={{ color: '#fff', fontSize: 13 }}>{cv.fechaCreacion}</div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <Edit size={14} />
                      <span>Modificado</span>
                    </div>
                    <div style={{ color: '#fff', fontSize: 13 }}>{cv.fechaModificacion}</div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <Download size={14} />
                      <span>Descargas</span>
                    </div>
                    <div style={{ color: '#fff', fontSize: 13 }}>{cv.descargas}</div>
                  </div>
                </div>
                <div style={{ marginTop: 12, fontSize: 14, color: '#b0b0b0' }}>
                  <strong style={{ color: '#5e17eb' }}>Plantilla:</strong> {cv.plantilla}
                </div>
              </div>

              {/* Actions */}
              <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-end',
                position: 'relative'
              }}>
                {/* Menú de 3 puntos */}
                <div className="menu-container" style={{ position: 'relative' }}>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuToggle(cv.id);
                    }}
                    style={{ 
                      ...buttonStyle, 
                      background: '#2a2a2a', 
                      color: '#fff',
                      border: '1px solid #444',
                      padding: '8px 12px',
                      minWidth: 'auto',
                      borderRadius: 8
                    }}
                  >
                    <MoreVertical size={18} />
                  </button>
                  
                  {/* Menú desplegable glass */}
                  {openMenuId === cv.id && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: 8,
                      background: 'rgba(23, 23, 23, 0.95)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 8,
                      padding: '8px 0',
                      minWidth: 160,
                      zIndex: 1000,
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                    }}>
                      <Link
                        to={`/cvmasterApp/crear/${cv.id}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          padding: '12px 16px',
                          color: '#fff',
                          textDecoration: 'none',
                          fontSize: 14,
                          transition: 'all 0.2s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.target.style.background = 'rgba(94, 23, 235, 0.1)'}
                        onMouseLeave={(e) => e.target.style.background = 'transparent'}
                        onClick={() => setOpenMenuId(null)}
                      >
                        <Edit size={16} />
                        Editar CV
                      </Link>
                      
                      <Link
                        to={`/cvmasterApp/preview/${cv.id}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          padding: '12px 16px',
                          color: '#fff',
                          textDecoration: 'none',
                          fontSize: 14,
                          transition: 'all 0.2s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.target.style.background = 'rgba(94, 23, 235, 0.1)'}
                        onMouseLeave={(e) => e.target.style.background = 'transparent'}
                        onClick={() => setOpenMenuId(null)}
                      >
                        <Eye size={16} />
                        Vista previa
                      </Link>
                      
                      <button
                        onClick={() => {
                          handleExportPDF(cv.id, cv.nombre);
                          setOpenMenuId(null);
                        }}
                        disabled={exportingCVId === cv.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          padding: '12px 16px',
                          color: '#fff',
                          background: 'transparent',
                          border: 'none',
                          fontSize: 14,
                          width: '100%',
                          textAlign: 'left',
                          transition: 'all 0.2s ease',
                          cursor: exportingCVId === cv.id ? 'not-allowed' : 'pointer',
                          opacity: exportingCVId === cv.id ? 0.5 : 1
                        }}
                        onMouseEnter={(e) => {
                          if (exportingCVId !== cv.id) {
                            e.target.style.background = 'rgba(94, 23, 235, 0.1)';
                          }
                        }}
                        onMouseLeave={(e) => e.target.style.background = 'transparent'}
                      >
                        {exportingCVId === cv.id ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <Download size={16} />
                        )}
                        {exportingCVId === cv.id ? 'Generando PDF...' : 'Exportar PDF'}
                      </button>
                      
                      <div style={{
                        height: '1px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        margin: '8px 0'
                      }} />
                      
                      <button
                        onClick={() => handleDeleteCV(cv.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 12,
                          padding: '12px 16px',
                          color: '#d32f2f',
                          background: 'transparent',
                          border: 'none',
                          fontSize: 14,
                          width: '100%',
                          textAlign: 'left',
                          transition: 'all 0.2s ease',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.target.style.background = 'rgba(211, 47, 47, 0.1)'}
                        onMouseLeave={(e) => e.target.style.background = 'transparent'}
                      >
                        <Trash2 size={16} />
                        Eliminar CV
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCVs.length === 0 && (
          <div style={{ 
            background: '#171717', 
            borderRadius: 12, 
            padding: 48, 
            border: '1px solid #333',
            textAlign: 'center'
          }}>
            <FileText size={48} color="#444" style={{ marginBottom: 16 }} />
            <h3 style={{ color: '#fff', fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
              No se encontraron CVs
            </h3>
            <p style={{ color: '#b0b0b0', marginBottom: 24 }}>
              {searchTerm || filterStatus !== 'todos' 
                ? 'Intenta cambiar los filtros de búsqueda' 
                : 'Crea tu primer CV para comenzar'
              }
            </p>
            <a href="/cvmasterApp/crear" style={{ 
              background: 'linear-gradient(135deg, #5e17eb 0%, #4c14c7 100%)', 
              color: '#fff', 
              padding: '12px 24px', 
              borderRadius: 8, 
              textDecoration: 'none', 
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8
            }}>
              <FileText size={20} />
              Crear nuevo CV
            </a>
          </div>
        )}
      </div>
      
      {/* Alerta personalizada */}
      <CustomAlert
        isOpen={alertConfig.isOpen}
        onClose={closeAlert}
        title={alertConfig.title}
        message={alertConfig.message}
        type={alertConfig.type}
        onConfirm={alertConfig.onConfirm}
        confirmText={alertConfig.confirmText}
        cancelText={alertConfig.cancelText}
        showCancel={alertConfig.showCancel}
      />
    </CvmasteAppLayout>
  );
} 