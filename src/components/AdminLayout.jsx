import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { 
  CalendarIcon, 
  DashboardIcon,
  PersonIcon,
  StarIcon,
  GearIcon,
  RocketIcon,
  CheckIcon,
  ExitIcon,
  BellIcon,
  HamburgerMenuIcon,
  EnvelopeClosedIcon,
  PinRightIcon
} from '@radix-ui/react-icons';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Detectar si es móvil
  useEffect(() => {
    const checkIsMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    const fetchUnreadCount = async () => {
      const { count, error } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('is_read', false);
      if (!error) setUnreadCount(count || 0);
    };
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 10000);
    return () => clearInterval(interval);
  }, []);

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

  const menuItems = [
    { path: '/admin/dashboard', icon: DashboardIcon, label: 'Dashboard', color: '#00c573' },
    { path: '/admin/reuniones', icon: CalendarIcon, label: 'Reuniones', color: '#3b82f6' },
    { path: '/admin/leads', icon: EnvelopeClosedIcon, label: 'Leads/Mensajes', color: '#8b5cf6' },
    { path: '/admin/solicitudes-presupuesto', icon: EnvelopeClosedIcon, label: 'Solic. Presupuesto', color: '#f59e0b' },
    { path: '/admin/promociones', icon: PinRightIcon, label: 'Promociones', color: '#ef4444' },
    { path: '/admin/clientes', icon: PersonIcon, label: 'Clientes', color: '#06b6d4' },
    { path: '/admin/facturas', icon: StarIcon, label: 'Facturas', color: '#10b981' },
    { path: '/admin/presupuestos', icon: GearIcon, label: 'Presupuestos', color: '#f97316' },
    { path: '/admin/proyectos', icon: RocketIcon, label: 'Proyectos', color: '#ec4899' },
    { path: '/admin/tareas', icon: CheckIcon, label: 'Tareas', color: '#6366f1' }
  ];

  // Datos de ejemplo para notificaciones
  const notifications = [
    {
      id: 1,
      title: 'Nueva reunión agendada',
      message: 'Juan Pérez ha agendado una reunión para mañana',
      time: 'Hace 5 minutos',
      type: 'meeting'
    },
    {
      id: 2,
      title: 'Proyecto completado',
      message: 'El proyecto "E-commerce TechCorp" ha sido finalizado',
      time: 'Hace 1 hora',
      type: 'project'
    },
    {
      id: 3,
      title: 'Nuevo cliente registrado',
      message: 'Ana López se ha registrado como nuevo cliente',
      time: 'Hace 2 horas',
      type: 'client'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#121212] via-[#0a0a0a] to-[#121212] text-white flex">
      {/* Overlay para móvil */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${isMobile ? 'fixed z-50 h-full' : 'sticky top-0 h-screen'}
        ${sidebarOpen ? 'translate-x-0' : isMobile ? '-translate-x-full' : 'w-20'}
        ${isMobile ? 'w-80' : sidebarOpen ? 'w-72' : 'w-20'} 
        bg-gradient-to-b from-[#121212]/95 via-[#0a0a0a]/95 to-[#121212]/95 
        backdrop-blur-xl border-r border-gray-700/30 shadow-2xl
        transition-all duration-300 ease-in-out
        flex flex-col
      `}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-700/30 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img 
                src="/assets/weblisy-logo.png" 
                alt="WebLisy" 
                className={`${sidebarOpen ? 'h-10' : 'h-12'} transition-all duration-300 drop-shadow-lg`} 
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg blur opacity-60"></div>
            </div>
            {sidebarOpen && (
              <div className="flex flex-col">
                <span className="text-xl font-bold text-white">CRM</span>
                <span className="text-sm text-gray-400">Admin Panel</span>
              </div>
            )}
          </div>
          {/* Botón cerrar en móvil */}
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(false)}
                              className="lg:hidden p-2 rounded-xl hover:bg-gray-700/30 transition-colors"
            >
              <ExitIcon className="w-5 h-5" />
            </button>
          )}
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <button 
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) setSidebarOpen(false);
                }}
                className={`group relative w-full flex items-center ${sidebarOpen ? 'gap-4 justify-start px-4 py-3' : 'justify-center py-4'} 
                  rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-green-500/20 to-green-600/10 text-white shadow-lg border border-green-500/30' 
                    : 'text-gray-400 hover:bg-gray-700/30 hover:text-white'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-green-400 to-green-600 rounded-r-full"></div>
                )}
                <div className={`relative ${isActive ? 'text-green-400' : 'group-hover:text-white'} transition-colors`}>
                  <Icon className={`${sidebarOpen ? 'w-5 h-5' : 'w-6 h-6'} transition-all duration-300`} />
                  {isActive && (
                    <div className="absolute -inset-2 bg-green-500/20 rounded-lg blur opacity-60"></div>
                  )}
                </div>
                {sidebarOpen && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
                {/* Tooltip para sidebar collapsed */}
                {!sidebarOpen && (
                  <div className="absolute left-full ml-4 px-3 py-2 bg-[#121212] text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-xl border border-gray-600">
                    {item.label}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#121212]"></div>
                  </div>
                )}
              </button>
            );
          })}
        </nav>
        
        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-700/30 space-y-3">
          {/* Notificaciones */}
          <div className="relative group" onMouseEnter={() => setShowNotifications(true)} onMouseLeave={() => setShowNotifications(false)}>
            <button
              onClick={() => navigate('/admin/notificaciones')}
              className={`w-full flex items-center ${sidebarOpen ? 'gap-4 justify-start px-4 py-3' : 'justify-center py-4'} 
                rounded-xl text-gray-400 hover:bg-gray-700/30 hover:text-white transition-all duration-300 relative group`}
            >
              <div className="relative">
                <BellIcon className={`${sidebarOpen ? 'w-5 h-5' : 'w-6 h-6'} transition-all duration-300`} />
                {unreadCount > 0 && (
                  <div className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xs text-white font-bold">{unreadCount > 9 ? '9+' : unreadCount}</span>
                  </div>
                )}
              </div>
              {sidebarOpen && <span className="text-sm font-medium">Notificaciones</span>}
              
              {/* Tooltip para sidebar collapsed */}
              {!sidebarOpen && (
                <div className="absolute left-full ml-4 px-3 py-2 bg-[#121212] text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-xl border border-gray-600">
                  Notificaciones
                  <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#121212]"></div>
                </div>
              )}
            </button>

            {/* Dropdown de notificaciones */}
            {showNotifications && sidebarOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-3 bg-[#121212]/95 backdrop-blur-xl border border-gray-600/40 rounded-xl p-3 max-h-80 overflow-y-auto z-50 shadow-2xl">
                <div className="text-sm font-semibold text-white mb-3 border-b border-gray-600/40 pb-2">
                  Notificaciones recientes
                </div>
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-3 hover:bg-gray-700/30 rounded-lg transition-colors cursor-pointer mb-2 last:mb-0">
                    <div className="text-sm font-medium text-white">{notification.title}</div>
                    <div className="text-xs text-gray-300 mt-1">{notification.message}</div>
                    <div className="text-xs text-gray-500 mt-1">{notification.time}</div>
                  </div>
                ))}
                {notifications.length === 0 && (
                  <div className="p-3 text-sm text-gray-400 text-center">
                    No hay notificaciones nuevas
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Configuración */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`w-full flex items-center ${sidebarOpen ? 'gap-4 justify-start px-4 py-3' : 'justify-center py-4'} 
              rounded-xl text-gray-400 hover:bg-gray-700/30 hover:text-white transition-all duration-300 group`}
          >
            <GearIcon className={`${sidebarOpen ? 'w-5 h-5' : 'w-6 h-6'} transition-all duration-300`} />
            {sidebarOpen && <span className="text-sm font-medium">Configuración</span>}
            
            {/* Tooltip para sidebar collapsed */}
            {!sidebarOpen && (
              <div className="absolute left-full ml-4 px-3 py-2 bg-[#121212] text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-xl border border-gray-600">
                Configuración
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#121212]"></div>
              </div>
            )}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${sidebarOpen ? 'gap-4 justify-start px-4 py-3' : 'justify-center py-4'} 
              rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 group border border-transparent hover:border-red-500/30`}
          >
            <ExitIcon className={`${sidebarOpen ? 'w-5 h-5' : 'w-6 h-6'} transition-all duration-300`} />
            {sidebarOpen && <span className="text-sm font-medium">Cerrar Sesión</span>}
            
            {/* Tooltip para sidebar collapsed */}
            {!sidebarOpen && (
              <div className="absolute left-full ml-4 px-3 py-2 bg-[#121212] text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-xl border border-gray-600">
                Cerrar Sesión
                <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-[#121212]"></div>
              </div>
            )}
          </button>
        </div>

        {/* Toggle button para escritorio */}
        {!isMobile && (
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="absolute -right-3 top-20 w-6 h-6 bg-gradient-to-r from-gray-700 to-gray-600 border border-gray-500/50 rounded-full flex items-center justify-center text-white hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg"
          >
            <HamburgerMenuIcon className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar para móvil */}
        {isMobile && (
          <div className="lg:hidden bg-[#121212]/95 backdrop-blur-xl border-b border-gray-700/30 p-4 flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl hover:bg-gray-700/30 transition-colors"
            >
              <HamburgerMenuIcon className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold">Weblisy CRM</h1>
            <div className="w-10"></div> {/* Spacer */}
          </div>
        )}

        {/* Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
} 