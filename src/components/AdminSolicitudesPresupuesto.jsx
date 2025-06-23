import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { supabase } from '../lib/supabase';
import { 
  PlusIcon,
  MagnifyingGlassIcon,
  StarIcon,
  PersonIcon,
  Cross2Icon,
  HomeIcon,
  CalendarIcon,
  TrashIcon,
  CheckIcon,
  ClockIcon,
  DownloadIcon,
  EyeOpenIcon,
  Pencil1Icon,
  ChatBubbleIcon
} from '@radix-ui/react-icons';

const mockSolicitudes = [
  {
    id: 'SR-2024-001',
    name: 'Ana López',
    email: 'ana@empresa.com',
    company: 'TechCorp Solutions',
    project_type: 'e-commerce',
    features: 'Necesito una tienda online con pasarela de pago, gestión de inventario y panel de administración',
    budget: '5000-10000',
    timeline: '2-3 meses',
    status: 'new',
    priority: 'high',
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 'SR-2024-002',
    name: 'Carlos Rodríguez',
    email: 'carlos@startup.com',
    company: 'StartupXYZ',
    project_type: 'aplicacion-web',
    features: 'Sistema de gestión de inventarios con lectores de códigos de barras',
    budget: '3000-5000',
    timeline: '1-2 meses',
    status: 'reviewing',
    priority: 'medium',
    created_at: '2024-01-10T14:20:00Z'
  },
  {
    id: 'SR-2024-003',
    name: 'María García',
    email: 'maria@digital.com',
    company: 'DigitalAgency',
    project_type: 'web-corporativa',
    features: 'Rediseño completo del sitio web corporativo con blog integrado',
    budget: '1000-3000',
    timeline: '1-2 meses',
    status: 'quoted',
    priority: 'low',
    created_at: '2024-01-08T09:15:00Z'
  }
];

