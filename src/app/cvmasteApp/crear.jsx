import React, { useState, useEffect } from 'react';
import { Save, Download, Eye, Bot, FileText, User, Briefcase, GraduationCap, Award, Plus, Trash2, Loader2, CheckCircle, Palette, X } from 'lucide-react';
import CvmasteAppLayout from './layout';
import { useCVs } from '../../hooks/useCVs';
import { useCVPersonalInfo } from '../../hooks/useCVs';
import { useCVMasterAuth } from '../../contexts/CVMasterAuthContext';
import { useTemplatePDFExport } from '../../hooks/useTemplatePDFExport';
import { useCVData } from '../../hooks/useCVData';
import TemplateSelector from '../../components/TemplateSelector';
import TemplatePreview from '../../components/TemplatePreview';
import { templates } from '../../components/CVTemplates';
import { useNavigate, useParams } from 'react-router-dom';

export default function CrearCV() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  
  const { user, profile } = useCVMasterAuth();
  const { createCV, updateCV, getCV, loading: cvLoading } = useCVs();
  const { generatePDFWithTemplate, loading: generatingPDF } = useTemplatePDFExport();
  const { getCompleteCV } = useCVData();
  
  const [currentCvId, setCurrentCvId] = useState(id);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [lastSaved, setLastSaved] = useState(null);
  
  // Estados para plantillas
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    personalInfo: {
      nombre: '',
      apellidos: '',
      email: '',
      telefono: '',
      direccion: '',
      linkedin: '',
      github: '',
      foto: null
    },
    experiencia: [
      { empresa: '', puesto: '', fechaInicio: '', fechaFin: '', descripcion: '' }
    ],
    educacion: [
      { institucion: '', titulo: '', fechaInicio: '', fechaFin: '', descripcion: '' }
    ],
    habilidades: [''],
    idiomas: [{ idioma: '', nivel: '' }]
  });

  // Cargar datos si estamos editando
  useEffect(() => {
    if (isEditing && id) {
      loadCVData(id);
    } else {
      // Si no estamos editando, prellenar con datos del perfil
      if (profile) {
        setFormData(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            nombre: profile.first_name || '',
            apellidos: profile.last_name || '',
            email: user?.email || '',
            telefono: profile.phone || '',
            linkedin: profile.linkedin_url || '',
            github: profile.github_url || ''
          }
        }));
      }
    }
  }, [isEditing, id, profile, user]);

  const loadCVData = async (cvId) => {
    try {
      setLoading(true);
      const { data: cvData, error } = await getCV(cvId);
      
      if (error) {
        setMessage('Error al cargar el CV');
        return;
      }

      if (cvData) {
        setFormData({
          title: cvData.title || '',
          personalInfo: {
            nombre: cvData.cv_personal_info?.[0]?.first_name || '',
            apellidos: cvData.cv_personal_info?.[0]?.last_name || '',
            email: cvData.cv_personal_info?.[0]?.email || '',
            telefono: cvData.cv_personal_info?.[0]?.phone || '',
            direccion: cvData.cv_personal_info?.[0]?.address || '',
            linkedin: cvData.cv_personal_info?.[0]?.linkedin_url || '',
            github: cvData.cv_personal_info?.[0]?.github_url || '',
            foto: cvData.cv_personal_info?.[0]?.photo_url || null
          },
          experiencia: cvData.cv_work_experience?.map(exp => ({
            empresa: exp.company_name || '',
            puesto: exp.position || '',
            fechaInicio: exp.start_date || '',
            fechaFin: exp.end_date || '',
            descripcion: exp.description || ''
          })) || [{ empresa: '', puesto: '', fechaInicio: '', fechaFin: '', descripcion: '' }],
          educacion: cvData.cv_education?.map(edu => ({
            institucion: edu.institution || '',
            titulo: edu.degree || '',
            fechaInicio: edu.start_date || '',
            fechaFin: edu.end_date || '',
            descripcion: edu.description || ''
          })) || [{ institucion: '', titulo: '', fechaInicio: '', fechaFin: '', descripcion: '' }],
          habilidades: cvData.cv_skills?.map(skill => skill.skill_name) || [''],
          idiomas: cvData.cv_languages?.map(lang => ({
            idioma: lang.language || '',
            nivel: lang.level || ''
          })) || [{ idioma: '', nivel: '' }]
        });
      }
    } catch (error) {
      console.error('Error loading CV:', error);
      setMessage('Error al cargar el CV');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCV = async () => {
    if (!formData.title.trim()) {
      setMessage('El título del CV es requerido');
      return;
    }

    if (!user) {
      setMessage('Usuario no autenticado');
      return;
    }

    if (!profile) {
      setMessage('Perfil de usuario no encontrado. Por favor, ve a Configuración y completa tu perfil.');
      return;
    }

    try {
      setLoading(true);
      setMessage('');

      console.log('=== DEBUG INFO ===');
      console.log('User:', user);
      console.log('Profile:', profile);
      console.log('Form data:', formData);
      console.log('Is editing:', isEditing);
      console.log('Current CV ID:', currentCvId);

      if (isEditing && currentCvId) {
        // Actualizar CV existente
        const { error } = await updateCV(currentCvId, {
          title: formData.title,
          status: 'draft',
          personalInfo: {
            first_name: formData.personalInfo.nombre.trim(),
            last_name: formData.personalInfo.apellidos.trim(),
            email: formData.personalInfo.email.trim(),
            phone: formData.personalInfo.telefono.trim(),
            address: formData.personalInfo.direccion.trim(),
            linkedin_url: formData.personalInfo.linkedin.trim(),
            github_url: formData.personalInfo.github.trim(),
            photo_url: formData.personalInfo.foto || null
          }
        });

        if (error) {
          setMessage(`Error al actualizar el CV: ${error}`);
          return;
        }
      } else {
        // Crear nuevo CV
        const cvData = {
          title: formData.title.trim(),
          personalInfo: {
            first_name: formData.personalInfo.nombre.trim(),
            last_name: formData.personalInfo.apellidos.trim(),
            email: formData.personalInfo.email.trim(),
            phone: formData.personalInfo.telefono.trim(),
            address: formData.personalInfo.direccion.trim(),
            linkedin_url: formData.personalInfo.linkedin.trim(),
            github_url: formData.personalInfo.github.trim(),
            photo_url: formData.personalInfo.foto || null
          }
        };

        console.log('Creating CV with data:', cvData);

        // Validar datos antes de enviar
        if (!cvData.title) {
          setMessage('El título del CV es requerido');
          return;
        }

        if (!cvData.personalInfo.first_name || !cvData.personalInfo.last_name) {
          setMessage('El nombre y apellidos son requeridos');
          return;
        }

        if (!cvData.personalInfo.email) {
          setMessage('El email es requerido');
          return;
        }

        const result = await createCV(cvData);

        console.log('Create CV result:', result);

        if (result.error) {
          setMessage(`Error al crear el CV: ${result.error}`);
          return;
        }

        if (result.data) {
          setCurrentCvId(result.data.id);
          // Cambiar la URL sin recargar la página
          window.history.replaceState({}, '', `/cvmasterApp/crear/${result.data.id}`);
        }
      }

      setMessage('CV guardado correctamente');
      setLastSaved(new Date());
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error saving CV:', error);
      setMessage(`Error al guardar el CV: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = async () => {
    if (!currentCvId) {
      setMessage('Debes guardar el CV antes de exportar');
      return;
    }

    try {
      setLoading(true);
      
      console.log('=== EXPORTING PDF ===');
      console.log('Current CV ID:', currentCvId);
      console.log('Selected Template:', selectedTemplate);
      
      const completeCV = await getCompleteCV(currentCvId);
      if (!completeCV) {
        setMessage('Error al obtener los datos del CV');
        return;
      }

      console.log('Complete CV data:', completeCV);

      const fileName = `${formData.title.toLowerCase().replace(/\s+/g, '-')}`;
      console.log('File name:', fileName);
      
      // Generar PDF con plantilla seleccionada
      const result = await generatePDFWithTemplate(completeCV, selectedTemplate, fileName);
      
      console.log('PDF generation result:', result);
      
      if (result.error) {
        setMessage('Error al generar el PDF: ' + result.error);
      } else {
        setMessage('PDF generado correctamente');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error exporting PDF:', error);
      setMessage('Error al exportar el PDF');
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    if (!currentCvId) {
      setMessage('Debes guardar el CV antes de ver la vista previa');
      return;
    }
    
    navigate(`/cvmasterApp/preview/${currentCvId}`);
  };

  // Funciones para manejar plantillas
  const handleTemplateSelect = (templateKey) => {
    setSelectedTemplate(templateKey);
    setShowTemplateSelector(false);
  };

  const handleTemplatePreview = (templateKey) => {
    setPreviewTemplate(templateKey);
  };

  const closeTemplatePreview = () => {
    setPreviewTemplate(null);
  };

  const handleInputChange = (section, field, value, index = null) => {
    setFormData(prev => {
      if (index !== null) {
        const newArray = [...prev[section]];
        newArray[index] = { ...newArray[index], [field]: value };
        return { ...prev, [section]: newArray };
      } else {
        return {
          ...prev,
          [section]: { ...prev[section], [field]: value }
        };
      }
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        setMessage('Por favor selecciona un archivo de imagen válido');
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage('La imagen debe ser menor a 5MB');
        return;
      }

      // Convertir a base64 para almacenar temporalmente
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            foto: e.target.result
          }
        }));
        setMessage('Imagen cargada correctamente');
        setTimeout(() => setMessage(''), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const addArrayItem = (section) => {
    setFormData(prev => ({
      ...prev,
      [section]: section === 'habilidades' 
        ? [...prev[section], '']
        : [...prev[section], section === 'experiencia' 
          ? { empresa: '', puesto: '', fechaInicio: '', fechaFin: '', descripcion: '' }
          : section === 'educacion'
          ? { institucion: '', titulo: '', fechaInicio: '', fechaFin: '', descripcion: '' }
          : { idioma: '', nivel: '' }
        ]
    }));
  };

  const removeArrayItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
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
    padding: '12px 24px',
    borderRadius: 8,
    border: 'none',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    transition: 'all 0.3s ease'
  };

  return (
    <CvmasteAppLayout>
      <div style={{ width: '100%', padding: '0 20px' }}>
        {/* Header */}
        <div style={{ marginBottom: 32, textAlign: 'center' }}>
          <h1 style={{ fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 700, color: '#fff', marginBottom: 8 }}>
            {isEditing ? 'Editar CV' : 'Crear Nuevo CV'}
          </h1>
          <p style={{ color: '#b0b0b0', fontSize: 'clamp(14px, 2vw, 16px)' }}>
            {isEditing ? 'Actualiza la información de tu currículum' : 'Completa la información para generar tu currículum profesional'}
          </p>
        </div>

        {/* Mensaje de estado */}
        {message && (
          <div style={{ 
            padding: '12px 16px', 
            borderRadius: 8, 
            marginBottom: 16,
            background: message.includes('Error') ? '#dc2626' : '#10b981',
            color: '#fff',
            fontSize: 14,
            textAlign: 'center'
          }}>
            {message}
          </div>
        )}

        {/* Campo de título */}
        <div style={{ 
          background: '#171717', 
          borderRadius: 12, 
          padding: 24, 
          border: '1px solid #333',
          marginBottom: 24
        }}>
          <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
            Título del CV *
          </label>
          <input
            type="text"
            style={{ ...inputStyle, fontSize: 16, fontWeight: 600 }}
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Ej: Desarrollador Full Stack - Juan Pérez"
          />
        </div>

        {/* Action Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: 12, 
          marginBottom: 32,
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <button 
            onClick={handleSaveCV}
            disabled={loading}
            style={{ 
              ...buttonStyle, 
              background: loading ? '#666' : 'linear-gradient(135deg, #5e17eb 0%, #4c14c7 100%)', 
              color: '#fff',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
          <button 
            onClick={() => setShowTemplateSelector(true)}
            style={{ 
              ...buttonStyle, 
              background: '#2a2a2a', 
              color: '#fff',
              border: '1px solid #444'
            }}
          >
            <Palette size={20} />
            Elegir Plantilla
          </button>
                     <button 
             onClick={handleExportPDF}
             disabled={loading || generatingPDF || !currentCvId}
             style={{ 
               ...buttonStyle, 
               background: loading || generatingPDF || !currentCvId ? '#666' : '#2e7d32', 
               color: '#fff',
               cursor: loading || generatingPDF || !currentCvId ? 'not-allowed' : 'pointer'
             }}
           >
             {loading || generatingPDF ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
             {generatingPDF ? 'Generando...' : 'Descargar PDF'}
           </button>
          <button 
            onClick={handlePreview}
            disabled={!currentCvId}
            style={{ 
              ...buttonStyle, 
              background: !currentCvId ? '#666' : '#2a2a2a', 
              color: '#fff',
              border: '1px solid #444',
              cursor: !currentCvId ? 'not-allowed' : 'pointer'
            }}
          >
            <Eye size={20} />
            Vista Previa
          </button>
          <button 
            disabled
            style={{ 
              ...buttonStyle, 
              background: '#666', 
              color: '#fff',
              cursor: 'not-allowed'
            }}
          >
            <Bot size={20} />
            Mejorar con IA (Próximamente)
          </button>
        </div>

        {/* Form */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: 24 
        }}>
          {/* Información Personal */}
          <div style={{ 
            background: '#171717', 
            borderRadius: 12, 
            padding: 24, 
            border: '1px solid #333' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                              <User size={24} color="#5e17eb" />
              <h2 style={{ fontSize: 20, fontWeight: 600, color: '#fff' }}>
                Información Personal
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                <div>
                  <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                    Nombre
                  </label>
                  <input
                    type="text"
                    style={inputStyle}
                    value={formData.personalInfo.nombre}
                    onChange={(e) => handleInputChange('personalInfo', 'nombre', e.target.value)}
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                    Apellidos
                  </label>
                  <input
                    type="text"
                    style={inputStyle}
                    value={formData.personalInfo.apellidos}
                    onChange={(e) => handleInputChange('personalInfo', 'apellidos', e.target.value)}
                    placeholder="Tus apellidos"
                  />
                </div>
              </div>
              <div>
                <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                  Email
                </label>
                <input
                  type="email"
                  style={inputStyle}
                  value={formData.personalInfo.email}
                  onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
                  placeholder="tu@email.com"
                />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                <div>
                  <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    style={inputStyle}
                    value={formData.personalInfo.telefono}
                    onChange={(e) => handleInputChange('personalInfo', 'telefono', e.target.value)}
                    placeholder="+34 123 456 789"
                  />
                </div>
                <div>
                  <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                    Dirección
                  </label>
                  <input
                    type="text"
                    style={inputStyle}
                    value={formData.personalInfo.direccion}
                    onChange={(e) => handleInputChange('personalInfo', 'direccion', e.target.value)}
                    placeholder="Ciudad, País"
                  />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
                <div>
                  <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    style={inputStyle}
                    value={formData.personalInfo.linkedin}
                    onChange={(e) => handleInputChange('personalInfo', 'linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/tu-perfil"
                  />
                </div>
                <div>
                  <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                    GitHub
                  </label>
                  <input
                    type="url"
                    style={inputStyle}
                    value={formData.personalInfo.github}
                    onChange={(e) => handleInputChange('personalInfo', 'github', e.target.value)}
                    placeholder="https://github.com/tu-usuario"
                  />
                </div>
              </div>
              
              {/* Campo de imagen */}
              <div style={{ marginTop: 16 }}>
                <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                  Foto de Perfil
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                    id="profile-image"
                  />
                  <label
                    htmlFor="profile-image"
                    style={{
                      ...buttonStyle,
                      background: '#2a2a2a',
                      color: '#fff',
                      border: '1px solid #444',
                      padding: '8px 16px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8
                    }}
                  >
                    <FileText size={16} />
                    Seleccionar Imagen
                  </label>
                  {formData.personalInfo.foto && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <img
                        src={formData.personalInfo.foto}
                        alt="Foto de perfil"
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '2px solid #5e17eb'
                        }}
                      />
                      <button
                        onClick={() => setFormData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, foto: null }
                        }))}
                        style={{
                          background: '#d32f2f',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 4,
                          padding: '4px 8px',
                          cursor: 'pointer',
                          fontSize: 12
                        }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  )}
                </div>
                <p style={{ color: '#666', fontSize: 12, marginTop: 4 }}>
                  Formatos: JPG, PNG. Máximo 5MB. Se mostrará en el PDF del CV.
                </p>
              </div>
            </div>
          </div>

          {/* Experiencia Laboral */}
          <div style={{ 
            background: '#171717', 
            borderRadius: 12, 
            padding: 24, 
            border: '1px solid #333' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Briefcase size={24} color="#5e17eb" />
                <h2 style={{ fontSize: 20, fontWeight: 600, color: '#fff' }}>
                  Experiencia Laboral
                </h2>
              </div>
              <button 
                onClick={() => addArrayItem('experiencia')}
                style={{ 
                  ...buttonStyle, 
                  background: '#5e17eb', 
                  color: '#fff',
                  padding: '8px 12px'
                }}
              >
                <Plus size={16} />
                Añadir
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {formData.experiencia.map((exp, index) => (
                <div key={index} style={{ 
                  background: '#2a2a2a', 
                  padding: 20, 
                  borderRadius: 8,
                  border: '1px solid #444'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>
                      Experiencia {index + 1}
                    </h3>
                    {formData.experiencia.length > 1 && (
                      <button 
                        onClick={() => removeArrayItem('experiencia', index)}
                        style={{ 
                          background: '#d32f2f', 
                          color: '#fff',
                          border: 'none',
                          borderRadius: 4,
                          padding: '4px 8px',
                          cursor: 'pointer'
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                      <div>
                        <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                          Empresa
                        </label>
                        <input
                          type="text"
                          style={inputStyle}
                          value={exp.empresa}
                          onChange={(e) => handleInputChange('experiencia', 'empresa', e.target.value, index)}
                          placeholder="Nombre de la empresa"
                        />
                      </div>
                      <div>
                        <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                          Puesto
                        </label>
                        <input
                          type="text"
                          style={inputStyle}
                          value={exp.puesto}
                          onChange={(e) => handleInputChange('experiencia', 'puesto', e.target.value, index)}
                          placeholder="Tu puesto de trabajo"
                        />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
                      <div>
                        <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                          Fecha Inicio
                        </label>
                        <input
                          type="date"
                          style={inputStyle}
                          value={exp.fechaInicio}
                          onChange={(e) => handleInputChange('experiencia', 'fechaInicio', e.target.value, index)}
                        />
                      </div>
                      <div>
                        <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                          Fecha Fin
                        </label>
                        <input
                          type="date"
                          style={inputStyle}
                          value={exp.fechaFin}
                          onChange={(e) => handleInputChange('experiencia', 'fechaFin', e.target.value, index)}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                        Descripción
                      </label>
                      <textarea
                        style={{ ...inputStyle, minHeight: 80, resize: 'vertical' }}
                        value={exp.descripcion}
                        onChange={(e) => handleInputChange('experiencia', 'descripcion', e.target.value, index)}
                        placeholder="Describe tus responsabilidades y logros..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Educación */}
          <div style={{ 
            background: '#171717', 
            borderRadius: 12, 
            padding: 24, 
            border: '1px solid #333' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <GraduationCap size={24} color="#5e17eb" />
                <h2 style={{ fontSize: 20, fontWeight: 600, color: '#fff' }}>
                  Educación
                </h2>
              </div>
              <button 
                onClick={() => addArrayItem('educacion')}
                style={{ 
                  ...buttonStyle, 
                  background: '#5e17eb', 
                  color: '#fff',
                  padding: '8px 12px'
                }}
              >
                <Plus size={16} />
                Añadir
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {formData.educacion.map((edu, index) => (
                <div key={index} style={{ 
                  background: '#2a2a2a', 
                  padding: 20, 
                  borderRadius: 8,
                  border: '1px solid #444'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 600 }}>
                      Educación {index + 1}
                    </h3>
                    {formData.educacion.length > 1 && (
                      <button 
                        onClick={() => removeArrayItem('educacion', index)}
                        style={{ 
                          background: '#d32f2f', 
                          color: '#fff',
                          border: 'none',
                          borderRadius: 4,
                          padding: '4px 8px',
                          cursor: 'pointer'
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
                      <div>
                        <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                          Institución
                        </label>
                        <input
                          type="text"
                          style={inputStyle}
                          value={edu.institucion}
                          onChange={(e) => handleInputChange('educacion', 'institucion', e.target.value, index)}
                          placeholder="Universidad o centro educativo"
                        />
                      </div>
                      <div>
                        <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                          Título
                        </label>
                        <input
                          type="text"
                          style={inputStyle}
                          value={edu.titulo}
                          onChange={(e) => handleInputChange('educacion', 'titulo', e.target.value, index)}
                          placeholder="Grado, Máster, etc."
                        />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
                      <div>
                        <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                          Fecha Inicio
                        </label>
                        <input
                          type="date"
                          style={inputStyle}
                          value={edu.fechaInicio}
                          onChange={(e) => handleInputChange('educacion', 'fechaInicio', e.target.value, index)}
                        />
                      </div>
                      <div>
                        <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                          Fecha Fin
                        </label>
                        <input
                          type="date"
                          style={inputStyle}
                          value={edu.fechaFin}
                          onChange={(e) => handleInputChange('educacion', 'fechaFin', e.target.value, index)}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={{ color: '#b0b0b0', fontSize: 14, marginBottom: 8, display: 'block' }}>
                        Descripción
                      </label>
                      <textarea
                        style={{ ...inputStyle, minHeight: 60, resize: 'vertical' }}
                        value={edu.descripcion}
                        onChange={(e) => handleInputChange('educacion', 'descripcion', e.target.value, index)}
                        placeholder="Especialización, proyectos destacados..."
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Habilidades */}
          <div style={{ 
            background: '#171717', 
            borderRadius: 12, 
            padding: 24, 
            border: '1px solid #333' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <Award size={24} color="#5e17eb" />
                <h2 style={{ fontSize: 20, fontWeight: 600, color: '#fff' }}>
                  Habilidades
                </h2>
              </div>
              <button 
                onClick={() => addArrayItem('habilidades')}
                style={{ 
                  ...buttonStyle, 
                  background: '#5e17eb', 
                  color: '#fff',
                  padding: '8px 12px'
                }}
              >
                <Plus size={16} />
                Añadir
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {formData.habilidades.map((skill, index) => (
                <div key={index} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input
                    type="text"
                    style={{ ...inputStyle, flex: 1 }}
                    value={skill}
                    onChange={(e) => {
                      const newSkills = [...formData.habilidades];
                      newSkills[index] = e.target.value;
                      setFormData(prev => ({ ...prev, habilidades: newSkills }));
                    }}
                    placeholder="Ej: JavaScript, React, Node.js"
                  />
                  {formData.habilidades.length > 1 && (
                    <button 
                      onClick={() => removeArrayItem('habilidades', index)}
                      style={{ 
                        background: '#d32f2f', 
                        color: '#fff',
                        border: 'none',
                        borderRadius: 4,
                        padding: '8px',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Selector de Plantillas */}
      {showTemplateSelector && (
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
            overflow: 'auto',
            position: 'relative'
          }}>
            <div style={{
              position: 'sticky',
              top: 0,
              background: '#171717',
              padding: '24px',
              borderBottom: '1px solid #333',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <h2 style={{
                color: '#fff',
                fontSize: '1.5rem',
                fontWeight: '600',
                margin: 0
              }}>
                Seleccionar Plantilla
              </h2>
              <button
                onClick={() => setShowTemplateSelector(false)}
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
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: '24px' }}>
              <TemplateSelector
                selectedTemplate={selectedTemplate}
                onTemplateSelect={handleTemplateSelect}
                onPreview={handleTemplatePreview}
              />
            </div>
          </div>
        </div>
      )}

      {/* Vista Previa de Plantilla */}
      <TemplatePreview
        isOpen={previewTemplate !== null}
        templateKey={previewTemplate}
        onClose={closeTemplatePreview}
        onSelect={handleTemplateSelect}
      />
    </CvmasteAppLayout>
  );
} 