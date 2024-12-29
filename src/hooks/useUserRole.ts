import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export function useUserRole() {
  const { user } = useAuth();
  const [role, setRole] = useState<'admin' | 'applicant' | 'public'>('public');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!user) {
      setRole('public');
      setLoading(false);
      return;
    }

    async function fetchUserRole() {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setRole(data.role);
      } catch (err) {
        console.error('Error fetching user role:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserRole();
  }, [user]);

  return { role, loading, error };
}