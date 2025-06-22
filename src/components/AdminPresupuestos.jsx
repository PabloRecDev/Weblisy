import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { 
  PlusIcon,
  MagnifyingGlassIcon,
  StarIcon,
  PersonIcon,
  Cross2Icon,
  HomeIcon,
  CalendarIcon,
  TrashIcon,
  CheckIcon,
  ClockIcon,
  DownloadIcon
} from '@radix-ui/react-icons';

const mockPresupuestos = [
  {
    id: 'P-2024-001',
    cliente: { nombre: 'María García', empresa: 'TechCorp Solutions' },
    titulo: 'Desarrollo de E-commerce',
    descripcion: 'Plataforma completa de comercio electrónico',
    fechaCreacion: '2024-01-15',
    fechaVencimiento: '2024-02-15',
    estado: 'pendiente',
    prioridad: 'alta',
    total: 11979,
    items: [
        { descripcion: "Diseño UI/UX", cantidad: 1, precio_unitario: 1500, total: 1500 },
        { descripcion: "Desarrollo Frontend", cantidad: 1, precio_unitario: 3000, total: 3000 },
        { descripcion: "Desarrollo Backend", cantidad: 1, precio_unitario: 3500, total: 3500 },
        { descripcion: "Despliegue y QA", cantidad: 1, precio_unitario: 1000, total: 1000 }
    ],
    created_at: '2024-01-15T10:30:00Z'
  },
  {
    id: 'P-2024-002',
    cliente: { nombre: 'Carlos Rodríguez', empresa: 'StartupXYZ' },
    titulo: 'Sistema de Gestión de Inventarios',
    descripcion: 'Aplicación web para control de stock',
    fechaCreacion: '2024-01-10',
    fechaVencimiento: '2024-02-10',
    estado: 'aprobado',
    prioridad: 'media',
    total: 8470,
    items: [
        { descripcion: "Análisis de requerimientos", cantidad: 1, precio_unitario: 1000, total: 1000 },
        { descripcion: "Desarrollo de API", cantidad: 1, precio_unitario: 4000, total: 4000 },
        { descripcion: "Integración con lectores de códigos", cantidad: 1, precio_unitario: 2000, total: 2000 }
    ],
    created_at: '2024-01-10T14:20:00Z'
  },
  {
    id: 'P-2024-003',
    cliente: { nombre: 'Ana López', empresa: 'DigitalAgency' },
    titulo: 'Rediseño de Sitio Web',
    descripcion: 'Rediseño completo del sitio web corporativo',
    fechaCreacion: '2024-01-08',
    fechaVencimiento: '2024-02-08',
    estado: 'rechazado',
    prioridad: 'baja',
    total: 4235,
    items: [
        { descripcion: "Workshop de diseño", cantidad: 1, precio_unitario: 800, total: 800 },
        { descripcion: "Maquetación HTML/CSS", cantidad: 1, precio_unitario: 2500, total: 2500 },
        { descripcion: "Optimización SEO", cantidad: 1, precio_unitario: 500, total: 500 }
    ],
    created_at: '2024-01-08T09:15:00Z'
  }
];

