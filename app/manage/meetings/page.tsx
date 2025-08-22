export default function Meetings() {
  return (
    <div>
      <h2>Meetings & Compliance</h2>
      <p className="muted">Governance theatre. But necessary.</p>
      <ul>
        <li>Board: Quarterly (Mar, Jun, Sep, Dec)</li>
        <li>AGM: July</li>
        <li>Quorum: Board &gt;50% directors; Members ≥51% shares</li>
      </ul>
      <div className="card">
        <p>TODO: CRUD meeting entries, upload minutes, auto-generate draft, ICS export (lib/ics.ts).</p>
      </div>
      <div className="notice">
        Compliance checklist placeholder: annual return, directors’ report, accounts filing. Add scheduled tasks via cron workers or edge functions.
      </div>
    </div>
  );
}