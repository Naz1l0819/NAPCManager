import PDFDocument from 'pdfkit';
import { Readable } from 'stream';

interface BasicDocOptions {
  title: string;
  subtitle?: string;
  body?: string;
  footerNote?: string;
  meta?: Record<string, string | number>;
}

export function generateBasicPdf(opts: BasicDocOptions): Buffer {
  const doc = new PDFDocument({ margin: 50 });
  const chunks: Buffer[] = [];
  doc.on('data', c => chunks.push(c));
  doc.fontSize(22).text(opts.title, { underline: true });
  if (opts.subtitle) doc.moveDown(0.3).fontSize(14).fillColor('#666').text(opts.subtitle).fillColor('#000');
  doc.moveDown();
  if (opts.meta) {
    Object.entries(opts.meta).forEach(([k, v]) => {
      doc.fontSize(10).fillColor('#222').text(`${k}: ${v}`);
    });
    doc.moveDown();
  }
  if (opts.body) {
    doc.fontSize(12).fillColor('#000').text(opts.body);
  }
  if (opts.footerNote) {
    doc.moveDown(2);
    doc.fontSize(9).fillColor('#444').text(opts.footerNote, { align: 'center' });
  }
  doc.end();
  return Buffer.concat(chunks);
}

// Specialized templates
export function shareCertificatePdf(params: {
  shareholder: string;
  shares: number;
  className: string;
  issueDate: string;
  certNumber: string;
}): Buffer {
  return generateBasicPdf({
    title: 'Share Certificate',
    subtitle: 'Because paper still impresses some people.',
    meta: {
      Shareholder: params.shareholder,
      Shares: params.shares,
      Class: params.className,
      'Issue Date': params.issueDate,
      'Certificate #': params.certNumber
    },
    body: `This certifies that ${params.shareholder} owns ${params.shares} fully paid ${params.className} shares in Not a Parent Company.`,
    footerNote: 'Not a Parent Company — This document proves ownership. Frame it, or don’t.'
  });
}

export function dividendVoucherPdf(params: {
  shareholder: string;
  amountUsd: number;
  period: string;
  voucherNumber: string;
  payDate: string;
}): Buffer {
  return generateBasicPdf({
    title: 'Dividend Voucher',
    meta: {
      Shareholder: params.shareholder,
      AmountUSD: params.amountUsd.toFixed(2),
      Period: params.period,
      'Voucher #': params.voucherNumber,
      'Payment Date': params.payDate
    },
    body: `Dividend declared for period ${params.period}. Amount: USD ${params.amountUsd.toFixed(2)} to ${params.shareholder}.`,
    footerNote: 'This is a dividend voucher. Spend wisely. Or recklessly.'
  });
}