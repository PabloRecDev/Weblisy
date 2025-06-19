import React from 'react';
import { Helmet } from 'react-helmet-async';
import AdminLayout from '../../components/AdminLayout';
import AdminPresupuestos from '../../components/AdminPresupuestos';

export default function AdminPresupuestosPage() {
  return (
    <>
      <Helmet>
        <title>Presupuestos - WebLisy CRM</title>
        <meta name="description" content="Gestión de presupuestos en el CRM de WebLisy" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AdminLayout>
        <AdminPresupuestos />
      </AdminLayout>
    </>
  );
} 