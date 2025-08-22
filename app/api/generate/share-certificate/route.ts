import { NextRequest, NextResponse } from 'next/server';
import { shareCertificatePdf } from '../../../../lib/pdf';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const buf = shareCertificatePdf({
    shareholder: body.shareholder,
    shares: body.shares,
    className: body.className,
    issueDate: body.issueDate,
    certNumber: body.certNumber
  });
  const uint8 = new Uint8Array(buf);
  return new NextResponse(uint8, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=share-certificate-${body.certNumber}.pdf`
    }
  });
}