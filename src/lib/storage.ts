import { ParsedNoteItem } from '@/types';

// Local Storage 的鍵值常數
const STORAGE_KEYS = {
    SAVED_NOTES: 'bullet-note-saved-notes',
    EDITOR_CONTENT: 'bullet-note-editor-content',
} as const;

/**
 * Local Storage 工具類別
 * 負責處理筆記資料的儲存與讀取
 */
export class LocalStorageManager {
    /**
     * 檢查瀏覽器是否支援 Local Storage
     */
    private static isStorageAvailable(): boolean {
        try {
            const testKey = '__storage_test__';
            localStorage.setItem(testKey, 'test');
            localStorage.removeItem(testKey);
            return true;
        } catch {
            return false;
        }
    }

    /**
     * 安全地執行 Local Storage 操作
     */
    private static safeStorageOperation<T>(operation: () => T, fallback: T): T {
        if (!this.isStorageAvailable()) {
            console.warn('Local Storage is not available');
            return fallback;
        }

        try {
            return operation();
        } catch (error) {
            console.error('Local Storage operation failed:', error);
            return fallback;
        }
    }

    /**
     * 儲存已保存的筆記列表
     */
    static saveNotes(notes: ParsedNoteItem[]): void {
        this.safeStorageOperation(() => {
            const serializedNotes = JSON.stringify(notes.map(note => ({
                ...note,
                createdAt: note.createdAt.getTime()
            })));
            localStorage.setItem(STORAGE_KEYS.SAVED_NOTES, serializedNotes);
        }, undefined);
    }

    /**
     * 讀取已保存的筆記列表
     */
    static loadNotes(): ParsedNoteItem[] {
        return this.safeStorageOperation(() => {
            const stored = localStorage.getItem(STORAGE_KEYS.SAVED_NOTES);
            if (!stored) return [];

            return JSON.parse(stored, (key, value) => {
                if (key === 'createdAt') {
                    return new Date(value);
                }
                return value;
            });
        }, []);
    }

    /**
     * 儲存編輯器內容
     */
    static saveEditorContent(content: string): void {
        this.safeStorageOperation(() => {
            localStorage.setItem(STORAGE_KEYS.EDITOR_CONTENT, content);
        }, undefined);
    }

    /**
     * 讀取編輯器內容
     */
    static loadEditorContent(): string {
        return this.safeStorageOperation(() => {
            return localStorage.getItem(STORAGE_KEYS.EDITOR_CONTENT) || '';
        }, '');
    }

    /**
     * 清除所有儲存的資料
     */
    static clearAll(): void {
        this.safeStorageOperation(() => {
            localStorage.removeItem(STORAGE_KEYS.SAVED_NOTES);
            localStorage.removeItem(STORAGE_KEYS.EDITOR_CONTENT);
        }, undefined);
    }

    /**
     * 清除已保存的筆記
     */
    static clearNotes(): void {
        this.safeStorageOperation(() => {
            localStorage.removeItem(STORAGE_KEYS.SAVED_NOTES);
        }, undefined);
    }

    /**
     * 清除編輯器內容
     */
    static clearEditorContent(): void {
        this.safeStorageOperation(() => {
            localStorage.removeItem(STORAGE_KEYS.EDITOR_CONTENT);
        }, undefined);
    }
}
