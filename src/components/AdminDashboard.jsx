import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
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
  ExitIcon,
  DashboardIcon,
  PersonIcon,
  GearIcon,
  RocketIcon
} from '@radix-ui/react-icons';
import ClientsSection from './ClientsSection';

export default function AdminDashboard() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('meetings'); // 'meetings' o 'clients'

  // Estados para estadísticas
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === 'meetings') {
      fetchMeetings();
    }
  }, [activeTab]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('user');
      localStorage.removeItem('session');
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

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

  // Simular datos de reuniones para el resumen
  const upcomingMeetings = [
    {
      id: '1',
      name: 'Juan Pérez',
      company: 'TechCorp',
      meeting_date: '2024-01-15',
      meeting_time: '10:00',
      meeting_type_name: 'Videollamada',
      status: 'pending',
    },
    {
      id: '2',
      name: 'María García',
      company: 'StartupXYZ',
      meeting_date: '2024-01-16',
      meeting_time: '14:30',
      meeting_type_name: 'Llamada telefónica',
      status: 'confirmed',
    },
    {
      id: '3',
      name: 'Carlos Rodríguez',
      company: 'ConsultingPro',
      meeting_date: '2024-01-17',
      meeting_time: '11:00',
      meeting_type_name: 'Chat en vivo',
      status: 'pending',
    }
  ];

  if (loading && activeTab === 'meetings') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Cargando reuniones...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-white/5 border-r border-white/10 transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="p-6 border-b border-white/10 flex items-center justify-center">
          <img src="/assets/weblisy-logo.png" alt="WebLisy" className={`${sidebarOpen ? 'h-8' : 'h-10'} transition-all duration-300`} />
          {sidebarOpen && <span className="text-lg font-semibold ml-3">CRM</span>}
        </div>
        {/* Navigation */}
        <nav className="flex-1 p-4 flex flex-col gap-2">
          <button 
            onClick={() => navigate('/admin/dashboard')}
            className={`w-full flex items-center ${sidebarOpen ? 'gap-3 justify-start px-3 py-2' : 'justify-center py-3'} rounded-lg transition-colors ${window.location.pathname === '/admin/dashboard' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
          >
            <DashboardIcon className={`${sidebarOpen ? 'w-5 h-5' : 'w-7 h-7'} transition-all duration-300`} />
            {sidebarOpen && <span>Dashboard</span>}
          </button>
          <button 
            onClick={() => navigate('/admin/reuniones')}
            className={`w-full flex items-center ${sidebarOpen ? 'gap-3 justify-start px-3 py-2' : 'justify-center py-3'} rounded-lg transition-colors ${window.location.pathname === '/admin/reuniones' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
          >
            <CalendarIcon className={`${sidebarOpen ? 'w-5 h-5' : 'w-7 h-7'} transition-all duration-300`} />
            {sidebarOpen && <span>Reuniones</span>}
          </button>
          <button 
            onClick={() => navigate('/admin/clientes')}
            className={`w-full flex items-center ${sidebarOpen ? 'gap-3 justify-start px-3 py-2' : 'justify-center py-3'} rounded-lg transition-colors ${window.location.pathname === '/admin/clientes' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
          >
            <PersonIcon className={`${sidebarOpen ? 'w-5 h-5' : 'w-7 h-7'} transition-all duration-300`} />
            {sidebarOpen && <span>Clientes</span>}
          </button>
          <button 
            onClick={() => navigate('/admin/facturas')}
            className={`w-full flex items-center ${sidebarOpen ? 'gap-3 justify-start px-3 py-2' : 'justify-center py-3'} rounded-lg transition-colors ${window.location.pathname === '/admin/facturas' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
          >
            <StarIcon className={`${sidebarOpen ? 'w-5 h-5' : 'w-7 h-7'} transition-all duration-300`} />
            {sidebarOpen && <span>Facturas</span>}
          </button>
          <button 
            onClick={() => navigate('/admin/presupuestos')}
            className={`w-full flex items-center ${sidebarOpen ? 'gap-3 justify-start px-3 py-2' : 'justify-center py-3'} rounded-lg transition-colors ${window.location.pathname === '/admin/presupuestos' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
          >
            <GearIcon className={`${sidebarOpen ? 'w-5 h-5' : 'w-7 h-7'} transition-all duration-300`} />
            {sidebarOpen && <span>Presupuestos</span>}
          </button>
          <button 
            onClick={() => navigate('/admin/proyectos')}
            className={`w-full flex items-center ${sidebarOpen ? 'gap-3 justify-start px-3 py-2' : 'justify-center py-3'} rounded-lg transition-colors ${window.location.pathname === '/admin/proyectos' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
          >
            <RocketIcon className={`${sidebarOpen ? 'w-5 h-5' : 'w-7 h-7'} transition-all duration-300`} />
            {sidebarOpen && <span>Proyectos</span>}
          </button>
          <button 
            onClick={() => navigate('/admin/tareas')}
            className={`w-full flex items-center ${sidebarOpen ? 'gap-3 justify-start px-3 py-2' : 'justify-center py-3'} rounded-lg transition-colors ${window.location.pathname === '/admin/tareas' ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
          >
            <CheckIcon className={`${sidebarOpen ? 'w-5 h-5' : 'w-7 h-7'} transition-all duration-300`} />
            {sidebarOpen && <span>Tareas</span>}
          </button>
        </nav>
        {/* Logout */}
        <div className="p-4 border-t border-white/10 flex items-center justify-center">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${sidebarOpen ? 'gap-3 justify-start px-3 py-2' : 'justify-center py-3'} rounded-lg text-white/60 hover:bg-white/5 hover:text-white transition-colors`}
          >
            <ExitIcon className={`${sidebarOpen ? 'w-5 h-5' : 'w-7 h-7'} transition-all duration-300`} />
            {sidebarOpen && <span>Cerrar sesión</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white/5 border-b border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <p className="text-white/60 text-sm mt-1">Resumen general del CRM</p>
            </div>
            
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <DashboardIcon className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          {/* Tarjetas de estadísticas generales (clientes y reuniones) */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/8 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm">Total</p>
                  <p className="text-2xl font-semibold">{stats.total}</p>
                </div>
                <CalendarIcon className="w-6 h-6 text-white/30" />
              </div>
            </div>

            <div className="bg-yellow-500/5 border border-yellow-500/10 rounded-lg p-4 hover:bg-yellow-500/8 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-400 text-sm">Pendientes</p>
                  <p className="text-2xl font-semibold text-yellow-400">{stats.pending}</p>
                </div>
                <ClockIcon className="w-6 h-6 text-yellow-400/30" />
              </div>
            </div>

            <div className="bg-blue-500/5 border border-blue-500/10 rounded-lg p-4 hover:bg-blue-500/8 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-400 text-sm">Confirmadas</p>
                  <p className="text-2xl font-semibold text-blue-400">{stats.confirmed}</p>
                </div>
                <CheckIcon className="w-6 h-6 text-blue-400/30" />
              </div>
            </div>

            <div className="bg-green-500/5 border border-green-500/10 rounded-lg p-4 hover:bg-green-500/8 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-400 text-sm">Completadas</p>
                  <p className="text-2xl font-semibold text-green-400">{stats.completed}</p>
                </div>
                <StarIcon className="w-6 h-6 text-green-400/30" />
              </div>
            </div>

            <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-4 hover:bg-red-500/8 transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-400 text-sm">Canceladas</p>
                  <p className="text-2xl font-semibold text-red-400">{stats.cancelled}</p>
                </div>
                <Cross2Icon className="w-6 h-6 text-red-400/30" />
              </div>
            </div>
          </div>

          {/* Tabla de clientes */}
          <ClientsSection />

          {/* Resumen de próximas reuniones */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-2">Próximas reuniones</h2>
            <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-white/40 border-b border-white/10">
                    <th className="py-2 px-2 font-medium text-left">Cliente</th>
                    <th className="py-2 px-2 font-medium text-left">Empresa</th>
                    <th className="py-2 px-2 font-medium text-left">Fecha</th>
                    <th className="py-2 px-2 font-medium text-left">Hora</th>
                    <th className="py-2 px-2 font-medium text-left">Tipo</th>
                    <th className="py-2 px-2 font-medium text-left">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingMeetings.map((meeting) => (
                    <tr key={meeting.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                      <td className="py-2 px-2">{meeting.name}</td>
                      <td className="py-2 px-2">{meeting.company}</td>
                      <td className="py-2 px-2">{meeting.meeting_date}</td>
                      <td className="py-2 px-2">{meeting.meeting_time}</td>
                      <td className="py-2 px-2">{meeting.meeting_type_name}</td>
                      <td className="py-2 px-2">{meeting.status === 'pending' ? 'Pendiente' : meeting.status === 'confirmed' ? 'Confirmada' : 'Otra'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Modal de detalles de reunión */}
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
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white/5 border border-white/10 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold">Detalles de la Reunión</h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-white/50 hover:text-white hover:bg-white/5 rounded p-1 transition-colors"
                  >
                    <Cross2Icon className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2">Información del Cliente</h4>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-lg space-y-2">
                      <p><strong>Nombre:</strong> {selectedMeeting.name}</p>
                      <p><strong>Email:</strong> {selectedMeeting.email}</p>
                      <p><strong>Empresa:</strong> {selectedMeeting.company}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">Detalles de la Reunión</h4>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-lg space-y-2">
                      <p><strong>Fecha:</strong> {format(new Date(selectedMeeting.meeting_date), 'dd/MM/yyyy', { locale: es })}</p>
                      <p><strong>Hora:</strong> {selectedMeeting.meeting_time}</p>
                      <p><strong>Tipo:</strong> {selectedMeeting.meeting_type_name}</p>
                      <p><strong>Estado:</strong> <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(selectedMeeting.status)}`}>
                        {getStatusText(selectedMeeting.status)}
                      </span></p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">Mensaje</h4>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                      <p className="text-white/70">{selectedMeeting.message}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2">Información del Sistema</h4>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-lg space-y-2 text-sm text-white/50">
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
    </div>
  );
} 