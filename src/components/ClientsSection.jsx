import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { 
  PersonIcon,
  StarIcon,
  Cross2Icon,
  TrashIcon,
  PlusIcon,
  MagnifyingGlassIcon
} from '@radix-ui/react-icons';

export default function ClientsSection() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedClient, setSelectedClient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editing, setEditing] = useState(false);

  // Estados para estadísticas
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    premium: 0,
    new: 0
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      
      // Datos de ejemplo de clientes
      const mockClients = [
        {
          id: '1',
          name: 'Juan Pérez',
          email: 'juan.perez@techcorp.com',
          phone: '+34 612 345 678',
          company: 'TechCorp',
          website: 'www.techcorp.com',
          status: 'active',
          type: 'premium',
          projects: 3,
          totalSpent: 15000,
          lastContact: '2024-01-15',
          notes: 'Cliente muy satisfecho con el proyecto de e-commerce',
          created_at: '2023-06-15T10:30:00Z',
          updated_at: '2024-01-15T14:20:00Z'
        },
        {
          id: '2',
          name: 'María García',
          email: 'maria.garcia@startupxyz.com',
          phone: '+34 623 456 789',
          company: 'StartupXYZ',
          website: 'www.startupxyz.com',
          status: 'active',
          type: 'standard',
          projects: 1,
          totalSpent: 8000,
          lastContact: '2024-01-10',
          notes: 'Interesada en desarrollar una aplicación móvil',
          created_at: '2023-11-20T09:15:00Z',
          updated_at: '2024-01-10T16:45:00Z'
        },
        {
          id: '3',
          name: 'Carlos Rodríguez',
          email: 'carlos.rodriguez@consultingpro.com',
          phone: '+34 634 567 890',
          company: 'ConsultingPro',
          website: 'www.consultingpro.com',
          status: 'inactive',
          type: 'standard',
          projects: 2,
          totalSpent: 12000,
          lastContact: '2023-12-05',
          notes: 'Proyecto completado exitosamente',
          created_at: '2023-08-10T11:20:00Z',
          updated_at: '2023-12-05T13:30:00Z'
        },
        {
          id: '4',
          name: 'Ana López',
          email: 'ana.lopez@digitalagency.com',
          phone: '+34 645 678 901',
          company: 'DigitalAgency',
          website: 'www.digitalagency.com',
          status: 'active',
          type: 'premium',
          projects: 5,
          totalSpent: 25000,
          lastContact: '2024-01-12',
          notes: 'Cliente recurrente, muy profesional',
          created_at: '2023-03-15T14:45:00Z',
          updated_at: '2024-01-12T10:15:00Z'
        },
        {
          id: '5',
          name: 'Roberto Silva',
          email: 'roberto.silva@restaurantelite.com',
          phone: '+34 656 789 012',
          company: 'RestaurantElite',
          website: 'www.restaurantelite.com',
          status: 'new',
          type: 'standard',
          projects: 0,
          totalSpent: 0,
          lastContact: '2024-01-18',
          notes: 'Nuevo cliente interesado en sistema de reservas',
          created_at: '2024-01-18T08:30:00Z',
          updated_at: '2024-01-18T08:30:00Z'
        }
      ];

      setTimeout(() => {
        setClients(mockClients);
        calculateStats(mockClients);
        setLoading(false);
      }, 800);

    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const calculateStats = (clientsData) => {
    const stats = {
      total: clientsData.length,
      active: clientsData.filter(c => c.status === 'active').length,
      inactive: clientsData.filter(c => c.status === 'inactive').length,
      premium: clientsData.filter(c => c.type === 'premium').length,
      new: clientsData.filter(c => c.status === 'new').length
    };
    setStats(stats);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500/5 text-green-400 border-green-500/10';
      case 'inactive': return 'bg-gray-500/5 text-gray-400 border-gray-500/10';
      case 'new': return 'bg-blue-500/5 text-blue-400 border-blue-500/10';
      default: return 'bg-gray-500/5 text-gray-400 border-gray-500/10';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'premium': return 'bg-yellow-500/5 text-yellow-400 border-yellow-500/10';
      case 'standard': return 'bg-blue-500/5 text-blue-400 border-blue-500/10';
      default: return 'bg-gray-500/5 text-gray-400 border-gray-500/10';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'active': return 'Activo';
      case 'inactive': return 'Inactivo';
      case 'new': return 'Nuevo';
      default: return status;
    }
  };

  const getTypeText = (type) => {
    switch (type) {
      case 'premium': return 'Premium';
      case 'standard': return 'Estándar';
      default: return type;
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (client.company && client.company.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const deleteClient = async (clientId) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      return;
    }

    try {
      const updatedClients = clients.filter(c => c.id !== clientId);
      setClients(updatedClients);
      calculateStats(updatedClients);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Cargando clientes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header minimalista, solo una vez */}
      <div className="flex items-center justify-between px-6 pt-8 pb-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Clientes</h1>
          <p className="text-white/40 text-xs mt-1">Gestiona tu base de datos de clientes</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-xs border border-white/10 transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          Agregar
        </button>
      </div>

      {/* Stats Cards minimalistas */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 px-6 mb-6">
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-white/40">Total</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold">{stats.total}</span>
            <PersonIcon className="w-4 h-4 text-white/20" />
          </div>
        </div>
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-green-400/80">Activos</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold text-green-400">{stats.active}</span>
            <StarIcon className="w-4 h-4 text-green-400/20" />
          </div>
        </div>
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-white/40">Inactivos</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold text-white/40">{stats.inactive}</span>
            <Cross2Icon className="w-4 h-4 text-white/20" />
          </div>
        </div>
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-yellow-400/80">Premium</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold text-yellow-400">{stats.premium}</span>
            <StarIcon className="w-4 h-4 text-yellow-400/20" />
          </div>
        </div>
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-blue-400/80">Nuevos</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold text-blue-400">{stats.new}</span>
            <PlusIcon className="w-4 h-4 text-blue-400/20" />
          </div>
        </div>
      </div>

      {/* Filtros minimalistas */}
      <div className="flex flex-col sm:flex-row gap-2 px-6 mb-4">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input
            type="text"
            placeholder="Buscar clientes..."
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
          <option value="active">Activos</option>
          <option value="inactive">Inactivos</option>
          <option value="new">Nuevos</option>
        </select>
      </div>

      {/* Tabla minimalista */}
      <div className="flex-1 px-6 pb-8">
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/40 border-b border-white/10">
                <th className="py-2 px-2 font-medium text-left">Cliente</th>
                <th className="py-2 px-2 font-medium text-left">Empresa</th>
                <th className="py-2 px-2 font-medium text-left">Contacto</th>
                <th className="py-2 px-2 font-medium text-left">Estado</th>
                <th className="py-2 px-2 font-medium text-left">Proyectos</th>
                <th className="py-2 px-2 font-medium text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                  <td className="py-2 px-2">
                    <div className="font-medium text-white">{client.name}</div>
                    <div className="text-xs text-white/30">{client.email}</div>
                    <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded border mt-1 ${getTypeColor(client.type)}`}>
                      {getTypeText(client.type)}
                    </span>
                  </td>
                  <td className="py-2 px-2">
                    <div>{client.company}</div>
                    <div className="text-xs text-white/30">{client.website}</div>
                  </td>
                  <td className="py-2 px-2">
                    <div>{client.phone}</div>
                    <div className="text-xs text-white/30">{format(new Date(client.lastContact), 'dd/MM/yyyy', { locale: es })}</div>
                  </td>
                  <td className="py-2 px-2">
                    <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded border ${getStatusColor(client.status)}`}>
                      {getStatusText(client.status)}
                    </span>
                  </td>
                  <td className="py-2 px-2">
                    <div>{client.projects} proyectos</div>
                    <div className="text-xs text-white/30">€{client.totalSpent.toLocaleString()}</div>
                  </td>
                  <td className="py-2 px-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedClient(client);
                          setShowModal(true);
                        }}
                        className="p-1 text-white/40 hover:text-white hover:bg-white/10 rounded transition-colors"
                        title="Ver detalles"
                      >
                        <PersonIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedClient(client);
                          setEditing(true);
                          setShowModal(true);
                        }}
                        className="p-1 text-white/40 hover:text-white hover:bg-white/10 rounded transition-colors"
                        title="Editar"
                      >
                        <PersonIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteClient(client.id)}
                        className="p-1 text-red-400/60 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                        title="Eliminar"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredClients.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-white/30">No se encontraron clientes</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal de detalles */}
      <AnimatePresence>
        {showModal && selectedClient && (
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
                <h3 className="text-lg font-semibold">
                  {editing ? 'Editar Cliente' : 'Detalles del Cliente'}
                </h3>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditing(false);
                  }}
                  className="text-white/40 hover:text-white hover:bg-white/10 rounded p-1 transition-colors"
                >
                  <Cross2Icon className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-white mb-2 text-sm">Información Personal</h4>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg space-y-2">
                    <p><strong>Nombre:</strong> {selectedClient.name}</p>
                    <p><strong>Email:</strong> {selectedClient.email}</p>
                    <p><strong>Teléfono:</strong> {selectedClient.phone}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2 text-sm">Información de la Empresa</h4>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg space-y-2">
                    <p><strong>Empresa:</strong> {selectedClient.company}</p>
                    <p><strong>Sitio web:</strong> {selectedClient.website}</p>
                    <p><strong>Tipo:</strong> <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded border ${getTypeColor(selectedClient.type)}`}>
                      {getTypeText(selectedClient.type)}
                    </span></p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2 text-sm">Información Comercial</h4>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg space-y-2">
                    <p><strong>Estado:</strong> <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded border ${getStatusColor(selectedClient.status)}`}>
                      {getStatusText(selectedClient.status)}
                    </span></p>
                    <p><strong>Proyectos:</strong> {selectedClient.projects}</p>
                    <p><strong>Total gastado:</strong> €{selectedClient.totalSpent.toLocaleString()}</p>
                    <p><strong>Último contacto:</strong> {format(new Date(selectedClient.lastContact), 'dd/MM/yyyy', { locale: es })}</p>
                  </div>
                </div>

                {selectedClient.notes && (
                  <div>
                    <h4 className="font-semibold text-white mb-2 text-sm">Notas</h4>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                      <p className="text-white/70">{selectedClient.notes}</p>
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-white mb-2 text-sm">Información del Sistema</h4>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg space-y-2 text-xs text-white/50">
                    <p><strong>Creado:</strong> {format(new Date(selectedClient.created_at), 'dd/MM/yyyy HH:mm', { locale: es })}</p>
                    <p><strong>Actualizado:</strong> {format(new Date(selectedClient.updated_at), 'dd/MM/yyyy HH:mm', { locale: es })}</p>
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