import React from 'react';
import { Helmet } from 'react-helmet-async';
import AdminTareas from '../../components/AdminTareas';

export default function AdminTareasPage() {
  return (
    <>
      <Helmet>
        <title>Tareas - WebLisy CRM</title>
        <meta name="description" content="Gestión de tareas en el CRM de WebLisy" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AdminTareas />
    </>
  );
} 