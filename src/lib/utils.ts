import type { NoteCategory, ParsedNoteItem } from '@/types';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateTime(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Grouping utilities

export interface GroupedByDayEntry {
  item: ParsedNoteItem;
  categoryId: string;
}

export interface GroupedByDay {
  key: string; // YYYY-MM-DD
  date: Date; // local date at midnight
  entries: GroupedByDayEntry[];
}

export function groupSavedNotesByLocalDay(savedNotes: NoteCategory[]): GroupedByDay[] {
  const map = new Map<string, { date: Date; entries: GroupedByDayEntry[] }>();

  for (const category of savedNotes) {
    for (const item of category.items) {
      const created = item.createdAt;
      const year = created.getFullYear();
      const month = String(created.getMonth() + 1).padStart(2, '0');
      const day = String(created.getDate()).padStart(2, '0');
      const key = `${year}-${month}-${day}`;

      const existing = map.get(key);
      if (!existing) {
        map.set(key, {
          date: new Date(year, created.getMonth(), created.getDate()),
          entries: [{ item, categoryId: category.id }],
        });
      } else {
        existing.entries.push({ item, categoryId: category.id });
      }
    }
  }

  const groups: GroupedByDay[] = Array.from(map.entries()).map(([key, value]) => ({
    key,
    date: value.date,
    entries: value.entries,
  }));

  // sort by date desc, and within group by createdAt desc
  groups.sort((a, b) => b.date.getTime() - a.date.getTime());
  for (const group of groups) {
    group.entries.sort(
      (a, b) => b.item.createdAt.getTime() - a.item.createdAt.getTime()
    );
  }

  return groups;
}
