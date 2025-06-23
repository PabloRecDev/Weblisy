import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { supabase } from '../lib/supabase';
import { 
  MagnifyingGlassIcon,
  Cross2Icon,
  EyeOpenIcon,
  ChatBubbleIcon,
  CheckIcon,
  ArchiveIcon
} from '@radix-ui/react-icons';

export default function AdminPromociones() {
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [selectedSolicitud, setSelectedSolicitud] = useState(null);

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  const fetchSolicitudes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('promotion_requests')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setSolicitudes(data || []);
    } catch (error) {
      console.error('Error al obtener solicitudes de promoción:', error);
      setSolicitudes([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'contacted': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'converted': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'archived': return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const filteredSolicitudes = solicitudes.filter(solicitud => {
    const matchesSearch = 
      solicitud.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      solicitud.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      solicitud.promotion_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'todos' || solicitud.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (solicitudId, newStatus) => {
    const originalSolicitudes = [...solicitudes];
    
    // Update UI immediately
    const updatedSolicitudes = solicitudes.map(s => 
      s.id === solicitudId ? { ...s, status: newStatus } : s
    );
    setSolicitudes(updatedSolicitudes);

    // Update database
    const { error } = await supabase
      .from('promotion_requests')
      .update({ status: newStatus })
      .eq('id', solicitudId);

    if (error) {
      console.error("Error al actualizar estado:", error);
      // Revert UI change on error
      setSolicitudes(originalSolicitudes);
      // Aquí podrías mostrar una notificación de error al usuario
    }
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
      <div>
        <h1 className="text-2xl font-bold text-white">Solicitudes de Promociones</h1>
        <p className="text-white/60">Gestiona los leads que llegan desde ofertas especiales.</p>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input
            type="text"
            placeholder="Buscar por nombre, email, promoción..."
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
          <option value="contacted">Contactado</option>
          <option value="converted">Convertido</option>
          <option value="archived">Archivado</option>
        </select>
      </div>

      {/* Tabla */}
      <div className="bg-white/5 rounded-lg border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Cliente</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Promoción</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Estado</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Fecha</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-white/60">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredSolicitudes.map((solicitud) => (
                <tr key={solicitud.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                  <td className="py-3 px-4">
                    <div className="font-medium text-white">{solicitud.name}</div>
                    <div className="text-xs text-white/30">{solicitud.email}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-white">{solicitud.promotion_name}</div>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={solicitud.status}
                      onChange={(e) => handleStatusChange(solicitud.id, e.target.value)}
                      className={`text-xs font-medium rounded border px-2 py-1 bg-transparent ${getStatusColor(solicitud.status)}`}
                    >
                      <option value="new">Nueva</option>
                      <option value="contacted">Contactado</option>
                      <option value="converted">Convertido</option>
                      <option value="archived">Archivado</option>
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
                        onClick={() => setSelectedSolicitud(solicitud)}
                        className="p-1 text-white/60 hover:text-white transition-colors"
                        title="Ver detalles"
                      >
                        <EyeOpenIcon className="w-4 h-4" />
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
        {selectedSolicitud && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedSolicitud(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#1c1c1c] rounded-lg w-full max-w-lg p-6 border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-xl font-bold text-white">Detalles de la Solicitud</h2>
                <button
                  onClick={() => setSelectedSolicitud(null)}
                  className="text-white/60 hover:text-white"
                >
                  <Cross2Icon className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-white/60">Nombre</label>
                    <p className="text-white font-medium">{selectedSolicitud.name}</p>
                  </div>
                   <div>
                    <label className="text-sm text-white/60">Promoción</label>
                    <p className="text-white font-medium">{selectedSolicitud.promotion_name}</p>
                  </div>
                </div>
                 <div>
                    <label className="text-sm text-white/60">Email</label>
                    <p className="text-white font-medium">{selectedSolicitud.email}</p>
                  </div>
                  {selectedSolicitud.phone && (
                    <div>
                      <label className="text-sm text-white/60">Teléfono</label>
                      <p className="text-white font-medium">{selectedSolicitud.phone}</p>
                    </div>
                  )}
                   {selectedSolicitud.message && (
                    <div>
                      <label className="text-sm text-white/60">Mensaje</label>
                      <p className="text-white bg-white/5 p-3 rounded border border-white/10 whitespace-pre-wrap">
                        {selectedSolicitud.message}
                      </p>
                    </div>
                  )}
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setSelectedSolicitud(null)}
                  className="px-4 py-2 rounded bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 