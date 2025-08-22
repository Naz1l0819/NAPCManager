// Maldives: 0% up to MVR 500,000; 15% on excess.
export interface TaxComputation {
  profitMvr: number;
  taxableExcess: number;
  tax: number;
  effectiveRate: number;
}
export function computeCorporateTax(profitMvr: number): TaxComputation {
  const threshold = 500_000;
  const taxableExcess = Math.max(0, profitMvr - threshold);
  const tax = taxableExcess * 0.15;
  return {
    profitMvr,
    taxableExcess,
    tax,
    effectiveRate: profitMvr > 0 ? tax / profitMvr : 0
  };
}