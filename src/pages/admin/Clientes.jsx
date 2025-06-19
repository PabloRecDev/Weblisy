import React from 'react';
import { Helmet } from 'react-helmet-async';
import AdminLayout from '../../components/AdminLayout';
import AdminClientes from '../../components/AdminClientes';

export default function AdminClientesPage() {
  return (
    <>
      <Helmet>
        <title>Clientes - WebLisy CRM</title>
        <meta name="description" content="Gestión de clientes en el CRM de WebLisy" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AdminLayout>
        <AdminClientes />
      </AdminLayout>
    </>
  );
} 