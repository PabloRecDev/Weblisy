import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  StarIcon, 
  PersonIcon, 
  Cross2Icon,
  HomeIcon,
  TrashIcon
} from '@radix-ui/react-icons';

const mockClientes = [
  {
    id: '1',
    nombre: 'María García',
    email: 'maria.garcia@techcorp.com',
    telefono: '+34 612 345 678',
    empresa: 'TechCorp Solutions',
    website: 'www.techcorp.com',
    direccion: 'Calle Mayor 123, Madrid',
    estado: 'activo',
    tipo: 'premium',
    proyectos: 8,
    facturacion: 45000,
    ultimoContacto: '2024-01-15',
    proximaReunion: '2024-01-25',
    notas: 'Cliente muy satisfecho con el último proyecto. Interesado en expandir servicios.',
    tags: ['Desarrollo Web', 'E-commerce', 'Premium'],
    created_at: '2023-01-15T10:30:00Z',
    updated_at: '2024-01-15T14:20:00Z'
  },
  {
    id: '2',
    nombre: 'Carlos Rodríguez',
    email: 'carlos.rodriguez@startupxyz.com',
    telefono: '+34 623 456 789',
    empresa: 'StartupXYZ',
    website: 'www.startupxyz.com',
    direccion: 'Avenida Diagonal 456, Barcelona',
    estado: 'activo',
    tipo: 'estandar',
    proyectos: 3,
    facturacion: 18000,
    ultimoContacto: '2024-01-10',
    proximaReunion: '2024-01-30',
    notas: 'Startup en crecimiento. Necesita sistema de gestión de inventarios.',
    tags: ['Startup', 'Inventario', 'SaaS'],
    created_at: '2023-06-20T09:15:00Z',
    updated_at: '2024-01-10T16:45:00Z'
  },
  {
    id: '3',
    nombre: 'Ana López',
    email: 'ana.lopez@digitalagency.com',
    telefono: '+34 634 567 890',
    empresa: 'DigitalAgency',
    website: 'www.digitalagency.com',
    direccion: 'Plaza España 789, Valencia',
    estado: 'inactivo',
    tipo: 'premium',
    proyectos: 12,
    facturacion: 75000,
    ultimoContacto: '2023-11-20',
    proximaReunion: null,
    notas: 'Cliente histórico. Últimamente no responde a contactos.',
    tags: ['Agencia', 'Marketing', 'Histórico'],
    created_at: '2022-03-10T11:20:00Z',
    updated_at: '2023-11-20T10:30:00Z'
  },
  {
    id: '4',
    nombre: 'Roberto Silva',
    email: 'roberto.silva@restaurantelite.com',
    telefono: '+34 645 678 901',
    empresa: 'RestaurantElite',
    website: 'www.restaurantelite.com',
    direccion: 'Calle Gourmet 321, Sevilla',
    estado: 'nuevo',
    tipo: 'estandar',
    proyectos: 0,
    facturacion: 0,
    ultimoContacto: '2024-01-18',
    proximaReunion: '2024-01-22',
    notas: 'Nuevo cliente interesado en sistema de reservas online.',
    tags: ['Restaurante', 'Reservas', 'Nuevo'],
    created_at: '2024-01-18T08:30:00Z',
    updated_at: '2024-01-18T08:30:00Z'
  },
  {
    id: '5',
    nombre: 'Laura Martínez',
    email: 'laura.martinez@consultingpro.com',
    telefono: '+34 656 789 012',
    empresa: 'ConsultingPro',
    website: 'www.consultingpro.com',
    direccion: 'Paseo de la Castellana 654, Madrid',
    estado: 'activo',
    tipo: 'premium',
    proyectos: 5,
    facturacion: 32000,
    ultimoContacto: '2024-01-12',
    proximaReunion: '2024-01-28',
    notas: 'Cliente de consultoría. Necesita CRM personalizado.',
    tags: ['Consultoría', 'CRM', 'Premium'],
    created_at: '2023-08-15T14:45:00Z',
    updated_at: '2024-01-12T12:15:00Z'
  }
];

