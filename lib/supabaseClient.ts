import { createBrowserClient } from '@supabase/ssr';
import { Database } from './types';

export const createClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Create a .env.local with the values from Supabase (see .env.local.example).');
  }
  return createBrowserClient<Database>(url, key);
};