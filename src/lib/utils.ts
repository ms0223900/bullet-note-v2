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

export interface GroupedByDayNotes {
  key: string; // YYYY-MM-DD
  date: Date; // local date at midnight
  entries: GroupedByDayEntry[];
}

// Local helpers for single-responsibility and testability
type DayBucket = { date: Date; entries: GroupedByDayEntry[] };

function getLocalDayKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function startOfLocalDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function groupSavedNotesByLocalDay(savedNotes: NoteCategory[]): GroupedByDayNotes[] {
  const dayKeyToBucket = new Map<string, DayBucket>();

  for (const category of savedNotes) {
    for (const item of category.items) {
      const createdAt = item.createdAt;
      const dayKey = getLocalDayKey(createdAt);

      const existingBucket = dayKeyToBucket.get(dayKey);
      if (!existingBucket) {
        dayKeyToBucket.set(dayKey, {
          date: startOfLocalDay(createdAt),
          entries: [{ item, categoryId: category.id }],
        });
      } else {
        existingBucket.entries.push({ item, categoryId: category.id });
      }
    }
  }

  // Build groups with stable, explicit sorting without mutating source arrays
  const groupsUnsorted: GroupedByDayNotes[] = Array.from(dayKeyToBucket.entries()).map(
    ([key, bucket]) => ({
      key,
      date: bucket.date,
      entries: bucket.entries
        .slice()
        .sort((a, b) => b.item.createdAt.getTime() - a.item.createdAt.getTime()),
    })
  );

  return groupsUnsorted
    .slice()
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}
