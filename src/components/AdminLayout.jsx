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
  EnvelopeClosedIcon
} from '@radix-ui/react-icons';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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
    { path: '/admin/dashboard', icon: DashboardIcon, label: 'Dashboard' },
    { path: '/admin/reuniones', icon: CalendarIcon, label: 'Reuniones' },
    { path: '/admin/leads', icon: EnvelopeClosedIcon, label: 'Leads/Mensajes' },
    { path: '/admin/clientes', icon: PersonIcon, label: 'Clientes' },
    { path: '/admin/facturas', icon: StarIcon, label: 'Facturas' },
    { path: '/admin/presupuestos', icon: GearIcon, label: 'Presupuestos' },
    { path: '/admin/proyectos', icon: RocketIcon, label: 'Proyectos' },
    { path: '/admin/tareas', icon: CheckIcon, label: 'Tareas' }
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
    <div className="min-h-screen bg-black text-white flex">
      {/* Overlay para móvil */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        ${isMobile ? 'fixed z-50 h-full' : 'sticky top-0 h-screen'}
        ${sidebarOpen ? 'translate-x-0' : isMobile ? '-translate-x-full' : 'w-20'}
        ${isMobile ? 'w-80' : sidebarOpen ? 'w-64' : 'w-20'} 
        bg-[#0d0d0d] border-r border-white/10 
        transition-all duration-300 ease-in-out
        flex flex-col
      `}>
        {/* Logo */}
        <div className="p-4 lg:p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/assets/weblisy-logo.png" alt="WebLisy" className={`${sidebarOpen ? 'h-8' : 'h-10'} transition-all duration-300`} />
            {sidebarOpen && <span className="text-lg font-semibold ml-3">CRM</span>}
          </div>
          {/* Botón cerrar en móvil */}
          {isMobile && (
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <ExitIcon className="w-5 h-5" />
            </button>
          )}
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
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
                className={`w-full flex items-center ${sidebarOpen ? 'gap-3 justify-start px-3 py-2' : 'justify-center py-3'} rounded-lg transition-colors ${
                  isActive ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className={`${sidebarOpen ? 'w-5 h-5' : 'w-6 h-6'} transition-all duration-300`} />
                {sidebarOpen && <span className="text-sm lg:text-base">{item.label}</span>}
              </button>
            );
          })}
        </nav>
        
        {/* Bottom Actions */}
        <div className="p-4 border-t border-white/10 space-y-2">
          {/* Notificaciones */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className={`w-full flex items-center ${sidebarOpen ? 'gap-3 justify-start px-3 py-2' : 'justify-center py-3'} rounded-lg text-white/60 hover:bg-white/5 hover:text-white transition-colors relative`}
            >
              <BellIcon className={`${sidebarOpen ? 'w-5 h-5' : 'w-6 h-6'} transition-all duration-300`} />
              {sidebarOpen && <span className="text-sm lg:text-base">Notificaciones</span>}
              {/* Badge de notificaciones */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">{notifications.length}</span>
              </div>
            </button>
            
            {/* Dropdown de notificaciones */}
            {showNotifications && sidebarOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg p-2 max-h-64 overflow-y-auto z-50 shadow-xl">
                {notifications.map((notification) => (
                  <div key={notification.id} className="p-2 hover:bg-white/10 rounded transition-colors cursor-pointer">
                    <div className="text-sm font-medium text-white">{notification.title}</div>
                    <div className="text-xs text-white/60">{notification.message}</div>
                    <div className="text-xs text-white/40 mt-1">{notification.time}</div>
                  </div>
                ))}
                {notifications.length === 0 && (
                  <div className="p-2 text-sm text-white/40 text-center">
                    No hay notificaciones
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Configuración */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`w-full flex items-center ${sidebarOpen ? 'gap-3 justify-start px-3 py-2' : 'justify-center py-3'} rounded-lg text-white/60 hover:bg-white/5 hover:text-white transition-colors`}
          >
            <GearIcon className={`${sidebarOpen ? 'w-5 h-5' : 'w-6 h-6'} transition-all duration-300`} />
            {sidebarOpen && <span className="text-sm lg:text-base">Configuración</span>}
          </button>

          {/* Ayuda */}
          <button
            className={`w-full flex items-center ${sidebarOpen ? 'gap-3 justify-start px-3 py-2' : 'justify-center py-3'} rounded-lg text-white/60 hover:bg-white/5 hover:text-white transition-colors`}
          >
            <StarIcon className={`${sidebarOpen ? 'w-5 h-5' : 'w-6 h-6'} transition-all duration-300`} />
            {sidebarOpen && <span className="text-sm lg:text-base">Ayuda</span>}
          </button>

          {/* Separador */}
          <div className="border-t border-white/10 my-2"></div>

          {/* Cerrar sesión */}
          <button
            onClick={handleLogout}
            className={`w-full flex items-center ${sidebarOpen ? 'gap-3 justify-start px-3 py-2' : 'justify-center py-3'} rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors`}
          >
            <ExitIcon className={`${sidebarOpen ? 'w-5 h-5' : 'w-6 h-6'} transition-all duration-300`} />
            {sidebarOpen && <span className="text-sm lg:text-base">Cerrar sesión</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-screen">
        {/* Header */}
        <header className="bg-white/5 border-b border-white/10 p-4 lg:p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Botón hamburguesa para móvil */}
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <HamburgerMenuIcon className="w-5 h-5" />
                </button>
              )}
              
              <div>
                <h1 className="text-xl lg:text-2xl font-semibold">
                  {menuItems.find(item => item.path === location.pathname)?.label || 'Admin'}
                </h1>
                <p className="text-white/60 text-xs lg:text-sm mt-1">Panel de administración</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 lg:gap-4">
              {/* Notificaciones en header */}
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors relative"
              >
                <BellIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-xs text-white font-bold">{notifications.length}</span>
                </div>
              </button>

              {/* Configuración en header */}
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <GearIcon className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>

              {/* Toggle sidebar solo en desktop */}
              {!isMobile && (
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="hidden lg:block p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <DashboardIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
} 