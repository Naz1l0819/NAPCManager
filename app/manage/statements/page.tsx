import { computeCorporateTax } from '../../../lib/tax';

export default function Statements() {
  const sampleProfit = 800000; // MVR (example)
  const tax = computeCorporateTax(sampleProfit);
  return (
    <div>
      <h2>Financial Statements</h2>
      <p className="muted">Balance Sheet, P&amp;L, Tax computations. Currently decorative.</p>
      <div className="card">
        <h3 style={{marginTop:0}}>Sample Tax Computation</h3>
        <ul>
          <li>Profit (MVR): {tax.profitMvr.toLocaleString()}</li>
            <li>Taxable Excess: {tax.taxableExcess.toLocaleString()}</li>
          <li>Tax: {tax.tax.toLocaleString()}</li>
          <li>Effective Rate: {(tax.effectiveRate * 100).toFixed(2)}%</li>
        </ul>
        <p className="muted">Replace with real aggregated ledger once implemented.</p>
      </div>
    </div>
  );
}