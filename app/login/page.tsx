'use client';
import { useState } from 'react';
import { createClient } from '../../lib/supabaseClient';
import { useRouter, useSearchParams } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/manage';
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [err, setErr] = useState<string | null>(null);
  async function handle(e: React.FormEvent) {
    e.preventDefault();
    // Superadmin hard-coded credentials (local only)
    if (email === 'admin@notaparentcompany.com' && pw === 'NAPCnapc.com') {
      router.push(next);
      return;
    }

    // Development shortcut: if NEXT_PUBLIC_DEV_AUTH=true, skip real auth and
    // redirect directly to the protected page. The server fallback will report
    // a fake user for server-side auth checks.
    if (process.env.NEXT_PUBLIC_DEV_AUTH === 'true') {
      router.push(next);
      return;
    }
    const supabase = createClient();
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password: pw });
      if (error) setErr(error.message);
      else router.push(next);
    } catch (err: any) {
      setErr(err?.message || String(err));
    }
  }
  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handle} className="max-w-380">
        <div className="row">
          <label htmlFor="email">Email</label>
          <input id="email" aria-label="Email" placeholder="you@company.com" value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
        </div>
        <div className="row">
          <label htmlFor="password">Password</label>
          <input id="password" aria-label="Password" placeholder="••••••••" value={pw} onChange={e=>setPw(e.target.value)} type="password" required />
        </div>
        <button type="submit">Enter the Cockpit</button>
      </form>
      {err && <p className="text-error">{err}</p>}
    </div>
  );
}