import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { 
  PlusIcon,
  MagnifyingGlassIcon,
  TrashIcon,
  CheckIcon,
  Cross2Icon,
  ClockIcon,
  PersonIcon,
  CalendarIcon,
  StarIcon,
  ArrowRightIcon,
  RocketIcon
} from '@radix-ui/react-icons';

const mockTareas = [
  {
    id: 'TASK-001',
    titulo: 'Diseño de interfaz de usuario',
    descripcion: 'Crear wireframes y mockups para el e-commerce',
    proyecto: 'E-commerce TechCorp',
    asignado: 'Ana García',
    prioridad: 'alta',
    estado: 'completada',
    fechaCreacion: '2024-01-15',
    fechaVencimiento: '2024-01-25',
    fechaCompletada: '2024-01-22',
    tiempoEstimado: 16,
    tiempoReal: 14,
    etiquetas: ['Diseño', 'UI/UX', 'Frontend'],
    comentarios: [
      { id: 1, autor: 'Ana García', texto: 'Wireframes completados', fecha: '2024-01-20' },
      { id: 2, autor: 'María García', texto: 'Aprobado por el cliente', fecha: '2024-01-22' }
    ],
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 'TASK-002',
    titulo: 'Desarrollo del frontend',
    descripcion: 'Implementar componentes React para la tienda online',
    proyecto: 'E-commerce TechCorp',
    asignado: 'Carlos López',
    prioridad: 'alta',
    estado: 'en_progreso',
    fechaCreacion: '2024-01-20',
    fechaVencimiento: '2024-02-10',
    fechaCompletada: null,
    tiempoEstimado: 40,
    tiempoReal: 25,
    etiquetas: ['React', 'Frontend', 'Desarrollo'],
    comentarios: [
      { id: 1, autor: 'Carlos López', texto: 'Componentes principales implementados', fecha: '2024-01-25' }
    ],
    created_at: '2024-01-20T14:20:00Z'
  },
  {
    id: 'TASK-003',
    titulo: 'Desarrollo del backend',
    descripcion: 'Crear API REST con Node.js y MongoDB',
    proyecto: 'E-commerce TechCorp',
    asignado: 'Roberto Silva',
    prioridad: 'alta',
    estado: 'en_progreso',
    fechaCreacion: '2024-01-22',
    fechaVencimiento: '2024-02-15',
    fechaCompletada: null,
    tiempoEstimado: 35,
    tiempoReal: 20,
    etiquetas: ['Node.js', 'MongoDB', 'Backend'],
    comentarios: [
      { id: 1, autor: 'Roberto Silva', texto: 'Endpoints básicos implementados', fecha: '2024-01-28' }
    ],
    created_at: '2024-01-22T09:15:00Z'
  },
  {
    id: 'TASK-004',
    titulo: 'Integración de pagos',
    descripcion: 'Integrar Stripe para procesamiento de pagos',
    proyecto: 'E-commerce TechCorp',
    asignado: 'Laura Martínez',
    prioridad: 'media',
    estado: 'pendiente',
    fechaCreacion: '2024-01-25',
    fechaVencimiento: '2024-02-20',
    fechaCompletada: null,
    tiempoEstimado: 20,
    tiempoReal: 0,
    etiquetas: ['Stripe', 'Pagos', 'Integración'],
    comentarios: [],
    created_at: '2024-01-25T11:30:00Z'
  },
  {
    id: 'TASK-005',
    titulo: 'Análisis de requisitos',
    descripcion: 'Recopilar y documentar requisitos del sistema de inventarios',
    proyecto: 'Sistema de Inventarios',
    asignado: 'Pedro Rodríguez',
    prioridad: 'media',
    estado: 'pendiente',
    fechaCreacion: '2024-01-30',
    fechaVencimiento: '2024-02-05',
    fechaCompletada: null,
    tiempoEstimado: 12,
    tiempoReal: 0,
    etiquetas: ['Análisis', 'Documentación'],
    comentarios: [],
    created_at: '2024-01-30T08:30:00Z'
  }
];

