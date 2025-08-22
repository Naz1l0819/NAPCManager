import { serverClient } from '../../lib/supabaseServerClient';

export default async function ManageHome() {
  const supabase = serverClient();
  const [{ data: budgets }, { data: quotes }, { data: invoices }] = await Promise.all([
    supabase.from('budgets').select('id,amount_usd').limit(5),
    supabase.from('quotes').select('id'),
    supabase.from('invoices').select('id,status')
  ]);
  const invoicePaid = invoices?.filter((i: any) => i.status === 'paid').length || 0;
  return (
    <div>
      <h2>At a Glance</h2>
      <div className="grid cols-3">
          <div className="card">
          <strong>Budgets</strong>
          <div className="fs-2">{budgets?.length ?? 0}</div>
          <p className="muted">Recent sample loaded. Add more for extra spreadsheets vibes.</p>
        </div>
        <div className="card">
          <strong>Quotes</strong>
          <div className="fs-2">{quotes?.length ?? 0}</div>
          <p className="muted">Proposals waiting to convert (someday).</p>
        </div>
        <div className="card">
          <strong>Invoices Paid</strong>
          <div className="fs-2">{invoicePaid}</div>
          <p className="muted">Cash. The oxygen of sarcasm.</p>
        </div>
      </div>
    </div>
  );
}