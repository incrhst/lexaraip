import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Briefcase, Search, LogOut, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useUserRole } from '../hooks/useUserRole';
import UserRoleIndicator from './UserRoleIndicator';
import Button from './Button';

export default function Layout() {
  const navigate = useNavigate();
  const { role, loading } = useUserRole();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-background-alt shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex items-center">
                <Briefcase className="h-8 w-8 text-primary" />
                <span className="ml-2 text-xl font-semibold text-primary">Lexara IP</span>
              </Link>
              
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-primary"
                >
                  Dashboard
                </Link>
                <Link
                  to="/gazette"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-primary-light hover:text-primary"
                >
                  Gazette
                </Link>
                <Link
                  to="/applications/new"
                  className="inline-flex items-center px-1 pt-1 text-sm font-medium text-primary-light hover:text-primary"
                >
                  New Application
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {!loading && <UserRoleIndicator role={role} />}
              
              <button
                type="button"
                className="p-2 rounded-full text-primary hover:text-primary-light"
              >
                <Search className="h-6 w-6" />
              </button>

              <div className="relative flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="p-2 rounded-full text-primary hover:text-primary-light"
                >
                  <User className="h-6 w-6" />
                </Link>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}