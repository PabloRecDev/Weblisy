import React from 'react';
import { Helmet } from 'react-helmet-async';
import AdminProyectos from '../../components/AdminProyectos';

export default function AdminProyectosPage() {
  return (
    <>
      <Helmet>
        <title>Proyectos - WebLisy CRM</title>
        <meta name="description" content="Gestión de proyectos en el CRM de WebLisy" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AdminProyectos />
    </>
  );
} 