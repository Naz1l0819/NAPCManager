import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from './types';

function makeNoopBuilder() {
  const res = Promise.resolve({ data: [], error: null });
  const builder: any = {
    order: () => builder,
    limit: () => builder,
    eq: () => builder,
    filter: () => builder,
    then: res.then.bind(res),
    catch: res.catch.bind(res),
  };
  return builder;
}

function makeNoopFrom() {
  return {
    select: () => makeNoopBuilder(),
    insert: async () => ({ data: null, error: null }),
    delete: async () => ({ data: null, error: null }),
    update: async () => ({ data: null, error: null }),
    upsert: async () => ({ data: null, error: null }),
  };
}

export const serverClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    const devAuth = process.env.NEXT_PUBLIC_DEV_AUTH === 'true';
    // Return a safe no-op client to avoid crashing server renders when env is missing.
    // If NEXT_PUBLIC_DEV_AUTH=true, provide a fake authenticated user so you can
    // view protected pages during local development without Supabase.
    return {
      from: (_: string) => makeNoopFrom(),
      auth: {
        getUser: async () => ({ data: { user: devAuth ? { id: 'dev-user', email: 'dev@local' } : null } }),
        signOut: async () => ({ error: null }),
      },
    } as any;
  }

  const cookieStore = cookies();
  const realClient = createServerClient<Database>(
    url,
    key,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        }
      }
    }
  );

  // If dev auth is enabled, override getUser to return a fake user so server
  // rendering of protected pages works without an actual session cookie.
  if (process.env.NEXT_PUBLIC_DEV_AUTH === 'true') {
    return {
      ...realClient,
      auth: {
        ...((realClient as any).auth || {}),
        getUser: async () => ({ data: { user: { id: 'dev-user', email: 'dev@local' } } })
      }
    } as any;
  }

  return realClient;
};
