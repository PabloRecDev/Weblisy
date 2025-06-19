import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { 
  PlusIcon,
  MagnifyingGlassIcon,
  StarIcon,
  PersonIcon,
  Cross2Icon,
  HomeIcon,
  CalendarIcon,
  TrashIcon,
  CheckIcon
} from '@radix-ui/react-icons';

const mockPresupuestos = [
  {
    id: 'P-2024-001',
    cliente: { nombre: 'María García', empresa: 'TechCorp Solutions' },
    titulo: 'Desarrollo de E-commerce',
    descripcion: 'Plataforma completa de comercio electrónico',
    fechaCreacion: '2024-01-15',
    fechaVencimiento: '2024-02-15',
    estado: 'pendiente',
    prioridad: 'alta',
    total: 11979,
    items: 4,
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 'P-2024-002',
    cliente: { nombre: 'Carlos Rodríguez', empresa: 'StartupXYZ' },
    titulo: 'Sistema de Gestión de Inventarios',
    descripcion: 'Aplicación web para control de stock',
    fechaCreacion: '2024-01-10',
    fechaVencimiento: '2024-02-10',
    estado: 'aprobado',
    prioridad: 'media',
    total: 8470,
    items: 3,
    created_at: '2024-01-10T14:20:00Z'
  },
  {
    id: 'P-2024-003',
    cliente: { nombre: 'Ana López', empresa: 'DigitalAgency' },
    titulo: 'Rediseño de Sitio Web',
    descripcion: 'Rediseño completo del sitio web corporativo',
    fechaCreacion: '2024-01-08',
    fechaVencimiento: '2024-02-08',
    estado: 'rechazado',
    prioridad: 'baja',
    total: 4235,
    items: 3,
    created_at: '2024-01-08T09:15:00Z'
  }
];

export default function AdminPresupuestos() {
  const [presupuestos, setPresupuestos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [estadoFilter, setEstadoFilter] = useState('todos');
  const [selectedPresupuesto, setSelectedPresupuesto] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [stats, setStats] = useState({
    total: 0,
    pendientes: 0,
    aprobados: 0,
    rechazados: 0,
    valorTotal: 0
  });

  useEffect(() => {
    fetchPresupuestos();
  }, []);

  const fetchPresupuestos = async () => {
    try {
      setLoading(true);
      setTimeout(() => {
        setPresupuestos(mockPresupuestos);
        calculateStats(mockPresupuestos);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const calculateStats = (presupuestosData) => {
    const stats = {
      total: presupuestosData.length,
      pendientes: presupuestosData.filter(p => p.estado === 'pendiente').length,
      aprobados: presupuestosData.filter(p => p.estado === 'aprobado').length,
      rechazados: presupuestosData.filter(p => p.estado === 'rechazado').length,
      valorTotal: presupuestosData.reduce((sum, p) => sum + p.total, 0)
    };
    setStats(stats);
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'pendiente': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'aprobado': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'rechazado': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getEstadoText = (estado) => {
    switch (estado) {
      case 'pendiente': return 'Pendiente';
      case 'aprobado': return 'Aprobado';
      case 'rechazado': return 'Rechazado';
      default: return estado;
    }
  };

  const filteredPresupuestos = presupuestos.filter(presupuesto => {
    const matchesSearch = 
      presupuesto.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      presupuesto.cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      presupuesto.cliente.empresa.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEstado = estadoFilter === 'todos' || presupuesto.estado === estadoFilter;
    
    return matchesSearch && matchesEstado;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Cargando presupuestos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-white/40">Total</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold">{stats.total}</span>
            <StarIcon className="w-4 h-4 text-white/20" />
          </div>
        </div>
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-yellow-400/80">Pendientes</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold text-yellow-400">{stats.pendientes}</span>
            <ClockIcon className="w-4 h-4 text-yellow-400/20" />
          </div>
        </div>
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-green-400/80">Aprobados</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold text-green-400">{stats.aprobados}</span>
            <CheckIcon className="w-4 h-4 text-green-400/20" />
          </div>
        </div>
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-red-400/80">Rechazados</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold text-red-400">{stats.rechazados}</span>
            <Cross2Icon className="w-4 h-4 text-red-400/20" />
          </div>
        </div>
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-blue-400/80">Valor Total</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold text-blue-400">€{stats.valorTotal.toLocaleString()}</span>
            <StarIcon className="w-4 h-4 text-blue-400/20" />
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input
            type="text"
            placeholder="Buscar presupuestos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-sm text-white placeholder-white/20 focus:border-white/20 focus:outline-none focus:bg-white/10 transition-colors"
          />
        </div>
        <select
          value={estadoFilter}
          onChange={(e) => setEstadoFilter(e.target.value)}
          className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-sm text-white focus:border-white/20 focus:outline-none focus:bg-white/10 transition-colors"
        >
          <option value="todos">Todos los estados</option>
          <option value="pendiente">Pendientes</option>
          <option value="aprobado">Aprobados</option>
          <option value="rechazado">Rechazados</option>
        </select>
      </div>

      {/* Tabla */}
      <div className="flex-1 pb-8">
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/40 border-b border-white/10">
                <th className="py-2 px-2 font-medium text-left">ID</th>
                <th className="py-2 px-2 font-medium text-left">Cliente</th>
                <th className="py-2 px-2 font-medium text-left">Título</th>
                <th className="py-2 px-2 font-medium text-left">Estado</th>
                <th className="py-2 px-2 font-medium text-left">Total</th>
                <th className="py-2 px-2 font-medium text-left">Vencimiento</th>
                <th className="py-2 px-2 font-medium text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredPresupuestos.map((presupuesto) => (
                <tr key={presupuesto.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                  <td className="py-2 px-2">
                    <div className="font-medium text-white">{presupuesto.id}</div>
                    <div className="text-xs text-white/30">{format(new Date(presupuesto.fechaCreacion), 'dd/MM/yyyy', { locale: es })}</div>
                  </td>
                  <td className="py-2 px-2">
                    <div className="font-medium text-white">{presupuesto.cliente.nombre}</div>
                    <div className="text-xs text-white/30">{presupuesto.cliente.empresa}</div>
                  </td>
                  <td className="py-2 px-2">
                    <div className="font-medium text-white">{presupuesto.titulo}</div>
                    <div className="text-xs text-white/30">{presupuesto.descripcion}</div>
                  </td>
                  <td className="py-2 px-2">
                    <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded border ${getEstadoColor(presupuesto.estado)}`}>
                      {getEstadoText(presupuesto.estado)}
                    </span>
                  </td>
                  <td className="py-2 px-2">
                    <div className="font-semibold">€{presupuesto.total.toLocaleString()}</div>
                  </td>
                  <td className="py-2 px-2">
                    <div className="text-xs text-white/70">
                      {format(new Date(presupuesto.fechaVencimiento), 'dd/MM/yyyy', { locale: es })}
                    </div>
                  </td>
                  <td className="py-2 px-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedPresupuesto(presupuesto);
                          setShowModal(true);
                        }}
                        className="p-1 text-white/40 hover:text-white hover:bg-white/10 rounded transition-colors"
                        title="Ver detalles"
                      >
                        <PersonIcon className="w-4 h-4" />
                      </button>
                      <button
                        className="p-1 text-white/40 hover:text-white hover:bg-white/10 rounded transition-colors"
                        title="Descargar PDF"
                      >
                        <StarIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPresupuestos.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-white/30">No se encontraron presupuestos</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 