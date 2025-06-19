import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  CalendarIcon,
  ClockIcon,
  VideoIcon,
  ChatBubbleIcon,
  MobileIcon,
  MagnifyingGlassIcon,
  ReloadIcon,
  CheckIcon,
  Cross2Icon,
  TrashIcon,
  StarIcon,
  PersonIcon
} from '@radix-ui/react-icons';

export default function AdminMeetings() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0
  });

  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchMeetings = async () => {
    try {
      setLoading(true);
      // Datos de ejemplo
      const mockMeetings = [
        {
          id: '1',
          name: 'Juan Pérez',
          email: 'juan.perez@empresa.com',
          company: 'TechCorp',
          message: 'Necesito una aplicación web para gestionar inventarios',
          meeting_date: '2024-01-15',
          meeting_time: '10:00',
          meeting_type: 'video',
          meeting_type_name: 'Videollamada',
          status: 'pending',
          created_at: '2024-01-10T09:30:00Z',
          updated_at: '2024-01-10T09:30:00Z'
        },
        {
          id: '2',
          name: 'María García',
          email: 'maria.garcia@startup.com',
          company: 'StartupXYZ',
          message: 'Quiero desarrollar una plataforma de e-commerce',
          meeting_date: '2024-01-16',
          meeting_time: '14:30',
          meeting_type: 'phone',
          meeting_type_name: 'Llamada telefónica',
          status: 'confirmed',
          created_at: '2024-01-09T15:20:00Z',
          updated_at: '2024-01-11T10:15:00Z'
        },
        {
          id: '3',
          name: 'Carlos Rodríguez',
          email: 'carlos.rodriguez@consulting.com',
          company: 'ConsultingPro',
          message: 'Busco una solución para automatizar procesos internos',
          meeting_date: '2024-01-14',
          meeting_time: '11:00',
          meeting_type: 'chat',
          meeting_type_name: 'Chat en vivo',
          status: 'completed',
          created_at: '2024-01-08T12:45:00Z',
          updated_at: '2024-01-14T11:30:00Z'
        },
        {
          id: '4',
          name: 'Ana López',
          email: 'ana.lopez@digital.com',
          company: 'DigitalAgency',
          message: 'Necesito un sitio web corporativo moderno',
          meeting_date: '2024-01-17',
          meeting_time: '16:00',
          meeting_type: 'video',
          meeting_type_name: 'Videollamada',
          status: 'pending',
          created_at: '2024-01-12T08:15:00Z',
          updated_at: '2024-01-12T08:15:00Z'
        },
        {
          id: '5',
          name: 'Roberto Silva',
          email: 'roberto.silva@restaurant.com',
          company: 'RestaurantElite',
          message: 'Quiero una aplicación para gestionar reservas',
          meeting_date: '2024-01-13',
          meeting_time: '13:00',
          meeting_type: 'phone',
          meeting_type_name: 'Llamada telefónica',
          status: 'cancelled',
          created_at: '2024-01-07T16:30:00Z',
          updated_at: '2024-01-12T14:20:00Z'
        }
      ];
      setTimeout(() => {
        setMeetings(mockMeetings);
        calculateStats(mockMeetings);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const calculateStats = (meetingsData) => {
    const stats = {
      total: meetingsData.length,
      pending: meetingsData.filter(m => m.status === 'pending').length,
      confirmed: meetingsData.filter(m => m.status === 'confirmed').length,
      completed: meetingsData.filter(m => m.status === 'completed').length,
      cancelled: meetingsData.filter(m => m.status === 'cancelled').length
    };
    setStats(stats);
  };

  const updateMeetingStatus = async (meetingId, newStatus) => {
    try {
      setUpdating(true);
      const updatedMeetings = meetings.map(meeting => 
        meeting.id === meetingId 
          ? { ...meeting, status: newStatus, updated_at: new Date().toISOString() }
          : meeting
      );
      setMeetings(updatedMeetings);
      calculateStats(updatedMeetings);
      setTimeout(() => {
        setUpdating(false);
      }, 300);
    } catch (error) {
      console.error('Error:', error);
      setUpdating(false);
    }
  };

  const deleteMeeting = async (meetingId) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta reunión?')) {
      return;
    }
    try {
      const updatedMeetings = meetings.filter(m => m.id !== meetingId);
      setMeetings(updatedMeetings);
      calculateStats(updatedMeetings);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/5 text-yellow-400 border-yellow-500/10';
      case 'confirmed': return 'bg-blue-500/5 text-blue-400 border-blue-500/10';
      case 'completed': return 'bg-green-500/5 text-green-400 border-green-500/10';
      case 'cancelled': return 'bg-red-500/5 text-red-400 border-red-500/10';
      default: return 'bg-gray-500/5 text-gray-400 border-gray-500/10';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'confirmed': return 'Confirmada';
      case 'completed': return 'Completada';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  };

  const getMeetingTypeIcon = (type) => {
    switch (type) {
      case 'video': return <VideoIcon className="w-4 h-4" />;
      case 'phone': return <MobileIcon className="w-4 h-4" />;
      case 'chat': return <ChatBubbleIcon className="w-4 h-4" />;
      default: return <CalendarIcon className="w-4 h-4" />;
    }
  };

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = 
      meeting.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meeting.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (meeting.company && meeting.company.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || meeting.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Cargando reuniones...</p>
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
            <CalendarIcon className="w-4 h-4 text-white/20" />
          </div>
        </div>
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-yellow-400/80">Pendientes</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold text-yellow-400">{stats.pending}</span>
            <ClockIcon className="w-4 h-4 text-yellow-400/20" />
          </div>
        </div>
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-blue-400/80">Confirmadas</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold text-blue-400">{stats.confirmed}</span>
            <CheckIcon className="w-4 h-4 text-blue-400/20" />
          </div>
        </div>
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-green-400/80">Completadas</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold text-green-400">{stats.completed}</span>
            <StarIcon className="w-4 h-4 text-green-400/20" />
          </div>
        </div>
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-red-400/80">Canceladas</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold text-red-400">{stats.cancelled}</span>
            <Cross2Icon className="w-4 h-4 text-red-400/20" />
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input
            type="text"
            placeholder="Buscar reuniones..."
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
          <option value="all">Todos los estados</option>
          <option value="pending">Pendientes</option>
          <option value="confirmed">Confirmadas</option>
          <option value="completed">Completadas</option>
          <option value="cancelled">Canceladas</option>
        </select>
      </div>

      {/* Tabla de reuniones */}
      <div className="flex-1 pb-8">
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/40 border-b border-white/10">
                <th className="py-2 px-2 font-medium text-left">Cliente</th>
                <th className="py-2 px-2 font-medium text-left">Empresa</th>
                <th className="py-2 px-2 font-medium text-left">Fecha y Hora</th>
                <th className="py-2 px-2 font-medium text-left">Tipo</th>
                <th className="py-2 px-2 font-medium text-left">Estado</th>
                <th className="py-2 px-2 font-medium text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredMeetings.map((meeting) => (
                <tr key={meeting.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                  <td className="py-2 px-2">
                    <div className="font-medium text-white">{meeting.name}</div>
                    <div className="text-xs text-white/30">{meeting.email}</div>
                  </td>
                  <td className="py-2 px-2">
                    <div>{meeting.company}</div>
                  </td>
                  <td className="py-2 px-2">
                    <div className="text-sm text-white">{format(new Date(meeting.meeting_date), 'dd/MM/yyyy', { locale: es })}</div>
                    <div className="text-xs text-white/30">{meeting.meeting_time}</div>
                  </td>
                  <td className="py-2 px-2">
                    <div className="flex items-center gap-2">
                      {getMeetingTypeIcon(meeting.meeting_type)}
                      <span className="text-xs text-white/70">{meeting.meeting_type_name}</span>
                    </div>
                  </td>
                  <td className="py-2 px-2">
                    <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded border ${getStatusColor(meeting.status)}`}>
                      {getStatusText(meeting.status)}
                    </span>
                  </td>
                  <td className="py-2 px-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedMeeting(meeting);
                          setShowModal(true);
                        }}
                        className="p-1 text-white/40 hover:text-white hover:bg-white/10 rounded transition-colors"
                        title="Ver detalles"
                      >
                        <CalendarIcon className="w-4 h-4" />
                      </button>
                      {meeting.status === 'pending' && (
                        <>
                          <button
                            onClick={() => updateMeetingStatus(meeting.id, 'confirmed')}
                            disabled={updating}
                            className="p-1 text-blue-400/60 hover:text-blue-400 hover:bg-blue-500/10 rounded transition-colors disabled:opacity-50"
                            title="Confirmar"
                          >
                            <CheckIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => updateMeetingStatus(meeting.id, 'cancelled')}
                            disabled={updating}
                            className="p-1 text-red-400/60 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors disabled:opacity-50"
                            title="Cancelar"
                          >
                            <Cross2Icon className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      {meeting.status === 'confirmed' && (
                        <button
                          onClick={() => updateMeetingStatus(meeting.id, 'completed')}
                          disabled={updating}
                          className="p-1 text-green-400/60 hover:text-green-400 hover:bg-green-500/10 rounded transition-colors disabled:opacity-50"
                          title="Marcar como completada"
                        >
                          <StarIcon className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => deleteMeeting(meeting.id)}
                        className="p-1 text-red-400/60 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                        title="Eliminar"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredMeetings.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-white/30">No se encontraron reuniones</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de detalles */}
      <AnimatePresence>
        {showModal && selectedMeeting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              className="bg-white/5 border border-white/10 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold">Detalles de la Reunión</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white/40 hover:text-white hover:bg-white/10 rounded p-1 transition-colors"
                >
                  <Cross2Icon className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2 text-sm">Información del Cliente</h4>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg space-y-2">
                    <p><strong>Nombre:</strong> {selectedMeeting.name}</p>
                    <p><strong>Email:</strong> {selectedMeeting.email}</p>
                    <p><strong>Empresa:</strong> {selectedMeeting.company}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2 text-sm">Detalles de la Reunión</h4>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg space-y-2">
                    <p><strong>Fecha:</strong> {format(new Date(selectedMeeting.meeting_date), 'dd/MM/yyyy', { locale: es })}</p>
                    <p><strong>Hora:</strong> {selectedMeeting.meeting_time}</p>
                    <p><strong>Tipo:</strong> {selectedMeeting.meeting_type_name}</p>
                    <p><strong>Estado:</strong> <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded border ${getStatusColor(selectedMeeting.status)}`}>
                      {getStatusText(selectedMeeting.status)}
                    </span></p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2 text-sm">Mensaje</h4>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                    <p className="text-white/70">{selectedMeeting.message}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2 text-sm">Información del Sistema</h4>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg space-y-2 text-xs text-white/50">
                    <p><strong>Creado:</strong> {format(new Date(selectedMeeting.created_at), 'dd/MM/yyyy HH:mm', { locale: es })}</p>
                    <p><strong>Actualizado:</strong> {format(new Date(selectedMeeting.updated_at), 'dd/MM/yyyy HH:mm', { locale: es })}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 