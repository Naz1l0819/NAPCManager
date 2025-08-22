import { serverClient } from '../../../lib/supabaseServerClient';

export default async function Capital() {
  const supabase = serverClient();
  const { data: shareholders } = await supabase.from('shareholders').select('*').order('name');
  const totalShares = shareholders?.reduce((a: number, b: any) => a + b.shares, 0) || 0;
  return (
    <div>
      <h2>Capital & Shares</h2>
      <p className="muted">Equity: Because apparently money likes structure.</p>
      <h3>Shareholders</h3>
      <table className="table">
        <thead><tr><th>Name</th><th>Class</th><th>Shares</th><th>%</th></tr></thead>
        <tbody>
          {shareholders?.map((s: any) => {
            const pct = totalShares ? (s.shares / totalShares * 100).toFixed(2) : '—';
            return <tr key={s.id}><td>{s.name}</td><td>{s.class}</td><td>{s.shares}</td><td>{pct}%</td></tr>;
          })}
        </tbody>
      </table>
      <p>Total Shares: {totalShares}</p>
      <div className="notice">
        Share certificate generation & PDF export stubs live in lib/pdf.ts — wire to an API route or server action to download.
      </div>
    </div>
  );
}