import React from 'react';
import { Helmet } from 'react-helmet-async';
import AdminLayout from '../../components/AdminLayout';
import AdminMeetings from '../../components/AdminMeetings';

export default function AdminMeetingsPage() {
  return (
    <>
      <Helmet>
        <title>Reuniones - WebLisy CRM</title>
        <meta name="description" content="Gestión de reuniones en el CRM de WebLisy" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <AdminLayout>
        <AdminMeetings />
      </AdminLayout>
    </>
  );
} 