export default function AdminSolicitudesPresupuesto() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [priorityFilter, setPriorityFilter] = useState('todos');
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    reviewing: 0,
    quoted: 0,
    converted: 0,
    archived: 0
  });

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const fetchSolicitudes = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('presupuesto_requests')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        console.error('Error al obtener solicitudes:', error);
        setSolicitudes([]);
      } else {
        setSolicitudes(data);
        calculateStats(data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setSolicitudes([]);
      setLoading(false);
    }
  };

  const calculateStats = (solicitudesData) => {
    const stats = {
      total: solicitudesData.length,
      new: solicitudesData.filter(s => s.status === 'new').length,
      reviewing: solicitudesData.filter(s => s.status === 'reviewing').length,
      quoted: solicitudesData.filter(s => s.status === 'quoted').length,
      converted: solicitudesData.filter(s => s.status === 'converted').length,
      archived: solicitudesData.filter(s => s.status === 'archived').length
    };
    setStats(stats);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'reviewing': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'quoted': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'converted': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'archived': return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'new': return 'Nueva';
      case 'reviewing': return 'En Revisión';
      case 'quoted': return 'Presupuestada';
      case 'converted': return 'Convertida';
      case 'archived': return 'Archivada';
      default: return status;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'high': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'low': return 'bg-green-500/10 text-green-400 border-green-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'urgent': return 'Urgente';
      case 'high': return 'Alta';
      case 'medium': return 'Media';
      case 'low': return 'Baja';
      default: return priority;
    }
  };

  const getProjectTypeText = (type) => {
    switch (type) {
      case 'web-corporativa': return 'Web Corporativa';
      case 'e-commerce': return 'E-commerce';
      case 'aplicacion-web': return 'Aplicación Web';
      case 'landing-page': return 'Landing Page';
      case 'mantenimiento': return 'Mantenimiento';
      default: return type;
    }
  };

  const filteredSolicitudes = solicitudes.filter(solicitud => {
    const matchesSearch = 
      solicitud.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      solicitud.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      solicitud.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      solicitud.project_type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'todos' || solicitud.status === statusFilter;
    const matchesPriority = priorityFilter === 'todos' || solicitud.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleStatusChange = async (solicitudId, newStatus) => {
    try {
      // Aquí se actualizaría en Supabase
      setSolicitudes(prev => 
        prev.map(s => s.id === solicitudId ? { ...s, status: newStatus } : s)
      );
      calculateStats(solicitudes.map(s => s.id === solicitudId ? { ...s, status: newStatus } : s));
    } catch (error) {
      console.error('Error al actualizar estado:', error);
    }
  };

  const handlePriorityChange = async (solicitudId, newPriority) => {
    try {
      // Aquí se actualizaría en Supabase
      setSolicitudes(prev => 
        prev.map(s => s.id === solicitudId ? { ...s, priority: newPriority } : s)
      );
    } catch (error) {
      console.error('Error al actualizar prioridad:', error);
    }
  };

  const handleConvertToPresupuesto = (solicitud) => {
    // Aquí se abriría el modal para crear presupuesto
    setSelectedSolicitud(solicitud);
    setShowModal(true);
  };

  const handleViewDetails = (solicitud) => {
    setSelectedSolicitud(solicitud);
    setShowDetailModal(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#038e42]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Solicitudes de Presupuesto</h1>
          <p className="text-white/60">Gestiona las solicitudes que llegan desde la web</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <div className="bg-white/5 rounded-lg p-4 border border-white/10">
          <div className="text-2xl font-bold text-white">{stats.total}</div>
          <div className="text-sm text-white/60">Total</div>
        </div>
        <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
          <div className="text-2xl font-bold text-blue-400">{stats.new}</div>
          <div className="text-sm text-blue-400/60">Nuevas</div>
        </div>
        <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
          <div className="text-2xl font-bold text-yellow-400">{stats.reviewing}</div>
          <div className="text-sm text-yellow-400/60">En Revisión</div>
        </div>
        <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
          <div className="text-2xl font-bold text-purple-400">{stats.quoted}</div>
          <div className="text-sm text-purple-400/60">Presupuestadas</div>
        </div>
        <div className="bg-green-500/10 rounded-lg p-4 border border-green-500/20">
          <div className="text-2xl font-bold text-green-400">{stats.converted}</div>
          <div className="text-sm text-green-400/60">Convertidas</div>
        </div>
        <div className="bg-gray-500/10 rounded-lg p-4 border border-gray-500/20">
          <div className="text-2xl font-bold text-gray-400">{stats.archived}</div>
          <div className="text-sm text-gray-400/60">Archivadas</div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input
            type="text"
            placeholder="Buscar solicitudes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-sm text-white placeholder-white/20 focus:border-white/20 focus:outline-none focus:bg-white/10 transition-colors"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-sm text-white focus:border-white/20 focus:outline-none focus:bg-white/10 transition-colors"
        >
          <option value="todos">Todos los estados</option>
          <option value="new">Nuevas</option>
          <option value="reviewing">En Revisión</option>
          <option value="quoted">Presupuestadas</option>
          <option value="converted">Convertidas</option>
          <option value="archived">Archivadas</option>
        </select>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-sm text-white focus:border-white/20 focus:outline-none focus:bg-white/10 transition-colors"
        >
          <option value="todos">Todas las prioridades</option>
          <option value="urgent">Urgente</option>
          <option value="high">Alta</option>
          <option value="medium">Media</option>
          <option value="low">Baja</option>
        </select>
      </div>

      {/* Tabla */}
      <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Solicitud</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Cliente</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Proyecto</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Presupuesto</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Estado</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Prioridad</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Fecha</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredSolicitudes.map((solicitud) => (
                <tr key={solicitud.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                  <td className="py-3 px-4">
                    <div className="font-medium text-white">{solicitud.id}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-white">{solicitud.name}</div>
                    <div className="text-xs text-white/30">{solicitud.email}</div>
                    {solicitud.company && (
                      <div className="text-xs text-white/30">{solicitud.company}</div>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-white">{getProjectTypeText(solicitud.project_type)}</div>
                    <div className="text-xs text-white/30 max-w-xs truncate">{solicitud.features}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-white">{solicitud.budget}</div>
                    <div className="text-xs text-white/30">{solicitud.timeline}</div>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={solicitud.status}
                      onChange={(e) => handleStatusChange(solicitud.id, e.target.value)}
                      className={`text-xs font-medium rounded border px-2 py-1 bg-transparent ${getStatusColor(solicitud.status)}`}
                    >
                      <option value="new">Nueva</option>
                      <option value="reviewing">En Revisión</option>
                      <option value="quoted">Presupuestada</option>
                      <option value="converted">Convertida</option>
                      <option value="archived">Archivada</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={solicitud.priority}
                      onChange={(e) => handlePriorityChange(solicitud.id, e.target.value)}
                      className={`text-xs font-medium rounded border px-2 py-1 bg-transparent ${getPriorityColor(solicitud.priority)}`}
                    >
                      <option value="urgent">Urgente</option>
                      <option value="high">Alta</option>
                      <option value="medium">Media</option>
                      <option value="low">Baja</option>
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-xs text-white/70">
                      {format(new Date(solicitud.created_at), 'dd/MM/yyyy', { locale: es })}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleViewDetails(solicitud)}
                        className="p-1 text-white/60 hover:text-white transition-colors"
                        title="Ver detalles"
                      >
                        <EyeOpenIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleConvertToPresupuesto(solicitud)}
                        className="p-1 text-[#038e42] hover:text-[#038e42]/80 transition-colors"
                        title="Convertir a presupuesto"
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de detalles */}
      <AnimatePresence>
        {showDetailModal && selectedSolicitud && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDetailModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#1c1c1c] rounded-lg w-full max-w-2xl p-6 border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold text-white">Detalles de la Solicitud</h2>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-white/60 hover:text-white"
                >
                  <Cross2Icon className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-white/60">ID</label>
                    <div className="text-white font-medium">{selectedSolicitud.id}</div>
                  </div>
                  <div>
                    <label className="text-sm text-white/60">Fecha</label>
                    <div className="text-white font-medium">
                      {format(new Date(selectedSolicitud.created_at), 'dd/MM/yyyy HH:mm', { locale: es })}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-white/60">Nombre</label>
                  <div className="text-white font-medium">{selectedSolicitud.name}</div>
                </div>

                <div>
                  <label className="text-sm text-white/60">Email</label>
                  <div className="text-white font-medium">{selectedSolicitud.email}</div>
                </div>

                {selectedSolicitud.company && (
                  <div>
                    <label className="text-sm text-white/60">Empresa</label>
                    <div className="text-white font-medium">{selectedSolicitud.company}</div>
                  </div>
                )}

                <div>
                  <label className="text-sm text-white/60">Tipo de Proyecto</label>
                  <div className="text-white font-medium">{getProjectTypeText(selectedSolicitud.project_type)}</div>
                </div>

                <div>
                  <label className="text-sm text-white/60">Funcionalidades</label>
                  <div className="text-white bg-white/5 p-3 rounded border border-white/10">
                    {selectedSolicitud.features}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-white/60">Presupuesto</label>
                    <div className="text-white font-medium">{selectedSolicitud.budget}</div>
                  </div>
                  <div>
                    <label className="text-sm text-white/60">Plazo</label>
                    <div className="text-white font-medium">{selectedSolicitud.timeline}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-white/60">Estado</label>
                    <select
                      value={selectedSolicitud.status}
                      onChange={(e) => handleStatusChange(selectedSolicitud.id, e.target.value)}
                      className={`text-sm font-medium rounded border px-3 py-2 bg-transparent ${getStatusColor(selectedSolicitud.status)}`}
                    >
                      <option value="new">Nueva</option>
                      <option value="reviewing">En Revisión</option>
                      <option value="quoted">Presupuestada</option>
                      <option value="converted">Convertida</option>
                      <option value="archived">Archivada</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-white/60">Prioridad</label>
                    <select
                      value={selectedSolicitud.priority}
                      onChange={(e) => handlePriorityChange(selectedSolicitud.id, e.target.value)}
                      className={`text-sm font-medium rounded border px-3 py-2 bg-transparent ${getPriorityColor(selectedSolicitud.priority)}`}
                    >
                      <option value="urgent">Urgente</option>
                      <option value="high">Alta</option>
                      <option value="medium">Media</option>
                      <option value="low">Baja</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-4 py-2 rounded bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    handleConvertToPresupuesto(selectedSolicitud);
                  }}
                  className="px-4 py-2 rounded bg-[#038e42] text-white hover:bg-[#038e42]/80 transition-colors"
                >
                  Convertir a Presupuesto
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal para convertir a presupuesto */}
      <AnimatePresence>
        {showModal && selectedSolicitud && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#1c1c1c] rounded-lg w-full max-w-2xl p-6 border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold text-white">Convertir a Presupuesto</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white/60 hover:text-white"
                >
                  <Cross2Icon className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-400 mb-2">Información de la Solicitud</h3>
                  <div className="text-sm text-white/80">
                    <p><strong>Cliente:</strong> {selectedSolicitud.name} ({selectedSolicitud.email})</p>
                    <p><strong>Proyecto:</strong> {getProjectTypeText(selectedSolicitud.project_type)}</p>
                    <p><strong>Presupuesto estimado:</strong> {selectedSolicitud.budget}</p>
                    <p><strong>Plazo:</strong> {selectedSolicitud.timeline}</p>
                  </div>
                </div>

                <p className="text-white/80">
                  Esta acción creará un presupuesto formal basado en la solicitud y marcará la solicitud como "Convertida".
                </p>

                <div className="flex justify-end gap-4 mt-6">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded bg-white/10 text-white hover:bg-white/20 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={() => {
                      // Aquí se redirigiría al formulario de presupuesto con los datos pre-rellenados
                      setShowModal(false);
                      // Redirigir a la página de presupuestos con los datos
                      window.location.href = '/admin/presupuestos?from_request=' + selectedSolicitud.id;
                    }}
                    className="px-4 py-2 rounded bg-[#038e42] text-white hover:bg-[#038e42]/80 transition-colors"
                  >
                    Crear Presupuesto
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 