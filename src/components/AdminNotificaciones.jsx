import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  GearIcon,
  StarIcon,
  PinRightIcon,
  BellIcon,
  CheckIcon
} from '@radix-ui/react-icons';

const typeIcons = {
  reunion: <CalendarIcon className="w-6 h-6 text-blue-400" />,
  presupuesto: <GearIcon className="w-6 h-6 text-green-400" />,
  mensaje: <EnvelopeClosedIcon className="w-6 h-6 text-yellow-400" />,
  promocion: <PinRightIcon className="w-6 h-6 text-pink-400" />,
  factura: <StarIcon className="w-6 h-6 text-purple-400" />,
  default: <BellIcon className="w-6 h-6 text-white/60" />
};

export default function AdminNotificaciones() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('todas');

  useEffect(() => {
    fetchNotificaciones();
  }, []);

  const fetchNotificaciones = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setNotificaciones(data || []);
    } catch (error) {
      console.error('Error al obtener notificaciones:', error);
      setNotificaciones([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async (noti) => {
    if (!noti.is_read) {
      // Marcar como leída en la base de datos
      await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', noti.id);
      // Actualizar en UI
      setNotificaciones(prev => prev.map(n => n.id === noti.id ? { ...n, is_read: true } : n));
    }
    // Si tiene link, navegar
    if (noti.link) {
      window.location.href = noti.link;
    }
  };

  const filtered = notificaciones.filter(noti =>
    filter === 'todas' ? true : noti.type === filter
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#038e42]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Notificaciones</h1>
          <p className="text-white/60">Todas las novedades y avisos importantes del sistema.</p>
        </div>
        <div>
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-sm text-white focus:border-white/20 focus:outline-none focus:bg-white/10 transition-colors"
          >
            <option value="todas">Todas</option>
            <option value="reunion">Reuniones</option>
            <option value="presupuesto">Presupuestos</option>
            <option value="mensaje">Mensajes</option>
            <option value="promocion">Promociones</option>
            <option value="factura">Facturas</option>
          </select>
        </div>
      </div>
      <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden divide-y divide-white/10">
        {filtered.length === 0 && (
          <div className="text-center text-white/50 py-12">No hay notificaciones.</div>
        )}
        {filtered.map(noti => (
          <button
            key={noti.id}
            onClick={() => handleClick(noti)}
            className={`w-full flex items-start gap-4 px-6 py-5 text-left transition-colors duration-200 focus:outline-none ${noti.is_read ? 'bg-black/40 text-white/60' : 'bg-black/80 text-white hover:bg-[#038e42]/10'}`}
            style={{ cursor: 'pointer' }}
            aria-label={noti.title}
          >
            <span>{typeIcons[noti.type] || typeIcons.default}</span>
            <span className="flex-1">
              <span className="block font-semibold text-base mb-1">{noti.title}</span>
              <span className="block text-sm mb-1">{noti.message}</span>
              <span className="block text-xs text-white/40">{format(new Date(noti.created_at), 'dd/MM/yyyy HH:mm', { locale: es })}</span>
            </span>
            {!noti.is_read && <CheckIcon className="w-5 h-5 text-[#038e42] mt-1" title="No leída" />}
          </button>
        ))}
      </div>
    </div>
  );
} 