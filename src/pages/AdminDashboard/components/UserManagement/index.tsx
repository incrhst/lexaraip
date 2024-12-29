import React from 'react';
import UserFilters from './UserFilters';
import UserTable from './UserTable';
import { useUserManagement } from '../../hooks/useUserManagement';

export default function UserManagement() {
  const {
    users,
    filters,
    setFilters,
    loading,
    updateUserRole,
  } = useUserManagement();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage user roles and permissions
        </p>
      </header>

      <UserFilters filters={filters} onFilterChange={setFilters} />
      
      <UserTable
        users={users}
        loading={loading}
        onUpdateRole={updateUserRole}
      />
    </div>
  );
}