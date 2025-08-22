import { createEvents } from 'ics';

export function createIcsEvents(events: {
  title: string;
  start: Date;
  durationMinutes?: number;
  description?: string;
}[]) {
  const mapped = events.map(e => {
    const d = e.start;
    return {
      title: e.title,
      description: e.description,
    start: [d.getFullYear(), d.getMonth() + 1, d.getDate(), d.getHours(), d.getMinutes()] as [number, number, number, number, number],
      duration: { minutes: e.durationMinutes || 60 }
    };
  });
  const { error, value } = createEvents(mapped);
  if (error) throw error;
  return value;
}