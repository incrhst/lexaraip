import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useUserRole } from './useUserRole';

export function useDemoMode() {
  const { role } = useUserRole();
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function checkDemoMode() {
      try {
        const { data, error } = await supabase
          .from('system_settings')
          .select('value')
          .eq('key', 'demo_mode')
          .single();

        if (error) throw error;
        setIsDemoMode(data?.value?.enabled || false);
      } catch (err) {
        console.error('Error checking demo mode:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    checkDemoMode();
  }, []);

  const toggleDemoMode = async () => {
    if (role !== 'admin') {
      throw new Error('Only administrators can toggle demo mode');
    }

    try {
      setLoading(true);
      const { error } = await supabase.rpc('toggle_demo_mode', {
        enable: !isDemoMode,
      });

      if (error) throw error;
      setIsDemoMode(!isDemoMode);
    } catch (err) {
      console.error('Error toggling demo mode:', err);
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    isDemoMode,
    loading,
    error,
    toggleDemoMode,
  };
}