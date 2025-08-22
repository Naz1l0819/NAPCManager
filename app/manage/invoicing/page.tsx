export default function Invoicing() {
  return (
    <div>
      <h2>Invoicing / Quotes / Receipts</h2>
      <p className="muted">Numbers that hopefully turn into bank balance changes.</p>
      <div className="card">
        <p>TODO: List quotes & invoices, convert quote → invoice, mark invoice paid → receipt PDF, apply 8% GST optional.</p>
        <p>Numbering format implemented in lib/numbering.ts (call it when inserting).</p>
      </div>
    </div>
  );
}