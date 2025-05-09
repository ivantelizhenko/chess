import { createContext, useContext } from 'react';
import { supabase } from '../../lib/supabase';

export const SupabaseContext = createContext(supabase);
export const useSupabase = () => useContext(SupabaseContext);
