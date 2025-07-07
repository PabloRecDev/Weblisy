import React from 'react';

export default function CvMasterSettings() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Configuración</h1>
        <p className="text-gray-500">Gestiona tu cuenta y preferencias</p>
      </div>
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-100 space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Nombre</label>
          <input className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg" placeholder="Tu nombre" />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Email</label>
          <input className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg" placeholder="Tu email" />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Opciones</label>
          <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg">
            <option>Notificaciones activadas</option>
            <option>Notificaciones desactivadas</option>
          </select>
        </div>
        <button className="w-full px-4 py-2 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-colors">Guardar Cambios</button>
      </div>
    </div>
  );
} 