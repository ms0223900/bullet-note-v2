import { ParsedNoteItem } from '@/types';
import { BulletSymbol, extractContentFromLine, getSymbolType, isValidBulletLine } from './bullet-symbols';
import { generateNoteItemId } from './id-generator';

/**
 * 將符號類型轉換為筆記項目類型
 * @param symbolType 符號類型
 * @returns 筆記項目類型
 */
function symbolTypeToItemType(symbolType: BulletSymbol): 'bullet' | 'task' | 'note' {
  switch (symbolType) {
    case BulletSymbol.Task:
      return 'task';
    case BulletSymbol.Event:
      return 'bullet'; // 事件使用 bullet 類型
    case BulletSymbol.Note:
      return 'note';
    default:
      return 'note';
  }
}

/**
 * 解析筆記內容，將以符號開頭的行分類為筆記項目
 * @param content 原始筆記內容
 * @returns 解析後的筆記分類
 */
export function parseNoteContent(content: string): ParsedNoteItem[] {
  const lines = content.split('\n');
  const items: ParsedNoteItem[] = [];

  lines.forEach(line => {
    if (isValidBulletLine(line)) {
      const noteContent = extractContentFromLine(line);
      const symbolType = getSymbolType(line);

      if (noteContent && symbolType) {
        const item: ParsedNoteItem = {
          id: generateNoteItemId(),
          content: noteContent,
          type: symbolTypeToItemType(symbolType),
          createdAt: new Date(),
        };

        items.push(item);
      }
    }
  });

  return items;
}

/**
 * 從內容中提取所有筆記項目
 * @param content 筆記內容
 * @returns 筆記項目列表
 */
export function extractNoteItems(content: string): ParsedNoteItem[] {
  return parseNoteContent(content);
}
