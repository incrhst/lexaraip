import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, Users, FileText } from 'lucide-react';

const navigation = [
  { name: 'Overview', to: '/admin', icon: LayoutDashboard },
  { name: 'Applications', to: '/admin/applications', icon: FileText },
  { name: 'Users', to: '/admin/users', icon: Users },
];

export default function AdminLayout() {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-800 min-h-screen p-4">
        <nav className="space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              end={item.to === '/admin'}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm rounded-md ${
                  isActive
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`
              }
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}