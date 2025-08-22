import { NextResponse } from 'next/server';
import { createIcsEvents } from '../../../../lib/ics';

export async function GET() {
  const year = new Date().getFullYear();
  const events = [
    { title: 'Board Meeting (Q1)', start: new Date(year, 2, 15, 10, 0) },
    { title: 'Board Meeting (Q2)', start: new Date(year, 5, 15, 10, 0) },
    { title: 'Board Meeting (Q3)', start: new Date(year, 8, 15, 10, 0) },
    { title: 'Board Meeting (Q4)', start: new Date(year, 11, 15, 10, 0) },
    { title: 'Annual General Meeting', start: new Date(year, 6, 20, 10, 0) }
  ];
  const ics = createIcsEvents(events);
  return new NextResponse(ics, {
    headers: {
      'Content-Type': 'text/calendar',
      'Content-Disposition': 'attachment; filename=compliance.ics'
    }
  });
}