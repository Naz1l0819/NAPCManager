import { ReactNode } from 'react';
import { requireAuth } from '../lib/authHelpers';

export default async function Protected({ children }: { children: ReactNode }) {
  await requireAuth();
  return <>{children}</>;
}