export default function AdminClientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [estadoFilter, setEstadoFilter] = useState('todos');
  const [tipoFilter, setTipoFilter] = useState('todos');
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [viewMode, setViewMode] = useState('table'); // 'table' o 'cards'

  // Estados para estadísticas
  const [stats, setStats] = useState({
    total: 0,
    activos: 0,
    inactivos: 0,
    nuevos: 0,
    premium: 0,
    estandar: 0,
    facturacionTotal: 0,
    proyectosTotal: 0
  });

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      setLoading(true);
      // Simular llamada a API
      setTimeout(() => {
        setClientes(mockClientes);
        calculateStats(mockClientes);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const calculateStats = (clientesData) => {
    const stats = {
      total: clientesData.length,
      activos: clientesData.filter(c => c.estado === 'activo').length,
      inactivos: clientesData.filter(c => c.estado === 'inactivo').length,
      nuevos: clientesData.filter(c => c.estado === 'nuevo').length,
      premium: clientesData.filter(c => c.tipo === 'premium').length,
      estandar: clientesData.filter(c => c.tipo === 'estandar').length,
      facturacionTotal: clientesData.reduce((sum, c) => sum + c.facturacion, 0),
      proyectosTotal: clientesData.reduce((sum, c) => sum + c.proyectos, 0)
    };
    setStats(stats);
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'activo': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'inactivo': return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
      case 'nuevo': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getTipoColor = (tipo) => {
    switch (tipo) {
      case 'premium': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'estandar': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getEstadoText = (estado) => {
    switch (estado) {
      case 'activo': return 'Activo';
      case 'inactivo': return 'Inactivo';
      case 'nuevo': return 'Nuevo';
      default: return estado;
    }
  };

  const getTipoText = (tipo) => {
    switch (tipo) {
      case 'premium': return 'Premium';
      case 'estandar': return 'Estándar';
      default: return tipo;
    }
  };

  const filteredClientes = clientes.filter(cliente => {
    const matchesSearch = 
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.empresa.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEstado = estadoFilter === 'todos' || cliente.estado === estadoFilter;
    const matchesTipo = tipoFilter === 'todos' || cliente.tipo === tipoFilter;
    
    return matchesSearch && matchesEstado && matchesTipo;
  });

  const deleteCliente = async (clienteId) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      return;
    }

    try {
      const updatedClientes = clientes.filter(c => c.id !== clienteId);
      setClientes(updatedClientes);
      calculateStats(updatedClientes);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Cargando clientes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-6">
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
            <span className="text-lg font-semibold text-green-400">{stats.activos}</span>
            <StarIcon className="w-4 h-4 text-green-400/20" />
          </div>
        </div>
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-blue-400/80">Nuevos</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold text-blue-400">{stats.nuevos}</span>
            <PlusIcon className="w-4 h-4 text-blue-400/20" />
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
          <span className="text-xs text-white/40">Proyectos</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold">{stats.proyectosTotal}</span>
            <HomeIcon className="w-4 h-4 text-white/20" />
          </div>
        </div>
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-green-400/80">Facturación</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold text-green-400">€{stats.facturacionTotal.toLocaleString()}</span>
            <StarIcon className="w-4 h-4 text-green-400/20" />
          </div>
        </div>
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-white/40">Inactivos</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold text-white/40">{stats.inactivos}</span>
            <Cross2Icon className="w-4 h-4 text-white/20" />
          </div>
        </div>
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-blue-400/80">Estándar</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold text-blue-400">{stats.estandar}</span>
            <PersonIcon className="w-4 h-4 text-blue-400/20" />
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
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
          value={estadoFilter}
          onChange={(e) => setEstadoFilter(e.target.value)}
          className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-sm text-white focus:border-white/20 focus:outline-none focus:bg-white/10 transition-colors"
        >
          <option value="todos">Todos los estados</option>
          <option value="activo">Activos</option>
          <option value="inactivo">Inactivos</option>
          <option value="nuevo">Nuevos</option>
        </select>
        <select
          value={tipoFilter}
          onChange={(e) => setTipoFilter(e.target.value)}
          className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-sm text-white focus:border-white/20 focus:outline-none focus:bg-white/10 transition-colors"
        >
          <option value="todos">Todos los tipos</option>
          <option value="premium">Premium</option>
          <option value="estandar">Estándar</option>
        </select>
      </div>

      {/* Contenido */}
      <div className="flex-1 pb-8">
        {viewMode === 'table' ? (
          <div className="overflow-x-auto rounded-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-white/40 border-b border-white/10">
                  <th className="py-2 px-2 font-medium text-left">Cliente</th>
                  <th className="py-2 px-2 font-medium text-left">Empresa</th>
                  <th className="py-2 px-2 font-medium text-left">Contacto</th>
                  <th className="py-2 px-2 font-medium text-left">Estado</th>
                  <th className="py-2 px-2 font-medium text-left">Proyectos</th>
                  <th className="py-2 px-2 font-medium text-left">Facturación</th>
                  <th className="py-2 px-2 font-medium text-left">Próxima Reunión</th>
                  <th className="py-2 px-2 font-medium text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredClientes.map((cliente) => (
                  <tr key={cliente.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                    <td className="py-2 px-2">
                      <div className="font-medium text-white">{cliente.nombre}</div>
                      <div className="text-xs text-white/30">{cliente.email}</div>
                      <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded border mt-1 ${getTipoColor(cliente.tipo)}`}>
                        {getTipoText(cliente.tipo)}
                      </span>
                    </td>
                    <td className="py-2 px-2">
                      <div>{cliente.empresa}</div>
                      <div className="text-xs text-white/30">{cliente.website}</div>
                    </td>
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-1 text-xs">
                        <PersonIcon className="w-3 h-3" />
                        {cliente.telefono}
                      </div>
                      <div className="text-xs text-white/30 mt-1">
                        Último: {format(new Date(cliente.ultimoContacto), 'dd/MM/yyyy', { locale: es })}
                      </div>
                    </td>
                    <td className="py-2 px-2">
                      <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded border ${getEstadoColor(cliente.estado)}`}>
                        {getEstadoText(cliente.estado)}
                      </span>
                    </td>
                    <td className="py-2 px-2">
                      <div>{cliente.proyectos} proyectos</div>
                    </td>
                    <td className="py-2 px-2">
                      <div className="font-semibold">€{cliente.facturacion.toLocaleString()}</div>
                    </td>
                    <td className="py-2 px-2">
                      {cliente.proximaReunion ? (
                        <div className="text-xs">
                          {format(new Date(cliente.proximaReunion), 'dd/MM/yyyy', { locale: es })}
                        </div>
                      ) : (
                        <div className="text-xs text-white/30">Sin programar</div>
                      )}
                    </td>
                    <td className="py-2 px-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedCliente(cliente);
                            setShowModal(true);
                          }}
                          className="p-1 text-white/40 hover:text-white hover:bg-white/10 rounded transition-colors"
                          title="Ver detalles"
                        >
                          <PersonIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedCliente(cliente);
                            setEditing(true);
                            setShowModal(true);
                          }}
                          className="p-1 text-white/40 hover:text-white hover:bg-white/10 rounded transition-colors"
                          title="Editar"
                        >
                          <PersonIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteCliente(cliente.id)}
                          className="p-1 text-red-400/60 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                          title="Eliminar"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredClientes.length === 0 && (
                  <tr>
                    <td colSpan={8} className="text-center py-8 text-white/30">No se encontraron clientes</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClientes.map((cliente) => (
              <motion.div
                key={cliente.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/8 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-white">{cliente.nombre}</h3>
                    <p className="text-sm text-white/60">{cliente.empresa}</p>
                  </div>
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded border ${getEstadoColor(cliente.estado)}`}>
                    {getEstadoText(cliente.estado)}
                  </span>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <PersonIcon className="w-4 h-4 text-white/40" />
                    <span className="text-white/70">{cliente.telefono}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <HomeIcon className="w-4 h-4 text-white/40" />
                    <span className="text-white/70">{cliente.website}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-400">{cliente.proyectos}</div>
                    <div className="text-xs text-white/40">Proyectos</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-400">€{cliente.facturacion.toLocaleString()}</div>
                    <div className="text-xs text-white/40">Facturación</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-yellow-400">{getTipoText(cliente.tipo)}</div>
                    <div className="text-xs text-white/40">Tipo</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {cliente.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-white/10 rounded border border-white/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setSelectedCliente(cliente);
                        setShowModal(true);
                      }}
                      className="p-1 text-white/40 hover:text-white hover:bg-white/10 rounded transition-colors"
                      title="Ver detalles"
                    >
                      <PersonIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCliente(cliente);
                        setEditing(true);
                        setShowModal(true);
                      }}
                      className="p-1 text-white/40 hover:text-white hover:bg-white/10 rounded transition-colors"
                      title="Editar"
                    >
                      <PersonIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de detalles/edición */}
      <AnimatePresence>
        {showModal && selectedCliente && (
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
              className="bg-black border border-white/10 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">
                  {editing ? 'Editar Cliente' : 'Detalles del Cliente'}
                </h2>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setEditing(false);
                    setSelectedCliente(null);
                  }}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <Cross2Icon className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-white mb-2 text-sm">Información Personal</h4>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-lg space-y-2">
                      <p><strong>Nombre:</strong> {selectedCliente.nombre}</p>
                      <p><strong>Email:</strong> {selectedCliente.email}</p>
                      <p><strong>Teléfono:</strong> {selectedCliente.telefono}</p>
                      <p><strong>Dirección:</strong> {selectedCliente.direccion}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-white mb-2 text-sm">Información de la Empresa</h4>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-lg space-y-2">
                      <p><strong>Empresa:</strong> {selectedCliente.empresa}</p>
                      <p><strong>Sitio web:</strong> {selectedCliente.website}</p>
                      <p><strong>Tipo:</strong> <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded border ${getTipoColor(selectedCliente.tipo)}`}>
                        {getTipoText(selectedCliente.tipo)}
                      </span></p>
                      <p><strong>Estado:</strong> <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded border ${getEstadoColor(selectedCliente.estado)}`}>
                        {getEstadoText(selectedCliente.estado)}
                      </span></p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2 text-sm">Información Comercial</h4>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg space-y-2">
                    <p><strong>Proyectos:</strong> {selectedCliente.proyectos}</p>
                    <p><strong>Facturación total:</strong> €{selectedCliente.facturacion.toLocaleString()}</p>
                    <p><strong>Último contacto:</strong> {format(new Date(selectedCliente.ultimoContacto), 'dd/MM/yyyy', { locale: es })}</p>
                    <p><strong>Próxima reunión:</strong> {selectedCliente.proximaReunion ? format(new Date(selectedCliente.proximaReunion), 'dd/MM/yyyy', { locale: es }) : 'Sin programar'}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-2 text-sm">Etiquetas</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCliente.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 text-sm bg-white/10 rounded-full border border-white/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedCliente.notas && (
                  <div>
                    <h4 className="font-semibold text-white mb-2 text-sm">Notas</h4>
                    <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                      <p className="text-white/70">{selectedCliente.notas}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="text-xs text-white/40">
                    Creado: {format(new Date(selectedCliente.created_at), 'dd/MM/yyyy HH:mm', { locale: es })}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setShowModal(false);
                        setEditing(false);
                        setSelectedCliente(null);
                      }}
                      className="px-4 py-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                    >
                      Cerrar
                    </button>
                    {!editing && (
                      <button
                        onClick={() => setEditing(true)}
                        className="px-4 py-2 rounded-md bg-[#038e42] hover:bg-[#038e42]/80 transition-colors"
                      >
                        Editar
                      </button>
                    )}
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