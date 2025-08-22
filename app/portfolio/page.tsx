import { serverClient } from '../../lib/supabaseServerClient';

export default async function Portfolio() {
  const supabase = serverClient();
  const { data, error } = await supabase.from('portfolio_entries').select('*').order('created_at', { ascending: false });
  return (
    <div className="container">
      <h1>Portfolio</h1>
      {!data || data.length === 0 ? (
        <p>We’d show off here, but apparently we’re still “building a pipeline.” Check back when we feel like bragging.</p>
      ) : (
        <div className="grid cols-3">
          {data.map((item: any) => (
            <div key={item.id} className="card">
              <h3 style={{marginTop:0}}>{item.title}</h3>
              <p className="muted" style={{fontSize:'0.75rem'}}>{item.status}</p>
              <p>{item.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}