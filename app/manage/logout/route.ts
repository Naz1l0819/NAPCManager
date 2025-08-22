import { NextResponse } from 'next/server';
import { serverClient } from '../../../lib/supabaseServerClient';

export async function POST() {
  const supabase = serverClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'));
}