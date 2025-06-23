import React from 'react';
import AdminDashboard from '../../components/AdminDashboard';
import { Helmet } from 'react-helmet-async';

export default function DashboardPage() {
  return (
    <>
      <Helmet>
        <title>Dashboard | Weblisy CRM</title>
      </Helmet>
      <AdminDashboard />
    </>
  );
}
