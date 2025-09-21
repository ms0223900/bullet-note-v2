import { NoteCategory, ParsedNoteItem } from '@/types';

/**
 * 解析筆記內容，將以符號開頭的行分類為筆記項目
 * @param content 原始筆記內容
 * @returns 解析後的筆記分類
 */
export function parseNoteContent(content: string): NoteCategory {
    const lines = content.split('\n');
    const items: ParsedNoteItem[] = [];

    lines.forEach((line, index) => {
        const trimmedLine = line.trim();

        // 檢查是否以符號開頭（•、O、–、-）
        if (trimmedLine.startsWith('•') || trimmedLine.startsWith('O') || trimmedLine.startsWith('–') || trimmedLine.startsWith('-')) {
            const noteContent = trimmedLine.substring(1).trim();

            if (noteContent) {
                const item: ParsedNoteItem = {
                    id: `note-${Date.now()}-${index}`,
                    content: noteContent,
                    type: 'note',
                    createdAt: new Date(),
                };

                items.push(item);
            }
        }
    });

    return {
        id: `category-${Date.now()}`,
        name: '筆記分類',
        items,
        createdAt: new Date(),
    };
}

/**
 * 檢查內容是否包含筆記項目
 * @param content 筆記內容
 * @returns 是否包含筆記項目
 */
export function hasNoteItems(content: string): boolean {
    const lines = content.split('\n');
    return lines.some(line => {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('•') || trimmedLine.startsWith('O') || trimmedLine.startsWith('–') || trimmedLine.startsWith('-')) {
            // 檢查符號後面是否有內容
            const noteContent = trimmedLine.substring(1).trim();
            return noteContent.length > 0;
        }
        return false;
    });
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
