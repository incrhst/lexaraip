import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import Overview from './components/Overview';
import ApplicationManagement from './components/ApplicationManagement';
import UserManagement from './components/UserManagement';
import { useAdminAuth } from './hooks/useAdminAuth';

export default function AdminDashboard() {
  const { isAdmin, loading } = useAdminAuth();

  if (loading) {
    return <div className="animate-pulse">Checking permissions...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Overview />} />
        <Route path="applications" element={<ApplicationManagement />} />
        <Route path="users" element={<UserManagement />} />
      </Route>
    </Routes>
  );
}