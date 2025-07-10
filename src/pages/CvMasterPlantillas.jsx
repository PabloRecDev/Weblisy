import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card3D from '../components/Card3D';
import { useCVTemplates } from '../hooks/useCVTemplates';
import { useCVs } from '../hooks/useCVs';
import { Crown, Check } from 'lucide-react';

export default function CvMasterPlantillas() {
  const { templates, loading, error } = useCVTemplates();
  const { createCV } = useCVs();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const handleSelectTemplate = async (template) => {
    setSelectedTemplate(template.id);
    setIsCreating(true);

    try {
      const cvTitle = `Mi CV - ${template.name}`;
      const { data: newCV, error } = await createCV({
        title: cvTitle,
        template_id: template.id
      });

      if (error) {
        console.error('Error creating CV:', error);
        alert('Error al crear el CV. Por favor, inténtalo de nuevo.');
        return;
      }

      // Redirigir al dashboard después de crear el CV
      navigate('/cvmasterApp');
    } catch (error) {
      console.error('Error creating CV:', error);
      alert('Error al crear el CV. Por favor, inténtalo de nuevo.');
    } finally {
      setIsCreating(false);
      setSelectedTemplate(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Elige una plantilla</h1>
          <p className="text-gray-300">Selecciona el diseño que más se adapte a tu perfil profesional</p>
        </div>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <div className="w-12 h-12 border-3 border-[#5e17eb] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-300">Cargando plantillas...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Elige una plantilla</h1>
          <p className="text-gray-300">Selecciona el diseño que más se adapte a tu perfil profesional</p>
        </div>
        <div className="text-center text-red-400 bg-red-900/20 border border-red-500/30 rounded-lg p-8">
          <p>Error al cargar las plantillas: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Elige una plantilla</h1>
        <p className="text-gray-300">Selecciona el diseño que más se adapte a tu perfil profesional</p>
      </div>

      {/* Filtros por categoría */}
      <div className="flex flex-wrap gap-3 mb-6">
        {['modern', 'classic', 'creative', 'minimal', 'executive', 'tech'].map((category) => (
          <button
            key={category}
            className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors capitalize"
          >
            {category === 'modern' ? 'Moderno' :
             category === 'classic' ? 'Clásico' :
             category === 'creative' ? 'Creativo' :
             category === 'minimal' ? 'Minimalista' :
             category === 'executive' ? 'Ejecutivo' :
             'Tecnológico'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template) => (
          <Card3D key={template.id}>
            <div className="relative">
              {template.is_premium && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Crown size={12} />
                  Premium
                </div>
              )}
              <div className="w-full aspect-[3/4] bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg mb-4 flex items-center justify-center">
                {template.preview_image_url ? (
                  <img 
                    src={template.preview_image_url} 
                    alt={template.name} 
                    className="rounded-lg w-full h-full object-cover" 
                  />
                ) : (
                  <div className="text-gray-400 text-center">
                    <div className="text-4xl mb-2">📄</div>
                    <div className="text-sm">Vista previa</div>
                  </div>
                )}
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">{template.name}</h3>
            <p className="text-gray-300 mb-4 text-sm">{template.description}</p>
            <button 
              onClick={() => handleSelectTemplate(template)}
              disabled={isCreating && selectedTemplate === template.id}
              className="w-full px-4 py-2 rounded-lg font-semibold bg-[#5e17eb] text-white hover:bg-[#5e17eb]/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isCreating && selectedTemplate === template.id ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creando...
                </>
              ) : (
                <>
                  <Check size={16} />
                  Seleccionar
                </>
              )}
            </button>
          </Card3D>
        ))}
      </div>

      {templates.length === 0 && !loading && (
        <div className="text-center text-gray-400 bg-gray-800/50 border border-gray-600 rounded-lg p-8">
          <p>No hay plantillas disponibles en este momento.</p>
        </div>
      )}
    </div>
  );
} 