// Minimal TypeScript hints (expand based on generated supabase types if using codegen)
export type UUID = string;

export interface Budget {
  id: UUID;
  month: string;
  category: string;
  description: string | null;
  amount_usd: number;
  created_at: string;
}

export interface Quote {
  id: UUID;
  number: string;
  client_name: string;
  status: string;
  created_at: string;
}

export interface Invoice {
  id: UUID;
  number: string;
  client_name: string;
  status: string;
  created_at: string;
}

export interface Shareholder {
  id: UUID;
  name: string;
  shares: number;
  class: string;
  email?: string | null;
}

export type Database = any; // Replace with supabase codegen output if desired.