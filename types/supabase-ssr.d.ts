declare module '@supabase/ssr' {
  import { SupabaseClient } from '@supabase/supabase-js';

  export function createBrowserClient<T = any>(url: string, key: string): SupabaseClient<T>;
  export function createServerClient<T = any>(url: string, key: string, opts?: any): SupabaseClient<T>;
}
