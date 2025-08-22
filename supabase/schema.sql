-- SCHEMA for Not a Parent Company
-- Basic tables. Adjust RLS policies for production.

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'user',
  created_at timestamptz default now()
);

create table if not exists portfolio_entries (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text,
  status text default 'draft',
  created_at timestamptz default now()
);

create table if not exists budgets (
  id uuid primary key default gen_random_uuid(),
  month text not null,
  category text not null,
  description text,
  amount_usd numeric not null,
  created_at timestamptz default now()
);

create table if not exists income (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  description text,
  amount_usd numeric not null,
  created_at timestamptz default now()
);

create table if not exists expenses (
  id uuid primary key default gen_random_uuid(),
  date date not null,
  category text,
  description text,
  amount_usd numeric not null,
  created_at timestamptz default now()
);

create table if not exists assets (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,
  value_usd numeric not null,
  created_at timestamptz default now()
);

create table if not exists shareholders (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  class text not null,
  shares integer not null,
  email text,
  created_at timestamptz default now()
);

create table if not exists capital_contributions (
  id uuid primary key default gen_random_uuid(),
  contributor text not null,
  amount_usd numeric not null,
  type text not null,
  date date not null,
  created_at timestamptz default now()
);

create table if not exists share_classes (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  par_value_mvr numeric not null default 1
);

create table if not exists dividends (
  id uuid primary key default gen_random_uuid(),
  type text not null, -- interim/final
  period text not null,
  declared_date date not null,
  payment_date date,
  total_amount_usd numeric not null,
  created_at timestamptz default now()
);

create table if not exists dividend_allocations (
  id uuid primary key default gen_random_uuid(),
  dividend_id uuid references dividends(id) on delete cascade,
  shareholder_id uuid references shareholders(id) on delete cascade,
  amount_usd numeric not null
);

create table if not exists meetings (
  id uuid primary key default gen_random_uuid(),
  meeting_type text not null, -- board/agm/egm
  scheduled_at timestamptz not null,
  status text default 'scheduled',
  quorum_met boolean,
  notes text,
  created_at timestamptz default now()
);

create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  meeting_id uuid references meetings(id) on delete set null,
  doc_type text not null, -- minutes/resolution/certificate/etc
  filename text,
  storage_path text,
  created_at timestamptz default now()
);

create table if not exists quotes (
  id uuid primary key default gen_random_uuid(),
  number text not null unique,
  client_name text not null,
  status text not null default 'draft', -- draft/sent/accepted/converted
  created_at timestamptz default now()
);

create table if not exists quote_items (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid references quotes(id) on delete cascade,
  description text,
  qty numeric default 1,
  unit_price numeric default 0
);

create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  number text not null unique,
  client_name text not null,
  status text not null default 'draft', -- draft/sent/paid/void
  gst_applied boolean default false,
  created_at timestamptz default now()
);

create table if not exists invoice_items (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid references invoices(id) on delete cascade,
  description text,
  qty numeric default 1,
  unit_price numeric default 0
);

create table if not exists receipts (
  id uuid primary key default gen_random_uuid(),
  invoice_id uuid references invoices(id) on delete cascade,
  amount_usd numeric not null,
  issued_at timestamptz default now()
);

create table if not exists staff (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  salary_usd numeric not null,
  start_date date not null,
  staff_type text,
  email text,
  created_at timestamptz default now()
);

create table if not exists compliance_tasks (
  id uuid primary key default gen_random_uuid(),
  code text not null,
  title text not null,
  due_date date,
  status text default 'pending',
  created_at timestamptz default now()
);

create table if not exists settings_secrets (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value_encrypted text not null,
  created_at timestamptz default now()
);

-- Basic RLS enabling
alter table profiles enable row level security;
alter table budgets enable row level security;
-- (Enable for others similarly...)

-- Simple permissive policies (tighten for production)
create policy "allow all profiles" on profiles for select using (true);
create policy "allow all budgets" on budgets for all using (true) with check (true);