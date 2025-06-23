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
  RocketIcon,
  EnvelopeClosedIcon,
  PinRightIcon,
  BellIcon
} from '@radix-ui/react-icons';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts';

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
    clients: 0,
    leads: 0,
    meetings: 0,
    presupuestos: 0,
    promociones: 0,
    unreadNotifications: 0
  });
  const [latest, setLatest] = useState({
    notifications: [],
    leads: [],
    meetings: [],
    presupuestos: []
  });
  const [leadsByMonth, setLeadsByMonth] = useState([]);
  const [meetingsByMonth, setMeetingsByMonth] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (activeTab === 'meetings') {
      fetchMeetings();
    }
    fetchDashboardData();
    fetchLeadsByMonth();
    fetchMeetingsByMonth();
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

  const fetchDashboardData = async () => {
    setLoading(true);
    // Consultas en paralelo
    const [clients, leads, meetings, presupuestos, promociones, notifications] = await Promise.all([
      supabase.from('clients').select('*', { count: 'exact', head: true }),
      supabase.from('leads').select('*', { count: 'exact', head: true }),
      supabase.from('meetings').select('*', { count: 'exact', head: true }),
      supabase.from('presupuesto_requests').select('*', { count: 'exact', head: true }),
      supabase.from('promotion_requests').select('*', { count: 'exact', head: true }),
      supabase.from('notifications').select('*', { count: 'exact', head: true }).eq('is_read', false)
    ]);
    // Últimos registros
    const [latestNotifications, latestLeads, latestMeetings, latestPresupuestos] = await Promise.all([
      supabase.from('notifications').select('*').order('created_at', { ascending: false }).limit(5),
      supabase.from('leads').select('*').order('created_at', { ascending: false }).limit(5),
      supabase.from('meetings').select('*').order('meeting_date', { ascending: true }).limit(3),
      supabase.from('presupuesto_requests').select('*').order('created_at', { ascending: false }).limit(3)
    ]);
    setStats({
      clients: clients.count || 0,
      leads: leads.count || 0,
      meetings: meetings.count || 0,
      presupuestos: presupuestos.count || 0,
      promociones: promociones.count || 0,
      unreadNotifications: notifications.count || 0
    });
    setLatest({
      notifications: latestNotifications.data || [],
      leads: latestLeads.data || [],
      meetings: latestMeetings.data || [],
      presupuestos: latestPresupuestos.data || []
    });
    setLoading(false);
  };

  // Gráfica: leads por mes
  const fetchLeadsByMonth = async () => {
    const { data, error } = await supabase.rpc('leads_by_month');
    if (!error && data) {
      setLeadsByMonth(data.map(d => ({ ...d, month: d.month_name })));
    }
  };

  // Gráfica: reuniones por mes
  const fetchMeetingsByMonth = async () => {
    const { data, error } = await supabase.rpc('meetings_by_month');
    if (!error && data) {
      setMeetingsByMonth(data.map(d => ({ ...d, month: d.month_name })));
    }
  };

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
    <div className="space-y-10">
      {/* Gráficas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Leads por mes */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="font-bold text-white mb-3 flex items-center gap-2"><EnvelopeClosedIcon className="w-5 h-5 text-yellow-400" /> Leads por mes</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={leadsByMonth} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis dataKey="month" stroke="#fff" />
              <YAxis stroke="#fff" allowDecimals={false} />
              <Tooltip contentStyle={{ background: '#181818', border: '1px solid #333', color: '#fff' }} />
              <Bar dataKey="count" fill="#038e42" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Reuniones por mes */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="font-bold text-white mb-3 flex items-center gap-2"><CalendarIcon className="w-5 h-5 text-green-400" /> Reuniones por mes</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={meetingsByMonth} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#222" />
              <XAxis dataKey="month" stroke="#fff" />
              <YAxis stroke="#fff" allowDecimals={false} />
              <Tooltip contentStyle={{ background: '#181818', border: '1px solid #333', color: '#fff' }} />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#038e42" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Tarjetas resumen */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div className="bg-white/5 rounded-xl p-6 flex flex-col items-center border border-white/10">
          <PersonIcon className="w-8 h-8 text-blue-400 mb-2" />
          <div className="text-3xl font-bold text-white">{stats.clients}</div>
          <div className="text-white/60 text-sm">Clientes</div>
        </div>
        <div className="bg-white/5 rounded-xl p-6 flex flex-col items-center border border-white/10">
          <EnvelopeClosedIcon className="w-8 h-8 text-yellow-400 mb-2" />
          <div className="text-3xl font-bold text-white">{stats.leads}</div>
          <div className="text-white/60 text-sm">Leads/Mensajes</div>
        </div>
        <div className="bg-white/5 rounded-xl p-6 flex flex-col items-center border border-white/10">
          <CalendarIcon className="w-8 h-8 text-green-400 mb-2" />
          <div className="text-3xl font-bold text-white">{stats.meetings}</div>
          <div className="text-white/60 text-sm">Reuniones</div>
        </div>
        <div className="bg-white/5 rounded-xl p-6 flex flex-col items-center border border-white/10">
          <GearIcon className="w-8 h-8 text-purple-400 mb-2" />
          <div className="text-3xl font-bold text-white">{stats.presupuestos}</div>
          <div className="text-white/60 text-sm">Presupuestos</div>
        </div>
        <div className="bg-white/5 rounded-xl p-6 flex flex-col items-center border border-white/10">
          <PinRightIcon className="w-8 h-8 text-pink-400 mb-2" />
          <div className="text-3xl font-bold text-white">{stats.promociones}</div>
          <div className="text-white/60 text-sm">Promociones</div>
        </div>
        <div className="bg-white/5 rounded-xl p-6 flex flex-col items-center border border-white/10">
          <BellIcon className="w-8 h-8 text-[#038e42] mb-2" />
          <div className="text-3xl font-bold text-white">{stats.unreadNotifications}</div>
          <div className="text-white/60 text-sm">Notificaciones sin leer</div>
        </div>
      </div>

      {/* Listas rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Últimas notificaciones */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="font-bold text-white mb-3 flex items-center gap-2"><BellIcon className="w-5 h-5 text-[#038e42]" /> Últimas notificaciones</div>
          <ul className="space-y-2">
            {latest.notifications.length === 0 && <li className="text-white/40 text-sm">Sin notificaciones</li>}
            {latest.notifications.map(n => (
              <li key={n.id} className="text-white/80 text-sm border-b border-white/10 pb-1 last:border-0 last:pb-0">
                <span className="font-semibold">{n.title}</span><br />
                <span className="text-xs text-white/40">{format(new Date(n.created_at), 'dd/MM/yyyy HH:mm', { locale: es })}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Últimos leads */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="font-bold text-white mb-3 flex items-center gap-2"><EnvelopeClosedIcon className="w-5 h-5 text-yellow-400" /> Últimos leads</div>
          <ul className="space-y-2">
            {latest.leads.length === 0 && <li className="text-white/40 text-sm">Sin leads</li>}
            {latest.leads.map(l => (
              <li key={l.id} className="text-white/80 text-sm border-b border-white/10 pb-1 last:border-0 last:pb-0">
                <span className="font-semibold">{l.name}</span> - {l.email}<br />
                <span className="text-xs text-white/40">{format(new Date(l.created_at), 'dd/MM/yyyy HH:mm', { locale: es })}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Próximas reuniones */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="font-bold text-white mb-3 flex items-center gap-2"><CalendarIcon className="w-5 h-5 text-green-400" /> Próximas reuniones</div>
          <ul className="space-y-2">
            {latest.meetings.length === 0 && <li className="text-white/40 text-sm">Sin reuniones</li>}
            {latest.meetings.map(m => (
              <li key={m.id} className="text-white/80 text-sm border-b border-white/10 pb-1 last:border-0 last:pb-0">
                <span className="font-semibold">{m.name}</span> - {m.meeting_type_name}<br />
                <span className="text-xs text-white/40">{format(new Date(m.meeting_date), 'dd/MM/yyyy')}, {m.meeting_time}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Solicitudes de presupuesto recientes */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/10">
          <div className="font-bold text-white mb-3 flex items-center gap-2"><GearIcon className="w-5 h-5 text-purple-400" /> Últimos presupuestos</div>
          <ul className="space-y-2">
            {latest.presupuestos.length === 0 && <li className="text-white/40 text-sm">Sin presupuestos</li>}
            {latest.presupuestos.map(p => (
              <li key={p.id} className="text-white/80 text-sm border-b border-white/10 pb-1 last:border-0 last:pb-0">
                <span className="font-semibold">{p.name}</span> - {p.email}<br />
                <span className="text-xs text-white/40">{format(new Date(p.created_at), 'dd/MM/yyyy HH:mm', { locale: es })}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 