export default function Settings() {
  return (
    <div>
      <h2>Settings</h2>
      <p className="muted">Admin zone for adjusting share classes, API keys, compliance config.</p>
      <div className="card">
        <p>TODO: Encrypted storage of API keys in special table (RLS: only admin role). Use Supabase encryption or KMS.</p>
      </div>
    </div>
  );
}