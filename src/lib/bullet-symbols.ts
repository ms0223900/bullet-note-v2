/**
 * 子彈筆記符號相關的常數和工具函數
 */

export const NOTE_SYMBOL = '–';
export const TASK_SYMBOL = '•';
export const EVENT_SYMBOL = 'O';

export const BULLET_SYMBOLS = [TASK_SYMBOL, EVENT_SYMBOL, NOTE_SYMBOL] as const;

// 符號對應的標籤
export const SYMBOL_LABELS = {
    [TASK_SYMBOL]: '任務',
    [EVENT_SYMBOL]: '事件',
    [NOTE_SYMBOL]: '筆記',
} as const;

export type BulletSymbol = (typeof BULLET_SYMBOLS)[number];

/**
 * 檢查一行是否為有效的子彈筆記行
 * @param line 要檢查的行
 * @returns 是否為有效的子彈筆記行
 */
export function isValidBulletLine(line: string): boolean {
    const trimmedLine = line.trim();

    if (!BULLET_SYMBOLS.some(symbol => trimmedLine.startsWith(symbol))) {
        return false;
    }

    // 檢查符號後面是否有內容
    const content = trimmedLine.substring(1).trim();
    return content.length > 0;
}

/**
 * 檢查內容是否包含筆記項目
 * @param content 筆記內容
 * @returns 是否包含筆記項目
 */
export function hasNoteItems(content: string): boolean {
    const lines = content.split('\n');
    return lines.some(isValidBulletLine);
}

/**
 * 提取行中的符號類型
 * @param line 要檢查的行
 * @returns 符號類型，如果不是有效行則返回 null
 */
export function getSymbolType(line: string): BulletSymbol | null {
    const trimmedLine = line.trim();

    for (const symbol of BULLET_SYMBOLS) {
        if (trimmedLine.startsWith(symbol)) {
            return symbol;
        }
    }

    return null;
}

/**
 * 從行中提取內容（移除符號）
 * @param line 要處理的行
 * @returns 移除符號後的內容
 */
export function extractContentFromLine(line: string): string {
    const symbolType = getSymbolType(line);
    if (!symbolType) {
        return line.trim();
    }

    return line.trim().substring(symbolType.length).trim();
}
