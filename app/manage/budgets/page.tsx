import { serverClient } from '../../../lib/supabaseServerClient';
import { createBudget, deleteBudget } from './actions';

export default async function BudgetsPage() {
  const supabase = serverClient();
  const { data } = await supabase.from('budgets').select('*').order('created_at', { ascending: false });

  return (
    <div>
      <h2>Budgets</h2>
      <p className="muted">Allocate, overspend, repeat.</p>
  <form action={createBudget} className="card max-w-700">
  <h3 className="mt-0">Add Budget Line</h3>
        <div className="row">
      <label htmlFor="month">Month</label>
      <input id="month" name="month" placeholder="2025-09" required />
        </div>
        <div className="row">
      <label htmlFor="category">Category</label>
      <input id="category" name="category" placeholder="Marketing" required />
        </div>
        <div className="row">
      <label htmlFor="description">Description</label>
      <input id="description" name="description" placeholder="Optional snark" />
        </div>
        <div className="row">
      <label htmlFor="amount">Amount USD</label>
      <input id="amount" name="amount" type="number" step="0.01" placeholder="0.00" required />
        </div>
        <button type="submit">Add Budget</button>
      </form>
      <h3>Existing</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Month</th><th>Category</th><th>Desc</th><th>Amount</th><th></th>
          </tr>
        </thead>
        <tbody>
          {data?.map((b: any) => (
            <tr key={b.id}>
              <td>{b.month}</td>
              <td>{b.category}</td>
              <td>{b.description}</td>
              <td>${b.amount_usd.toFixed(2)}</td>
              <td>
                <form action={async function deleteAction(_fd: FormData) {
                  'use server';
                  await deleteBudget(b.id);
                }}>
                  <button className="danger-btn">✕</button>
                </form>
              </td>
            </tr>
          )) || null}
        </tbody>
      </table>
    </div>
  );
}