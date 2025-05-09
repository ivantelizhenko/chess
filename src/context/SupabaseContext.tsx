import { ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { SupabaseContext } from '../features/hooks/useSupabase';

function SupabaseProvider({ children }: { children: ReactNode }) {
  return (
    <SupabaseContext.Provider value={supabase}>
      {children}
    </SupabaseContext.Provider>
  );
}

export default SupabaseProvider;
