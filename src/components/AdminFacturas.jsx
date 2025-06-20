import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  DownloadIcon,
  TrashIcon,
  Cross2Icon,
  EyeOpenIcon
} from '@radix-ui/react-icons';
import { supabase } from '../lib/supabase';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const AdminFacturas = () => {
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addError, setAddError] = useState('');
  
  const [newInvoice, setNewInvoice] = useState({
    client_id: '',
    issue_date: new Date().toISOString().split('T')[0],
    due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    tax_rate: 21,
    notes: '',
    payment_terms: 'Pago a 30 días'
  });

  const [invoiceItems, setInvoiceItems] = useState([
    { description: '', quantity: 1, unit_price: 0, total: 0 }
  ]);

  const [stats, setStats] = useState({
    total: 0,
    totalAmount: 0,
    paid: 0,
    pending: 0
  });

  useEffect(() => {
    fetchInvoices();
    fetchClients();
  }, []);

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const { data: invoicesData, error } = await supabase
        .from('invoices')
        .select(`
          *,
          clients (
            name,
            email,
            company,
            phone
          ),
          invoice_items (
            *
          )
        `)
        .order('issue_date', { ascending: false });

      if (error) throw error;
      
      setInvoices(invoicesData || []);
      calculateStats(invoicesData || []);

    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const { data: clientsData, error } = await supabase
        .from('clients')
        .select('*')
        .order('name');

      if (error) throw error;
      setClients(clientsData || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  const calculateStats = (invoicesData) => {
    const total = invoicesData.length;
    const totalAmount = invoicesData.reduce((sum, inv) => sum + parseFloat(inv.total || 0), 0);
    const paid = invoicesData.filter(inv => inv.status === 'paid').length;
    const pending = invoicesData.filter(inv => inv.status === 'sent' || inv.status === 'draft').length;

    setStats({ total, totalAmount, paid, pending });
  };

  const filteredInvoices = invoices.filter(invoice => {
    const term = searchTerm.toLowerCase();
    return (
      invoice.invoice_number?.toLowerCase().includes(term) ||
      invoice.clients?.name?.toLowerCase().includes(term) ||
      invoice.clients?.company?.toLowerCase().includes(term)
    );
  });

  const handleNewInvoiceChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...invoiceItems];
    const item = { ...updatedItems[index], [field]: value };
    
    const quantity = parseFloat(item.quantity) || 0;
    const unitPrice = parseFloat(item.unit_price) || 0;
    item.total = quantity * unitPrice;
    
    updatedItems[index] = item;
    setInvoiceItems(updatedItems);
  };

  const addItem = () => {
    setInvoiceItems([...invoiceItems, { description: '', quantity: 1, unit_price: 0, total: 0 }]);
  };

  const removeItem = (index) => {
    if (invoiceItems.length > 1) {
      setInvoiceItems(invoiceItems.filter((_, i) => i !== index));
    }
  };
  
  const resetForm = () => {
    setNewInvoice({
      client_id: '',
      issue_date: new Date().toISOString().split('T')[0],
      due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      tax_rate: 21,
      notes: '',
      payment_terms: 'Pago a 30 días'
    });
    setInvoiceItems([{ description: '', quantity: 1, unit_price: 0, total: 0 }]);
    setAddError('');
  };

  const handleAddInvoice = async (e) => {
    e.preventDefault();
    if (!newInvoice.client_id) {
      setAddError('Debes seleccionar un cliente.');
      return;
    }

    if (invoiceItems.some(item => !item.description || item.total <= 0)) {
      setAddError('Todas las líneas deben tener descripción y un total mayor a 0.');
      return;
    }

    setIsSubmitting(true);
    setAddError('');

    try {
      const subtotal = invoiceItems.reduce((sum, item) => sum + item.total, 0);
      const tax_rate = parseFloat(newInvoice.tax_rate) || 0;
      const tax_amount = subtotal * (tax_rate / 100);
      const total = subtotal + tax_amount;

      const invoicePayload = {
        ...newInvoice,
        subtotal,
        tax_amount,
        total,
      };

      const { data: invoiceData, error: invoiceError } = await supabase
        .from('invoices')
        .insert(invoicePayload)
        .select()
        .single();

      if (invoiceError) throw invoiceError;

      const itemsWithInvoiceId = invoiceItems.map(item => ({
        ...item,
        invoice_id: invoiceData.id
      }));

      const { error: itemsError } = await supabase
        .from('invoice_items')
        .insert(itemsWithInvoiceId);

      if (itemsError) throw itemsError;

      setShowAddModal(false);
      resetForm();
      fetchInvoices();

    } catch (error) {
      console.error('Error adding invoice:', error);
      setAddError(error.message || 'No se pudo crear la factura.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteInvoice = async (invoiceId) => {
    if (!window.confirm('¿Estás seguro de que quieres eliminar esta factura? Esta acción no se puede deshacer.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('invoices')
        .delete()
        .eq('id', invoiceId);

      if (error) throw error;

      fetchInvoices();
      if (selectedInvoice && selectedInvoice.id === invoiceId) {
        setSelectedInvoice(null);
      }

    } catch (error) {
      console.error('Error deleting invoice:', error);
      alert('Hubo un error al eliminar la factura.');
    }
  };

  const generatePDF = async (invoice) => {
    const invoiceEl = document.createElement('div');
    invoiceEl.id = `invoice-pdf-${invoice.id}`;
    invoiceEl.style.position = 'absolute';
    invoiceEl.style.left = '-9999px';
    invoiceEl.style.width = '210mm';
    invoiceEl.style.padding = '20mm';
    invoiceEl.style.boxSizing = 'border-box';
    invoiceEl.style.fontFamily = 'Arial, sans-serif';
    invoiceEl.style.color = '#000';
    
    const invoiceContent = `
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20mm;">
            <div>
                <h1 style="font-size: 24px; margin: 0; color: #000;">FACTURA</h1>
                <p style="margin: 2px 0; color: #555;">${invoice.invoice_number}</p>
            </div>
            <div style="text-align: right;">
                <h2 style="font-size: 20px; margin: 0; color: #000;">Weblisy</h2>
                <p style="margin: 2px 0; color: #555;">info@weblisy.com</p>
            </div>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 15mm;">
            <div>
                <h3 style="margin: 0 0 5mm 0; font-size: 14px; color: #333;">FACTURAR A:</h3>
                <p style="margin: 2px 0;"><strong>${invoice.clients?.name}</strong></p>
                <p style="margin: 2px 0; color: #555;">${invoice.clients?.company || ''}</p>
                <p style="margin: 2px 0; color: #555;">${invoice.clients?.email || ''}</p>
            </div>
            <div style="text-align: right;">
                <p style="margin: 2px 0;"><strong>Fecha:</strong> ${format(new Date(invoice.issue_date), 'dd/MM/yyyy', { locale: es })}</p>
                <p style="margin: 2px 0;"><strong>Vencimiento:</strong> ${format(new Date(invoice.due_date), 'dd/MM/yyyy', { locale: es })}</p>
            </div>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
            <thead>
                <tr style="background-color: #eee;">
                    <th style="padding: 10px; border: 1px solid #ddd; text-align: left;">Descripción</th>
                    <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Cantidad</th>
                    <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Precio Unit.</th>
                    <th style="padding: 10px; border: 1px solid #ddd; text-align: right;">Total</th>
                </tr>
            </thead>
            <tbody>
                ${invoice.invoice_items?.map(item => `
                    <tr>
                        <td style="padding: 10px; border: 1px solid #ddd;">${item.description}</td>
                        <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">${item.quantity}</td>
                        <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">€${parseFloat(item.unit_price).toFixed(2)}</td>
                        <td style="padding: 10px; border: 1px solid #ddd; text-align: right;">€${parseFloat(item.total).toFixed(2)}</td>
                    </tr>
                `).join('') || ''}
            </tbody>
        </table>
        <div style="display: flex; justify-content: flex-end; margin-top: 10mm;">
            <div style="width: 50%;">
                <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                    <tbody>
                        <tr><td style="padding: 5px;">Subtotal:</td><td style="padding: 5px; text-align: right;">€${parseFloat(invoice.subtotal).toFixed(2)}</td></tr>
                        <tr><td style="padding: 5px;">IVA (${invoice.tax_rate}%):</td><td style="padding: 5px; text-align: right;">€${parseFloat(invoice.tax_amount).toFixed(2)}</td></tr>
                        <tr style="font-weight: bold; font-size: 14px;"><td style="padding: 5px; border-top: 2px solid #333;">TOTAL:</td><td style="padding: 5px; text-align: right; border-top: 2px solid #333;">€${parseFloat(invoice.total).toFixed(2)}</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div style="margin-top: 15mm; font-size: 12px; color: #555;">
            <p><strong>Condiciones de pago:</strong> ${invoice.payment_terms}</p>
            ${invoice.notes ? `<p><strong>Notas:</strong> ${invoice.notes}</p>` : ''}
        </div>
    `;
    invoiceEl.innerHTML = invoiceContent;
    document.body.appendChild(invoiceEl);

    try {
        const canvas = await html2canvas(invoiceEl, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;
        const imgWidth = pdfWidth;
        const imgHeight = imgWidth / ratio;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
        }
        
        pdf.save(`factura-${invoice.invoice_number}.pdf`);
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Hubo un error al generar el PDF.');
    } finally {
        document.body.removeChild(invoiceEl);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'sent': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'draft': return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
      case 'overdue': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'paid': return 'Pagada';
      case 'sent': return 'Enviada';
      case 'draft': return 'Borrador';
      case 'overdue': return 'Vencida';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full p-8">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Cargando facturas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Facturas</h1>
          <p className="text-white/60">Gestiona todas tus facturas y genera PDFs.</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowAddModal(true); }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg"
        >
          <PlusIcon className="w-5 h-5" />
          Nueva Factura
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white/5 p-4 rounded-lg"><p className="text-sm text-white/60">Total Facturas</p><p className="text-2xl font-bold">{stats.total}</p></div>
        <div className="bg-white/5 p-4 rounded-lg"><p className="text-sm text-white/60">Total Facturado</p><p className="text-2xl font-bold text-green-400">€{stats.totalAmount.toFixed(2)}</p></div>
        <div className="bg-white/5 p-4 rounded-lg"><p className="text-sm text-white/60">Pagadas</p><p className="text-2xl font-bold text-blue-400">{stats.paid}</p></div>
        <div className="bg-white/5 p-4 rounded-lg"><p className="text-sm text-white/60">Pendientes</p><p className="text-2xl font-bold text-yellow-400">{stats.pending}</p></div>
      </div>

      {/* Controls */}
      <div className="mb-4">
        <div className="relative"><MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" /><input type="text" placeholder="Buscar por número de factura, cliente..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"/></div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white/5 rounded-lg overflow-hidden border border-white/10"><div className="overflow-x-auto"><table className="w-full text-left"><thead className="bg-white/5"><tr><th className="p-4 font-semibold">Nº Factura</th><th className="p-4 font-semibold">Cliente</th><th className="p-4 font-semibold">Fecha</th><th className="p-4 font-semibold">Estado</th><th className="p-4 font-semibold">Total</th><th className="p-4 font-semibold">Acciones</th></tr></thead><tbody>
        {filteredInvoices.map(invoice => (
          <tr key={invoice.id} className="border-t border-white/10 hover:bg-white/5">
            <td className="p-4"><div className="font-medium">{invoice.invoice_number}</div></td>
            <td className="p-4"><div className="font-medium">{invoice.clients?.name}</div><div className="text-sm text-white/60">{invoice.clients?.company}</div></td>
            <td className="p-4 text-white/80">{format(new Date(invoice.issue_date), 'dd MMM yyyy', { locale: es })}</td>
            <td className="p-4"><span className={`inline-flex px-2 py-1 text-xs font-medium rounded border ${getStatusColor(invoice.status)}`}>{getStatusText(invoice.status)}</span></td>
            <td className="p-4 font-semibold">€{parseFloat(invoice.total || 0).toFixed(2)}</td>
            <td className="p-4"><div className="flex items-center gap-2">
              <button onClick={() => generatePDF(invoice)} className="text-blue-400 hover:text-blue-300 p-2 rounded-full hover:bg-blue-500/10" title="Descargar PDF"><DownloadIcon /></button>
              <button onClick={() => setSelectedInvoice(invoice)} className="text-white/60 hover:text-white p-2 rounded-full hover:bg-white/10" title="Ver detalles"><EyeOpenIcon /></button>
              <button onClick={() => deleteInvoice(invoice.id)} className="text-red-400 hover:text-red-300 p-2 rounded-full hover:bg-red-500/10" title="Eliminar factura"><TrashIcon /></button>
            </div></td>
          </tr>
        ))}
        {filteredInvoices.length === 0 && (<tr><td colSpan="6" className="text-center p-8 text-white/60">No se encontraron facturas.</td></tr>)}
      </tbody></table></div></div>

      {/* Add/Edit Invoice Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowAddModal(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-gray-900 border border-white/10 rounded-xl w-full max-w-4xl max-h-[90vh] flex flex-col text-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center p-4 border-b border-white/10 flex-shrink-0"><h2 className="text-xl font-bold">Nueva Factura</h2><button onClick={() => setShowAddModal(false)} className="p-2 rounded-full hover:bg-white/10"><Cross2Icon /></button></div>
              <form onSubmit={handleAddInvoice} className="p-6 space-y-6 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-white/80 mb-1">Cliente *</label><select name="client_id" value={newInvoice.client_id} onChange={handleNewInvoiceChange} required className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"><option value="">Seleccionar cliente</option>{clients.map(client => (<option key={client.id} value={client.id}>{client.name} {client.company ? `(${client.company})` : ''}</option>))}</select></div>
                  <div><label className="block text-sm font-medium text-white/80 mb-1">% IVA</label><input type="number" name="tax_rate" value={newInvoice.tax_rate} onChange={handleNewInvoiceChange} step="0.01" className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"/></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-white/80 mb-1">Fecha de emisión</label><input type="date" name="issue_date" value={newInvoice.issue_date} onChange={handleNewInvoiceChange} className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"/></div>
                  <div><label className="block text-sm font-medium text-white/80 mb-1">Fecha de vencimiento</label><input type="date" name="due_date" value={newInvoice.due_date} onChange={handleNewInvoiceChange} className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"/></div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-4"><h3 className="text-lg font-semibold">Líneas de factura</h3><button type="button" onClick={addItem} className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg text-sm transition-colors"><PlusIcon className="w-4 h-4" />Añadir línea</button></div>
                  <div className="space-y-3">
                    {invoiceItems.map((item, index) => (<div key={index} className="grid grid-cols-12 gap-2 items-center">
                      <div className="col-span-6"><input type="text" placeholder="Descripción del servicio/producto" value={item.description} onChange={(e) => handleItemChange(index, 'description', e.target.value)} className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"/></div>
                      <div className="col-span-2"><input type="number" placeholder="Cant." value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} step="0.01" className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"/></div>
                      <div className="col-span-2"><input type="number" placeholder="Precio" value={item.unit_price} onChange={(e) => handleItemChange(index, 'unit_price', e.target.value)} step="0.01" className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"/></div>
                      <div className="col-span-1 text-right font-semibold">€{item.total.toFixed(2)}</div>
                      <div className="col-span-1">{invoiceItems.length > 1 && (<button type="button" onClick={() => removeItem(index)} className="text-red-400 hover:text-red-300 p-1 rounded-full hover:bg-red-500/10"><TrashIcon className="w-4 h-4" /></button>)}</div>
                    </div>))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className="block text-sm font-medium text-white/80 mb-1">Condiciones de pago</label><input type="text" name="payment_terms" value={newInvoice.payment_terms} onChange={handleNewInvoiceChange} className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"/></div>
                  <div><label className="block text-sm font-medium text-white/80 mb-1">Notas</label><textarea name="notes" value={newInvoice.notes} onChange={handleNewInvoiceChange} rows="3" className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"/></div>
                </div>
                {addError && <p className="text-red-400 text-sm">{addError}</p>}
                <div className="flex justify-end gap-3 pt-4 border-t border-white/10 mt-auto flex-shrink-0">
                  <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-lg font-semibold hover:bg-white/10 transition-colors">Cancelar</button>
                  <button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50">{isSubmitting ? 'Creando...' : 'Crear Factura'}</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Invoice Details Modal */}
      <AnimatePresence>
        {selectedInvoice && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelectedInvoice(null)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-gray-900 border border-white/10 rounded-xl w-full max-w-2xl text-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center p-4 border-b border-white/10"><h2 className="text-xl font-bold">Factura {selectedInvoice.invoice_number}</h2><button onClick={() => setSelectedInvoice(null)} className="p-2 rounded-full hover:bg-white/10"><Cross2Icon /></button></div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><h3 className="text-sm text-white/60 mb-1">Cliente</h3><p className="font-medium">{selectedInvoice.clients?.name}</p><p className="text-sm text-white/60">{selectedInvoice.clients?.company}</p></div>
                  <div><h3 className="text-sm text-white/60 mb-1">Estado</h3><span className={`inline-flex px-2 py-1 text-xs font-medium rounded border ${getStatusColor(selectedInvoice.status)}`}>{getStatusText(selectedInvoice.status)}</span></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><h3 className="text-sm text-white/60 mb-1">Fecha de emisión</h3><p>{format(new Date(selectedInvoice.issue_date), 'dd/MM/yyyy', { locale: es })}</p></div>
                  <div><h3 className="text-sm text-white/60 mb-1">Fecha de vencimiento</h3><p>{format(new Date(selectedInvoice.due_date), 'dd/MM/yyyy', { locale: es })}</p></div>
                </div>
                <div><h3 className="text-sm text-white/60 mb-1">Total</h3><p className="text-2xl font-bold text-green-400">€{parseFloat(selectedInvoice.total || 0).toFixed(2)}</p></div>
              </div>
              <div className="p-4 bg-black/20 flex justify-end gap-3">
                <button onClick={() => generatePDF(selectedInvoice)} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"><DownloadIcon />Descargar PDF</button>
                <button onClick={() => deleteInvoice(selectedInvoice.id)} className="flex items-center gap-2 text-red-400 px-4 py-2 rounded-lg font-medium hover:bg-red-500/10"><TrashIcon />Eliminar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminFacturas;
