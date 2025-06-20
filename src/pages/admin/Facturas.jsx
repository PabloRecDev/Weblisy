import React from 'react';
import { Helmet } from 'react-helmet-async';
import AdminFacturas from '../../components/AdminFacturas';

export default function AdminFacturasPage() {
  return (
    <>
      <Helmet>
        <title>Facturas - WebLisy CRM</title>
        <meta name="description" content="Gestión de facturas en el CRM de WebLisy" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AdminFacturas />
    </>
  );
} 