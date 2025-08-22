export async function fetchUsdToMvrRate(): Promise<number> {
  try {
    const res = await fetch((process.env.EXCHANGE_RATE_API || 'https://api.exchangerate.host/latest') + '?base=USD&symbols=MVR', { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Bad response');
    const data = await res.json();
    const rate = data?.rates?.MVR;
    if (typeof rate !== 'number') throw new Error('Rate missing');
    return rate;
  } catch (e) {
    console.warn('Exchange rate fallback 15.42 (hard-coded).', e);
    return 15.42;
  }
}