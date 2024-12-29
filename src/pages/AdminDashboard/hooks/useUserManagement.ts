import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { User, UserFilterOptions } from '../types';

const DEFAULT_FILTERS: UserFilterOptions = {
  role: '',
  dateRange: '30',
  search: '',
};

export function useUserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [filters, setFilters] = useState<UserFilterOptions>(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        let query = supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });

        if (filters.role) {
          query = query.eq('role', filters.role);
        }

        if (filters.search) {
          query = query.or(
            `full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`
          );
        }

        if (filters.dateRange !== 'all') {
          const daysAgo = new Date();
          daysAgo.setDate(daysAgo.getDate() - parseInt(filters.dateRange));
          query = query.gte('created_at', daysAgo.toISOString());
        }

        const { data, error } = await query;

        if (error) throw error;
        setUsers(data || []);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, [filters]);

  const updateUserRole = async (userId: string, role: User['role']) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', userId);

      if (error) throw error;

      // Refresh the users list
      setFilters({ ...filters });
    } catch (error) {
      console.error('Error updating user role:', error);
      throw error;
    }
  };

  return {
    users,
    filters,
    setFilters,
    loading,
    updateUserRole,
  };
}