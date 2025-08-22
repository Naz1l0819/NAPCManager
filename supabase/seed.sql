-- Seed Data
insert into share_classes (name, par_value_mvr) values ('Ordinary A', 1) on conflict do nothing;

insert into shareholders (name, class, shares, email)
values
  ('Alya Hussain', 'Ordinary A', 500, 'alya@example.com'),
  ('Mohamed Vishah Musthafa', 'Ordinary A', 500, 'vishah@example.com')
on conflict do nothing;

insert into budgets (month, category, description, amount_usd)
values
 ('2025-08','Ops','Servers & hosting', 300),
 ('2025-08','Marketing','Swag we might regret', 150)
on conflict do nothing;

insert into portfolio_entries (title, summary, status)
values ('Placeholder Project','A groundbreaking example of absence.','draft')
on conflict do nothing;

-- Admin user (You must create the auth user manually via Supabase dashboard or API)
-- After creating the user, insert profile:
-- insert into profiles (id, role) values ('<AUTH_USER_UUID>', 'admin');