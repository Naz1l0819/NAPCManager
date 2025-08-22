# Not a Parent Company

Because apparently you need a README to look “legit.”

## Stack
- Next.js (App Router, TS)
- Supabase (Postgres, Auth, Storage)
- Three.js flair for the hero
- PDFKit + XLSX (SheetJS)

## Quick Start
1. Copy .env.local.example -> .env.local
2. Fill Supabase credentials.
3. Run: npm install
4. Import supabase/schema.sql then supabase/seed.sql
5. Start dev: npm run dev
6. Login manage area via footer link: admin@notaparentcompany.com / NAPCnapc

Security: This is a scaffold. Harden RLS, limit service key usage to server only, implement secret manager, add rate limiting, logging, etc.

## Scripts
- dev / build / start / lint / typecheck

## Directories
- app/ marketing + dashboard
- components/ shared UI
- lib/ utilities (supabase client, tax, exchange, pdf, excel)
- supabase/ schema + seeds
- public/ assets

## License
Internal proprietary (feel free to adjust).

Have fun. Or don’t.