import React, { useState } from 'react';

const tareasIniciales = [
  { id: 1, texto: 'Completar información personal', completada: false },
  { id: 2, texto: 'Agregar experiencia laboral', completada: false },
  { id: 3, texto: 'Subir foto de perfil', completada: true },
  { id: 4, texto: 'Descargar CV en PDF', completada: false },
];

export default function CvMasterTareas() {
  const [tareas, setTareas] = useState(tareasIniciales);

  const toggleTarea = (id) => {
    setTareas(tareas.map(t => t.id === id ? { ...t, completada: !t.completada } : t));
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Tareas</h1>
        <p className="text-gray-500">Gestiona tus tareas pendientes y logros recientes</p>
      </div>
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
        <ul className="space-y-3">
          {tareas.map(tarea => (
            <li key={tarea.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 bg-gray-50">
              <span className={`font-medium ${tarea.completada ? 'line-through text-gray-400' : 'text-gray-700'}`}>{tarea.texto}</span>
              <button
                className={`ml-4 px-3 py-1 rounded font-semibold text-xs ${tarea.completada ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}
                onClick={() => toggleTarea(tarea.id)}
              >
                {tarea.completada ? 'Completada' : 'Completar'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
} 