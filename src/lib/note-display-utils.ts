import { cn } from '@/lib/utils';
import { NoteItemDisplayStyle, ParsedNoteItem } from '@/types';
import { BulletSymbol } from './bullet-symbols';

/**
 * 獲取筆記項目的顯示樣式
 * @param item 筆記項目
 * @returns 顯示樣式配置
 */
export function getNoteItemDisplayStyle(
  item: ParsedNoteItem
): NoteItemDisplayStyle {
  let style: Omit<NoteItemDisplayStyle, 'container'> = {
    icon: '•',
    iconColor: 'text-gray-600',
    bgColor: 'bg-gray-50',
    hoverBgColor: 'hover:bg-gray-100',
    borderColor: 'border-gray-200',
  };
  switch (item.type) {
    case 'task':
      style = {
        icon: '✓',
        iconColor: 'text-green-600',
        bgColor: 'bg-green-50',
        hoverBgColor: 'hover:bg-green-100',
        borderColor: 'border-green-200',
      };
      break;
    case 'bullet':
      style = {
        icon: '○',
        iconColor: 'text-blue-600',
        bgColor: 'bg-blue-50',
        hoverBgColor: 'hover:bg-blue-100',
        borderColor: 'border-blue-200',
      };
      break;
    case 'note':
    default:
      break;
  }

  return {
    ...style,
    container: cn(
      'group rounded-lg transition-colors border-l-4',
      style.bgColor,
      style.hoverBgColor,
      style.borderColor
    ),
  };
}

/**
 * 獲取筆記項目的類型標籤
 * @param item 筆記項目
 * @returns 類型標籤
 */
export function getNoteItemTypeLabel(item: ParsedNoteItem): string {
  switch (item.type) {
    case 'task':
      return '任務';
    case 'bullet':
      return '事件';
    case 'note':
    default:
      return '筆記';
  }
}

/**
 * 獲取筆記項目的符號
 * @param item 筆記項目
 * @returns 對應的符號
 */
export function getNoteItemSymbol(item: ParsedNoteItem): string {
  switch (item.type) {
    case 'task':
      return BulletSymbol.Task;
    case 'bullet':
      return BulletSymbol.Event;
    case 'note':
    default:
      return BulletSymbol.Note;
  }
}
