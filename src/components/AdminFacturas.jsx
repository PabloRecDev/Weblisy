import React, { useState } from 'react';
import { PlusIcon, MagnifyingGlassIcon, StarIcon } from '@radix-ui/react-icons';

const mockFacturas = [
  {
    id: 'F-2024-001',
    cliente: 'TechCorp',
    direccion: 'Calle Falsa 123, Madrid',
    fecha: '2024-06-01',
    concepto: 'Desarrollo web',
    base: 1200,
    iva: 21,
    total: 1452,
  },
  {
    id: 'F-2024-002',
    cliente: 'StartupXYZ',
    direccion: 'Avenida Real 45, Barcelona',
    fecha: '2024-06-03',
    concepto: 'Mantenimiento anual',
    base: 800,
    iva: 21,
    total: 968,
  }
];

export default function AdminFacturas() {
  const [facturas, setFacturas] = useState(mockFacturas);
  const [search, setSearch] = useState('');

  const filtered = facturas.filter(f =>
    f.cliente.toLowerCase().includes(search.toLowerCase()) ||
    f.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-white/40">Total Facturas</span>
          <span className="text-lg font-semibold">{facturas.length}</span>
        </div>
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-green-400/80">Total Facturado</span>
          <span className="text-lg font-semibold text-green-400">€{facturas.reduce((sum, f) => sum + f.total, 0).toLocaleString()}</span>
        </div>
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-blue-400/80">Este Mes</span>
          <span className="text-lg font-semibold text-blue-400">€{facturas.filter(f => f.fecha.startsWith('2024-06')).reduce((sum, f) => sum + f.total, 0).toLocaleString()}</span>
        </div>
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-yellow-400/80">Pendientes</span>
          <span className="text-lg font-semibold text-yellow-400">0</span>
        </div>
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-purple-400/80">Promedio</span>
          <span className="text-lg font-semibold text-purple-400">€{(facturas.reduce((sum, f) => sum + f.total, 0) / facturas.length).toFixed(0)}</span>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input
            type="text"
            placeholder="Buscar facturas..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-sm text-white placeholder-white/20 focus:border-white/20 focus:outline-none focus:bg-white/10 transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#038e42] hover:bg-[#038e42]/80 text-xs transition-colors">
          <PlusIcon className="w-4 h-4" />
          Nueva factura
        </button>
      </div>

      {/* Tabla */}
      <div className="flex-1 pb-8">
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/40 border-b border-white/10">
                <th className="py-2 px-2 font-medium text-left">Nº Factura</th>
                <th className="py-2 px-2 font-medium text-left">Cliente</th>
                <th className="py-2 px-2 font-medium text-left">Fecha</th>
                <th className="py-2 px-2 font-medium text-left">Concepto</th>
                <th className="py-2 px-2 font-medium text-left">Base</th>
                <th className="py-2 px-2 font-medium text-left">IVA</th>
                <th className="py-2 px-2 font-medium text-left">Total</th>
                <th className="py-2 px-2 font-medium text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(f => (
                <tr key={f.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                  <td className="py-2 px-2">{f.id}</td>
                  <td className="py-2 px-2">{f.cliente}</td>
                  <td className="py-2 px-2">{f.fecha}</td>
                  <td className="py-2 px-2">{f.concepto}</td>
                  <td className="py-2 px-2">€{f.base}</td>
                  <td className="py-2 px-2">{f.iva}%</td>
                  <td className="py-2 px-2 font-semibold">€{f.total}</td>
                  <td className="py-2 px-2">
                    <button className="p-1 text-white/40 hover:text-white hover:bg-white/10 rounded transition-colors" title="Descargar PDF">
                      <StarIcon className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-white/30">No se encontraron facturas</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 