export default function AdminPresupuestos() {
  const [presupuestos, setPresupuestos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [estadoFilter, setEstadoFilter] = useState('todos');
  const [selectedPresupuesto, setSelectedPresupuesto] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [stats, setStats] = useState({
    total: 0,
    pendientes: 0,
    aprobados: 0,
    rechazados: 0,
    valorTotal: 0
  });

  const [newPresupuesto, setNewPresupuesto] = useState({
    cliente_id: '',
    titulo: '',
    fecha_creacion: new Date().toISOString().split('T')[0],
    fecha_vencimiento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    total: 0,
    estado: 'pendiente'
  });

  const [presupuestoItems, setPresupuestoItems] = useState([
    { descripcion: '', cantidad: 1, precio_unitario: 0, total: 0 }
  ]);

  useEffect(() => {
    fetchPresupuestos();
  }, []);

  const fetchPresupuestos = async () => {
    try {
      setLoading(true);
      setTimeout(() => {
        setPresupuestos(mockPresupuestos);
        calculateStats(mockPresupuestos);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const calculateStats = (presupuestosData) => {
    const stats = {
      total: presupuestosData.length,
      pendientes: presupuestosData.filter(p => p.estado === 'pendiente').length,
      aprobados: presupuestosData.filter(p => p.estado === 'aprobado').length,
      rechazados: presupuestosData.filter(p => p.estado === 'rechazado').length,
      valorTotal: presupuestosData.reduce((sum, p) => sum + p.total, 0)
    };
    setStats(stats);
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case 'pendiente': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'aprobado': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'rechazado': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getEstadoText = (estado) => {
    switch (estado) {
      case 'pendiente': return 'Pendiente';
      case 'aprobado': return 'Aprobado';
      case 'rechazado': return 'Rechazado';
      default: return estado;
    }
  };

  const filteredPresupuestos = presupuestos.filter(presupuesto => {
    const matchesSearch = 
      presupuesto.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      presupuesto.cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      presupuesto.cliente.empresa.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEstado = estadoFilter === 'todos' || presupuesto.estado === estadoFilter;
    
    return matchesSearch && matchesEstado;
  });

  const handleOpenModal = () => {
    // Lógica para abrir el modal de creación
    setShowModal(true);
  };

  const handleNewPresupuestoChange = (e) => {
    const { name, value } = e.target;
    setNewPresupuesto(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...presupuestoItems];
    const item = { ...updatedItems[index], [field]: value };
    
    const cantidad = parseFloat(item.cantidad) || 0;
    const precioUnitario = parseFloat(item.precio_unitario) || 0;
    item.total = cantidad * precioUnitario;
    
    updatedItems[index] = item;
    setPresupuestoItems(updatedItems);
  };

  const addItem = () => {
    setPresupuestoItems([...presupuestoItems, { descripcion: '', cantidad: 1, precio_unitario: 0, total: 0 }]);
  };

  const removeItem = (index) => {
    if (presupuestoItems.length > 1) {
      setPresupuestoItems(presupuestoItems.filter((_, i) => i !== index));
    }
  };

  const resetForm = () => {
    setNewPresupuesto({
      cliente_id: '',
      titulo: '',
      fecha_creacion: new Date().toISOString().split('T')[0],
      fecha_vencimiento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      total: 0,
      estado: 'pendiente'
    });
    setPresupuestoItems([{ descripcion: '', cantidad: 1, precio_unitario: 0, total: 0 }]);
  };

  const handleCreatePresupuesto = async (e) => {
    e.preventDefault();
    // Lógica para guardar el presupuesto (próximamente)
    console.log("Creando presupuesto:", newPresupuesto, presupuestoItems);
    setShowModal(false);
    resetForm();
  };

  const generatePDF = (presupuesto) => {
    const doc = new jsPDF();

    // Encabezado
    doc.setFontSize(20);
    doc.text("Presupuesto", 14, 22);
    doc.setFontSize(12);
    doc.text(`ID: ${presupuesto.id}`, 14, 30);

    // Información del cliente
    doc.setFontSize(10);
    doc.text(`Cliente: ${presupuesto.cliente.nombre}`, 14, 40);
    doc.text(`Empresa: ${presupuesto.cliente.empresa}`, 14, 45);
    doc.text(`Fecha: ${format(new Date(presupuesto.fechaCreacion), 'dd/MM/yyyy', { locale: es })}`, 150, 40);
    doc.text(`Vencimiento: ${format(new Date(presupuesto.fechaVencimiento), 'dd/MM/yyyy', { locale: es })}`, 150, 45);

    // Tabla de conceptos
    const tableColumn = ["Descripción", "Cantidad", "Precio Unitario", "Total"];
    const tableRows = [];

    presupuesto.items.forEach(item => {
      const itemData = [
        item.descripcion,
        item.cantidad,
        `€${item.precio_unitario.toFixed(2)}`,
        `€${item.total.toFixed(2)}`
      ];
      tableRows.push(itemData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 55,
    });

    // Total
    const finalY = doc.autoTable.previous.finalY;
    doc.setFontSize(12);
    doc.text(`Total: €${presupuesto.total.toLocaleString()}`, 150, finalY + 10);

    // Pie de página
    doc.setFontSize(8);
    doc.text("Gracias por su confianza.", 14, doc.internal.pageSize.height - 10);

    doc.save(`Presupuesto-${presupuesto.id}.pdf`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-white text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Cargando presupuestos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6">
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-white/40">Total</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold">{stats.total}</span>
            <StarIcon className="w-4 h-4 text-white/20" />
          </div>
        </div>
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-yellow-400/80">Pendientes</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold text-yellow-400">{stats.pendientes}</span>
            <ClockIcon className="w-4 h-4 text-yellow-400/20" />
          </div>
        </div>
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-green-400/80">Aprobados</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold text-green-400">{stats.aprobados}</span>
            <CheckIcon className="w-4 h-4 text-green-400/20" />
          </div>
        </div>
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-red-400/80">Rechazados</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold text-red-400">{stats.rechazados}</span>
            <Cross2Icon className="w-4 h-4 text-red-400/20" />
          </div>
        </div>
        <div className="rounded-md px-3 py-2 flex flex-col items-start bg-transparent">
          <span className="text-xs text-blue-400/80">Valor Total</span>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-lg font-semibold text-blue-400">€{stats.valorTotal.toLocaleString()}</span>
            <StarIcon className="w-4 h-4 text-blue-400/20" />
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <div className="relative flex-1">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input
            type="text"
            placeholder="Buscar presupuestos..."
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
          <option value="pendiente">Pendientes</option>
          <option value="aprobado">Aprobados</option>
          <option value="rechazado">Rechazados</option>
        </select>
        <button
          onClick={handleOpenModal}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#038e42] text-sm text-white font-medium hover:bg-[#038e42]/80 transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          Crear Presupuesto
        </button>
      </div>

      {/* Tabla */}
      <div className="flex-1 pb-8">
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-white/40 border-b border-white/10">
                <th className="py-2 px-2 font-medium text-left">ID</th>
                <th className="py-2 px-2 font-medium text-left">Cliente</th>
                <th className="py-2 px-2 font-medium text-left">Título</th>
                <th className="py-2 px-2 font-medium text-left">Estado</th>
                <th className="py-2 px-2 font-medium text-left">Total</th>
                <th className="py-2 px-2 font-medium text-left">Vencimiento</th>
                <th className="py-2 px-2 font-medium text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredPresupuestos.map((presupuesto) => (
                <tr key={presupuesto.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                  <td className="py-2 px-2">
                    <div className="font-medium text-white">{presupuesto.id}</div>
                    <div className="text-xs text-white/30">{format(new Date(presupuesto.fechaCreacion), 'dd/MM/yyyy', { locale: es })}</div>
                  </td>
                  <td className="py-2 px-2">
                    <div className="font-medium text-white">{presupuesto.cliente.nombre}</div>
                    <div className="text-xs text-white/30">{presupuesto.cliente.empresa}</div>
                  </td>
                  <td className="py-2 px-2">
                    <div className="font-medium text-white">{presupuesto.titulo}</div>
                    <div className="text-xs text-white/30">{presupuesto.descripcion}</div>
                  </td>
                  <td className="py-2 px-2">
                    <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded border ${getEstadoColor(presupuesto.estado)}`}>
                      {getEstadoText(presupuesto.estado)}
                    </span>
                  </td>
                  <td className="py-2 px-2">
                    <div className="font-semibold">€{presupuesto.total.toLocaleString()}</div>
                  </td>
                  <td className="py-2 px-2">
                    <div className="text-xs text-white/70">
                      {format(new Date(presupuesto.fechaVencimiento), 'dd/MM/yyyy', { locale: es })}
                    </div>
                  </td>
                  <td className="py-2 px-2">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button onClick={() => generatePDF(presupuesto)} className="p-1 hover:bg-white/10 rounded">
                        <DownloadIcon className="w-4 h-4" />
                      </button>
                      <button className="p-1 hover:bg-white/10 rounded">
                        <TrashIcon className="w-4 h-4 text-red-500/80" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPresupuestos.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-white/30">No se encontraron presupuestos</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para crear presupuesto */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#1c1c1c] rounded-lg w-full max-w-2xl p-6 border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold mb-4">Crear Nuevo Presupuesto</h2>
              <form onSubmit={handleCreatePresupuesto}>
                {/* Aquí irían los campos del formulario */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-white/70">Título</label>
                    <input name="titulo" value={newPresupuesto.titulo} onChange={handleNewPresupuestoChange} type="text" className="w-full mt-1 p-2 rounded bg-white/5 border border-white/10" />
                  </div>
                  <div>
                    <label className="text-sm text-white/70">Cliente</label>
                    <select name="cliente_id" value={newPresupuesto.cliente_id} onChange={handleNewPresupuestoChange} className="w-full mt-1 p-2 rounded bg-white/5 border border-white/10">
                      <option value="">Seleccionar cliente</option>
                      {/* Aquí se mapearían los clientes */}
                    </select>
                  </div>
                  
                  {/* Items del presupuesto */}
                  <h3 className="font-semibold pt-4">Conceptos</h3>
                  {presupuestoItems.map((item, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <input value={item.descripcion} onChange={(e) => handleItemChange(index, 'descripcion', e.target.value)} type="text" placeholder="Descripción" className="w-full p-2 rounded bg-white/5 border border-white/10" />
                      <input value={item.cantidad} onChange={(e) => handleItemChange(index, 'cantidad', e.target.value)} type="number" placeholder="Cant." className="w-20 p-2 rounded bg-white/5 border border-white/10" />
                      <input value={item.precio_unitario} onChange={(e) => handleItemChange(index, 'precio_unitario', e.target.value)} type="number" placeholder="Precio" className="w-24 p-2 rounded bg-white/5 border border-white/10" />
                      <button type="button" onClick={() => removeItem(index)} className="text-red-500">
                        <TrashIcon />
                      </button>
                    </div>
                  ))}
                   <button type="button" onClick={addItem} className="text-sm text-[#038e42]">
                    + Añadir concepto
                  </button>

                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded bg-white/10 text-white">
                    Cancelar
                  </button>
                  <button type="submit" className="px-4 py-2 rounded bg-[#038e42] text-white">
                    Guardar Presupuesto
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
} 