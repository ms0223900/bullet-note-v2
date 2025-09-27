import { getThemeConfig } from '@/constants/themes';
import { cn } from '@/lib/utils';
import { NoteItemDisplayStyle, ParsedNoteItem, Theme } from '@/types';
import { BulletSymbol } from './bullet-symbols';

/**
 * 獲取筆記項目的顯示樣式（支援主題）
 * @param item 筆記項目
 * @param theme 當前主題
 * @returns 顯示樣式配置
 */
export function getNoteItemDisplayStyle(
  item: ParsedNoteItem,
  theme: Theme = Theme.MINIMAL
): NoteItemDisplayStyle {
  const themeConfig = getThemeConfig(theme);
  const typeStyles = themeConfig.noteItem[item.type];

  return {
    container: cn(
      'group rounded-lg transition-colors border-l-4',
      typeStyles.background,
      typeStyles.hover,
      typeStyles.border
    ),
    icon: typeStyles.icon,
    iconColor: typeStyles.iconColor,
    bgColor: typeStyles.background,
    hoverBgColor: typeStyles.hover,
    borderColor: typeStyles.border,
    text: typeStyles.text,
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

/**
 * 獲取特定主題下特定類型的樣式
 * @param theme 主題
 * @param type 筆記類型
 * @returns 該類型在該主題下的樣式
 */
export function getNoteItemTypeStyles(
  theme: Theme,
  type: ParsedNoteItem['type']
) {
  const themeConfig = getThemeConfig(theme);
  return themeConfig.noteItem[type];
}
