import React from 'react';
import { NavLink } from 'react-router-dom';
import { UserCircleIcon, DocumentTextIcon, PencilIcon, ChatBubbleLeftRightIcon, Cog6ToothIcon, CalendarDaysIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const navItems = [
  { name: 'Dashboard', icon: <UserCircleIcon className="w-6 h-6" />, to: '/dashboard' },
  { name: 'Plantillas', icon: <DocumentTextIcon className="w-6 h-6" />, to: '/plantillas' },
  { name: 'Editor', icon: <PencilIcon className="w-6 h-6" />, to: '/editor' },
  { name: 'Cartas', icon: <ChatBubbleLeftRightIcon className="w-6 h-6" />, to: '/cartas' },
  { name: 'Calendario', icon: <CalendarDaysIcon className="w-6 h-6" />, to: '/calendario' },
  { name: 'Tareas', icon: <CheckCircleIcon className="w-6 h-6" />, to: '/tareas' },
  { name: 'Configuración', icon: <Cog6ToothIcon className="w-6 h-6" />, to: '/configuracion' },
];

export default function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-[#121212] border-r border-gray-900 flex flex-col py-6 px-4 shadow-lg font-['Circular',custom-font,'Helvetica_Neue',Helvetica,Arial,sans-serif] font-medium text-[#fafafa] text-[14px] leading-[14px]" style={{ fontFamily: "'Circular', custom-font, 'Helvetica Neue', Helvetica, Arial, sans-serif", fontWeight: 500, color: '#fafafa', fontSize: 14, lineHeight: '14px' }}>
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-xl flex items-center justify-center">
          <UserCircleIcon className="w-6 h-6 text-white" />
        </div>
        <span className="text-2xl font-bold text-[#fafafa]">CV Master</span>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors text-[#fafafa] hover:bg-[#181818] hover:text-[#fafafa] ${isActive ? 'bg-[#181818] text-[#fafafa]' : ''}`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto flex items-center gap-3 px-2 pt-8 border-t border-gray-900">
        <img src="/avatar.png" alt="avatar" className="w-10 h-10 rounded-full border" />
        <div>
          <div className="font-semibold text-[#fafafa]">Juan Pérez</div>
          <div className="text-xs text-gray-400">juan.perez@gmail.com</div>
        </div>
      </div>
    </aside>
  );
} 