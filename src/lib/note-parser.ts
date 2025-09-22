import { NoteCategory, ParsedNoteItem } from '@/types';
import { extractContentFromLine, isValidBulletLine } from './bullet-symbols';
import { generateCategoryId, generateNoteItemId } from './id-generator';

/**
 * 解析筆記內容，將以符號開頭的行分類為筆記項目
 * @param content 原始筆記內容
 * @returns 解析後的筆記分類
 */
export function parseNoteContent(content: string): NoteCategory {
    const lines = content.split('\n');
    const items: ParsedNoteItem[] = [];

    lines.forEach(line => {
        if (isValidBulletLine(line)) {
            const noteContent = extractContentFromLine(line);

            if (noteContent) {
                const item: ParsedNoteItem = {
                    id: generateNoteItemId(),
                    content: noteContent,
                    type: 'note',
                    createdAt: new Date(),
                };

                items.push(item);
            }
        }
    });

    return {
        id: generateCategoryId(),
        name: '筆記分類',
        items,
        createdAt: new Date(),
    };
}

/**
 * 從內容中提取所有筆記項目
 * @param content 筆記內容
 * @returns 筆記項目列表
 */
export function extractNoteItems(content: string): ParsedNoteItem[] {
    const category = parseNoteContent(content);
    return category.items;
}
