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
  RocketIcon,
  ClockIcon,
  CheckIcon,
  ArrowRightIcon,
  TrashIcon
} from '@radix-ui/react-icons';

const mockProyectos = [
  {
    id: 'PRJ-2024-001',
    titulo: 'E-commerce TechCorp',
    cliente: { nombre: 'María García', empresa: 'TechCorp Solutions' },
    descripcion: 'Desarrollo de plataforma completa de comercio electrónico',
    estado: 'en_progreso',
    prioridad: 'alta',
    fechaInicio: '2024-01-15',
    fechaFin: '2024-04-15',
    progreso: 65,
    presupuesto: 15000,
    gastado: 9750,
    equipo: ['Desarrollador Frontend', 'Desarrollador Backend', 'Diseñador UI/UX'],
    tecnologias: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    tareas: [
      { id: 1, titulo: 'Diseño de interfaz', estado: 'completada', progreso: 100 },
      { id: 2, titulo: 'Desarrollo frontend', estado: 'en_progreso', progreso: 80 },
      { id: 3, titulo: 'Desarrollo backend', estado: 'en_progreso', progreso: 60 },
      { id: 4, titulo: 'Integración de pagos', estado: 'pendiente', progreso: 0 },
      { id: 5, titulo: 'Testing y QA', estado: 'pendiente', progreso: 0 }
    ],
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 'PRJ-2024-002',
    titulo: 'Sistema de Inventarios',
    cliente: { nombre: 'Carlos Rodríguez', empresa: 'StartupXYZ' },
    descripcion: 'Aplicación web para control de stock y reportes',
    estado: 'planificado',
    prioridad: 'media',
    fechaInicio: '2024-02-01',
    fechaFin: '2024-05-01',
    progreso: 0,
    presupuesto: 12000,
    gastado: 0,
    equipo: ['Desarrollador Full Stack', 'Analista de Datos'],
    tecnologias: ['React', 'Express', 'PostgreSQL', 'Chart.js'],
    tareas: [
      { id: 1, titulo: 'Análisis de requisitos', estado: 'pendiente', progreso: 0 },
      { id: 2, titulo: 'Diseño de base de datos', estado: 'pendiente', progreso: 0 },
      { id: 3, titulo: 'Desarrollo de la aplicación', estado: 'pendiente', progreso: 0 }
    ],
    created_at: '2024-01-20T14:20:00Z'
  },
  {
    id: 'PRJ-2024-003',
    titulo: 'Rediseño Web DigitalAgency',
    cliente: { nombre: 'Ana López', empresa: 'DigitalAgency' },
    descripcion: 'Rediseño completo del sitio web corporativo',
    estado: 'completado',
    prioridad: 'baja',
    fechaInicio: '2023-12-01',
    fechaFin: '2024-01-15',
    progreso: 100,
    presupuesto: 8000,
    gastado: 8000,
    equipo: ['Diseñador UI/UX', 'Desarrollador Frontend'],
    tecnologias: ['HTML', 'CSS', 'JavaScript', 'Figma'],
    tareas: [
      { id: 1, titulo: 'Diseño de wireframes', estado: 'completada', progreso: 100 },
      { id: 2, titulo: 'Desarrollo frontend', estado: 'completada', progreso: 100 },
      { id: 3, titulo: 'Optimización SEO', estado: 'completada', progreso: 100 }
    ],
    created_at: '2023-12-01T09:15:00Z'
  },
  {
    id: 'PRJ-2024-004',
    titulo: 'Sistema de Reservas RestaurantElite',
    cliente: { nombre: 'Roberto Silva', empresa: 'RestaurantElite' },
    descripcion: 'Plataforma para gestión de reservas de restaurante',
    estado: 'en_progreso',
    prioridad: 'alta',
    fechaInicio: '2024-01-25',
    fechaFin: '2024-03-25',
    progreso: 30,
    presupuesto: 10000,
    gastado: 3000,
    equipo: ['Desarrollador Full Stack', 'Desarrollador Móvil'],
    tecnologias: ['Next.js', 'React Native', 'PostgreSQL', 'Stripe'],
    tareas: [
      { id: 1, titulo: 'Desarrollo de la plataforma web', estado: 'en_progreso', progreso: 60 },
      { id: 2, titulo: 'Desarrollo de app móvil', estado: 'pendiente', progreso: 0 },
      { id: 3, titulo: 'Integración con calendario', estado: 'pendiente', progreso: 0 }
    ],
    created_at: '2024-01-25T08:30:00Z'
  }
];

