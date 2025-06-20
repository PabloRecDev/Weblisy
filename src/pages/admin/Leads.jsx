import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  PersonIcon,
  EnvelopeClosedIcon,
  MobileIcon,
  ChatBubbleIcon,
  MagnifyingGlassIcon,
  ReloadIcon,
  CheckIcon,
  Cross2Icon,
  TrashIcon,
  StarIcon,
  HomeIcon,
  EnvelopeOpenIcon,
  QuestionMarkCircledIcon
} from '@radix-ui/react-icons';
import { supabase } from "../../lib/supabase";

export default function AdminLeads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    new: 0,
    contacted: 0,
    in_progress: 0,
    converted: 0,
    archived: 0
  });

  useEffect(() => {
    fetchCombinedLeads();
  }, []);

  const fetchCombinedLeads = async () => {
    try {
      setLoading(true);

      const { data: leadsData, error: leadsError } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      const { data: inquiriesData, error: inquiriesError } = await supabase
        .from('quick_inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (leadsError || inquiriesError) throw new Error('Error al obtener leads');

      const combined = [...leadsData, ...inquiriesData];

      // 4. Ordenar por fecha de creación
      combined.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      setLeads(combined);
      calculateStats(combined);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener leads combinados:', error);
      setLoading(false);
    }
  };

  const calculateStats = (leadsData) => {
    const stats = {
      total: leadsData.length,
      new: leadsData.filter(l => l.status === 'new').length,
      contacted: leadsData.filter(l => l.status === 'contacted').length,
      in_progress: leadsData.filter(l => l.status === 'in_progress').length,
      converted: leadsData.filter(l => l.status === 'converted').length,
      archived: leadsData.filter(l => l.status === 'archived' || l.status === 'read').length
    };
    setStats(stats);
  };

  const updateLeadStatus = async (leadId, newStatus, type) => {
    const table = type === 'inquiry' ? 'quick_inquiries' : 'leads';
    try {
      setUpdating(true);
      const { error } = await supabase
        .from(table)
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', leadId);

      if (error) throw error;
      
      await fetchCombinedLeads();
      setUpdating(false);
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      setUpdating(false);
    }
  };

  const deleteLead = async (leadId, type) => {
    const table = type === 'inquiry' ? 'quick_inquiries' : 'leads';
    if (!confirm('¿Estás seguro de que quieres eliminar este elemento?')) {
      return;
    }
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', leadId);

      if (error) throw error;
      
      await fetchCombinedLeads();
    } catch (error) {
      console.error('Error al eliminar lead:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-blue-500/5 text-blue-400 border-blue-500/10';
      case 'contacted': return 'bg-yellow-500/5 text-yellow-400 border-yellow-500/10';
      case 'in_progress': return 'bg-purple-500/5 text-purple-400 border-purple-500/10';
      case 'converted': return 'bg-green-500/5 text-green-400 border-green-500/10';
      case 'archived': return 'bg-gray-500/5 text-gray-400 border-gray-500/10';
      case 'read': return 'bg-gray-500/5 text-gray-400 border-gray-500/10';
      default: return 'bg-gray-500/5 text-gray-400 border-gray-500/10';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'new': return 'Nuevo';
      case 'contacted': return 'Contactado';
      case 'in_progress': return 'En Proceso';
      case 'converted': return 'Convertido';
      case 'archived': return 'Archivado';
      case 'read': return 'Leído';
      default: return status;
    }
  };

  const getSourceText = (source) => {
    switch (source) {
      case 'contact_formal': return 'Contacto Formal';
      case 'budget': return 'Presupuesto';
      case 'duda_rapida': return 'Duda Rápida';
      default: return source;
    }
  };

  const getSourceIcon = (source) => {
    switch (source) {
      case 'contact_formal': return <EnvelopeOpenIcon className="w-4 h-4" />;
      case 'budget': return <StarIcon className="w-4 h-4" />;
      case 'duda_rapida': return <QuestionMarkCircledIcon className="w-4 h-4" />;
      default: return <EnvelopeClosedIcon className="w-4 h-4" />;
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lead.company && lead.company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
    
    return matchesSearch && matchesStatus && matchesSource;
  });

  return (
    <div className="p-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white/5 p-4 rounded-lg border border-white/10">
          <div className="text-sm text-white/70">Total</div>
          <div className="text-2xl font-semibold text-white">{stats.total}</div>
        </div>
        <div className="bg-blue-500/5 p-4 rounded-lg border border-blue-500/10">
          <div className="text-sm text-blue-400">Nuevos</div>
          <div className="text-2xl font-semibold text-blue-400">{stats.new}</div>
        </div>
        <div className="bg-yellow-500/5 p-4 rounded-lg border border-yellow-500/10">
          <div className="text-sm text-yellow-400">Contactados</div>
          <div className="text-2xl font-semibold text-yellow-400">{stats.contacted}</div>
        </div>
        <div className="bg-purple-500/5 p-4 rounded-lg border border-purple-500/10">
          <div className="text-sm text-purple-400">En Proceso</div>
          <div className="text-2xl font-semibold text-purple-400">{stats.in_progress}</div>
        </div>
        <div className="bg-green-500/5 p-4 rounded-lg border border-green-500/10">
          <div className="text-sm text-green-400">Convertidos</div>
          <div className="text-2xl font-semibold text-green-400">{stats.converted}</div>
        </div>
        <div className="bg-gray-500/5 p-4 rounded-lg border border-gray-500/10">
          <div className="text-sm text-gray-400">Archivados</div>
          <div className="text-2xl font-semibold text-gray-400">{stats.archived}</div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar por nombre, email, empresa o mensaje..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 pl-10 text-white placeholder-white/50"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
          </div>
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white"
        >
          <option value="all">Todos los estados</option>
          <option value="new">Nuevos</option>
          <option value="contacted">Contactados</option>
          <option value="in_progress">En Proceso</option>
          <option value="converted">Convertidos</option>
          <option value="archived">Archivados</option>
        </select>
        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white"
        >
          <option value="all">Todas las fuentes</option>
          <option value="contact_formal">Contacto Formal</option>
          <option value="budget">Presupuesto</option>
          <option value="duda_rapida">Duda Rápida</option>
        </select>
        <button
          onClick={fetchCombinedLeads}
          className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-white flex items-center gap-2"
        >
          <ReloadIcon className="w-4 h-4" />
          Actualizar
        </button>
      </div>

      <div className="bg-black/20 border border-white/10 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Contacto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Origen</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Mensaje</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/70 uppercase tracking-wider">Fecha</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-white/70 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-white/70">
                    <div className="flex items-center justify-center">
                      <ReloadIcon className="w-5 h-5 animate-spin mr-2" />
                      Cargando...
                    </div>
                  </td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-white/70">
                    No se encontraron resultados.
                  </td>
                </tr>
              ) : (
                filteredLeads.map(lead => (
                  <tr key={lead.id} className="hover:bg-white/5">
                    <td className="px-6 py-4 align-top">
                      <div className="flex flex-col">
                        <div className="text-white font-medium">{lead.name}</div>
                        <div className="text-white/70 text-sm">{lead.email}</div>
                        {lead.company && <div className="text-white/50 text-xs mt-1 flex items-center gap-1"><HomeIcon /> {lead.company}</div>}
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="flex items-center gap-2">
                        {getSourceIcon(lead.source)}
                        <span className="text-white">{getSourceText(lead.source)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <div className="text-white/90 max-w-md truncate">
                        {lead.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(lead.status)}`}>
                        {getStatusText(lead.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 align-top text-white/70">
                      {format(new Date(lead.created_at), "d 'de' MMMM, yyyy", { locale: es })}
                    </td>
                    <td className="px-6 py-4 text-right align-top">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedLead(lead);
                            setShowModal(true);
                          }}
                          className="p-1 hover:bg-white/10 rounded"
                        >
                          <EnvelopeOpenIcon className="w-4 h-4 text-white/70" />
                        </button>
                        <select 
                          value={lead.status} 
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value, lead.type)}
                          disabled={updating}
                          className="bg-black/50 border border-white/10 rounded px-2 py-1 text-white text-sm"
                        >
                          {lead.type === 'inquiry' ? (
                            <>
                              <option value="new">Nuevo</option>
                              <option value="read">Leído</option>
                              <option value="archived">Archivado</option>
                            </>
                          ) : (
                            <>
                              <option value="new">Nuevo</option>
                              <option value="contacted">Contactado</option>
                              <option value="in_progress">En Proceso</option>
                              <option value="converted">Convertido</option>
                              <option value="archived">Archivado</option>
                            </>
                          )}
                        </select>
                        <button
                          onClick={() => deleteLead(lead.id, lead.type)}
                          className="p-1 hover:bg-white/10 rounded text-red-400"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {showModal && selectedLead && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#121212] border border-white/10 rounded-lg shadow-xl w-full max-w-lg"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Detalles del Lead</h3>
                <button onClick={() => setShowModal(false)} className="p-1 rounded-full hover:bg-white/10">
                  <Cross2Icon className="w-5 h-5 text-white/70"/>
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <div className="text-sm text-white/60">Nombre</div>
                  <div className="text-white font-medium">{selectedLead.name}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60">Email</div>
                  <div className="text-white font-medium">{selectedLead.email}</div>
                </div>
                {selectedLead.phone && (
                  <div>
                    <div className="text-sm text-white/60">Teléfono</div>
                    <div className="text-white font-medium">{selectedLead.phone}</div>
                  </div>
                )}
                {selectedLead.company && (
                  <div>
                    <div className="text-sm text-white/60">Empresa</div>
                    <div className="text-white font-medium">{selectedLead.company}</div>
                  </div>
                )}
                <div>
                  <div className="text-sm text-white/60">Mensaje</div>
                  <p className="text-white/90 whitespace-pre-wrap">{selectedLead.message}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                    <div className="text-sm text-white/60">Fuente</div>
                    <div className="text-white font-medium">{getSourceText(selectedLead.source)}</div>
                  </div>
                   <div>
                    <div className="text-sm text-white/60">Estado</div>
                    <div className="text-white font-medium">{getStatusText(selectedLead.status)}</div>
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