export default function AdminTareas() {
  const [tareas, setTareas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [estadoFilter, setEstadoFilter] = useState('todos');
  const [prioridadFilter, setPrioridadFilter] = useState('todos');
  const [selectedTarea, setSelectedTarea] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState('table');

  const [stats, setStats] = useState({
    total: 0,
    completadas: 0,
    en_progreso: 0,
    pendientes: 0,
    vencidas: 0,
    tiempoTotal: 0
  });

  useEffect(() => {
    fetchTareas();
  }, []);

  const fetchTareas = async () => {
    try {
      setLoading(true);
      setTimeout(() => {
        setTareas(mockTareas);
        calculateStats(mockTareas);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const calculateStats = (tareasData) => {
    const today = new Date();
    const stats = {
      total: tareasData.length,
      completadas: tareasData.filter(t => t.estado === 'completada').length,
      en_progreso: tareasData.filter(t => t.estado === 'en_progreso').length,
      pendientes: tareasData.filter(t => t.estado === 'pendiente').length,
      vencidas: tareasData.filter(t => new Date(t.fechaVencimiento) < today && t.estado !== 'completada').length,
      tiempoTotal: tareasData.reduce((sum, t) => sum + t.tiempoReal, 0)
    };
    setStats(stats);
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'completada': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'en_progreso': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'pendiente': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'pausada': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'cancelada': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getPrioridadColor = (prioridad) => {
    switch (prioridad) {
      case 'alta': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'media': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'baja': return 'bg-green-500/10 text-green-400 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getEstadoText = (estado) => {
    switch (estado) {
      case 'completada': return 'Completada';
      case 'en_progreso': return 'En Progreso';
      case 'pendiente': return 'Pendiente';
      case 'pausada': return 'Pausada';
      case 'cancelada': return 'Cancelada';
      default: return estado;
    }
  };

  const getPrioridadText = (prioridad) => {
    switch (prioridad) {
      case 'alta': return 'Alta';
      case 'media': return 'Media';
      case 'baja': return 'Baja';
      default: return prioridad;
    }
  };

  const isVencida = (fechaVencimiento, estado) => {
    return new Date(fechaVencimiento) < new Date() && estado !== 'completada';
  };

  const filteredTareas = tareas.filter(tarea => {
    const matchesSearch = 
      tarea.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tarea.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tarea.proyecto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tarea.asignado.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEstado = estadoFilter === 'todos' || tarea.estado === estadoFilter;
    const matchesPrioridad = prioridadFilter === 'todos' || tarea.prioridad === prioridadFilter;
    
    return matchesSearch && matchesEstado && matchesPrioridad;
  });

  const cambiarEstado = async (tareaId, nuevoEstado) => {
    try {
      const updatedTareas = tareas.map(t => 
        t.id === tareaId ? { 
          ...t, 
          estado: nuevoEstado,
          fechaCompletada: nuevoEstado === 'completada' ? new Date().toISOString().split('T')[0] : null
        } : t
      );
      setTareas(updatedTareas);
      calculateStats(updatedTareas);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case 'pendiente': return <ClockIcon className="w-4 h-4" />;
      case 'en_progreso': return <ArrowRightIcon className="w-4 h-4" />;
      case 'completada': return <CheckIcon className="w-4 h-4" />;
      case 'cancelada': return <Cross2Icon className="w-4 h-4" />;
      default: return <ClockIcon className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Cargando tareas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-white/40">Total</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold">{stats.total}</span>
            <CheckIcon className="w-4 h-4 text-white/20" />
          </div>
        </div>
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-green-400/80">Completadas</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold text-green-400">{stats.completadas}</span>
            <CheckIcon className="w-4 h-4 text-green-400/20" />
          </div>
        </div>
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-blue-400/80">En Progreso</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold text-blue-400">{stats.en_progreso}</span>
            <ArrowRightIcon className="w-4 h-4 text-blue-400/20" />
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
          <span className="text-xs text-red-400/80">Vencidas</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold text-red-400">{stats.vencidas}</span>
            <Cross2Icon className="w-4 h-4 text-red-400/20" />
          </div>
        </div>
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-purple-400/80">Horas Totales</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold text-purple-400">{stats.tiempoTotal}h</span>
            <ClockIcon className="w-4 h-4 text-purple-400/20" />
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input
            type="text"
            placeholder="Buscar tareas..."
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
          <option value="completada">Completadas</option>
          <option value="en_progreso">En Progreso</option>
          <option value="pendiente">Pendientes</option>
          <option value="pausada">Pausadas</option>
          <option value="cancelada">Canceladas</option>
        </select>
        <select
          value={prioridadFilter}
          onChange={(e) => setPrioridadFilter(e.target.value)}
          className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-sm text-white focus:border-white/20 focus:outline-none focus:bg-white/10 transition-colors"
        >
          <option value="todos">Todas las prioridades</option>
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
      </div>

      {/* Contenido */}
      <div className="flex-1 pb-8">
        {viewMode === 'table' ? (
          <div className="overflow-x-auto rounded-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-white/40 border-b border-white/10">
                  <th className="py-2 px-2 font-medium text-left">Tarea</th>
                  <th className="py-2 px-2 font-medium text-left">Proyecto</th>
                  <th className="py-2 px-2 font-medium text-left">Asignado</th>
                  <th className="py-2 px-2 font-medium text-left">Estado</th>
                  <th className="py-2 px-2 font-medium text-left">Prioridad</th>
                  <th className="py-2 px-2 font-medium text-left">Tiempo</th>
                  <th className="py-2 px-2 font-medium text-left">Vencimiento</th>
                  <th className="py-2 px-2 font-medium text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredTareas.map((tarea) => (
                  <tr key={tarea.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                    <td className="py-2 px-2">
                      <div className="font-medium text-white">{tarea.titulo}</div>
                      <div className="text-xs text-white/30 line-clamp-2">{tarea.descripcion}</div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {tarea.etiquetas.slice(0, 2).map((etiqueta, index) => (
                          <span key={index} className="px-1 py-0.5 text-xs bg-white/10 rounded border border-white/20">
                            {etiqueta}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-2 px-2">
                      <div className="text-white">{tarea.proyecto}</div>
                    </td>
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-1">
                        <PersonIcon className="w-3 h-3 text-white/40" />
                        <span className="text-white">{tarea.asignado}</span>
                      </div>
                    </td>
                    <td className="py-2 px-2">
                      <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded border ${getEstadoColor(tarea.estado)}`}>
                        {getEstadoText(tarea.estado)}
                      </span>
                    </td>
                    <td className="py-2 px-2">
                      <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded border ${getPrioridadColor(tarea.prioridad)}`}>
                        {getPrioridadText(tarea.prioridad)}
                      </span>
                    </td>
                    <td className="py-2 px-2">
                      <div className="text-xs">
                        <div>Estimado: {tarea.tiempoEstimado}h</div>
                        <div className="text-white/60">Real: {tarea.tiempoReal}h</div>
                      </div>
                    </td>
                    <td className="py-2 px-2">
                      <div className={`text-xs ${isVencida(tarea.fechaVencimiento, tarea.estado) ? 'text-red-400' : 'text-white/70'}`}>
                        {format(new Date(tarea.fechaVencimiento), 'dd/MM/yyyy', { locale: es })}
                        {isVencida(tarea.fechaVencimiento, tarea.estado) && <span className="ml-1">(Vencida)</span>}
                      </div>
                    </td>
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedTarea(tarea);
                            setShowModal(true);
                          }}
                          className="p-1 text-white/40 hover:text-white hover:bg-white/10 rounded transition-colors"
                          title="Ver detalles"
                        >
                          <PersonIcon className="w-4 h-4" />
                        </button>
                        {tarea.estado !== 'completada' && (
                          <button
                            onClick={() => cambiarEstado(tarea.id, 'completada')}
                            className="p-1 text-green-400/60 hover:text-green-400 hover:bg-green-500/10 rounded transition-colors"
                            title="Marcar como completada"
                          >
                            <CheckIcon className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          className="p-1 text-white/40 hover:text-white hover:bg-white/10 rounded transition-colors"
                          title="Editar"
                        >
                          <PersonIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredTareas.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-white/30">No se encontraron tareas</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTareas.map((tarea) => (
              <motion.div
                key={tarea.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white/5 border rounded-lg p-4 hover:bg-white/8 transition-colors ${
                  isVencida(tarea.fechaVencimiento, tarea.estado) ? 'border-red-500/30' : 'border-white/10'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{tarea.titulo}</h3>
                    <p className="text-sm text-white/60">{tarea.proyecto}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded border ${getEstadoColor(tarea.estado)}`}>
                      {getEstadoText(tarea.estado)}
                    </span>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded border ${getPrioridadColor(tarea.prioridad)}`}>
                      {getPrioridadText(tarea.prioridad)}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="text-sm text-white/70 line-clamp-2">{tarea.descripcion}</div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <PersonIcon className="w-3 h-3 text-white/40" />
                      <span className="text-white/70">{tarea.asignado}</span>
                    </div>
                    <div className="text-xs text-white/40">
                      {tarea.tiempoReal}/{tarea.tiempoEstimado}h
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {tarea.etiquetas.map((etiqueta, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-white/10 rounded border border-white/20">
                        {etiqueta}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-white/40">
                    Vence: {format(new Date(tarea.fechaVencimiento), 'dd/MM', { locale: es })}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setSelectedTarea(tarea);
                        setShowModal(true);
                      }}
                      className="p-1 text-white/40 hover:text-white hover:bg-white/10 rounded transition-colors"
                      title="Ver detalles"
                    >
                      <PersonIcon className="w-4 h-4" />
                    </button>
                    {tarea.estado !== 'completada' && (
                      <button
                        onClick={() => cambiarEstado(tarea.id, 'completada')}
                        className="p-1 text-green-400/60 hover:text-green-400 hover:bg-green-500/10 rounded transition-colors"
                        title="Marcar como completada"
                      >
                        <CheckIcon className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 