import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import ApplicationList from './components/ApplicationList';
import DashboardStats from './components/DashboardStats';
import RecentActivity from './components/RecentActivity';

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your intellectual property applications
        </p>
      </header>

      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ApplicationList />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}