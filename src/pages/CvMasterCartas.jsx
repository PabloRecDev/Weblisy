import React, { useState } from 'react';

export default function CvMasterCartas() {
  const [descripcion, setDescripcion] = useState('');
  const [carta, setCarta] = useState('');
  const [loading, setLoading] = useState(false);

  const generarCarta = () => {
    setLoading(true);
    setTimeout(() => {
      setCarta('Estimado reclutador,\n\nEsta es una carta de ejemplo generada para tu postulación.');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Generador de Carta de Presentación</h1>
        <p className="text-gray-500">Describe el trabajo y genera una carta personalizada con IA</p>
      </div>
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-100 space-y-4">
        <textarea
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg mb-2"
          rows={6}
          placeholder="Pega aquí la descripción del trabajo..."
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
        />
        <button
          className="w-full px-4 py-2 rounded-lg font-semibold bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          onClick={generarCarta}
          disabled={loading}
        >
          {loading ? 'Generando...' : 'Generar Carta'}
        </button>
        {carta && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg whitespace-pre-line text-gray-700">
            {carta}
          </div>
        )}
      </div>
    </div>
  );
} 