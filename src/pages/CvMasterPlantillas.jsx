import React from 'react';
import Card3D from '../components/Card3D';

const templates = [
  { id: 'modern', name: 'Moderno', description: 'Diseño limpio y profesional', preview: '/assets/cv-template-modern.png' },
  { id: 'classic', name: 'Clásico', description: 'Estilo tradicional y elegante', preview: '/assets/cv-template-classic.png' },
  { id: 'creative', name: 'Creativo', description: 'Diseño único y llamativo', preview: '/assets/cv-template-creative.png' },
  { id: 'minimal', name: 'Minimalista', description: 'Simplicidad y elegancia', preview: '/assets/cv-template-minimal.png' },
  { id: 'executive', name: 'Ejecutivo', description: 'Para posiciones de alto nivel', preview: '/assets/cv-template-executive.png' },
  { id: 'tech', name: 'Tecnológico', description: 'Ideal para desarrolladores', preview: '/assets/cv-template-tech.png' },
];

export default function CvMasterPlantillas() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Elige una plantilla</h1>
        <p className="text-gray-500">Selecciona el diseño que más se adapte a tu perfil profesional</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templates.map((template) => (
          <Card3D key={template.id}>
            <img src={template.preview} alt={template.name} className="rounded-lg mb-4 w-full aspect-[3/4] object-cover" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">{template.name}</h3>
            <p className="text-gray-600 mb-4">{template.description}</p>
            <button className="w-full px-4 py-2 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-colors">Seleccionar</button>
          </Card3D>
        ))}
      </div>
    </div>
  );
} 