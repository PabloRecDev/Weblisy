import React from 'react';

const days = [
  'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'
];
const dates = Array.from({ length: 31 }, (_, i) => i + 1);
const eventos = {
  3: 'Entrevista',
  12: 'Entrega de CV',
  16: 'Revisión',
  25: 'Entrevista',
  27: 'Feedback',
};

export default function CvMasterCalendar() {
  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Calendario</h1>
        <p className="text-gray-500">Consulta tus eventos y fechas importantes</p>
      </div>
      <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-gray-700">Marzo 2024</span>
          <button className="px-3 py-1 rounded bg-blue-50 text-blue-600 font-semibold text-sm">Hoy</button>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-2">
          {days.map(day => (
            <div key={day} className="text-center text-xs font-bold text-gray-400">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {dates.map(date => (
            <div key={date} className={`h-12 flex flex-col items-center justify-center rounded-lg text-sm font-medium ${eventos[date] ? 'bg-blue-100 text-blue-700 border-2 border-blue-400' : 'bg-gray-50 text-gray-700'}`}>
              {date}
              {eventos[date] && <span className="block text-xs mt-1 font-normal">{eventos[date]}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 