export default function AdminProyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [estadoFilter, setEstadoFilter] = useState('todos');
  const [selectedProyecto, setSelectedProyecto] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [viewMode, setViewMode] = useState('table');

  const [stats, setStats] = useState({
    total: 0,
    en_progreso: 0,
    completados: 0,
    planificados: 0,
    presupuestoTotal: 0,
    gastadoTotal: 0
  });

  useEffect(() => {
    fetchProyectos();
  }, []);

  const fetchProyectos = async () => {
    try {
      setLoading(true);
      setTimeout(() => {
        setProyectos(mockProyectos);
        calculateStats(mockProyectos);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const calculateStats = (proyectosData) => {
    const stats = {
      total: proyectosData.length,
      en_progreso: proyectosData.filter(p => p.estado === 'en_progreso').length,
      completados: proyectosData.filter(p => p.estado === 'completado').length,
      planificados: proyectosData.filter(p => p.estado === 'planificado').length,
      presupuestoTotal: proyectosData.reduce((sum, p) => sum + p.presupuesto, 0),
      gastadoTotal: proyectosData.reduce((sum, p) => sum + p.gastado, 0)
    };
    setStats(stats);
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'en_progreso': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'completado': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'planificado': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'pausado': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'cancelado': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getEstadoText = (estado) => {
    switch (estado) {
      case 'en_progreso': return 'En Progreso';
      case 'completado': return 'Completado';
      case 'planificado': return 'Planificado';
      case 'pausado': return 'Pausado';
      case 'cancelado': return 'Cancelado';
      default: return estado;
    }
  };

  const getEstadoIcon = (estado) => {
    switch (estado) {
      case 'planificado': return <ClockIcon className="w-4 h-4" />;
      case 'en_progreso': return <ArrowRightIcon className="w-4 h-4" />;
      case 'completado': return <CheckIcon className="w-4 h-4" />;
      case 'pausado': return <ClockIcon className="w-4 h-4" />;
      case 'cancelado': return <Cross2Icon className="w-4 h-4" />;
      default: return <RocketIcon className="w-4 h-4" />;
    }
  };

  const filteredProyectos = proyectos.filter(proyecto => {
    const matchesSearch = 
      proyecto.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proyecto.cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      proyecto.cliente.empresa.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEstado = estadoFilter === 'todos' || proyecto.estado === estadoFilter;
    
    return matchesSearch && matchesEstado;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Cargando proyectos...</p>
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
            <RocketIcon className="w-4 h-4 text-white/20" />
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
          <span className="text-xs text-green-400/80">Completados</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold text-green-400">{stats.completados}</span>
            <CheckIcon className="w-4 h-4 text-green-400/20" />
          </div>
        </div>
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-yellow-400/80">Planificados</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold text-yellow-400">{stats.planificados}</span>
            <ClockIcon className="w-4 h-4 text-yellow-400/20" />
          </div>
        </div>
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-purple-400/80">Presupuesto</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold text-purple-400">€{stats.presupuestoTotal.toLocaleString()}</span>
            <StarIcon className="w-4 h-4 text-purple-400/20" />
          </div>
        </div>
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-orange-400/80">Gastado</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold text-orange-400">€{stats.gastadoTotal.toLocaleString()}</span>
            <StarIcon className="w-4 h-4 text-orange-400/20" />
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input
            type="text"
            placeholder="Buscar proyectos..."
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
          <option value="en_progreso">En Progreso</option>
          <option value="completado">Completados</option>
          <option value="planificado">Planificados</option>
          <option value="pausado">Pausados</option>
          <option value="cancelado">Cancelados</option>
        </select>
      </div>

      {/* Contenido */}
      <div className="flex-1 pb-8">
        {viewMode === 'table' ? (
          <div className="overflow-x-auto rounded-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-white/40 border-b border-white/10">
                  <th className="py-2 px-2 font-medium text-left">ID</th>
                  <th className="py-2 px-2 font-medium text-left">Proyecto</th>
                  <th className="py-2 px-2 font-medium text-left">Cliente</th>
                  <th className="py-2 px-2 font-medium text-left">Estado</th>
                  <th className="py-2 px-2 font-medium text-left">Progreso</th>
                  <th className="py-2 px-2 font-medium text-left">Presupuesto</th>
                  <th className="py-2 px-2 font-medium text-left">Fechas</th>
                  <th className="py-2 px-2 font-medium text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredProyectos.map((proyecto) => (
                  <tr key={proyecto.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                    <td className="py-2 px-2">
                      <div className="font-medium text-white">{proyecto.id}</div>
                    </td>
                    <td className="py-2 px-2">
                      <div className="font-medium text-white">{proyecto.titulo}</div>
                      <div className="text-xs text-white/30">{proyecto.descripcion}</div>
                    </td>
                    <td className="py-2 px-2">
                      <div className="font-medium text-white">{proyecto.cliente.nombre}</div>
                      <div className="text-xs text-white/30">{proyecto.cliente.empresa}</div>
                    </td>
                    <td className="py-2 px-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded border ${getEstadoColor(proyecto.estado)}`}>
                        {getEstadoIcon(proyecto.estado)}
                        {getEstadoText(proyecto.estado)}
                      </span>
                    </td>
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-white/10 rounded-full h-2">
                          <div 
                            className="bg-[#038e42] h-2 rounded-full transition-all"
                            style={{ width: `${proyecto.progreso}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-white/60">{proyecto.progreso}%</span>
                      </div>
                    </td>
                    <td className="py-2 px-2">
                      <div className="font-semibold">€{proyecto.presupuesto.toLocaleString()}</div>
                      <div className="text-xs text-white/30">Gastado: €{proyecto.gastado.toLocaleString()}</div>
                    </td>
                    <td className="py-2 px-2">
                      <div className="text-xs text-white/70">
                        <div>Inicio: {format(new Date(proyecto.fechaInicio), 'dd/MM/yyyy', { locale: es })}</div>
                        <div>Fin: {format(new Date(proyecto.fechaFin), 'dd/MM/yyyy', { locale: es })}</div>
                      </div>
                    </td>
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedProyecto(proyecto);
                            setShowModal(true);
                          }}
                          className="p-1 text-white/40 hover:text-white hover:bg-white/10 rounded transition-colors"
                          title="Ver detalles"
                        >
                          <PersonIcon className="w-4 h-4" />
                        </button>
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
                {filteredProyectos.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-white/30">No se encontraron proyectos</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProyectos.map((proyecto) => (
              <motion.div
                key={proyecto.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/8 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-white">{proyecto.titulo}</h3>
                    <p className="text-sm text-white/60">{proyecto.cliente.empresa}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded border ${getEstadoColor(proyecto.estado)}`}>
                    {getEstadoIcon(proyecto.estado)}
                    {getEstadoText(proyecto.estado)}
                  </span>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="text-sm text-white/70 line-clamp-2">{proyecto.descripcion}</div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/40">Progreso</span>
                      <span className="text-white/60">{proyecto.progreso}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-[#038e42] h-2 rounded-full transition-all"
                        style={{ width: `${proyecto.progreso}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-white/40">Presupuesto:</span>
                      <div className="font-semibold">€{proyecto.presupuesto.toLocaleString()}</div>
                    </div>
                    <div>
                      <span className="text-white/40">Gastado:</span>
                      <div className="font-semibold">€{proyecto.gastado.toLocaleString()}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-white/40">
                    {proyecto.id}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setSelectedProyecto(proyecto);
                        setShowModal(true);
                      }}
                      className="p-1 text-white/40 hover:text-white hover:bg-white/10 rounded transition-colors"
                      title="Ver detalles"
                    >
                      <PersonIcon className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1 text-white/40 hover:text-white hover:bg-white/10 rounded transition-colors"
                      title="Editar"
                    >
                      <PersonIcon className="w-4 h-4" />
                    </button>
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