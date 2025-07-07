import React, { useState } from 'react';

export default function CvMasterEditor() {
  const [progress, setProgress] = useState(60);
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Editor de CV</h1>
          <p className="text-gray-500">Completa tu información para crear tu CV profesional</p>
        </div>
        <div className="w-48">
          <div className="w-full h-3 bg-blue-100 rounded-full mb-1">
            <div className="h-3 bg-blue-500 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="text-xs text-gray-400">{progress}% completado</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Información Personal</h2>
            <input className="w-full mb-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg" placeholder="Nombre completo" />
            <input className="w-full mb-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg" placeholder="Email" />
            <input className="w-full mb-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg" placeholder="Teléfono" />
            <input className="w-full mb-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg" placeholder="Ubicación" />
          </div>
          <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Experiencia Laboral</h2>
            <textarea className="w-full mb-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg" placeholder="Describe tu experiencia..." />
          </div>
          <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Educación</h2>
            <textarea className="w-full mb-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg" placeholder="Describe tu educación..." />
          </div>
          <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Habilidades</h2>
            <input className="w-full mb-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg" placeholder="Ej: React, Node.js, Inglés..." />
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Vista Previa</h2>
          <div className="h-96 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">Aquí aparecerá la vista previa del CV</div>
        </div>
      </div>
    </div>
  );
} 