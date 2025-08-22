import { serverClient } from './supabaseServerClient';
import { redirect } from 'next/navigation';

export async function requireAuth() {
  const supabase = serverClient();
  const { data } = await supabase.auth.getUser();
  const user = (data as any).user;
  if (!user) {
    const base = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';
    const url = new URL('/login', base);
    url.searchParams.set('next', '/manage');
    redirect(url.toString());
  }
  return user;
}