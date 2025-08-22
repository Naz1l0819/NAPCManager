import { NextRequest, NextResponse } from 'next/server';
import { dividendVoucherPdf } from '../../../../lib/pdf';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const buf = dividendVoucherPdf({
    shareholder: body.shareholder,
    amountUsd: body.amountUsd,
    period: body.period,
    voucherNumber: body.voucherNumber,
    payDate: body.payDate
  });
  // convert Node Buffer to ArrayBuffer slice for BodyInit compatibility
  const uint8 = new Uint8Array(buf);
  return new NextResponse(uint8, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=dividend-voucher-${body.voucherNumber}.pdf`
    }
  });
}