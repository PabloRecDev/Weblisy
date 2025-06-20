import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  PersonIcon,
  TrashIcon,
  Cross2Icon,
  Pencil1Icon,
  EnvelopeClosedIcon,
  MobileIcon,
  HomeIcon
} from '@radix-ui/react-icons';
import { supabase } from '../lib/supabase'; // Importar supabase

const AdminClientes = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addError, setAddError] = useState('');
  
  // Stats
  const [stats, setStats] = useState({
    total: 0,
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const { data: clientsData, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setClients(clientsData || []);
      calculateStats(clientsData || []);

    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (clientsData) => {
    setStats({
      total: clientsData.length,
    });
  };

  const filteredClients = clients.filter(client => {
    const term = searchTerm.toLowerCase();
    return (
      client.name.toLowerCase().includes(term) ||
      client.email.toLowerCase().includes(term) ||
      (client.company && client.company.toLowerCase().includes(term))
    );
  });

  const deleteClient = async (clientId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar este cliente? Esta acción no se puede deshacer.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', clientId);

      if (error) throw error;

      // Refrescar la lista de clientes
      fetchClients();
      if (selectedClient && selectedClient.id === clientId) {
        setSelectedClient(null);
      }

    } catch (error) {
      console.error('Error deleting client:', error);
      alert('Hubo un error al eliminar el cliente.');
    }
  };

  const handleNewClientChange = (e) => {
    const { name, value } = e.target;
    setNewClient(prev => ({ ...prev, [name]: value }));
  };

  const handleAddClient = async (e) => {
    e.preventDefault();
    if (!newClient.name || !newClient.email) {
      setAddError('El nombre y el email son obligatorios.');
      return;
    }

    setIsSubmitting(true);
    setAddError('');

    try {
      const { error } = await supabase.from('clients').insert([newClient]);

      if (error) {
        if (error.code === '23505') { // Error de unicidad (email duplicado)
          throw new Error('Ya existe un cliente con este email.');
        }
        throw error;
      }

      setShowAddModal(false);
      setNewClient({ name: '', email: '', phone: '', company: '', notes: '' });
      fetchClients(); // Recargar la lista

    } catch (error) {
      console.error('Error adding client:', error);
      setAddError(error.message || 'No se pudo añadir el cliente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Cargando clientes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Clientes</h1>
          <p className="text-white/60">Gestiona todos tus clientes en un solo lugar.</p>
        </div>
        <button
          onClick={() => {
            console.log('Botón Añadir Cliente clickeado');
            setShowAddModal(true);
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg"
        >
          <PlusIcon className="w-5 h-5" />
          Añadir Cliente
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/5 p-4 rounded-lg">
          <p className="text-sm text-white/60">Total de Clientes</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="mb-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            placeholder="Buscar por nombre, email o empresa..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"
          />
        </div>
      </div>

      {/* Client Table */}
      <div className="bg-white/5 rounded-lg overflow-hidden border border-white/10">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5">
              <tr>
                <th className="p-4 font-semibold">Nombre</th>
                <th className="p-4 font-semibold">Empresa</th>
                <th className="p-4 font-semibold">Contacto</th>
                <th className="p-4 font-semibold">Registrado</th>
                <th className="p-4 font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map(client => (
                <tr key={client.id} className="border-t border-white/10 hover:bg-white/5 cursor-pointer" onClick={() => setSelectedClient(client)}>
                  <td className="p-4">
                    <div className="font-medium">{client.name}</div>
                  </td>
                  <td className="p-4 text-white/80">{client.company || '-'}</td>
                  <td className="p-4 text-white/80">
                    <div>{client.email}</div>
                    <div className="text-sm text-white/60">{client.phone || ''}</div>
                  </td>
                  <td className="p-4 text-white/80">
                    {format(new Date(client.created_at), 'dd MMM yyyy', { locale: es })}
                  </td>
                  <td className="p-4">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteClient(client.id);
                      }}
                      className="text-red-400 hover:text-red-300 p-2 rounded-full hover:bg-red-500/10"
                      aria-label="Eliminar cliente"
                    >
                      <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredClients.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-8 text-white/60">
                    No se encontraron clientes.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Client Details Modal */}
      <AnimatePresence>
        {selectedClient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedClient(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gray-900 border border-white/10 rounded-xl w-full max-w-2xl text-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b border-white/10">
                <h2 className="text-xl font-bold">{selectedClient.name}</h2>
                <button onClick={() => setSelectedClient(null)} className="p-2 rounded-full hover:bg-white/10">
                  <Cross2Icon />
                </button>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm text-white/60 mb-1">Email</h3>
                  <p className="flex items-center gap-2"><EnvelopeClosedIcon /> {selectedClient.email}</p>
                </div>
                <div>
                  <h3 className="text-sm text-white/60 mb-1">Teléfono</h3>
                  <p className="flex items-center gap-2"><MobileIcon /> {selectedClient.phone || 'No disponible'}</p>
                </div>
                <div>
                  <h3 className="text-sm text-white/60 mb-1">Empresa</h3>
                  <p className="flex items-center gap-2"><HomeIcon /> {selectedClient.company || 'No disponible'}</p>
                </div>
                <div>
                  <h3 className="text-sm text-white/60 mb-1">Cliente desde</h3>
                  <p>{format(new Date(selectedClient.created_at), "d 'de' MMMM, yyyy", { locale: es })}</p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="text-sm text-white/60 mb-1">Notas</h3>
                  <div className="bg-black/30 p-3 rounded-lg min-h-[80px] whitespace-pre-wrap">
                    {selectedClient.notes || 'No hay notas.'}
                  </div>
                </div>
              </div>
              <div className="p-4 bg-black/20 flex justify-end gap-3">
                 <button 
                    onClick={() => {
                      deleteClient(selectedClient.id);
                    }}
                    className="flex items-center gap-2 text-red-400 px-4 py-2 rounded-lg font-medium hover:bg-red-500/10"
                  >
                    <TrashIcon />
                    Eliminar
                  </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Client Modal (Placeholder) */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gray-900 border border-white/10 rounded-xl w-full max-w-lg text-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b border-white/10">
                <h2 className="text-xl font-bold">Añadir Nuevo Cliente</h2>
                <button onClick={() => setShowAddModal(false)} className="p-2 rounded-full hover:bg-white/10">
                  <Cross2Icon />
                </button>
              </div>
              <div className="p-6">
                 {/* El formulario para añadir clientes irá aquí */}
                 <form onSubmit={handleAddClient} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">Nombre *</label>
                      <input type="text" name="name" id="name" value={newClient.name} onChange={handleNewClientChange} required className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/50" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">Email *</label>
                      <input type="email" name="email" id="email" value={newClient.email} onChange={handleNewClientChange} required className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/50" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-1">Teléfono</label>
                      <input type="tel" name="phone" id="phone" value={newClient.phone} onChange={handleNewClientChange} className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/50" />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-1">Empresa</label>
                      <input type="text" name="company" id="company" value={newClient.company} onChange={handleNewClientChange} className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/50" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-white/80 mb-1">Notas</label>
                    <textarea name="notes" id="notes" value={newClient.notes} onChange={handleNewClientChange} rows="4" className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"></textarea>
                  </div>

                  {addError && <p className="text-red-400 text-sm">{addError}</p>}

                  <div className="pt-4 flex justify-end gap-3">
                    <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                      Cancelar
                    </button>
                    <button type="submit" disabled={isSubmitting} className="bg-white text-black px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50">
                      {isSubmitting ? 'Guardando...' : 'Guardar Cliente'}
                    </button>
                  </div>
                 </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminClientes; 