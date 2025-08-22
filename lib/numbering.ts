export function formatSequential(prefix: string, companyCode: string, date: Date, seq: number) {
  const year = date.getFullYear();
  return `${prefix}/${companyCode}/${year}/${seq.toString().padStart(4,'0')}`;
}